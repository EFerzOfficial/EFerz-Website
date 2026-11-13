import { MorphShape } from './morphShapes';

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  shape: MorphShape;
}

export interface ClientStory {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  secondaryText?: string;
  founderName: string;
  founderRole: string;
  testimonialQuote: string;
  resultsSummary: string;
  returningRate: string;
  feedbackCount: string;
  sinceDate: string;
  servicesProvided: string[];
  liveUrl: string;
  eferzUrl: string;
  image: string;
  logo?: string;
  shape: MorphShape;
  colorScheme: 'white' | 'cyan' | 'amber' | 'emerald';
  linkText?: string;
}

export interface WorkProject {
  id: string;
  num: string;
  slug: string;
  year: string;
  category: string;
  primaryFilter: 'All' | 'Web & E-Commerce' | 'Digital Marketing' | 'Branding & Design' | 'IT & Security';
  title: string;
  client: string;
  image: string;
  logo?: string;
  desktopImage?: string;
  tabletImage?: string;
  mobileImage?: string;
  remoteImage?: string;
  liveUrl: string;
  eferzUrl: string;
  mockupType: 'imac' | 'macbook' | 'dual' | 'phone';
  description: string;
  secondaryDescription?: string;
  tags: string[];
  accentColor: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string[];
  shape: MorphShape;
  matrixPattern: string;
  photo?: string;
  greeting?: string;
  greetingAr?: string;
  objectPosition?: string;
  socials?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'ai',
    num: '01',
    title: 'Artificial intelligence',
    description:
      'Needs assessment, use cases, AI agent design, workflow automation and generative content production (text, image, video, audio) — integrated into your existing tools, in a responsible, measurable way.',
    shape: 'logo',
  },
  {
    id: 'microservices',
    num: '02',
    title: 'Micro-services',
    description:
      'A modular, scalable architecture: each service is autonomous, developed and deployed independently, some embedding automation and AI to optimise your business processes.',
    shape: 'monitor',
  },
  {
    id: 'video',
    num: '03',
    title: 'Video production',
    description:
      'Event films, B2B, internal campaigns or digital content. From script to screen, motion design and visual effects: engaging formats designed for the web.',
    shape: 'clapper',
  },
  {
    id: 'consulting',
    num: '04',
    title: 'Communication consulting',
    description:
      'We work with you from the earliest stages of a project to find the right solutions, factoring in the new digital practices driven by artificial intelligence.',
    shape: 'sphere',
  },
  {
    id: 'development',
    num: '05',
    title: 'Technical development',
    description:
      'From the simplest challenges to the most complex, with rigour and efficiency. Over 20 years of web experience, and the integration of AI into your platforms, CMS and workflows.',
    shape: 'glasses',
  },
  {
    id: 'crm',
    num: '06',
    title: 'Data & CRM',
    description:
      'Bespoke CRM tools to manage prospects, events and outreach. SaaS or ad hoc, with AI put to work to analyse, qualify and get real value out of your data.',
    shape: 'rocket',
  },
];

