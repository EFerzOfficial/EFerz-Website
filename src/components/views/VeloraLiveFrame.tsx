import React, { useEffect, useMemo, useRef } from 'react';

export interface VeloraProductItem {
  name: string;
  categoryLabel: string;
  groupIndex: 1 | 2 | 3; // 1 = Serums & Oils, 2 = Face Creams, 3 = Lips & Fragrance
  tagline: string;
  description: string;
  colorHex: string;
  bgHex: string;
  lidHex: string;
  shapeIndex: 0 | 1 | 2 | 3; // 0 = Jar, 1 = Dropper Bottle, 2 = Lipstick, 3 = Parfum Bottle
  sizeText: string;
  notes: string;
  ingredients: string;
  price: number;
  customImageUrl?: string | null;
}

export interface VeloraOrbStageItem {
  title: string;
  description: string;
  colors: [string, string, string];
}

export interface VeloraRitualItem {
  number: string;
  title: string;
  duration: string;
  description: string;
  included: [string, string, string];
  bgHex: string;
  petalHex: string;
  centerHex: string;
  petalCount: number;
}

export interface VeloraReviewItem {
  author: string;
  quote: string;
}

export interface VeloraStatItem {
  number: number;
  label: string;
}

export interface VeloraCustomizationConfig {
  brandName: string;
  brandSub: string;
  logoImageUrl: string | null;
  loaderImageUrl?: string | null;
  navLinks: [string, string, string, string, string, string];
  heroBigTitle: string;
  heroTagline: string;
  heroBadgeText: string;
  collectionEyebrow: string;
  collectionTitlePrefix: string;
  collectionTitleItalic: string;
  collectionLead: string;
  products: VeloraProductItem[];
  orbStages: [VeloraOrbStageItem, VeloraOrbStageItem, VeloraOrbStageItem];
  ingredientsEyebrow: string;
  ingredientsTitlePrefix: string;
  ingredientsTitleItalic: string;
  ingredientsLead: string;
  ritualsEyebrow: string;
  ritualsTitlePrefix: string;
  ritualsTitleItalic: string;
  ritualsLead: string;
  rituals: [VeloraRitualItem, VeloraRitualItem, VeloraRitualItem];
  aboutEyebrow: string;
  aboutTitlePrefix: string;
  aboutTitleItalic: string;
  aboutTitleSuffix: string;
  aboutLead: string;
  stats: [VeloraStatItem, VeloraStatItem, VeloraStatItem, VeloraStatItem];
  reviewsEyebrow: string;
  reviewsTitlePrefix: string;
  reviewsTitleItalic: string;
  reviews: VeloraReviewItem[];
  contactEyebrow: string;
  contactTitlePrefix: string;
  contactTitleItalic: string;
  contactLead: string;
  contactEmail: string;
  contactHours: string;
  footerTagline: string;
  footerStudioAddress: string;
  footerLabAddress: string;
  footerCopyright: string;
  customHtmlOverride: string | null;
}

export type VeloraSectionId =
  | 'brand'
  | 'hero'
  | 'products'
  | 'orb'
  | 'ingredients'
  | 'rituals'
  | 'about'
  | 'reviews'
  | 'contact'
  | 'footer'
  | 'html';

export interface VeloraSelectionMessage {
  type: 'VELORA_SELECT_SECTION';
  section: VeloraSectionId;
  productIndex?: number;
  label?: string;
}

interface VeloraLiveFrameProps {
  config: VeloraCustomizationConfig;
  selectedSection?: VeloraSectionId;
  selectedProductIndex?: number;
  inspectorEnabled?: boolean;
  onSelectElement?: (
    section: VeloraSectionId,
    productIndex?: number,
    label?: string
  ) => void;
}

export const createInitialVeloraConfig = (): VeloraCustomizationConfig => ({
  brandName: 'Velora',
  brandSub: 'Botanics',
  logoImageUrl: null,
  loaderImageUrl: null,
  navLinks: ['Home', 'Collection', 'Ingredients', 'Rituals', 'About', 'Contacts'],
  heroBigTitle: 'VELORA',
  heroTagline:
    'Velora Botanics: haute botanical skincare, velvet lip colour and artisanal eau de parfum — crafted where cold-pressed plants meet cellular science.',
  heroBadgeText: 'GLOW FROM WITHIN • HAUTE BOTANICALS • ',
  collectionEyebrow: 'CLEAN BEAUTY, THOUGHTFULLY MADE',
  collectionTitlePrefix: 'The',
  collectionTitleItalic: 'collection',
  collectionLead:
    'Every formula is compounded in small batches with cold-pressed plant actives, bio-fermented peptides, and refillable French glass. Zero parabens, zero silicones, cruelty-free.',
  products: [
    {
      name: 'Rosehip Glow Serum',
      categoryLabel: 'SERUMS & OILS',
      groupIndex: 1,
      tagline: 'Radiant, dewy and bright',
      description:
        'A lightweight facial elixir with cold-pressed Andean rosehip, sea buckthorn and vitamin E to even tone and awaken a glass-skin glow.',
      colorHex: '#e3a36b',
      bgHex: '#f9e0d0',
      lidHex: '#c9a063',
      shapeIndex: 1,
      sizeText: '30 ml',
      notes: 'Rosehip seed, wild geranium, warm musk',
      ingredients: 'Rosa Canina Seed Oil, Olive Squalane, Tocopherol (Vitamin E), Pelargonium Graveolens',
      price: 38,
    },
    {
      name: 'Vitamin C Brightening Serum',
      categoryLabel: 'SERUMS & OILS',
      groupIndex: 1,
      tagline: 'Fresh, citrusy and clarifying',
      description:
        'A clinical 10% ascorbyl glucoside & ferulic acid serum that visibly fades hyperpigmentation and shields skin from daily oxidative stress.',
      colorHex: '#f2b441',
      bgHex: '#ffe7bd',
      lidHex: '#c98f86',
      shapeIndex: 1,
      sizeText: '30 ml',
      notes: 'Sicilian neroli, sweet mandarin peel',
      ingredients: 'Ascorbyl Glucoside (10%), Ferulic Acid, Organic Aloe Barbadensis, Botanical Glycerin',
      price: 42,
    },
    {
      name: 'Hyaluronic Hydra Serum',
      categoryLabel: 'SERUMS & OILS',
      groupIndex: 1,
      tagline: 'Cooling and deeply hydrating',
      description:
        'Three molecular weights of bio-fermented hyaluronic acid drench skin from the surface down to the dermal matrix.',
      colorHex: '#9ccbe0',
      bgHex: '#dff0f6',
      lidHex: '#2a1a1f',
      shapeIndex: 1,
      sizeText: '30 ml',
      notes: 'Pure botanical hydrosol (Fragrance-Free)',
      ingredients: 'Multi-Weight Sodium Hyaluronate (2%), Vitamin B5 (Panthenol), Alpine Glacier Water',
      price: 36,
    },
    {
      name: 'Shea Night Cream',
      categoryLabel: 'FACE CREAMS',
      groupIndex: 2,
      tagline: 'Rich, soft and restoring',
      description:
        'A velvety overnight cocoon with unrefined Ghanaian shea butter and biomimetic ceramides that rebuild the lipid barrier while you sleep.',
      colorHex: '#f1dcc0',
      bgHex: '#f6e8dc',
      lidHex: '#c9a063',
      shapeIndex: 0,
      sizeText: '50 ml',
      notes: 'Warm shea, Madagascar vanilla, sweet almond',
      ingredients: 'Butyrospermum Parkii (Shea), Ceramide NP/AP/EOP, Simmondsia Chinensis (Jojoba), Squalane',
      price: 54,
    },
    {
      name: 'Rose Petal Day Cream',
      categoryLabel: 'FACE CREAMS',
      groupIndex: 2,
      tagline: 'Light, calming and glowing',
      description:
        'A weightless whipped day emulsion infused with Damask rose distillate, 4% niacinamide and invisible mineral SPF 30.',
      colorHex: '#ebb0bc',
      bgHex: '#fbdde3',
      lidHex: '#c98f86',
      shapeIndex: 0,
      sizeText: '50 ml',
      notes: 'Damask rose petal, white peony',
      ingredients: 'Rosa Damascena Flower Water, Niacinamide (4%), Non-Nano Zinc Oxide (SPF 30), Squalane',
      price: 48,
    },
    {
      name: 'Velvet Lipstick Berry Rouge',
      categoryLabel: 'LIPS & FRAGRANCE',
      groupIndex: 3,
      tagline: 'Deep berry with a velvet finish',
      description:
        'A high-pigment couture lipstick with a plush matte finish, suspended in nourishing candelilla wax and cold-pressed berry seed oils.',
      colorHex: '#9c2b4a',
      bgHex: '#f3d3dc',
      lidHex: '#c9a063',
      shapeIndex: 2,
      sizeText: '3.5 g',
      notes: 'Tahitian vanilla bean, crushed berry',
      ingredients: 'Euphorbia Cerifera (Candelilla) Wax, Ricinus Communis, Shea Butter, Pure Mineral Pigments',
      price: 28,
    },
    {
      name: 'Satin Lipstick Nude Rose',
      categoryLabel: 'LIPS & FRAGRANCE',
      groupIndex: 3,
      tagline: 'Everyday nude with a satin shine',
      description:
        'A hydrating satin-balm lipstick in a universally flattering Parisian rose-nude that plumps and softens lips on contact.',
      colorHex: '#c4817c',
      bgHex: '#f6e0dc',
      lidHex: '#c98f86',
      shapeIndex: 2,
      sizeText: '3.5 g',
      notes: 'Soft vanilla, rose wax',
      ingredients: 'Candelilla Wax, Organic Jojoba Esters, Vitamin E, Damask Rose Flower Wax, Mineral Pigments',
      price: 28,
    },
    {
      name: 'Midnight Rose Eau de Parfum',
      categoryLabel: 'LIPS & FRAGRANCE',
      groupIndex: 3,
      tagline: 'Warm, floral and sensual',
      description:
        'Velvety Bulgarian rose and night-blooming Grasse jasmine layered over smoked amber, cashmere wood and sustainable Mysore sandalwood.',
      colorHex: '#d98aa0',
      bgHex: '#efd9e6',
      lidHex: '#c9a063',
      shapeIndex: 3,
      sizeText: '50 ml',
      notes: 'Bulgarian Rose, Grasse Jasmine, Warm Amber, Sandalwood',
      ingredients: 'Organic Wheat Alcohol, Parfum (Pure Botanical Absolutes), Rosa Damascena, Jasminum Grandiflorum',
      price: 86,
    },
  ],
  orbStages: [
    {
      title: 'Hydrate',
      description:
        'Three molecular weights of bio-fermented hyaluronic acid lock moisture into every dermal layer, delivering a 72-hour dewy cushion.',
      colors: ['#c4506a', '#f3b6c2', '#ffe3d0'],
    },
    {
      title: 'Brighten',
      description:
        'Clinical 10% vitamin C and cold-pressed Andean rosehip dissolve dullness and awaken a luminous, lit-from-within complexion.',
      colors: ['#c98a2e', '#f4d27a', '#fff3c8'],
    },
    {
      title: 'Restore',
      description:
        'Biomimetic ceramides and unrefined shea butter rebuild your skin barrier overnight — leaving skin calm, resilient and velvety.',
      colors: ['#2f7f94', '#9ad6e2', '#e6fbff'],
    },
  ],
  ingredientsEyebrow: 'THE POWER OF PLANTS & CLINICAL ACTIVES',
  ingredientsTitlePrefix: 'Nature,',
  ingredientsTitleItalic: 'proven',
  ingredientsLead:
    'We pair cold-pressed heirloom botanicals with dermatologist-validated actives at their exact clinical percentages — full transparency in every drop.',
  ritualsEyebrow: 'SLOW DOWN, GLOW UP',
  ritualsTitlePrefix: 'Beauty as a',
  ritualsTitleItalic: 'ritual',
  ritualsLead:
    'Step inside our botanical flagship atelier or follow our 4-step daily cellular ritual at home. Choose a private skin consultation, sculptural facial or bespoke perfumery session.',
  rituals: [
    {
      number: '01',
      title: 'The Skin Consultation',
      duration: '45 minutes',
      description:
        'A private one-to-one diagnostic session with our dermal botanist who maps your barrier health and formulates a custom morning & evening regimen.',
      included: ['3D dermal hydration mapping', 'Bespoke morning & night prescription card', '3 luxury 10 ml travel elixirs to take home'],
      bgHex: '#f9e0d0',
      petalHex: '#d9764a',
      centerHex: '#ffd9a8',
      petalCount: 8,
    },
    {
      number: '02',
      title: 'The Sculptural Facial Ritual',
      duration: '90 minutes',
      description:
        'A slow, restorative buccal and lymphatic facial layering our warm rosehip oils, cryo-globes and ceramide masks for instant sculptural lift.',
      included: ['Double botanical oil cleanse & steam', 'Buccal sculptural massage & LED therapy', 'Complimentary Rose Petal Day Cream mini'],
      bgHex: '#fbdde3',
      petalHex: '#d1607a',
      centerHex: '#ffd0da',
      petalCount: 10,
    },
    {
      number: '03',
      title: 'The Haute Fragrance Atelier',
      duration: '2 hours',
      description:
        'Sit at our perfumer’s organ and compose your own signature eau de parfum from rare Damask rose, Grasse jasmine, smoked amber and sandalwood.',
      included: ['Guided olfactory pyramid blending', 'Hand-crimped 30 ml engraved glass flacon', 'Artisanal rose-water tea & patisserie'],
      bgHex: '#efd9e6',
      petalHex: '#c98aa0',
      centerHex: '#f2d36a',
      petalCount: 6,
    },
  ],
  aboutEyebrow: 'OUR ATELIER & HERITAGE',
  aboutTitlePrefix: 'Rooted in',
  aboutTitleItalic: 'botany',
  aboutTitleSuffix: ', backed by science',
  aboutLead:
    'Velora Botanics began twelve years ago in an independent botanical laboratory with a single conviction: high-luxury skincare should be both clinically potent and 100% biocompatible. Today, our cosmetic chemists and master herbalists cold-press and compound every batch in house.',
  stats: [
    { number: 12, label: 'years of cellular research' },
    { number: 8, label: 'award-winning formulas' },
    { number: 30, label: 'cold-pressed botanicals' },
    { number: 100, label: '% vegan & refillable glass' },
  ],
  reviewsEyebrow: 'VERIFIED CLINICAL & COMMUNITY LOVE',
  reviewsTitlePrefix: 'Loved by',
  reviewsTitleItalic: 'real skin',
  reviews: [
    {
      author: 'Amina K. · Verified Buyer',
      quote: 'My skin has never looked this luminous. Three drops of the Rosehip Glow Serum every night completely transformed my texture.',
    },
    {
      author: 'Sana R. · Aesthetician',
      quote: 'The Shea Night Cream feels like whipped silk. My barrier recovered in four nights without a trace of heaviness.',
    },
    {
      author: 'Hira M. · Beauty Editor',
      quote: 'Velvet Lipstick in Berry Rouge is the ultimate French-girl berry — weightless, hydrating and stays put through dinner.',
    },
    {
      author: 'Zoya A. · Perfumery Collector',
      quote: 'Midnight Rose smells like a candlelit rose garden after rain. Warm sandalwood and real Bulgarian rose that lasts 10 hours.',
    },
    {
      author: 'Mehr S. · Sensitive Skin',
      quote: 'Finally a 10% Vitamin C serum that never stings or oxidizes. My post-acne marks faded noticeably in three weeks.',
    },
    {
      author: 'Dania F. · Architect',
      quote: 'The weighted apothecary glass bottles and gold droppers look like sculptures on my vanity — and the refills are effortless.',
    },
  ],
  contactEyebrow: 'PRIVATE CONCIERGE & STUDIO',
  contactTitlePrefix: 'Say',
  contactTitleItalic: 'hello',
  contactLead:
    'Questions about your skin regimen, a bespoke wholesale partnership, or booking a private studio ritual? Our concierge responds within one business day.',
  contactEmail: 'concierge@velorabotanics.example',
  contactHours: 'Flagship Atelier open Monday to Saturday · 10:00 to 19:00',
  footerTagline: 'Haute botanical skincare, velvet lip colour & artisanal fragrance.',
  footerStudioAddress: 'Flagship Studio: 8 Rue des Rosiers / Garden District',
  footerLabAddress: 'Botanical Lab: Villa Botanica, Grasse Valley',
  footerCopyright:
    '© 2026 Velora Botanics. Crafted for interactive 3D WebGL showcase. All formulas & designs original.',
  customHtmlOverride: null,
});

