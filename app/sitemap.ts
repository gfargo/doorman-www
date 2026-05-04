import type { MetadataRoute } from 'next'
import { getAllWikiSlugs } from '@/lib/wiki'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'

export default function sitemap(): MetadataRoute.Sitemap {
  const docSlugs = getAllWikiSlugs()

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...docSlugs.map((slug) => ({
      url: `${siteUrl}/docs/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
