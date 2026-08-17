'use client'

import type { CSSProperties, ElementType, PointerEvent, ReactNode } from 'react'
import { useCallback } from 'react'
import { useInView } from '@/lib/use-in-view'

interface SpotlightCardProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Variante escura para cards sobre fundo navy. */
  dark?: boolean
  /** Atraso da animação de entrada, em ms. */
  delay?: number
  style?: CSSProperties
}

/**
 * Card com holofote dourado que segue o cursor e entrada escalonada.
 * O brilho é puro CSS alimentado por duas variáveis — nada de re-render.
 */
export default function SpotlightCard({
  children,
  as: Tag = 'article',
  className = '',
  dark = false,
  delay = 0,
  style,
}: SpotlightCardProps) {
  const { ref, inView } = useInView<HTMLElement>()

  const handleMove = useCallback((event: PointerEvent<HTMLElement>) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }, [])

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      className={`spotlight${dark ? ' spotlight-dark' : ''} reveal reveal-up${
        inView ? ' is-visible' : ''
      } ${className}`.trim()}
      style={delay ? ({ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties) : style}
    >
      {children}
    </Tag>
  )
}
