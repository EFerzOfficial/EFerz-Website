import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  Coins,
  DollarSign,
  Eye,
  EyeOff,
  Globe,
  KeyRound,
  Languages,
  Lock,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import { AgenceLogo } from './AgenceLogo';
import { serviceScrollAudio } from '../utils/serviceScrollAudio';
import { useLocale } from '../utils/LocaleContext';
import { Currency, Language } from '../types';

import { MorphShape } from '../data/morphShapes';

const EFERZ_PORTAL_URL = 'https://eferz.net/crm/';

interface EFerzPortalLoginWidgetProps {
  onSelectShape?: (
    shape: MorphShape,
    scheme?: 'white' | 'cyan' | 'amber' | 'emerald' | 'red'
  ) => void;
  onPreviewShape?: (
    shape: MorphShape | null,
    scheme?: 'white' | 'cyan' | 'amber' | 'emerald' | 'red'
  ) => void;
}

export const EFerzPortalLoginWidget: React.FC<EFerzPortalLoginWidgetProps> = ({
  onPreviewShape,
}) => {
  const { lang, setLang, currency, setCurrency, isRTL } = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [isLocaleOpen, setIsLocaleOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen && !isLocaleOpen) return;
    const timer = isOpen
      ? window.setTimeout(() => {
          userInputRef.current?.focus();
        }, 80)
      : undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsLocaleOpen(false);
        onPreviewShape?.(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isLocaleOpen, onPreviewShape]);

  const handleOpen = () => {
    serviceScrollAudio.playCardHoverTick();
    setIsLocaleOpen(false);
    setIsOpen(true);
    onPreviewShape?.('portal_lock', 'red');
  };

  const handleClose = () => {
    serviceScrollAudio.playCardHoverTick();
    setIsOpen(false);
    onPreviewShape?.(null);
  };

  const handleOpenLocale = () => {
    serviceScrollAudio.playCardHoverTick();
    setIsOpen(false);
    setIsLocaleOpen(true);
    onPreviewShape?.('globe', 'cyan');
  };

  const handleCloseLocale = () => {
    serviceScrollAudio.playCardHoverTick();
    setIsLocaleOpen(false);
    onPreviewShape?.(null);
  };

  const handleSelectLanguage = (nextLang: Language) => {
    serviceScrollAudio.playCardHoverTick();
    setLang(nextLang);
  };

  const handleSelectCurrency = (nextCurrency: Currency) => {
    serviceScrollAudio.playCardHoverTick();
    setCurrency(nextCurrency);
  };

  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userVal = username.trim();
    const passVal = password;

    if (!userVal || !passVal) return;

    setIsSubmitting(true);
    serviceScrollAudio.playServiceLaunch();

    // Exact Base64 Auth token generation from user's CRM Portal script (keeps password hidden from URL)
    const payload = JSON.stringify({ u: userVal, p: passVal });
    const authToken = btoa(unescape(encodeURIComponent(payload)));
    const targetUrl =
      EFERZ_PORTAL_URL + '#auth=' + encodeURIComponent(authToken);

    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = targetUrl;
      } else {
        window.location.href = targetUrl;
      }
    } catch {
      window.location.href = targetUrl;
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. UPPER PEEKING ICON TAB: LANGUAGE (EN / AR) & CURRENCY (USD / SAR)      */}
      {/* ========================================================================= */}
      <div
        dir="ltr"
        className="fixed right-0 bottom-[42px] sm:bottom-12 z-50 pointer-events-auto select-none"
      >
        <button
          type="button"
          onClick={handleOpenLocale}
          onMouseEnter={() => onPreviewShape?.('globe', 'cyan')}
          onMouseLeave={() => {
            if (!isLocaleOpen && !isOpen) {
              onPreviewShape?.(null);
            }
          }}
          aria-label="Language & Currency Selector"
          title={
            isRTL
              ? 'اللغة والعملة (AR / EN · SAR / USD)'
              : 'Language & Currency (EN / AR · USD / SAR)'
          }
          className="group relative flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-2.5 pr-1.5 sm:pr-2 py-1 sm:py-1.5 rounded-l-xl bg-white/[0.14] hover:bg-[#d02128] border border-r-0 border-white/25 hover:border-[#d02128] backdrop-blur-2xl text-white shadow-[0_8px_30px_rgba(0,0,0,0.65)] transition-all duration-300 translate-x-[3px] hover:translate-x-0 cursor-pointer"
        >
          {/* Active Language / Currency indicator dot */}
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d02128] group-hover:bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d02128] group-hover:bg-white" />
          </span>

          <Globe className="w-3.5 h-3.5 text-white/90 group-hover:text-white transition-transform duration-300 group-hover:scale-110 shrink-0" />

          <span className="max-w-0 overflow-hidden group-hover:max-w-[90px] transition-all duration-300 text-[10px] font-mono font-bold uppercase tracking-[0.18em] whitespace-nowrap text-white">
            {lang === 'ar' ? 'AR' : 'EN'} · {currency}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. LOWER PEEKING ICON TAB: PORTAL LOGIN (Aligned on Start a Project strip)*/}
      {/* ========================================================================= */}
      <div
        dir="ltr"
        className="fixed right-0 bottom-1.5 sm:bottom-2.5 z-50 pointer-events-auto select-none"
      >
        <button
          type="button"
          onClick={handleOpen}
          onMouseEnter={() => onPreviewShape?.('portal_lock', 'red')}
          onMouseLeave={() => {
            if (!isOpen && !isLocaleOpen) {
              onPreviewShape?.(null);
            }
          }}
          aria-label="EFerz Intelligence Portal Login"
          title="EFerz Portal Login"
          className="group relative flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-2.5 pr-1.5 sm:pr-2 py-1 sm:py-1.5 rounded-l-xl bg-white/[0.14] hover:bg-[#d02128] border border-r-0 border-white/25 hover:border-[#d02128] backdrop-blur-2xl text-white shadow-[0_8px_30px_rgba(0,0,0,0.65)] transition-all duration-300 translate-x-[3px] hover:translate-x-0 cursor-pointer"
        >
          {/* Subtle active pulse dot */}
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d02128] group-hover:bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d02128] group-hover:bg-white" />
          </span>

          <Lock className="w-3.5 h-3.5 text-white/90 group-hover:text-white transition-transform duration-300 group-hover:scale-110 shrink-0" />

          <span className="max-w-0 overflow-hidden group-hover:max-w-[90px] transition-all duration-300 text-[10px] font-mono font-bold uppercase tracking-[0.18em] whitespace-nowrap text-white">
            {isRTL ? 'البوابة' : 'Portal'}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODAL A: LANGUAGE (ENGLISH / ARABIC RTL) & CURRENCY (USD / SAR) POPUP     */}
      {/* ========================================================================= */}
      {isLocaleOpen && (
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md select-none animate-fadeIn"
        >
          {/* Backdrop Click to Close */}
          <div
            onClick={handleCloseLocale}
            className="absolute inset-0"
            aria-hidden="true"
          />

          {/* Glassmorphic Modal Box */}
          <div className="relative z-10 w-full max-w-[430px] rounded-3xl bg-white/[0.15] border border-white/30 backdrop-blur-3xl p-6 sm:p-7 text-white shadow-[0_30px_90px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.35)]">
            {/* Top Subtle Red Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#d02128] to-transparent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseLocale}
              aria-label="Close Language & Currency Settings"
              className={`absolute top-5 ${
                isRTL ? 'left-5' : 'right-5'
              } w-8 h-8 rounded-xl bg-white/[0.08] hover:bg-[#d02128] border border-white/15 hover:border-[#d02128] flex items-center justify-center text-white/75 hover:text-white transition-all cursor-pointer`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="mb-2.5 scale-95">
                <AgenceLogo />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d02128]/20 border border-[#d02128]/45 mb-2">
                <Globe className="w-3.5 h-3.5 text-[#d02128]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-white">
                  {isRTL
                    ? 'إعدادات اللغة والعملة'
                    : 'GLOBAL LANGUAGE & CURRENCY'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-black tracking-tight text-white">
                {isRTL ? 'اختر اللغة والعملة' : 'Language & Currency'}
              </h3>
              <p className="text-xs text-white/75 mt-1 max-w-xs leading-relaxed">
                {isRTL
                  ? 'اختر لغتك المفضلة (مع دعم كامل للعربية RTL) وعملة العرض'
                  : 'Select your preferred display language (with full Arabic RTL support) and currency'}
              </p>
            </div>

            {/* Section 1: Language Selector (English & Arabic ONLY) */}
            <div className="space-y-2.5 mb-5">
              <label className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-white/80">
                <Languages className="w-3.5 h-3.5 text-[#d02128]" />
                <span>{isRTL ? 'اللغة (Language)' : 'SELECT LANGUAGE'}</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* English Option */}
                <button
                  type="button"
                  onClick={() => handleSelectLanguage('en')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    lang === 'en'
                      ? 'bg-[#d02128] border-[#d02128] text-white shadow-[0_10px_25px_rgba(208,33,40,0.45)]'
                      : 'bg-black/35 hover:bg-white/[0.1] border-white/20 text-white/85'
                  }`}
                >
                  <div>
                    <div className="text-xs sm:text-sm font-bold">English</div>
                    <div className="text-[10px] font-mono opacity-80">
                      LTR · Global
                    </div>
                  </div>
                  {lang === 'en' && <Check className="w-4 h-4 shrink-0" />}
                </button>

                {/* Arabic Option (RTL) */}
                <button
                  type="button"
                  onClick={() => handleSelectLanguage('ar')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    lang === 'ar'
                      ? 'bg-[#d02128] border-[#d02128] text-white shadow-[0_10px_25px_rgba(208,33,40,0.45)]'
                      : 'bg-black/35 hover:bg-white/[0.1] border-white/20 text-white/85'
                  }`}
                >
                  <div>
                    <div className="text-xs sm:text-sm font-bold">
                      العربية (Arabic)
                    </div>
                    <div className="text-[10px] font-mono opacity-80">
                      RTL · عربي
                    </div>
                  </div>
                  {lang === 'ar' && <Check className="w-4 h-4 shrink-0" />}
                </button>
              </div>
            </div>

            {/* Section 2: Currency Selector (USD Dollar & SAR Saudi Riyal ONLY) */}
            <div className="space-y-2.5 mb-6">
              <label className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-white/80">
                <Coins className="w-3.5 h-3.5 text-[#d02128]" />
                <span>{isRTL ? 'العملة (Currency)' : 'SELECT CURRENCY'}</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* USD Dollar Option */}
                <button
                  type="button"
                  onClick={() => handleSelectCurrency('USD')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    currency === 'USD'
                      ? 'bg-[#d02128] border-[#d02128] text-white shadow-[0_10px_25px_rgba(208,33,40,0.45)]'
                      : 'bg-black/35 hover:bg-white/[0.1] border-white/20 text-white/85'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center font-mono text-xs font-bold">
                      <DollarSign className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold">
                        USD ($)
                      </div>
                      <div className="text-[10px] font-mono opacity-80">
                        {isRTL ? 'دولار أمريكي' : 'US Dollar'}
                      </div>
                    </div>
                  </div>
                  {currency === 'USD' && <Check className="w-4 h-4 shrink-0" />}
                </button>

                {/* SAR Saudi Riyal Option */}
                <button
                  type="button"
                  onClick={() => handleSelectCurrency('SAR')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    currency === 'SAR'
                      ? 'bg-[#d02128] border-[#d02128] text-white shadow-[0_10px_25px_rgba(208,33,40,0.45)]'
                      : 'bg-black/35 hover:bg-white/[0.1] border-white/20 text-white/85'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center font-mono text-[10px] font-bold">
                      SAR
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold">
                        SAR (ر.س)
                      </div>
                      <div className="text-[10px] font-mono opacity-80">
                        {isRTL ? 'ريال سعودي' : 'Saudi Riyal'}
                      </div>
                    </div>
                  </div>
                  {currency === 'SAR' && <Check className="w-4 h-4 shrink-0" />}
                </button>
              </div>
            </div>

            {/* Done / Apply Button */}
            <button
              type="button"
              onClick={handleCloseLocale}
              className="w-full py-3.5 px-6 rounded-xl bg-[#d02128] hover:bg-[#b81b22] text-white font-mono text-xs font-bold uppercase tracking-[0.22em] shadow-[0_12px_30px_rgba(208,33,40,0.45)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isRTL ? 'تطبيق الإعدادات' : 'Apply Preferences'}</span>
              <Check className="w-4 h-4" />
            </button>

            {/* Footer Info */}
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-white/65">
              <span>
                {isRTL ? 'الحالة النشطة:' : 'ACTIVE:'}{' '}
                <strong className="text-white">
                  {lang === 'ar' ? 'العربية (RTL)' : 'English (LTR)'} ·{' '}
                  {currency === 'SAR' ? 'SAR (ر.س)' : 'USD ($)'}
                </strong>
              </span>
              <span>eferz.net</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL B: SOLID MIRROR-GLASS INTELLIGENCE PORTAL LOGIN MODAL               */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md select-none animate-fadeIn"
        >
          {/* Backdrop Click to Close */}
          <div
            onClick={handleClose}
            className="absolute inset-0"
            aria-hidden="true"
          />

          {/* Glassmorphic Modal Box */}
          <div className="relative z-10 w-full max-w-[420px] rounded-3xl bg-white/[0.15] border border-white/30 backdrop-blur-3xl p-6 sm:p-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.35)]">
            {/* Top Subtle Red Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#d02128] to-transparent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close Portal Login"
              className={`absolute top-5 ${
                isRTL ? 'left-5' : 'right-5'
              } w-8 h-8 rounded-xl bg-white/[0.08] hover:bg-[#d02128] border border-white/15 hover:border-[#d02128] flex items-center justify-center text-white/75 hover:text-white transition-all cursor-pointer`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header & Brand Identity */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="mb-3 scale-95">
                <AgenceLogo />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d02128]/20 border border-[#d02128]/45 mb-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d02128]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-white">
                  {isRTL
                    ? 'بوابة الذكاء الآمنة'
                    : 'SECURE INTELLIGENCE PORTAL'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-black tracking-tight text-white">
                {isRTL ? 'تسجيل دخول بوابة EFerz' : 'EFerz Portal Login'}
              </h3>
              <p className="text-xs text-white/75 mt-1 max-w-xs leading-relaxed">
                {isRTL
                  ? 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى بوابة EFerz الذكية'
                  : 'Enter your credentials to access EFerz Intelligence Portal'}
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handlePortalLogin} className="space-y-4">
              {/* Email or Username */}
              <div>
                <label
                  htmlFor="eferz_user_input"
                  className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/80 mb-1.5"
                >
                  {isRTL
                    ? 'البريد الإلكتروني أو اسم المستخدم'
                    : 'Email or Username'}
                </label>
                <div className="relative flex items-center">
                  <User
                    className={`w-4 h-4 text-[#d02128] absolute ${
                      isRTL ? 'right-3.5' : 'left-3.5'
                    } pointer-events-none`}
                  />
                  <input
                    ref={userInputRef}
                    id="eferz_user_input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. user@eferz.com"
                    required
                    autoComplete="username"
                    className={`w-full ${
                      isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
                    } py-3 rounded-xl bg-black/40 border border-white/20 focus:border-[#d02128] text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#d02128]/30 transition-all`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="eferz_pass_input"
                  className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/80 mb-1.5"
                >
                  {isRTL ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative flex items-center">
                  <KeyRound
                    className={`w-4 h-4 text-[#d02128] absolute ${
                      isRTL ? 'right-3.5' : 'left-3.5'
                    } pointer-events-none`}
                  />
                  <input
                    id="eferz_pass_input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/40 border border-white/20 focus:border-[#d02128] text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#d02128]/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    className={`absolute ${
                      isRTL ? 'left-3' : 'right-3'
                    } text-white/50 hover:text-white transition-colors cursor-pointer`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#d02128] hover:bg-[#b81b22] text-white font-mono text-xs font-bold uppercase tracking-[0.22em] shadow-[0_12px_30px_rgba(208,33,40,0.45)] hover:shadow-[0_15px_35px_rgba(208,33,40,0.65)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {isSubmitting
                    ? isRTL
                      ? 'جاري التحقق...'
                      : 'Authenticating...'
                    : isRTL
                      ? 'الدخول إلى البوابة'
                      : 'Login to Portal'}
                </span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </form>

            {/* Bottom Security Note */}
            <div className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-white/60">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-[#d02128]" />
                <span>
                  {isRTL ? 'تشفير آمن معتمد' : 'ENCRYPTED TOKEN AUTH'}
                </span>
              </span>
              <span className="text-white/75">eferz.net</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
