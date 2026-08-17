import Link from 'next/link'
import SpotlightCard from './motion/SpotlightCard'
import type { PracticeArea } from '@/types'

interface AreaCardProps {
  area: PracticeArea
  delay?: number
  ctaLabel?: string
  /** Usa h2 em páginas onde o card é o conteúdo principal. */
  headingLevel?: 'h2' | 'h3'
}

/**
 * Card de área de atuação. O card inteiro é clicável (link estendido sobre a
 * superfície), mantendo um único alvo de foco para o teclado.
 */
export default function AreaCard({
  area,
  delay = 0,
  ctaLabel = 'Saiba mais',
  headingLevel: Heading = 'h3',
}: AreaCardProps) {
  const href = area.slug ? `/areas-de-atuacao/${area.slug}` : undefined

  return (
    <SpotlightCard
      delay={delay}
      className="card-elevated card-topline group flex flex-col p-7"
    >
      <span className="font-semibold tabular-nums text-xs tracking-[0.22em] text-gold-ink">
        {area.number}
      </span>

      <Heading className="mb-3 mt-4 font-serif text-xl font-bold leading-snug text-navy">
        {href ? (
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {area.title}
          </Link>
        ) : (
          area.title
        )}
      </Heading>

      <p className="flex-1 text-[0.95rem] text-muted">{area.description}</p>

      {href && (
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold-ink">
          {ctaLabel}
          <span aria-hidden className="arrow-slide">
            →
          </span>
        </span>
      )}
    </SpotlightCard>
  )
}
