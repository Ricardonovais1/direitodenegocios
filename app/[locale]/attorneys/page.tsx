import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { sanityClient } from '@/sanity/client'
import { attorneysQuery } from '@/sanity/queries'
import { urlFor } from '@/lib/sanity-image'
import type { Attorney } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSiteData } from '@/lib/site-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    title: 'Equipe — Fausto Sette Câmara',
    description: 'Advocacia próxima e comprometida com a proteção do seu negócio.',
    alternates: { canonical: `${siteUrl}/attorneys` },
  }
}

const fallbackAttorneys: Attorney[] = [
  { _id: 'a1', name: 'Fausto Sette Câmara', slug: 'fausto-sette-camara', title: 'Advogado — Direito de Negócios', specialties: ['Direito de Negócios', 'Direito de TI', 'Direito do Trabalho'] },
]

export default async function AttorneysPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('attorneys')
  const data = await getSiteData()

  const attorneys: Attorney[] = await sanityClient
    ?.fetch(attorneysQuery)
    .catch(() => fallbackAttorneys) ?? fallbackAttorneys

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />
      <main id="main-content" className="py-20">
        <div className="container-fw">
          <div className="max-w-2xl mb-12">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">{t('eyebrow')}</p>
            <h1 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight mb-4">
              {t('heading')}
            </h1>
            <p className="text-muted text-lg">{t('subheading')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {attorneys.map((attorney) => {
              const photoUrl = attorney.photo ? urlFor(attorney.photo)?.width(400).height(480).fit('crop').url() : null
              return (
                <Link
                  key={attorney._id}
                  href={`/${locale}/attorneys/${attorney.slug}`}
                  className="group block bg-white rounded-[18px] overflow-hidden border border-[#ececec] shadow-card hover:shadow-heavy hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-64 bg-gradient-to-br from-navy to-navy-soft">
                    {photoUrl ? (
                      <Image src={photoUrl} alt={attorney.name} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm font-bold uppercase tracking-wider">
                        Photo Placeholder
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-serif text-navy text-xl font-bold mb-1">{attorney.name}</h2>
                    <p className="text-gold text-sm font-bold mb-3">{attorney.title}</p>
                    {attorney.specialties && (
                      <div className="flex flex-wrap gap-1.5">
                        {attorney.specialties.slice(0, 3).map((s) => (
                          <span key={s} className="text-xs bg-offwhite text-muted rounded-full px-3 py-1">{s}</span>
                        ))}
                      </div>
                    )}
                    <p className="text-gold text-sm font-bold mt-4 group-hover:underline">{t('viewProfile')} →</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer data={data} locale={locale} />
    </>
  )
}
