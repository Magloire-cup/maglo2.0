import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Sparkles, Copy, Check } from 'lucide-react';

interface ContactSectionProps {
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialMessage = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'Nouveau projet web',
    budgetRange: '10k€ - 25k€',
    message: initialMessage,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
      // Scroll smoothly to contact section if initialMessage arrived
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean static response with validation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleCopySummary = () => {
    const text = `Demande Méridien Studio :\nNom: ${formData.fullName}\nEmail: ${formData.email}\nEntreprise: ${formData.company}\nProjet: ${formData.projectType}\nBudget: ${formData.budgetRange}\nMessage: ${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct info & Trust (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                Contact & Échanges
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-zinc-950 tracking-tight mt-4 mb-4">
                Donnons vie à vos ambitions numériques
              </h2>
              <p className="text-base text-zinc-600 leading-relaxed">
                Remplissez le formulaire ci-contre ou contactez-nous directement. Un associé senior prendra connaissance de votre brief et vous recontactera sous 24 heures.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#fafaf9] border border-zinc-200/90">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 font-medium block">Courrier électronique</span>
                  <a
                    href="mailto:contact@meridien-studio.fr"
                    className="text-sm font-bold text-zinc-900 hover:text-emerald-700 transition-colors"
                  >
                    contact@meridien-studio.fr
                  </a>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">
                    Réponse sous 2 à 4 heures ouvrées
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#fafaf9] border border-zinc-200/90">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 font-medium block">Ligne directe</span>
                  <a
                    href="tel:+33189472010"
                    className="text-sm font-bold text-zinc-900 hover:text-emerald-700 transition-colors"
                  >
                    +33 (0)1 89 47 20 10
                  </a>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">
                    Du lundi au vendredi, 9h00 — 18h30
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#fafaf9] border border-zinc-200/90">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 font-medium block">Nos Bureaux</span>
                  <p className="text-sm font-bold text-zinc-900">
                    Paris : 34 Boulevard Haussmann, 75009
                  </p>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Lyon : 18 Rue de la République, 69002
                  </p>
                </div>
              </div>
            </div>

            {/* Availability note */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/90 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></div>
              <p className="text-xs font-semibold text-emerald-950">
                Capacité d'accueil : 2 nouveaux projets acceptés ce mois-ci.
              </p>
            </div>
          </div>

          {/* Right Column: The Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#fafaf9] p-6 sm:p-8 lg:p-10 rounded-2xl border border-zinc-200/90 shadow-xs">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-zinc-950">
                  Votre demande a bien été transmise
                </h3>
                <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                  Merci {formData.fullName || 'pour votre message'}. Notre équipe prépare une analyse de cadrage préliminaire et reviendra vers vous sous 24h.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copié dans le presse-papier' : 'Copier le récapitulatif'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        company: '',
                        phone: '',
                        projectType: 'Nouveau projet web',
                        budgetRange: '10k€ - 25k€',
                        message: '',
                      });
                    }}
                    className="text-xs text-zinc-500 hover:text-zinc-900 underline py-2"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-zinc-700 mb-1.5"
                    >
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Ex: Camille Dumont"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300/90 bg-white text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-zinc-700 mb-1.5"
                    >
                      Adresse e-mail professionnelle *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="c.dumont@entreprise.fr"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300/90 bg-white text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-semibold text-zinc-700 mb-1.5"
                    >
                      Organisation / Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Ex: Dumont & Associés"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300/90 bg-white text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-zinc-700 mb-1.5"
                    >
                      Téléphone (optionnel)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300/90 bg-white text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-xs font-semibold text-zinc-700 mb-1.5"
                    >
                      Type de projet
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300/90 bg-white text-xs sm:text-sm text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                    >
                      <option value="Nouveau projet web">Site Vitrine Haut de Gamme</option>
                      <option value="Application SaaS">Application Web SaaS / Métier</option>
                      <option value="E-Commerce Headless">E-Commerce Headless</option>
                      <option value="Audit & Optimisation">Audit UX & Performance</option>
                      <option value="Autre demande">Autre cadrage stratégique</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="budgetRange"
                      className="block text-xs font-semibold text-zinc-700 mb-1.5"
                    >
                      Enveloppe budgétaire indicative
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300/90 bg-white text-xs sm:text-sm text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                    >
                      <option value="5k€ - 10k€">5 000 € — 10 000 € HT</option>
                      <option value="10k€ - 25k€">10 000 € — 25 000 € HT</option>
                      <option value="25k€ - 50k€">25 000 € — 50 000 € HT</option>
                      <option value="> 50k€">&gt; 50 000 € HT</option>
                      <option value="À définir ensemble">À définir lors du cadrage</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-zinc-700"
                    >
                      Décrivez vos objectifs & contraintes *
                    </label>
                    {formData.message.includes('Simulation Méridien') && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        ✓ Simulation importée
                      </span>
                    )}
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Parlez-nous de votre vision, vos échéances et les fonctionnalités clés envisagées..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300/90 bg-white text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-y"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Engagement de confidentialité garanti</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md focus:ring-2 focus:ring-zinc-900 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmission en cours...</span>
                    ) : (
                      <>
                        <span>Envoyer votre brief</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
