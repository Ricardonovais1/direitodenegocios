#!/usr/bin/env node
/**
 * publish-daily-post.mjs
 *
 * Runs once a day (via GitHub Actions cron). Picks the next unpublished
 * post from content/blog-queue.json, generates a cover image with fal.ai,
 * uploads it to Sanity, and creates the "post" document in Sanity.
 *
 * Required env vars:
 *   SANITY_PROJECT_ID   - e.g. h0l4pk97
 *   SANITY_DATASET      - e.g. production
 *   SANITY_WRITE_TOKEN  - Sanity API token with Editor (write) permission
 *   FAL_KEY             - fal.ai API key
 *
 * Exit code 0 in every "no-op" case (nothing to publish, or a soft
 * failure) so the daily cron doesn't show as a broken workflow for
 * expected situations — hard failures (bad credentials, API errors)
 * exit 1 so GitHub Actions surfaces them.
 */

const {
  SANITY_PROJECT_ID,
  SANITY_DATASET = 'production',
  SANITY_WRITE_TOKEN,
  FAL_KEY,
} = process.env;

const FAL_MODEL = process.env.FAL_MODEL || 'fal-ai/flux/dev';

function must(name, value) {
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

must('SANITY_PROJECT_ID', SANITY_PROJECT_ID);
must('SANITY_WRITE_TOKEN', SANITY_WRITE_TOKEN);
must('FAL_KEY', FAL_KEY);

const SANITY_API_VERSION = '2024-01-01';
const QUERY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;
const MUTATE_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;
const ASSETS_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/assets/images/${SANITY_DATASET}`;

async function sanityQuery(groq, params = {}) {
  const url = new URL(QUERY_URL);
  url.searchParams.set('query', groq);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v));
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${SANITY_WRITE_TOKEN}` },
  });
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.result;
}

async function loadQueue() {
  const fs = await import('node:fs/promises');
  const raw = await fs.readFile(new URL('../content/blog-queue.json', import.meta.url), 'utf-8');
  return JSON.parse(raw);
}

function toPortableText(paragraphs) {
  return paragraphs.map((text) => ({
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', text, marks: [] }],
  }));
}

async function generateImage(prompt) {
  console.log('Requesting image from fal.ai...');
  const submitRes = await fetch(`https://queue.fal.run/${FAL_MODEL}`, {
    method: 'POST',
    headers: {
      Authorization: `Key ${FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      image_size: 'landscape_16_9',
      num_images: 1,
    }),
  });
  if (!submitRes.ok) {
    throw new Error(`fal.ai submit failed: ${submitRes.status} ${await submitRes.text()}`);
  }
  const submitData = await submitRes.json();
  const statusUrl = submitData.status_url;
  const responseUrl = submitData.response_url;
  if (!statusUrl || !responseUrl) {
    throw new Error(`fal.ai response missing status_url/response_url: ${JSON.stringify(submitData)}`);
  }

  // Poll until the job completes (max ~2 minutes)
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const statusRes = await fetch(statusUrl, { headers: { Authorization: `Key ${FAL_KEY}` } });
    if (!statusRes.ok) continue;
    const statusData = await statusRes.json();
    if (statusData.status === 'COMPLETED') break;
    if (statusData.status === 'FAILED' || statusData.status === 'ERROR') {
      throw new Error(`fal.ai job failed: ${JSON.stringify(statusData)}`);
    }
  }

  const resultRes = await fetch(responseUrl, { headers: { Authorization: `Key ${FAL_KEY}` } });
  if (!resultRes.ok) throw new Error(`fal.ai result fetch failed: ${resultRes.status} ${await resultRes.text()}`);
  const resultData = await resultRes.json();
  const imageUrl = resultData?.images?.[0]?.url;
  if (!imageUrl) throw new Error(`fal.ai result had no image: ${JSON.stringify(resultData)}`);
  return imageUrl;
}

async function uploadImageToSanity(imageUrl) {
  console.log('Downloading generated image...');
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`Failed to download generated image: ${imgRes.status}`);
  const buffer = Buffer.from(await imgRes.arrayBuffer());
  const contentType = imgRes.headers.get('content-type') || 'image/png';

  console.log('Uploading image asset to Sanity...');
  const uploadRes = await fetch(ASSETS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
      'Content-Type': contentType,
    },
    body: buffer,
  });
  if (!uploadRes.ok) throw new Error(`Sanity asset upload failed: ${uploadRes.status} ${await uploadRes.text()}`);
  const uploadData = await uploadRes.json();
  return uploadData.document._id; // e.g. "image-abc123-1200x630-png"
}

async function createPost(post, imageAssetId) {
  const doc = {
    _type: 'post',
    title: post.title,
    slug: { _type: 'slug', current: post.slug },
    publishedAt: new Date().toISOString(),
    excerpt: post.excerpt,
    coverImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageAssetId },
    },
    categories: [post.category],
    body: toPortableText(post.body),
    seo: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      // Reuses the already-uploaded cover image as the OG/social share image
      // instead of generating and uploading a second asset.
      ogImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAssetId },
      },
    },
  };

  const res = await fetch(MUTATE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations: [{ create: doc }] }),
  });
  if (!res.ok) throw new Error(`Sanity create post failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  const queue = await loadQueue();
  console.log(`Loaded ${queue.length} posts from queue.`);

  const publishedSlugs = new Set(
    (await sanityQuery(`*[_type == "post" && defined(slug.current)]{"slug": slug.current}`)).map(
      (p) => p.slug
    )
  );
  console.log(`${publishedSlugs.size} posts already published in Sanity.`);

  const next = queue.find((p) => !publishedSlugs.has(p.slug));
  if (!next) {
    console.log('No unpublished posts left in the queue. Nothing to do today.');
    console.log('Add more entries to content/blog-queue.json to keep the daily cadence going.');
    return;
  }

  console.log(`Publishing: "${next.title}" (${next.slug})`);

  const imageUrl = await generateImage(next.imagePrompt);
  const imageAssetId = await uploadImageToSanity(imageUrl);
  const result = await createPost(next, imageAssetId);

  console.log('Published successfully:', JSON.stringify(result));
}

main().catch((err) => {
  console.error('publish-daily-post failed:', err);
  process.exit(1);
});
