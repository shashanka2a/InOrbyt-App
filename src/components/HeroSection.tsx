"use client";

import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#005257' }}>
      {/* Enhanced animated gradient glows */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 244, 225, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 165, 0, 0.1) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
        
        {/* Additional floating orbs */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-lora text-[#f9f4e1] mb-6 leading-[1.15] relative"
          style={{ 
            fontSize: '56px', 
            fontWeight: 700,
            textShadow: '0 0 40px rgba(249, 244, 225, 0.3)'
          }}
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Launch your own creator token
          </motion.span>
          <br />
          <motion.span
            className="inline-block bg-gradient-to-r from-[#f9f4e1] via-orange-200 to-[#f9f4e1] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              backgroundSize: '200% auto',
            }}
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% center', '200% center', '0% center'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #f9f4e1, #ffd7a8, #f9f4e1)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundSize: '200% auto',
              }}
            >
              and grow with your community.
            </motion.span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-dm-sans text-[#f9f4e1]/80 mb-12 max-w-3xl mx-auto"
          style={{ fontSize: '22px' }}
        >
          Every creator and fan gets a built-in wallet — no crypto setup needed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <motion.a
            href="https://forms.inorbyt.io/hello"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(249, 115, 22, 0.4), 0 0 60px rgba(249, 115, 22, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden group shadow-xl shadow-orange-500/30"
            style={{ fontSize: '18px', fontWeight: 600 }}
          >
            <motion.span className="relative z-10 flex items-center gap-2">
              Join Early Access
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 -translate-x-full"
              animate={{ translateX: ['100%', '-100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                width: '50%'
              }}
            />
          </motion.a>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(249, 244, 225, 0.1)',
              borderColor: 'rgba(249, 244, 225, 1)'
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full border-2 border-[#f9f4e1]/50 text-[#f9f4e1] transition-all duration-300 backdrop-blur-sm"
            style={{ fontSize: '18px', fontWeight: 600 }}
          >
            View Demo
          </motion.button>
        </motion.div>

        {/* Stats preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-20 flex items-center justify-center gap-12 flex-wrap"
        >
          {[
            { value: '10K+', label: 'Creators' },
            { value: '500K+', label: 'Community Members' },
            { value: '$50M+', label: 'Volume Traded' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + idx * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-[#f9f4e1] mb-1" style={{ fontSize: '32px', fontWeight: 700 }}>
                {stat.value}
              </div>
              <div className="text-[#f9f4e1]/60" style={{ fontSize: '14px' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#f9f4e1]/60"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
