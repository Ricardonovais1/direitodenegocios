import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import CourseCard from '@/components/CourseCard'
import Reveal from '@/components/motion/Reveal'
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
    // O sufixo "| Fausto Sette Câmara" vem do template em [locale]/layout.tsx.
    title: 'Cursos',
    description:
      'Formação prática em Direito de Negócios. Curso CCT Sindpd-SP/SeproSP disponível; jornada de trabalho e imobiliário em breve.',
    alternates: { canonical: `${siteUrl}/cursos` },
  }
}

const upcoming = [
  {
    title: 'Jornada de Trabalho — teoria e prática',
    description:
      'Da jornada padrão ao banco de horas e teletrabalho, aplicado à realidade das empresas.',
  },
  {
    title: 'Compra e venda de imóveis no Brasil — teoria e prática',
    description: 'Do contrato à escritura, sem sustos.',
  },
]

export default async function CursosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getSiteData()

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />

      <main id="main-content">
        <PageHero
          eyebrow="Cursos"
          title="Aprenda Direito de Negócios na prática — não na teoria."
          lead="Cursos criados a partir de quase 10 anos de mesa de negociação, experiência de trincheira e 15+ anos de advocacia empresarial. Conhecimento que entrega o “como fazer”."
          crumbs={[{ label: 'Início', href: '/' }, { label: 'Cursos' }]}
          compact
        />

        <section className="bg-parchment texture-grain texture-grain-light relative py-16 md:py-20">
          <div className="container-fw relative grid gap-6 md:grid-cols-2">
            {data.courses?.map((course, index) => (
              <CourseCard key={course._id} course={course} delay={index * 100} />
            ))}
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container-fw">
            <Reveal variant="up">
              <p className="eyebrow mb-4">Próximas turmas</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-10 font-serif text-3xl font-bold text-navy md:text-4xl">
                Em desenvolvimento.
              </h2>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2">
              {upcoming.map((item, index) => (
                <Reveal
                  key={item.title}
                  variant="up"
                  delay={index * 110}
                  className="group relative overflow-hidden rounded-[20px] border border-dashed border-navy/15 bg-offwhite p-7 transition-colors duration-600 hover:border-gold/50"
                >
                  <span className="inline-flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-gold-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Em breve
                  </span>
                  <h3 className="mb-1 mt-3 font-serif text-lg font-bold text-navy">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </Reveal>
              ))}
            </div>

            <Reveal variant="up" delay={220} className="mt-10">
              <Link href="/contato" className="btn-navy">
                Entrar na lista de espera
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