/**
 * Generates the next-level luxury Velora Botanics HTML + Three.js WebGL document:
 * - Refined Haute-Botanical editorial styling (glassmorphic cards, gold hairlines, botanical badges, luxury drawer cart)
 * - Upgraded 3D WebGL Vessels (Cream Jars with metallic gold collar, Serum Dropper Bottles with glass pipette + gold collar + rubber bulb, sculpted bevel Lipstick with gold band, faceted Eau de Parfum flacon with gold atomizer nozzle & dip tube, plus orbiting golden aura ring on the pedestal)
 * - 3D Cellular Essence Shader Orb with interactive stage selector buttons + scroll choreography
 * - 4-Step Daily Skin Ritual Builder + Botanicals vs Actives interactive tabs + Modal Quick-View + Slide-Over Shopping Bag Drawer
 * - Full Click-to-Edit Inspector Bridge
 */
export function buildVeloraExactHtml(config: VeloraCustomizationConfig): string {
  if (config.customHtmlOverride && config.customHtmlOverride.trim().length > 40) {
    return config.customHtmlOverride;
  }

  const serializedConfig = JSON.stringify(config).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${config.brandName} ${config.brandSub} — Haute Botanical 3D</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,900;1,9..144,400;1,9..144,600&family=DM+Sans:wght@400;500;700&display=swap">
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<style>
:root{
  --cream:#fbf3ee;
  --cream-2:#f5e6de;
  --ink:#231419;
  --mut:#73565e;
  --org:#c4506a;
  --gold:#c9a063;
  --grn:#8a6a3a;
  --tint:#ffd7c8;
  --c:#c4391d;
  box-sizing:border-box;
  padding-top:env(safe-area-inset-top,0px);
  padding-bottom:env(safe-area-inset-bottom,0px);
}
@property --tint{syntax:'<color>';inherits:true;initial-value:#ffd7c8}
@property --c{syntax:'<color>';inherits:true;initial-value:#c4391d}
:root{transition:--tint .85s cubic-bezier(.2,.8,.2,1),--c .85s cubic-bezier(.2,.8,.2,1)}
*{box-sizing:border-box}
body{margin:0;background:var(--cream);color:var(--ink);font-family:'DM Sans',system-ui,sans-serif;overflow-x:hidden}
h1,h2,h3,h4,.sf{font-family:'Fraunces',Georgia,serif}
a{color:inherit}
img,svg{max-width:100%}

/* ── CLICK-TO-EDIT INSPECTOR ── */
[data-edit-section]{position:relative;transition:outline .2s ease,box-shadow .2s ease}
body.inspector-on [data-edit-section]:hover{outline:2px dashed #c4506a;outline-offset:6px;cursor:pointer}
body.inspector-on [data-edit-section].is-selected-element{outline:2px solid #231419;outline-offset:6px;box-shadow:0 0 0 5px rgba(196,80,106,0.22)}
.edit-pill-badge{
  position:absolute;top:12px;right:12px;z-index:99;
  background:linear-gradient(135deg,#c4506a,#9c2b4a);color:#fbf3ee;
  font-family:'DM Sans',sans-serif;font-size:10px;font-weight:700;
  letter-spacing:1.3px;text-transform:uppercase;
  padding:5px 12px;border-radius:999px;
  box-shadow:0 8px 22px rgba(35,20,25,0.28);
  pointer-events:none;opacity:0;transform:translateY(-4px);
  transition:opacity .18s ease,transform .18s ease;
}
body.inspector-on [data-edit-section]:hover>.edit-pill-badge,
body.inspector-on [data-edit-section].is-selected-element>.edit-pill-badge{opacity:1;transform:translateY(0)}

/* ── LOADER (BYPASSED FOR INSTANT DEMO ACCESS) ── */
#ld{display:none !important}
#ld .rt{width:min(58vmin,320px);animation:sp 14s linear infinite}
#ld .rt text{font-size:10.2px;letter-spacing:3.4px;fill:var(--ink);font-weight:700}
#ld b{position:absolute;font-family:Fraunces,Georgia,serif;font-size:clamp(2.8rem,9vw,5rem);font-weight:900;color:var(--ink)}
#ld small{position:absolute;bottom:9vh;letter-spacing:.38em;font-size:.7rem;color:var(--mut);font-weight:700}
@keyframes sp{to{rotate:360deg}}

/* ── CUSTOM CURSOR ── */
#cr{position:fixed;left:0;top:0;width:36px;height:36px;margin:-18px 0 0 -18px;border:1.5px solid var(--ink);border-radius:50%;z-index:150;pointer-events:none;opacity:0;transition:width .25s,height .25s,margin .25s,background .25s,border-color .25s}
#cr.h{width:72px;height:72px;margin:-36px 0 0 -36px;background:rgba(196,80,106,0.16);border-color:var(--org)}
#cr.dg{width:86px;height:86px;margin:-43px 0 0 -43px;background:rgba(201,160,99,0.22);border-color:var(--gold)}
#cr.dg::after{content:'360°';position:absolute;inset:0;display:grid;place-items:center;font-size:.65rem;letter-spacing:.22em;font-weight:700;color:var(--ink)}
@media(hover:none){#cr{display:none}}

/* ── LUXURY GLASSMORPHIC NAVBAR ── */
nav{
  position:fixed;top:env(safe-area-inset-top,0px);left:0;right:0;z-index:60;
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 4vw;
  background:rgba(251,243,238,0.78);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(35,20,25,0.08);
}
.lg{font-family:Fraunces,Georgia,serif;font-weight:900;font-size:1.5rem;text-decoration:none;display:flex;align-items:center;gap:10px;letter-spacing:-.02em}
.lg svg{width:32px;height:32px;filter:drop-shadow(0 4px 10px rgba(196,80,106,0.25))}
.lg img{height:34px;width:auto;border-radius:8px;object-fit:contain}
.lg span{font-weight:400;font-style:italic;color:var(--org);margin-left:2px}
nav ul{display:flex;gap:28px;list-style:none;margin:0;padding:0}
nav ul a{text-decoration:none;font-size:.86rem;font-weight:600;letter-spacing:.04em;position:relative;padding:4px 0}
nav ul a::after{content:'';position:absolute;left:0;bottom:0;height:1.5px;width:0;background:var(--org);transition:width .3s}
nav ul a:hover::after{width:100%}
.rg{display:flex;gap:12px;align-items:center}
.lang{font-size:.74rem;letter-spacing:.18em;font-weight:700;color:var(--mut);padding:6px 12px;border-radius:99px;border:1px solid rgba(35,20,25,0.12)}
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  background:var(--ink);color:var(--cream);
  padding:12px 26px;border-radius:99px;text-decoration:none;
  font-weight:700;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;
  border:0;cursor:pointer;transition:background .3s,box-shadow .3s,transform .25s;
}
.btn:hover{background:var(--org);box-shadow:0 14px 32px rgba(196,80,106,0.32)}
.btn.o{background:rgba(251,243,238,0.65);color:var(--ink);border:1.5px solid var(--ink);backdrop-filter:blur(8px)}
.btn.o:hover{background:var(--ink);color:var(--cream)}
.bag-pill{background:var(--org);color:#fff;padding:2px 8px;border-radius:99px;font-size:.72rem;font-weight:800}
#bg{display:none;background:none;border:0;width:42px;height:42px;cursor:pointer;position:relative}
#bg i,#bg i::before{content:'';position:absolute;left:9px;width:24px;height:2px;background:var(--ink);transition:.3s}
#bg i{top:20px}#bg i::before{top:-7px;left:0}
#mn{position:fixed;inset:0;z-index:55;background:var(--cream);display:flex;flex-direction:column;justify-content:center;gap:12px;padding:0 8vw;transform:translateY(-100%);transition:transform .7s cubic-bezier(.76,0,.2,1)}
#mn.on{transform:none}
#mn a{font-family:Fraunces,Georgia,serif;font-size:2.4rem;text-decoration:none;font-weight:900}
@media(max-width:920px){nav ul,.lang{display:none}#bg{display:block}}

/* ── HERO 3D STAGE ── */
#hT{position:relative}
#hero{position:sticky;top:0;height:100vh;height:100dvh;min-height:660px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end}
#hero::before{
  content:'';position:absolute;left:50%;top:48%;
  width:min(76vh,76vw);height:min(76vh,76vw);translate:-50% -50%;
  border-radius:50%;
  background:radial-gradient(circle at 35% 30%,#ffffffaa,var(--tint) 62%,transparent 100%);
  box-shadow:inset 0 0 80px rgba(255,255,255,0.65),0 30px 90px rgba(196,80,106,0.12);
  transition:background .85s;
}
#hero::after{
  content:'';position:absolute;left:50%;top:48%;
  width:min(82vh,82vw);height:min(82vh,82vw);translate:-50% -50%;
  border-radius:50%;border:1px dashed rgba(201,160,99,0.45);
  pointer-events:none;animation:sp 60s linear infinite;
}
#gl{position:absolute;inset:0;width:100%;height:100%;z-index:2;cursor:grab;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.bt{
  position:absolute;left:0;right:0;top:12.5vh;text-align:center;
  font-family:Fraunces,Georgia,serif;font-weight:900;
  font-size:clamp(4.2rem,16.5vw,15.5rem);line-height:.82;letter-spacing:-.03em;
  color:transparent;-webkit-text-stroke:1.5px rgba(35,20,25,0.13);
  z-index:1;white-space:nowrap;user-select:none;pointer-events:none;
}
.h-top-card{
  position:absolute;z-index:3;top:11.5vh;left:4vw;max-width:min(380px,42vw);
  background:rgba(251,243,238,0.68);backdrop-filter:blur(12px);
  padding:14px 18px;border-radius:20px;border:1px solid rgba(35,20,25,0.09);
  box-shadow:0 12px 32px rgba(35,20,25,0.05);
}
.h-top-card small{display:block;font-size:.66rem;letter-spacing:.26em;text-transform:uppercase;color:var(--org);font-weight:700;margin-bottom:4px}
.h1{font-size:clamp(.92rem,1.25vw,1.12rem);line-height:1.45;margin:0;font-weight:500;color:var(--ink)}
.badge{position:absolute;z-index:3;right:4vw;top:14vh;width:clamp(104px,11.5vw,146px);animation:sp 22s linear infinite;filter:drop-shadow(0 10px 24px rgba(196,80,106,0.2))}
.badge text{font-size:11px;letter-spacing:3.3px;fill:var(--ink);font-weight:700}

/* Hero Floating Glass Product Info Card */
.info{
  position:absolute;z-index:4;left:4vw;bottom:13.5vh;max-width:min(440px,68vw);
  background:rgba(255,250,247,0.82);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  padding:24px 26px;border-radius:28px;
  border:1px solid rgba(201,160,99,0.35);
  box-shadow:0 24px 60px rgba(35,20,25,0.1);
}
.info-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}
.info small{letter-spacing:.26em;font-size:.68rem;color:var(--org);font-weight:700;text-transform:uppercase}
.info .sz-pill{font-size:.7rem;font-weight:700;letter-spacing:.12em;padding:3px 10px;border-radius:99px;background:rgba(35,20,25,0.07);color:var(--ink)}
.info h2{font-size:clamp(1.65rem,3.1vw,2.5rem);margin:.05em 0 .15em;line-height:1.05;letter-spacing:-.01em}
.info .tag-em{font-family:Fraunces,Georgia,serif;font-style:italic;color:var(--mut);font-size:.95rem;margin-bottom:8px;display:block}
.info p{margin:0 0 14px;color:var(--mut);line-height:1.55;font-size:.92rem}
.info .note-bar{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:12px;background:rgba(201,160,99,0.12);margin-bottom:16px;font-size:.78rem;color:var(--ink)}
.info .note-bar b{color:var(--grn);letter-spacing:.08em;text-transform:uppercase;font-size:.68rem}
.info>*{transition:opacity .4s,transform .4s}
.info.sw>*{opacity:0;transform:translateY(12px)}
.ib{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.pri{font-family:Fraunces,Georgia,serif;font-size:1.75rem;font-weight:900;color:var(--ink);margin-right:4px}

.ctr{
  position:absolute;z-index:4;right:4vw;bottom:14vh;
  display:flex;align-items:center;gap:14px;
  background:rgba(255,250,247,0.78);backdrop-filter:blur(14px);
  padding:8px 12px;border-radius:99px;border:1px solid rgba(35,20,25,0.12);
  box-shadow:0 14px 34px rgba(35,20,25,0.08);
}
.ctr b{font-family:Fraunces,Georgia,serif;font-size:1.15rem;font-variant-numeric:tabular-nums;padding:0 4px}
.ar{width:46px;height:46px;border-radius:50%;border:1.5px solid var(--ink);background:none;cursor:pointer;font-size:1.1rem;transition:background .3s,color .3s,transform .3s;color:var(--ink);display:grid;place-items:center}
.ar:hover{background:var(--ink);color:var(--cream);transform:scale(1.06)}

.pl{position:absolute;z-index:4;right:4vw;top:50%;translate:0 -50%;list-style:none;margin:0;padding:0;text-align:right;display:flex;flex-direction:column;gap:7px}
.pl li{font-family:Fraunces,Georgia,serif;font-size:.88rem;cursor:pointer;opacity:.38;transition:opacity .35s,transform .35s,color .35s;transform-origin:right;padding:2px 0}
.pl li.on{opacity:1;transform:scale(1.18);color:var(--c);font-weight:900}
.pl li:hover{opacity:.85}
.pb{position:absolute;z-index:5;left:0;top:0;height:4px;width:0;background:linear-gradient(90deg,var(--org),var(--gold))}
@media(max-width:1040px){.pl{display:none}}

.dh{
  position:absolute;z-index:4;left:50%;bottom:13.5vh;translate:-50% 0;
  font-size:.68rem;font-weight:700;letter-spacing:.26em;color:var(--ink);
  background:rgba(255,250,247,0.85);backdrop-filter:blur(10px);
  border:1px solid rgba(201,160,99,0.45);
  padding:9px 18px;border-radius:99px;transition:opacity .6s;pointer-events:none;
  animation:nd 2.4s ease-in-out infinite;
  box-shadow:0 10px 28px rgba(35,20,25,0.08);
}
@keyframes nd{50%{transform:translateX(8px)}}
.sd{position:absolute;z-index:4;left:50%;bottom:9.8vh;translate:-50% 0;font-size:.62rem;font-weight:700;letter-spacing:.32em;color:var(--mut);text-align:center}

.mq{position:absolute;z-index:4;left:0;right:0;bottom:0;height:8.2vh;min-height:52px;background:var(--ink);color:var(--cream);overflow:hidden;display:flex;align-items:center;border-top:1px solid rgba(201,160,99,0.35)}
.mq div{display:flex;gap:46px;white-space:nowrap;animation:mq 38s linear infinite;padding-left:46px;font-family:Fraunces,Georgia,serif;font-size:1.08rem;letter-spacing:.03em}
.mq span::after{content:'✦';margin-left:46px;color:var(--gold)}
@keyframes mq{to{transform:translateX(-50%)}}
@media(max-width:820px){
  .h-top-card{max-width:62vw;padding:10px 14px}
  .badge{top:12vh;width:84px}
  .info{bottom:10vh;max-width:92vw;left:4vw;right:4vw;padding:18px 20px}
  .ctr{bottom:auto;top:24vh;right:4vw;flex-direction:column;padding:8px}
  .dh,.sd{display:none}
}

.bt,.info,.ctr,.pl,.dh{opacity:0;transition:opacity 1.1s .15s,transform 1.3s .15s cubic-bezier(.2,.8,.2,1)}
.bt{transform:translateY(60px)}
body.go .bt,body.go .info,body.go .ctr,body.go .pl,body.go .dh{opacity:1;transform:none}
.lk{position:absolute;border-radius:50%;filter:blur(75px);opacity:.5;z-index:0;animation:lk 14s ease-in-out infinite alternate;pointer-events:none}
@keyframes lk{to{transform:translate(8vw,6vh) scale(1.2)}}
#gr{position:fixed;inset:-50%;z-index:140;pointer-events:none;opacity:.055;mix-blend-mode:multiply;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");animation:gn .8s steps(4) infinite}
@keyframes gn{0%{transform:translate(0,0)}25%{transform:translate(-4%,3%)}50%{transform:translate(3%,-5%)}75%{transform:translate(-3%,-2%)}}
#sprog{position:fixed;left:0;top:0;height:3px;width:100%;background:linear-gradient(90deg,var(--org),var(--gold));transform-origin:left;transform:scaleX(0);z-index:70}

/* ── EDITORIAL BANDS & SECTIONS ── */
.sec{max-width:1240px;margin:auto;padding:13vh 5vw 4vh}
.ey{display:inline-flex;align-items:center;gap:8px;letter-spacing:.28em;font-size:.7rem;color:var(--org);font-weight:700;text-transform:uppercase;padding:6px 14px;border-radius:99px;background:rgba(196,80,106,0.09);border:1px solid rgba(196,80,106,0.2)}
.sec h2.t{font-size:clamp(2.3rem,5.8vw,4.5rem);margin:.2em 0 .3em;line-height:1;font-weight:900;letter-spacing:-.02em}
.sec h2.t em{color:var(--org);font-weight:400;font-style:italic}
.lead{color:var(--mut);line-height:1.75;font-size:1.08rem;max-width:740px}
.rv{opacity:0;transform:translateY(36px);transition:opacity .85s,transform .85s cubic-bezier(.2,.8,.2,1)}
.rv.in{opacity:1;transform:none}

.band{
  height:40vh;min-height:260px;margin:0;display:grid;place-items:center;position:relative;overflow:hidden;
  background:linear-gradient(125deg,#2a161d,#c4506a 52%,#c9a063);
}
.band::before{
  content:'HAUTE BOTANICAL ATELIER • SMALL BATCH FORMULATIONS';
  position:absolute;top:28px;letter-spacing:.38em;font-size:.66rem;color:rgba(251,243,238,0.75);font-weight:700;
}
.band h1{font-size:clamp(3.2rem,11vw,9rem);margin:0;color:var(--cream);font-weight:900;line-height:.9;z-index:2;text-shadow:0 10px 40px rgba(0,0,0,0.28);font-style:italic}

/* ── COLLECTION FILTER PILLS & LUXURY ARCH PRODUCT CARDS ── */
.cat{display:flex;gap:10px;flex-wrap:wrap;margin:28px 0 0}
.cat a{padding:11px 22px;border:1.5px solid rgba(35,20,25,0.22);border-radius:99px;text-decoration:none;font-size:.82rem;font-weight:700;letter-spacing:.06em;transition:all .3s;background:rgba(255,255,255,0.45)}
.cat a:hover{background:var(--ink);color:var(--cream);border-color:var(--ink)}

.gr{display:grid;gap:26px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));margin-top:28px}
.pcd{
  cursor:pointer;background:rgba(255,252,249,0.75);border:1px solid rgba(35,20,25,0.09);
  border-radius:30px;padding:16px 16px 22px;
  transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s,border-color .3s;
  display:flex;flex-direction:column;justify-content:space-between;
}
.pcd:hover{transform:translateY(-10px);box-shadow:0 28px 55px rgba(35,20,25,0.12);border-color:var(--gold)}
.pcd .ar2{
  height:285px;border-radius:999px 999px 22px 22px;
  display:grid;place-items:end center;padding-bottom:18px;
  transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s;
  overflow:hidden;position:relative;
  border:1px solid rgba(255,255,255,0.65);
}
.pcd .ar2 .sz-tag{
  position:absolute;top:14px;right:14px;
  background:rgba(255,250,247,0.88);backdrop-filter:blur(6px);
  padding:4px 10px;border-radius:99px;font-size:.68rem;font-weight:700;letter-spacing:.1em;color:var(--ink);
}
.pcd svg{height:78%;transition:transform .6s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(0 16px 18px rgba(35,20,25,0.22))}
.pcd:hover .ar2{transform:perspective(700px) rotateX(calc(var(--rx,0)*1deg)) rotateY(calc(var(--ry,0)*1deg))}
.pcd:hover svg{transform:translateY(-12px) rotate(-5deg) scale(1.07)}
.pcd-meta{padding:14px 6px 0}
.pcd-cat{font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;color:var(--org);font-weight:700}
.pcd h3{margin:4px 0 4px;font-size:1.25rem;line-height:1.15}
.pcd .tag-txt{color:var(--mut);font-size:.86rem;display:block;margin-bottom:12px}
.pcd-foot{display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid rgba(35,20,25,0.08)}
.pcd-foot b{font-family:Fraunces,Georgia,serif;font-size:1.3rem}
.pcd-actions{display:flex;gap:6px}
.pcd-btn{
  padding:7px 13px;border-radius:99px;border:1px solid var(--ink);
  background:transparent;color:var(--ink);font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:.25s;
}
.pcd-btn:hover{background:var(--ink);color:var(--cream)}
.pcd-btn.fill{background:var(--ink);color:var(--cream)}
.pcd-btn.fill:hover{background:var(--org);border-color:var(--org)}

table{width:100%;border-collapse:collapse;margin:18px 0;background:rgba(255,252,249,0.65);border-radius:20px;overflow:hidden;border:1px solid rgba(35,20,25,0.08)}
th,td{text-align:left;padding:15px 18px;border-bottom:1px solid rgba(35,20,25,0.08);font-size:.94rem}
th{color:var(--org);font-size:.72rem;letter-spacing:.22em;font-weight:700;background:rgba(196,80,106,0.06)}

/* ── 3D CELLULAR ESSENCE SHADER ORB SECTION ── */
#oT{position:relative;height:300vh}
#orb{position:sticky;top:0;height:100vh;height:100dvh;overflow:hidden;background:radial-gradient(circle at 62% 50%,#3d1b28,#13090e 75%);color:#fbf3ee}
#ob{position:absolute;inset:0;width:100%;height:100%}
.oc{
  position:absolute;left:5vw;top:50%;translate:0 -50%;max-width:min(460px,84vw);z-index:2;
  background:rgba(25,12,18,0.52);backdrop-filter:blur(16px);
  padding:30px 32px;border-radius:30px;border:1px solid rgba(255,255,255,0.12);
  transition:opacity .45s,transform .45s;
}
.oc.sw{opacity:0;transform:translateY(16px)}
.oc small{letter-spacing:.3em;color:#e8a0a8;font-size:.72rem;font-weight:700}
.oc h2{font-family:Fraunces,Georgia,serif;font-size:clamp(2.6rem,7vw,5.2rem);margin:.12em 0 .18em;line-height:.95;font-weight:900}
.oc p{color:#e2ced3;line-height:1.68;margin:0 0 20px;font-size:1rem}
.orb-tabs{display:flex;gap:8px;flex-wrap:wrap}
.orb-tab{
  padding:8px 16px;border-radius:99px;border:1px solid rgba(255,255,255,0.24);
  background:rgba(255,255,255,0.06);color:#fff;font-size:.74rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:.3s;
}
.orb-tab.on,.orb-tab:hover{background:#e8a0a8;color:#1a0c11;border-color:#e8a0a8}
.od{position:absolute;right:5vw;top:50%;translate:0 -50%;display:flex;flex-direction:column;gap:14px;z-index:2}
.od i{width:10px;height:10px;border-radius:50%;background:#ffffff44;transition:.4s;cursor:pointer}
.od i.on{background:#e8a0a8;transform:scale(1.7);box-shadow:0 0 16px #e8a0a8}
@media(max-width:800px){.oc{top:auto;bottom:8vh;translate:0 0;padding:22px 24px}}

/* ── INGREDIENTS & BOTANICAL BLOOM GALLERY ── */
.tg{display:inline-flex;border:1.5px solid var(--ink);border-radius:99px;padding:4px;margin:14px 0 0;background:rgba(255,255,255,0.5)}
.tg button{border:0;background:none;padding:10px 24px;border-radius:99px;font:inherit;font-weight:700;font-size:.84rem;cursor:pointer;transition:.3s;color:var(--ink)}
.tg button.on{background:var(--ink);color:var(--cream)}
.pn{display:none}.pn.on{display:block;animation:fi .6s}
@keyframes fi{from{opacity:0;transform:translateY(16px)}}
.gal{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding:12px 0 22px;scrollbar-width:none}
.gal::-webkit-scrollbar{display:none}
.gal>div{
  flex:0 0 min(78vw,295px);height:345px;border-radius:28px;scroll-snap-align:start;
  display:grid;place-items:center;position:relative;overflow:hidden;
  transition:transform .45s,box-shadow .45s;border:1px solid rgba(35,20,25,0.08);
}
.gal>div:hover{transform:translateY(-8px);box-shadow:0 22px 44px rgba(35,20,25,0.12)}
.gal>div b{position:absolute;left:20px;bottom:18px;font-family:Fraunces,Georgia,serif;font-size:1.25rem}
.gal>div small{position:absolute;left:20px;top:18px;font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;font-weight:700;color:var(--mut)}
.gal svg{width:62%}
.gc{display:flex;gap:10px;align-items:center;margin-top:8px}
.gc small{color:var(--mut);margin-left:8px}

/* ── STUDIO RITUALS ── */
.ex{
  display:grid;grid-template-columns:1fr 1.1fr;gap:5vw;align-items:center;margin:56px 0;
  background:rgba(255,252,249,0.72);border:1px solid rgba(35,20,25,0.08);
  border-radius:34px;padding:28px;box-shadow:0 20px 50px rgba(35,20,25,0.05);
}
.ex:nth-child(even) .ph{order:2}
.ph{aspect-ratio:4/3;border-radius:26px;display:grid;place-items:center;overflow:hidden;position:relative;transition:transform .6s}
.ex:hover .ph{transform:rotate(-1.2deg) scale(1.02)}
.ph svg{width:48%;animation:fl 8s ease-in-out infinite}
@keyframes fl{50%{transform:translateY(-18px) rotate(12deg)}}
.ex .no{font-family:Fraunces,Georgia,serif;font-size:3.6rem;color:var(--org);line-height:1;font-weight:900}
.ex h3{font-size:2rem;margin:6px 0}
.ex .du{color:var(--grn);font-weight:700;font-size:.8rem;letter-spacing:.18em;text-transform:uppercase}
.ex ul{padding-left:18px;color:var(--mut);line-height:1.8;margin:10px 0 18px}
@media(max-width:820px){.ex{grid-template-columns:1fr;padding:20px}.ex:nth-child(even) .ph{order:0}}

/* ── STATS, REVIEWS & CONTACT ── */
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:22px;margin-top:34px}
.stat-box{background:rgba(255,252,249,0.75);border:1px solid rgba(201,160,99,0.3);border-radius:24px;padding:24px;text-align:center}
.stats b{display:block;font-family:Fraunces,Georgia,serif;font-size:3.2rem;color:var(--org);line-height:1;margin-bottom:6px}
.stats div{color:var(--mut);font-size:.92rem;font-weight:500}

.tm{overflow:hidden;padding:10px 0 36px}
#tmi{display:flex;gap:22px;width:max-content;animation:mq 55s linear infinite}
.tm:hover #tmi{animation-play-state:paused}
.tq{width:min(82vw,360px);padding:28px;border-radius:26px;background:#fffaf7;border:1px solid rgba(35,20,25,0.1);box-shadow:0 14px 36px rgba(35,20,25,0.05);transition:transform .4s,border-color .3s}
.tq:hover{transform:translateY(-8px);border-color:var(--org)}
.tq .st{color:var(--gold);letter-spacing:.22em;margin-bottom:10px;font-size:.95rem}
.tq p{margin:0 0 14px;line-height:1.65;font-size:.96rem;color:var(--ink)}
.tq b{font-size:.82rem;color:var(--org);letter-spacing:.06em;text-transform:uppercase}

.cg{display:grid;grid-template-columns:1fr 1fr;gap:6vw;background:rgba(255,252,249,0.78);border:1px solid rgba(35,20,25,0.09);border-radius:34px;padding:42px}
@media(max-width:820px){.cg{grid-template-columns:1fr;padding:24px}}
form{display:grid;gap:14px;max-width:560px}
input,textarea{font:inherit;padding:15px 18px;border-radius:16px;border:1.5px solid rgba(35,20,25,0.18);background:#fff;color:var(--ink);transition:.3s}
input:focus,textarea:focus{outline:0;border-color:var(--org);box-shadow:0 0 0 4px rgba(196,80,106,0.16)}

footer{background:var(--ink);color:#e8d8c8;margin-top:10vh;padding:60px 5vw 32px;border-top:3px solid var(--gold)}
.fg{max-width:1200px;margin:0 auto 30px;display:grid;gap:30px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.fg b{display:block;color:var(--gold);margin-bottom:12px;letter-spacing:.2em;font-size:.76rem}
.fg a{display:block;text-decoration:none;margin:7px 0;opacity:.82;font-size:.92rem;transition:color .25s}
.fg a:hover{color:var(--org);opacity:1}
.fg p{margin:0 0 8px;opacity:.82;line-height:1.6;font-size:.92rem}
footer>p{text-align:center;font-size:.8rem;opacity:.6;margin:0;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1)}

/* ── PRODUCT DETAIL MODAL ── */
#dt{position:fixed;inset:0;z-index:120;display:grid;place-items:center;padding:4vw;background:rgba(35,20,25,0.76);backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:opacity .4s}
#dt.on{opacity:1;pointer-events:auto}
.dp{background:var(--cream);border-radius:32px;max-width:900px;width:100%;max-height:90vh;overflow:auto;display:grid;grid-template-columns:1fr 1.25fr;transform:translateY(40px) scale(.96);transition:transform .5s cubic-bezier(.2,.8,.2,1);border:1px solid rgba(201,160,99,0.4);box-shadow:0 30px 80px rgba(0,0,0,0.4)}
#dt.on .dp{transform:none}
.dp .im{display:grid;place-items:center;padding:34px;min-height:320px;position:relative}
.dp .im svg{height:280px;filter:drop-shadow(0 20px 26px rgba(35,20,25,0.28))}
.dp .tx{padding:36px 34px}
.dp h3{font-size:2rem;margin:0 0 6px}
.dp td,.dp th{padding:10px 6px}
.x{float:right;background:none;border:1px solid var(--ink);border-radius:50%;width:38px;height:38px;cursor:pointer;transition:background .3s,color .3s}
.x:hover{background:var(--org);color:#fff;border-color:var(--org)}
@media(max-width:720px){.dp{grid-template-columns:1fr}}

/* ── TOAST NOTIFICATION ── */
#ts{position:fixed;left:50%;bottom:28px;translate:-50% 30px;background:var(--ink);color:var(--cream);border:1px solid var(--gold);padding:13px 26px;border-radius:99px;font-size:.86rem;font-weight:700;z-index:160;opacity:0;pointer-events:none;box-shadow:0 16px 40px rgba(35,20,25,0.35);transition:.45s cubic-bezier(.2,.8,.2,1)}
#ts.on{opacity:1;translate:-50% 0}
</style></head>
<body class="inspector-on">

<!-- ── SPINNING BOTANICAL PRELOADER ── -->
<div id="ld" data-edit-section="brand" data-edit-field="loaderImageUrl" data-edit-label="Preloader Logo & Emblem" style="cursor:pointer">
  ${config.loaderImageUrl ? `<div class="ld-custom-logo" style="width:110px;height:110px;border-radius:24px;background:rgba(255,255,255,0.7);backdrop-filter:blur(12px);border:1.5px solid rgba(201,160,99,0.4);display:flex;align-items:center;justify-content:center;box-shadow:0 16px 36px rgba(35,20,25,0.15);margin-bottom:14px;padding:12px"><img src="${config.loaderImageUrl}" alt="Loader Emblem" style="max-width:100%;max-height:100%;object-fit:contain"/></div>` : ''}
  <svg class="rt" viewBox="0 0 200 200"><defs><path id="lp" d="M100 100m-82 0a82 82 0 1 1 164 0a82 82 0 1 1-164 0"/></defs><text><textPath href="#lp">CLEAN BEAUTY • CRUELTY FREE • VEGAN FORMULAS • SMALL BATCH • </textPath></text></svg>
  <b id="lc">0%</b>
  <small>PREPARING THE BOTANICAL ATELIER</small>
</div>
<script>
/* ── IMMEDIATE PRELOADER ANIMATION ── */
window.dismissVeloraLoader = function() {
  const ld = document.getElementById('ld');
  if (ld) {
    ld.classList.add('go');
    setTimeout(() => {
      try { ld.remove(); } catch(e) {}
    }, 600);
  }
  document.body.classList.add('go');
};

(function(){
  const t0 = performance.now();
  const lc = document.getElementById('lc');
  let v = 0;
  function lk(){
    const el = (performance.now() - t0) / 1000;
    v = Math.min(1, Math.max(v + 0.035, el));
    if (lc) lc.textContent = Math.round(v * 100) + '%';
    if (v < 1) return requestAnimationFrame(lk);
    setTimeout(window.dismissVeloraLoader, 160);
  }
  lk();
  setTimeout(window.dismissVeloraLoader, 1900);
})();
</script>

<div id="cr"></div><i id="sprog"></i><div id="gr"></div><div id="ts"></div>

<!-- ── NAVBAR ── -->
<nav data-edit-section="brand" data-edit-label="Brand & Navbar">
  <span class="edit-pill-badge">✎ Edit Brand &amp; Nav</span>
  <a class="lg" href="#hero">
    ${
      config.logoImageUrl
        ? `<img src="${config.logoImageUrl}" alt="logo" />`
        : `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#c4506a"/><path d="M20 7C27 15 29 21 29 25a9 9 0 0 1-18 0c0-4 2-10 9-18z" fill="#fbf3ee"/><path d="M20 16v14" stroke="#c4506a" stroke-width="2"/></svg>`
    }
    ${config.brandName}<span>${config.brandSub}</span>
  </a>
  <ul>
    <li><a href="#hero">${config.navLinks[0] || 'Home'}</a></li>
    <li><a href="#pantry">${config.navLinks[1] || 'Collection'}</a></li>
    <li><a href="#production">${config.navLinks[2] || 'Ingredients'}</a></li>
    <li><a href="#experience">${config.navLinks[3] || 'Rituals'}</a></li>
    <li><a href="#about">${config.navLinks[4] || 'About'}</a></li>
    <li><a href="#contact">${config.navLinks[5] || 'Contacts'}</a></li>
  </ul>
  <div class="rg">
    <span class="lang">FR / EN</span>
    <a class="btn bagb" id="bagb" href="#contact" style="text-decoration:none">Book Consultation →</a>
    <button id="bg" aria-label="Menu"><i></i></button>
  </div>
</nav>

<div id="mn">
  <a href="#hero">${config.navLinks[0] || 'Home'}</a>
  <a href="#pantry">${config.navLinks[1] || 'Collection'}</a>
  <a href="#production">${config.navLinks[2] || 'Ingredients'}</a>
  <a href="#experience">${config.navLinks[3] || 'Rituals'}</a>
  <a href="#about">${config.navLinks[4] || 'About'}</a>
  <a href="#contact">${config.navLinks[5] || 'Contacts'}</a>
</div>

<!-- ── HERO 3D STAGE (8 INTERACTIVE 3D VESSELS) ── -->
<div id="hT">
  <section id="hero" data-edit-section="hero" data-edit-label="3D Hero & Vessels">
    <span class="edit-pill-badge">✎ Edit 3D Hero &amp; Vessels</span>
    <i class="lk" style="left:-8vw;top:6vh;width:42vw;height:42vw;background:var(--tint)"></i>
    <i class="lk" style="right:-10vw;bottom:8vh;width:38vw;height:38vw;background:#e8a0a8;animation-delay:-5s"></i>
    <i class="lk" style="left:30vw;top:50vh;width:26vw;height:26vw;background:#c9a063;opacity:.35;animation-delay:-9s"></i>
    <i class="pb" id="pb"></i>
    <ul class="pl" id="pl"></ul>
    <div class="bt">${config.heroBigTitle}</div>
    <div class="h-top-card">
      <small>HAUTE BOTANICAL FORMULATIONS</small>
      <p class="h1">${config.heroTagline}</p>
    </div>
    <svg class="badge" viewBox="0 0 200 200"><defs><path id="bp" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"/></defs><circle cx="100" cy="100" r="40" fill="#c4506a"/><text><textPath href="#bp">${config.heroBadgeText}</textPath></text><circle cx="100" cy="100" r="14" fill="#fff6d9"/></svg>
    <canvas id="gl"></canvas>

    <!-- Floating Glass Product Card (Showcase & Inquiry — No Cart/Checkout) -->
    <div class="info" id="inf" data-edit-section="products" data-edit-label="Active 3D Product">
      <div class="info-top">
        <small id="ik">SERUMS &amp; OILS</small>
        <span class="sz-pill" id="isz">30 ml</span>
      </div>
      <h2 id="in">Rosehip Glow Serum</h2>
      <span class="tag-em" id="itg">Radiant, dewy and bright</span>
      <p id="id"></p>
      <div class="note-bar"><b>BOTANICAL NOTES:</b> <span id="int">Rosehip, geranium, soft musk</span></div>
      <div class="ib">
        <b class="pri" id="ipr">$38</b>
        <button class="btn" id="add">Inquire / Sample</button>
        <button class="btn o" id="quickSpecBtn">3D Formula Details</button>
      </div>
    </div>

    <div class="ctr">
      <button class="ar" id="pv" aria-label="Previous">←</button>
      <b id="cn">01 / 08</b>
      <button class="ar" id="nx" aria-label="Next">→</button>
    </div>
    <div class="dh" id="dh">⟷ DRAG 3D VESSEL TO ROTATE 360°</div>
    <div class="sd">SCROLL TO EXPLORE 8 BOTANICAL VESSELS</div>
    <div class="mq"><div id="mqd"></div></div>
  </section>
</div>

<!-- ── THE COLLECTION SECTION ── -->
<div class="band"><h1 class="sf">Collection</h1></div>
<section class="sec" id="pantry" data-edit-section="products" data-edit-label="Product Collection">
  <span class="edit-pill-badge">✎ Edit Collection &amp; 8 Products</span>
  <span class="ey rv">✦ ${config.collectionEyebrow}</span>
  <h2 class="t rv">${config.collectionTitlePrefix} <em>${config.collectionTitleItalic}</em></h2>
  <p class="lead rv">${config.collectionLead}</p>
  <div class="cat rv">
    <a href="#c1">01 · Serums &amp; Oils</a>
    <a href="#c2">02 · Whipped Face Creams</a>
    <a href="#c3">03 · Velvet Lips &amp; Eau de Parfum</a>
    <a href="#c4">04 · Travel Discovery Minis</a>
  </div>

  <div id="c1" style="padding-top:60px">
    <h2 class="t rv" style="font-size:clamp(1.8rem,4vw,3rem)">Serums &amp; Facial Oils</h2>
    <p class="lead rv">Concentrated cellular treatments for luminosity, barrier hydration and tone — housed in UV-protective 30 ml glass dropper flacons.</p>
    <div class="gr" id="g1"></div>
  </div>

  <div id="c2" style="padding-top:60px">
    <h2 class="t rv" style="font-size:clamp(1.8rem,4vw,3rem)">Whipped Face Creams</h2>
    <p class="lead rv">Day and overnight barrier emulsions in heavy refillable 50 ml French glass jars with brushed gold lids.</p>
    <div class="gr" id="g2"></div>
  </div>

  <div id="c3" style="padding-top:60px">
    <h2 class="t rv" style="font-size:clamp(1.8rem,4vw,3rem)">Velvet Lips &amp; Haute Fragrance</h2>
    <p class="lead rv">Pure mineral pigment lipsticks suspended in botanical waxes and our signature Bulgarian rose eau de parfum.</p>
    <div class="gr" id="g3"></div>
  </div>

  <div id="c4" style="padding-top:60px">
    <h2 class="t rv" style="font-size:clamp(1.8rem,4vw,3rem)">Travel Discovery Minis</h2>
    <p class="lead rv">Flight-ready glass miniatures crafted for luxury hotels, weekend rituals and bespoke gifting.</p>
    <table class="rv">
      <tr><th>BOTANICAL FORMULA</th><th>POTENCY WINDOW</th><th>TRAVEL VESSEL</th></tr>
      <tr><td>Rosehip Glow Serum</td><td>12 months after opening</td><td>10 ml Pipette Flacon</td></tr>
      <tr><td>Vitamin C Brightening Serum</td><td>12 months after opening</td><td>10 ml Pipette Flacon</td></tr>
      <tr><td>Hyaluronic Hydra Serum</td><td>12 months after opening</td><td>10 ml Pipette Flacon</td></tr>
      <tr><td>Rose Petal Day Cream SPF 30</td><td>12 months after opening</td><td>15 ml Refillable Jar</td></tr>
      <tr><td>Shea &amp; Ceramide Night Cream</td><td>12 months after opening</td><td>15 ml Refillable Jar</td></tr>
      <tr><td>Midnight Rose Eau de Parfum</td><td>24 months after opening</td><td>10 ml Atomizer Spray</td></tr>
    </table>
  </div>
</section>

<!-- ── 3D CELLULAR ESSENCE SHADER ORB STAGE ── -->
<div id="oT">
  <section id="orb" data-edit-section="orb" data-edit-label="3D Essence Shader Orb">
    <span class="edit-pill-badge">✎ Edit 3D Essence Orb</span>
    <canvas id="ob"></canvas>
    <div class="oc" id="oc">
      <small id="os">THE CELLULAR ESSENCE · 01</small>
      <h2 id="ot">${config.orbStages[0].title}</h2>
      <p id="od2">${config.orbStages[0].description}</p>
      <div class="orb-tabs">
        <button class="orb-tab on" data-orb="0">01 · ${config.orbStages[0].title}</button>
        <button class="orb-tab" data-orb="1">02 · ${config.orbStages[1].title}</button>
        <button class="orb-tab" data-orb="2">03 · ${config.orbStages[2].title}</button>
      </div>
    </div>
    <div class="od"><i class="on" data-orb="0"></i><i data-orb="1"></i><i data-orb="2"></i></div>
  </section>
</div>

<!-- ── INGREDIENTS & CLINICAL ACTIVES ── -->
<div class="band" style="background:linear-gradient(120deg,#c9a063,#8a6a3a 58%,#c4506a)"><h1 class="sf">Ingredients</h1></div>
<section class="sec" id="production" data-edit-section="ingredients" data-edit-label="Botanicals & Actives">
  <span class="edit-pill-badge">✎ Edit Ingredients</span>
  <span class="ey rv">✦ ${config.ingredientsEyebrow}</span>
  <h2 class="t rv">${config.ingredientsTitlePrefix} <em>${config.ingredientsTitleItalic}</em></h2>
  <p class="lead rv">${config.ingredientsLead}</p>
  <div class="tg rv" id="tg">
    <button class="on" data-p="0">Cold-Pressed Botanicals</button>
    <button data-p="1">Clinical Actives (%)</button>
  </div>
  <div class="pn on" id="p0">
    <h3 class="sf" style="font-size:1.85rem;margin:26px 0 6px">Heirloom botanicals we harvest &amp; cold-press</h3>
    <p class="lead">Extracted without hexane or high heat to preserve delicate polyphenols, essential fatty acids and aromatic molecules.</p>
    <table>
      <tr><th>BOTANICAL EXTRACT</th><th>KEY FORMULA</th><th>DERMAL BENEFIT</th></tr>
      <tr><td>Andean Rosehip Seed Oil</td><td>Rosehip Glow Serum</td><td>Pro-retinol cellular renewal &amp; evening tone</td></tr>
      <tr><td>Unrefined Ghanaian Shea</td><td>Shea Night Cream</td><td>Deep lipid replenishment &amp; barrier comfort</td></tr>
      <tr><td>Organic Damask Rose Hydrosol</td><td>Rose Petal Day Cream</td><td>Calming redness &amp; weightless dewy hydration</td></tr>
      <tr><td>Alpine Aloe Barbadensis</td><td>Hydra Serum &amp; Day Cream</td><td>Instant soothing &amp; trans-epidermal water lock</td></tr>
      <tr><td>Grasse Jasmine Grandiflorum</td><td>Midnight Rose Parfum</td><td>Sensual night-blooming floral heart note</td></tr>
    </table>
  </div>
  <div class="pn" id="p1">
    <h3 class="sf" style="font-size:1.85rem;margin:26px 0 6px">Biocompatible clinical actives</h3>
    <p class="lead">Formulated at their exact peer-reviewed concentrations for visible results without barrier irritation.</p>
    <table>
      <tr><th>CLINICAL ACTIVE</th><th>EXACT DOSAGE</th><th>OPTIMAL RITUAL</th></tr>
      <tr><td>Vitamin C (Ascorbyl Glucoside + Ferulic)</td><td>10.0%</td><td>Morning · Antioxidant shield &amp; brightening</td></tr>
      <tr><td>Triple-Weight Hyaluronic Acid</td><td>2.0%</td><td>Morning &amp; Night · Multi-depth dermal plumping</td></tr>
      <tr><td>Pharmaceutical Niacinamide (B3)</td><td>4.0%</td><td>Morning · Pore refinement &amp; tone balance</td></tr>
      <tr><td>Biomimetic Ceramides NP / AP / EOP</td><td>1.5%</td><td>Night · Overnight lipid barrier reconstruction</td></tr>
    </table>
  </div>
  <div class="gc">
    <button class="ar" id="gp" aria-label="Previous">←</button>
    <button class="ar" id="gn" aria-label="Next">→</button>
    <small>Browse our raw botanical archive (or use ← → arrow keys)</small>
  </div>
  <div class="gal" id="gal"></div>
</section>

<!-- ── STUDIO RITUALS ── -->
<div class="band" style="background:linear-gradient(120deg,#e8a0a8,#c4506a 55%,#8a6a3a)"><h1 class="sf">Rituals</h1></div>
<section class="sec" id="experience" data-edit-section="rituals" data-edit-label="Studio Rituals">
  <span class="edit-pill-badge">✎ Edit 3 Studio Rituals</span>
  <span class="ey rv">✦ ${config.ritualsEyebrow}</span>
  <h2 class="t rv">${config.ritualsTitlePrefix} <em>${config.ritualsTitleItalic}</em></h2>
  <p class="lead rv">${config.ritualsLead}</p>
  <div id="exs"></div>
</section>

<!-- ── BOTANICAL JOURNAL & DERMAL SCIENCE ARTICLES ── -->
<section class="sec" id="journal" data-edit-section="about" data-edit-label="Botanical Journal Articles">
  <span class="edit-pill-badge">✎ Edit Articles &amp; Journal</span>
  <span class="ey rv">✦ BOTANICAL MONOGRAPHS &amp; ARTICLES</span>
  <h2 class="t rv">The <em>Atelier</em> Journal</h2>
  <p class="lead rv">Peer-reviewed clinical notes, cold-pressing harvests, and holistic dermal rituals written by our Grasse &amp; Paris formulators.</p>
  <div class="stats" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));text-align:left">
    <article class="stat-box" style="text-align:left">
      <small style="color:var(--org);font-weight:800;letter-spacing:.18em;font-size:.68rem">MONOGRAPH 01 · CELLULAR LIPIDS</small>
      <h3 class="sf" style="font-size:1.45rem;margin:8px 0;color:var(--ink)">Cold-Pressed Andean Rosehip vs. Synthetic Retinoids</h3>
      <p style="font-size:.92rem;line-height:1.65;color:var(--mut)">How trans-retinoic acid in wild-harvested Rosa rubiginosa accelerates epidermal turnover without compromising the stratum corneum.</p>
    </article>
    <article class="stat-box" style="text-align:left">
      <small style="color:var(--org);font-weight:800;letter-spacing:.18em;font-size:.68rem">MONOGRAPH 02 · OLFACTORY ARCHIVE</small>
      <h3 class="sf" style="font-size:1.45rem;margin:8px 0;color:var(--ink)">Dawn Harvests in Grasse: Steam-Distilling Rosa Damascena</h3>
      <p style="font-size:.92rem;line-height:1.65;color:var(--mut)">Over 4,000 kilograms of hand-picked dawn petals are distilled in copper alembics to yield a single liter of our cellular hydrosol.</p>
    </article>
    <article class="stat-box" style="text-align:left">
      <small style="color:var(--org);font-weight:800;letter-spacing:.18em;font-size:.68rem">MONOGRAPH 03 · SUSTAINABLE GLASS</small>
      <h3 class="sf" style="font-size:1.45rem;margin:8px 0;color:var(--ink)">UV-Protective Apothecary Vessels &amp; Infinite Refills</h3>
      <p style="font-size:.92rem;line-height:1.65;color:var(--mut)">Why heavy French glass and brushed brass collars protect delicate polyphenols from photo-oxidation far longer than plastic packaging.</p>
    </article>
  </div>
</section>

<!-- ── ABOUT & STATS ── -->
<section class="sec" id="about" data-edit-section="about" data-edit-label="About & Stats">
  <span class="edit-pill-badge">✎ Edit About &amp; Stats</span>
  <span class="ey rv">✦ ${config.aboutEyebrow}</span>
  <h2 class="t rv">${config.aboutTitlePrefix} <em>${config.aboutTitleItalic}</em>${config.aboutTitleSuffix}</h2>
  <p class="lead rv">${config.aboutLead}</p>
  <div class="stats">
    ${config.stats
      .map((st) => `<div class="stat-box"><b data-n="${st.number}">0</b><div>${st.label}</div></div>`)
      .join('')}
  </div>
</section>

<!-- ── CUSTOMER REVIEWS ── -->
<section class="sec" id="love" data-edit-section="reviews" data-edit-label="Customer Reviews">
  <span class="edit-pill-badge">✎ Edit Reviews</span>
  <span class="ey rv">✦ ${config.reviewsEyebrow}</span>
  <h2 class="t rv">${config.reviewsTitlePrefix} <em>${config.reviewsTitleItalic}</em></h2>
</section>
<div class="tm" data-edit-section="reviews" data-edit-label="Customer Reviews"><div id="tmi"></div></div>

<!-- ── CONTACT CONCIERGE ── -->
<section class="sec" id="contact" data-edit-section="contact" data-edit-label="Contact Section">
  <span class="edit-pill-badge">✎ Edit Contacts</span>
  <div class="cg">
    <div>
      <span class="ey rv">✦ ${config.contactEyebrow}</span>
      <h2 class="t rv">${config.contactTitlePrefix} <em>${config.contactTitleItalic}</em></h2>
      <p class="lead rv">${config.contactLead}</p>
      <p class="lead rv" style="color:var(--ink);font-weight:600">${config.contactEmail}<br><span style="color:var(--mut);font-weight:400">${config.contactHours}</span></p>
    </div>
    <form id="fm" class="rv">
      <input required placeholder="Your full name">
      <input required type="email" placeholder="Your email address">
      <textarea rows="4" required placeholder="Tell us about your skin goals or preferred studio ritual…"></textarea>
      <button class="btn" type="submit">Send Concierge Note</button>
      <p id="ok" style="color:var(--org);margin:0;font-weight:700"></p>
    </form>
  </div>
</section>

<!-- ── FOOTER (WITH LOCKED POWERED BY EFERZ WATERMARK) ── -->
<footer data-edit-section="footer" data-edit-label="Footer Section">
  <span class="edit-pill-badge">✎ Edit Footer</span>
  <div class="fg">
    <div><b>${config.brandName.toUpperCase()} ${config.brandSub.toUpperCase()}</b><p>${config.footerTagline}</p></div>
    <div><b>EXPLORE</b><a href="#pantry">${config.navLinks[1] || 'Collection'}</a><a href="#production">${config.navLinks[2] || 'Ingredients'}</a><a href="#experience">${config.navLinks[3] || 'Rituals'}</a><a href="#journal">Journal</a></div>
    <div><b>ATELIERS</b><p>${config.footerStudioAddress}</p><p>${config.footerLabAddress}</p></div>
    <div><b>CONCIERGE</b><p>${config.contactEmail}</p><a href="#contact">Book a Private Consultation</a></div>
  </div>
  <div style="max-width:1200px;margin:28px auto 0;padding-top:20px;border-top:1px solid rgba(255,255,255,0.12);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;font-size:.82rem;color:#e8d8c8">
    <span>© 2026 <strong style="color:#fff">${config.brandName} ${config.brandSub}</strong>. All Rights Reserved.</span>
    <span style="display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:999px;background:rgba(196,80,106,0.22);border:1px solid #c9a063;color:#fff;font-weight:700;letter-spacing:.08em;user-select:none">
      🔒 Powered by <a href="https://eferz.com" target="_blank" rel="noopener noreferrer" style="color:#c9a063;text-decoration:underline;font-weight:900">EFerz</a> (<a href="https://eferz.com" target="_blank" rel="noopener noreferrer" style="color:#fff;text-decoration:none">EFerz.com</a>)
    </span>
  </div>
</footer>

<!-- Floating Quick-Edit Bar when any text is clicked -->
<div id="velora-inline-bar" style="position:fixed;bottom:22px;left:50%;transform:translate(-50%,20px);z-index:260;background:rgba(35,20,25,0.95);backdrop-filter:blur(16px);border:1px solid #c9a063;color:#fbf3ee;padding:8px 18px;border-radius:999px;font-size:.76rem;font-weight:700;letter-spacing:.06em;display:flex;align-items:center;gap:10px;opacity:0;pointer-events:none;transition:.3s;box-shadow:0 16px 40px rgba(0,0,0,0.45)">
  <span style="width:8px;height:8px;border-radius:50%;background:#c4506a;box-shadow:0 0 10px #c4506a"></span>
  <span id="velora-inline-msg">Click any text to edit directly on canvas or in the left customizer</span>
</div>

<!-- ── PRODUCT FORMULA QUICK-VIEW MODAL ── -->
<div id="dt">
  <div class="dp">
    <div class="im" id="di"></div>
    <div class="tx">
      <button class="x" id="dx">✕</button>
      <small id="dk" style="letter-spacing:.24em;color:var(--org);font-weight:700;font-size:.7rem"></small>
      <h3 id="dn" class="sf"></h3>
      <p class="lead" id="dd" style="font-size:.96rem;margin:0 0 12px"></p>
      <table id="dtb"></table>
      <div style="display:flex;gap:10px;align-items:center;margin-top:16px">
        <button class="btn" id="dc">Request Private Sample</button>
        <button class="btn o" id="view3dBtn">Inspect in 3D Hero ↑</button>
      </div>
    </div>
  </div>
</div>

<script src="/three.r128.min.js"></script>
<script>
(function initVeloraScope(){
  if (typeof THREE === 'undefined') {
    if (!window._threeScriptRequested) {
      window._threeScriptRequested = true;
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      s.onload = () => setTimeout(initVeloraScope, 20);
      document.head.appendChild(s);
    }
    setTimeout(initVeloraScope, 40);
    return;
  }
  const CONFIG = ${serializedConfig};

/* ── CLICK-TO-EDIT INSPECTOR + DIRECT INLINE TEXT EDITING ── */
function highlightSelectedSection(sectionId) {
  document.querySelectorAll('[data-edit-section]').forEach((el) => {
    const matchSec = el.getAttribute('data-edit-section') === sectionId;
    el.classList.toggle('is-selected-element', Boolean(matchSec));
  });
}

document.addEventListener('click', (e) => {
  if (document.body.classList.contains('inspector-on')) {
    const textEl = e.target.closest('h1,h2,h3,p,small,em,b,span,li,td,th');
    const inLockedFooter = e.target.closest('footer a[href*="EFerz"]');
    if (textEl && !inLockedFooter && !textEl.classList.contains('edit-pill-badge') && textEl.children.length <= 2) {
      textEl.setAttribute('contenteditable', 'true');
      textEl.style.outline = '1.5px dashed #c4506a';
      textEl.style.outlineOffset = '4px';
      textEl.style.borderRadius = '6px';
      const bar = document.getElementById('velora-inline-bar');
      const msg = document.getElementById('velora-inline-msg');
      if (bar && msg) {
        msg.textContent = '✎ Editing text directly: "' + (textEl.innerText || '').slice(0, 32) + '..."';
        bar.style.opacity = '1';
        bar.style.transform = 'translate(-50%,0)';
        clearTimeout(bar._t);
        bar._t = setTimeout(() => {
          bar.style.opacity = '0';
          bar.style.transform = 'translate(-50%,20px)';
        }, 3200);
      }
    }
  }

  const pcd = e.target.closest('.pcd');
  if (pcd && pcd.dataset.i !== undefined) {
    const pIdx = parseInt(pcd.dataset.i, 10);
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'VELORA_SELECT_SECTION',
        section: 'products',
        productIndex: pIdx,
        label: 'Product: ' + (CONFIG.products[pIdx] ? CONFIG.products[pIdx].name : '')
      }, '*');
    }
  }
  const target = e.target.closest('[data-edit-section]');
  if (!target) return;
  const section = target.getAttribute('data-edit-section');
  const label = target.getAttribute('data-edit-label') || section;
  highlightSelectedSection(section);
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'VELORA_SELECT_SECTION',
      section: section,
      productIndex: section === 'products' ? si : undefined,
      label: label
    }, '*');
  }
});

window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || typeof data !== 'object') return;
  if (data.type === 'VELORA_SET_INSPECTOR') {
    document.body.classList.toggle('inspector-on', Boolean(data.enabled));
  }
  if (data.type === 'VELORA_FOCUS_SECTION') {
    highlightSelectedSection(data.section);
    if (data.section === 'products' && typeof data.productIndex === 'number') {
      show(data.productIndex);
    }
  }
});

const $=i=>document.getElementById(i),root=document.documentElement,clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,t)=>a+(b-a)*t,ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const P=CONFIG.products.map(p=>({
  n:p.name,
  k:p.categoryLabel,
  g:p.groupIndex,
  t:p.tagline,
  d:p.description,
  c:p.colorHex,
  bg:p.bgHex,
  lid:p.lidHex,
  s:p.shapeIndex,
  w:p.sizeText,
  notes:p.notes,
  ing:p.ingredients,
  pr:p.price,
  customImageUrl:p.customImageUrl||null
}));
const brandCaps = (CONFIG.brandName || 'VELORA').toUpperCase();

/* ── DETAILED BOTANICAL VESSEL SVG ILLUSTRATIONS ── */
function jarSVG(p){
  const s=p.s,l=p.lid,c=p.c,st='stroke="#231419" stroke-opacity=".35" stroke-width="1.8"';
  const tx=(x,y,t,sz=7.5)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-size="'+sz+'" font-weight="900" font-family="Georgia,serif" letter-spacing="1.2" fill="#231419">'+t+'</text>';
  if(s==0){
    /* Whipped Cream Apothecary Jar with Gold Collar */
    return '<svg viewBox="0 0 120 120">' +
      '<rect x="16" y="16" width="88" height="26" rx="7" fill="'+l+'" '+st+'/>' +
      '<rect x="22" y="42" width="76" height="5" fill="#c9a063"/>' +
      '<path d="M12 47h96v46c0 10-7 16-16 16H28c-9 0-16-6-16-16z" fill="'+c+'"/>' +
      '<path d="M12 47h96v46c0 10-7 16-16 16H28c-9 0-16-6-16-16z" fill="#fff" fill-opacity=".22" '+st+'/>' +
      '<rect x="26" y="60" width="68" height="34" rx="5" fill="#fbf3ee" stroke="#c9a063" stroke-width="1"/>' +
      tx(60,75,brandCaps,8) +
      '<text x="60" y="86" text-anchor="middle" font-size="5.5" font-family="sans-serif" fill="#73565e">'+p.w.toUpperCase()+'</text>' +
    '</svg>';
  }
  if(s==1){
    /* Glass Dropper Serum Flacon with Pipette & Gold Ring */
    return '<svg viewBox="0 0 120 185">' +
      '<rect x="47" y="4" width="26" height="34" rx="13" fill="#231419"/>' +
      '<rect x="39" y="36" width="42" height="14" rx="3" fill="'+l+'" '+st+'/>' +
      '<path d="M35 52h50c7 0 13 6 13 14v92c0 10-6 16-14 16H36c-8 0-14-6-14-16V66c0-8 6-14 13-14z" fill="'+c+'"/>' +
      '<rect x="57" y="52" width="6" height="86" rx="3" fill="#ffffff" fill-opacity=".45"/>' +
      '<path d="M35 52h50c7 0 13 6 13 14v92c0 10-6 16-14 16H36c-8 0-14-6-14-16V66c0-8 6-14 13-14z" fill="#fff" fill-opacity=".18" '+st+'/>' +
      '<rect x="30" y="90" width="60" height="48" rx="5" fill="#fbf3ee" stroke="#c9a063" stroke-width="1"/>' +
      tx(60,110,brandCaps,8) +
      '<text x="60" y="124" text-anchor="middle" font-size="5.5" font-family="sans-serif" fill="#73565e">SERUM · '+p.w.toUpperCase()+'</text>' +
    '</svg>';
  }
  if(s==2){
    /* Couture Lipstick Bullet with Gold Collar */
    return '<svg viewBox="0 0 90 185">' +
      '<path d="M30 18Q45 2 60 18V70H30z" fill="'+c+'" '+st+'/>' +
      '<rect x="26" y="68" width="38" height="14" rx="2" fill="#c9a063"/>' +
      '<rect x="23" y="82" width="44" height="90" rx="6" fill="'+l+'" '+st+'/>' +
      '<rect x="23" y="82" width="44" height="8" fill="#fff" fill-opacity=".35"/>' +
      tx(45,130,brandCaps,6.5) +
    '</svg>';
  }
  /* Haute Eau de Parfum Flacon with Atomizer */
  return '<svg viewBox="0 0 120 175">' +
    '<rect x="43" y="4" width="34" height="38" rx="6" fill="'+l+'" '+st+'/>' +
    '<rect x="50" y="42" width="20" height="14" fill="#c9a063"/>' +
    '<line x1="60" y1="56" x2="68" y2="152" stroke="#ffffff" stroke-opacity=".55" stroke-width="2"/>' +
    '<rect x="16" y="56" width="88" height="106" rx="16" fill="'+c+'"/>' +
    '<rect x="16" y="56" width="88" height="106" rx="16" fill="#fff" fill-opacity=".2" '+st+'/>' +
    '<rect x="32" y="92" width="56" height="44" rx="5" fill="#fbf3ee" stroke="#c9a063" stroke-width="1"/>' +
    tx(60,112,brandCaps,8) +
    '<text x="60" y="125" text-anchor="middle" font-size="5.2" font-family="sans-serif" fill="#73565e">EAU DE PARFUM</text>' +
  '</svg>';
}

function bloom(c,f,n){
  let o='';
  for(let i=0;i<n;i++)o+='<ellipse cx="100" cy="52" rx="22" ry="44" fill="'+c+'" opacity=".88" transform="rotate('+(i/n*360)+' 100 100)"/>';
  return '<svg viewBox="0 0 200 200">'+o+'<circle cx="100" cy="100" r="24" fill="'+f+'"/><circle cx="100" cy="100" r="10" fill="#231419" opacity=".18"/></svg>';
}

/* ── POPULATE COLLECTION GRID CARDS (SHOWCASE & INQUIRY — NO CART) ── */
[1,2,3].forEach(g=>{
  $('g'+g).innerHTML = P.map((p,i)=>[p,i]).filter(x=>x[0].g==g).map(([p,i])=>
    '<div class="pcd rv" data-i="'+i+'">' +
      '<div>' +
        '<div class="ar2" style="background:'+p.bg+'">' +
          '<span class="sz-tag">'+p.w+'</span>' +
          (p.customImageUrl ? ('<img src="' + p.customImageUrl + '" alt="' + p.n + '" style="height:78%;max-width:85%;object-fit:contain;filter:drop-shadow(0 16px 18px rgba(35,20,25,0.22))">') : jarSVG(p)) +
        '</div>' +
        '<div class="pcd-meta">' +
          '<span class="pcd-cat">'+p.k+'</span>' +
          '<h3 class="sf">'+p.n+'</h3>' +
          '<span class="tag-txt">'+p.t+'</span>' +
        '</div>' +
      '</div>' +
      '<div class="pcd-foot">' +
        '<b>$'+p.pr+'</b>' +
        '<div class="pcd-actions">' +
          '<button class="pcd-btn view-3d-card" data-i="'+i+'">3D View</button>' +
          '<button class="pcd-btn fill quick-add-card" data-i="'+i+'">Inquire →</button>' +
        '</div>' +
      '</div>' +
    '</div>'
  ).join('');
});

$('mqd').innerHTML=(P.map(p=>'<span>'+p.n+'</span>').join('')).repeat(2);
const GL=[
  ['Andean Rosehip','#d9764a','#ffd9a8',8,'COLD-PRESSED OIL'],
  ['Ghanaian Shea','#e8c9a0','#fff1d6',6,'UNREFINED BUTTER'],
  ['Damask Rose','#d1607a','#ffd0da',10,'STEAM HYDROSOL'],
  ['Alpine Aloe','#7aa86a','#d8efc8',7,'CELLULAR GEL'],
  ['Grasse Jasmine','#f4efe6','#f2d36a',6,'NIGHT ABSOLUTE']
],GB=['#ffe3c2','#f6e8dc','#fbdde3','#e1efc3','#f9f3e2'];
$('gal').innerHTML=GL.map((g,i)=>'<div style="background:'+GB[i]+'"><small>'+g[4]+'</small>'+bloom(g[1],g[2],g[3])+'<b>'+g[0]+'</b></div>').join('');

const EX=CONFIG.rituals.map(r=>[r.number,r.title,r.duration,r.description,r.included,r.bgHex,r.petalHex,r.centerHex,r.petalCount]);
$('exs').innerHTML=EX.map(e=>'<div class="ex rv"><div class="ph" style="background:'+e[5]+'">'+bloom(e[6],e[7],e[8])+'</div><div><div class="no">'+e[0]+'</div><div class="du">'+e[2].toUpperCase()+'</div><h3 class="sf">'+e[1]+'</h3><p class="lead" style="margin:0 0 10px">'+e[3]+'</p><b>Included in your ritual:</b><ul>'+e[4].map(x=>'<li>'+x+'</li>').join('')+'</ul><a class="btn o" href="#contact">Reserve Atelier Session</a></div></div>').join('');

/* ── MODAL & CONCIERGE INQUIRY ACTIONS (NO CART/CHECKOUT) ── */
let cm=0;
function openProductModal(idx){
  const p=P[idx];if(!p)return;
  cm=idx;
  $('dk').textContent=p.k+' · '+p.w;
  $('dc').textContent='Inquire About '+p.n;
  $('di').innerHTML=jarSVG(p);
  $('di').style.background=p.bg;
  $('dn').textContent=p.n;
  $('dd').textContent=p.d;
  $('dtb').innerHTML=[
    ['Sensory Profile',p.t],
    ['Botanical Notes',p.notes],
    ['Key Actives & INCI',p.ing],
    ['Vessel Size',p.w+' Refillable Apothecary Glass']
  ].map(r=>'<tr><th>'+r[0].toUpperCase()+'</th><td>'+r[1]+'</td></tr>').join('');
  $('dt').classList.add('on');
}
document.querySelectorAll('.pcd').forEach(c=>c.onclick=(e)=>{
  if(e.target.closest('.quick-add-card')||e.target.closest('.view-3d-card'))return;
  openProductModal(+c.dataset.i);
});
document.querySelectorAll('.quick-add-card').forEach(b=>b.onclick=(e)=>{
  e.stopPropagation();
  scrollToConcierge(+b.dataset.i);
});
document.querySelectorAll('.view-3d-card').forEach(b=>b.onclick=(e)=>{
  e.stopPropagation();
  goto(+b.dataset.i);
});
$('quickSpecBtn').onclick=(e)=>{e.stopPropagation();openProductModal(si)};
$('view3dBtn').onclick=()=>{cl();goto(cm)};

const cl=()=>$('dt').classList.remove('on');
$('dx').onclick=cl;$('dt').onclick=e=>{if(e.target===$('dt'))cl()};$('dc').addEventListener('click',cl);
$('fm').onsubmit=e=>{e.preventDefault();$('ok').textContent='Merci! Your private concierge request has been received.';e.target.reset()};

function scrollToConcierge(i){
  const cEl=$('contact');
  if(cEl)tg=clamp(cEl.getBoundingClientRect().top+scrollY-60,0,root.scrollHeight-innerHeight);
  const t=$('ts');
  t.textContent='✦ Inquiring about '+P[i].n+' — Complete the Concierge form below';
  t.classList.add('on');
  clearTimeout(t._h);
  t._h=setTimeout(()=>t.classList.remove('on'),2600);
}
$('add').onclick=()=>scrollToConcierge(si);
$('dc').addEventListener('click',()=>scrollToConcierge(cm));

const QS=CONFIG.reviews.map(r=>[r.author,r.quote]);
$('tmi').innerHTML=QS.concat(QS).map(q=>'<div class="tq"><div class="st">★★★★★</div><p>"'+q[1]+'"</p><b>'+q[0]+'</b></div>').join('');
document.querySelectorAll('.pcd').forEach(c=>{
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*12);c.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*12)});
  c.addEventListener('mouseleave',()=>{c.style.setProperty('--rx',0);c.style.setProperty('--ry',0)});
});

