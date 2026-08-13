import { getTranslations } from 'next-intl/server'
import type { CaseResult } from '@/types'

export default async function CaseResults({ results }: { results: CaseResult[] }) {
  const t = await getTranslations('caseResults')

  return (
    <section className="py-20 bg-navy">
      <div className="container-fw">
        <div className="max-w-2xl mb-10">
          <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">{t('eyebrow')}</p>
          <h2 className="font-serif text-white text-4xl md:text-5xl font-bold leading-tight">
            {t('heading')}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {results.map((r) => (
            <div
              key={r._id}
              className="bg-navy-soft rounded-[18px] p-6 border border-white/10 hover:border-gold/40 transition-colors"
            >
              <p className="font-serif text-gold-light text-3xl font-bold mb-2">{r.highlight}</p>
              <p className="text-white font-bold mb-2">{r.label}</p>
              {r.description && <p className="text-slate-400 text-sm">{r.description}</p>}
            </div>
          ))}
        </div>

        <p className="text-slate-500 text-xs">{t('disclaimer')}</p>
      </div>
    </section>
  )
}
