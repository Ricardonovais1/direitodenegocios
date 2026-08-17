'use client'

import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '@/lib/use-in-view'

type Variant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'fade' | 'clip'

const variantClass: Record<Variant, string> = {
  up: 'reveal reveal-up',
  down: 'reveal reveal-down',
  left: 'reveal reveal-left',
  right: 'reveal reveal-right',
  scale: 'reveal reveal-scale',
  blur: 'reveal reveal-blur',
  fade: 'reveal reveal-fade',
  clip: 'clip-reveal',
}

interface RevealProps {
  children: ReactNode
  /** Tag renderizada. Padrão: div. */
  as?: ElementType
  variant?: Variant
  /** Atraso em ms — use para escalonar itens de uma lista. */
  delay?: number
  className?: string
  style?: CSSProperties
  id?: string
  'aria-label'?: string
}

/**
 * Entrada minimalista ao entrar na viewport. Sem JS (ou com
 * `prefers-reduced-motion`), o conteúdo aparece normalmente — a animação é
 * enfeite, nunca requisito para ler a página.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <Tag
      ref={ref}
      className={`${variantClass[variant]}${inView ? ' is-visible' : ''} ${className}`.trim()}
      style={delay ? { ...style, '--reveal-delay': `${delay}ms` } as CSSProperties : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
