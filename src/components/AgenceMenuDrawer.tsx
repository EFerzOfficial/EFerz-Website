import React, { useEffect, useRef, useState } from 'react';
import { ViewType, Language } from '../types';
import { serviceScrollAudio } from '../utils/serviceScrollAudio';
import { getAssetUrl } from '../utils/assetUrl';

interface AgenceMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewType;
  onSelectView?: (view: ViewType) => void;
  onNavigate?: (view: ViewType) => void;
  onOpenSearch?: () => void;
  lang?: Language;
  onToggleLang?: (lang?: Language) => void;
  isLightMode?: boolean;
  onReplayIntro?: () => void;
}

const NAV_ITEMS: { id: ViewType; label: string; labelAr: string }[] = [
  { id: 'agency', label: 'AGENCY', labelAr: 'الوكالة' },
  { id: 'services', label: 'SERVICES', labelAr: 'الخدمات' },
  { id: 'work', label: 'PORTFOLIO', labelAr: 'أعمالنا' },
  { id: 'clients', label: 'CLIENTS', labelAr: 'العملاء' },
  { id: 'team', label: 'TEAM', labelAr: 'فريق العمل' },
  { id: 'contact', label: 'START A PROJECT', labelAr: 'ابدأ مشروعك' },
];

export const AgenceMenuDrawer: React.FC<AgenceMenuDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  onSelectView,
  onNavigate,
  lang = 'en',
}) => {
  const isRTL = lang === 'ar';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [menuHoverPreview, setMenuHoverPreview] = useState(false);
  const [hoveredId, setHoveredId] = useState<ViewType | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [cursorLens, setCursorLens] = useState({ x: -500, y: -500 });

  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;
  const hoverPreviewRef = useRef(menuHoverPreview);
  hoverPreviewRef.current = menuHoverPreview;

  // Progress of the organic ink shadow spread:
  // 0.0 = completely hidden
  // 0.14 = corner ink shadow preview when hovering the Menu button (like Video 01 at 0:00)
  // 1.0 = full screen engulfed in deep organic black/red/white ink shadow (like Video 01 at 0:01-0:04)
  const inkSpreadRef = useRef<number>(0);

  // Listen for Menu button hover in AgenceHeader to show the top-right corner ink shadow preview
  useEffect(() => {
    const handleMenuHover = (e: Event) => {
      const customEvt = e as CustomEvent<{ hovered: boolean }>;
      setMenuHoverPreview(Boolean(customEvt.detail?.hovered));
    };
    window.addEventListener('eferz-menu-hover', handleMenuHover);
    return () => window.removeEventListener('eferz-menu-hover', handleMenuHover);
  }, []);

  // Play warm atmospheric swell when menu opens
  useEffect(() => {
    if (isOpen) {
      serviceScrollAudio.playChapterTransition(2);
    }
  }, [isOpen]);

  // Continuous Organic Ink-Cloud & Feathered Shadow Canvas (Video 01 style in EFerz Black, Red & White)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Pre-generate organic fractal noise harmonics for the feathered ink-cloud boundary
    const harmonics = [
      { freq: 3, amp: 0.095, speed: 1.1, phase: 0.4 },
      { freq: 5, amp: 0.072, speed: -1.5, phase: 1.7 },
      { freq: 9, amp: 0.054, speed: 2.0, phase: 2.9 },
      { freq: 14, amp: 0.036, speed: -2.6, phase: 4.1 },
      { freq: 21, amp: 0.022, speed: 3.3, phase: 0.9 },
    ];

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.016;

      const targetSpread = isOpenRef.current ? 1.0 : 0.0;

      // Responsive and snappy organic ink shadow spread
      const easeSpeed = isOpenRef.current
        ? 0.16 // Fast, punchy engulfing when menu is clicked
        : 0.18; // Fast retreat when closed

      inkSpreadRef.current += (targetSpread - inkSpreadRef.current) * easeSpeed;
      const spread = inkSpreadRef.current;

      ctx.clearRect(0, 0, width, height);

      if (spread > 0.002) {
        // Origin of the ink cloud: Top-Right Menu Button corner (or Top-Left in RTL)
        const originX = isRTL ? 45 : width - 45;
        const originY = 38;
        const maxDiag = Math.hypot(width, height) * 1.32;
        const baseRadius = spread * maxDiag;

        // Multi-layered feathered ink clouds in EFerz Black, Red & White theme (NO dot/ball particles):
        // Layer 0: Outer Feathered Dark Smoke Shadow
        // Layer 1: EFerz Crimson Red Undertow (#d02128)
        // Layer 2: Soft Starlight White Mist Rim
        // Layer 3: Deep Velvet Obsidian Black Core (#050507)
        const layers = [
          {
            scale: 1.24,
            blur: 46,
            color: 'rgba(10, 4, 6, 0.46)',
            phaseOffset: 0.6,
          },
          {
            scale: 1.13,
            blur: 32,
            color: 'rgba(208, 33, 40, 0.42)', // EFerz Red feathered wave
            phaseOffset: 0.3,
          },
          {
            scale: 1.05,
            blur: 22,
            color: 'rgba(255, 253, 255, 0.16)', // Crisp White mist highlight
            phaseOffset: 0.15,
          },
          {
            scale: 0.98,
            blur: 14,
            color: 'rgba(5, 5, 7, 0.985)', // Deep Black core
            phaseOffset: 0.0,
          },
        ];

        for (let l = 0; l < layers.length; l++) {
          const layer = layers[l];
          const rLayer = baseRadius * layer.scale;

          ctx.save();
          ctx.filter = `blur(${layer.blur}px)`;
          ctx.beginPath();

          // Start at the corner origin and sweep an organic noisy arc across the viewport
          const steps = 110;
          for (let s = 0; s <= steps; s++) {
            const theta = (s / steps) * Math.PI * 2;
            let noise = 0;
            for (let h = 0; h < harmonics.length; h++) {
              const hm = harmonics[h];
              noise +=
                Math.sin(
                  theta * hm.freq + t * hm.speed + hm.phase + layer.phaseOffset
                ) * hm.amp;
            }

            // Extra organic billowing when the ink cloud is hovering or mid-transition
            const midTransitionBoost = Math.sin(
              Math.min(1, spread * 1.1) * Math.PI
            );
            const r =
              rLayer * (1 + noise * (0.85 + midTransitionBoost * 0.9));

            const px = originX + Math.cos(theta) * r;
            const py = originY + Math.sin(theta) * r;

            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }

          ctx.closePath();
          ctx.fillStyle = layer.color;
          ctx.fill();
          ctx.restore();
        }

        // Rich Red & Black Ambient Texture Glow inside the open/opening menu background (zero dots/balls)
        if (spread > 0.15) {
          const texAlpha = Math.min(1, (spread - 0.15) / 0.85);
          ctx.save();

          // Moving Crimson & Obsidian Nebula Texture Wave 1 (Top-Right to Center)
          const gx1 = width * (0.72 + Math.sin(t * 0.45) * 0.08);
          const gy1 = height * (0.28 + Math.cos(t * 0.38) * 0.08);
          const grad1 = ctx.createRadialGradient(
            gx1,
            gy1,
            10,
            gx1,
            gy1,
            Math.max(width, height) * 0.65
          );
          grad1.addColorStop(0, `rgba(208, 33, 40, ${0.18 * texAlpha})`);
          grad1.addColorStop(0.45, `rgba(95, 10, 16, ${0.1 * texAlpha})`);
          grad1.addColorStop(1, 'rgba(5, 5, 7, 0)');
          ctx.fillStyle = grad1;
          ctx.fillRect(0, 0, width, height);

          // Moving Crimson & White Soft Contrast Texture Wave 2 (Bottom-Right to Left)
          const gx2 = width * (0.82 + Math.cos(t * 0.32) * 0.07);
          const gy2 = height * (0.78 + Math.sin(t * 0.42) * 0.07);
          const grad2 = ctx.createRadialGradient(
            gx2,
            gy2,
            10,
            gx2,
            gy2,
            Math.max(width, height) * 0.58
          );
          grad2.addColorStop(0, `rgba(208, 33, 40, ${0.22 * texAlpha})`);
          grad2.addColorStop(0.5, `rgba(255, 255, 255, ${0.035 * texAlpha})`);
          grad2.addColorStop(1, 'rgba(5, 5, 7, 0)');
          ctx.fillStyle = grad2;
          ctx.fillRect(0, 0, width, height);

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isRTL]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const nx = (e.clientX / (window.innerWidth || 1) - 0.5) * 2;
    const ny = (e.clientY / (window.innerHeight || 1) - 0.5) * 2;
    setMouseOffset({ x: nx, y: ny });
    setCursorLens({ x: e.clientX, y: e.clientY });
  };

  const handleSelect = (view: ViewType) => {
    serviceScrollAudio.playCardHoverTick();
    if (onSelectView) onSelectView(view);
    if (onNavigate) onNavigate(view);
    onClose();
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-40 overflow-hidden select-none ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. ORGANIC INK-SHADOW CLOUD CANVAS (HOVER CORNER PREVIEW + FULL SPREAD)   */}
      {/* ========================================================================= */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full z-[1]"
      />

      {/* Click-outside catcher when menu is open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="absolute inset-0 z-[2]"
          aria-hidden="true"
        />
      )}



      {/* ========================================================================= */}
      {/* 2. LARGER, STRAIGHT, UPRIGHT EFERZ LOGO ON BOTTOM-RIGHT WITH LIVING MOTION*/}
      {/*    - Zero tilt/distortion — 100% upright official proportions             */}
      {/*    - Larger scale + living breathing glow, floating motion & aura rings   */}
      {/* ========================================================================= */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-4 sm:right-10 lg:right-14 bottom-4 sm:bottom-8 lg:bottom-10 z-[3] flex items-end justify-end transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? 'translate-y-0 scale-100 opacity-100 blur-0 delay-75'
            : 'translate-y-12 scale-90 opacity-0 blur-[12px]'
        }`}
      >
        <div
          style={{
            transform: `translate3d(${mouseOffset.x * -24}px, ${
              mouseOffset.y * -16
            }px, 0) scale(${hoveredId ? 1.05 : 1})`,
            transition: 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative flex items-center justify-center"
        >
          {/* Slow Orbiting Luminous Rings Behind the Upright Logo */}
          <div className="absolute w-[340px] sm:w-[500px] lg:w-[660px] h-[340px] sm:h-[500px] lg:h-[660px] rounded-full border border-[#d02128]/20 animate-[spin_26s_linear_infinite]" />
          <div className="absolute w-[280px] sm:w-[420px] lg:w-[560px] h-[280px] sm:h-[420px] lg:h-[560px] rounded-full border border-white/[0.08] animate-[spin_20s_linear_infinite_reverse]" />

          {/* Deep Breathing Crimson & Starlight Aura Behind the Upright Logo */}
          <div className="absolute w-[320px] sm:w-[480px] lg:w-[640px] h-[320px] sm:h-[480px] lg:h-[640px] rounded-full bg-[radial-gradient(circle,rgba(208,33,40,0.30)_0%,rgba(255,255,255,0.08)_48%,transparent_72%)] blur-3xl animate-pulse" />

          {/* Official EFerz Logo — Larger, Straight, Upright, Visible with Gentle Floating & Breathing Motion */}
          <img
            src="https://eferz.com/wp-content/uploads/2026/08/Logo-scaled.png"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = getAssetUrl('/textures/eferz_logo.png');
            }}
            alt="EFerz"
            className="w-[310px] sm:w-[460px] md:w-[580px] lg:w-[680px] h-auto object-contain opacity-[0.28] filter brightness-125 contrast-125 drop-shadow-[0_14px_55px_rgba(208,33,40,0.55)] animate-[pulse_4.5s_ease-in-out_infinite]"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LEFT-ALIGNED CINEMATIC NAVIGATION LINKS WITH RED & WHITE LINES         */}
      {/*    - Left-aligned like before                                             */}
      {/*    - Active page shows the glowing Red line (#d02128)                     */}
      {/*    - Hovering other items reveals the glowing White line                  */}
      {/* ========================================================================= */}
      <div
        className={`relative z-10 h-full w-full flex flex-col justify-center px-8 sm:px-20 lg:px-28 pt-20 pb-16 overflow-y-auto transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="max-w-7xl w-full mx-auto flex flex-col justify-center space-y-2 sm:space-y-3 my-auto">
          {NAV_ITEMS.map((item, idx) => {
            const isActive = currentView === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => handleSelect(item.id)}
                onMouseEnter={() => {
                  setHoveredId(item.id);
                  serviceScrollAudio.playCardHoverTick();
                }}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  transitionDelay: isOpen ? `${40 + idx * 25}ms` : '0ms',
                }}
                className={`group relative flex items-center w-fit ${
                  isRTL ? 'text-right' : 'text-left'
                } py-1.5 sm:py-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                  isOpen
                    ? 'translate-x-0 translate-y-0 opacity-100 blur-0'
                    : '-translate-x-12 translate-y-2 opacity-0 blur-[6px]'
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Fixed-width Line Indicator Container so text never shifts or flickers on hover */}
                  <div className="w-10 sm:w-14 h-2 sm:h-2.5 flex items-center justify-start shrink-0">
                    <span
                      className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ease-out ${
                        isActive
                          ? 'w-full bg-[#d02128] shadow-[0_0_22px_#d02128]'
                          : 'w-0 group-hover:w-full bg-white/95 shadow-[0_0_16px_rgba(255,255,255,0.7)]'
                      }`}
                    />
                  </div>

                  {/* Pure Display Title: Active has crimson glow, Hover turns crisp white with 100% stable geometry */}
                  <span
                    className={`text-[clamp(2rem,5.8vh,5rem)] font-black tracking-tighter leading-[0.94] transition-colors duration-300 ${
                      isActive
                        ? 'text-white drop-shadow-[0_0_26px_rgba(208,33,40,0.55)]'
                        : 'text-white/50 group-hover:text-white'
                    }`}
                  >
                    {isRTL ? item.labelAr : item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
