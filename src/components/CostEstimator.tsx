import React, { useState, useId } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, RefreshCw, ShieldCheck } from 'lucide-react';

interface CostEstimatorProps {
  onApplyToContact: (summary: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onApplyToContact }) => {
  const projectTypeGroupId = useId();
  const timelineGroupId = useId();

  // Project Types
  const projectTypes = [
    {
      id: 'vitrine',
      title: 'Site Vitrine & Image de Marque',
      desc: 'Idéal pour cabinets, agences et entreprises souhaitant une présence irréprochable.',
      baseMin: 4500,
      baseMax: 7000,
      weeks: '4 à 6 sem.',
    },
    {
      id: 'saas',
      title: 'Application Web SaaS / Métier',
      desc: 'Interface applicative réactive avec dashboards, gestion de données et rôles.',
      baseMin: 9500,
      baseMax: 16000,
      weeks: '6 à 10 sem.',
    },
    {
      id: 'ecommerce',
      title: 'Plateforme E-Commerce Headless',
      desc: 'Boutique ultra-rapide sur-mesure pour marques haut de gamme et DNVB.',
      baseMin: 8500,
      baseMax: 14500,
      weeks: '6 à 9 sem.',
    },
    {
      id: 'audit',
      title: 'Audit UX & Optimisation CRO',
      desc: 'Diagnostic approfondi, refonte ciblée et accélération des conversions.',
      baseMin: 3200,
      baseMax: 5500,
      weeks: '2 à 4 sem.',
    },
  ];

  // Options
  const featureOptions = [
    { id: 'design_system', label: 'Design System Figma complet & composants', price: 1400 },
    { id: 'multilingual', label: 'Architecture multilingue & SEO international', price: 1200 },
    { id: 'api_integration', label: 'Connexion APIs tierces (CRM, Stripe, ERP)', price: 1600 },
    { id: 'interactive_tool', label: 'Simulateur ou calculateur sur-mesure', price: 1300 },
    { id: 'wcag_audit', label: 'Garantie Performance 98+ & WCAG 2.1 AA', price: 950 },
  ];

  // Timelines
  const timelines = [
    { id: 'standard', label: 'Délai standard recommandé', multiplier: 1.0, note: 'Rythme optimal' },
    { id: 'urgent', label: 'Planning accéléré (< 4 semaines)', multiplier: 1.25, note: '+25% mobilisation prioritaire' },
    { id: 'flexible', label: 'Phasage progressif sur plusieurs mois', multiplier: 1.05, note: 'Étalé dans le temps' },
  ];

  const [selectedType, setSelectedType] = useState(projectTypes[0].id);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'design_system',
    'wcag_audit',
  ]);
  const [selectedTimeline, setSelectedTimeline] = useState('standard');

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const currentType = projectTypes.find((p) => p.id === selectedType) || projectTypes[0];
  const currentTimeline = timelines.find((t) => t.id === selectedTimeline) || timelines[0];

  const featuresTotal = selectedFeatures.reduce((acc, featId) => {
    const feat = featureOptions.find((f) => f.id === featId);
    return acc + (feat ? feat.price : 0);
  }, 0);

  const minTotal = Math.round((currentType.baseMin + featuresTotal) * currentTimeline.multiplier);
  const maxTotal = Math.round((currentType.baseMax + featuresTotal) * currentTimeline.multiplier);

  const handleTransferToContact = () => {
    const activeFeatsNames = selectedFeatures
      .map((fId) => featureOptions.find((f) => f.id === fId)?.label)
      .filter(Boolean)
      .join(', ');

    const summaryText = `Simulation Méridien Studio :\n- Type de projet : ${currentType.title}\n- Modules choisis : ${activeFeatsNames || 'Aucun module additionnel'}\n- Rythme : ${currentTimeline.label}\n- Budget estimatif : entre ${minTotal.toLocaleString('fr-FR')} € et ${maxTotal.toLocaleString('fr-FR')} € HT.`;

    onApplyToContact(summaryText);
  };

  return (
    <section id="calculateur" className="py-24 bg-[#fafaf9] border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Transparence Tarifaire
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-zinc-950 tracking-tight mt-4 mb-4">
            Simulateur d'estimation de projet
          </h2>
          <p className="text-base text-zinc-600">
            Configurez vos besoins en toute autonomie pour obtenir un ordre de grandeur budgétaire réaliste et immédiat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Configuration Form (8 Cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/90 shadow-xs space-y-8">
            {/* Step 1: Type of project */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span id={projectTypeGroupId} className="text-xs uppercase tracking-wider font-bold text-zinc-500">
                  1. Nature de votre initiative
                </span>
                <span className="text-xs text-zinc-400 font-mono">1/3</span>
              </div>

              <div role="radiogroup" aria-labelledby={projectTypeGroupId} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => {
                  const isChecked = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      role="radio"
                      aria-checked={isChecked}
                      onClick={() => setSelectedType(type.id)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        isChecked
                          ? 'border-zinc-950 bg-zinc-950 text-white shadow-sm ring-1 ring-zinc-950'
                          : 'border-zinc-200 hover:border-zinc-300 bg-[#fafaf9] text-zinc-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-display font-bold text-sm">
                          {type.title}
                        </span>
                        {isChecked && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <p
                        className={`text-xs line-clamp-2 ${
                          isChecked ? 'text-zinc-300' : 'text-zinc-500'
                        }`}
                      >
                        {type.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Features & Scope */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-zinc-500">
                  2. Modules & Exigences clés
                </span>
                <span className="text-xs text-zinc-400 font-mono">2/3</span>
              </div>

              <div className="space-y-2.5">
                {featureOptions.map((feat) => {
                  const isSelected = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-emerald-50/70 border-emerald-300 text-zinc-950'
                          : 'bg-white border-zinc-200/80 hover:bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'bg-emerald-700 border-emerald-700 text-white'
                              : 'border-zinc-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">
                          {feat.label}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-zinc-500 shrink-0 ml-2">
                        +{feat.price.toLocaleString('fr-FR')} €
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Timelines */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span id={timelineGroupId} className="text-xs uppercase tracking-wider font-bold text-zinc-500">
                  3. Rythme & Échéance souhaitée
                </span>
                <span className="text-xs text-zinc-400 font-mono">3/3</span>
              </div>

              <div role="radiogroup" aria-labelledby={timelineGroupId} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {timelines.map((tl) => {
                  const isChecked = selectedTimeline === tl.id;
                  return (
                    <button
                      key={tl.id}
                      type="button"
                      role="radio"
                      aria-checked={isChecked}
                      onClick={() => setSelectedTimeline(tl.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        isChecked
                          ? 'border-zinc-900 bg-zinc-900 text-white'
                          : 'border-zinc-200 hover:border-zinc-300 bg-white text-zinc-900'
                      }`}
                    >
                      <span className="block text-xs font-bold mb-1">{tl.label}</span>
                      <span
                        className={`text-[11px] block ${
                          isChecked ? 'text-zinc-300' : 'text-zinc-500'
                        }`}
                      >
                        {tl.note}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Estimation Result Summary (4 Cols) */}
          <div className="lg:col-span-4 bg-zinc-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl lg:sticky lg:top-28">
            <div className="flex items-center gap-2 mb-4 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Synthèse de l'estimation</span>
            </div>

            <div className="mb-6 pb-6 border-b border-zinc-800">
              <span className="text-xs text-zinc-400 block mb-1">
                Fourchette budgétaire estimée (HT)
              </span>
              <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                {minTotal.toLocaleString('fr-FR')} € — {maxTotal.toLocaleString('fr-FR')} €
              </div>
              <span className="text-[11px] text-zinc-400 block mt-1.5">
                *Forfait clé en main comprenant design, développement et garantie 30j.
              </span>
            </div>

            <div className="space-y-3 mb-8 text-xs text-zinc-300">
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Durée prévisionnelle :</span>
                <span className="font-bold text-white">{currentType.weeks}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Modules inclus :</span>
                <span className="font-bold text-white">
                  {selectedFeatures.length} sélectionnés
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Propriété du code :</span>
                <span className="font-bold text-emerald-400">100% Cédé</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleTransferToContact}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <span>Valider ce devis estimatif</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-zinc-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Sans engagement • Réponse garantie sous 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
