import { DoorOpenIcon } from 'lucide-react'
import Link from 'next/link'
import { HeaderNavbar } from './HeaderNavbar'

export const Header = () => {
  return (
    <header className="bg-white border-b relative z-20">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-16">
          <Link href="/" className="md:text-xl font-bold font-mono">
            Doorman
            <DoorOpenIcon className="w-6 h-6 inline-block ml-2" />
          </Link>
          <div className="flex items-center space-x-8">
            <HeaderNavbar />
          </div>
        </nav>
      </div>
    </header>
  )
}
