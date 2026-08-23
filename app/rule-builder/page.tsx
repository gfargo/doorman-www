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
      <main className="px-4 py-16 md:px-0 md:py-24">
        <div className="container mx-auto max-w-[1000px]">
          <div className="mx-auto mb-12 max-w-[640px] text-center">
            <span className="mb-3 block font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[#4fc3e8]">
              Tool
            </span>
            <h1 className="font-[family-name:var(--font-chakra)] text-[1.8rem] uppercase tracking-tight text-[#e7edf3] md:text-[2.75rem]">
              Rule builder
            </h1>
            <p className="mt-4 text-[1.03rem] text-[#8b98a5]">
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
