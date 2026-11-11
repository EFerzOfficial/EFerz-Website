import { MorphShape } from './morphShapes';

export interface EFerzOfficeContact {
  country: string;
  code: string;
  phone: string;
  phoneLabel?: string;
  secondaryPhone?: string;
  whatsappPhone?: string;
  whatsappLink?: string;
  whatsappLabel?: string;
  address: string;
  note: string;
  email: string;
}

export interface EFerzBlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  excerpt: string;
  heroImage: string;
  accentColor: string;
  particleShape: MorphShape;
  tags: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
}

export interface EFerzPolicySection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface EFerzSocialLink {
  id: 'instagram' | 'facebook' | 'linkedin' | 'youtube';
  label: string;
  handle: string;
  url: string;
}

export const EFERZ_CONTACT_DETAILS = {
  primaryEmail: 'info@eferz.com',
  website: 'https://eferz.com',
  usaPhone: '+1 (786) 224-4112',
  usaPhoneSecondary: '+1 (786) 317-3379',
  whatsappPhone: '+1 (954) 336-2586',
  whatsappUrl: 'https://wa.me/19543362586',
  usaWhatsappPhone: '+1 (954) 336-2586',
  usaWhatsappLink: 'https://wa.me/19543362586',
  ksaPhone: '+966 (539) 046410',
  usaAddress: 'Fort Lauderdale, FL, USA 33319 (Please call before visiting)',
  ksaAddress:
    'Dammam Road, Khurais, Riyadh City, Saudi Arabia (Please call before visiting)',
  socialLinks: [
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@EFerzOfficial',
      url: 'https://www.instagram.com/EFerzOfficial',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      handle: '@EFerzOfficial',
      url: 'https://www.facebook.com/EFerzOfficial',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: '/company/EFerz',
      url: 'https://www.linkedin.com/company/EFerz/',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      handle: '@EFerzOfficial',
      url: 'https://www.youtube.com/@EFerzOfficial',
    },
  ] as EFerzSocialLink[],
  offices: [
    {
      country: 'United States (USA Headquarters)',
      code: 'USA',
      phone: '+1 (786) 224-4112',
      phoneLabel: 'CALL (USA HQ)',
      secondaryPhone: '+1 (954) 336-2586',
      whatsappPhone: '+1 (954) 336-2586',
      whatsappLink: 'https://wa.me/19543362586',
      whatsappLabel: 'WHATSAPP',
      address: 'Fort Lauderdale, FL, USA 33319',
      note: 'Global Headquarters — Please call before visiting',
      email: 'info@eferz.com',
    },
    {
      country: 'Kingdom of Saudi Arabia (KSA Office)',
      code: 'KSA',
      phone: '+966 (539) 046410',
      phoneLabel: 'CALL (KSA)',
      address: 'Dammam Road, Khurais, Riyadh City, Saudi Arabia',
      note: 'Regional Office — Please call before visiting',
      email: 'info@eferz.com',
    },
    {
      country: 'Pakistan (Regional Office)',
      code: 'PAK',
      phone: '+92 345 3397459',
      phoneLabel: 'CALL (PAKISTAN)',
      whatsappPhone: '+1 (954) 336-2586',
      whatsappLink: 'https://wa.me/19543362586',
      whatsappLabel: 'WHATSAPP',
      address: 'Karachi, Pakistan — Engineering & Operations Hub',
      note: 'Serving Clients Worldwide Internationally',
      email: 'info@eferz.com',
    },
  ] as EFerzOfficeContact[],
};

