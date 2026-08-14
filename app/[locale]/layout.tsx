import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Analytics from '@/components/Analytics'
import CookieConsent from '@/components/CookieConsent'
import LiveChat from '@/components/LiveChat'
import '../globals.css'

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://faustosettecamara.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Fausto Sette Câmara — Direito de Negócios e Empresarial',
    template: '%s | Fausto Sette Câmara',
  },
  description:
    'Advogado de Direito de Negócios com 15+ anos de experiência. Estratégia, tática e leitura de jogo para empresas, startups e empresários. Atuação nacional.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'Fausto Sette Câmara',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:bg-gold focus:text-gray-900 focus:font-bold focus:px-5 focus:py-3 focus:rounded-br-lg"
        >
          Pular para o conteúdo principal
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
          <LiveChat />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
