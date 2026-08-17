'use client'

import { useEffect, useState } from 'react'

/** Botão discreto que só aparece depois de uma boa rolagem. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      setVisible(window.scrollY > window.innerHeight * 1.2)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          // `scroll-behavior: auto !important` do CSS não alcança o scrollTo
          // programático — a checagem precisa ser feita aqui.
          behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
      }
      aria-label="Voltar ao topo"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-5 z-40 grid h-11 w-11 place-items-center rounded-full
        border border-gold/40 bg-navy/90 text-gold-light backdrop-blur
        shadow-[0_10px_30px_-12px_rgba(15,31,51,0.8)]
        transition-[opacity,transform] duration-500 ease-silk
        hover:border-gold hover:text-white hover:-translate-y-0.5
        ${visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3'}`}
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 13V3.5M8 3.5 3.5 8M8 3.5 12.5 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
