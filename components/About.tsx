import Image from 'next/image'
import Reveal from './motion/Reveal'
import type { SiteData } from '@/types'

export default function About({ about }: { about: SiteData['about'] }) {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24">
      <div className="container-fw grid items-center gap-14 md:grid-cols-[0.85fr_1.15fr]">
        {/* Retrato com moldura dourada deslocada */}
        <Reveal variant="left" className="relative">
          <span
            aria-hidden
            className="absolute -bottom-4 -left-4 hidden h-full w-full rounded-[28px] border border-gold/40 md:block"
          />
          <div className="relative min-h-[430px] overflow-hidden rounded-[28px] bg-offwhite shadow-heavy md:min-h-[500px]">
            {about.photo ? (
              <Image
                src={about.photo}
                alt="Retrato de Fausto Sette Câmara"
                fill
                sizes="(max-width: 768px) 92vw, 40vw"
                className="object-cover transition-transform duration-[1.4s] ease-silk hover:scale-[1.04]"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-sm font-black uppercase tracking-widest text-navy">
                Foto do Dr. Fausto
              </span>
            )}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/45 to-transparent"
            />
          </div>
        </Reveal>

        {/* Texto */}
        <div>
          <Reveal variant="up">
            <p className="eyebrow mb-4">O diferencial</p>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h2 className="mb-5 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
              {about.heading}
            </h2>
          </Reveal>

          <Reveal variant="up" delay={150}>
            <p className="mb-10 text-lg text-muted">{about.body}</p>
          </Reveal>

          <div className="grid gap-4">
            {about.features.map((feature, index) => (
              <Reveal
                key={feature.title}
                variant="up"
                delay={140 + index * 70}
                className="group flex gap-5 rounded-2xl border border-transparent p-4 transition-colors duration-500 hover:border-gold/25 hover:bg-offwhite"
              >
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/35 font-serif text-sm font-bold text-gold-ink transition-all duration-500 ease-silk group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-1 font-serif text-lg font-bold text-navy">{feature.title}</h3>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
