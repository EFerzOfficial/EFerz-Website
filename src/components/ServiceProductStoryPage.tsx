import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronDown,
  Code2,
  Cpu,
  Layers,
  RotateCcw,
  ShieldCheck,
  Terminal,
  Zap,
} from 'lucide-react';
import { OfficialEFerzService } from '../data/servicesData';
import { MorphShape } from '../data/morphShapes';
import { serviceScrollAudio } from '../utils/serviceScrollAudio';
import { VerticalWheelRail } from './VerticalWheelRail';
import { useLocale } from '../utils/LocaleContext';
import { SERVICE_ARABIC_MAP } from '../utils/serviceTranslations';

interface ServiceProductStoryPageProps {
  service: OfficialEFerzService;
  allServices: OfficialEFerzService[];
  onBackToCatalog: () => void;
  onSelectService: (service: OfficialEFerzService) => void;
  onOrderService: () => void;
  onSelectShape?: (
    shape: MorphShape,
    scheme?: 'white' | 'cyan' | 'amber' | 'emerald' | 'red',
    direction?: 'down' | 'up',
    step?: 0 | 1 | 2 | 3
  ) => void;
}

const CHAPTER_LABELS = [
  { id: 0, label: 'Overview', labelAr: 'نظرة عامة' },
  { id: 1, label: 'What We Do', labelAr: 'ماذا نقدم' },
  { id: 2, label: 'Languages & Tools', labelAr: 'اللغات والأدوات' },
  { id: 3, label: 'Services Included', labelAr: 'الخدمات المشمولة' },
  { id: 4, label: 'Quality Guarantee', labelAr: 'ضمان الجودة' },
  { id: 5, label: 'Start a Project', labelAr: 'ابدأ مشروعك' },
];

