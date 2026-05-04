import { describe, it, expect } from 'vitest'
import {
    getWikiCategories,
    getWikiPage,
    getAllWikiSlugs,
    getAdjacentPages,
} from '../wiki-manifest'

describe('wiki-manifest', () => {
  describe('getWikiCategories', () => {
    it('returns categories sorted by order', () => {
      const categories = getWikiCategories()
      expect(categories.length).toBeGreaterThan(0)

      for (let i = 1; i < categories.length; i++) {
        expect(categories[i].order).toBeGreaterThanOrEqual(categories[i - 1].order)
      }
    })

    it('returns pages sorted within each category', () => {
      const categories = getWikiCategories()

      for (const category of categories) {
        for (let i = 1; i < category.pages.length; i++) {
          expect(category.pages[i].order).toBeGreaterThanOrEqual(category.pages[i - 1].order)
        }
      }
    })

    it('includes expected categories', () => {
      const categories = getWikiCategories()
      const names = categories.map((c) => c.name)

      expect(names).toContain('Getting Started')
      expect(names).toContain('Configuration')
      expect(names).toContain('Commands')
      expect(names).toContain('Guides')
    })

    it('every page has required fields', () => {
      const categories = getWikiCategories()
      const allPages = categories.flatMap((c) => c.pages)

      for (const page of allPages) {
        expect(page.slug).toBeTruthy()
        expect(page.title).toBeTruthy()
        expect(page.wikiPath).toBeTruthy()
        expect(page.category).toBeTruthy()
        expect(typeof page.order).toBe('number')
      }
    })

    it('has no duplicate slugs', () => {
      const slugs = getAllWikiSlugs()
      const unique = new Set(slugs)
      expect(unique.size).toBe(slugs.length)
    })

    it('has no duplicate wikiPaths', () => {
      const categories = getWikiCategories()
      const allPages = categories.flatMap((c) => c.pages)
      const wikiPaths = allPages.map((p) => p.wikiPath)
      const unique = new Set(wikiPaths)
      expect(unique.size).toBe(wikiPaths.length)
    })
  })

  describe('getWikiPage', () => {
    it('returns a page for a valid slug', () => {
      const page = getWikiPage('getting-started')
      expect(page).not.toBeNull()
      expect(page!.title).toBe('Getting Started')
      expect(page!.wikiPath).toBe('Getting-Started')
    })

    it('returns null for an unknown slug', () => {
      const page = getWikiPage('nonexistent-page')
      expect(page).toBeNull()
    })
  })

  describe('getAllWikiSlugs', () => {
    it('returns all slugs', () => {
      const slugs = getAllWikiSlugs()
      expect(slugs.length).toBeGreaterThan(0)
      expect(slugs).toContain('getting-started')
      expect(slugs).toContain('configuration')
      expect(slugs).toContain('commands-overview')
    })
  })

  describe('getAdjacentPages', () => {
    it('returns prev and next for a middle page', () => {
      const slugs = getAllWikiSlugs()
      // Pick a slug that's not first or last
      if (slugs.length >= 3) {
        const middleSlug = slugs[1]
        const { prev, next } = getAdjacentPages(middleSlug)
        expect(prev).not.toBeNull()
        expect(next).not.toBeNull()
      }
    })

    it('returns null prev for the first page', () => {
      const categories = getWikiCategories()
      const firstPage = categories[0].pages[0]
      const { prev } = getAdjacentPages(firstPage.slug)
      expect(prev).toBeNull()
    })

    it('returns null next for the last page', () => {
      const categories = getWikiCategories()
      const lastCategory = categories[categories.length - 1]
      const lastPage = lastCategory.pages[lastCategory.pages.length - 1]
      const { next } = getAdjacentPages(lastPage.slug)
      expect(next).toBeNull()
    })

    it('returns both null for an unknown slug', () => {
      const { prev, next } = getAdjacentPages('nonexistent')
      expect(prev).toBeNull()
      expect(next).toBeNull()
    })
  })
})
