import Reveal from './motion/Reveal'
import type { ProcessStep } from '@/types'

export default function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section id="process" className="relative overflow-hidden bg-white py-24">
      <div className="container-fw">
        <div className="mb-14 max-w-2xl">
          <Reveal variant="up">
            <p className="eyebrow mb-4">Como eu trabalho</p>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="mb-4 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
              Um método claro, do diagnóstico ao acompanhamento.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={150}>
            <p className="text-lg text-muted">
              Quatro etapas para transformar risco em previsibilidade — sem juridiquês e sem
              surpresas.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* Trilho que se desenha da esquerda para a direita ao entrar em cena */}
          <Reveal
            variant="clip"
            delay={80}
            className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-px lg:block"
          >
            <span className="block h-px w-full bg-gradient-to-r from-gold/30 via-gold to-gold/30" />
          </Reveal>

          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal
                key={step.step}
                as="li"
                variant="up"
                delay={140 + index * 80}
                className="group"
              >
                <span
                  aria-hidden
                  className="mb-6 grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-white font-serif text-base font-bold text-gold-ink transition-all duration-600 ease-silk group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep group-hover:shadow-glow"
                >
                  {step.step}
                </span>
                <h3 className="mb-2 font-serif text-xl font-bold text-navy">{step.title}</h3>
                <p className="text-muted">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
