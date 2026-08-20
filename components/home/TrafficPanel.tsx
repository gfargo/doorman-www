const ROWS: Array<{
  method: string
  path: string
  verdict: 'allow' | 'block'
  meta: string
}> = [
  { method: 'GET', path: '/wp-admin', verdict: 'block', meta: 'UA: SemrushBot/7.1 · rule: Restrict Admin Routes' },
  { method: 'GET', path: '/api/users', verdict: 'allow', meta: '203.0.113.42' },
  { method: 'GET', path: '/', verdict: 'allow', meta: 'UA: Googlebot/2.1' },
  { method: 'GET', path: '/wp-login.php', verdict: 'block', meta: 'UA: MJ12bot · rule: Block Bad Bots' },
  { method: 'POST', path: '/checkout', verdict: 'allow', meta: '198.51.100.7' },
]

export function TrafficPanel() {
  return (
    <div className="w-full max-w-[420px] overflow-hidden rounded-[10px] border border-[#2a333c] bg-[#131920] shadow-[0_40px_84px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2.5 border-b border-[#2a333c] bg-[#1b232b] px-4 py-3">
        <span className="relative flex h-2 w-2 flex-shrink-0 rounded-full bg-[#39e075] shadow-[0_0_8px_#39e075]">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#39e075] opacity-75" />
        </span>
        <span className="font-[family-name:var(--font-chakra)] text-[0.8rem] font-semibold uppercase tracking-wider text-[#e7edf3]">
          Live traffic
        </span>
        <span className="ml-auto font-[family-name:var(--font-space-mono)] text-[0.6rem] uppercase tracking-wide text-[#4e5a66]">
          doorman&#8209;managed
        </span>
      </div>
      <div className="py-1">
        {ROWS.map((row, i) => (
          <div
            key={i}
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
          </div>
        ))}
      </div>
    </div>
  )
}
