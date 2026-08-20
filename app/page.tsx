import { Book, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { CopyableCommand } from '../components/CopyableCommand'
import { CommandLogEntry } from '@/components/home/CommandLogEntry'
import { GettingStarted } from '@/components/home/GettingStarted'
import { ProviderTerminals } from '@/components/home/ProviderTerminals'
import { TrafficPanel } from '@/components/home/TrafficPanel'
import { archivo, chakraPetch, spaceMono } from '@/lib/fonts'
import { DOORMAN_VERSION } from '@/lib/version'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Doorman',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Cross-platform',
  description:
    'Manage Vercel, Cloudflare, and Fastly WAF rules as code with version control and CI/CD integration. CLI tool for syncing, downloading, validating, and deploying multi-provider security configurations.',
  url: siteUrl,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Unified Vercel, Cloudflare, and Fastly WAF management',
    'Version control and code review for firewall rules',
    'CI/CD automation for security deployments',
    'Provider-aware sync and drift detection',
    'Download and audit rule history',
    'Pre-configured policy templates',
    'Adopt existing hand-configured rules with zero rework',
  ],
  softwareHelp: {
    '@type': 'WebPage',
    url: `${siteUrl}/docs`,
  },
  installUrl: 'https://www.npmjs.com/package/@gfargo/doorman',
  screenshot: `${siteUrl}/og-image.jpg`,
}

const INSTALL_COMMAND = [
  { value: 'npm', command: 'npm install -g @gfargo/doorman' },
  { value: 'yarn', command: 'yarn global add @gfargo/doorman' },
  { value: 'pnpm', command: 'pnpm add -g @gfargo/doorman' },
  { value: 'bun', command: 'bun add -g @gfargo/doorman' },
]

