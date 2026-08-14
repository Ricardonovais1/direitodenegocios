// scripts/migrate-content.mts
// Seeds the Sanity dataset (h0l4pk97 / production) with the site content from
// lib/fallback-data.ts, making the Sanity Studio the editable source of truth.
//
// Usage:
//   node scripts/migrate-content.mts --dry-run              # print docs, no writes
//   SANITY_WRITE_TOKEN=... node scripts/migrate-content.mts # create documents
//
// Idempotent: uses createIfNotExists with deterministic _ids (safe to re-run).

import { fallbackData } from '../lib/fallback-data.ts'

const PROJECT_ID = 'h0l4pk97'
const DATASET = 'production'
const API_VERSION = '2024-01-01'
const TOKEN = process.env.SANITY_WRITE_TOKEN ?? ''

const DRY_RUN = process.argv.includes('--dry-run')

const slug = (s) => ({ _type: 'slug', current: s })

// Separate the collection fields (they become their own document types) from
// the siteSettings fields (which stay on the singleton document).
const {
  practiceAreas,
  testimonials,
  faqs,
  caseResults,
  courses,
  ...settings
} = fallbackData

const docs = [
  { _id: 'siteSettings', _type: 'siteSettings', ...settings },

  ...practiceAreas.map((a, i) => ({
    _id: `practice-area-${a.slug}`,
    _type: 'practiceArea',
    number: a.number,
    title: a.title,
    slug: slug(a.slug),
    description: a.description,
    order: i + 1,
  })),

  ...testimonials.map((t, i) => ({
    _id: `testimonial-${i + 1}`,
    _type: 'testimonial',
    name: t.name,
    role: t.role,
    company: t.company,
    location: t.location,
    quote: t.quote,
    photo: t.photo,
    order: i + 1,
  })),

  ...faqs.map((f, i) => ({
    _id: `faq-${i + 1}`,
    _type: 'faq',
    question: f.question,
    answer: f.answer,
    order: i + 1,
  })),

  ...caseResults.map((r, i) => ({
    _id: `case-result-${i + 1}`,
    _type: 'caseResult',
    highlight: r.highlight,
    label: r.label,
    description: r.description,
    order: i + 1,
  })),

  ...courses.map((c, i) => ({
    _id: `course-${c.slug}`,
    _type: 'course',
    title: c.title,
    slug: slug(c.slug),
    eyebrow: c.eyebrow,
    headline: c.headline,
    subheadline: c.subheadline,
    shortDescription: c.shortDescription,
    audience: c.audience,
    modules: c.modules,
    faqs: c.faqs,
    price: c.price,
    guarantee: c.guarantee,
    bonus: c.bonus,
    order: c.order ?? i + 1,
  })),
]

if (DRY_RUN) {
  console.log(`Would create ${docs.length} documents:`)
  for (const d of docs) console.log(`  [${d._type}] ${d._id}`)
  process.exit(0)
}

if (!TOKEN) {
  console.error('Missing SANITY_WRITE_TOKEN (needs Editor permission).')
  process.exit(1)
}

const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

async function main() {
  const res = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations: docs.map((doc) => ({ createIfNotExists: doc })) }),
  })
  if (!res.ok) throw new Error(`Sanity mutate failed: ${res.status} ${await res.text()}`)
  const result = await res.json()
  console.log(`✓ Created ${docs.length} documents (${result.results?.length ?? '?'} mutations).`)
}

main().catch((err) => {
  console.error('migrate-content failed:', err)
  process.exit(1)
})
