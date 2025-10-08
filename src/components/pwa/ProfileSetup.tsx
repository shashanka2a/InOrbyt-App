import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, Info, ArrowRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import type { UserData } from './PWAContainer';

interface ProfileSetupProps {
  onNext: () => void;
  onBack: () => void;
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
}

export function ProfileSetup({ onNext, onBack, userData, updateUserData }: ProfileSetupProps) {
  const [displayName, setDisplayName] = useState(userData.displayName);
  const [username, setUsername] = useState(userData.username);
  const [bio, setBio] = useState(userData.bio);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(userData.avatarPreview);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const canProceed = displayName.trim() && username.trim();

  const handleNext = () => {
    updateUserData({
      displayName,
      username,
      bio,
      avatarPreview,
    });
    onNext();
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#faf7ec]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#005257] py-6 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="font-lora text-white" style={{ fontSize: '32px', fontWeight: 700 }}>
            Set Up Your Profile
          </h1>
          <p className="text-white/80 mt-2" style={{ fontSize: '16px' }}>
            Step 1 of 3 — Let's create your creator identity
          </p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Avatar Upload */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative">
              <div className="w-full max-w-[500px] aspect-square rounded-full bg-gradient-to-br from-[#005257] to-[#005257]/70 border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover max-w-full max-h-full"
                    style={{ maxWidth: '500px', maxHeight: '500px' }}
                  />
                ) : (
                  <div className="text-center p-8">
                    <Camera className="w-24 h-24 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60" style={{ fontSize: '18px' }}>
                      Upload your avatar
                    </p>
                    <p className="text-white/40 mt-2" style={{ fontSize: '14px' }}>
                      500 × 500 px recommended
                    </p>
                  </div>
                )}
              </div>
              <motion.label
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-6 right-6 w-16 h-16 bg-[#ea532a] rounded-full flex items-center justify-center cursor-pointer shadow-xl"
              >
                <Camera className="w-8 h-8 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </motion.label>
            </div>
            <p className="text-[#0a0e1a]/60 mt-6 text-center" style={{ fontSize: '14px' }}>
              This image will be displayed on your token and profile
            </p>
          </motion.div>

          {/* Right Side - Form Fields */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#0a0e1a]/10">
              {/* Display Name */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[#0a0e1a]" style={{ fontSize: '15px', fontWeight: 600 }}>
                    Display Name
                  </label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-[#0a0e1a]/40 hover:text-[#0a0e1a]/60">
                        <Info className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs" style={{ fontSize: '13px' }}>
                        Your public name that will be displayed to your community
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Sarah Chen"
                  className="w-full px-4 py-3 bg-[#faf7ec] border-2 border-[#0a0e1a]/10 rounded-xl text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus:border-[#005257] focus:outline-none transition-colors"
                  style={{ fontSize: '16px' }}
                />
              </div>

              {/* Username */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[#0a0e1a]" style={{ fontSize: '15px', fontWeight: 600 }}>
                    Username
                  </label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-[#0a0e1a]/40 hover:text-[#0a0e1a]/60">
                        <Info className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs" style={{ fontSize: '13px' }}>
                        Your unique handle for your InOrbyt profile URL
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0a0e1a]/40" style={{ fontSize: '16px' }}>
                    @
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="username"
                    className="w-full pl-8 pr-4 py-3 bg-[#faf7ec] border-2 border-[#0a0e1a]/10 rounded-xl text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus:border-[#005257] focus:outline-none transition-colors"
                    style={{ fontSize: '16px' }}
                  />
                </div>
                {username && (
                  <p className="text-[#0a0e1a]/50 mt-2" style={{ fontSize: '12px' }}>
                    inorbyt.io/@{username}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[#0a0e1a]" style={{ fontSize: '15px', fontWeight: 600 }}>
                    Bio
                  </label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-[#0a0e1a]/40 hover:text-[#0a0e1a]/60">
                        <Info className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs" style={{ fontSize: '13px' }}>
                        Tell your community what you create and what makes you unique
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell your community about yourself and what you create..."
                  rows={5}
                  maxLength={200}
                  className="w-full px-4 py-3 bg-[#faf7ec] border-2 border-[#0a0e1a]/10 rounded-xl text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus:border-[#005257] focus:outline-none transition-colors resize-none"
                  style={{ fontSize: '16px' }}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[#0a0e1a]/40" style={{ fontSize: '12px' }}>
                    Optional
                  </span>
                  <span className="text-[#0a0e1a]/40" style={{ fontSize: '12px' }}>
                    {bio.length} / 200
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#0a0e1a]/10 to-transparent mb-8" />

              {/* CTA Button */}
              <motion.button
                onClick={handleNext}
                disabled={!canProceed}
                whileHover={canProceed ? { scale: 1.02, boxShadow: '0 20px 40px rgba(234, 83, 42, 0.25)' } : {}}
                whileTap={canProceed ? { scale: 0.98 } : {}}
                className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-[#ea532a] to-orange-600 text-white flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                style={{ fontSize: '17px', fontWeight: 600 }}
              >
                Next: Connect Your Wallet
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}