export const EFERZ_ABOUT_CONTENT = {
  kicker: 'ABOUT EFERZ DIGITAL AGENCY · FOUNDED ON 10 OCTOBER 2020',
  headline:
    'All-In-One Global Digital Powerhouse Building Brands, Converting Websites & Securing Systems Worldwide.',
  subheadline:
    'Headquartered in the United States with regional offices in Saudi Arabia and Pakistan, EFerz entertains and serves clients worldwide across all international markets — delivering Web Design & Development, Digital Marketing, E-Commerce, Amazon FBA, Brand Identity, AI Solutions, and Cybersecurity.',
  storyParagraphs: [
    'Founded on 10 October 2020, EFerz Digital Agency (EFerz.com) was built on a clear conviction: "Nothing is impossible in the IT world." Headquartered in Fort Lauderdale, Florida (USA) with regional offices in Riyadh (Kingdom of Saudi Arabia) and Karachi (Pakistan), we entertain and serve startups, SMBs, and global enterprises worldwide.',
    'Rather than fragmenting your digital presence across multiple disconnected vendors, EFerz serves as your unified international technology and creative partner. From architecting high-converting custom websites and Shopify Plus / WooCommerce stores to scaling Amazon FBA operations, executing data-driven SEO & PPC campaigns, and hardening infrastructure with enterprise Cybersecurity — every discipline works in harmony for clients globally.',
    'In addition to our worldwide digital agency solutions, EFerz operates EFerz Connect from our South Florida headquarters, delivering high-speed residential and commercial connectivity alongside dedicated 24/7 technical support.',
  ],
  coreValues: [
    {
      code: '01',
      title: 'Uncompromising Quality & Craft',
      description:
        'Every line of code, user interface layer, and marketing campaign is engineered to enterprise benchmarks with rigorous QA testing before launch.',
    },
    {
      code: '02',
      title: 'Transparent Global Collaboration',
      description:
        'Direct communication, clear milestone roadmaps, and honest reporting ensure our international clients are empowered at every stage of execution.',
    },
    {
      code: '03',
      title: 'Full-Spectrum Digital Mastery',
      description:
        '11 specialized digital agency departments — Web, E-Commerce, Amazon FBA, Marketing, Social, Content, Graphics, Branding, Consulting, Cyber Security, and ISP Connect — delivered worldwide.',
    },
    {
      code: '04',
      title: 'Customer-Centric Satisfaction',
      description:
        'Backed by our 30-day satisfaction commitment, 100% ownership guarantee, responsive technical support, and long-term partnerships across 60+ brands worldwide.',
    },
  ],
  milestones: [
    { value: '2020', label: 'Founded on 10 October 2020' },
    { value: '11+', label: 'Specialized IT & Digital Divisions' },
    { value: '60+', label: 'Worldwide Brands & Clients' },
    { value: '99.9%', label: 'Uptime & Security SLA' },
  ],
};

export const EFERZ_PRIVACY_POLICY: {
  lastUpdated: string;
  intro: string;
  sections: EFerzPolicySection[];
} = {
  lastUpdated: 'July 10, 2025',
  intro:
    'This Privacy Policy describes how EFerz Digital Agency ("EFerz", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, make a purchase from eferz.com, or otherwise communicate with us. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy.',
  sections: [
    {
      id: 'collection',
      number: '01',
      title: 'Personal Information We Collect',
      paragraphs: [
        'To provide the Services, we collect personal information about you from a variety of sources, including information you directly submit to us and information automatically collected through cookies and analytics when you interact with our website.',
      ],
      bullets: [
        'Basic contact details including your name, address, phone number (USA / KSA / International), and email address (such as when contacting info@eferz.com).',
        'Order and project billing information including billing address, payment confirmation, and project scope specifications.',
        'Account and project portal credentials including username, password, and security questions.',
        'Customer support communications and project files you choose to share with our engineering and creative teams.',
        'Usage Data automatically collected via cookies, pixels, device identifiers, IP address, and browser analytics.',
      ],
    },
    {
      id: 'use',
      number: '02',
      title: 'How We Use Your Personal Information',
      paragraphs: [
        'We use your personal information to provide, tailor, and improve our digital agency services, process payments, fulfill project deliverables, and maintain enterprise security.',
      ],
      bullets: [
        'Providing Products & Services: To execute your contract, process payments, deliver web/software assets, and manage your client account.',
        'Marketing & Communications: To send service updates, project milestones, and relevant promotional offers (you may opt out at any time).',
        'Security & Fraud Prevention: To detect, investigate, or take action regarding possible fraudulent, illegal, or malicious activity.',
        'Communicating with You: To provide dedicated technical support, consultation scheduling, and project management updates.',
      ],
    },
    {
      id: 'mobile-sharing',
      number: '03',
      title: 'Strict Non-Sharing of Mobile & Sensitive Data',
      paragraphs: [
        'EFerz respects your communication privacy. No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.',
        'We do not use or disclose sensitive personal information without your explicit consent or for the purposes of inferring characteristics about you.',
      ],
    },
    {
      id: 'children',
      number: '04',
      title: 'Children’s Data & Age Restrictions',
      paragraphs: [
        'The Services are not intended to be used by children, and we do not knowingly collect any personal information about children under 13 years of age. Only individuals aged 18 or older are permitted to contract EFerz services. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us at info@eferz.com to request that it be deleted.',
      ],
    },
    {
      id: 'security-rights',
      number: '05',
      title: 'Data Security, Retention & Your Privacy Rights',
      paragraphs: [
        'We implement industry-standard encryption, access controls, and zero-trust security practices to safeguard your data. Depending on where you live, you may have the right to request access to, correction of, portability of, or deletion of personal information we maintain about you.',
        'Should you have any questions about our privacy practices or this Privacy Policy, please contact us at info@eferz.com or call +1 (786) 224-4112 (USA) / +966 (539) 046410 (KSA).',
      ],
    },
  ],
};

