import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Enter from '@/components/motion/Enter'
import Reveal from '@/components/motion/Reveal'
import Accordion from '@/components/motion/Accordion'
import SpotlightCard from '@/components/motion/SpotlightCard'
import BackToTop from '@/components/motion/BackToTop'
import { getSiteData } from '@/lib/site-data'

// [PREENCHER — link de checkout do curso]
const CHECKOUT_URL = '/contato'

const painPoints = [
  'Passivos trabalhistas que só aparecem quando o processo chega.',
  'Multas e autuações por descumprimento silencioso de cláusulas.',
  'Ações coletivas sindicais — o pior cenário, que atinge a empresa inteira de uma vez.',
  'Insegurança na tomada de decisão de RH e jurídico sobre jornada, benefícios e reajustes.',
]

const solutionPoints = [
  'Repassar a CCT cláusula por cláusula, entendendo o comando de cada norma coletiva.',
  'Interpretar a norma e conciliá-la com o Direito do Trabalho.',
  'Instrumentalizar a convenção na realidade interna da sua empresa.',
  'Prevenir passivos e blindar a empresa contra ações coletivas sindicais.',
]

const authorityPoints = [
  'Fausto Sette Câmara — advogado com 15+ anos de advocacia empresarial e de negócios.',
  'Quase 10 anos à frente da negociação coletiva sindical do Sindinfor/MG.',
  'Autor do Manual da CCT — o livro que comenta cada cláusula e explica o racional da evolução normativa.',
  'Formação em UFMG e pós-graduação em Direito Empresarial (Milton Campos).',
  'Vivência prática nas áreas trabalhista, empresarial e de TI.',
]

const benefits = [
  {
    feature: 'Cláusula por cláusula',
    benefit: 'Nenhuma cláusula passa despercebida — você vê o comando exato de cada uma.',
  },
  {
    feature: 'Foco no “como fazer”',
    benefit: 'Você não só entende a norma: sabe aplicá-la na sua rotina.',
  },
  {
    feature: 'Conciliação com o Direito do Trabalho',
    benefit: 'Fim da insegurança entre o que a CCT manda e o que a CLT exige.',
  },
  {
    feature: 'Manual da CCT incluso',
    benefit: 'Um guia de consulta permanente no seu dia a dia.',
  },
  {
    feature: 'Visão de quem negociou',
    benefit: 'Entenda o porquê de cada cláusula — e como ela evoluiu.',
  },
  {
    feature: 'Foco em redução de passivo',
    benefit: 'Menos multas, menos processos, menos ações coletivas.',
  },
]

