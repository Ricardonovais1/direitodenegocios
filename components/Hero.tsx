import ContactForm from './ContactForm'
import type { SiteData } from '@/types'

interface HeroProps {
  hero: SiteData['hero']
  phone?: string
}

export default function Hero({ hero }: HeroProps) {
  return (
    <section
      id="home"
      className="text-white py-16 md:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(110deg, rgba(9,20,34,0.96), rgba(15,31,51,0.86)), radial-gradient(circle at top right, rgba(201,164,92,0.25), transparent 35%), #0f1f33' }}
    >
      <div className="container-fw grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
        {/* Left content */}
        <div>
          <p className="text-gold uppercase tracking-widest text-xs font-black mb-4">
            {hero.eyebrow}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.98] mb-5 max-w-2xl">
            {hero.heading}
          </h1>
          <p className="text-slate-300 text-lg max-w-lg mb-8">{hero.subheading}</p>

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="#contact"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-gold text-gray-900 font-extrabold hover:bg-gold-light transition-colors"
            >
              Falar com o Dr. Fausto
            </a>
            <a
              href="https://wa.me/5531984284815"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-white/60 text-white font-extrabold hover:text-gold-light hover:border-gold-light transition-colors"
            >
              Falar no WhatsApp
            </a>
          </div>

          <div
            className="grid grid-cols-3 gap-4 max-w-lg"
            aria-label="Destaques"
          >
            {hero.highlights.map((h) => (
              <div key={h.label} className="pl-3 border-l-[3px] border-gold">
                <strong className="block text-white">{h.value}</strong>
                <span className="text-slate-300 text-sm">{h.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form card */}
        <aside id="contact" className="bg-white text-[#1f2933] rounded-[18px] p-7 shadow-heavy">
          <h2 className="font-serif text-navy text-[1.8rem] font-bold mb-1">Solicitar uma consulta</h2>
          <p className="text-muted mb-5 text-sm">Preencha o formulário e retornamos em até um dia útil.</p>
          <ContactForm />
        </aside>
      </div>

      {/* Mobile sticky WhatsApp button — hidden per request; re-enable when needed */}
      {/*
      <a
        href="https://wa.me/5531984284815"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed left-1/2 -translate-x-1/2 bottom-4 z-40 flex items-center justify-center w-[min(92%,420px)] min-h-[48px] rounded-full bg-gold text-gray-900 font-black shadow-heavy"
      >
        Falar no WhatsApp
      </a>
      */}
    </section>
  )
}