export const EFERZ_TERMS_OF_SERVICE: {
  lastUpdated: string;
  intro: string;
  sections: EFerzPolicySection[];
} = {
  lastUpdated: 'July 10, 2025',
  intro:
    'Welcome to EFerz Digital Agency (eferz.com). These Terms of Service ("Terms") constitute a binding legal contract between EFerz and you ("User" or "Client"). By visiting our website, registering for, or using any EFerz services, you signify your informed consent to these Terms of Use and our Privacy Policy.',
  sections: [
    {
      id: 'scope',
      number: '01',
      title: 'Scope of Digital Agency Services',
      paragraphs: [
        'EFerz provides comprehensive digital and IT solutions designed to help businesses create an online presence, scale operations, and secure infrastructure — including Web Design & Development, Digital Marketing, E-Commerce Solutions, Amazon FBA Management, Social Media Management, Content Writing, Graphic Design, Brand Development, IT Consulting, Cyber Security, and EFerz Connect (ISP).',
      ],
    },
    {
      id: 'orders-consent',
      number: '02',
      title: 'Orders, Promo Packages & Written Consent',
      paragraphs: [
        'EFerz charges for ordered amounts as per agreed project proposals or promotional deal packages after obtaining written consent (including via email or verified text message) and acknowledgment of our Terms and Conditions.',
        'By approving a project brief or invoice, the Client acknowledges the specific deliverables, timeline milestones, and scope of services they will receive.',
      ],
    },
    {
      id: 'client-obligations',
      number: '03',
      title: 'Client Cooperation & Server / Platform Access',
      paragraphs: [
        'Timely delivery of web, e-commerce, and technical projects requires active cooperation from the Client, including providing necessary brand assets, content, domain/DNS credentials, or hosting/server access where applicable.',
        'Refusal to provide required server or platform access necessary to deploy or troubleshoot ordered services may delay project completion and disqualify a Client from service level or refund claims.',
      ],
    },
    {
      id: 'intellectual-property',
      number: '04',
      title: 'Intellectual Property & Final Deliverables',
      paragraphs: [
        'Upon full settlement of agreed project invoices, ownership of custom final deliverables created specifically for the Client transfers in accordance with the project agreement. EFerz retains the right to showcase completed non-confidential projects within our official agency portfolio unless covered by a separate Non-Disclosure Agreement (NDA).',
      ],
    },
    {
      id: 'governing-contact',
      number: '05',
      title: 'Limitation of Liability & Official Contact',
      paragraphs: [
        'EFerz strives for 100% client satisfaction and engineering excellence. All notices, billing inquiries, and legal communications must be directed to info@eferz.com or via our official offices in Fort Lauderdale, FL, USA (+1 (786) 224-4112) and Riyadh City, Saudi Arabia (+966 (539) 046410).',
      ],
    },
  ],
};

