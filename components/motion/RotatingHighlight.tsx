'use client'

import { useEffect, useState } from 'react'

/**
 * Trio "Estratégia · Tática · Leitura de jogo" com o foco dourado passando
 * de um para o outro. Movimento mínimo, mas o olho volta pra ele.
 */
export default function RotatingHighlight({ words }: { words: string[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (words.length < 2) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const timer = setInterval(() => setActive((i) => (i + 1) % words.length), 2400)
    return () => clearInterval(timer)
  }, [words.length])

  return (
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
      {words.map((word, index) => (
        <li key={word} className="flex items-center gap-3">
          {index > 0 && (
            <span aria-hidden className="text-white/25">
              ·
            </span>
          )}
          <span
            className={`relative transition-all duration-700 ease-silk ${
              active === index ? 'text-gold-light' : 'text-white/45'
            }`}
          >
            {word}
            <span
              aria-hidden
              className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-gold transition-transform duration-700 ease-silk ${
                active === index ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </span>
        </li>
      ))}
    </ul>
  )
}
