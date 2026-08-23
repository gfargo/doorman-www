'use client'

import { cn } from '@/lib/utils'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const HeaderNavbar = ({ dark = false }: { dark?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <div className="">
      <div className="flex justify-between items-center h-16">
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className={cn(
              'relative z-50 flex h-9 w-9 items-center justify-center transition-colors',
              dark ? 'text-[#e7edf3] hover:text-[#93e2ff]' : 'text-gray-700 hover:text-black',
            )}
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        <div className="hidden md:flex items-center ">
          <DesktopLinks dark={dark} />
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && <MobileMenu dark={dark} onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}

const DesktopLinks = ({ dark }: { dark: boolean }) => (
  <>
    <div className="space-x-4 ml-8 flex items-center">
      <Link
        href="/docs"
        className={
          dark
            ? 'font-[family-name:var(--font-space-mono)] text-[0.78rem] uppercase tracking-wide text-[#8b98a5] transition-colors hover:text-[#93e2ff]'
            : 'text-gray-600 hover:text-black transition-colors'
        }
      >
        Docs
      </Link>
      <Link
        href="/rule-builder"
        className={
          dark
            ? 'font-[family-name:var(--font-space-mono)] text-[0.78rem] uppercase tracking-wide text-[#8b98a5] transition-colors hover:text-[#93e2ff]'
            : 'text-gray-600 hover:text-black transition-colors'
        }
      >
        Rule Builder
      </Link>
      <Link
        href="/docs/getting-started"
        className={
          dark
            ? 'inline-flex items-center gap-2 rounded-[3px] bg-[#4fc3e8] px-4 py-2 font-[family-name:var(--font-space-mono)] text-[0.78rem] uppercase tracking-wide text-[#0a0d11] transition-colors hover:bg-[#93e2ff]'
            : 'bg-black text-white px-4 py-2 rounded-md transition-colors hover:bg-gray-800'
        }
      >
        Get Started
      </Link>
      <Link
        href="https://github.com/gfargo/doorman"
        className={
          dark ? 'text-[#8b98a5] transition-colors hover:text-[#93e2ff]' : 'text-gray-600 hover:text-black transition-colors'
        }
      >
        <GitHubLogoIcon className="w-6 h-6" />
        <span className="sr-only">GitHub</span>
      </Link>
    </div>
  </>
)

const MENU_LINKS = [
  { href: '/docs', label: 'docs' },
  { href: '/rule-builder', label: 'rule-builder' },
  { href: '/docs/getting-started', label: 'get-started', accent: true },
  { href: 'https://github.com/gfargo/doorman', label: 'github', external: true },
]

function MobileMenu({ dark, onClose }: { dark: boolean; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className={cn(
        'fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto md:hidden',
        dark ? 'bg-[#0a0d11]' : 'bg-white',
      )}
    >
      {dark ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(231,237,243,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(231,237,243,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      ) : null}

      <div className={cn('relative flex items-center gap-2 border-b px-6 py-3', dark ? 'border-white/[0.08]' : 'border-gray-100')}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span
          className={cn(
            'ml-2 font-[family-name:var(--font-space-mono)] text-[0.68rem] uppercase tracking-[0.15em]',
            dark ? 'text-[#4e5a66]' : 'text-gray-400',
          )}
        >
          menu.sh
        </span>
      </div>

      <nav className="relative flex flex-col px-6 pt-4">
        {MENU_LINKS.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 + i * 0.05, duration: 0.25 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener' : undefined}
              className={cn(
                'flex items-center gap-3 border-b py-5 font-[family-name:var(--font-chakra)] text-2xl uppercase tracking-wide transition-colors',
                dark ? 'border-white/[0.06] text-[#e7edf3] hover:text-[#93e2ff]' : 'border-gray-100 text-gray-900 hover:text-gray-500',
                link.accent && (dark ? 'text-[#4fc3e8]' : 'text-blue-600'),
              )}
            >
              <span
                className={cn(
                  'font-[family-name:var(--font-space-mono)] text-base normal-case',
                  dark ? 'text-[#39e075]' : 'text-emerald-600',
                )}
              >
                $
              </span>
              {link.label}
              {link.external ? <GitHubLogoIcon className="ml-1 h-5 w-5" /> : null}
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={cn(
            'mt-8 flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-wide',
            dark ? 'text-[#4e5a66]' : 'text-gray-400',
          )}
        >
          <span className={cn('h-2 w-2 animate-pulse rounded-full', dark ? 'bg-[#39e075]' : 'bg-emerald-500')} />
          ready
        </motion.div>
      </nav>
    </motion.div>
  )
}
