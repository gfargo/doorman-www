'use client'

import { useMemo, useState } from 'react'

type FieldOption = { value: string; label: string }
type FieldGroup = { label: string; fields: FieldOption[] }

const FIELD_GROUPS: FieldGroup[] = [
  {
    label: 'Request',
    fields: [
      { value: 'path', label: 'Path' },
      { value: 'method', label: 'Method' },
      { value: 'host', label: 'Host' },
      { value: 'target_path', label: 'Target path' },
      { value: 'scheme', label: 'Scheme' },
      { value: 'protocol', label: 'Protocol' },
    ],
  },
  {
    label: 'Headers & params',
    fields: [
      { value: 'header', label: 'Header' },
      { value: 'cookie', label: 'Cookie' },
      { value: 'query', label: 'Query param' },
    ],
  },
  {
    label: 'Network',
    fields: [
      { value: 'ip_address', label: 'IP address' },
      { value: 'region', label: 'Region' },
    ],
  },
  {
    label: 'Geo',
    fields: [
      { value: 'geo_continent', label: 'Continent' },
      { value: 'geo_country', label: 'Country' },
      { value: 'geo_country_region', label: 'Country region' },
      { value: 'geo_city', label: 'City' },
      { value: 'geo_as_number', label: 'AS number' },
    ],
  },
  {
    label: 'Client fingerprint',
    fields: [
      { value: 'user_agent', label: 'User agent' },
      { value: 'ja3_digest', label: 'JA3 digest' },
      { value: 'ja4_digest', label: 'JA4 digest' },
    ],
  },
  {
    label: 'Other',
    fields: [
      { value: 'environment', label: 'Environment' },
      { value: 'rate_limit_api_id', label: 'Rate limit API ID' },
    ],
  },
]

const FIELD_LABELS: Record<string, string> = Object.fromEntries(
  FIELD_GROUPS.flatMap((group) => group.fields.map((f) => [f.value, f.label])),
)

const KEYED_FIELDS = new Set(['header', 'cookie', 'query'])

const OPERATORS: Array<{ value: string; label: string; needsValue: boolean; phrase: string }> = [
  { value: 'eq', label: 'Equals', needsValue: true, phrase: 'equals' },
  { value: 'pre', label: 'Starts with', needsValue: true, phrase: 'starts with' },
  { value: 'suf', label: 'Ends with', needsValue: true, phrase: 'ends with' },
  { value: 'sub', label: 'Contains', needsValue: true, phrase: 'contains' },
  { value: 'inc', label: 'Is one of (comma-separated)', needsValue: true, phrase: 'is one of' },
  { value: 're', label: 'Matches regex', needsValue: true, phrase: 'matches regex' },
  { value: 'ex', label: 'Exists', needsValue: false, phrase: 'exists' },
  { value: 'nex', label: 'Does not exist', needsValue: false, phrase: 'does not exist' },
]

const ACTIONS: Array<{ value: string; label: string; verb: string }> = [
  { value: 'deny', label: 'Deny', verb: 'Block' },
  { value: 'challenge', label: 'Challenge', verb: 'Challenge' },
  { value: 'bypass', label: 'Bypass', verb: 'Allow (bypass)' },
  { value: 'rate_limit', label: 'Rate limit', verb: 'Rate limit' },
  { value: 'redirect', label: 'Redirect', verb: 'Redirect' },
  { value: 'log', label: 'Log only', verb: 'Log' },
]

function needsValue(op: string): boolean {
  return OPERATORS.find((o) => o.value === op)?.needsValue ?? true
}

function slugify(name: string): string {
  const suffix = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
  return suffix ? `rule_${suffix}` : 'rule_unnamed'
}

function quote(value: string): string {
  return `"${value.replace(/"/g, '\\"')}"`
}

interface FieldRowProps {
  label: string
  children: React.ReactNode
}

function FieldRow({ label, children }: FieldRowProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-[family-name:var(--font-space-mono)] text-[0.68rem] uppercase tracking-wide text-[#8b98a5]">
        {label}
      </span>
      {children}
    </label>
  )
}

const inputClass =
  'rounded-[3px] border border-[#2a333c] bg-[#131920] px-3 py-2 font-[family-name:var(--font-space-mono)] text-[0.85rem] text-[#e7edf3] outline-none transition-colors focus:border-[#4fc3e8]'

