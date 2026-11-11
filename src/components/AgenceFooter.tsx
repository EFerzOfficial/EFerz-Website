import React from 'react';
import { AgenceLogo } from './AgenceLogo';
import { ViewType, Language } from '../types';
import { GlobalOrbitalGlobe3D } from './GlobalOrbitalGlobe3D';

interface AgenceFooterProps {
  onNavigate: (view: ViewType) => void;
  lang: Language;
  onToggleLang: () => void;
  isLightMode: boolean;
}

export function AgenceFooter({
  onNavigate,
  lang,
  onToggleLang,
  isLightMode,
}: AgenceFooterProps) {
  return (
    <footer
      className="relative z-20 w-full select-none overflow-hidden"
      style={{
        backgroundColor: '#0d0d0d',
        color: '#fffdff',
      }}
    >
      {/* 1. Global 3D Interactive Orbital Globe Motion (Matching Video 07) */}
      <div className="w-full pt-12 pb-4 border-b border-white/10 bg-gradient-to-b from-transparent to-[#121212]/80">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="text-center max-w-xl mx-auto mb-2 space-y-2">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#ec3935] uppercase">
              Global Presence · Worldwide Impact
            </span>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-[#fffdff] tracking-tight">
              Connected across continents<span className="text-[#ec3935]">.</span>
            </h3>
          </div>

          <GlobalOrbitalGlobe3D isLightMode={isLightMode} />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-14">
        {/* Top Row: Logo & Navigation */}
        <div className="flex items-center justify-between gap-8 flex-wrap pb-9 border-b border-white/10">
          <button
            onClick={() => onNavigate('agency')}
            className="bg-transparent border-none p-0 cursor-pointer focus:outline-none flex items-center gap-3.5 group"
            aria-label="EFerz — Home"
          >
            <AgenceLogo size="md" isLight={isLightMode} />
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-[#fffdff] group-hover:text-[#ec3935] transition-colors leading-none">
                EFERZ
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#fffdff]/55 uppercase leading-none mt-1">
                {lang === 'ar' ? 'الوكالة الرقمية' : 'DIGITAL AGENCY'}
              </span>
            </div>
          </button>

          <nav className="flex items-center gap-6 sm:gap-9 flex-wrap">
            <button
              onClick={() => onNavigate('agency')}
              className="text-[15px] font-sans font-medium text-[#fffdff]/85 hover:text-[#ec3935] bg-transparent border-none cursor-pointer transition-colors"
            >
              Agency
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="text-[15px] font-sans font-medium text-[#fffdff]/85 hover:text-[#ec3935] bg-transparent border-none cursor-pointer transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => onNavigate('work')}
              className="text-[15px] font-sans font-medium text-[#fffdff]/85 hover:text-[#ec3935] bg-transparent border-none cursor-pointer transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => onNavigate('clients')}
              className="text-[15px] font-sans font-medium text-[#fffdff]/85 hover:text-[#ec3935] bg-transparent border-none cursor-pointer transition-colors"
            >
              Clients
            </button>
            <button
              onClick={() => onNavigate('team')}
              className="text-[15px] font-sans font-medium text-[#fffdff]/85 hover:text-[#ec3935] bg-transparent border-none cursor-pointer transition-colors"
            >
              Team
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="text-[15px] font-sans font-medium text-[#fffdff]/85 hover:text-[#ec3935] bg-transparent border-none cursor-pointer transition-colors"
            >
              Contact
            </button>

            {/* Language Toggle Pill */}
            <button
              onClick={onToggleLang}
              className="text-xs font-bold tracking-wider text-[#fffdff]/70 hover:text-[#ec3935] hover:border-[#ec3935] border border-white/20 rounded-full px-3.5 py-1 transition-all cursor-pointer"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
          </nav>
        </div>

        {/* Bottom Row: Copyright & Legal */}
        <div className="flex items-center justify-between gap-5 flex-wrap pt-7">
          <span className="text-sm font-sans text-[#fffdff]/60">
            © 2026 Eferz, AI Development, Communication & Digital Strategy.
          </span>

          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-xs font-sans text-[#fffdff]/60 hover:text-[#ec3935] cursor-pointer transition-colors">
              Legal notice
            </span>
            <span className="text-xs font-sans text-[#fffdff]/60 hover:text-[#ec3935] cursor-pointer transition-colors">
              Privacy policy
            </span>
            <span className="text-xs font-sans text-[#fffdff]/60 hover:text-[#ec3935] cursor-pointer transition-colors">
              Terms of use
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

