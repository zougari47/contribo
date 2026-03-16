import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import './globals.css'
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Contribo',
    default: 'Contribo - Showcase Your Open Source Contributions',
  },
  description:
    'Easily check, track, and showcase your open source contributions, pull requests, and issues across GitHub repositories. Build your developer portfolio beautifully.',
  keywords: ['open source', 'contributions', 'github tracking', 'pull requests', 'issues', 'developer portfolio', 'oss tracker', 'github stats'],
  authors: [{ name: 'Contribo' }],
  creator: 'Contribo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Contribo - Showcase Your Open Source Contributions',
    description: 'Easily check, track, and showcase your open source contributions, pull requests, and issues across GitHub repositories.',
    siteName: 'Contribo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contribo - Showcase Your Open Source Contributions',
    description: 'Easily check, track, and showcase your open source contributions.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
