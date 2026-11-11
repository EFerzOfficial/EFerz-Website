import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Box,
  Check,
  ChevronRight,
  Code2,
  CupSoda,
  Droplets,
  Edit3,
  Eye,
  Flame,
  FlaskConical,
  Heart,
  Image as ImageIcon,
  Layout,
  Lock,
  MessageSquareQuote,
  MousePointerClick,
  Palette,
  RefreshCw,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  Sun,
  Type,
  Upload,
  Users,
  Wine,
  Zap,
} from 'lucide-react';
import { ViewType } from '../../types';
import { MorphShape } from '../../data/morphShapes';
import { serviceScrollAudio } from '../../utils/serviceScrollAudio';
import FizzoLiveFrame, {
  FizzoCustomizationConfig,
  FizzoSectionId,
} from './FizzoLiveFrame';
import VeloraLiveFrame, {
  VeloraCustomizationConfig,
  VeloraSectionId,
  createInitialVeloraConfig,
} from './VeloraLiveFrame';
import ZaikaLiveFrame, {
  ZaikaCustomizationConfig,
  buildZaikaHtml,
  createInitialZaikaConfig,
} from './ZaikaLiveFrame';
import MeltoLiveFrame, {
  MeltoCustomizationConfig,
  buildMeltoHtml,
  createInitialMeltoConfig,
} from './MeltoLiveFrame';
import Universal3DLiveFrame from './Universal3DLiveFrame';
import {
  UNIVERSAL_3D_DEMOS,
  UniversalDemoTemplate,
} from '../../data/universal3dDemosData';
import { useLocale } from '../../utils/LocaleContext';

interface LetsBuildViewProps {
  onSelectShape?: (shape: MorphShape) => void;
  onNavigate?: (view: ViewType) => void;
  onStartProject?: () => void;
}

export type FlavorIconKey = 'zap' | 'flame' | 'droplets' | 'sun' | 'sparkles' | 'heart' | 'shield';

export interface DrinkFlavorItem {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  calories: string;
  sugar: string;
  extract: string;
  carbonation: string;
  iconKey: FlavorIconKey;
}

export interface ProcessStageItem {
  id: string;
  stepCode: string;
  badge: string;
  title: string;
  subtitle: string;
  metricOneLabel: string;
  metricOneValue: string;
  metricTwoLabel: string;
  metricTwoValue: string;
  iconKey: FlavorIconKey;
}

export interface DrinkSiteConfig {
  brandName: string;
  brandSubtext: string;
  logoImageUrl: string | null;
  navLinks: [string, string, string, string];
  navCtaText: string;
  heroBadge: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroDescription: string;
  heroPrimaryBtn: string;
  heroSecondaryBtn: string;
  canVolumeText: string;
  flavorsSectionBadge: string;
  flavorsSectionTitle: string;
  flavors: DrinkFlavorItem[];
  processStages: ProcessStageItem[];
  craftBadge: string;
  craftTitle: string;
  craftDescription: string;
  craftHighlights: {
    id: string;
    title: string;
    subtitle: string;
    metric: string;
    iconKey: FlavorIconKey;
  }[];
  footerTagline: string;
  footerEmail: string;
  footerPhone: string;
  footerAddress: string;
  footerCopyright: string;
}

interface MainCategoryCard {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  badge: string;
  badgeAr: string;
  isAvailable: boolean;
  accent: string;
  subCategoriesCount: number;
}

interface SubCategoryItem {
  id: string;
  categoryId: string;
  templateType: 'fizzo' | 'velora' | 'melto' | 'zaika' | 'universal';
  universalId?: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  badge: string;
  badgeAr: string;
  isAvailable: boolean;
  accent: string;
  activeSessionBy?: string;
}

const MAIN_CATEGORIES: MainCategoryCard[] = [
  {
    id: 'food-beverage',
    title: '01. Food, Beverage & Juice Cans',
    titleAr: '01. الأغذية والمشروبات وعصائر الفواكه 3D',
    subtitle: '3D Drink Cans, 6-Stage Can Forming, 330ml Nozzle Fill, Pop, Pour & Variety Box',
    subtitleAr: 'عبوات مشروبات ثلاثية الأبعاد، تشكيل العبوة، سكب الكأس وتعبئة الصندوق',
    description:
      'Complete FIZZO 3D interactive website with Three.js cans, Variety Box packing choreography, glass pour with ice, and click-any-text editing.',
    descriptionAr:
      'موقع FIZZO التفاعلي ثلاثي الأبعاد بالكامل مع تدوير العبوة بالماوس، تعبئة الصندوق، سكب الكأس، وميزة التعديل المباشر لأي نص.',
    badge: 'LIVE 3D CAN + BOX',
    badgeAr: 'نموذج 3D متاح',
    isAvailable: true,
    accent: '#FF5500',
    subCategoriesCount: 1,
  },
  {
    id: 'icecream-gelato',
    title: '02. Ice Cream, Gelato & Frozen Treats',
    titleAr: '02. الآيس كريم والجيلاتو والحلويات المثلجة',
    subtitle: 'Exact 3D Pint Tub, Hand-Churned Creamery, Instanced Sprinkles & Flavour Tasting',
    subtitleAr: 'مخروط وعبوة الآيس كريم، الكريمة الحرفية وتدوير العبوة ثلاثية الأبعاد 3D',
    description:
      'Exact Melto Creamery 3D experience with real-time Three.js pint tub, rich scoops, sprinkle physics, smooth scroll transitions, and click-any-text editing.',
    descriptionAr:
      'تصميم Melto Creamery ثلاثي الأبعاد الحقيقي مع عبوة الآيس كريم، الكريمة الحرفية، وتجربة تصفح ثلاثية الأبعاد كاملة.',
    badge: 'EXACT 3D PINT TUB',
    badgeAr: 'نموذج 3D متاح',
    isAvailable: true,
    accent: '#ff5c8a',
    subCategoriesCount: 1,
  },
  {
    id: 'traditional-spices',
    title: '03. Traditional Spices & Seasonings',
    titleAr: '03. التوابل والبهارات التراثية والمصالحات',
    subtitle: 'Exact 3D Lathe Glass Jar, Sun-Cured Masalas, Heat Ratings & 3D Jar Rotation',
    subtitleAr: 'الجار الزجاجي، البهارات التراثية، مقياس الحرارة وتدوير الجار بالماوس 3D',
    description:
      'Exact Zaika Pantry 3D experience with Three.js lathe glass jars, lid textures, heat ratings, 6 pantry products, smooth scroll transitions, and click-any-text editing.',
    descriptionAr:
      'تصميم Zaika Pantry ثلاثي الأبعاد الحقيقي مع الجار الزجاجي ثلاثي الأبعاد، بهارات ومخللات، وميزة التعديل المباشر.',
    badge: 'EXACT 3D GLASS JAR',
    badgeAr: 'نموذج 3D متاح',
    isAvailable: true,
    accent: '#e0881c',
    subCategoriesCount: 1,
  },
  {
    id: 'beauty-cosmetics',
    title: '04. Beauty, Skincare & Luxury Cosmetics',
    titleAr: '04. الجمال والعناية بالبشرة ومستحضرات التجميل',
    subtitle: '3D Glass Dropper Serums, French Cream Jars, Lipsticks & Botanical Shader Orb',
    subtitleAr: 'عبوات السيروم الزجاجية، كريمات البشرة، أحمر الشفاه وكرة الشيدر 3D',
    description:
      'Complete VELORA BOTANICS 3D WebGL experience with 8 physical glass vessels, internal pipettes, gold collars, floating botanical petals, and click-any-text editor.',
    descriptionAr:
      'موقع Velora Botanics التفاعلي ثلاثي الأبعاد بالكامل مع 8 منتجات ثلاثية الأبعاد، بتلات طائرة، وميزة التعديل المباشر.',
    badge: 'LIVE 8-VESSEL 3D',
    badgeAr: 'نموذج 3D متاح',
    isAvailable: true,
    accent: '#c4506a',
    subCategoriesCount: 1,
  },
];

const ALL_SUB_CATEGORIES: SubCategoryItem[] = [
  {
    id: 'drink',
    categoryId: 'food-beverage',
    templateType: 'fizzo',
    title: 'FIZZO — 3D Soda Can & Variety Box Packing',
    titleAr: 'FIZZO — عبوة المشروبات الغازية وتعبئة الصندوق 3D',
    subtitle: '6-Stage 3D Can Forming, 330ml Nozzle Fill, Pop, Glass Pour, Globe & Variety Box',
    subtitleAr: 'تشكيل العبوة، التعبئة، فتح الغطاء، سكب الكأس، وتعبئة الصندوق',
    description:
      'Complete FIZZO 3D interactive website with Three.js drag-to-rotate cans, Variety Box packing choreography, Glass Pour with ice, and click-any-text editing.',
    descriptionAr:
      'موقع FIZZO التفاعلي ثلاثي الأبعاد بالكامل مع تدوير العبوة بالماوس، تعبئة الصندوق، سكب الكأس، وميزة التعديل المباشر لأي نص.',
    badge: 'LIVE 3D CAN + BOX',
    badgeAr: 'جاهز للتخصيص المباشر',
    isAvailable: true,
    accent: '#FF5500',
  },
  {
    id: 'melto-icecream-3d',
    categoryId: 'icecream-gelato',
    templateType: 'melto',
    title: 'MELTO — 3D Ice Cream & Gelato Creamery',
    titleAr: 'MELTO — الآيس كريم والجيلاتو الحرفي ثلاثي الأبعاد 3D',
    subtitle: 'Exact 3D Pint Tub, Lathe Geometry, Instanced Sprinkles & Flavour Explorer',
    subtitleAr: 'عبوة الآيس كريم، الكريمة الحرفية، وتدوير العبوة 3D',
    description:
      'Exact Melto Creamery 3D experience with real-time Three.js pint tub, rich scoops, sprinkle physics, smooth scroll transitions, and click-any-text editing.',
    descriptionAr:
      'تصميم Melto Creamery ثلاثي الأبعاد الحقيقي مع عبوة الآيس كريم، الكريمة الحرفية، وتجربة تصفح ثلاثية الأبعاد كاملة.',
    badge: 'EXACT 3D PINT TUB',
    badgeAr: 'جاهز للتخصيص المباشر',
    isAvailable: true,
    accent: '#ff5c8a',
    activeSessionBy: 'Gelato Chef #104 (Active)',
  },
  {
    id: 'desi-spices-3d',
    categoryId: 'traditional-spices',
    templateType: 'zaika',
    title: 'ZAIKA / DESI — 3D Heritage Spice & Pickle Pantry',
    titleAr: 'ZAIKA — التوابل والمخللات التراثية ثلاثية الأبعاد 3D',
    subtitle: 'Exact 3D Glass Lathe Jar, Heat Meter, Sun-Cured Masalas & 3D Jar Rotation',
    subtitleAr: 'الجار الزجاجي، درجات الحرارة والبهارات التراثية وتدوير الجار 3D',
    description:
      'Exact Zaika Pantry 3D experience with Three.js lathe glass jars, lid textures, heat ratings, 6 pantry products, smooth scroll transitions, and click-any-text editing.',
    descriptionAr:
      'تصميم Zaika Pantry ثلاثي الأبعاد الحقيقي مع الجار الزجاجي ثلاثي الأبعاد، بهارات ومخللات، وميزة التعديل المباشر.',
    badge: 'EXACT 3D GLASS JAR',
    badgeAr: 'جاهز للتخصيص المباشر',
    isAvailable: true,
    accent: '#e0881c',
    activeSessionBy: 'Master Blender #208 (Active)',
  },
  {
    id: 'velora-botanics',
    categoryId: 'beauty-cosmetics',
    templateType: 'velora',
    title: 'VELORA BOTANICS — 8 Haute 3D Skincare Vessels & Shader Orb',
    titleAr: 'VELORA BOTANICS — 8 عبوات عناية بالبشرة وكرة الشيدر 3D',
    subtitle: '3D Glass Dropper Serums, French Cream Jars, Lipsticks, Parfum & Essence Orb',
    subtitleAr: 'عبوات السيروم الزجاجية، كريمات البشرة، أحمر الشفاه والعطور ثلاثية الأبعاد',
    description:
      'Complete Velora Botanics 3D WebGL experience with 8 physical glass vessels, internal pipettes, gold collars, floating botanical petals, and click-any-text editor.',
    descriptionAr:
      'موقع Velora Botanics التفاعلي ثلاثي الأبعاد بالكامل مع 8 منتجات ثلاثية الأبعاد، بتلات طائرة، وميزة التعديل المباشر.',
    badge: 'LIVE 8-VESSEL 3D',
    badgeAr: 'جاهز للتخصيص المباشر',
    isAvailable: true,
    accent: '#c4506a',
  },
];

export const renderFlavorIcon = (key: FlavorIconKey, className = 'w-5 h-5') => {
  switch (key) {
    case 'zap':
      return <Zap className={className} />;
    case 'flame':
      return <Flame className={className} />;
    case 'droplets':
      return <Droplets className={className} />;
    case 'sun':
      return <Sun className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'heart':
      return <Heart className={className} />;
    case 'shield':
      return <ShieldCheck className={className} />;
    default:
      return <Zap className={className} />;
  }
};

