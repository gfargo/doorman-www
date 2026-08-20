'use client'

import { DoormanMark } from '@/components/icons/DoormanMark'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeaderNavbar } from './HeaderNavbar'

export const Header = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header
      className={
        isHome
          ? 'relative z-20 border-b border-white/[0.08] bg-[#0a0d11]'
          : 'bg-white border-b relative z-20'
      }
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-16">
          <Link
            href="/"
            className={
              isHome
                ? 'flex items-center gap-2 font-[family-name:var(--font-chakra)] text-lg font-bold uppercase tracking-wide text-[#e7edf3]'
                : 'md:text-xl font-bold font-mono flex items-center gap-2'
            }
          >
            <DoormanMark
              className="h-6 w-6"
              ledClassName={isHome ? 'fill-[#39e075]' : 'fill-current'}
              pulse={isHome}
            />
            Doorman
          </Link>
          <div className="flex items-center space-x-8">
            <HeaderNavbar dark={isHome} />
          </div>
        </nav>
      </div>
    </header>
  )
}
