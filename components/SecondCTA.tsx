'use client'

import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import type { SiteData } from '@/types'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass = 'w-full px-4 py-3 border border-[#d9d9d9] rounded-xl bg-white text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition'

export default function SecondCTA({ secondCta }: { secondCta: NonNullable<SiteData['secondCta']> }) {
  const t = useTranslations('secondCta')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('situation') as HTMLTextAreaElement).value,
      email: 'not-provided@placeholder.com',
      role: 'Contato rápido',
    }
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 bg-offwhite">
      <div className="container-fw">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">{t('eyebrow')}</p>
            <h2 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight mb-4">
              {secondCta.heading}
            </h2>
            <p className="text-muted text-lg">{secondCta.body}</p>
          </div>

          {/* Right — short form */}
          <div className="bg-white rounded-[18px] p-8 shadow-heavy">
            {status === 'success' ? (
              <div className="text-center py-8">
                <p className="font-serif text-navy text-2xl font-bold mb-2">Recebido!</p>
                <p className="text-muted">Analisaremos o seu cenário e retornaremos em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder={t('namePlaceholder')}
                  required
                  className={inputClass}
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder={t('phonePlaceholder')}
                  required
                  className={inputClass}
                />
                <div>
                  <label className="block text-navy font-extrabold text-sm mb-1.5">{t('situationLabel')}</label>
                  <textarea
                    name="situation"
                    placeholder={t('situationPlaceholder')}
                    rows={3}
                    required
                    className={`${inputClass} resize-y`}
                  />
                </div>
                {status === 'error' && (
                  <p className="text-red-600 text-sm">Algo deu errado. Tente novamente.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full min-h-[48px] rounded-full bg-navy text-white font-extrabold hover:bg-navy-soft transition-colors disabled:opacity-60"
                >
                  {status === 'loading' ? 'Enviando…' : t('submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
