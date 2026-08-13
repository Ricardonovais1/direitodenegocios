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

    return {
      ...fallbackData,
      ...settings,
      practiceAreas: practiceAreas?.length ? practiceAreas : fallbackData.practiceAreas,
      faqs: faqs?.length ? faqs : fallbackData.faqs,
      caseResults: caseResults?.length ? caseResults : fallbackData.caseResults,
      testimonials: testimonials?.length ? testimonials : fallbackData.testimonials,
      courses: courses?.length ? courses : fallbackData.courses,
    }
  } catch {
    return fallbackData
  }
}
