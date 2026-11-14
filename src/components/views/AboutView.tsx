import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Layers,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { MorphShape } from '../../data/morphShapes';
import { ViewType } from '../../types';
import {
  EFERZ_ABOUT_CONTENT,
  EFERZ_CONTACT_DETAILS,
} from '../../data/eferzSiteData';
import { OFFICIAL_EFERZ_SERVICES } from '../../data/servicesData';
import { TEAM_MEMBERS } from '../../data/agencyData';
import { VerticalWheelRail } from '../VerticalWheelRail';
import { serviceScrollAudio } from '../../utils/serviceScrollAudio';
import { PaintText } from '../PaintText';
import { useLocale } from '../../utils/LocaleContext';
import { SERVICE_ARABIC_MAP } from '../../utils/serviceTranslations';

interface AboutViewProps {
  onSelectShape?: (
    shape: MorphShape,
    scheme?: 'white' | 'cyan' | 'amber' | 'emerald' | 'red'
  ) => void;
  onNavigate: (view: ViewType) => void;
  onStartProject: () => void;
}

interface AboutChapter {
  id: string;
  label: string;
  labelAr: string;
  shortLabel: string;
  shortLabelAr: string;
  subtitle: string;
  subtitleAr: string;
  shape: MorphShape;
  scheme: 'white' | 'cyan' | 'amber' | 'emerald' | 'red';
  accent: string;
}

const ABOUT_CHAPTERS: AboutChapter[] = [
  {
    id: 'identity',
    label: 'Agency Overview',
    labelAr: 'نظرة عامة على الوكالة',
    shortLabel: 'Overview',
    shortLabelAr: 'نظرة عامة',
    subtitle: 'GLOBAL DIGITAL ENGINEERING POWERHOUSE',
    subtitleAr: 'قوة الهندسة الرقمية والابتكار العالمي',
    shape: 'anniversary',
    scheme: 'red',
    accent: '#d02128',
  },
  {
    id: 'mission',
    label: 'Our Story & Mission',
    labelAr: 'قصتنا ورسالتنا',
    shortLabel: 'Story & Mission',
    shortLabelAr: 'قصتنا ورسالتنا',
    subtitle: 'NOTHING IS IMPOSSIBLE IN THE IT WORLD',
    subtitleAr: 'لا شيء مستحيل في عالم التقنية',
    shape: 'rocket',
    scheme: 'cyan',
    accent: '#d02128',
  },
  {
    id: 'principles',
    label: 'Core Principles',
    labelAr: 'المبادئ الأساسية',
    shortLabel: 'Core Principles',
    shortLabelAr: 'المبادئ الأساسية',
    subtitle: '4 PILLARS OF EFERZ EXCELLENCE',
    subtitleAr: 'الركائز الأربع لتميز إيفرز (EFerz)',
    shape: 'compass',
    scheme: 'emerald',
    accent: '#d02128',
  },
  {
    id: 'capabilities',
    label: 'Digital Capabilities',
    labelAr: 'القدرات الرقمية',
    shortLabel: 'Capabilities',
    shortLabelAr: 'القدرات',
    subtitle: 'SPECIALIZED ENGINEERING & GROWTH DEPARTMENTS',
    subtitleAr: 'أقسام الهندسة الرقمية والنمو المتخصصة',
    shape: 'layers_grid',
    scheme: 'amber',
    accent: '#d02128',
  },
  {
    id: 'hubs',
    label: 'Global Headquarters',
    labelAr: 'المقرات العالمية',
    shortLabel: 'Global Hubs',
    shortLabelAr: 'المقرات العالمية',
    subtitle: 'USA · KSA · PAK',
    subtitleAr: 'الولايات المتحدة · السعودية · باكستان',
    shape: 'hq_pins',
    scheme: 'red',
    accent: '#d02128',
  },
];

