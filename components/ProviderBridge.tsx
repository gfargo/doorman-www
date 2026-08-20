'use client'

import { AnimatedBeam } from '@/components/ui/animated-beam'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Cloud, FileJson, Triangle, Zap } from 'lucide-react'
import { useRef, useState } from 'react'

type Example = {
  id: string
  label: string
  doorman: string
  vercel: string
  cloudflare: string
  fastly: string
}

const EXAMPLES: Example[] = [
  {
    id: 'bad-bots',
    label: 'Block Bad Bots',
    doorman: `{
  "name": "Block Bad Bots",
  "conditionGroup": [{
    "conditions": [
      { "type": "user_agent", "op": "sub", "value": "bot" }
    ]
  }],
  "action": { "mitigate": { "action": "deny" } }
}`,
    vercel: `// ships to Vercel Firewall as-is
{
  "id": "rule_block_bad_bots",
  "conditionGroup": [{
    "conditions": [
      { "type": "user_agent", "op": "sub", "value": "bot" }
    ]
  }],
  "action": { "mitigate": { "action": "deny" } }
}`,
    cloudflare: `// translated to a Wirefilter expression
{
  "expression": "http.user_agent contains \\"bot\\"",
  "action": "block"
}`,
    fastly: `// translated to a Fastly Next-Gen WAF rule
{
  "description": "Block Bad Bots",
  "conditions": [
    { "type": "single", "field": "user_agent",
      "operator": "contains", "value": "bot" }
  ],
  "actions": [{ "type": "block" }]
}`,
  },
  {
    id: 'admin-routes',
    label: 'Restrict Admin Routes',
    doorman: `{
  "name": "Restrict Admin Routes",
  "conditionGroup": [{
    "conditions": [
      { "type": "path", "op": "pre", "value": "/admin" }
    ]
  }],
  "action": { "mitigate": { "action": "deny" } }
}`,
    vercel: `// ships to Vercel Firewall as-is
{
  "id": "rule_restrict_admin",
  "conditionGroup": [{
    "conditions": [
      { "type": "path", "op": "pre", "value": "/admin" }
    ]
  }],
  "action": { "mitigate": { "action": "deny" } }
}`,
    cloudflare: `// translated to a Wirefilter expression
{
  "expression": "http.request.uri.path starts_with \\"/admin\\"",
  "action": "block"
}`,
    fastly: `// Fastly has no native "starts with" — mapped to
// the wildcard "like" operator with a translation
// warning so the pattern gets a second look
{
  "description": "Restrict Admin Routes",
  "conditions": [
    { "type": "single", "field": "path",
      "operator": "like", "value": "/admin*" }
  ],
  "actions": [{ "type": "block" }]
}`,
  },
]

function ProviderNode({
  nodeRef,
  label,
  sublabel,
  icon,
  accentClassName,
}: {
  nodeRef: React.RefObject<HTMLDivElement | null>
  label: string
  sublabel: string
  icon: React.ReactNode
  accentClassName: string
}) {
  return (
    <div ref={nodeRef} className="relative z-10 flex flex-col items-center gap-2 text-center">
      <div
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-2xl border shadow-lg shadow-black/20',
          accentClassName,
        )}
      >
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{label}</div>
        <div className="text-[11px] uppercase tracking-wider text-slate-500">{sublabel}</div>
      </div>
    </div>
  )
}

function ProviderPanel({
  label,
  dotClassName,
  dotStyle,
  code,
  delay,
}: {
  label: string
  dotClassName?: string
  dotStyle?: React.CSSProperties
  code: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, delay }}
      className="overflow-hidden rounded-xl border border-white/10 bg-black/40"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
        <span className={cn('inline-flex h-1.5 w-1.5 rounded-full', dotClassName)} style={dotStyle} />
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </motion.div>
  )
}

export function ProviderBridge() {
  const [activeId, setActiveId] = useState(EXAMPLES[0]!.id)
  const active = EXAMPLES.find((e) => e.id === activeId) ?? EXAMPLES[0]!

  const containerRef = useRef<HTMLDivElement>(null)
  const sourceRef = useRef<HTMLDivElement>(null)
  const vercelRef = useRef<HTMLDivElement>(null)
  const cloudflareRef = useRef<HTMLDivElement>(null)
  const fastlyRef = useRef<HTMLDivElement>(null)

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-[1px] shadow-2xl">
      <div className="rounded-3xl bg-slate-950 px-6 py-10 md:px-10 md:py-12">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            One config &middot; Three firewalls
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example.id}
                onClick={() => setActiveId(example.id)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-xs font-medium transition-colors',
                  example.id === activeId
                    ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300'
                    : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200',
                )}
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={containerRef} className="relative mx-auto flex max-w-xl flex-col items-center gap-14 px-4 py-6">
          <ProviderNode
            nodeRef={sourceRef}
            label="doorman.json"
            sublabel="Source of truth"
            icon={<FileJson className="h-6 w-6 text-emerald-400" />}
            accentClassName="border-emerald-400/30 bg-emerald-400/10"
          />

          <div className="flex w-full items-start justify-between">
            <ProviderNode
              nodeRef={vercelRef}
              label="Vercel"
              sublabel="Firewall"
              icon={<Triangle className="h-5 w-5 fill-white text-white" />}
              accentClassName="border-white/20 bg-white/10"
            />
            <ProviderNode
              nodeRef={cloudflareRef}
              label="Cloudflare"
              sublabel="WAF"
              icon={<Cloud className="h-6 w-6" style={{ color: '#F6821F' }} />}
              accentClassName="border-[#F6821F]/30 bg-[#F6821F]/10"
            />
            <ProviderNode
              nodeRef={fastlyRef}
              label="Fastly"
              sublabel="Next-Gen WAF"
              icon={<Zap className="h-6 w-6" style={{ color: '#FF282D' }} />}
              accentClassName="border-[#FF282D]/30 bg-[#FF282D]/10"
            />
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={sourceRef}
            toRef={vercelRef}
            reverse
            curvature={30}
            gradientStartColor="#e2e8f0"
            gradientStopColor="#64748b"
            pathColor="#334155"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={sourceRef}
            toRef={cloudflareRef}
            curvature={0}
            gradientStartColor="#F6821F"
            gradientStopColor="#FBAD41"
            pathColor="#334155"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={sourceRef}
            toRef={fastlyRef}
            curvature={-30}
            gradientStartColor="#FF282D"
            gradientStopColor="#FF7A7D"
            pathColor="#334155"
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <AnimatePresence>
            <ProviderPanel
              key={`${active.id}-vercel`}
              label="Vercel Firewall Rule"
              dotClassName="bg-white"
              code={active.vercel}
              delay={0}
            />
          </AnimatePresence>
          <AnimatePresence>
            <ProviderPanel
              key={`${active.id}-cloudflare`}
              label="Cloudflare WAF Rule"
              dotStyle={{ backgroundColor: '#F6821F' }}
              code={active.cloudflare}
              delay={0.05}
            />
          </AnimatePresence>
          <AnimatePresence>
            <ProviderPanel
              key={`${active.id}-fastly`}
              label="Fastly Next-Gen WAF Rule"
              dotStyle={{ backgroundColor: '#FF282D' }}
              code={active.fastly}
              delay={0.1}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
