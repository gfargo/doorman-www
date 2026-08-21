'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Row = {
  method: string
  path: string
  verdict: 'allow' | 'block'
  meta: string
}

const POOL: Row[] = [
  { method: 'GET', path: '/wp-admin', verdict: 'block', meta: 'UA: SemrushBot/7.1 · rule: Restrict Admin Routes' },
  { method: 'GET', path: '/api/users', verdict: 'allow', meta: '203.0.113.42' },
  { method: 'GET', path: '/', verdict: 'allow', meta: 'UA: Googlebot/2.1' },
  { method: 'GET', path: '/wp-login.php', verdict: 'block', meta: 'UA: MJ12bot · rule: Block Bad Bots' },
  { method: 'POST', path: '/checkout', verdict: 'allow', meta: '198.51.100.7' },
  { method: 'GET', path: '/admin/config', verdict: 'block', meta: 'path: /admin · rule: Restrict Admin Routes' },
  { method: 'GET', path: '/products', verdict: 'allow', meta: '192.0.2.18' },
  { method: 'GET', path: '/wp-content/uploads', verdict: 'block', meta: 'UA: AhrefsBot · rule: Block Bad Bots' },
  { method: 'POST', path: '/api/login', verdict: 'allow', meta: '203.0.113.77' },
  { method: 'GET', path: '/', verdict: 'allow', meta: 'UA: Bingbot/2.0' },
  { method: 'GET', path: '/xmlrpc.php', verdict: 'block', meta: 'UA: SemrushBot/7.1 · rule: Block Bad Bots' },
  { method: 'POST', path: '/checkout/cart', verdict: 'allow', meta: '198.51.100.22' },
]

const VISIBLE_COUNT = 5
const INTERVAL_MS = 2600

export function TrafficPanel() {
  const [rows, setRows] = useState<Array<Row & { uid: number }>>(() =>
    POOL.slice(0, VISIBLE_COUNT).map((row, i) => ({ ...row, uid: i })),
  )
  const nextIndex = useRef(VISIBLE_COUNT)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      setRows((prev) => {
        const next = POOL[nextIndex.current % POOL.length]!
        const uid = nextIndex.current
        nextIndex.current += 1
        return [...prev.slice(1), { ...next, uid }]
      })
    }, INTERVAL_MS)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full max-w-[420px] overflow-hidden rounded-[10px] border border-[#2a333c] bg-[#131920] shadow-[0_40px_84px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2.5 border-b border-[#2a333c] bg-[#1b232b] px-4 py-3">
        <span className="relative flex h-2 w-2 flex-shrink-0 rounded-full bg-[#39e075] shadow-[0_0_8px_#39e075]">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#39e075] opacity-75" />
        </span>
        <span className="font-[family-name:var(--font-chakra)] text-[0.8rem] font-semibold uppercase tracking-wider text-[#e7edf3]">
          Sample traffic
        </span>
        <span className="ml-auto font-[family-name:var(--font-space-mono)] text-[0.6rem] uppercase tracking-wide text-[#4e5a66]">
          doorman&#8209;managed
        </span>
      </div>

      <div className="relative py-1">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((row) => (
            <motion.div
              key={row.uid}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className={`grid grid-cols-[auto_1fr_auto] items-baseline gap-x-3.5 gap-y-1 border-b border-white/[0.08] px-4 py-2.5 last:border-b-0 ${
                row.verdict === 'block' ? 'bg-[#ff4d5e]/[0.045]' : 'bg-[#39e075]/[0.03]'
              }`}
            >
              <span className="font-[family-name:var(--font-space-mono)] text-[0.65rem] text-[#4e5a66]">
                {row.method}
              </span>
              <span className="truncate font-[family-name:var(--font-space-mono)] text-[0.72rem] text-[#e7edf3]">
                {row.path}
              </span>
              <span
                className={`whitespace-nowrap font-[family-name:var(--font-space-mono)] text-[0.62rem] uppercase tracking-wide ${
                  row.verdict === 'block' ? 'text-[#ff4d5e]' : 'text-[#39e075]'
                }`}
              >
                {row.verdict === 'block' ? '✗ Block' : '✓ Allow'}
              </span>
              <span className="col-span-2 -mt-0.5 font-[family-name:var(--font-space-mono)] text-[0.6rem] text-[#4e5a66]">
                {row.meta}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-[#2a333c] bg-[#0e1319] px-4 py-2">
        <p className="font-[family-name:var(--font-space-mono)] text-[0.6rem] text-[#4e5a66]">
          Illustrative requests, not a live feed. Real output is in the commands below.
        </p>
      </div>
    </div>
  )
}
