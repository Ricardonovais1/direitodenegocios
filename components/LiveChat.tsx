'use client'

import { useEffect } from 'react'

const PROVIDER = process.env.NEXT_PUBLIC_LIVE_CHAT_PROVIDER
const TAWKTO_ID = process.env.NEXT_PUBLIC_TAWKTO_ID
const CRISP_ID = process.env.NEXT_PUBLIC_CRISP_ID

declare global {
  interface Window {
    Tawk_API?: object
    Tawk_LoadStart?: Date
    CRISP_WEBSITE_ID?: string
    $crisp?: unknown[]
  }
}

export default function LiveChat() {
  useEffect(() => {
    if (PROVIDER === 'tawkto' && TAWKTO_ID) {
      window.Tawk_API = window.Tawk_API ?? {}
      window.Tawk_LoadStart = new Date()
      const s = document.createElement('script')
      s.async = true
      s.src = `https://embed.tawk.to/${TAWKTO_ID}/default`
      s.charset = 'UTF-8'
      s.setAttribute('crossorigin', '*')
      document.body.appendChild(s)
      return () => { document.body.removeChild(s) }
    }

    if (PROVIDER === 'crisp' && CRISP_ID) {
      window.$crisp = []
      window.CRISP_WEBSITE_ID = CRISP_ID
      const s = document.createElement('script')
      s.src = 'https://client.crisp.chat/l.js'
      s.async = true
      document.body.appendChild(s)
      return () => { document.body.removeChild(s) }
    }
  }, [])

  return null
}
