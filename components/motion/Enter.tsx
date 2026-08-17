import type { CSSProperties, ElementType, ReactNode } from 'react'

type Variant = 'up' | 'fade' | 'blur' | 'scale'

const variantClass: Record<Variant, string> = {
  up: 'enter',
  fade: 'enter-fade',
  blur: 'enter-blur',
  scale: 'enter-scale',
}

interface EnterProps {
  children: ReactNode
  as?: ElementType
  variant?: Variant
  /** Atraso em ms — escalona a entrada de um bloco. */
  delay?: number
  className?: string
  style?: CSSProperties
  id?: string
  tabIndex?: number
}

/**
 * Entrada para conteúdo acima da dobra. É animação CSS pura, então dispara no
 * primeiro paint — sem depender de JavaScript, hidratação ou observer. Para o
 * que está abaixo da dobra, use `Reveal`.
 */
export default function Enter({
  children,
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  ...rest
}: EnterProps) {
  return (
    <Tag
      className={`${variantClass[variant]} ${className}`.trim()}
      style={delay ? ({ ...style, '--enter-delay': `${delay}ms` } as CSSProperties) : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
