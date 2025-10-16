"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Logo } from './ui/Logo';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section
      const sections = ['how-it-works', 'creators', 'fans', 'freelancers', 'resources', 'whitepaper'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['How It Works', 'Creators', 'Fans', 'Freelancers', 'Resources', 'Whitepaper'];

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-[#f9f4e1]/10 shadow-lg shadow-black/20' : 'bg-[#0a0e1a]/70 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Logo variant="white" size="lg" showText={false} />
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((item) => {
                const sectionId = item.toLowerCase().replace(/\s+/g, '-');
                const isActive = activeSection === sectionId;
                
                return (
                  <motion.a
                    key={item}
                    href={`#${sectionId}`}
                    whileHover={{ y: -2 }}
                    className={`relative transition-colors duration-300 ${
                      isActive ? 'text-[#f9f4e1]' : 'text-[#f9f4e1]/70 hover:text-[#f9f4e1]'
                    }`}
                    style={{ fontSize: '15px' }}
                  >
                    {item}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <motion.button
              onClick={() => { window.location.href = '#pwa' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden group"
              style={{ fontSize: '15px', fontWeight: 600 }}
            >
              <span className="relative z-10">Login</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                }}
              />
            </motion.button>

            <motion.button
              onClick={() => window.location.href = '#pwa'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full border border-[#f9f4e1]/20 text-[#f9f4e1]/80 hover:text-white hover:border-white/40 transition-colors"
              style={{ fontSize: '15px', fontWeight: 600 }}
            >
              Try InOrbyt
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
