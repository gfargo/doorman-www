import type { Metadata } from 'next'
import { RuleBuilder } from '@/components/rule-builder/RuleBuilder'
import { archivo, chakraPetch, spaceMono } from '@/lib/fonts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'

export const metadata: Metadata = {
  title: 'Rule Builder',
  description: 'Build a doorman firewall rule and get the CLI command or JSON to add it, no hand-written config required.',
  alternates: { canonical: '/rule-builder' },
  openGraph: {
    type: 'website',
    title: 'Rule Builder | Doorman',
    description: 'Build a doorman firewall rule and get the CLI command or JSON to add it.',
    url: `${siteUrl}/rule-builder`,
    siteName: 'Doorman',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rule Builder | Doorman',
    description: 'Build a doorman firewall rule and get the CLI command or JSON to add it.',
    images: ['/og-image.jpg'],
  },
}

export default function RuleBuilderPage() {
  return (
    <div
      className={`${chakraPetch.variable} ${archivo.variable} ${spaceMono.variable} min-h-screen bg-[#0a0d11] text-[#e7edf3]`}
      style={{ fontFamily: 'var(--font-archivo)' }}
    >
      <main className="relative overflow-hidden px-4 py-16 md:px-0 md:py-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              'radial-gradient(ellipse 900px 420px at 50% -10%, rgba(79,195,232,0.1), transparent 65%)',
          }}
        />
        <div className="container relative mx-auto max-w-[1000px]">
          <div className="mx-auto mb-12 max-w-[640px] text-center">
            <span className="inline-flex items-center gap-2 rounded-[3px] border border-[#4fc3e8]/20 bg-[#4fc3e8]/[0.05] px-4 py-2 font-[family-name:var(--font-space-mono)] text-[0.68rem] uppercase tracking-wide text-[#93e2ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#39e075] shadow-[0_0_8px_#39e075]" />
              Interactive tool
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-chakra)] text-[1.9rem] uppercase leading-[1.05] tracking-tight text-[#e7edf3] md:text-[2.9rem]">
              Rule builder
            </h1>
            <p className="mx-auto mt-4 max-w-[560px] text-[1.03rem] leading-relaxed text-[#8b98a5]">
              Fill in a condition and an action. Get a real <code className="text-[#93e2ff]">doorman add</code> command and the
              equivalent JSON, both accurate to what the CLI actually accepts.
            </p>
          </div>

          <RuleBuilder />
        </div>
      </main>
    </div>
  )
}
