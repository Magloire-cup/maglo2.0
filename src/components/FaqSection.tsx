import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQ_DATA } from '../data/siteData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQ_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 bg-[#fafaf9] border-b border-zinc-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Foire Aux Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-zinc-950 tracking-tight mt-4 mb-3">
            Toutes les réponses pour aborder votre projet avec sérénité
          </h2>
          <p className="text-base text-zinc-600 max-w-xl mx-auto">
            Vous avez une question spécifique ? Parcourez nos réponses ou contactez-nous directement.
          </p>

          {/* Quick Search */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une réponse (délais, tarifs, code...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200/90 bg-white text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-zinc-200 text-sm text-zinc-500">
              Aucune question ne correspond à votre recherche. N'hésitez pas à nous écrire directement ci-dessous.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="bg-white rounded-xl border border-zinc-200/90 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider bg-zinc-100 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                      <span className="font-display font-bold text-sm sm:text-base text-zinc-900">
                        {faq.question}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-zinc-950' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
