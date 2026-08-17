import type { Metadata } from 'next'
import NotFoundContent from '@/components/NotFoundContent'

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: true },
}

/** 404 para rotas dentro do locale (ex.: slug de área inexistente). */
export default function LocaleNotFound() {
  return <NotFoundContent />
}