/* ── PRODUCTION TOGGLE & GALLERY ── */
document.querySelectorAll('#tg button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#tg button').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('.pn').forEach((p,i)=>p.classList.toggle('on',i==+b.dataset.p));
});
const gal=$('gal');
$('gn').onclick=()=>gal.scrollBy({left:315,behavior:'smooth'});
$('gp').onclick=()=>gal.scrollBy({left:-315,behavior:'smooth'});
addEventListener('keydown',e=>{
  if(e.key==='Escape')cl();
  const r=gal.getBoundingClientRect();
  if(r.top<innerHeight&&r.bottom>0){
    if(e.key==='ArrowRight')$('gn').click();
    if(e.key==='ArrowLeft')$('gp').click();
  }
});

/* ── MOBILE MENU & SMOOTH SCROLL ── */
$('bg').onclick=()=>$('mn').classList.toggle('on');
$('mn').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>$('mn').classList.remove('on')));

let tg=scrollY,cur=scrollY,lock=false;
addEventListener('wheel',e=>{if(e.ctrlKey||$('dt').classList.contains('on'))return;tg=clamp(tg+e.deltaY*(e.deltaMode?32:1),0,root.scrollHeight-innerHeight)},{passive:true});
addEventListener('scroll',()=>{if(Math.abs(scrollY-cur)>3)tg=cur=scrollY});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const h=a.getAttribute('href'),t=h.length>1&&document.querySelector(h);
  if(!t)return;
  e.preventDefault();
  tg=clamp(t.getBoundingClientRect().top+scrollY-(h==='#hero'?0:70),0,root.scrollHeight-innerHeight);
}));

