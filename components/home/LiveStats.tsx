async function getNpmWeeklyDownloads(): Promise<number | null> {
  try {
    const res = await fetch('https://api.npmjs.org/downloads/point/last-week/@gfargo/doorman', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const data: unknown = await res.json()
    const downloads = (data as { downloads?: unknown }).downloads
    return typeof downloads === 'number' ? downloads : null
  } catch {
    return null
  }
}

async function getGithubStars(): Promise<number | null> {
  try {
    const res = await fetch('https://api.github.com/repos/gfargo/doorman', {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null
    const data: unknown = await res.json()
    const stars = (data as { stargazers_count?: unknown }).stargazers_count
    return typeof stars === 'number' ? stars : null
  } catch {
    return null
  }
}

type Release = { tag: string; publishedAt: string; highlight: string | null }

function extractHighlight(body: string): string | null {
  const match = body.match(/^\*\s+(.+)$/m)
  if (!match) return null
  const withoutLinks = (match[1] ?? '').split(/\s*\(\[/)[0]?.trim() ?? ''
  const withoutBold = withoutLinks.replace(/\*\*/g, '')
  return withoutBold || null
}

async function getLatestRelease(): Promise<Release | null> {
  try {
    const res = await fetch('https://api.github.com/repos/gfargo/doorman/releases?per_page=1', {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null
    const data: unknown = await res.json()
    const release = Array.isArray(data) ? data[0] : null
    if (!release || typeof release.tag_name !== 'string' || typeof release.published_at !== 'string') return null
    return {
      tag: release.tag_name,
      publishedAt: release.published_at,
      highlight: typeof release.body === 'string' ? extractHighlight(release.body) : null,
    }
  } catch {
    return null
  }
}

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  return `${diffDay}d ago`
}

function StatItem({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#4fc3e8]">{icon}</span>
      <span className="font-[family-name:var(--font-chakra)] text-[1.1rem] font-semibold tabular-nums text-[#e7edf3]">
        {value.toLocaleString()}
      </span>
      <span className="font-[family-name:var(--font-space-mono)] text-[0.68rem] uppercase tracking-wide text-[#4e5a66]">
        {label}
      </span>
    </div>
  )
}

export async function LiveStats() {
  const [downloads, stars, release] = await Promise.all([getNpmWeeklyDownloads(), getGithubStars(), getLatestRelease()])

  if (downloads === null && stars === null && release === null) return null

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="flex items-center gap-1.5 font-[family-name:var(--font-space-mono)] text-[0.62rem] uppercase tracking-[0.2em] text-[#4e5a66]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#39e075] shadow-[0_0_6px_#39e075]" />
        Live from npm &amp; GitHub
      </span>

      {downloads !== null || stars !== null ? (
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {downloads !== null ? (
            <StatItem
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" />
                </svg>
              }
              value={downloads}
              label="npm downloads / week"
            />
          ) : null}
          {stars !== null ? (
            <StatItem
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L6 21l1.6-7L2.2 9.2l7.1-.6L12 2z" />
                </svg>
              }
              value={stars}
              label="GitHub stars"
            />
          ) : null}
        </div>
      ) : null}

      {release !== null ? (
        <div className="flex max-w-[520px] flex-wrap items-baseline justify-center gap-x-2 gap-y-1 border-t border-white/[0.06] pt-3 text-center">
          <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-space-mono)] text-[0.72rem] text-[#93e2ff]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5">
              <path d="M20.59 13.41 13 21l-9-9V3h9l7.59 7.59a2 2 0 0 1 0 2.82z" />
              <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            {release.tag}
          </span>
          <span className="font-[family-name:var(--font-space-mono)] text-[0.7rem] text-[#4e5a66]">
            {relativeTime(release.publishedAt)}
          </span>
          {release.highlight ? (
            <span className="font-[family-name:var(--font-space-mono)] text-[0.72rem] text-[#8b98a5]">
              &middot; {release.highlight}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
