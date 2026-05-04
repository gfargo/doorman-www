/**
 * Markdown processing utilities.
 *
 * - Transform absolute GitHub Wiki links into internal /docs/ routes
 * - Extract a short description from markdown content
 */

import { getWikiCategories } from './wiki-manifest'

const WIKI_LINK_RE = /\[([^\]]+)\]\(https:\/\/github\.com\/gfargo\/vercel-doorman\/wiki\/([^)]+)\)/gi

/**
 * Convert absolute GitHub Wiki URLs in markdown to internal `/docs/` routes.
 * Unrecognised wiki links are left as-is.
 */
export function transformWikiLinks(markdown: string): string {
  const allPages = getWikiCategories().flatMap((c) => c.pages)

  return markdown.replace(WIKI_LINK_RE, (match, label: string, wikiPath: string) => {
    const decoded = decodeURIComponent(wikiPath).replace(/_edit$/, '')
    const page = allPages.find((p) => p.wikiPath.toLowerCase() === decoded.toLowerCase())
    if (page) {
      return `[${label}](/docs/${page.slug})`
    }
    return match
  })
}

/**
 * Convert `[[Page Title]]` wiki-style links to internal `/docs/` routes.
 */
export function transformWikiStyleLinks(markdown: string): string {
  const allPages = getWikiCategories().flatMap((c) => c.pages)

  return markdown.replace(/\[\[([^\]]+)\]\]/g, (match, title: string) => {
    const page = allPages.find(
      (p) =>
        p.title.toLowerCase() === title.trim().toLowerCase() ||
        p.wikiPath.toLowerCase() === title.trim().replace(/\s+/g, '-').toLowerCase(),
    )
    if (page) {
      return `[${page.title}](/docs/${page.slug})`
    }
    return match
  })
}

/**
 * Process markdown content before rendering.
 */
export function processMarkdown(markdown: string, options?: { transformLinks?: boolean }): string {
  let result = markdown
  if (options?.transformLinks !== false) {
    result = transformWikiLinks(result)
    result = transformWikiStyleLinks(result)
  }
  return result
}

/**
 * Extract a short description from markdown content.
 * Skips the leading H1, headings, code blocks, lists, blockquotes,
 * and image-only lines. Returns the first meaningful prose paragraph,
 * truncated to ~160 characters.
 */
export function extractExcerpt(content: string, maxLength = 160): string {
  const lines = content.split('\n')
  let skippedH1 = false
  let inCodeBlock = false

  for (const line of lines) {
    const trimmed = line.trim()

    // Toggle code blocks
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    // Skip H1 (first one only)
    if (!skippedH1 && trimmed.startsWith('# ')) {
      skippedH1 = true
      continue
    }

    // Skip other headings
    if (trimmed.startsWith('#')) continue

    // Skip lists, blockquotes, images, empty lines, HTML, tables
    if (
      trimmed === '' ||
      trimmed.startsWith('-') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('>') ||
      trimmed.startsWith('![') ||
      trimmed.startsWith('<') ||
      trimmed.startsWith('|')
    ) {
      continue
    }

    // Found a prose paragraph
    const clean = trimmed
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // strip links
      .replace(/[*_`]/g, '') // strip formatting
      .trim()

    if (clean.length === 0) continue

    if (clean.length <= maxLength) return clean
    return clean.slice(0, maxLength - 1).replace(/\s+\S*$/, '') + '…'
  }

  return ''
}
