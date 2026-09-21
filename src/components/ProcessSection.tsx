import React from 'react';
import { Calendar, CheckCircle2, ListChecks, Sparkles } from 'lucide-react';
import { PROCESS_STEPS } from '../data/siteData';

export const ProcessSection: React.FC = () => {
  return (
    <section id="methode" className="py-24 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Méthodologie Éprouvée
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-zinc-950 tracking-tight mt-4 mb-4">
            Un processus transparent, rythmé et sans mauvaise surprise
          </h2>
          <p className="text-base text-zinc-600">
            Finis les projets interminables qui dérivent. Nous appliquons des cycles courts, des démos hebdomadaires et des livrables exploitables dès le premier sprint.
          </p>
        </div>

        {/* Process Step Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              id={`process-step-${step.step}`}
              className="relative bg-[#fafaf9] rounded-2xl p-6 sm:p-7 border border-zinc-200/90 flex flex-col justify-between hover:border-zinc-300 transition-colors shadow-xs"
            >
              <div>
                {/* Top Step Number and Duration */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-2xl sm:text-3xl text-zinc-300">
                    {step.step}
                  </span>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    <span>{step.duration}</span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-zinc-950 mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Key Deliverables */}
              <div className="pt-4 border-t border-zinc-200/80">
                <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 block mb-2.5">
                  Livrables concrets
                </span>
                <ul className="space-y-2">
                  {step.deliverables.map((item, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-xs text-zinc-700 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Engagement Guarantees */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-zinc-200">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0 text-sm font-bold">
              1
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-zinc-950">
                Transparence tarifaire absolue
              </h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Forfait fixe validé en amont. Aucun dépassement de budget non consenti.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0 text-sm font-bold">
              2
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-zinc-950">
                Interlocuteurs seniors dédiés
              </h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Vous collaborez directement avec les concepteurs et développeurs de votre solution.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0 text-sm font-bold">
              3
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-zinc-950">
                Garantie de livraison 30 jours
              </h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Support technique, ajustements de mise en ligne et assistance immédiate inclus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