export function ServiceProductStoryPage({
  service,
  onBackToCatalog,
  onOrderService,
  onSelectShape,
}: ServiceProductStoryPageProps) {
  const { lang, isRTL } = useLocale();
  const isAr = lang === 'ar';
  const arData = SERVICE_ARABIC_MAP[service.id];

  const [activeChapter, setActiveChapter] = useState(0);
  const [spacerHeightPx, setSpacerHeightPx] = useState<number>(3500);

  // Interactive UI states across chapters
  const [selectedHighlightIdx, setSelectedHighlightIdx] = useState(0);
  const [selectedToolIdx, setSelectedToolIdx] = useState(0);
  const [selectedCapabilityIdx, setSelectedCapabilityIdx] = useState(0);
  const [selectedGuaranteeIdx, setSelectedGuaranteeIdx] = useState(0);

  const totalChapters = CHAPTER_LABELS.length;
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const panelFxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentXRef = useRef(0);
  const lastActiveChapterRef = useRef(0);
  const onSelectShapeRef = useRef(onSelectShape);
  onSelectShapeRef.current = onSelectShape;
  const isRTLRef = useRef(isRTL);
  isRTLRef.current = isRTL;

  const getChapterShape = useCallback(
    (chapIdx: number): MorphShape => {
      switch (chapIdx) {
        case 0:
          return service.particleShape;
        case 1:
          return service.particleShape === 'compass' ? 'globe' : 'compass';
        case 2:
          return service.particleShape === 'brain' ? 'monitor' : 'brain';
        case 3:
          return service.particleShape === 'diamond' ? 'crown' : 'diamond';
        case 4:
          return 'shield';
        case 5:
          return 'envelope';
        default:
          return service.particleShape;
      }
    },
    [service.particleShape]
  );

  const getStepPx = useCallback(() => {
    const vh = typeof window !== 'undefined' ? window.innerHeight || 800 : 800;
    return Math.max(650, Math.round(vh * 1.1));
  }, []);

  const updateSpacerHeight = useCallback(() => {
    const vh = window.innerHeight || 900;
    const stepPx = getStepPx();
    const maxScroll = Math.round((totalChapters - 1) * stepPx);
    setSpacerHeightPx(vh + maxScroll);
  }, [totalChapters, getStepPx]);

  // Reset chapter and scroll to top when switching service page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    currentXRef.current = 0;
    lastActiveChapterRef.current = 0;
    setActiveChapter(0);
    setSelectedHighlightIdx(0);
    setSelectedToolIdx(0);
    setSelectedCapabilityIdx(0);
    setSelectedGuaranteeIdx(0);
    if (onSelectShapeRef.current) {
      onSelectShapeRef.current(service.particleShape, service.particleScheme, 'down', 0);
    }
    serviceScrollAudio.playServiceLaunch(service.id);
    updateSpacerHeight();
    window.addEventListener('resize', updateSpacerHeight);
    return () => window.removeEventListener('resize', updateSpacerHeight);
  }, [service.id, service.particleShape, service.particleScheme, updateSpacerHeight]);

  // Smoothly scroll window to a specific chapter index (used by Left Wheel & buttons)
  const scrollToChapter = useCallback(
    (targetIdx: number) => {
      const clamped = Math.max(0, Math.min(totalChapters - 1, targetIdx));
      const stepPx = getStepPx();
      window.scrollTo({
        top: clamped * stepPx,
        behavior: 'smooth',
      });
    },
    [totalChapters, getStepPx]
  );

  // Responsive smooth horizontal glide with ZERO text blur driven by vertical scroll
  useEffect(() => {
    let rafId: number;

    const updateScrollMath = () => {
      const o = window.innerWidth || 1920;
      const stepPx = getStepPx();
      const holdPx = Math.round(stepPx * 0.42); // 42% stationary center hold
      const maxScroll = Math.max(1, (totalChapters - 1) * stepPx);

      const rawScrollY = window.scrollY || window.pageYOffset || 0;
      const targetX = Math.min(maxScroll, Math.max(0, rawScrollY));

      // Smooth scrub interpolation (identical to Home Page 0.14 lerp)
      const prevX = currentXRef.current;
      currentXRef.current += (targetX - currentXRef.current) * 0.14;
      const velocity = currentXRef.current - prevX;

      const p = -currentXRef.current;

      // Update bottom progress bar
      if (progressBarRef.current) {
        const progress = Math.min(
          1,
          Math.max(0, currentXRef.current / maxScroll)
        );
        progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      const X = 1.65;
      const E = stepPx - holdPx;
      const visualScale = o / Math.max(1, E);
      const rtlSign = isRTLRef.current ? -1 : 1;

      let bestIdx = 0;
      let minAbsS = Infinity;
      let maxConvergence = 0;

      for (let k = 0; k < totalChapters; k++) {
        const fx = panelFxRefs.current[k];
        if (!fx) continue;

        const qLeft = k * stepPx;
        const f = p + qLeft;
        const H = holdPx;

        let rawS: number;
        if (f >= E) {
          rawS = f;
        } else if (f >= 0) {
          rawS = E * Math.pow(f / E, X);
        } else if (f >= -H) {
          rawS = 0; // Brief crisp center hold
        } else {
          const Z = -(f + H);
          rawS = Z <= E ? -E * Math.pow(Z / E, X) : f + H;
        }

        const S = rawS * visualScale * rtlSign;

        const panelConv = Math.max(0.28, 1 - Math.abs(S) / (o * 0.65));
        if (panelConv > maxConvergence) {
          maxConvergence = panelConv;
        }

        const score = Math.abs(S) + Math.abs(f + H * 0.5) * 0.001;
        if (score < minAbsS) {
          minAbsS = score;
          bestIdx = k;
        }

        const J = Math.abs(S) / o;
        const Q = Math.min(12, J * 22);
        const Y = Math.max(0, Math.min(1, 1 - J * 1.25));

        if (Y <= 0.005) {
          fx.style.opacity = '0';
          fx.style.visibility = 'hidden';
          fx.style.pointerEvents = 'none';
          fx.style.transform = `translate3d(${S.toFixed(2)}px, 0, 0)`;
          continue;
        }

        fx.style.visibility = 'visible';
        fx.style.transform = `translate3d(${S.toFixed(2)}px, 0, 0)`;
        // ZERO BLUR: text stays completely crisp and readable
        fx.style.filter = '';
        fx.style.opacity = Y.toFixed(3);
        fx.style.pointerEvents = Math.abs(S) < o * 0.25 ? 'auto' : 'none';
      }

      if (Math.abs(velocity) > 0.04) {
        window.dispatchEvent(
          new CustomEvent('cosmic-drift', {
            detail: {
              velocity: velocity * 0.08 * rtlSign,
              direction: 'horizontal',
              convergence: maxConvergence,
            },
          })
        );
      }

      if (bestIdx !== lastActiveChapterRef.current) {
        const dir = bestIdx > lastActiveChapterRef.current ? 'down' : 'up';
        lastActiveChapterRef.current = bestIdx;
        setActiveChapter(bestIdx);
        serviceScrollAudio.playChapterTransition(bestIdx, service.id);
        if (onSelectShapeRef.current) {
          onSelectShapeRef.current(
            getChapterShape(bestIdx),
            service.particleScheme,
            dir,
            0
          );
        }
      }

      rafId = requestAnimationFrame(updateScrollMath);
    };

    rafId = requestAnimationFrame(updateScrollMath);
    return () => cancelAnimationFrame(rafId);
  }, [totalChapters, service.id, service.particleScheme, getChapterShape, getStepPx]);

  // Controlled Wheel & Touch Swipe snapping (1 deliberate gesture = 1 chapter snap)
  useEffect(() => {
    let isLocked = false;
    let touchY: number | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 22) return;
      if (isLocked) {
        e.preventDefault();
        return;
      }

      const dir = e.deltaY > 0 ? 1 : -1;
      const current = lastActiveChapterRef.current;
      const next = Math.max(0, Math.min(totalChapters - 1, current + dir));

      if (next !== current) {
        e.preventDefault();
        isLocked = true;
        scrollToChapter(next);
        setTimeout(() => {
          isLocked = false;
        }, 600);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchY === null || isLocked) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 45) {
        const dir = dy > 0 ? 1 : -1;
        const current = lastActiveChapterRef.current;
        const next = Math.max(0, Math.min(totalChapters - 1, current + dir));
        if (next !== current) {
          isLocked = true;
          scrollToChapter(next);
          setTimeout(() => {
            isLocked = false;
          }, 550);
        }
      }
      touchY = null;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [totalChapters, scrollToChapter]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBackToCatalog();
      } else if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowRight' ||
        e.key === 'PageDown'
      ) {
        e.preventDefault();
        scrollToChapter(Math.min(totalChapters - 1, lastActiveChapterRef.current + 1));
      } else if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'PageUp'
      ) {
        e.preventDefault();
        scrollToChapter(Math.max(0, lastActiveChapterRef.current - 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToChapter(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToChapter(totalChapters - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollToChapter, totalChapters, onBackToCatalog]);

  const cleanNodeCode = (
    isAr && arData ? arData.primaryNodeCodeAr : service.storyCopy.primaryNodeCode
  ).replace(/^\d+\s*·\s*/, '');

  const activeCap =
    service.capabilities[selectedCapabilityIdx] || service.capabilities[0];
  const activeCapTitle =
    isAr && arData?.capabilitiesTitleAr[selectedCapabilityIdx]
      ? arData.capabilitiesTitleAr[selectedCapabilityIdx]
      : activeCap.title;
  const activeCapDesc =
    isAr && arData?.capabilitiesDescAr[selectedCapabilityIdx]
      ? arData.capabilitiesDescAr[selectedCapabilityIdx]
      : activeCap.description;

  const activeTool =
    service.platformTools[selectedToolIdx] || service.platformTools[0];
  const activeGuarantee =
    service.criteriaChecklist[selectedGuaranteeIdx] ||
    service.criteriaChecklist[0];

  const displayTitle = isAr && arData ? arData.titleAr : service.title;
  const displayEnv =
    isAr && arData ? arData.environmentNameAr : service.environmentName;
  const displayTagline = isAr && arData ? arData.taglineAr : service.tagline;
  const displaySummary = isAr && arData ? arData.summaryAr : service.summary;
  const displayOrbitalHeadline =
    isAr && arData
      ? arData.orbitalHeadlineAr
      : service.storyCopy.orbitalHeadline;
  const displayOrbitalSub =
    isAr && arData ? arData.orbitalSubAr : service.storyCopy.orbitalSub;
  const displayPrimaryNodeTitle =
    isAr && arData
      ? arData.primaryNodeTitleAr
      : service.storyCopy.primaryNodeTitle;
  const displayTelemetry =
    isAr && arData
      ? arData.primaryNodeTelemetryAr
      : service.storyCopy.primaryNodeTelemetry;
  const displayComputeSpec =
    isAr && arData
      ? arData.computeCoreSpecAr
      : service.storyCopy.computeCoreSpec;
  const displayComputeModel =
    isAr && arData
      ? arData.computeCoreModelAr
      : service.storyCopy.computeCoreModel;
  const displayIntelTitle =
    isAr && arData
      ? arData.intelligenceLayerTitleAr
      : service.storyCopy.intelligenceLayerTitle;
  const displayDeployTitle =
    isAr && arData
      ? arData.deploymentTitleAr
      : service.storyCopy.deploymentTitle;
  const displayDeployStatement =
    isAr && arData
      ? arData.deploymentStatementAr
      : service.storyCopy.deploymentStatement;

  const translateCategory = (cat: string) => {
    if (!isAr) return cat;
    const map: Record<string, string> = {
      'Frontend Architecture': 'هندسة الواجهات الأمامية',
      'Backend & APIs': 'الخوادم وواجهات البرمجة API',
      'CMS & E-Commerce': 'أنظمة إدارة المحتوى والمتاجر',
      'UI/UX & Prototyping': 'تصميم تجربة وواجهات المستخدم',
      'Database & Cloud': 'قواعد البيانات والسحابة',
      'Styling & Motion': 'التصميم الحركي والأنماط',
      'Search & Performance': 'محركات البحث والأداء',
      'Paid Media & ROAS': 'الإعلانات الممولة والعائد ROAS',
      'Analytics & Attribution': 'التحليلات وتتبع التحويلات',
      'Social Paid Acquisition': 'إعلانات منصات التواصل',
      'Conversion Optimization': 'تحسين معدل التحويل CRO',
      'Lifecycle Automation': 'أتمتة التسويق والولاء',
      'Enterprise Storefronts': 'منصات المتاجر الكبرى',
      'Flexible E-Commerce': 'التجارة الإلكترونية المرنة',
      'Global Payment Gateway': 'بوابات الدفع العالمية',
      'GCC Buy-Now-Pay-Later': 'الدفع الآجل في الخليج (تابي/تمارا)',
      'Headless Commerce': 'التجارة السحابية فائقة السرعة',
      'Fulfillment & ERP Sync': 'ربط الشحن والمخزون السحابي',
      'Marketplace Management': 'إدارة الأسواق العالمية',
      'Keyword & Product Research': 'أبحاث الكلمات والمنتجات الرابحة',
      'GCC Marketplace Growth': 'نمو الأسواق الخليجية (نون/أمازون)',
      'Sponsored Ads & ROAS': 'إعلانات الممول والعائد الإعلاني',
      'Omnichannel Retail': 'البيع متعدد القنوات',
      'Brand Registry & Visuals': 'حماية العلامة ومحتوى A+',
    };
    return map[cat] || 'تقنية معتمدة ضمن منظومة إيفرز';
  };

  const translateSlaStatus = (st: string) => {
    if (!isAr) return st;
    const map: Record<string, string> = {
      INCLUDED: 'مشمول',
      VERIFIED: 'معتمد',
      GUARANTEED: 'مضمون',
      ACTIVE: 'نشط',
      STANDARD: 'أساسي',
    };
    return map[st.toUpperCase()] || 'مضمون 100%';
  };

  const sectionPadClass = isRTL
    ? 'pt-20 pb-24 sm:pb-16 px-4 sm:px-8 md:pr-56 lg:pr-64 md:pl-10'
    : 'pt-20 pb-24 sm:pb-16 px-4 sm:px-8 md:pl-56 lg:pl-64 md:pr-10';

  return (
    <div className="relative w-full text-white text-emboss select-none">
      {/* Vertical Scroll Spacer: Provides natural native vertical page scrolling like Home Page */}
      <div
        aria-hidden="true"
        className="w-full pointer-events-none"
        style={{ height: `${spacerHeightPx}px` }}
      />

      {/* ============================================================
          SIDE 3D VERTICAL WHEEL RAIL FOR CHAPTERS
      ============================================================ */}
      <VerticalWheelRail
        items={CHAPTER_LABELS.map((chap) => ({
          id: `chapter-${chap.id}`,
          label: chap.label,
          labelAr: chap.labelAr,
          accentColor: '#d02128',
        }))}
        activeIndex={activeChapter}
        onSelect={(idx) => {
          if (idx >= 0 && idx < CHAPTER_LABELS.length) {
            scrollToChapter(idx);
          }
        }}
        includeIntro={false}
        defaultAccent="#d02128"
      />

      {/* ============================================================
          FIXED VIEWPORT STAGE — CONTINUOUS CUBIC MAGNETIC HOLD SCRUB
      ============================================================ */}
      <div className="fixed inset-0 w-full max-w-full h-screen overflow-hidden z-10 pointer-events-none">
        {/* Subtle radial vignette so the 3D Star/Particle icon in the background remains crisp */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${
              isRTL ? '45%' : '55%'
            } 50%, rgba(5,6,10,0.25) 0%, rgba(5,6,10,0.62) 100%)`,
          }}
        />

        {/* CHAPTER 0: OVERVIEW */}
        <section
          ref={(el) => {
            panelFxRefs.current[0] = el as HTMLDivElement | null;
          }}
          className={`absolute inset-0 w-full max-w-full h-screen flex items-center justify-center ${sectionPadClass} box-border will-change-[transform,filter,opacity] overflow-y-auto overflow-x-hidden md:overflow-visible`}
          style={{
            opacity: 1,
            visibility: 'visible',
            pointerEvents: 'auto',
          }}
        >
          <div className="w-full max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
            <div
              className="lg:col-span-7 relative rounded-3xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden"
              style={{
                boxShadow: `0 24px 60px -15px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.28), 0 0 30px -18px #d0212845`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, #d02128, rgba(255,255,255,0.5), transparent)`,
                }}
              />

              <div>
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] mb-2">
                  <span className="font-bold text-[#d02128]">
                    {displayTitle}
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/90">{displayEnv}</span>
                </div>

                <h1 className="text-xl sm:text-3xl xl:text-4xl font-display font-black uppercase tracking-tight leading-[1.06] text-white">
                  {displayOrbitalHeadline}
                </h1>

                <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm font-sans font-semibold leading-snug text-[#d02128]">
                  {displayTagline}
                </p>
                <p className="mt-1.5 text-xs text-white/95 leading-relaxed line-clamp-2">
                  {displaySummary}
                </p>
              </div>

              <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-white/20">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/85 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[#d02128]" />
                    <span>
                      {isAr ? 'التقنيات الأساسية المعتمدة' : 'CORE TECH STACK'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToChapter(2)}
                    className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#d02128] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>{isAr ? 'جميع الأدوات' : 'All Tools'}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.slice(0, 6).map((tech, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        serviceScrollAudio.playCardHoverTick();
                        scrollToChapter(2);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.14] hover:bg-white/[0.22] border border-white/25 text-[10px] font-mono text-white transition-all cursor-pointer"
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-2.5">
                {service.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => serviceScrollAudio.playCardHoverTick()}
                    className="group relative px-4 py-2.5 sm:py-3 rounded-2xl bg-[#07090f]/75 hover:bg-[#0b0e17]/85 border border-white/30 hover:border-white/45 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300 flex items-center justify-between gap-3 overflow-hidden"
                  >
                    <div
                      className={`absolute ${
                        isRTL ? 'right-0' : 'left-0'
                      } top-0 bottom-0 w-1 bg-[#d02128]`}
                    />
                    <div className={isRTL ? 'pr-2' : 'pl-2'}>
                      <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/75">
                        {isAr ? `مؤشر الأداء 0${idx + 1}` : `METRIC 0${idx + 1}`}
                      </div>
                      <div className="text-xs font-sans font-semibold text-white mt-0.5">
                        {isAr && arData?.metricsLabelAr[idx]
                          ? arData.metricsLabelAr[idx]
                          : m.label}
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl font-display font-black tracking-tight shrink-0 text-[#d02128]">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2.5 sm:py-3 rounded-2xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-center justify-between gap-3">
                <div className="text-xs font-sans text-white/95">
                  {isAr
                    ? 'مرر بسلاسة لاستعراض الفصول الستة الكاملة للخدمة.'
                    : 'Scroll smoothly to glide through all 6 chapters.'}
                </div>
                <button
                  type="button"
                  onClick={() => scrollToChapter(1)}
                  className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border border-white/30 bg-white/15 hover:bg-white/25 text-[#d02128] transition-all cursor-pointer"
                  title={isAr ? 'الفصل التالي: ماذا نقدم' : 'Next Chapter: What We Do'}
                >
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 1: WHAT WE DO */}
        <section
          ref={(el) => {
            panelFxRefs.current[1] = el as HTMLDivElement | null;
          }}
          className={`absolute inset-0 w-full max-w-full h-screen flex items-center justify-center ${sectionPadClass} box-border will-change-[transform,filter,opacity] overflow-y-auto overflow-x-hidden md:overflow-visible`}
          style={{
            opacity: 0,
            visibility: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div className="w-full max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
            <div className="lg:col-span-5 rounded-3xl border border-white/30 bg-[#07090f]/75 backdrop-blur-3xl p-4 sm:p-6 flex flex-col justify-between shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.28)]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#d02128]">
                    {cleanNodeCode}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/75">
                    {isAr
                      ? `الركيزة 0${selectedHighlightIdx + 1} / 04`
                      : `PILLAR 0${selectedHighlightIdx + 1} / 04`}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl xl:text-3xl font-display font-black uppercase tracking-tight leading-tight text-white">
                  {displayPrimaryNodeTitle}
                </h2>

                <p className="mt-2.5 text-xs text-white/95 leading-relaxed line-clamp-3">
                  {displayOrbitalSub}
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/20">
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/75 mb-1">
                  {isAr ? 'التركيز النشط' : 'ACTIVE FOCUS'}
                </div>
                <div className="text-sm font-display font-bold uppercase leading-snug text-[#d02128]">
                  {displayTelemetry[selectedHighlightIdx] || displayEnv}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {displayTelemetry.map((line, idx) => {
                const isSelected = selectedHighlightIdx === idx;
                const linkedCap = service.capabilities[idx];
                const linkedCapDesc =
                  isAr && arData?.capabilitiesDescAr[idx]
                    ? arData.capabilitiesDescAr[idx]
                    : linkedCap?.description;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      serviceScrollAudio.playCardHoverTick();
                      setSelectedHighlightIdx(idx);
                    }}
                    onMouseEnter={() => setSelectedHighlightIdx(idx)}
                    className={`${
                      isRTL ? 'text-right' : 'text-left'
                    } p-3.5 sm:p-4 rounded-2xl border backdrop-blur-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#0c101b]/85 border-[#d02128] shadow-[0_14px_35px_-10px_rgba(208,33,40,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)]'
                        : 'bg-[#07090f]/75 border-white/30 hover:bg-[#0b0e17]/82 hover:border-white/45 shadow-[0_18px_45px_rgba(0,0,0,0.75)]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] ${
                          isSelected ? 'text-[#d02128]' : 'text-white/75'
                        }`}
                      >
                        {isAr ? `الركيزة 0${idx + 1}` : `PILLAR 0${idx + 1}`}
                      </span>
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isSelected ? 'text-[#d02128]' : 'text-white/55'
                        }`}
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold uppercase text-white leading-snug">
                      {line}
                    </div>
                    {linkedCapDesc && (
                      <div className="text-[11px] font-sans text-white/90 line-clamp-2 leading-relaxed">
                        {linkedCapDesc}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* CHAPTER 2: LANGUAGES & TOOLS */}
        <section
          ref={(el) => {
            panelFxRefs.current[2] = el as HTMLDivElement | null;
          }}
          className={`absolute inset-0 w-full max-w-full h-screen flex items-center justify-center ${sectionPadClass} box-border will-change-[transform,filter,opacity] overflow-y-auto overflow-x-hidden md:overflow-visible`}
          style={{
            opacity: 0,
            visibility: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div className="w-full max-w-[1160px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-3.5">
              <div>
                <div className="text-[9px] font-mono font-bold uppercase tracking-[0.24em] text-[#d02128] mb-1 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{displayComputeSpec}</span>
                </div>
                <h2 className="text-xl sm:text-2xl xl:text-3xl font-display font-black uppercase tracking-tight text-white">
                  {displayComputeModel}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {service.platformTools.map((tool, idx) => {
                  const isSelected = selectedToolIdx === idx;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => {
                        serviceScrollAudio.playCardHoverTick();
                        setSelectedToolIdx(idx);
                      }}
                      onMouseEnter={() => setSelectedToolIdx(idx)}
                      className={`${
                        isRTL ? 'text-right' : 'text-left'
                      } p-3 sm:p-3.5 rounded-2xl border backdrop-blur-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#0c101b]/85 border-[#d02128] shadow-[0_14px_32px_-12px_rgba(208,33,40,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)]'
                          : 'bg-[#07090f]/75 border-white/30 hover:bg-[#0b0e17]/82 hover:border-white/45 shadow-[0_18px_45px_rgba(0,0,0,0.75)]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-mono font-bold shrink-0 bg-[#d02128]/20 text-[#d02128] border border-[#d02128]/50">
                          {tool.glyph}
                        </span>
                        <span className="text-[9px] font-mono text-white/65">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="mt-2.5">
                        <div className="text-xs sm:text-sm font-sans font-bold text-white truncate">
                          {tool.name}
                        </div>
                        <div className="text-[10px] font-sans text-white/85 mt-0.5 line-clamp-1">
                          {translateCategory(tool.category)}
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider truncate text-[#d02128]">
                          {tool.metric}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div
                className="lg:col-span-4 rounded-2xl border border-white/30 bg-[#07090f]/75 backdrop-blur-3xl p-4 sm:p-5 flex flex-col justify-between"
                style={{
                  boxShadow: `0 24px 55px -15px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.28), 0 16px 45px -15px #d0212845`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/85 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#d02128]" />
                      <span>{isAr ? 'الأداة المختارة' : 'ACTIVE TOOL'}</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-[#d02128]">
                      {activeTool.glyph}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-black uppercase text-white tracking-tight">
                    {activeTool.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-white/95 leading-relaxed line-clamp-3">
                    {isAr
                      ? `${translateCategory(activeTool.category)} — مدمجة ضمن منظومة ${displayTitle} لضمان السرعة الفائقة والاعتمادية المؤسسية.`
                      : `${activeTool.category} — integrated into our ${service.title} pipeline for speed and enterprise reliability.`}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/75">
                      {isAr ? 'معيار الأداء' : 'BENCHMARK'}
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold uppercase mt-0.5 text-[#d02128]">
                      {activeTool.metric}
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#d02128]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 3: SERVICES INCLUDED */}
        <section
          ref={(el) => {
            panelFxRefs.current[3] = el as HTMLDivElement | null;
          }}
          className={`absolute inset-0 w-full max-w-full h-screen flex items-center justify-center ${sectionPadClass} box-border will-change-[transform,filter,opacity] overflow-y-auto overflow-x-hidden md:overflow-visible`}
          style={{
            opacity: 0,
            visibility: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div className="w-full max-w-[1160px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-3.5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.24em] text-white/85 mb-0.5">
                  <Layers className="w-3.5 h-3.5 text-[#d02128]" />
                  <span>
                    {isAr ? 'المخرجات والخدمات المشمولة' : 'DELIVERABLES INCLUDED'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl xl:text-3xl font-display font-black uppercase tracking-tight text-white">
                  {displayIntelTitle}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
              <div
                className="lg:col-span-5 rounded-3xl border border-white/30 bg-[#07090f]/75 backdrop-blur-3xl p-4 sm:p-5 flex flex-col justify-between"
                style={{
                  boxShadow: `0 24px 60px -15px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.28), 0 18px 50px -20px #d0212845`,
                }}
              >
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-white/[0.14] border border-white/25 text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-[#d02128] mb-2.5">
                    0{selectedCapabilityIdx + 1} · {activeCap.deliverableTag}
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-black uppercase tracking-wide text-white leading-snug">
                    {activeCapTitle}
                  </h3>
                  <p className="text-xs text-white/95 mt-2 leading-relaxed line-clamp-3">
                    {activeCapDesc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3.5 mt-4 border-t border-white/20">
                  {activeCap.bullets.map((b, bIdx) => (
                    <div
                      key={bIdx}
                      className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.12em] text-white"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#d02128]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.capabilities.map((cap, idx) => {
                  const isActive = selectedCapabilityIdx === idx;
                  const capTitle =
                    isAr && arData?.capabilitiesTitleAr[idx]
                      ? arData.capabilitiesTitleAr[idx]
                      : cap.title;
                  const capDesc =
                    isAr && arData?.capabilitiesDescAr[idx]
                      ? arData.capabilitiesDescAr[idx]
                      : cap.description;
                  return (
                    <button
                      key={cap.id}
                      type="button"
                      onClick={() => {
                        serviceScrollAudio.playCardHoverTick();
                        setSelectedCapabilityIdx(idx);
                      }}
                      onMouseEnter={() => setSelectedCapabilityIdx(idx)}
                      className={`${
                        isRTL ? 'text-right' : 'text-left'
                      } p-3.5 sm:p-4 rounded-2xl border backdrop-blur-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-[#0c101b]/85 border-[#d02128] shadow-[0_14px_35px_-12px_rgba(208,33,40,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)]'
                          : 'bg-[#07090f]/75 border-white/30 hover:bg-[#0b0e17]/82 hover:border-white/45 shadow-[0_18px_45px_rgba(0,0,0,0.75)]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-[#d02128]">
                            {cap.deliverableTag}
                          </span>
                          <span className="text-[9px] font-mono text-white/65">
                            0{idx + 1}
                          </span>
                        </div>

                        <h4 className="text-sm font-display font-extrabold uppercase text-white leading-snug">
                          {capTitle}
                        </h4>

                        <p className="text-[11px] text-white/90 mt-1 line-clamp-2 leading-relaxed">
                          {capDesc}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.12em] text-white/95">
                        <span className="truncate">{cap.bullets[0]}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#d02128]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 4: QUALITY GUARANTEE */}
        <section
          ref={(el) => {
            panelFxRefs.current[4] = el as HTMLDivElement | null;
          }}
          className={`absolute inset-0 w-full max-w-full h-screen flex items-center justify-center ${sectionPadClass} box-border will-change-[transform,filter,opacity] overflow-y-auto overflow-x-hidden md:overflow-visible`}
          style={{
            opacity: 0,
            visibility: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div className="w-full max-w-[1160px] mx-auto">
            <div
              className="relative w-full rounded-3xl border border-white/30 bg-[#07090f]/75 backdrop-blur-3xl p-4 sm:p-6 mb-3.5"
              style={{
                boxShadow: `0 24px 60px -15px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.28), 0 20px 60px -20px #d0212845`,
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-[0.24em] text-[#d02128] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{displayDeployTitle}</span>
                  </div>
                  <h2 className="text-base sm:text-xl xl:text-2xl font-sans font-semibold text-white leading-snug">
                    {displayDeployStatement}
                  </h2>
                </div>

                <div className="shrink-0 p-3.5 rounded-2xl bg-white/[0.12] border border-white/30 backdrop-blur-2xl min-w-[210px]">
                  <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/75">
                    {isAr ? 'معيار مستوى الخدمة المعتمد' : 'VERIFIED SLA STANDARD'}
                  </div>
                  <div className="text-xs sm:text-sm font-display font-bold uppercase mt-0.5 text-[#d02128]">
                    {activeGuarantee.label}
                  </div>
                  <div className="text-[11px] font-mono text-white mt-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#d02128]" />
                    <span>{activeGuarantee.benchmark}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {service.criteriaChecklist.map((item, idx) => {
                const isSelected = selectedGuaranteeIdx === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      serviceScrollAudio.playCardHoverTick();
                      setSelectedGuaranteeIdx(idx);
                    }}
                    onMouseEnter={() => setSelectedGuaranteeIdx(idx)}
                    className={`${
                      isRTL ? 'text-right' : 'text-left'
                    } p-3.5 rounded-2xl border backdrop-blur-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#0c101b]/85 border-[#d02128] shadow-[0_14px_35px_-12px_rgba(208,33,40,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)]'
                        : 'bg-[#07090f]/75 border-white/30 hover:bg-[#0b0e17]/82 hover:border-white/45 shadow-[0_18px_45px_rgba(0,0,0,0.75)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-white/75">
                          {isAr ? `معيار 0${idx + 1}` : `SLA 0${idx + 1}`}
                        </span>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.14em] text-[#d02128]">
                          {translateSlaStatus(item.status)}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                        {item.label}
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/15 text-[11px] font-mono text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#d02128]" />
                      <span>{item.benchmark}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* CHAPTER 5: START A PROJECT */}
        <section
          ref={(el) => {
            panelFxRefs.current[5] = el as HTMLDivElement | null;
          }}
          className={`absolute inset-0 w-full max-w-full h-screen flex items-center justify-center ${sectionPadClass} box-border will-change-[transform,filter,opacity] overflow-y-auto overflow-x-hidden md:overflow-visible`}
          style={{
            opacity: 0,
            visibility: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center p-5 sm:p-8 rounded-3xl bg-[#07090f]/80 border border-white/30 backdrop-blur-3xl shadow-[0_28px_70px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.28)]">
            <div className="text-[10px] font-mono uppercase tracking-[0.24em] sm:tracking-[0.3em] text-[#d02128] mb-2 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              <span>
                {isAr
                  ? 'وكالة إيفرز الرقمية · لا شيء مستحيل في عالم التقنية'
                  : 'EFERZ DIGITAL AGENCY · NOTHING IS IMPOSSIBLE IN THE IT WORLD'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tight">
              {isAr ? (
                <>
                  هل أنت مستعد لبدء مشروع{' '}
                  <span className="text-[#d02128]">{displayTitle}</span>؟
                </>
              ) : (
                <>
                  Ready to Start Your{' '}
                  <span className="text-[#d02128]">{service.title}</span>{' '}
                  Project?
                </>
              )}
            </h2>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-mono uppercase tracking-[0.16em] text-white/95">
              {service.metrics.map((m, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-white/35">·</span>}
                  <span>
                    <strong className="text-[#d02128]">{m.value}</strong>{' '}
                    {isAr && arData?.metricsLabelAr[idx]
                      ? arData.metricsLabelAr[idx]
                      : m.label}
                  </span>
                </React.Fragment>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  serviceScrollAudio.playServiceLaunch(service.id);
                  onOrderService();
                }}
                className="px-6 sm:px-7 py-3.5 rounded-2xl font-mono text-xs font-bold uppercase tracking-[0.2em] text-black transition-all cursor-pointer flex items-center gap-2.5 shadow-2xl hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: service.accentColor,
                  boxShadow: `0 12px 35px -8px ${service.accentColor}88`,
                }}
              >
                <span>{isAr ? 'ابدأ مشروعك الآن' : 'Start a Project'}</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={() => {
                  serviceScrollAudio.playCardHoverTick();
                  onBackToCatalog();
                }}
                className="px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 font-mono text-xs uppercase tracking-[0.2em] text-white transition-all cursor-pointer"
              >
                {isAr ? 'استكشف خدمات أخرى' : 'Explore Other Services'}
              </button>

              <button
                onClick={() => {
                  serviceScrollAudio.playServiceLaunch(service.id);
                  scrollToChapter(0);
                }}
                className="px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 font-mono text-[11px] uppercase tracking-[0.2em] text-white/90 hover:text-white transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isAr ? 'إعادة العرض' : 'Replay'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Bottom Horizontal Real-Time Progress Bar (matching Home Page) */}
        <div className="absolute left-0 right-0 bottom-0 h-[3px] z-30 bg-white/10 pointer-events-none">
          <div
            ref={progressBarRef}
            className={`h-full ${
              isRTL ? 'origin-right' : 'origin-left'
            } will-change-transform bg-[#d02128] shadow-[0_0_10px_#d02128]`}
            style={{
              transform: 'scaleX(0)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

