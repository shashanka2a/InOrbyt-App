import { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, Copy, Check, ExternalLink } from 'lucide-react';
import type { UserData } from './PWAContainer';

interface WalletScreenProps {
  userData: UserData;
  darkMode: boolean;
}

export function WalletScreen({ userData, darkMode }: WalletScreenProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const bgColor = darkMode ? '#0a0e1a' : '#faf7ec';
  const cardBg = darkMode ? '#151922' : '#ffffff';
  const textColor = darkMode ? '#f9f4e1' : '#0a0e1a';
  const textMuted = darkMode ? 'rgba(249, 244, 225, 0.6)' : 'rgba(10, 14, 26, 0.6)';
  const borderColor = darkMode ? 'rgba(249, 244, 225, 0.1)' : 'rgba(10, 14, 26, 0.1)';

  // Mock wallet address
  const walletAddress = '0x742d...9a3f';
  const fullAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595b9a3f';

  // Calculate mock balance
  const totalSupply = userData.totalSupply ? Number(userData.totalSupply) : 1000000;
  const startingPrice = userData.startingPrice ? Number(userData.startingPrice) : 0.10;
  const currentPrice = (startingPrice * 1.2).toFixed(2);
  const totalBalance = (totalSupply * Number(currentPrice) * 0.3).toFixed(0);
  const availableBalance = (Number(totalBalance) * 0.86).toFixed(0);
  const pendingBalance = (Number(totalBalance) * 0.14).toFixed(0);

  const transactions = [
    {
      type: 'received',
      description: 'Token Sale',
      amount: '+$1,250',
      from: 'Alex Chen',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      type: 'received',
      description: 'Token Sale',
      amount: '+$850',
      from: 'Maria Garcia',
      time: '5 hours ago',
      status: 'completed'
    },
    {
      type: 'withdraw',
      description: 'Withdrawal to Bank',
      amount: '-$2,000',
      from: 'Bank Account •••• 4532',
      time: '1 day ago',
      status: 'completed'
    },
    {
      type: 'received',
      description: 'Token Sale',
      amount: '+$2,100',
      from: 'James Wilson',
      time: '2 days ago',
      status: 'completed'
    },
    {
      type: 'received',
      description: 'Token Sale',
      amount: '+$650',
      from: 'Sophie Turner',
      time: '3 days ago',
      status: 'completed'
    },
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="font-lora mb-2" style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: textColor }}>
            Wallet
          </h1>
          <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: textMuted }}>
            Manage your earnings and track transactions
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <motion.div
            whileHover={{ y: -4 }}
            className="md:col-span-2 rounded-2xl md:rounded-3xl p-6 md:p-8 border relative overflow-hidden"
            style={{ backgroundColor: cardBg, borderColor }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-[#ea532a]/10 to-transparent rounded-full -translate-y-24 md:-translate-y-32 translate-x-24 md:translate-x-32" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#ea532a] to-orange-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p style={{ fontSize: '12px', color: textMuted }}>
                      {userData.connectedWallet || 'InOrbyt Wallet'}
                    </p>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600, color: textColor }} className="truncate">
                        {walletAddress}
                      </span>
                      <button
                        onClick={handleCopyAddress}
                        className="p-1 hover:bg-[#ea532a]/10 rounded transition-colors flex-shrink-0"
                      >
                        {copiedAddress ? (
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3 md:w-4 md:h-4" style={{ color: textMuted }} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-[#ea532a]/10 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5" style={{ color: textMuted }} />
                </button>
              </div>

              <div className="mb-6">
                <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: textMuted, marginBottom: '8px' }}>
                  Total Balance
                </p>
                <p className="font-lora" style={{ fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 700, color: textColor }}>
                  ${Number(totalBalance).toLocaleString()}
                </p>
                <span className="text-green-500" style={{ fontSize: 'clamp(13px, 3vw, 16px)', fontWeight: 600 }}>
                  +15.3% this week
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl bg-gradient-to-r from-[#ea532a] to-orange-600 text-white flex items-center justify-center gap-2"
                  style={{ fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 600 }}
                >
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                  Withdraw
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl border-2 flex items-center justify-center gap-2"
                  style={{ borderColor, color: textColor, fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 600 }}
                >
                  <ArrowDownLeft className="w-4 h-4 md:w-5 md:h-5" />
                  Deposit
                </motion.button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-xl md:rounded-2xl p-4 md:p-6 border"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <p style={{ fontSize: '12px', color: textMuted, marginBottom: '8px' }}>
                Available
              </p>
              <p style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 700, color: textColor }}>
                ${Number(availableBalance).toLocaleString()}
              </p>
              <p style={{ fontSize: '11px', color: textMuted, marginTop: '4px' }}>
                Ready to withdraw
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-xl md:rounded-2xl p-4 md:p-6 border"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <p style={{ fontSize: '12px', color: textMuted, marginBottom: '8px' }}>
                Pending
              </p>
              <p style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 700, color: textColor }}>
                ${Number(pendingBalance).toLocaleString()}
              </p>
              <p style={{ fontSize: '11px', color: textMuted, marginTop: '4px' }}>
                Processing
              </p>
            </motion.div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="rounded-2xl md:rounded-3xl p-4 md:p-6 border" style={{ backgroundColor: cardBg, borderColor }}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 600, color: textColor }}>
              Recent Transactions
            </h2>
            <button className="text-[#ea532a]" style={{ fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 600 }}>
              View All
            </button>
          </div>

          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-opacity-50 transition-all"
                style={{ backgroundColor: darkMode ? 'rgba(249, 244, 225, 0.03)' : 'rgba(10, 14, 26, 0.03)' }}
              >
                <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      tx.type === 'received'
                        ? 'bg-green-500/10'
                        : 'bg-blue-500/10'
                    }`}
                  >
                    {tx.type === 'received' ? (
                      <ArrowDownLeft className={`w-4 h-4 md:w-5 md:h-5 text-green-500`} />
                    ) : (
                      <ArrowUpRight className={`w-4 h-4 md:w-5 md:h-5 text-blue-500`} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p style={{ fontSize: 'clamp(13px, 3vw, 15px)', fontWeight: 600, color: textColor }} className="truncate">
                      {tx.description}
                    </p>
                    <p style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: textMuted }} className="truncate">
                      {tx.from}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p
                    style={{
                      fontSize: 'clamp(14px, 3vw, 16px)',
                      fontWeight: 600,
                      color: tx.type === 'received' ? '#10b981' : textColor
                    }}
                  >
                    {tx.amount}
                  </p>
                  <p style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', color: textMuted }}>
                    {tx.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
