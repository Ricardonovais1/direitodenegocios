import Link from 'next/link'
import Reveal from './motion/Reveal'
import type { Course } from '@/types'

export default function CourseBanner({ course }: { course: Course }) {
  // Sem slug não há para onde levar — melhor não renderizar a faixa.
  if (!course?.slug) return null

  const facts = [
    { value: `${course.modules?.length ?? 8}`, label: 'módulos, cláusula por cláusula' },
    { value: 'RH + Jurídico', label: 'feito para quem aplica a norma' },
    { value: 'Manual da CCT', label: 'incluso como bônus' },
  ]

  return (
    <section className="bg-ink texture-grain relative overflow-hidden py-24">
      <div aria-hidden className="texture-weave-dark absolute inset-0" />
      <div
        aria-hidden
        className="aurora -right-20 -top-20 h-[380px] w-[380px] bg-gold/20"
        style={{ animationDelay: '-6s' }}
      />

      <div className="container-fw relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal variant="up">
            <p className="eyebrow mb-4">{course.eyebrow ?? 'Curso'}</p>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="mb-5 font-serif text-[2rem] font-bold leading-[1.06] text-white md:text-[2.75rem]">
              Sua empresa de TI está aplicando a CCT Sindpd-SP/SeproSP corretamente?
            </h2>
          </Reveal>
          <Reveal variant="up" delay={150}>
            <p className="mb-9 max-w-xl text-lg text-slate-300">
              Quase 100 mil empregados, mais de 10 mil empresas — e uma convenção coletiva de
              observância obrigatória que a maioria dos RHs e jurídicos aplica sem conhecer a fundo.
              Aprenda a aplicar a CCT cláusula por cláusula e reduza o risco de ações coletivas
              sindicais.
            </p>
          </Reveal>
          <Reveal variant="up" delay={220}>
            <Link href={`/cursos/${course.slug}`} className="btn-gold">
              Conhecer o curso
              <span aria-hidden className="arrow-slide">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-3">
          {facts.map((fact, index) => (
            <Reveal
              key={fact.label}
              variant="right"
              delay={200 + index * 110}
              className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 transition-all duration-600 ease-silk hover:border-gold/40 hover:bg-white/[0.07]"
            >
              <span className="font-serif text-2xl font-bold text-gold-light">{fact.value}</span>
              <span className="text-sm text-slate-400">{fact.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
