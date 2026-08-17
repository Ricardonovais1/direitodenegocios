import Link from 'next/link'
import SpotlightCard from './motion/SpotlightCard'
import { getAreaIcon, ICON_STROKE } from '@/lib/area-icons'
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
  const Icon = getAreaIcon(area.slug)

  return (
    <SpotlightCard
      delay={delay}
      className="card-elevated card-topline group flex flex-col p-7"
    >
      <span
        aria-hidden
        className="grid h-12 w-12 place-items-center rounded-full border border-gold/35 text-gold-ink transition-all duration-500 ease-silk group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep"
      >
        <Icon size={22} strokeWidth={ICON_STROKE} />
      </span>

      <Heading className="mb-3 mt-5 font-serif text-xl font-bold leading-snug text-navy">
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
