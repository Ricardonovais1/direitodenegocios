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
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import SpotlightCard from '@/components/motion/SpotlightCard'
import BackToTop from '@/components/motion/BackToTop'
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
    description:
      'Artigos práticos sobre CCT, jornada de trabalho, contratos e redução de passivos para empresas, RH e departamentos jurídicos.',
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

  const posts: Post[] = (await sanityClient?.fetch(postsQuery).catch(() => [])) ?? []
  const [featured, ...rest] = posts

  const formatDate = (value?: string) =>
    value ? new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(value)) : null

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />

      <main id="main-content">
        <PageHero
          eyebrow={t('eyebrow')}
          title={t('heading')}
          lead={t('subheading')}
          crumbs={[{ label: 'Início', href: '/' }, { label: 'Blog' }]}
          compact
        />

        <section className="bg-parchment texture-grain texture-grain-light relative py-16 md:py-20">
          <div className="container-fw relative">
            {posts.length === 0 ? (
              <p className="text-lg text-muted">{t('noPosts')}</p>
            ) : (
              <>
                {/* Artigo em destaque */}
                {featured && (
                  <Reveal variant="up" className="mb-12">
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="card-elevated group grid gap-0 md:grid-cols-[1.05fr_0.95fr]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-navy to-navy-soft md:aspect-auto md:min-h-[340px]">
                        {featured.coverImage ? (
                          <Image
                            src={
                              urlFor(featured.coverImage)?.width(900).height(600).fit('crop').url() ??
                              ''
                            }
                            alt=""
                            fill
                            sizes="(max-width: 768px) 92vw, 50vw"
                            className="object-cover transition-transform duration-[1.2s] ease-silk group-hover:scale-[1.05]"
                            priority
                          />
                        ) : (
                          <span className="absolute inset-0 grid place-items-center text-sm uppercase tracking-wider text-white/30">
                            Direito de Negócios
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col justify-center p-8 md:p-10">
                        <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-gold-ink">
                          Em destaque
                        </span>
                        <h2 className="mb-3 font-serif text-2xl font-bold leading-snug text-navy transition-colors duration-500 group-hover:text-gold-ink md:text-[2rem]">
                          {featured.title}
                        </h2>
                        {featured.excerpt && (
                          <p className="mb-4 text-muted">{featured.excerpt}</p>
                        )}
                        <p className="text-xs text-slate-400">
                          {formatDate(featured.publishedAt)}
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold-ink">
                          {t('readMore')}
                          <span aria-hidden className="arrow-slide">
                            →
                          </span>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                )}

                {rest.length > 0 && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post, index) => {
                      const coverUrl = post.coverImage
                        ? urlFor(post.coverImage)?.width(600).height(360).fit('crop').url()
                        : null

                      return (
                        <SpotlightCard
                          key={post._id}
                          delay={(index % 3) * 90}
                          className="card-elevated group flex flex-col"
                        >
                          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-navy to-navy-soft">
                            {coverUrl ? (
                              <Image
                                src={coverUrl}
                                alt=""
                                fill
                                sizes="(max-width: 768px) 92vw, 33vw"
                                className="object-cover transition-transform duration-[1.2s] ease-silk group-hover:scale-[1.06]"
                              />
                            ) : (
                              <span className="absolute inset-0 grid place-items-center text-sm font-bold uppercase tracking-wider text-white/25">
                                Direito de Negócios
                              </span>
                            )}
                          </div>

                          <div className="flex flex-1 flex-col p-6">
                            {post.categories?.[0] && (
                              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gold-ink">
                                {post.categories[0]}
                              </p>
                            )}
                            <h2 className="mb-2 font-serif text-xl font-bold leading-snug text-navy transition-colors duration-500 group-hover:text-gold-ink">
                              <Link
                                href={`/blog/${post.slug}`}
                                className="after:absolute after:inset-0 after:content-['']"
                              >
                                {post.title}
                              </Link>
                            </h2>
                            {post.excerpt && (
                              <p className="mb-3 line-clamp-2 flex-1 text-sm text-muted">
                                {post.excerpt}
                              </p>
                            )}
                            <p className="text-xs text-slate-400">{formatDate(post.publishedAt)}</p>
                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold-ink">
                              {t('readMore')}
                              <span aria-hidden className="arrow-slide">
                                →
                              </span>
                            </span>
                          </div>
                        </SpotlightCard>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <BackToTop />
      <Footer data={data} locale={locale} />
    </>
  )
}
