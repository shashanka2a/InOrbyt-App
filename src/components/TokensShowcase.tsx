"use client";

import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { TrendingUp, Users, Sparkles } from 'lucide-react';

const tokens = [
  {
    name: 'SIMBA',
    symbol: '$SIMBA',
    creator: '@wildlifewonders',
    price: 2.45,
    change: '+12.5%',
    holders: '1.2K',
    perks: ['Early video access', 'Monthly Q&A', 'Photo pack'],
    color: 'from-orange-500/30 to-red-600/30'
  },
  {
    name: 'LUNA',
    symbol: '$LUNA',
    creator: '@musicbyluna',
    price: 5.80,
    change: '+24.3%',
    holders: '3.5K',
    perks: ['Unreleased tracks', 'Concert tickets', 'Discord access'],
    color: 'from-purple-500/30 to-pink-600/30'
  },
  {
    name: 'ATLAS',
    symbol: '$ATLAS',
    creator: '@travelatlas',
    price: 1.20,
    change: '+8.7%',
    holders: '890',
    perks: ['Travel guides', 'Photo presets', 'Trip planning'],
    color: 'from-blue-500/30 to-cyan-600/30'
  },
];

function TokenCard({ token, index }: { token: typeof tokens[0], index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [animatedPrice, setAnimatedPrice] = useState(token.price);

  // Animated price ticker
  useEffect(() => {
    if (!isHovered) return;
    
    const interval = setInterval(() => {
      const variance = (Math.random() - 0.5) * 0.1;
      setAnimatedPrice(prev => Math.max(0.1, prev + variance));
    }, 1000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setAnimatedPrice(token.price);
      }}
      whileHover={{ 
        y: -8,
        rotateX: mousePosition.y * 0.05,
        rotateY: mousePosition.x * 0.05,
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className="relative bg-gradient-to-br from-[#151922] to-[#0f1218] p-6 rounded-2xl border border-[#f9f4e1]/10 hover:border-orange-500/50 transition-all duration-500 overflow-hidden group cursor-pointer"
    >
      {/* Preview label */}
      <motion.div 
        className="absolute top-4 right-4 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-orange-500" style={{ fontSize: '12px', fontWeight: 600 }}>
          Preview Only
        </span>
      </motion.div>

      {/* Animated gradient glow on edges */}
      <motion.div 
        className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        animate={{
          backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%'
        }}
        transition={{
          duration: 3,
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          backgroundSize: '200% 100%'
        }}
      />

      <div className="relative z-10">
        {/* Token symbol with animated background */}
        <motion.div 
          className={`w-14 h-14 bg-gradient-to-br ${token.color} rounded-xl flex items-center justify-center mb-4 border border-orange-500/20 relative overflow-hidden`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-orange-500 relative z-10" style={{ fontSize: '20px', fontWeight: 700 }}>
            {token.symbol.slice(1, 3)}
          </span>
        </motion.div>

        <h3 className="text-[#f9f4e1] mb-1" style={{ fontSize: '24px', fontWeight: 700 }}>
          {token.symbol}
        </h3>
        <p className="text-[#f9f4e1]/60 mb-4" style={{ fontSize: '14px' }}>
          by {token.creator}
        </p>

        {/* Price and stats with live animation */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#f9f4e1]/10">
          <div>
            <motion.div 
              className="text-[#f9f4e1] tabular-nums"
              style={{ fontSize: '28px', fontWeight: 700 }}
              key={animatedPrice}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
            >
              ${animatedPrice.toFixed(2)}
            </motion.div>
            <motion.div 
              className="flex items-center gap-1 text-green-500" 
              style={{ fontSize: '13px' }}
              animate={{ 
                scale: isHovered ? [1, 1.1, 1] : 1 
              }}
              transition={{ 
                duration: 0.5,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 1
              }}
            >
              <TrendingUp className="w-3 h-3" />
              {token.change}
            </motion.div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[#f9f4e1]/60" style={{ fontSize: '13px' }}>
              <Users className="w-4 h-4" />
              {token.holders}
            </div>
            <div className="text-[#f9f4e1]/40" style={{ fontSize: '12px' }}>
              holders
            </div>
          </div>
        </div>

        {/* Perks */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
            </motion.div>
            <span className="text-[#f9f4e1]/80" style={{ fontSize: '14px', fontWeight: 600 }}>
              Token Perks
            </span>
          </div>
          <ul className="space-y-2">
            {token.perks.map((perk, idx) => (
              <motion.li 
                key={idx} 
                className="text-[#f9f4e1]/60 pl-4 border-l-2 border-orange-500/30 hover:border-orange-500/60 hover:text-[#f9f4e1]/80 transition-all duration-300" 
                style={{ fontSize: '13px' }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + idx * 0.1 }}
                whileHover={{ x: 4 }}
              >
                {perk}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hover spotlight effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x + 200}px ${mousePosition.y + 200}px, rgba(249, 115, 22, 0.1), transparent 40%)`
        }}
      />
    </motion.div>
  );
}

export function TokensShowcase() {
  return (
    <section className="py-24 px-6 bg-[#0d1520] relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-lora text-[#f9f4e1] mb-4 inline-block" 
            style={{ fontSize: '48px', fontWeight: 700 }}
            whileInView={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            viewport={{ once: true }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Discover Tokens
          </motion.h2>
          <p className="text-[#f9f4e1]/70 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
            Explore creator tokens from early adopters
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tokens.map((token, index) => (
            <TokenCard key={index} token={token} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
