import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './components/Auth/AuthProvider'
import { TopNav } from './components/Navigation/TopNav'

const inter = Inter({ subsets: ['latin'] })

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
  return (
    <html lang="en">
      <head>
       </head>
      <body className={inter.className}>
        <AuthProvider>
          <TopNav />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
} 