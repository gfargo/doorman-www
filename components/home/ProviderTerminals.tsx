'use client'

import { useState } from 'react'

type Example = {
  id: string
  label: string
  vercel: string
  cloudflare: string
  fastly: string
  gcp: string
}

const EXAMPLES: Example[] = [
  {
    id: 'bots',
    label: 'Block Bad Bots',
    vercel: `{
  "id": "rule_block_bad_bots",
  "conditionGroup": [{
    "conditions": [
      { "type": "user_agent", "op": "sub", "value": "bot" }
    ]
  }],
  "action": { "mitigate": { "action": "deny" } }
}`,
    cloudflare: `{
  "expression":
    "http.user_agent
    contains \\"bot\\"",
  "action": "block"
}`,
    fastly: `// translated, no wildcard needed
{
  "description": "Block Bad Bots",
  "conditions": [
    { "type": "single", "field": "user_agent",
      "operator": "contains", "value": "bot" }
  ],
  "actions": [{ "type": "block" }]
}`,
    gcp: `// CEL requires a has() guard before
// reading any header field
{
  "match": { "expr": {
    "expression":
      "has(request.headers[
      'user-agent']) &&
      request.headers[
      'user-agent']
      .contains('bot')"
  }},
  "action": "deny(403)"
}`,
  },
  {
    id: 'admin',
    label: 'Restrict Admin Routes',
    vercel: `{
  "id": "rule_restrict_admin",
  "conditionGroup": [{
    "conditions": [
      { "type": "path", "op": "pre", "value": "/admin" }
    ]
  }],
  "action": { "mitigate": { "action": "deny" } }
}`,
    cloudflare: `{
  "expression":
    "http.request.uri.path
    starts_with \\"/admin\\"",
  "action": "block"
}`,
    fastly: `// no native "starts with", so this maps
// to wildcard "like" and gets flagged for review
{
  "description": "Restrict Admin Routes",
  "conditions": [
    { "type": "single", "field": "path",
      "operator": "like", "value": "/admin*" }
  ],
  "actions": [{ "type": "block" }]
}`,
    gcp: `{
  "match": { "expr": {
    "expression":
      "request.path
      .startsWith(\\"/admin\\")"
  }},
  "action": "deny(403)"
}`,
  },
]

const TERMINALS: Array<{
  name: string
  role: string
  ledColor: string
  mark: React.ReactNode
  code: (e: Example) => string
}> = [
  {
    name: 'Vercel',
    role: 'Firewall',
    ledColor: '#e8e8e8',
    mark: (
      <svg viewBox="0 0 24 24" fill="#c7cdd3">
        <path d="M12 3 L21 19 L3 19 Z" />
      </svg>
    ),
    code: (e) => e.vercel,
  },
  {
    name: 'Cloudflare',
    role: 'WAF',
    ledColor: '#F6821F',
    mark: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F6821F" strokeWidth={1.8}>
        <path d="M6 17a4 4 0 1 1 1-7.9A5 5 0 0 1 17 11a3.5 3.5 0 0 1-.5 7H6Z" />
      </svg>
    ),
    code: (e) => e.cloudflare,
  },
  {
    name: 'Fastly',
    role: 'Next‑Gen WAF',
    ledColor: '#FF282D',
    mark: (
      <svg viewBox="0 0 24 24" fill="#FF282D">
        <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
      </svg>
    ),
    code: (e) => e.fastly,
  },
  {
    name: 'GCP',
    role: 'Cloud Armor',
    ledColor: '#4285F4',
    mark: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth={1.8}>
        <path d="M12 3 19 6.5 V12 C19 16.5 16 19.8 12 21 C8 19.8 5 16.5 5 12 V6.5 Z" />
      </svg>
    ),
    code: (e) => e.gcp,
  },
]

export function ProviderTerminals() {
  const [activeId, setActiveId] = useState(EXAMPLES[0]!.id)
  const active = EXAMPLES.find((e) => e.id === activeId) ?? EXAMPLES[0]!

  return (
    <div>
      <div className="mb-11 flex flex-wrap justify-center gap-2.5" role="tablist">
        {EXAMPLES.map((example) => (
          <button
            key={example.id}
            role="tab"
            aria-selected={example.id === activeId}
            onClick={() => setActiveId(example.id)}
            className={`rounded-[3px] border px-[1.1rem] py-[0.55rem] font-[family-name:var(--font-space-mono)] text-[0.78rem] uppercase tracking-wide transition-colors ${
              example.id === activeId
                ? 'border-[#4fc3e8] bg-[#4fc3e8] text-[#0a0d11]'
                : 'border-[#2a333c] text-[#8b98a5] hover:border-[#1c6f8c] hover:text-[#e7edf3]'
            }`}
          >
            {example.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TERMINALS.map((terminal) => (
          <div
            key={terminal.name}
            className="overflow-hidden rounded-lg border border-[#2a333c] bg-[#131920] shadow-[0_26px_50px_-28px_rgba(0,0,0,0.6)] transition-all hover:-translate-y-1 hover:border-[#1c6f8c]"
          >
            <div className="flex items-center gap-3 border-b border-[#2a333c] bg-[#1b232b] px-4 py-3.5">
              <span
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: terminal.ledColor, boxShadow: `0 0 8px ${terminal.ledColor}` }}
              />
              <span className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center">
                {terminal.mark}
              </span>
              <div>
                <p className="font-[family-name:var(--font-chakra)] text-[0.95rem] font-semibold uppercase tracking-wide text-[#e7edf3]">
                  {terminal.name}
                </p>
                <p className="mt-0.5 font-[family-name:var(--font-space-mono)] text-[0.6rem] uppercase tracking-wider text-[#4e5a66]">
                  {terminal.role}
                </p>
              </div>
            </div>
            <pre className="overflow-x-auto whitespace-pre px-5 py-4 font-[family-name:var(--font-space-mono)] text-[0.71rem] leading-relaxed text-[#8b98a5]">
              {terminal.code(active)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
