import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { MorphShape } from '../../data/morphShapes';
import { ViewType } from '../../types';
import {
  EFERZ_CONTACT_DETAILS,
  EFERZ_PRIVACY_POLICY,
  EFERZ_REFUND_POLICY,
  EFERZ_TERMS_OF_SERVICE,
  EFerzPolicySection,
} from '../../data/eferzSiteData';
import { VerticalWheelRail } from '../VerticalWheelRail';
import { serviceScrollAudio } from '../../utils/serviceScrollAudio';
import { useLocale } from '../../utils/LocaleContext';

interface PolicyViewProps {
  policyType: 'privacy' | 'terms' | 'refund';
  onSelectShape?: (
    shape: MorphShape,
    scheme?: 'white' | 'cyan' | 'amber' | 'emerald' | 'red'
  ) => void;
  onNavigate: (view: ViewType) => void;
}

const ARABIC_POLICIES: Record<
  'privacy' | 'terms' | 'refund',
  {
    badgeAr: string;
    titleAr: string;
    lastUpdatedAr: string;
    introAr: string;
    sectionsAr: EFerzPolicySection[];
  }
> = {
  privacy: {
    badgeAr: 'حوكمة حماية البيانات وسياسة الخصوصية الرسمية',
    titleAr: 'سياسة الخصوصية',
    lastUpdatedAr: '10 يوليو 2025',
    introAr:
      'توضح سياسة الخصوصية هذه كيف تقوم وكالة إيفرز الرقمية (EFerz) بجمع واستخدام وحماية معلوماتك الشخصية عند زيارة موقعنا أو استخدام خدماتنا أو التواصل معنا عبر info@eferz.com.',
    sectionsAr: [
      {
        id: 'collection',
        number: '01',
        title: 'المعلومات الشخصية التي نجمعها',
        paragraphs: [
          'لتقديم خدماتنا بأعلى جودة، نجمع المعلومات التي تقدمها لنا مباشرة بالإضافة إلى بيانات الاستخدام التقنية عند تفاعلك مع منصتنا.',
        ],
        bullets: [
          'بيانات التواصل الأساسية شاملة الاسم، العنوان، رقم الهاتف (أمريكا / السعودية / دولي)، والبريد الإلكتروني.',
          'معلومات الفوترة وطلبات المشاريع ونطاق العمل المتفق عليه.',
          'بيانات الدخول الآمنة لبوابة العملاء والمشاريع.',
          'مراسلات الدعم الفني وملفات المشاريع التي تشاركها مع فرقنا الهندسية والإبداعية.',
          'بيانات التصفح والتحليلات التقنية لتحسين سرعة وأداء الموقع.',
        ],
      },
      {
        id: 'use',
        number: '02',
        title: 'كيف نستخدم معلوماتك الشخصية',
        paragraphs: [
          'نستخدم بياناتك الشخصية لتنفيذ وتطوير خدمات الوكالة الرقمية، معالجة المدفوعات، تسليم المشاريع، والحفاظ على الأمان السيبراني.',
        ],
        bullets: [
          'تقديم الخدمات والمنتجات: تنفيذ العقود، تسليم الأصول البرمجية والتصميمية، وإدارة حساب العميل.',
          'التسويق والتحديثات: إرسال تحديثات مراحل المشروع والعروض ذات الصلة (مع إمكانية إلغاء الاشتراك في أي وقت).',
          'الأمان ومنع الاحتيال: رصد ومنع أي نشاط غير مصرح به أو خبيث.',
          'التواصل المباشر: تقديم الدعم الفني المتخصص وجدولة الاستشارات.',
        ],
      },
      {
        id: 'mobile-sharing',
        number: '03',
        title: 'الالتزام الصارم بعدم مشاركة بيانات الهاتف والرسائل النصية',
        paragraphs: [
          'تحترم وكالة EFerz خصوصية اتصالاتك بالكامل. لن تتم مشاركة أي معلومات خاصة بالهاتف المحمول أو موافقات الرسائل النصية (SMS Opt-in) مع أي أطراف ثالثة أو جهات تسويقية تحت أي ظرف.',
          'لا نستخدم أو نفصح عن أي معلومات شخصية حساسة دون موافقتك الصريحة.',
        ],
      },
      {
        id: 'children',
        number: '04',
        title: 'حماية بيانات القُصّر وقيود السن القانوني',
        paragraphs: [
          'خدماتنا موجهة للأعمال والشركات ولا نجمع عمداً أي بيانات لمن هم دون 13 عاماً. يُسمح بالتعاقد على خدمات EFerz لمن يبلغون 18 عاماً فأكثر فقط.',
        ],
      },
      {
        id: 'security-rights',
        number: '05',
        title: 'أمن البيانات وحقوق الخصوصية الخاصة بك',
        paragraphs: [
          'نطبق أعلى معايير التشفير وبروتوكولات الأمان Zero-Trust لحماية بياناتك. يحق لك دائماً طلب الوصول إلى بياناتك أو تصحيحها أو حذفها عبر التواصل معنا على info@eferz.com.',
        ],
      },
    ],
  },
  terms: {
    badgeAr: 'اتفاقية العملاء وشروط الخدمة الرسمية',
    titleAr: 'شروط الخدمة',
    lastUpdatedAr: '10 يوليو 2025',
    introAr:
      'مرحباً بك في وكالة إيفرز الرقمية (EFerz). تشكل شروط الخدمة هذه عقداً قانونياً ملزماً بين EFerz وبينك كعميل أو مستخدم لخدماتنا الرقمية والتقنية.',
    sectionsAr: [
      {
        id: 'scope',
        number: '01',
        title: 'نطاق خدمات الوكالة الرقمية',
        paragraphs: [
          'تقدم EFerz حلولاً رقمية وتقنية متكاملة تشمل تصميم وتطوير المواقع، التسويق الرقمي، المتاجر الإلكترونية، إدارة أمازون FBA، التواصل الاجتماعي، كتابة المحتوى، التصميم الجرافيكي، الهوية البصرية، استشارات تقنية المعلومات، الأمن السيبراني، وخدمات الإنترنت EFerz Connect.',
        ],
      },
      {
        id: 'orders-consent',
        number: '02',
        title: 'الطلبات والباقات والموافقة الخطية',
        paragraphs: [
          'يتم تحصيل رسوم المشاريع والباقات وفقاً للعروض المعتمدة بعد الحصول على موافقة العميل الخطية (عبر البريد الإلكتروني أو الرسائل الموثقة) وإقراره بالشروط والأحكام.',
          'بالموافقة على ملخص المشروع أو الفاتورة، يقر العميل بالمخرجات المحددة والجدول الزمني ونطاق العمل المتفق عليه.',
        ],
      },
      {
        id: 'client-obligations',
        number: '03',
        title: 'تعاون العميلوصلاحيات الوصول للمنصات والخوادم',
        paragraphs: [
          'يتطلب التسليم في الموعد المحدد تعاوناً نشطاً من العميل، بما في ذلك توفير شعارات وهوية العلامة والمحتوى وصلاحيات النطاق أو الاستضافة عند الحاجة.',
          'إن الامتناع عن توفير صلاحيات الوصول اللازمة للنشر أو الفحص التقني قد يؤدي إلى تأخير المشروع ويسقط المطالبة بضمان مستوى الخدمة.',
        ],
      },
      {
        id: 'intellectual-property',
        number: '04',
        title: 'الملكية الفكرية والمخرجات النهائية',
        paragraphs: [
          'عند سداد كامل مستحقات المشروع المتفق عليها، تنتقل ملكية المخرجات النهائية المخصصة بالكامل إلى العميل. وتحتفظ EFerz بحق عرض المشاريع غير السرية ضمن معرض أعمالها ما لم يكن هناك اتفاقية عدم إفصاح (NDA) مستقلة.',
        ],
      },
      {
        id: 'governing-contact',
        number: '05',
        title: 'حدود المسؤولية والتواصل الرسمي',
        paragraphs: [
          'تسعى EFerz لتحقيق رضا العملاء بنسبة 100%. توجه جميع الاستفسارات القانونية والمالية إلى info@eferz.com أو عبر مكاتبنا في فلوريدا (+1 786 224 4112) والرياض (+966 539 046410).',
        ],
      },
    ],
  },
  refund: {
    badgeAr: 'ضمان استرداد الأموال لمدة 30 يوماً وسياسة الاسترجاع',
    titleAr: 'سياسة الاسترجاع',
    lastUpdatedAr: '10 يوليو 2025',
    introAr:
      'في وكالة إيفرز الرقمية (EFerz) نثق بجودة مخرجاتنا الهندسية والتسويقية. تخضع المشتريات الجديدة لضمان استرداد الأموال لمدة 30 يوماً وفق الضوابط وإجراءات التحقق الرسمية الموضحة أدناه.',
    sectionsAr: [
      {
        id: 'guarantee',
        number: '01',
        title: 'ضمان استرداد الأموال لمدة 30 يوماً وإجراءات المعالجة',
        paragraphs: [
          'إذا لم تكن راضياً عن عملية الشراء الجديدة أو المخرجات الأولية، يمكنك تقديم طلب استرجاع خلال 30 يوماً من تاريخ الشراء. تتم معالجة المبالغ المعتمدة وإعادتها إلى وسيلة الدفع الأصلية خلال 10 إلى 30 يوم عمل.',
          'تحتفظ إدارة EFerz بحق مراجعة طلبات الاسترجاع والتحقق من استيفائها لمعايير السياسة الرسمية.',
        ],
      },
      {
        id: 'not-as-described',
        number: '02',
        title: 'عدم مطابقة المنتج أو الخدمة للوصف المتفق عليه',
        paragraphs: [
          'يجب إبلاغ قسم الدعم الفني بأي اختلاف جوهري خلال 30 يوماً من تاريخ الشراء مع تقديم إثبات واضح بأن المخرجات لا تطابق ملخص المشروع المعتمد.',
          'لا تُقبل المطالبات المبنية على توقعات خارج نطاق العمل المتفق عليه في العقد.',
        ],
      },
      {
        id: 'major-defects',
        number: '03',
        title: 'العيوب التقنية الجوهرية ومهلة الإصلاح خلال 72 ساعة',
        paragraphs: [
          'على الرغم من اختبار جميع برمجياتنا بدقة قبل التسليم، في حال ظهور أي خلل تقني غير متوقع، يتم رفعه لفريق الدعم الفني لدينا.',
          'نحتفظ بالحق في إصلاح الخلل خلال 72 ساعة. وإذا لم نتمكن من معالجته خلال 72 ساعة من تاريخ الإبلاغ الرسمي، يتم إصدار استرداد كامل للمبلغ أو استبدال الخدمة بقيمة مماثلة حسب اختيار العميل.',
          'ملاحظة هامة: رفض منح مهندسينا صلاحيات الوصول اللازمة للخادم لفحص وإصلاح العطل يسقط الأهلية للاسترجاع.',
        ],
      },
      {
        id: 'non-delivery',
        number: '04',
        title: 'عدم استلام الملفات أو مشاكل التحميل',
        paragraphs: [
          'في حال عدم استلام رسالة التسليم بسبب مزود البريد، يرجى التواصل معنا فوراً. يجب تقديم مطالبات عدم التسليم لقسم الفوترة خطياً خلال 10 أيام عمل من الموعد المحدد.',
        ],
      },
    ],
  },
};

