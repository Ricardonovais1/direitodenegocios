import type { ProcessStep } from '@/types'

export default function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section id="process" className="py-20">
      <div className="container-fw">
        <div className="max-w-2xl mb-10">
          <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Como eu trabalho</p>
          <h2 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight mb-4">
            Um método claro, do diagnóstico ao acompanhamento.
          </h2>
          <p className="text-muted text-lg">
            Quatro etapas para transformar risco em previsibilidade — sem juridiquês e sem surpresas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <article
              key={s.step}
              className="bg-white rounded-[18px] p-6 border-t-4 border-gold shadow-card"
            >
              <h3 className="font-serif text-navy text-xl font-bold mb-3">
                {s.step}. {s.title}
              </h3>
              <p className="text-muted">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
