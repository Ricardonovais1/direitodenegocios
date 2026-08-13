'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function Analytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    // Check existing consent
    if (localStorage.getItem('cookie_consent') === 'all') {
      setConsented(true)
      return
    }
    // Listen for consent granted event
    const handler = () => setConsented(true)
    window.addEventListener('cookie_consent_granted', handler)
    return () => window.removeEventListener('cookie_consent_granted', handler)
  }, [])

  if (!GA_ID || !consented) return null
  return <GoogleAnalytics gaId={GA_ID} />
}
