export type Language = 'en' | 'ur' | 'ar' | 'fr' | 'hi';
export type Currency = 'USD' | 'SAR';
export type ThemeMode = 'galaxy' | 'sea';

export type ViewType =
  | 'agency'
  | 'services'
  | 'clients'
  | 'work'
  | 'team'
  | 'contact'
  | 'lets-build'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'refund'
  | 'blog';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  dropdown?: {
    title: string;
    description: string;
    icon: string;
    href: string;
  }[];
}

export interface AISolution {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  features: string[];
  metrics: string;
  badge?: string;
  gradient: string;
}

export interface AgentSimulation {
  id: string;
  name: string;
  role: string;
  avatarIcon: string;
  description: string;
  initialPrompt: string;
  sampleInputs: string[];
  executionSteps: {
    title: string;
    detail: string;
    status: 'pending' | 'processing' | 'done';
    durationMs: number;
  }[];
  outputPreview: {
    summary: string;
    dataPoints: { label: string; value: string; trend?: string }[];
    rawJson?: Record<string, unknown>;
  };
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  tagline: string;
  summary: string;
  heroMetric: string;
  heroMetricLabel: string;
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string;
  technologies: string[];
  image: string;
}

export interface TechStackItem {
  name: string;
  category: 'AI & Models' | 'Frontend & Web' | 'Backend & Cloud' | 'E-Commerce & Data';
  description: string;
  icon: string;
  tags: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  recommendedFor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  metric: string;
}
