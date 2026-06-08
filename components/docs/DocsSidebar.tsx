'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BookIcon, ChevronRightIcon, MenuIcon, XIcon } from 'lucide-react'
import type { WikiCategory } from '@/lib/wiki'

type DocsSidebarProps = {
  categories: WikiCategory[]
}

export function DocsSidebar({ categories }: DocsSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const nav = (
    <nav aria-label="Documentation navigation">
      <Link
        href="/docs"
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium mb-4 transition-colors',
          pathname === '/docs' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
        )}
      >
        <BookIcon className="w-4 h-4" />
        Documentation
      </Link>

      {categories.map((category) => (
        <div key={category.name} className="mb-6">
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{category.name}</h3>
          <ul className="space-y-0.5">
            {category.pages.map((page) => {
              const href = `/docs/${page.slug}`
              const isActive = pathname === href
              return (
                <li key={page.slug}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors',
                      isActive
                        ? 'text-gray-900 bg-gray-100 font-medium border-l-2 border-blue-500 -ml-0.5 pl-[calc(0.75rem+2px)]'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 ml-0',
                    )}
                  >
                    {isActive && <ChevronRightIcon className="w-3 h-3 shrink-0" />}
                    <span>{page.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      <div className="mt-8 pt-4 border-t border-gray-200">
        <a
          href="https://github.com/gfargo/doorman/wiki"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          View on GitHub Wiki
        </a>
      </div>
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-8">{nav}</div>
      </aside>

      {/* Mobile FAB */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-colors"
        aria-label="Open documentation menu"
      >
        <MenuIcon className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <span className="font-semibold text-gray-900">Documentation</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100"
                aria-label="Close menu"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">{nav}</div>
          </div>
        </div>
      )}
    </>
  )
}
