import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Reveal from './motion/Reveal'
import { urlFor } from '@/lib/sanity-image'
import type { Award } from '@/types'

export default async function Awards({ awards }: { awards: Award[] }) {
  const t = await getTranslations('awards')

  return (
    <section className="bg-white py-20">
      <div className="container-fw">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <Reveal variant="up">
            <p className="eyebrow mb-4 justify-center">{t('eyebrow')}</p>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="font-serif text-3xl font-bold text-navy md:text-4xl">{t('heading')}</h2>
          </Reveal>
        </div>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-12">
          {awards.map((award, index) => {
            const logoUrl = award.logo
              ? urlFor(award.logo)?.width(120).height(80).fit('max').url()
              : null

            return (
              <Reveal
                key={`${award.title}-${index}`}
                variant="up"
                delay={index * 90}
                className="group flex max-w-[150px] flex-col items-center gap-4 text-center"
              >
                <div className="relative grid h-20 w-20 place-items-center overflow-hidden rounded-full border border-black/[0.07] bg-offwhite transition-all duration-600 ease-silk group-hover:border-gold/50 group-hover:shadow-glow">
                  <span
                    aria-hidden
                    className="absolute inset-0 scale-0 rounded-full bg-gold/10 transition-transform duration-600 ease-silk group-hover:scale-100"
                  />
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={award.organization}
                      width={60}
                      height={60}
                      className="relative object-contain"
                    />
                  ) : (
                    <span className="relative text-2xl text-gold">★</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-navy">{award.title}</p>
                  <p className="mt-1 text-xs text-muted">{award.organization}</p>
                  {award.year && <p className="text-xs text-slate-400">{award.year}</p>}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
