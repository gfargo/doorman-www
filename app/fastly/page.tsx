import type { Metadata } from 'next'
import { ProviderLanding } from '@/components/provider-landing/ProviderLanding'
import { archivo, chakraPetch, spaceMono } from '@/lib/fonts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'

export const metadata: Metadata = {
  title: 'Doorman for Fastly Next-Gen WAF',
  description:
    'Manage Fastly Next-Gen WAF rules as code with doorman. Same status, diff, and sync workflow as every other provider.',
  alternates: { canonical: '/fastly' },
  openGraph: {
    type: 'website',
    title: 'Doorman for Fastly Next-Gen WAF',
    description: 'Manage Fastly Next-Gen WAF rules as code with doorman.',
    url: `${siteUrl}/fastly`,
    siteName: 'Doorman',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doorman for Fastly Next-Gen WAF',
    description: 'Manage Fastly Next-Gen WAF rules as code with doorman.',
    images: ['/og-image.jpg'],
  },
}

const content = {
  name: 'Fastly',
  wafName: 'Fastly Next‑Gen WAF',
  officialDocsUrl: 'https://www.fastly.com/documentation/guides/next-gen-waf/',
  tagline: "The same status, diff, and sync workflow, pointed at Fastly's Next-Gen WAF workspace rules.",
  installNote: 'Pass --provider fastly, or set "provider": "fastly" in your config.',
  envVars: [{ name: 'FASTLY_API_TOKEN' }, { name: 'FASTLY_WORKSPACE_ID' }],
  syncCommand: 'doorman sync --provider fastly',
  highlights: [
    {
      title: 'Workspace-scoped rules',
      body: "Rules and IP lists live inside one Fastly Next-Gen WAF workspace, the same one you'd manage by hand in the dashboard.",
    },
    {
      title: 'Managed IP lists',
      body: 'IP blocking uses doorman-managed allow and deny lists in your workspace instead of one rule per address.',
    },
    {
      title: 'Rate limiting included',
      body: "Fastly's rate_limit action is fully supported, translated automatically from the same unified rule.",
    },
  ],
  docsHref: '/docs/fastly-setup',
}

export default function FastlyPage() {
  return (
    <div
      className={`${chakraPetch.variable} ${archivo.variable} ${spaceMono.variable} min-h-screen bg-[#0a0d11] text-[#e7edf3]`}
      style={{ fontFamily: 'var(--font-archivo)' }}
    >
      <ProviderLanding content={content} />
    </div>
  )
}
