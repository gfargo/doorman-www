import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Doorman - Multi-Provider WAF Automation as Code',
    template: '%s | Doorman',
  },
  description:
    'Manage Vercel, Cloudflare, and Fastly WAF rules as code with version control and CI/CD integration. Sync, download, validate, and deploy security configurations across providers.',
  keywords: [
    'Vercel',
    'Firewall',
    'Security',
    'CLI',
    'DevOps',
    'Infrastructure as Code',
    'CI/CD',
    'Version Control',
    'Cloudflare',
    'Fastly',
    'Next-Gen WAF',
    'WAF Automation',
    'Firewall Management',
  ],
  authors: [{ name: 'Doorman' }],
  creator: 'Doorman',
  publisher: 'Doorman',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Doorman - Multi-Provider WAF Automation as Code',
    description:
      'Manage Vercel, Cloudflare, and Fastly firewall rules as code with version control and CI/CD integration.',
    siteName: 'Doorman',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Doorman - Multi-Provider Firewall Management as Code',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doorman - Multi-Provider WAF Automation as Code',
    description:
      'Manage Vercel, Cloudflare, and Fastly firewall rules as code with version control and CI/CD integration.',
    images: ['/og-image.jpg'],
    creator: '@vercel',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
