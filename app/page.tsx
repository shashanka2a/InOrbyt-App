"use client";

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

export default function HomePage() {
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


