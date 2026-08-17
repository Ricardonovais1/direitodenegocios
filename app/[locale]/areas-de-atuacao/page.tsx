import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import AreaFilter from '@/components/AreaFilter'
import Reveal from '@/components/motion/Reveal'
import BackToTop from '@/components/motion/BackToTop'
import { getFamilyBySlug, serviceFamilies } from '@/lib/service-details'
import { getSiteData } from '@/lib/site-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    title: 'Áreas de Atuação — Direito Empresarial, de TI e Startups',
    description:
      'Consultoria jurídica, Direito de TI, societário, trabalhista, propriedade intelectual e mais. Proteção jurídica completa para o seu negócio.',
    alternates: { canonical: `${siteUrl}/areas-de-atuacao` },
  }
}

const howItWorks = [
  {
    step: '01',
    title: 'Conversa inicial',
    description: 'Você conta o cenário. Eu escuto e mapeio o que está em jogo.',
  },
  {
    step: '02',
    title: 'Diagnóstico',
    description: 'Identifico riscos, prioridades e o caminho de menor atrito.',
  },
  {
    step: '03',
    title: 'Proposta de trabalho',
    description: 'Escopo, formato e prazo claros — pontual ou contínuo.',
  },
]

export default async function PracticeAreasPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getSiteData()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''

  // Calculado no servidor: o cliente recebe só slug → família.
  const familyBySlug = getFamilyBySlug()
  const families = serviceFamilies.filter((group) =>
    data.practiceAreas.some((area) => area.slug && familyBySlug[area.slug] === group.id),
  )

  const listedAreas = data.practiceAreas.filter((area) => area.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Áreas de atuação — Fausto Sette Câmara',
    itemListElement: listedAreas.map((area, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: area.title,
        description: area.description,
        url: `${siteUrl}/areas-de-atuacao/${area.slug}`,
      },
    })),
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
          eyebrow="Áreas de atuação"
          title="Direito de Negócios, de ponta a ponta."
          lead="Consultivo e contencioso. Estratégico, tático e com leitura de jogo. Proteção completa para o que você constrói."
          crumbs={[{ label: 'Início', href: '/' }, { label: 'Áreas de atuação' }]}
        >
          <div className="flex flex-wrap gap-4">
            <Link href="/contato" className="btn-gold">
              Falar com o Dr. Fausto
            </Link>
            <a href="#areas" className="btn-outline">
              Ver as {data.practiceAreas.length} áreas
            </a>
          </div>
        </PageHero>

        <section id="areas" className="bg-parchment texture-grain texture-grain-light relative py-20 md:py-24">
          <div className="container-fw relative">
            <AreaFilter
              areas={data.practiceAreas}
              families={families}
              familyBySlug={familyBySlug}
            />
          </div>
        </section>

        {/* Como começa o trabalho */}
        <section className="bg-white py-20 md:py-24">
          <div className="container-fw">
            <div className="mb-12 max-w-2xl">
              <Reveal variant="up">
                <p className="eyebrow mb-4">Por onde começar</p>
              </Reveal>
              <Reveal variant="up" delay={80}>
                <h2 className="font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                  Não sabe qual área é a sua? Começamos pela conversa.
                </h2>
              </Reveal>
            </div>

            <ol className="grid gap-6 md:grid-cols-3">
              {howItWorks.map((item, index) => (
                <Reveal
                  key={item.step}
                  as="li"
                  variant="up"
                  delay={index * 110}
                  className="group relative rounded-[20px] border border-black/[0.06] bg-offwhite p-7 transition-all duration-600 ease-silk hover:-translate-y-1.5 hover:border-gold/35 hover:shadow-card"
                >
                  <span className="font-semibold tabular-nums text-xs tracking-[0.22em] text-gold-ink">
                    {item.step}
                  </span>
                  <h3 className="mb-2 mt-4 font-serif text-xl font-bold text-navy">{item.title}</h3>
                  <p className="text-muted">{item.description}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal variant="up" delay={340} className="mt-12">
              <Link href="/contato" className="btn-navy">
                Marcar a conversa inicial
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