export const PolicyView: React.FC<PolicyViewProps> = ({
  policyType,
  onSelectShape,
  onNavigate,
}) => {
  const { lang, isRTL } = useLocale();
  const isAr = lang === 'ar';

  const [activeIndex, setActiveIndex] = useState(0);
  const lastWheelTime = useRef<number>(0);
  const touchStartY = useRef<number | null>(null);

  const arPolicy = ARABIC_POLICIES[policyType];

  const config =
    policyType === 'privacy'
      ? {
          badge: isAr
            ? arPolicy.badgeAr
            : 'OFFICIAL DATA PROTECTION & PRIVACY GOVERNANCE',
          title: isAr ? arPolicy.titleAr : 'Privacy Policy',
          accent: '#d02128',
          scheme: 'emerald' as const,
          shape: 'shield' as MorphShape,
          lastUpdated: isAr
            ? arPolicy.lastUpdatedAr
            : EFERZ_PRIVACY_POLICY.lastUpdated,
          intro: isAr ? arPolicy.introAr : EFERZ_PRIVACY_POLICY.intro,
          sections: isAr
            ? arPolicy.sectionsAr
            : EFERZ_PRIVACY_POLICY.sections,
        }
      : policyType === 'terms'
      ? {
          badge: isAr
            ? arPolicy.badgeAr
            : 'OFFICIAL CLIENT AGREEMENT & TERMS OF SERVICE',
          title: isAr ? arPolicy.titleAr : 'Terms of Service',
          accent: '#d02128',
          scheme: 'cyan' as const,
          shape: 'document' as MorphShape,
          lastUpdated: isAr
            ? arPolicy.lastUpdatedAr
            : EFERZ_TERMS_OF_SERVICE.lastUpdated,
          intro: isAr ? arPolicy.introAr : EFERZ_TERMS_OF_SERVICE.intro,
          sections: isAr
            ? arPolicy.sectionsAr
            : EFERZ_TERMS_OF_SERVICE.sections,
        }
      : {
          badge: isAr
            ? arPolicy.badgeAr
            : '30-DAY MONEY-BACK GUARANTEE & REFUND POLICY',
          title: isAr ? arPolicy.titleAr : 'Refund Policy',
          accent: '#d02128',
          scheme: 'red' as const,
          shape: 'refund_badge' as MorphShape,
          lastUpdated: isAr
            ? arPolicy.lastUpdatedAr
            : EFERZ_REFUND_POLICY.lastUpdated,
          intro: isAr ? arPolicy.introAr : EFERZ_REFUND_POLICY.intro,
          sections: isAr
            ? arPolicy.sectionsAr
            : EFERZ_REFUND_POLICY.sections,
        };

  const sections = config.sections;
  const safeIndex = Math.min(activeIndex, sections.length - 1);
  const activeSection = sections[safeIndex] || sections[0];

  // Reset active section when switching between Privacy / Terms / Refund
  useEffect(() => {
    setActiveIndex(0);
  }, [policyType]);

  useEffect(() => {
    if (!onSelectShape) return;
    onSelectShape(config.shape, config.scheme);
  }, [config.shape, config.scheme, safeIndex, onSelectShape]);

  const handleSelectIndex = useCallback(
    (nextIdx: number) => {
      const total = sections.length;
      const normalized = ((nextIdx % total) + total) % total;
      setActiveIndex((prev) => {
        if (prev !== normalized) {
          serviceScrollAudio.playChapterTransition(normalized);
        }
        return normalized;
      });
    },
    [sections.length]
  );

  // Wheel / Trackpad Navigation
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 16) return;
      const now = performance.now();
      if (now - lastWheelTime.current < 420) return;
      lastWheelTime.current = now;

      if (e.deltaY > 0) {
        handleSelectIndex(safeIndex + 1);
      } else {
        handleSelectIndex(safeIndex - 1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [safeIndex, handleSelectIndex]);

  // Keyboard Navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleSelectIndex(safeIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSelectIndex(safeIndex - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [safeIndex, handleSelectIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 40) {
      if (deltaY > 0) handleSelectIndex(safeIndex + 1);
      else handleSelectIndex(safeIndex - 1);
    }
    touchStartY.current = null;
  };

  const wheelItems = sections.map((sec) => ({
    id: sec.id,
    label: sec.title,
    labelAr: sec.title,
    accentColor: config.accent,
  }));

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden text-white text-emboss select-none"
    >
      {/* Subtle Ambient Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 60% 48%, ${config.accent}16 0%, rgba(4,6,14,0.22) 55%, rgba(2,4,9,0.58) 100%)`,
        }}
      />

      {/* =================================================================== */}
      {/* VERTICAL 3D WHEEL RAIL (Left in LTR, Right in RTL)                  */}
      {/* =================================================================== */}
      <VerticalWheelRail
        items={wheelItems}
        activeIndex={safeIndex}
        onSelect={handleSelectIndex}
        defaultAccent={config.accent}
        includeIntro={false}
      />

      {/* =================================================================== */}
      {/* MAIN INTERACTIVE POLICY STAGE                                       */}
      {/* =================================================================== */}
      <div
        className={`relative z-10 w-full h-full flex flex-col justify-between pt-[76px] sm:pt-[84px] pb-24 sm:pb-20 md:pb-16 px-4 sm:px-8 ${
          isRTL
            ? 'md:pr-48 lg:pr-60 xl:pr-64 lg:pl-12'
            : 'md:pl-48 lg:pl-60 xl:pl-64 lg:pr-12'
        } max-w-[1580px] mx-auto overflow-y-auto overflow-x-hidden`}
      >
        {/* Top Policy Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 pb-2.5 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                {
                  id: 'privacy',
                  label: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
                },
                {
                  id: 'terms',
                  label: isAr ? 'شروط الخدمة' : 'Terms of Service',
                },
                {
                  id: 'refund',
                  label: isAr ? 'سياسة الاسترجاع' : 'Refund Policy',
                },
              ] as { id: 'privacy' | 'terms' | 'refund'; label: string }[]
            ).map((tab) => {
              const active = policyType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    serviceScrollAudio.playCardHoverTick();
                    onNavigate(tab.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] transition-all cursor-pointer ${
                    active
                      ? 'bg-[#d02128] text-white font-bold shadow-[0_0_20px_rgba(236,57,53,0.45)]'
                      : 'bg-white/[0.05] border border-white/15 text-white/75 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-white/60">
            <span>
              {isAr ? 'تاريخ السريان:' : 'Effective Date:'}{' '}
              <strong className="text-white">{config.lastUpdated}</strong>
            </span>
          </div>
        </div>

        {/* Center Interactive Clause Stage */}
        <div className="my-auto py-2 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left 7 Cols: Active Clause Detail */}
          <div className="lg:col-span-7 rounded-3xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.28)] p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 border border-white/20">
                <ShieldCheck
                  className="w-3.5 h-3.5"
                  style={{ color: config.accent }}
                />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-white/85">
                  {config.badge}
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl font-display font-black tracking-tight text-white">
                {activeSection.title}
              </h1>

              <div className="space-y-2">
                {activeSection.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-xs sm:text-[13px] text-white/85 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {activeSection.bullets && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {activeSection.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className="p-2.5 rounded-xl bg-black/45 border border-white/15 flex items-start gap-2 text-[11px] sm:text-xs text-white/90"
                    >
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: config.accent }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] text-white/55 max-w-sm line-clamp-2">
                {config.intro}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectIndex(safeIndex - 1)}
                  className="px-3.5 py-1.5 rounded-xl bg-black/45 hover:bg-white/[0.12] border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
                >
                  {isAr ? 'السابق' : 'Prev'}
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectIndex(safeIndex + 1)}
                  className="px-4 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                  style={{ backgroundColor: config.accent }}
                >
                  {isAr ? 'البند التالي ←' : 'Next Clause →'}
                </button>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Compact Clause Switcher & Official Legal Desk */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Compact Clauses Selector */}
            <div className="rounded-3xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.28)] p-4 sm:p-5 space-y-2.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-white/60">
                {isAr
                  ? `جميع بنود ${config.title}`
                  : `ALL ${config.title.toUpperCase()} CLAUSES`}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
                {sections.map((sec, idx) => {
                  const active = idx === safeIndex;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleSelectIndex(idx)}
                      className={`w-full ${
                        isRTL ? 'text-right' : 'text-left'
                      } px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        active
                          ? 'bg-black/65 text-white font-bold border border-white/25'
                          : 'bg-black/30 hover:bg-black/55 text-white/70 hover:text-white border border-transparent'
                      }`}
                    >
                      <span className="truncate">{sec.title}</span>
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor: active
                            ? config.accent
                            : 'rgba(255,255,255,0.2)',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Official Legal & Billing Contact Box */}
            <div className="rounded-3xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.28)] p-4 sm:p-5 space-y-2.5">
              <div
                className="text-[10px] font-mono font-bold uppercase tracking-[0.22em]"
                style={{ color: config.accent }}
              >
                {isAr
                  ? 'المكتب القانوني والفوترة الرسمي'
                  : 'OFFICIAL LEGAL & BILLING DESK'}
              </div>

              <div className="space-y-1.5 text-xs font-mono text-white/85">
                <a
                  href={`mailto:${EFERZ_CONTACT_DETAILS.primaryEmail}`}
                  className="flex items-center justify-between p-2 rounded-xl bg-black/45 border border-white/15 hover:border-white/30 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Mail
                      className="w-3.5 h-3.5"
                      style={{ color: config.accent }}
                    />
                    <span>{isAr ? 'البريد الرسمي' : 'Official Email'}</span>
                  </span>
                  <strong dir="ltr" className="text-white">
                    {EFERZ_CONTACT_DETAILS.primaryEmail}
                  </strong>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <a
                    href="tel:+17862244112"
                    dir="ltr"
                    className="p-2 rounded-xl bg-black/45 border border-white/15 hover:border-white/30 transition-colors flex items-center gap-1.5 text-[11px]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d02128] shrink-0" />
                    <span className="truncate">
                      Call: {EFERZ_CONTACT_DETAILS.usaPhone}
                    </span>
                  </a>
                  <a
                    href={EFERZ_CONTACT_DETAILS.usaWhatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="p-2 rounded-xl bg-black/45 border border-white/15 hover:border-[#d02128]/50 transition-colors flex items-center gap-1.5 text-[11px] text-white"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d02128] shrink-0" />
                    <span className="truncate">
                      WhatsApp: {EFERZ_CONTACT_DETAILS.usaWhatsappPhone}
                    </span>
                  </a>
                </div>

                <div className="p-2 rounded-xl bg-black/45 border border-white/15 text-[10px] text-white/65 space-y-0.5 font-sans">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3 h-3 text-[#d02128] shrink-0 mt-0.5" />
                    <span className="truncate">
                      USA: {EFERZ_CONTACT_DETAILS.usaAddress}
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3 h-3 text-[#d02128] shrink-0 mt-0.5" />
                    <span className="truncate">
                      KSA: {EFERZ_CONTACT_DETAILS.ksaAddress}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full py-2 rounded-xl bg-[#d02128] hover:bg-[#e01537] text-white font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{isAr ? 'ابدأ مشروعك' : 'Start a Project'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Progress Indicator */}
        <div className="hidden sm:flex items-center justify-between pt-2 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            {sections.map((sec, idx) => {
              const active = idx === safeIndex;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSelectIndex(idx)}
                  className="py-1 flex items-center gap-2 cursor-pointer"
                >
                  <span
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: active ? '28px' : '8px',
                      backgroundColor: active
                        ? config.accent
                        : 'rgba(255,255,255,0.22)',
                    }}
                  />
                </button>
              );
            })}
          </div>

          <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/50">
            {activeSection.title}
          </div>
        </div>
      </div>
    </div>
  );
};
