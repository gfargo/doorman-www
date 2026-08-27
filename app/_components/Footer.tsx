'use client'

import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { BugIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DoormanMark } from '@/components/icons/DoormanMark'
import { archivo, chakraPetch, spaceMono } from '@/lib/fonts'
import { DOORMAN_VERSION } from '@/lib/version'

type FooterLink = { label: string; href: string; external?: boolean }

const LINK_COLUMNS: Array<{ heading: string; links: FooterLink[] }> = [
  {
    heading: 'Product',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Rule Builder', href: '/rule-builder' },
      { label: 'Getting Started', href: '/docs/getting-started' },
    ],
  },
  {
    heading: 'Providers',
    links: [
      { label: 'Vercel', href: '/vercel' },
      { label: 'Cloudflare', href: '/cloudflare' },
      { label: 'Fastly', href: '/fastly' },
      { label: 'Google Cloud Armor', href: '/gcp' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'GitHub', href: 'https://github.com/gfargo/doorman', external: true },
      { label: 'npm package', href: 'https://www.npmjs.com/package/@gfargo/doorman', external: true },
      { label: 'Example configs', href: 'https://github.com/gfargo/doorman/tree/main/examples', external: true },
      { label: 'Report an issue', href: 'https://github.com/gfargo/doorman/issues', external: true },
    ],
  },
]

const SOCIAL_LINKS = [
  { label: 'Discord', href: 'https://discord.gg/KGu9nE9Ejx', Icon: DiscordLogoIcon },
  { label: 'Issues', href: 'https://github.com/gfargo/doorman/issues', Icon: BugIcon },
  { label: 'GitHub', href: 'https://github.com/gfargo/doorman', Icon: GitHubLogoIcon },
]

export const Footer = () => {
  const pathname = usePathname()
  const isDarkRoute = ['/', '/rule-builder', '/vercel', '/cloudflare', '/fastly', '/gcp'].includes(pathname)

  if (!isDarkRoute) {
    return <LightFooter />
  }

  return (
    <footer
      className={`${chakraPetch.variable} ${archivo.variable} ${spaceMono.variable} relative overflow-hidden border-t border-white/[0.08] bg-[#050708] text-[#e7edf3]`}
      style={{ fontFamily: 'var(--font-archivo)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(231,237,243,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(231,237,243,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4fc3e8]/40 to-transparent"
      />

      <div className="container relative mx-auto px-4 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_2fr]">
          {/* Brand */}
          <div className="max-w-[300px]">
            <Link
              href="/"
              className="flex items-center gap-2 font-[family-name:var(--font-chakra)] text-lg font-bold uppercase tracking-wide text-[#e7edf3]"
            >
              <DoormanMark className="h-6 w-6" ledClassName="fill-[#39e075]" pulse />
              Doorman
            </Link>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-[#8b98a5]">
              Multi-provider WAF automation as code. Define a rule once, enforce it everywhere, review it in a pull
              request.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-[#2a333c] text-[#8b98a5] transition-colors hover:border-[#1c6f8c] hover:text-[#93e2ff]"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {LINK_COLUMNS.map((column) => (
              <div key={column.heading}>
                <h3 className="font-[family-name:var(--font-space-mono)] text-[0.68rem] uppercase tracking-[0.2em] text-[#4e5a66]">
                  {column.heading}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener' : undefined}
                        className="text-[0.9rem] text-[#8b98a5] transition-colors hover:text-[#93e2ff]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-[family-name:var(--font-space-mono)] text-[0.72rem] text-[#8b98a5]">
            &copy; {new Date().getFullYear()}{' '}
            <a href="https://griffen.codes" className="text-[#8b98a5] transition-colors hover:text-[#93e2ff]">
              griffen.codes
            </a>
          </p>
          <p className="font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-wide text-[#4e5a66]">
            System status: <span className="text-[#39e075]">&#9679; Operational</span>
            <span className="mx-1.5">&middot;</span> Doorman v{DOORMAN_VERSION}
          </p>
        </div>
      </div>
    </footer>
  )
}

function LightFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-mono font-bold text-gray-900">
              <DoormanMark className="h-5 w-5" ledClassName="fill-current" />
              Doorman
            </Link>
            <nav className="flex items-center gap-4 text-sm text-gray-600">
              <Link href="/docs" className="transition-colors hover:text-black">
                Docs
              </Link>
              <Link href="/rule-builder" className="transition-colors hover:text-black">
                Rule Builder
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()}{' '}
              <a href="https://griffen.codes" className="transition-colors hover:text-black hover:underline">
                griffen.codes
              </a>
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="text-gray-500 transition-colors hover:text-black"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
