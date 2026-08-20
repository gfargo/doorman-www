'use client'

import { cn } from '@/lib/utils'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

export const HeaderNavbar = ({ dark = false }: { dark?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="">
      <div className="flex justify-between items-center h-16">
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={cn(
              'p-2 transition-colors',
              dark ? 'text-[#8b98a5] hover:text-[#e7edf3]' : 'text-gray-400 hover:text-black',
              { 'text-black': isMenuOpen && !dark, 'text-[#e7edf3]': isMenuOpen && dark },
            )}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center ">
          <DesktopLinks dark={dark} />
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={cn(
            'md:hidden absolute left-0 border-t w-full border-b shadow-lg z-10',
            dark ? 'bg-[#0a0d11] border-white/[0.08]' : 'bg-white',
          )}
        >
          <MobileLinks setIsMenuOpen={setIsMenuOpen} dark={dark} />
        </div>
      )}
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

const MobileLinks = ({
  setIsMenuOpen,
  dark,
}: {
  setIsMenuOpen: (isOpen: boolean) => void
  dark: boolean
}) => (
  <div className="flex flex-col space-y-4 p-4">
    <Link
      href="/docs"
      onClick={() => setIsMenuOpen(false)}
      className={
        dark ? 'text-[#8b98a5] hover:text-[#93e2ff] transition-colors' : 'text-gray-600 hover:text-black transition-colors'
      }
    >
      Docs <span className="sr-only">Documentation</span>
    </Link>
    <Link
      href="/docs/getting-started"
      onClick={() => setIsMenuOpen(false)}
      className={
        dark
          ? 'bg-[#4fc3e8] text-[#0a0d11] px-4 py-2 rounded-[3px] text-center transition-colors hover:bg-[#93e2ff]'
          : 'bg-black text-white px-4 py-2 rounded-md text-center transition-colors hover:bg-gray-800'
      }
    >
      Get Started
    </Link>
    <Link
      href="https://github.com/gfargo/doorman"
      target="_blank"
      className={
        dark
          ? 'text-[#8b98a5] hover:text-[#93e2ff] transition-colors flex items-center'
          : 'text-gray-600 hover:text-black transition-colors flex items-center'
      }
    >
      View on GitHub <GitHubLogoIcon className="w-6 h-6 ml-1.5" />
    </Link>
  </div>
)
