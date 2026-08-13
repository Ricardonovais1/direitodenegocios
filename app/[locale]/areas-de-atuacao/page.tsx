import type { Metadata } from 'next'
import Link from 'next/link'
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
    title: 'Áreas de Atuação — Direito Empresarial, de TI e Startups',
    description:
      'Consultoria jurídica, Direito de TI, societário, trabalhista, propriedade intelectual e mais. Proteção jurídica completa para o seu negócio.',
    alternates: { canonical: `${siteUrl}/areas-de-atuacao` },
  }
}

export default async function PracticeAreasPage({
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
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Áreas de atuação</p>
            <h1 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight mb-4">
              Direito de Negócios, de ponta a ponta.
            </h1>
            <p className="text-muted text-lg">
              Consultivo e contencioso. Estratégico, tático e com leitura de jogo. Proteção completa para o que você constrói.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.practiceAreas.map((area) => (
              <article
                key={area._id}
                className="bg-white rounded-[18px] p-7 border border-[#ececec] shadow-card hover:-translate-y-1 hover:shadow-heavy transition-all flex flex-col"
              >
                <span className="text-gold font-black">{area.number}</span>
                <h2 className="font-serif text-navy text-xl font-bold my-3">{area.title}</h2>
                <p className="text-muted flex-1">{area.description}</p>
                {area.slug && (
                  <Link href={`/areas-de-atuacao/${area.slug}`} className="mt-4 text-gold text-sm font-bold hover:underline">
                    Saiba mais →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer data={data} locale={locale} />
    </>
  )
}
