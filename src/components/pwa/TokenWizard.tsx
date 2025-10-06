import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Upload, Sparkles, Check, Edit2 } from 'lucide-react';
import { Switch } from '../ui/switch';
import type { UserData } from './PWAContainer';

interface TokenWizardProps {
  onNext: () => void;
  onBack: () => void;
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
}

export function TokenWizard({ onNext, onBack, userData, updateUserData }: TokenWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    tokenName: userData.tokenName || '',
    tokenSymbol: userData.tokenSymbol || '',
    tokenImage: userData.tokenImage || null,
    totalSupply: userData.totalSupply || '',
    startingPrice: userData.startingPrice || '',
    maxTokensPerFan: userData.maxTokensPerFan || '',
    allowFutureMinting: userData.allowFutureMinting || false,
    exclusiveContent: userData.exclusiveContent,
    communityAccess: userData.communityAccess,
    earlyAccess: userData.earlyAccess,
    votingRights: userData.votingRights,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('tokenImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.tokenName && formData.tokenSymbol;
      case 1:
        return formData.totalSupply && formData.startingPrice;
      case 2:
        return true;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save all token data before moving to dashboard
      updateUserData({
        tokenName: formData.tokenName,
        tokenSymbol: formData.tokenSymbol,
        tokenImage: formData.tokenImage,
        totalSupply: formData.totalSupply,
        startingPrice: formData.startingPrice,
        maxTokensPerFan: formData.maxTokensPerFan,
        allowFutureMinting: formData.allowFutureMinting,
        exclusiveContent: formData.exclusiveContent,
        communityAccess: formData.communityAccess,
        earlyAccess: formData.earlyAccess,
        votingRights: formData.votingRights,
      });
      onNext();
    }
  };

  const handleBackButton = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7ec]">
      {/* Header with Progress */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#005257] py-6 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="font-lora text-white mb-6" style={{ fontSize: '32px', fontWeight: 700 }}>
            Create Your Token
          </h1>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      index < currentStep
                        ? 'bg-white text-[#005257]'
                        : index === currentStep
                        ? 'bg-[#ea532a] text-white'
                        : 'bg-white/20 text-white/50'
                    }`}
                    style={{ fontSize: '16px', fontWeight: 700 }}
                  >
                    {index < currentStep ? <Check className="w-5 h-5" /> : step}
                  </div>
                  <span
                    className={`hidden sm:inline ${
                      index <= currentStep ? 'text-white' : 'text-white/50'
                    }`}
                    style={{ fontSize: '14px', fontWeight: 600 }}
                  >
                    {['Create Token', 'Supply & Price', 'Fan Perks', 'Review'][index]}
                  </span>
                </div>
                {index < 3 && (
                  <div className="flex-1 h-0.5 mx-4 bg-white/20">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: index < currentStep ? 1 : 0 }}
                      className="h-full bg-white origin-left"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Create Token */}
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-[#0a0e1a]/10"
            >
              <h2 className="font-lora text-[#0a0e1a] mb-6" style={{ fontSize: '28px', fontWeight: 700 }}>
                Token Basics
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Token Name */}
                  <div>
                    <label className="block text-[#0a0e1a] mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>
                      Token Name
                    </label>
                    <input
                      type="text"
                      value={formData.tokenName}
                      onChange={(e) => handleInputChange('tokenName', e.target.value)}
                      placeholder="e.g. Sarah's Creator Token"
                      className="w-full px-4 py-3 bg-[#faf7ec] border-2 border-[#0a0e1a]/10 rounded-xl text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus:border-[#005257] focus:outline-none transition-colors"
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  {/* Token Symbol */}
                  <div>
                    <label className="block text-[#0a0e1a] mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>
                      Token Symbol
                    </label>
                    <input
                      type="text"
                      value={formData.tokenSymbol}
                      onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                      placeholder="e.g. SARAH"
                      maxLength={6}
                      className="w-full px-4 py-3 bg-[#faf7ec] border-2 border-[#0a0e1a]/10 rounded-xl text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus:border-[#005257] focus:outline-none transition-colors uppercase"
                      style={{ fontSize: '16px' }}
                    />
                    <p className="text-[#0a0e1a]/50 mt-2" style={{ fontSize: '12px' }}>
                      3-6 characters, all caps
                    </p>
                  </div>
                </div>

                {/* Token Image Upload */}
                <div>
                  <label className="block text-[#0a0e1a] mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>
                    Token Image
                  </label>
                  <div className="relative">
                    <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#005257] to-[#005257]/70 border-4 border-[#0a0e1a]/10 overflow-hidden flex items-center justify-center">
                      {formData.tokenImage ? (
                        <img
                          src={formData.tokenImage}
                          alt="Token preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-6">
                          <Upload className="w-12 h-12 text-white/40 mx-auto mb-3" />
                          <p className="text-white/60" style={{ fontSize: '14px' }}>
                            Upload or AI generate
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 mt-4">
                      <label className="flex-1 px-4 py-3 bg-[#0a0e1a] text-white rounded-xl text-center cursor-pointer hover:bg-[#0a0e1a]/90 transition-colors" style={{ fontSize: '14px', fontWeight: 600 }}>
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        className="flex-1 px-4 py-3 bg-[#ea532a]/10 text-[#ea532a] rounded-xl hover:bg-[#ea532a]/20 transition-colors flex items-center justify-center gap-2"
                        style={{ fontSize: '14px', fontWeight: 600 }}
                      >
                        <Sparkles className="w-4 h-4" />
                        AI Generate
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#0a0e1a]/10">
                <motion.button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  whileHover={canProceed() ? { scale: 1.02, boxShadow: '0 20px 40px rgba(234, 83, 42, 0.25)' } : {}}
                  whileTap={canProceed() ? { scale: 0.98 } : {}}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#ea532a] to-orange-600 text-white flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Continue to Set Token Supply
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Token Supply & Price */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-[#0a0e1a]/10"
            >
              <h2 className="font-lora text-[#0a0e1a] mb-2" style={{ fontSize: '28px', fontWeight: 700 }}>
                Token Economics
              </h2>
              <p className="text-[#0a0e1a]/60 mb-8" style={{ fontSize: '16px' }}>
                Set your token supply and pricing
              </p>

              <div className="space-y-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Total Supply */}
                  <div>
                    <label className="block text-[#0a0e1a] mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>
                      Total Supply
                    </label>
                    <input
                      type="number"
                      value={formData.totalSupply}
                      onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                      placeholder="e.g. 1000000"
                      className="w-full px-4 py-3 bg-[#faf7ec] border-2 border-[#0a0e1a]/10 rounded-xl text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus:border-[#005257] focus:outline-none transition-colors"
                      style={{ fontSize: '16px' }}
                    />
                    <p className="text-[#0a0e1a]/50 mt-2" style={{ fontSize: '12px' }}>
                      Total number of tokens to create
                    </p>
                  </div>

                  {/* Starting Price */}
                  <div>
                    <label className="block text-[#0a0e1a] mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>
                      Starting Price (USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.startingPrice}
                      onChange={(e) => handleInputChange('startingPrice', e.target.value)}
                      placeholder="e.g. 0.10"
                      className="w-full px-4 py-3 bg-[#faf7ec] border-2 border-[#0a0e1a]/10 rounded-xl text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus:border-[#005257] focus:outline-none transition-colors"
                      style={{ fontSize: '16px' }}
                    />
                    <p className="text-[#0a0e1a]/50 mt-2" style={{ fontSize: '12px' }}>
                      Initial price per token
                    </p>
                  </div>
                </div>

                {/* Max Tokens Per Fan */}
                <div>
                  <label className="block text-[#0a0e1a] mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>
                    Max Tokens per Fan (Optional)
                  </label>
                  <input
                    type="number"
                    value={formData.maxTokensPerFan}
                    onChange={(e) => handleInputChange('maxTokensPerFan', e.target.value)}
                    placeholder="e.g. 1000"
                    className="w-full px-4 py-3 bg-[#faf7ec] border-2 border-[#0a0e1a]/10 rounded-xl text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus:border-[#005257] focus:outline-none transition-colors"
                    style={{ fontSize: '16px' }}
                  />
                  <p className="text-[#0a0e1a]/50 mt-2" style={{ fontSize: '12px' }}>
                    Limit how many tokens each fan can purchase
                  </p>
                </div>

                {/* Advanced Settings Toggle */}
                <div className="bg-[#faf7ec] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[#0a0e1a]" style={{ fontSize: '15px', fontWeight: 600 }}>
                      Allow Future Minting
                    </p>
                    <p className="text-[#0a0e1a]/60" style={{ fontSize: '13px' }}>
                      You can create more tokens later
                    </p>
                  </div>
                  <Switch
                    checked={formData.allowFutureMinting}
                    onCheckedChange={(checked) => handleInputChange('allowFutureMinting', checked)}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-[#0a0e1a]/10">
                <motion.button
                  onClick={handleBackButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full border-2 border-[#0a0e1a]/20 text-[#0a0e1a] flex items-center gap-2"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  whileHover={canProceed() ? { scale: 1.02, boxShadow: '0 20px 40px rgba(234, 83, 42, 0.25)' } : {}}
                  whileTap={canProceed() ? { scale: 0.98 } : {}}
                  className="flex-1 px-8 py-4 rounded-full bg-gradient-to-r from-[#ea532a] to-orange-600 text-white flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Continue to Set Fan Perks
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Fan Perks */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left - Perks Settings */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#0a0e1a]/10">
                  <h2 className="font-lora text-[#0a0e1a] mb-2" style={{ fontSize: '28px', fontWeight: 700 }}>
                    Fan Perks
                  </h2>
                  <p className="text-[#0a0e1a]/60 mb-8" style={{ fontSize: '16px' }}>
                    Choose what holders get access to
                  </p>

                  <div className="space-y-4">
                    {/* Exclusive Content */}
                    <div className="bg-[#faf7ec] rounded-xl p-5 flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-[#0a0e1a] mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                          Exclusive Content
                        </p>
                        <p className="text-[#0a0e1a]/60" style={{ fontSize: '13px' }}>
                          Behind-the-scenes, tutorials, early releases
                        </p>
                      </div>
                      <Switch
                        checked={formData.exclusiveContent}
                        onCheckedChange={(checked) => handleInputChange('exclusiveContent', checked)}
                      />
                    </div>

                    {/* Community Access */}
                    <div className="bg-[#faf7ec] rounded-xl p-5 flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-[#0a0e1a] mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                          Community Access
                        </p>
                        <p className="text-[#0a0e1a]/60" style={{ fontSize: '13px' }}>
                          Private Discord, Telegram, or community forum
                        </p>
                      </div>
                      <Switch
                        checked={formData.communityAccess}
                        onCheckedChange={(checked) => handleInputChange('communityAccess', checked)}
                      />
                    </div>

                    {/* Early Access */}
                    <div className="bg-[#faf7ec] rounded-xl p-5 flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-[#0a0e1a] mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                          Early Access
                        </p>
                        <p className="text-[#0a0e1a]/60" style={{ fontSize: '13px' }}>
                          First to see new projects and announcements
                        </p>
                      </div>
                      <Switch
                        checked={formData.earlyAccess}
                        onCheckedChange={(checked) => handleInputChange('earlyAccess', checked)}
                      />
                    </div>

                    {/* Voting Rights */}
                    <div className="bg-[#faf7ec] rounded-xl p-5 flex items-start justify-between opacity-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[#0a0e1a]" style={{ fontSize: '16px', fontWeight: 600 }}>
                            Voting Rights
                          </p>
                          <span className="px-2 py-0.5 bg-[#005257] text-white rounded-full" style={{ fontSize: '10px', fontWeight: 600 }}>
                            COMING SOON
                          </span>
                        </div>
                        <p className="text-[#0a0e1a]/60" style={{ fontSize: '13px' }}>
                          Let holders vote on decisions
                        </p>
                      </div>
                      <Switch
                        checked={formData.votingRights}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Right - Live Preview */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 shadow-lg">
                  <h3 className="text-white mb-6" style={{ fontSize: '18px', fontWeight: 600 }}>
                    Token Preview
                  </h3>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    {/* Token Image */}
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-white/20 overflow-hidden flex items-center justify-center">
                      {formData.tokenImage ? (
                        <img src={formData.tokenImage} alt="Token" className="w-full h-full object-cover" />
                      ) : (
                        <Sparkles className="w-12 h-12 text-white/40" />
                      )}
                    </div>

                    {/* Token Info */}
                    <div className="text-center mb-6">
                      <h4 className="text-white mb-1" style={{ fontSize: '22px', fontWeight: 700 }}>
                        {formData.tokenName || 'Your Token Name'}
                      </h4>
                      <p className="text-white/80" style={{ fontSize: '16px' }}>
                        ${formData.tokenSymbol || 'SYMBOL'}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 rounded-xl p-3 text-center">
                        <p className="text-white/70" style={{ fontSize: '12px' }}>Supply</p>
                        <p className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>
                          {formData.totalSupply ? Number(formData.totalSupply).toLocaleString() : '—'}
                        </p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 text-center">
                        <p className="text-white/70" style={{ fontSize: '12px' }}>Price</p>
                        <p className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>
                          ${formData.startingPrice || '—'}
                        </p>
                      </div>
                    </div>

                    {/* Active Perks */}
                    <div>
                      <p className="text-white/80 mb-3" style={{ fontSize: '12px', fontWeight: 600 }}>
                        HOLDER PERKS
                      </p>
                      <div className="space-y-2">
                        {formData.exclusiveContent && (
                          <div className="flex items-center gap-2 text-white" style={{ fontSize: '13px' }}>
                            <Check className="w-4 h-4" />
                            Exclusive Content
                          </div>
                        )}
                        {formData.communityAccess && (
                          <div className="flex items-center gap-2 text-white" style={{ fontSize: '13px' }}>
                            <Check className="w-4 h-4" />
                            Community Access
                          </div>
                        )}
                        {formData.earlyAccess && (
                          <div className="flex items-center gap-2 text-white" style={{ fontSize: '13px' }}>
                            <Check className="w-4 h-4" />
                            Early Access
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <motion.button
                  onClick={handleBackButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full border-2 border-[#0a0e1a]/20 text-[#0a0e1a] flex items-center gap-2"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(234, 83, 42, 0.25)' }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-8 py-4 rounded-full bg-gradient-to-r from-[#ea532a] to-orange-600 text-white flex items-center justify-center gap-2"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Review + Publish
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Review & Publish */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-[#0a0e1a]/10"
            >
              <h2 className="font-lora text-[#0a0e1a] mb-2" style={{ fontSize: '32px', fontWeight: 700 }}>
                Review & Publish
              </h2>
              <p className="text-[#0a0e1a]/60 mb-8" style={{ fontSize: '16px' }}>
                Make sure everything looks good before minting your token
              </p>

              <div className="space-y-6 mb-8">
                {/* Token Details */}
                <div className="border border-[#0a0e1a]/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-[#0a0e1a]" style={{ fontSize: '18px', fontWeight: 600 }}>
                      Token Details
                    </h3>
                    <button
                      onClick={() => setCurrentStep(0)}
                      className="flex items-center gap-1 text-[#ea532a] hover:text-[#ea532a]/80"
                      style={{ fontSize: '14px', fontWeight: 600 }}
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#005257] to-[#005257]/70 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {formData.tokenImage ? (
                          <img src={formData.tokenImage} alt="Token" className="w-full h-full object-cover" />
                        ) : (
                          <Sparkles className="w-8 h-8 text-white/40" />
                        )}
                      </div>
                      <div>
                        <p className="text-[#0a0e1a]/50" style={{ fontSize: '12px' }}>Token Name</p>
                        <p className="text-[#0a0e1a]" style={{ fontSize: '18px', fontWeight: 600 }}>
                          {formData.tokenName}
                        </p>
                        <p className="text-[#0a0e1a]/70" style={{ fontSize: '14px' }}>
                          ${formData.tokenSymbol}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Economics */}
                <div className="border border-[#0a0e1a]/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-[#0a0e1a]" style={{ fontSize: '18px', fontWeight: 600 }}>
                      Token Economics
                    </h3>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-1 text-[#ea532a] hover:text-[#ea532a]/80"
                      style={{ fontSize: '14px', fontWeight: 600 }}
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-[#0a0e1a]/50 mb-1" style={{ fontSize: '12px' }}>Total Supply</p>
                      <p className="text-[#0a0e1a]" style={{ fontSize: '20px', fontWeight: 600 }}>
                        {Number(formData.totalSupply).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#0a0e1a]/50 mb-1" style={{ fontSize: '12px' }}>Starting Price</p>
                      <p className="text-[#0a0e1a]" style={{ fontSize: '20px', fontWeight: 600 }}>
                        ${formData.startingPrice}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#0a0e1a]/50 mb-1" style={{ fontSize: '12px' }}>Future Minting</p>
                      <p className="text-[#0a0e1a]" style={{ fontSize: '20px', fontWeight: 600 }}>
                        {formData.allowFutureMinting ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Perks */}
                <div className="border border-[#0a0e1a]/10 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-[#0a0e1a]" style={{ fontSize: '18px', fontWeight: 600 }}>
                      Holder Perks
                    </h3>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-1 text-[#ea532a] hover:text-[#ea532a]/80"
                      style={{ fontSize: '14px', fontWeight: 600 }}
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {formData.exclusiveContent && (
                      <div className="px-4 py-2 bg-[#005257]/10 text-[#005257] rounded-full flex items-center gap-2" style={{ fontSize: '14px', fontWeight: 600 }}>
                        <Check className="w-4 h-4" />
                        Exclusive Content
                      </div>
                    )}
                    {formData.communityAccess && (
                      <div className="px-4 py-2 bg-[#005257]/10 text-[#005257] rounded-full flex items-center gap-2" style={{ fontSize: '14px', fontWeight: 600 }}>
                        <Check className="w-4 h-4" />
                        Community Access
                      </div>
                    )}
                    {formData.earlyAccess && (
                      <div className="px-4 py-2 bg-[#005257]/10 text-[#005257] rounded-full flex items-center gap-2" style={{ fontSize: '14px', fontWeight: 600 }}>
                        <Check className="w-4 h-4" />
                        Early Access
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-[#0a0e1a]/10">
                <motion.button
                  onClick={handleBackButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full border-2 border-[#0a0e1a]/20 text-[#0a0e1a]"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Back to Customize Perks
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(234, 83, 42, 0.25)' }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-8 py-4 rounded-full bg-gradient-to-r from-[#ea532a] to-orange-600 text-white flex items-center justify-center gap-2"
                  style={{ fontSize: '17px', fontWeight: 600 }}
                >
                  Mint Your Token
                  <Sparkles className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}