import type { Metadata } from 'next'
import { getSiteData } from '@/lib/site-data'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
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
import { getTranslations } from 'next-intl/server'

const audience = [
  { title: 'Empresas de tecnologia e TI', description: 'Que vivem sob convenções coletivas e contratos de alta complexidade.' },
  { title: 'Startups e fundadores', description: 'Que precisam de estrutura jurídica do primeiro aporte à escala.' },
  { title: 'Empresários e investidores', description: 'Que querem crescer sem transformar risco em surpresa.' },
  { title: 'Departamentos jurídicos e RH', description: 'Que aplicam normas coletivas no dia a dia e precisam de segurança.' },
  { title: 'Profissionais e cidadãos', description: 'Que precisam de um caminho claro em meio à burocracia.' },
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
    knowsAbout: data.practiceAreas.map((a) => a.title),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />
      <main id="main-content">
        <Hero hero={data.hero} phone={data.phone} />
        <About about={data.about} />
        <PracticeAreas areas={data.practiceAreas} locale={locale} />
        <Stats stats={data.stats} />

        <section className="py-20 bg-offwhite">
          <div className="container-fw">
            <div className="max-w-2xl mb-10">
              <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Para quem eu trabalho</p>
              <h2 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight">Para quem faz negócios de verdade.</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {audience.map((item) => (
                <div key={item.title} className="bg-white rounded-[18px] p-6 border border-[#ececec] shadow-card">
                  <h3 className="font-serif text-navy text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonial testimonials={data.testimonials} />

        {data.caseResults && data.caseResults.length > 0 && (
          <CaseResults results={data.caseResults} />
        )}
        <Process steps={data.process} />
        {data.awards && data.awards.length > 0 && (
          <Awards awards={data.awards} />
        )}
        {data.courses && data.courses[0] && (
          <CourseBanner course={data.courses[0]} />
        )}
        <FAQ faqs={data.faqs} />
        {data.secondCta && <SecondCTA secondCta={data.secondCta} />}

        <section className="py-20 text-center text-white bg-navy-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.2),transparent_50%)]" />
          <div className="container-fw relative">
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto mb-4">
              {t('heading')}
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8">{t('body')}</p>
            <a
              href="/contato"
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 rounded-full bg-gold text-gray-900 font-extrabold hover:bg-gold-light transition-colors"
            >
              {t('button')}
            </a>
          </div>
        </section>
      </main>
      <Footer data={data} locale={locale} />
    </>
  )
}
