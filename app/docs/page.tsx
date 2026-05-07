import Link from 'next/link'
import { ArrowRightIcon, BookOpenIcon, GitBranchIcon, PackageIcon, TerminalIcon } from 'lucide-react'
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

const categoryMeta: Record<string, { accent: string; icon: string; gradient: string }> = {
  'Getting Started': {
    accent: 'emerald',
    icon: '▶',
    gradient: 'from-emerald-500/10 to-emerald-500/0',
  },
  Configuration: {
    accent: 'amber',
    icon: '◆',
    gradient: 'from-amber-500/10 to-amber-500/0',
  },
  Commands: {
    accent: 'sky',
    icon: '⬡',
    gradient: 'from-sky-500/10 to-sky-500/0',
  },
  Guides: {
    accent: 'violet',
    icon: '◈',
    gradient: 'from-violet-500/10 to-violet-500/0',
  },
}

const accentColors: Record<string, { dot: string; border: string; text: string; bg: string }> = {
  emerald: {
    dot: 'bg-emerald-500',
    border: 'border-emerald-200 hover:border-emerald-400',
    text: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  amber: {
    dot: 'bg-amber-500',
    border: 'border-amber-200 hover:border-amber-400',
    text: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  sky: {
    dot: 'bg-sky-500',
    border: 'border-sky-200 hover:border-sky-400',
    text: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  violet: {
    dot: 'bg-violet-500',
    border: 'border-violet-200 hover:border-violet-400',
    text: 'text-violet-600',
    bg: 'bg-violet-50',
  },
}

export default async function DocsIndex() {
  const categories = getWikiCategories()

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

  const totalPages = categoriesWithDescriptions.reduce((sum, c) => sum + c.pages.length, 0)

  return (
    <div className="relative">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative">
        {/* Hero Section — asymmetric editorial layout */}
        <div className="mb-16">
          <div className="flex items-start gap-4 mb-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900 text-slate-300">
              <TerminalIcon className="w-3 h-3" />
              <span className="text-[10px] font-mono uppercase tracking-widest">docs</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent self-center" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.05] mt-6">
            Learn
            <br />
            <span className="text-slate-400">Doorman</span>
          </h1>

          <div className="mt-6 flex items-start gap-8 flex-col md:flex-row">
            <p className="text-lg text-slate-500 max-w-md leading-relaxed">
              Everything you need to manage firewall rules as code across Vercel and Cloudflare — from first install to
              production CI/CD.
            </p>

            <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {totalPages} pages
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500" />
                {categories.length} sections
              </div>
            </div>
          </div>

          {/* Quick Start CTA */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/docs/getting-started"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all hover:gap-3.5"
            >
              Quick Start
              <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com/gfargo/vercel-doorman/wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:border-slate-400 hover:text-slate-900 transition-colors"
            >
              <GitBranchIcon className="w-3.5 h-3.5" />
              GitHub Wiki
            </a>
          </div>
        </div>

        {/* Terminal-style Quick Start block */}
        <div className="mb-14 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 bg-slate-50/80">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-3 text-[10px] font-mono text-slate-400 uppercase tracking-wider">quick start</span>
          </div>
          <div className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700 mb-1">Get running in 60 seconds</p>
                <p className="text-xs text-slate-400">Install, configure, and deploy your first firewall rules.</p>
              </div>
              <div className="flex items-center gap-3">
                <code className="px-3 py-1.5 rounded-md bg-slate-900 text-emerald-400 text-xs font-mono">
                  npx vercel-doorman init
                </code>
                <Link
                  href="/docs/getting-started"
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Read guide
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categoriesWithDescriptions.map((category, idx) => {
            const meta = categoryMeta[category.name] ?? {
              accent: 'slate',
              icon: '●',
              gradient: 'from-slate-500/10 to-slate-500/0',
            }
            const colors = accentColors[meta.accent] ?? accentColors.emerald!

            return (
              <div
                key={category.name}
                className={`group relative rounded-xl border ${colors.border} bg-white p-6 transition-all hover:shadow-lg hover:shadow-slate-100`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Gradient accent top */}
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${meta.gradient}`} />

                {/* Category header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md ${colors.bg} ${colors.text} text-sm font-mono`}>
                      {meta.icon}
                    </span>
                    <h2 className="font-semibold text-slate-900 text-base">{category.name}</h2>
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 uppercase">
                    {category.pages.length} {category.pages.length === 1 ? 'page' : 'pages'}
                  </span>
                </div>

                {/* Page list */}
                <ul className="space-y-1">
                  {category.pages.map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={`/docs/${page.slug}`}
                        className="group/link flex items-start gap-3 px-3 py-2 -mx-3 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <span className={`mt-2 w-1 h-1 rounded-full ${colors.dot} shrink-0 opacity-40 group-hover/link:opacity-100 transition-opacity`} />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-slate-700 group-hover/link:text-slate-900 transition-colors">
                            {page.title}
                          </span>
                          {page.description && (
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 group-hover/link:text-slate-500 transition-colors">
                              {page.description}
                            </p>
                          )}
                        </div>
                        <ArrowRightIcon className="w-3 h-3 mt-1.5 text-slate-300 opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Resources footer */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Resources</span>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-100 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-6">
            <a
              href="https://github.com/gfargo/vercel-doorman"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-sm text-slate-400 hover:text-slate-700 transition-colors"
            >
              <GitBranchIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowRightIcon className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a
              href="https://www.npmjs.com/package/vercel-doorman"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-sm text-slate-400 hover:text-slate-700 transition-colors"
            >
              <PackageIcon className="w-4 h-4" />
              <span>npm</span>
              <ArrowRightIcon className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a
              href="https://github.com/gfargo/vercel-doorman/wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-sm text-slate-400 hover:text-slate-700 transition-colors"
            >
              <BookOpenIcon className="w-4 h-4" />
              <span>Wiki</span>
              <ArrowRightIcon className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
