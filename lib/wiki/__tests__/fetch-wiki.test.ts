import { describe, it, expect } from 'vitest'
import { getWikiCategories } from '../wiki-manifest'

/**
 * Integration test: verifies every page in the manifest is actually
 * fetchable from the live GitHub Wiki. This catches broken wikiPath
 * values or missing wiki pages.
 *
 * Gated behind RUN_INTEGRATION env var so `pnpm test` stays fast
 * and offline-safe. Run explicitly with `pnpm test:integration`.
 */
const WIKI_RAW_BASE = 'https://raw.githubusercontent.com/wiki/gfargo/doorman'

const shouldRun = process.env.RUN_INTEGRATION === '1' || process.env.RUN_INTEGRATION === 'true'

describe.skipIf(!shouldRun)('wiki fetch integration', () => {
  const allPages = getWikiCategories().flatMap((c) => c.pages)

  it.each(allPages.map((p) => [p.slug, p.wikiPath]))(
    'wiki page "%s" (wikiPath: %s) is fetchable',
    async (_slug, wikiPath) => {
      const url = `${WIKI_RAW_BASE}/${wikiPath}.md`
      const res = await fetch(url)
      expect(res.ok).toBe(true)

      const text = await res.text()
      expect(text.length).toBeGreaterThan(0)
      // Every wiki page should have at least an H1
      expect(text).toMatch(/^#\s+/m)
    },
    10_000, // 10s timeout per page
  )

  it('_Sidebar.md is fetchable', async () => {
    const res = await fetch(`${WIKI_RAW_BASE}/_Sidebar.md`)
    expect(res.ok).toBe(true)
  })
})
