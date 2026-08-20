import { Archivo, Chakra_Petch, Space_Mono } from 'next/font/google'

// Homepage-only type system (the "modern access control" redesign). Scoped
// via CSS variables rather than replacing the root Inter font, so /docs and
// other routes are unaffected.
export const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-chakra',
  display: 'swap',
})

export const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})