const COMMANDS = [
  {
    number: '01',
    title: 'Now shipping to Fastly',
    description:
      'The same status, diff, and sync workflow you already run for Vercel and Cloudflare, now pointed at Fastly Next‑Gen WAF. No new commands, no new config format, just a third provider.',
    command: [
      { value: 'npm', command: 'npx @gfargo/doorman sync --provider fastly' },
      { value: 'yarn', command: 'npx @gfargo/doorman sync --provider fastly' },
      { value: 'pnpm', command: 'pnpm dlx @gfargo/doorman@latest sync --provider fastly' },
      { value: 'bun', command: 'bunx --bun @gfargo/doorman@latest sync --provider fastly' },
    ],
    imageSrc: '/gifs/fastly-sync.gif',
    imageWidth: 1900,
    imageHeight: 900,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Sync changes',
    description:
      'Synchronize rule packs to Vercel, Cloudflare, and Fastly from the same config. Catch drift with provider-aware diffs before anything ships.',
    command: [
      { value: 'npm', command: 'npx @gfargo/doorman sync' },
      { value: 'yarn', command: 'npx @gfargo/doorman sync' },
      { value: 'pnpm', command: 'pnpm dlx @gfargo/doorman@latest sync' },
      { value: 'bun', command: 'bunx --bun @gfargo/doorman@latest sync' },
    ],
    imageSrc: '/gifs/sync.gif',
    imageWidth: 1900,
    imageHeight: 700,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path d="M17 2l4 4-4 4M3 12v-2a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 12v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Download configs',
    description:
      'Export deployed rules from each provider into versioned config files. Keep Vercel, Cloudflare, and Fastly in lockstep with Git history.',
    command: [
      { value: 'npm', command: 'npx @gfargo/doorman download' },
      { value: 'yarn', command: 'npx @gfargo/doorman download' },
      { value: 'pnpm', command: 'pnpm dlx @gfargo/doorman@latest download' },
      { value: 'bun', command: 'bunx --bun @gfargo/doorman@latest download' },
    ],
    imageSrc: '/gifs/download.gif',
    imageWidth: 1900,
    imageHeight: 800,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'List rules & IPs',
    description:
      'Inspect deployed policies with human-friendly tables or JSON. Filter by provider, environment, and rule group in seconds.',
    command: [
      { value: 'npm', command: 'npx @gfargo/doorman list' },
      { value: 'yarn', command: 'npx @gfargo/doorman list' },
      { value: 'pnpm', command: 'pnpm dlx @gfargo/doorman@latest list' },
      { value: 'bun', command: 'bunx --bun @gfargo/doorman@latest list' },
    ],
    imageSrc: '/gifs/list.gif',
    imageWidth: 1900,
    imageHeight: 800,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Validate rules',
    description:
      'Validate rule syntax and provider-specific constraints before deployment. Ship with confidence knowing every provider will accept the change.',
    command: [
      { value: 'npm', command: 'npx @gfargo/doorman validate' },
      { value: 'yarn', command: 'npx @gfargo/doorman validate' },
      { value: 'pnpm', command: 'pnpm dlx @gfargo/doorman@latest validate' },
      { value: 'bun', command: 'bunx --bun @gfargo/doorman@latest validate' },
    ],
    imageSrc: '/gifs/validate.gif',
    imageWidth: 1200,
    imageHeight: 600,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path d="M9 12.5 11 15l4.5-5.5M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Use templates',
    description:
      'Kickstart new protections with templates tuned for Vercel, Cloudflare, and Fastly. Customize and extend policy packs as your edge footprint grows.',
    command: [
      { value: 'npm', command: 'npx @gfargo/doorman template' },
      { value: 'yarn', command: 'npx @gfargo/doorman template' },
      { value: 'pnpm', command: 'pnpm dlx @gfargo/doorman@latest template' },
      { value: 'bun', command: 'bunx --bun @gfargo/doorman@latest template' },
    ],
    imageSrc: '/gifs/template-picker.gif',
    imageWidth: 1200,
    imageHeight: 600,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v5h5" />
      </svg>
    ),
  },
  {
    number: '07',
    title: 'Adopt existing rules',
    description:
      'Already have rules configured by hand in the Vercel dashboard? Download them into a versioned config, validate the result, and commit. No rework required.',
    command: [
      { value: 'npm', command: 'npx @gfargo/doorman download' },
      { value: 'yarn', command: 'npx @gfargo/doorman download' },
      { value: 'pnpm', command: 'pnpm dlx @gfargo/doorman@latest download' },
      { value: 'bun', command: 'bunx --bun @gfargo/doorman@latest download' },
    ],
    imageSrc: '/gifs/import-existing.gif',
    imageWidth: 1900,
    imageHeight: 900,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <div
      className={`${chakraPetch.variable} ${archivo.variable} ${spaceMono.variable} min-h-screen bg-[#0a0d11] text-[#e7edf3]`}
      style={{ fontFamily: 'var(--font-archivo)' }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="[&_h1]:font-[family-name:var(--font-chakra)] [&_h2]:font-[family-name:var(--font-chakra)] [&_h1]:uppercase [&_h2]:uppercase">
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-20 pt-16 md:px-0 md:pb-24 md:pt-24">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 1000px 560px at 82% 8%, rgba(79,195,232,0.1), transparent 60%)',
            }}
          />
          <div className="container relative mx-auto grid items-center gap-12 md:grid-cols-[1.12fr_0.88fr]">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-[3px] border border-[#4fc3e8]/20 bg-[#4fc3e8]/[0.05] px-4 py-2 font-[family-name:var(--font-space-mono)] text-[0.68rem] uppercase tracking-wide text-[#93e2ff]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39e075] shadow-[0_0_8px_#39e075]" />
                Now supporting Fastly Next&#8209;Gen WAF
              </span>

              <h1 className="mt-6 text-[2.6rem] leading-[1.02] tracking-tight md:text-[3.5rem] lg:text-[4.4rem]">
                Where W<span className="text-[#93e2ff]">&#9650;</span>F meets .config
              </h1>

              <p className="mx-auto mt-6 max-w-[480px] text-[1rem] text-[#8b98a5] md:mx-0 md:text-[1.1rem]">
                One config decides what gets through. Doorman enforces the same rules on{' '}
                <strong className="font-semibold text-[#e7edf3]">
                  <Link
                    className="underline decoration-[#2a333c] underline-offset-4 hover:decoration-[#93e2ff]"
                    href="https://vercel.com/docs/security/vercel-firewall"
                    target="_blank"
                  >
                    Vercel Firewall
                  </Link>
                </strong>
                ,{' '}
                <strong className="font-semibold text-[#e7edf3]">
                  <Link
                    className="underline decoration-[#2a333c] underline-offset-4 hover:decoration-[#93e2ff]"
                    href="https://developers.cloudflare.com/waf"
                    target="_blank"
                  >
                    Cloudflare WAF
                  </Link>
                </strong>
                , and{' '}
                <strong className="font-semibold text-[#e7edf3]">
                  <Link
                    className="underline decoration-[#2a333c] underline-offset-4 hover:decoration-[#93e2ff]"
                    href="https://www.fastly.com/documentation/guides/next-gen-waf/"
                    target="_blank"
                  >
                    Fastly Next&#8209;Gen WAF
                  </Link>
                </strong>
                .
              </p>

              <div className="mt-8 flex justify-center md:justify-start">
                <CopyableCommand command={INSTALL_COMMAND} dark />
              </div>

              <p className="mt-6 font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-wide text-[#4e5a66]">
                System status: <span className="text-[#39e075]">&#9679; Operational</span>{' '}
                <span className="mx-1.5">&middot;</span> Doorman v{DOORMAN_VERSION}
              </p>
            </div>

            <div className="flex justify-center">
              <TrafficPanel />
            </div>
          </div>
        </section>

        <ScanDivider />

        {/* Getting started */}
        <section className="px-4 py-16 md:px-0 md:py-24" id="getting-started">
          <div className="container mx-auto">
            <div className="mx-auto mb-14 max-w-[620px] text-center">
              <span className="mb-3 block font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[#4fc3e8]">
                Getting started
              </span>
              <h2 className="text-[1.8rem] md:text-[2.75rem]">Same four steps. Any provider.</h2>
              <p className="mt-4 text-[1.03rem] text-[#8b98a5]">
                Install, initialize, connect your provider, ship. The steps don&apos;t change whether you&apos;re on
                Vercel, Cloudflare, or Fastly, only the credentials do.
              </p>
            </div>

            <GettingStarted />
          </div>
        </section>

        <ScanDivider />

        {/* Providers */}
        <section className="bg-[#050708] px-4 py-16 md:px-0 md:py-24" id="providers">
          <div className="container mx-auto">
            <div className="mx-auto mb-12 max-w-[620px] text-center">
              <span className="mb-3 block font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[#4fc3e8]">
                Supported providers
              </span>
              <h2 className="text-[1.8rem] md:text-[2.75rem]">One rule. Three providers.</h2>
              <p className="mt-4 text-[1.03rem] text-[#8b98a5]">
                doorman is the source of truth. Vercel gets the rule as-is. Cloudflare gets a Wirefilter expression.
                Fastly gets a Next-Gen WAF rule.
              </p>
            </div>

            <ProviderTerminals />
          </div>
        </section>

        <ScanDivider />

        {/* Commands */}
        <section className="px-4 py-16 md:px-0 md:py-24" id="features">
          <div className="container mx-auto">
            <div className="mx-auto mb-16 max-w-[620px] text-center">
              <span className="mb-3 block font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[#4fc3e8]">
                Commands
              </span>
              <h2 className="text-[1.8rem] md:text-[2.75rem]">What doorman does</h2>
              <p className="mt-4 text-[1.03rem] text-[#8b98a5]">
                Every doorman command, explained. Copy any line straight into your terminal.
              </p>
            </div>

            <div>
              {COMMANDS.map((entry, i) => (
                <CommandLogEntry key={entry.number} {...entry} reverse={i % 2 === 1} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="border-t border-white/[0.08] bg-[#050708] px-4 py-16 text-center md:px-0 md:py-24"
          style={{
            backgroundImage: 'radial-gradient(ellipse 800px 500px at 50% 100%, rgba(79,195,232,0.1), transparent 70%)',
          }}
        >
          <div className="container mx-auto">
            <h2 className="text-[1.9rem] md:text-[3rem]">Rules enforced.</h2>
            <p className="mx-auto mt-4 mb-9 max-w-[480px] text-[#8b98a5]">
              Bring Vercel, Cloudflare, and Fastly WAF automation into the same review process your team already
              trusts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-[3px] bg-[#4fc3e8] px-6 py-3 font-[family-name:var(--font-space-mono)] text-[0.82rem] uppercase tracking-wide text-[#0a0d11] transition-transform hover:-translate-y-0.5 hover:bg-[#93e2ff]"
              >
                <Book className="h-4 w-4" />
                View docs
              </Link>
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center gap-2 rounded-[3px] border border-[#2a333c] px-6 py-3 font-[family-name:var(--font-space-mono)] text-[0.82rem] uppercase tracking-wide text-[#8b98a5] transition-colors hover:border-[#1c6f8c] hover:text-[#e7edf3]"
              >
                Getting started
              </Link>
              <Link
                href="https://github.com/gfargo/doorman/tree/main/examples"
                className="inline-flex items-center gap-2 rounded-[3px] border border-[#2a333c] px-6 py-3 font-[family-name:var(--font-space-mono)] text-[0.82rem] uppercase tracking-wide text-[#8b98a5] transition-colors hover:border-[#1c6f8c] hover:text-[#e7edf3]"
              >
                <ExternalLink className="h-4 w-4" />
                Example configs
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function ScanDivider() {
  return (
    <div className="mx-auto h-px w-full max-w-[1000px] bg-gradient-to-r from-transparent via-[#4fc3e8]/25 to-transparent" />
  )
}
