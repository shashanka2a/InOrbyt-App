"use client";
import React from 'react';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from './wagmi';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { base, baseSepolia } from 'viem/chains';
import { PrivyProvider } from '@privy-io/react-auth';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains: [baseSepolia, base]
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        loginMethods: ['email', 'wallet'],
        embeddedWallets: { createOnLogin: 'all-users' }
      }}
    >
      <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
    </PrivyProvider>
  );
}


