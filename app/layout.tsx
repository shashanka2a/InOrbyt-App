import type { Metadata } from 'next'
import './globals.css'
import { WalletProvider } from '@/src/components/pwa/WalletContext'
import { Providers } from '@/src/wallet/providers'
import { QueryProviders } from '@/src/app/providers-client'

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
      <body className="min-h-screen bg-[#0a0e1a]"><Providers><QueryProviders><WalletProvider>{children}</WalletProvider></QueryProviders></Providers></body>
    </html>
  )
}


