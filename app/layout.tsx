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
    default: 'Vercel Doorman - Multi-Provider WAF Automation as Code',
    template: '%s | Vercel Doorman',
  },
  description:
    'Manage Vercel and Cloudflare WAF rules as code with version control and CI/CD integration. Sync, download, validate, and deploy security configurations across providers.',
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
    'WAF Automation',
    'Firewall Management',
  ],
  authors: [{ name: 'Vercel Doorman' }],
  creator: 'Vercel Doorman',
  publisher: 'Vercel Doorman',
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
    title: 'Vercel Doorman - Multi-Provider WAF Automation as Code',
    description: 'Manage Vercel and Cloudflare firewall rules as code with version control and CI/CD integration.',
    siteName: 'Vercel Doorman',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vercel Doorman - Multi-Provider Firewall Management as Code',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vercel Doorman - Multi-Provider WAF Automation as Code',
    description: 'Manage Vercel and Cloudflare firewall rules as code with version control and CI/CD integration.',
    images: ['/og-image.jpg'],
    creator: '@vercel',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
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
