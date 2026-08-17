import ContactForm from './ContactForm'
import Enter from './motion/Enter'
import CountUp from './motion/CountUp'
import RotatingHighlight from './motion/RotatingHighlight'
import type { SiteData } from '@/types'

interface HeroProps {
  hero: SiteData['hero']
  /** Palavras do tripé (Estratégia · Tática · Leitura de jogo). */
  pillars?: string[]
  phone?: string
}

const trustPoints = [
  'Resposta em até 1 dia útil',
  'Atendimento nacional, remoto ou presencial',
  'Consultivo e contencioso',
]

export default function Hero({ hero, pillars = [] }: HeroProps) {
  return (
    <section id="home" className="bg-ink texture-grain relative overflow-hidden text-white">
      {/* Camadas de profundidade: malha fina + duas auroras douradas lentas */}
      <div aria-hidden className="texture-weave-dark absolute inset-0" />
      <div aria-hidden className="aurora -right-24 -top-32 h-[420px] w-[420px] bg-gold/20" />
      <div
        aria-hidden
        className="aurora -bottom-40 left-[-10%] h-[380px] w-[380px] bg-navy-soft/70"
        style={{ animationDelay: '-9s' }}
      />

      {/* A grade só divide em `lg`: em 768px a coluna esquerda ficaria com
          ~360px e o H1 sairia com 6 caracteres por linha. */}
      <div className="container-fw relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        {/* Coluna editorial */}
        <div>
          <Enter variant="fade" className="mb-6">
            <p className="flex items-start gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold-light/85">
              <span className="relative mt-[0.35em] flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-gold" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              {hero.eyebrow}
            </p>
          </Enter>

          <Enter variant="blur" delay={60} as="h1">
            <span className="block max-w-3xl font-serif text-[2.6rem] font-bold leading-[1.04] sm:text-5xl lg:text-[3.75rem] xl:text-[4.2rem]">
              {hero.heading}
            </span>
          </Enter>

          <Enter delay={140} className="mt-6 max-w-xl">
            <p className="text-lg text-slate-300">{hero.subheading}</p>
          </Enter>

          {pillars.length > 0 && (
            <Enter delay={200} className="mt-7">
              <RotatingHighlight words={pillars} />
            </Enter>
          )}

          <Enter delay={260} className="mt-9 flex flex-wrap gap-4">
            <a href="#contact" className="btn-gold">
              Falar com o Dr. Fausto
            </a>
            <a
              href="https://wa.me/5531984284815"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.23-8.23 2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.21 3.71.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
              </svg>
              Falar no WhatsApp
            </a>
          </Enter>

          <Enter delay={320} className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.82rem] text-slate-400">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="m3 8.5 3.2 3.2L13 5"
                      stroke="#c9a45c"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </Enter>

          {/* `<ul>` e não `<div aria-label>`: um div genérico não aceita nome
              acessível. Em 375px três colunas dariam ~85px úteis por item. */}
          <ul className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5" aria-label="Destaques">
            {hero.highlights.map((highlight, index) => (
              <Enter
                as="li"
                key={highlight.label}
                delay={380 + index * 70}
                className="relative pl-3 sm:pl-4"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-[2px] bg-gradient-to-b from-gold to-gold/10"
                />
                <strong className="block font-serif text-lg text-white sm:text-2xl">
                  <CountUp value={highlight.value} />
                </strong>
                <span className="text-[0.8rem] text-slate-400 sm:text-sm">{highlight.label}</span>
              </Enter>
            ))}
          </ul>
        </div>

        {/* Cartão de contato. `tabIndex={-1}` para o link "#contact" mover o
            foco, e não só a rolagem. */}
        <Enter
          variant="scale"
          delay={180}
          as="aside"
          id="contact"
          tabIndex={-1}
          className="relative rounded-[20px] bg-white p-7 text-[#1f2933] shadow-heavy outline-none md:p-8"
        >
          <span
            aria-hidden
            className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-gold-light via-gold to-transparent"
          />
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] text-gold-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Retorno em 1 dia útil
          </span>
          <h2 className="mb-1 font-serif text-[1.7rem] font-bold text-navy">
            Solicitar uma consulta
          </h2>
          <p className="mb-6 text-sm text-muted">
            Conte o seu cenário. Eu respondo com o caminho mais eficiente e de menor risco.
          </p>
          <ContactForm />
        </Enter>
      </div>

      {/* Indicação sutil de que a página continua */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 md:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/30">Role</span>
        <span className="relative h-8 w-px bg-white/15">
          <span className="absolute inset-x-0 top-0 h-3 animate-scroll-cue bg-gold" />
        </span>
      </div>
    </section>
  )
}
