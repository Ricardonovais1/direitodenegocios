import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { sanityClient } from '@/sanity/client'
import { postBySlugQuery, postsQuery } from '@/sanity/queries'
import { urlFor } from '@/lib/sanity-image'
import type { Post, PostFull } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Enter from '@/components/motion/Enter'
import Reveal from '@/components/motion/Reveal'
import SpotlightCard from '@/components/motion/SpotlightCard'
import BackToTop from '@/components/motion/BackToTop'
import { getSiteData } from '@/lib/site-data'

export async function generateStaticParams() {
  const posts = (await sanityClient?.fetch(postsQuery).catch(() => [])) ?? []
  return posts.map((post: { slug: string }) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post: PostFull | null =
    (await sanityClient?.fetch(postBySlugQuery, { slug }).catch(() => null)) ?? null

  if (!post) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const metaTitle = post.seo?.title ?? post.title
  const metaDescription = post.seo?.description ?? post.excerpt
  const ogImageSource = post.seo?.ogImage ?? post.coverImage
  const ogImageUrl = ogImageSource
    ? urlFor(ogImageSource)?.width(1200).height(630).fit('crop').url()
    : undefined

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDescription ?? undefined,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `${siteUrl}/blog/${slug}`,
      images: ogImageUrl
        ? [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription ?? undefined,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const t = await getTranslations('blog')

  const [data, post, allPosts] = await Promise.all([
    getSiteData(),
    (sanityClient?.fetch(postBySlugQuery, { slug }).catch(() => null) ??
      Promise.resolve(null)) as Promise<PostFull | null>,
    (sanityClient?.fetch(postsQuery).catch(() => []) ?? Promise.resolve([])) as Promise<Post[]>,
  ])

  if (!post) notFound()

  const coverUrl = post.coverImage
    ? urlFor(post.coverImage)?.width(1400).height(560).fit('crop').url()
    : null
  const date = post.publishedAt
    ? new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(post.publishedAt))
    : null

  const related = allPosts.filter((item) => item.slug !== slug).slice(0, 3)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: data.name },
    publisher: { '@type': 'Organization', name: data.name },
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
    ...(coverUrl ? { image: coverUrl } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />

      <main id="main-content">
        {/* Abertura */}
        <div className="bg-ink texture-grain relative overflow-hidden py-16 text-white md:py-20">
          <div aria-hidden className="texture-weave-dark absolute inset-0" />
          <div aria-hidden className="aurora -right-24 -top-28 h-[340px] w-[340px] bg-gold/15" />

          <div className="container-fw relative max-w-3xl">
            <Enter variant="fade">
              <Link href="/blog" className="link-underline mb-6 inline-flex text-sm text-gold-light">
                {t('backToBlog')}
              </Link>
            </Enter>

            {post.categories?.[0] && (
              <Enter delay={50}>
                <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold">
                  {post.categories[0]}
                </p>
              </Enter>
            )}

            <Enter variant="blur" delay={90}>
              <h1 className="font-serif text-[2.4rem] font-bold leading-[1.06] sm:text-4xl md:text-[3.4rem]">
                {post.title}
              </h1>
            </Enter>

            {date && (
              <Enter delay={150}>
                <p className="mt-5 text-sm text-slate-400">
                  {t('publishedOn')} {date}
                </p>
              </Enter>
            )}
          </div>
        </div>

        {coverUrl && (
          <div className="relative h-[280px] w-full md:h-[420px]">
            <Image
              src={coverUrl}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-navy/25 via-transparent to-offwhite"
            />
          </div>
        )}

        <article className="bg-offwhite py-16">
          <div className="container-fw max-w-3xl">
            <Reveal variant="up">
              {post.body ? (
                <div className="prose prose-lg prose-navy max-w-none text-[#1f2933]">
                  <PortableText value={post.body as PortableTextBlock[]} />
                </div>
              ) : (
                <p className="text-muted">{post.excerpt}</p>
              )}
            </Reveal>

            <Reveal
              variant="up"
              className="bg-ink texture-grain relative mt-14 overflow-hidden rounded-[20px] p-8 text-white shadow-heavy md:p-10"
            >
              <div aria-hidden className="texture-weave-dark absolute inset-0" />
              <div className="relative">
                <p className="mb-2 font-serif text-xl font-bold">Precisa de apoio jurídico?</p>
                <p className="mb-6 max-w-lg text-sm text-slate-300">
                  Estou disponível para uma consulta objetiva sobre o seu negócio — sem compromisso
                  e sob sigilo profissional.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contato" className="btn-gold">
                    Falar com o Dr. Fausto
                  </Link>
                  <Link href="/areas-de-atuacao" className="btn-outline">
                    Ver áreas de atuação
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </article>

        {related.length > 0 && (
          <section className="bg-white py-16">
            <div className="container-fw">
              <Reveal variant="up">
                <h2 className="mb-8 font-serif text-2xl font-bold text-navy md:text-3xl">
                  Continuar lendo
                </h2>
              </Reveal>

              <div className="grid gap-5 md:grid-cols-3">
                {related.map((item, index) => (
                  <SpotlightCard
                    key={item._id}
                    delay={index * 90}
                    className="card-elevated card-topline group flex flex-col p-6"
                  >
                    {item.categories?.[0] && (
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gold-ink">
                        {item.categories[0]}
                      </p>
                    )}
                    <h3 className="mb-2 font-serif text-lg font-bold leading-snug text-navy">
                      <Link
                        href={`/blog/${item.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    {item.excerpt && (
                      <p className="line-clamp-2 flex-1 text-sm text-muted">{item.excerpt}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold-ink">
                      {t('readMore')}
                      <span aria-hidden className="arrow-slide">
                        →
                      </span>
                    </span>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <BackToTop />
      <Footer data={data} locale={locale} />
    </>
  )
}
