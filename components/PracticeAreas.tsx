import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { PracticeArea } from '@/types'

export default async function PracticeAreas({ areas, locale }: { areas: PracticeArea[]; locale: string }) {
  const t = await getTranslations('practiceAreas')

  return (
    <section id="practice-areas" className="py-20">
      <div className="container-fw">
        <div className="max-w-2xl mb-10">
          <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">{t('eyebrow')}</p>
          <h2 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight mb-4">{t('heading')}</h2>
          <p className="text-muted text-lg">{t('subheading')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area) => (
            <article
              key={area._id}
              className="bg-white rounded-[18px] p-7 border border-[#ececec] shadow-card hover:-translate-y-1 hover:shadow-heavy transition-all flex flex-col"
            >
              <span className="text-gold font-black">{area.number}</span>
              <h3 className="font-serif text-navy text-xl font-bold my-3">{area.title}</h3>
              <p className="text-muted flex-1">{area.description}</p>
              {area.slug && (
                <Link
                  href={`/areas-de-atuacao/${area.slug}`}
                  className="mt-4 text-gold text-sm font-bold hover:underline"
                >
                  {t('learnMore')} →
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
