import Image from 'next/image'
import type { Testimonial as TestimonialItem } from '@/types'

export default function Testimonial({ testimonials }: { testimonials: TestimonialItem[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="container-fw">
        <div className="max-w-2xl mb-10">
          <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Prova social</p>
          <h2 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight">Quem confia, recomenda.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <figure key={t._id} className="bg-navy rounded-[24px] p-7 text-white shadow-heavy flex flex-col">
              {t.photo && (
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/40 mb-5 shrink-0">
                  <Image src={t.photo} alt={t.name} fill sizes="56px" className="object-cover" />
                </div>
              )}
              <blockquote className="text-slate-200 text-sm leading-relaxed flex-1 mb-5">
                “{t.quote}”
              </blockquote>
              <figcaption>
                <p className="font-bold text-gold-light">{t.name}</p>
                <p className="text-slate-400 text-sm">{t.role}, {t.company}</p>
                <p className="text-slate-500 text-xs mt-0.5">{t.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
