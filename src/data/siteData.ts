import { ServiceItem, CaseStudy, ProcessStep, Testimonial, FaqItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'strategie-conseil',
    number: '01',
    title: 'Stratégie de Marque & Positionnement',
    subtitle: 'Clarifiez votre vision et imposez votre autorité de marché',
    description: 'Nous analysons votre écosystème concurrentiel, définissons votre proposition de valeur singulière et construisons un territoire de marque pérenne et mémorable.',
    deliverables: [
      'Plateforme de marque & charte éditoriale',
      'Audit de positionnement & benchmarks sectoriels',
      'Architecture d’offre et messaging stratégique',
      'Stratégie de mise sur le marché (GTM roadmap)'
    ],
    technologies: ['Brand Matrix', 'User Research', 'Competitive Radar', 'Design Sprint'],
    duration: '2 à 4 semaines',
    iconName: 'Compass',
    popular: false,
  },
  {
    id: 'product-design',
    number: '02',
    title: 'Product Design & Expérience Utilisateur',
    subtitle: 'Concevez des interfaces d’une fluidité absolue qui convertissent',
    description: 'De la recherche utilisateur au design system complet sur Figma, nous transformons des parcours complexes en expériences limpides, élégantes et orientées performance.',
    deliverables: [
      'Design System complet (composants, tokens, guidelines)',
      'Wireframing & prototypes interactifs haute fidélité',
      'Tests utilisateurs & cartographie des parcours (Journey Maps)',
      'Accessibilité WCAG 2.1 & micro-animations immersives'
    ],
    technologies: ['Figma Tokens', 'Protopie', 'UserTesting', 'Design Tokens'],
    duration: '4 à 8 semaines',
    iconName: 'Layout',
    popular: true,
  },
  {
    id: 'ingenierie-web',
    number: '03',
    title: 'Ingénierie Web & Architecture Jamstack',
    subtitle: 'Développez un actif numérique ultra-rapide, sécurisé et évolutif',
    description: 'Nos ingénieurs conçoivent des plateformes web modernes (React, Next.js, Vite, TypeScript) avec des scores Lighthouse parfaits (98+), un référencement technique impeccable et zéro dette technique.',
    deliverables: [
      'Applications web & sites vitrines haute performance',
      'CMS headless sur-mesure (Sanity, Strapi ou Notion API)',
      'Optimisation Core Web Vitals (temps de chargement < 0.6s)',
      'Infrastructure cloud automatisée CI/CD et monitoring'
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloudflare Edge'],
    duration: '4 à 10 semaines',
    iconName: 'CodeXml',
    popular: false,
  },
  {
    id: 'croissance-optimisation',
    number: '04',
    title: 'Performance, SEO & Optimisation Continue',
    subtitle: 'Maximisez votre visibilité organique et vos taux de conversion',
    description: 'Nous déployons une méthodologie rigoureuse d’A/B testing, d’audit SEO technique et d’analyse comportementale pour démultiplier le retour sur investissement de chaque visite.',
    deliverables: [
      'Audit SEO technique approfondi & sémantique prédictive',
      'Mise en place de plans de marquage conformes RGPD',
      'Optimisation du taux de conversion (CRO & A/B testing)',
      'Accompagnement trimestriel & revues de performance'
    ],
    technologies: ['PostHog', 'Matomo RGPD', 'Google Search Console', 'Hotjar'],
    duration: 'Accompagnement continu',
    iconName: 'TrendingUp',
    popular: false,
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aurora-fintech',
    title: 'Refonte de la plateforme patrimoniale Aurora Private Wealth',
    client: 'Aurora Capital',
    year: '2025',
    category: 'FinTech & SaaS',
    summary: 'Conception d’un portail d’investissement haut de gamme et d’un site institutionnel pour un gestionnaire d’actifs parisien.',
    challenge: 'L’ancienne interface était dense, austère et peinait à rassurer les investisseurs institutionnels tout en manquant cruellement de réactivité sur mobile.',
    solution: 'Création d’un Design System d’inspiration éditoriale sobre et raffinée, modélisation de simulateurs d’allocations en temps réel et architecture web statique ultra-sécurisée.',
    impactMetrics: [
      { label: 'Taux de conversion leads qualifiés', value: '+142%' },
      { label: 'Score Google PageSpeed', value: '99/100' },
      { label: 'Temps de chargement initial', value: '0.45s' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Motion', 'Recharts'],
    testimonial: {
      quote: 'Méridien Studio a su capturer l’essence de notre maison de gestion avec un niveau de rigueur technique et esthétique rarement rencontré.',
      author: 'Guillaume de Montmirail',
      role: 'Directeur Associé chez Aurora Capital'
    }
  },
  {
    id: 'elysee-luxe',
    title: 'Nouvelle expérience de marque pour Maison Vernier Horlogerie',
    client: 'Maison Vernier Genève',
    year: '2025',
    category: 'E-Commerce & Luxe',
    summary: 'Expérience digitale immersive pour une manufacture horlogère indépendante avec visualiseur 3D et prise de rendez-vous en salon privé.',
    challenge: 'Transposer le prestige et l’émotion de l’artisanat mécanique suisse sur un support numérique sans compromettre la fluidité de navigation.',
    solution: 'Interface épurée aux proportions dorées, micro-animations chorégraphiées au pixel près et parcours de conciergerie personnalisé pour chaque visiteur.',
    impactMetrics: [
      { label: 'Demandes de rendez-vous privés', value: '+88%' },
      { label: 'Durée moyenne par session', value: '4m 32s' },
      { label: 'Taux de rebond mobile', value: '-36%' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'Framer Motion', 'Tailwind', 'Headless API'],
    testimonial: {
      quote: 'Une réalisation d’orfèvre. Nos clients internationaux nous félicitent chaque semaine pour la clarté et l’élégance de notre nouvelle vitrine.',
      author: 'Claire Delacroix',
      role: 'Directrice de la Création, Maison Vernier'
    }
  },
  {
    id: 'novus-biotech',
    title: 'Refonte institutionnelle et levée de fonds Série B pour Novus Health',
    client: 'Novus Therapeutics',
    year: '2024',
    category: 'Santé & Impact',
    summary: 'Création de l’écosystème digital pour une biotech de pointe spécialisée dans l’oncologie ciblée.',
    challenge: 'Vulgariser des protocoles scientifiques hautement complexes auprès des investisseurs internationaux tout en conservant une crédibilité médicale irréprochable.',
    solution: 'Storytelling visuel interactif, visualisations de données dynamiques et conformité stricte aux exigences d’accessibilité et de sécurité médicale.',
    impactMetrics: [
      { label: 'Levée de fonds conclue', value: '28M€' },
      { label: 'Trafic institutionnel US & Europe', value: 'x3.4' },
      { label: 'Conformité accessibilité', value: '100% WCAG' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    technologies: ['TypeScript', 'Tailwind CSS', 'SVG Interactive', 'D3.js'],
    testimonial: {
      quote: 'L’équipe de Méridien a transformé notre complexité biologique en une histoire limpide qui a fait l’unanimité auprès de nos souscripteurs.',
      author: 'Dr. Marc Villedieu',
      role: 'Co-fondateur & CSO, Novus Health'
    }
  },
  {
    id: 'strata-saas',
    title: 'Plateforme B2B d’optimisation logistique pour Strata Logistics',
    client: 'Strata Cloud Solutions',
    year: '2024',
    category: 'B2B & Industrie',
    summary: 'Conception intégrale du site vitrine B2B, de l’espace démonstration et du centre de ressources pour un leader du fret multimodal.',
    challenge: 'Un cycle de vente B2B long (6 à 9 mois) pénalisé par des fiches produits statiques et un manque de clarté sur le calcul du ROI.',
    solution: 'Intégration d’un calculateur de gains de décarbonation interactif, d’un espace de démo produit sans friction et d’une documentation technique exemplaire.',
    impactMetrics: [
      { label: 'Pipeline commercial généré', value: '+4.2M€' },
      { label: 'Téléchargements du livre blanc', value: '+210%' },
      { label: 'Score SEO de visibilité', value: 'Top 3 Google' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Vite', 'React', 'Tailwind', 'Interactive Calculator'],
    testimonial: {
      quote: 'Notre cycle de vente a été raccourci de 40 jours grâce aux simulateurs et à la netteté du nouveau positionnement conçu par Méridien.',
      author: 'Julien Barbier',
      role: 'Vice-Président Commercial, Strata'
    }
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Immersion & Diagnostic',
    duration: 'Semaine 1 — 2',
    description: 'Nous disséquons vos objectifs d’affaires, échangeons avec vos équipes clés et vos clients réels, et cartographions vos leviers concurrentiels.',
    deliverables: ['Rapport d’audit 360°', 'Cartographie des personas & parcours', 'Matrice d’objectifs mesurables (OKRs)'],
    keyActions: ['Interviews qualitatives', 'Analyse quantitative des données existantes', 'Atelier de cadrage stratégique']
  },
  {
    step: '02',
    title: 'Architecture & Direction Artistique',
    duration: 'Semaine 3 — 4',
    description: 'Nous explorons deux directions créatives tranchées, définissons la grille typographique, le design system et validons les prototypes fonctionnels.',
    deliverables: ['Moodboards & pistes visuelles', 'Design System modulaire', 'Prototypes interactifs testés'],
    keyActions: ['Co-conception en ateliers réguliers', 'Validation des flux de conversion', 'Validation de la charte de tonalité']
  },
  {
    step: '03',
    title: 'Développement & Intégration Robuste',
    duration: 'Semaine 5 — 7',
    description: 'Développement minutieux au pixel près en TypeScript moderne. Code sémantique, micro-interactions soignées, accessibilité et performances extrêmes.',
    deliverables: ['Plateforme fonctionnelle pré-production', 'Scores Lighthouse 95+', 'Documentation technique claire'],
    keyActions: ['Revue de code continue', 'Tests multi-navigateurs & mobiles', 'Vérification SEO et sécurité']
  },
  {
    step: '04',
    title: 'Déploiement & Accélération',
    duration: 'Semaine 8 et au-delà',
    description: 'Mise en ligne sans interruption de service, suivi fin des premières métriques, formation de vos équipes et plan d’optimisation continue.',
    deliverables: ['Déploiement production sans accroc', 'Tableau de bord d’analytique', 'Session de prise en main enregistrée'],
    keyActions: ['Checklist de lancement 65 points', 'Suivi de l’indexation Google', 'Support réactif prioritaire']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sophie Laurent',
    role: 'Chief Marketing Officer',
    company: 'Financière Saint-Honoré',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    content: 'Travailler avec Méridien Studio a été une révélation. Leur sens du détail et leur capacité à appréhender les enjeux financiers complexes nous ont permis de lancer notre nouveau portail 3 semaines en avance sur le planning initial.',
    rating: 5,
    highlightMetric: '+165% de leads qualifiés en 3 mois'
  },
  {
    id: 'test-2',
    name: 'Alexandre Meyer',
    role: 'Fondateur & CEO',
    company: 'Omnia Technologies',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: 'Une rigueur d’exécution impressionnante. La vitesse de chargement de notre site vitrine est passée de 3,2s à 0,4s, et nos équipes internes sont devenues totalement autonomes sur la mise à jour des contenus.',
    rating: 5,
    highlightMetric: 'Temps de chargement divisé par 8'
  },
  {
    id: 'test-3',
    name: 'Béatrice Morel',
    role: 'Directrice de la Transformation',
    company: 'Groupe Vendôme',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    content: 'Le niveau esthétique est digne des plus grandes agences internationales, avec en plus la réactivité et la franchise d’une équipe à taille humaine. Un investissement rentabilisé dès le premier trimestre.',
    rating: 5,
    highlightMetric: 'Note de 99/100 sur Lighthouse'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Tarifs & Délais',
    question: 'Quels sont vos délais habituels pour un projet complet ?',
    answer: 'La majorité de nos projets s’échelonnent entre 4 et 8 semaines, selon l’envergure : 3 à 4 semaines pour un site vitrine haut de gamme avec positionnement éditorial, et 6 à 10 semaines pour des plateformes complexes intégrant un Design System sur-mesure et des calculateurs interactifs.'
  },
  {
    id: 'faq-2',
    category: 'Aspects Techniques',
    question: 'Pourquoi privilégiez-vous les technologies statiques et Jamstack ?',
    answer: 'Les sites statiques modernes (générés avec Vite, React et déployés sur des réseaux Edge mondiaux) offrent une vitesse de chargement instantanée, une sécurité maximale (absence de base de données vulnérable exposée), un référencement naturel optimal et des coûts d’hébergement réduits à zéro.'
  },
  {
    id: 'faq-3',
    category: 'Méthodologie',
    question: 'Comment garantissez-vous le respect du calendrier et du budget ?',
    answer: 'Nous pratiquons des forfaits transparents sans frais cachés. Chaque projet bénéficie d’un rétro-planning précis, de sprints hebdomadaires avec démonstrations en direct et d’un canal de communication dédié (Slack ou e-mail prioritaire) pour des réponses sous 4 heures ouvrées.'
  },
  {
    id: 'faq-4',
    category: 'Aspects Techniques',
    question: 'Serons-nous propriétaires du code source et des designs ?',
    answer: 'Absolument. Vous possédez 100% de la propriété intellectuelle dès le règlement final : fichiers sources Figma, composants du Design System, code source sous licence libre de droits et documentation d’administration.'
  },
  {
    id: 'faq-5',
    category: 'Maintenance',
    question: 'Proposez-vous un accompagnement post-lancement ?',
    answer: 'Oui. Tous nos projets incluent une garantie de 30 jours pour tout ajustement. Au-delà, nous proposons des forfaits d’optimisation continue (évolutions UX, audits SEO trimestriels, surveillance des performances et mises à jour de sécurité).'
  }
];

export const CLIENT_LOGOS = [
  { name: 'Aurora Capital', tag: 'Private Equity' },
  { name: 'Maison Vernier', tag: 'Horlogerie Suisse' },
  { name: 'Novus Biotech', tag: 'Santé & Recherche' },
  { name: 'Strata Logistics', tag: 'Supply Chain' },
  { name: 'Vendôme Conseil', tag: 'M&A Paris' },
  { name: 'Altas Global', tag: 'Infrastructures' }
];

export const COMPANY_KEY_METRICS = [
  { value: '50+', label: 'Projets stratégiques livrés' },
  { value: '99.4%', label: 'Taux de satisfaction client' },
  { value: '< 0.5s', label: 'Vitesse de chargement moyenne' },
  { value: '8 ans', label: 'D’expertise et d’exigence' }
];
