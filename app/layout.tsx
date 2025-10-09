import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InOrbyt',
  description: 'Web3 fan engagement and tokenized experiences',
  icons: {
    icon: '/inorbyt_favicon.png',
  },
  openGraph: {
    title: 'InOrbyt',
    description: 'Web3 fan engagement and tokenized experiences',
    images: ['/og-image.png'],
    type: 'website',
    url: 'https://example.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0a0e1a]">{children}</body>
    </html>
  )
}


