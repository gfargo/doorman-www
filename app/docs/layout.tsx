import { DocsSidebar } from '@/components/docs'
import { getWikiCategories } from '@/lib/wiki'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Vercel Doorman documentation — manage firewall rules as code across Vercel and Cloudflare.',
}

export const revalidate = 3600

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const categories = getWikiCategories()

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="flex gap-10">
        <DocsSidebar categories={categories} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
