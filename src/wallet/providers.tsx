"use client";
import React from 'react';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from './wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { base, baseSepolia } from 'viem/chains';
import { PrivyProvider } from '@privy-io/react-auth';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';
const hasProjectId = !!projectId;
const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || '';
const hasPrivy = !!privyAppId;

if (hasProjectId) {
  createWeb3Modal({
    wagmiConfig,
    projectId,
    chains: [baseSepolia, base]
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  const wagmiTree = <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
  if (!hasPrivy) return wagmiTree;
  return (
    <PrivyProvider
      appId={privyAppId}
      config={{ loginMethods: ['email', 'wallet'], embeddedWallets: { createOnLogin: 'all-users' } }}
    >
      {wagmiTree}
    </PrivyProvider>
  );
}


