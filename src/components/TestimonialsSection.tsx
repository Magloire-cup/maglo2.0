import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/siteData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Retours d'Expérience
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-zinc-950 tracking-tight mt-4 mb-4">
            Ce que disent les dirigeants qui nous ont confié leur plateforme
          </h2>
          <p className="text-base text-zinc-600">
            La satisfaction de nos partenaires repose sur une exigence inflexible : livrer à l'heure, sans compromis sur l'excellence technique.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#fafaf9] rounded-2xl p-7 border border-zinc-200/90 flex flex-col justify-between shadow-xs hover:border-zinc-300 transition-colors"
            >
              <div>
                {/* Rating stars & metric */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {t.highlightMetric && (
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                      {t.highlightMetric}
                    </span>
                  )}
                </div>

                <p className="text-sm text-zinc-700 leading-relaxed italic mb-6">
                  "{t.content}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-5 border-t border-zinc-200/80">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-zinc-300"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-sm text-zinc-950">
                      {t.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-xs text-zinc-500 block">
                    {t.role} • {t.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
