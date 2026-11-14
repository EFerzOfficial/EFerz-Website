import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Layers,
  LayoutGrid,
  Monitor,
  Smartphone,
  Tablet,
  X,
} from 'lucide-react';
import { WORK_PROJECTS, WorkProject } from '../../data/agencyData';
import { MorphShape } from '../../data/morphShapes';
import { Language } from '../../types';
import {
  PortfolioThreeGallery,
  Gallery3DLayout,
} from '../PortfolioThreeGallery';
import { PageMotionBackdrop } from '../PageMotionBackdrop';
import { VerticalWheelRail } from '../VerticalWheelRail';
import { ClientBrandStarLogo } from '../ClientBrandStarLogo';
import { serviceScrollAudio } from '../../utils/serviceScrollAudio';
import { useLocale } from '../../utils/LocaleContext';
import { getAssetUrl } from '../../utils/assetUrl';

interface WorkViewProps {
  onShapeChange?: (shape: MorphShape) => void;
  onSelectShape?: (
    shape: MorphShape,
    scheme?: 'white' | 'cyan' | 'amber' | 'emerald' | 'red'
  ) => void;
  onStartProject?: () => void;
  lang?: Language;
  isLightMode?: boolean;
}

type DeviceViewMode = 'split' | 'desktop' | 'tablet' | 'mobile' | 'full';
type LiveViewportMode = 'desktop' | 'tablet' | 'mobile';

const PROJECT_SHAPES: MorphShape[] = [
  'monitor',
  'cart',
  'globe',
  'diamond',
  'rocket',
  'palette',
  'parcel',
  'shield',
  'crown',
  'compass',
  'headphones',
  'wifi',
];

function getProjectDeviceImages(project: WorkProject) {
  const mainImage = project.remoteImage || getAssetUrl(project.image);
  return {
    desktop: project.desktopImage ? getAssetUrl(project.desktopImage) : mainImage,
    tablet: project.tabletImage ? getAssetUrl(project.tabletImage) : mainImage,
    mobile: project.mobileImage ? getAssetUrl(project.mobileImage) : mainImage,
    full: mainImage,
  };
}

function getEmbeddableLiveUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  if (rawUrl.includes('instagram.com/')) {
    const clean = rawUrl.replace(/\/+$/, '');
    return clean.endsWith('/embed') ? clean : `${clean}/embed`;
  }
  return rawUrl;
}

