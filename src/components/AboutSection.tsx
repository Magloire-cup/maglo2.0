import React from 'react';
import { Award, Zap, Shield, Leaf, HeartHandshake, Code2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const values = [
    {
      icon: <Award className="w-5 h-5 text-emerald-700" />,
      title: 'Excellence Éditoriale & Typographique',
      description: 'Nous refusons les templates préfabriqués. Chaque typographie, contraste et espacement fait l’objet d’un calibrage optique rigoureux.',
    },
    {
      icon: <Zap className="w-5 h-5 text-emerald-700" />,
      title: 'Obsession du Temps de Chargement',
      description: 'Une seconde de délai coûte 7% de conversion. Nos plateformes chargent en moins de 500 millisecondes sur tous les réseaux mondiaux.',
    },
    {
      icon: <Shield className="w-5 h-5 text-emerald-700" />,
      title: 'Indépendance & Zéro Dette Technique',
      description: 'Vous êtes 100% propriétaire de vos fichiers sources et de votre code. Pas de système fermé ni d’enfermement propriétaire.',
    },
    {
      icon: <Leaf className="w-5 h-5 text-emerald-700" />,
      title: 'Éco-conception & Sobriété Numérique',
      description: 'Architecture Jamstack statique légère qui divise l’empreinte carbone de votre site par 4 par rapport à un CMS traditionnel.',
    },
  ];

  return (
    <section id="a-propos" className="py-24 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission statement */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              Notre Manifeste
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-zinc-950 tracking-tight leading-[1.15]">
              Nous créons les plateformes web qui façonnent la réputation des leaders
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              Fondé à Paris par des designers et ingénieurs passionnés, Méridien Studio a été pensé comme une alternative aux agences traditionnelles monolithiques : une équipe resserrée d'experts seniors dédiée à l'artisanat numérique d'exception.
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Nous limitons volontairement notre volume à 12 projets majeurs par an afin de garantir à chaque dirigeant une attention exclusive et un niveau de finition irréprochable.
            </p>

            {/* Founder note */}
            <div className="pt-4 border-t border-zinc-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 text-white font-display font-bold flex items-center justify-center text-sm">
                MS
              </div>
              <div>
                <span className="font-display font-bold text-sm text-zinc-950 block">
                  Direction de la Création & Conseil
                </span>
                <span className="text-xs text-zinc-500">
                  Méridien Studio • Paris & Lyon
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 values grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#fafaf9] border border-zinc-200/90 flex flex-col justify-between shadow-2xs hover:border-zinc-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center mb-4 shadow-2xs">
                  {val.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-zinc-950 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