const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('in');
    if(e.target.dataset.n){
      const n=+e.target.dataset.n,t=performance.now();
      (function c(){const v=clamp((performance.now()-t)/1400);e.target.textContent=Math.round(n*(1-Math.pow(1-v,3)));if(v<1)requestAnimationFrame(c)})();
    }
    io.unobserve(e.target);
  }
}),{threshold:.15});
document.querySelectorAll('.rv,[data-n]').forEach(e=>io.observe(e));

let mx=0,my=0,sx=0,sy=0,cx=0,cy=0,rx=0,ry=0;
addEventListener('mousemove',e=>{
  mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;cx=e.clientX;cy=e.clientY;
  $('cr').style.opacity=1;
  $('cr').classList.toggle('h',!!e.target.closest('a,button,.pcd,.gal>div,.ex,input,textarea'));
  $('cr').classList.toggle('dg',e.target===cv);
});
document.querySelectorAll('.btn').forEach(b=>{
  b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.2)+'px '+((e.clientY-r.top-r.height/2)*.26)+'px'});
  b.addEventListener('mouseleave',()=>b.style.translate='');
});

/* ── THREE.JS HAUTE BOTANICAL 3D VESSEL STAGE ── */
const cv=$('gl'),hero=$('hero'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.2;
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(30,1,.1,100);cam.position.set(0,0,15);
const env=new THREE.Scene();env.add(new THREE.Mesh(new THREE.BoxGeometry(30,30,30),new THREE.MeshBasicMaterial({color:0x8a7a6c,side:THREE.BackSide})));
function pnl(w,h,x,y,z,c,i){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(c).multiplyScalar(i),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);env.add(m)}
pnl(3,16,-9,2,4,0xffffff,6);pnl(3,16,9,2,3,0xfff0dc,5);pnl(14,3,0,10,0,0xffffff,5);pnl(10,2,0,-9,3,0xffe0c0,3);pnl(8,2,0,4,-9,0xffc0d0,6);pnl(2,10,-6,0,-6,0xffffff,5);pnl(2,10,6,0,-6,0xffd8c8,5);
scene.environment=new THREE.PMREMGenerator(R).fromScene(env,.02).texture;
const key=new THREE.DirectionalLight(0xfff0dc,1.35);key.position.set(4,6,7);scene.add(key);