export const EFERZ_REFUND_POLICY: {
  lastUpdated: string;
  intro: string;
  sections: EFerzPolicySection[];
} = {
  lastUpdated: 'July 10, 2025',
  intro:
    'At EFerz Digital Agency, we stand behind the quality of our engineering, design, and digital marketing deliverables. New purchases are covered by our 30-Day Money-Back Guarantee subject to the official terms and verification procedures outlined below.',
  sections: [
    {
      id: 'guarantee',
      number: '01',
      title: '30-Day Money-Back Guarantee & Processing',
      paragraphs: [
        'If you are dissatisfied with your new purchase or initial deliverables, you may submit a refund request within 30 days of purchase. Approved refunds are processed either by account credits or direct deposit back to the original credit or debit card used for the transaction within 10 to 30 working days.',
        'EFerz makes refunds on payments for custom design and digital services as a courtesy to our clients; however, EFerz internal management reserves the right to review and reject any refund request that does not meet our policy criteria.',
      ],
    },
    {
      id: 'not-as-described',
      number: '02',
      title: 'Product or Service Not-As-Described',
      paragraphs: [
        'Such issues must be reported to our Technical Support Department within 30 days from the date of purchase or delivery. Clear evidence must be provided proving that the purchased product or deliverable is materially not as described on the website or approved project brief.',
        'Complaints which are based merely on the customer’s false expectations or requests outside the agreed scope of work are not honored.',
      ],
    },
    {
      id: 'major-defects',
      number: '03',
      title: 'Major Technical Defects & 72-Hour Rectification Window',
      paragraphs: [
        'Although all our digital products and codebases are thoroughly tested before release, unexpected errors may occur. Such issues must be submitted for approval to our Technical Support Team.',
        'We reserve the right to rectify the error or defect within 72 hours. If any deficiency is approved and we fail to correct it within 72 hours from the date of the initial complaint letter or notification provided by the Customer, the refund will be issued to the customer in full without any compensations or reimbursements, or at the customer’s choice, replacement of the product of the same or around the same value.',
        'Please note: Refusal to provide server or platform access required by our engineers to inspect and fix the reported defect will disqualify the client from a refund.',
      ],
    },
    {
      id: 'non-delivery',
      number: '04',
      title: 'Non-Delivery & Download / Archive Issues',
      paragraphs: [
        'If you do not receive a delivery email from us due to provider or mail server issues, we recommend contacting us immediately for assistance. Claims for non-delivery must be submitted to our Billing Department in writing within 10 working days from the delivery date; otherwise the product will be considered received and downloaded.',
        'If you experience problems downloading or unzipping project archives, claims must be submitted to our Technical Support Department. Failure to contact EFerz within this period or refusal to receive assistance within 10–30 days may result in a refund decline.',
      ],
    },
  ],
};

