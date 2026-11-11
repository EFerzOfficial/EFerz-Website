import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Facebook,
  Globe2,
  Info,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  Youtube,
} from 'lucide-react';
import { ViewType } from '../types';
import { MorphShape } from '../data/morphShapes';
import { EFERZ_CONTACT_DETAILS, EFerzSocialLink } from '../data/eferzSiteData';
import { AgenceLogo } from './AgenceLogo';
import { serviceScrollAudio } from '../utils/serviceScrollAudio';
import { useLocale } from '../utils/LocaleContext';

interface EFerzBottomFooterBarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenSearch: () => void;
  onPreviewShape?: (
    shape: MorphShape | null,
    scheme?: 'white' | 'cyan' | 'amber' | 'emerald' | 'red'
  ) => void;
}

const renderSocialIcon = (id: EFerzSocialLink['id']) => {
  switch (id) {
    case 'instagram':
      return <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />;
    case 'facebook':
      return <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />;
    case 'linkedin':
      return <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />;
    case 'youtube':
      return <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />;
  }
};

export const EFerzBottomFooterBar: React.FC<EFerzBottomFooterBarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onPreviewShape,
}) => {
  const { isRTL } = useLocale();
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (!infoOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInfoOpen(false);
        onPreviewShape?.(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [infoOpen, onPreviewShape]);

  const handleNav = (view: ViewType) => {
    serviceScrollAudio.playCardHoverTick();
    setInfoOpen(false);
    onNavigate(view);
  };

  const mainNavLinks: { id: ViewType; label: string }[] = [
    { id: 'agency', label: isRTL ? 'الرئيسية للوكالة' : 'Agency Home' },
    { id: 'services', label: isRTL ? 'الخدمات' : 'Services' },
    { id: 'work', label: isRTL ? 'أعمالنا' : 'Portfolio' },
    { id: 'clients', label: isRTL ? 'العملاء والآراء' : 'Clients & Reviews' },
    { id: 'team', label: isRTL ? 'فريق القيادة' : 'Leadership Team' },
    { id: 'contact', label: isRTL ? 'ابدأ مشروعك' : 'Start a Project' },
  ];

  // Information, company, blog, contact & policy pages
  const companyLegalLinks: { id: ViewType; label: string; desc: string }[] = [
    {
      id: 'about',
      label: isRTL ? 'من نحن' : 'About Us',
      desc: isRTL
        ? 'قصتنا ورسالتنا وتواجدنا العالمي منذ 2019'
        : 'Our story, mission & global presence since 2019',
    },
    {
      id: 'blog',
      label: isRTL ? 'المدونة والمقالات' : 'Blog & Insights',
      desc: isRTL
        ? 'الهندسة البرمجية، واجهات المستخدم، SEO، الذكاء الاصطناعي وأمازون'
        : 'Engineering, Dark Mode UI, SEO, AI & Amazon FBA',
    },
    {
      id: 'contact',
      label: isRTL ? 'اتصل بنا' : 'Contact Us',
      desc: isRTL
        ? 'مكاتبنا في أمريكا والسعودية وأرقام التواصل المباشر'
        : 'Direct USA & KSA offices, phones & project inquiry',
    },
    {
      id: 'privacy',
      label: isRTL ? 'سياسة الخصوصية' : 'Privacy Policy',
      desc: isRTL
        ? 'كيف نحمي ونتعامل مع بياناتك الشخصية'
        : 'How we protect & handle your personal data',
    },
    {
      id: 'terms',
      label: isRTL ? 'شروط الخدمة' : 'Terms of Service',
      desc: isRTL
        ? 'اتفاقية خدمة العملاء الرسمية ونطاق العمل'
        : 'Official client service agreement & scope',
    },
    {
      id: 'refund',
      label: isRTL ? 'سياسة الاسترجاع' : 'Refund Policy',
      desc: isRTL
        ? 'ضمان استرداد الأموال لمدة 30 يوماً وشروط الفوترة'
        : '30-Day Money-Back Guarantee & billing terms',
    },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* ELEVATED GLASSMORPHIC "INFORMATION" HUB OVERLAY                           */}
      {/* ========================================================================= */}
      {infoOpen && (
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[60] flex items-end justify-center px-3 sm:px-6 pb-14 pt-20 bg-black/45 backdrop-blur-xl select-none transition-all duration-300"
        >
          <div
            onClick={() => {
              setInfoOpen(false);
              onPreviewShape?.(null);
            }}
            className="absolute inset-0"
            aria-hidden="true"
          />

          <div
            onMouseEnter={() => onPreviewShape?.('book_insights', 'amber')}
            onMouseLeave={() => {
              if (!infoOpen) onPreviewShape?.(null);
            }}
            className="relative z-10 w-full max-w-[1380px] mx-auto rounded-3xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl p-5 sm:p-7 lg:p-9 text-white shadow-[0_25px_90px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.28)] max-h-[84vh] overflow-y-auto"
          >
            {/* Top Subtle Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#d02128]/70 to-transparent" />

            {/* Header Row inside Information Hub (with Search Box) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-white/15">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleNav('agency')}
                  className="cursor-pointer bg-transparent border-none p-0 text-left flex items-center group focus:outline-none"
                  aria-label="EFerz Digital Agency"
                >
                  <AgenceLogo size="md" />
                </button>
                <span className="hidden sm:inline text-white/25">|</span>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-white/85">
                  <Sparkles className="w-3.5 h-3.5 text-[#d02128]" />
                  <span>
                    {isRTL
                      ? 'المعلومات الرسمية والدليل العالمي'
                      : 'OFFICIAL INFORMATION & GLOBAL DIRECTORY'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    serviceScrollAudio.playCardHoverTick();
                    setInfoOpen(false);
                    onPreviewShape?.(null);
                    onOpenSearch();
                  }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#07090f]/75 hover:bg-white/[0.15] border border-white/25 hover:border-[#d02128]/60 text-xs font-mono text-white/90 hover:text-white transition-all cursor-pointer backdrop-blur-2xl"
                >
                  <Search className="w-3.5 h-3.5 text-[#d02128]" />
                  <span>{isRTL ? 'ابحث في الموقع...' : 'Search Site...'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInfoOpen(false);
                    onPreviewShape?.(null);
                  }}
                  className="p-2 rounded-xl bg-[#07090f]/75 hover:bg-[#d02128] border border-white/25 text-white/85 hover:text-white transition-all cursor-pointer backdrop-blur-2xl"
                  title={isRTL ? 'إغلاق' : 'Close Information Hub'}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3-Column Glassmorphic Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Column 1 (5 Cols): Information, Company, Contact Us & Legal Pages + Social Links */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {companyLegalLinks.map((item) => {
                    const active = currentView === item.id;
                    const itemPreviewShape: Record<
                      string,
                      {
                        shape: MorphShape;
                        scheme: 'white' | 'cyan' | 'amber' | 'emerald' | 'red';
                      }
                    > = {
                      about: { shape: '07', scheme: 'amber' },
                      blog: { shape: 'book_insights', scheme: 'amber' },
                      contact: { shape: 'envelope', scheme: 'emerald' },
                      privacy: { shape: 'shield', scheme: 'emerald' },
                      terms: { shape: 'document', scheme: 'amber' },
                      refund: { shape: 'refund_badge', scheme: 'cyan' },
                    };
                    return (
                      <button
                        key={item.id + item.label}
                        type="button"
                        onClick={() => handleNav(item.id)}
                        onMouseEnter={() => {
                          const p = itemPreviewShape[item.id];
                          if (p) onPreviewShape?.(p.shape, p.scheme);
                        }}
                        onMouseLeave={() =>
                          onPreviewShape?.('book_insights', 'amber')
                        }
                        className={`group ${
                          isRTL ? 'text-right' : 'text-left'
                        } p-3.5 rounded-2xl border backdrop-blur-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                          active
                            ? 'bg-[#d02128]/20 border-[#d02128]/60 shadow-[0_0_25px_rgba(208,33,40,0.2)]'
                            : 'bg-[#07090f]/75 hover:bg-white/[0.12] border-white/25 hover:border-white/35'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-xs sm:text-sm font-bold transition-colors ${
                              active
                                ? 'text-[#d02128]'
                                : 'text-white group-hover:text-[#d02128]'
                            }`}
                          >
                            {item.label}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-white/45 group-hover:text-[#d02128] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                        </div>
                        <p className="text-[11px] text-white/75 leading-snug mt-1.5 line-clamp-2">
                          {item.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Official Social Media Icons (Icon-Only with Direct Embedded Links) */}
                <div className="flex items-center gap-2.5 pt-1">
                  {EFERZ_CONTACT_DETAILS.socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="w-10 h-10 rounded-xl bg-[#07090f]/75 hover:bg-white/[0.18] border border-white/25 hover:border-white/40 backdrop-blur-2xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                    >
                      {renderSocialIcon(social.id)}
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2 (3 Cols): Main Navigation Links */}
              <div className="lg:col-span-3 space-y-3">
                <div className="p-4 rounded-2xl bg-[#07090f]/75 border border-white/25 backdrop-blur-2xl space-y-1.5">
                  {mainNavLinks.map((item) => {
                    const active = currentView === item.id;
                    return (
                      <button
                        key={item.id + item.label}
                        type="button"
                        onClick={() => handleNav(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          active
                            ? 'bg-[#d02128] text-white font-bold'
                            : 'text-white/85 hover:text-white hover:bg-white/[0.12]'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    );
                  })}
                </div>

                <div className="px-3.5 py-2.5 rounded-2xl bg-[#d02128]/15 border border-[#d02128]/40 flex items-center gap-2 text-[11px] font-mono text-white">
                  <ShieldCheck className="w-4 h-4 text-[#d02128] shrink-0" />
                  <span>
                    {isRTL
                      ? 'ضمان الرضا لمدة 30 يوماً'
                      : '30-Day Satisfaction Guarantee'}
                  </span>
                </div>
              </div>

              {/* Column 3 (4 Cols): Official USA (Call + WhatsApp) & KSA Offices & Email */}
              <div className="lg:col-span-4 space-y-3">
                {/* USA Office: Call + WhatsApp + Address */}
                <div className="p-4 rounded-2xl bg-[#07090f]/75 border border-white/25 backdrop-blur-2xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-[#d02128]" />
                      <span>
                        {isRTL
                          ? 'الولايات المتحدة (USA)'
                          : 'UNITED STATES (USA)'}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                      {isRTL ? 'المقر · فلوريدا' : 'HQ · FLORIDA'}
                    </span>
                  </div>

                  {/* Direct Call Line: +1 (786) 224-4112 */}
                  <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-black/45 border border-white/15">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/80">
                      <PhoneCall className="w-3.5 h-3.5 text-[#d02128]" />
                      <span>{isRTL ? 'اتصال (USA)' : 'CALL (USA)'}</span>
                    </span>
                    <a
                      href="tel:+17862244112"
                      dir="ltr"
                      className="text-xs font-mono font-bold text-[#d02128] hover:underline"
                    >
                      {EFERZ_CONTACT_DETAILS.usaPhone}
                    </a>
                  </div>

                  {/* Direct WhatsApp Line: +1 (954) 336-2586 */}
                  <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#d02128]/15 border border-[#d02128]/40">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white font-semibold">
                      <MessageCircle className="w-3.5 h-3.5 text-[#d02128]" />
                      <span>{isRTL ? 'واتساب' : 'WHATSAPP'}</span>
                    </span>
                    <a
                      href={EFERZ_CONTACT_DETAILS.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-white hover:text-[#d02128] transition-colors"
                    >
                      <span>{EFERZ_CONTACT_DETAILS.whatsappPhone}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#d02128]" />
                    </a>
                  </div>

                  <div className="flex items-start gap-2 text-white/85 text-[11px] leading-relaxed pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#d02128] shrink-0 mt-0.5" />
                    <span>{EFERZ_CONTACT_DETAILS.usaAddress}</span>
                  </div>
                </div>

                {/* KSA Office */}
                <div className="p-4 rounded-2xl bg-[#07090f]/75 border border-white/25 backdrop-blur-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-[#d02128]" />
                      <span>
                        {isRTL
                          ? 'المملكة العربية السعودية (KSA)'
                          : 'SAUDI ARABIA (KSA)'}
                      </span>
                    </span>
                    <a
                      href="tel:+966539046410"
                      dir="ltr"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#d02128] hover:underline"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Call: {EFERZ_CONTACT_DETAILS.ksaPhone}</span>
                    </a>
                  </div>
                  <div className="flex items-start gap-2 text-white/85 text-[11px] leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-[#d02128] shrink-0 mt-0.5" />
                    <span>{EFERZ_CONTACT_DETAILS.ksaAddress}</span>
                  </div>
                </div>

                {/* Official Email */}
                <div className="p-3.5 rounded-2xl bg-[#07090f]/75 border border-white/25 backdrop-blur-2xl flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">
                    {isRTL ? 'البريد الرسمي' : 'OFFICIAL EMAIL'}
                  </span>
                  <a
                    href={`mailto:${EFERZ_CONTACT_DETAILS.primaryEmail}`}
                    dir="ltr"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-[#d02128] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#d02128]" />
                    <span>{EFERZ_CONTACT_DETAILS.primaryEmail}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* RIGHT-EDGE PEEKING ICON TAB: INFORMATION HUB (Unified with Locale & Login)*/}
      {/* ========================================================================= */}
      <div
        dir="ltr"
        className="fixed right-0 bottom-[78px] sm:bottom-[86px] z-50 pointer-events-auto select-none"
      >
        <button
          type="button"
          onClick={() => {
            serviceScrollAudio.playCardHoverTick();
            setInfoOpen((prev) => {
              const next = !prev;
              if (next) {
                onPreviewShape?.('book_insights', 'amber');
              } else {
                onPreviewShape?.(null);
              }
              return next;
            });
          }}
          onMouseEnter={() => onPreviewShape?.('book_insights', 'amber')}
          onMouseLeave={() => {
            if (!infoOpen) {
              onPreviewShape?.(null);
            }
          }}
          aria-label="EFerz Information & Global Directory"
          title={
            isRTL
              ? 'المعلومات الرسمية والدليل العالمي'
              : 'EFerz Information, Pages & Policies'
          }
          className="group relative flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-2.5 pr-1.5 sm:pr-2 py-1 sm:py-1.5 rounded-l-xl bg-white/[0.14] hover:bg-[#d02128] border border-r-0 border-white/25 hover:border-[#d02128] backdrop-blur-2xl text-white shadow-[0_8px_30px_rgba(0,0,0,0.65)] transition-all duration-300 cursor-pointer"
        >
          {/* Active pulse dot */}
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d02128] group-hover:bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d02128] group-hover:bg-white" />
          </span>

          <Info className="w-3.5 h-3.5 text-white/90 group-hover:text-white transition-transform duration-300 group-hover:scale-110 shrink-0" />

          <span className="max-w-0 overflow-hidden group-hover:max-w-[90px] transition-all duration-300 text-[10px] font-mono font-bold uppercase tracking-[0.18em] whitespace-nowrap text-white">
            {isRTL ? 'معلومات' : 'Info'}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TRANSPARENT BOTTOM HUD FOOTER (Fixed Copyright Bar Only)                  */}
      {/* ========================================================================= */}
      <footer
        dir="ltr"
        className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none select-none text-emboss"
      >
        <div className="w-full pl-4 sm:pl-12 lg:pl-16 pr-14 sm:pr-20 pb-2.5 sm:pb-3.5 pt-2 max-w-[1560px] mx-auto flex items-center justify-start gap-2 text-[10px] sm:text-xs font-mono text-[#fffdff]/65 pointer-events-none">
          {/* Left: Copyright Only */}
          <div className="flex items-center truncate">
            <span className="truncate">
              {isRTL
                ? `© ${new Date().getFullYear()} وكالة EFerz الرقمية. جميع الحقوق محفوظة.`
                : `© ${new Date().getFullYear()} EFerz Digital Agency. All Rights Reserved.`}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};
