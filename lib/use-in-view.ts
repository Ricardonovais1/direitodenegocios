'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Um único IntersectionObserver compartilhado por toda a página — dezenas de
 * elementos revelados sem dezenas de observers.
 */
let sharedObserver: IntersectionObserver | null = null
const listeners = new Map<Element, () => void>()

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          listeners.get(entry.target)?.()
          listeners.delete(entry.target)
          sharedObserver?.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )
  }
  return sharedObserver
}

/** Dispara uma única vez, quando o elemento entra na viewport. */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    // Sem suporte a IntersectionObserver: mostra tudo, sem animação.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    listeners.set(el, () => setInView(true))
    getObserver().observe(el)

    return () => {
      listeners.delete(el)
      sharedObserver?.unobserve(el)
    }
  }, [inView])

  return { ref, inView }
}
