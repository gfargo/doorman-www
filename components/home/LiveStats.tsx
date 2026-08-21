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
  const [downloads, stars] = await Promise.all([getNpmWeeklyDownloads(), getGithubStars()])

  if (downloads === null && stars === null) return null

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="flex items-center gap-1.5 font-[family-name:var(--font-space-mono)] text-[0.62rem] uppercase tracking-[0.2em] text-[#4e5a66]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#39e075] shadow-[0_0_6px_#39e075]" />
        Live from npm &amp; GitHub
      </span>
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
    </div>
  )
}
