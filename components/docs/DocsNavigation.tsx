import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type { WikiPage } from '@/lib/wiki'

type DocsNavigationProps = {
  prev: WikiPage | null
  next: WikiPage | null
}

export function DocsNavigation({ prev, next }: DocsNavigationProps) {
  if (!prev && !next) return null

  return (
    <nav className="flex items-stretch gap-4 mt-12 pt-8 border-t border-gray-200" aria-label="Page navigation">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="flex-1 flex flex-col items-start gap-1 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
            <ChevronLeftIcon className="w-3 h-3" />
            Previous
          </span>
          <span className="font-semibold text-gray-900">{prev.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="flex-1 flex flex-col items-end gap-1 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-gray-50 transition-colors text-right"
        >
          <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
            Next
            <ChevronRightIcon className="w-3 h-3" />
          </span>
          <span className="font-semibold text-gray-900">{next.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
