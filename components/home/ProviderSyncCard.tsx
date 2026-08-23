'use client'

import { CopyableCommand } from '@/components/CopyableCommand'
import { InteractiveImage } from '@/components/InteractiveImage'
import { motion } from 'framer-motion'
import { useState } from 'react'

type ProviderId = 'vercel' | 'cloudflare' | 'fastly'

const PROVIDERS: Record<
  ProviderId,
  {
    label: string
    description: string
    command: { value: string; command: string }[]
    imageSrc: string
    imageWidth: number
    imageHeight: number
  }
> = {
  vercel: {
    label: 'Vercel',
    description:
      'The same status, diff, and sync workflow, pointed at Vercel Firewall. Vercel gets the rule as-is, doorman’s native format with no translation step.',
    command: [
      { value: 'npm', command: 'npx @gfargo/doorman sync' },
      { value: 'yarn', command: 'npx @gfargo/doorman sync' },
      { value: 'pnpm', command: 'pnpm dlx @gfargo/doorman@latest sync' },
      { value: 'bun', command: 'bunx --bun @gfargo/doorman@latest sync' },
    ],
    imageSrc: '/gifs/sync.gif',
    imageWidth: 1900,
    imageHeight: 700,
  },
  cloudflare: {
    label: 'Cloudflare',
    description:
      'The same status, diff, and sync workflow, pointed at Cloudflare WAF. Cloudflare gets a Wirefilter expression, translated automatically from the same rule.',
    command: [
      { value: 'npm', command: 'npx @gfargo/doorman sync --provider cloudflare' },
      { value: 'yarn', command: 'npx @gfargo/doorman sync --provider cloudflare' },
      { value: 'pnpm', command: 'pnpm dlx @gfargo/doorman@latest sync --provider cloudflare' },
      { value: 'bun', command: 'bunx --bun @gfargo/doorman@latest sync --provider cloudflare' },
    ],
    imageSrc: '/gifs/cloudflare-sync.gif',
    imageWidth: 1900,
    imageHeight: 900,
  },
  fastly: {
    label: 'Fastly',
    description:
      'The same status, diff, and sync workflow, pointed at Fastly Next‑Gen WAF. Fastly gets a Next‑Gen WAF rule, translated automatically from the same rule.',
    command: [
      { value: 'npm', command: 'npx @gfargo/doorman sync --provider fastly' },
      { value: 'yarn', command: 'npx @gfargo/doorman sync --provider fastly' },
      { value: 'pnpm', command: 'pnpm dlx @gfargo/doorman@latest sync --provider fastly' },
      { value: 'bun', command: 'bunx --bun @gfargo/doorman@latest sync --provider fastly' },
    ],
    imageSrc: '/gifs/fastly-sync.gif',
    imageWidth: 1900,
    imageHeight: 900,
  },
}

export function ProviderSyncCard() {
  const [provider, setProvider] = useState<ProviderId>('fastly')
  const active = PROVIDERS[provider]

  const textAnimation = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const } },
  }
  const imageAnimation = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1, ease: [0.19, 1, 0.22, 1] as const } },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="grid items-center gap-10 border-b border-white/[0.08] py-14 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-2"
    >
      <motion.div variants={textAnimation} className="flex min-w-0 flex-col gap-3.5">
        <div className="flex items-baseline gap-3">
          <span className="font-[family-name:var(--font-space-mono)] text-[0.72rem] text-[#4e5a66]">
            Log <span className="font-[family-name:var(--font-chakra)] text-[1.05rem] font-semibold text-[#4fc3e8]">01</span>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[6px] border border-[#2a333c] bg-[#131920] text-[#93e2ff]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
              <path d="M17 2l4 4-4 4M3 12v-2a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 12v2a4 4 0 0 1-4 4H3" />
            </svg>
          </span>
          <h3 className="font-[family-name:var(--font-chakra)] text-[1.15rem] uppercase tracking-wide text-[#e7edf3]">
            Sync to your provider
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {(Object.keys(PROVIDERS) as ProviderId[]).map((id) => (
            <button
              key={id}
              onClick={() => setProvider(id)}
              className={`rounded-[3px] border px-3 py-1.5 font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-wide transition-colors ${
                provider === id
                  ? 'border-[#4fc3e8] bg-[#4fc3e8] text-[#0a0d11]'
                  : 'border-[#2a333c] text-[#8b98a5] hover:border-[#1c6f8c] hover:text-[#e7edf3]'
              }`}
            >
              {PROVIDERS[id].label}
            </button>
          ))}
        </div>

        <p className="max-w-[520px] text-[#8b98a5]">{active.description}</p>
        <CopyableCommand command={active.command} dark />
      </motion.div>

      <motion.div variants={imageAnimation} className="min-w-0">
        <InteractiveImage
          key={provider}
          src={active.imageSrc}
          alt={`Sync to ${active.label} demo`}
          width={active.imageWidth}
          height={active.imageHeight}
        />
      </motion.div>
    </motion.div>
  )
}
