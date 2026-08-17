'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const STORAGE_KEY = 'cookie_consent'

export default function CookieConsent() {
  const t = useTranslations('cookie')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'all')
    window.dispatchEvent(new Event('cookie_consent_granted'))
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'essential')
    setVisible(false)
  }

  if (!visible) return null

  return (
    // `role="region"` e não `dialog`: o aviso não é modal, não prende o foco e
    // não deve ser anunciado como diálogo. `z-30` fica abaixo do "voltar ao
    // topo" (z-40), que dividia o mesmo canto.
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="enter fixed inset-x-4 bottom-4 z-30 mx-auto max-w-3xl overflow-hidden rounded-[20px] border border-white/10 bg-navy-dark/95 text-white shadow-heavy backdrop-blur-md sm:inset-x-5 sm:bottom-5"
    >
      <span aria-hidden className="rule-gold absolute inset-x-0 top-0" />
      <div className="flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="max-w-xl text-sm text-slate-300">
          {t('message')}{' '}
          <Link
            href="/privacidade"
            className="link-underline font-semibold text-gold-light"
          >
            {t('learnMore')}
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button onClick={decline} className="btn-outline min-h-[42px] px-5 text-[0.82rem]">
            {t('essentialOnly')}
          </button>
          <button onClick={accept} className="btn-gold min-h-[42px] px-5 text-[0.82rem]">
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </div>
  )
}
