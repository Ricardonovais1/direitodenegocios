import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import AreaCard from './AreaCard'
import Reveal from './motion/Reveal'
import type { PracticeArea } from '@/types'

export default async function PracticeAreas({ areas }: { areas: PracticeArea[]; locale?: string }) {
  const t = await getTranslations('practiceAreas')

  return (
    <section id="practice-areas" className="bg-parchment texture-grain texture-grain-light relative py-24">
      <div className="container-fw relative">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal variant="up">
              <p className="eyebrow mb-4">{t('eyebrow')}</p>
            </Reveal>
            <Reveal variant="up" delay={80}>
              <h2 className="mb-4 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                {t('heading')}
              </h2>
            </Reveal>
            <Reveal variant="up" delay={150}>
              <p className="text-lg text-muted">{t('subheading')}</p>
            </Reveal>
          </div>

          <Reveal variant="up" delay={200}>
            <Link
              href="/areas-de-atuacao"
              className="link-underline group text-sm font-bold text-navy hover:text-gold-ink"
            >
              Ver todas as áreas
              <span aria-hidden className="arrow-slide">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => (
            <AreaCard
              key={area._id}
              area={area}
              delay={(index % 3) * 90}
              ctaLabel={t('learnMore')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
