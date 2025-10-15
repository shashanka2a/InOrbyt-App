import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'viem/chains';

export const wagmiConfig = createConfig({
  chains: [baseSepolia, base],
  transports: {
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_BASE_SEPOLIA_URL || ''),
    [base.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_BASE_URL || '')
  }
});


