import type { MetadataRoute } from 'next'
import { sanityClient } from '@/sanity/client'
import { allSlugsQuery } from '@/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://faustosettecamara.com.br'

  let slugs = { practiceAreas: [], attorneys: [], posts: [], courses: [] } as {
    practiceAreas: { slug: string }[]
    attorneys: { slug: string }[]
    posts: { slug: string; publishedAt?: string }[]
    courses: { slug: string }[]
  }

  try {
    slugs = await sanityClient?.fetch(allSlugsQuery) ?? slugs
  } catch {
    // fallback to empty if Sanity not configured
  }

  const staticRoutes: { route: string; priority: number }[] = [
    { route: '', priority: 1 },
    { route: '/sobre', priority: 0.8 },
    { route: '/areas-de-atuacao', priority: 0.8 },
    { route: '/cursos', priority: 0.8 },
    { route: '/blog', priority: 0.8 },
    { route: '/contato', priority: 0.8 },
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const { route, priority } of staticRoutes) {
    entries.push({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: 'weekly', priority })
  }
  for (const { slug } of slugs.practiceAreas) {
    entries.push({ url: `${baseUrl}/areas-de-atuacao/${slug}`, changeFrequency: 'monthly', priority: 0.7 })
  }
  for (const { slug } of slugs.attorneys) {
    entries.push({ url: `${baseUrl}/attorneys/${slug}`, changeFrequency: 'monthly', priority: 0.7 })
  }
  for (const { slug } of slugs.courses) {
    entries.push({ url: `${baseUrl}/cursos/${slug}`, changeFrequency: 'monthly', priority: 0.7 })
  }
  for (const { slug, publishedAt } of slugs.posts) {
    entries.push({ url: `${baseUrl}/blog/${slug}`, lastModified: publishedAt ? new Date(publishedAt) : new Date(), changeFrequency: 'yearly', priority: 0.6 })
  }

  return entries
}
