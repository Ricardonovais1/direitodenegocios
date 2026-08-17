import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import NotFoundContent from '@/components/NotFoundContent'
import { routing } from '@/i18n/routing'
import messages from '@/messages/pt-BR.json'
import './globals.css'

const fontHeading = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Página não encontrada | Fausto Sette Câmara',
  robots: { index: false, follow: true },
}

/**
 * 404 global — para URLs que nem chegam a casar com o segmento `[locale]`.
 * Como `app/layout.tsx` só repassa `children`, o `<html>`/`<body>` precisa
 * ser montado aqui; caso contrário o Next lança
 * "Missing <html> and <body> tags in the root layout".
 */
export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale} className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body>
        <NextIntlClientProvider locale={routing.defaultLocale} messages={messages}>
          <NotFoundContent />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
