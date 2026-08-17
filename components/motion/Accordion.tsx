'use client'

import { useId, useState } from 'react'

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  /** Índice aberto no primeiro carregamento. -1 mantém tudo fechado. */
  defaultOpen?: number
  dark?: boolean
}

/**
 * Acordeão acessível (button + region) com abertura suave via grid-template-rows.
 * Um item aberto por vez — mantém a página curta e a leitura focada.
 */
export default function Accordion({ items, defaultOpen = 0, dark = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const uid = useId()

  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `${uid}-panel-${index}`
        const buttonId = `${uid}-button-${index}`

        return (
          <div
            key={item.id}
            className={`overflow-hidden rounded-2xl border transition-[border-color,background-color,box-shadow] duration-500 ${
              dark
                ? `border-white/10 bg-white/[0.03] ${isOpen ? 'border-gold/40 bg-white/[0.06]' : 'hover:border-white/20'}`
                : `border-black/[0.07] bg-white ${isOpen ? 'border-gold/45 shadow-card' : 'hover:border-gold/30'}`
            }`}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className={`flex w-full items-center justify-between gap-5 px-6 py-5 text-left font-black ${
                  dark ? 'text-white' : 'text-navy'
                }`}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-silk ${
                    isOpen
                      ? 'rotate-45 border-gold bg-gold/15 text-gold'
                      : dark
                        ? 'border-white/25 text-gold-light'
                        : 'border-black/10 text-gold'
                  }`}
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>

            {/* Sem `role="region"`: com 8 FAQs viraria uma lista de 8 landmarks.
                `aria-expanded` + `aria-controls` no botão já comunicam o estado. */}
            <div
              id={panelId}
              className="grid transition-[grid-template-rows] duration-500 ease-silk"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              {/* Colapsado tem altura zero; escondemos do leitor de tela também. */}
              <div className="overflow-hidden" aria-hidden={!isOpen}>
                <p className={`px-6 pb-6 pt-0 ${dark ? 'text-slate-300' : 'text-muted'}`}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
