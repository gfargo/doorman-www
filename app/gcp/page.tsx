import type { Metadata } from 'next'
import { ProviderLanding } from '@/components/provider-landing/ProviderLanding'
import { archivo, chakraPetch, spaceMono } from '@/lib/fonts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'

export const metadata: Metadata = {
  title: 'Doorman for Google Cloud Armor',
  description:
    'Manage Google Cloud Armor rules as code with doorman. Rules translate to real CEL expressions automatically, verified end-to-end against a live policy.',
  alternates: { canonical: '/gcp' },
  openGraph: {
    type: 'website',
    title: 'Doorman for Google Cloud Armor',
    description: 'Manage Google Cloud Armor rules as code with doorman. Rules translate to real CEL expressions automatically.',
    url: `${siteUrl}/gcp`,
    siteName: 'Doorman',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doorman for Google Cloud Armor',
    description: 'Manage Google Cloud Armor rules as code with doorman.',
    images: ['/og-image.jpg'],
  },
}

const content = {
  name: 'GCP',
  wafName: 'Google Cloud Armor',
  officialDocsUrl: 'https://cloud.google.com/armor/docs',
  tagline: 'The same status, diff, and sync workflow, pointed at a real Cloud Armor security policy.',
  installNote: 'Pass --provider gcp, or set "provider": "gcp" in your config.',
  envVars: [
    { name: 'GOOGLE_APPLICATION_CREDENTIALS', note: 'optional, uses Application Default Credentials if unset' },
    { name: 'GOOGLE_CLOUD_PROJECT' },
    { name: 'GCP_POLICY_NAME' },
  ],
  syncCommand: 'doorman sync --provider gcp',
  highlights: [
    {
      title: 'Real CEL, not a black box',
      body: 'path becomes request.path, user_agent becomes a guarded header check. Every field maps to a documented Cloud Armor CEL expression — nothing silently dropped.',
    },
    {
      title: "Priority is the rule's id",
      body: "Cloud Armor has no separate rule id — a rule's required priority is simultaneously its evaluation order and its addressing key. Doorman assigns and relocates them automatically.",
    },
    {
      title: 'Verified against real infrastructure',
      body: 'The full sync, diff, status, and download cycle — plus priority relocation and rule deletion — has been run against a real, disposable Cloud Armor policy, not just unit tests.',
    },
  ],
  docsHref: '/docs/gcp-setup',
}

export default function GcpPage() {
  return (
    <div
      className={`${chakraPetch.variable} ${archivo.variable} ${spaceMono.variable} min-h-screen bg-[#0a0d11] text-[#e7edf3]`}
      style={{ fontFamily: 'var(--font-archivo)' }}
    >
      <ProviderLanding content={content} />
    </div>
  )
}
