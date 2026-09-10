import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@rights/auth/AuthProvider'
import { GoogleOneTap } from '@rights/auth/GoogleOneTap'
import { TopNav } from '@rights/site-shell/TopNav'
import { googleClientId } from '@rights/auth/auth-config'

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
  // A best-effort inline copy of the Google client ID, so One Tap can start
  // without a round trip when this layout happens to be rendered per request.
  // It is deliberately *not* the only path: content routes are statically
  // generated, which bakes this tag at build time — before a Cloudflare Worker
  // var/secret exists — so the browser falls back to /api/client-config when
  // what arrives here is empty. See packages/auth/src/auth-client.ts.
  const clientId = googleClientId()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="google-client-id"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clientId) }}
        />
      </head>
      <body>
        <AuthProvider>
          <GoogleOneTap />
          <TopNav />
          {/* Clears the fixed nav bar (h-16) so page content isn't hidden under it. */}
          <div className="pt-16">{children}</div>
        </AuthProvider>
      </body>
    </html>
  )
}