const ImageCustomizerField: React.FC<{
  label: string;
  sublabel?: string;
  value?: string | null;
  onChange: (url: string | null) => void;
  accentColor?: string;
  placeholder?: string;
  presetImages?: { label: string; url: string }[];
}> = ({ label, sublabel, value, onChange, accentColor = '#FF5500', placeholder = 'https://...', presetImages }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-mono uppercase tracking-wider text-white/80 font-semibold">{label}</label>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-[10px] font-mono text-rose-300 hover:text-rose-100 underline cursor-pointer"
          >
            Remove
          </button>
        )}
      </div>
      {sublabel && <p className="text-[10px] text-white/50">{sublabel}</p>}

      {value && (
        <div className="flex items-center gap-3 p-2 rounded-lg bg-black/40 border border-white/15">
          <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1 border border-white/20">
            <img src={value} alt="Preview" className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono text-emerald-300 truncate">Asset Applied ✓</p>
            <p className="text-[9px] text-white/50 truncate">{value.startsWith('data:') ? 'Custom Uploaded Image' : value}</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value?.startsWith('data:') ? '' : (value || '')}
          placeholder={value?.startsWith('data:') ? 'Custom uploaded image active' : placeholder}
          onChange={(e) => onChange(e.target.value.trim() || null)}
          className="flex-1 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white placeholder-white/30"
        />
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{ borderColor: `${accentColor}55` }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] border text-[11px] font-mono uppercase tracking-wider text-white cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span>Upload</span>
        </button>
      </div>

      {presetImages && presetImages.length > 0 && (
        <div className="pt-1">
          <p className="text-[9px] font-mono uppercase text-white/40 mb-1">Presets:</p>
          <div className="flex flex-wrap gap-1.5">
            {presetImages.map((pr, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(pr.url)}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] hover:bg-white/15 text-white/80 border border-white/10 cursor-pointer"
              >
                {pr.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const createInitialFizzoConfig = (): FizzoCustomizationConfig => ({
  brandName: 'FIZZO',
  logoImageUrl: null,
  loaderImageUrl: null,
  navLinks: ['Flavors', 'Can Fill', 'Glass Pour', 'Variety Box', 'Nutrition'],
  navCtaText: 'Crate',
  heroBadge: 'NEW SEASON · SUMMER 2026',
  heroTitleLine1: 'Pop the',
  heroTitleStroke: 'INTO',
  heroTitleLine3: 'Fizz',
  heroSubtext:
    'Ice-cold, extra bubbly and made to be shared. Find your flavour in our sleek 330 ml aluminum can, and look under the tab for a free-drink code.',
  heroScrollHint: 'SCROLL ↓ TO EXPLORE CAN FORMING, FILLING, POP, POUR, GLOBE & VARIETY BOX',
  promoCode: 'FIZZ20',
  promoBadgeTop: 'BUY 1',
  promoBadgeBottom: 'GET 1',
  flavors: [
    {
      name: 'ORANGE CRUSH',
      sub: 'Sun-ripened Blood Orange',
      badge: '🍊 01 / BLOOD ORANGE',
      title1: 'ORANGE',
      title2: 'CRUSH',
      desc: 'Sun-ripened Sicilian blood oranges blended with sparkling mountain water and a zesty peel finish.',
      price: '$32.00',
      packLabel: '12-Can Case',
      ctaText: 'Add To Crate — ORANGE CRUSH',
      calories: '35',
      sugar: '0g',
      fiber: '5g',
      bgHex: '#c84200',
      canHex: '#ff5500',
      accentHex: '#ff9a00',
      caffeine: '0 mg',
      tastingNotes: 'Sweet Sicilian orange, peel zest, light vanilla',
    },
    {
      name: 'BERRY BLAST',
      sub: 'Wild Mixed Berries',
      badge: '🍓 02 / WILD BERRY',
      title1: 'BERRY',
      title2: 'BLAST',
      desc: 'Crushed Oregon blackberries, tart raspberries, and hibiscus flowers for a bold electric berry punch.',
      price: '$34.00',
      packLabel: '12-Can Case',
      ctaText: 'Add To Crate — BERRY BLAST',
      calories: '35',
      sugar: '0g',
      fiber: '5g',
      bgHex: '#8a0e3b',
      canHex: '#e01e5a',
      accentHex: '#ff5c8a',
      caffeine: '0 mg',
      tastingNotes: 'Raspberry, blackcurrant, wild strawberry',
    },
    {
      name: 'LIME VOLT',
      sub: 'Zesty Key Lime & Mint',
      badge: '🍋‍🟩 03 / KEY LIME',
      title1: 'LIME',
      title2: 'VOLT',
      desc: 'Crisp Mexican key limes, cooling garden mint, and sea-salt electrolytes for ultimate sub-zero refreshment.',
      price: '$32.00',
      packLabel: '12-Can Case',
      ctaText: 'Add To Crate — LIME VOLT',
      calories: '30',
      sugar: '0g',
      fiber: '5g',
      bgHex: '#15612c',
      canHex: '#22c55e',
      accentHex: '#86efac',
      caffeine: '0 mg',
      tastingNotes: 'Key lime zest, fresh garden mint, green apple',
    },
    {
      name: 'CLASSIC COLA',
      sub: 'Bold Botanical Cola',
      badge: '⚡ 04 / CRAFT COLA',
      title1: 'CLASSIC',
      title2: 'COLA',
      desc: 'Deep caramel, warm Madagascar vanilla and a hint of citrus spice, finished with sharp champagne carbonation.',
      price: '$36.00',
      packLabel: '12-Can Case',
      ctaText: 'Add To Crate — CLASSIC COLA',
      calories: '35',
      sugar: '0g',
      fiber: '5g',
      bgHex: '#420814',
      canHex: '#d90a1e',
      accentHex: '#ff6b6b',
      caffeine: '34 mg',
      tastingNotes: 'Caramel, Madagascar vanilla, citrus zest, warm spice',
    },
  ],
  marqueeItems: [
    '⚡ ZERO SUGAR',
    '🍊 REAL COLD-PRESSED FRUIT',
    '🫧 5G PREBIOTIC FIBER',
    '🥫 100% RECYCLABLE CAN',
    '📦 4-FLAVOR VARIETY BOX',
  ],
  packBadge: '📦 Stage 06 · Interactive 3D Variety Box Packing',
  packTitleLine1: 'Watch It',
  packTitleStroke: 'Pack',
  packTitleLine3: 'Up!',
  packSubtext:
    'Watch all 4 signature FIZZO cans drop into our custom kraft Variety Box — flaps fold shut and branded tape seals your crate.',
  packSteps: ['01. Open Crate', '02. Drop 4 Cans', '03. Fold Flaps', '04. Tape Seal'],
  fillBadge: '🫧 Stage 04 · Fresh Glass Pour & Fizz',
  fillTitleLine1: 'Feel',
  fillTitleStroke: 'the',
  fillTitleLine3: 'fizz',
  fillSubtext:
    'Tilt the FIZZO can and let the ice-cold drink cascade into the crystal glass, building a light, bubbly foam head with floating ice.',
  fillSteps: ['01. Tilt & Pop', '02. Liquid Stream', '03. Glass Fill', '04. Foam & Ice'],
  bottleBadge: '🥫 Stage 02 · Sterile Nozzle Can Fill & Lid Seam',
  bottleTitleLine1: 'Fill',
  bottleTitleStroke: 'it up',
  bottleTitleLine3: '330ml',
  bottleSubtext:
    'A sterile high-velocity nozzle fills the aluminum can with chilled, perfectly carbonated botanical drink — exactly 330 ml each time before locking the stay-on-tab lid.',
  bottleSteps: ['01. Aluminum Billet', '02. Deep Drawing', '03. 330ml Nozzle Fill', '04. Lid Seam Lock'],
  nutritionBadge: '🔬 CLEAN BOTANICAL FORMULA',
  nutritionTitle: 'Clean',
  nutritionSubtitle:
    'We replaced high-fructose corn syrup and artificial dyes with cold-pressed organic juice, Jerusalem artichoke prebiotic fiber, and pinpoint champagne carbonation.',
  nutritionServing: '1 Can (330mL / 11.2 fl oz)',
  nutritionCalories: '35',
  nutritionFacts: [
    { label: 'Total Fat', amount: '0g', dv: '0%' },
    { label: 'Sodium', amount: '15mg', dv: '1%' },
    { label: 'Total Carbohydrate', amount: '8g', dv: '3%' },
    { label: 'Dietary Prebiotic Fiber', amount: '5g', dv: '18%' },
    { label: 'Total Sugars (0g Added)', amount: '0g', dv: '0%' },
    { label: 'Vitamin C (Botanical)', amount: '45mg', dv: '50%' },
  ],
  nutritionIngredients:
    'Carbonated Mountain Water, Cold-Pressed Organic Fruit Juice, Organic Jerusalem Artichoke Inulin (Prebiotic Fiber), Natural Botanical Extracts, Monk Fruit Extract, Sea Salt.',
  reviewsBadge: '★ 4.9 / 5 FROM 14,000+ SIPPERS',
  reviewsTitle: 'Loved by',
  reviews: [
    {
      name: 'Maya Lin',
      role: 'Verified Variety Box Buyer',
      rating: '★★★★★',
      quote:
        'Orange Crush tastes like freshly squeezed Sicilian blood oranges with champagne bubbles. Watching the 4-can Variety Box arrive chilled is a treat.',
    },
    {
      name: 'Marcus Vance',
      role: 'Fitness & Nutrition Coach',
      rating: '★★★★★',
      quote:
        '35 calories, zero sugar, and 5g of prebiotic fiber in a sleek 330ml can. The Lime Volt after a workout is unbeatable.',
    },
    {
      name: 'Elena Rostova',
      role: 'Beverage Sommelier',
      rating: '★★★★★',
      quote:
        'The carbonation bite when you crack the aluminum pull-tab puts every other craft soda to shame. Berry Blast is a masterpiece.',
    },
  ],
  footerTitle: 'FIZZO SODA',
  footerSubtext:
    'Buy one 4-Flavor Variety Box, get one free with code FIZZ20 on your first order.',
  footerCtaText: 'ORDER VARIETY BOX NOW ↑',
  footerCopyright: '© 2026 FIZZO. All Rights Reserved. | Powered by EFerz (EFerz.com)',
  customHtmlOverride: null,
});

export const LetsBuildView: React.FC<LetsBuildViewProps> = ({ onNavigate }) => {
  const { lang, isRTL, currency, formatPrice } = useLocale();
  const isAr = lang === 'ar';

  const [builderStage, setBuilderStage] = useState<'categories' | 'subcategories' | 'studio'>('categories');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('food-beverage');
  const [activeDemoTemplate, setActiveDemoTemplate] = useState<'fizzo' | 'velora' | 'melto' | 'zaika' | 'universal'>('fizzo');
  const [activeUniversalId, setActiveUniversalId] = useState<string>('melto-icecream-3d');

  // 1. Complete Customization State for FIZZO Exact HTML + Three.js Demo
  const [fizzoConfig, setFizzoConfig] = useState<FizzoCustomizationConfig>(createInitialFizzoConfig);

  // 2. Complete Customization State for MELTO Exact HTML + Three.js Demo
  const [meltoConfig, setMeltoConfig] = useState<MeltoCustomizationConfig>(createInitialMeltoConfig);

  // 3. Complete Customization State for ZAIKA / DESI SPICES Exact HTML + Three.js Demo
  const [zaikaConfig, setZaikaConfig] = useState<ZaikaCustomizationConfig>(createInitialZaikaConfig);

  // 4. Complete Customization State for VELORA BOTANICS Exact HTML + Three.js Demo
  const [veloraConfig, setVeloraConfig] = useState<VeloraCustomizationConfig>(createInitialVeloraConfig);

  // 5. Complete Customization State for Universal 3D WebGL Demos (Fallbacks)
  const [universalConfigs, setUniversalConfigs] = useState<Record<string, UniversalDemoTemplate>>(() => {
    const map: Record<string, UniversalDemoTemplate> = {};
    UNIVERSAL_3D_DEMOS.forEach((d) => {
      map[d.id] = JSON.parse(JSON.stringify(d));
    });
    return map;
  });

  // 4. Multi-User Concurrent Demo Lock State
  const [occupiedDemos, setOccupiedDemos] = useState<Record<string, { occupiedBy: string; variantCount: number }>>({
    'melto-icecream-3d': { occupiedBy: 'Gelato Chef #104 (Active)', variantCount: 1 },
    'desi-spices-3d': { occupiedBy: 'Master Blender #208 (Active)', variantCount: 1 },
  });
  const [universalEditorTab, setUniversalEditorTab] = useState<
    'brand' | 'hero' | 'stages' | 'products' | 'reviews' | 'footer'
  >('brand');
  const [clickedTextPath, setClickedTextPath] = useState<string>('');
  const [clickedTextValue, setClickedTextValue] = useState<string>('');

  // Sync flavor prices when currency switches between USD and SAR
  useEffect(() => {
    const baseUsd = [32, 34, 32, 36];
    setFizzoConfig((prev) => ({
      ...prev,
      flavors: prev.flavors.map((f, idx) => ({
        ...f,
        price:
          currency === 'SAR'
            ? formatPrice(baseUsd[idx] || 32)
            : `$${(baseUsd[idx] || 32).toFixed(2)}`,
      })),
    }));
  }, [currency, formatPrice]);

  // Editor & Preview States
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(true);
  const [isFullPreview, setIsFullPreview] = useState<boolean>(false);
  const [inspectorEnabled, setInspectorEnabled] = useState<boolean>(true);
  const [editorTab, setEditorTab] = useState<FizzoSectionId>('brand');
  const [veloraEditorTab, setVeloraEditorTab] = useState<VeloraSectionId>('brand');
  const [activeFlavorIndex, setActiveFlavorIndex] = useState<number>(0);
  const [activeVeloraProductIndex, setActiveVeloraProductIndex] = useState<number>(0);
  const [activeSimpleProductIndex, setActiveSimpleProductIndex] = useState<number>(0);
  const [simpleEditorTab, setSimpleEditorTab] = useState<
    'brand' | 'hero' | 'story' | 'products' | 'spotlight' | 'footer' | 'html'
  >('brand');
  const [selectedElementLabel, setSelectedElementLabel] = useState<string>('Brand & Navbar');
  const [saveToast, setSaveToast] = useState<boolean>(false);
  const [lockedPublishNotice, setLockedPublishNotice] = useState<boolean>(false);
  const [variantToastMsg, setVariantToastMsg] = useState<string | null>(null);
  const [customCategoryIcons, setCustomCategoryIcons] = useState<Record<string, string>>({});
  const [activeIconTargetId, setActiveIconTargetId] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const categoryIconInputRef = useRef<HTMLInputElement | null>(null);
  const htmlFileInputRef = useRef<HTMLInputElement | null>(null);
  const drawerScrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-convert any uploaded image into a crisp, glowing 128x128 badge icon (Canvas Image-to-Icon Generator)
  const convertImageToStylizedIcon = (
    file: File,
    accentHex: string,
    onDone: (iconDataUrl: string) => void
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          onDone(reader.result as string);
          return;
        }
        // Draw dark studio badge background with glowing border
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(4, 4, 120, 120, 28);
        ctx.clip();

        // Center-crop image into square icon
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;
        ctx.drawImage(img, sx, sy, minSide, minSide, 4, 4, 120, 120);
        ctx.restore();

        // Neon accent frame
        ctx.strokeStyle = accentHex || '#d02128';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(4, 4, 120, 120, 28);
        ctx.stroke();

        onDone(canvas.toDataURL('image/png'));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  // Helper to update any nested path inside a UniversalDemoTemplate (from inline text edit or sidebar)
  const updateUniversalByPath = useCallback((demoId: string, path: string, newValue: string) => {
    if (!path) return;
    setUniversalConfigs((prev) => {
      const target = prev[demoId];
      if (!target) return prev;
      const clone: UniversalDemoTemplate = JSON.parse(JSON.stringify(target));
      const parts = path.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let cur: any = clone;
      for (let i = 0; i < parts.length - 1; i++) {
        if (cur[parts[i]] === undefined) return prev;
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = newValue;
      return { ...prev, [demoId]: clone };
    });
  }, []);

  // Generate a fresh 3D demo variant when a demo is already in use by another user (or on demand)
  const handleSpawnFreshVariant = useCallback(
    (sub: SubCategoryItem) => {
      serviceScrollAudio.playServiceLaunch();
      const palettes = [
        { pri: '#00F5D4', sec: '#FF2A85', bg: '#040911', mid: '#0D2238' },
        { pri: '#F59E0B', sec: '#38BDF8', bg: '#0A0704', mid: '#26180A' },
        { pri: '#A855F7', sec: '#CCFF00', bg: '#07040E', mid: '#1E0D36' },
        { pri: '#10B981', sec: '#F43F5E', bg: '#030B08', mid: '#0A291E' },
      ];
      const currentCount = (occupiedDemos[sub.id]?.variantCount || 1) + 1;
      const pal = palettes[currentCount % palettes.length];

      setOccupiedDemos((prev) => ({
        ...prev,
        [sub.id]: {
          occupiedBy: `Workspace #${currentCount} (Your Isolated Instance)`,
          variantCount: currentCount,
        },
      }));

      if (sub.templateType === 'melto') {
        setActiveDemoTemplate('melto');
        setSelectedCategoryId('icecream-gelato');
      } else if (sub.templateType === 'zaika') {
        setActiveDemoTemplate('zaika');
        setSelectedCategoryId('traditional-spices');
      } else if (sub.templateType === 'velora') {
        setActiveDemoTemplate('velora');
        setSelectedCategoryId('beauty-cosmetics');
        setVeloraEditorTab('brand');
      } else if (sub.templateType === 'universal' && sub.universalId) {
        setUniversalConfigs((prev) => {
          const cur = prev[sub.universalId!];
          if (!cur) return prev;
          return {
            ...prev,
            [sub.universalId!]: {
              ...cur,
              primaryHex: pal.pri,
              secondaryHex: pal.sec,
              bgDarkHex: pal.bg,
              bgMidHex: pal.mid,
              variantGeneration: (cur.variantGeneration || 0) + 1,
            },
          };
        });
        setActiveDemoTemplate('universal');
        setActiveUniversalId(sub.universalId);
        setUniversalEditorTab('brand');
      } else {
        setActiveDemoTemplate('fizzo');
        setSelectedCategoryId('food-beverage');
        setEditorTab('brand');
      }

      setVariantToastMsg(
        `Spawned Fresh 3D Variant #0${currentCount} with isolated layout & studio palette so you can edit without conflicts!`
      );
      setTimeout(() => setVariantToastMsg(null), 4200);
      setBuilderStage('studio');
    },
    [occupiedDemos]
  );

  // Handler when user clicks any container/article/section inside the live FIZZO website preview
  const handleSelectElementFromPreview = useCallback(
    (section: FizzoSectionId, flavorIndex?: number, label?: string) => {
      serviceScrollAudio.playCardHoverTick();
      setIsFullPreview(false);
      setIsEditorOpen(true);
      setEditorTab(section);
      if (typeof flavorIndex === 'number' && !Number.isNaN(flavorIndex)) {
        setActiveFlavorIndex(flavorIndex);
      }
      if (label) {
        setSelectedElementLabel(label);
      }
      setTimeout(() => {
        drawerScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 40);
    },
    []
  );

  // Handler when user clicks any container/article/section inside the live VELORA website preview
  const handleSelectVeloraElementFromPreview = useCallback(
    (section: VeloraSectionId, productIndex?: number, label?: string) => {
      serviceScrollAudio.playCardHoverTick();
      setIsFullPreview(false);
      setIsEditorOpen(true);
      setVeloraEditorTab(section);
      if (typeof productIndex === 'number' && !Number.isNaN(productIndex)) {
        setActiveVeloraProductIndex(productIndex);
      }
      if (label) {
        setSelectedElementLabel(label);
      }
      setTimeout(() => {
        drawerScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 40);
    },
    []
  );

  // Handler when user clicks any section or card in MELTO or ZAIKA
  const handleSelectSimpleElementFromPreview = useCallback(
    (
      section: 'brand' | 'hero' | 'products' | 'story' | 'spotlight' | 'footer' | 'html',
      productIndex?: number,
      label?: string
    ) => {
      serviceScrollAudio.playCardHoverTick();
      setIsFullPreview(false);
      setIsEditorOpen(true);
      if (
        section === 'brand' ||
        section === 'hero' ||
        section === 'products' ||
        section === 'story' ||
        section === 'spotlight' ||
        section === 'footer' ||
        section === 'html'
      ) {
        setSimpleEditorTab(section);
      }
      if (typeof productIndex === 'number' && !Number.isNaN(productIndex)) {
        setActiveSimpleProductIndex(productIndex);
      }
      if (label) {
        setSelectedElementLabel(label);
      }
      setTimeout(() => {
        drawerScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 40);
    },
    []
  );

  // Handler when user clicks any text or section inside any Universal 3D Demo
  const handleSelectUniversalElement = useCallback(
    (section: string, label: string, path?: string, currentValue?: string) => {
      serviceScrollAudio.playCardHoverTick();
      setIsFullPreview(false);
      setIsEditorOpen(true);
      if (
        section === 'brand' ||
        section === 'hero' ||
        section === 'stages' ||
        section === 'products' ||
        section === 'reviews' ||
        section === 'footer'
      ) {
        setUniversalEditorTab(section);
      }
      setSelectedElementLabel(label);
      if (path) {
        setClickedTextPath(path);
        setClickedTextValue(currentValue || '');
      }
    },
    []
  );

  const handleCategoryIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeIconTargetId) return;
    const catMeta = MAIN_CATEGORIES.find((c) => c.id === activeIconTargetId);
    const accent = catMeta?.accent || '#d02128';
    convertImageToStylizedIcon(file, accent, (iconDataUrl) => {
      setCustomCategoryIcons((prev) => ({
        ...prev,
        [activeIconTargetId]: iconDataUrl,
      }));
      // Also apply as the brand icon of the demos in that category
      if (activeIconTargetId === 'food-beverage') {
        setFizzoConfig((p) => ({ ...p, logoImageUrl: iconDataUrl }));
      } else if (activeIconTargetId === 'beauty-cosmetics') {
        setVeloraConfig((p) => ({ ...p, logoImageUrl: iconDataUrl }));
      } else {
        setUniversalConfigs((prev) => {
          const next = { ...prev };
          Object.keys(next).forEach((k) => {
            if (next[k].categoryId === activeIconTargetId) {
              next[k] = { ...next[k], logoImageUrl: iconDataUrl };
            }
          });
          return next;
        });
      }
      serviceScrollAudio.playServiceLaunch();
    });
    e.target.value = '';
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const accent =
      activeDemoTemplate === 'universal'
        ? universalConfigs[activeUniversalId]?.primaryHex || '#00E5FF'
        : activeDemoTemplate === 'velora'
          ? '#c4506a'
          : '#FF5500';
    convertImageToStylizedIcon(file, accent, (iconDataUrl) => {
      if (activeDemoTemplate === 'velora') {
        setVeloraConfig((prev) => ({ ...prev, logoImageUrl: iconDataUrl }));
      } else if (activeDemoTemplate === 'universal') {
        setUniversalConfigs((prev) => {
          const cur = prev[activeUniversalId];
          if (!cur) return prev;
          return {
            ...prev,
            [activeUniversalId]: { ...cur, logoImageUrl: iconDataUrl },
          };
        });
      } else {
        setFizzoConfig((prev) => ({ ...prev, logoImageUrl: iconDataUrl }));
      }
      serviceScrollAudio.playCardHoverTick();
    });
    e.target.value = '';
  };

  const handleHtmlFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (activeDemoTemplate === 'velora') {
          setVeloraConfig((prev) => ({ ...prev, customHtmlOverride: reader.result as string }));
        } else {
          setFizzoConfig((prev) => ({ ...prev, customHtmlOverride: reader.result as string }));
        }
        serviceScrollAudio.playServiceLaunch();
      }
    };
    reader.readAsText(file);
  };

  const handleSaveChanges = () => {
    serviceScrollAudio.playCardHoverTick();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2600);
  };

  const handleResetDefault = () => {
    serviceScrollAudio.playCardHoverTick();
    if (activeDemoTemplate === 'velora') {
      setVeloraConfig(createInitialVeloraConfig());
    } else if (activeDemoTemplate === 'universal') {
      const orig = UNIVERSAL_3D_DEMOS.find((d) => d.id === activeUniversalId);
      if (orig) {
        setUniversalConfigs((prev) => ({
          ...prev,
          [activeUniversalId]: JSON.parse(JSON.stringify(orig)),
        }));
      }
    } else {
      setFizzoConfig(createInitialFizzoConfig());
    }
  };

  const updateFlavorField = <K extends keyof FizzoCustomizationConfig['flavors'][number]>(
    index: number,
    field: K,
    value: FizzoCustomizationConfig['flavors'][number][K]
  ) => {
    setFizzoConfig((prev) => {
      const next = [...prev.flavors];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, flavors: next };
    });
  };

  const updateVeloraProductField = <K extends keyof VeloraCustomizationConfig['products'][number]>(
    index: number,
    field: K,
    value: VeloraCustomizationConfig['products'][number][K]
  ) => {
    setVeloraConfig((prev) => {
      const next = [...prev.products];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, products: next };
    });
  };

  const updateVeloraNavLink = (index: number, value: string) => {
    setVeloraConfig((prev) => {
      const next = [...prev.navLinks] as [string, string, string, string, string, string];
      next[index] = value;
      return { ...prev, navLinks: next };
    });
  };

  const updateVeloraOrbStage = (
    index: number,
    field: 'title' | 'description',
    value: string
  ) => {
    setVeloraConfig((prev) => {
      const next = [...prev.orbStages] as typeof prev.orbStages;
      next[index] = { ...next[index], [field]: value };
      return { ...prev, orbStages: next };
    });
  };

  const updateVeloraOrbColor = (stageIdx: number, colorIdx: 0 | 1 | 2, hex: string) => {
    setVeloraConfig((prev) => {
      const next = [...prev.orbStages] as typeof prev.orbStages;
      const newColors = [...next[stageIdx].colors] as [string, string, string];
      newColors[colorIdx] = hex;
      next[stageIdx] = { ...next[stageIdx], colors: newColors };
      return { ...prev, orbStages: next };
    });
  };

  const updateVeloraRitual = (
    index: number,
    field: 'title' | 'duration' | 'description' | 'bgHex' | 'petalHex',
    value: string
  ) => {
    setVeloraConfig((prev) => {
      const next = [...prev.rituals] as typeof prev.rituals;
      next[index] = { ...next[index], [field]: value };
      return { ...prev, rituals: next };
    });
  };

  const updateVeloraStat = (index: number, field: 'number' | 'label', value: number | string) => {
    setVeloraConfig((prev) => {
      const next = [...prev.stats] as typeof prev.stats;
      next[index] = { ...next[index], [field]: value } as typeof next[number];
      return { ...prev, stats: next };
    });
  };

  const updateVeloraReview = (index: number, field: 'author' | 'quote', value: string) => {
    setVeloraConfig((prev) => {
      const next = [...prev.reviews];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, reviews: next };
    });
  };

  const updateNavLink = (index: number, value: string) => {
    setFizzoConfig((prev) => {
      const next = [...prev.navLinks] as [string, string, string, string, string];
      next[index] = value;
      return { ...prev, navLinks: next };
    });
  };

  const updateMarqueeItem = (index: number, value: string) => {
    setFizzoConfig((prev) => {
      const next = [...prev.marqueeItems] as [string, string, string, string, string];
      next[index] = value;
      return { ...prev, marqueeItems: next };
    });
  };

  const updateStepItem = (
    key: 'packSteps' | 'fillSteps' | 'bottleSteps',
    index: number,
    value: string
  ) => {
    setFizzoConfig((prev) => {
      const next = [...prev[key]] as [string, string, string, string];
      next[index] = value;
      return { ...prev, [key]: next };
    });
  };

  const updateNutritionFact = (
    index: number,
    field: 'label' | 'amount' | 'dv',
    value: string
  ) => {
    setFizzoConfig((prev) => {
      const next = [...prev.nutritionFacts];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, nutritionFacts: next };
    });
  };

  const updateReviewItem = (
    index: number,
    field: 'name' | 'role' | 'rating' | 'quote',
    value: string
  ) => {
    setFizzoConfig((prev) => {
      const next = [...prev.reviews];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, reviews: next };
    });
  };

  const selectedCategoryMeta =
    MAIN_CATEGORIES.find((c) => c.id === selectedCategoryId) || MAIN_CATEGORIES[0];
  const currentSubCategories = ALL_SUB_CATEGORIES.filter(
    (s) => s.categoryId === selectedCategoryId
  );

  const renderCategoryEmblem = (catId: string, accent: string) => {
    if (customCategoryIcons[catId]) {
      return (
        <img
          src={customCategoryIcons[catId]}
          alt={catId}
          className="w-11 h-11 rounded-xl object-cover shrink-0 shadow-md"
        />
      );
    }
    switch (catId) {
      case 'food-beverage':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <rect x="18" y="10" width="28" height="44" rx="7" stroke={accent} strokeWidth="2.4" fill={`${accent}18`} />
            <path d="M22 10h20M22 54h20M18 24h28M18 40h28" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.6" />
            <circle cx="32" cy="32" r="5" fill={accent} />
            <circle cx="27" cy="6" r="2" fill={accent} />
            <circle cx="36" cy="4" r="1.5" fill="#fff" />
          </svg>
        );
      case 'icecream-gelato':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <path d="M22 32l10 26 10-26H22z" stroke="#fff" strokeWidth="2.2" fill={`${accent}30`} />
            <circle cx="32" cy="22" r="14" fill={accent} />
            <path d="M24 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="8" r="3" fill="#f43f5e" />
          </svg>
        );
      case 'traditional-spices':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <path d="M16 34c0 8.8 7.2 16 16 16s16-7.2 16-16H16z" stroke={accent} strokeWidth="2.4" fill={`${accent}25`} />
            <line x1="12" y1="34" x2="52" y2="34" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="42" y1="16" x2="30" y2="32" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="43" cy="15" r="3.5" fill={accent} />
          </svg>
        );
      case 'beauty-cosmetics':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <rect x="27" y="6" width="10" height="10" rx="4" fill="#fff" fillOpacity="0.8" />
            <rect x="24" y="16" width="16" height="5" rx="2" fill={accent} />
            <path d="M20 22h24l4 8v22a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6V30l4-8z" stroke={accent} strokeWidth="2.4" fill={`${accent}18`} />
            <path d="M32 22v24" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.8" />
            <circle cx="32" cy="38" r="5" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.5" />
          </svg>
        );
      case 'logistics-supply':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <path d="M8 42h48l-6 12H14L8 42z" stroke={accent} strokeWidth="2.4" fill={`${accent}20`} />
            <rect x="16" y="28" width="14" height="14" rx="2" stroke="#fff" strokeWidth="1.8" fill={`${accent}35`} />
            <rect x="32" y="28" width="14" height="14" rx="2" stroke={accent} strokeWidth="1.8" />
            <path d="M46 10v32M26 14h28M32 14v10" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );
      case 'automotive-ev':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <path d="M8 38l8-12h28l12 12v8H8v-8z" stroke={accent} strokeWidth="2.4" fill={`${accent}18`} />
            <circle cx="19" cy="46" r="6" stroke="#fff" strokeWidth="2.2" fill="#090d16" />
            <circle cx="45" cy="46" r="6" stroke="#fff" strokeWidth="2.2" fill="#090d16" />
            <path d="M14 20h24M22 14h18" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'real-estate-arch':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <path d="M22 56V14l10-8 10 8v42" stroke={accent} strokeWidth="2.4" fill={`${accent}18`} />
            <path d="M12 56V28l10-6M52 56V28l-10-6M8 56h48" stroke="#fff" strokeOpacity="0.65" strokeWidth="2" />
            <path d="M26 22h12M26 30h12M26 38h12M26 46h12" stroke={accent} strokeWidth="1.6" />
          </svg>
        );
      case 'luxury-horology':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <circle cx="32" cy="32" r="18" stroke={accent} strokeWidth="2.5" fill={`${accent}16`} />
            <circle cx="32" cy="32" r="11" stroke="#fff" strokeOpacity="0.45" strokeDasharray="3 3" strokeWidth="1.6" />
            <path d="M32 22v10l7 5M24 8h16M24 56h16" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );
      case 'ai-semiconductor':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <rect x="18" y="18" width="28" height="28" rx="5" stroke={accent} strokeWidth="2.4" fill={`${accent}18`} />
            <rect x="25" y="25" width="14" height="14" rx="2" fill={accent} />
            <path d="M24 10v8M32 10v8M40 10v8M24 46v8M32 46v8M40 46v8M10 24h8M10 32h8M10 40h8M46 24h8M46 32h8M46 40h8" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'fashion-sneaker':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <path d="M10 44V22l14 6 12-10 18 16v10H10z" stroke={accent} strokeWidth="2.4" fill={`${accent}18`} />
            <rect x="8" y="44" width="48" height="6" rx="3" fill="#fff" fillOpacity="0.85" />
            <path d="M22 36h20" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'fintech-wealth':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <rect x="8" y="16" width="48" height="32" rx="6" stroke={accent} strokeWidth="2.4" fill={`${accent}18`} />
            <rect x="15" y="26" width="10" height="8" rx="2" fill={accent} />
            <path d="M15 40h22M42 26h7" stroke="#fff" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'aerospace-orbital':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <rect x="25" y="22" width="14" height="20" rx="3" stroke="#fff" strokeWidth="2.2" fill={`${accent}28`} />
            <rect x="6" y="26" width="16" height="12" rx="2" stroke={accent} strokeWidth="2" fill={`${accent}15`} />
            <rect x="42" y="26" width="16" height="12" rx="2" stroke={accent} strokeWidth="2" fill={`${accent}15`} />
            <path d="M26 16a6 6 0 0 1 12 0M32 42v12" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );
      case 'medtech-biotech':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <path d="M20 10c0 16 24 16 24 32s-24 16-24 32" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M44 10c0 16-24 16-24 32s24 16 24 32" stroke="#fff" strokeOpacity="0.8" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M23 18h18M22 32h20M23 46h18" stroke={accent} strokeWidth="1.8" />
          </svg>
        );
      case 'spatial-audio':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <path d="M14 34v-4a18 18 0 0 1 36 0v4" stroke="#fff" strokeWidth="2.4" />
            <rect x="10" y="32" width="10" height="18" rx="5" stroke={accent} strokeWidth="2.4" fill={`${accent}22`} />
            <rect x="44" y="32" width="10" height="18" rx="5" stroke={accent} strokeWidth="2.4" fill={`${accent}22`} />
            <circle cx="32" cy="38" r="6" stroke={accent} strokeOpacity="0.6" strokeWidth="1.6" />
          </svg>
        );
      case 'clean-energy':
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <circle cx="32" cy="24" r="4" fill={accent} />
            <path d="M32 24V8M32 24l14 9M32 24l-14 9M32 28v28M20 56h24" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" />
            <circle cx="32" cy="24" r="15" stroke={accent} strokeOpacity="0.45" strokeDasharray="4 4" strokeWidth="1.6" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 64 64" className="w-11 h-11 shrink-0" fill="none">
            <rect x="14" y="10" width="36" height="44" rx="5" stroke={accent} strokeWidth="2.4" fill={`${accent}18`} />
            <circle cx="32" cy="23" r="6" stroke="#fff" strokeWidth="2" />
            <circle cx="32" cy="40" r="6" stroke={accent} strokeWidth="2" />
          </svg>
        );
    }
  };

  // ============================================================================
  // VIEW 1 & 2: STANDALONE CATEGORY & SUB-CATEGORY SELECTION PORTAL
  // ============================================================================
  if (builderStage === 'categories' || builderStage === 'subcategories') {
    return (
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="min-h-screen w-full bg-[#060609] text-white flex flex-col selection:bg-[#FF5500] selection:text-white overflow-x-hidden"
      >
        {/* Hidden File Input for Image-to-Icon Auto-Converter */}
        <input
          ref={categoryIconInputRef}
          type="file"
          accept="image/*"
          onChange={handleCategoryIconUpload}
          className="hidden"
        />

        {/* Standalone Builder Top Header */}
        <header className="sticky top-0 z-40 min-h-[4rem] py-2.5 px-4 sm:px-6 md:px-10 border-b border-white/10 bg-[#060609]/90 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                serviceScrollAudio.playCardHoverTick();
                if (builderStage === 'subcategories') {
                  setBuilderStage('categories');
                } else {
                  onNavigate?.('agency');
                }
              }}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] text-white/80 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              {builderStage === 'subcategories'
                ? isAr
                  ? 'جميع الفئات (4 قطاعات مختارة)'
                  : 'All 4 Categories'
                : isAr
                  ? 'العودة إلى إيفرز'
                  : 'Back to EFerz'}
            </button>

            <div className="hidden sm:flex items-center gap-2.5 pl-2">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-white/60">
                {isAr
                  ? 'EFERZ // استوديو البناء التفاعلي 2026 (4 نماذج 3D حية)'
                  : "EFERZ // LET'S BUILD 2026 STUDIO (4 BESPOKE 3D WEBSITES)"}
              </span>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.14em]">
            <span
              className={`px-2.5 sm:px-3 py-1 rounded-full border ${
                builderStage === 'categories'
                  ? 'bg-[#d02128]/20 border-[#d02128] text-white'
                  : 'bg-white/[0.04] border-white/10 text-white/50'
              }`}
            >
              {isAr ? '01. القطاع (14)' : '01. Industry (14)'}
            </span>
            <ChevronRight className={`w-3.5 h-3.5 text-white/30 ${isRTL ? 'rotate-180' : ''}`} />
            <span
              className={`px-2.5 sm:px-3 py-1 rounded-full border ${
                builderStage === 'subcategories'
                  ? 'bg-[#d02128]/20 border-[#d02128] text-white'
                  : 'bg-white/[0.04] border-white/10 text-white/50'
              }`}
            >
              {isAr ? '02. النموذج والتوفر' : '02. 3D Demo & Lock Status'}
            </span>
            <ChevronRight className={`w-3.5 h-3.5 text-white/30 hidden sm:inline ${isRTL ? 'rotate-180' : ''}`} />
            <span className="hidden sm:inline px-3 py-1 rounded-full border bg-white/[0.03] border-white/10 text-white/40">
              {isAr ? '03. تخصيص 3D مباشر' : '03. Live 3D Customize'}
            </span>
          </div>
        </header>

        {/* Main Content Area (Compact Spacing) */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 flex flex-col justify-between">
          {builderStage === 'categories' ? (
            <div>
              <div className="max-w-3xl mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d02128]/15 border border-[#d02128]/40 text-[#d02128] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isAr
                    ? 'الخطوة 01 — 14 قطاعاً بتصاميم 2026 مختلفة كلياً + محول الصور إلى أيقونات'
                    : 'STEP 01 — 14 BESPOKE 2026 LAYOUTS · IMAGE-TO-ICON GENERATOR · WEBGL + HTML5 + PHP'}
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-[1.06] text-white">
                  {isAr ? (
                    <>
                      اختر القطاع لإطلاق{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d02128] to-[#ff4d49]">
                        موقعك السينمائي ثلاثي الأبعاد.
                      </span>
                    </>
                  ) : (
                    <>
                      Select an industry to launch your{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d02128] to-[#ff4d49]">
                        bespoke 2026 3D website.
                      </span>
                    </>
                  )}
                </h1>
                <p className="mt-2.5 text-xs sm:text-sm md:text-base text-white/65 leading-relaxed">
                  {isAr
                    ? 'كل فئة مصممة بهوية وتخطيط مختلف تماماً مع أيقونة مخصصة قابلة للتعديل (يمكنك رفع أي صورة لتحويلها تلقائياً إلى أيقونة 3D متوهجة).'
                    : 'Each category features a distinct 2026 layout structure, custom industry icon (click "Upload Image → Icon" on any card to auto-convert your own image into a stylized icon), editorial articles, and a one-page Contact Concierge.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MAIN_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      serviceScrollAudio.playCardHoverTick();
                      setSelectedCategoryId(cat.id);
                      setBuilderStage('subcategories');
                    }}
                    className={`group relative ${
                      isRTL ? 'text-right' : 'text-left'
                    } p-5 rounded-2xl border transition-all duration-300 overflow-hidden bg-gradient-to-br from-white/[0.07] to-white/[0.02] border-white/20 hover:border-[#d02128] hover:shadow-[0_0_40px_rgba(236,57,53,0.18)] cursor-pointer flex flex-col justify-between`}
                  >
                    <div
                      className="absolute -right-12 -top-12 w-36 h-36 rounded-full blur-3xl opacity-25 group-hover:opacity-50 transition-opacity pointer-events-none"
                      style={{ background: cat.accent || '#d02128' }}
                    />

                    <div>
                      <div className="relative z-10 flex items-center justify-between gap-2.5 mb-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-black/60 border border-white/15 shadow-inner relative group/icon">
                            {renderCategoryEmblem(cat.id, cat.accent)}
                          </div>
                          <div>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.18em] border bg-white/[0.06] border-white/20 text-white">
                              {isAr ? cat.badgeAr : cat.badge}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveIconTargetId(cat.id);
                                categoryIconInputRef.current?.click();
                              }}
                              className="mt-1 flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.14em] text-cyan-300 hover:text-white transition-colors cursor-pointer"
                              title="Upload any image to automatically convert and apply it as this category & website icon"
                            >
                              <Upload className="w-2.5 h-2.5" />
                              <span>{isAr ? 'رفع صورة كأيقونة' : 'Image → Icon'}</span>
                            </button>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-white/50">
                          {isAr ? `${cat.subCategoriesCount} نموذج` : `${cat.subCategoriesCount} Demo${cat.subCategoriesCount > 1 ? 's' : ''}`}
                        </span>
                      </div>

                      <h2 className="relative z-10 text-lg sm:text-xl font-display font-bold text-white group-hover:text-[#d02128] transition-colors">
                        {isAr ? cat.titleAr : cat.title}
                      </h2>
                      <p
                        className="relative z-10 text-[10px] font-mono uppercase tracking-[0.15em] mt-0.5"
                        style={{ color: cat.accent }}
                      >
                        {isAr ? cat.subtitleAr : cat.subtitle}
                      </p>
                      <p className="relative z-10 text-xs text-white/65 leading-relaxed mt-2 line-clamp-2">
                        {isAr ? cat.descriptionAr : cat.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/80 group-hover:text-white">
                        {isAr ? 'افتح النماذج ثلاثية الأبعاد' : 'Open Bespoke 3D Demo'}
                      </span>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 text-white"
                        style={{ backgroundColor: cat.accent || '#d02128' }}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="max-w-3xl mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d02128]/15 border border-[#d02128]/40 text-[#d02128] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isAr
                    ? `الخطوة 02 — ${selectedCategoryMeta.titleAr}`
                    : `STEP 02 — ${selectedCategoryMeta.title.toUpperCase()}`}
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-[1.05] text-white">
                  {isAr ? selectedCategoryMeta.titleAr : selectedCategoryMeta.title}
                </h1>
                <p className="mt-2.5 text-xs sm:text-sm md:text-base text-white/65 leading-relaxed">
                  {isAr
                    ? 'إذا كان النموذج قيد الاستخدام حالياً من قِبل مستخدم آخر، سيظهر لك تنبيه "قيد الاستخدام" مع زر لتوليد نسخة 3D جديدة ومستقلة فوراً لكي تعمل عليها بحرية.'
                    : 'Each demo includes a custom 3D WebGL stage, industry-specific layout, custom Image-to-Icon converter, editorial articles section, and a one-page Contact Concierge form.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentSubCategories.map((sub) => {
                  const occ = occupiedDemos[sub.id];
                  const isOccupiedByOther = Boolean(occ || sub.activeSessionBy);
                  const occupiedLabel = occ?.occupiedBy || sub.activeSessionBy;

                  return (
                    <div
                      key={sub.id}
                      className={`group relative ${
                        isRTL ? 'text-right' : 'text-left'
                      } p-5 sm:p-6 rounded-2xl border transition-all duration-300 overflow-hidden bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.01] border-white/25 hover:border-[#d02128] shadow-[0_20px_50px_rgba(0,0,0,0.45)] flex flex-col justify-between`}
                    >
                      <div>
                        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-black/55 border border-white/15">
                              {renderCategoryEmblem(sub.categoryId, sub.accent)}
                            </div>
                            <div>
                              <span
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] border text-white"
                                style={{
                                  backgroundColor: `${sub.accent}25`,
                                  borderColor: sub.accent,
                                }}
                              >
                                {isAr ? sub.badgeAr : sub.badge}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveIconTargetId(sub.categoryId);
                                  categoryIconInputRef.current?.click();
                                }}
                                className="mt-1 flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.14em] text-cyan-300 hover:text-white cursor-pointer"
                              >
                                <Upload className="w-2.5 h-2.5" />
                                <span>{isAr ? 'تحويل صورة إلى أيقونة' : 'Upload Image → Icon'}</span>
                              </button>
                            </div>
                          </div>

                          {/* Multi-User Live Occupancy Badge */}
                          {isOccupiedByOther ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-500/20 border border-amber-400/50 text-amber-200">
                              <Users className="w-3 h-3 text-amber-300" />
                              {isAr
                                ? `قيد الاستخدام الآن (${occupiedLabel})`
                                : `In Use: ${occupiedLabel}`}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/15 border border-emerald-400/40 text-emerald-300">
                              {isAr ? 'متاح للتخصيص الفوري' : 'Available · Slot #01 Open'}
                            </span>
                          )}
                        </div>

                        <h2 className="relative z-10 text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">
                          {isAr ? sub.titleAr : sub.title}
                        </h2>
                        <p
                          className="relative z-10 text-xs font-mono uppercase tracking-[0.15em] mt-1.5"
                          style={{ color: sub.accent }}
                        >
                          {isAr ? sub.subtitleAr : sub.subtitle}
                        </p>
                        <p className="relative z-10 text-xs sm:text-sm text-white/70 leading-relaxed mt-3 sm:mt-4">
                          {isAr ? sub.descriptionAr : sub.description}
                        </p>
                      </div>

                      <div className="relative z-10 mt-6 pt-5 border-t border-white/10 space-y-3">
                        {isOccupiedByOther && (
                          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-100 text-xs leading-relaxed flex items-start gap-2.5">
                            <Users className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-amber-300 font-mono uppercase text-[10px] tracking-wider">
                                {isAr
                                  ? 'هذا النموذج قيد التعديل حالياً من مستخدم آخر'
                                  : 'ACTIVE MULTI-USER SESSION DETECTED'}
                              </strong>
                              <span>
                                {isAr
                                  ? 'لتجنب تعارض التعديلات، يمكنك توليد نسخة 3D جديدة ومستقلة بتصميم وألوان مخصصة لك فوراً.'
                                  : 'Another user is currently working on the primary slot of this demo. Click "Generate Fresh 3D Variant" below to spawn your own conflict-free 3D workspace.'}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              serviceScrollAudio.playServiceLaunch();
                              setOccupiedDemos((prev) => ({
                                ...prev,
                                [sub.id]: {
                                  occupiedBy: 'You (Active Studio Lock)',
                                  variantCount: prev[sub.id]?.variantCount || 1,
                                },
                              }));
                              if (sub.templateType === 'melto') {
                                setActiveDemoTemplate('melto');
                                setSelectedCategoryId('icecream-gelato');
                                setSimpleEditorTab('brand');
                                setSelectedElementLabel('01. Brand & Tagline');
                              } else if (sub.templateType === 'zaika') {
                                setActiveDemoTemplate('zaika');
                                setSelectedCategoryId('traditional-spices');
                                setSimpleEditorTab('brand');
                                setSelectedElementLabel('01. Brand & Tagline');
                              } else if (sub.templateType === 'velora') {
                                setActiveDemoTemplate('velora');
                                setSelectedCategoryId('beauty-cosmetics');
                                setVeloraEditorTab('brand');
                                setSelectedElementLabel('Brand & Navbar');
                              } else if (sub.templateType === 'universal' && sub.universalId) {
                                setActiveDemoTemplate('universal');
                                setActiveUniversalId(sub.universalId);
                                setUniversalEditorTab('brand');
                                setSelectedElementLabel('Brand & 3D Theme');
                              } else {
                                setActiveDemoTemplate('fizzo');
                                setSelectedCategoryId('food-beverage');
                                setEditorTab('brand');
                                setSelectedElementLabel('Brand & Navbar');
                              }
                              setBuilderStage('studio');
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-mono uppercase tracking-[0.16em] font-bold text-white transition-all cursor-pointer shadow-lg hover:brightness-110"
                            style={{ backgroundColor: sub.accent || '#d02128' }}
                          >
                            <span>
                              {isAr
                                ? 'تشغيل النموذج والتخصيص المباشر'
                                : 'Launch 3D Studio & Customize'}
                            </span>
                            <ArrowUpRight className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSpawnFreshVariant(sub)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 text-xs font-mono uppercase tracking-[0.14em] text-cyan-300 font-semibold transition-all cursor-pointer"
                            title="Generate a fresh isolated 3D demo variant so multiple users never overwrite each other"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>
                              {isAr ? 'توليد نسخة 3D جديدة' : '+ Generate Fresh 3D Variant'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================================
  // VIEW 3: STANDALONE 3D STUDIO (SUPPORTS FIZZO, VELORA & 14+ UNIVERSAL 3D DEMOS)
  // ============================================================================
  const isMelto = activeDemoTemplate === 'melto';
  const isZaika = activeDemoTemplate === 'zaika';
  const isVelora = activeDemoTemplate === 'velora';
  const isUniversal = activeDemoTemplate === 'universal';
  const currentUniversalConfig =
    universalConfigs[activeUniversalId] || universalConfigs[UNIVERSAL_3D_DEMOS[0].id];
  const currentEditedFlavor = fizzoConfig.flavors[activeFlavorIndex] || fizzoConfig.flavors[0];
  const currentEditedVeloraProduct =
    veloraConfig.products[activeVeloraProductIndex] || veloraConfig.products[0];

  const SIMPLE_SECTIONS: {
    id: 'brand' | 'hero' | 'products' | 'story' | 'spotlight' | 'footer' | 'html';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'brand', label: '01. Brand & Header', icon: Type },
    { id: 'hero', label: '02. 3D Hero Carousel', icon: Sparkles },
    { id: 'products', label: isMelto ? '03. 6 3D Flavours' : '03. 6 3D Jars & Sauces', icon: Palette },
    { id: 'story', label: '04. Heritage Story', icon: ShieldCheck },
    { id: 'spotlight', label: isMelto ? '05. 3D Pint Spotlight' : '05. 3D Jar Spotlight', icon: Box },
    { id: 'footer', label: '06. Giant & Lock', icon: Layout },
    { id: 'html', label: '07. Custom HTML', icon: Code2 },
  ];

  const FIZZO_SECTIONS: {
    id: FizzoSectionId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'brand', label: '01. Brand & Nav', icon: ImageIcon },
    { id: 'hero', label: '02. Hero & Promo', icon: Type },
    { id: 'flavors', label: '03. 4 3D Cans', icon: Palette },
    { id: 'bottle', label: '04. Can Fill (330ml)', icon: Wine },
    { id: 'fill', label: '05. Pop & Pour', icon: Droplets },
    { id: 'pack', label: '06. Variety Box', icon: Box },
    { id: 'marquee', label: '07. Marquee Bar', icon: Sparkles },
    { id: 'nutrition', label: '08. Nutrition', icon: FlaskConical },
    { id: 'reviews', label: '09. Reviews', icon: MessageSquareQuote },
    { id: 'footer', label: '10. Footer CTA', icon: Layout },
    { id: 'html', label: '11. Custom HTML', icon: Code2 },
  ];

  const VELORA_SECTIONS: {
    id: VeloraSectionId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'brand', label: '01. Brand & Nav', icon: ImageIcon },
    { id: 'hero', label: '02. 3D Hero Stage', icon: Type },
    { id: 'products', label: '03. 8 3D Products', icon: Palette },
    { id: 'orb', label: '04. 3D Shader Orb', icon: Sparkles },
    { id: 'ingredients', label: '05. Ingredients', icon: FlaskConical },
    { id: 'rituals', label: '06. 3 Rituals', icon: Heart },
    { id: 'about', label: '07. About & Stats', icon: ShieldCheck },
    { id: 'reviews', label: '08. Skin Reviews', icon: MessageSquareQuote },
    { id: 'contact', label: '09. Contact Studio', icon: Box },
    { id: 'footer', label: '10. Footer', icon: Layout },
    { id: 'html', label: '11. Custom HTML', icon: Code2 },
  ];

  const UNIVERSAL_SECTIONS: {
    id: 'brand' | 'hero' | 'stages' | 'products' | 'reviews' | 'footer';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'brand', label: '01. Brand & Colors', icon: Palette },
    { id: 'hero', label: '02. 3D Hero & Promo', icon: Type },
    { id: 'stages', label: '03. 4 3D Scroll Stages', icon: Box },
    { id: 'products', label: '04. Products & Specs', icon: Sparkles },
    { id: 'reviews', label: '05. Reviews & Stats', icon: MessageSquareQuote },
    { id: 'footer', label: '06. Footer & EFerz Lock', icon: Layout },
  ];

  const studioAccent = isMelto
    ? '#ff5c8a'
    : isZaika
      ? '#e0881c'
      : isUniversal
        ? currentUniversalConfig.primaryHex
        : isVelora
          ? '#c4506a'
          : '#FF5500';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 bg-[#050508] text-white flex flex-col overflow-hidden select-none"
    >
      {/* ── STUDIO TOP CONTROL BAR ── */}
      <header className="h-14 px-3 md:px-5 bg-[#08080D]/95 border-b border-white/12 flex items-center justify-between gap-2 z-50 shrink-0">
        {/* Left: Back to Sub-Categories + All 16 Demos Quick Switcher + Fresh Variant Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              serviceScrollAudio.playCardHoverTick();
              setBuilderStage('subcategories');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-[11px] font-mono uppercase tracking-[0.14em] text-white/85 transition-all cursor-pointer"
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            <span className="hidden sm:inline">{isAr ? 'النماذج' : 'All Demos'}</span>
          </button>

          {/* Dropdown to switch instantly between any of the 4 Live 3D Demos */}
          <select
            value={
              activeDemoTemplate === 'fizzo'
                ? 'drink'
                : activeDemoTemplate === 'melto'
                  ? 'melto-icecream-3d'
                  : activeDemoTemplate === 'zaika'
                    ? 'desi-spices-3d'
                    : activeDemoTemplate === 'velora'
                      ? 'velora-botanics'
                      : activeUniversalId
            }
            onChange={(e) => {
              const val = e.target.value;
              serviceScrollAudio.playCardHoverTick();
              if (val === 'drink') {
                setSelectedCategoryId('food-beverage');
                setActiveDemoTemplate('fizzo');
              } else if (val === 'melto-icecream-3d') {
                setSelectedCategoryId('icecream-gelato');
                setActiveDemoTemplate('melto');
              } else if (val === 'desi-spices-3d') {
                setSelectedCategoryId('traditional-spices');
                setActiveDemoTemplate('zaika');
              } else if (val === 'velora-botanics') {
                setSelectedCategoryId('beauty-cosmetics');
                setActiveDemoTemplate('velora');
              } else {
                const found = UNIVERSAL_3D_DEMOS.find((d) => d.id === val);
                if (found) {
                  setSelectedCategoryId(found.categoryId);
                  setActiveDemoTemplate('universal');
                  setActiveUniversalId(found.id);
                }
              }
            }}
            className="hidden md:block px-3 py-1.5 rounded-lg bg-[#12121C] border border-white/20 text-[11px] font-mono text-white cursor-pointer max-w-[250px] truncate"
          >
            <option value="drink">01. FIZZO — 3D Soda Can &amp; Variety Box</option>
            <option value="melto-icecream-3d">02. MELTO — 3D Ice Cream &amp; Gelato</option>
            <option value="desi-spices-3d">03. ZAIKA / DESI — 3D Spice &amp; Pickle Pantry</option>
            <option value="velora-botanics">04. VELORA — 8 3D Skincare Vessels &amp; Orb</option>
          </select>

          {/* Spawn Fresh Variant Button directly inside Studio */}
          <button
            type="button"
            onClick={() => {
              const activeSub =
                ALL_SUB_CATEGORIES.find((s) =>
                  activeDemoTemplate === 'fizzo'
                    ? s.id === 'drink'
                    : activeDemoTemplate === 'velora'
                      ? s.id === 'velora-botanics'
                      : s.universalId === activeUniversalId
                ) || ALL_SUB_CATEGORIES[0];
              handleSpawnFreshVariant(activeSub);
            }}
            title="If another user is editing this demo, click to generate a fresh 3D variant instance"
            className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-[10px] font-mono uppercase tracking-wider text-cyan-200 cursor-pointer transition-all"
          >
            <RefreshCw className="w-3 h-3 text-cyan-300" />
            <span>{isAr ? '+ نسخة 3D جديدة' : '+ New 3D Variant'}</span>
          </button>
        </div>

        {/* Center: Toggle Customizer, Click-to-Select Inspector & Full Website Preview */}
        <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => {
              serviceScrollAudio.playCardHoverTick();
              setIsFullPreview(false);
              setIsEditorOpen(true);
            }}
            style={
              !isFullPreview && isEditorOpen ? { backgroundColor: studioAccent } : undefined
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-[0.12em] transition-all cursor-pointer ${
              !isFullPreview && isEditorOpen
                ? 'text-white font-semibold shadow-sm'
                : 'text-white/65 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isAr ? 'تخصيص' : 'Customize'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              serviceScrollAudio.playCardHoverTick();
              setInspectorEnabled((prev) => !prev);
            }}
            title="Click any text or container on the website to edit it directly"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-[0.12em] transition-all cursor-pointer ${
              inspectorEnabled
                ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 font-semibold'
                : 'text-white/55 hover:text-white'
            }`}
          >
            <MousePointerClick className="w-3.5 h-3.5 text-cyan-300" />
            <span>
              {inspectorEnabled
                ? isAr
                  ? 'تعديل أي نص بالنقر: مفعل'
                  : 'Click-Any-Text: ON'
                : isAr
                  ? 'التعديل بالنقر: متوقف'
                  : 'Click-Any-Text: OFF'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              serviceScrollAudio.playCardHoverTick();
              setIsFullPreview(true);
              setIsEditorOpen(false);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-[0.12em] transition-all cursor-pointer ${
              isFullPreview
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/65 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isAr ? 'معاينة كاملة' : 'Preview Site'}</span>
          </button>
        </div>

        {/* Right: Save, Reset & Locked Publish Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefault}
            title="Reset to default demo"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[11px] font-mono uppercase tracking-[0.12em] text-white/65 hover:text-white transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isAr ? 'إعادة ضبط' : 'Reset'}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveChanges}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white text-[11px] font-mono uppercase tracking-[0.15em] transition-all cursor-pointer"
          >
            {saveToast ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Save className="w-3.5 h-3.5" style={{ color: studioAccent }} />
            )}
            <span>{saveToast ? (isAr ? 'تم الحفظ!' : 'Saved!') : isAr ? 'حفظ' : 'Save'}</span>
          </button>

          {/* LOCKED PUBLISH BUTTON */}
          <button
            type="button"
            onClick={() => {
              serviceScrollAudio.playCardHoverTick();
              setLockedPublishNotice(true);
              setTimeout(() => setLockedPublishNotice(false), 3200);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#d02128]/15 border border-[#d02128]/40 text-white text-[11px] font-mono uppercase tracking-[0.16em] cursor-not-allowed opacity-90 hover:opacity-100 transition-all"
            title="Publish is locked in demo mode"
          >
            <Lock className="w-3.5 h-3.5 text-[#d02128]" />
            <span>{isAr ? 'نشر الموقع' : 'Publish'}</span>
          </button>
        </div>
      </header>

      {/* Fresh 3D Variant Toast */}
      {variantToastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[75] px-5 py-3 rounded-2xl bg-[#0B192C]/95 border border-cyan-400/60 shadow-2xl backdrop-blur-xl flex items-center gap-3 max-w-lg">
          <RefreshCw className="w-4 h-4 text-cyan-300 shrink-0 animate-spin" />
          <p className="text-xs font-mono text-cyan-100">{variantToastMsg}</p>
        </div>
      )}

      {/* Locked Publish Toast Notice */}
      {lockedPublishNotice && (
        <div className="fixed top-16 right-5 z-[70] px-4 py-3 rounded-2xl bg-[#12121A]/95 border border-[#d02128]/50 shadow-2xl backdrop-blur-xl flex items-center gap-3 max-w-sm animate-fade-in">
          <div className="w-8 h-8 rounded-xl bg-[#d02128]/20 border border-[#d02128]/40 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4 text-[#d02128]" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#d02128] font-semibold">
              {isAr ? 'خطوة النشر مقفلة في العرض التجريبي' : 'Publish Step Locked'}
            </p>
            <p className="text-[11px] text-white/75 leading-snug mt-0.5">
              {isAr
                ? 'تم حفظ تخصيص موقعك ثلاثي الأبعاد مع حقوق Powered by EFerz.'
                : 'Your customized 3D website is saved with locked Powered by EFerz (EFerz.com) attribution.'}
            </p>
          </div>
        </div>
      )}

      {/* ── MAIN WORKSPACE: LEFT ALL-SECTION CUSTOMIZER + RIGHT CLICKABLE 3D WEBSITE ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* LEFT CUSTOMIZATION DRAWER */}
        {!isFullPreview && isEditorOpen && (
          <aside className="w-full md:w-[390px] lg:w-[430px] max-h-[50vh] md:max-h-none md:h-full bg-[#0B0B12] border-b md:border-b-0 md:border-r border-white/12 flex flex-col z-30 shrink-0 overflow-hidden">
            {/* Editor Drawer Header + Active Clicked Element Indicator */}
            <div className="p-3.5 border-b border-white/10 flex items-center justify-between gap-2 bg-[#10101A]">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <MousePointerClick className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300 truncate">
                    {isAr
                      ? `العنصر المحدد: ${selectedElementLabel}`
                      : `Editing: ${selectedElementLabel}`}
                  </span>
                </div>
                <h2 className="text-xs sm:text-sm font-display font-bold text-white mt-0.5 truncate">
                  {isAr
                    ? 'انقر على أي نص في الموقع لتعديله فوراً أو من القائمة'
                    : 'Click any text on site to edit inline or below'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-white/60 hover:text-white cursor-pointer shrink-0"
              >
                {isAr ? 'إخفاء' : 'Hide'}
              </button>
            </div>

            {/* Section Selector Grid */}
            <div className="p-2 bg-black/45 border-b border-white/10 max-h-32 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-[10px] font-mono uppercase tracking-[0.06em]">
                {isMelto || isZaika
                  ? SIMPLE_SECTIONS.map((sec) => {
                      const Icon = sec.icon;
                      const active = simpleEditorTab === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => {
                            setSimpleEditorTab(sec.id);
                            setSelectedElementLabel(sec.label);
                          }}
                          style={active ? { backgroundColor: studioAccent } : undefined}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left truncate transition-all cursor-pointer ${
                            active
                              ? 'text-white font-bold shadow-sm'
                              : 'bg-white/[0.03] text-white/65 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <Icon className="w-3 h-3 shrink-0" />
                          <span className="truncate">{sec.label}</span>
                        </button>
                      );
                    })
                  : isUniversal
                  ? UNIVERSAL_SECTIONS.map((sec) => {
                      const Icon = sec.icon;
                      const active = universalEditorTab === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => {
                            setUniversalEditorTab(sec.id);
                            setSelectedElementLabel(sec.label);
                          }}
                          style={active ? { backgroundColor: studioAccent } : undefined}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left truncate transition-all cursor-pointer ${
                            active
                              ? 'text-black font-bold shadow-sm'
                              : 'bg-white/[0.03] text-white/65 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <Icon className="w-3 h-3 shrink-0" />
                          <span className="truncate">{sec.label}</span>
                        </button>
                      );
                    })
                  : isVelora
                    ? VELORA_SECTIONS.map((sec) => {
                        const Icon = sec.icon;
                        const active = veloraEditorTab === sec.id;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => {
                              setVeloraEditorTab(sec.id);
                              setSelectedElementLabel(sec.label);
                            }}
                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left truncate transition-all cursor-pointer ${
                              active
                                ? 'bg-[#c4506a] text-white font-bold shadow-sm'
                                : 'bg-white/[0.03] text-white/65 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <Icon className="w-3 h-3 shrink-0" />
                            <span className="truncate">{sec.label}</span>
                          </button>
                        );
                      })
                    : FIZZO_SECTIONS.map((sec) => {
                        const Icon = sec.icon;
                        const active = editorTab === sec.id;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => {
                              setEditorTab(sec.id);
                              setSelectedElementLabel(sec.label);
                            }}
                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left truncate transition-all cursor-pointer ${
                              active
                                ? 'bg-[#FF5500] text-white font-bold shadow-sm'
                                : 'bg-white/[0.03] text-white/65 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <Icon className="w-3 h-3 shrink-0" />
                            <span className="truncate">{sec.label}</span>
                          </button>
                        );
                      })}
              </div>
            </div>

            {/* Scrollable Form Controls for the Active Demo & Section */}
            <div
              ref={drawerScrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-5 select-text"
            >
              {/* ── PINNED LOCKED WATERMARK REMINDER BANNER (ALL DEMOS) ── */}
              <div className="p-2.5 rounded-xl bg-[#d02128]/15 border border-[#d02128]/40 flex items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2 min-w-0">
                  <Lock className="w-3.5 h-3.5 text-[#d02128] shrink-0" />
                  <span className="text-white/90 truncate">
                    Footer Locked: <strong>Powered by EFerz (EFerz.com)</strong>
                  </span>
                </div>
                <a
                  href="https://eferz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono uppercase tracking-wider text-amber-300 underline shrink-0"
                >
                  EFerz.com ↗
                </a>
              </div>

              {isMelto ? (
                <div className="space-y-4">
                  {/* MELTO SECTION 01: BRAND & HEADER */}
                  {simpleEditorTab === 'brand' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#ff5c8a]/15 border border-[#ff5c8a]/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>MELTO Artisan Creamery:</strong> Customize the brand identity, logo, sub-headline, and preloader emblem.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Brand Name</label>
                          <input
                            type="text"
                            value={meltoConfig.brandName}
                            onChange={(e) => setMeltoConfig((prev) => ({ ...prev, brandName: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Sub-Headline</label>
                          <input
                            type="text"
                            value={meltoConfig.brandSub}
                            onChange={(e) => setMeltoConfig((prev) => ({ ...prev, brandSub: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>

                      <ImageCustomizerField
                        label="Header Brand Logo"
                        sublabel="Custom emblem or logo shown in top header bar"
                        value={meltoConfig.logoImageUrl}
                        onChange={(url) => setMeltoConfig((prev) => ({ ...prev, logoImageUrl: url }))}
                        accentColor="#ff5c8a"
                        placeholder="https://..."
                        presetImages={[
                          { label: 'Artisan Creamery Crest', url: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&auto=format&fit=crop&q=80' },
                          { label: 'Vintage Dairy Stamp', url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&auto=format&fit=crop&q=80' },
                          { label: 'Scoop & Cone Badge', url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop&q=80' },
                        ]}
                      />

                      <ImageCustomizerField
                        label="Preloader Logo & Emblem"
                        sublabel="Displays inside the loading screen on initial visit"
                        value={meltoConfig.loaderImageUrl}
                        onChange={(url) => setMeltoConfig((prev) => ({ ...prev, loaderImageUrl: url }))}
                        accentColor="#ff5c8a"
                        placeholder="https://..."
                        presetImages={[
                          { label: 'Artisan Milk Churn', url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80' },
                          { label: 'Ice Cream Crest', url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&auto=format&fit=crop&q=80' },
                          { label: 'Golden Scoop', url: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400&auto=format&fit=crop&q=80' },
                        ]}
                      />
                    </div>
                  )}

                  {/* MELTO SECTION 02: 3D HERO CAROUSEL */}
                  {simpleEditorTab === 'hero' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#ff5c8a]/15 border border-[#ff5c8a]/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>3D Tubs Carousel &amp; Stage:</strong> Customize the main tagline and rotating ring text.
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Hero Tagline</label>
                        <input
                          type="text"
                          value={meltoConfig.heroTagline}
                          onChange={(e) => setMeltoConfig((prev) => ({ ...prev, heroTagline: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Rotating Ring Text</label>
                        <input
                          type="text"
                          value={meltoConfig.rotatingRingText}
                          onChange={(e) => setMeltoConfig((prev) => ({ ...prev, rotatingRingText: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* MELTO SECTION 03: 6 3D FLAVORS & SCOOPS */}
                  {simpleEditorTab === 'products' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#ff5c8a]/15 border border-[#ff5c8a]/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>6 Signature 3D Flavors:</strong> Select a flavor to customize image, colors, ingredients, price, and descriptions.
                        </p>
                      </div>
                      <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {meltoConfig.products.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveSimpleProductIndex(idx)}
                            style={{
                              borderColor: activeSimpleProductIndex === idx ? p.col : 'transparent',
                              backgroundColor: activeSimpleProductIndex === idx ? `${p.col}33` : 'rgba(255,255,255,0.05)',
                            }}
                            className="px-2.5 py-1.5 rounded-lg border text-[11px] font-mono whitespace-nowrap text-white cursor-pointer"
                          >
                            {p.n}
                          </button>
                        ))}
                      </div>

                      {meltoConfig.products[activeSimpleProductIndex] && (
                        <div className="space-y-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                          {/* Custom Image Replacer for this flavor */}
                          <ImageCustomizerField
                            label={`${meltoConfig.products[activeSimpleProductIndex].n} Custom Tub Artwork`}
                            sublabel="Replaces or overlays the tub image on cards & spotlight"
                            value={meltoConfig.products[activeSimpleProductIndex].customImageUrl}
                            onChange={(url) => {
                              setMeltoConfig((prev) => {
                                const next = [...prev.products];
                                next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], customImageUrl: url };
                                return { ...prev, products: next };
                              });
                            }}
                            accentColor={meltoConfig.products[activeSimpleProductIndex].col}
                            placeholder="https://..."
                            presetImages={[
                              { label: 'Belgian Chocolate Scoop', url: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&auto=format&fit=crop&q=80' },
                              { label: 'Vanilla Bean Gelato', url: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=600&auto=format&fit=crop&q=80' },
                              { label: 'Wild Strawberry Pint', url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80' },
                              { label: 'Pistachio Churn', url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80' },
                              { label: 'Salted Caramel Swirl', url: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80' },
                            ]}
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Flavor Name</label>
                              <input
                                type="text"
                                value={meltoConfig.products[activeSimpleProductIndex].n}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setMeltoConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], n: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Price (Rs)</label>
                              <input
                                type="number"
                                value={meltoConfig.products[activeSimpleProductIndex].rs}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setMeltoConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], rs: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Primary Color</label>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="color"
                                  value={meltoConfig.products[activeSimpleProductIndex].col}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setMeltoConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], col: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0"
                                />
                                <input
                                  type="text"
                                  value={meltoConfig.products[activeSimpleProductIndex].col}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setMeltoConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], col: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Card Tint</label>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="color"
                                  value={meltoConfig.products[activeSimpleProductIndex].tint}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setMeltoConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], tint: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0"
                                />
                                <input
                                  type="text"
                                  value={meltoConfig.products[activeSimpleProductIndex].tint}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setMeltoConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], tint: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Lid Color</label>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="color"
                                  value={meltoConfig.products[activeSimpleProductIndex].lid || '#ffffff'}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setMeltoConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], lid: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0"
                                />
                                <input
                                  type="text"
                                  value={meltoConfig.products[activeSimpleProductIndex].lid || '#ffffff'}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setMeltoConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], lid: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Label Top</label>
                              <input
                                type="text"
                                value={meltoConfig.products[activeSimpleProductIndex].l1}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setMeltoConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], l1: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Label Bottom</label>
                              <input
                                type="text"
                                value={meltoConfig.products[activeSimpleProductIndex].l2}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setMeltoConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], l2: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Tagline</label>
                            <input
                              type="text"
                              value={meltoConfig.products[activeSimpleProductIndex].tag}
                              onChange={(e) => {
                                const val = e.target.value;
                                setMeltoConfig((prev) => {
                                  const next = [...prev.products];
                                  next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], tag: val };
                                  return { ...prev, products: next };
                                });
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Richness Level (1-5)</label>
                            <input
                              type="range"
                              min={1}
                              max={5}
                              value={meltoConfig.products[activeSimpleProductIndex].heat}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setMeltoConfig((prev) => {
                                  const next = [...prev.products];
                                  next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], heat: val };
                                  return { ...prev, products: next };
                                });
                              }}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={meltoConfig.products[activeSimpleProductIndex].desc}
                              onChange={(e) => {
                                const val = e.target.value;
                                setMeltoConfig((prev) => {
                                  const next = [...prev.products];
                                  next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], desc: val };
                                  return { ...prev, products: next };
                                });
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Ingredients</label>
                              <input
                                type="text"
                                value={meltoConfig.products[activeSimpleProductIndex].ing || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setMeltoConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], ing: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Nutrition Fact</label>
                              <input
                                type="text"
                                value={meltoConfig.products[activeSimpleProductIndex].nut || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setMeltoConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], nut: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Pairs With</label>
                              <input
                                type="text"
                                value={meltoConfig.products[activeSimpleProductIndex].pair || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setMeltoConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], pair: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Chef Quote</label>
                              <input
                                type="text"
                                value={meltoConfig.products[activeSimpleProductIndex].quote || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setMeltoConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], quote: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* MELTO SECTION 04: HERITAGE STORY */}
                  {simpleEditorTab === 'story' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#ff5c8a]/15 border border-[#ff5c8a]/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>Artisan Story &amp; Kitchen Heritage:</strong> Slow-churned fresh cream narrative, farm photo, and stats.
                        </p>
                      </div>

                      <ImageCustomizerField
                        label="Heritage Kitchen & Farm Banner Image"
                        sublabel="Displays inside the Our Story section"
                        value={meltoConfig.storyImageUrl}
                        onChange={(url) => setMeltoConfig((prev) => ({ ...prev, storyImageUrl: url }))}
                        accentColor="#ff5c8a"
                        placeholder="https://..."
                        presetImages={[
                          { label: 'Alpine Dairy Pasture', url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop&q=80' },
                          { label: 'Slow Copper Churn', url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80' },
                          { label: 'Fresh Milk Creamery', url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80' },
                        ]}
                      />

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Story Title</label>
                        <input
                          type="text"
                          value={meltoConfig.storyTitle}
                          onChange={(e) => setMeltoConfig((prev) => ({ ...prev, storyTitle: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Story Paragraph</label>
                        <textarea
                          rows={4}
                          value={meltoConfig.storyText}
                          onChange={(e) => setMeltoConfig((prev) => ({ ...prev, storyText: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white leading-relaxed"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[9px] font-mono text-white/60 mb-1">Stat 1 Num</label>
                          <input
                            type="text"
                            value={meltoConfig.storyStat1Num}
                            onChange={(e) => setMeltoConfig((prev) => ({ ...prev, storyStat1Num: e.target.value }))}
                            className="w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={meltoConfig.storyStat1Label}
                            onChange={(e) => setMeltoConfig((prev) => ({ ...prev, storyStat1Label: e.target.value }))}
                            placeholder="Label"
                            className="w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-white/60 mb-1">Stat 2 Num</label>
                          <input
                            type="text"
                            value={meltoConfig.storyStat2Num}
                            onChange={(e) => setMeltoConfig((prev) => ({ ...prev, storyStat2Num: e.target.value }))}
                            className="w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={meltoConfig.storyStat2Label}
                            onChange={(e) => setMeltoConfig((prev) => ({ ...prev, storyStat2Label: e.target.value }))}
                            placeholder="Label"
                            className="w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-white/60 mb-1">Stat 3 Num</label>
                          <input
                            type="text"
                            value={meltoConfig.storyStat3Num}
                            onChange={(e) => setMeltoConfig((prev) => ({ ...prev, storyStat3Num: e.target.value }))}
                            className="w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={meltoConfig.storyStat3Label}
                            onChange={(e) => setMeltoConfig((prev) => ({ ...prev, storyStat3Label: e.target.value }))}
                            placeholder="Label"
                            className="w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MELTO SECTION 05: 3D SPOTLIGHT & FACTS */}
                  {simpleEditorTab === 'spotlight' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#ff5c8a]/15 border border-[#ff5c8a]/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>3D Pint Spotlight &amp; Specifications:</strong> Tub volume label and freezer storage recommendations.
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Net Weight / Volume</label>
                        <input
                          type="text"
                          value={meltoConfig.netWeightLabel}
                          onChange={(e) => setMeltoConfig((prev) => ({ ...prev, netWeightLabel: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Storage Instructions</label>
                        <textarea
                          rows={2}
                          value={meltoConfig.storageText}
                          onChange={(e) => setMeltoConfig((prev) => ({ ...prev, storageText: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* MELTO SECTION 06: GIANT FOOTER & LOCK */}
                  {simpleEditorTab === 'footer' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Giant Wordmark</label>
                        <input
                          type="text"
                          value={meltoConfig.footerGiant}
                          onChange={(e) => setMeltoConfig((prev) => ({ ...prev, footerGiant: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#d02128]/15 border border-[#d02128]/40 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-white font-bold">
                          <Lock className="w-3.5 h-3.5 text-[#d02128]" />
                          Protected Attribution Watermark
                        </div>
                        <p className="text-[11px] text-white/70">
                          © 2026 <strong>{meltoConfig.brandName}</strong>. All Rights Reserved. |{' '}
                          <strong className="text-amber-300">Powered by EFerz (EFerz.com)</strong> — permanently locked.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* MELTO SECTION 07: CUSTOM RAW HTML */}
                  {simpleEditorTab === 'html' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-400/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>Direct HTML Code Editor:</strong> Paste or edit custom HTML directly. Changes apply immediately to the 3D frame.
                        </p>
                      </div>
                      <textarea
                        rows={12}
                        value={meltoConfig.customHtmlOverride || buildMeltoHtml(meltoConfig)}
                        onChange={(e) => setMeltoConfig((prev) => ({ ...prev, customHtmlOverride: e.target.value }))}
                        className="w-full p-3 rounded-xl bg-black/60 border border-white/20 text-[11px] font-mono text-cyan-200 leading-relaxed"
                      />
                      <button
                        type="button"
                        onClick={() => setMeltoConfig((prev) => ({ ...prev, customHtmlOverride: null }))}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white cursor-pointer"
                      >
                        Reset to Authentic Template
                      </button>
                    </div>
                  )}
                </div>
              ) : isZaika ? (
                <div className="space-y-4">
                  {/* ZAIKA SECTION 01: BRAND & HEADER */}
                  {simpleEditorTab === 'brand' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#e0881c]/15 border border-[#e0881c]/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>ZAIKA Heritage Pantry:</strong> Customize the traditional spice brand identity, logo, and preloader emblem.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Brand Name</label>
                          <input
                            type="text"
                            value={zaikaConfig.brandName}
                            onChange={(e) => setZaikaConfig((prev) => ({ ...prev, brandName: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Sub-Headline</label>
                          <input
                            type="text"
                            value={zaikaConfig.brandSub}
                            onChange={(e) => setZaikaConfig((prev) => ({ ...prev, brandSub: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>

                      <ImageCustomizerField
                        label="Header Brand Logo"
                        sublabel="Custom emblem or logo shown in top header bar"
                        value={zaikaConfig.logoImageUrl}
                        onChange={(url) => setZaikaConfig((prev) => ({ ...prev, logoImageUrl: url }))}
                        accentColor="#e0881c"
                        placeholder="https://..."
                        presetImages={[
                          { label: 'Brass Spice Stamp', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80' },
                          { label: 'Royal Mughal Crest', url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80' },
                          { label: 'Mortar & Pestle', url: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&auto=format&fit=crop&q=80' },
                        ]}
                      />

                      <ImageCustomizerField
                        label="Preloader Logo & Emblem"
                        sublabel="Displays inside the loading screen on initial visit"
                        value={zaikaConfig.loaderImageUrl}
                        onChange={(url) => setZaikaConfig((prev) => ({ ...prev, loaderImageUrl: url }))}
                        accentColor="#e0881c"
                        placeholder="https://..."
                        presetImages={[
                          { label: 'Clay Urn Matka', url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&auto=format&fit=crop&q=80' },
                          { label: 'Saffron Threads', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80' },
                          { label: 'Terracotta Jar', url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format&fit=crop&q=80' },
                        ]}
                      />
                    </div>
                  )}

                  {/* ZAIKA SECTION 02: 3D HERO CAROUSEL */}
                  {simpleEditorTab === 'hero' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#e0881c]/15 border border-[#e0881c]/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>3D Jars Carousel &amp; Stage:</strong> Customize the main tagline and rotating circular ring text.
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Hero Tagline</label>
                        <input
                          type="text"
                          value={zaikaConfig.heroTagline}
                          onChange={(e) => setZaikaConfig((prev) => ({ ...prev, heroTagline: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Rotating Ring Text</label>
                        <input
                          type="text"
                          value={zaikaConfig.rotatingRingText}
                          onChange={(e) => setZaikaConfig((prev) => ({ ...prev, rotatingRingText: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* ZAIKA SECTION 03: 6 3D JARS & ACHAR */}
                  {simpleEditorTab === 'products' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#e0881c]/15 border border-[#e0881c]/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>6 Heritage Jars &amp; Masalas:</strong> Select a jar to adjust image, colors, heat, ingredients, and pricing.
                        </p>
                      </div>
                      <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {zaikaConfig.products.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveSimpleProductIndex(idx)}
                            style={{
                              borderColor: activeSimpleProductIndex === idx ? p.col : 'transparent',
                              backgroundColor: activeSimpleProductIndex === idx ? `${p.col}33` : 'rgba(255,255,255,0.05)',
                            }}
                            className="px-2.5 py-1.5 rounded-lg border text-[11px] font-mono whitespace-nowrap text-white cursor-pointer"
                          >
                            {p.n}
                          </button>
                        ))}
                      </div>

                      {zaikaConfig.products[activeSimpleProductIndex] && (
                        <div className="space-y-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                          {/* Custom Image Replacer for this jar */}
                          <ImageCustomizerField
                            label={`${zaikaConfig.products[activeSimpleProductIndex].n} Custom Jar Artwork`}
                            sublabel="Replaces or overlays the jar image on cards & spotlight"
                            value={zaikaConfig.products[activeSimpleProductIndex].customImageUrl}
                            onChange={(url) => {
                              setZaikaConfig((prev) => {
                                const next = [...prev.products];
                                next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], customImageUrl: url };
                                return { ...prev, products: next };
                              });
                            }}
                            accentColor={zaikaConfig.products[activeSimpleProductIndex].col}
                            placeholder="https://..."
                            presetImages={[
                              { label: 'Kashmiri Degi Mirch', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80' },
                              { label: 'Mango Achar Urn', url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&auto=format&fit=crop&q=80' },
                              { label: 'Golden Turmeric Jar', url: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&auto=format&fit=crop&q=80' },
                              { label: 'Garam Masala Blend', url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&auto=format&fit=crop&q=80' },
                              { label: 'Green Chilli Thecha', url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80' },
                            ]}
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Jar Name</label>
                              <input
                                type="text"
                                value={zaikaConfig.products[activeSimpleProductIndex].n}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setZaikaConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], n: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Price (Rs)</label>
                              <input
                                type="number"
                                value={zaikaConfig.products[activeSimpleProductIndex].rs}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setZaikaConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], rs: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Spice Color</label>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="color"
                                  value={zaikaConfig.products[activeSimpleProductIndex].col}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setZaikaConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], col: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0"
                                />
                                <input
                                  type="text"
                                  value={zaikaConfig.products[activeSimpleProductIndex].col}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setZaikaConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], col: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Card Tint</label>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="color"
                                  value={zaikaConfig.products[activeSimpleProductIndex].tint}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setZaikaConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], tint: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0"
                                />
                                <input
                                  type="text"
                                  value={zaikaConfig.products[activeSimpleProductIndex].tint}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setZaikaConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], tint: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Lid Color</label>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="color"
                                  value={zaikaConfig.products[activeSimpleProductIndex].lid || '#ffffff'}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setZaikaConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], lid: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer p-0 shrink-0"
                                />
                                <input
                                  type="text"
                                  value={zaikaConfig.products[activeSimpleProductIndex].lid || '#ffffff'}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setZaikaConfig((prev) => {
                                      const next = [...prev.products];
                                      next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], lid: val };
                                      return { ...prev, products: next };
                                    });
                                  }}
                                  className="w-full px-1.5 py-1 rounded bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Label Top</label>
                              <input
                                type="text"
                                value={zaikaConfig.products[activeSimpleProductIndex].l1}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setZaikaConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], l1: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Label Bottom</label>
                              <input
                                type="text"
                                value={zaikaConfig.products[activeSimpleProductIndex].l2}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setZaikaConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], l2: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Tagline</label>
                            <input
                              type="text"
                              value={zaikaConfig.products[activeSimpleProductIndex].tag}
                              onChange={(e) => {
                                const val = e.target.value;
                                setZaikaConfig((prev) => {
                                  const next = [...prev.products];
                                  next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], tag: val };
                                  return { ...prev, products: next };
                                });
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Heat Level (1-5)</label>
                            <input
                              type="range"
                              min={1}
                              max={5}
                              value={zaikaConfig.products[activeSimpleProductIndex].heat}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setZaikaConfig((prev) => {
                                  const next = [...prev.products];
                                  next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], heat: val };
                                  return { ...prev, products: next };
                                });
                              }}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={zaikaConfig.products[activeSimpleProductIndex].desc}
                              onChange={(e) => {
                                const val = e.target.value;
                                setZaikaConfig((prev) => {
                                  const next = [...prev.products];
                                  next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], desc: val };
                                  return { ...prev, products: next };
                                });
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Ingredients</label>
                              <input
                                type="text"
                                value={zaikaConfig.products[activeSimpleProductIndex].ing || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setZaikaConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], ing: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Nutritional Fact</label>
                              <input
                                type="text"
                                value={zaikaConfig.products[activeSimpleProductIndex].nut || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setZaikaConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], nut: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Kitchen Pairing</label>
                              <input
                                type="text"
                                value={zaikaConfig.products[activeSimpleProductIndex].pair || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setZaikaConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], pair: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Heritage Quote</label>
                              <input
                                type="text"
                                value={zaikaConfig.products[activeSimpleProductIndex].quote || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setZaikaConfig((prev) => {
                                    const next = [...prev.products];
                                    next[activeSimpleProductIndex] = { ...next[activeSimpleProductIndex], quote: val };
                                    return { ...prev, products: next };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ZAIKA SECTION 04: HERITAGE STORY */}
                  {simpleEditorTab === 'story' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#e0881c]/15 border border-[#e0881c]/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>Sun-Cured Heritage Story:</strong> Slow sun, mustard oil, family recipes, photo, and stats.
                        </p>
                      </div>

                      <ImageCustomizerField
                        label="Spice Farm & Terracotta Yard Banner Image"
                        sublabel="Displays inside the Our Heritage Story section"
                        value={zaikaConfig.storyImageUrl}
                        onChange={(url) => setZaikaConfig((prev) => ({ ...prev, storyImageUrl: url }))}
                        accentColor="#e0881c"
                        placeholder="https://..."
                        presetImages={[
                          { label: 'Terracotta Yard Sun Drying', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80' },
                          { label: 'Stone Mill Grinding', url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80' },
                          { label: 'Old Delhi Spice Bazaar', url: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=800&auto=format&fit=crop&q=80' },
                        ]}
                      />

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Story Title</label>
                        <input
                          type="text"
                          value={zaikaConfig.storyTitle}
                          onChange={(e) => setZaikaConfig((prev) => ({ ...prev, storyTitle: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Story Paragraph</label>
                        <textarea
                          rows={4}
                          value={zaikaConfig.storyText}
                          onChange={(e) => setZaikaConfig((prev) => ({ ...prev, storyText: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white leading-relaxed"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[9px] font-mono text-white/60 mb-1">Stat 1 Num</label>
                          <input
                            type="text"
                            value={zaikaConfig.storyStat1Num}
                            onChange={(e) => setZaikaConfig((prev) => ({ ...prev, storyStat1Num: e.target.value }))}
                            className="w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={zaikaConfig.storyStat1Label}
                            onChange={(e) => setZaikaConfig((prev) => ({ ...prev, storyStat1Label: e.target.value }))}
                            placeholder="Label"
                            className="w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-white/60 mb-1">Stat 2 Num</label>
                          <input
                            type="text"
                            value={zaikaConfig.storyStat2Num}
                            onChange={(e) => setZaikaConfig((prev) => ({ ...prev, storyStat2Num: e.target.value }))}
                            className="w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={zaikaConfig.storyStat2Label}
                            onChange={(e) => setZaikaConfig((prev) => ({ ...prev, storyStat2Label: e.target.value }))}
                            placeholder="Label"
                            className="w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-white/60 mb-1">Stat 3 Num</label>
                          <input
                            type="text"
                            value={zaikaConfig.storyStat3Num}
                            onChange={(e) => setZaikaConfig((prev) => ({ ...prev, storyStat3Num: e.target.value }))}
                            className="w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={zaikaConfig.storyStat3Label}
                            onChange={(e) => setZaikaConfig((prev) => ({ ...prev, storyStat3Label: e.target.value }))}
                            placeholder="Label"
                            className="w-full mt-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] text-white/70"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ZAIKA SECTION 05: 3D SPOTLIGHT & FACTS */}
                  {simpleEditorTab === 'spotlight' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#e0881c]/15 border border-[#e0881c]/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>3D Jar Spotlight &amp; Specifications:</strong> Glass jar net weight and shelf life instructions.
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Net Weight Label</label>
                        <input
                          type="text"
                          value={zaikaConfig.netWeightLabel}
                          onChange={(e) => setZaikaConfig((prev) => ({ ...prev, netWeightLabel: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Shelf Life Instructions</label>
                        <textarea
                          rows={2}
                          value={zaikaConfig.shelfLifeText}
                          onChange={(e) => setZaikaConfig((prev) => ({ ...prev, shelfLifeText: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* ZAIKA SECTION 06: GIANT FOOTER & LOCK */}
                  {simpleEditorTab === 'footer' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">Giant Wordmark</label>
                        <input
                          type="text"
                          value={zaikaConfig.footerGiant}
                          onChange={(e) => setZaikaConfig((prev) => ({ ...prev, footerGiant: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#d02128]/15 border border-[#d02128]/40 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-white font-bold">
                          <Lock className="w-3.5 h-3.5 text-[#d02128]" />
                          Protected Attribution Watermark
                        </div>
                        <p className="text-[11px] text-white/70">
                          © 2026 <strong>{zaikaConfig.brandName}</strong>. All Rights Reserved. |{' '}
                          <strong className="text-amber-300">Powered by EFerz (EFerz.com)</strong> — permanently locked.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ZAIKA SECTION 07: CUSTOM RAW HTML */}
                  {simpleEditorTab === 'html' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/40">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>Direct HTML Code Editor:</strong> Paste or edit custom HTML directly. Changes apply immediately to the 3D frame.
                        </p>
                      </div>
                      <textarea
                        rows={12}
                        value={zaikaConfig.customHtmlOverride || buildZaikaHtml(zaikaConfig)}
                        onChange={(e) => setZaikaConfig((prev) => ({ ...prev, customHtmlOverride: e.target.value }))}
                        className="w-full p-3 rounded-xl bg-black/60 border border-white/20 text-[11px] font-mono text-amber-200 leading-relaxed"
                      />
                      <button
                        type="button"
                        onClick={() => setZaikaConfig((prev) => ({ ...prev, customHtmlOverride: null }))}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white cursor-pointer"
                      >
                        Reset to Authentic Template
                      </button>
                    </div>
                  )}
                </div>
              ) : isUniversal ? (
                <div className="space-y-4">
                  {/* Instant Clicked-Text Quick Editor (When user clicks any text on the 3D website) */}
                  {clickedTextPath && (
                    <div className="p-3.5 rounded-2xl bg-cyan-500/15 border border-cyan-400/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold">
                          ✎ Direct Clicked Text Field ({clickedTextPath})
                        </span>
                        <button
                          type="button"
                          onClick={() => setClickedTextPath('')}
                          className="text-[10px] font-mono text-white/50 hover:text-white cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={clickedTextValue}
                        onChange={(e) => {
                          setClickedTextValue(e.target.value);
                          updateUniversalByPath(
                            activeUniversalId,
                            clickedTextPath,
                            e.target.value
                          );
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-cyan-400/50 text-xs text-white focus:outline-none"
                      />
                    </div>
                  )}

                  {/* UNIVERSAL TAB 01: BRAND, LOGO & 3D COLORS */}
                  {universalEditorTab === 'brand' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                        <p className="text-xs text-white/85 leading-relaxed">
                          <strong>01. Brand &amp; 3D Studio Palette:</strong> Changes here immediately update the 3D WebGL lighting, brand header, and locked copyright brand name.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Brand Name
                          </label>
                          <input
                            type="text"
                            value={currentUniversalConfig.brandName}
                            onChange={(e) =>
                              updateUniversalByPath(activeUniversalId, 'brandName', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Brand Sub-Tag
                          </label>
                          <input
                            type="text"
                            value={currentUniversalConfig.brandTag}
                            onChange={(e) =>
                              updateUniversalByPath(activeUniversalId, 'brandTag', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1.5">
                          Custom Brand Logo (PNG/SVG)
                        </label>
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => logoInputRef.current?.click()}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-dashed border-white/25 text-xs font-mono uppercase tracking-[0.14em] text-white cursor-pointer"
                          >
                            <Upload className="w-4 h-4" style={{ color: studioAccent }} />
                            <span>
                              {currentUniversalConfig.logoImageUrl
                                ? 'Change Brand Logo'
                                : 'Upload Brand Logo'}
                            </span>
                          </button>
                          {currentUniversalConfig.logoImageUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                updateUniversalByPath(activeUniversalId, 'logoImageUrl', '')
                              }
                              className="px-3 py-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-xs font-mono text-rose-200 cursor-pointer"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            3D Primary Accent
                          </label>
                          <input
                            type="color"
                            value={currentUniversalConfig.primaryHex}
                            onChange={(e) =>
                              updateUniversalByPath(
                                activeUniversalId,
                                'primaryHex',
                                e.target.value
                              )
                            }
                            className="w-full h-9 rounded-lg cursor-pointer bg-transparent border border-white/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            3D Secondary Glow
                          </label>
                          <input
                            type="color"
                            value={currentUniversalConfig.secondaryHex}
                            onChange={(e) =>
                              updateUniversalByPath(
                                activeUniversalId,
                                'secondaryHex',
                                e.target.value
                              )
                            }
                            className="w-full h-9 rounded-lg cursor-pointer bg-transparent border border-white/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1.5">
                          Navbar Links (4 Links) &amp; CTA
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {currentUniversalConfig.navLinks.map((lnk, idx) => (
                            <input
                              key={idx}
                              type="text"
                              value={lnk}
                              onChange={(e) =>
                                updateUniversalByPath(
                                  activeUniversalId,
                                  `navLinks.${idx}`,
                                  e.target.value
                                )
                              }
                              className="px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          ))}
                        </div>
                        <input
                          type="text"
                          value={currentUniversalConfig.navCta}
                          onChange={(e) =>
                            updateUniversalByPath(activeUniversalId, 'navCta', e.target.value)
                          }
                          placeholder="Navbar CTA Text"
                          className="mt-2 w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* UNIVERSAL TAB 02: 3D HERO & PROMO */}
                  {universalEditorTab === 'hero' && (
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Hero Eyebrow Badge
                        </label>
                        <input
                          type="text"
                          value={currentUniversalConfig.heroBadge}
                          onChange={(e) =>
                            updateUniversalByPath(activeUniversalId, 'heroBadge', e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Headline Line 1
                          </label>
                          <input
                            type="text"
                            value={currentUniversalConfig.heroTitle1}
                            onChange={(e) =>
                              updateUniversalByPath(
                                activeUniversalId,
                                'heroTitle1',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Accent Line 2
                          </label>
                          <input
                            type="text"
                            value={currentUniversalConfig.heroTitleAccent}
                            onChange={(e) =>
                              updateUniversalByPath(
                                activeUniversalId,
                                'heroTitleAccent',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Hero Lead Paragraph
                        </label>
                        <textarea
                          rows={3}
                          value={currentUniversalConfig.heroSubtitle}
                          onChange={(e) =>
                            updateUniversalByPath(
                              activeUniversalId,
                              'heroSubtitle',
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Badge Top
                          </label>
                          <input
                            type="text"
                            value={currentUniversalConfig.promoBadgeTop}
                            onChange={(e) =>
                              updateUniversalByPath(
                                activeUniversalId,
                                'promoBadgeTop',
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Badge Bottom
                          </label>
                          <input
                            type="text"
                            value={currentUniversalConfig.promoBadgeBottom}
                            onChange={(e) =>
                              updateUniversalByPath(
                                activeUniversalId,
                                'promoBadgeBottom',
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Promo Code
                          </label>
                          <input
                            type="text"
                            value={currentUniversalConfig.promoCode}
                            onChange={(e) =>
                              updateUniversalByPath(activeUniversalId, 'promoCode', e.target.value)
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UNIVERSAL TAB 03: 4 3D SCROLL STAGES */}
                  {universalEditorTab === 'stages' && (
                    <div className="space-y-3.5">
                      {currentUniversalConfig.stages.map((st, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                        >
                          <div
                            className="text-[10px] font-mono uppercase font-bold"
                            style={{ color: studioAccent }}
                          >
                            3D Scroll Stage 0{idx + 1}
                          </div>
                          <input
                            type="text"
                            value={st.badge}
                            onChange={(e) =>
                              updateUniversalByPath(
                                activeUniversalId,
                                `stages.${idx}.badge`,
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={st.title}
                              onChange={(e) =>
                                updateUniversalByPath(
                                  activeUniversalId,
                                  `stages.${idx}.title`,
                                  e.target.value
                                )
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={st.highlight}
                              onChange={(e) =>
                                updateUniversalByPath(
                                  activeUniversalId,
                                  `stages.${idx}.highlight`,
                                  e.target.value
                                )
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={st.description}
                            onChange={(e) =>
                              updateUniversalByPath(
                                activeUniversalId,
                                `stages.${idx}.description`,
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* UNIVERSAL TAB 04: 4 PRODUCTS / MODELS */}
                  {universalEditorTab === 'products' && (
                    <div className="space-y-3.5">
                      {currentUniversalConfig.products.map((prod, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                        >
                          <div
                            className="text-[10px] font-mono uppercase font-bold"
                            style={{ color: prod.accentHex || studioAccent }}
                          >
                            Model / Tier 0{idx + 1} ({prod.code})
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={prod.name}
                              onChange={(e) =>
                                updateUniversalByPath(
                                  activeUniversalId,
                                  `products.${idx}.name`,
                                  e.target.value
                                )
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={prod.price}
                              onChange={(e) =>
                                updateUniversalByPath(
                                  activeUniversalId,
                                  `products.${idx}.price`,
                                  e.target.value
                                )
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={prod.description}
                            onChange={(e) =>
                              updateUniversalByPath(
                                activeUniversalId,
                                `products.${idx}.description`,
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* UNIVERSAL TAB 05: REVIEWS & STATS */}
                  {universalEditorTab === 'reviews' && (
                    <div className="space-y-3.5">
                      {currentUniversalConfig.reviews.map((rev, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={rev.name}
                              onChange={(e) =>
                                updateUniversalByPath(
                                  activeUniversalId,
                                  `reviews.${idx}.name`,
                                  e.target.value
                                )
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={rev.role}
                              onChange={(e) =>
                                updateUniversalByPath(
                                  activeUniversalId,
                                  `reviews.${idx}.role`,
                                  e.target.value
                                )
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={rev.quote}
                            onChange={(e) =>
                              updateUniversalByPath(
                                activeUniversalId,
                                `reviews.${idx}.quote`,
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* UNIVERSAL TAB 06: FOOTER & LOCKED EFERZ WATERMARK */}
                  {universalEditorTab === 'footer' && (
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Footer Headline
                        </label>
                        <input
                          type="text"
                          value={currentUniversalConfig.footerHeadline}
                          onChange={(e) =>
                            updateUniversalByPath(
                              activeUniversalId,
                              'footerHeadline',
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Footer Subtext
                        </label>
                        <textarea
                          rows={2}
                          value={currentUniversalConfig.footerSubtext}
                          onChange={(e) =>
                            updateUniversalByPath(
                              activeUniversalId,
                              'footerSubtext',
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Footer CTA Button
                        </label>
                        <input
                          type="text"
                          value={currentUniversalConfig.footerCta}
                          onChange={(e) =>
                            updateUniversalByPath(activeUniversalId, 'footerCta', e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#d02128]/15 border border-[#d02128]/50 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-bold">
                          <Lock className="w-3.5 h-3.5 text-[#d02128]" />
                          <span>Locked Watermark &amp; Copyright</span>
                        </div>
                        <p className="text-[11px] text-white/80 leading-relaxed">
                          © 2026 <strong>{currentUniversalConfig.brandName}</strong>. All Rights Reserved. |{' '}
                          <strong>Powered by EFerz (EFerz.com)</strong> — permanently locked across all demos.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : isVelora ? (
                <>
                  {/* VELORA SECTION 01: BRAND & NAVBAR */}
                  {veloraEditorTab === 'brand' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40">
                        <p className="text-xs text-white/90 leading-relaxed">
                          <strong>01. Velora Brand &amp; Navigation:</strong> Changes here update the <strong>3D Glass Bottles &amp; Jars Labels</strong>, SVG product illustrations, and top Navbar in real time.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Brand Name (3D Label)
                          </label>
                          <input
                            type="text"
                            value={veloraConfig.brandName}
                            onChange={(e) =>
                              setVeloraConfig((p) => ({ ...p, brandName: e.target.value }))
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Italic Sub-Brand
                          </label>
                          <input
                            type="text"
                            value={veloraConfig.brandSub}
                            onChange={(e) =>
                              setVeloraConfig((p) => ({ ...p, brandSub: e.target.value }))
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5">
                          Custom Brand Logo
                        </label>
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => logoInputRef.current?.click()}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-dashed border-white/25 text-xs font-mono uppercase tracking-[0.14em] text-white cursor-pointer"
                          >
                            <Upload className="w-4 h-4 text-[#c4506a]" />
                            <span>
                              {veloraConfig.logoImageUrl ? 'Change Logo' : 'Upload Logo (PNG/SVG)'}
                            </span>
                          </button>
                          {veloraConfig.logoImageUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                setVeloraConfig((p) => ({ ...p, logoImageUrl: null }))
                              }
                              className="px-3 py-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-xs font-mono text-rose-200 cursor-pointer"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1.5">
                          Navbar Menu Links (6 Links)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {veloraConfig.navLinks.map((lnk, idx) => (
                            <input
                              key={idx}
                              type="text"
                              value={lnk}
                              onChange={(e) => updateVeloraNavLink(idx, e.target.value)}
                              className="px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* VELORA SECTION 02: 3D HERO STAGE */}
                  {veloraEditorTab === 'hero' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40">
                        <p className="text-xs text-white/90">
                          <strong>02. 3D Hero Stage:</strong> Customize the giant background stroke word, tagline, and spinning badge behind the 3D glass bottles.
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Giant Background Outline Word
                        </label>
                        <input
                          type="text"
                          value={veloraConfig.heroBigTitle}
                          onChange={(e) =>
                            setVeloraConfig((p) => ({ ...p, heroBigTitle: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Top-Left Hero Tagline
                        </label>
                        <textarea
                          rows={3}
                          value={veloraConfig.heroTagline}
                          onChange={(e) =>
                            setVeloraConfig((p) => ({ ...p, heroTagline: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Spinning Circular Badge Text
                        </label>
                        <input
                          type="text"
                          value={veloraConfig.heroBadgeText}
                          onChange={(e) =>
                            setVeloraConfig((p) => ({ ...p, heroBadgeText: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* VELORA SECTION 03: 8 3D PRODUCTS */}
                  {veloraEditorTab === 'products' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-2">
                          Select 3D Product (1-8)
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {veloraConfig.products.map((prod, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActiveVeloraProductIndex(idx)}
                              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                                activeVeloraProductIndex === idx
                                  ? 'bg-white/15 border-[#c4506a] text-white shadow-md'
                                  : 'bg-white/[0.03] border-white/10 text-white/65 hover:text-white'
                              }`}
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/40"
                                style={{ background: prod.colorHex }}
                              />
                              <div className="truncate">
                                <div className="text-[11px] font-bold truncate">{prod.name}</div>
                                <div className="text-[9px] font-mono text-white/50">
                                  ${prod.price} · {prod.sizeText}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Product Name (Printed on 3D Bottle/Jar)
                          </label>
                          <input
                            type="text"
                            value={currentEditedVeloraProduct.name}
                            onChange={(e) =>
                              updateVeloraProductField(
                                activeVeloraProductIndex,
                                'name',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Category Label
                            </label>
                            <input
                              type="text"
                              value={currentEditedVeloraProduct.categoryLabel}
                              onChange={(e) =>
                                updateVeloraProductField(
                                  activeVeloraProductIndex,
                                  'categoryLabel',
                                  e.target.value
                                )
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              3D Vessel Shape
                            </label>
                            <select
                              value={currentEditedVeloraProduct.shapeIndex}
                              onChange={(e) =>
                                updateVeloraProductField(
                                  activeVeloraProductIndex,
                                  'shapeIndex',
                                  Number(e.target.value) as 0 | 1 | 2 | 3
                                )
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-[#151520] border border-white/15 text-xs text-white"
                            >
                              <option value={0}>0 — Glass Cream Jar</option>
                              <option value={1}>1 — Glass Dropper Bottle</option>
                              <option value={2}>2 — Velvet Lipstick Bullet</option>
                              <option value={3}>3 — Eau de Parfum Flacon</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Short Sensory Tagline
                          </label>
                          <input
                            type="text"
                            value={currentEditedVeloraProduct.tagline}
                            onChange={(e) =>
                              updateVeloraProductField(
                                activeVeloraProductIndex,
                                'tagline',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Full Description
                          </label>
                          <textarea
                            rows={2}
                            value={currentEditedVeloraProduct.description}
                            onChange={(e) =>
                              updateVeloraProductField(
                                activeVeloraProductIndex,
                                'description',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Price ($)
                            </label>
                            <input
                              type="number"
                              value={currentEditedVeloraProduct.price}
                              onChange={(e) =>
                                updateVeloraProductField(
                                  activeVeloraProductIndex,
                                  'price',
                                  Number(e.target.value) || 0
                                )
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Bottle / Jar Size
                            </label>
                            <input
                              type="text"
                              value={currentEditedVeloraProduct.sizeText}
                              onChange={(e) =>
                                updateVeloraProductField(
                                  activeVeloraProductIndex,
                                  'sizeText',
                                  e.target.value
                                )
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Scent Notes
                            </label>
                            <input
                              type="text"
                              value={currentEditedVeloraProduct.notes}
                              onChange={(e) =>
                                updateVeloraProductField(
                                  activeVeloraProductIndex,
                                  'notes',
                                  e.target.value
                                )
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Key Ingredients
                            </label>
                            <input
                              type="text"
                              value={currentEditedVeloraProduct.ingredients}
                              onChange={(e) =>
                                updateVeloraProductField(
                                  activeVeloraProductIndex,
                                  'ingredients',
                                  e.target.value
                                )
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              3D Formula Color
                            </label>
                            <input
                              type="color"
                              value={currentEditedVeloraProduct.colorHex}
                              onChange={(e) =>
                                updateVeloraProductField(
                                  activeVeloraProductIndex,
                                  'colorHex',
                                  e.target.value
                                )
                              }
                              className="w-full h-8 rounded-lg cursor-pointer bg-transparent border border-white/20"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Aura &amp; Card BG
                            </label>
                            <input
                              type="color"
                              value={currentEditedVeloraProduct.bgHex}
                              onChange={(e) =>
                                updateVeloraProductField(
                                  activeVeloraProductIndex,
                                  'bgHex',
                                  e.target.value
                                )
                              }
                              className="w-full h-8 rounded-lg cursor-pointer bg-transparent border border-white/20"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              3D Cap Color
                            </label>
                            <input
                              type="color"
                              value={currentEditedVeloraProduct.lidHex}
                              onChange={(e) =>
                                updateVeloraProductField(
                                  activeVeloraProductIndex,
                                  'lidHex',
                                  e.target.value
                                )
                              }
                              className="w-full h-8 rounded-lg cursor-pointer bg-transparent border border-white/20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* VELORA SECTION 04: 3D SHADER ORB */}
                  {veloraEditorTab === 'orb' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40">
                        <p className="text-xs text-white/90">
                          <strong>04. 3D Essence Shader Orb:</strong> Customize the 3 scroll-morphing WebGL shader stages (Hydrate, Brighten, Restore).
                        </p>
                      </div>
                      {veloraConfig.orbStages.map((st, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                        >
                          <div className="text-[10px] font-mono uppercase text-[#e8a0a8]">
                            THE ESSENCE · 0{idx + 1}
                          </div>
                          <input
                            type="text"
                            value={st.title}
                            onChange={(e) => updateVeloraOrbStage(idx, 'title', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                          <textarea
                            rows={2}
                            value={st.description}
                            onChange={(e) =>
                              updateVeloraOrbStage(idx, 'description', e.target.value)
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            {([0, 1, 2] as const).map((cIdx) => (
                              <input
                                key={cIdx}
                                type="color"
                                value={st.colors[cIdx]}
                                onChange={(e) => updateVeloraOrbColor(idx, cIdx, e.target.value)}
                                className="w-full h-7 rounded cursor-pointer bg-transparent border border-white/20"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* VELORA SECTION 05: INGREDIENTS */}
                  {veloraEditorTab === 'ingredients' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40">
                        <p className="text-xs text-white/90">
                          <strong>05. Botanicals &amp; Actives Section:</strong> Edit the headline and introduction for the Ingredients section.
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Eyebrow Badge
                        </label>
                        <input
                          type="text"
                          value={veloraConfig.ingredientsEyebrow}
                          onChange={(e) =>
                            setVeloraConfig((p) => ({ ...p, ingredientsEyebrow: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={veloraConfig.ingredientsTitlePrefix}
                          onChange={(e) =>
                            setVeloraConfig((p) => ({
                              ...p,
                              ingredientsTitlePrefix: e.target.value,
                            }))
                          }
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={veloraConfig.ingredientsTitleItalic}
                          onChange={(e) =>
                            setVeloraConfig((p) => ({
                              ...p,
                              ingredientsTitleItalic: e.target.value,
                            }))
                          }
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <textarea
                        rows={3}
                        value={veloraConfig.ingredientsLead}
                        onChange={(e) =>
                          setVeloraConfig((p) => ({ ...p, ingredientsLead: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                      />
                    </div>
                  )}

                  {/* VELORA SECTION 06: 3 STUDIO RITUALS */}
                  {veloraEditorTab === 'rituals' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40">
                        <p className="text-xs text-white/90">
                          <strong>06. Studio Rituals:</strong> Customize the 3 in-studio ritual experiences.
                        </p>
                      </div>
                      {veloraConfig.rituals.map((rit, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                        >
                          <div className="text-[10px] font-mono uppercase text-[#e8a0a8]">
                            Ritual #{rit.number}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={rit.title}
                              onChange={(e) => updateVeloraRitual(idx, 'title', e.target.value)}
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={rit.duration}
                              onChange={(e) => updateVeloraRitual(idx, 'duration', e.target.value)}
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={rit.description}
                            onChange={(e) =>
                              updateVeloraRitual(idx, 'description', e.target.value)
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* VELORA SECTION 07: ABOUT & STATS */}
                  {veloraEditorTab === 'about' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40">
                        <p className="text-xs text-white/90">
                          <strong>07. About &amp; Animated Counters:</strong> Edit the brand story and 4 animated statistics.
                        </p>
                      </div>
                      <textarea
                        rows={3}
                        value={veloraConfig.aboutLead}
                        onChange={(e) =>
                          setVeloraConfig((p) => ({ ...p, aboutLead: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                      />
                      <div className="space-y-2">
                        {veloraConfig.stats.map((st, idx) => (
                          <div key={idx} className="grid grid-cols-3 gap-2">
                            <input
                              type="number"
                              value={st.number}
                              onChange={(e) =>
                                updateVeloraStat(idx, 'number', Number(e.target.value) || 0)
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={st.label}
                              onChange={(e) => updateVeloraStat(idx, 'label', e.target.value)}
                              className="col-span-2 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* VELORA SECTION 08: REVIEWS */}
                  {veloraEditorTab === 'reviews' && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40">
                        <p className="text-xs text-white/90">
                          <strong>08. Customer Reviews Ticker:</strong> Customize the scrolling customer reviews.
                        </p>
                      </div>
                      {veloraConfig.reviews.map((rev, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5"
                        >
                          <input
                            type="text"
                            value={rev.author}
                            onChange={(e) => updateVeloraReview(idx, 'author', e.target.value)}
                            className="w-full px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                          <textarea
                            rows={2}
                            value={rev.quote}
                            onChange={(e) => updateVeloraReview(idx, 'quote', e.target.value)}
                            className="w-full px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* VELORA SECTION 09: CONTACT */}
                  {veloraEditorTab === 'contact' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40">
                        <p className="text-xs text-white/90">
                          <strong>09. Contact Studio Section:</strong> Edit email, studio hours, and contact message.
                        </p>
                      </div>
                      <textarea
                        rows={2}
                        value={veloraConfig.contactLead}
                        onChange={(e) =>
                          setVeloraConfig((p) => ({ ...p, contactLead: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={veloraConfig.contactEmail}
                        onChange={(e) =>
                          setVeloraConfig((p) => ({ ...p, contactEmail: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={veloraConfig.contactHours}
                        onChange={(e) =>
                          setVeloraConfig((p) => ({ ...p, contactHours: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                      />
                    </div>
                  )}

                  {/* VELORA SECTION 10: FOOTER */}
                  {veloraEditorTab === 'footer' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                        <p className="text-xs text-white/90">
                          <strong>10. Footer Section:</strong> Edit addresses, tagline, and copyright.
                        </p>
                      </div>
                      <input
                        type="text"
                        value={veloraConfig.footerTagline}
                        onChange={(e) =>
                          setVeloraConfig((p) => ({ ...p, footerTagline: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={veloraConfig.footerStudioAddress}
                        onChange={(e) =>
                          setVeloraConfig((p) => ({ ...p, footerStudioAddress: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={veloraConfig.footerLabAddress}
                        onChange={(e) =>
                          setVeloraConfig((p) => ({ ...p, footerLabAddress: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={veloraConfig.footerCopyright}
                        onChange={(e) =>
                          setVeloraConfig((p) => ({ ...p, footerCopyright: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                      />
                    </div>
                  )}

                  {/* VELORA SECTION 11: CUSTOM HTML */}
                  {veloraEditorTab === 'html' && (
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-2xl bg-[#c4506a]/15 border border-[#c4506a]/40 space-y-2">
                        <p className="text-xs text-white/90 font-semibold">
                          Direct HTML File Loader
                        </p>
                        <p className="text-[11px] text-white/70 leading-relaxed">
                          The default preview runs the complete <strong>Velora Botanics — 3D Clean Beauty</strong> HTML + Three.js website. You can also upload any custom <code className="text-pink-300">.html</code> file from your computer.
                        </p>
                      </div>
                      <input
                        ref={htmlFileInputRef}
                        type="file"
                        accept=".html,.htm,text/html"
                        onChange={handleHtmlFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => htmlFileInputRef.current?.click()}
                        className="w-full py-3 px-4 rounded-xl bg-[#c4506a] hover:bg-[#d45d79] text-white font-mono text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload .HTML File from Computer</span>
                      </button>
                      {veloraConfig.customHtmlOverride && (
                        <button
                          type="button"
                          onClick={() =>
                            setVeloraConfig((p) => ({ ...p, customHtmlOverride: null }))
                          }
                          className="w-full py-2.5 px-4 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 font-mono text-xs uppercase tracking-[0.14em] cursor-pointer"
                        >
                          Restore Built-in Velora Botanics 3D Demo
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* SECTION 01: BRAND & NAVBAR */}
                  {editorTab === 'brand' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/30">
                        <p className="text-xs text-white/90 leading-relaxed">
                          <strong>01. Brand &amp; Navigation Bar:</strong> Changes here update the <strong>3D Aluminum Cans</strong>, the <strong>3D Variety Box</strong>, the <strong>3D Glass Bottle Label</strong>, and the top Navbar in real time.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5">
                          Brand Name (Printed on 3D Cans, Box &amp; Bottle)
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.brandName}
                          onChange={(e) =>
                            setFizzoConfig((prev) => ({ ...prev, brandName: e.target.value }))
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5">
                          Brand Logo (Wrapped on 3D Canister &amp; Navbar)
                        </label>
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => logoInputRef.current?.click()}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-dashed border-white/25 text-xs font-mono uppercase tracking-[0.14em] text-white cursor-pointer"
                          >
                            <Upload className="w-4 h-4 text-[#FF5500]" />
                            <span>
                              {fizzoConfig.logoImageUrl ? 'Change Logo' : 'Upload Logo (PNG/SVG)'}
                            </span>
                          </button>

                          {fizzoConfig.logoImageUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                setFizzoConfig((prev) => ({ ...prev, logoImageUrl: null }))
                              }
                              className="px-3 py-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-xs font-mono text-rose-200 cursor-pointer"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>

                      <ImageCustomizerField
                        label="Preloader Can Logo & Emblem"
                        sublabel="Displays inside the animated preloader can on startup"
                        value={fizzoConfig.loaderImageUrl}
                        onChange={(url) => setFizzoConfig((prev) => ({ ...prev, loaderImageUrl: url }))}
                        accentColor="#FF5500"
                        placeholder="https://..."
                        presetImages={[
                          { label: 'Craft Soda Emblem', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80' },
                          { label: 'Cold-Pressed Citrus Mark', url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&auto=format&fit=crop&q=80' },
                          { label: 'Botanical Wave Crest', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80' },
                        ]}
                      />

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5">
                          Navbar Menu Links (5 Links)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {fizzoConfig.navLinks.map((lnk, idx) => (
                            <input
                              key={idx}
                              type="text"
                              value={lnk}
                              onChange={(e) => updateNavLink(idx, e.target.value)}
                              className="px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#FF5500]"
                              placeholder={`Link ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5">
                          Navbar CTA Button Text
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.navCtaText}
                          onChange={(e) =>
                            setFizzoConfig((prev) => ({ ...prev, navCtaText: e.target.value }))
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                        />
                      </div>
                    </div>
                  )}

                  {/* SECTION 02: HERO HEADER */}
                  {editorTab === 'hero' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30">
                        <p className="text-xs text-white/90">
                          <strong>02. Hero Header Section:</strong> Customize the main headline, badge, description, and scroll prompt behind the floating 3D Hero Can.
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5">
                          Hero Badge Pill
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.heroBadge}
                          onChange={(e) =>
                            setFizzoConfig((prev) => ({ ...prev, heroBadge: e.target.value }))
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Title Line 1
                          </label>
                          <input
                            type="text"
                            value={fizzoConfig.heroTitleLine1}
                            onChange={(e) =>
                              setFizzoConfig((prev) => ({
                                ...prev,
                                heroTitleLine1: e.target.value,
                              }))
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Stroke Word
                          </label>
                          <input
                            type="text"
                            value={fizzoConfig.heroTitleStroke}
                            onChange={(e) =>
                              setFizzoConfig((prev) => ({
                                ...prev,
                                heroTitleStroke: e.target.value,
                              }))
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Title Line 3
                          </label>
                          <input
                            type="text"
                            value={fizzoConfig.heroTitleLine3}
                            onChange={(e) =>
                              setFizzoConfig((prev) => ({
                                ...prev,
                                heroTitleLine3: e.target.value,
                              }))
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5">
                          Hero Paragraph Description
                        </label>
                        <textarea
                          rows={3}
                          value={fizzoConfig.heroSubtext}
                          onChange={(e) =>
                            setFizzoConfig((prev) => ({ ...prev, heroSubtext: e.target.value }))
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#FF5500]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-1.5">
                          Bottom Scroll Hint Text
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.heroScrollHint}
                          onChange={(e) =>
                            setFizzoConfig((prev) => ({
                              ...prev,
                              heroScrollHint: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Promo Badge Line 1
                          </label>
                          <input
                            type="text"
                            value={fizzoConfig.promoBadgeTop || 'BUY 1'}
                            onChange={(e) =>
                              setFizzoConfig((prev) => ({
                                ...prev,
                                promoBadgeTop: e.target.value,
                              }))
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Promo Badge Line 2
                          </label>
                          <input
                            type="text"
                            value={fizzoConfig.promoBadgeBottom || 'GET 1'}
                            onChange={(e) =>
                              setFizzoConfig((prev) => ({
                                ...prev,
                                promoBadgeBottom: e.target.value,
                              }))
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Free Code
                          </label>
                          <input
                            type="text"
                            value={fizzoConfig.promoCode || 'FIZZ20'}
                            onChange={(e) =>
                              setFizzoConfig((prev) => ({
                                ...prev,
                                promoCode: e.target.value,
                              }))
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 03: 4 FLAVOR CANS & CARDS */}
                  {editorTab === 'flavors' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-white/60 mb-2">
                          Select Flavor Can / Card (Click on site or pick 1-4)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {fizzoConfig.flavors.map((flav, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActiveFlavorIndex(idx)}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                                activeFlavorIndex === idx
                                  ? 'bg-white/15 border-[#FF5500] text-white shadow-md'
                                  : 'bg-white/[0.03] border-white/10 text-white/65 hover:text-white'
                              }`}
                            >
                              <span
                                className="w-4 h-4 rounded-full shrink-0 border border-white/40"
                                style={{ background: flav.canHex }}
                              />
                              <div className="truncate">
                                <div className="text-xs font-bold truncate">{flav.name}</div>
                                <div className="text-[10px] font-mono text-white/50">
                                  {flav.price}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5">
                        <ImageCustomizerField
                          label={`${currentEditedFlavor.name} Custom Can Sleeve / Artwork`}
                          sublabel="Replaces or overlays artwork directly on the 3D can & lineup cards"
                          value={currentEditedFlavor.customImageUrl}
                          onChange={(url) => updateFlavorField(activeFlavorIndex, 'customImageUrl', url)}
                          accentColor={currentEditedFlavor.canHex || '#FF5500'}
                          placeholder="https://..."
                          presetImages={[
                            { label: 'Blood Orange Sunset', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80' },
                            { label: 'Wild Berry Botanical', url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80' },
                            { label: 'Crisp Lime Splash', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80' },
                            { label: 'Vintage Soda Can', url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80' },
                          ]}
                        />

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Can Label Name
                            </label>
                            <input
                              type="text"
                              value={currentEditedFlavor.name}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'name', e.target.value)
                              }
                              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Badge Tag
                            </label>
                            <input
                              type="text"
                              value={currentEditedFlavor.badge}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'badge', e.target.value)
                              }
                              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Can Subtitle (Printed on 3D Can)
                          </label>
                          <input
                            type="text"
                            value={currentEditedFlavor.sub}
                            onChange={(e) =>
                              updateFlavorField(activeFlavorIndex, 'sub', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Tasting Notes (Spec Table)
                            </label>
                            <input
                              type="text"
                              value={currentEditedFlavor.tastingNotes || ''}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'tastingNotes', e.target.value)
                              }
                              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Caffeine Content
                            </label>
                            <input
                              type="text"
                              value={currentEditedFlavor.caffeine || '0 mg'}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'caffeine', e.target.value)
                              }
                              className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Flavor Description
                          </label>
                          <textarea
                            rows={2}
                            value={currentEditedFlavor.desc}
                            onChange={(e) =>
                              updateFlavorField(activeFlavorIndex, 'desc', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>

                        {/* Macros Row */}
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Calories
                            </label>
                            <input
                              type="text"
                              value={currentEditedFlavor.calories}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'calories', e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Sugar
                            </label>
                            <input
                              type="text"
                              value={currentEditedFlavor.sugar}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'sugar', e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Prebiotic Fiber
                            </label>
                            <input
                              type="text"
                              value={currentEditedFlavor.fiber}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'fiber', e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                        </div>

                        {/* Price, Pack Size & CTA Button */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Price Tag
                            </label>
                            <input
                              type="text"
                              value={currentEditedFlavor.price}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'price', e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Pack Sub-label
                            </label>
                            <input
                              type="text"
                              value={currentEditedFlavor.packLabel}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'packLabel', e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Buy Button Text
                          </label>
                          <input
                            type="text"
                            value={currentEditedFlavor.ctaText}
                            onChange={(e) =>
                              updateFlavorField(activeFlavorIndex, 'ctaText', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>

                        {/* 3 Colors */}
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              3D Can Color
                            </label>
                            <input
                              type="color"
                              value={currentEditedFlavor.canHex}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'canHex', e.target.value)
                              }
                              className="w-full h-9 rounded-lg cursor-pointer bg-transparent border border-white/20"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Section BG
                            </label>
                            <input
                              type="color"
                              value={currentEditedFlavor.bgHex}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'bgHex', e.target.value)
                              }
                              className="w-full h-9 rounded-lg cursor-pointer bg-transparent border border-white/20"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                              Accent Glow
                            </label>
                            <input
                              type="color"
                              value={currentEditedFlavor.accentHex}
                              onChange={(e) =>
                                updateFlavorField(activeFlavorIndex, 'accentHex', e.target.value)
                              }
                              className="w-full h-9 rounded-lg cursor-pointer bg-transparent border border-white/20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 04: MARQUEE RIBBON */}
                  {editorTab === 'marquee' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                        <p className="text-xs text-white/85">
                          <strong>04. Scrolling Marquee Ribbon:</strong> Edit the 5 bold callout phrases that scroll across the angled white ticker bar.
                        </p>
                      </div>
                      {fizzoConfig.marqueeItems.map((item, idx) => (
                        <div key={idx}>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Marquee Item #{idx + 1}
                          </label>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => updateMarqueeItem(idx, e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION 05: 3D VARIETY BOX PACKING STAGE */}
                  {editorTab === 'pack' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30">
                        <p className="text-xs text-white/90">
                          <strong>05. 3D Variety Box Packing Stage:</strong> Customize the card copy and 4-step choreography labels (Open Crate → Drop 4 Cans → Fold Flaps → Tape Seal).
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Stage Badge
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.packBadge}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, packBadge: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={fizzoConfig.packTitleLine1}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, packTitleLine1: e.target.value }))
                          }
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={fizzoConfig.packTitleStroke}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, packTitleStroke: e.target.value }))
                          }
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={fizzoConfig.packTitleLine3}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, packTitleLine3: e.target.value }))
                          }
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={fizzoConfig.packSubtext}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, packSubtext: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          4 Choreography Step Pills
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {fizzoConfig.packSteps.map((st, idx) => (
                            <input
                              key={idx}
                              type="text"
                              value={st}
                              onChange={(e) => updateStepItem('packSteps', idx, e.target.value)}
                              className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 06: 3D GLASS POUR & FILL STAGE */}
                  {editorTab === 'fill' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/30">
                        <p className="text-xs text-white/90">
                          <strong>06. 3D Can Pour &amp; Glass Fill Stage:</strong> Customize the tumbler glass pour section and its 4 step indicators.
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Stage Badge
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.fillBadge}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, fillBadge: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={fizzoConfig.fillTitleLine1}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, fillTitleLine1: e.target.value }))
                          }
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={fizzoConfig.fillTitleStroke}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, fillTitleStroke: e.target.value }))
                          }
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={fizzoConfig.fillTitleLine3}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, fillTitleLine3: e.target.value }))
                          }
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={fizzoConfig.fillSubtext}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, fillSubtext: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          4 Pour &amp; Fill Step Pills
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {fizzoConfig.fillSteps.map((st, idx) => (
                            <input
                              key={idx}
                              type="text"
                              value={st}
                              onChange={(e) => updateStepItem('fillSteps', idx, e.target.value)}
                              className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 07: 3D CRAFT BOTTLE FILL & CROWN SEAL STAGE */}
                  {editorTab === 'bottle' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-400/30">
                        <p className="text-xs text-white/90">
                          <strong>07. 3D Craft Glass Bottle Fill &amp; Crown Cap Stage:</strong> Customize the bottle filling &amp; crown-capping choreography section.
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Stage Badge
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.bottleBadge}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, bottleBadge: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={fizzoConfig.bottleTitleLine1}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, bottleTitleLine1: e.target.value }))
                          }
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={fizzoConfig.bottleTitleStroke}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, bottleTitleStroke: e.target.value }))
                          }
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={fizzoConfig.bottleTitleLine3}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, bottleTitleLine3: e.target.value }))
                          }
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={fizzoConfig.bottleSubtext}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, bottleSubtext: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          4 Bottle Fill Step Pills
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {fizzoConfig.bottleSteps.map((st, idx) => (
                            <input
                              key={idx}
                              type="text"
                              value={st}
                              onChange={(e) => updateStepItem('bottleSteps', idx, e.target.value)}
                              className="px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 08: NUTRITION FACTS & INGREDIENTS */}
                  {editorTab === 'nutrition' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/30">
                        <p className="text-xs text-white/90">
                          <strong>08. Nutrition Facts &amp; Formula:</strong> Edit the FDA-style nutrition card and botanical ingredient list.
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Section Badge
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.nutritionBadge}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, nutritionBadge: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Section Heading
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.nutritionTitle}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, nutritionTitle: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Section Description
                        </label>
                        <textarea
                          rows={2}
                          value={fizzoConfig.nutritionSubtitle}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, nutritionSubtitle: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Serving Size
                          </label>
                          <input
                            type="text"
                            value={fizzoConfig.nutritionServing}
                            onChange={(e) =>
                              setFizzoConfig((p) => ({ ...p, nutritionServing: e.target.value }))
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Calories Count
                          </label>
                          <input
                            type="text"
                            value={fizzoConfig.nutritionCalories}
                            onChange={(e) =>
                              setFizzoConfig((p) => ({ ...p, nutritionCalories: e.target.value }))
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Nutrition Rows (Label / Amount / %DV)
                        </label>
                        <div className="space-y-1.5">
                          {fizzoConfig.nutritionFacts.map((row, idx) => (
                            <div key={idx} className="grid grid-cols-3 gap-1.5">
                              <input
                                type="text"
                                value={row.label}
                                onChange={(e) => updateNutritionFact(idx, 'label', e.target.value)}
                                className="px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-[11px] text-white"
                              />
                              <input
                                type="text"
                                value={row.amount}
                                onChange={(e) => updateNutritionFact(idx, 'amount', e.target.value)}
                                className="px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-[11px] text-white"
                              />
                              <input
                                type="text"
                                value={row.dv}
                                onChange={(e) => updateNutritionFact(idx, 'dv', e.target.value)}
                                className="px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-[11px] text-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Clean Ingredients List
                        </label>
                        <textarea
                          rows={2}
                          value={fizzoConfig.nutritionIngredients}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({
                              ...p,
                              nutritionIngredients: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* SECTION 09: CUSTOMER REVIEWS */}
                  {editorTab === 'reviews' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30">
                        <p className="text-xs text-white/90">
                          <strong>09. Customer Reviews Grid:</strong> Customize the social proof headline and 3 verified sipper testimonials.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Reviews Badge
                          </label>
                          <input
                            type="text"
                            value={fizzoConfig.reviewsBadge}
                            onChange={(e) =>
                              setFizzoConfig((p) => ({ ...p, reviewsBadge: e.target.value }))
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={fizzoConfig.reviewsTitle}
                            onChange={(e) =>
                              setFizzoConfig((p) => ({ ...p, reviewsTitle: e.target.value }))
                            }
                            className="w-full px-2.5 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>

                      {fizzoConfig.reviews.map((rev, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                        >
                          <div className="text-[10px] font-mono uppercase text-[#FF5500]">
                            Review Card #{idx + 1}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={rev.name}
                              onChange={(e) => updateReviewItem(idx, 'name', e.target.value)}
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                              placeholder="Reviewer Name"
                            />
                            <input
                              type="text"
                              value={rev.role}
                              onChange={(e) => updateReviewItem(idx, 'role', e.target.value)}
                              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                              placeholder="Role / Tag"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={rev.quote}
                            onChange={(e) => updateReviewItem(idx, 'quote', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION 10: FOOTER CTA */}
                  {editorTab === 'footer' && (
                    <div className="space-y-3.5">
                      <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                        <p className="text-xs text-white/90">
                          <strong>10. Footer Section:</strong> Edit the giant footer title, subtext, CTA button, and copyright line.
                        </p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Giant Footer Title
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.footerTitle}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, footerTitle: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Footer Subtext
                        </label>
                        <textarea
                          rows={2}
                          value={fizzoConfig.footerSubtext}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, footerSubtext: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Footer CTA Button
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.footerCtaText}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, footerCtaText: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-white/60 mb-1">
                          Copyright Notice
                        </label>
                        <input
                          type="text"
                          value={fizzoConfig.footerCopyright}
                          onChange={(e) =>
                            setFizzoConfig((p) => ({ ...p, footerCopyright: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* SECTION 11: CUSTOM HTML FILE IMPORTER */}
                  {editorTab === 'html' && (
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/30 space-y-2">
                        <p className="text-xs text-white/90 font-semibold">
                          Direct HTML File Loader
                        </p>
                        <p className="text-[11px] text-white/70 leading-relaxed">
                          The default preview runs the complete <strong>FIZZO — Cinematic 3D</strong> HTML + Three.js + GSAP ScrollTrigger website. You can also upload any custom <code className="text-amber-300">.html</code> file from your computer to preview it live.
                        </p>
                      </div>

                      <input
                        ref={htmlFileInputRef}
                        type="file"
                        accept=".html,.htm,text/html"
                        onChange={handleHtmlFileUpload}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => htmlFileInputRef.current?.click()}
                        className="w-full py-3 px-4 rounded-xl bg-[#FF5500] hover:bg-[#FF6A1A] text-white font-mono text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload .HTML File from Computer</span>
                      </button>

                      {fizzoConfig.customHtmlOverride && (
                        <button
                          type="button"
                          onClick={() =>
                            setFizzoConfig((p) => ({ ...p, customHtmlOverride: null }))
                          }
                          className="w-full py-2.5 px-4 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200 font-mono text-xs uppercase tracking-[0.14em] cursor-pointer"
                        >
                          Restore Built-in FIZZO 3D Demo
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </aside>
        )}

        {/* Floating button to re-open editor if hidden */}
        {!isFullPreview && !isEditorOpen && (
          <button
            type="button"
            onClick={() => setIsEditorOpen(true)}
            style={{ backgroundColor: studioAccent }}
            className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full text-white font-mono text-xs uppercase tracking-[0.16em] font-bold shadow-2xl cursor-pointer hover:scale-105 transition-transform"
          >
            <Edit3 className="w-4 h-4" />
            <span>Open Customizer</span>
          </button>
        )}

        {/* RIGHT: LIVE CLICK-TO-EDIT 3D WEBSITE IFRAME (FIZZO, VELORA, MELTO, ZAIKA OR UNIVERSAL) */}
        <div
          className={`flex-1 h-full relative overflow-hidden ${
            isMelto
              ? 'bg-[#fff3ea]'
              : isZaika
                ? 'bg-[#f4eadb]'
                : isUniversal
                  ? 'bg-[#04070F]'
                  : isVelora
                    ? 'bg-[#fbf1ee]'
                    : 'bg-[#1a0a00]'
          }`}
        >
          {isMelto ? (
            <MeltoLiveFrame
              config={meltoConfig}
              selectedSection={simpleEditorTab}
              selectedProductIndex={activeSimpleProductIndex}
              inspectorEnabled={inspectorEnabled && !isFullPreview}
              onSelectElement={handleSelectSimpleElementFromPreview}
              onInlineTextChange={(field, val) => {
                setMeltoConfig((prev) => ({ ...prev, [field]: val }));
              }}
            />
          ) : isZaika ? (
            <ZaikaLiveFrame
              config={zaikaConfig}
              selectedSection={simpleEditorTab}
              selectedProductIndex={activeSimpleProductIndex}
              inspectorEnabled={inspectorEnabled && !isFullPreview}
              onSelectElement={handleSelectSimpleElementFromPreview}
              onInlineTextChange={(field, val) => {
                setZaikaConfig((prev) => ({ ...prev, [field]: val }));
              }}
            />
          ) : isUniversal ? (
            <Universal3DLiveFrame
              config={currentUniversalConfig}
              inspectorEnabled={inspectorEnabled && !isFullPreview}
              onSelectElement={handleSelectUniversalElement}
              onInlineTextChange={(path, val) => {
                setClickedTextPath(path);
                setClickedTextValue(val);
                updateUniversalByPath(activeUniversalId, path, val);
              }}
            />
          ) : isVelora ? (
            <VeloraLiveFrame
              config={veloraConfig}
              selectedSection={veloraEditorTab}
              selectedProductIndex={activeVeloraProductIndex}
              inspectorEnabled={inspectorEnabled && !isFullPreview}
              onSelectElement={handleSelectVeloraElementFromPreview}
            />
          ) : (
            <FizzoLiveFrame
              config={fizzoConfig}
              selectedSection={editorTab}
              selectedFlavorIndex={activeFlavorIndex}
              inspectorEnabled={inspectorEnabled && !isFullPreview}
              onSelectElement={handleSelectElementFromPreview}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LetsBuildView;

