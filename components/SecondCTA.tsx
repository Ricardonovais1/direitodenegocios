'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import type { SiteData } from '@/types'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-[#1f2933] transition duration-300 placeholder:text-[#5b6472] hover:border-gold/50 focus:border-navy focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-navy'

export default function SecondCTA({ secondCta }: { secondCta: NonNullable<SiteData['secondCta']> }) {
  const t = useTranslations('secondCta')
  const [status, setStatus] = useState<Status>('idle')
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    const form = event.currentTarget
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('situation') as HTMLTextAreaElement).value,
      // Sem e-mail de fachada: a API trata `email` como opcional e omite o
      // `replyTo` quando ele não vem.
      role: 'Contato rápido',
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-parchment texture-grain texture-grain-light relative py-24">
      <div className="container-fw relative grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="mb-4 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
            {secondCta.heading}
          </h2>
          <p className="text-lg text-muted">{secondCta.body}</p>

          <ul className="mt-8 grid gap-3 text-sm text-navy/80">
            {['Sem compromisso', 'Sigilo profissional', 'Resposta em até 1 dia útil'].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="m3 8.5 3.2 3.2L13 5"
                    stroke="#c9a45c"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-[20px] bg-white p-8 shadow-heavy">
          <span
            aria-hidden
            className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-gold-light via-gold to-transparent"
          />

          {status === 'success' ? (
            <div ref={successRef} tabIndex={-1} role="status" className="py-10 text-center outline-none">
              <span
                aria-hidden
                className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-2xl text-gold"
              >
                ✓
              </span>
              <p className="mb-2 font-serif text-2xl font-bold text-navy">Recebido!</p>
              <p className="text-muted">Analisaremos o seu cenário e retornaremos em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label htmlFor="cta-name" className="mb-1.5 block text-sm font-extrabold text-navy">
                  Nome
                </label>
                <input
                  id="cta-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t('namePlaceholder')}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="cta-phone" className="mb-1.5 block text-sm font-extrabold text-navy">
                  Telefone / WhatsApp
                </label>
                <input
                  id="cta-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={t('phonePlaceholder')}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="cta-situation"
                  className="mb-1.5 block text-sm font-extrabold text-navy"
                >
                  {t('situationLabel')}
                </label>
                <textarea
                  id="cta-situation"
                  name="situation"
                  rows={3}
                  placeholder={t('situationPlaceholder')}
                  required
                  className={`${inputClass} resize-y`}
                />
              </div>

              {status === 'error' && (
                <p role="alert" className="text-sm text-red-600">
                  Algo deu errado. Tente novamente ou fale no WhatsApp.
                </p>
              )}

              <button
                type="submit"
                aria-disabled={status === 'loading'}
                aria-busy={status === 'loading'}
                onClick={(event) => {
                  if (status === 'loading') event.preventDefault()
                }}
                className="btn-navy w-full aria-disabled:opacity-60"
              >
                {status === 'loading' ? 'Enviando…' : t('submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
