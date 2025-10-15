import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, Plus, ArrowRight, X } from 'lucide-react';
import type { UserData } from './PWAContainer';
import { useWallet } from './WalletContext';

interface WalletSetupProps {
  onNext: () => void;
  onBack: () => void;
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
}

export function WalletSetup({ onNext, onBack, userData, updateUserData }: WalletSetupProps) {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(userData.connectedWallet);
  const { connectEip1193, connectWalletConnect, connectPrivy } = useWallet();

  const walletOptions = [
    { name: 'MetaMask', logo: '🦊', color: 'from-orange-500 to-orange-600' },
    { name: 'Coinbase Wallet', logo: '💼', color: 'from-blue-500 to-blue-600' },
    { name: 'Phantom', logo: '👻', color: 'from-purple-500 to-purple-600' },
    { name: 'WalletConnect', logo: '🔗', color: 'from-cyan-500 to-cyan-600' },
  ];

  const handleConnectExisting = () => {
    setShowWalletModal(true);
  };

  const handleWalletSelect = async (walletName: string) => {
    setSelectedWallet(walletName);
    try {
      if (walletName === 'WalletConnect') {
        await connectWalletConnect();
      } else if (walletName === 'MetaMask' || walletName === 'Coinbase Wallet') {
        await connectEip1193();
      } else {
        // Phantom shown in UI but not implemented (non-EVM) – fall back for now
        await connectEip1193();
      }
      updateUserData({ walletType: 'connect', connectedWallet: walletName });
      setShowWalletModal(false);
      onNext();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateWallet = async () => {
    try {
      await connectPrivy();
      updateUserData({ walletType: 'create', connectedWallet: 'InOrbyt Wallet' });
      onNext();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7ec] relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#005257] py-6 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="font-lora text-white" style={{ fontSize: '32px', fontWeight: 700 }}>
            Set up your Wallet
          </h1>
          <p className="text-white/80 mt-2" style={{ fontSize: '16px' }}>
            Fund your work. Grow your community. Own your future.
          </p>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-[#0a0e1a]/70 mb-12 max-w-2xl mx-auto"
          style={{ fontSize: '18px' }}
        >
          Choose how you'd like to manage your tokens and earnings
        </motion.p>

        {/* Two Large Option Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Connect Existing Wallet */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleConnectExisting}
            whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#0a0e1a] rounded-3xl p-10 text-left group transition-all duration-300"
          >
            <div className="mb-8">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-lora text-white mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>
                Connect Existing Wallet
              </h2>
              <p className="text-white/70" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                Use your MetaMask, Coinbase, Phantom, or WalletConnect to get started instantly
              </p>
            </div>

            {/* Wallet Logos */}
            <div className="flex gap-3 mb-6">
              {walletOptions.map((wallet, index) => (
                <div
                  key={index}
                  className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm"
                  style={{ fontSize: '20px' }}
                >
                  {wallet.logo}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors" style={{ fontSize: '14px', fontWeight: 600 }}>
              Connect Now
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.button>

          {/* Create New Wallet */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleCreateWallet}
            whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(234, 83, 42, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-[#ea532a] to-orange-600 rounded-3xl p-10 text-left group transition-all duration-300 relative overflow-hidden"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-lora text-white mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>
                  Create a Wallet
                </h2>
                <p className="text-white/90" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                  We'll create a secure, easy-to-use wallet for you. No crypto knowledge needed.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span style={{ fontSize: '14px' }}>Built-in security</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span style={{ fontSize: '14px' }}>Buy tokens with credit card</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span style={{ fontSize: '14px' }}>Easy recovery options</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white group-hover:translate-x-1 transition-transform" style={{ fontSize: '14px', fontWeight: 600 }}>
                Get Started
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.button>
        </div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-[#0a0e1a]/50" style={{ fontSize: '14px' }}>
            Your wallet is encrypted and secured. We never have access to your private keys.
          </p>
        </motion.div>
      </div>

      {/* Wallet Selection Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWalletModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-6"
            >
              <div className="bg-[#0a0e1a] rounded-3xl p-8 max-w-md w-full shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-lora text-white" style={{ fontSize: '24px', fontWeight: 700 }}>
                    Connect Wallet
                  </h3>
                  <button
                    onClick={() => setShowWalletModal(false)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <p className="text-white/70 mb-6" style={{ fontSize: '14px' }}>
                  Choose your preferred wallet to continue
                </p>

                {/* Wallet Options */}
                <div className="space-y-3">
                  {walletOptions.map((wallet, index) => (
                    <motion.button
                      key={wallet.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleWalletSelect(wallet.name)}
                      whileHover={{ x: 4 }}
                      className={`w-full p-4 rounded-xl bg-white/5 border-2 border-white/10 hover:border-white/30 flex items-center gap-4 transition-all ${
                        selectedWallet === wallet.name ? 'border-[#ea532a] bg-[#ea532a]/10' : ''
                      }`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${wallet.color} rounded-xl flex items-center justify-center`} style={{ fontSize: '24px' }}>
                        {wallet.logo}
                      </div>
                      <span className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>
                        {wallet.name}
                      </span>
                      {selectedWallet === wallet.name && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-6 h-6 bg-[#ea532a] rounded-full flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <p className="text-white/50 text-center mt-6" style={{ fontSize: '12px' }}>
                  Your connection is secure and encrypted
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}