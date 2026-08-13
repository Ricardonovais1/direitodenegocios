import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
  { feature: 'Cláusula por cláusula', benefit: 'Nenhuma cláusula passa despercebida — você vê o comando exato de cada uma.' },
  { feature: 'Foco no “como fazer”', benefit: 'Você não só entende a norma: sabe aplicá-la na sua rotina.' },
  { feature: 'Conciliação com o Direito do Trabalho', benefit: 'Fim da insegurança entre o que a CCT manda e o que a CLT exige.' },
  { feature: 'Manual da CCT incluso', benefit: 'Um guia de consulta permanente no seu dia a dia.' },
  { feature: 'Visão de quem negociou', benefit: 'Entenda o porquê de cada cláusula — e como ela evoluiu.' },
  { feature: 'Foco em redução de passivo', benefit: 'Menos multas, menos processos, menos ações coletivas.' },
]

export async function generateStaticParams() {
  const data = await getSiteData()
  return (data.courses ?? []).filter((c) => c.slug).map((c) => ({ slug: c.slug! }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = await getSiteData()
  const course = data.courses?.find((c) => c.slug === slug)
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
  const course = data.courses?.find((c) => c.slug === slug)

  if (!course) notFound()

  const testimonials = data.testimonials.slice(0, 2)

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />
      <main id="main-content">
        {/* Headline */}
        <div
          className="py-20 md:py-28 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(110deg, rgba(9,20,34,0.97), rgba(15,31,51,0.9)), radial-gradient(circle at top right, rgba(201,164,92,0.28), transparent 40%), #0f1f33' }}
        >
          <div className="container-fw max-w-3xl text-center">
            {course.eyebrow && (
              <p className="text-gold uppercase tracking-widest text-xs font-black mb-4">{course.eyebrow}</p>
            )}
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[1.05] mb-5">
              {course.headline ?? course.title}
            </h1>
            {course.subheadline && (
              <p className="text-slate-300 text-lg md:text-xl mb-8">{course.subheadline}</p>
            )}
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center justify-center min-h-[52px] px-8 rounded-full bg-gold text-gray-900 font-extrabold text-lg hover:bg-gold-light transition-colors"
            >
              Quero dominar a CCT agora
            </a>
            <p className="text-slate-400 text-xs mt-4">
              +10 mil empresas alcançadas pela norma · quase 100 mil empregados · instrutor com quase 10 anos de negociação sindical
            </p>
          </div>
        </div>

        {/* Dor */}
        <section className="py-20">
          <div className="container-fw max-w-3xl">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">O problema</p>
            <h2 className="font-serif text-navy text-3xl md:text-4xl font-bold leading-tight mb-4">
              A sua empresa aplica a CCT todos os dias. Mas você entende o que ela realmente manda?
            </h2>
            <p className="text-muted text-lg mb-6">
              A CCT Sindpd-SP/SeproSP é de observância obrigatória para empresas de TI. São mais de 10 mil empresas e quase 100 mil empregados sob suas regras — e, na prática, a maioria dos operadores aplica a convenção sem conhecer a fundo a norma que executa diariamente. Esse desconhecimento é o que gera:
            </p>
            <ul className="space-y-3 mb-6">
              {painPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[#1f2933]">
                  <span className="text-gold font-black mt-0.5">✕</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="text-navy font-bold">
              O gargalo não é a falta de boa vontade. É a falta de domínio da norma. E é exatamente esse domínio que este curso entrega.
            </p>
          </div>
        </section>

        {/* Solução */}
        <section className="py-20 bg-offwhite">
          <div className="container-fw max-w-3xl">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">A solução</p>
            <h2 className="font-serif text-navy text-3xl md:text-4xl font-bold leading-tight mb-4">
              Aprenda a aplicar a CCT cláusula por cláusula — com o “como fazer”.
            </h2>
            <p className="text-muted text-lg mb-6">
              Este curso nasce de quase 10 anos de negociação coletiva sindical à frente do Sindinfor/MG. Não é teoria de doutrina: é a experiência de quem sentou à mesa, negociou as cláusulas e viu, do outro lado, os erros que as empresas cometem ao aplicá-las.
            </p>
            <ul className="space-y-3 mb-8">
              {solutionPoints.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[#1f2933]">
                  <span className="text-gold font-black mt-0.5">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-gold text-gray-900 font-extrabold hover:bg-gold-light transition-colors"
            >
              Quero essa segurança
            </a>
          </div>
        </section>

        {/* Autoridade */}
        <section className="py-20">
          <div className="container-fw max-w-3xl">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Quem ensina</p>
            <h2 className="font-serif text-navy text-3xl md:text-4xl font-bold leading-tight mb-6">
              Quem ensina viveu isso na mesa de negociação.
            </h2>
            <ul className="space-y-3">
              {authorityPoints.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[#1f2933]">
                  <span className="text-gold font-black mt-0.5">▸</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20 bg-navy">
          <div className="container-fw max-w-3xl">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Diferenciais</p>
            <h2 className="font-serif text-white text-3xl md:text-4xl font-bold leading-tight mb-8">
              Mais do que conteúdo: um resultado no seu dia a dia.
            </h2>
            <div className="overflow-hidden rounded-[18px] border border-white/10">
              {benefits.map((b, i) => (
                <div
                  key={b.feature}
                  className={`grid md:grid-cols-2 gap-2 p-5 ${i % 2 === 0 ? 'bg-navy-soft' : 'bg-navy'}`}
                >
                  <p className="text-gold-light font-bold">{b.feature}</p>
                  <p className="text-slate-300 text-sm">{b.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Módulos */}
        <section className="py-20">
          <div className="container-fw max-w-3xl">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Conteúdo programático</p>
            <h2 className="font-serif text-navy text-3xl md:text-4xl font-bold leading-tight mb-8">O que você vai dominar.</h2>
            <div className="grid gap-4">
              {course.modules?.map((m, i) => (
                <div key={m.title} className="flex gap-4 bg-white rounded-[18px] p-5 border border-[#ececec] shadow-card">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-gold/20 text-gold font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-navy font-bold mb-1">{m.title}</h3>
                    <p className="text-muted text-sm">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prova social */}
        {testimonials.length > 0 && (
          <section className="py-20 bg-offwhite">
            <div className="container-fw max-w-3xl">
              <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Prova social</p>
              <h2 className="font-serif text-navy text-3xl md:text-4xl font-bold leading-tight mb-8">Quem confia, recomenda.</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {testimonials.map((t) => (
                  <figure key={t._id} className="bg-white rounded-[18px] p-6 border border-[#ececec] shadow-card">
                    <blockquote className="text-muted text-sm leading-relaxed mb-4">“{t.quote}”</blockquote>
                    <figcaption>
                      <p className="text-navy font-bold">{t.name}</p>
                      <p className="text-slate-400 text-xs">{t.role}, {t.company}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Oferta */}
        <section className="py-20 bg-navy">
          <div className="container-fw max-w-2xl text-center">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Oferta</p>
            <h2 className="font-serif text-white text-3xl md:text-4xl font-bold leading-tight mb-6">
              O que você recebe ao se inscrever.
            </h2>
            <ul className="text-left text-slate-200 space-y-3 mb-8 max-w-xl mx-auto">
              <li className="flex items-start gap-3"><span className="text-gold-light font-black">✓</span> Acesso completo ao curso, cláusula por cláusula.</li>
              <li className="flex items-start gap-3"><span className="text-gold-light font-black">🎁</span> BÔNUS — {course.bonus}</li>
              <li className="flex items-start gap-3"><span className="text-gold-light font-black">✓</span> Material de apoio para aplicar a norma no dia a dia.</li>
              <li className="flex items-start gap-3"><span className="text-gold-light font-black">✓</span> [PREENCHER — certificado de conclusão e carga horária]</li>
              <li className="flex items-start gap-3"><span className="text-gold-light font-black">✓</span> [PREENCHER — acesso vitalício / por X meses]</li>
            </ul>
            <p className="text-gold-light font-serif text-2xl font-bold mb-2">Investimento: {course.price}</p>
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center justify-center min-h-[52px] px-10 rounded-full bg-gold text-gray-900 font-extrabold text-lg hover:bg-gold-light transition-colors"
            >
              Garantir minha vaga
            </a>
          </div>
        </section>

        {/* Garantia */}
        <section className="py-20">
          <div className="container-fw max-w-2xl text-center">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Garantia</p>
            <h2 className="font-serif text-navy text-3xl font-bold mb-4">Risco zero para você.</h2>
            <p className="text-muted text-lg">{course.guarantee}</p>
          </div>
        </section>

        {/* FAQ */}
        {course.faqs && course.faqs.length > 0 && (
          <section className="py-20 bg-offwhite">
            <div className="container-fw max-w-3xl">
              <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Dúvidas frequentes</p>
              <h2 className="font-serif text-navy text-3xl md:text-4xl font-bold leading-tight mb-8">Perguntas frequentes.</h2>
              <div className="grid gap-3">
                {course.faqs.map((faq) => (
                  <details key={faq.question} className="group bg-white rounded-2xl px-6 py-5 border border-[#ececec] open:shadow-card">
                    <summary className="cursor-pointer text-navy font-black list-none flex justify-between items-center gap-4">
                      {faq.question}
                      <span className="shrink-0 text-gold text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-muted mt-4">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA final */}
        <section className="py-20 text-center text-white bg-navy-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.2),transparent_50%)]" />
          <div className="container-fw relative max-w-3xl">
            <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-4">
              A CCT já é obrigatória para a sua empresa. O que está em jogo é quanto ela vai custar — em multa ou em segurança.
            </h2>
            <p className="text-slate-300 mb-8">
              Daqui a 30 dias, sua equipe pode continuar aplicando a convenção no escuro — ou dominá-la cláusula por cláusula e dormir tranquila. A escolha é sua.
            </p>
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center justify-center min-h-[52px] px-10 rounded-full bg-gold text-gray-900 font-extrabold text-lg hover:bg-gold-light transition-colors"
            >
              Quero dominar a CCT e eliminar passivos
            </a>
            <p className="text-slate-400 text-xs mt-4">
              Garantia de [X] dias · Acesso imediato · Manual da CCT incluso
            </p>
          </div>
        </section>
      </main>
      <Footer data={data} locale={locale} />
    </>
  )
}
