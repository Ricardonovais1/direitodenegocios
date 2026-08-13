import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { sanityClient } from '@/sanity/client'
import { practiceAreaBySlugQuery, practiceAreasQuery } from '@/sanity/queries'
import { urlFor } from '@/lib/sanity-image'
import type { PracticeAreaFull } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSiteData } from '@/lib/site-data'

export async function generateStaticParams() {
  const areas = await sanityClient?.fetch(practiceAreasQuery).catch(() => []) ?? []
  return areas.map((a: { slug: string }) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const area: PracticeAreaFull | null = await sanityClient
    ?.fetch(practiceAreaBySlugQuery, { slug })
    .catch(() => null) ?? null

  if (!area) return {}
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    title: area.seo?.title ?? area.title,
    description: area.seo?.description ?? area.description,
    alternates: { canonical: `${siteUrl}/areas-de-atuacao/${slug}` },
  }
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const data = await getSiteData()

  const area: PracticeAreaFull | null = await sanityClient
    ?.fetch(practiceAreaBySlugQuery, { slug })
    .catch(() => null) ?? null

  if (!area) notFound()

  const coverUrl = area.coverImage
    ? urlFor(area.coverImage)?.width(1200).height(500).fit('crop').url()
    : null

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />
      <main id="main-content">
        <div
          className="py-20 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(110deg, rgba(9,20,34,0.96), rgba(15,31,51,0.86)), #0f1f33' }}
        >
          <div className="container-fw">
            <Link href="/areas-de-atuacao" className="text-gold-light text-sm hover:underline mb-4 inline-block">
              ← Todas as áreas de atuação
            </Link>
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">{area.number}</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold max-w-3xl">{area.title}</h1>
            <p className="text-slate-300 text-lg max-w-xl mt-4">{area.description}</p>
            <Link
              href="/contato"
              className="mt-8 inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-gold text-gray-900 font-extrabold hover:bg-gold-light transition-colors"
            >
              Agendar uma consulta
            </Link>
          </div>
        </div>

        {coverUrl && (
          <div className="relative h-[320px] md:h-[420px] w-full">
            <Image src={coverUrl} alt={area.title} fill className="object-cover" />
          </div>
        )}

        <section className="py-16">
          <div className="container-fw max-w-3xl">
            {area.fullContent ? (
              <div className="prose prose-lg prose-navy max-w-none text-[#1f2933]">
                <PortableText value={area.fullContent as PortableTextBlock[]} />
              </div>
            ) : (
              <p className="text-muted text-lg">
                Conteúdo completo desta área em breve. Enquanto isso, entre em contato para uma consulta.
              </p>
            )}

            <div className="mt-12 p-8 bg-navy rounded-[18px] text-white text-center">
              <h2 className="font-serif text-2xl font-bold mb-3">Precisa de apoio em {area.title}?</h2>
              <p className="text-slate-300 mb-6">Estou disponível para uma consulta objetiva e sem compromisso.</p>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-gold text-gray-900 font-extrabold hover:bg-gold-light transition-colors"
              >
                Agendar uma consulta
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer data={data} locale={locale} />
    </>
  )
}
