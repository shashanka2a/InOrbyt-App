import { motion } from 'motion/react';
import { X, ArrowLeft, ShoppingCart, Sparkles, TrendingUp, Users, Lock, Check, Share } from 'lucide-react';
import type { UserData } from './PWAContainer';

interface FanProfileViewProps {
  userData: UserData;
  onClose: () => void;
}

export function FanProfileView({ userData, onClose }: FanProfileViewProps) {
  const totalSupply = userData.totalSupply ? Number(userData.totalSupply) : 1000000;
  const startingPrice = userData.startingPrice ? Number(userData.startingPrice) : 0.10;
  const currentPrice = (startingPrice * 1.2).toFixed(2);
  const priceChange = '+20%';
  const holders = 247;

  const getInitials = () => {
    if (!userData.displayName) return 'U';
    return userData.displayName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const activePerks = [
    userData.exclusiveContent && { 
      title: 'Exclusive Content', 
      description: 'Behind-the-scenes content, tutorials, and early releases',
      icon: Lock 
    },
    userData.communityAccess && { 
      title: 'Community Access', 
      description: 'Private Discord server and community forum',
      icon: Users 
    },
    userData.earlyAccess && { 
      title: 'Early Access', 
      description: 'First to see new projects and announcements',
      icon: Sparkles 
    },
  ].filter(Boolean) as { title: string; description: string; icon: any }[];

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0e1a] overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0e1a]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-[#f9f4e1]" />
          </button>
          <h1 className="font-lora text-[#f9f4e1]" style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 700 }}>
            InOrbyt Creator Profile Preview
          </h1>
          <button
            onClick={() => {
              const profileUrl = `https://inorbyt.io/@${userData.username}`;
              navigator.clipboard.writeText(profileUrl);
              // You could add a toast notification here
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Share className="w-5 h-5 md:w-6 md:h-6 text-[#f9f4e1]" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
            {/* Profile Image */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#005257] to-[#005257]/70 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-2xl mx-auto sm:mx-0">
              {userData.avatarPreview ? (
                <img src={userData.avatarPreview} alt={userData.displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white" style={{ fontSize: '48px', fontWeight: 700 }}>
                  {getInitials()}
                </span>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="mb-4">
                <h1 className="font-lora text-[#f9f4e1] mb-2" style={{ fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 700 }}>
                  {userData.displayName || 'Creator Name'}
                </h1>
                <p className="text-[#f9f4e1]/70 mb-4" style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>
                  @{userData.username || 'username'}
                </p>
              </div>
              <p className="text-[#f9f4e1]/80 mb-6" style={{ fontSize: 'clamp(15px, 3.5vw, 18px)', lineHeight: '1.6' }}>
                {userData.bio || 'Creator bio will appear here.'}
              </p>

            </div>
          </div>
        </motion.div>

        {/* Token Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#005257] to-[#005257]/80 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-2xl"
        >
          <div className="flex flex-col gap-6 md:gap-8 items-center">
            {/* Token Image */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-lg overflow-hidden flex items-center justify-center flex-shrink-0 border-4 border-white/20">
              {userData.tokenImage ? (
                <img src={userData.tokenImage} alt={userData.tokenName} className="w-full h-full object-cover" />
              ) : (
                <Sparkles className="w-16 h-16 text-white/40" />
              )}
            </div>

            {/* Token Info */}
            <div className="flex-1 text-center w-full">
              <h2 className="font-lora text-white mb-2" style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 700 }}>
                {userData.tokenName || 'Token Name'}
              </h2>
              <p className="text-white/80 mb-6" style={{ fontSize: 'clamp(15px, 3.5vw, 18px)' }}>
                ${userData.tokenSymbol || 'SYMBOL'}
              </p>

              <div className="grid grid-cols-2 gap-3 md:gap-6 mb-6">
                <div className="bg-white/10 rounded-lg md:rounded-xl p-3 md:p-4 backdrop-blur-sm">
                  <p className="text-white/70 mb-1" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>Current Price</p>
                  <p className="text-white" style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 700 }}>${currentPrice}</p>
                  <span className="text-green-400" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 600 }}>
                    {priceChange}
                  </span>
                </div>
                <div className="bg-white/10 rounded-lg md:rounded-xl p-3 md:p-4 backdrop-blur-sm">
                  <p className="text-white/70 mb-1" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>Holders</p>
                  <p className="text-white" style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 700 }}>{holders}</p>
                </div>
              </div>
            </div>

            {/* Buy Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#ea532a] to-orange-600 text-white flex items-center justify-center gap-2 shadow-xl"
              style={{ fontSize: 'clamp(15px, 3.5vw, 17px)', fontWeight: 600 }}
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              Buy {userData.tokenSymbol || 'TOKENS'}
            </motion.button>
          </div>
        </motion.div>

        {/* Holder Perks */}
        {activePerks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 md:mb-8"
          >
            <h2 className="font-lora text-[#f9f4e1] mb-4 md:mb-6" style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 700 }}>
              Holder Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {activePerks.map((perk, index) => {
                const Icon = perk.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-[#151922] rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#ea532a]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#ea532a]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-[#f9f4e1]" style={{ fontSize: 'clamp(15px, 3.5vw, 18px)', fontWeight: 600 }}>
                            {perk.title}
                          </h3>
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                        </div>
                        <p className="text-[#f9f4e1]/70" style={{ fontSize: 'clamp(12px, 3vw, 14px)', lineHeight: '1.6' }}>
                          {perk.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#151922] rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10"
        >
          <h2 className="font-lora text-[#f9f4e1] mb-4" style={{ fontSize: 'clamp(18px, 4.5vw, 24px)', fontWeight: 700 }}>
            About This Token
          </h2>
          <p className="text-[#f9f4e1]/80 mb-6" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: '1.8' }}>
            By holding {userData.tokenName || 'this token'}, you're not just investing in a creator—you're 
            becoming part of an exclusive community. Support {userData.displayName || 'this creator'}'s journey 
            while gaining access to unique perks and content.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-[#f9f4e1]/60 mb-1" style={{ fontSize: '13px' }}>Token Type</p>
              <p className="text-[#f9f4e1]" style={{ fontSize: '16px', fontWeight: 600 }}>Creator Token</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-[#f9f4e1]/60 mb-1" style={{ fontSize: '13px' }}>Blockchain</p>
              <p className="text-[#f9f4e1]" style={{ fontSize: '16px', fontWeight: 600 }}>Base</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-[#f9f4e1]/60 mb-1" style={{ fontSize: '13px' }}>Starting Price</p>
              <p className="text-[#f9f4e1]" style={{ fontSize: '16px', fontWeight: 600 }}>${startingPrice}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-[#f9f4e1]/60 mb-1" style={{ fontSize: '13px' }}>Future Minting</p>
              <p className="text-[#f9f4e1]" style={{ fontSize: '16px', fontWeight: 600 }}>
                {userData.allowFutureMinting ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 md:mt-8 text-center"
        >
          <p className="text-[#f9f4e1]/70 mb-6" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
            Ready to support {userData.displayName || 'this creator'} and unlock exclusive benefits?
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 rounded-full bg-gradient-to-r from-[#ea532a] to-orange-600 text-white flex items-center justify-center gap-2 md:gap-3 mx-auto shadow-xl"
            style={{ fontSize: 'clamp(16px, 3.5vw, 18px)', fontWeight: 600 }}
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            Purchase {userData.tokenSymbol || 'Tokens'} Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
