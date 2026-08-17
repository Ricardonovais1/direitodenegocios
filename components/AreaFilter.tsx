'use client'

import { useMemo, useState } from 'react'
import AreaCard from './AreaCard'
import type { PracticeArea } from '@/types'

const ALL = 'todas'

interface AreaFilterProps {
  areas: PracticeArea[]
  /** Grupos que têm ao menos uma área — calculados no servidor. */
  families: { id: string; label: string }[]
  /** slug → id do grupo. Só isto vem para o cliente: importar
   *  `lib/service-details` aqui arrastaria todo o conteúdo editorial
   *  (FAQs, entregáveis, sinais) para o bundle do navegador. */
  familyBySlug: Record<string, string>
}

/**
 * Vitrine filtrável das áreas de atuação. O filtro é só uma camada de conforto:
 * todas as áreas continuam no HTML e cada uma tem a sua própria página.
 */
export default function AreaFilter({ areas, families, familyBySlug }: AreaFilterProps) {
  const [family, setFamily] = useState(ALL)

  const visible = useMemo(
    () =>
      family === ALL
        ? areas
        : areas.filter((area) => area.slug && familyBySlug[area.slug] === family),
    [areas, family, familyBySlug],
  )

  const chips = [{ id: ALL, label: `Todas (${areas.length})` }, ...families]

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2.5" role="group" aria-label="Filtrar áreas de atuação">
        {chips.map((chip) => {
          const isActive = family === chip.id
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFamily(chip.id)}
              aria-pressed={isActive}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition-all duration-500 ease-silk ${
                isActive
                  ? 'border-transparent bg-navy text-white shadow-[0_10px_24px_-14px_rgba(15,31,51,0.9)]'
                  : 'border-navy/15 text-navy hover:-translate-y-0.5 hover:border-gold hover:text-gold-ink'
              }`}
            >
              {chip.label}
            </button>
          )
        })}
      </div>

      {/* Só o resumo é anunciado; a grade inteira em aria-live seria ruído. */}
      <p role="status" className="sr-only">
        {visible.length === 1
          ? '1 área listada'
          : `${visible.length} áreas listadas`}
      </p>

      <div key={family} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((area, index) => (
          <AreaCard
            key={area._id}
            area={area}
            headingLevel="h2"
            delay={(index % 3) * 80}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-10 text-center text-muted">
          Nenhuma área nesta categoria por enquanto.
        </p>
      )}
    </div>
  )
}