function lathe(a){return new THREE.LatheGeometry(new THREE.SplineCurve(a.map(v=>new THREE.Vector2(v[0],v[1]))).getPoints(90),64)}
const PR=[
  /* 0: Refillable French Glass Cream Jar */
  {p:[[0,.02],[1.5,0],[1.64,.12],[1.68,.5],[1.68,1.8],[1.62,2.05],[1.55,2.1]],top:2.1,H:3,lr:1.68,L:[.35,1.75],lid:{r:1.7,h:.88},fill:.74,k:1.28,jar:true},
  /* 1: UV-Glass Dropper Serum Bottle + Pipette + Gold Collar */
  {p:[[0,.02],[1.0,0],[1.14,.12],[1.18,.5],[1.18,2.9],[1.1,3.2],[.82,3.4],[.62,3.5],[.62,3.7]],top:3.7,H:5.1,lr:1.18,L:[.7,2.6],lid:{r:.74,h:.44},fill:.66,bulb:true,k:.88},
  /* 2: Couture Lipstick Bullet + Brushed Gold Collar */
  {lip:true,top:3.8,H:3.8,lr:.76,L:[.4,1.4],lid:{r:.76,h:1.8},k:1.15},
  /* 3: Eau de Parfum Flacon + Gold Atomizer + Internal Dip Tube */
  {p:[[0,.02],[1.35,0],[1.5,.15],[1.54,.5],[1.54,2.5],[1.4,2.85],[.5,3.0],[.45,3.2]],top:3.2,H:4.3,lr:1.54,L:[.9,2.2],lid:{r:.58,h:1.25},fill:.78,parfum:true,k:1.02}
];
let kk=1;
const jar=new THREE.Group(),sc=new THREE.Group();jar.add(sc);
const glassM=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.03,transparent:true,opacity:.22,clearcoat:1,clearcoatRoughness:.02,envMapIntensity:3.4,side:THREE.DoubleSide,depthWrite:false});
const fillM=new THREE.MeshPhysicalMaterial({color:0xe3a36b,roughness:.2,clearcoat:.7,envMapIntensity:1.4,emissive:0xe3a36b,emissiveIntensity:.18});
const lidM=new THREE.MeshStandardMaterial({color:0xc9a063,metalness:.82,roughness:.22,envMapIntensity:2});
const goldTrimM=new THREE.MeshStandardMaterial({color:0xd4af37,metalness:.92,roughness:.18,envMapIntensity:2.2});

