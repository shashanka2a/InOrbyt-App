import { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Gift,
  Wallet,
  Settings,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  Sun,
  Moon,
  Briefcase,
  Eye,
  Download,
  Share2,
  Plus,
  Sparkles,
  Check
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { UserData } from './PWAContainer';
import { PerksScreen } from './PerksScreen';
import { WalletScreen } from './WalletScreen';
import { SettingsScreen } from './SettingsScreen';
import { FanProfileView } from './FanProfileView';

interface DashboardProps {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
}

export function Dashboard({ userData, updateUserData }: DashboardProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState('dashboard');
  const [showFanView, setShowFanView] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'perks', icon: Gift, label: 'Perks' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  // Calculate mock stats based on token data
  const totalSupply = userData.totalSupply ? Number(userData.totalSupply) : 1000000;
  const startingPrice = userData.startingPrice ? Number(userData.startingPrice) : 0.10;
  const currentPrice = (startingPrice * 1.2).toFixed(2);
  const priceChange = '+20%';
  const holders = 247;
  const marketCap = (totalSupply * Number(currentPrice) * 0.3).toFixed(0);

  const recentHolders = [
    { name: 'Alex Chen', tokens: '1,250', value: `$${(1250 * Number(currentPrice)).toFixed(0)}`, time: '2m ago', initial: 'A' },
    { name: 'Maria Garcia', tokens: '850', value: `$${(850 * Number(currentPrice)).toFixed(0)}`, time: '15m ago', initial: 'M' },
    { name: 'James Wilson', tokens: '2,100', value: `$${(2100 * Number(currentPrice)).toFixed(0)}`, time: '1h ago', initial: 'J' },
    { name: 'Sophie Turner', tokens: '650', value: `$${(650 * Number(currentPrice)).toFixed(0)}`, time: '2h ago', initial: 'S' },
  ];

  // Get active perks from userData
  const activePerks = [
    userData.exclusiveContent && { title: 'Exclusive Content', holders },
    userData.communityAccess && { title: 'Community Access', holders },
    userData.earlyAccess && { title: 'Early Access', holders: Math.floor(holders * 0.63) },
  ].filter(Boolean) as { title: string; holders: number }[];

  const bgColor = darkMode ? '#0a0e1a' : '#faf7ec';
  const cardBg = darkMode ? '#151922' : '#ffffff';
  const textColor = darkMode ? '#f9f4e1' : '#0a0e1a';
  const textMuted = darkMode ? 'rgba(249, 244, 225, 0.6)' : 'rgba(10, 14, 26, 0.6)';
  const borderColor = darkMode ? 'rgba(249, 244, 225, 0.1)' : 'rgba(10, 14, 26, 0.1)';

  // Get initials from display name
  const getInitials = () => {
    if (!userData.displayName) return 'U';
    return userData.displayName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleShare = () => {
    const profileUrl = `https://inorbyt.io/@${userData.username}`;
    navigator.clipboard.writeText(profileUrl);
    toast.success('Profile link copied to clipboard!', {
      description: profileUrl,
      duration: 3000,
    });
  };

  const handleViewProfile = () => {
    setShowFanView(true);
  };

  // Show Fan Profile View if active
  if (showFanView) {
    return <FanProfileView userData={userData} onClose={() => setShowFanView(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: bgColor }}>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t" style={{ backgroundColor: cardBg, borderColor }}>
        <div className="flex items-center justify-around py-3 px-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSidebar === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSidebar(item.id)}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors"
                style={{
                  backgroundColor: isActive ? 'rgba(234, 83, 42, 0.1)' : 'transparent',
                  color: isActive ? '#ea532a' : textMuted,
                }}
              >
                <Icon className="w-5 h-5" />
                <span style={{ fontSize: '10px', fontWeight: 600 }}>{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:flex w-20 border-r flex-col items-center py-8 gap-6"
        style={{ borderColor }}
      >
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ea532a] to-orange-600 flex items-center justify-center mb-4">
          <span className="text-white" style={{ fontSize: '20px', fontWeight: 700 }}>I</span>
        </div>

        {/* Navigation Icons */}
        <div className="flex-1 flex flex-col gap-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSidebar === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSidebar(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: isActive
                    ? 'rgba(234, 83, 42, 0.1)'
                    : 'transparent',
                  color: isActive ? '#ea532a' : textMuted,
                }}
                title={item.label}
              >
                <Icon className="w-6 h-6" />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#ea532a] rounded-r"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDarkMode(!darkMode)}
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: darkMode
              ? 'rgba(249, 244, 225, 0.1)'
              : 'rgba(10, 14, 26, 0.1)',
            color: textColor,
          }}
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20 md:pb-0">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="px-4 md:px-8 py-4 md:py-6 border-b"
          style={{ borderColor }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-lora" style={{ fontSize: 'clamp(20px, 5vw, 32px)', fontWeight: 700, color: textColor }}>
                Welcome, {userData.displayName || 'Creator'}!
              </h1>
              <p className="hidden md:block" style={{ fontSize: '16px', color: textMuted }}>
                Here's what's happening with your token today
              </p>
            </div>
            <div className="flex gap-2 md:gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex-1 md:flex-none px-3 md:px-4 py-2 rounded-xl border-2 flex items-center justify-center gap-2"
                style={{
                  borderColor,
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleViewProfile}
                className="flex-1 md:flex-none px-4 md:px-6 py-2 rounded-xl bg-gradient-to-r from-[#ea532a] to-orange-600 text-white"
                style={{ fontSize: '13px', fontWeight: 600 }}
              >
                View Profile
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Area - Conditional Rendering */}
        {activeSidebar === 'perks' && (
          <PerksScreen userData={userData} updateUserData={updateUserData} darkMode={darkMode} />
        )}
        
        {activeSidebar === 'wallet' && (
          <WalletScreen userData={userData} darkMode={darkMode} />
        )}
        
        {activeSidebar === 'settings' && (
          <SettingsScreen 
            userData={userData} 
            updateUserData={updateUserData} 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
          />
        )}

        {/* Dashboard Content (default) */}
        {activeSidebar === 'dashboard' && (
          <div className="p-4 md:p-8">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Creator Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="col-span-12 lg:col-span-4 rounded-2xl md:rounded-3xl p-4 md:p-6 border"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#005257] to-[#005257]/70 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {userData.avatarPreview ? (
                    <img src={userData.avatarPreview} alt={userData.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white" style={{ fontSize: '28px', fontWeight: 700 }}>
                      {getInitials()}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: textColor }}>
                    {userData.displayName || 'Your Name'}
                  </h3>
                  <p style={{ fontSize: '14px', color: textMuted }}>@{userData.username || 'username'}</p>
                  <div className="mt-2 px-3 py-1 bg-[#005257]/10 text-[#005257] rounded-full inline-block" style={{ fontSize: '12px', fontWeight: 600 }}>
                    Creator
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: textMuted, lineHeight: '1.6' }}>
                {userData.bio || 'Your creator bio will appear here.'}
              </p>
            </motion.div>

            {/* Token Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="col-span-12 lg:col-span-8 rounded-2xl md:rounded-3xl p-4 md:p-6 border"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 600, color: textColor }}>
                  Token Overview
                </h3>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-[#ea532a]" style={{ color: textMuted }}>
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-[#ea532a]" style={{ color: textMuted }}>
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-[#ea532a]/10 rounded-lg">
                      <Users className="w-5 h-5 text-[#ea532a]" />
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: textMuted }}>Total Holders</p>
                  <p style={{ fontSize: '28px', fontWeight: 700, color: textColor }}>{holders}</p>
                  <span className="text-green-500" style={{ fontSize: '12px', fontWeight: 600 }}>
                    +12 today
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-[#005257]/10 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-[#005257]" />
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: textMuted }}>Total Supply</p>
                  <p style={{ fontSize: '28px', fontWeight: 700, color: textColor }}>
                    {totalSupply >= 1000000 ? `${(totalSupply / 1000000).toFixed(1)}M` : totalSupply.toLocaleString()}
                  </p>
                  <span style={{ fontSize: '12px', color: textMuted }}>
                    100% minted
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: textMuted }}>Floor Price</p>
                  <p style={{ fontSize: '28px', fontWeight: 700, color: textColor }}>${currentPrice}</p>
                  <span className="text-green-500" style={{ fontSize: '12px', fontWeight: 600 }}>
                    {priceChange}
                  </span>
                </div>

                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full h-full rounded-xl bg-gradient-to-br from-[#ea532a] to-orange-600 text-white flex flex-col items-center justify-center gap-2"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>Quick Actions</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Perks Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="col-span-12 lg:col-span-5 rounded-2xl md:rounded-3xl p-4 md:p-6 border"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: textColor }}>
                  Active Perks
                </h3>
                <button className="text-[#ea532a]" style={{ fontSize: '14px', fontWeight: 600 }}>
                  Manage
                </button>
              </div>

              {activePerks.length > 0 ? (
                <div className="space-y-3">
                  {activePerks.map((perk, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.05)' : 'rgba(10, 14, 26, 0.05)' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Gift className="w-5 h-5 text-[#ea532a]" />
                          <span style={{ fontSize: '15px', fontWeight: 600, color: textColor }}>
                            {perk.title}
                          </span>
                        </div>
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full" style={{ fontSize: '11px', fontWeight: 600 }}>
                          ACTIVE
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: textMuted, marginLeft: '32px' }}>
                        {perk.holders} holders
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Gift className="w-12 h-12 mx-auto mb-3" style={{ color: textMuted }} />
                  <p style={{ fontSize: '14px', color: textMuted }}>
                    No perks configured yet
                  </p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 p-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 hover:border-[#ea532a] transition-colors"
                style={{
                  borderColor: darkMode ? 'rgba(249, 244, 225, 0.2)' : 'rgba(10, 14, 26, 0.2)',
                  color: textMuted,
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                <Plus className="w-5 h-5" />
                Add New Perk
              </motion.button>
            </motion.div>

            {/* Wallet Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -4 }}
              className="col-span-12 lg:col-span-4 rounded-3xl p-6 border"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: textColor }}>
                  Wallet
                </h3>
                <Wallet className="w-5 h-5" style={{ color: textMuted }} />
              </div>

              <div className="mb-2">
                <p style={{ fontSize: '12px', color: textMuted, marginBottom: '4px' }}>
                  {userData.connectedWallet || 'No wallet connected'}
                </p>
              </div>

              <div className="mb-6">
                <p style={{ fontSize: '12px', color: textMuted, marginBottom: '8px' }}>
                  Total Balance
                </p>
                <p className="font-lora" style={{ fontSize: '36px', fontWeight: 700, color: textColor }}>
                  ${marketCap}
                </p>
                <span className="text-green-500" style={{ fontSize: '14px', fontWeight: 600 }}>
                  +15.3% this week
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.05)' : 'rgba(10, 14, 26, 0.05)' }}>
                  <span style={{ fontSize: '14px', color: textMuted }}>Available</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>${(Number(marketCap) * 0.86).toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.05)' : 'rgba(10, 14, 26, 0.05)' }}>
                  <span style={{ fontSize: '14px', color: textMuted }}>Pending</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>${(Number(marketCap) * 0.14).toFixed(0)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(234, 83, 42, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#ea532a] to-orange-600 text-white"
                style={{ fontSize: '15px', fontWeight: 600 }}
              >
                Withdraw Funds
              </motion.button>
            </motion.div>

            {/* Token Info Card - New */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              whileHover={{ y: -4 }}
              className="col-span-12 lg:col-span-3 rounded-3xl p-6 border"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <h3 className="mb-4" style={{ fontSize: '18px', fontWeight: 600, color: textColor }}>
                Your Token
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#005257] to-[#005257]/70 overflow-hidden flex items-center justify-center">
                  {userData.tokenImage ? (
                    <img src={userData.tokenImage} alt={userData.tokenName} className="w-full h-full object-cover" />
                  ) : (
                    <Sparkles className="w-8 h-8 text-white/40" />
                  )}
                </div>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 600, color: textColor }}>
                    {userData.tokenName || 'Token Name'}
                  </p>
                  <p style={{ fontSize: '14px', color: textMuted }}>
                    ${userData.tokenSymbol || 'SYMBOL'}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 rounded-xl border-2 text-center hover:border-[#ea532a] hover:text-[#ea532a] transition-colors"
                style={{
                  borderColor,
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                View Token Page
              </motion.button>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -4 }}
              className="col-span-12 lg:col-span-6 rounded-3xl p-6 border"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: textColor }}>
                  Recent Purchases
                </h3>
                <button className="text-[#ea532a] flex items-center gap-1" style={{ fontSize: '14px', fontWeight: 600 }}>
                  View All
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {recentHolders.map((holder, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-opacity-50 transition-all"
                    style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.03)' : 'rgba(10, 14, 26, 0.03)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#005257] to-[#ea532a]/50 flex items-center justify-center">
                        <span className="text-white" style={{ fontSize: '14px', fontWeight: 600 }}>
                          {holder.initial}
                        </span>
                      </div>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>
                          {holder.name}
                        </p>
                        <p style={{ fontSize: '12px', color: textMuted }}>
                          {holder.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>
                        {holder.tokens}
                      </p>
                      <p style={{ fontSize: '12px', color: textMuted }}>
                        {holder.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Freelancer Gigs Card - Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{ y: -4 }}
              className="col-span-12 lg:col-span-3 rounded-3xl p-6 border relative overflow-hidden"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#005257]/10 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-[#005257]" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: textColor, marginBottom: '8px' }}>
                  Freelancer Gigs
                </h3>
                <p style={{ fontSize: '14px', color: textMuted, marginBottom: '16px' }}>
                  Offer services and get paid upfront with your token
                </p>
                <span className="px-3 py-1 bg-[#ea532a]/10 text-[#ea532a] rounded-full inline-block" style={{ fontSize: '12px', fontWeight: 600 }}>
                  COMING SOON
                </span>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#005257]/5 to-transparent rounded-full -translate-y-8 translate-x-8" />
            </motion.div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}