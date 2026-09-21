import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { CLIENT_LOGOS, COMPANY_KEY_METRICS } from '../data/siteData';

interface HeroProps {
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimator }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle geometric structural grid lines in background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top status indicator badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>Studio ouvert • Nouveaux projets T2/T3</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>Excellence technique & Design de pointe</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-zinc-950 tracking-tight leading-[1.08] mb-6">
            L’élégance du design.{' '}
            <span className="text-zinc-500 font-medium block sm:inline">
              La rigueur de l’ingénierie.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-2xl font-normal mb-10">
            Méridien conçoit des plateformes web sur-mesure, des identités de marque remarquables et des écosystèmes digitaux performants pour les entreprises exigeantes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
            <a
              href="#contact"
              id="hero-cta-contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-zinc-950 hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            >
              <span>Discuter de votre projet</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenEstimator}
              id="hero-cta-estimator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-zinc-800 bg-white hover:bg-zinc-50 transition-all border border-zinc-200/90 shadow-xs focus:ring-2 focus:ring-zinc-300"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Simulateur d’estimation rapide</span>
            </button>

            <a
              href="#realisations"
              className="inline-flex items-center justify-center text-sm font-semibold text-zinc-600 hover:text-zinc-950 py-2 sm:px-3 transition-colors"
            >
              Voir les réalisations ↓
            </a>
          </div>
        </div>

        {/* Key Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-zinc-200/90 mb-16">
          {COMPANY_KEY_METRICS.map((metric, idx) => (
            <div key={idx} className="flex flex-col p-4 rounded-xl bg-white/60 border border-zinc-200/60">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Client references marquee/grid */}
        <div className="pt-2">
          <p className="text-xs uppercase tracking-widest text-zinc-600 font-semibold mb-4">
            Ils nous font confiance pour leurs défis numériques
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {CLIENT_LOGOS.map((client, idx) => (
              <div
                key={idx}
                className="py-3 px-4 rounded-lg bg-white/80 border border-zinc-200/80 flex flex-col items-center justify-center text-center transition-all hover:border-zinc-300 hover:bg-white"
              >
                <span className="font-display font-bold text-xs sm:text-sm text-zinc-800 tracking-tight">
                  {client.name}
                </span>
                <span className="text-[10px] text-zinc-600 font-medium mt-0.5">
                  {client.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
