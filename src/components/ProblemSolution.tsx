"use client";

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Users, Wallet, DollarSign, Shield, TrendingUp } from 'lucide-react';

const creatorPoints = [
  { icon: DollarSign, title: 'Limited Revenue Streams', solution: 'Launch your own tradeable token with built-in rewards' },
  { icon: Users, title: 'Superfans Want More', solution: 'Offer exclusive perks and direct access to your biggest supporters' },
  { icon: Shield, title: 'Platform Dependency', solution: 'Own your economy — independent of any social platform' },
];

const fanPoints = [
  { icon: TrendingUp, title: 'No Way to Invest in Creators', solution: 'Buy creator tokens early and grow as they grow' },
  { icon: Wallet, title: 'Crypto is Complicated', solution: 'Built-in wallet — buy with card, no crypto knowledge needed' },
  { icon: Zap, title: 'One-Way Relationship', solution: 'Get real perks, access, and upside for supporting creators' },
];

export function ProblemSolution() {
  const [activeTab, setActiveTab] = useState<'creators' | 'fans'>('creators');

  // Listen for hash changes to set the active tab
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'creators' || hash === 'fans') {
        setActiveTab(hash);
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activePoints = activeTab === 'creators' ? creatorPoints : fanPoints;

  return (
    <section id="creators" className="py-24 px-6 bg-[#0a0e1a] scroll-mt-20">
      <span id="fans" className="absolute -mt-20" />
      <div className="max-w-7xl mx-auto">
        {/* Centered Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-lora text-[#f9f4e1] leading-[1.15]" style={{ fontSize: '48px', fontWeight: 700 }}>
            Why creators and fans need something new
          </h2>
        </motion.div>

        {/* Centered Tabs and Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tab buttons */}
          <div className="flex gap-4 mb-8 justify-center">
            <button
              onClick={() => {
                setActiveTab('creators');
                window.history.pushState(null, '', '#creators');
              }}
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === 'creators'
                  ? 'bg-[#f9f4e1] text-[#0a0e1a]'
                  : 'bg-[#151922] text-[#f9f4e1]/60 hover:text-[#f9f4e1]'
              }`}
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              Creators
            </button>
            <button
              onClick={() => {
                setActiveTab('fans');
                window.history.pushState(null, '', '#fans');
              }}
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === 'fans'
                  ? 'bg-[#f9f4e1] text-[#0a0e1a]'
                  : 'bg-[#151922] text-[#f9f4e1]/60 hover:text-[#f9f4e1]'
              }`}
              style={{ fontSize: '16px', fontWeight: 600 }}
            >
              Fans
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activePoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-[#151922] p-6 rounded-xl border border-[#f9f4e1]/10 hover:border-[#f9f4e1]/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-500/10 rounded-lg">
                      <Icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#f9f4e1] mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>
                        {point.title}
                      </h3>
                      <p className="text-[#f9f4e1]/70" style={{ fontSize: '15px' }}>
                        {point.solution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
