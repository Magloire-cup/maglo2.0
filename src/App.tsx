import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { CostEstimator } from './components/CostEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');

  const handleOpenEstimator = () => {
    const el = document.getElementById('calculateur');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyEstimateToContact = (summary: string) => {
    setContactInitialMessage(summary);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-900 flex flex-col selection:bg-zinc-900 selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenEstimator={handleOpenEstimator} />

      <main className="flex-1">
        {/* 1. Hero Section with Key Metrics & Trust */}
        <Hero onOpenEstimator={handleOpenEstimator} />

        {/* 2. Core Service Pillars & Deliverables */}
        <ServicesSection />

        {/* 3. Portfolio & Case Studies with In-Depth Modals */}
        <PortfolioSection />

        {/* 4. Company Manifesto & Convictions */}
        <AboutSection />

        {/* 5. 4-Step Methodology & Guarantees */}
        <ProcessSection />

        {/* 6. Interactive Budget & Scope Estimator */}
        <CostEstimator onApplyToContact={handleApplyEstimateToContact} />

        {/* 7. Executive Client Testimonials */}
        <TestimonialsSection />

        {/* 8. Searchable FAQ Accordion */}
        <FaqSection />

        {/* 9. Contact & Brief Formulation */}
        <ContactSection initialMessage={contactInitialMessage} />
      </main>

      {/* Footer & Sitemap */}
      <Footer />
    </div>
  );
}