export const WorkView: React.FC<WorkViewProps> = ({
  onShapeChange,
  onSelectShape,
}) => {
  const { lang, isRTL } = useLocale();
  const isAr = lang === 'ar';

  // slideIndex === -1 is the Spatial Portfolio Exhibition Intro slide
  // slideIndex 0..16 are the 17 Flagship Projects
  const [slideIndex, setSlideIndex] = useState<number>(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [deviceMode, setDeviceMode] = useState<DeviceViewMode>('split');
  const [modalDeviceMode, setModalDeviceMode] =
    useState<DeviceViewMode>('split');
  const [show3DGalleryModal, setShow3DGalleryModal] = useState(false);
  const [layoutMode, setLayoutMode] = useState<Gallery3DLayout>('cylinder');
  const [activeCaseStudy, setActiveCaseStudy] = useState<WorkProject | null>(
    null
  );
  const [livePreviewProject, setLivePreviewProject] =
    useState<WorkProject | null>(null);
  const [liveViewportMode, setLiveViewportMode] =
    useState<LiveViewportMode>('desktop');
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const wheelLockRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number | null>(null);

  const currentProject: WorkProject =
    WORK_PROJECTS[Math.max(0, slideIndex)] || WORK_PROJECTS[0];

  useEffect(() => {
    if (slideIndex === -1) {
      if (onSelectShape) onSelectShape('monitor', 'red');
      else if (onShapeChange) onShapeChange('monitor');
      return;
    }
    const shape = PROJECT_SHAPES[slideIndex % PROJECT_SHAPES.length];
    if (onSelectShape) onSelectShape(shape, 'white');
    else if (onShapeChange) onShapeChange(shape);
  }, [slideIndex, onSelectShape, onShapeChange]);

  const goToSlide = useCallback(
    (nextIndex: number, force = false) => {
      if (wheelLockRef.current && !force) return;
      const total = WORK_PROJECTS.length;
      let target = nextIndex;
      if (target < -1) target = total - 1;
      if (target >= total) target = -1;
      if (target === slideIndex) return;

      wheelLockRef.current = true;
      setIsTransitioning(true);

      serviceScrollAudio.playChapterTransition(Math.max(0, target));

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

  // Full-screen wheel & keyboard slide navigation
  useEffect(() => {
    if (show3DGalleryModal || activeCaseStudy || livePreviewProject) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18 && Math.abs(e.deltaX) < 18) return;
      if (wheelLockRef.current) return;
      const delta =
        Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta > 0) goToSlide(slideIndex + 1);
      else goToSlide(slideIndex - 1);
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
        setModalDeviceMode(deviceMode);
        setActiveCaseStudy(currentProject);
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
  }, [
    slideIndex,
    currentProject,
    deviceMode,
    show3DGalleryModal,
    activeCaseStudy,
    livePreviewProject,
    goToSlide,
  ]);

  useEffect(() => {
    const handleBackRequest = (e: Event) => {
      if (livePreviewProject) {
        e.preventDefault();
        serviceScrollAudio.playCardHoverTick();
        setLivePreviewProject(null);
      } else if (activeCaseStudy) {
        e.preventDefault();
        serviceScrollAudio.playCardHoverTick();
        setActiveCaseStudy(null);
      } else if (show3DGalleryModal) {
        e.preventDefault();
        serviceScrollAudio.playCardHoverTick();
        setShow3DGalleryModal(false);
      } else if (slideIndex >= 0 && deviceMode !== 'split') {
        e.preventDefault();
        serviceScrollAudio.playCardHoverTick();
        setDeviceMode('split');
      } else if (slideIndex >= 0) {
        e.preventDefault();
        serviceScrollAudio.playCardHoverTick();
        goToSlide(-1, true);
      }
    };
    window.addEventListener('eferz-back-request', handleBackRequest);
    return () =>
      window.removeEventListener('eferz-back-request', handleBackRequest);
  }, [
    livePreviewProject,
    activeCaseStudy,
    show3DGalleryModal,
    slideIndex,
    deviceMode,
    goToSlide,
  ]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -ny * 8, ry: nx * 10 });
  };

  const accent =
    slideIndex === -1 ? '#d02128' : currentProject.accentColor || '#d02128';

  const renderDeviceShowcaseStage = (
    project: WorkProject,
    activeMode: DeviceViewMode,
    onSelectMode: (mode: DeviceViewMode) => void,
    isModal = false
  ) => {
    const projAccent = '#d02128';
    const imgs = getProjectDeviceImages(project);
    const embedUrl = getEmbeddableLiveUrl(project.liveUrl);

    if (activeMode === 'split') {
      const hasLiveSite = Boolean(embedUrl);

      return (
        <div
          className={`grid grid-cols-12 gap-3 sm:gap-3.5 p-3.5 sm:p-5 bg-[#07090f]/75 backdrop-blur-3xl ${
            isModal ? 'min-h-[380px] sm:min-h-[440px]' : ''
          }`}
        >
          {/* 1. DEDICATED DESKTOP VIEW CARD (Live Scrollable Website/Instagram or Desktop Image) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              serviceScrollAudio.playCardHoverTick();
              onSelectMode('desktop');
            }}
            className="col-span-12 sm:col-span-7 group/desk relative rounded-2xl overflow-hidden border border-white/30 hover:border-white/45 bg-[#07090f]/80 hover:bg-[#0b0e17]/88 backdrop-blur-3xl p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.25)]"
          >
            {/* Mac Studio / iMac Top Bar */}
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/15">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#d02128] shrink-0" />
                <span className="w-2 h-2 rounded-full bg-white/40 shrink-0" />
                <span className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                <span className="ml-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-white/90 flex items-center gap-1 font-semibold truncate">
                  <Monitor className="w-3 h-3 shrink-0" style={{ color: projAccent }} />
                  <span>{isAr ? 'عرض الكمبيوتر' : 'DESKTOP VIEW'}</span>
                  {hasLiveSite && (
                    <span className="ml-1 inline-flex items-center gap-1 text-[8px] text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {isAr ? 'مباشر' : 'LIVE'}
                    </span>
                  )}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  serviceScrollAudio.playCardHoverTick();
                  onSelectMode('desktop');
                }}
                className="text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-black/50 hover:bg-[#d02128] border border-white/15 transition-colors cursor-pointer shrink-0"
                style={{ color: '#ffffff' }}
              >
                {isAr ? 'تكبير ↗' : 'EXPAND ↗'}
              </button>
            </div>

            {/* Live Interactive Desktop Iframe OR Extracted Desktop Image */}
            <div
              onWheel={(e) => {
                if (hasLiveSite) e.stopPropagation();
              }}
              onClick={(e) => {
                if (hasLiveSite) e.stopPropagation();
              }}
              className={`relative w-full aspect-[4/3] sm:aspect-[16/13] rounded-xl overflow-hidden ${
                hasLiveSite
                  ? 'bg-white border border-white/25'
                  : 'bg-gradient-to-b from-[#0b0e17]/80 to-black/80 flex items-center justify-center p-2.5'
              }`}
            >
              {hasLiveSite ? (
                <iframe
                  src={embedUrl}
                  title={`${project.title} — Live Desktop View`}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  style={{
                    width: '250%',
                    height: '250%',
                    transform: 'scale(0.4)',
                    transformOrigin: 'top left',
                  }}
                  className="border-0 bg-white pointer-events-none md:pointer-events-auto"
                />
              ) : (
                <>
                  <div
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle at 50% 45%, ${projAccent}44, transparent 70%)`,
                    }}
                  />
                  <img
                    src={imgs.desktop}
                    alt={`${project.title} — Dedicated Desktop View`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover/desk:scale-105 drop-shadow-[0_16px_32px_rgba(0,0,0,0.85)]"
                    referrerPolicy="no-referrer"
                  />
                </>
              )}
            </div>

            {/* Desktop Caption Footer */}
            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/15 text-[10px]">
              <span className="font-mono uppercase tracking-wider text-white/75 truncate">
                {hasLiveSite
                  ? project.liveUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '')
                  : isAr
                  ? 'شاشة سطح المكتب'
                  : 'Dedicated Desktop Monitor'}
              </span>
              <span className="font-mono text-white/95 font-semibold shrink-0" dir="ltr">
                1920 × 1080px
              </span>
            </div>
          </div>

          {/* Right Stack: 2. DEDICATED TABLET VIEW + 3. DEDICATED MOBILE VIEW */}
          <div className="col-span-12 sm:col-span-5 grid grid-cols-1 gap-3 sm:gap-3.5">
            {/* 2. DEDICATED TABLET VIEW CARD (Live Scrollable Tablet Website/Instagram or Tablet Image) */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                serviceScrollAudio.playCardHoverTick();
                onSelectMode('tablet');
              }}
              className="group/tab relative rounded-2xl overflow-hidden border border-white/30 hover:border-white/45 bg-[#07090f]/80 hover:bg-[#0b0e17]/88 backdrop-blur-3xl p-2.5 sm:p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.25)]"
            >
              <div className="flex items-center justify-between gap-1.5 pb-1.5 mb-1.5 border-b border-white/15">
                <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-white/90 flex items-center gap-1 font-semibold truncate">
                  <Tablet className="w-3 h-3 shrink-0" style={{ color: projAccent }} />
                  <span>{isAr ? 'عرض التابلت' : 'TABLET VIEW'}</span>
                  {hasLiveSite && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  )}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    serviceScrollAudio.playCardHoverTick();
                    onSelectMode('tablet');
                  }}
                  className="text-[8px] font-mono uppercase tracking-widest hover:underline cursor-pointer shrink-0"
                  style={{ color: projAccent }}
                >
                  {isAr ? 'تكبير ↗' : 'EXPAND ↗'}
                </button>
              </div>

              <div
                onWheel={(e) => {
                  if (hasLiveSite) e.stopPropagation();
                }}
                onClick={(e) => {
                  if (hasLiveSite) e.stopPropagation();
                }}
                className={`relative w-full h-32 sm:h-36 rounded-xl overflow-hidden ${
                  hasLiveSite
                    ? 'bg-white border border-white/25'
                    : 'bg-gradient-to-b from-[#0b0e17]/80 to-black/75 flex items-center justify-center p-2'
                }`}
              >
                {hasLiveSite ? (
                  <iframe
                    src={embedUrl}
                    title={`${project.title} — Live Tablet View`}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    style={{
                      width: '312.5%',
                      height: '312.5%',
                      transform: 'scale(0.32)',
                      transformOrigin: 'top left',
                    }}
                    className="border-0 bg-white pointer-events-none md:pointer-events-auto"
                  />
                ) : (
                  <>
                    <div
                      className="pointer-events-none absolute inset-0 opacity-25"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${projAccent}44, transparent 70%)`,
                      }}
                    />
                    <img
                      src={imgs.tablet}
                      alt={`${project.title} — Dedicated Tablet View`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover/tab:scale-105 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
                      referrerPolicy="no-referrer"
                    />
                  </>
                )}
              </div>

              <div className="flex items-center justify-between pt-1.5 mt-1.5 border-t border-white/15 text-[9px] font-mono text-white/75">
                <span className="truncate">
                  {hasLiveSite
                    ? isAr
                      ? 'تابلت تفاعلي مباشر'
                      : 'Live Tablet Viewport'
                    : isAr
                    ? 'جهاز تابلت'
                    : 'Dedicated Tablet'}
                </span>
                <span className="text-white/90 shrink-0" dir="ltr">
                  1024 × 768px
                </span>
              </div>
            </div>

            {/* 3. DEDICATED MOBILE VIEW CARD (Live Scrollable Mobile Website/Instagram or Mobile Image) */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                serviceScrollAudio.playCardHoverTick();
                onSelectMode('mobile');
              }}
              className="group/mob relative rounded-2xl overflow-hidden border border-white/30 hover:border-white/45 bg-[#07090f]/80 hover:bg-[#0b0e17]/88 backdrop-blur-3xl p-2.5 sm:p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.25)]"
            >
              <div className="flex items-center justify-between gap-1.5 pb-1.5 mb-1.5 border-b border-white/15">
                <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-white/90 flex items-center gap-1 font-semibold truncate">
                  <Smartphone
                    className="w-3 h-3 shrink-0"
                    style={{ color: projAccent }}
                  />
                  <span>{isAr ? 'عرض الجوال' : 'MOBILE VIEW'}</span>
                  {hasLiveSite && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  )}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    serviceScrollAudio.playCardHoverTick();
                    onSelectMode('mobile');
                  }}
                  className="text-[8px] font-mono uppercase tracking-widest hover:underline cursor-pointer shrink-0"
                  style={{ color: projAccent }}
                >
                  {isAr ? 'تكبير ↗' : 'EXPAND ↗'}
                </button>
              </div>

              <div
                onWheel={(e) => {
                  if (hasLiveSite) e.stopPropagation();
                }}
                onClick={(e) => {
                  if (hasLiveSite) e.stopPropagation();
                }}
                className={`relative w-full h-32 sm:h-36 rounded-xl overflow-hidden ${
                  hasLiveSite
                    ? 'bg-[#0b0e17] flex items-center justify-center p-1'
                    : 'bg-gradient-to-b from-[#0b0e17]/80 to-black/80 flex items-center justify-center p-2'
                }`}
              >
                {hasLiveSite ? (
                  <div className="relative w-[135px] sm:w-[155px] h-full rounded-lg overflow-hidden border border-white/30 bg-white shadow-lg">
                    <iframe
                      src={embedUrl}
                      title={`${project.title} — Live Mobile View`}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      style={{
                        width: '275%',
                        height: '275%',
                        transform: 'scale(0.3636)',
                        transformOrigin: 'top left',
                      }}
                      className="border-0 bg-white pointer-events-none md:pointer-events-auto"
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className="pointer-events-none absolute inset-0 opacity-25"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${projAccent}44, transparent 70%)`,
                      }}
                    />
                    <img
                      src={imgs.mobile}
                      alt={`${project.title} — Dedicated Mobile View`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover/mob:scale-105 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
                      referrerPolicy="no-referrer"
                    />
                  </>
                )}
              </div>

              <div className="flex items-center justify-between pt-1.5 mt-1.5 border-t border-white/15 text-[9px] font-mono text-white/75">
                <span className="truncate">
                  {hasLiveSite
                    ? isAr
                      ? 'جوال تفاعلي مباشر'
                      : 'Live Mobile Viewport'
                    : isAr
                    ? 'هاتف ذكي'
                    : 'Dedicated Mobile'}
                </span>
                <span className="text-white/90 shrink-0" dir="ltr">
                  390 × 844px
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Single Device Spotlight Mode using its own dedicated separated image file!
    const modeMeta: Record<
      Exclude<DeviceViewMode, 'split'>,
      {
        src: string;
        badge: string;
        description: string;
        res: string;
      }
    > = {
      desktop: {
        src: imgs.desktop,
        badge: isAr ? 'عرض شاشة سطح المكتب المخصص' : 'DEDICATED DESKTOP MONITOR VIEW',
        description: isAr
          ? 'معاينة شاشة سطح المكتب العريضة المخصصة لفحص تصميم وتجربة الكمبيوتر.'
          : 'Standalone widescreen Desktop monitor view extracted specifically for desktop layout inspection.',
        res: '1920 × 1080px',
      },
      tablet: {
        src: imgs.tablet,
        badge: isAr ? 'عرض جهاز التابلت المخصص' : 'DEDICATED TABLET VIEW',
        description: isAr
          ? 'معاينة شاشة التابلت اللمسية المخصصة لفحص القوائم وتجربة التصفح اللوحي.'
          : 'Standalone touch-first Tablet view extracted specifically for tablet catalog & grid inspection.',
        res: '1024 × 768px',
      },
      mobile: {
        src: imgs.mobile,
        badge: isAr ? 'عرض الجوال المخصص' : 'DEDICATED MOBILE VIEW',
        description: isAr
          ? 'معاينة شاشة الجوال العمودية المخصصة لفحص سرعة الاستجابة وتجربة الهاتف.'
          : 'Standalone portrait Mobile & handheld view extracted specifically for responsive mobile UX.',
        res: '390 × 844px',
      },
      full: {
        src: imgs.full,
        badge: isAr ? 'العرض الشامل لكافة الأجهزة' : 'COMPLETE MULTI-DEVICE COMPOSITE',
        description: isAr
          ? 'عرض استوديو شامل لكافة الأجهزة (سطح المكتب، التابلت، الجوال) في إطار واحد.'
          : 'Complete 1080×1080 multi-device studio composite without any edge cropping.',
        res: '1080 × 1080px',
      },
    };

    const currentMeta = modeMeta[activeMode];
    const isInteractiveLiveDevice =
      Boolean(embedUrl) &&
      (activeMode === 'desktop' ||
        activeMode === 'tablet' ||
        activeMode === 'mobile');

    const deviceFrameClass =
      activeMode === 'mobile'
        ? 'w-full max-w-[360px] mx-auto h-[380px] sm:h-[430px] rounded-[28px]'
        : activeMode === 'tablet'
        ? 'w-full max-w-[660px] mx-auto h-[360px] sm:h-[410px] rounded-[24px]'
        : `w-full ${
            isModal ? 'h-[400px] sm:h-[440px]' : 'h-[340px] sm:h-[390px]'
          } rounded-2xl`;

    return (
      <div className="relative p-4 sm:p-5 bg-[#07090f]/75 backdrop-blur-3xl flex flex-col items-center justify-center">
        {/* Ambient Accent Aura behind focused device */}
        <div
          className="pointer-events-none absolute inset-0 opacity-35 transition-all duration-500"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${projAccent}40, transparent 68%)`,
          }}
        />

        {/* Top Bar above Device Frame: Active Viewport Badge + Back to 3 Views + Cancel (X) */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#07090f]/90 border border-white/30 backdrop-blur-3xl">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: projAccent }}
            />
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/95 font-bold">
              {currentMeta.badge}
              {isInteractiveLiveDevice
                ? isAr
                  ? ' • تفاعلي مباشر'
                  : ' • LIVE INTERACTIVE'
                : ''}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isInteractiveLiveDevice && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  serviceScrollAudio.playCardHoverTick();
                  setLiveViewportMode(activeMode);
                  setLivePreviewProject(project);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d02128] hover:bg-[#e01537] text-[9px] font-mono font-bold uppercase tracking-[0.16em] text-white transition-all cursor-pointer shadow-md"
              >
                <Eye className="w-3 h-3" />
                <span>{isAr ? 'ملء الشاشة' : 'Full Screen'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                serviceScrollAudio.playCardHoverTick();
                onSelectMode('split');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#07090f]/90 hover:bg-[#0b0e17] border border-white/30 text-[9px] font-mono uppercase tracking-[0.16em] text-white backdrop-blur-3xl transition-all cursor-pointer"
            >
              <LayoutGrid className="w-3 h-3" style={{ color: projAccent }} />
              <span>{isAr ? 'الأجهزة الثلاثة' : 'All 3 Views'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                serviceScrollAudio.playCardHoverTick();
                onSelectMode('split');
              }}
              aria-label={isAr ? 'إغلاق العرض' : 'Close device view'}
              title={isAr ? 'إلغاء والعودة' : 'Cancel & Return to 3 Views'}
              className="group relative w-9 h-9 flex items-center justify-center bg-transparent border-0 text-white/85 hover:text-white transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer focus:outline-none"
            >
              <X className="w-5 h-5 stroke-[2.25] drop-shadow-[0_0_10px_rgba(255,255,255,0.65)]" />
            </button>
          </div>
        </div>

        {/* Standalone Device Frame: Live Interactive Website Iframe (when liveUrl exists) OR High-Res Mockup */}
        <div
          onWheel={(e) => {
            if (isInteractiveLiveDevice) e.stopPropagation();
          }}
          className={`relative z-10 ${deviceFrameClass} overflow-hidden border border-white/30 bg-[#07090f]/90 backdrop-blur-3xl flex flex-col items-center justify-center shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.28)] transition-all duration-500`}
        >
          {isInteractiveLiveDevice ? (
            <div className="w-full h-full flex flex-col bg-white">
              {/* Browser / Device Address Bar */}
              <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-[#0a0d16] border-b border-white/20 text-white shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#d02128]" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                </div>
                <div
                  dir="ltr"
                  className="px-2.5 py-0.5 rounded bg-white/10 border border-white/15 text-[10px] font-mono text-white/85 truncate max-w-[220px] sm:max-w-[340px]"
                >
                  {project.liveUrl}
                </div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400">
                  ● LIVE
                </span>
              </div>
              <iframe
                src={embedUrl}
                title={`${project.title} — ${currentMeta.badge}`}
                className="w-full flex-1 border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
              <img
                src={currentMeta.src}
                alt={`${project.title} — ${currentMeta.badge}`}
                className="w-full h-full object-contain transition-all duration-500 drop-shadow-[0_22px_45px_rgba(0,0,0,0.9)]"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        {/* Bottom Caption Bar */}
        <div className="relative z-10 w-full flex items-center justify-between gap-4 pt-3 mt-3 border-t border-white/15 text-xs">
          <span className="text-white/85 text-[11px] sm:text-xs">
            {currentMeta.description}
          </span>
          <span
            dir="ltr"
            className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold shrink-0 text-[#d02128]"
          >
            {currentMeta.res}
          </span>
        </div>
      </div>
    );
  };

  const translateTagOrCategory = (val: string) => {
    if (!isAr) return val;
    const map: Record<string, string> = {
      All: 'الكل',
      'Web & E-Commerce': 'المواقع والتجارة الإلكترونية',
      'Digital Marketing': 'التسويق الرقمي',
      'Branding & Design': 'الهوية البصرية والتصميم',
      'IT & Security': 'تقنية المعلومات والأمان',
      'Website Designing & Development': 'تصميم وتطوير المواقع',
      'Website Development': 'تطوير المواقع',
      'Graphic Design': 'التصميم الجرافيكي',
      'IT Consulting': 'استشارات تقنية المعلومات',
      'Logo Design': 'تصميم الشعارات',
      'Social Accounts Management': 'إدارة حسابات التواصل',
      'E-Commerce Solutions': 'حلول التجارة الإلكترونية',
      'E-Commerce Services': 'خدمات التجارة الإلكترونية',
      'E-Commerce': 'التجارة الإلكترونية',
      'E-Commerce UX': 'تجربة مستخدم المتاجر',
      'Brand Strategy': 'استراتيجية العلامة التجارية',
      'Web Showcase': 'واجهة عرض رقمية',
      'Performance Growth': 'نمو الأداء التسويقي',
      'Content Writing': 'كتابة المحتوى الإبداعي',
      'Data Analytics': 'تحليل البيانات الذكية',
      'Cyber Security': 'الأمن السيبراني',
    };
    return map[val] || val;
  };

  const WORK_PROJECT_AR_MAP: Record<string, string> = {
    'your-kitchen-is-cooking':
      'منظومة رقمية متكاملة لعلامة Your Kitchen is Cooking تجمع بين تصميم وتطوير الموقع المخصص، تصميم الشعار والهوية البصرية، الاستشارات التقنية، والتسويق الرقمي عالي التحويل.',
    sustagro:
      'نمو رقمي استراتيجي وحضور مؤسسي لعلامة Sustagro يربط ابتكارات الزراعة المستدامة بجمهور الأعمال والأفراد عبر التسويق القائم على البيانات وإدارة منصات التواصل.',
    instashop:
      'وجهة تسوق إلكترونية مصممة للجيل الجديد من المتسوقين، حيث طورت إيفيرز تجربة التسوق عبر دمج التفاعل الإنساني بأحدث تقنيات الويب المتجاوبة.',
    'al-shiekh-curtain-interiors':
      'تعاونت إيفيرز مع الشيخ للستائر والديكور لبناء واجهة رقمية فاخرة تجمع بين تطوير الويب المخصص، تصميم الهوية والشعار، وحملات التسويق الرقمي الموجهة.',
    airtilize:
      'منظومة رقمية شاملة لشركة Airtilize تشمل تصميم وتطوير الموقع، الهوية البصرية، استشارات تقنية المعلومات، والتسويق الرقمي القائم على الأداء.',
    trendifytoday:
      'متجر إلكتروني متخصص للقهوة المختصة مع هوية بصرية عصرية وتجربة مستخدم سلسة عبر أجهزة سطح المكتب والتابلت والجوال.',
    clickvolo:
      'تعاونت إيفيرز مع ClickVolo لتقديم خدمات التسويق الرقمي وإدارة حسابات التواصل الاجتماعي وتنفيذ استراتيجيات نمو ضاعفت الوصول ومعدلات التحويل.',
    khuzair:
      'شاركت إيفيرز مع Khuzair لتقديم خدمات التجارة الإلكترونية، تصميم الشعار المخصص، كتابة المحتوى، والتسويق الرقمي لتعزيز مكانة العلامة.',
    affordablethings:
      'تعاونت إيفيرز مع AffordableThings لتعزيز الحضور الرقمي وزيادة تفاعل المتسوقين عبر خدمات التجارة الإلكترونية وتصميم الهوية والتسويق الرقمي.',
    storeara:
      'تحول رقمي متكامل من 8 ركائز لعلامة StoreAra يشمل تطوير الموقع، تحليل البيانات، التجارة الإلكترونية، الاستشارات التقنية، والتسويق الرقمي.',
    reflectivethings:
      'تعاونت إيفيرز مع ReflectiveThings لإبراز هويتهم الرقمية عبر تصميم الشعار المخصص، استشارات تقنية المعلومات، التجارة الإلكترونية، والتسويق الرقمي.',
    fitwearstores:
      'منصة تجارة إلكترونية رياضية عالية الأداء لعلامة FitWearStores تجمع بين تطوير الويب، الأمن السيبراني، خدمات التجارة الإلكترونية، والتصميم الجرافيكي.',
    charmthings:
      'تعاونت إيفيرز مع CharmThings للارتقاء بمتجرهم الإلكتروني عبر تطوير الويب المخصص، الأمن السيبراني، خدمات التجارة الإلكترونية، والتسويق الرقمي.',
    allthingsdesire:
      'شاركت إيفيرز مع AllThingsDesire لتقديم تصميم وتطوير المواقع، خدمات التجارة الإلكترونية، وتصميم الشعار لبناء تجربة تسوق عالمية سلسة.',
    aapnaonlinestore:
      'وجهة تسوق إلكترونية متكاملة صممتها إيفيرز بدقة تتضمن تطوير الموقع المخصص وتصميم الشعار المميز لتجارة التجزئة الحديثة.',
    minimog:
      'منظومة مؤسسية شاملة من 10 خدمات لعلامة MiniMog تشمل تطوير الويب، الأمن السيبراني، تحليل البيانات، التجارة الإلكترونية، والتسويق الرقمي.',
    hidoose:
      'تعاونت إيفيرز مع HiDoose لتقديم خدمات تقنية معلومات شاملة تتضمن تطوير الموقع، الأمن السيبراني، تحليل البيانات، الاستشارات التقنية، والتسويق الرقمي.',
  };

  return (
    <div
      onTouchStart={(e) => {
        touchStartYRef.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        if (touchStartYRef.current === null) return;
        const dy = touchStartYRef.current - e.changedTouches[0].clientY;
        if (Math.abs(dy) > 42) {
          if (dy > 0) goToSlide(slideIndex + 1);
          else goToSlide(slideIndex - 1);
        }
        touchStartYRef.current = null;
      }}
      className="relative w-full h-screen overflow-hidden select-none text-white text-emboss"
    >
      {/* 1. Live 60fps Motion Canvas + Project Backdrop */}
      <PageMotionBackdrop
        theme="portfolio"
        accent={accent}
        slideIndex={Math.max(0, slideIndex)}
      />

      {slideIndex >= 0 && (
        <div
          key={currentProject.id}
          className={`absolute inset-0 z-0 transition-all duration-700 ${
            isTransitioning ? 'scale-105 opacity-20' : 'scale-100 opacity-30'
          }`}
        >
          <img
            src={currentProject.image}
            alt={currentProject.title}
            className="w-full h-full object-contain object-right opacity-25 blur-sm scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05060a]/95 via-[#05060a]/85 to-[#05060a]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05060a]/85 via-transparent to-[#05060a]/95" />
        </div>
      )}

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
          2A. INTRO SLIDE (-1): SPATIAL PORTFOLIO EXHIBITION
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
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl mb-4 sm:mb-5">
            <Layers className="w-3.5 h-3.5 text-[#d02128]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] sm:tracking-[0.3em] text-white/90">
              {isAr
                ? '17 منظومة رقمية رائدة • عرض لسطح المكتب والتابلت والجوال'
                : '17 FLAGSHIP DIGITAL ECOSYSTEMS • DESKTOP, TABLET & MOBILE VIEWS'}
            </span>
          </div>

          <h1 className="text-[clamp(2rem,5.8vw,5.6rem)] font-black tracking-tighter leading-[1.02] text-white max-w-5xl mb-4 sm:mb-5 drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
            {isAr ? (
              <>
                معرض المشاريع{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#d02128]">
                  والإنجازات الرقمية.
                </span>
              </>
            ) : (
              <>
                Spatial Portfolio{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#d02128]">
                  Exhibition.
                </span>
              </>
            )}
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed mb-6 sm:mb-8">
            {isAr
              ? 'استكشف أبرز منصات الويب، المتاجر الإلكترونية عالية التحويل، الهويات البصرية، وحلول الأمن السيبراني التي نفذتها إيفيرز — مع معاينة منفصلة لسطح المكتب والتابلت والجوال.'
              : 'Explore EFerz’s flagship web platforms, high-converting e-commerce stores, brand identities, and enterprise cybersecurity deployments — featuring dedicated separated Desktop, Tablet, and Mobile views.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => goToSlide(0)}
              className="group relative inline-flex items-center gap-4 px-7 sm:px-10 py-3.5 sm:py-5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-white bg-[#d02128] hover:bg-[#e01537] transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_18px_50px_rgba(196,18,48,0.45)]"
            >
              <span>
                {isAr ? 'ابدأ تصفح المشاريع' : 'Start Scrolling Portfolio'}
              </span>
              <span className="w-8 h-8 rounded-full bg-black/25 flex items-center justify-center transition-transform duration-300 group-hover:translate-y-0.5">
                <ChevronDown className="w-4 h-4 text-white" />
              </span>
            </button>

            <button
              onClick={() => setShow3DGalleryModal(true)}
              className="inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 sm:py-5 rounded-full bg-[#07090f]/75 hover:bg-[#0b0e17]/88 border border-white/30 text-white font-mono text-xs sm:text-sm uppercase tracking-[0.2em] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#d02128]" />
              <span>{isAr ? 'افتح المعرض ثلاثي الأبعاد' : 'Open 3D WebGL Space'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          2B. PROJECT SLIDE (0..16): FULL-SCREEN PROJECT SHOWCASE
      ============================================================ */}
      {slideIndex >= 0 && (
        <>

          <div
            className={`relative z-10 w-full max-w-full h-full flex items-start lg:items-center justify-center px-3 sm:px-10 ${
              isRTL
                ? 'md:pr-48 lg:pr-60 xl:pr-64 lg:pl-12'
                : 'md:pl-48 lg:pl-60 xl:pl-64 lg:pr-12'
            } pt-20 pb-24 sm:pb-20 md:pb-16 overflow-y-auto overflow-x-hidden`}
          >
            <div
              key={currentProject.id}
              className={`max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-9 items-center transition-all duration-500 ${
                isTransitioning
                  ? 'opacity-0 translate-y-5 scale-[0.98]'
                  : 'opacity-100 translate-y-0 scale-100'
              }`}
            >
              {/* Left Column: Project Story & CTA inside Black Glass Card (matching ServiceProductStoryPage) */}
              <div className="lg:col-span-5 min-w-0 overflow-hidden space-y-3.5 sm:space-y-5 p-5 sm:p-7 rounded-3xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.28)]">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.12] border border-white/25 backdrop-blur-md max-w-full">
                  <span
                    className="w-2 h-2 rounded-full shrink-0 bg-[#d02128]"
                    style={{
                      boxShadow: '0 0 10px #d02128',
                    }}
                  />
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/95 truncate">
                    {currentProject.client} • {currentProject.year}
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="shrink-0">
                    <ClientBrandStarLogo
                      logoUrl={getAssetUrl(currentProject.logo)}
                      brandName={currentProject.title}
                      accentColor={currentProject.accentColor}
                      triggerKey={currentProject.id}
                    />
                  </div>
                  <h1 className="min-w-0 flex-1 text-[clamp(1.25rem,2.35vw,2.45rem)] font-black tracking-tight leading-[1.06] text-white break-words drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
                    {currentProject.title}
                  </h1>
                </div>

              <p className="text-xs sm:text-sm lg:text-base text-white/95 leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none">
                {isAr && WORK_PROJECT_AR_MAP[currentProject.id]
                  ? WORK_PROJECT_AR_MAP[currentProject.id]
                  : currentProject.description}
              </p>

              {/* Primary Filter Highlight + Tech Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="px-3.5 py-1.5 rounded-xl border border-[#d02128]/50 bg-[#d02128]/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] font-bold text-white">
                  {translateTagOrCategory(currentProject.primaryFilter)}
                </div>
                {currentProject.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.12] border border-white/25 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-white/95"
                  >
                    {translateTagOrCategory(tag)}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                <button
                  onClick={() => {
                    setModalDeviceMode(deviceMode);
                    setActiveCaseStudy(currentProject);
                  }}
                  className="group inline-flex items-center gap-3 px-5 sm:px-7 py-3 sm:py-4 rounded-full font-mono text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-105 cursor-pointer shadow-2xl"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 40px ${accent}66`,
                  }}
                >
                  <span>{isAr ? 'تفاصيل المشروع' : 'Launch Case Study'}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {currentProject.liveUrl && (
                  <button
                    onClick={() => setLivePreviewProject(currentProject)}
                    className="inline-flex items-center gap-2.5 px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-[#0b0e17]/85 hover:bg-[#111624]/95 border border-white/30 text-white text-xs font-mono uppercase tracking-[0.18em] backdrop-blur-3xl transition-all cursor-pointer shadow-lg"
                  >
                    <Eye className="w-4 h-4 text-[#d02128]" />
                    <span>
                      {isAr ? 'معاينة حية للموقع' : 'Live Interactive Preview'}
                    </span>
                  </button>
                )}

                <button
                  onClick={() => setShow3DGalleryModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-3 sm:py-3.5 rounded-full bg-[#0b0e17]/85 hover:bg-[#111624]/95 border border-white/30 text-white/95 text-[11px] font-mono uppercase tracking-[0.18em] backdrop-blur-3xl transition-all cursor-pointer shadow-lg"
                >
                  <Layers className="w-3.5 h-3.5 text-[#d02128]" />
                  <span>{isAr ? 'معرض 3D' : '3D Space'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Separated Multi-Device Studio Showcase (Black Glass) */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
              className="lg:col-span-7 relative"
              style={{ perspective: '1200px' }}
            >
              <div
                className="relative rounded-3xl overflow-hidden border border-white/30 bg-[#07090f]/75 backdrop-blur-3xl shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.28)] transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                }}
              >
                {/* Top Studio Control Bar + Interactive Device View Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3 bg-[#07090f]/85 backdrop-blur-3xl border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d02128]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="ml-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/80 hidden sm:inline">
                      {currentProject.client} •{' '}
                      {isAr ? 'معاينة الأجهزة' : 'SEPARATED VIEWS'}
                    </span>
                  </div>

                  {/* Device Mode Switcher Tabs: 3-View Split | Desktop | Tablet | Mobile | Full */}
                  <div className="flex flex-wrap items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/20">
                    {(
                      [
                        {
                          id: 'split' as DeviceViewMode,
                          label: isAr ? '3 أجهزة' : '3-View Split',
                          icon: LayoutGrid,
                        },
                        {
                          id: 'desktop' as DeviceViewMode,
                          label: isAr ? 'كمبيوتر' : 'Desktop',
                          icon: Monitor,
                        },
                        {
                          id: 'tablet' as DeviceViewMode,
                          label: isAr ? 'تابلت' : 'Tablet',
                          icon: Tablet,
                        },
                        {
                          id: 'mobile' as DeviceViewMode,
                          label: isAr ? 'جوال' : 'Mobile',
                          icon: Smartphone,
                        },
                        {
                          id: 'full' as DeviceViewMode,
                          label: isAr ? 'كامل' : 'Full',
                          icon: Layers,
                        },
                      ] as const
                    ).map((tab) => {
                      const Icon = tab.icon;
                      const isActive = deviceMode === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            serviceScrollAudio.playCardHoverTick();
                            setDeviceMode(tab.id);
                          }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            isActive
                              ? 'text-black font-bold shadow-md'
                              : 'text-white/75 hover:text-white hover:bg-white/[0.08]'
                          }`}
                          style={
                            isActive
                              ? {
                                  backgroundColor: accent,
                                  boxShadow: `0 0 16px ${accent}55`,
                                }
                              : undefined
                          }
                        >
                          <Icon className="w-3 h-3" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Separated Device Showcase Stage */}
                {renderDeviceShowcaseStage(
                  currentProject,
                  deviceMode,
                  setDeviceMode,
                  false
                )}
              </div>
            </div>
          </div>
        </div>
        </>
      )}

      {/* 3. Side 3D Vertical Wheel Rail */}
      <VerticalWheelRail
        items={WORK_PROJECTS.map((project) => ({
          id: project.id,
          label: project.title,
          accentColor: '#d02128',
        }))}
        activeIndex={slideIndex}
        onSelect={(idx) => goToSlide(idx)}
        introLabel="Intro"
        introLabelAr="مقدمة"
        defaultAccent="#d02128"
      />

      {/* 4. Next Slide Arrow */}
      <button
        onClick={() => goToSlide(slideIndex + 1)}
        aria-label={isAr ? 'المشروع التالي' : 'Next Project'}
        className={`hidden sm:flex fixed ${
          isRTL ? 'left-6' : 'right-6'
        } top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#07090f]/80 border border-white/30 text-white/85 hover:text-white hover:border-white/50 hover:scale-110 backdrop-blur-3xl items-center justify-center transition-all cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.75)]`}
      >
        {isRTL ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>

      {/* 5. Full-Screen Edge-to-Edge 3D WebGL Gallery Modal */}
      {show3DGalleryModal && (
        <div className="fixed inset-0 z-40 bg-[#05060a] w-screen h-screen overflow-hidden">
          <PortfolioThreeGallery
            projects={WORK_PROJECTS}
            activeProject={currentProject}
            onSelectProject={(project) => {
              const idx = WORK_PROJECTS.findIndex((p) => p.id === project.id);
              if (idx !== -1) setSlideIndex(idx);
            }}
            onOpenCaseStudy={(project) => {
              setShow3DGalleryModal(false);
              setModalDeviceMode('split');
              setActiveCaseStudy(project);
            }}
            onOpenLivePreview={(project) => {
              setShow3DGalleryModal(false);
              setLiveViewportMode('desktop');
              setLivePreviewProject(project);
            }}
            onClose={() => setShow3DGalleryModal(false)}
            layoutMode={layoutMode}
            onChangeLayoutMode={setLayoutMode}
          />
        </div>
      )}

      {/* 6. Case Study Detail Modal with Interactive 3-Device Suite (Black Glass) */}
      {activeCaseStudy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-2xl"
          onClick={() => setActiveCaseStudy(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#07090f]/85 backdrop-blur-3xl border border-white/30 p-5 sm:p-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.28)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] block mb-1.5 text-[#d02128]">
                  {translateTagOrCategory(activeCaseStudy.category)} •{' '}
                  {activeCaseStudy.year}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                  {activeCaseStudy.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {/* Modal Device Switcher */}
                <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/20">
                  {(
                    [
                      {
                        id: 'split' as DeviceViewMode,
                        label: isAr ? '3 أجهزة' : '3-View Split',
                        icon: LayoutGrid,
                      },
                      {
                        id: 'desktop' as DeviceViewMode,
                        label: isAr ? 'كمبيوتر' : 'Desktop',
                        icon: Monitor,
                      },
                      {
                        id: 'tablet' as DeviceViewMode,
                        label: isAr ? 'تابلت' : 'Tablet',
                        icon: Tablet,
                      },
                      {
                        id: 'mobile' as DeviceViewMode,
                        label: isAr ? 'جوال' : 'Mobile',
                        icon: Smartphone,
                      },
                      {
                        id: 'full' as DeviceViewMode,
                        label: isAr ? 'كامل' : 'Full',
                        icon: Layers,
                      },
                    ] as const
                  ).map((tab) => {
                    const Icon = tab.icon;
                    const isActive = modalDeviceMode === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setModalDeviceMode(tab.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          isActive
                            ? 'text-black font-bold'
                            : 'text-white/75 hover:text-white hover:bg-white/[0.08]'
                        }`}
                        style={
                          isActive
                            ? { backgroundColor: activeCaseStudy.accentColor }
                            : undefined
                        }
                      >
                        <Icon className="w-3 h-3" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCaseStudy(null)}
                  aria-label={isAr ? 'إغلاق' : 'Close'}
                  title={isAr ? 'إغلاق' : 'Close'}
                  className="group relative w-10 h-10 flex items-center justify-center bg-transparent border-0 text-white/85 hover:text-white transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer focus:outline-none"
                >
                  <X className="w-6 h-6 stroke-[2.25] drop-shadow-[0_0_12px_rgba(255,255,255,0.75)]" />
                </button>
              </div>
            </div>

            {/* Interactive 3-Device Showcase inside Modal */}
            <div className="rounded-2xl overflow-hidden border border-white/25 mb-6 bg-[#07090f]/80">
              {renderDeviceShowcaseStage(
                activeCaseStudy,
                modalDeviceMode,
                setModalDeviceMode,
                true
              )}
            </div>

            <p className="text-white/95 text-sm sm:text-base leading-relaxed mb-3">
              {isAr && WORK_PROJECT_AR_MAP[activeCaseStudy.id]
                ? WORK_PROJECT_AR_MAP[activeCaseStudy.id]
                : activeCaseStudy.description}
            </p>

            {activeCaseStudy.secondaryDescription && !isAr && (
              <p className="text-white/75 text-sm leading-relaxed mb-6">
                {activeCaseStudy.secondaryDescription}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20">
              <div className="flex flex-wrap gap-2">
                {activeCaseStudy.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-white/[0.12] border border-white/25 text-xs font-mono text-white/95"
                  >
                    {translateTagOrCategory(t)}
                  </span>
                ))}
              </div>

              {activeCaseStudy.liveUrl && (
                <button
                  type="button"
                  onClick={() => {
                    const proj = activeCaseStudy;
                    setActiveCaseStudy(null);
                    setLiveViewportMode('desktop');
                    setLivePreviewProject(proj);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest text-black cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: activeCaseStudy.accentColor }}
                >
                  <Eye className="w-4 h-4" />
                  <span>
                    {isAr ? 'معاينة حية للموقع' : 'Live Interactive Preview'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. Live Interactive Preview Modal (In-App Preview with Desktop, Tablet & Mobile Switcher + Clean Direct X Cancel Icon) */}
      {livePreviewProject && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-black/95 backdrop-blur-3xl p-3 sm:p-6"
          onClick={() => setLivePreviewProject(null)}
        >
          {/* Top Studio Control Header */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 mb-3 sm:mb-4 rounded-2xl bg-[#07090f]/90 border border-white/30 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Back Arrow + Brand Title */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setLivePreviewProject(null)}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
              >
                {isRTL ? (
                  <ArrowRight className="w-4 h-4" />
                ) : (
                  <ArrowLeft className="w-4 h-4" />
                )}
                <span>{isAr ? 'رجوع' : 'Back'}</span>
              </button>

              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.18em] text-white font-bold truncate">
                {livePreviewProject.title} —{' '}
                {isAr ? 'معاينة حية تفاعلية' : 'LIVE INTERACTIVE PREVIEW'}
              </span>
            </div>

            {/* Center: Interactive Device Viewport Switcher (Desktop / Tablet / Mobile) */}
            <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/25">
              {(
                [
                  {
                    id: 'desktop' as LiveViewportMode,
                    label: isAr ? 'كمبيوتر' : 'Desktop',
                    icon: Monitor,
                    res: '100%',
                  },
                  {
                    id: 'tablet' as LiveViewportMode,
                    label: isAr ? 'تابلت' : 'Tablet',
                    icon: Tablet,
                    res: '768px',
                  },
                  {
                    id: 'mobile' as LiveViewportMode,
                    label: isAr ? 'جوال' : 'Mobile',
                    icon: Smartphone,
                    res: '390px',
                  },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = liveViewportMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      serviceScrollAudio.playCardHoverTick();
                      setLiveViewportMode(tab.id);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#d02128] text-white font-bold shadow-[0_0_16px_rgba(208,33,40,0.6)]'
                        : 'text-white/75 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Clean Direct Cross (X) Cancel Icon (Matches Navigation Cancel) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLivePreviewProject(null)}
                aria-label={isAr ? 'إغلاق المعاينة الحية' : 'Close Live Preview'}
                title={isAr ? 'إغلاق المعاينة الحية' : 'Close Live Preview'}
                className="group relative w-10 h-10 flex items-center justify-center bg-transparent border-0 text-white/85 hover:text-white transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer focus:outline-none"
              >
                <X className="w-6 h-6 stroke-[2.25] drop-shadow-[0_0_12px_rgba(255,255,255,0.75)]" />
              </button>
            </div>
          </div>

          {/* Interactive Responsive Viewport Container */}
          <div
            className="flex-1 flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`h-full transition-all duration-500 overflow-hidden border border-white/30 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col ${
                liveViewportMode === 'mobile'
                  ? 'w-full max-w-[400px] max-h-[844px] rounded-[34px] border-[6px] border-[#151926]'
                  : liveViewportMode === 'tablet'
                  ? 'w-full max-w-[820px] max-h-[92%] rounded-[26px] border-[5px] border-[#151926]'
                  : 'w-full rounded-2xl'
              }`}
            >
              {/* Simulated Browser / Device Top Bar */}
              <div className="flex items-center justify-between gap-3 px-4 py-2 bg-[#0b0e17] border-b border-white/15 text-white shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setLivePreviewProject(null)}
                    title={isAr ? 'إغلاق' : 'Cancel / Close'}
                    className="w-3 h-3 rounded-full bg-[#d02128] hover:scale-125 transition-transform cursor-pointer"
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div
                  dir="ltr"
                  className="px-3 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-white/85 truncate max-w-[240px] sm:max-w-[460px]"
                >
                  {livePreviewProject.liveUrl}
                </div>
                <button
                  type="button"
                  onClick={() => setLivePreviewProject(null)}
                  aria-label="Close"
                  className="text-white/75 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <iframe
                src={getEmbeddableLiveUrl(livePreviewProject.liveUrl)}
                title={livePreviewProject.title}
                className="w-full flex-1 border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