// Official 17 Clients & Verified Founder Testimonials from https://eferz.com/project/*
export const CLIENT_STORIES: ClientStory[] = [
  {
    id: 'your-kitchen-is-cooking',
    tag: 'CULINARY COMMERCE · FULL DIGITAL ECOSYSTEM',
    title: 'Your Kitchen is Cooking',
    subtitle: 'Bringing joy and ease to everyday cooking with a high-converting digital storefront.',
    description:
      'At Your Kitchen is Cooking, we’re on a mission to bring joy and ease to your everyday cooking. EFerz partnered with Your Kitchen is Cooking to deliver end-to-end Website Designing & Development, Digital Marketing, Graphic Design, IT Consulting, Logo Design, and Social Accounts Management.',
    secondaryText:
      'Your Kitchen is Cooking is proudly powered by EFerz — crafting digital experiences that delight, engage, and drive measurable e-commerce growth.',
    founderName: 'Miss Sheila',
    founderRole: 'Founder — Your Kitchen is Cooking',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for our customers. Quality products at everyday low prices — Your Kitchen is Cooking is continuously updated with EFerz to provide the latest culinary essentials and help every customer find the perfect item.',
    resultsSummary: 'Quality culinary products with seamless multi-device checkout and social commerce growth.',
    returningRate: '89% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'June 24, 2025',
    servicesProvided: [
      'Website Designing & Development',
      'Digital Marketing',
      'Graphic Design',
      'IT Consulting',
      'Logo Design',
      'Social Accounts Management',
    ],
    liveUrl: 'https://www.yourkitcheniscooking.com/',
    eferzUrl: 'https://eferz.com/project/your-kitchen-is-cooking/',
    image: '/portfolio/your-kitchen-is-cooking.webp',
    logo: '/portfolio/logos/your-kitchen-is-cooking.webp',
    shape: 'cart',
    colorScheme: 'amber',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'sustagro',
    tag: 'SUSTAINABLE AGTECH · DIGITAL MARKETING & SOCIAL',
    title: 'Sustagro',
    subtitle: 'Connecting sustainable agriculture innovations with conscious modern consumers.',
    description:
      'Sustagro is a modern platform for the next generation of sustainable consumers, harnessing the power of technology and community to make conscious shopping more accessible, engaging, and impactful.',
    secondaryText:
      'EFerz engineered Sustagro’s digital marketing ecosystem and social presence to simplify the way people connect with sustainable products.',
    founderName: 'Amjid Mohammed',
    founderRole: 'Marketing Executive — Sustagro',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for our customers. With EFerz powering our digital marketing and social ecosystem, Sustagro continuously connects conscious buyers with sustainable products effortlessly.',
    resultsSummary: 'High-impact sustainable brand positioning and measurable B2B/B2C community growth.',
    returningRate: '88% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'June 24, 2025',
    servicesProvided: [
      'Digital Marketing',
      'Social Accounts Management',
      'Brand Strategy',
      'Web Showcase',
    ],
    liveUrl: 'https://sustagro.com/',
    eferzUrl: 'https://eferz.com/project/sustagro/',
    image: '/portfolio/sustagro.webp',
    logo: '/portfolio/logos/sustagro.png',
    shape: 'globe',
    colorScheme: 'emerald',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'instashop',
    tag: 'NEXT-GEN SHOPPING · E-COMMERCE ARCHITECTURE',
    title: 'InstaShop',
    subtitle: 'Revolutionizing online retail by blending human connection with cutting-edge technology.',
    description:
      'InstaShop is an online destination built for the next generation of shoppers. EFerz empowered their digital journey with full-scale Web Development, Digital Marketing, Branding, and Social Accounts Management.',
    secondaryText:
      'Merging innovation with execution — crafting experiences that connect, convert, and scale across mobile and desktop.',
    founderName: 'Sarim Baig',
    founderRole: 'Founder & CEO — InstaShop',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for our customers. EFerz helped us blend human connection with cutting-edge web technology — making every purchase simple, social, and enjoyable.',
    resultsSummary: 'Ultra-fast product discovery and frictionless multi-device checkout flows.',
    returningRate: '97% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'June 24, 2025',
    servicesProvided: [
      'Website Designing & Development',
      'Digital Marketing',
      'Social Accounts Management',
      'E-Commerce Solutions',
    ],
    liveUrl: 'https://instashop.com.pk/',
    eferzUrl: 'https://eferz.com/project/instashop/',
    image: '/portfolio/instashop.webp',
    logo: '/portfolio/logos/instashop.png',
    shape: 'monitor',
    colorScheme: 'cyan',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'al-shiekh-interiors',
    tag: 'LUXURY INTERIORS · BRANDING & WEB',
    title: 'Al-Shiekh Curtain & Interiors',
    subtitle: 'Elevating luxury interior design and bespoke home decor in the digital landscape.',
    description:
      'EFerz collaborated with Al-Shiekh Curtain & Interiors across Website Designing & Development, Logo Design, Graphic Design, IT Consulting, and targeted Digital Marketing.',
    secondaryText:
      'Delivering targeted strategies that propelled Al-Shiekh Curtain & Interiors’ online presence and client inquiries to unprecedented levels.',
    founderName: 'Mr. Taha Mahmood',
    founderRole: 'Founder — Al-Shiekh Curtain & Interiors',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for our customers. EFerz blended creativity with performance-driven digital marketing and bespoke web design to elevate Al-Shiekh Curtain & Interiors to digital excellence.',
    resultsSummary: 'Luxury visual identity paired with high-converting interior consultation campaigns.',
    returningRate: '78% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'June 24, 2025',
    servicesProvided: [
      'Website Designing & Development',
      'Logo Design',
      'Graphic Design',
      'Digital Marketing',
      'IT Consulting',
      'Social Accounts Management',
    ],
    liveUrl: 'https://alshiekhcurtaininterior.com/',
    eferzUrl: 'https://eferz.com/project/al-shiekh-curtain-interiors/',
    image: '/portfolio/al-shiekh-curtain-interiors.webp',
    logo: '/portfolio/logos/al-shiekh-curtain-interiors.webp',
    shape: 'diamond',
    colorScheme: 'amber',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'airtilize',
    tag: 'COMMERCIAL HVAC & ENGINEERING · GLOBAL WEB & IT',
    title: 'Airtilize',
    subtitle: '200,000+ successful engineering projects across 30+ global locations.',
    description:
      'Airtilize Inc is a leading provider of HVAC ventilation, fire suppression, gas piping, and commercial kitchen solutions with over 20 years of experience. EFerz delivered custom Website Designing & Development, IT Consulting, Logo Design, Graphic Design, and Digital Marketing.',
    secondaryText:
      'Combining technical know-how with creative insight to position Airtilize for sustainable global growth.',
    founderName: 'Mr. Shakeel',
    founderRole: 'Founder & CEO — Airtilize Inc.',
    testimonialQuote:
      'Our mission is to deliver the most compelling experience for our clients across 30+ global locations. Partnering with EFerz gave Airtilize a future-focused digital platform, IT consulting, and targeted marketing that truly resonates with our commercial audience.',
    resultsSummary: 'Enterprise web architecture and global lead-generation funnel across 30+ locations.',
    returningRate: '88% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'June 24, 2025',
    servicesProvided: [
      'Website Designing & Development',
      'IT Consulting',
      'Digital Marketing',
      'Graphic Design',
      'Logo Design',
      'Social Accounts Management',
    ],
    liveUrl: 'https://airtilize.com/',
    eferzUrl: 'https://eferz.com/project/airtilize/',
    image: '/portfolio/airtilize.webp',
    logo: '/portfolio/logos/airtilize.webp',
    shape: 'compass',
    colorScheme: 'cyan',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'trendifytoday',
    tag: 'SPECIALTY COFFEE COMMERCE · BRAND & WEB',
    title: 'TrendifyToday',
    subtitle: 'Curated specialty coffee marketplace with high-conversion omnichannel UX.',
    description:
      'At TrendifyToday, shoppers discover an ever-updated selection of premium coffees from trusted brands at everyday prices. EFerz architected the brand identity, custom web store, IT consulting, and omnichannel growth strategy.',
    secondaryText:
      'Whether craving a rich espresso, smooth medium roast, or bold blend, TrendifyToday makes finding the perfect brew simple.',
    founderName: 'Salman Shahid',
    founderRole: 'Founder — TrendifyToday',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for coffee lovers. Quality coffee at everyday low prices — with EFerz’s sleek website development and data-driven marketing, TrendifyToday is positioned as the go-to destination for fresh blends.',
    resultsSummary: 'High-velocity specialty coffee storefront with 89% repeat customer retention.',
    returningRate: '89% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'July 4, 2022',
    servicesProvided: [
      'Website Designing & Development',
      'Digital Marketing',
      'Graphic Design',
      'IT Consulting',
      'Logo Design',
      'Social Accounts Management',
    ],
    liveUrl: 'https://www.trendifytoday.com/',
    eferzUrl: 'https://eferz.com/project/trendifytoday/',
    image: '/portfolio/trendifytoday.png',
    logo: '/portfolio/logos/trendifytoday.png',
    shape: 'cup',
    colorScheme: 'amber',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'clickvolo',
    tag: 'SOCIAL COMMERCE · PERFORMANCE DIGITAL MARKETING',
    title: 'ClickVolo',
    subtitle: 'Transforming next-generation online commerce through people and technology.',
    description:
      'EFerz collaborated with ClickVolo to deliver potent Digital Marketing and Social Accounts Management services — executing targeted growth strategies that elevated online reach and conversion velocity.',
    secondaryText:
      'Combining precision audience segmentation with high-impact creative assets across social and web channels.',
    founderName: 'Mr. Ali',
    founderRole: 'Founder — ClickVolo',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for our customers. EFerz’s targeted digital marketing and social accounts management transformed our online visibility and customer engagement.',
    resultsSummary: 'Accelerated social commerce acquisition and consistent repeat buyer growth.',
    returningRate: '78% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'August 11, 2022',
    servicesProvided: [
      'Digital Marketing',
      'Social Accounts Management',
      'Performance Growth',
    ],
    liveUrl: 'https://www.instagram.com/clickvolo',
    eferzUrl: 'https://eferz.com/project/clickvolo/',
    image: '/portfolio/clickvolo.webp',
    logo: '/portfolio/logos/clickvolo.png',
    shape: 'rocket',
    colorScheme: 'white',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'khuzair',
    tag: 'BRAND IDENTITY · E-COMMERCE & CONTENT',
    title: 'Khuzair',
    subtitle: 'Timeless brand aesthetics paired with high-performing e-commerce pipelines.',
    description:
      'EFerz partnered with Khuzair to deliver impactful E-Commerce Services, bespoke Logo Design, Content Writing, and Digital Marketing — elevating brand authority and customer loyalty.',
    secondaryText:
      'Crafted to make online shopping simple, social, and enjoyable for modern retail audiences.',
    founderName: 'Mr. Uzair',
    founderRole: 'Founder — Khuzair Official',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for our customers. EFerz elevated Khuzair with distinctive logo design, compelling content writing, and e-commerce marketing that achieved 98% returning customer loyalty.',
    resultsSummary: '98% returning customer loyalty driven by cohesive brand identity and e-commerce UX.',
    returningRate: '98% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'March 11, 2022',
    servicesProvided: [
      'E-Commerce Services',
      'Logo Design',
      'Content Writing',
      'Digital Marketing',
    ],
    liveUrl: 'https://www.instagram.com/khuzairofficial',
    eferzUrl: 'https://eferz.com/project/khuzair/',
    image: '/portfolio/khuzair.webp',
    logo: '/portfolio/logos/khuzair.png',
    shape: 'palette',
    colorScheme: 'amber',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'affordablethings',
    tag: 'VALUE RETAIL · E-COMMERCE & DIGITAL GROWTH',
    title: 'AffordableThings',
    subtitle: 'Making curated high-quality products accessible at everyday budget-friendly prices.',
    description:
      'EFerz collaborated with AffordableThings to amplify online presence, drive shopper engagement, and pair everyday affordability with high-impact E-Commerce Services, Logo Design, and Digital Marketing.',
    secondaryText:
      'A destination where affordability meets exceptional product curation and convenience.',
    founderName: 'Mr. Muneeb Ahmed',
    founderRole: 'Founder — AffordableThings',
    testimonialQuote:
      'AffordableThings was born from a simple idea — to make quality products accessible to all. EFerz’s e-commerce and digital marketing expertise helped us scale our catalog visibility without compromising on excellence.',
    resultsSummary: 'Expanded social catalog reach and streamlined omnichannel order conversion.',
    returningRate: '65% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'December 15, 2021',
    servicesProvided: [
      'Digital Marketing',
      'E-Commerce Services',
      'Logo Design',
    ],
    liveUrl: 'https://www.instagram.com/theaffordablethings',
    eferzUrl: 'https://eferz.com/project/affordablethings/',
    image: '/portfolio/affordablethings.webp',
    logo: '/portfolio/logos/affordablethings.png',
    shape: 'parcel',
    colorScheme: 'cyan',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'storeara',
    tag: '8-PILLAR TRANSFORMATION · DATA ANALYTICS & WEB',
    title: 'StoreAra',
    subtitle: 'Data-backed e-commerce merchandising and full-stack digital transformation.',
    description:
      'EFerz delivered an 8-pillar digital transformation for StoreAra — spanning Website Designing & Development, Data Analytics, E-Commerce Services, IT Consulting, Logo Design, Content Writing, Social Management, and Digital Marketing.',
    secondaryText:
      'Shaping a dynamic presence for StoreAra so it stands out and thrives in the competitive online marketplace.',
    founderName: 'Mr. Muhammad Maaz',
    founderRole: 'Founder — Official StoreAra',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for our customers. EFerz brought complete mastery across web development, data analytics, and e-commerce strategy to propel StoreAra to digital success.',
    resultsSummary: '8-service enterprise retail architecture with 85% repeat customer retention.',
    returningRate: '85% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'October 10, 2021',
    servicesProvided: [
      'Website Designing & Development',
      'Data Analytics',
      'E-Commerce Services',
      'IT Consulting',
      'Digital Marketing',
      'Logo Design',
      'Content Writing',
      'Social Accounts Management',
    ],
    liveUrl: 'https://www.instagram.com/officialstoreara',
    eferzUrl: 'https://eferz.com/project/storeara/',
    image: '/portfolio/storeara.png',
    logo: '/portfolio/logos/storeara.jpg',
    shape: 'brain',
    colorScheme: 'emerald',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'reflectivethings',
    tag: 'BRAND ILLUMINATION · IT CONSULTING & E-COMMERCE',
    title: 'ReflectiveThings',
    subtitle: 'Illuminating brand identity and audience connection in the digital realm.',
    description:
      'EFerz collaborated with ReflectiveThings to illuminate their online brand presence, combining custom Logo Design, IT Consulting, E-Commerce Services, and Digital Marketing.',
    secondaryText:
      'Tailored strategies customized to reflect the unique identity and goals of ReflectiveThings.',
    founderName: 'Mr. Ibrahim Ahmed',
    founderRole: 'Founder — ReflectiveThings',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for our customers. EFerz’s creative innovation in logo design, IT consulting, and e-commerce marketing helped ReflectiveThings shine brightly online.',
    resultsSummary: 'Distinctive visual identity and 88% returning shopper satisfaction.',
    returningRate: '88% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'August 1, 2021',
    servicesProvided: [
      'Digital Marketing',
      'E-Commerce Services',
      'IT Consulting',
      'Logo Design',
    ],
    liveUrl: 'https://www.instagram.com/reflectivethingsshop',
    eferzUrl: 'https://eferz.com/project/reflectivethings/',
    image: '/portfolio/reflectivethings.png',
    logo: '/portfolio/logos/reflectivethings.png',
    shape: 'glasses',
    colorScheme: 'white',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'fitwearstores',
    tag: 'ATHLETIC E-COMMERCE · CYBER SECURITY & WEB',
    title: 'FitWearStores',
    subtitle: 'High-performance fitness fashion platform fortified with enterprise cybersecurity.',
    description:
      'EFerz sculpted a high-performance athletic e-commerce platform for FitWearStores — integrating Website Designing & Development, Cyber Security, E-Commerce Services, Graphic Design, Content Writing, and IT Consulting.',
    secondaryText:
      'Built to promote active lifestyles, engage global fitness audiences, and secure high-volume online transactions.',
    founderName: 'Mr. Farhan',
    founderRole: 'Founder — FitWearStores',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for fitness enthusiasts. EFerz understood the dynamics of the fitness fashion industry and built a secure, high-converting web store that propelled FitWearStores to new heights.',
    resultsSummary: 'Fortified athletic e-commerce storefront with 84% returning fitness customers.',
    returningRate: '84% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'December 30, 2020',
    servicesProvided: [
      'Website Designing & Development',
      'Cyber Security',
      'E-Commerce Services',
      'Digital Marketing',
      'Graphic Design',
      'IT Consulting',
      'Logo Design',
      'Content Writing',
    ],
    liveUrl: 'https://www.fitwearstores.com/',
    eferzUrl: 'https://eferz.com/project/fitwearstores/',
    image: '/portfolio/fitwearstores.webp',
    logo: '/portfolio/logos/fitwearstores.png',
    shape: 'shield',
    colorScheme: 'emerald',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'charmthings',
    tag: 'RETAIL & CYBER SECURITY · 1000+ POSITIVE FEEDBACKS',
    title: 'CharmThings',
    subtitle: 'Transforming online lifestyle shopping with fortified security and brand storytelling.',
    description:
      'EFerz partnered with CharmThings to elevate their online retail store through custom Website Designing & Development, Cyber Security, E-Commerce Services, Graphic Design, Logo Design, Content Writing, and Digital Marketing.',
    secondaryText:
      'Combining intuitive multi-device UX with fortified checkout security and social brand storytelling.',
    founderName: 'Mr. Shaban Rizwan',
    founderRole: 'Founder — CharmThings',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for our customers. With EFerz handling our web development, cybersecurity, and digital marketing, CharmThings earned over 1,000+ positive customer feedbacks and 84% repeat buyers.',
    resultsSummary: '1,000+ verified positive customer feedbacks and fortified e-commerce security.',
    returningRate: '84% Returning Customers',
    feedbackCount: '1,000+ Positive Feedbacks',
    sinceDate: 'October 1, 2020',
    servicesProvided: [
      'Website Designing & Development',
      'Cyber Security',
      'E-Commerce Services',
      'Digital Marketing',
      'Graphic Design',
      'Logo Design',
      'Content Writing',
    ],
    liveUrl: 'https://charmthings.com/',
    eferzUrl: 'https://eferz.com/project/charmthings/',
    image: '/portfolio/charmthings.webp',
    logo: '/portfolio/logos/charmthings.png',
    shape: 'crown',
    colorScheme: 'amber',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'allthingsdesire',
    tag: 'GLOBAL ACCESSIBLE RETAIL · WEB & E-COMMERCE',
    title: 'AllThingsDesire',
    subtitle: 'Delivering high-quality products at affordable prices with worldwide shipping.',
    description:
      'EFerz partnered with AllThingsDesire to provide top-notch Website Design & Development, E-Commerce Services, and Logo Design — crafting a digital presence that embodies user-centric design and seamless global fulfillment.',
    secondaryText:
      'Built on the belief that great shopping is a right, not a luxury — shipped wherever customers are located.',
    founderName: 'Mr. Hassan',
    founderRole: 'Marketing Manager — AllThingsDesire',
    testimonialQuote:
      'We at All Things Desire believe in high quality and exceptional customer service. EFerz transformed our aspirations into a stunning online reality with user-centric website design and seamless e-commerce functionality.',
    resultsSummary: 'Global e-commerce catalog with seamless international checkout and fulfillment UX.',
    returningRate: '76% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'August 1, 2020',
    servicesProvided: [
      'Website Designing & Development',
      'E-Commerce Services',
      'Logo Design',
    ],
    liveUrl: 'https://allthingsdesire.com/',
    eferzUrl: 'https://eferz.com/project/allthingsdesire/',
    image: '/portfolio/allthingsdesire.webp',
    logo: '/portfolio/logos/allthingsdesire.png',
    shape: 'globe',
    colorScheme: 'cyan',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'aapnaonlinestore',
    tag: 'IMMERSIVE ONLINE SHOPPING · WEB & LOGO DESIGN',
    title: 'AapnaOnlineStore',
    subtitle: 'Curated fashion, electronics, and home essentials in a frictionless web store.',
    description:
      'AapnaOnlineStore is an immersive online shopping destination crafted with precision by EFerz — featuring custom Website Designing & Development and signature Logo Design for next-generation retail.',
    secondaryText:
      'Meticulously designed to offer users a hassle-free, secure, and enjoyable shopping journey.',
    founderName: 'Mr. Moosa',
    founderRole: 'Founder — Aapna Online Store',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for our customers. AapnaOnlineStore is more than just a website — EFerz crafted an immersive, secure, and user-friendly shopping destination with 88% returning customers.',
    resultsSummary: 'High-trust retail interface with safeguarded transactions and 88% repeat buyers.',
    returningRate: '88% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'February 16, 2020',
    servicesProvided: [
      'Website Designing & Development',
      'Logo Design',
      'E-Commerce UX',
    ],
    liveUrl: 'https://aapnaonlinestore.com/',
    eferzUrl: 'https://eferz.com/project/aapnaonlinestore/',
    image: '/portfolio/aapnaonlinestore.webp',
    logo: '/portfolio/logos/aapnaonlinestore.png',
    shape: 'monitor',
    colorScheme: 'white',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'minimog',
    tag: '360° ENTERPRISE SUITE · 10-PILLAR TRANSFORMATION',
    title: 'MiniMog',
    subtitle: 'Comprehensive 10-pillar digital transformation, data analytics, and cybersecurity.',
    description:
      'From content writing and cybersecurity to data analytics, digital marketing, e-commerce, graphic design, IT consulting, logo design, social management, and full-stack web development, EFerz built MiniMog’s complete digital flagship.',
    secondaryText:
      'Engineered for high-velocity retail with real-time data analytics insights and fortified cloud security.',
    founderName: 'Mr. Taha Kamal',
    founderRole: 'Founder — MiniMog',
    testimonialQuote:
      'Our mission is to deliver the most compelling shopping experience for our customers. EFerz provided a true one-stop 10-service partnership — combining web excellence, data analytics, and cybersecurity to achieve 89% returning customers.',
    resultsSummary: 'Complete 10-pillar enterprise digital transformation with 89% customer retention.',
    returningRate: '89% Returning Customers',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'February 8, 2020',
    servicesProvided: [
      'Website Designing & Development',
      'Cyber Security',
      'Data Analytics',
      'E-Commerce Services',
      'IT Consulting',
      'Digital Marketing',
      'Graphic Design',
      'Logo Design',
      'Content Writing',
      'Social Accounts Management',
    ],
    liveUrl: 'https://minimog.pk/',
    eferzUrl: 'https://eferz.com/project/minimog/',
    image: '/portfolio/minimog.png',
    logo: '/portfolio/logos/minimog.png',
    shape: 'diamond',
    colorScheme: 'emerald',
    linkText: 'Explore portfolio showcase →',
  },
  {
    id: 'hidoose',
    tag: 'DIGITAL PUBLISHING & IT · 98% RETURNING TRAFFIC',
    title: 'HiDoose',
    subtitle: 'Redefining digital media and content architecture with analytics and security.',
    description:
      'EFerz collaborated with HiDoose to deliver comprehensive Information Technology services — including Website Designing & Development, Cyber Security, Data Analytics, IT Consulting, Graphic Design, Logo Design, Content Writing, and Digital Marketing.',
    secondaryText:
      'Empowering HiDoose to thrive in the digital era with fast page loads, data-backed publishing, and hardened security.',
    founderName: 'Mr. Khubaib Khan',
    founderRole: 'Founder — HiDoose',
    testimonialQuote:
      'Our mission is to deliver the most compelling digital experience for our readers and customers. With EFerz’s comprehensive IT services, cybersecurity, and data analytics, HiDoose achieved an extraordinary 98% returning traffic rate.',
    resultsSummary: '98% returning reader & user traffic powered by full-stack IT and analytics.',
    returningRate: '98% Returning Traffic',
    feedbackCount: '100+ Positive Feedbacks',
    sinceDate: 'December 29, 2018',
    servicesProvided: [
      'Website Designing & Development',
      'Cyber Security',
      'Data Analytics',
      'IT Consulting',
      'Digital Marketing',
      'Graphic Design',
      'Logo Design',
      'Content Writing',
      'Social Accounts Management',
    ],
    liveUrl: 'https://hidoose.com/',
    eferzUrl: 'https://eferz.com/project/hidoose/',
    image: '/portfolio/hidoose.webp',
    logo: '/portfolio/logos/hidoose.png',
    shape: 'pen',
    colorScheme: 'cyan',
    linkText: 'Explore portfolio showcase →',
  },
];

