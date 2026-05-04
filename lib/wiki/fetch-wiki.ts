/**
 * Fetch functions for GitHub Wiki content with ISR caching.
 */

import { getWikiPage, type WikiPage } from './wiki-manifest'

const OWNER = 'gfargo'
const REPO = 'vercel-doorman'
const WIKI_RAW_BASE = `https://raw.githubusercontent.com/wiki/${OWNER}/${REPO}`

/** Revalidation interval in seconds (1 hour). */
const REVALIDATE = 3600

/**
 * Fetch raw markdown for a wiki page by its wikiPath.
 * Returns `null` on any failure (never throws).
 */
export async function fetchWikiPage(wikiPath: string): Promise<string | null> {
  try {
    const url = `${WIKI_RAW_BASE}/${wikiPath}.md`
    const res = await fetch(url, { next: { revalidate: REVALIDATE } })
    if (!res.ok) return null
    return res.text()
  } catch {
    return null
  }
}

/**
 * Fetch a wiki page by its URL slug, returning both the manifest
 * metadata and the raw markdown content.
 */
export async function fetchWikiPageBySlug(slug: string): Promise<{ page: WikiPage; content: string | null } | null> {
  const page = getWikiPage(slug)
  if (!page) return null
  const content = await fetchWikiPage(page.wikiPath)
  return { page, content }
}

/**
 * Fetch all wiki pages in parallel. Useful for search indexing or sitemaps.
 */
export async function fetchAllWikiPages(): Promise<{ page: WikiPage; content: string | null }[]> {
  const { getWikiCategories } = await import('./wiki-manifest')
  const allPages = getWikiCategories().flatMap((c) => c.pages)
  return Promise.all(
    allPages.map(async (page) => {
      const content = await fetchWikiPage(page.wikiPath)
      return { page, content }
    }),
  )
}
