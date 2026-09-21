export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  duration: string;
  iconName: string;
  popular?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  year: string;
  category: 'FinTech & SaaS' | 'E-Commerce & Luxe' | 'Santé & Impact' | 'B2B & Industrie';
  summary: string;
  challenge: string;
  solution: string;
  impactMetrics: {
    label: string;
    value: string;
  }[];
  imageUrl: string;
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface ProcessStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  keyActions: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  highlightMetric?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Méthodologie' | 'Tarifs & Délais' | 'Aspects Techniques' | 'Maintenance';
}

export interface ProjectEstimationState {
  projectType: string;
  scope: string[];
  timeline: string;
  supportLevel: string;
}
