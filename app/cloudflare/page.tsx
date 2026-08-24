import type { Metadata } from 'next'
import { ProviderLanding } from '@/components/provider-landing/ProviderLanding'
import { archivo, chakraPetch, spaceMono } from '@/lib/fonts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'

export const metadata: Metadata = {
  title: 'Doorman for Cloudflare WAF',
  description:
    'Manage Cloudflare WAF rules as code with doorman. Rules translate to real Wirefilter expressions automatically, no syntax to learn by hand.',
  alternates: { canonical: '/cloudflare' },
  openGraph: {
    type: 'website',
    title: 'Doorman for Cloudflare WAF',
    description: 'Manage Cloudflare WAF rules as code with doorman. Rules translate to real Wirefilter expressions automatically.',
    url: `${siteUrl}/cloudflare`,
    siteName: 'Doorman',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doorman for Cloudflare WAF',
    description: 'Manage Cloudflare WAF rules as code with doorman.',
    images: ['/og-image.jpg'],
  },
}

const content = {
  name: 'Cloudflare',
  wafName: 'Cloudflare WAF',
  officialDocsUrl: 'https://developers.cloudflare.com/waf',
  tagline: 'The same rule, translated into a real Wirefilter expression automatically. No wirefilter syntax to learn by hand.',
  installNote: 'Pass --provider cloudflare, or set "provider": "cloudflare" in your config.',
  envVars: [
    { name: 'CLOUDFLARE_API_TOKEN' },
    { name: 'CLOUDFLARE_ZONE_ID' },
    { name: 'CLOUDFLARE_ACCOUNT_ID', note: 'optional, enables Lists API' },
  ],
  syncCommand: 'doorman sync --provider cloudflare',
  highlights: [
    {
      title: 'Real Wirefilter, not a black box',
      body: 'path becomes http.request.uri.path, user_agent becomes http.user_agent. Every field maps to a documented Cloudflare expression.',
    },
    {
      title: 'Bulk IP management',
      body: "Add CLOUDFLARE_ACCOUNT_ID and IP blocking uses Cloudflare's Lists API instead of one rule per address.",
    },
    {
      title: 'One ruleset, fully versioned',
      body: "Cloudflare's custom rules live in a single ruleset. Doorman diffs it against your config and replaces it as a whole on sync.",
    },
    {
      title: 'Deploy managed rulesets too',
      body: 'Turn on the Cloudflare Managed Ruleset or OWASP CRS alongside your custom rules, with per-rule overrides, from the same config file.',
    },
  ],
  docsHref: '/docs/cloudflare-setup',
}

export default function CloudflarePage() {
  return (
    <div
      className={`${chakraPetch.variable} ${archivo.variable} ${spaceMono.variable} min-h-screen bg-[#0a0d11] text-[#e7edf3]`}
      style={{ fontFamily: 'var(--font-archivo)' }}
    >
      <ProviderLanding content={content} />
    </div>
  )
}
