'use client'

import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { BugIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Footer = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <footer
      className={
        isHome
          ? 'border-t border-white/[0.08] bg-[#0a0d11] opacity-70 hover:opacity-100 transition-opacity'
          : 'opacity-40 hover:opacity-60 transition-opacity'
      }
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
            <p className={isHome ? 'font-[family-name:var(--font-space-mono)] text-xs text-[#8b98a5]' : 'text-xs'}>
              &copy; {new Date().getFullYear()}{' '}
              <a
                href="https://griffen.codes"
                className={isHome ? 'hover:text-[#93e2ff] hover:underline' : 'hover:underline'}
              >
                griffen.codes
              </a>
            </p>
          </div>
          <div className="w-full md:w-auto flex justify-center md:justify-end space-x-6">
            <Link
              href="https://discord.gg/KGu9nE9Ejx"
              className={
                isHome ? 'text-[#8b98a5] hover:text-[#93e2ff] transition-colors' : 'text-gray-600 hover:text-black transition-colors'
              }
            >
              <DiscordLogoIcon className="w-4 h-4" />
              <span className="sr-only">Discord</span>
            </Link>
            <Link
              href="https://github.com/gfargo/doorman/issues"
              className={
                isHome ? 'text-[#8b98a5] hover:text-[#93e2ff] transition-colors' : 'text-gray-600 hover:text-black transition-colors'
              }
            >
              <BugIcon className="w-4 h-4" />
              <span className="sr-only">Issues</span>
            </Link>
            <Link
              href="https://github.com/gfargo/doorman"
              className={
                isHome ? 'text-[#8b98a5] hover:text-[#93e2ff] transition-colors' : 'text-gray-600 hover:text-black transition-colors'
              }
            >
              <GitHubLogoIcon className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
