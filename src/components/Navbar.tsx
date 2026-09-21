import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Expertises', href: '#services' },
    { label: 'Réalisations', href: '#realisations' },
    { label: 'Méthodologie', href: '#methode' },
    { label: 'Simulateur', href: '#calculateur' },
    { label: 'Questions fréquentes', href: '#faq' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fafaf9]/90 backdrop-blur-md border-b border-zinc-200/80 shadow-xs py-3.5'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            id="nav-logo"
            className="group flex items-center gap-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-md"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm tracking-wider group-hover:bg-zinc-800 transition-colors shadow-xs">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-zinc-900 flex items-center gap-1.5">
                MÉRIDIEN
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium -mt-0.5">
                Studio & Conseil
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-zinc-900 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenEstimator}
              id="nav-btn-estimate"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 transition-colors border border-zinc-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Estimer un projet</span>
            </button>

            <a
              href="#contact"
              id="nav-btn-contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg text-white bg-zinc-900 hover:bg-zinc-800 transition-colors shadow-xs"
            >
              <span>Prendre contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            aria-label="Ouvrir le menu de navigation"
            className="lg:hidden p-2 rounded-lg text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="lg:hidden bg-[#fafaf9] border-b border-zinc-200 px-6 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-zinc-700 hover:text-zinc-950 py-2 border-b border-zinc-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-zinc-100 border border-zinc-200 text-sm font-semibold text-zinc-800"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Estimer le budget de votre projet
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-zinc-900 text-sm font-semibold text-white shadow-xs"
            >
              Prendre contact
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
