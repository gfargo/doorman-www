/**
 * Wiki Manifest — the authoritative registry of documentation pages.
 *
 * Each entry maps a URL slug to a GitHub Wiki page. The site fetches
 * raw markdown from the wiki at build/request time and renders it
 * with custom styling.
 */

export type WikiPage = {
  slug: string
  title: string
  wikiPath: string
  category: string
  order: number
  description?: string
}

export type WikiCategory = {
  name: string
  order: number
  pages: WikiPage[]
}

const WIKI_PAGES: WikiPage[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    wikiPath: 'Getting-Started',
    category: 'Getting Started',
    order: 1,
    description: 'Install and configure Doorman in minutes.',
  },
  {
    slug: 'configuration',
    title: 'Configuration',
    wikiPath: 'Configuration',
    category: 'Configuration',
    order: 1,
    description: 'Learn about the JSON configuration file format, rules, conditions, and actions.',
  },
  {
    slug: 'templates',
    title: 'Templates',
    wikiPath: 'Templates',
    category: 'Configuration',
    order: 2,
    description: 'Pre-built rule templates for common security patterns like bot blocking and OFAC compliance.',
  },
  {
    slug: 'examples',
    title: 'Examples',
    wikiPath: 'Examples',
    category: 'Configuration',
    order: 3,
    description: 'Real-world configuration examples for IP blocking, geo-blocking, rate limiting, and more.',
  },
  {
    slug: 'commands-overview',
    title: 'Commands Overview',
    wikiPath: 'Commands-Overview',
    category: 'Commands',
    order: 1,
    description: 'Full reference for all CLI commands including sync, download, validate, and more.',
  },
  {
    slug: 'ci-cd-integration',
    title: 'CI/CD Integration',
    wikiPath: 'CI-CD-Integration',
    category: 'Guides',
    order: 1,
    description: 'Integrate Doorman into GitHub Actions and other CI/CD pipelines.',
  },
  {
    slug: 'vercel-setup',
    title: 'Vercel Setup',
    wikiPath: 'Vercel-Setup',
    category: 'Guides',
    order: 2,
    description: 'Set up Doorman with Vercel Firewall — credentials, configuration, and deployment.',
  },
  {
    slug: 'cloudflare-setup',
    title: 'Cloudflare Setup',
    wikiPath: 'Cloudflare-Setup',
    category: 'Guides',
    order: 3,
    description: 'Set up Doorman with Cloudflare WAF — credentials, configuration, and deployment.',
  },
  {
    slug: 'cloudflare-migration',
    title: 'Cloudflare Migration',
    wikiPath: 'Cloudflare-Migration',
    category: 'Guides',
    order: 4,
    description: 'Migrate firewall rules from Vercel to Cloudflare with automatic rule translation.',
  },
  {
    slug: 'fastly-setup',
    title: 'Fastly Setup',
    wikiPath: 'Fastly-Setup',
    category: 'Guides',
    order: 5,
    description: 'Set up Doorman with Fastly Next-Gen WAF — credentials, configuration, and deployment.',
  },
  {
    slug: 'fastly-migration',
    title: 'Fastly Migration',
    wikiPath: 'Fastly-Migration',
    category: 'Guides',
    order: 6,
    description: 'Migrate firewall rules from Vercel to Fastly Next-Gen WAF with automatic rule translation.',
  },
  {
    slug: 'gcp-setup',
    title: 'GCP Setup',
    wikiPath: 'GCP-Setup',
    category: 'Guides',
    order: 7,
    description: 'Set up Doorman with Google Cloud Armor — credentials, configuration, and deployment.',
  },
]

const CATEGORY_ORDER: Record<string, number> = {
  'Getting Started': 1,
  Configuration: 2,
  Commands: 3,
  Guides: 4,
}

/**
 * Returns all wiki pages grouped by category, sorted by category order
 * then page order within each category.
 */
export function getWikiCategories(): WikiCategory[] {
  const categoryMap = new Map<string, WikiPage[]>()

  for (const page of WIKI_PAGES) {
    const existing = categoryMap.get(page.category) ?? []
    existing.push(page)
    categoryMap.set(page.category, existing)
  }

  return Array.from(categoryMap.entries())
    .map(([name, pages]) => ({
      name,
      order: CATEGORY_ORDER[name] ?? 99,
      pages: pages.sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => a.order - b.order)
}

/**
 * Find a single wiki page by its URL slug.
 */
export function getWikiPage(slug: string): WikiPage | null {
  return WIKI_PAGES.find((p) => p.slug === slug) ?? null
}

/**
 * Return all slugs — used by `generateStaticParams`.
 */
export function getAllWikiSlugs(): string[] {
  return WIKI_PAGES.map((p) => p.slug)
}

/**
 * Get the previous and next pages relative to the given slug,
 * walking the flat ordered list across all categories.
 */
export function getAdjacentPages(slug: string): { prev: WikiPage | null; next: WikiPage | null } {
  const flat = getWikiCategories().flatMap((c) => c.pages)
  const idx = flat.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? (flat[idx - 1] ?? null) : null,
    next: idx < flat.length - 1 ? (flat[idx + 1] ?? null) : null,
  }
}
