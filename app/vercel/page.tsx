import type { Metadata } from 'next'
import { ProviderLanding } from '@/components/provider-landing/ProviderLanding'
import { archivo, chakraPetch, spaceMono } from '@/lib/fonts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'

export const metadata: Metadata = {
  title: 'Doorman for Vercel Firewall',
  description:
    'Manage Vercel Firewall rules as code with doorman. Version control, PR review, and one command to sync, no translation step.',
  alternates: { canonical: '/vercel' },
  openGraph: {
    type: 'website',
    title: 'Doorman for Vercel Firewall',
    description: 'Manage Vercel Firewall rules as code with doorman. Version control, PR review, and one command to sync.',
    url: `${siteUrl}/vercel`,
    siteName: 'Doorman',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doorman for Vercel Firewall',
    description: 'Manage Vercel Firewall rules as code with doorman.',
    images: ['/og-image.jpg'],
  },
}

const content = {
  name: 'Vercel',
  wafName: 'Vercel Firewall',
  officialDocsUrl: 'https://vercel.com/docs/security/vercel-firewall',
  tagline:
    "Doorman's original, stable provider. The default when no provider is specified, and the only one doorman init scaffolds a config for directly.",
  installNote: 'Vercel is the default provider, no --provider flag needed.',
  envVars: [{ name: 'VERCEL_TOKEN' }, { name: 'VERCEL_PROJECT_ID' }, { name: 'VERCEL_TEAM_ID', note: 'optional' }],
  syncCommand: 'doorman sync',
  highlights: [
    {
      title: 'No translation step',
      body: "Vercel gets the rule as-is. It's doorman's native format, so there's nothing to translate and nothing to lose in the round trip.",
    },
    {
      title: 'doorman init just works',
      body: 'The only provider where init scaffolds a real, connected config directly. Every other provider starts from a hand-authored file.',
    },
    {
      title: 'The full action set',
      body: 'Vercel Firewall supports deny, challenge, bypass, rate_limit, redirect, and log, everything doorman manages outside Enterprise-only managed rule sets.',
    },
  ],
  docsHref: '/docs/vercel-setup',
}

export default function VercelPage() {
  return (
    <div
      className={`${chakraPetch.variable} ${archivo.variable} ${spaceMono.variable} min-h-screen bg-[#0a0d11] text-[#e7edf3]`}
      style={{ fontFamily: 'var(--font-archivo)' }}
    >
      <ProviderLanding content={content} />
    </div>
  )
}
