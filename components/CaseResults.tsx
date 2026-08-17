import { getTranslations } from 'next-intl/server'
import Reveal from './motion/Reveal'
import SpotlightCard from './motion/SpotlightCard'
import type { CaseResult } from '@/types'

export default async function CaseResults({ results }: { results: CaseResult[] }) {
  const t = await getTranslations('caseResults')

  return (
    <section className="bg-ink texture-grain relative overflow-hidden py-24">
      <div aria-hidden className="texture-weave-dark absolute inset-0" />
      <div
        aria-hidden
        className="aurora -left-32 top-1/4 h-[360px] w-[360px] bg-gold/10"
        style={{ animationDelay: '-14s' }}
      />

      <div className="container-fw relative">
        <div className="mb-12 max-w-2xl">
          <Reveal variant="up">
            <p className="eyebrow mb-4">{t('eyebrow')}</p>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="font-serif text-[2rem] font-bold leading-[1.06] text-white md:text-[2.75rem]">
              {t('heading')}
            </h2>
          </Reveal>
        </div>

        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) => (
            <SpotlightCard
              key={result._id}
              dark
              delay={(index % 3) * 90}
              className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] p-7 transition-[border-color,transform,background-color] duration-600 ease-silk hover:-translate-y-1.5 hover:border-gold/40 hover:bg-white/[0.07]"
            >
              <p className="mb-2 font-serif text-[1.7rem] font-bold leading-tight text-gold-light">
                {result.highlight}
              </p>
              <p className="mb-2 font-bold text-white">{result.label}</p>
              {result.description && (
                <p className="text-sm text-slate-400">{result.description}</p>
              )}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-700 ease-silk group-hover:scale-x-100"
              />
            </SpotlightCard>
          ))}
        </div>

        <Reveal variant="fade">
          <p className="text-xs text-slate-400">{t("disclaimer")}</p>
        </Reveal>
      </div>
    </section>
  )
}
