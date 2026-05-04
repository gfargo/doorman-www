import Link from 'next/link'
import { ArrowRightIcon, BookOpenIcon, GithubIcon, PackageIcon } from 'lucide-react'
import { getWikiCategories, fetchWikiPage, extractExcerpt } from '@/lib/wiki'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Vercel Doorman documentation — learn how to manage Vercel and Cloudflare firewall rules as code with version control and CI/CD integration.',
  alternates: { canonical: '/docs' },
  openGraph: {
    type: 'website',
    title: 'Documentation | Vercel Doorman',
    description: 'Manage Vercel and Cloudflare firewall rules as code with version control and CI/CD integration.',
    url: `${siteUrl}/docs`,
    siteName: 'Vercel Doorman',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation | Vercel Doorman',
    description: 'Manage Vercel and Cloudflare firewall rules as code with version control and CI/CD integration.',
    images: ['/og-image.jpg'],
  },
}

const categoryIcons: Record<string, string> = {
  'Getting Started': '🚀',
  Configuration: '⚙️',
  Commands: '💻',
  Guides: '📖',
}

export default async function DocsIndex() {
  const categories = getWikiCategories()

  // Fetch descriptions for all pages in parallel
  const categoriesWithDescriptions = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      pages: await Promise.all(
        category.pages.map(async (page) => {
          if (page.description) return page
          const content = await fetchWikiPage(page.wikiPath)
          return { ...page, description: content ? extractExcerpt(content) : '' }
        }),
      ),
    })),
  )

  return (
    <div>
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Documentation</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Learn how to manage Vercel and Cloudflare firewall rules as code with version control and CI/CD integration.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Get Started
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/gfargo/vercel-doorman/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            View Wiki
          </a>
        </div>
      </div>

      {/* Quick Start Card */}
      <Link
        href="/docs/getting-started"
        className="block p-6 mb-10 rounded-lg border-2 border-blue-200 bg-blue-50/50 hover:border-blue-400 transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Quick Start Guide</h2>
            <p className="mt-1 text-sm text-gray-600">
              Install Doorman, create your first config, and deploy firewall rules in minutes.
            </p>
          </div>
          <ArrowRightIcon className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithDescriptions.map((category) => (
          <div
            key={category.name}
            className="rounded-lg border border-gray-200 p-5 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{categoryIcons[category.name] ?? '📄'}</span>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
            </div>
            <ul className="space-y-2">
              {category.pages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/docs/${page.slug}`}
                    className="group flex items-start gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowRightIcon className="w-3 h-3 mt-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <span className="font-medium">{page.title}</span>
                      {page.description && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{page.description}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Resources */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/gfargo/vercel-doorman"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub Repository
          </a>
          <a
            href="https://www.npmjs.com/package/vercel-doorman"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <PackageIcon className="w-4 h-4" />
            npm Package
          </a>
          <a
            href="https://github.com/gfargo/vercel-doorman/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <BookOpenIcon className="w-4 h-4" />
            GitHub Wiki
          </a>
        </div>
      </div>
    </div>
  )
}
