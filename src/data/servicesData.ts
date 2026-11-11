import { MorphShape } from './morphShapes';

export interface SubServiceCapability {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  deliverableTag: string;
  cardImage: string;
  bullets: [string, string, string];
}

export interface ServicePlatformTool {
  id: string;
  name: string;
  category: string;
  badgeColor: string;
  glyph: string;
  metric: string;
}

export interface ServiceCriteriaItem {
  label: string;
  benchmark: string;
  status: string;
}

export interface ServiceStoryImages {
  hero: string;
  node: string;
  core: string;
  deploy: string;
  videoUrl: string;
}

export interface ServiceStoryCopy {
  orbitalHeadline: string;
  orbitalSub: string;
  primaryNodeTitle: string;
  primaryNodeCode: string;
  primaryNodeTelemetry: string[];
  computeCoreTag: string;
  computeCoreModel: string;
  computeCoreSpec: string;
  intelligenceLayerTitle: string;
  deploymentTitle: string;
  deploymentStatement: string;
}

export interface OfficialEFerzService {
  id: string;
  num: string;
  slug: string;
  title: string;
  kicker: string;
  tagline: string;
  summary: string;
  environmentName: string;
  officialUrl: string;
  accentColor: string;
  secondaryColor: string;
  particleShape: MorphShape;
  particleScheme: 'white' | 'cyan' | 'amber' | 'emerald' | 'red';
  threeGeometry:
    | 'web-matrix'
    | 'marketing-rocket'
    | 'ecommerce-cube'
    | 'amazon-logistics'
    | 'social-orbit'
    | 'content-quill'
    | 'graphic-prism'
    | 'brand-diamond'
    | 'consulting-compass'
    | 'cyber-shield'
    | 'isp-fiber';
  storyImages: ServiceStoryImages;
  storyCopy: ServiceStoryCopy;
  metrics: { value: string; label: string }[];
  techStack: string[];
  platformTools: ServicePlatformTool[];
  criteriaChecklist: ServiceCriteriaItem[];
  capabilities: SubServiceCapability[];
}