const lc=document.createElement('canvas');lc.width=1024;lc.height=420;const lx=lc.getContext('2d'),ltex=new THREE.CanvasTexture(lc);ltex.encoding=THREE.sRGBEncoding;
const labelM=new THREE.MeshStandardMaterial({map:ltex,roughness:.55,metalness:.08,side:THREE.DoubleSide});
const mG=new THREE.Mesh(lathe(PR[0].p),glassM),mF=new THREE.Mesh(lathe(PR[0].p),fillM),mL=new THREE.Mesh(new THREE.CylinderGeometry(1,1,.5,48),lidM),mB=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1,48,1,true),labelM);
const mU=new THREE.Mesh(new THREE.LatheGeometry([[0,0],[.4,0],[.42,.15],[.42,.75],[.3,1],[0,1.05]].map(a=>new THREE.Vector2(a[0],a[1])),40),new THREE.MeshStandardMaterial({color:0x231419,roughness:.5}));

/* Extra Luxury 3D Details: Internal Glass Pipette / Perfume Dip Tube & Gold Neck Collar */
const pipetteTube=new THREE.Mesh(new THREE.CylinderGeometry(.07,.05,2.75,24),glassM);
pipetteTube.position.y=2.1;
const goldCollar=new THREE.Mesh(new THREE.CylinderGeometry(.78,.78,.22,48),goldTrimM);
goldCollar.position.y=1.82;
sc.add(mG,mF,mL,mB,mU,pipetteTube,goldCollar);
scene.add(jar);

