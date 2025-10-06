"use client";

import { useState, useEffect } from 'react';
import { Navigation } from '../src/components/Navigation';
import { HeroSection } from '../src/components/HeroSection';
import { ProblemSolution } from '../src/components/ProblemSolution';
import { HowItWorks } from '../src/components/HowItWorks';
import { FeaturesCards } from '../src/components/FeaturesCards';
import { TokensShowcase } from '../src/components/TokensShowcase';
import { Testimonials } from '../src/components/Testimonials';
import { Resources } from '../src/components/Resources';
import { Footer } from '../src/components/Footer';
import { ScrollToTop } from '../src/components/ScrollToTop';
import { Toaster } from '../src/components/ui/sonner';
import { PWAContainer } from '../src/components/pwa/PWAContainer';

export default function HomePage() {
  const [showPWA, setShowPWA] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setShowPWA(window.location.hash === '#pwa');
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (showPWA) {
    return (
      <>
        <PWAContainer />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] relative">
      <Navigation />
      <HeroSection />
      <ProblemSolution />
      <HowItWorks />
      <FeaturesCards />
      <TokensShowcase />
      <Testimonials />
      <Resources />
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  )
}


