'use client'

import { useState, useEffect } from 'react'
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
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-navy-dark text-white border-t border-white/10 shadow-heavy"
    >
      <div className="container-fw flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5">
        <p className="text-sm text-slate-300 max-w-xl">
          {t('message')}{' '}
          <a href="/privacy" className="text-gold-light underline hover:no-underline">
            {t('learnMore')}
          </a>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="min-h-[40px] px-5 rounded-full border border-white/30 text-sm font-bold hover:border-white/60 transition-colors"
          >
            {t('essentialOnly')}
          </button>
          <button
            onClick={accept}
            className="min-h-[40px] px-5 rounded-full bg-gold text-gray-900 text-sm font-extrabold hover:bg-gold-light transition-colors"
          >
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </div>
  )
}
