import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Enter from '@/components/motion/Enter'
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
    // O sufixo "| Fausto Sette Câmara" vem do template em [locale]/layout.tsx.
    title: 'Sobre',
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
    description:
      'Monografia em Direito Tributário: “Direito Tributário à Luz do Princípio do Poluidor Pagador”.',
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
  {
    title: 'Visão de negócio, não só jurídica',
    description: 'Falo a língua do empresário, não o juridiquês do cartório.',
  },
  {
    title: 'Experiência de trincheira',
    description: 'Fui oficial de justiça antes de advogar; conheço o sistema por dentro.',
  },
  {
    title: 'Vivência sindical real',
    description: 'Quase 10 anos negociando convenções coletivas de TI na prática.',
  },
  {
    title: 'Atendimento direto e claro',
    description: 'Você entende o risco, o caminho e a decisão.',
  },
  {
    title: 'Estratégia, tática e leitura de jogo',
    description: 'O tripé que transforma Direito em vantagem competitiva.',
  },
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
        {/* Abertura */}
        <div className="bg-ink texture-grain relative overflow-hidden py-20 text-white md:py-28">
          <div aria-hidden className="texture-weave-dark absolute inset-0" />
          <div aria-hidden className="aurora -right-20 -top-24 h-[400px] w-[400px] bg-gold/15" />

          <div className="container-fw relative grid items-center gap-12 md:grid-cols-[0.4fr_0.6fr]">
            <Enter variant="scale" className="relative mx-auto w-fit md:mx-0">
              <span aria-hidden className="absolute -inset-3 rounded-full border border-gold/30" />
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-gold/50 md:h-56 md:w-56">
                <Image
                  src="/images/fausto.webp"
                  alt="Retrato de Fausto Sette Câmara"
                  fill
                  sizes="224px"
                  className="object-cover"
                  priority
                />
              </div>
            </Enter>

            <div>
              <Enter>
                <p className="eyebrow mb-5 !text-gold-light">Sobre mim</p>
              </Enter>
              <Enter variant="blur" delay={70}>
                <h1 className="mb-5 font-serif text-[2.4rem] font-bold leading-[1.06] md:text-[3.4rem]">
                  Eu entendo o sistema. E te ajudo a vencê-lo.
                </h1>
              </Enter>
              <Enter delay={140}>
                <p className="max-w-xl text-lg text-slate-300">
                  Mais de 15 anos dentro da advocacia empresarial e de negócios, aprendendo — na
                  prática — o que funciona, o que trava e o que faz a diferença.
                </p>
              </Enter>
            </div>
          </div>
        </div>

        {/* A história */}
        <section className="bg-white py-20 md:py-24">
          <div className="container-fw max-w-3xl">
            <Reveal variant="up">
              <p className="eyebrow mb-6">A história</p>
            </Reveal>

            <div className="space-y-6 text-lg leading-relaxed text-[#1f2933]">
              <Reveal variant="up" delay={60}>
                <p>
                  O Direito de Negócios nasceu da experiência de mais de 15 anos com a advocacia
                  empresarial e de negócios. Depois de labutar muito nessa área — ajudando empresas,
                  empresários e cidadãos a navegar nas tortuosas águas brasileiras —, entendi uma
                  coisa que nenhum banco de faculdade ensina:
                </p>
              </Reveal>

              <Reveal variant="up" delay={120}>
                <p className="border-l-2 border-gold py-2 pl-6 font-serif text-2xl font-bold leading-snug text-navy md:text-[2rem]">
                  Nem sempre conhecimento técnico é o que basta.
                </p>
              </Reveal>

              <Reveal variant="up" delay={180}>
                <p>
                  É preciso de <strong>estratégia</strong> (o plano de longo prazo),{' '}
                  <strong>tática</strong> (o como fazer no curto prazo) e{' '}
                  <strong>leitura de jogo</strong> (a capacidade de superar os entraves que o sistema
                  brasileiro organiza, em forma de ineficiência, em favor do estado).
                </p>
              </Reveal>

              <Reveal variant="up" delay={230}>
                <p>
                  Minha missão é ajudar empresas, empresários, cidadãos e profissionais a fazer
                  negócios com mais eficiência e menor risco.
                </p>
              </Reveal>

              <Reveal variant="up" delay={280}>
                <p>
                  Este projeto nasce da pretensão de transformar essa luta inglória contra um sistema
                  caótico em uma <strong>jornada palatável e vitoriosa</strong> — entregando às
                  pessoas o conhecimento e os caminhos que a experiência me ensinou.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Trajetória — linha do tempo */}
        <section className="bg-parchment texture-grain texture-grain-light relative py-20 md:py-24">
          <div className="container-fw relative">
            <div className="mb-14 max-w-2xl">
              <Reveal variant="up">
                <p className="eyebrow mb-4">Trajetória</p>
              </Reveal>
              <Reveal variant="up" delay={80}>
                <h2 className="font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                  Do TJMG à mesa de negociação.
                </h2>
              </Reveal>
            </div>

            <ol className="relative ml-1 border-l border-gold/25 pl-8 md:ml-4 md:pl-12">
              {timeline.map((item, index) => (
                <Reveal
                  key={item.period}
                  as="li"
                  variant="up"
                  // Escalonamento curto: em listas longas, esperar 6 passos
                  // deixaria a página vazia para quem rola rápido.
                  delay={Math.min(index, 3) * 70}
                  className="group relative pb-10 last:pb-0"
                >
                  <span
                    aria-hidden
                    className="absolute left-[calc(-2rem-5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-gold bg-parchment transition-all duration-600 ease-silk group-hover:scale-150 group-hover:bg-gold md:left-[calc(-3rem-5px)]"
                  />
                  <p className="mb-1.5 text-xs font-black uppercase tracking-[0.18em] text-gold-ink">
                    {item.period}
                  </p>
                  <h3 className="mb-1.5 font-serif text-xl font-bold text-navy">{item.title}</h3>
                  <p className="max-w-xl text-muted">{item.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Por que eu */}
        <section className="bg-white py-20 md:py-24">
          <div className="container-fw">
            <div className="mb-12 max-w-2xl">
              <Reveal variant="up">
                <p className="eyebrow mb-4">Por que eu</p>
              </Reveal>
              <Reveal variant="up" delay={80}>
                <h2 className="font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                  O que você leva ao trabalhar comigo.
                </h2>
              </Reveal>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <SpotlightCard
                  key={reason.title}
                  delay={(index % 2) * 90}
                  className="card-elevated flex gap-5 p-6"
                >
                  <span
                    aria-hidden
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 font-black text-gold"
                  >
                    ✓
                  </span>
                  <div>
                    <h3 className="mb-1 font-bold text-navy">{reason.title}</h3>
                    <p className="text-sm text-muted">{reason.description}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimento em destaque */}
        <section className="bg-parchment texture-grain texture-grain-light relative py-20 md:py-24">
          <div className="container-fw relative max-w-3xl">
            <Reveal
              variant="scale"
              className="bg-ink texture-grain relative overflow-hidden rounded-[28px] p-10 text-white shadow-heavy md:p-14"
            >
              <div aria-hidden className="texture-weave-dark absolute inset-0" />
              <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-10 font-serif text-[10rem] leading-none text-gold/10"
              >
                &rdquo;
              </span>
              <blockquote className="relative mb-6 font-serif text-2xl leading-snug md:text-[1.9rem]">
                Gostaria de expressar meu mais profundo agradecimento e admiração pelo trabalho
                excepcional do Dr. Fausto. (…) Sou imensamente grata pelo apoio e pelos resultados
                alcançados graças ao seu empenho incansável e sua responsabilidade técnica em
                construir o meu caminho para todos!
              </blockquote>
              <p className="relative text-sm text-slate-400">
                — Camila Guimarães, Gente e Gestão, Mereo, Belo Horizonte/MG
              </p>
            </Reveal>

            <Reveal variant="up" delay={140} className="mt-12 text-center">
              <Link href="/contato" className="btn-navy">
                Vamos conversar?
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