export const EFERZ_BLOG_POSTS: EFerzBlogPost[] = [
  {
    id: 'accessible-dark-mode-ui',
    slug: 'designing-accessible-dark-mode-user-interfaces-for-the-web',
    title: 'Designing Accessible Dark Mode User Interfaces for the Web',
    category: 'UI/UX & Web Architecture',
    readTime: '6 min read',
    date: 'June 2025',
    author: 'EFerz Design & Frontend Team',
    authorRole: 'UI/UX & Design Systems Division',
    excerpt:
      'Why pure #000000 black hurts legibility, how to express visual depth through surface elevation layers, and how to respect user system preferences with modern CSS.',
    heroImage: '/cinematic/eferz_scene1_earth.jpg',
    accentColor: '#38bdf8',
    particleShape: 'book_insights',
    tags: ['Dark Mode UI', 'WCAG Accessibility', 'CSS Architecture', 'Design Systems'],
    sections: [
      {
        heading: '1. Avoid Pure Black (#000000) for Base Surfaces',
        paragraphs: [
          'A common misconception in dark mode design is setting the background to pure black (#000000) with pure white (#FFFFFF) text. High-contrast halation causes visual fatigue and text blurring for users with astigmatism.',
          'At EFerz, we engineer dark interfaces using deep obsidian and carbon-slate palettes (such as #07090F to #0D111A) paired with off-white typography (#F8FAFC) to achieve comfortable, cinema-grade legibility.',
        ],
      },
      {
        heading: '2. Expressing Depth Through Surface Elevation Layers',
        paragraphs: [
          'In light mode, drop shadows communicate elevation. In dark mode, dark shadows disappear against dark backgrounds. Instead, elevated cards, modals, and navigation bars should become progressively lighter and more translucent as they move closer to the user.',
        ],
        bullets: [
          'Base Canvas: Deep atmospheric dark (#05060A)',
          'Elevated Cards: Translucent glass surfaces with subtle 1px specular borders (rgba(255,255,255,0.14))',
          'Interactive Highlights: Desaturated accent tokens that pass WCAG AA/AAA contrast ratios',
        ],
      },
      {
        heading: '3. Respecting System Preferences & Smooth Theme Switching',
        paragraphs: [
          'Modern web applications should honor prefers-color-scheme media queries while giving users instant manual control without layout shifts or flash of unstyled content (FOUC).',
        ],
      },
    ],
  },
  {
    id: 'programmatic-seo-scale',
    slug: 'programmatic-seo-without-thin-content-penalties',
    title: 'Scaling Programmatic SEO Without Incurring Thin Content Penalties',
    category: 'Digital Marketing & SEO',
    readTime: '7 min read',
    date: 'June 2025',
    author: 'EFerz Growth & SEO Architects',
    authorRole: 'Search & Performance Marketing',
    excerpt:
      'How to architect data-rich programmatic landing pages, dynamic schema markup, and intent-driven internal linking that rank #1 without triggering search engine spam filters.',
    heroImage: '/cinematic/shot1_space_ultra.jpg',
    accentColor: '#f59e0b',
    particleShape: 'rocket',
    tags: ['Programmatic SEO', 'Technical SEO', 'Schema.org', 'Organic Growth'],
    sections: [
      {
        heading: '1. The Thin Content Trap in Programmatic SEO',
        paragraphs: [
          'Publishing thousands of templated pages where only the city name or keyword changes is the fastest way to trigger Google’s Helpful Content and spam penalties.',
          'True programmatic SEO requires unique, high-utility data points, real case studies, localized pricing benchmarks, and genuine answers to user search intent on every generated URL.',
        ],
      },
      {
        heading: '2. Data-First Page Architecture & Structured JSON-LD',
        paragraphs: [
          'Every programmatic page engineered by EFerz combines proprietary datasets, interactive calculators or comparison matrices, and comprehensive Schema.org JSON-LD markup.',
        ],
        bullets: [
          'Unique semantic headings and dynamic industry metrics per page',
          'Hub-and-spoke internal linking topology for rapid crawler indexing',
          'Sub-second Core Web Vitals (LCP < 1.2s) via Next.js Incremental Static Regeneration',
        ],
      },
    ],
  },
  {
    id: 'custom-ai-support-agents',
    slug: 'training-custom-ai-support-agents-on-your-knowledge-base',
    title: 'Training Custom AI Support Agents on Your Enterprise Knowledge Base',
    category: 'Artificial Intelligence & Automation',
    readTime: '8 min read',
    date: 'July 2025',
    author: 'EFerz AI Engineering Division',
    authorRole: 'Autonomous Agents & RAG Systems',
    excerpt:
      'A practical engineering blueprint for structuring internal documentation, implementing Retrieval-Augmented Generation (RAG), enforcing guardrails, and handling human escalations.',
    heroImage: '/cinematic/shot6_climax_ultra.jpg',
    accentColor: '#10b981',
    particleShape: 'brain',
    tags: ['AI Agents', 'RAG Architecture', 'Enterprise Automation', 'Customer Support'],
    sections: [
      {
        heading: '1. Structuring Source Documentation for High-Precision Retrieval',
        paragraphs: [
          'An AI support agent is only as accurate as the knowledge base it retrieves from. Before embedding documents into a vector database, raw PDFs, SOPs, and help-center articles must be cleaned, chunked semantically, and tagged with metadata.',
        ],
      },
      {
        heading: '2. Retrieval-Augmented Generation (RAG) & Hallucination Guardrails',
        paragraphs: [
          'Rather than relying on generic model memory, RAG pipelines retrieve verified company policy snippets in real time and instruct the model to answer strictly from grounded context.',
        ],
        bullets: [
          'Strict system prompts with zero-hallucination citation enforcement',
          'Automated confidence scoring and seamless handoff to human support specialists',
          '24/7 multilingual resolution across web chat, WhatsApp, and CRM ticketing systems',
        ],
      },
    ],
  },
  {
    id: 'amazon-fba-ipi-mastery',
    slug: 'mastering-amazon-fba-inventory-performance-index-and-buy-box',
    title: 'Mastering Amazon FBA Inventory Performance Index (IPI) & Buy Box Velocity',
    category: 'Amazon FBA & E-Commerce',
    readTime: '6 min read',
    date: 'May 2025',
    author: 'EFerz E-Commerce & FBA Specialists',
    authorRole: 'Global Marketplace Operations',
    excerpt:
      'Actionable strategies to optimize sell-through rates, eliminate aged inventory surcharges, boost A+ listing conversion, and dominate the Amazon Buy Box in USA and GCC markets.',
    heroImage: '/cinematic/eferz_scene2_saturn.jpg',
    accentColor: '#ec3935',
    particleShape: 'cart',
    tags: ['Amazon FBA', 'IPI Score', 'A+ Content', 'Marketplace Growth'],
    sections: [
      {
        heading: '1. Why Your IPI Score Dictates FBA Profitability',
        paragraphs: [
          'Amazon’s Inventory Performance Index (IPI) directly impacts your warehouse storage limits and FBA fee structure. Maintaining a score well above the threshold requires balancing in-stock availability against excess storage.',
        ],
      },
      {
        heading: '2. Full-Funnel Listing Optimization & PPC Synergy',
        paragraphs: [
          'At EFerz, our Amazon FBA specialists combine high-converting A+ Brand Stories, keyword-indexed backend attributes, and algorithmic Sponsored Products / Sponsored Brands campaigns to maximize organic rank and profit margins.',
        ],
        bullets: [
          'Proactive restock forecasting & stranded inventory resolution',
          'High-converting product photography, 3D renders, and A+ modules',
          'Lower ACoS and higher TACoS efficiency through negative keyword sculpting',
        ],
      },
    ],
  },
  {
    id: 'zero-trust-cybersecurity-ecommerce',
    slug: 'zero-trust-cybersecurity-for-modern-ecommerce-and-cloud-platforms',
    title: 'Zero-Trust Cybersecurity for Modern E-Commerce & Cloud Platforms',
    category: 'Cyber Security & Cloud IT',
    readTime: '5 min read',
    date: 'July 2025',
    author: 'EFerz Cyber Defense Team',
    authorRole: 'Security & Cloud Infrastructure',
    excerpt:
      'Protecting customer checkout data, API endpoints, and cloud servers against DDoS attacks, SQL injection, and credential stuffing with 24/7 proactive defense.',
    heroImage: '/services/sec_node.jpg',
    accentColor: '#38bdf8',
    particleShape: 'shield',
    tags: ['Cyber Security', 'Zero-Trust', 'WAF & DDoS', 'PCI-DSS Compliance'],
    sections: [
      {
        heading: '1. Securing the Modern E-Commerce Attack Surface',
        paragraphs: [
          'Every third-party plugin, payment webhook, and API endpoint introduces potential vulnerabilities. EFerz hardens digital storefronts with Web Application Firewalls (WAF), automated malware scanning, and strict Content Security Policies (CSP).',
        ],
      },
      {
        heading: '2. Continuous Penetration Testing & 24/7 Incident Response',
        paragraphs: [
          'Our security engineers perform regular vulnerability assessments, SSL/TLS encryption audits, and automated off-site backups so your business stays resilient and online 99.99% of the time.',
        ],
      },
    ],
  },
];
