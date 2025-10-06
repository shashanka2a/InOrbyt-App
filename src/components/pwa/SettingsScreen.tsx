import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Bell, Shield, Link2, Globe, Moon, Sun, Mail, Lock, Camera, Save } from 'lucide-react';
import { Switch } from '../ui/switch';
import type { UserData } from './PWAContainer';

interface SettingsScreenProps {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function SettingsScreen({ userData, updateUserData, darkMode, setDarkMode }: SettingsScreenProps) {
  const [displayName, setDisplayName] = useState(userData.displayName);
  const [username, setUsername] = useState(userData.username);
  const [bio, setBio] = useState(userData.bio);
  const [email, setEmail] = useState('creator@example.com');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [tokenSaleAlerts, setTokenSaleAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const bgColor = darkMode ? '#0a0e1a' : '#faf7ec';
  const cardBg = darkMode ? '#151922' : '#ffffff';
  const textColor = darkMode ? '#f9f4e1' : '#0a0e1a';
  const textMuted = darkMode ? 'rgba(249, 244, 225, 0.6)' : 'rgba(10, 14, 26, 0.6)';
  const borderColor = darkMode ? 'rgba(249, 244, 225, 0.1)' : 'rgba(10, 14, 26, 0.1)';

  const handleSaveProfile = () => {
    updateUserData({
      displayName,
      username,
      bio,
    });
  };

  const getInitials = () => {
    if (!displayName) return 'U';
    return displayName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="font-lora mb-2" style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: textColor }}>
            Settings
          </h1>
          <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: textMuted }}>
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* Profile Settings */}
          <div className="rounded-2xl md:rounded-3xl p-4 md:p-6 border" style={{ backgroundColor: cardBg, borderColor }}>
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="p-2 bg-[#ea532a]/10 rounded-lg">
                <User className="w-4 h-4 md:w-5 md:h-5 text-[#ea532a]" />
              </div>
              <h2 style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 600, color: textColor }}>
                Profile Information
              </h2>
            </div>

            <div className="space-y-4 md:space-y-6">
              {/* Avatar */}
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#005257] to-[#005257]/70 overflow-hidden flex items-center justify-center flex-shrink-0 relative group">
                  {userData.avatarPreview ? (
                    <img src={userData.avatarPreview} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white" style={{ fontSize: '32px', fontWeight: 700 }}>
                      {getInitials()}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 600, color: textColor, marginBottom: '4px' }}>
                    Profile Photo
                  </p>
                  <p style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', color: textMuted }}>
                    Upload a new profile photo (recommended 500×500px)
                  </p>
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="block mb-2" style={{ fontSize: 'clamp(13px, 3vw, 14px)', fontWeight: 600, color: textColor }}>
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 focus:border-[#005257] focus:outline-none transition-colors"
                  style={{
                    backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.05)' : '#faf7ec',
                    borderColor,
                    color: textColor,
                    fontSize: 'clamp(14px, 3vw, 16px)'
                  }}
                />
              </div>

              {/* Username */}
              <div>
                <label className="block mb-2" style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: textMuted, fontSize: '16px' }}>
                    @
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border-2 focus:border-[#005257] focus:outline-none transition-colors"
                    style={{
                      backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.05)' : '#faf7ec',
                      borderColor,
                      color: textColor,
                      fontSize: '16px'
                    }}
                  />
                </div>
                <p style={{ fontSize: '12px', color: textMuted, marginTop: '4px' }}>
                  inorbyt.io/@{username}
                </p>
              </div>

              {/* Bio */}
              <div>
                <label className="block mb-2" style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  maxLength={200}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:border-[#005257] focus:outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.05)' : '#faf7ec',
                    borderColor,
                    color: textColor,
                    fontSize: '16px'
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span style={{ fontSize: '12px', color: textMuted }}>
                    Tell your community about yourself
                  </span>
                  <span style={{ fontSize: '12px', color: textMuted }}>
                    {bio.length} / 200
                  </span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveProfile}
                className="w-full sm:w-auto px-6 py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-[#ea532a] to-orange-600 text-white flex items-center justify-center gap-2"
                style={{ fontSize: 'clamp(14px, 3vw, 15px)', fontWeight: 600 }}
              >
                <Save className="w-4 h-4 md:w-5 md:h-5" />
                Save Changes
              </motion.button>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-2xl md:rounded-3xl p-4 md:p-6 border" style={{ backgroundColor: cardBg, borderColor }}>
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="p-2 bg-[#005257]/10 rounded-lg">
                <Bell className="w-4 h-4 md:w-5 md:h-5 text-[#005257]" />
              </div>
              <h2 style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 600, color: textColor }}>
                Notifications
              </h2>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.03)' : 'rgba(10, 14, 26, 0.03)' }}>
                <div className="flex-1 min-w-0 pr-3">
                  <p style={{ fontSize: 'clamp(13px, 3vw, 15px)', fontWeight: 600, color: textColor }}>
                    Email Notifications
                  </p>
                  <p style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: textMuted }}>
                    Receive updates via email
                  </p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.03)' : 'rgba(10, 14, 26, 0.03)' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: textColor }}>
                    Push Notifications
                  </p>
                  <p style={{ fontSize: '13px', color: textMuted }}>
                    Get push notifications on your device
                  </p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.03)' : 'rgba(10, 14, 26, 0.03)' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: textColor }}>
                    Token Sale Alerts
                  </p>
                  <p style={{ fontSize: '13px', color: textMuted }}>
                    Notify when someone purchases your tokens
                  </p>
                </div>
                <Switch checked={tokenSaleAlerts} onCheckedChange={setTokenSaleAlerts} />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-3xl p-6 border" style={{ backgroundColor: cardBg, borderColor }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: textColor }}>
                Security
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.03)' : 'rgba(10, 14, 26, 0.03)' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: textColor }}>
                    Two-Factor Authentication
                  </p>
                  <p style={{ fontSize: '13px', color: textMuted }}>
                    Add an extra layer of security
                  </p>
                </div>
                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-opacity-50 transition-all"
                style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.03)' : 'rgba(10, 14, 26, 0.03)' }}
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5" style={{ color: textMuted }} />
                  <div className="text-left">
                    <p style={{ fontSize: '15px', fontWeight: 600, color: textColor }}>
                      Change Password
                    </p>
                    <p style={{ fontSize: '13px', color: textMuted }}>
                      Update your password
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '14px', color: textMuted }}>→</span>
              </motion.button>
            </div>
          </div>

          {/* Appearance */}
          <div className="rounded-3xl p-6 border" style={{ backgroundColor: cardBg, borderColor }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-purple-500" />
                ) : (
                  <Sun className="w-5 h-5 text-purple-500" />
                )}
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: textColor }}>
                Appearance
              </h2>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.03)' : 'rgba(10, 14, 26, 0.03)' }}>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: textColor }}>
                  Dark Mode
                </p>
                <p style={{ fontSize: '13px', color: textMuted }}>
                  Switch between light and dark theme
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>

          {/* Connected Accounts */}
          <div className="rounded-3xl p-6 border" style={{ backgroundColor: cardBg, borderColor }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Link2 className="w-5 h-5 text-green-500" />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: textColor }}>
                Connected Accounts
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.03)' : 'rgba(10, 14, 26, 0.03)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span style={{ fontSize: '18px' }}>👻</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: textColor }}>
                      {userData.connectedWallet || 'No wallet connected'}
                    </p>
                    <p style={{ fontSize: '13px', color: textMuted }}>
                      0x742d...9a3f
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full" style={{ fontSize: '12px', fontWeight: 600 }}>
                  Connected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
