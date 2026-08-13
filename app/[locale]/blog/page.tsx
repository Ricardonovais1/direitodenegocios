import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { sanityClient } from '@/sanity/client'
import { postsQuery } from '@/sanity/queries'
import { urlFor } from '@/lib/sanity-image'
import type { Post } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSiteData } from '@/lib/site-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    title: 'Blog — Direito de Negócios e Empresarial',
    description: 'Artigos práticos sobre CCT, jornada de trabalho, contratos e redução de passivos para empresas, RH e departamentos jurídicos.',
    alternates: { canonical: `${siteUrl}/blog` },
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('blog')
  const data = await getSiteData()

  const posts: Post[] = await sanityClient?.fetch(postsQuery).catch(() => []) ?? []

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />
      <main id="main-content" className="py-20">
        <div className="container-fw">
          <div className="max-w-2xl mb-12">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">{t('eyebrow')}</p>
            <h1 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight mb-4">{t('heading')}</h1>
            <p className="text-muted text-lg">{t('subheading')}</p>
          </div>

          {posts.length === 0 ? (
            <p className="text-muted text-lg">{t('noPosts')}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const coverUrl = post.coverImage
                  ? urlFor(post.coverImage)?.width(600).height(360).fit('crop').url()
                  : null
                const date = post.publishedAt
                  ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(post.publishedAt))
                  : null

                return (
                  <Link
                    key={post._id}
                    href={`/${locale}/blog/${post.slug}`}
                    className="group block bg-white rounded-[18px] overflow-hidden border border-[#ececec] shadow-card hover:shadow-heavy hover:-translate-y-1 transition-all"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-navy to-navy-soft">
                      {coverUrl ? (
                        <Image src={coverUrl} alt={post.title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm font-bold uppercase tracking-wider">
                          Image Placeholder
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      {post.categories && post.categories.length > 0 && (
                        <p className="text-gold text-xs font-bold uppercase tracking-wider mb-2">{post.categories[0]}</p>
                      )}
                      <h2 className="font-serif text-navy text-xl font-bold leading-snug mb-2 group-hover:text-gold transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && <p className="text-muted text-sm line-clamp-2 mb-3">{post.excerpt}</p>}
                      {date && <p className="text-slate-400 text-xs">{t('publishedOn')} {date}</p>}
                      <p className="text-gold text-sm font-bold mt-3 group-hover:underline">{t('readMore')} →</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer data={data} locale={locale} />
    </>
  )
}
