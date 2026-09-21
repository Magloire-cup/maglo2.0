import React, { useState } from 'react';
import { ArrowUp, Check, Mail, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-20 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-zinc-800">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white text-zinc-950 flex items-center justify-center font-bold text-sm">
                M
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                MÉRIDIEN STUDIO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Cabinet de conseil stratégique, direction artistique et ingénierie de plateformes web d'exception. Conception et déploiement en France et en Europe.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-zinc-400">
              <span>Paris • Lyon • Genève</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Serveurs 100% verts
              </span>
            </div>
          </div>

          {/* Nav column 1 */}
          <div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-zinc-200 block mb-4">
              Expertises
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Stratégie de Marque
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Product Design & UI/UX
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Ingénierie Web Jamstack
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Optimisation CRO & SEO
                </a>
              </li>
              <li>
                <a href="#calculateur" className="hover:text-emerald-400 transition-colors">
                  Simulateur de Devis
                </a>
              </li>
            </ul>
          </div>

          {/* Nav column 2 */}
          <div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-zinc-200 block mb-4">
              Études de Cas
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#realisations" className="hover:text-white transition-colors">
                  Aurora Private Wealth
                </a>
              </li>
              <li>
                <a href="#realisations" className="hover:text-white transition-colors">
                  Maison Vernier Horlogerie
                </a>
              </li>
              <li>
                <a href="#realisations" className="hover:text-white transition-colors">
                  Novus Biotech Therapeutics
                </a>
              </li>
              <li>
                <a href="#realisations" className="hover:text-white transition-colors">
                  Strata Supply Chain SaaS
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Garanties & Propriété
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-zinc-200 block mb-4">
              La Vigie Digitale
            </span>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Une note mensuelle synthétique sur les innovations design, l'accessibilité et la performance web.
            </p>
            {newsletterSuccess ? (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Merci, inscription confirmée.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-zinc-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors"
                >
                  S'abonner à la veille
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom row: Legal, credits, back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Méridien Studio SAS. Tous droits réservés.</span>
            <span>•</span>
            <a href="#faq" className="hover:text-zinc-400 transition-colors">
              Mentions Légales & RGPD
            </a>
            <span>•</span>
            <span>RCS Paris 892 410 773 • Code NAF 6201Z</span>
          </div>

          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors border border-zinc-800"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
