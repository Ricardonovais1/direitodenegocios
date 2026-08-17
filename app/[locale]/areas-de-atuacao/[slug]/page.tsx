import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { sanityClient } from '@/sanity/client'
import { practiceAreaBySlugQuery, practiceAreasQuery } from '@/sanity/queries'
import { urlFor } from '@/lib/sanity-image'
import { fallbackData } from '@/lib/fallback-data'
import { getServiceDetail, serviceDetails, serviceFamilies } from '@/lib/service-details'
import { getSiteData } from '@/lib/site-data'
import type { PracticeArea, PracticeAreaFull } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import Accordion from '@/components/motion/Accordion'
import SpotlightCard from '@/components/motion/SpotlightCard'
import BackToTop from '@/components/motion/BackToTop'

async function fetchArea(slug: string): Promise<PracticeAreaFull | null> {
  return (await sanityClient?.fetch(practiceAreaBySlugQuery, { slug }).catch(() => null)) ?? null
}

export async function generateStaticParams() {
  const fromSanity: { slug: string }[] =
    (await sanityClient?.fetch(practiceAreasQuery).catch(() => [])) ?? []

  // As áreas do fallback garantem que toda rota conhecida exista, mesmo que o
  // Sanity esteja fora do ar no momento do build.
  const isSlug = (value: string | undefined): value is string => Boolean(value)

  const slugs = new Set<string>([
    ...fromSanity.map((area) => area.slug).filter(isSlug),
    ...fallbackData.practiceAreas.map((area) => area.slug).filter(isSlug),
  ])

  return Array.from(slugs).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const area = (await fetchArea(slug)) ?? fallbackData.practiceAreas.find((a) => a.slug === slug)

  if (!area) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const detail = getServiceDetail(slug)
  const seo = (area as PracticeAreaFull).seo

  return {
    // `absolute` evita o sufixo do template: os títulos vindos do Sanity já
    // trazem o nome do escritório.
    title: { absolute: seo?.title ?? `${area.title} — Fausto Sette Câmara` },
    description: seo?.description ?? detail?.tagline ?? area.description,
    alternates: { canonical: `${siteUrl}/areas-de-atuacao/${slug}` },
    openGraph: {
      title: seo?.title ?? area.title,
      description: seo?.description ?? detail?.tagline ?? area.description,
      url: `${siteUrl}/areas-de-atuacao/${slug}`,
    },
  }
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const [data, sanityArea] = await Promise.all([getSiteData(), fetchArea(slug)])

  const listed = data.practiceAreas.find((item) => item.slug === slug)
  const area: PracticeAreaFull | PracticeArea | undefined = sanityArea ?? listed

  if (!area) notFound()

  const detail = getServiceDetail(slug)
  const family = detail ? serviceFamilies.find((f) => f.id === detail.family) : null

  const coverImage = sanityArea?.coverImage
  const coverUrl = coverImage
    ? urlFor(coverImage)?.width(1400).height(560).fit('crop').url()
    : null

  // Áreas irmãs (mesma família) para leitura em sequência.
  const related = data.practiceAreas
    .filter(
      (item) =>
        item.slug &&
        item.slug !== slug &&
        (!detail || serviceDetails[item.slug]?.family === detail.family),
    )
    .slice(0, 3)

  const fallbackRelated = data.practiceAreas.filter((item) => item.slug && item.slug !== slug)
  const siblings = related.length ? related : fallbackRelated.slice(0, 3)

  // Navegação anterior/próxima seguindo a ordem publicada.
  const index = data.practiceAreas.findIndex((item) => item.slug === slug)
  const previous = index > 0 ? data.practiceAreas[index - 1] : null
  const next =
    index >= 0 && index < data.practiceAreas.length - 1 ? data.practiceAreas[index + 1] : null

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: area.title,
    description: detail?.tagline ?? area.description,
    serviceType: area.title,
    areaServed: 'BR',
    url: `${siteUrl}/areas-de-atuacao/${slug}`,
    provider: {
      '@type': 'LegalService',
      name: data.name,
      telephone: data.phone,
      email: data.email,
      url: siteUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />

      <main id="main-content">
        <PageHero
          eyebrow={`${area.number} · ${family?.label ?? 'Área de atuação'}`}
          title={area.title}
          lead={detail?.tagline ?? area.description}
          crumbs={[
            { label: 'Início', href: '/' },
            { label: 'Áreas de atuação', href: '/areas-de-atuacao' },
            { label: area.title },
          ]}
        >
          <div className="flex flex-wrap gap-4">
            <Link href="/contato" className="btn-gold">
              Agendar uma consulta
            </Link>
            <a
              href="https://wa.me/5531984284815"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Falar no WhatsApp
            </a>
          </div>
        </PageHero>

        {coverUrl && (
          <div className="relative h-[280px] w-full md:h-[400px]">
            <Image
              src={coverUrl}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-offwhite"
            />
          </div>
        )}

        <section className="bg-offwhite py-16 md:py-20">
          <div className="container-fw grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
            {/* Conteúdo */}
            <div className="min-w-0">
              <Reveal variant="up">
                <p className="text-xl leading-relaxed text-navy md:text-[1.35rem]">
                  {area.description}
                </p>
              </Reveal>

              <Reveal variant="fade" delay={80}>
                <span className="rule-gold my-10 block" />
              </Reveal>

              {'fullContent' in area && area.fullContent ? (
                <Reveal variant="up" delay={120}>
                  <div className="prose prose-lg prose-navy max-w-none text-[#1f2933]">
                    <PortableText value={area.fullContent as PortableTextBlock[]} />
                  </div>
                </Reveal>
              ) : null}

              {detail && (
                <>
                  <Reveal variant="up" className="mt-14">
                    <h2 className="mb-6 font-serif text-2xl font-bold text-navy md:text-3xl">
                      O que o trabalho inclui
                    </h2>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {detail.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 transition-colors duration-500 hover:border-gold/35"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden
                            className="mt-1 shrink-0"
                          >
                            <path
                              d="m3 8.5 3.2 3.2L13 5"
                              stroke="#c9a45c"
                              strokeWidth="1.9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-[0.95rem] text-[#3c4757]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal variant="up" className="mt-14">
                    <h2 className="mb-6 font-serif text-2xl font-bold text-navy md:text-3xl">
                      Sinais de que é hora de procurar
                    </h2>
                    <ul className="grid gap-3">
                      {detail.signals.map((signal, i) => (
                        <li
                          key={signal}
                          className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card"
                        >
                          <span
                            aria-hidden
                            className="mt-0.5 font-semibold tabular-nums text-xs tracking-[0.22em] text-gold-ink"
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[#3c4757]">{signal}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  {detail.faqs.length > 0 && (
                    <Reveal variant="up" className="mt-14">
                      <h2 className="mb-6 font-serif text-2xl font-bold text-navy md:text-3xl">
                        Perguntas frequentes
                      </h2>
                      <Accordion
                        defaultOpen={-1}
                        items={detail.faqs.map((faq, i) => ({
                          id: `${slug}-faq-${i}`,
                          question: faq.question,
                          answer: faq.answer,
                        }))}
                      />
                      <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                          __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'FAQPage',
                            mainEntity: detail.faqs.map((faq) => ({
                              '@type': 'Question',
                              name: faq.question,
                              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
                            })),
                          }),
                        }}
                      />
                    </Reveal>
                  )}
                </>
              )}
            </div>

            {/* Coluna lateral fixa */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal
                variant="up"
                delay={120}
                className="bg-ink texture-grain relative overflow-hidden rounded-[20px] p-7 text-white shadow-heavy"
              >
                <div aria-hidden className="texture-weave-dark absolute inset-0" />
                <div className="relative">
                  <p className="mb-2 font-serif text-xl font-bold">
                    Precisa de apoio em {area.title}?
                  </p>
                  <p className="mb-6 text-sm text-slate-300">
                    Uma conversa inicial já esclarece o caminho — sem compromisso e sob sigilo
                    profissional.
                  </p>
                  <Link href="/contato" className="btn-gold w-full">
                    Agendar uma consulta
                  </Link>
                  <a
                    href="https://wa.me/5531984284815"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline mt-3 w-full"
                  >
                    Falar no WhatsApp
                  </a>
                </div>
              </Reveal>

              {detail && (
                <Reveal
                  variant="up"
                  delay={200}
                  className="mt-5 rounded-[20px] border border-black/[0.06] bg-white p-7"
                >
                  <h2 className="mb-4 font-serif text-lg font-bold text-navy">Para quem é</h2>
                  <ul className="grid gap-3">
                    {detail.forWhom.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-muted">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {siblings.length > 0 && (
                <Reveal
                  variant="up"
                  delay={260}
                  className="mt-5 rounded-[20px] border border-black/[0.06] bg-white p-7"
                >
                  <h2 className="mb-4 font-serif text-lg font-bold text-navy">
                    {related.length ? `Também em ${family?.label ?? 'áreas próximas'}` : 'Outras áreas'}
                  </h2>
                  <ul className="grid gap-1">
                    {siblings.map((item) => (
                      <li key={item._id}>
                        <Link
                          href={`/areas-de-atuacao/${item.slug}`}
                          className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-navy transition-colors duration-400 hover:bg-offwhite hover:text-gold-ink"
                        >
                          {item.title}
                          <span aria-hidden className="arrow-slide text-gold">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </aside>
          </div>
        </section>

        {/* Continuar navegando */}
        {(previous || next) && (
          <section className="border-t border-black/[0.06] bg-white py-12">
            <div className="container-fw grid gap-4 sm:grid-cols-2">
              {previous?.slug ? (
                <SpotlightCard
                  className="card-elevated group p-6"
                  as="div"
                >
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted">Anterior</p>
                  <Link
                    href={`/areas-de-atuacao/${previous.slug}`}
                    className="font-serif text-lg font-bold text-navy after:absolute after:inset-0 after:content-[''] group-hover:text-gold-ink"
                  >
                    ← {previous.title}
                  </Link>
                </SpotlightCard>
              ) : (
                <span />
              )}

              {next?.slug && (
                <SpotlightCard
                  className="card-elevated group p-6 sm:text-right"
                  as="div"
                  delay={80}
                >
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted">Próxima</p>
                  <Link
                    href={`/areas-de-atuacao/${next.slug}`}
                    className="font-serif text-lg font-bold text-navy after:absolute after:inset-0 after:content-[''] group-hover:text-gold-ink"
                  >
                    {next.title} →
                  </Link>
                </SpotlightCard>
              )}
            </div>
          </section>
        )}

        {/* Fechamento */}
        <section className="bg-ink texture-grain relative overflow-hidden py-20 text-center text-white">
          <div aria-hidden className="texture-weave-dark absolute inset-0" />
          <div
            aria-hidden
            className="aurora left-[calc(50%-160px)] top-0 h-[320px] w-[320px] bg-gold/20"
          />
          <div className="container-fw relative">
            <Reveal variant="up">
              <h2 className="mx-auto mb-4 max-w-2xl font-serif text-[2rem] font-bold leading-[1.06] md:text-[2.75rem]">
                Vamos olhar o seu cenário com calma?
              </h2>
            </Reveal>
            <Reveal variant="up" delay={90}>
              <p className="mx-auto mb-8 max-w-xl text-slate-300">
                Conte o que está acontecendo. Eu respondo com o caminho mais eficiente e de menor
                risco para o seu caso.
              </p>
            </Reveal>
            <Reveal variant="up" delay={170}>
              <Link href="/contato" className="btn-gold">
                Falar com o Dr. Fausto
                <span aria-hidden className="arrow-slide">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <BackToTop />
      <Footer data={data} locale={locale} />
    </>
  )
}
