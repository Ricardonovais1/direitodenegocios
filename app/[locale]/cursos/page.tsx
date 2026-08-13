import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CourseCard from '@/components/CourseCard'
import { getSiteData } from '@/lib/site-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    title: 'Cursos — Fausto Sette Câmara',
    description:
      'Formação prática em Direito de Negócios. Curso CCT Sindpd-SP/SeproSP disponível; jornada de trabalho e imobiliário em breve.',
    alternates: { canonical: `${siteUrl}/cursos` },
  }
}

const upcoming = [
  {
    title: 'Jornada de Trabalho — teoria e prática',
    description: 'Da jornada padrão ao banco de horas e teletrabalho, aplicado à realidade das empresas.',
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
      <main id="main-content" className="py-20">
        <div className="container-fw">
          <div className="max-w-2xl mb-12">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Cursos</p>
            <h1 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight mb-4">
              Aprenda Direito de Negócios na prática — não na teoria.
            </h1>
            <p className="text-muted text-lg">
              Cursos criados a partir de quase 10 anos de mesa de negociação, experiência de trincheira e 15+ anos de advocacia empresarial. Conhecimento que te entrega o “como fazer”.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {data.courses?.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>

          <div className="mt-16">
            <h2 className="font-serif text-navy text-2xl font-bold mb-6">Em breve</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {upcoming.map((u) => (
                <div key={u.title} className="bg-offwhite rounded-[18px] p-6 border border-[#ececec]">
                  <span className="text-gold text-xs font-black uppercase tracking-wider">Em breve</span>
                  <h3 className="font-serif text-navy text-lg font-bold mt-2 mb-1">{u.title}</h3>
                  <p className="text-muted text-sm">{u.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/contato"
                className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-navy text-navy font-extrabold hover:bg-navy hover:text-white transition-colors"
              >
                Entrar na lista de espera
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer data={data} locale={locale} />
    </>
  )
}
