import React from 'react';
import { serviceScrollAudio } from '../utils/serviceScrollAudio';
import { useLocale } from '../utils/LocaleContext';

export interface WheelRailItem {
  id: string;
  label: string;
  labelAr?: string;
  sublabel?: string;
  accentColor?: string;
}

interface VerticalWheelRailProps {
  items: WheelRailItem[];
  activeIndex: number; // -1 for Intro (when includeIntro=true), 0..N-1 for items
  onSelect: (index: number) => void;
  introLabel?: string;
  introLabelAr?: string;
  defaultAccent?: string;
  includeIntro?: boolean;
}

const ARABIC_WHEEL_DICT: Record<string, string> = {
  Intro: 'مقدمة',
  Overview: 'نظرة عامة',
  'What We Do': 'ماذا نقدم',
  'Languages & Tools': 'اللغات والأدوات',
  'Services Included': 'الخدمات المشمولة',
  'Quality Guarantee': 'ضمان الجودة',
  'Start a Project': 'ابدأ مشروعك',
  'Agency Overview': 'نظرة عامة على الوكالة',
  'Our Story & Mission': 'قصتنا ورسالتنا',
  'Core Principles': 'المبادئ الأساسية',
  'Digital Capabilities': 'القدرات الرقمية',
  'Global Headquarters': 'المقرات العالمية',
  'Web Design & Development': 'تصميم وتطوير المواقع',
  'E-Commerce Solutions': 'حلول التجارة الإلكترونية',
  'Amazon FBA': 'إدارة أمازون FBA',
  'Digital Marketing': 'التسويق الرقمي',
  'Search Engine Optimization (SEO)': 'تحسين محركات البحث (SEO)',
  'Social Media Marketing': 'التسويق عبر التواصل الاجتماعي',
  'Brand Development': 'تطوير الهوية التجارية',
  'Graphic Designing': 'التصميم الجرافيكي',
  'Content Creation & Copywriting': 'صناعة المحتوى والكتابة الإعلانية',
  'AI Solutions & Automation': 'حلول الذكاء الاصطناعي والأتمتة',
  'Cybersecurity & Cloud IT Solutions': 'الأمن السيبراني والحوسبة السحابية',
};

function translateWheelText(label: string, isRTL: boolean, explicitAr?: string): string {
  if (!isRTL) return label;
  if (explicitAr) return explicitAr;
  return ARABIC_WHEEL_DICT[label] || label;
}

/**
 * Truncates long brand/service names cleanly with "..." so the left wheel
 * never collides or links visually with the main center content.
 */
function formatWheelLabel(label: string, maxChars: number = 18): string {
  const trimmed = label.trim();
  if (trimmed.length <= maxChars) return trimmed;
  return `${trimmed.slice(0, maxChars).trimEnd()}...`;
}

/**
 * Vertical 3D Perspective Wheel Rail on the left side of the viewport.
 */