export const OFFICIAL_EFERZ_SERVICES: OfficialEFerzService[] = [
  {
    id: 'web-design-development',
    num: '01',
    slug: 'web-design-development',
    title: 'Web Design & Development',
    kicker: 'HTML5 · CSS3 · JAVASCRIPT · REACT · NEXT.JS · PHP · WORDPRESS',
    tagline:
      'Custom website design and full-stack development — fast, mobile-responsive, and built to grow your business.',
    summary:
      'As a full-service digital agency, EFerz designs and develops modern, user-friendly websites and web applications using industry-leading languages and frameworks including HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Node.js, PHP, Python, WordPress, and Shopify.',
    environmentName: 'Custom Websites, Web Apps & CMS Development',
    officialUrl: 'https://eferz.com/services/web-design-development/',
    accentColor: '#38bdf8',
    secondaryColor: '#ec3935',
    particleShape: 'monitor',
    particleScheme: 'cyan',
    threeGeometry: 'web-matrix',
    storyImages: {
      hero: '/services/web_hero.jpg',
      node: '/services/web_node.jpg',
      core: '/services/web_core.jpg',
      deploy: '/services/web_deploy.jpg',
      videoUrl: '/services/vid_code.mp4',
    },
    storyCopy: {
      orbitalHeadline: 'WEB DESIGN & DEVELOPMENT',
      orbitalSub:
        'WE DESIGN AND BUILD CUSTOM BUSINESS WEBSITES, E-COMMERCE STORES, LANDING PAGES, AND WEB APPLICATIONS TAILORED TO YOUR BRAND.',
      primaryNodeTitle: 'WHAT OUR WEB AGENCY DELIVERS',
      primaryNodeCode: 'UI/UX DESIGN · FRONTEND & BACKEND CODING · CMS SETUP',
      primaryNodeTelemetry: [
        'CUSTOM UI/UX DESIGN IN FIGMA & ADOBE XD',
        'HTML5, CSS3, JAVASCRIPT, REACT & NEXT.JS',
        'BACKEND IN NODE.JS, PHP, LARAVEL & PYTHON',
        'WORDPRESS, SHOPIFY & CUSTOM ADMIN PANELS',
      ],
      computeCoreTag: 'LANGUAGES & TECH STACK',
      computeCoreModel: 'LANGUAGES & PLATFORMS WE USE',
      computeCoreSpec: 'FRONTEND · BACKEND · DATABASES · CMS PLATFORMS',
      intelligenceLayerTitle: 'WEBSITES & SERVICES WE PROVIDE',
      deploymentTitle: 'COMPLETE AGENCY CARE & LAUNCH',
      deploymentStatement:
        'From UI/UX wireframes and clean coding to SEO optimization, cloud hosting, and ongoing maintenance — we handle everything.',
    },
    metrics: [
      { value: '99.9%', label: 'Website Speed & Uptime' },
      { value: '100%', label: 'Mobile, Tablet & Desktop Ready' },
      { value: '24/7', label: 'Support & Maintenance Care' },
    ],
    techStack: [
      'HTML5 & CSS3 / Tailwind',
      'JavaScript & TypeScript',
      'React.js & Next.js',
      'Node.js & Express',
      'PHP & Laravel',
      'Python & Django',
      'WordPress & Elementor',
      'MySQL, PostgreSQL & MongoDB',
    ],
    platformTools: [
      { id: 'frontend', name: 'HTML5 · CSS3 · JavaScript', category: 'Core Frontend Languages', badgeColor: '#38bdf8', glyph: 'JS', metric: 'Pixel-Perfect UI' },
      { id: 'react', name: 'React.js · Next.js · Vue', category: 'Modern Web Frameworks', badgeColor: '#ec3935', glyph: '⚛', metric: 'Ultra-Fast Speed' },
      { id: 'backend', name: 'Node.js · PHP · Python', category: 'Backend & API Languages', badgeColor: '#22c55e', glyph: '</>', metric: 'Secure Server Logic' },
      { id: 'cms', name: 'WordPress · Shopify · Webflow', category: 'Easy Content Management', badgeColor: '#0284c7', glyph: 'WP', metric: '1-Click Editing' },
      { id: 'db', name: 'MySQL · PostgreSQL · MongoDB', category: 'Cloud Databases & Storage', badgeColor: '#f59e0b', glyph: 'DB', metric: 'Encrypted Data' },
      { id: 'design', name: 'Figma · Three.js · WebGL', category: 'UI/UX & 3D Interactive', badgeColor: '#a855f7', glyph: 'UI', metric: 'Modern Animations' },
    ],
    criteriaChecklist: [
      { label: 'Mobile, Tablet & 4K Desktop Responsive Design', benchmark: 'Works Perfectly on All Screens', status: 'INCLUDED' },
      { label: 'Google PageSpeed & Technical On-Page SEO Setup', benchmark: 'Fast Loading & Search Ready', status: 'OPTIMIZED' },
      { label: 'Easy-to-Use Admin Dashboard (Edit Text & Images Anytime)', benchmark: 'Full Training Provided', status: 'USER-FRIENDLY' },
      { label: 'Free SSL Security Certificate, Backups & Support', benchmark: 'Protected 24/7 Hosting Care', status: 'GUARANTEED' },
    ],
    capabilities: [
      {
        id: 'web-1',
        title: 'Custom Business & Corporate Websites',
        description:
          'Professional company websites designed from scratch to showcase your brand, services, portfolio, and build instant client trust.',
        iconKey: 'globe',
        deliverableTag: 'Corporate & Brand Sites',
        cardImage: '/services/web_hero.jpg',
        bullets: [
          'BESPOKE UI/UX DESIGN TAILORED TO YOUR BRAND',
          'MULTI-PAGE SERVICES, PORTFOLIO & CONTACT FORMS',
          'GOOGLE MAPS, WHATSAPP & LIVE CHAT INTEGRATION',
        ],
      },
      {
        id: 'web-2',
        title: 'Custom Web Applications (React, Next.js & Node.js)',
        description:
          'Interactive web applications, customer portals, booking systems, and SaaS platforms coded with modern JavaScript, TypeScript, and APIs.',
        iconKey: 'code',
        deliverableTag: 'Custom Web Apps',
        cardImage: '/services/web_node.jpg',
        bullets: [
          'BUILT WITH REACT, NEXT.JS, NODE.JS & PYTHON',
          'SECURE USER LOGIN, DASHBOARDS & ROLES',
          'REAL-TIME DATABASE & THIRD-PARTY API SYNC',
        ],
      },
      {
        id: 'web-3',
        title: 'WordPress & Custom CMS Websites',
        description:
          'Easy-to-manage websites built on WordPress or custom CMS panels so your team can update pages, blogs, and photos without coding.',
        iconKey: 'layers',
        deliverableTag: 'WordPress & CMS',
        cardImage: '/services/web_core.jpg',
        bullets: [
          'CUSTOM WORDPRESS THEMES & ELEMENTOR PRO',
          'EASY ADMIN PANEL FOR TEXT & IMAGE UPDATES',
          'BLOGGING, NEWS & SEO PLUGIN CONFIGURATION',
        ],
      },
      {
        id: 'web-4',
        title: 'E-Commerce & Online Store Development',
        description:
          'Complete online shopping websites with product catalogs, shopping carts, Stripe/PayPal/Card checkout, and order management.',
        iconKey: 'shoppingbag',
        deliverableTag: 'Online Stores',
        cardImage: '/services/web_deploy.jpg',
        bullets: [
          'SHOPIFY, WOOCOMMERCE & CUSTOM CART BUILDS',
          'CREDIT CARD, STRIPE, PAYPAL & APPLE PAY',
          'INVENTORY, COUPONS & ORDER TRACKING PANEL',
        ],
      },
      {
        id: 'web-5',
        title: 'High-Converting Landing Pages & Redesigns',
        description:
          'Fast, persuasive promotional landing pages for Google/Facebook ad campaigns, plus complete makeovers for outdated websites.',
        iconKey: 'zap',
        deliverableTag: 'Landing Pages & Redesign',
        cardImage: '/services/web_hero.jpg',
        bullets: [
          'CONVERSION-FOCUSED LAYOUTS FOR AD CAMPAIGNS',
          'MODERNIZE OLD WEBSITES WITH FRESH UI & SPEED',
          'LEAD CAPTURE FORMS CONNECTED TO YOUR CRM/EMAIL',
        ],
      },
      {
        id: 'web-6',
        title: 'Website Maintenance, Hosting & Speed Optimization',
        description:
          'Ongoing technical support, security updates, daily backups, bug fixing, and speed optimization to keep your website running smoothly.',
        iconKey: 'shield',
        deliverableTag: 'Maintenance & Care',
        cardImage: '/services/web_node.jpg',
        bullets: [
          'REGULAR SECURITY UPDATES & DAILY CLOUD BACKUPS',
          'SPEED OPTIMIZATION & BROKEN LINK FIXING',
          'DEDICATED AGENCY SUPPORT WHENEVER YOU NEED',
        ],
      },
    ],
  },
  {
    id: 'digital-marketing',
    num: '02',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    kicker: 'GOOGLE ADS · SEO · META · TIKTOK · CRO ANALYTICS',
    tagline:
      'Boost visibility, engage customers, drive growth, and maximize ROI across Google & Social Networks.',
    summary:
      'Full-funnel digital dominance combining Google Search & Display (SEO/PPC/SEM), Meta & TikTok performance ads, YouTube video marketing, Conversion Rate Optimization (CRO), and real-time GA4 revenue attribution.',
    environmentName: 'Omnichannel Growth & ROAS Attribution Engine',
    officialUrl: 'https://eferz.com/services/digital-marketing/',
    accentColor: '#ec3935',
    secondaryColor: '#f59e0b',
    particleShape: 'rocket',
    particleScheme: 'red',
    threeGeometry: 'marketing-rocket',
    storyImages: {
      hero: '/services/mkt_hero.jpg',
      node: '/services/mkt_node.jpg',
      core: '/services/mkt_core.jpg',
      deploy: '/services/mkt_deploy.jpg',
      videoUrl: '/services/vid_network.mp4',
    },
    storyCopy: {
      orbitalHeadline: '360° DIGITAL MARKETING',
      orbitalSub:
        'DRIVE QUALIFIED TRAFFIC, DOMINATE GOOGLE PAGE #1, AND SCALE PROFITABLE AD CAMPAIGNS ACROSS GOOGLE, META, TIKTOK, AND YOUTUBE.',
      primaryNodeTitle: 'MULTI-CHANNEL AD & SEO HUB',
      primaryNodeCode: 'GOOGLE SEO · PPC ADS · META & TIKTOK · CRO',
      primaryNodeTelemetry: [
        '3.8X VERIFIED AVERAGE AD ROAS',
        '+240% ORGANIC GOOGLE SEARCH GROWTH',
        'GOOGLE,INSTAGRAM, FB & TIKTOK ADS',
        'LIVE GA4 & CONVERSION TRACKING',
      ],
      computeCoreTag: 'ROI GROWTH ENGINE',
      computeCoreModel: '3.8X ROAS SCALE',
      computeCoreSpec: 'SEO · GOOGLE PPC · PAID SOCIAL · EMAIL · CRO FUNNELS',
      intelligenceLayerTitle: 'MARKETING CHANNELS',
      deploymentTitle: 'GLOBAL CAMPAIGN LAUNCH',
      deploymentStatement:
        'Data-driven marketing turns clicks and impressions into predictable leads, sales, and long-term customer loyalty.',
    },
    metrics: [
      { value: '3.8x', label: 'Verified Average ROAS' },
      { value: '+240%', label: 'Organic Google Traffic' },
      { value: '16', label: 'Omnichannel Ad Ecosystems' },
    ],
    techStack: ['Google Ads & SEM', 'Google Search Console', 'Meta Ads Manager', 'TikTok Business', 'GA4 & Looker Studio', 'SEMrush & Ahrefs'],
    platformTools: [
      { id: 'google-ads', name: 'Google Search & Ads', category: 'SEO · PPC · SEM Ranking', badgeColor: '#4285F4', glyph: 'G', metric: '#1 SERP & High ROAS' },
      { id: 'meta-ads', name: 'Meta & Instagram Ads', category: 'Retargeting & Lookalikes', badgeColor: '#E1306C', glyph: 'IG', metric: 'Pixel CAPI Synced' },
      { id: 'youtube', name: 'YouTube Video Ads', category: 'High-Retention Video', badgeColor: '#FF0000', glyph: '▶', metric: 'TrueView & Shorts' },
      { id: 'tiktok', name: 'TikTok & Snapchat Ads', category: 'Viral Gen-Z & Millennial', badgeColor: '#00F2FE', glyph: 'TT', metric: 'Spark Ads Funnel' },
      { id: 'linkedin', name: 'LinkedIn B2B Demand', category: 'Executive Lead Gen', badgeColor: '#0A66C2', glyph: 'in', metric: 'Decision-Maker ABM' },
      { id: 'ga4', name: 'Google Analytics 4 & CRO', category: 'Heatmap & Funnel ROI', badgeColor: '#F9AB00', glyph: 'GA4', metric: 'Real-Time Attribution' },
    ],
    criteriaChecklist: [
      { label: 'Google Page-1 Organic SEO & Technical Schema', benchmark: 'On-Page · Off-Page · Voice SEO', status: 'RANKING' },
      { label: 'Multi-Network Pixel & Server-Side CAPI Tracking', benchmark: 'Google · Meta · TikTok · Snap', status: 'VERIFIED' },
      { label: 'Conversion Rate Optimization (CRO) Split Testing', benchmark: 'A/B Landing Page Funnels', status: 'ACTIVE' },
      { label: 'ROAS & Cost-Per-Acquisition (CPA) Live Reporting', benchmark: '24/7 Looker Studio Dashboard', status: 'INCLUDED' },
    ],
    capabilities: [
      {
        id: 'dm-1',
        title: 'Search Engine Optimization (SEO) & Voice Search',
        description:
          'Improving organic website visibility in Google search results through technical on-page, off-page, and voice search optimization.',
        iconKey: 'search',
        deliverableTag: 'Google Organic #1',
        cardImage: '/services/mkt_hero.jpg',
        bullets: [
          'TECHNICAL ON-PAGE & SCHEMA AUDIT',
          'HIGH-AUTHORITY BACKLINK ACQUISITION',
          'VOICE & LOCAL SEARCH DOMINANCE',
        ],
      },
      {
        id: 'dm-2',
        title: 'Pay-Per-Click (PPC) & Search Engine Marketing (SEM)',
        description:
          'High-intent Google Search, Shopping, and Display ad campaigns engineered to capture immediate buyer demand.',
        iconKey: 'target',
        deliverableTag: 'Google PPC & SEM',
        cardImage: '/services/mkt_node.jpg',
        bullets: [
          'HIGH-INTENT KEYWORD BIDDING',
          'GOOGLE SHOPPING & PMAX CAMPAIGNS',
          'NEGATIVE KEYWORD & CPA GUARDRAILS',
        ],
      },
      {
        id: 'dm-3',
        title: 'Conversion Rate Optimization (CRO) & Web Analytics',
        description:
          'Using GA4 behavior analytics and heatmaps to optimize landing pages so a higher percentage of visitors convert.',
        iconKey: 'barchart',
        deliverableTag: 'GA4 & CRO Funnel',
        cardImage: '/services/mkt_core.jpg',
        bullets: [
          'HEATMAP & SCROLL-DEPTH TELEMETRY',
          'MULTIVARIATE LANDING PAGE TESTS',
          'CHECKOUT & FORM FRICTION REMOVAL',
        ],
      },
      {
        id: 'dm-4',
        title: 'Remarketing, Retargeting & Display Advertising',
        description:
          'Re-engaging past visitors with precision visual banners, video ads, and dynamic retargeting sequences across web and social.',
        iconKey: 'refresh',
        deliverableTag: 'Dynamic Retargeting',
        cardImage: '/services/mkt_deploy.jpg',
        bullets: [
          'DYNAMIC CATALOG RETARGETING',
          'CROSS-NETWORK AUDIENCE PIXELS',
          'ABANDONED CART RECOVERY SEQUENCES',
        ],
      },
      {
        id: 'dm-5',
        title: 'Email, Affiliate & Influencer Marketing',
        description:
          'Automated lifecycle email flows, commission-based affiliate programs, and high-trust creator collaborations.',
        iconKey: 'mail',
        deliverableTag: 'Retention & Creators',
        cardImage: '/services/mkt_hero.jpg',
        bullets: [
          'AUTOMATED KLAVIYO / CRM DRIP FLOWS',
          'VETTED CREATOR & AFFILIATE PARTNERS',
          'CUSTOMER LIFETIME VALUE (LTV) LIFT',
        ],
      },
      {
        id: 'dm-6',
        title: 'Video, Mobile & Online Public Relations (PR)',
        description:
          'YouTube/Reels video marketing, SMS mobile engagement, and online reputation management via digital PR outreach.',
        iconKey: 'megaphone',
        deliverableTag: 'Video & Digital PR',
        cardImage: '/services/mkt_node.jpg',
        bullets: [
          'YOUTUBE TRUEVIEW & REELS AD HOOKS',
          'DIRECT SMS & MOBILE CAMPAIGNS',
          'DIGITAL PR & AUTHORITY PLACEMENTS',
        ],
      },
    ],
  },
  {
    id: 'e-commerce-solution',
    num: '03',
    slug: 'e-commerce-solution',
    title: 'E-Commerce Solution',
    kicker: 'SHOPIFY PLUS · WOOCOMMERCE · MAGENTO · MULTICHANNEL',
    tagline:
      'Comprehensive e-commerce solutions: build, manage, and scale your global online store.',
    summary:
      'Tailored e-commerce ecosystems designed to enhance online stores, boost checkout conversion, and synchronize inventory across Shopify, WooCommerce, Magento, BigCommerce, Stripe, and 3PL fulfillment networks.',
    environmentName: 'Omnichannel Retail & Payment Reactor',
    officialUrl: 'https://eferz.com/services/e-commerce-solution/',
    accentColor: '#f59e0b',
    secondaryColor: '#ec3935',
    particleShape: 'cart',
    particleScheme: 'amber',
    threeGeometry: 'ecommerce-cube',
    storyImages: {
      hero: '/services/ecom_hero.jpg',
      node: '/services/ecom_node.jpg',
      core: '/services/ecom_core.jpg',
      deploy: '/services/ecom_deploy.jpg',
      videoUrl: '/services/vid_commerce.mp4',
    },
    storyCopy: {
      orbitalHeadline: 'E-COMMERCE STOREFRONTS',
      orbitalSub:
        'BUILD, MANAGE, AND SCALE HIGH-CONVERTING ONLINE STORES ON SHOPIFY, WOOCOMMERCE, AND MAGENTO WITH SEAMLESS GLOBAL CHECKOUT.',
      primaryNodeTitle: 'ONLINE STORE & CHECKOUT HUB',
      primaryNodeCode: 'SHOPIFY PLUS · WOOCOMMERCE · STRIPE & PAYPAL',
      primaryNodeTelemetry: [
        'FRICTIONLESS 1-CLICK CHECKOUT FLOW',
        '135+ CURRENCIES & DIGITAL WALLETS',
        'AUTOMATED INVENTORY & 3PL SYNC',
        'AMAZON, EBAY & SOCIAL STORE SYNC',
      ],
      computeCoreTag: 'RETAIL COMMERCE ENGINE',
      computeCoreModel: '24/7 ONLINE STORE',
      computeCoreSpec: 'CUSTOM STOREFRONTS · PAYMENTS · INVENTORY · M-COMMERCE',
      intelligenceLayerTitle: 'E-COMMERCE MODULES',
      deploymentTitle: 'GLOBAL STORE LAUNCH',
      deploymentStatement:
        'A seamless shopping experience turns first-time store visitors into repeat global customers.',
    },
    metrics: [
      { value: '20+', label: 'Retail & Checkout Modules' },
      { value: '99.99%', label: 'PCI-DSS Checkout Uptime' },
      { value: '360°', label: 'ERP & 3PL Sync' },
    ],
    techStack: ['Shopify Plus', 'WooCommerce', 'Magento', 'BigCommerce', 'Stripe & PayPal', '3PL Logistics'],
    platformTools: [
      { id: 'shopify', name: 'Shopify & Shopify Plus', category: 'High-Velocity Storefront', badgeColor: '#95BF47', glyph: 'S+', metric: '1-Click Checkout' },
      { id: 'woo', name: 'WooCommerce Enterprise', category: 'Custom WordPress Retail', badgeColor: '#96588A', glyph: 'W', metric: 'Full Ownership' },
      { id: 'stripe', name: 'Stripe · PayPal · ApplePay', category: 'Global Payment Gateways', badgeColor: '#635BFF', glyph: '💳', metric: '135+ Currencies' },
      { id: 'magento', name: 'Magento & BigCommerce', category: 'B2B & Multi-Warehouse', badgeColor: '#F46F25', glyph: 'M', metric: '100K+ SKU Ready' },
      { id: '3pl', name: '3PL & Inventory ERP', category: 'Order & Stock Automation', badgeColor: '#38bdf8', glyph: '📦', metric: 'Real-Time Stock' },
      { id: 'mcom', name: 'Mobile Commerce (M-App)', category: 'iOS & Android Shopping', badgeColor: '#ec3935', glyph: '📱', metric: 'Push Retention' },
    ],
    criteriaChecklist: [
      { label: 'Frictionless 1-Page Checkout & Multi-Currency Gateways', benchmark: 'Stripe · PayPal · Wallets', status: 'INTEGRATED' },
      { label: 'Automated Inventory, Order & 3PL Fulfillment Sync', benchmark: 'Real-Time SKU Tracking', status: 'AUTOMATED' },
      { label: 'Multichannel Catalog Sync (Amazon · eBay · Social)', benchmark: 'Unified Central Hub', status: 'SYNCED' },
      { label: 'PCI-DSS Level 1 Compliance & Fraud Detection Shield', benchmark: 'SSL + Chargeback Guard', status: 'PROTECTED' },
    ],
    capabilities: [
      {
        id: 'ec-1',
        title: 'Platform Setup & Custom Storefront Development',
        description:
          'End-to-end architecture and configuration on Shopify, WooCommerce, Magento, BigCommerce, and headless commerce.',
        iconKey: 'shoppingbag',
        deliverableTag: 'Flagship Storefront',
        cardImage: '/services/ecom_hero.jpg',
        bullets: [
          'SHOPIFY PLUS & WOOCOMMERCE BUILDS',
          'BESPOKE UX & PRODUCT FILTERING',
          'SUB-SECOND CATALOG PAGE LOADS',
        ],
      },
      {
        id: 'ec-2',
        title: 'Payment Processing & PCI-DSS Security',
        description:
          'Secure payment gateway integration supporting credit cards, PayPal, and digital wallets with fraud detection.',
        iconKey: 'creditcard',
        deliverableTag: 'Secure Gateways',
        cardImage: '/services/ecom_node.jpg',
        bullets: [
          'STRIPE, PAYPAL & APPLE PAY EXPRESS',
          'MULTI-CURRENCY & TAX AUTOMATION',
          'CHARGEBACK & FRAUD SHIELDING',
        ],
      },
      {
        id: 'ec-3',
        title: 'Order, Inventory & 3PL Logistics Management',
        description:
          'Real-time stock tracking, supplier forecasting, automated order processing, and 3PL fulfillment integration.',
        iconKey: 'package',
        deliverableTag: 'Inventory & 3PL',
        cardImage: '/services/ecom_core.jpg',
        bullets: [
          'AUTOMATED WAREHOUSE ORDER ROUTING',
          'LOW-STOCK & REORDER FORECASTING',
          'LIVE CARRIER TRACKING WEBHOOKS',
        ],
      },
      {
        id: 'ec-4',
        title: 'Multichannel Selling & Marketplace Integration',
        description:
          'Synchronizing central e-commerce catalogs with global marketplaces including Amazon, eBay, and social storefronts.',
        iconKey: 'globe',
        deliverableTag: 'Omnichannel Sync',
        cardImage: '/services/ecom_deploy.jpg',
        bullets: [
          'UNIFIED AMAZON, EBAY & TIKTOK SHOP',
          'CENTRALIZED INVENTORY DEDUCTION',
          'CROSS-BORDER LOCALIZED PRICING',
        ],
      },
      {
        id: 'ec-5',
        title: 'Mobile Commerce (M-Commerce) & Personalization',
        description:
          'Mobile-first shopping experiences, dynamic product recommendations, subscription billing, and CRM integration.',
        iconKey: 'smartphone',
        deliverableTag: 'M-Commerce & CRM',
        cardImage: '/services/ecom_hero.jpg',
        bullets: [
          'THUMB-FRIENDLY MOBILE CHECKOUT',
          'DYNAMIC UPSELL & BUNDLE ENGINE',
          'RECURRING SUBSCRIPTION BILLING',
        ],
      },
      {
        id: 'ec-6',
        title: 'Product Listing Optimization & Return Management',
        description:
          'High-converting catalog management, e-commerce SEO, support automation, and streamlined return/exchange workflows.',
        iconKey: 'refresh',
        deliverableTag: 'Catalog & Returns',
        cardImage: '/services/ecom_node.jpg',
        bullets: [
          'CONVERSION-ENGINEERED SKU PAGES',
          'SELF-SERVICE EXCHANGE PORTALS',
          'AUTOMATED CUSTOMER CARE FLOWS',
        ],
      },
    ],
  },
  {
    id: 'amazon-fba',
    num: '04',
    slug: 'amazon-fba',
    title: 'Amazon FBA',
    kicker: 'SELLER CENTRAL · SOURCING · BUY-BOX · ARBITRAGE',
    tagline:
      'Comprehensive Amazon FBA solutions: optimize listings, manage inventory, and dominate the Buy Box.',
    summary:
      'End-to-end Amazon FBA empire building — from verified manufacturer sourcing and Seller Central onboarding to FNSKU warehouse prep, A+ listing optimization, Sponsored PPC, and high-margin Online & Retail Arbitrage.',
    environmentName: 'Global Amazon Fulfillment & Buy-Box Matrix',
    officialUrl: 'https://eferz.com/services/amazon-fba/',
    accentColor: '#fb923c',
    secondaryColor: '#facc15',
    particleShape: 'parcel',
    particleScheme: 'amber',
    threeGeometry: 'amazon-logistics',
    storyImages: {
      hero: '/services/fba_hero.jpg',
      node: '/services/fba_node.jpg',
      core: '/services/fba_core.jpg',
      deploy: '/services/fba_deploy.jpg',
      videoUrl: '/services/vid_cyber.mp4',
    },
    storyCopy: {
      orbitalHeadline: 'AMAZON FBA AUTOMATION',
      orbitalSub:
        'END-TO-END AMAZON STORE MANAGEMENT — FROM PROFITABLE PRODUCT SOURCING AND FBA PREP TO A+ LISTINGS AND BUY-BOX DOMINANCE.',
      primaryNodeTitle: 'SELLER CENTRAL & SOURCING HUB',
      primaryNodeCode: 'PRODUCT SOURCING · FBA PREP · BUY-BOX WIN',
      primaryNodeTelemetry: [
        '100% PRIME-COMPLIANT FBA PREP',
        'VETTED FACTORY & WHOLESALE SUPPLIERS',
        'ONLINE & RETAIL ARBITRAGE DEALS',
        'A+ CONTENT & SPONSORED ADS PPC',
      ],
      computeCoreTag: 'AMAZON SELLER ENGINE',
      computeCoreModel: 'PRIME BUY-BOX',
      computeCoreSpec: 'SOURCING · SELLER SETUP · FBA LABELS · ARBITRAGE · PPC',
      intelligenceLayerTitle: 'AMAZON FBA SERVICES',
      deploymentTitle: 'GLOBAL MARKETPLACE SCALE',
      deploymentStatement:
        'Verified product sourcing and expert FBA management build profitable, hands-free Amazon storefronts.',
    },
    metrics: [
      { value: 'Prime', label: '100% FBA Prep Compliance' },
      { value: 'Buy-Box', label: 'Algorithmic Price & PPC Win' },
      { value: 'Global', label: 'Verified Supplier Network' },
    ],
    techStack: ['Amazon Seller Central', 'Helium 10 & Jungle Scout', 'Keepa Price Analytics', 'FNSKU Prep & Routing', 'Amazon Brand Registry', 'Sponsored Ads PPC'],
    platformTools: [
      { id: 'seller', name: 'Amazon Seller Central', category: 'Storefront & Brand Registry', badgeColor: '#FF9900', glyph: 'a', metric: '100% Account Health' },
      { id: 'sourcing', name: 'Global Supplier Sourcing', category: 'Factory & Wholesale', badgeColor: '#facc15', glyph: '🏭', metric: 'High-Margin Landed' },
      { id: 'helium', name: 'Helium 10 & Keepa AI', category: 'Keyword & Demand Intel', badgeColor: '#38bdf8', glyph: 'H10', metric: 'Top BSR Velocity' },
      { id: 'fnsku', name: 'FBA Prep & Shipment Labels', category: 'Warehouse Routing', badgeColor: '#22c55e', glyph: '📦', metric: 'Zero Inbound Defect' },
      { id: 'arbitrage', name: 'Online & Retail Arbitrage', category: 'Fast-Turn ROI Flips', badgeColor: '#ec3935', glyph: '📈', metric: 'Verified ROI Margin' },
      { id: 'ppc', name: 'Amazon Sponsored PPC', category: 'ACoS & TACoS Scaling', badgeColor: '#a855f7', glyph: '⚡', metric: 'Buy-Box Dominance' },
    ],
    criteriaChecklist: [
      { label: 'Verified Product Sourcing & Landed Profit Calculation', benchmark: '30%+ Target Net Margin', status: 'VERIFIED' },
      { label: 'Seller Central Verification & Brand Registry Protection', benchmark: 'Zero Policy Violations', status: 'APPROVED' },
      { label: 'FNSKU Barcode, Box Content & FBA Warehouse Routing', benchmark: 'Prime-Ready Inbound', status: 'COMPLIANT' },
      { label: 'Online & Retail Arbitrage + A+ Listing Optimization', benchmark: 'High-Velocity Buy Box', status: 'ACTIVE' },
    ],
    capabilities: [
      {
        id: 'fba-1',
        title: 'Expert Product Sourcing',
        description:
          'Vetted global product sourcing delivering high-margin quality goods, competitive manufacturing prices, and reliable suppliers.',
        iconKey: 'package',
        deliverableTag: 'Verified Suppliers',
        cardImage: '/services/fba_hero.jpg',
        bullets: [
          'VETTED MANUFACTURER & WHOLESALE NETWORK',
          'LANDED FBA FEE & MARGIN MODELING',
          'QUALITY INSPECTION & SAMPLE AUDIT',
        ],
      },
      {
        id: 'fba-2',
        title: 'Amazon Account Creation & Store Setup',
        description:
          'Seamless Seller Central onboarding, rapid verification approval, brand registry guidance, and hassle-free launch.',
        iconKey: 'shield',
        deliverableTag: 'Seller Central Setup',
        cardImage: '/services/fba_node.jpg',
        bullets: [
          'SELLER CENTRAL VERIFICATION PASS',
          'AMAZON BRAND REGISTRY ENROLLMENT',
          'ACCOUNT HEALTH & COMPLIANCE GUARD',
        ],
      },
      {
        id: 'fba-3',
        title: 'FBA Shipment Labels & Prep Logistics',
        description:
          'Effortless FNSKU/shipment labeling and warehouse routing to streamline logistics and ensure compliant Amazon deliveries.',
        iconKey: 'truck',
        deliverableTag: 'FBA Warehouse Routing',
        cardImage: '/services/fba_core.jpg',
        bullets: [
          'FNSKU BARCODE & POLY-BAG PREP',
          'OPTIMIZED MULTI-FC SHIPMENT SPLITS',
          'ZERO INBOUND DEFECT COMPLIANCE',
        ],
      },
      {
        id: 'fba-4',
        title: 'Online & Retail Arbitrage',
        description:
          'Data-backed Online & Retail Arbitrage strategies engineered to unlock profitable inventory opportunities and maximize ROI.',
        iconKey: 'trending',
        deliverableTag: 'High-ROI Arbitrage',
        cardImage: '/services/fba_deploy.jpg',
        bullets: [
          'KEEPA & BSR VELOCITY DEAL SCANNING',
          'UNGATING & CATEGORY APPROVALS',
          'RAPID CAPITAL TURNOVER FLIPS',
        ],
      },
      {
        id: 'fba-5',
        title: 'A+ Listing Optimization & Keyword Indexing',
        description:
          'High-converting product titles, bullet points, backend search terms, and Enhanced Brand Content (A+) that win the Buy Box.',
        iconKey: 'award',
        deliverableTag: 'Buy-Box Dominance',
        cardImage: '/services/fba_hero.jpg',
        bullets: [
          'HELIUM 10 BACKEND KEYWORD INDEXING',
          'ENHANCED BRAND CONTENT (A+ MODULES)',
          'CONVERSION-FOCUSED LISTING GRAPHICS',
        ],
      },
      {
        id: 'fba-6',
        title: 'Amazon PPC & Inventory Health Management',
        description:
          'Sponsored Products ad management paired with IPI score monitoring and restock forecasting to prevent stockouts.',
        iconKey: 'barchart',
        deliverableTag: 'PPC & Restock AI',
        cardImage: '/services/fba_node.jpg',
        bullets: [
          'LOW-ACOS SPONSORED PRODUCTS & BRANDS',
          'IPI SCORE & STORAGE FEE OPTIMIZATION',
          'PREDICTIVE RESTOCK VELOCITY ALERTS',
        ],
      },
    ],
  },
  {
    id: 'social-accounts-management',
    num: '05',
    slug: 'social-accounts-management',
    title: 'Social Accounts Management',
    kicker: 'INSTAGRAM · FACEBOOK · LINKEDIN · TIKTOK · X · SNAPCHAT',
    tagline:
      'Effective social accounts management: engage audiences, grow presence, and boost brand authority.',
    summary:
      'Complete 360° social media command across Instagram, Facebook, LinkedIn, TikTok, X, and Snapchat — combining daily viral content creation, 24/7 community management, influencer collaborations, and social listening.',
    environmentName: 'Multi-Network Social Command Hub',
    officialUrl: 'https://eferz.com/services/social-accounts-management/',
    accentColor: '#e879f9',
    secondaryColor: '#ec3935',
    particleShape: 'headphones',
    particleScheme: 'red',
    threeGeometry: 'social-orbit',
    storyImages: {
      hero: '/services/soc_hero.jpg',
      node: '/services/soc_node.jpg',
      core: '/services/soc_core.jpg',
      deploy: '/services/soc_deploy.jpg',
      videoUrl: '/services/vid_network.mp4',
    },
    storyCopy: {
      orbitalHeadline: 'SOCIAL MEDIA MANAGEMENT',
      orbitalSub:
        'GROW YOUR AUDIENCE, PUBLISH VIRAL REELS & CAROUSELS, AND ENGAGE FOLLOWERS 24/7 ACROSS INSTAGRAM, FACEBOOK, LINKEDIN, TIKTOK & X.',
      primaryNodeTitle: 'DAILY CONTENT & COMMUNITY STUDIO',
      primaryNodeCode: 'INSTAGRAM · TIKTOK · LINKEDIN · FACEBOOK · X',
      primaryNodeTelemetry: [
        '6+ SOCIAL PLATFORMS MANAGED DAILY',
        'DAILY REELS, STORIES & CAROUSELS',
        '24/7 COMMUNITY DM & COMMENT CARE',
        'INFLUENCER & PAID SOCIAL CAMPAIGNS',
      ],
      computeCoreTag: 'SOCIAL BRAND STUDIO',
      computeCoreModel: '360° SOCIAL CARE',
      computeCoreSpec: 'CONTENT CALENDAR · REELS · COMMUNITY · INFLUENCER PR',
      intelligenceLayerTitle: 'SOCIAL MEDIA PILLARS',
      deploymentTitle: 'VIRAL AUDIENCE GROWTH',
      deploymentStatement:
        'Consistent creative storytelling and active community care turn followers into loyal brand fans.',
    },
    metrics: [
      { value: '6+', label: 'Managed Social Networks' },
      { value: '24/7', label: 'Community & DM Response' },
      { value: '12', label: 'Social Growth Modules' },
    ],
    techStack: ['Instagram & Reels', 'Facebook Business', 'LinkedIn B2B', 'TikTok Creator Studio', 'Snapchat & X', 'Social Listening AI'],
    platformTools: [
      { id: 'ig', name: 'Instagram & Reels Hub', category: 'Visual Grid · Stories · Reels', badgeColor: '#E1306C', glyph: 'IG', metric: 'High Engagement' },
      { id: 'fb', name: 'Facebook Community & Ads', category: 'Page · Groups · Meta Suite', badgeColor: '#1877F2', glyph: 'f', metric: 'Full Funnel Reach' },
      { id: 'li', name: 'LinkedIn Executive Brand', category: 'B2B Thought Leadership', badgeColor: '#0A66C2', glyph: 'in', metric: 'C-Suite Authority' },
      { id: 'tt', name: 'TikTok Short-Form Viral', category: 'Trend Audio & Creator Hooks', badgeColor: '#00F2FE', glyph: 'TT', metric: 'Organic Reach' },
      { id: 'x', name: 'X (Twitter) & Threads', category: 'Real-Time Brand Voice', badgeColor: '#a1a1aa', glyph: '𝕏', metric: 'Viral Conversations' },
      { id: 'snap', name: 'Snapchat & Influencer PR', category: 'AR Lenses & Story Ads', badgeColor: '#FFFC00', glyph: '👻', metric: 'GCC & US Youth' },
    ],
    criteriaChecklist: [
      { label: 'Cross-Network Visual & Bio Consistency Audit', benchmark: 'IG · FB · LI · TikTok · X · Snap', status: 'UNIFIED' },
      { label: 'Automated Content Calendar & Peak-Hour Scheduling', benchmark: 'Daily Reels, Carousels & Stories', status: 'SCHEDULED' },
      { label: 'Active Community Management & Crisis Reputation Guard', benchmark: '< 15 Min Response SLA', status: '24/7 LIVE' },
      { label: 'Monthly Engagement, Reach & Competitor Benchmark Report', benchmark: 'Full Attribution Deck', status: 'INCLUDED' },
    ],
    capabilities: [
      {
        id: 'sam-1',
        title: 'Profile Optimization & Platform-Specific Strategy',
        description:
          'Creating and optimizing social profiles with tailored strategies for Instagram, Facebook, LinkedIn, X, and Snapchat.',
        iconKey: 'users',
        deliverableTag: 'Brand Authority',
        cardImage: '/services/soc_hero.jpg',
        bullets: [
          'UNIFIED BIO, HIGHLIGHTS & VISUAL GRID',
          'PLATFORM-NATIVE GROWTH PLAYBOOKS',
          'VERIFICATION & AUTHORITY POSITIONING',
        ],
      },
      {
        id: 'sam-2',
        title: 'Content Creation, Curation & Scheduling',
        description:
          'Developing visually stunning, brand-consistent posts, reels, and stories backed by automated publishing calendars.',
        iconKey: 'sparkles',
        deliverableTag: 'Daily Content Engine',
        cardImage: '/services/soc_node.jpg',
        bullets: [
          'HIGH-RETENTION REELS & TIKTOK EDITS',
          'EDITORIAL CAROUSELS & STORY SEQUENCES',
          'PEAK-ALGORITHM AUTO-SCHEDULING',
        ],
      },
      {
        id: 'sam-3',
        title: 'Community & Reputation Management',
        description:
          'Actively engaging with followers, responding to messages, fostering brand community, and handling public perception.',
        iconKey: 'message',
        deliverableTag: '24/7 Community Care',
        cardImage: '/services/soc_core.jpg',
        bullets: [
          'RAPID DM & COMMENT MODERATION',
          'PROACTIVE AUDIENCE CONVERSATION',
          'BRAND SENTIMENT & REPUTATION SHIELD',
        ],
      },
      {
        id: 'sam-4',
        title: 'Paid Social Media Advertising & Campaigns',
        description:
          'Executing targeted paid social ad campaigns and influencer collaborations to expand reach and drive conversions.',
        iconKey: 'target',
        deliverableTag: 'Paid Social ROAS',
        cardImage: '/services/soc_deploy.jpg',
        bullets: [
          'BOOSTED REELS & SPARK AD AMPLIFICATION',
          'LOOKALIKE & CUSTOM AUDIENCE FUNNELS',
          'LEAD GENERATION & SHOPPING TAGS',
        ],
      },
      {
        id: 'sam-5',
        title: 'Social Listening, Competitor Analysis & Reporting',
        description:
          'Tracking brand mentions, industry trends, competitor benchmarks, and actionable analytics to refine growth.',
        iconKey: 'barchart',
        deliverableTag: 'Sentiment & Insights',
        cardImage: '/services/soc_hero.jpg',
        bullets: [
          'REAL-TIME BRAND MENTION TRACKING',
          'COMPETITOR SHARE-OF-VOICE AUDITS',
          'EXECUTIVE MONTHLY KPI REPORTING',
        ],
      },
      {
        id: 'sam-6',
        title: 'Influencer Collaboration & Crisis Response',
        description:
          'Vetting and managing creator partnerships while protecting brand equity with rapid reputation management protocols.',
        iconKey: 'shield',
        deliverableTag: 'Creator Partnerships',
        cardImage: '/services/soc_node.jpg',
        bullets: [
          'AUTHENTIC CREATOR SEEDING & BRIEFS',
          'CAMPAIGN ROI & UGC RIGHTS MANAGEMENT',
          '24/7 CRISIS COMMUNICATION PROTOCOL',
        ],
      },
    ],
  },
  {
    id: 'content-writing',
    num: '06',
    slug: 'content-writing',
    title: 'Content Writing',
    kicker: 'SEO COPYWRITING · WHITE PAPERS · SCRIPTS · PRODUCT PROSE',
    tagline:
      'Crafting compelling content: engage, inform, and captivate your audience effortlessly.',
    summary:
      'Compelling narratives tailored to resonate with global audiences and search engines alike — spanning website copy, SEO articles, technical documentation, B2B white papers, e-commerce product descriptions, and video scripts.',
    environmentName: 'Editorial Publishing & Narrative Monolith',
    officialUrl: 'https://eferz.com/services/content-writing/',
    accentColor: '#34d399',
    secondaryColor: '#38bdf8',
    particleShape: 'pen',
    particleScheme: 'emerald',
    threeGeometry: 'content-quill',
    storyImages: {
      hero: '/services/cw_hero.jpg',
      node: '/services/cw_node.jpg',
      core: '/services/cw_core.jpg',
      deploy: '/services/cw_deploy.jpg',
      videoUrl: '/services/vid_code.mp4',
    },
    storyCopy: {
      orbitalHeadline: 'CREATIVE CONTENT WRITING',
      orbitalSub:
        'CAPTIVATE READERS AND RANK HIGHER ON GOOGLE WITH PERSUASIVE WEBSITE COPY, SEO BLOG ARTICLES, PRODUCT DESCRIPTIONS, AND VIDEO SCRIPTS.',
      primaryNodeTitle: 'EDITORIAL & SEO COPYWRITING DESK',
      primaryNodeCode: 'WEBSITE COPY · SEO BLOGS · WHITE PAPERS · SCRIPTS',
      primaryNodeTelemetry: [
        '100% ORIGINAL HUMAN-WRITTEN COPY',
        'SEO KEYWORD-OPTIMIZED ARTICLES',
        'PERSUASIVE WEBSITE & LANDING COPY',
        'E-COMMERCE SKU & VIDEO SCRIPTS',
      ],
      computeCoreTag: 'EDITORIAL STUDIO',
      computeCoreModel: '12+ WRITING FORMATS',
      computeCoreSpec: 'WEB COPY · BLOGS · TECHNICAL DOCS · WHITE PAPERS',
      intelligenceLayerTitle: 'WRITING SPECIALTIES',
      deploymentTitle: 'AUTHORITATIVE PUBLISHING',
      deploymentStatement:
        'Clear, persuasive words inspire trust, rank on search engines, and turn readers into customers.',
    },
    metrics: [
      { value: '12', label: 'Editorial & Technical Formats' },
      { value: '100%', label: 'Original Human-Crafted Prose' },
      { value: 'SEO+', label: 'Semantic Keyword Authority' },
    ],
    techStack: ['SEO Keyword Research', 'Website Conversion Copy', 'Technical Documentation', 'B2B White Papers', 'E-Commerce Catalog Copy', 'Video & Ad Scripts'],
    platformTools: [
      { id: 'webcopy', name: 'Website & Landing Copy', category: 'Conversion Architecture', badgeColor: '#34d399', glyph: '✍', metric: 'High-Converting CTA' },
      { id: 'seoblog', name: 'SEO Blogs & Pillar Articles', category: 'Google Organic Traffic', badgeColor: '#38bdf8', glyph: 'SEO', metric: 'Topical Authority' },
      { id: 'techdoc', name: 'Technical & API Manuals', category: 'Software & Engineering Docs', badgeColor: '#60a5fa', glyph: '</>', metric: 'Crystal Clear Spec' },
      { id: 'whitepaper', name: 'B2B White Papers & Reports', category: 'Executive Lead Magnets', badgeColor: '#a855f7', glyph: '📄', metric: 'Research Backed' },
      { id: 'prodcopy', name: 'E-Commerce Product Copy', category: 'Shopify & Amazon Descriptions', badgeColor: '#f59e0b', glyph: '🛍', metric: 'Persuasive SKU Copy' },
      { id: 'scripts', name: 'Video & Podcast Scripts', category: 'YouTube · Reels · Commercials', badgeColor: '#ec3935', glyph: '🎬', metric: 'High Retention Hook' },
    ],
    criteriaChecklist: [
      { label: '100% Plagiarism-Free & Brand-Voice Calibrated Prose', benchmark: 'Editorial Quality Audit', status: 'GUARANTEED' },
      { label: 'Search Intent & Semantic NLP Keyword Integration', benchmark: 'SurferSEO / Semrush Aligned', status: 'OPTIMIZED' },
      { label: 'Persuasive Conversion Copywriting Framework (AIDA/PAS)', benchmark: 'Action-Driven Headlines', status: 'INCLUDED' },
      { label: 'Multi-Format Delivery (Web, Whitepapers, Scripts, Email)', benchmark: '12 Content Disciplines', status: 'READY' },
    ],
    capabilities: [
      {
        id: 'cw-1',
        title: 'Website Copy & E-Commerce Product Descriptions',
        description:
          'High-converting copy for homepages, about pages, service breakdowns, and persuasive e-commerce catalog descriptions.',
        iconKey: 'filetext',
        deliverableTag: 'Conversion Copy',
        cardImage: '/services/cw_hero.jpg',
        bullets: [
          'AIDA & PAS CONVERSION FRAMEWORKS',
          'BENEFIT-DRIVEN E-COMMERCE SKU COPY',
          'BRAND VOICE & TONE CALIBRATION',
        ],
      },
      {
        id: 'cw-2',
        title: 'SEO Content, Blog Posts & Guest Articles',
        description:
          'Informative, keyword-optimized articles and guest publications engineered to boost organic search rankings.',
        iconKey: 'search',
        deliverableTag: 'SEO Authority',
        cardImage: '/services/cw_node.jpg',
        bullets: [
          'TOPICAL CLUSTER & PILLAR ARTICLES',
          'SEMANTIC NLP KEYWORD OPTIMIZATION',
          'AUTHORITATIVE GUEST PUBLICATIONS',
        ],
      },
      {
        id: 'cw-3',
        title: 'Technical Writing, White Papers & Research',
        description:
          'Detailed software manuals, product documentation, B2B white papers, and academic/industry research reports.',
        iconKey: 'book',
        deliverableTag: 'Technical & Whitepapers',
        cardImage: '/services/cw_core.jpg',
        bullets: [
          'SOFTWARE & API DOCUMENTATION',
          'RESEARCH-BACKED B2B WHITE PAPERS',
          'EXECUTIVE CASE STUDIES & REPORTS',
        ],
      },
      {
        id: 'cw-4',
        title: 'Video Scripts, Newsletters & Social Copy',
        description:
          'Engaging scripts for commercial videos and podcasts alongside retention email newsletters and punchy social copy.',
        iconKey: 'pen',
        deliverableTag: 'Scripts & Campaigns',
        cardImage: '/services/cw_deploy.jpg',
        bullets: [
          'HIGH-RETENTION VIDEO & AD SCRIPTS',
          'LIFECYCLE EMAIL DRIP SEQUENCES',
          'SPEECHES, PR RELEASES & GRANT PROSE',
        ],
      },
    ],
  },
  {
    id: 'graphic-designing',
    num: '07',
    slug: 'graphic-designing',
    title: 'Graphic Designing',
    kicker: 'LOGO SUITE · UI/UX · PRINT & PACKAGING · AD CREATIVE',
    tagline:
      'Creative graphic design: visually stunning, brand-consistent, and engaging visual solutions.',
    summary:
      'Artful visual direction across digital and physical media — combining signature logo design, brand identity systems, web UI layouts, print packaging, advertising campaigns, publication layouts, and custom iconography.',
    environmentName: 'Visual Design & Chromatic Atelier',
    officialUrl: 'https://eferz.com/services/graphic-designing/',
    accentColor: '#f43f5e',
    secondaryColor: '#a855f7',
    particleShape: 'palette',
    particleScheme: 'amber',
    threeGeometry: 'graphic-prism',
    storyImages: {
      hero: '/services/gd_hero.jpg',
      node: '/services/gd_node.jpg',
      core: '/services/gd_core.jpg',
      deploy: '/services/gd_deploy.jpg',
      videoUrl: '/services/vid_commerce.mp4',
    },
    storyCopy: {
      orbitalHeadline: 'CREATIVE GRAPHIC DESIGN',
      orbitalSub:
        'ELEVATE YOUR VISUAL IDENTITY WITH SIGNATURE LOGOS, MODERN UI/UX LAYOUTS, RETAIL PACKAGING, AND THUMB-STOPPING AD CREATIVES.',
      primaryNodeTitle: 'VISUAL DESIGN & BRAND STUDIO',
      primaryNodeCode: 'LOGO DESIGN · UI/UX · PACKAGING · AD CREATIVE',
      primaryNodeTelemetry: [
        'SIGNATURE GOLDEN-RATIO LOGO DESIGN',
        'PRINT-READY CMYK & DIGITAL ASSETS',
        'RETAIL PACKAGING & BROCHURE LAYOUTS',
        'MASTER VECTOR FILES (AI, EPS, SVG, PDF)',
      ],
      computeCoreTag: 'CREATIVE DESIGN STUDIO',
      computeCoreModel: '9 DESIGN CRAFTS',
      computeCoreSpec: 'LOGOS · WEB UI · PACKAGING · BILLBOARDS · PITCH DECKS',
      intelligenceLayerTitle: 'DESIGN DELIVERABLES',
      deploymentTitle: 'VISUAL BRAND EXCELLENCE',
      deploymentStatement:
        'Striking graphic design captures instant attention and makes your brand unforgettable.',
    },
    metrics: [
      { value: '9', label: 'Visual Design Disciplines' },
      { value: 'Vector', label: 'Infinite Resolution Master' },
      { value: 'Print+Web', label: 'CMYK & sRGB Calibrated' },
    ],
    techStack: ['Adobe Illustrator', 'Photoshop & InDesign', 'Figma UI/UX Systems', '3D Packaging Mockups', 'Custom Vector Icons', 'Print Pre-Press'],
    platformTools: [
      { id: 'logo', name: 'Logo & Monogram Craft', category: 'Vector Brand Marks', badgeColor: '#f43f5e', glyph: '✦', metric: 'Golden Ratio Grid' },
      { id: 'figma', name: 'Web UI & Design Systems', category: 'Interactive Interfaces', badgeColor: '#a855f7', glyph: 'UI', metric: 'Component Library' },
      { id: 'pack', name: 'Print & Retail Packaging', category: 'Boxes · Labels · Dielines', badgeColor: '#f59e0b', glyph: '📦', metric: '300 DPI CMYK Ready' },
      { id: 'ad', name: 'Advertising & Billboard Key', category: 'OOH · Social · Display Ads', badgeColor: '#ec3935', glyph: '🎯', metric: 'Thumb-Stopping Visual' },
      { id: 'pub', name: 'Magazines & Publications', category: 'Books · Catalogs · Reports', badgeColor: '#38bdf8', glyph: '📖', metric: 'Editorial Layout' },
      { id: 'deck', name: 'Pitch Decks & Iconography', category: 'Investor & Custom Icons', badgeColor: '#10b981', glyph: '◈', metric: 'Bespoke SVG Suite' },
    ],
    criteriaChecklist: [
      { label: 'Master Vector Source Files (AI, EPS, SVG, PDF, Figma)', benchmark: 'Full Commercial Copyright', status: 'INCLUDED' },
      { label: 'Print-Ready CMYK Dielines + Digital RGB/WebP Assets', benchmark: 'Dual-Medium Precision', status: 'CALIBRATED' },
      { label: 'Cohesive Color Theory, Grid Geometry & Typography', benchmark: 'Brand Guidelines Compliant', status: 'VERIFIED' },
      { label: 'Multi-Format Deliverables (Logo, UI, Print, Ads, Icons)', benchmark: '9 Design Specializations', status: 'COMPLETE' },
    ],
    capabilities: [
      {
        id: 'gd-1',
        title: 'Logo & Brand Identity Design',
        description:
          'Creating memorable logos, cohesive color palettes, typographic hierarchies, and comprehensive brand guidelines.',
        iconKey: 'palette',
        deliverableTag: 'Signature Logo Suite',
        cardImage: '/services/gd_hero.jpg',
        bullets: [
          'GOLDEN-RATIO VECTOR LOGO MARKS',
          'COLOR PALETTE & TYPOGRAPHY SYSTEM',
          'MASTER AI, EPS, SVG & PDF GUIDELINES',
        ],
      },
      {
        id: 'gd-2',
        title: 'Web UI Design & Custom Iconography',
        description:
          'Designing modern interfaces, visual layouts, and scalable vector icon suites for web and mobile applications.',
        iconKey: 'layout',
        deliverableTag: 'UI & Icon Systems',
        cardImage: '/services/gd_node.jpg',
        bullets: [
          'HIGH-FIDELITY FIGMA UI PROTOTYPES',
          'DESIGN TOKENS & COMPONENT LIBRARIES',
          'BESPOKE PIXEL-PERFECT SVG ICON SETS',
        ],
      },
      {
        id: 'gd-3',
        title: 'Print, Packaging & Publication Design',
        description:
          'High-impact brochures, flyers, posters, business cards, retail product packaging, magazines, and books.',
        iconKey: 'package',
        deliverableTag: 'Print & Packaging',
        cardImage: '/services/gd_core.jpg',
        bullets: [
          'RETAIL BOX DIELINES & 3D MOCKUPS',
          'BROCHURES, CATALOGS & BOOK LAYOUTS',
          'PRE-PRESS 300 DPI CMYK PRODUCTION',
        ],
      },
      {
        id: 'gd-4',
        title: 'Advertising, Social Media & Presentation Design',
        description:
          'Designing banner ads, billboards, social media creative kits, and executive pitch decks that captivate stakeholders.',
        iconKey: 'sparkles',
        deliverableTag: 'Ad & Pitch Creative',
        cardImage: '/services/gd_deploy.jpg',
        bullets: [
          'HIGH-CONVERTING AD & BILLBOARD KEY ART',
          'INVESTOR & SALES PITCH DECK DESIGN',
          'COHESIVE SOCIAL MEDIA TEMPLATES',
        ],
      },
    ],
  },
  {
    id: 'brand-development',
    num: '08',
    slug: 'brand-development',
    title: 'Brand Development',
    kicker: 'BRAND STRATEGY · NAMING · POSITIONING · STORYTELLING',
    tagline:
      'Unleash identity, amplify presence, and captivate your audience effortlessly.',
    summary:
      'Expert brand architecture that builds lasting market recognition — from foundational brand strategy, naming, and positioning to emotional storytelling, voice development, experience design, and brand reputation monitoring.',
    environmentName: 'Brand Strategy & Equity Sanctum',
    officialUrl: 'https://eferz.com/services/brand-development/',
    accentColor: '#eab308',
    secondaryColor: '#ec3935',
    particleShape: 'diamond',
    particleScheme: 'amber',
    threeGeometry: 'brand-diamond',
    storyImages: {
      hero: '/services/brand_hero.jpg',
      node: '/services/brand_node.jpg',
      core: '/services/brand_core.jpg',
      deploy: '/services/brand_deploy.jpg',
      videoUrl: '/services/vid_network.mp4',
    },
    storyCopy: {
      orbitalHeadline: 'BRAND IDENTITY & STRATEGY',
      orbitalSub:
        'BUILD AN ICONIC MARKET PRESENCE THROUGH STRATEGIC BRAND NAMING, POSITIONING, VISUAL GUIDELINES, AND EMOTIONAL STORYTELLING.',
      primaryNodeTitle: 'BRAND STRATEGY & IDENTITY LAB',
      primaryNodeCode: 'BRAND STRATEGY · NAMING · VOICE · GUIDELINES',
      primaryNodeTelemetry: [
        'COMPLETE BRAND GUIDELINES BOOK',
        'MEMORABLE NAMING & POSITIONING',
        'UNIFIED BRAND VOICE & MESSAGING',
        '360° CUSTOMER EXPERIENCE DESIGN',
      ],
      computeCoreTag: 'BRAND ARCHITECTURE',
      computeCoreModel: '12 BRAND PILLARS',
      computeCoreSpec: 'STRATEGY · NAMING · IDENTITY · STORYTELLING · EQUITY',
      intelligenceLayerTitle: 'BRAND BUILDING STAGES',
      deploymentTitle: 'LASTING BRAND AUTHORITY',
      deploymentStatement:
        'Strong brands are built with purpose—uniting vision, voice, and customer experience at every touchpoint.',
    },
    metrics: [
      { value: '12', label: 'Brand Architecture Stages' },
      { value: '360°', label: 'Omnichannel Cohesion' },
      { value: 'Global', label: 'Market Differentiation' },
    ],
    techStack: ['Brand Strategy Blueprint', 'Naming & Trademark Prep', 'Market Positioning', 'Storytelling & Voice', 'Experience Design', 'Sentiment Monitoring'],
    platformTools: [
      { id: 'strat', name: 'Brand Strategy & DNA', category: 'Mission · Vision · Values', badgeColor: '#eab308', glyph: '♛', metric: 'Category Leadership' },
      { id: 'name', name: 'Brand Naming & Identity', category: 'Memorable Verbal & Visual', badgeColor: '#ec3935', glyph: '®', metric: 'Distinct Recall' },
      { id: 'pos', name: 'Competitive Positioning', category: 'Market White-Space Map', badgeColor: '#38bdf8', glyph: '🧭', metric: 'Uncontested Edge' },
      { id: 'story', name: 'Emotional Storytelling', category: 'Origin & Value Narrative', badgeColor: '#a855f7', glyph: '✦', metric: 'High Customer Loyalty' },
      { id: 'exp', name: 'Touchpoint Experience', category: 'Web · Unboxing · Service', badgeColor: '#10b981', glyph: '360°', metric: 'Cohesive Journey' },
      { id: 'mon', name: 'Brand Extensions & Guard', category: 'Partnerships & Sentiment', badgeColor: '#f97316', glyph: '🛡', metric: 'Equity Protection' },
    ],
    criteriaChecklist: [
      { label: 'Complete Brand Guidelines Book (Visual + Verbal Tone)', benchmark: 'Typography · Color · Voice', status: 'DELIVERED' },
      { label: 'Target Audience Persona & Competitive Differentiation', benchmark: 'Market Positioning Matrix', status: 'MAPPED' },
      { label: 'Omnichannel Customer Experience Touchpoint Alignment', benchmark: 'Web · Packaging · Social', status: 'UNIFIED' },
      { label: 'Brand Extension Roadmap & Reputation Sentiment Tracking', benchmark: 'Long-Term Brand Equity', status: 'ACTIVE' },
    ],
    capabilities: [
      {
        id: 'bd-1',
        title: 'Brand Strategy, Naming & Market Positioning',
        description:
          'Defining competitive differentiation, selecting memorable brand/product names, and claiming a distinct space in the market.',
        iconKey: 'compass',
        deliverableTag: 'Positioning Blueprint',
        cardImage: '/services/brand_hero.jpg',
        bullets: [
          'MISSION, VISION & VALUE ARCHITECTURE',
          'MEMORABLE BRAND & PRODUCT NAMING',
          'COMPETITIVE WHITE-SPACE MAPPING',
        ],
      },
      {
        id: 'bd-2',
        title: 'Brand Identity, Voice & Messaging Systems',
        description:
          'Establishing visual guidelines alongside a unified tone of voice and value proposition across every channel.',
        iconKey: 'sparkles',
        deliverableTag: 'Voice & Identity Book',
        cardImage: '/services/brand_node.jpg',
        bullets: [
          'COMPREHENSIVE BRAND BIBLE & RULES',
          'SIGNATURE TONE-OF-VOICE PILLARS',
          'ELEVATOR PITCH & TAGLINE SYSTEMS',
        ],
      },
      {
        id: 'bd-3',
        title: 'Brand Storytelling & Experience Design',
        description:
          'Crafting emotional narratives and memorable customer experiences across web, packaging, and post-purchase touchpoints.',
        iconKey: 'award',
        deliverableTag: 'Customer Journey',
        cardImage: '/services/brand_core.jpg',
        bullets: [
          'EMOTIONAL FOUNDER & ORIGIN NARRATIVE',
          '360° DIGITAL & UNBOXING TOUCHPOINTS',
          'INTERNAL TEAM CULTURE ALIGNMENT',
        ],
      },
      {
        id: 'bd-4',
        title: 'Brand Extension, Partnerships & Monitoring',
        description:
          'Scaling into new product lines, forging strategic co-branding partnerships, and monitoring global brand sentiment.',
        iconKey: 'globe',
        deliverableTag: 'Expansion & Equity',
        cardImage: '/services/brand_deploy.jpg',
        bullets: [
          'NEW PRODUCT LINE EXTENSION STRATEGY',
          'STRATEGIC CO-BRANDING ALLIANCES',
          'ONGOING REPUTATION & EQUITY TRACKING',
        ],
      },
    ],
  },
  {
    id: 'consulting-services',
    num: '09',
    slug: 'consulting-services',
    title: 'Consulting Services',
    kicker: 'IT ADVISORY · DIGITAL TRANSFORMATION · GROWTH ROADMAPS',
    tagline:
      'Empower your business with expert IT and digital consulting tailored to your goals.',
    summary:
      'Strategic guidance empowering your journey to digital excellence — helping enterprises architect scalable websites, unlock e-commerce growth, build authoritative brand awareness, and execute data-driven marketing roadmaps.',
    environmentName: 'Executive IT & Digital Strategy Advisory',
    officialUrl: 'https://eferz.com/services/consulting-services/',
    accentColor: '#60a5fa',
    secondaryColor: '#34d399',
    particleShape: 'brain',
    particleScheme: 'cyan',
    threeGeometry: 'consulting-compass',
    storyImages: {
      hero: '/services/cons_hero.jpg',
      node: '/services/cons_node.jpg',
      core: '/services/cons_core.jpg',
      deploy: '/services/cons_deploy.jpg',
      videoUrl: '/services/vid_commerce.mp4',
    },
    storyCopy: {
      orbitalHeadline: 'BUSINESS & IT CONSULTING',
      orbitalSub:
        'EMPOWER YOUR ENTERPRISE WITH EXPERT ADVISORY ACROSS WEBSITE ARCHITECTURE, E-COMMERCE SCALING, BRAND POSITIONING, AND ROI GROWTH.',
      primaryNodeTitle: 'EXECUTIVE STRATEGY & ADVISORY',
      primaryNodeCode: 'IT ADVISORY · E-COMMERCE SCALE · GROWTH ROADMAP',
      primaryNodeTelemetry: [
        'TAILORED 90-DAY & 12-MONTH ROADMAPS',
        'WEB & CLOUD ARCHITECTURE AUDITS',
        'E-COMMERCE CONVERSION ADVISORY',
        'GLOBAL PRESENCE (USA · KSA · PK)',
      ],
      computeCoreTag: 'EXECUTIVE ADVISORY',
      computeCoreModel: '4 ADVISORY TRACKS',
      computeCoreSpec: 'WEB STRATEGY · RETAIL SCALE · BRAND ENTRY · ROI PLANS',
      intelligenceLayerTitle: 'CONSULTING PILLARS',
      deploymentTitle: 'STRATEGIC BUSINESS GROWTH',
      deploymentStatement:
        'Clear executive guidance eliminates costly trial-and-error and accelerates your path to market leadership.',
    },
    metrics: [
      { value: '4', label: 'Core Executive Advisory Tracks' },
      { value: '100%', label: 'Tailored Technical Roadmaps' },
      { value: 'USA·KSA·PK', label: 'Tri-Continent Advisory' },
    ],
    techStack: ['Enterprise IT Architecture', 'E-Commerce Platform Audit', 'Brand Positioning Advisory', 'Growth & ROI Modeling', 'Cloud & AI Readiness', 'Operational Efficiency'],
    platformTools: [
      { id: 'web-adv', name: 'Web Architecture Advisory', category: 'Stack & Scalability Audit', badgeColor: '#60a5fa', glyph: '🏛', metric: 'Future-Proof Stack' },
      { id: 'ecom-adv', name: 'E-Commerce Growth Audit', category: 'Platform & Funnel Optimization', badgeColor: '#34d399', glyph: '🛒', metric: 'Checkout Lift' },
      { id: 'brand-adv', name: 'Brand Market Penetration', category: 'Positioning & Awareness', badgeColor: '#f59e0b', glyph: '🧭', metric: 'Audience Capture' },
      { id: 'mkt-adv', name: 'Marketing ROI Attribution', category: 'Budget & Channel Strategy', badgeColor: '#ec3935', glyph: '📊', metric: 'Data-Driven ROAS' },
    ],
    criteriaChecklist: [
      { label: 'Comprehensive Technical & Digital Infrastructure Audit', benchmark: 'Code · Cloud · UX · Funnel', status: 'COMPLETED' },
      { label: 'Platform & Vendor Selection (Shopify, ERP, Cloud, CRM)', benchmark: 'Unbiased ROI Evaluation', status: 'VERIFIED' },
      { label: 'Phased 90-Day & 12-Month Execution Roadmap', benchmark: 'Milestone & KPI Driven', status: 'DELIVERED' },
      { label: 'Executive Strategy Workshops & Ongoing Implementation Care', benchmark: 'Direct Senior Advisors', status: 'INCLUDED' },
    ],
    capabilities: [
      {
        id: 'cs-1',
        title: 'Website Architecture & Technical Advisory',
        description:
          'Strategic technology stack selection and UX roadmapping to create an online presence that reflects your brand and scales reliably.',
        iconKey: 'cpu',
        deliverableTag: 'Architecture Roadmap',
        cardImage: '/services/cons_hero.jpg',
        bullets: [
          'CLOUD & FULL-STACK ARCHITECTURE AUDIT',
          'UX CONVERSION BOTTLENECK DIAGNOSIS',
          'SCALABLE INFRASTRUCTURE BLUEPRINT',
        ],
      },
      {
        id: 'cs-2',
        title: 'E-Commerce Transformation Consulting',
        description:
          'Unlocking the full potential of online retail — from platform selection and ERP integration to checkout conversion optimization.',
        iconKey: 'shoppingbag',
        deliverableTag: 'Retail Scale Plan',
        cardImage: '/services/cons_node.jpg',
        bullets: [
          'PLATFORM MIGRATION & ERP ROADMAP',
          'UNIT ECONOMICS & AOV OPTIMIZATION',
          'OMNICHANNEL EXPANSION STRATEGY',
        ],
      },
      {
        id: 'cs-3',
        title: 'Brand Awareness & Market Entry Strategy',
        description:
          'Advisory frameworks to stand out in crowded global markets and build a resilient brand presence.',
        iconKey: 'compass',
        deliverableTag: 'Market Entry Playbook',
        cardImage: '/services/cons_core.jpg',
        bullets: [
          'COMPETITIVE LANDSCAPE INTELLIGENCE',
          'GO-TO-MARKET LAUNCH SEQUENCING',
          'CROSS-BORDER AUDIENCE POSITIONING',
        ],
      },
      {
        id: 'cs-4',
        title: 'Data-Driven Digital Marketing Roadmaps',
        description:
          'Aligning acquisition channels, analytics attribution, and growth budgets directly with your core business objectives.',
        iconKey: 'barchart',
        deliverableTag: 'ROI Attribution Model',
        cardImage: '/services/cons_deploy.jpg',
        bullets: [
          'CHANNEL MIX & BUDGET ALLOCATION',
          'CAC-TO-LTV FINANCIAL MODELING',
          'EXECUTIVE KPI DASHBOARD GOVERNANCE',
        ],
      },
    ],
  },
  {
    id: 'cyber-security',
    num: '10',
    slug: 'cyber-security',
    title: 'Cyber Security',
    kicker: 'ZERO-TRUST · PENETRATION TESTING · SOC · PCI-DSS · WAF',
    tagline:
      'Comprehensive cybersecurity: protect data, prevent breaches, and ensure digital safety.',
    summary:
      'Zero-trust defense for modern digital enterprises — safeguarding web applications, cloud infrastructure, e-commerce checkouts, and sensitive customer data through proactive threat monitoring, SSL/PCI-DSS compliance, and vulnerability hardening.',
    environmentName: 'Zero-Trust Cyber Defense & Threat Radar',
    officialUrl: 'https://eferz.com/services/cyber-security/',
    accentColor: '#10b981',
    secondaryColor: '#06b6d4',
    particleShape: 'shield',
    particleScheme: 'emerald',
    threeGeometry: 'cyber-shield',
    storyImages: {
      hero: '/services/sec_hero.jpg',
      node: '/services/sec_node.jpg',
      core: '/services/sec_core.jpg',
      deploy: '/services/sec_deploy.jpg',
      videoUrl: '/services/vid_cyber.mp4',
    },
    storyCopy: {
      orbitalHeadline: 'CYBER SECURITY DEFENSE',
      orbitalSub:
        'SAFEGUARD YOUR WEBSITES, ONLINE STORES, AND CLOUD DATA WITH 24/7 THREAT MONITORING, PENETRATION TESTING, AND SSL/PCI COMPLIANCE.',
      primaryNodeTitle: '24/7 SECURITY & THREAT SHIELD',
      primaryNodeCode: 'WAF FIREWALL · PEN-TESTING · PCI-DSS · BACKUPS',
      primaryNodeTelemetry: [
        '24/7 REAL-TIME INTRUSION MONITORING',
        'OWASP VULNERABILITY & PEN-TESTING',
        '256-BIT SSL & PCI-DSS COMPLIANCE',
        'AUTOMATED RANSOMWARE-PROOF BACKUPS',
      ],
      computeCoreTag: 'ZERO-TRUST SHIELD',
      computeCoreModel: '24/7 CYBER GUARD',
      computeCoreSpec: 'FIREWALL · PEN-TEST AUDIT · ENCRYPTION · RECOVERY',
      intelligenceLayerTitle: 'SECURITY MODULES',
      deploymentTitle: 'COMPLETE DIGITAL PROTECTION',
      deploymentStatement:
        'Proactive cybersecurity protects your business reputation, customer trust, and critical operations around the clock.',
    },
    metrics: [
      { value: '24/7', label: 'Real-Time SOC Threat Radar' },
      { value: 'Zero-Trust', label: 'Encrypted Access Architecture' },
      { value: 'PCI / SSL', label: '100% Compliance Hardening' },
    ],
    techStack: ['OWASP Top-10 Pen-Testing', 'Cloudflare & AWS WAF', 'PCI-DSS & SSL/TLS 1.3', '24/7 SIEM & SOC Radar', 'Zero-Trust IAM', 'Immutable Disaster Backup'],
    platformTools: [
      { id: 'waf', name: 'Web Application Firewall (WAF)', category: 'DDoS & Bot Mitigation', badgeColor: '#10b981', glyph: '🛡', metric: 'Layer-7 Shield' },
      { id: 'pentest', name: 'OWASP Penetration Testing', category: 'Ethical Vulnerability Audit', badgeColor: '#06b6d4', glyph: '🔍', metric: 'Zero Exploits' },
      { id: 'pci', name: 'PCI-DSS & SSL/TLS 1.3', category: 'Encrypted E-Commerce Vault', badgeColor: '#3b82f6', glyph: '🔒', metric: '256-Bit AES/TLS' },
      { id: 'soc', name: '24/7 SIEM & Intrusion Radar', category: 'Real-Time Malware Defense', badgeColor: '#eab308', glyph: '📡', metric: 'Sub-Second Alert' },
      { id: 'iam', name: 'Zero-Trust Cloud & IAM', category: 'Multi-Factor & Role Guard', badgeColor: '#a855f7', glyph: '🔑', metric: 'Least-Privilege' },
      { id: 'backup', name: 'Immutable Incident Recovery', category: 'Ransomware-Proof Backups', badgeColor: '#ec3935', glyph: '💾', metric: 'Zero Data Loss' },
    ],
    criteriaChecklist: [
      { label: 'OWASP Top-10 Vulnerability Scan & Penetration Testing', benchmark: 'SQLi · XSS · CSRF · API Audit', status: 'PASSED' },
      { label: 'End-to-End SSL/TLS 1.3 & PCI-DSS Checkout Compliance', benchmark: '256-Bit Encrypted Tunnel', status: 'LOCKED' },
      { label: '24/7 Automated Malware, Botnet & DDoS Shielding', benchmark: 'Edge WAF + Rate Limiting', status: 'ACTIVE' },
      { label: 'Immutable Off-Site Cloud Backups & Rapid Incident Playbook', benchmark: 'RPO < 15m Recovery', status: 'VERIFIED' },
    ],
    capabilities: [
      {
        id: 'sec-1',
        title: 'Web & E-Commerce Security Hardening',
        description:
          'Protecting online stores and web platforms with end-to-end SSL encryption, fraud detection, DDoS mitigation, and PCI-DSS compliance.',
        iconKey: 'shield',
        deliverableTag: 'WAF & PCI Hardening',
        cardImage: '/services/sec_hero.jpg',
        bullets: [
          'LAYER-7 DDOS & BOTNET MITIGATION',
          'PCI-DSS CHECKOUT & PAYMENT VAULT',
          'END-TO-END 256-BIT SSL/TLS 1.3',
        ],
      },
      {
        id: 'sec-2',
        title: 'Vulnerability Assessment & Penetration Testing',
        description:
          'Auditing application code, APIs, and server configurations to identify and remediate security weaknesses before exploitation.',
        iconKey: 'lock',
        deliverableTag: 'Pen-Test Audit Report',
        cardImage: '/services/sec_node.jpg',
        bullets: [
          'OWASP TOP-10 EXPLOIT SIMULATION',
          'API & CLOUD CONFIGURATION AUDITS',
          'LINE-BY-LINE REMEDIATION PATCHING',
        ],
      },
      {
        id: 'sec-3',
        title: '24/7 Network & Cloud Intrusion Monitoring',
        description:
          'Continuous real-time monitoring against malware, unauthorized access, and automated bot attacks.',
        iconKey: 'eye',
        deliverableTag: '24/7 Threat Radar',
        cardImage: '/services/sec_core.jpg',
        bullets: [
          'REAL-TIME SIEM ANOMALY DETECTION',
          'ZERO-TRUST IAM & MFA ENFORCEMENT',
          'AUTOMATED MALWARE ISOLATION',
        ],
      },
      {
        id: 'sec-4',
        title: 'Data Privacy, Backup & Incident Recovery',
        description:
          'Immutable cloud backups, encrypted data storage, and rapid incident response protocols to guarantee business continuity.',
        iconKey: 'database',
        deliverableTag: 'Disaster Recovery',
        cardImage: '/services/sec_deploy.jpg',
        bullets: [
          'AIR-GAPPED IMMUTABLE CLOUD BACKUPS',
          'SUB-15 MINUTE RPO DISASTER RECOVERY',
          'GDPR, CCPA & DATA PRIVACY COMPLIANCE',
        ],
      },
    ],
  },
  {
    id: 'connect-isp',
    num: '11',
    slug: 'connect-isp',
    title: 'Connect (ISP)',
    kicker: '940 MBPS FIBER · FIXED WIRELESS · WHOLE-HOME MESH WI-FI',
    tagline:
      'Fast, reliable Fiber & Fixed Wireless Internet — up to 940 Mbps with <10ms latency.',
    summary:
      'High-speed residential and commercial ISP operating out of Fort Lauderdale, Florida — delivering unlimited Fiber Internet, 48-hour Fixed Wireless installation, Whole-Home Mesh Wi-Fi, and 24/7 network security with zero data caps and no long-term contracts.',
    environmentName: '940 Mbps Optical Fiber & Mesh Telemetry Hub',
    officialUrl: 'https://eferz.com/services/connect-isp/',
    accentColor: '#06b6d4',
    secondaryColor: '#ec3935',
    particleShape: 'wifi',
    particleScheme: 'cyan',
    threeGeometry: 'isp-fiber',
    storyImages: {
      hero: '/services/isp_hero.jpg',
      node: '/services/isp_node.jpg',
      core: '/services/isp_core.jpg',
      deploy: '/services/isp_deploy.jpg',
      videoUrl: '/services/vid_network.mp4',
    },
    storyCopy: {
      orbitalHeadline: 'CONNECT (ISP) BROADBAND',
      orbitalSub:
        'ULTRA-FAST 940 MBPS FIBER INTERNET, 48-HOUR FIXED WIRELESS SETUP, AND WHOLE-HOME MESH WI-FI WITH ZERO DATA CAPS AND NO CONTRACTS.',
      primaryNodeTitle: '940 MBPS FIBER & MESH WI-FI HUB',
      primaryNodeCode: '940 MBPS FIBER · <10MS PING · FREE 48H INSTALL',
      primaryNodeTelemetry: [
        'UP TO 940 MBPS SYMMETRIC FIBER SPEED',
        '< 10MS ULTRA-LOW GAMING & CALL PING',
        '48-HOUR FIXED WIRELESS INSTALLATION',
        'UNLIMITED DATA · NO ANNUAL CONTRACTS',
      ],
      computeCoreTag: 'HIGH-SPEED FIBER ISP',
      computeCoreModel: '940 MBPS ULTRA',
      computeCoreSpec: 'FIBER INTERNET · FIXED WIRELESS · MESH WI-FI 6',
      intelligenceLayerTitle: 'INTERNET PLANS & FEATURES',
      deploymentTitle: 'WHOLE-HOME CONNECTIVITY',
      deploymentStatement:
        'Fast, reliable fiber and whole-home mesh Wi-Fi keep every room connected for 4K streaming, work, and gaming.',
    },
    metrics: [
      { value: '940 Mbps', label: 'Symmetric Fiber Bandwidth' },
      { value: '< 10ms', label: 'Ultra-Low Ping Latency' },
      { value: '48 Hrs', label: 'Free Technician Install' },
    ],
    techStack: ['940 Mbps Optical Fiber', 'Fixed Wireless 48h Setup', 'Whole-Home Mesh Wi-Fi 6', '<10ms Gaming Latency', 'Parental & Network Guard', 'Zero Data Caps'],
    platformTools: [
      { id: 'fiber', name: 'Symmetric Fiber 940 Mbps', category: 'Heavy 4K & Gaming Line', badgeColor: '#06b6d4', glyph: '⚡', metric: '<10ms Ping' },
      { id: 'wireless', name: 'Fixed Wireless Broadband', category: 'No-Trench 48-Hr Install', badgeColor: '#38bdf8', glyph: '📡', metric: '48h Activation' },
      { id: 'mesh', name: 'Whole-Home Mesh Wi-Fi', category: 'Attic-to-Garage Coverage', badgeColor: '#10b981', glyph: '📶', metric: 'Zero Dead Zones' },
      { id: 'netsec', name: 'Home Network Security', category: 'Intrusion & Parental Control', badgeColor: '#f59e0b', glyph: '🛡', metric: '24/7 Protected' },
      { id: 'basic', name: 'Home Basic (100 Mbps)', category: 'HD Streaming & Browsing', badgeColor: '#a855f7', glyph: '100', metric: 'No Contract' },
      { id: 'plus', name: 'Home Plus (500 Mbps)', category: 'Most Popular · Whole Family', badgeColor: '#ec3935', glyph: '500', metric: 'Free Install' },
    ],
    criteriaChecklist: [
      { label: 'Unlimited High-Speed Data with Zero Throttling or Caps', benchmark: '100M · 500M · 940M Tiers', status: 'UNLIMITED' },
      { label: 'Included Router + Whole-Home Mesh Wi-Fi Signal Check', benchmark: 'Every Room Covered', status: 'INCLUDED' },
      { label: 'Free Professional On-Site Installation in South Florida', benchmark: 'Fort Lauderdale Dispatch', status: '48 HRS' },
      { label: 'No Long-Term Contract Lock-In + 24/7 Network Monitoring', benchmark: 'Cancel or Upgrade Anytime', status: 'FLEXIBLE' },
    ],
    capabilities: [
      {
        id: 'isp-1',
        title: 'Fiber Internet & Home Broadband (Up to 940 Mbps)',
        description:
          'Unlimited high-speed symmetric fiber and broadband for 4K streaming, video calls, and gaming — no data caps, no throttling.',
        iconKey: 'wifi',
        deliverableTag: 'Up to 940 Mbps',
        cardImage: '/services/isp_hero.jpg',
        bullets: [
          'SYMMETRIC 940 MBPS UPLOAD & DOWNLOAD',
          'SUB-10MS COMPETITIVE GAMING LATENCY',
          'UNLIMITED DATA WITH ZERO THROTTLING',
        ],
      },
      {
        id: 'isp-2',
        title: 'Fixed Wireless Internet (48-Hour Install)',
        description:
          'Reliable high-speed connectivity for homes fiber and cable haven’t reached yet — no trenching or waiting months for a line.',
        iconKey: 'radio',
        deliverableTag: '48-Hour Setup',
        cardImage: '/services/isp_node.jpg',
        bullets: [
          'RAPID 48-HOUR ROOFTOP / POINT SETUP',
          'NO TRENCHING OR CABLE DELAYS',
          'RESILIENT WEATHER-HARDENED LINK',
        ],
      },
      {
        id: 'isp-3',
        title: 'Whole-Home Mesh Wi-Fi & Network Security',
        description:
          'Full-property mesh Wi-Fi from attic to garage plus automatic intrusion protection and mobile parental controls.',
        iconKey: 'shield',
        deliverableTag: 'Mesh + Security',
        cardImage: '/services/isp_core.jpg',
        bullets: [
          'ATTIC-TO-GARAGE WI-FI 6 MESH NODES',
          'AUTOMATIC INTRUSION & MALWARE SHIELD',
          'MOBILE APP PARENTAL ACCESS CONTROLS',
        ],
      },
      {
        id: 'isp-4',
        title: 'Free Technician Installation & Zero Contracts',
        description:
          'On-site local installation crews in Fort Lauderdale & South Florida configure your router, mesh Wi-Fi, and signal check with no lock-in.',
        iconKey: 'zap',
        deliverableTag: 'No Contract Lock-In',
        cardImage: '/services/isp_deploy.jpg',
        bullets: [
          'FREE ON-SITE FORT LAUDERDALE INSTALL',
          'ROOM-BY-ROOM SIGNAL STRENGTH AUDIT',
          'MONTH-TO-MONTH FREEDOM · NO LOCK-IN',
        ],
      },
    ],
  },
];
