'use client'

import { useEffect, useRef } from 'react'

/**
 * Fio dourado na base do header que acompanha o avanço da leitura.
 * Escreve direto no DOM via rAF — zero re-renders durante o scroll.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const el = barRef.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      el.style.transform = `scaleX(${ratio})`
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0"
        style={{ background: 'linear-gradient(90deg, #a07c37, #e2c780 60%, #f2e4c4)' }}
      />
    </div>
  )
}
