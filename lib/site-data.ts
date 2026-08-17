import { sanityClient } from '@/sanity/client'
import {
  siteSettingsQuery,
  practiceAreasQuery,
  faqsQuery,
  caseResultsQuery,
  testimonialsQuery,
  coursesQuery,
} from '@/sanity/queries'
import { fallbackData } from './fallback-data'
import type { SiteData } from '@/types'

/** Usa o valor do Sanity só quando a lista existe e não está vazia. */
function list<T>(fromSanity: T[] | undefined | null, fallback: T[]): T[] {
  return fromSanity?.length ? fromSanity : fallback
}

export async function getSiteData(): Promise<SiteData> {
  if (!sanityClient) return fallbackData

  try {
    const [settings, practiceAreas, faqs, caseResults, testimonials, courses] = await Promise.all([
      sanityClient.fetch(siteSettingsQuery),
      sanityClient.fetch(practiceAreasQuery),
      sanityClient.fetch(faqsQuery),
      sanityClient.fetch(caseResultsQuery),
      sanityClient.fetch(testimonialsQuery),
      sanityClient.fetch(coursesQuery),
    ])

    if (!settings) return fallbackData

    // O merge é feito seção a seção de propósito. Um spread raso substituiria
    // objetos inteiros: um `siteSettings` salvo com `hero.heading` preenchido e
    // `hero.highlights` vazio apagaria os highlights do fallback e quebraria o
    // build (as páginas são estáticas). O schema do Sanity não marca esses
    // campos como obrigatórios, então a defesa mora aqui.
    return {
      ...fallbackData,
      ...settings,
      hero: {
        ...fallbackData.hero,
        ...(settings.hero ?? {}),
        highlights: list(settings.hero?.highlights, fallbackData.hero.highlights),
      },
      about: {
        ...fallbackData.about,
        ...(settings.about ?? {}),
        features: list(settings.about?.features, fallbackData.about.features),
      },
      footer: { ...fallbackData.footer, ...(settings.footer ?? {}) },
      seo: { ...fallbackData.seo, ...(settings.seo ?? {}) },
      stats: list(settings.stats, fallbackData.stats),
      process: list(settings.process, fallbackData.process),
      officeHours: list(settings.officeHours, fallbackData.officeHours),
      awards: list(settings.awards, fallbackData.awards ?? []),
      practiceAreas: list(practiceAreas, fallbackData.practiceAreas),
      faqs: list(faqs, fallbackData.faqs),
      caseResults: list(caseResults, fallbackData.caseResults ?? []),
      testimonials: list(testimonials, fallbackData.testimonials),
      courses: list(courses, fallbackData.courses ?? []),
    }
  } catch {
    return fallbackData
  }
}
