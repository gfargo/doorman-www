'use client'

import { cn } from '@/lib/utils'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

export const HeaderNavbar = () => {
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
            className={cn('p-2 text-gray-400 hover:text-black transition-colors', {
              'text-black': isMenuOpen,
            })}
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
          <DesktopLinks />
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute left-0 border-t w-full border-b shadow-lg z-10">
          <MobileLinks setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
    </div>
  )
}

const DesktopLinks = () => (
  <>
    <div className="space-x-4 ml-8 flex items-center">
      <Link href="/docs" className="text-gray-600 hover:text-black transition-colors">
        Docs
      </Link>
      <Link
        href="/docs/getting-started"
        className="bg-black text-white px-4 py-2 rounded-md transition-colors hover:bg-gray-800"
      >
        Get Started
      </Link>
      <Link
        href="https://github.com/gfargo/doorman"
        className="text-gray-600 hover:text-black transition-colors"
      >
        <GitHubLogoIcon className="w-6 h-6" />
        <span className="sr-only">GitHub</span>
      </Link>
    </div>
  </>
)

const MobileLinks = ({ setIsMenuOpen }: { setIsMenuOpen: (isOpen: boolean) => void }) => (
  <div className="flex flex-col space-y-4 p-4">
    <Link
      href="/docs"
      onClick={() => setIsMenuOpen(false)}
      className="text-gray-600 hover:text-black transition-colors"
    >
      Docs <span className="sr-only">Documentation</span>
    </Link>
    <Link
      href="/docs/getting-started"
      onClick={() => setIsMenuOpen(false)}
      className="bg-black text-white px-4 py-2 rounded-md text-center transition-colors hover:bg-gray-800"
    >
      Get Started
    </Link>
    <Link
      href="https://github.com/gfargo/doorman"
      target="_blank"
      className="text-gray-600 hover:text-black transition-colors flex items-center"
    >
      View on GitHub <GitHubLogoIcon className="w-6 h-6 ml-1.5" />
    </Link>
  </div>
)
