import React, { useState } from 'react';
import { Compass, Layout, CodeXml, TrendingUp, Check, ArrowRight, Clock, Layers } from 'lucide-react';
import { SERVICES_DATA } from '../data/siteData';
import { ServiceItem } from '../types';

export const ServicesSection: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      case 'CodeXml':
        return <CodeXml className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const activeService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  return (
    <section id="services" className="py-24 bg-white border-y border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Nos Domaines d'Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-zinc-950 tracking-tight mt-4 mb-5">
            Une approche transversale de l'amont stratégique au code de production
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Nous refusons le cloisonnement entre le design et la technique. Chaque interface est conçue avec une conscience aiguë des contraintes techniques, et chaque ligne de code sert fidèlement l'expérience de marque.
          </p>
        </div>

        {/* Services Grid & Interactive Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Service Selector Cards (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {SERVICES_DATA.map((service) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  id={`service-tab-${service.id}`}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-zinc-950 text-white border-zinc-900 shadow-md translate-x-1'
                      : 'bg-zinc-50/70 hover:bg-zinc-100 text-zinc-900 border-zinc-200/90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-600'
                      }`}
                    >
                      {service.number}
                    </span>
                    <span
                      className={`p-1.5 rounded-lg ${
                        isSelected ? 'bg-zinc-800 text-emerald-400' : 'bg-white text-zinc-700 shadow-xs'
                      }`}
                    >
                      {getIcon(service.iconName)}
                    </span>
                  </div>

                  <h3 className={`font-display font-bold text-lg mb-1 ${isSelected ? 'text-white' : 'text-zinc-950'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs sm:text-sm line-clamp-2 ${isSelected ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {service.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Service Detailed View (Right 7 Cols) */}
          <div
            id="service-detail-card"
            className="lg:col-span-7 bg-[#fafaf9] rounded-2xl border border-zinc-200/90 p-6 sm:p-8 lg:p-10 shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-emerald-400 flex items-center justify-center">
                  {getIcon(activeService.iconName)}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    Expertise {activeService.number}
                  </span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-zinc-950">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 bg-white px-3 py-1.5 rounded-lg border border-zinc-200">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Délai moyen : {activeService.duration}</span>
              </div>
            </div>

            <p className="text-base text-zinc-700 leading-relaxed mb-8">
              {activeService.description}
            </p>

            {/* Deliverables checklist */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-600 mb-4">
                Livrables concrets inclus dans la mission
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeService.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-zinc-200/80 text-xs sm:text-sm text-zinc-800"
                  >
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack / Tools */}
            <div className="pt-6 border-t border-zinc-200/90 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-zinc-600 block mb-2">
                  Méthodologies & Outils clés
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeService.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-zinc-200/80 text-zinc-800 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 hover:text-emerald-700 transition-colors"
              >
                <span>Solliciter cette expertise</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