const ARABIC_ABOUT_DATA = {
  kicker: 'عن وكالة إيفرز الرقمية (EFERZ) · تأسست في 10 أكتوبر 2020',
  headline:
    'قوة رقمية عالمية لبناء العلامات التجارية، وتطوير المواقع عالية التحويل، وتأمين الأنظمة حول العالم.',
  subheadline:
    'يقع مقرنا الرئيسي في الولايات المتحدة الأمريكية مع مكاتب إقليمية في المملكة العربية السعودية وباكستان، ونستقبل ونخدم العملاء في جميع أنحاء العالم عبر كافة خدماتنا الرقمية والتقنية.',
  storyParagraphs: [
    'تأسست وكالة إيفرز الرقمية (EFerz) في 10 أكتوبر 2020 على قناعة راسخة: "لا شيء مستحيل في عالم التقنية". ومن خلال مقرنا الرئيسي في فورت لودرديل بولاية فلوريدا (الولايات المتحدة الأمريكية) ومكاتبنا الإقليمية في مدينة الرياض (المملكة العربية السعودية) وكراتشي (باكستان)، نستقبل ونخدم الشركات والعلامات التجارية دولياً في جميع أنحاء العالم.',
    'بدلاً من تشتيت حضورك الرقمي بين عدة جهات منفصلة، تعمل EFerz كشريك تقني وإبداعي موحد لعملائنا عالمياً؛ من هندسة المواقع المخصصة ومتاجر Shopify Plus و WooCommerce، إلى توسيع مبيعات أمازون FBA، وتنفيذ حملات السيو والإعلانات الممولة، وتحصين البنية التحتية بالأمن السيبراني المتقدم.',
    'بالإضافة إلى خدمات الوكالة الرقمية العالمية، تدير الشركة قطاع EFerz Connect في جنوب فلوريدا لتقديم خدمات الإنترنت فائق السرعة للمنازل والشركات مع دعم فني متواصل على مدار الساعة 24/7.',
  ],
  coreValues: [
    {
      code: '01',
      title: 'جودة وإتقان بلا مساومة',
      description:
        'يتم بناء كل سطر برمجي، وواجهة مستخدم، وحملة تسويقية وفق أعلى المعايير المؤسسية مع اختبارات جودة شاملة قبل الإطلاق.',
    },
    {
      code: '02',
      title: 'تعاون شفاف ومباشر عالمياً',
      description:
        'تواصل مباشر، خارطة طريق واضحة للمراحل، وتقارير أداء دقيقة تضمن تمكين عملائنا الدوليين في كل خطوة من خطوات التنفيذ.',
    },
    {
      code: '03',
      title: 'إتقان رقمي شامل حول العالم',
      description:
        '11 قسماً رقمياً متخصصاً — المواقع، المتاجر الإلكترونية، أمازون FBA، التسويق، التواصل الاجتماعي، المحتوى، الجرافيك، الهوية، الاستشارات، الأمن السيبراني، وخدمات الإنترنت.',
    },
    {
      code: '04',
      title: 'رضا العملاء أولاً',
      description:
        'مدعومون بالتزامنا بضمان الرضا لمدة 30 يوماً، وملكية كاملة 100%، وشراكة طويلة الأمد مع أكثر من 60 علامة تجارية حول العالم.',
    },
  ],
  milestones: [
    { value: '2020', label: 'تأسست في 10 أكتوبر 2020' },
    { value: '11+', label: 'أقسام تقنية ورقمية متخصصة' },
    { value: '60+', label: 'علامة تجارية وعملاء حول العالم' },
    { value: '99.9%', label: 'ضمان استقرار وأمان الأنظمة' },
  ],
};