export const VerticalWheelRail: React.FC<VerticalWheelRailProps> = ({
  items,
  activeIndex,
  onSelect,
  introLabel = 'Intro',
  introLabelAr = 'مقدمة',
  defaultAccent = '#d02128',
  includeIntro = true,
}) => {
  const { isRTL } = useLocale();

  // Build unified list where index -1 is Intro (when includeIntro is true) and 0..N-1 are the actual items
  const allEntries = [
    ...(includeIntro
      ? [
          {
            index: -1,
            id: '__intro__',
            label: isRTL ? introLabelAr : introLabel,
            accentColor: defaultAccent,
          },
        ]
      : []),
    ...items.map((item, idx) => ({
      index: idx,
      id: item.id,
      label: translateWheelText(item.label, isRTL, item.labelAr),
      accentColor: item.accentColor || defaultAccent,
    })),
  ];

  // Position in the unified array (0..allEntries.length-1)
  const activePos = includeIntro ? activeIndex + 1 : activeIndex;
  const activeEntry = allEntries[activePos] || allEntries[0];
  const currentAccent = activeEntry.accentColor || defaultAccent;

  const ITEM_STEP_Y = 40; // vertical spacing in px between wheel slots

  return (
    <>
      {/* ============================================================
          DESKTOP / TABLET VERTICAL 3D WHEEL RAIL (Left in LTR, Right in RTL)
      ============================================================ */}
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`hidden md:flex fixed ${
          isRTL ? 'right-3 lg:right-6' : 'left-3 lg:left-6'
        } top-1/2 -translate-y-1/2 z-30 h-[380px] lg:h-[400px] w-[175px] lg:w-[195px] items-center pointer-events-none select-none`}
        style={{ perspective: '900px' }}
      >
        <div className="relative h-full w-full flex items-center">
          {/* Vertical Spine Line with top/bottom fade */}
          <div
            className={`absolute ${
              isRTL ? 'right-2' : 'left-2'
            } top-6 bottom-6 w-[1px] transition-colors duration-500`}
            style={{
              background: `linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.14) 22%, ${currentAccent}88 50%, rgba(255,255,255,0.14) 78%, transparent 100%)`,
            }}
          />

          {/* Center Active Indicator Pip on the spine */}
          <div
            className={`absolute ${
              isRTL ? 'right-[5px]' : 'left-[5px]'
            } top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full transition-all duration-500`}
            style={{
              backgroundColor: currentAccent,
              boxShadow: `0 0 14px ${currentAccent}, 0 0 28px ${currentAccent}`,
            }}
          />

          {/* 3D Wheel Items Container */}
          <div
            className="relative w-full h-full overflow-visible"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
            }}
          >
            {allEntries.map((entry, pos) => {
              const offset = pos - activePos;
              const absOffset = Math.abs(offset);

              // Only render items within visible wheel range
              if (absOffset > 5) return null;

              const isActive = offset === 0;
              const translateY = offset * ITEM_STEP_Y;
              const rawTranslateX = isActive
                ? 10
                : Math.max(-12, -absOffset * 3.5);
              const translateX = isRTL ? -rawTranslateX : rawTranslateX;
              const scale = isActive
                ? 1.03
                : Math.max(0.76, 1 - absOffset * 0.065);
              const rotateX = offset * -11;
              const opacity = isActive
                ? 1
                : absOffset === 1
                ? 0.46
                : absOffset === 2
                ? 0.25
                : absOffset === 3
                ? 0.12
                : 0.05;
              const blurPx = isActive
                ? 0
                : absOffset === 1
                ? 0
                : (absOffset - 1) * 0.75;

              const displayLabel = formatWheelLabel(entry.label, 19);

              return (
                <button
                  key={entry.id}
                  type="button"
                  title={entry.label}
                  onClick={() => {
                    serviceScrollAudio.playCardHoverTick();
                    onSelect(entry.index);
                  }}
                  style={{
                    transform: `translate3d(${translateX}px, calc(-50% + ${translateY}px), 0) scale(${scale}) rotateX(${rotateX}deg)`,
                    opacity,
                    filter: blurPx > 0 ? `blur(${blurPx}px)` : 'none',
                    transformOrigin: isRTL ? 'right center' : 'left center',
                  }}
                  className={`pointer-events-auto group absolute ${
                    isRTL
                      ? 'right-4 text-right pl-2'
                      : 'left-4 text-left pr-2'
                  } top-1/2 flex items-center gap-2 py-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer max-w-[165px]`}
                >
                  {/* Active connector tick */}
                  <span
                    className="h-[1.5px] rounded-full transition-all duration-500 shrink-0"
                    style={{
                      width: isActive ? '14px' : '5px',
                      backgroundColor: isActive
                        ? entry.accentColor
                        : 'rgba(255,255,255,0.25)',
                      boxShadow: isActive
                        ? `0 0 10px ${entry.accentColor}`
                        : 'none',
                    }}
                  />

                  {/* Clean Brand / Service Name Only */}
                  <span
                    className={`whitespace-nowrap tracking-tight transition-all duration-300 ${
                      isActive
                        ? 'text-xs lg:text-[13px] font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]'
                        : 'text-[11px] font-medium text-white/75 group-hover:text-white'
                    }`}
                    style={
                      isActive
                        ? {
                            textShadow: `0 0 22px ${entry.accentColor}80`,
                          }
                        : undefined
                    }
                  >
                    {displayLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================
          MOBILE COMPACT NAVIGATION BAR (Positioned cleanly above footer)
      ============================================================ */}
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="md:hidden fixed bottom-12 left-3 right-14 z-30 flex items-center justify-between gap-2 px-3 py-1.5 rounded-2xl bg-[#06080f]/90 border border-white/15 backdrop-blur-xl shadow-2xl"
      >
        <button
          type="button"
          onClick={() => {
            const minIdx = includeIntro ? -1 : 0;
            const prev = activeIndex <= minIdx ? items.length - 1 : activeIndex - 1;
            onSelect(prev);
          }}
          className="px-2.5 py-1 rounded-lg bg-white/[0.08] text-[10px] font-mono uppercase tracking-wider text-white/85 active:scale-95 cursor-pointer"
        >
          {isRTL ? 'السابق' : 'Prev'}
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              backgroundColor: currentAccent,
              boxShadow: `0 0 10px ${currentAccent}`,
            }}
          />
          <span className="text-[11px] font-bold text-white truncate">
            {formatWheelLabel(activeEntry.label, 22)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            const minIdx = includeIntro ? -1 : 0;
            const next = activeIndex >= items.length - 1 ? minIdx : activeIndex + 1;
            onSelect(next);
          }}
          className="px-2.5 py-1 rounded-lg bg-white/[0.08] text-[10px] font-mono uppercase tracking-wider text-white/85 active:scale-95 cursor-pointer"
        >
          {isRTL ? 'التالي' : 'Next'}
        </button>
      </div>
    </>
  );
};
