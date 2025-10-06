import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Welcome } from './Welcome';
import { ProfileSetup } from './ProfileSetup';
import { WalletSetup } from './WalletSetup';
import { TokenWizard } from './TokenWizard';
import { Dashboard } from './Dashboard';

export interface UserData {
  // Profile
  displayName: string;
  username: string;
  bio: string;
  avatarPreview: string | null;
  
  // Wallet
  walletType: 'create' | 'connect' | null;
  connectedWallet: string | null;
  
  // Token
  tokenName: string;
  tokenSymbol: string;
  tokenImage: string | null;
  totalSupply: string;
  startingPrice: string;
  maxTokensPerFan: string;
  allowFutureMinting: boolean;
  
  // Perks
  exclusiveContent: boolean;
  communityAccess: boolean;
  earlyAccess: boolean;
  votingRights: boolean;
}

const initialUserData: UserData = {
  displayName: '',
  username: '',
  bio: '',
  avatarPreview: null,
  walletType: null,
  connectedWallet: null,
  tokenName: '',
  tokenSymbol: '',
  tokenImage: null,
  totalSupply: '',
  startingPrice: '',
  maxTokensPerFan: '',
  allowFutureMinting: false,
  exclusiveContent: true,
  communityAccess: true,
  earlyAccess: false,
  votingRights: false,
};

export function PWAContainer() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const handleLearnMore = () => {
    // Return to landing page
    window.location.href = '/';
  };

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...updates }));
  };

  const screens = [
    <Welcome 
      key="welcome"
      onNext={() => setCurrentScreen(1)} 
      onLearnMore={handleLearnMore} 
    />,
    <ProfileSetup 
      key="profile"
      onNext={() => setCurrentScreen(2)} 
      onBack={() => setCurrentScreen(0)}
      userData={userData}
      updateUserData={updateUserData}
    />,
    <WalletSetup 
      key="wallet"
      onNext={() => setCurrentScreen(3)} 
      onBack={() => setCurrentScreen(1)}
      userData={userData}
      updateUserData={updateUserData}
    />,
    <TokenWizard 
      key="token"
      onNext={() => setCurrentScreen(4)} 
      onBack={() => setCurrentScreen(2)}
      userData={userData}
      updateUserData={updateUserData}
    />,
    <Dashboard 
      key="dashboard"
      userData={userData}
      updateUserData={updateUserData}
    />,
  ];

  // Prevent scrolling when PWA is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="h-full overflow-auto"
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}