import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProblemSolution } from './components/ProblemSolution';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesCards } from './components/FeaturesCards';
import { TokensShowcase } from './components/TokensShowcase';
import { Testimonials } from './components/Testimonials';
import { Resources } from './components/Resources';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { PWAContainer } from './components/pwa/PWAContainer';

export default function App() {
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
  );
}
