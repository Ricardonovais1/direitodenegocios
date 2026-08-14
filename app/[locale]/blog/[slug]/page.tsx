import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { sanityClient } from '@/sanity/client'
import { postBySlugQuery, postsQuery } from '@/sanity/queries'
import { urlFor } from '@/lib/sanity-image'
import type { PostFull } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSiteData } from '@/lib/site-data'

export async function generateStaticParams() {
  const posts = await sanityClient?.fetch(postsQuery).catch(() => []) ?? []
  return posts.map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post: PostFull | null = await sanityClient
    ?.fetch(postBySlugQuery, { slug })
    .catch(() => null) ?? null

  if (!post) return {}
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const metaTitle = post.seo?.title ?? post.title
  const metaDescription = post.seo?.description ?? post.excerpt
  const ogImageSource = post.seo?.ogImage ?? post.coverImage
  const ogImageUrl = ogImageSource ? urlFor(ogImageSource)?.width(1200).height(630).fit('crop').url() : undefined

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
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }] : undefined,
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
  const data = await getSiteData()

  const post: PostFull | null = await sanityClient
    ?.fetch(postBySlugQuery, { slug })
    .catch(() => null) ?? null

  if (!post) notFound()

  const coverUrl = post.coverImage
    ? urlFor(post.coverImage)?.width(1200).height(500).fit('crop').url()
    : null
  const date = post.publishedAt
    ? new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(post.publishedAt))
    : null

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />
      <main id="main-content">
        {/* Hero */}
        <div
          className="py-16 text-white"
          style={{ background: 'linear-gradient(110deg, rgba(9,20,34,0.96), rgba(15,31,51,0.86)), #0f1f33' }}
        >
          <div className="container-fw max-w-3xl">
            <Link href={`/${locale}/blog`} className="text-gold-light text-sm hover:underline mb-6 inline-block">
              {t('backToBlog')}
            </Link>
            {post.categories && post.categories.length > 0 && (
              <p className="text-gold text-xs font-bold uppercase tracking-wider mb-3">{post.categories[0]}</p>
            )}
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
            {date && <p className="text-slate-400 text-sm mt-4">{t('publishedOn')} {date}</p>}
          </div>
        </div>

        {coverUrl && (
          <div className="relative h-[320px] md:h-[440px] w-full">
            <Image src={coverUrl} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <article className="py-16">
          <div className="container-fw max-w-3xl">
            {post.body ? (
              <div className="prose prose-lg prose-navy max-w-none text-[#1f2933]">
                <PortableText value={post.body as PortableTextBlock[]} />
              </div>
            ) : (
              <p className="text-muted">{post.excerpt}</p>
            )}

            <div className="mt-12 p-8 bg-offwhite rounded-[18px] border border-[#ececec]">
              <p className="text-navy font-bold mb-2">Precisa de apoio jurídico?</p>
              <p className="text-muted text-sm mb-4">Estou disponível para uma consulta objetiva sobre o seu negócio.</p>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-gold text-gray-900 font-extrabold text-sm hover:bg-gold-light transition-colors"
              >
                Falar com o Dr. Fausto
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer data={data} locale={locale} />
    </>
  )
}
