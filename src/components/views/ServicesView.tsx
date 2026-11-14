import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import {
  OFFICIAL_EFERZ_SERVICES,
  OfficialEFerzService,
} from '../../data/servicesData';
import { MorphShape } from '../../data/morphShapes';
import { ServiceDomainMotionCanvas } from '../ServiceDomainMotionCanvas';
import { ServiceProductStoryPage } from '../ServiceProductStoryPage';
import { VerticalWheelRail } from '../VerticalWheelRail';
import { serviceScrollAudio } from '../../utils/serviceScrollAudio';
import { useLocale } from '../../utils/LocaleContext';
import { SERVICE_ARABIC_MAP } from '../../utils/serviceTranslations';

interface ServicesViewProps {
  onShapeChange?: (shape: MorphShape) => void;
  onSelectShape?: (
    shape: MorphShape,
    scheme?: 'white' | 'cyan' | 'amber' | 'emerald' | 'red',
    direction?: 'down' | 'up',
    step?: 0 | 1 | 2 | 3
  ) => void;
  onNavigateContact?: () => void;
  onStartProject?: () => void;
  lang?: string;
  initialServiceId?: string | null;
  onConsumeInitialService?: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onShapeChange,
  onSelectShape,
  onNavigateContact,
  onStartProject,
  initialServiceId,
  onConsumeInitialService,
}) => {
  const { lang, isRTL } = useLocale();
  const isAr = lang === 'ar';

  const triggerShape = useCallback(
    (
      shape: MorphShape,
      scheme: 'white' | 'cyan' | 'amber' | 'emerald' | 'red' = 'cyan'
    ) => {
      if (onSelectShape) onSelectShape(shape, scheme);
      else if (onShapeChange) onShapeChange(shape);
    },
    [onSelectShape, onShapeChange]
  );
  const triggerStartProject = onStartProject || onNavigateContact || (() => {});

  // slideIndex === -1 is the Spatial Services Exhibition intro slide
  // slideIndex 0..10 are the 11 Official EFerz Services
  const [slideIndex, setSlideIndex] = useState<number>(-1);
  const [activeService, setActiveService] =
    useState<OfficialEFerzService | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // If navigated from a specific Home Page slide (e.g. Web Design, E-Commerce, Digital Marketing, AI/Consulting, Brand, Cyber Security), open that exact service immediately
  useEffect(() => {
    if (!initialServiceId) return;
    const foundIdx = OFFICIAL_EFERZ_SERVICES.findIndex(
      (s) => s.id === initialServiceId || s.slug === initialServiceId
    );
    if (foundIdx >= 0) {
      const matched = OFFICIAL_EFERZ_SERVICES[foundIdx];
      setSlideIndex(foundIdx);
      setActiveService(matched);
      serviceScrollAudio.playServiceLaunch(matched.id);
    }
    onConsumeInitialService?.();
  }, [initialServiceId, onConsumeInitialService]);

  const wheelLockRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const currentService: OfficialEFerzService =
    OFFICIAL_EFERZ_SERVICES[Math.max(0, slideIndex)] ||
    OFFICIAL_EFERZ_SERVICES[0];

  const currentServiceAr = SERVICE_ARABIC_MAP[currentService.id];

  // Sync 3D particle background shape + scene-specific warm audio palette
  useEffect(() => {
    if (activeService) {
      triggerShape(activeService.particleShape, activeService.particleScheme);
      serviceScrollAudio.setActiveServiceScene(activeService.id);
    } else if (slideIndex === -1) {
      triggerShape('sphere', 'red');
    } else if (currentService) {
      triggerShape(currentService.particleShape, currentService.particleScheme);
      serviceScrollAudio.setActiveServiceScene(currentService.id);
    }
  }, [slideIndex, currentService, activeService, triggerShape]);

  const goToSlide = useCallback(
    (nextIndex: number, force = false) => {
      if (wheelLockRef.current && !force) return;
      const total = OFFICIAL_EFERZ_SERVICES.length;
      let target = nextIndex;
      if (target < -1) target = total - 1;
      if (target >= total) target = -1;
      if (target === slideIndex) return;

      wheelLockRef.current = true;
      setIsTransitioning(true);

      const nextSvc =
        target >= 0
          ? OFFICIAL_EFERZ_SERVICES[target]
          : OFFICIAL_EFERZ_SERVICES[0];
      serviceScrollAudio.playChapterTransition(Math.max(0, target), nextSvc.id);

      setSlideIndex(target);

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 360);

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 460);
    },
    [slideIndex]
  );

  // Fullscreen wheel & keyboard navigation ONLY when not inside a service detail page
  useEffect(() => {
    if (activeService) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18 && Math.abs(e.deltaX) < 18) return;
      if (wheelLockRef.current) return;

      const delta =
        Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta > 0) {
        goToSlide(slideIndex + 1);
      } else if (delta < 0) {
        goToSlide(slideIndex - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goToSlide(slideIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goToSlide(slideIndex - 1);
      } else if (e.key === 'Enter' && slideIndex >= 0) {
        e.preventDefault();
        serviceScrollAudio.playServiceLaunch(currentService.id);
        setActiveService(currentService);
      } else if (e.key === 'Enter' && slideIndex === -1) {
        e.preventDefault();
        goToSlide(0);
      }
    };

    const handleGestureSlide = (e: Event) => {
      const customEvt = e as CustomEvent<{ direction: 'next' | 'prev' | 'up' | 'down' }>;
      const dir = customEvt.detail?.direction;
      if (dir === 'next' || dir === 'down') {
        goToSlide(slideIndex + 1);
      } else if (dir === 'prev' || dir === 'up') {
        goToSlide(slideIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('eferz-gesture-slide', handleGestureSlide);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('eferz-gesture-slide', handleGestureSlide);
    };
  }, [activeService, slideIndex, currentService, goToSlide]);

  useEffect(() => {
    const handleBackRequest = (e: Event) => {
      if (activeService) {
        e.preventDefault();
        serviceScrollAudio.playCardHoverTick();
        setActiveService(null);
      } else if (slideIndex >= 0) {
        e.preventDefault();
        serviceScrollAudio.playCardHoverTick();
        goToSlide(-1, true);
      }
    };
    window.addEventListener('eferz-back-request', handleBackRequest);
    return () =>
      window.removeEventListener('eferz-back-request', handleBackRequest);
  }, [activeService, slideIndex, goToSlide]);

  // Touch swipe navigation on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null || touchStartXRef.current === null)
      return;
    const dy = touchStartYRef.current - e.changedTouches[0].clientY;
    const dx = touchStartXRef.current - e.changedTouches[0].clientX;

    if (Math.abs(dy) > 42 || Math.abs(dx) > 42) {
      if (Math.abs(dy) >= Math.abs(dx)) {
        if (dy > 0) goToSlide(slideIndex + 1);
        else goToSlide(slideIndex - 1);
      } else {
        if (dx > 0) goToSlide(slideIndex + 1);
        else goToSlide(slideIndex - 1);
      }
    }
    touchStartYRef.current = null;
    touchStartXRef.current = null;
  };

  const handleLaunchService = (service: OfficialEFerzService) => {
    serviceScrollAudio.playServiceLaunch(service.id);
    setActiveService(service);
  };

  const handleSelectFromStory = (service: OfficialEFerzService) => {
    const idx = OFFICIAL_EFERZ_SERVICES.findIndex((s) => s.id === service.id);
    if (idx !== -1) setSlideIndex(idx);
    serviceScrollAudio.playServiceLaunch(service.id);
    setActiveService(service);
  };

  if (activeService) {
    return (
      <ServiceProductStoryPage
        service={activeService}
        allServices={OFFICIAL_EFERZ_SERVICES}
        onBackToCatalog={() => setActiveService(null)}
        onSelectService={handleSelectFromStory}
        onSelectShape={onSelectShape}
        onOrderService={() => {
          setActiveService(null);
          triggerStartProject();
        }}
      />
    );
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden select-none text-white text-emboss"
    >
      {/* ============================================================
          1. FULL-BLEED DOMAIN MOTION CANVAS (Changes smoothly per slide)
      ============================================================ */}
      {slideIndex >= 0 && (
        <div
          key={currentService.id}
          className={`absolute inset-0 z-0 transition-all duration-700 ease-out ${
            isTransitioning ? 'scale-[1.04] opacity-75' : 'scale-100 opacity-100'
          }`}
        >
          <ServiceDomainMotionCanvas
            service={currentService}
            variant="hero"
            className="w-full h-full rounded-none border-0"
          />

          {/* Subtle Vignette Overlays so center title, 3D star constellation, and bottom-left motion are all crystal clear */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#040509]/55 via-transparent to-[#040509]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(4,5,9,0.45)_100%)] pointer-events-none" />
        </div>
      )}

      {/* Ambient radial glow for Intro Exhibition slide */}
      {slideIndex === -1 && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(196,18,48,0.16), transparent 65%), linear-gradient(to bottom, rgba(4,5,9,0.35), rgba(4,5,9,0.88))',
          }}
        />
      )}

      {/* ============================================================
          2A. INTRO SLIDE (-1): SPATIAL SERVICES EXHIBITION (CLEAN NO-BOX LIKE PORTFOLIO INTRO)
      ============================================================ */}
      {slideIndex === -1 && (
        <div
          className={`relative z-10 w-full h-full flex flex-col items-center justify-center px-5 sm:px-10 ${
            isRTL ? 'md:pr-48 lg:pr-60 xl:pr-64' : 'md:pl-48 lg:pl-60 xl:pl-64'
          } pb-24 sm:pb-20 md:pb-16 text-center overflow-y-auto overflow-x-hidden transition-all duration-500 ${
            isTransitioning
              ? 'opacity-0 translate-y-4 scale-[0.98]'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-4 sm:mb-5">
            <Layers className="w-3.5 h-3.5 text-[#c41230]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] sm:tracking-[0.3em] text-white/85">
              {isAr
                ? 'منظومة الخدمات التفاعلية • مرر للاستكشاف'
                : 'FULL-SCREEN SERVICE ECOSYSTEM • SCROLL TO EXPLORE'}
            </span>
          </div>

          <h1 className="text-[clamp(2rem,5.8vw,5.6rem)] font-black tracking-tighter leading-[1.02] text-white max-w-5xl mb-4 sm:mb-5 drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
            {isAr ? (
              <>
                معرض الخدمات{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#c41230]">
                  الرقمية المتكاملة.
                </span>
              </>
            ) : (
              <>
                Spatial Services{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#c41230]">
                  Exhibition.
                </span>
              </>
            )}
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed mb-6 sm:mb-8">
            {isAr
              ? 'مرر للأسفل لاستعراض خدمات وكالتنا الرقمية المتخصصة بعرض تفاعلي كامل الشاشة — أو اختر أي خدمة من القائمة الجانبية لفتح تجربتها التفاعلية الكاملة.'
              : 'Scroll down to glide through each of our specialized digital agency services in full-screen motion — or select any service from the left wheel to launch its full interactive experience.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => goToSlide(0)}
              className="group relative inline-flex items-center gap-4 px-7 sm:px-10 py-3.5 sm:py-5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-white bg-[#c41230] hover:bg-[#e01537] transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_18px_50px_rgba(196,18,48,0.45)]"
            >
              <span>
                {isAr ? 'ابدأ تصفح الخدمات' : 'Start Scrolling Services'}
              </span>
              <span className="w-8 h-8 rounded-full bg-black/25 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-0.5">
                <ChevronDown className="w-4 h-4 text-white" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          2B. SERVICE SLIDE (0..10): CLEAN FULL-SCREEN TITLE + LAUNCH EXPERIENCE (NO GLASS BOX)
      ============================================================ */}
      {slideIndex >= 0 && (
        <>

          <div
            className={`relative z-10 w-full h-full flex flex-col items-center justify-center px-5 sm:px-10 ${
              isRTL ? 'md:pr-48 lg:pr-60 xl:pr-64' : 'md:pl-48 lg:pl-60 xl:pl-64'
            } pb-24 sm:pb-20 md:pb-16 text-center overflow-y-auto overflow-x-hidden pointer-events-none`}
          >
          <div
            key={currentService.id}
            className={`max-w-5xl mx-auto flex flex-col items-center transition-all duration-500 ${
              isTransitioning
                ? 'opacity-0 translate-y-4 scale-[0.98]'
                : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            {/* Subtle Kicker Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md mb-4 sm:mb-5">
              <span
                className="w-2 h-2 rounded-full bg-[#ec3935]"
                style={{
                  boxShadow: '0 0 12px #ec3935',
                }}
              />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.28em] text-white/90 font-semibold">
                {isAr && currentServiceAr
                  ? currentServiceAr.environmentNameAr
                  : currentService.environmentName}
              </span>
            </div>

            {/* Massive Fullscreen Service Title */}
            <h1 className="text-[clamp(2rem,5.8vw,5.8rem)] font-black tracking-tighter leading-[1.02] text-white mb-5 sm:mb-6 drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
              {isAr && currentServiceAr
                ? currentServiceAr.titleAr
                : currentService.title}
            </h1>

            {/* Compact Live Ecosystem Tools Row */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-9 max-w-2xl">
              {currentService.platformTools.slice(0, 5).map((tool) => (
                <span
                  key={tool.id}
                  className="px-3 sm:px-3.5 py-1 rounded-full bg-black/55 border border-white/15 backdrop-blur-md text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.18em] text-white/85"
                >
                  {tool.name}
                </span>
              ))}
            </div>

            {/* Single Focused CTA: LAUNCH EXPERIENCE */}
            <div className="pointer-events-auto flex items-center gap-4">
              <button
                onClick={() => handleLaunchService(currentService)}
                className="group relative inline-flex items-center gap-4 px-7 sm:px-10 py-3.5 sm:py-5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-black transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
                style={{
                  backgroundColor: currentService.accentColor,
                  boxShadow: `0 0 45px ${currentService.accentColor}60`,
                  textShadow: 'none',
                }}
              >
                <span style={{ textShadow: 'none' }}>
                  {isAr ? 'استكشف تفاصيل الخدمة' : 'Launch Experience'}
                </span>
                <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </span>
              </button>
            </div>
          </div>
        </div>
        </>
      )}

      {/* ============================================================
          3. SIDE 3D VERTICAL WHEEL RAIL
      ============================================================ */}
      <VerticalWheelRail
        items={OFFICIAL_EFERZ_SERVICES.map((svc) => ({
          id: svc.id,
          label: svc.title,
          labelAr: SERVICE_ARABIC_MAP[svc.id]?.titleAr || svc.title,
          accentColor: '#ec3935',
        }))}
        activeIndex={slideIndex}
        onSelect={(idx) => goToSlide(idx)}
        introLabel="Intro"
        introLabelAr="مقدمة"
        defaultAccent="#ec3935"
      />

      {/* ============================================================
          4. NEXT SLIDE ARROW
      ============================================================ */}
      <button
        onClick={() => goToSlide(slideIndex + 1)}
        aria-label={isAr ? 'الشريحة التالية' : 'Next Slide'}
        className={`hidden sm:flex fixed ${
          isRTL ? 'left-6' : 'right-6'
        } top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/55 border border-white/15 text-white/75 hover:text-white hover:border-white/40 hover:scale-110 backdrop-blur-xl items-center justify-center transition-all cursor-pointer`}
      >
        {isRTL ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

