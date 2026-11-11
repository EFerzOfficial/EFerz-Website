import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Hand } from 'lucide-react';
import { AgenceLogo } from './AgenceLogo';
import { ViewType, ThemeMode } from '../types';
import { MorphShape } from '../data/morphShapes';
import { spaceAudio } from '../utils/ambientSpaceAudio';
import { serviceScrollAudio } from '../utils/serviceScrollAudio';
import { useLocale } from '../utils/LocaleContext';

interface AgenceHeaderProps {
  currentView: ViewType;
  onNavigate?: (view: ViewType) => void;
  onSelectView?: (view: ViewType) => void;
  isMenuOpen?: boolean;
  menuOpen?: boolean;
  onToggleMenu?: () => void;
  onOpenMenu?: () => void;
  onOpenSearch?: () => void;
  themeMode?: ThemeMode;
  onToggleThemeMode?: (mode?: ThemeMode) => void;
  onPreviewShape?: (
    shape: MorphShape | null,
    scheme?: 'white' | 'cyan' | 'amber' | 'emerald' | 'red'
  ) => void;
  isGestureNavActive?: boolean;
  onToggleGestureNav?: () => void;
}

export const AgenceHeader: React.FC<AgenceHeaderProps> = ({
  onNavigate,
  onSelectView,
  isMenuOpen,
  menuOpen,
  onToggleMenu,
  onOpenMenu,
  onPreviewShape,
  isGestureNavActive,
  onToggleGestureNav,
}) => {
  const { isRTL } = useLocale();
  const activeMenuOpen = Boolean(isMenuOpen ?? menuOpen);
  const handleSelect = onNavigate || onSelectView || (() => {});
  const handleToggleMenuClick = onToggleMenu || onOpenMenu || (() => {});

  const [bgMusicEnabled, setBgMusicEnabled] = useState<boolean>(() =>
    spaceAudio.isActive()
  );
  const [motionSfxEnabled, setMotionSfxEnabled] = useState<boolean>(
    () => !serviceScrollAudio.isMuted()
  );
  const [soundHover, setSoundHover] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);

  const anyAudioActive = bgMusicEnabled || motionSfxEnabled;

  const handleToggleBgMusic = () => {
    const nextState = spaceAudio.toggle();
    setBgMusicEnabled(nextState);
  };

  const handleToggleMotionSfx = () => {
    const muted = serviceScrollAudio.toggleMute();
    setMotionSfxEnabled(!muted);
  };

  const handleMainIconClick = () => {
    setSoundHover((prev) => !prev);
  };

  return (
    <header
      onMouseEnter={() => setHeaderHovered(true)}
      onMouseLeave={() => setHeaderHovered(false)}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500"
    >
      {/* Seamless Feathered Blur Backdrop */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-24 sm:h-28 pointer-events-none transition-opacity duration-300 backdrop-blur-md bg-gradient-to-b from-[#070709]/90 via-[#070709]/40 to-transparent ${
          headerHovered || soundHover || activeMenuOpen ? 'opacity-100' : 'opacity-90'
        }`}
      />

      <div className="relative flex items-center justify-between px-4 sm:px-10 lg:px-12 py-4 sm:py-6">
        {/* Left (or Right in RTL): Official EFerz Logo */}
        <button
          type="button"
          onClick={() => {
            serviceScrollAudio.playCardHoverTick();
            handleSelect('agency');
          }}
          className="pointer-events-auto cursor-pointer text-left flex items-center group bg-transparent border-none p-0 focus:outline-none"
          aria-label="EFerz Digital Agency"
        >
          <AgenceLogo size="md" />
        </button>

        {/* Controls: Unified Dual-Audio Icon + Clean 2-Line Hamburger Menu */}
        <div className="flex items-center gap-3 sm:gap-6 pointer-events-auto">
          {/* Unified Audio Controller Button with Hover / Click Popover for Background Music & Motion Audio */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => {
              setSoundHover(true);
              onPreviewShape?.('music_note', 'red');
            }}
            onMouseLeave={() => {
              setSoundHover(false);
              onPreviewShape?.(null);
            }}
          >
            <button
              type="button"
              onClick={handleMainIconClick}
              aria-label={isRTL ? 'إعدادات الصوت' : 'Cosmic Audio Controls'}
              className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
                bgMusicEnabled
                  ? 'bg-[#d02128]/20 border-[#d02128] text-white shadow-[0_0_20px_rgba(208,33,40,0.5)]'
                  : motionSfxEnabled
                  ? 'bg-white/[0.08] border-white/30 text-white hover:border-[#d02128]/70'
                  : 'bg-white/[0.04] border-white/15 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/[0.08]'
              } backdrop-blur-md cursor-pointer group`}
            >
              {bgMusicEnabled && (
                <span className="absolute inset-0 rounded-full border border-[#d02128] animate-ping opacity-30 pointer-events-none" />
              )}

              {bgMusicEnabled ? (
                <div className="flex items-end gap-[2px] h-3.5">
                  <span className="w-[2px] bg-[#d02128] rounded-full animate-[soundWave_0.8s_ease-in-out_infinite] h-full" />
                  <span className="w-[2px] bg-white rounded-full animate-[soundWave_0.6s_ease-in-out_infinite_0.2s] h-2" />
                  <span className="w-[2px] bg-[#d02128] rounded-full animate-[soundWave_0.9s_ease-in-out_infinite_0.4s] h-3" />
                  <span className="w-[2px] bg-white rounded-full animate-[soundWave_0.7s_ease-in-out_infinite_0.1s] h-1.5" />
                </div>
              ) : anyAudioActive ? (
                <Volume2 className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
              ) : (
                <VolumeX className="w-4 h-4 transition-transform group-hover:scale-110" />
              )}
            </button>

            {/* Hover Bridge + Interactive Dual Audio Popover */}
            <div
              className={`absolute top-9 pt-3 ${
                isRTL ? 'left-0' : 'right-0'
              } w-64 sm:w-72 z-50 transition-all duration-300 ${
                soundHover
                  ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                  : 'opacity-0 -translate-y-2 pointer-events-none invisible'
              }`}
            >
              <div className="p-3.5 rounded-2xl bg-[#07090f]/95 backdrop-blur-3xl border border-white/25 shadow-[0_24px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)] space-y-2.5">
                <div className="flex items-center justify-between border-b border-white/15 pb-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] font-bold text-white/90">
                    {isRTL ? 'التحكم بالصوت الفضائي' : 'COSMIC AUDIO SYSTEM'}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#d02128] font-bold">
                    {bgMusicEnabled && motionSfxEnabled
                      ? isRTL
                        ? 'كامل'
                        : 'DUAL ON'
                      : anyAudioActive
                      ? isRTL
                        ? 'نشط'
                        : 'ACTIVE'
                      : isRTL
                      ? 'صامت'
                      : 'MUTED'}
                  </span>
                </div>

                {/* Option 1: Background Cosmic Music */}
                <button
                  type="button"
                  onClick={handleToggleBgMusic}
                  className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                    bgMusicEnabled
                      ? 'bg-[#d02128]/15 border-[#d02128]/60 text-white'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/15 text-white/75'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        bgMusicEnabled
                          ? 'bg-[#d02128] text-white shadow-[0_0_12px_rgba(208,33,40,0.6)]'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      <Music className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-white truncate">
                        {isRTL ? 'موسيقى الخلفية' : 'Background Music'}
                      </div>
                      <div className="text-[10px] text-white/60 truncate">
                        {isRTL ? 'محيط فضائي هادئ' : 'Cosmic Ambient Pad'}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                      bgMusicEnabled
                        ? 'bg-[#d02128] text-white'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {bgMusicEnabled
                      ? isRTL
                        ? 'تشغيل'
                        : 'ON'
                      : isRTL
                      ? 'إيقاف'
                      : 'OFF'}
                  </span>
                </button>

                {/* Option 2: Motion & Scroll Sound Effects */}
                <button
                  type="button"
                  onClick={handleToggleMotionSfx}
                  className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                    motionSfxEnabled
                      ? 'bg-[#d02128]/15 border-[#d02128]/60 text-white'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/15 text-white/75'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        motionSfxEnabled
                          ? 'bg-[#d02128] text-white shadow-[0_0_12px_rgba(208,33,40,0.6)]'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-white truncate">
                        {isRTL ? 'مؤثرات الحركة' : 'Motion Audio'}
                      </div>
                      <div className="text-[10px] text-white/60 truncate">
                        {isRTL ? 'مؤثرات التمرير والتفاعل' : 'Scroll & Scene SFX'}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                      motionSfxEnabled
                        ? 'bg-[#d02128] text-white'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {motionSfxEnabled
                      ? isRTL
                        ? 'تشغيل'
                        : 'ON'
                      : isRTL
                      ? 'إيقاف'
                      : 'OFF'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Air Gestures / Touchless Hands-Free Camera Navigation Button */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => {
              onPreviewShape?.('monitor', 'cyan');
            }}
            onMouseLeave={() => {
              onPreviewShape?.(null);
            }}
          >
            <button
              type="button"
              onClick={() => {
                serviceScrollAudio.playCardHoverTick();
                onToggleGestureNav?.();
              }}
              aria-label={
                isRTL
                  ? 'التحكم بدون لمس عبر كاميرا الجهاز'
                  : 'Touchless Air Gestures: Camera Scroll'
              }
              title={
                isRTL
                  ? 'تصفح بدون لمس بإشارة اليد'
                  : 'Touchless Hands-Free Navigation'
              }
              className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
                isGestureNavActive
                  ? 'bg-[#d02128]/25 border-[#d02128] text-white shadow-[0_0_22px_rgba(208,33,40,0.7)]'
                  : 'bg-white/[0.04] border-white/15 text-white/70 hover:text-white hover:border-[#d02128]/70 hover:bg-white/[0.08]'
              } backdrop-blur-md cursor-pointer group`}
            >
              {isGestureNavActive && (
                <>
                  <span className="absolute inset-0 rounded-full border border-[#d02128] animate-ping opacity-35 pointer-events-none" />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black shadow-[0_0_8px_rgba(52,211,153,0.8)] pointer-events-none" />
                </>
              )}
              <Hand className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                isGestureNavActive ? 'text-white' : 'text-white/80 group-hover:text-white'
              }`} />
            </button>
          </div>

          {/* Minimalist 2-Line Hamburger Menu Button with Organic Ink Shadow Preview on Hover */}
          <div
            className="relative flex items-center"
          >
            <button
              type="button"
              onClick={() => {
                serviceScrollAudio.playCardHoverTick();
                handleToggleMenuClick();
              }}
              aria-label={
                activeMenuOpen
                  ? isRTL
                    ? 'إغلاق القائمة'
                    : 'Close Menu'
                  : isRTL
                  ? 'فتح القائمة'
                  : 'Open Menu'
              }
              className="group relative w-12 h-11 flex flex-col items-end justify-center gap-[7px] cursor-pointer focus:outline-none"
            >
              {/* Subtle Magnetic Ink-Crimson Aura Behind the Menu Icon on Hover */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -inset-4 rounded-full transition-all duration-700 ease-out ${
                  activeMenuOpen
                    ? 'bg-[radial-gradient(circle,rgba(208,33,40,0.45)_0%,rgba(0,0,0,0.8)_70%,transparent_100%)] scale-125 opacity-100 blur-md'
                    : 'bg-[radial-gradient(circle,rgba(0,0,0,0.85)_0%,rgba(208,33,40,0.35)_55%,transparent_100%)] scale-50 opacity-0 group-hover:scale-125 group-hover:opacity-100 blur-md'
                }`}
              />

              {/* Line 1: White */}
              <span
                className={`relative z-10 block h-[2.5px] rounded-full bg-white transition-all duration-300 ease-out ${
                  activeMenuOpen
                    ? 'w-8 translate-y-[4.75px] rotate-45 shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                    : 'w-8 group-hover:scale-x-105 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.9)] origin-right'
                }`}
              />
              {/* Line 2: EFerz Signature Red */}
              <span
                className={`relative z-10 block h-[2.5px] rounded-full bg-[#d02128] shadow-[0_0_12px_rgba(208,33,40,0.75)] transition-all duration-300 ease-out ${
                  activeMenuOpen
                    ? 'w-8 -translate-y-[4.75px] -rotate-45 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                    : 'w-8 group-hover:scale-x-105 group-hover:shadow-[0_0_18px_rgba(208,33,40,0.95)] origin-right'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
