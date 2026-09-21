import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { CASE_STUDIES } from '../data/siteData';
import { CaseStudy } from '../types';
import { ProjectModal } from './ProjectModal';

export const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [activeModalProject, setActiveModalProject] = useState<CaseStudy | null>(null);

  const categories = ['Tous', 'FinTech & SaaS', 'E-Commerce & Luxe', 'Santé & Impact', 'B2B & Industrie'];

  const filteredProjects =
    selectedCategory === 'Tous'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((p) => p.category === selectedCategory);

  return (
    <section id="realisations" className="py-24 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              Études de Cas & Réalisations
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-zinc-950 tracking-tight mt-4 mb-3">
              Des projets d'envergure menés avec précision chirurgicale
            </h2>
            <p className="text-base text-zinc-600">
              Chaque réalisation incarne un équilibre minutieux entre identité esthétique singulière et retour sur investissement tangible.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-white text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`case-study-card-${project.id}`}
              className="group bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => setActiveModalProject(project)}
            >
              {/* Card Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-100">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-zinc-900 text-xs font-semibold shadow-xs">
                    {project.category}
                  </span>
                </div>

                {/* Primary Metric Badge */}
                <div className="absolute bottom-4 right-4 bg-zinc-950/90 backdrop-blur-xs text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <span className="text-emerald-400 font-bold">
                    {project.impactMetrics[0].value}
                  </span>
                  <span className="text-zinc-300 text-[11px]">
                    {project.impactMetrics[0].label}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-600 font-medium mb-2">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-zinc-950 mb-3 group-hover:text-emerald-800 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2 mb-6">
                    {project.summary}
                  </p>
                </div>

                {/* Bottom Card Bar */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-950 group-hover:translate-x-0.5 transition-transform">
                    <span>Consulter l'étude</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with reassurance */}
        <div className="mt-16 p-8 rounded-2xl bg-zinc-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h4 className="font-display font-bold text-xl text-white mb-2">
              Vous avez un enjeu similaire à relever ?
            </h4>
            <p className="text-sm text-zinc-400">
              Nous analysons gratuitement votre écosystème web actuel sous 48h et vous remettons 3 axes d'amélioration prioritaires.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 text-xs sm:text-sm font-bold transition-colors shadow-xs"
          >
            Demander un pré-audit confidentiel
          </a>
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
