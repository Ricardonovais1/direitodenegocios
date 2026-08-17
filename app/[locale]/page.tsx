import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteData } from '@/lib/site-data'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import AreaMarquee from '@/components/AreaMarquee'
import PracticeAreas from '@/components/PracticeAreas'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Process from '@/components/Process'
import Testimonial from '@/components/Testimonial'
import CaseResults from '@/components/CaseResults'
import Awards from '@/components/Awards'
import FAQ from '@/components/FAQ'
import SecondCTA from '@/components/SecondCTA'
import CourseBanner from '@/components/CourseBanner'
import Footer from '@/components/Footer'
import Reveal from '@/components/motion/Reveal'
import SpotlightCard from '@/components/motion/SpotlightCard'
import BackToTop from '@/components/motion/BackToTop'
import { getTranslations } from 'next-intl/server'

const audience = [
  {
    title: 'Empresas de tecnologia e TI',
    description: 'Que vivem sob convenções coletivas e contratos de alta complexidade.',
  },
  {
    title: 'Startups e fundadores',
    description: 'Que precisam de estrutura jurídica do primeiro aporte à escala.',
  },
  {
    title: 'Empresários e investidores',
    description: 'Que querem crescer sem transformar risco em surpresa.',
  },
  {
    title: 'Departamentos jurídicos e RH',
    description: 'Que aplicam normas coletivas no dia a dia e precisam de segurança.',
  },
  {
    title: 'Profissionais e cidadãos',
    description: 'Que precisam de um caminho claro em meio à burocracia.',
  },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  const data = await getSiteData()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://faustosettecamara.com.br'

  const title = data.seo?.title ?? 'Fausto Sette Câmara — Direito de Negócios e Empresarial'
  const description =
    data.seo?.description ??
    'Advogado de Direito de Negócios com 15+ anos de experiência. Estratégia, tática e leitura de jogo para empresas, startups e empresários. Atuação nacional.'

  return {
    title,
    description,
    alternates: { canonical: siteUrl },
    openGraph: { title, description, url: siteUrl },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getSiteData()
  const t = await getTranslations('cta')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: data.name,
    telephone: data.phone,
    email: data.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Marechal Hermes, 881, Gutierrez',
      addressLocality: 'Belo Horizonte',
      addressRegion: 'MG',
      postalCode: '30441-110',
      addressCountry: 'BR',
    },
    url: siteUrl,
    areaServed: 'BR',
    knowsAbout: data.practiceAreas.map((area) => area.title),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />

      <main id="main-content">
        <Hero
          hero={data.hero}
          phone={data.phone}
          pillars={data.about.features.map((feature) => feature.title)}
        />
        <AreaMarquee areas={data.practiceAreas} />
        <About about={data.about} />
        <PracticeAreas areas={data.practiceAreas} locale={locale} />
        <Stats stats={data.stats} />

        {/* Para quem eu trabalho */}
        <section className="bg-white py-24">
          <div className="container-fw">
            <div className="mb-12 max-w-2xl">
              <Reveal variant="up">
                <p className="eyebrow mb-4">Para quem eu trabalho</p>
              </Reveal>
              <Reveal variant="up" delay={80}>
                <h2 className="font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                  Para quem faz negócios de verdade.
                </h2>
              </Reveal>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {audience.map((item, index) => (
                <SpotlightCard
                  key={item.title}
                  delay={(index % 3) * 90}
                  className="card-elevated card-topline p-7"
                >
                  <h3 className="mb-2 font-serif text-lg font-bold text-navy">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </SpotlightCard>
              ))}

              <SpotlightCard
                dark
                delay={180}
                className="bg-ink texture-grain relative flex flex-col justify-between overflow-hidden rounded-[20px] p-7 text-white transition-transform duration-600 ease-silk hover:-translate-y-1.5"
              >
                <div className="relative">
                  <h3 className="mb-2 font-serif text-lg font-bold text-gold-light">
                    É o seu caso?
                  </h3>
                  <p className="text-sm text-slate-300">
                    Se você não se encaixou em nenhum, provavelmente ainda assim eu consigo ajudar.
                  </p>
                </div>
                <Link
                  href="/contato"
                  className="link-underline relative mt-6 text-sm font-bold text-gold-light"
                >
                  Vamos descobrir juntos
                  <span aria-hidden className="arrow-slide">
                    →
                  </span>
                </Link>
              </SpotlightCard>
            </div>
          </div>
        </section>

        <Testimonial testimonials={data.testimonials} />

        {data.caseResults && data.caseResults.length > 0 && (
          <CaseResults results={data.caseResults} />
        )}

        <Process steps={data.process} />

        {data.awards && data.awards.length > 0 && <Awards awards={data.awards} />}
        {data.courses && data.courses[0] && <CourseBanner course={data.courses[0]} />}

        <FAQ faqs={data.faqs} />
        {data.secondCta && <SecondCTA secondCta={data.secondCta} />}

        {/* Fechamento */}
        <section className="bg-ink texture-grain relative overflow-hidden py-24 text-center text-white">
          <div aria-hidden className="texture-weave-dark absolute inset-0" />
          <div
            aria-hidden
            className="aurora left-[calc(50%-190px)] top-0 h-[380px] w-[380px] bg-gold/20"
          />
          <div className="container-fw relative">
            <Reveal variant="up">
              <h2 className="mx-auto mb-4 max-w-3xl font-serif text-[2rem] font-bold leading-[1.06] md:text-[2.75rem]">
                {t('heading')}
              </h2>
            </Reveal>
            <Reveal variant="up" delay={90}>
              <p className="mx-auto mb-9 max-w-xl text-slate-300">{t('body')}</p>
            </Reveal>
            <Reveal variant="up" delay={170}>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contato" className="btn-gold">
                  {t('button')}
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
            </Reveal>
          </div>
        </section>
      </main>

      <BackToTop />
      <Footer data={data} locale={locale} />
    </>
  )
}
