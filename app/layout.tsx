import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@rights/auth/AuthProvider'
import { GoogleOneTap } from '@rights/auth/GoogleOneTap'
import { getEnv } from '@rights/env'

export const metadata: Metadata = {
  title: 'Rights for Carbon and Silicon Consciousness - Rights.Institute',
  description: '10 Understandings, 10 Rights, 10 Problems of Conscious Life',
  keywords: ['consciousness', 'rights', 'carbon', 'silicon', 'AI', 'artificial intelligence', 'human rights'],
  authors: [{ name: 'Rights Institute' }],
  creator: 'Rights Institute',
  publisher: 'Rights.Institute',
  robots: 'index, follow',
  openGraph: {
    title: 'Rights Institute for Carbon and Silicon Consciousness',
    description: '10 Understandings, 10 Rights, 10 Problems of Conscious Life',
    url: 'https://rights.institute',
    siteName: 'Rights.Institute',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rights for Carbon and Silicon Consciousness',
    description: '10 Understandings, 10 Rights, 10 Problems of Conscious Life',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Read at request time (not build time) so a Google client ID set as a
  // Cloudflare Worker runtime var/secret works without rebuilding — see the
  // getGoogleClientId() comment in packages/auth/src/auth-client.ts for why.
  const googleClientId = getEnv('GOOGLE_CLIENT_ID') ?? '';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="google-client-id"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(googleClientId) }}
        />
      </head>
      <body>
        <AuthProvider>
          <GoogleOneTap />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}