function Select({ value, onChange, children }: { value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`${inputClass} w-full appearance-none pr-9`}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#4e5a66]"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-5 w-5 items-center justify-center rounded-[3px] border border-[#4fc3e8]/30 bg-[#4fc3e8]/[0.06] font-[family-name:var(--font-space-mono)] text-[0.62rem] text-[#4fc3e8]">
        {index}
      </span>
      <span className="font-[family-name:var(--font-chakra)] text-[0.82rem] uppercase tracking-[0.14em] text-[#e7edf3]">
        {children}
      </span>
    </div>
  )
}

function TerminalChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#2a333c] bg-[#0a0f14] px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-2 font-[family-name:var(--font-space-mono)] text-[0.66rem] uppercase tracking-[0.15em] text-[#4e5a66]">
        {title}
      </span>
    </div>
  )
}

export function RuleBuilder() {
  const [name, setName] = useState('Block Admin Access')
  const [description, setDescription] = useState('')
  const [field, setField] = useState('path')
  const [key, setKey] = useState('')
  const [op, setOp] = useState('pre')
  const [value, setValue] = useState('/admin')
  const [negate, setNegate] = useState(false)
  const [action, setAction] = useState('deny')
  const [requests, setRequests] = useState('100')
  const [window, setWindow] = useState('60s')
  const [location, setLocation] = useState('')
  const [permanent, setPermanent] = useState(false)
  const [duration, setDuration] = useState('')
  const [copiedCommand, setCopiedCommand] = useState(false)
  const [copiedJson, setCopiedJson] = useState(false)

  const requiresKey = KEYED_FIELDS.has(field)
  const requiresValue = needsValue(op)

  const error = useMemo(() => {
    if (!name.trim()) return 'Give the rule a name.'
    if (requiresKey && !key.trim()) return `${field === 'header' ? 'Header' : field === 'cookie' ? 'Cookie' : 'Query param'} name is required for this field type.`
    if (requiresValue && !value.trim()) return 'A match value is required for this operator.'
    if (action === 'rate_limit' && (!requests.trim() || !window.trim())) return 'Rate limit needs both a request count and a time window.'
    if (action === 'redirect' && !location.trim()) return 'Redirect needs a destination URL.'
    return null
  }, [name, requiresKey, key, field, requiresValue, value, action, requests, window, location])

  const summary = useMemo(() => {
    const verb = ACTIONS.find((a) => a.value === action)?.verb ?? 'Act on'
    const fieldLabel = FIELD_LABELS[field] ?? field
    const target = requiresKey && key.trim() ? `${fieldLabel.toLowerCase()} "${key.trim()}"` : fieldLabel.toLowerCase()
    const phrase = OPERATORS.find((o) => o.value === op)?.phrase ?? op
    const neg = negate ? 'does NOT ' : ''
    const valPart = requiresValue ? ` "${value.trim() || '…'}"` : ''
    let condition = `${target} ${neg}${phrase}${valPart}`
    let tail = ''
    if (action === 'rate_limit') tail = ` (max ${requests.trim() || '?'} / ${window.trim() || '?'})`
    if (action === 'redirect') tail = ` to ${location.trim() || '…'}`
    return { verb, condition, tail }
  }, [action, field, requiresKey, key, op, negate, requiresValue, value, requests, window, location])

  const command = useMemo(() => {
    const parts = ['doorman', 'add', '--name', quote(name.trim())]
    if (description.trim()) parts.push('--description', quote(description.trim()))
    parts.push('--field', field, '--op', op)
    if (requiresValue) parts.push('--value', quote(value.trim()))
    if (requiresKey) parts.push('--key', quote(key.trim()))
    if (negate) parts.push('--neg')
    parts.push('--action', action)
    if (action === 'rate_limit') {
      parts.push('--requests', requests.trim() || '0', '--window', quote(window.trim()))
    }
    if (action === 'redirect') {
      parts.push('--location', quote(location.trim()))
      if (permanent) parts.push('--permanent')
    }
    if ((action === 'deny' || action === 'challenge') && duration.trim()) {
      parts.push('--duration', quote(duration.trim()))
    }
    return parts.join(' ')
  }, [name, description, field, op, requiresValue, value, requiresKey, key, negate, action, requests, window, location, permanent, duration])

  const json = useMemo(() => {
    const condition: Record<string, unknown> = { type: field, op }
    if (requiresValue) {
      condition.value = op === 'inc' ? value.split(',').map((v) => v.trim()) : value.trim()
    }
    if (requiresKey) condition.key = key.trim()
    if (negate) condition.neg = true

    const mitigate: Record<string, unknown> = { action }
    if (action === 'rate_limit') {
      mitigate.rateLimit = { requests: Number(requests) || 0, window: window.trim() }
    }
    if (action === 'redirect') {
      mitigate.redirect = { location: location.trim(), ...(permanent && { permanent: true }) }
    }
    if ((action === 'deny' || action === 'challenge') && duration.trim()) {
      mitigate.actionDuration = duration.trim()
    }

    const rule = {
      id: slugify(name),
      name: name.trim(),
      ...(description.trim() && { description: description.trim() }),
      conditionGroup: [{ conditions: [condition] }],
      action: { mitigate },
      active: true,
    }

    return JSON.stringify(rule, null, 2)
  }, [name, description, field, op, requiresValue, value, requiresKey, key, negate, action, requests, window, location, permanent, duration])

  const copy = async (text: string, setter: (v: boolean) => void) => {
    await navigator.clipboard.writeText(text)
    setter(true)
    setTimeout(() => setter(false), 1600)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
      {/* Builder form */}
      <div className="min-w-0 overflow-hidden rounded-[8px] border border-[#2a333c] bg-[#0e1319]">
        <TerminalChrome title="rule.builder" />
        <div className="flex flex-col gap-8 p-6">
          {/* Identity */}
          <div className="flex flex-col gap-5">
            <FieldRow label="Rule name">
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Block Admin Access" />
            </FieldRow>

            <FieldRow label="Description (optional)">
              <input
                className={inputClass}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Restrict admin routes to known IPs"
              />
            </FieldRow>
          </div>

          <div className="h-px w-full bg-[#2a333c]" />

          {/* Condition */}
          <div className="flex flex-col gap-5">
            <SectionLabel index="01">When a request&apos;s&hellip;</SectionLabel>

            <FieldRow label="Field">
              <Select value={field} onChange={(e) => setField(e.target.value)}>
                {FIELD_GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.fields.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Select>
            </FieldRow>

            {requiresKey ? (
              <FieldRow label={`${field === 'header' ? 'Header' : field === 'cookie' ? 'Cookie' : 'Query param'} name`}>
                <input className={inputClass} value={key} onChange={(e) => setKey(e.target.value)} placeholder="X-Api-Key" />
              </FieldRow>
            ) : null}

            <FieldRow label="Operator">
              <Select value={op} onChange={(e) => setOp(e.target.value)}>
                {OPERATORS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </FieldRow>

            {requiresValue ? (
              <FieldRow label={op === 'inc' ? 'Values (comma-separated)' : 'Value'}>
                <input className={inputClass} value={value} onChange={(e) => setValue(e.target.value)} placeholder="/admin" />
              </FieldRow>
            ) : null}

            <label className="flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-wide text-[#8b98a5]">
              <input type="checkbox" checked={negate} onChange={(e) => setNegate(e.target.checked)} className="accent-[#4fc3e8]" />
              Negate this condition
            </label>
          </div>

          <div className="h-px w-full bg-[#2a333c]" />

          {/* Action */}
          <div className="flex flex-col gap-5">
            <SectionLabel index="02">&hellip;then doorman should</SectionLabel>

            <FieldRow label="Action">
              <Select value={action} onChange={(e) => setAction(e.target.value)}>
                {ACTIONS.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </Select>
            </FieldRow>

            {action === 'rate_limit' ? (
              <div className="grid grid-cols-2 gap-4">
                <FieldRow label="Max requests">
                  <input className={inputClass} value={requests} onChange={(e) => setRequests(e.target.value)} placeholder="100" />
                </FieldRow>
                <FieldRow label="Time window">
                  <input className={inputClass} value={window} onChange={(e) => setWindow(e.target.value)} placeholder="60s" />
                </FieldRow>
              </div>
            ) : null}

            {action === 'redirect' ? (
              <>
                <FieldRow label="Redirect URL">
                  <input className={inputClass} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="https://example.com" />
                </FieldRow>
                <label className="flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-wide text-[#8b98a5]">
                  <input type="checkbox" checked={permanent} onChange={(e) => setPermanent(e.target.checked)} className="accent-[#4fc3e8]" />
                  Permanent (301, not 302)
                </label>
              </>
            ) : null}

            {action === 'deny' || action === 'challenge' ? (
              <FieldRow label="Duration (optional, default permanent)">
                <input className={inputClass} value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="1h" />
              </FieldRow>
            ) : null}
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="flex min-w-0 flex-col gap-5 lg:sticky lg:top-8 lg:self-start">
        {/* Plain-language summary */}
        <div className="rounded-[8px] border border-[#4fc3e8]/20 bg-[#4fc3e8]/[0.04] p-5">
          <span className="mb-2 block font-[family-name:var(--font-space-mono)] text-[0.62rem] uppercase tracking-[0.2em] text-[#4fc3e8]">
            In plain English
          </span>
          <p className="text-[0.98rem] leading-relaxed text-[#e7edf3]">
            <span className="font-semibold text-[#93e2ff]">{summary.verb}</span> requests where the{' '}
            <span className="font-[family-name:var(--font-space-mono)] text-[0.9em] text-[#e7edf3]">{summary.condition}</span>
            <span className="text-[#8b98a5]">{summary.tail}</span>.
          </p>
        </div>

        {/* Command */}
        <div className="overflow-hidden rounded-[8px] border border-[#2a333c] bg-[#0e1319]">
          <div className="flex items-center justify-between border-b border-[#2a333c] bg-[#0a0f14] px-4 py-2.5">
            <span className="font-[family-name:var(--font-space-mono)] text-[0.66rem] uppercase tracking-[0.15em] text-[#4e5a66]">
              Run this &mdash; terminal
            </span>
            {!error ? (
              <button
                onClick={() => copy(command, setCopiedCommand)}
                className={`rounded-[3px] border px-2.5 py-1 font-[family-name:var(--font-space-mono)] text-[0.62rem] uppercase tracking-wide transition-colors ${
                  copiedCommand ? 'border-[#1f7a45] text-[#39e075]' : 'border-[#2a333c] text-[#8b98a5] hover:border-[#1c6f8c] hover:text-[#e7edf3]'
                }`}
              >
                {copiedCommand ? 'Copied' : 'Copy'}
              </button>
            ) : null}
          </div>
          {error ? (
            <div className="flex items-start gap-2.5 p-4 font-[family-name:var(--font-space-mono)] text-[0.78rem] text-[#ff8a95]">
              <span className="mt-0.5 text-[#ff4d5e]">&#9679;</span>
              <span>{error}</span>
            </div>
          ) : (
            <pre className="overflow-x-auto p-4 font-[family-name:var(--font-space-mono)] text-[0.8rem] leading-relaxed text-[#e7edf3]">
              <span className="select-none text-[#39e075]">$ </span>
              {command}
            </pre>
          )}
        </div>

        {/* JSON */}
        <div className="overflow-hidden rounded-[8px] border border-[#2a333c] bg-[#0e1319]">
          <div className="flex items-center justify-between border-b border-[#2a333c] bg-[#0a0f14] px-4 py-2.5">
            <span className="font-[family-name:var(--font-space-mono)] text-[0.66rem] uppercase tracking-[0.15em] text-[#4e5a66]">
              Or add to .doorman.json
            </span>
            {!error ? (
              <button
                onClick={() => copy(json, setCopiedJson)}
                className={`rounded-[3px] border px-2.5 py-1 font-[family-name:var(--font-space-mono)] text-[0.62rem] uppercase tracking-wide transition-colors ${
                  copiedJson ? 'border-[#1f7a45] text-[#39e075]' : 'border-[#2a333c] text-[#8b98a5] hover:border-[#1c6f8c] hover:text-[#e7edf3]'
                }`}
              >
                {copiedJson ? 'Copied' : 'Copy'}
              </button>
            ) : null}
          </div>
          {!error ? (
            <pre className="max-h-[420px] overflow-auto p-4 font-[family-name:var(--font-space-mono)] text-[0.78rem] leading-relaxed text-[#8b98a5]">
              {json}
            </pre>
          ) : (
            <div className="p-4 font-[family-name:var(--font-space-mono)] text-[0.76rem] text-[#4e5a66]">
              Fix the error above to generate the JSON.
            </div>
          )}
        </div>

        <p className="font-[family-name:var(--font-space-mono)] text-[0.7rem] leading-relaxed text-[#4e5a66]">
          Need multiple conditions in one rule (AND/OR groups)? A single command line can&apos;t do that. Run{' '}
          <code className="text-[#8b98a5]">doorman add --interactive</code> for the guided prompts instead.
        </p>
      </div>
    </div>
  )
}
