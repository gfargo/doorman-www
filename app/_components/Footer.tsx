import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { BugIcon } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="opacity-40 hover:opacity-60 transition-opacity">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
            <p className="text-xs">
              &copy; {new Date().getFullYear()}{' '}
              <a href="https://griffen.codes" className="hover:underline">
                griffen.codes
              </a>
            </p>
          </div>
          <div className="w-full md:w-auto flex justify-center md:justify-end space-x-6">
            <Link href="https://discord.gg/KGu9nE9Ejx" className="text-gray-600 hover:text-black transition-colors">
              <DiscordLogoIcon className="w-6 h-6" />
              <span className="sr-only">Discord</span>
            </Link>
            <Link
              href="https://github.com/gfargo/doorman/issues"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <BugIcon className="w-6 h-6" />
              <span className="sr-only">Issues</span>
            </Link>
            <Link
              href="https://github.com/gfargo/doorman"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <GitHubLogoIcon className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
