import { ArrowRightIcon, BookOpenIcon } from 'lucide-react'
import Link from 'next/link'
import { CopyableCommand } from '@/components/CopyableCommand'

export interface ProviderLandingContent {
  name: string
  wafName: string
  officialDocsUrl: string
  tagline: string
  installNote: string
  envVars: Array<{ name: string; note?: string }>
  syncCommand: string
  highlights: Array<{ title: string; body: string }>
  docsHref: string
}

const INSTALL_COMMAND = [
  { value: 'npm', command: 'npm install -g @gfargo/doorman' },
  { value: 'yarn', command: 'yarn global add @gfargo/doorman' },
  { value: 'pnpm', command: 'pnpm add -g @gfargo/doorman' },
  { value: 'bun', command: 'bun add -g @gfargo/doorman' },
]

export function ProviderLanding({ content }: { content: ProviderLandingContent }) {
  const exportLines = content.envVars.map((v) => `export ${v.name}="..."${v.note ? `  # ${v.note}` : ''}`).join('\n')

  return (
    <main className="px-4 py-16 md:px-0 md:py-24">
      <div className="container mx-auto max-w-[880px]">
        <div className="mb-16 text-center">
          <span className="mb-3 block font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[#4fc3e8]">
            For {content.name}
          </span>
          <h1 className="font-[family-name:var(--font-chakra)] text-[2rem] uppercase leading-[1.05] tracking-tight text-[#e7edf3] md:text-[3rem]">
            Doorman for{' '}
            <Link
              href={content.officialDocsUrl}
              target="_blank"
              className="underline decoration-[#2a333c] underline-offset-4 hover:decoration-[#93e2ff]"
            >
              {content.wafName}
            </Link>
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[1.05rem] text-[#8b98a5]">{content.tagline}</p>

          <div className="mt-8 flex justify-center">
            <CopyableCommand command={INSTALL_COMMAND} dark />
          </div>
          <p className="mt-4 font-[family-name:var(--font-space-mono)] text-[0.72rem] text-[#4e5a66]">{content.installNote}</p>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {content.highlights.map((h) => (
            <div key={h.title} className="min-w-0 rounded-[8px] border border-[#2a333c] bg-[#0e1319] p-5">
              <h3 className="font-[family-name:var(--font-chakra)] text-[0.95rem] uppercase tracking-wide text-[#e7edf3]">
                {h.title}
              </h3>
              <p className="mt-2 text-[0.9rem] text-[#8b98a5]">{h.body}</p>
            </div>
          ))}
        </div>

        <div className="mb-16 rounded-[8px] border border-[#2a333c] bg-[#0e1319] p-6">
          <h2 className="mb-4 font-[family-name:var(--font-chakra)] text-[0.95rem] uppercase tracking-wide text-[#e7edf3]">
            Environment variables
          </h2>
          <pre className="overflow-x-auto rounded-[4px] border border-[#2a333c] bg-[#131920] p-4 font-[family-name:var(--font-space-mono)] text-[0.8rem] leading-relaxed text-[#e7edf3]">
            {exportLines}
          </pre>
          <p className="mt-4 font-[family-name:var(--font-space-mono)] text-[0.7rem] text-[#4e5a66]">
            Nothing set yet? Doorman prompts you for credentials the first time it needs them.
          </p>
          <div className="mt-5">
            <span className="mb-2 block font-[family-name:var(--font-space-mono)] text-[0.68rem] uppercase tracking-wide text-[#4e5a66]">
              Then ship
            </span>
            <CopyableCommand dark command={[{ value: 'npm', command: content.syncCommand }]} />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={content.docsHref}
            className="inline-flex items-center gap-2 rounded-[3px] bg-[#4fc3e8] px-6 py-3 font-[family-name:var(--font-space-mono)] text-[0.82rem] uppercase tracking-wide text-[#0a0d11] transition-transform hover:-translate-y-0.5 hover:bg-[#93e2ff]"
          >
            <BookOpenIcon className="h-4 w-4" />
            Full {content.name} setup guide
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[3px] border border-[#2a333c] px-6 py-3 font-[family-name:var(--font-space-mono)] text-[0.82rem] uppercase tracking-wide text-[#8b98a5] transition-colors hover:border-[#1c6f8c] hover:text-[#e7edf3]"
          >
            See all providers
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
