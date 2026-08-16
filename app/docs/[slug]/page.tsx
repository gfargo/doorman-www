import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLinkIcon } from 'lucide-react'
import { DocsContent, DocsNavigation } from '@/components/docs'
import {
    getAllWikiSlugs,
    getWikiPage,
    getAdjacentPages,
    fetchWikiPage,
    processMarkdown,
    extractExcerpt,
} from '@/lib/wiki'
import type { Metadata } from 'next'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllWikiSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getWikiPage(slug)
  if (!page) return {}

  const content = await fetchWikiPage(page.wikiPath)
  const description = page.description ?? (content ? extractExcerpt(content) : '')

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'

  return {
    title: page.title,
    description,
    alternates: { canonical: `/docs/${slug}` },
    openGraph: {
      type: 'article',
      title: page.title,
      description,
      url: `${siteUrl}/docs/${slug}`,
      siteName: 'Doorman',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description,
      images: ['/og-image.jpg'],
    },
  }
}

export const revalidate = 3600

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const page = getWikiPage(slug)
  if (!page) notFound()

  const [rawContent, { prev, next }] = await Promise.all([
    fetchWikiPage(page.wikiPath),
    Promise.resolve(getAdjacentPages(slug)),
  ])

  const wikiEditUrl = `https://github.com/gfargo/doorman/wiki/${page.wikiPath}/_edit`
  const wikiViewUrl = `https://github.com/gfargo/doorman/wiki/${page.wikiPath}`

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.title,
    description: page.description ?? '',
    url: `${siteUrl}/docs/${slug}`,
    author: { '@type': 'Organization', name: 'Doorman', url: siteUrl },
    publisher: { '@type': 'Organization', name: 'Doorman', url: siteUrl },
    isPartOf: { '@type': 'TechArticle', name: 'Doorman Documentation', url: `${siteUrl}/docs` },
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
        <Link href="/docs" className="hover:text-gray-600 transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-gray-500 font-medium">{page.category}</span>
        <span>/</span>
        <span className="text-gray-700">{page.title}</span>
      </nav>

      {/* Title block */}
      <div className="mb-8">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{page.category}</span>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-1">{page.title}</h1>
        {page.description && <p className="mt-2 text-lg text-gray-500">{page.description}</p>}
      </div>

      {/* Edit on GitHub */}
      <div className="flex justify-end mb-6">
        <a
          href={wikiEditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Edit on GitHub
          <ExternalLinkIcon className="w-3 h-3" />
        </a>
      </div>

      {/* Wiki content */}
      {rawContent ? (
        <DocsContent content={processMarkdown(rawContent)} />
      ) : (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500 mb-4">This page&apos;s content couldn&apos;t be loaded right now.</p>
          <a
            href={wikiViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            View on GitHub Wiki
            <ExternalLinkIcon className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Source attribution */}
      <p className="mt-8 text-xs text-gray-400">
        This content is sourced from the{' '}
        <a href={wikiViewUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
          GitHub Wiki
        </a>
        .
      </p>

      {/* Prev / Next */}
      <DocsNavigation prev={prev} next={next} />
    </article>
  )
}
