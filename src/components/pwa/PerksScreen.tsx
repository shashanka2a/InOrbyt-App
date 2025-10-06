import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Gift, Lock, Users, Clock, CheckCircle } from 'lucide-react';
import { Switch } from '../ui/switch';
import type { UserData } from './PWAContainer';

interface PerksScreenProps {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
  darkMode: boolean;
}

interface Perk {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  holders: number;
  icon: any;
}

export function PerksScreen({ userData, updateUserData, darkMode }: PerksScreenProps) {
  const [showAddPerk, setShowAddPerk] = useState(false);
  const [newPerkTitle, setNewPerkTitle] = useState('');
  const [newPerkDescription, setNewPerkDescription] = useState('');

  const bgColor = darkMode ? '#0a0e1a' : '#faf7ec';
  const cardBg = darkMode ? '#151922' : '#ffffff';
  const textColor = darkMode ? '#f9f4e1' : '#0a0e1a';
  const textMuted = darkMode ? 'rgba(249, 244, 225, 0.6)' : 'rgba(10, 14, 26, 0.6)';
  const borderColor = darkMode ? 'rgba(249, 244, 225, 0.1)' : 'rgba(10, 14, 26, 0.1)';

  const perks: Perk[] = [
    {
      id: '1',
      title: 'Exclusive Content',
      description: 'Behind-the-scenes content, tutorials, and early releases',
      isActive: userData.exclusiveContent,
      holders: 247,
      icon: Lock,
    },
    {
      id: '2',
      title: 'Community Access',
      description: 'Private Discord server and community forum',
      isActive: userData.communityAccess,
      holders: 247,
      icon: Users,
    },
    {
      id: '3',
      title: 'Early Access',
      description: 'First to see new projects and announcements',
      isActive: userData.earlyAccess,
      holders: 156,
      icon: Clock,
    },
  ];

  const handleTogglePerk = (perkId: string) => {
    const updates: Partial<UserData> = {};
    if (perkId === '1') updates.exclusiveContent = !userData.exclusiveContent;
    if (perkId === '2') updates.communityAccess = !userData.communityAccess;
    if (perkId === '3') updates.earlyAccess = !userData.earlyAccess;
    updateUserData(updates);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="font-lora mb-2" style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: textColor }}>
            Manage Perks
          </h1>
          <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: textMuted }}>
            Create and manage exclusive benefits for your token holders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-xl md:rounded-2xl p-4 md:p-6 border"
            style={{ backgroundColor: cardBg, borderColor }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#ea532a]/10 rounded-lg">
                <Gift className="w-4 h-4 md:w-5 md:h-5 text-[#ea532a]" />
              </div>
            </div>
            <p style={{ fontSize: '11px', color: textMuted }}>Active Perks</p>
            <p style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: textColor }}>
              {perks.filter(p => p.isActive).length}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-xl md:rounded-2xl p-4 md:p-6 border"
            style={{ backgroundColor: cardBg, borderColor }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#005257]/10 rounded-lg">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-[#005257]" />
              </div>
            </div>
            <p style={{ fontSize: '11px', color: textMuted }}>Total Holders</p>
            <p style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: textColor }}>247</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-xl md:rounded-2xl p-4 md:p-6 border"
            style={{ backgroundColor: cardBg, borderColor }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
              </div>
            </div>
            <p style={{ fontSize: '11px', color: textMuted }}>Redemptions</p>
            <p style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: textColor }}>1,234</p>
          </motion.div>
        </div>

        {/* Perks List */}
        <div className="space-y-4">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl md:rounded-2xl p-4 md:p-6 border"
                style={{ backgroundColor: cardBg, borderColor }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex gap-3 md:gap-4 flex-1">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#005257] to-[#005257]/70 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 style={{ fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 600, color: textColor }}>
                          {perk.title}
                        </h3>
                        {perk.isActive && (
                          <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full whitespace-nowrap" style={{ fontSize: '10px', fontWeight: 600 }}>
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 'clamp(13px, 3vw, 14px)', color: textMuted, marginBottom: '8px' }}>
                        {perk.description}
                      </p>
                      <span style={{ fontSize: '12px', color: textMuted }}>
                        {perk.holders} holders
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 justify-end md:justify-start">
                    <Switch
                      checked={perk.isActive}
                      onCheckedChange={() => handleTogglePerk(perk.id)}
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg hover:bg-[#ea532a]/10"
                      style={{ color: textMuted }}
                    >
                      <Edit2 className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg hover:bg-red-500/10"
                      style={{ color: textMuted }}
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Add New Perk Card */}
          {!showAddPerk ? (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setShowAddPerk(true)}
              className="w-full rounded-2xl p-8 border-2 border-dashed flex flex-col items-center justify-center gap-3 hover:border-[#ea532a] transition-colors"
              style={{ borderColor, backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.02)' : 'rgba(10, 14, 26, 0.02)' }}
            >
              <Plus className="w-8 h-8" style={{ color: textMuted }} />
              <span style={{ fontSize: '16px', fontWeight: 600, color: textMuted }}>
                Add New Perk
              </span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <h3 className="mb-4" style={{ fontSize: '18px', fontWeight: 600, color: textColor }}>
                Create New Perk
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2" style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>
                    Perk Title
                  </label>
                  <input
                    type="text"
                    value={newPerkTitle}
                    onChange={(e) => setNewPerkTitle(e.target.value)}
                    placeholder="e.g. Monthly Q&A Session"
                    className="w-full px-4 py-3 rounded-xl border-2 focus:border-[#005257] focus:outline-none transition-colors"
                    style={{
                      backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.05)' : '#faf7ec',
                      borderColor,
                      color: textColor,
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <label className="block mb-2" style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>
                    Description
                  </label>
                  <textarea
                    value={newPerkDescription}
                    onChange={(e) => setNewPerkDescription(e.target.value)}
                    placeholder="Describe what holders will get..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:border-[#005257] focus:outline-none transition-colors resize-none"
                    style={{
                      backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.05)' : '#faf7ec',
                      borderColor,
                      color: textColor,
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddPerk(false)}
                    className="flex-1 px-6 py-3 rounded-xl border-2"
                    style={{ borderColor, color: textColor, fontSize: '15px', fontWeight: 600 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(234, 83, 42, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ea532a] to-orange-600 text-white"
                    style={{ fontSize: '15px', fontWeight: 600 }}
                  >
                    Create Perk
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
