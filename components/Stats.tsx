import type { Stat } from '@/types'

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-navy py-12">
      <div className="container-fw grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <strong className="block text-gold-light font-serif text-4xl font-bold leading-none mb-1">
              {s.value}
            </strong>
            <span className="text-slate-300 text-sm">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
