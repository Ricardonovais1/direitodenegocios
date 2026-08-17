import Link from 'next/link'
import { getAreaIcon, ICON_STROKE } from '@/lib/area-icons'
import type { PracticeArea } from '@/types'

/**
 * Faixa contínua com todas as áreas de atuação, logo abaixo do hero.
 * É movimento com função: cada item leva direto para a página do serviço.
 * A animação é CSS puro e pausa no hover e no foco do teclado.
 */
export default function AreaMarquee({ areas }: { areas: PracticeArea[] }) {
  if (!areas.length) return null

  const items = areas.filter((area) => area.slug)

  return (
    <div className="relative border-y border-white/10 bg-navy-dark py-4">
      <div className="fade-edges group overflow-hidden">
        {/* Duas cópias idênticas; o deslocamento de -50% cai exatamente na emenda.
            O `pr-3` de cada lista faz as vezes do gap entre elas. */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center gap-3 pr-3"
              aria-hidden={copy === 1 || undefined}
            >
              {items.map((area) => {
                const Icon = getAreaIcon(area.slug)
                return (
                  <li key={`${copy}-${area._id}`}>
                    <Link
                      href={`/areas-de-atuacao/${area.slug}`}
                      tabIndex={copy === 1 ? -1 : undefined}
                      className="group/item flex items-center gap-2.5 whitespace-nowrap rounded-full
                        border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-slate-300
                        transition-all duration-500 ease-silk
                        hover:border-gold/50 hover:bg-gold/10 hover:text-white"
                    >
                      <Icon
                        aria-hidden
                        size={16}
                        strokeWidth={ICON_STROKE}
                        className="shrink-0 text-gold/70 transition-colors duration-500 group-hover/item:text-gold-light"
                      />
                      {area.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
