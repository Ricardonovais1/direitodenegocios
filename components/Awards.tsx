import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity-image'
import type { Award } from '@/types'

export default async function Awards({ awards }: { awards: Award[] }) {
  const t = await getTranslations('awards')

  return (
    <section className="py-16 bg-white">
      <div className="container-fw">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">{t('eyebrow')}</p>
          <h2 className="font-serif text-navy text-3xl md:text-4xl font-bold">{t('heading')}</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {awards.map((award, i) => {
            const logoUrl = award.logo ? urlFor(award.logo)?.width(120).height(80).fit('max').url() : null
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-3 text-center max-w-[140px] group"
              >
                <div className="w-20 h-20 rounded-full bg-offwhite border border-[#ececec] flex items-center justify-center overflow-hidden">
                  {logoUrl ? (
                    <Image src={logoUrl} alt={award.organization} width={60} height={60} className="object-contain" />
                  ) : (
                    <span className="text-2xl text-gold">★</span>
                  )}
                </div>
                <div>
                  <p className="text-navy font-bold text-sm leading-tight">{award.title}</p>
                  <p className="text-muted text-xs mt-0.5">{award.organization}</p>
                  {award.year && <p className="text-slate-400 text-xs">{award.year}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
