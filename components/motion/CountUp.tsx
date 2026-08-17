'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/lib/use-in-view'

/** Separa "15+" em ["", 15, "+"] e "~10" em ["~", 10, ""]. */
const NUMERIC = /^([^\d]*)(\d+)([\s\S]*)$/

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

interface CountUpProps {
  /** Aceita qualquer rótulo: "15+", "~10", "UFMG", "Nacional". */
  value: string
  className?: string
  duration?: number
}

/**
 * Anima o número de uma métrica ao entrar na tela. Valores sem dígitos
 * (ex.: "UFMG") saem como estão. O HTML servido já traz o número final —
 * o zero só existe no cliente, um instante antes da animação começar.
 */
export default function CountUp({ value, className = '', duration = 1400 }: CountUpProps) {
  const match = value.match(NUMERIC)
  const target = match ? Number(match[2]) : null
  const { ref, inView } = useInView<HTMLSpanElement>()
  const [display, setDisplay] = useState(target ?? 0)
  const started = useRef(false)

  useEffect(() => {
    if (target === null || started.current || prefersReducedMotion()) return

    if (!inView) {
      setDisplay(0)
      return
    }

    started.current = true
    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo — arranca rápido e pousa suave
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration])

  if (target === null || !match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={`tnum ${className}`.trim()}>
      {match[1]}
      {display}
      {match[3]}
    </span>
  )
}