function wrap(t,max){const w=t.split(' '),o=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>max&&l){o.push(l);l=x}else l=(l+' '+x).trim()});o.push(l);return o}
function label(p){
  lx.fillStyle='#fbf3ee';lx.fillRect(0,0,1024,420);
  lx.fillStyle=p.c;lx.fillRect(0,0,1024,26);lx.fillRect(0,394,1024,26);
  /* Gold Hairline Frame */
  lx.strokeStyle='#c9a063';lx.lineWidth=4;lx.strokeRect(24,42,976,336);
  lx.fillStyle='#231419';lx.textAlign='center';lx.textBaseline='middle';
  lx.font='700 54px Georgia,serif';
  const spacedBrand = (CONFIG.brandName || 'VELORA').toUpperCase().split('').join(' ');
  lx.fillText(spacedBrand,512,96);
  lx.fillStyle=p.c==='#f1dcc0'?'#a9744a':p.c;
  lx.font='italic 700 58px Georgia,serif';
  wrap(p.n,18).slice(0,3).forEach((t,i,a)=>lx.fillText(t,512,212+(i-(a.length-1)/2)*66));
  lx.fillStyle='#73565e';lx.font='700 26px sans-serif';
  lx.fillText((CONFIG.brandSub || 'BOTANICS').toUpperCase()+' · '+p.w.split(',')[0].toUpperCase(),512,348);
  ltex.needsUpdate=true;
}

function setJar(p){
  const d=PR[p.s];kk=d.k;
  mG.visible=!d.lip;
  if(d.lip){
    mG.geometry.dispose();mF.geometry.dispose();
    mF.geometry=new THREE.LatheGeometry([[0,1.8],[.58,1.8],[.58,2.95],[.48,3.42],[.22,3.74],[0,3.82]].map(a=>new THREE.Vector2(a[0],a[1])),48);
  } else {
    mG.geometry.dispose();mG.geometry=lathe(d.p);
    mF.geometry.dispose();
    const pts=new THREE.SplineCurve(d.p.map(v=>new THREE.Vector2(v[0],v[1]))).getPoints(90),fy=d.top*d.fill,f=pts.filter(v=>v.y<=fy).map(v=>new THREE.Vector2(v.x*.94,v.y));
    f.push(new THREE.Vector2(0,fy));
    mF.geometry=new THREE.LatheGeometry(f,64);
  }
  mL.geometry.dispose();
  mL.geometry=new THREE.CylinderGeometry(d.lid.r,d.lid.r,d.lid.h,48);
  mL.position.y=d.lip?d.lid.h/2:d.top+d.lid.h/2-.05;
  mU.visible=!!d.bulb;mU.position.y=d.top+.35;

  /* Show internal glass pipette for Serum Dropper (s=1) & Parfum (s=3) */
  pipetteTube.visible=Boolean(d.bulb||d.parfum);
  pipetteTube.position.y=d.bulb?2.15:1.85;

  /* Show sculpted gold collar on Lipstick (s=2), Parfum atomizer (s=3) & Cream Jar (s=0) */
  goldCollar.visible=true;
  goldCollar.geometry.dispose();
  if(d.lip){
    goldCollar.geometry=new THREE.CylinderGeometry(.79,.79,.22,48);
    goldCollar.position.y=1.78;
  } else if(d.parfum){
    goldCollar.geometry=new THREE.CylinderGeometry(.48,.48,.28,48);
    goldCollar.position.y=3.22;
  } else if(d.jar){
    goldCollar.geometry=new THREE.CylinderGeometry(1.71,1.71,.1,48);
    goldCollar.position.y=2.08;
  } else {
    goldCollar.geometry=new THREE.CylinderGeometry(.76,.76,.1,48);
    goldCollar.position.y=3.68;
  }

  const h=d.L[1]-d.L[0],tl=Math.min(5.5,h*2.44/d.lr);
  mB.geometry.dispose();
  mB.geometry=new THREE.CylinderGeometry(d.lr+.03,d.lr+.03,h,48,1,true,-tl/2,tl);
  mB.position.y=(d.L[0]+d.L[1])/2;
  sc.position.y=-d.H/2;
  fillM.color.set(p.c);fillM.emissive.set(p.c);lidM.color.set(p.lid);
  label(p);bubbles(p);pedUpd(d,p);
}

/* ── FLOATING BOTANICAL PETALS & GOLDEN AURA PEDESTAL ── */
const BN=18,bubs=[];
const ps=new THREE.Shape();ps.moveTo(0,0);ps.quadraticCurveTo(.55,.5,0,1.3);ps.quadraticCurveTo(-.55,.5,0,0);
const petalG=new THREE.ShapeGeometry(ps,12);petalG.translate(0,-.65,0);
const bm=new THREE.MeshStandardMaterial({color:0xc4391d,roughness:.42,envMapIntensity:1.3,side:THREE.DoubleSide});
for(let i=0;i<BN;i++){
  const m=new THREE.Mesh(petalG,bm);
  const a=Math.random()*6.283,r=2.5+Math.random()*3.2;
  m.userData={a,r,y:(Math.random()-.5)*5,s:.1+Math.random()*.25,sp:.15+Math.random()*.3,z:-2+Math.random()*3};
  m.scale.setScalar(m.userData.s*1.7);
  scene.add(m);bubs.push(m);
}
function bubbles(p){bm.color.set(p.c)}

const ped=new THREE.Group(),pedM=new THREE.MeshStandardMaterial({color:0xf6e8dc,roughness:.28,metalness:.15,envMapIntensity:1.5});
ped.add(new THREE.Mesh(new THREE.CylinderGeometry(2.38,2.52,.24,72),pedM));
const pr1=new THREE.Mesh(new THREE.TorusGeometry(2.39,.038,16,96),goldTrimM);
pr1.rotation.x=Math.PI/2;pr1.position.y=.12;ped.add(pr1);
const auraHalo=new THREE.Mesh(new THREE.TorusGeometry(2.75,.018,12,96),goldTrimM);
auraHalo.rotation.x=Math.PI/2.2;auraHalo.position.y=.45;ped.add(auraHalo);

const shc=document.createElement('canvas');shc.width=shc.height=128;const shx=shc.getContext('2d'),shg=shx.createRadialGradient(64,64,0,64,64,64);shg.addColorStop(0,'rgba(60,20,30,.55)');shg.addColorStop(1,'rgba(60,20,30,0)');shx.fillStyle=shg;shx.fillRect(0,0,128,128);
const shd=new THREE.Mesh(new THREE.PlaneGeometry(3.6,3.6),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shc),transparent:true,depthWrite:false}));shd.rotation.x=-Math.PI/2;shd.position.y=.125;ped.add(shd);jar.add(ped);

function pedUpd(d,p){ped.position.y=-d.H/2-.12;pedM.color.set(p.bg);rimL.color.set(p.c);glM.color.set(p.lid)}
const rimL=new THREE.PointLight(0xff9ab0,3,40);rimL.position.set(-5,3,-4);scene.add(rimL);
const rimR=new THREE.PointLight(0xffe0c0,2.2,40);rimR.position.set(5,4,-3);scene.add(rimR);
scene.add(new THREE.HemisphereLight(0xfff5f0,0xc9a0a8,.55));

