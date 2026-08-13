import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { sanityClient } from '@/sanity/client'
import { attorneyBySlugQuery, attorneysQuery } from '@/sanity/queries'
import { urlFor } from '@/lib/sanity-image'
import type { AttorneyFull } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSiteData } from '@/lib/site-data'

export async function generateStaticParams() {
  const attorneys = await sanityClient?.fetch(attorneysQuery).catch(() => []) ?? []
  return attorneys.map((a: { slug: string }) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const attorney: AttorneyFull | null = await sanityClient
    ?.fetch(attorneyBySlugQuery, { slug })
    .catch(() => null) ?? null

  if (!attorney) return {}
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    title: attorney.name,
    description: attorney.seo?.description ?? `${attorney.name} — ${attorney.title}.`,
    alternates: { canonical: `${siteUrl}/attorneys/${slug}` },
  }
}

export default async function AttorneyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const t = await getTranslations('attorneys')
  const data = await getSiteData()

  const attorney: AttorneyFull | null = await sanityClient
    ?.fetch(attorneyBySlugQuery, { slug })
    .catch(() => null) ?? null

  if (!attorney) notFound()

  const photoUrl = attorney.photo ? urlFor(attorney.photo)?.width(600).height(700).fit('crop').url() : null

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />
      <main id="main-content" className="py-20">
        <div className="container-fw">
          <Link href={`/${locale}/attorneys`} className="text-gold hover:underline text-sm font-bold mb-8 inline-block">
            {t('backToAttorneys')}
          </Link>

          <div className="grid md:grid-cols-[340px_1fr] gap-12 mt-6">
            {/* Photo column */}
            <div>
              <div className="relative h-[420px] md:h-[520px] rounded-[24px] overflow-hidden bg-gradient-to-br from-navy to-navy-soft shadow-heavy">
                {photoUrl ? (
                  <Image src={photoUrl} alt={attorney.name} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm font-bold uppercase tracking-wider">
                    Photo Placeholder
                  </div>
                )}
              </div>

              {/* Contact card */}
              <div className="mt-6 bg-white rounded-[18px] p-6 border border-[#ececec] shadow-card">
                {attorney.email && (
                  <a href={`mailto:${attorney.email}`} className="flex items-center gap-3 text-navy hover:text-gold transition-colors mb-3">
                    <span className="text-gold">✉</span>
                    <span className="text-sm">{attorney.email}</span>
                  </a>
                )}
                {attorney.phone && (
                  <a href={`tel:${attorney.phone.replace(/\D/g, '')}`} className="flex items-center gap-3 text-navy hover:text-gold transition-colors">
                    <span className="text-gold">☎</span>
                    <span className="text-sm">{attorney.phone}</span>
                  </a>
                )}
                <Link
                  href="/contato"
                  className="mt-5 block text-center min-h-[44px] leading-[44px] rounded-full bg-gold text-gray-900 font-extrabold text-sm hover:bg-gold-light transition-colors"
                >
                  Falar com o Dr. Fausto
                </Link>
              </div>
            </div>

            {/* Content column */}
            <div>
              <p className="text-gold font-bold text-sm uppercase tracking-wider mb-2">{attorney.title}</p>
              <h1 className="font-serif text-navy text-4xl md:text-5xl font-bold mb-8">{attorney.name}</h1>

              {attorney.bio && (
                <div className="prose prose-lg prose-navy max-w-none mb-10 text-[#1f2933]">
                  <PortableText value={attorney.bio as PortableTextBlock[]} />
                </div>
              )}

              <div className="grid sm:grid-cols-3 gap-6">
                {attorney.specialties && attorney.specialties.length > 0 && (
                  <div>
                    <h3 className="font-serif text-navy font-bold mb-3">{t('specialties')}</h3>
                    <ul className="space-y-1.5">
                      {attorney.specialties.map((s) => (
                        <li key={s} className="text-muted text-sm flex items-start gap-2"><span className="text-gold mt-0.5">▸</span>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {attorney.barMemberships && attorney.barMemberships.length > 0 && (
                  <div>
                    <h3 className="font-serif text-navy font-bold mb-3">{t('barMemberships')}</h3>
                    <ul className="space-y-1.5">
                      {attorney.barMemberships.map((b) => (
                        <li key={b} className="text-muted text-sm flex items-start gap-2"><span className="text-gold mt-0.5">▸</span>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {attorney.education && attorney.education.length > 0 && (
                  <div>
                    <h3 className="font-serif text-navy font-bold mb-3">{t('education')}</h3>
                    <ul className="space-y-1.5">
                      {attorney.education.map((e) => (
                        <li key={e} className="text-muted text-sm flex items-start gap-2"><span className="text-gold mt-0.5">▸</span>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer data={data} locale={locale} />
    </>
  )
}