export async function generateStaticParams() {
  const data = await getSiteData()
  return (data.courses ?? []).filter((course) => course.slug).map((course) => ({ slug: course.slug! }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = await getSiteData()
  const course = data.courses?.find((item) => item.slug === slug)
  if (!course) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    title: course.headline ?? course.title,
    description: course.shortDescription ?? course.subheadline,
    alternates: { canonical: `${siteUrl}/cursos/${slug}` },
  }
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const data = await getSiteData()
  const course = data.courses?.find((item) => item.slug === slug)

  if (!course) notFound()

  const testimonials = data.testimonials.slice(0, 2)

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />

      <main id="main-content">
        {/* Abertura */}
        <div className="bg-ink texture-grain relative overflow-hidden py-20 text-white md:py-28">
          <div aria-hidden className="texture-weave-dark absolute inset-0" />
          <div
            aria-hidden
            className="aurora left-[calc(50%-230px)] -top-32 h-[460px] w-[460px] bg-gold/20"
          />

          <div className="container-fw relative max-w-3xl text-center">
            {course.eyebrow && (
              <Enter variant="fade">
                <p className="mb-5 text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold-light">
                  {course.eyebrow}
                </p>
              </Enter>
            )}
            <Enter variant="blur" delay={60}>
              <h1 className="mb-5 font-serif text-[2.4rem] font-bold leading-[1.06] sm:text-5xl md:text-[3.4rem]">
                {course.headline ?? course.title}
              </h1>
            </Enter>
            {course.subheadline && (
              <Enter delay={140}>
                <p className="mb-9 text-lg text-slate-300 md:text-xl">{course.subheadline}</p>
              </Enter>
            )}
            <Enter delay={200}>
              <a href={CHECKOUT_URL} className="btn-gold min-h-[54px] px-9 text-base">
                Quero dominar a CCT agora
              </a>
              <p className="mt-5 text-xs text-slate-400">
                +10 mil empresas alcançadas pela norma · quase 100 mil empregados · instrutor com
                quase 10 anos de negociação sindical
              </p>
            </Enter>
          </div>
        </div>

        {/* O problema */}
        <section className="bg-white py-20">
          <div className="container-fw max-w-3xl">
            <Reveal variant="up">
              <p className="eyebrow mb-4">O problema</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-5 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                A sua empresa aplica a CCT todos os dias. Mas você entende o que ela realmente manda?
              </h2>
            </Reveal>
            <Reveal variant="up" delay={130}>
              <p className="mb-8 text-lg text-muted">
                A CCT Sindpd-SP/SeproSP é de observância obrigatória para empresas de TI. São mais de
                10 mil empresas e quase 100 mil empregados sob suas regras — e, na prática, a maioria
                dos operadores aplica a convenção sem conhecer a fundo a norma que executa
                diariamente. Esse desconhecimento é o que gera:
              </p>
            </Reveal>

            <ul className="mb-8 grid gap-3">
              {painPoints.map((point, index) => (
                <Reveal
                  key={point}
                  as="li"
                  variant="up"
                  delay={index * 80}
                  className="flex items-start gap-3.5 rounded-2xl border border-black/[0.06] bg-offwhite p-5 text-[#1f2933]"
                >
                  <span aria-hidden className="mt-0.5 font-black text-red-500/70">
                    ✕
                  </span>
                  <span>{point}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal variant="up">
              <p className="border-l-2 border-gold py-1 pl-5 font-bold text-navy">
                O gargalo não é a falta de boa vontade. É a falta de domínio da norma. E é exatamente
                esse domínio que este curso entrega.
              </p>
            </Reveal>
          </div>
        </section>

        {/* A solução */}
        <section className="bg-parchment texture-grain texture-grain-light relative py-20">
          <div className="container-fw relative max-w-3xl">
            <Reveal variant="up">
              <p className="eyebrow mb-4">A solução</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-5 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                Aprenda a aplicar a CCT cláusula por cláusula — com o “como fazer”.
              </h2>
            </Reveal>
            <Reveal variant="up" delay={130}>
              <p className="mb-8 text-lg text-muted">
                Este curso nasce de quase 10 anos de negociação coletiva sindical à frente do
                Sindinfor/MG. Não é teoria de doutrina: é a experiência de quem sentou à mesa,
                negociou as cláusulas e viu, do outro lado, os erros que as empresas cometem ao
                aplicá-las.
              </p>
            </Reveal>

            <ul className="mb-10 grid gap-3">
              {solutionPoints.map((point, index) => (
                <Reveal
                  key={point}
                  as="li"
                  variant="up"
                  delay={index * 80}
                  className="flex items-start gap-3.5 rounded-2xl bg-white p-5 text-[#1f2933] shadow-card"
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
                  <span>{point}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal variant="up">
              <a href={CHECKOUT_URL} className="btn-navy">
                Quero essa segurança
                <span aria-hidden className="arrow-slide">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Quem ensina */}
        <section className="bg-white py-20">
          <div className="container-fw max-w-3xl">
            <Reveal variant="up">
              <p className="eyebrow mb-4">Quem ensina</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-8 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                Quem ensina viveu isso na mesa de negociação.
              </h2>
            </Reveal>
            <ul className="grid gap-3">
              {authorityPoints.map((point, index) => (
                <Reveal
                  key={point}
                  as="li"
                  variant="up"
                  delay={index * 70}
                  className="flex items-start gap-3.5 text-[#1f2933]"
                >
                  <span aria-hidden className="mt-1 text-gold">
                    ▸
                  </span>
                  <span>{point}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="bg-ink texture-grain relative overflow-hidden py-20">
          <div aria-hidden className="texture-weave-dark absolute inset-0" />
          <div className="container-fw relative max-w-3xl">
            <Reveal variant="up">
              <p className="eyebrow mb-4">Diferenciais</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-10 font-serif text-[2rem] font-bold leading-[1.06] text-white md:text-[2.75rem]">
                Mais do que conteúdo: um resultado no seu dia a dia.
              </h2>
            </Reveal>

            <div className="grid gap-3">
              {benefits.map((item, index) => (
                <Reveal
                  key={item.feature}
                  variant="up"
                  delay={index * 70}
                  className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-600 hover:border-gold/35 hover:bg-white/[0.07] md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-6"
                >
                  <p className="font-bold text-gold-light">{item.feature}</p>
                  <p className="text-sm text-slate-300">{item.benefit}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Conteúdo programático */}
        <section className="bg-white py-20">
          <div className="container-fw max-w-3xl">
            <Reveal variant="up">
              <p className="eyebrow mb-4">Conteúdo programático</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-10 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                O que você vai dominar.
              </h2>
            </Reveal>

            <div className="grid gap-4">
              {course.modules?.map((module, index) => (
                <SpotlightCard
                  key={module.title}
                  delay={(index % 4) * 70}
                  className="card-elevated flex gap-5 p-5"
                >
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 font-black text-gold-ink"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="mb-1 font-serif font-bold text-navy">{module.title}</h3>
                    <p className="text-sm text-muted">{module.description}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* Prova social */}
        {testimonials.length > 0 && (
          <section className="bg-parchment texture-grain texture-grain-light relative py-20">
            <div className="container-fw relative max-w-3xl">
              <Reveal variant="up">
                <p className="eyebrow mb-4">Prova social</p>
              </Reveal>
              <Reveal variant="up" delay={70}>
                <h2 className="mb-10 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                  Quem confia, recomenda.
                </h2>
              </Reveal>

              <div className="grid gap-5 md:grid-cols-2">
                {testimonials.map((item, index) => (
                  <SpotlightCard
                    key={item._id}
                    as="figure"
                    delay={index * 100}
                    className="card-elevated p-7"
                  >
                    <span aria-hidden className="font-serif text-4xl leading-none text-gold/30">
                      &ldquo;
                    </span>
                    <blockquote className="-mt-2 mb-5 text-sm leading-relaxed text-muted">
                      {item.quote}
                    </blockquote>
                    <figcaption className="border-t border-black/[0.06] pt-4">
                      <p className="font-bold text-navy">{item.name}</p>
                      <p className="text-xs text-slate-400">
                        {item.role}, {item.company}
                      </p>
                    </figcaption>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Oferta */}
        <section className="bg-ink texture-grain relative overflow-hidden py-20">
          <div aria-hidden className="texture-weave-dark absolute inset-0" />
          <div
            aria-hidden
            className="aurora left-[calc(50%-190px)] top-0 h-[380px] w-[380px] bg-gold/20"
          />
          <div className="container-fw relative max-w-2xl text-center">
            <Reveal variant="up">
              <p className="eyebrow mb-4 justify-center">Oferta</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-8 font-serif text-[2rem] font-bold leading-[1.06] text-white md:text-[2.75rem]">
                O que você recebe ao se inscrever.
              </h2>
            </Reveal>

            <Reveal variant="up" delay={130}>
              <ul className="mx-auto mb-9 grid max-w-xl gap-3 text-left text-slate-200">
                {[
                  'Acesso completo ao curso, cláusula por cláusula.',
                  `BÔNUS — ${course.bonus}`,
                  'Material de apoio para aplicar a norma no dia a dia.',
                  '[PREENCHER — certificado de conclusão e carga horária]',
                  '[PREENCHER — acesso vitalício / por X meses]',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="mt-0.5 font-black text-gold-light">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="up" delay={190}>
              <p className="mb-6 font-serif text-2xl font-bold text-gold-light">
                Investimento: {course.price}
              </p>
              <a href={CHECKOUT_URL} className="btn-gold min-h-[54px] px-10 text-base">
                Garantir minha vaga
              </a>
            </Reveal>
          </div>
        </section>

        {/* Garantia */}
        <section className="bg-white py-20">
          <div className="container-fw max-w-2xl text-center">
            <Reveal variant="up">
              <p className="eyebrow mb-4 justify-center">Garantia</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-4 font-serif text-3xl font-bold text-navy">Risco zero para você.</h2>
            </Reveal>
            <Reveal variant="up" delay={130}>
              <p className="text-lg text-muted">{course.guarantee}</p>
            </Reveal>
          </div>
        </section>

        {/* Perguntas frequentes */}
        {course.faqs && course.faqs.length > 0 && (
          <section className="bg-parchment texture-grain texture-grain-light relative py-20">
            <div className="container-fw relative max-w-3xl">
              <Reveal variant="up">
                <p className="eyebrow mb-4">Dúvidas frequentes</p>
              </Reveal>
              <Reveal variant="up" delay={70}>
                <h2 className="mb-10 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                  Perguntas frequentes.
                </h2>
              </Reveal>
              <Reveal variant="up" delay={130}>
                <Accordion
                  defaultOpen={-1}
                  items={course.faqs.map((faq, index) => ({
                    id: `${slug}-faq-${index}`,
                    question: faq.question,
                    answer: faq.answer,
                  }))}
                />
              </Reveal>
            </div>
          </section>
        )}

        {/* Fechamento */}
        <section className="bg-ink texture-grain relative overflow-hidden py-20 text-center text-white">
          <div aria-hidden className="texture-weave-dark absolute inset-0" />
          <div className="container-fw relative max-w-3xl">
            <Reveal variant="up">
              <h2 className="mb-5 font-serif text-[2rem] font-bold leading-[1.06] md:text-[2.75rem]">
                A CCT já é obrigatória para a sua empresa. O que está em jogo é quanto ela vai custar
                — em multa ou em segurança.
              </h2>
            </Reveal>
            <Reveal variant="up" delay={90}>
              <p className="mb-9 text-slate-300">
                Daqui a 30 dias, sua equipe pode continuar aplicando a convenção no escuro — ou
                dominá-la cláusula por cláusula e dormir tranquila. A escolha é sua.
              </p>
            </Reveal>
            <Reveal variant="up" delay={160}>
              <a href={CHECKOUT_URL} className="btn-gold min-h-[54px] px-10 text-base">
                Quero dominar a CCT e eliminar passivos
              </a>
              <p className="mt-5 text-xs text-slate-400">
                Garantia de [X] dias · Acesso imediato · Manual da CCT incluso
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <BackToTop />
      <Footer data={data} locale={locale} />
    </>
  )
}
