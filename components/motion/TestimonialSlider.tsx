'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Testimonial } from '@/types'

const AUTOPLAY_MS = 7000

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  // Em telas largas os três depoimentos cabem lado a lado: nesse caso não há o
  // que deslizar, e setas/pontinhos/autoplay só atrapalhariam.
  const [scrollable, setScrollable] = useState(false)

  const goTo = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.children[index] as HTMLElement | undefined
    if (!slide) return
    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      // O CSS de reduced-motion não afeta scrollTo programático.
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }, [])

  // Índice ativo derivado da posição real do scroll — funciona com swipe também.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    const update = () => {
      frame = 0
      const center = track.scrollLeft + track.clientWidth / 2
      let closest = 0
      let smallest = Infinity
      Array.from(track.children).forEach((child, index) => {
        const el = child as HTMLElement
        const distance = Math.abs(el.offsetLeft - track.offsetLeft + el.clientWidth / 2 - center)
        if (distance < smallest) {
          smallest = distance
          closest = index
        }
      })
      setActive(closest)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const measure = () => setScrollable(track.scrollWidth - track.clientWidth > 8)

    measure()
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Avanço automático — pausa no hover, no foco e com prefers-reduced-motion.
  useEffect(() => {
    if (paused || !scrollable || testimonials.length < 2) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const timer = setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % testimonials.length
        goTo(next)
        return next
      })
    }, AUTOPLAY_MS)

    return () => clearInterval(timer)
  }, [paused, scrollable, testimonials.length, goTo])

  const step = (direction: -1 | 1) => {
    const next = (active + direction + testimonials.length) % testimonials.length
    goTo(next)
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Depoimentos de clientes"
    >
      <div
        ref={trackRef}
        className="no-scrollbar -mx-[4vw] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[4vw] pb-2 md:mx-0 md:px-0"
        role={scrollable ? 'group' : undefined}
        aria-label={scrollable ? 'Depoimentos — use as setas ← e → para navegar' : undefined}
        tabIndex={scrollable ? 0 : -1}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            step(1)
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            step(-1)
          }
        }}
      >
        {testimonials.map((item, index) => (
          <figure
            key={item._id}
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${testimonials.length}`}
            className={`relative flex w-[min(88vw,420px)] shrink-0 snap-center flex-col
              overflow-hidden rounded-[20px] border border-white/10 bg-navy p-8 text-white
              shadow-heavy transition-[opacity,transform] duration-700 ease-silk
              lg:w-[calc((100%-2.5rem)/3)]
              ${active === index ? 'opacity-100' : 'opacity-60 lg:opacity-100'}`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-gold/10 blur-3xl"
            />
            <span
              aria-hidden
              className="font-serif text-6xl leading-none text-gold/35"
            >
              &ldquo;
            </span>
            <blockquote className="relative -mt-3 mb-6 flex-1 text-[0.95rem] leading-relaxed text-slate-200">
              {item.quote}
            </blockquote>
            <figcaption className="flex items-center gap-4 border-t border-white/10 pt-5">
              {item.photo && (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gold/40">
                  <Image src={item.photo} alt="" fill sizes="48px" className="object-cover" />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-bold text-gold-light">{item.name}</p>
                <p className="text-sm text-slate-400">
                  {item.role}, {item.company}
                </p>
                <p className="text-xs text-slate-400/80">{item.location}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {scrollable && testimonials.length > 1 && (
        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            {testimonials.map((item, index) => (
              <button
                key={item._id}
                type="button"
                aria-current={active === index ? true : undefined}
                aria-label={`Depoimento ${index + 1}: ${item.name}`}
                onClick={() => goTo(index)}
                className="group py-3"
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-500 ease-silk ${
                    active === index
                      ? 'w-10 bg-gold'
                      : 'w-5 bg-navy/20 group-hover:bg-gold/50'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => step(direction)}
                aria-label={direction === -1 ? 'Depoimento anterior' : 'Próximo depoimento'}
                className="grid h-11 w-11 place-items-center rounded-full border border-navy/15
                  text-navy transition-all duration-500 ease-silk
                  hover:border-gold hover:bg-gold hover:text-navy-deep hover:-translate-y-0.5"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                  style={{ transform: direction === -1 ? 'rotate(180deg)' : undefined }}
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