// Official 17 Portfolio Projects extracted directly from https://eferz.com/portfolio/
export const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'your-kitchen-is-cooking',
    num: '01',
    slug: 'your-kitchen-is-cooking',
    year: '2025',
    category: 'Website Development · Digital Marketing · Branding',
    primaryFilter: 'Web & E-Commerce',
    title: 'Your Kitchen is Cooking',
    client: 'Your Kitchen is Cooking',
    image: '/portfolio/your-kitchen-is-cooking.webp',
    logo: '/portfolio/logos/your-kitchen-is-cooking.webp',
    remoteImage: 'https://eferz.com/wp-content/uploads/2025/06/YourKitchenisCooking-Mockup.webp',
    liveUrl: 'https://www.yourkitcheniscooking.com/',
    eferzUrl: 'https://eferz.com/project/your-kitchen-is-cooking/',
    mockupType: 'imac',
    description:
      'Full-spectrum digital flagship for Your Kitchen is Cooking — combining custom Website Designing & Development, Logo Design, Graphic Design, IT Consulting, and high-conversion Digital Marketing.',
    secondaryDescription:
      'Built to deliver a seamless, modern culinary shopping experience with responsive device views, curated product collections, and social commerce integration.',
    tags: [
      'Website Designing & Development',
      'Digital Marketing',
      'Graphic Design',
      'IT Consulting',
      'Logo Design',
      'Social Accounts Management',
    ],
    accentColor: '#ec3935',
  },
  {
    id: 'sustagro',
    num: '02',
    slug: 'sustagro',
    year: '2025',
    category: 'Digital Marketing · Social Accounts · AgTech',
    primaryFilter: 'Digital Marketing',
    title: 'Sustagro',
    client: 'Sustagro',
    image: '/portfolio/sustagro.webp',
    logo: '/portfolio/logos/sustagro.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2025/06/Sustagro-Mockup.webp',
    liveUrl: 'https://sustagro.com/',
    eferzUrl: 'https://eferz.com/project/sustagro/',
    mockupType: 'macbook',
    description:
      'Strategic digital growth and brand presence for Sustagro — connecting sustainable agriculture innovations with modern B2B and B2C audiences through data-driven marketing and social ecosystem management.',
    secondaryDescription:
      'Engineered to showcase sustainable product lines with clean visual hierarchy and measurable audience engagement.',
    tags: ['Digital Marketing', 'Social Accounts Management', 'Brand Strategy', 'Web Showcase'],
    accentColor: '#48bb78',
  },
  {
    id: 'instashop',
    num: '03',
    slug: 'instashop',
    year: '2025',
    category: 'Website Development · E-Commerce · Social Growth',
    primaryFilter: 'Web & E-Commerce',
    title: 'InstaShop',
    client: 'InstaShop PK',
    image: '/portfolio/instashop.webp',
    logo: '/portfolio/logos/instashop.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2025/06/InstaShop-Mockup.webp',
    liveUrl: 'https://instashop.com.pk/',
    eferzUrl: 'https://eferz.com/project/instashop/',
    mockupType: 'dual',
    description:
      'InstaShop is an online destination built for the next generation of shoppers. EFerz revolutionized their shopping experience by blending human connection with cutting-edge web technology.',
    secondaryDescription:
      'Making every purchase simple, social, and enjoyable through ultra-fast mobile & desktop storefronts and omnichannel social management.',
    tags: ['Website Development', 'Digital Marketing', 'Social Accounts Management', 'E-Commerce'],
    accentColor: '#4fd1c5',
  },
  {
    id: 'al-shiekh-curtain-interiors',
    num: '04',
    slug: 'al-shiekh-curtain-interiors',
    year: '2025',
    category: 'Website Development · Luxury Branding · Digital Marketing',
    primaryFilter: 'Branding & Design',
    title: 'Al-Shiekh Curtain & Interiors',
    client: 'Al-Shiekh Curtain & Interiors',
    image: '/portfolio/al-shiekh-curtain-interiors.webp',
    logo: '/portfolio/logos/al-shiekh-curtain-interiors.webp',
    remoteImage: 'https://eferz.com/wp-content/uploads/2025/06/AlSheikh-Mockup.webp',
    liveUrl: 'https://alshiekhcurtaininterior.com/',
    eferzUrl: 'https://eferz.com/project/al-shiekh-curtain-interiors/',
    mockupType: 'imac',
    description:
      'EFerz collaborated with Al-Shiekh Curtain & Interiors to architect a luxury digital showcase, pairing bespoke Website Designing & Development with Logo Design, Graphic Design, and targeted Digital Marketing.',
    secondaryDescription:
      'Delivering targeted strategies that propelled Al-Shiekh Curtain & Interiors’ online presence and client inquiries to unprecedented levels.',
    tags: [
      'Website Designing & Development',
      'Logo Design',
      'Graphic Design',
      'Digital Marketing',
      'IT Consulting',
      'Social Accounts Management',
    ],
    accentColor: '#ecc78e',
  },
  {
    id: 'airtilize',
    num: '05',
    slug: 'airtilize',
    year: '2025',
    category: 'Website Development · IT Consulting · Digital Marketing',
    primaryFilter: 'Web & E-Commerce',
    title: 'Airtilize',
    client: 'Airtilize',
    image: '/portfolio/airtilize.webp',
    logo: '/portfolio/logos/airtilize.webp',
    remoteImage: 'https://eferz.com/wp-content/uploads/2025/06/Airtilize-Mockup.webp',
    liveUrl: 'https://airtilize.com/',
    eferzUrl: 'https://eferz.com/project/airtilize/',
    mockupType: 'macbook',
    description:
      'Complete digital ecosystem for Airtilize — encompassing custom Website Designing & Development, Logo Design, Graphic Design, IT Consulting, and performance Digital Marketing.',
    secondaryDescription:
      'Crafted with responsive multi-device layouts and high-conversion user journeys tailored for modern digital commerce.',
    tags: [
      'Website Designing & Development',
      'IT Consulting',
      'Digital Marketing',
      'Graphic Design',
      'Logo Design',
      'Social Accounts Management',
    ],
    accentColor: '#63b3ed',
  },
  {
    id: 'trendifytoday',
    num: '06',
    slug: 'trendifytoday',
    year: '2022',
    category: 'E-Commerce Storefront · Brand Identity · Marketing',
    primaryFilter: 'Web & E-Commerce',
    title: 'TrendifyToday',
    client: 'TrendifyToday',
    image: '/portfolio/trendifytoday.png',
    logo: '/portfolio/logos/trendifytoday.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2025/07/TrendifyToday-Mockup.png',
    liveUrl: 'https://www.trendifytoday.com/',
    eferzUrl: 'https://eferz.com/project/trendifytoday/',
    mockupType: 'dual',
    description:
      'At TrendifyToday, customers explore an ever-updated selection of premium coffees from trusted brands at everyday prices. EFerz engineered their web storefront, visual identity, and digital marketing funnel.',
    secondaryDescription:
      'Whether craving a rich espresso, smooth medium roast, or bold blend, TrendifyToday makes product discovery seamless across desktop, tablet, and mobile.',
    tags: [
      'Website Designing & Development',
      'Digital Marketing',
      'Graphic Design',
      'IT Consulting',
      'Logo Design',
      'Social Accounts Management',
    ],
    accentColor: '#f6ad55',
  },
  {
    id: 'clickvolo',
    num: '07',
    slug: 'clickvolo',
    year: '2022',
    category: 'Digital Marketing · Social Accounts Management',
    primaryFilter: 'Digital Marketing',
    title: 'ClickVolo',
    client: 'ClickVolo',
    image: '/portfolio/clickvolo.webp',
    logo: '/portfolio/logos/clickvolo.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2022/08/ClickVolo-Mockup.webp',
    liveUrl: 'https://www.instagram.com/clickvolo',
    eferzUrl: 'https://eferz.com/project/clickvolo/',
    mockupType: 'macbook',
    description:
      'EFerz collaborated with ClickVolo to deliver potent Digital Marketing and Social Accounts Management services — executing targeted growth strategies that elevated online reach and conversion velocity.',
    secondaryDescription:
      'Combining precision audience segmentation with high-impact creative assets across social and web channels.',
    tags: ['Digital Marketing', 'Social Accounts Management', 'Performance Growth'],
    accentColor: '#ec3935',
  },
  {
    id: 'khuzair',
    num: '08',
    slug: 'khuzair',
    year: '2022',
    category: 'E-Commerce Services · Logo Design · Content & Marketing',
    primaryFilter: 'Branding & Design',
    title: 'Khuzair',
    client: 'Khuzair Official',
    image: '/portfolio/khuzair.webp',
    logo: '/portfolio/logos/khuzair.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2022/08/Khuzair-Mockup.webp',
    liveUrl: 'https://www.instagram.com/khuzairofficial',
    eferzUrl: 'https://eferz.com/project/khuzair/',
    mockupType: 'dual',
    description:
      'EFerz partnered with Khuzair to deliver impactful E-Commerce Services, bespoke Logo Design, Content Writing, and Digital Marketing — elevating brand authority and customer engagement.',
    secondaryDescription:
      'Crafted to blend timeless brand aesthetics with modern social commerce conversion pipelines.',
    tags: ['E-Commerce Services', 'Logo Design', 'Content Writing', 'Digital Marketing'],
    accentColor: '#d69e2e',
  },
  {
    id: 'affordablethings',
    num: '09',
    slug: 'affordablethings',
    year: '2021',
    category: 'E-Commerce Services · Digital Marketing · Logo Design',
    primaryFilter: 'Digital Marketing',
    title: 'AffordableThings',
    client: 'The Affordable Things',
    image: '/portfolio/affordablethings.webp',
    logo: '/portfolio/logos/affordablethings.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2022/08/AffordableThings-Mockup.webp',
    liveUrl: 'https://www.instagram.com/theaffordablethings',
    eferzUrl: 'https://eferz.com/project/affordablethings/',
    mockupType: 'imac',
    description:
      'EFerz collaborated with AffordableThings to amplify online presence, drive shopper engagement, and pair everyday affordability with high-impact E-Commerce Services, Logo Design, and Digital Marketing.',
    secondaryDescription:
      'Designed to maximize catalog visibility and social conversion across multi-device touchpoints.',
    tags: ['Digital Marketing', 'E-Commerce Services', 'Logo Design'],
    accentColor: '#4fd1c5',
  },
  {
    id: 'storeara',
    num: '10',
    slug: 'storeara',
    year: '2021',
    category: 'Full-Stack E-Commerce · Data Analytics · IT Consulting',
    primaryFilter: 'IT & Security',
    title: 'StoreAra',
    client: 'Official StoreAra',
    image: '/portfolio/storeara.png',
    logo: '/portfolio/logos/storeara.jpg',
    remoteImage: 'https://eferz.com/wp-content/uploads/2021/10/StoreAra-Mockup.png',
    liveUrl: 'https://www.instagram.com/officialstoreara',
    eferzUrl: 'https://eferz.com/project/storeara/',
    mockupType: 'dual',
    description:
      'EFerz delivered an 8-pillar digital transformation for StoreAra — spanning Website Designing & Development, Data Analytics, E-Commerce Services, IT Consulting, Logo Design, Content Writing, and Digital Marketing.',
    secondaryDescription:
      'Empowering data-backed merchandising and seamless multi-device shopping experiences.',
    tags: [
      'Website Designing & Development',
      'Data Analytics',
      'E-Commerce Services',
      'IT Consulting',
      'Digital Marketing',
      'Logo Design',
      'Content Writing',
      'Social Accounts Management',
    ],
    accentColor: '#ec3935',
  },
  {
    id: 'reflectivethings',
    num: '11',
    slug: 'reflectivethings',
    year: '2021',
    category: 'E-Commerce Services · IT Consulting · Logo Design',
    primaryFilter: 'Branding & Design',
    title: 'ReflectiveThings',
    client: 'ReflectiveThings Shop',
    image: '/portfolio/reflectivethings.png',
    logo: '/portfolio/logos/reflectivethings.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2021/08/ReflectiveThings-Mockup.png',
    liveUrl: 'https://www.instagram.com/reflectivethingsshop',
    eferzUrl: 'https://eferz.com/project/reflectivethings/',
    mockupType: 'imac',
    description:
      'EFerz collaborated with ReflectiveThings to illuminate their online brand presence, combining custom Logo Design, IT Consulting, E-Commerce Services, and Digital Marketing.',
    secondaryDescription:
      'Engineered to reflect the unique identity of the brand while streamlining online customer acquisition.',
    tags: ['Digital Marketing', 'E-Commerce Services', 'IT Consulting', 'Logo Design'],
    accentColor: '#9f7aea',
  },
  {
    id: 'fitwearstores',
    num: '12',
    slug: 'fitwearstores',
    year: '2020',
    category: 'E-Commerce · Cyber Security · Web Development',
    primaryFilter: 'IT & Security',
    title: 'FitWearStores',
    client: 'FitWearStores',
    image: '/portfolio/fitwearstores.webp',
    logo: '/portfolio/logos/fitwearstores.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2022/08/FitwearStores-Mockup.webp',
    liveUrl: 'https://www.fitwearstores.com/',
    eferzUrl: 'https://eferz.com/project/fitwearstores/',
    mockupType: 'dual',
    description:
      'EFerz sculpted a high-performance athletic e-commerce platform for FitWearStores — integrating Website Designing & Development, Cyber Security, E-Commerce Services, Graphic Design, and IT Consulting.',
    secondaryDescription:
      'Built to promote active lifestyles, engage global fitness audiences, and secure high-volume online transactions.',
    tags: [
      'Website Designing & Development',
      'Cyber Security',
      'E-Commerce Services',
      'Digital Marketing',
      'Graphic Design',
      'IT Consulting',
      'Logo Design',
      'Content Writing',
    ],
    accentColor: '#48bb78',
  },
  {
    id: 'charmthings',
    num: '13',
    slug: 'charmthings',
    year: '2020',
    category: 'E-Commerce · Cyber Security · Brand & Web',
    primaryFilter: 'Web & E-Commerce',
    title: 'CharmThings',
    client: 'CharmThings',
    image: '/portfolio/charmthings.webp',
    logo: '/portfolio/logos/charmthings.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2025/06/CharmThings-Mockup.webp',
    liveUrl: 'https://charmthings.com/',
    eferzUrl: 'https://eferz.com/project/charmthings/',
    mockupType: 'macbook',
    description:
      'EFerz partnered with CharmThings to elevate their online retail store through custom Website Designing & Development, Cyber Security, E-Commerce Services, Graphic Design, and Digital Marketing.',
    secondaryDescription:
      'Transforming online shopping by combining intuitive UX with fortified checkout security and social brand storytelling.',
    tags: [
      'Website Designing & Development',
      'Cyber Security',
      'E-Commerce Services',
      'Digital Marketing',
      'Graphic Design',
      'Logo Design',
      'Content Writing',
    ],
    accentColor: '#ed64a6',
  },
  {
    id: 'allthingsdesire',
    num: '14',
    slug: 'allthingsdesire',
    year: '2020',
    category: 'Website Design & Development · E-Commerce · Logo Design',
    primaryFilter: 'Web & E-Commerce',
    title: 'AllThingsDesire',
    client: 'All Things Desire',
    image: '/portfolio/allthingsdesire.webp',
    logo: '/portfolio/logos/allthingsdesire.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2025/06/ATD-Mockup.webp',
    liveUrl: 'https://allthingsdesire.com/',
    eferzUrl: 'https://eferz.com/project/allthingsdesire/',
    mockupType: 'imac',
    description:
      'EFerz partnered with AllThingsDesire to provide top-notch Website Design & Development, E-Commerce Services, and Logo Design — crafting a digital presence that embodies user-centric design and seamless global shipping.',
    secondaryDescription:
      'Built on the philosophy that great shopping should be accessible worldwide with effortless catalog browsing.',
    tags: ['Website Designing & Development', 'E-Commerce Services', 'Logo Design'],
    accentColor: '#f6ad55',
  },
  {
    id: 'aapnaonlinestore',
    num: '15',
    slug: 'aapnaonlinestore',
    year: '2020',
    category: 'Website Designing & Development · Logo Design',
    primaryFilter: 'Web & E-Commerce',
    title: 'AapnaOnlineStore',
    client: 'Aapna Online Store',
    image: '/portfolio/aapnaonlinestore.webp',
    logo: '/portfolio/logos/aapnaonlinestore.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2025/06/AapnaOnlineStore-Mockup.webp',
    liveUrl: 'https://aapnaonlinestore.com/',
    eferzUrl: 'https://eferz.com/project/aapnaonlinestore/',
    mockupType: 'dual',
    description:
      'AapnaOnlineStore is an immersive online shopping destination crafted with precision by EFerz — featuring custom Website Designing & Development and signature Logo Design for next-generation retail.',
    secondaryDescription:
      'Engineered to make online shopping simple, social, and fast across desktop and mobile devices.',
    tags: ['Website Designing & Development', 'Logo Design', 'E-Commerce UX'],
    accentColor: '#ec3935',
  },
  {
    id: 'minimog',
    num: '16',
    slug: 'minimog',
    year: '2020',
    category: 'Full 10-Service Enterprise Suite · E-Commerce & Security',
    primaryFilter: 'IT & Security',
    title: 'MiniMog',
    client: 'MiniMog PK',
    image: '/portfolio/minimog.png',
    logo: '/portfolio/logos/minimog.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2020/02/MiniMog-Mockup.png',
    liveUrl: 'https://minimog.pk/',
    eferzUrl: 'https://eferz.com/project/minimog/',
    mockupType: 'imac',
    description:
      'EFerz delivered a comprehensive 10-service suite for MiniMog — spanning Content Writing, Cyber Security, Data Analytics, Digital Marketing, E-Commerce Services, Graphic Design, IT Consulting, Logo Design, Social Management, and Web Development.',
    secondaryDescription:
      'A flagship multi-device retail ecosystem engineered for high-traffic reliability and conversion optimization.',
    tags: [
      'Website Designing & Development',
      'Cyber Security',
      'Data Analytics',
      'E-Commerce Services',
      'IT Consulting',
      'Digital Marketing',
      'Graphic Design',
      'Logo Design',
    ],
    accentColor: '#4fd1c5',
  },
  {
    id: 'hidoose',
    num: '17',
    slug: 'hidoose',
    year: '2018',
    category: 'IT Consulting · Cyber Security · Data Analytics · Web',
    primaryFilter: 'IT & Security',
    title: 'HiDoose',
    client: 'HiDoose Media',
    image: '/portfolio/hidoose.webp',
    logo: '/portfolio/logos/hidoose.png',
    remoteImage: 'https://eferz.com/wp-content/uploads/2018/12/HiDoose-Mockup.webp',
    liveUrl: 'https://hidoose.com/',
    eferzUrl: 'https://eferz.com/project/hidoose/',
    mockupType: 'macbook',
    description:
      'EFerz collaborated with HiDoose to deliver comprehensive Information Technology services — including Website Designing & Development, Cyber Security, Data Analytics, IT Consulting, Graphic Design, and Digital Marketing.',
    secondaryDescription:
      'Redefining digital publishing and content architecture with fast page loads, analytics insights, and hardened security.',
    tags: [
      'Website Designing & Development',
      'Cyber Security',
      'Data Analytics',
      'IT Consulting',
      'Digital Marketing',
      'Graphic Design',
      'Logo Design',
      'Content Writing',
    ],
    accentColor: '#ec3935',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'khubaib-khan',
    name: 'Khubaib Khan',
    role: 'FOUNDER & PRESIDENT',
    shape: 'crown',
    matrixPattern: 'ceo',
    photo: '/assets/aistudio/Khubaib_Khan_cutout.png',
    objectPosition: 'center top',
    socials: {
      linkedin: 'https://www.linkedin.com/in/khubaibkhan/',
      facebook: 'https://www.facebook.com/KhuBaiB.kK/',
      instagram: 'https://www.instagram.com/khubaibkhan_kk/',
    },
    bio: [
      'As Founder & President of EFerz Digital Agency (founded in 2020), Khubaib Khan spearheads the agency’s global vision across our USA Headquarters in Fort Lauderdale, Florida, regional offices in Saudi Arabia (Riyadh) and Pakistan (Karachi), and international client ecosystems worldwide.',
      'Combining deep expertise in enterprise IT strategy, AI-driven automation, 3D WebGL platforms, and global e-commerce scaling, he leads executive strategy and ensures every client partnership lives up to EFerz’s founding creed: "Nothing Is Impossible In The IT World."',
    ],
  },
  {
    id: 'salman-shahid',
    name: 'Salman Shahid',
    role: 'CO-FOUNDER & DIRECTOR OF FINANCE & LEGAL AFFAIRS',
    shape: 'shield',
    matrixPattern: 'cto',
    photo: '/assets/aistudio/Salman_Shahid_cutout.png',
    objectPosition: 'center top',
    socials: {
      linkedin: 'https://www.linkedin.com/in/salmanshahidofficial/',
      facebook: 'https://www.facebook.com/maanshahid',
      instagram: 'https://www.instagram.com/maanshahid/',
    },
    bio: [
      'As Co-Founder & Director of Finance & Legal Affairs, Salman Shahid has played a significant role in EFerz since its founding in 2020 — architecting the financial governance, international corporate compliance, and legal frameworks that power EFerz’s multi-country operations across the United States, Kingdom of Saudi Arabia, Pakistan, and global markets.',
      'He oversees cross-border enterprise agreements, intellectual property protection, 100% client ownership guarantees, and strategic capital planning — ensuring every global engagement is transparent, rock-solid, and built for sustainable long-term growth.',
    ],
  },
  {
    id: 'irfan-mirza',
    name: 'Irfan Mirza',
    role: 'DIRECTOR OF BUSINESS DEVELOPMENT',
    shape: 'globe',
    matrixPattern: 'pm',
    photo: '/assets/aistudio/Irfan_Mirza_cutout.png',
    objectPosition: 'center top',
    socials: {
      linkedin: 'https://www.linkedin.com/in/irfan-mirza-76a375255/',
    },
    bio: [
      'As Director of Business Development, Irfan Mirza leads global client partnerships, enterprise discovery, and commercial expansion for EFerz across North America, the GCC, Europe, and international markets worldwide.',
      'With a sharp focus on aligning complex client objectives with high-ROI digital ecosystems — spanning custom software, AI agents, Shopify Plus, Amazon FBA, and enterprise SEO — he transforms ambitious business visions into measurable global market leadership.',
    ],
  },
  {
    id: 'syed-ahmed',
    name: 'Syed Ahmed',
    role: 'BUSINESS DEVELOPMENT MANAGER',
    shape: 'rocket',
    matrixPattern: 'social',
    photo: '/assets/aistudio/Syed_Ahmed_3d79a4c0.png',
    objectPosition: 'center top',
    bio: [
      'As Business Development Manager at EFerz Digital Agency, Syed Ahmed manages international client onboarding, strategic consultation, and tailored project roadmaps for startups and established enterprises worldwide.',
      'He bridges the gap between client growth targets and EFerz’s engineering, marketing, and creative departments — ensuring rapid response times, clear milestone scoping, and high-converting digital strategies.',
    ],
  },
  {
    id: 'asad-malik',
    name: 'Asad Malik',
    role: 'WEBSITE DESIGNER & DEVELOPER',
    shape: 'monitor',
    matrixPattern: 'creative',
    photo: '/assets/aistudio/Asad_Malik_cutout.png',
    objectPosition: 'center top',
    bio: [
      'As Website Designer & Developer at EFerz, Asad Malik engineers high-performance web applications, bespoke WordPress & WooCommerce architectures, interactive 3D WebGL experiences, and conversion-focused UI/UX design systems.',
      'From pixel-perfect responsive interfaces to lightning-fast full-stack implementations, he ensures every digital platform built by EFerz delivers world-class speed, security, and visual impact.',
    ],
  },
  {
    id: 'syed-owais',
    name: 'Syed Owais',
    role: 'OPERATIONS COORDINATOR',
    shape: 'sphere',
    matrixPattern: 'art',
    photo: '/assets/aistudio/Syed_Owais_1f8d91ac.png',
    objectPosition: 'center top',
    bio: [
      'As Operations Coordinator at EFerz Digital Agency, Syed Owais orchestrates day-to-day project execution, cross-functional sprint workflows, and quality assurance standards across our USA, Saudi Arabia, and Pakistan hubs.',
      'He ensures every client deliverable — from software engineering and cybersecurity audits to branding and digital marketing campaigns — stays strictly on schedule and exceeds international SLA benchmarks.',
    ],
  },
];

export const AGENCY_STATS: StatItem[] = [
  { value: '17+', label: 'flagship portfolio launches' },
  { value: '60+', label: 'worldwide clients served' },
  { value: '100%', label: 'bespoke engineering' },
  { value: '+180%', label: 'client growth rate' },
  { value: '3', label: 'global offices (USA HQ · KSA · PK)' },
  { value: '2020', label: 'founded in 2020' },
];

export const TECH_MARQUEE = [
  'REACT.JS',
  'NEXT.JS',
  'TYPESCRIPT',
  'NODE.JS',
  'WEBGL',
  'THREE.JS',
  'SHOPIFY PLUS',
  'AMAZON FBA',
  'CYBERSECURITY',
  'ART DIRECTION',
  'ARTIFICIAL INTELLIGENCE',
  'DATA ANALYTICS',
  'TAILWIND CSS',
  'CLOUD IT SOLUTIONS',
];
