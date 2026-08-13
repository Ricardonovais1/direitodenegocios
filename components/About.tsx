import Image from 'next/image'
import type { SiteData } from '@/types'

export default function About({ about }: { about: SiteData['about'] }) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container-fw grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        {/* Photo */}
        <div className="min-h-[480px] rounded-[28px] shadow-heavy relative overflow-hidden bg-offwhite">
          {about.photo ? (
            <Image src={about.photo} alt="Foto do Dr. Fausto Sette Câmara" fill className="object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-navy font-black uppercase tracking-widest text-sm">
              Foto do Dr. Fausto
            </span>
          )}
        </div>

        {/* Content */}
        <div>
          <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">O diferencial</p>
          <h2 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight mb-4">
            {about.heading}
          </h2>
          <p className="text-muted text-lg mb-8">{about.body}</p>

          <div className="grid gap-5">
            {about.features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="shrink-0 w-11 h-11 rounded-full bg-gold/20 flex items-center justify-center text-gold font-black">
                  ✓
                </div>
                <div>
                  <h3 className="text-navy font-bold mb-1">{f.title}</h3>
                  <p className="text-muted">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