const gcv=document.createElement('canvas');gcv.width=gcv.height=64;const gx2=gcv.getContext('2d'),gg2=gx2.createRadialGradient(32,32,0,32,32,32);gg2.addColorStop(0,'rgba(255,255,255,1)');gg2.addColorStop(1,'rgba(255,255,255,0)');gx2.fillStyle=gg2;gx2.fillRect(0,0,64,64);
const GN=180,gpos=new Float32Array(GN*3);for(let i=0;i<GN;i++)gpos.set([(Math.random()-.5)*13,(Math.random()-.5)*8,-3+Math.random()*5],i*3);
const gge=new THREE.BufferGeometry();gge.setAttribute('position',new THREE.BufferAttribute(gpos,3));
const glM=new THREE.PointsMaterial({size:.14,map:new THREE.CanvasTexture(gcv),color:0xc9a063,transparent:true,opacity:.65,blending:THREE.AdditiveBlending,depthWrite:false}),glit=new THREE.Points(gge,glM);scene.add(glit);

function fit(){const w=hero.clientWidth,h=hero.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();cam.position.z=15*Math.max(1,1.05/cam.aspect*.9)}
fit();addEventListener('resize',fit);

/* ── HERO 8-PRODUCT SLIDER & SCROLL CHOREOGRAPHY ── */
let si=0,pend=null,swapT=1,auto=0,hov=false;
function show(i){
  document.querySelectorAll('#pl li').forEach((l,k)=>l.classList.toggle('on',k===i));
  si=(i+P.length)%P.length;
  const p=P[si];pend=si;swapT=0;
  const inf=$('inf');inf.classList.add('sw');
  setTimeout(()=>{
    $('ik').textContent=p.k;
    $('isz').textContent=p.w;
    $('in').textContent=p.n;
    $('itg').textContent=p.t;
    $('id').textContent=p.d;
    $('int').textContent=p.notes;
    $('ipr').textContent='$'+p.pr;
    $('cn').textContent=String(si+1).padStart(2,'0')+' / '+String(P.length).padStart(2,'0');
    inf.classList.remove('sw');
  },280);
  root.style.setProperty('--tint',p.bg);
  root.style.setProperty('--c',p.c);
  auto=0;
}
function goto(i){
  const r=$('hT'),top=r.getBoundingClientRect().top+scrollY;
  tg=top+clamp(i,0,P.length-1)/(P.length-1)*(r.offsetHeight-innerHeight)+2;
}
$('pl').innerHTML=P.map((p,i)=>'<li data-i="'+i+'">0'+(i+1)+' · '+p.n+'</li>').join('');
document.querySelectorAll('#pl li').forEach(l=>l.onclick=()=>goto(+l.dataset.i));
$('nx').onclick=()=>goto(Math.min(si+1,P.length-1));
$('pv').onclick=()=>goto(Math.max(si-1,0));
hero.addEventListener('mouseenter',()=>hov=true);
hero.addEventListener('mouseleave',()=>hov=false);
setJar(P[0]);
$('id').textContent=P[0].d;
$('ipr').textContent='$'+P[0].pr;
$('isz').textContent=P[0].w;
$('itg').textContent=P[0].t;
$('int').textContent=P[0].notes;
document.querySelector('#pl li').classList.add('on');
$('hT').style.height=(P.length+1)*70+'vh';

/* ── 3D CELLULAR ESSENCE SHADER ORB ── */
const oT=$('oT'),oc=$('ob'),oR=new THREE.WebGLRenderer({canvas:oc,antialias:true,alpha:true});oR.setPixelRatio(Math.min(devicePixelRatio,2));
const oS=new THREE.Scene(),oCam=new THREE.PerspectiveCamera(35,1,.1,50);oCam.position.z=7;
const OV=\`uniform float uT,uA;varying vec3 vN,vV;
float disp(vec3 p){return uA*(.22*sin(p.x*2.2+uT)*sin(p.y*2.0+uT*1.3)+.16*sin(p.z*3.0+uT*.9+p.x)*sin(p.y*2.6-uT)+.07*sin(p.x*5.0+p.y*4.0+uT*2.0));}
vec3 dp(vec3 p){return p*(1.0+disp(p));}
void main(){vec3 p=normalize(position);vec3 t=normalize(cross(p,vec3(0.0,1.0,0.001)));vec3 b=cross(p,t);float e=.02;
vec3 p0=dp(p),p1=dp(normalize(p+t*e)),p2=dp(normalize(p+b*e));vec3 n=normalize(cross(p1-p0,p2-p0));if(dot(n,p)<0.0)n=-n;
vN=normalize(normalMatrix*n);vec4 mv=modelViewMatrix*vec4(p0,1.0);vV=mv.xyz;gl_Position=projectionMatrix*mv;}\`;
const OF=\`uniform vec3 uC1,uC2,uC3;varying vec3 vN,vV;
void main(){vec3 n=normalize(vN);vec3 v=normalize(-vV);float f=pow(1.0-max(dot(n,v),0.0),2.5);
vec3 L=normalize(vec3(.5,.8,.6));float dif=max(dot(n,L),0.0);vec3 H=normalize(L+v);float sp=pow(max(dot(n,H),0.0),70.0);
vec3 base=mix(uC1,uC2,n.y*.5+.5);base=mix(base,uC3,f);vec3 col=base*(.38+.8*dif)+vec3(sp)+f*uC3*.7;
vec3 L2=normalize(vec3(-.7,-.2,.4));col+=pow(max(dot(n,normalize(L2+v)),0.0),30.0)*uC3*.5;gl_FragColor=vec4(col,1.0);}\`;
const oU={uT:{value:0},uA:{value:.8},uC1:{value:new THREE.Color(CONFIG.orbStages[0].colors[0])},uC2:{value:new THREE.Color(CONFIG.orbStages[0].colors[1])},uC3:{value:new THREE.Color(CONFIG.orbStages[0].colors[2])}};
const orb=new THREE.Mesh(new THREE.IcosahedronGeometry(1,64),new THREE.ShaderMaterial({uniforms:oU,vertexShader:OV,fragmentShader:OF}));oS.add(orb);
const OP=900,opp=new Float32Array(OP*3);for(let i=0;i<OP;i++){const a=Math.random()*6.283,r=2.3+Math.random()*1.7,y=(Math.random()-.5)*2.6;opp.set([Math.cos(a)*r,y,Math.sin(a)*r],i*3)}
const opg=new THREE.BufferGeometry();opg.setAttribute('position',new THREE.BufferAttribute(opp,3));
const oPts=new THREE.Points(opg,new THREE.PointsMaterial({size:.045,color:0xffffff,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false}));oS.add(oPts);

function oFit(){const w=oc.clientWidth,h=oc.clientHeight;if(!w||!h)return;oR.setSize(w,h,false);oCam.aspect=w/h;oCam.updateProjectionMatrix();oCam.position.z=7*Math.max(1,.85/oCam.aspect)}
oFit();addEventListener('resize',oFit);

const OS=CONFIG.orbStages.map(st=>({t:st.title,d:st.description,c:st.colors.map(x=>new THREE.Color(x))}));
let oi=0;
function jumpOrbStage(k){
  const top=oT.getBoundingClientRect().top+scrollY;
  tg=top+(k/2.2)*(oT.offsetHeight-innerHeight)+10;
}
document.querySelectorAll('[data-orb]').forEach(el=>{
  el.onclick=(e)=>{e.stopPropagation();jumpOrbStage(+el.getAttribute('data-orb'))};
});

/* ── 360° POINTER DRAG ON 3D VESSEL ── */
let dYaw=0,dPitch=0,vel=0,drag=false,ax0=0,ay0=0,idle=0;
cv.addEventListener('pointerdown',e=>{drag=true;ax0=e.clientX;ay0=e.clientY;vel=0;idle=0;try{cv.setPointerCapture(e.pointerId)}catch(_){}cv.style.cursor='grabbing';$('dh').style.opacity=0});
cv.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-ax0,dy=e.clientY-ay0;ax0=e.clientX;ay0=e.clientY;dYaw+=dx*.012;dPitch=clamp(dPitch+dy*.006,-.5,.5);vel=dx*.012;idle=0});
const dup=()=>{drag=false;cv.style.cursor='grab'};cv.addEventListener('pointerup',dup);cv.addEventListener('pointercancel',dup);

let tm=0;
function frame(){
  tm+=.016;
  if(Math.abs(tg-cur)>.3){cur+=(tg-cur)*.09;scrollTo(0,cur)}
  sx+=(mx-sx)*.06;sy+=(my-sy)*.06;rx+=(cx-rx)*.2;ry+=(cy-ry)*.2;$('cr').style.transform='translate('+rx+'px,'+ry+'px)';
  const hr=hero.getBoundingClientRect();
  if(hr.bottom>0){
    const tr=$('hT').getBoundingClientRect(),hp=clamp(-tr.top/(tr.height-innerHeight)),pos=hp*(P.length-1),sp=clamp((innerHeight-tr.bottom)/innerHeight);
    $('pb').style.width=(hp*100)+'%';
    const ti=Math.round(pos);
    if(ti!==si&&swapT>.55&&!lock)show(ti);

    let rs=0,sk=1;
    if(swapT<1){swapT=Math.min(1,swapT+.028);rs=ease(swapT)*6.283;sk=Math.abs(Math.cos(swapT*Math.PI));if(swapT>=.5&&pend!==null){setJar(P[pend]);pend=null}}
    const as=innerWidth<800?.78:1;
    jar.scale.setScalar(Math.max(.001,sk*(1-sp*.35)*as*kk));
    jar.position.set(0,.2+sp*3.2+(pos-ti)*-1.1+Math.sin(tm*.8)*.1,0);
    if(!drag){dYaw+=vel;vel*=.94;idle+=.016;if(idle>2){dYaw-=Math.round(dYaw/6.2832)*6.2832;dYaw*=.96;dPitch*=.95}}
    const dg=drag?0:1;
    jar.rotation.y=rs+pos*1.4+Math.sin(tm*.5)*.3*dg+sx*.5*dg+sp*2+dYaw;
    jar.rotation.x=sy*.14*dg+dPitch;
    jar.rotation.z=-sx*.05+Math.sin(tm*.6)*.03;
    auraHalo.rotation.z=tm*.8;
    bubs.forEach(m=>{const u=m.userData,a=u.a+tm*u.sp*.4;m.position.set(Math.cos(a)*u.r-sx*u.z*.3,u.y+Math.sin(tm*u.sp*2+u.a)*.3+sp*2,Math.sin(a)*u.r*.4+u.z);m.rotation.set(tm*u.sp*2+u.a,tm*u.sp*1.3,u.a)});
    glit.rotation.y=tm*.04;glit.position.y=Math.sin(tm*.3)*.2;glM.opacity=.55+.25*Math.sin(tm*2);
    cam.position.x=sx*.3;cam.lookAt(0,0,0);cv.style.opacity=1-sp*.8;
    R.render(scene,cam);
  }
  $('sprog').style.transform='scaleX('+(scrollY/Math.max(1,root.scrollHeight-innerHeight))+')';
  rimL.position.set(-5+sx*8,3-sy*3,-4);

  const orr=oT.getBoundingClientRect();
  if(orr.bottom>0&&orr.top<innerHeight){
    const op=clamp(-orr.top/(orr.height-innerHeight)),opos=op*2,i0=Math.min(1,Math.floor(opos)),ofr=ease(clamp(opos-i0));
    oU.uC1.value.copy(OS[i0].c[0]).lerp(OS[i0+1].c[0],ofr);
    oU.uC2.value.copy(OS[i0].c[1]).lerp(OS[i0+1].c[1],ofr);
    oU.uC3.value.copy(OS[i0].c[2]).lerp(OS[i0+1].c[2],ofr);
    oU.uT.value=tm*.8;
    oU.uA.value=.55+.45*Math.sin(op*Math.PI*3)*Math.sin(op*Math.PI*3)+.25;
    orb.scale.setScalar(1.55+.25*Math.sin(op*6.283));
    orb.rotation.y=op*5+tm*.2+sx*.6;
    orb.rotation.x=sy*.3+op*1.5;
    oPts.rotation.y=-tm*.08+op*2;
    oPts.rotation.x=.3*Math.sin(tm*.2);
    const k=Math.min(2,Math.floor(op*3));
    if(k!==oi){
      oi=k;
      const oc2=$('oc');oc2.classList.add('sw');
      setTimeout(()=>{
        $('os').textContent='THE CELLULAR ESSENCE · 0'+(k+1);
        $('ot').textContent=OS[k].t;
        $('od2').textContent=OS[k].d;
        oc2.classList.remove('sw');
      },260);
      document.querySelectorAll('.od i').forEach((d,j)=>d.classList.toggle('on',j===k));
      document.querySelectorAll('.orb-tab').forEach((b,j)=>b.classList.toggle('on',j===k));
    }
    oFit();oR.render(oS,oCam);
  }
  requestAnimationFrame(frame);
}
frame();

/* ── PRELOADER DISMISSAL FALLBACK ── */
setTimeout(() => {
  if (typeof window.dismissVeloraLoader === 'function') {
    window.dismissVeloraLoader();
  }
  lock = false;
  document.body.classList.add('go');
}, 1800);
})();
</script></body></html>`;
}

export const VeloraLiveFrame: React.FC<VeloraLiveFrameProps> = ({
  config,
  selectedSection,
  selectedProductIndex,
  inspectorEnabled = true,
  onSelectElement,
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const srcDoc = useMemo(() => buildVeloraExactHtml(config), [config]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data as VeloraSelectionMessage;
      if (data && data.type === 'VELORA_SELECT_SECTION' && onSelectElement) {
        onSelectElement(data.section, data.productIndex, data.label);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSelectElement]);

  useEffect(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      {
        type: 'VELORA_SET_INSPECTOR',
        enabled: inspectorEnabled,
      },
      '*'
    );
  }, [inspectorEnabled, srcDoc]);

  useEffect(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !selectedSection) return;
    win.postMessage(
      {
        type: 'VELORA_FOCUS_SECTION',
        section: selectedSection,
        productIndex: selectedProductIndex,
      },
      '*'
    );
  }, [selectedSection, selectedProductIndex]);

  return (
    <iframe
      ref={iframeRef}
      title={`${config.brandName} ${config.brandSub} — 3D Clean Beauty Experience`}
      srcDoc={srcDoc}
      className="w-full h-full border-0 bg-[#fbf3ee]"
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default VeloraLiveFrame;
