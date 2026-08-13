import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
    title: 'Sobre — Fausto Sette Câmara',
    description:
      'Conheça a trajetória de Fausto Sette Câmara: UFMG, 15+ anos de advocacia empresarial e quase 10 anos de negociação sindical à frente do Sindinfor/MG.',
    alternates: { canonical: `${siteUrl}/sobre` },
  }
}

const timeline = [
  {
    period: '2005–2008',
    title: 'Oficial de Justiça — TJMG',
    description: 'A trincheira onde aprendi, na prática, como o sistema opera por dentro.',
  },
  {
    period: '2008',
    title: 'Graduação em Direito — UFMG',
    description: 'Monografia em Direito Tributário: “Direito Tributário à Luz do Princípio do Poluidor Pagador”.',
  },
  {
    period: '2009',
    title: 'Pós-graduação em Direito Empresarial',
    description: 'Faculdade de Direito Milton Campos.',
  },
  {
    period: 'Desde então',
    title: '15+ anos de advocacia empresarial',
    description: 'Atuação nas áreas cível, trabalhista e empresarial, no consultivo e no contencioso.',
  },
  {
    period: 'Quase 10 anos',
    title: 'Negociação coletiva — Sindinfor/MG',
    description: 'À frente da mesa de negociação das convenções coletivas de TI.',
  },
  {
    period: 'Hoje',
    title: 'Sócio fundador — Belo Horizonte/MG',
    description: 'Atuação nacional a partir de Belo Horizonte.',
  },
]

const reasons = [
  { title: 'Visão de negócio, não só jurídica', description: 'Falo a língua do empresário, não o juridiquês do cartório.' },
  { title: 'Experiência de trincheira', description: 'Fui oficial de justiça antes de advogar; conheço o sistema por dentro.' },
  { title: 'Vivência sindical real', description: 'Quase 10 anos negociando convenções coletivas de TI na prática.' },
  { title: 'Atendimento direto e claro', description: 'Você entende o risco, o caminho e a decisão.' },
  { title: 'Estratégia, tática e leitura de jogo', description: 'O tripé que transforma Direito em vantagem competitiva.' },
]

export default async function SobrePage({
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
        {/* Hero */}
        <div
          className="py-20 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(110deg, rgba(9,20,34,0.96), rgba(15,31,51,0.86)), #0f1f33' }}
        >
          <div className="container-fw max-w-3xl">
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-gold/40 mb-6">
              <Image src="/images/fausto.webp" alt="Fausto Sette Câmara" fill sizes="144px" className="object-cover" />
            </div>
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-4">Sobre mim</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4">
              Eu entendo o sistema. E te ajudo a vencê-lo.
            </h1>
            <p className="text-slate-300 text-lg">
              Mais de 15 anos dentro da advocacia empresarial e de negócios, aprendendo — na prática — o que funciona, o que trava e o que faz a diferença.
            </p>
          </div>
        </div>

        {/* A história */}
        <section className="py-20">
          <div className="container-fw max-w-3xl">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">A história</p>
            <div className="space-y-5 text-lg text-[#1f2933] leading-relaxed">
              <p>
                O Direito de Negócios nasceu da experiência de mais de 15 anos com a advocacia empresarial e de negócios. Depois de labutar muito nessa área — ajudando empresas, empresários e cidadãos a navegar nas tortuosas águas brasileiras —, entendi uma coisa que nenhum banco de faculdade ensina:
              </p>
              <p className="font-serif text-navy text-2xl font-bold">Nem sempre conhecimento técnico é o que basta.</p>
              <p>
                É preciso de <strong>estratégia</strong> (o plano de longo prazo), <strong>tática</strong> (o como fazer no curto prazo) e <strong>leitura de jogo</strong> (a capacidade de superar os entraves que o sistema brasileiro organiza, em forma de ineficiência, em favor do estado).
              </p>
              <p>
                Minha missão é ajudar empresas, empresários, cidadãos e profissionais a fazer negócios com mais eficiência e menor risco.
              </p>
              <p>
                Este projeto nasce da pretensão de transformar essa luta inglória contra um sistema caótico em uma <strong>jornada palatável e vitoriosa</strong> — entregando às pessoas o conhecimento e os caminhos que a experiência me ensinou.
              </p>
            </div>
          </div>
        </section>

        {/* Trajetória */}
        <section className="py-20 bg-offwhite">
          <div className="container-fw">
            <div className="max-w-2xl mb-10">
              <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Trajetória</p>
              <h2 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight">Do TJMG à mesa de negociação.</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {timeline.map((item) => (
                <div key={item.period} className="bg-white rounded-[18px] p-6 border-t-4 border-gold shadow-card">
                  <p className="text-gold font-black text-sm uppercase tracking-wider mb-2">{item.period}</p>
                  <h3 className="font-serif text-navy text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Por que eu */}
        <section className="py-20">
          <div className="container-fw">
            <div className="max-w-2xl mb-10">
              <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Por que eu</p>
              <h2 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight">O que você leva ao trabalhar comigo.</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {reasons.map((r) => (
                <div key={r.title} className="flex gap-4 bg-white rounded-[18px] p-6 border border-[#ececec] shadow-card">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-gold/20 flex items-center justify-center text-gold font-black">✓</div>
                  <div>
                    <h3 className="text-navy font-bold mb-1">{r.title}</h3>
                    <p className="text-muted text-sm">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimento pessoal */}
        <section className="py-20 bg-white">
          <div className="container-fw max-w-3xl">
            <div
              className="rounded-[32px] p-10 md:p-14 text-white shadow-heavy"
              style={{ background: 'linear-gradient(135deg, #0f1f33, #172f4d)' }}
            >
              <blockquote className="font-serif text-2xl md:text-3xl leading-snug mb-5">
                “Gostaria de expressar meu mais profundo agradecimento e admiração pelo trabalho excepcional do Dr. Fausto. (...) Sou imensamente grata pelo apoio e pelos resultados alcançados graças ao seu empenho incansável e sua responsabilidade técnica em construir o meu caminho para todos!”
              </blockquote>
              <p className="text-slate-300 text-sm">— Camila Guimarães, Gente e Gestão, Mereo, Belo Horizonte/MG</p>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/contato"
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-gold text-gray-900 font-extrabold hover:bg-gold-light transition-colors"
              >
                Vamos conversar?
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer data={data} locale={locale} />
    </>
  )
}
