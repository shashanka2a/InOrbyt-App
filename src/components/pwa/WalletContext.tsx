import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { createWalletClient, custom } from 'viem';

type WalletType = 'eip1193' | 'walletconnect' | 'privy' | null;

interface WalletContextValue {
  address: string | null;
  walletType: WalletType;
  connecting: boolean;
  connectEip1193: () => Promise<void>; // MetaMask/Coinbase extension
  connectWalletConnect: () => Promise<void>;
  connectPrivy: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();
  const { connect, connectors, status: connectStatus } = useConnect();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const [walletType, setWalletType] = useState<WalletType>(null);
  const connecting = connectStatus === 'pending' || connectStatus === 'connecting';

  const connectEip1193 = useCallback(async () => {
    const eth = (globalThis as any).ethereum;
    if (!eth) throw new Error('No EIP-1193 provider found');
    const injected = connectors.find(c => c.id === 'injected');
    if (!injected) throw new Error('No injected connector configured');
    await connect({ connector: injected });
    setWalletType('eip1193');
  }, [connect, connectors]);

  const connectWalletConnect = useCallback(async () => {
    const wc = connectors.find(c => c.id === 'walletConnect');
    if (!wc) throw new Error('WalletConnect connector missing');
    await connect({ connector: wc });
    setWalletType('walletconnect');
  }, [connect, connectors]);

  const connectPrivy = useCallback(async () => {
    // Privy connects via its own UI; for now, this is a no-op placeholder.
    // You can import usePrivy and call login().
    setWalletType('privy');
  }, []);

  const disconnect = useCallback(() => {
    setWalletType(null);
    wagmiDisconnect();
  }, [wagmiDisconnect]);

  // address tracking comes from wagmi

  const value = useMemo(
    () => ({ address, walletType, connecting, connectEip1193, connectWalletConnect, connectPrivy, disconnect }),
    [address, walletType, connecting, connectEip1193, connectWalletConnect, connectPrivy, disconnect]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}


