import CountUp from './motion/CountUp'
import Reveal from './motion/Reveal'
import type { Stat } from '@/types'

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-ink texture-grain relative overflow-hidden py-14">
      <div aria-hidden className="texture-weave-dark absolute inset-0" />
      <h2 className="sr-only">Números</h2>
      <ul className="container-fw relative grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            as="li"
            variant="up"
            delay={index * 80}
            className="group relative px-4 text-center md:px-6"
          >
            {/* Filete divisor entre as métricas */}
            {index > 0 && (
              <span
                aria-hidden
                className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent md:block"
              />
            )}
            {/* Números em branco: o dourado fica só no filete divisor — uma
                faixa inteira dourada tirava a hierarquia da página. */}
            <strong className="mb-1 block font-serif text-4xl font-bold leading-none text-white transition-colors duration-500 group-hover:text-gold-light md:text-[2.75rem]">
              <CountUp value={stat.value} />
            </strong>
            <span className="text-sm text-slate-400">{stat.label}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
