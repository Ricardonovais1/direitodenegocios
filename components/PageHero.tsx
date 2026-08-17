import Link from 'next/link'
import type { ReactNode } from 'react'
import Enter from './motion/Enter'

export interface Crumb {
  label: string
  href?: string
}

interface PageHeroProps {
  eyebrow?: string
  title: string
  lead?: string
  crumbs?: Crumb[]
  children?: ReactNode
  /** Reduz o respiro vertical em páginas de listagem. */
  compact?: boolean
}

/**
 * Cabeçalho padrão das páginas internas: fundo texturizado, trilha e chamada.
 * A entrada é CSS puro — aparece no primeiro paint, sem esperar hidratação.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <div
      className={`bg-ink texture-grain relative overflow-hidden text-white ${
        compact ? 'py-16 md:py-20' : 'py-20 md:py-24'
      }`}
    >
      <div aria-hidden className="texture-weave-dark absolute inset-0" />
      <div aria-hidden className="aurora -right-24 -top-28 h-[380px] w-[380px] bg-gold/15" />

      <div className="container-fw relative">
        {crumbs && crumbs.length > 0 && (
          <Enter variant="fade">
            <nav aria-label="Trilha de navegação" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-white/50">
                {crumbs.map((crumb, index) => (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {index > 0 && <span aria-hidden>/</span>}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="link-underline transition-colors duration-300 hover:text-gold-light"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white/80">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Enter>
        )}

        {eyebrow && (
          <Enter delay={40}>
            <p className="eyebrow mb-5 !text-gold-light">{eyebrow}</p>
          </Enter>
        )}

        <Enter variant="blur" delay={90}>
          <h1 className="max-w-4xl font-serif text-[2.4rem] font-bold leading-[1.06] sm:text-5xl md:text-[3.4rem]">
            {title}
          </h1>
        </Enter>

        {lead && (
          <Enter delay={160}>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">{lead}</p>
          </Enter>
        )}

        {children && (
          <Enter delay={220}>
            <div className="mt-9">{children}</div>
          </Enter>
        )}
      </div>
    </div>
  )
}