export const AboutView: React.FC<AboutViewProps> = ({
  onSelectShape,
  onNavigate,
  onStartProject,
}) => {
  const { lang, isRTL } = useLocale();
  const isAr = lang === 'ar';

  const [activeIndex, setActiveIndex] = useState(0);
  const lastWheelTime = useRef<number>(0);
  const touchStartY = useRef<number | null>(null);

  const activeChapter = ABOUT_CHAPTERS[activeIndex] || ABOUT_CHAPTERS[0];

  useEffect(() => {
    if (onSelectShape) {
      onSelectShape(activeChapter.shape, activeChapter.scheme);
    }
  }, [activeChapter, onSelectShape]);

  const handleSelectIndex = useCallback((nextIdx: number) => {
    const normalized =
      ((nextIdx % ABOUT_CHAPTERS.length) + ABOUT_CHAPTERS.length) %
      ABOUT_CHAPTERS.length;
    setActiveIndex((prev) => {
      if (prev !== normalized) {
        serviceScrollAudio.playChapterTransition(normalized);
      }
      return normalized;
    });
  }, []);

  // Smooth Wheel / Trackpad Navigation
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 16) return;
      const now = performance.now();
      if (now - lastWheelTime.current < 420) return;
      lastWheelTime.current = now;

      if (e.deltaY > 0) {
        handleSelectIndex(activeIndex + 1);
      } else {
        handleSelectIndex(activeIndex - 1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [activeIndex, handleSelectIndex]);

  // Keyboard Arrow Navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleSelectIndex(activeIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSelectIndex(activeIndex - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, handleSelectIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 40) {
      if (deltaY > 0) handleSelectIndex(activeIndex + 1);
      else handleSelectIndex(activeIndex - 1);
    }
    touchStartY.current = null;
  };

  const milestones = isAr
    ? ARABIC_ABOUT_DATA.milestones
    : EFERZ_ABOUT_CONTENT.milestones;
  const coreValues = isAr
    ? ARABIC_ABOUT_DATA.coreValues
    : EFERZ_ABOUT_CONTENT.coreValues;
  const storyParagraphs = isAr
    ? ARABIC_ABOUT_DATA.storyParagraphs
    : EFERZ_ABOUT_CONTENT.storyParagraphs;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden text-white text-emboss select-none"
    >
      {/* Subtle Radial Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 60% 48%, ${activeChapter.accent}14 0%, rgba(4,6,14,0.22) 55%, rgba(2,4,9,0.55) 100%)`,
        }}
      />

      {/* =================================================================== */}
      {/* VERTICAL 3D WHEEL RAIL (Left in LTR, Right in RTL)                  */}
      {/* =================================================================== */}
      <VerticalWheelRail
        items={ABOUT_CHAPTERS.map((chap) => ({
          id: chap.id,
          label: chap.label,
          labelAr: chap.labelAr,
          accentColor: chap.accent,
        }))}
        activeIndex={activeIndex}
        onSelect={handleSelectIndex}
        defaultAccent={activeChapter.accent}
        includeIntro={false}
      />

      {/* =================================================================== */}
      {/* MAIN INTERACTIVE VIEWPORT STAGE                                     */}
      {/* =================================================================== */}
      <div
        className={`relative z-10 w-full h-full flex flex-col justify-between pt-[76px] sm:pt-[84px] pb-24 sm:pb-20 md:pb-16 px-4 sm:px-8 ${
          isRTL
            ? 'md:pr-48 lg:pr-60 xl:pr-64 lg:pl-12'
            : 'md:pl-48 lg:pl-60 xl:pl-64 lg:pr-12'
        } max-w-[1600px] mx-auto overflow-y-auto overflow-x-hidden`}
      >
        {/* Top Interactive Chapter Bar (Mobile + Context Header) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: activeChapter.accent,
                boxShadow: `0 0 12px ${activeChapter.accent}`,
              }}
            />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/80">
              {isAr ? activeChapter.subtitleAr : activeChapter.subtitle}
            </span>
          </div>

          {/* Mobile / Tablet Quick Pills */}
          <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto max-w-full py-0.5">
            {ABOUT_CHAPTERS.map((c, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectIndex(idx)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#d02128] text-white font-bold'
                      : 'bg-white/[0.05] text-white/65 border border-white/10'
                  }`}
                >
                  {isAr ? c.shortLabelAr : c.shortLabel}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                serviceScrollAudio.playCardHoverTick();
                onNavigate('services');
              }}
              className="px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-[10px] font-mono uppercase tracking-[0.18em] text-white/85 hover:text-white transition-all cursor-pointer"
            >
              {isAr ? 'استكشف الخدمات' : 'Explore Services'}
            </button>
            <button
              type="button"
              onClick={onStartProject}
              className="px-4 py-1.5 rounded-full bg-[#d02128] hover:bg-[#e01537] text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_20px_rgba(236,57,53,0.4)]"
            >
              <span>{isAr ? 'ابدأ مشروعك' : 'Start a Project'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Interactive Chapter Stage */}
        <div className="my-auto py-2 w-full">
          {/* CHAPTER 0: AGENCY OVERVIEW */}
          {activeIndex === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
              <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07090f]/75 border border-white/25 backdrop-blur-2xl">
                  <Sparkles className="w-3.5 h-3.5 text-[#d02128]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/90">
                    {isAr
                      ? ARABIC_ABOUT_DATA.kicker
                      : EFERZ_ABOUT_CONTENT.kicker}
                  </span>
                </div>

                <h1 className="text-xl sm:text-3xl xl:text-5xl font-display font-black tracking-tight leading-[1.1] text-white">
                  {isAr
                    ? ARABIC_ABOUT_DATA.headline
                    : EFERZ_ABOUT_CONTENT.headline}
                </h1>

                <p className="text-xs sm:text-sm xl:text-base text-white/80 leading-relaxed max-w-2xl">
                  {isAr
                    ? ARABIC_ABOUT_DATA.subheadline
                    : EFERZ_ABOUT_CONTENT.subheadline}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelectIndex(1)}
                    className="px-5 py-2.5 rounded-full bg-[#d02128] hover:bg-[#e01537] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_25px_rgba(236,57,53,0.4)]"
                  >
                    <span>{isAr ? 'اقرأ قصتنا' : 'Read Our Story'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('work')}
                    className="px-5 py-2.5 rounded-full bg-[#07090f]/75 hover:bg-white/[0.14] border border-white/25 backdrop-blur-2xl text-white font-mono text-xs uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>{isAr ? 'معرض الأعمال' : 'View Portfolio'}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#d02128]" />
                  </button>
                </div>
              </div>

              {/* Right 5 Cols: Milestones & Trust Matrix */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-5 rounded-2xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.22)] hover:border-[#d02128]/50 transition-all group"
                  >
                    <div className="text-xl sm:text-3xl xl:text-4xl font-display font-black text-white group-hover:text-[#d02128] transition-colors">
                      {m.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.14em] text-white/70 mt-1.5">
                      {m.label}
                    </div>
                  </div>
                ))}

                <div className="col-span-2 p-3.5 sm:p-4 rounded-2xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.22)] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#d02128] shrink-0" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-white">
                        {isAr
                          ? 'ملكية كاملة 100% وضمان استرجاع 30 يوماً'
                          : '100% Ownership & 30-Day Guarantee'}
                      </div>
                      <div className="text-[11px] text-white/65">
                        {isAr
                          ? 'تسليم بمعايير عالمية في أمريكا والسعودية وباكستان'
                          : 'Enterprise-grade delivery across USA, KSA & PAK'}
                      </div>
                    </div>
                  </div>
                  <Award className="w-5 h-5 text-[#d02128] shrink-0 hidden sm:block" />
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 1: OUR STORY & MISSION */}
          {activeIndex === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
              <div className="lg:col-span-7 rounded-3xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.28)] p-5 sm:p-7 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.26em] text-[#d02128]">
                    {isAr ? 'فلسفة إيفرز (EFERZ)' : 'THE EFERZ PHILOSOPHY'}
                  </div>
                  <h2 className="text-xl sm:text-3xl xl:text-4xl font-display font-black uppercase text-white tracking-tight">
                    <PaintText colorType="white" brushRadius={42} className="inline-block">
                      {isAr
                        ? 'لا شيء مستحيل في عالم التقنية.'
                        : 'Nothing Is Impossible In The IT World.'}
                    </PaintText>
                  </h2>
                  <div className="space-y-2.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                    {storyParagraphs.map((p, i) => (
                      <PaintText
                        key={i}
                        as="p"
                        colorType="white"
                        brushRadius={38}
                        className="m-0 leading-relaxed"
                      >
                        {p}
                      </PaintText>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-[#d02128]" />
                    <span>
                      {isAr
                        ? 'نخدم رواد الأعمال والشركات العالمية الكبرى'
                        : 'Serving Startup Founders to Enterprise Brands'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('team')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#d02128] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>
                      {isAr ? 'تعرف على فريق القيادة' : 'Meet Leadership Team'}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right 5 Cols: Executive Leadership Snapshot */}
              <div className="lg:col-span-5 rounded-3xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.28)] p-5 sm:p-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.24em] text-[#d02128] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>
                        {isAr ? 'القيادة التنفيذية' : 'EXECUTIVE LEADERSHIP'}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono text-white/50">
                      {isAr ? 'المديرون العالميون' : 'GLOBAL DIRECTORS'}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {TEAM_MEMBERS.slice(0, 4).map((member) => (
                      <div
                        key={member.name}
                        className="p-3 rounded-2xl bg-black/45 border border-white/15 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-white">
                            {member.name}
                          </div>
                          <div className="text-[11px] font-mono text-white/60">
                            {member.role}
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-[#d02128]/20 text-[#d02128]">
                          {isAr ? 'مدير تنفيذي' : 'DIRECTOR'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('team')}
                  className="w-full py-2.5 rounded-xl bg-black/50 hover:bg-[#d02128] border border-white/20 text-xs font-mono font-bold uppercase tracking-[0.2em] text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>
                    {isAr
                      ? 'استعراض فريق القيادة بالكامل'
                      : 'Open Full Team Showcase'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* CHAPTER 2: CORE PRINCIPLES */}
          {activeIndex === 2 && (
            <div className="space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#d02128] mb-1">
                    {isAr
                      ? 'لماذا تختار العلامات العالمية إيفرز'
                      : 'WHY GLOBAL BRANDS CHOOSE EFERZ'}
                  </div>
                  <h2 className="text-xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
                    {isAr
                      ? 'ركائزنا الأربع للهندسة والنمو'
                      : 'Our Four Engineering & Growth Pillars'}
                  </h2>
                </div>
                <span className="text-xs font-mono text-white/60">
                  {isAr
                    ? 'هندسة وتصميم بلا تنازلات'
                    : 'ZERO-COMPROMISE ARCHITECTURE & DESIGN'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {coreValues.map((val) => (
                  <div
                    key={val.code}
                    className="p-4 sm:p-5 rounded-3xl bg-[#07090f]/75 hover:bg-[#07090f]/90 border border-white/30 hover:border-[#d02128]/50 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[#d02128]/15 text-[#d02128] text-[10px] font-mono font-bold uppercase tracking-wider">
                          {isAr ? `الركيزة ${val.code}` : `PILLAR ${val.code}`}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-[#d02128]" />
                      </div>
                      <h3 className="text-base sm:text-lg font-display font-bold uppercase text-white group-hover:text-[#d02128] transition-colors">
                        {val.title}
                      </h3>
                      <p className="mt-2 text-xs text-white/75 leading-relaxed">
                        {val.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                      <span>{isAr ? 'معيار معتمد' : 'VERIFIED STANDARD'}</span>
                      <span className="text-white font-bold">100%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHAPTER 3: DIGITAL CAPABILITIES */}
          {activeIndex === 3 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#d02128] mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>
                      {isAr ? 'منظومة رقمية متكاملة' : 'FULL-SPECTRUM ECOSYSTEM'}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-3xl xl:text-4xl font-display font-black uppercase text-white tracking-tight">
                    {isAr
                      ? 'القدرات والأقسام الرقمية المتخصصة'
                      : 'Specialized Digital Capabilities'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d02128]/20 hover:bg-[#d02128] text-white border border-[#d02128]/40 text-xs font-mono font-bold uppercase tracking-[0.18em] transition-all cursor-pointer"
                >
                  <span>
                    {isAr
                      ? 'افتح معرض الخدمات التفاعلي'
                      : 'Open Interactive Services'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                {OFFICIAL_EFERZ_SERVICES.map((svc) => {
                  const arSvc = SERVICE_ARABIC_MAP[svc.id];
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => onNavigate('services')}
                      className={`group ${
                        isRTL ? 'text-right' : 'text-left'
                      } p-3.5 rounded-2xl bg-[#07090f]/75 hover:bg-[#07090f]/90 border border-white/25 hover:border-white/40 backdrop-blur-3xl shadow-[0_15px_45px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all cursor-pointer flex items-center justify-between gap-2.5`}
                    >
                      <div className="min-w-0">
                        <div className="text-[9px] font-mono font-bold uppercase tracking-wider truncate text-[#d02128]">
                          {isAr && arSvc
                            ? arSvc.environmentNameAr
                            : svc.environmentName}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#d02128] transition-colors truncate mt-0.5">
                          {isAr && arSvc ? arSvc.titleAr : svc.title}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#d02128]" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* CHAPTER 4: GLOBAL HEADQUARTERS (USA & KSA) */}
          {activeIndex === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
              {EFERZ_CONTACT_DETAILS.offices.map((office) => (
                <div
                  key={office.code}
                  className="lg:col-span-4 rounded-3xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.28)] p-4 sm:p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-white">
                        <Globe2 className="w-4 h-4 text-[#d02128]" />
                        <span>
                          {isAr
                            ? office.code === 'USA'
                              ? 'المقر الرئيسي: الولايات المتحدة (USA HQ)'
                              : office.code === 'KSA'
                              ? 'المكتب الإقليمي: السعودية (KSA)'
                              : 'المكتب الإقليمي: باكستان (PAK)'
                            : office.country}
                        </span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#d02128]/20 border border-[#d02128]/40 text-[#d02128] text-[10px] font-mono font-bold">
                        {isAr ? `مقر ${office.code}` : `${office.code} OFFICE`}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-black/45 border border-white/15 space-y-2">
                      <div className="flex items-start gap-2.5 text-xs text-white/85">
                        <MapPin className="w-4 h-4 text-[#d02128] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium leading-relaxed">
                            {office.address}
                          </div>
                          <div className="text-[11px] text-white/50 mt-0.5">
                            {isAr
                              ? 'يرجى الاتصال مسبقاً قبل الزيارة'
                              : office.note}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-black/45 border border-white/15 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-white/55">
                          {isAr
                            ? 'اتصال مباشر'
                            : office.phoneLabel || 'CALL'}
                        </span>
                        <a
                          href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
                          dir="ltr"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-[#d02128] transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#d02128]" />
                          <span>{office.phone}</span>
                        </a>
                      </div>

                      {office.whatsappPhone && office.whatsappLink && (
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <span className="text-[10px] font-mono uppercase text-white/75">
                            {isAr ? 'واتساب' : office.whatsappLabel || 'WHATSAPP'}
                          </span>
                          <a
                            href={office.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            dir="ltr"
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-[#d02128] transition-colors"
                          >
                            <span>{office.whatsappPhone}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#d02128]" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/65">
                    <span>{isAr ? 'المكتب الرسمي' : 'OFFICIAL DESK'}</span>
                    <a
                      href={`mailto:${office.email}`}
                      dir="ltr"
                      className="text-white hover:text-[#d02128] font-bold transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              ))}

              {/* Direct Project & Inquiry CTA Card */}
              <div className="lg:col-span-4 rounded-3xl bg-[#07090f]/75 border border-[#d02128]/50 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.28)] p-4 sm:p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#d02128]">
                    {isAr ? 'هل أنت مستعد للتوسع؟' : 'READY TO SCALE?'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white leading-tight">
                    {isAr
                      ? 'شارك النجاح مع وكالة إيفرز الرقمية'
                      : 'Partner With EFerz Digital Agency'}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {isAr
                      ? 'تواصل مباشرة مع مكاتبنا في فورت لودرديل أو الرياض، أو ابدأ طلب مشروعك المخصص الآن.'
                      : 'Reach out directly to our Fort Lauderdale or Riyadh offices, or launch a custom project brief right now.'}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-black/45 border border-white/15 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-white/60">
                      {isAr ? 'البريد العالمي' : 'GLOBAL EMAIL'}
                    </span>
                    <a
                      href={`mailto:${EFERZ_CONTACT_DETAILS.primaryEmail}`}
                      dir="ltr"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-[#d02128]"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#d02128]" />
                      <span>{EFERZ_CONTACT_DETAILS.primaryEmail}</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={onStartProject}
                    className="w-full py-3 rounded-xl bg-[#d02128] hover:bg-[#e01537] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(236,57,53,0.4)]"
                  >
                    <span>{isAr ? 'ابدأ مشروعك الآن' : 'Start a Project'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="w-full py-2.5 rounded-xl bg-black/45 hover:bg-white/[0.14] border border-white/20 text-white font-mono text-[11px] uppercase tracking-[0.2em] transition-all cursor-pointer"
                  >
                    {isAr ? 'افتح صفحة التواصل' : 'Open Contact Page'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Chapter Progress Dots */}
        <div className="hidden sm:flex items-center justify-between pt-2 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            {ABOUT_CHAPTERS.map((c, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectIndex(idx)}
                  className="group py-1 flex items-center gap-2 cursor-pointer"
                >
                  <span
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: active ? '28px' : '8px',
                      backgroundColor: active
                        ? activeChapter.accent
                        : 'rgba(255,255,255,0.22)',
                    }}
                  />
                </button>
              );
            })}
          </div>

          <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/50">
            {isAr ? activeChapter.labelAr : activeChapter.label}
          </div>
        </div>
      </div>
    </div>
  );
};
