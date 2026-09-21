import React, { useEffect } from 'react';
import { X, ExternalLink, TrendingUp, CheckCircle, Quote } from 'lucide-react';
import { CaseStudy } from '../types';

interface ProjectModalProps {
  project: CaseStudy | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-modal-content"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-zinc-200 focus:outline-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="modal-close-button"
          aria-label="Fermer la vue détaillée"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-zinc-700 hover:text-zinc-950 hover:bg-white flex items-center justify-center shadow-md border border-zinc-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-zinc-900">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600/90 text-white text-[11px] font-semibold tracking-wide uppercase">
                {project.category}
              </span>
              <span className="text-xs text-zinc-300 font-mono">
                {project.client} • {project.year}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Metrics highlight grid */}
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-zinc-500 block mb-3">
              Résultats mesurés post-déploiement
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.impactMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#fafaf9] border border-zinc-200/90 flex flex-col"
                >
                  <span className="font-display font-extrabold text-2xl text-emerald-700">
                    {metric.value}
                  </span>
                  <span className="text-xs text-zinc-600 font-medium mt-1">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-200/80">
            <div>
              <h3 className="text-sm font-display font-bold text-zinc-950 uppercase tracking-wider mb-2">
                Le Défi Stratégique
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-display font-bold text-zinc-950 uppercase tracking-wider mb-2">
                La Réponse Méridien
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Client Testimonial */}
          {project.testimonial && (
            <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200/90 relative">
              <Quote className="w-8 h-8 text-zinc-200 absolute top-4 right-4 pointer-events-none" />
              <p className="text-sm italic text-zinc-700 leading-relaxed mb-3 relative z-10">
                "{project.testimonial.quote}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                <span className="text-xs font-bold text-zinc-900">
                  {project.testimonial.author}
                </span>
                <span className="text-xs text-zinc-500">
                  — {project.testimonial.role}
                </span>
              </div>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-zinc-600 block mb-2">
              Technologies & Outils déployés
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-zinc-500">
              Un projet similaire en vue pour votre organisation ?
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors"
              >
                Fermer
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <span>Planifier un échange</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
