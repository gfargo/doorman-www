'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CopyableCommand } from '@/components/CopyableCommand'

type ProviderId = 'vercel' | 'cloudflare' | 'fastly'

const PROVIDER_CREDS: Record<ProviderId, { label: string; vars: Array<{ name: string; note?: string }> }> = {
  vercel: {
    label: 'Vercel',
    vars: [{ name: 'VERCEL_TOKEN' }, { name: 'VERCEL_PROJECT_ID' }, { name: 'VERCEL_TEAM_ID', note: 'optional' }],
  },
  cloudflare: {
    label: 'Cloudflare',
    vars: [
      { name: 'CLOUDFLARE_API_TOKEN' },
      { name: 'CLOUDFLARE_ZONE_ID' },
      { name: 'CLOUDFLARE_ACCOUNT_ID', note: 'optional' },
    ],
  },
  fastly: {
    label: 'Fastly',
    vars: [{ name: 'FASTLY_API_TOKEN' }, { name: 'FASTLY_WORKSPACE_ID' }],
  },
}

const STEP_ANIMATION = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] as const } },
}

function StepRow({
  index,
  title,
  description,
  children,
  isLast = false,
}: {
  index: number
  title: string
  description: string
  children?: React.ReactNode
  isLast?: boolean
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={STEP_ANIMATION}
      className={`relative flex gap-6 ${isLast ? '' : 'pb-12'}`}
    >
      <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#4fc3e8] bg-[#0a0d11] font-[family-name:var(--font-chakra)] text-[0.95rem] font-semibold text-[#93e2ff]">
        {index}
      </div>
      <div className="flex-1 pb-2 pt-1.5">
        <h3 className="font-[family-name:var(--font-chakra)] text-[1.05rem] uppercase tracking-wide text-[#e7edf3]">
          {title}
        </h3>
        <p className="mt-1.5 max-w-[480px] text-[0.95rem] text-[#8b98a5]">{description}</p>
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </motion.div>
  )
}

export function GettingStarted() {
  const [provider, setProvider] = useState<ProviderId>('vercel')
  const [copied, setCopied] = useState(false)
  const creds = PROVIDER_CREDS[provider]

  const exportLines = creds.vars.map((v) => `export ${v.name}="..."${v.note ? `  # ${v.note}` : ''}`).join('\n')

  const copyCreds = async () => {
    await navigator.clipboard.writeText(exportLines)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="mx-auto max-w-[640px]">
      <div className="relative">
        <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#2a333c] to-transparent" />

        <StepRow index={1} title="Install" description="One package, works with any of the three providers below.">
          <CopyableCommand
            dark
            command={[
              { value: 'npm', command: 'npm install -g @gfargo/doorman' },
              { value: 'yarn', command: 'yarn global add @gfargo/doorman' },
              { value: 'pnpm', command: 'pnpm add -g @gfargo/doorman' },
              { value: 'bun', command: 'bun add -g @gfargo/doorman' },
            ]}
          />
        </StepRow>

        <StepRow index={2} title="Initialize" description="Scaffolds a .doorman.json in your project.">
          <CopyableCommand dark command={[{ value: 'npm', command: 'doorman init' }]} />
        </StepRow>

        <StepRow
          index={3}
          title="Connect your provider"
          description="The variable names change, the shape doesn't. A token plus one or two IDs, however you already manage secrets."
        >
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PROVIDER_CREDS) as ProviderId[]).map((id) => (
              <button
                key={id}
                onClick={() => setProvider(id)}
                className={`rounded-[3px] border px-3 py-1.5 font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-wide transition-colors ${
                  provider === id
                    ? 'border-[#4fc3e8] bg-[#4fc3e8] text-[#0a0d11]'
                    : 'border-[#2a333c] text-[#8b98a5] hover:border-[#1c6f8c] hover:text-[#e7edf3]'
                }`}
              >
                {PROVIDER_CREDS[id].label}
              </button>
            ))}
          </div>
          <div className="relative">
            <pre className="overflow-x-auto rounded-[4px] border border-[#2a333c] bg-[#131920] p-4 pr-12 font-[family-name:var(--font-space-mono)] text-[0.8rem] leading-relaxed text-[#e7edf3]">
              {exportLines}
            </pre>
            <button
              onClick={copyCreds}
              aria-label="Copy environment variables"
              className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-[3px] border transition-colors ${
                copied ? 'border-[#1f7a45] text-[#39e075]' : 'border-[#2a333c] text-[#8b98a5] hover:border-[#1c6f8c] hover:text-[#93e2ff]'
              }`}
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5">
                  <rect x="8" y="8" width="12" height="12" rx="1.5" />
                  <path d="M16 8V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v9A1.5 1.5 0 0 0 6 16.5h2" />
                </svg>
              )}
            </button>
          </div>
          <p className="mt-2.5 font-[family-name:var(--font-space-mono)] text-[0.7rem] text-[#4e5a66]">
            Nothing set yet? Doorman prompts you for credentials the first time it needs them.
          </p>
        </StepRow>

        <StepRow index={4} title="Ship it" description="Same command, whichever provider you connected." isLast>
          <CopyableCommand dark command={[{ value: 'npm', command: 'doorman sync' }]} />
        </StepRow>
      </div>
    </div>
  )
}
