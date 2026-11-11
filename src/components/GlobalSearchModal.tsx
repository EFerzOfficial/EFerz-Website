import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  FileText,
  Layers,
  Search,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { ViewType } from '../types';
import { OFFICIAL_EFERZ_SERVICES } from '../data/servicesData';
import { CLIENT_STORIES, WORK_PROJECTS, TEAM_MEMBERS } from '../data/agencyData';
import { EFERZ_BLOG_POSTS } from '../data/eferzSiteData';
import { serviceScrollAudio } from '../utils/serviceScrollAudio';
import { useLocale } from '../utils/LocaleContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewType) => void;
}

interface SearchResultItem {
  id: string;
  title: string;
  titleAr?: string;
  subtitle: string;
  subtitleAr?: string;
  category: 'Service' | 'Portfolio' | 'Client' | 'Blog' | 'Page' | 'Team';
  categoryAr: string;
  targetView: ViewType;
  accentColor: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { isRTL } = useLocale();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const allItems = useMemo<SearchResultItem[]>(() => {
    const pages: SearchResultItem[] = [
      {
        id: 'page-agency',
        title: 'Agency Home',
        titleAr: 'الرئيسية · وكالة EFerz الرقمية',
        subtitle: 'EFerz Digital Agency · Interactive 3D Showcase',
        subtitleAr: 'وكالة EFerz الرقمية · عرض تفاعلي ثلاثي الأبعاد',
        category: 'Page',
        categoryAr: 'صفحة',
        targetView: 'agency',
        accentColor: '#d02128',
      },
      {
        id: 'page-about',
        title: 'About Us',
        titleAr: 'من نحن · عن الشركة',
        subtitle: 'Who We Are · Global Presence in USA, KSA & PAK',
        subtitleAr: 'قصتنا ورسالتنا · تواجد عالمي في أمريكا والسعودية وباكستان',
        category: 'Page',
        categoryAr: 'صفحة',
        targetView: 'about',
        accentColor: '#38bdf8',
      },
      {
        id: 'page-blog',
        title: 'Blog & Insights',
        titleAr: 'المدونة والمقالات التقنية',
        subtitle: 'Articles on Dark Mode UI, Programmatic SEO, AI Agents & Amazon FBA',
        subtitleAr: 'مقالات حول واجهات المستخدم، تحسين محركات البحث، الذكاء الاصطناعي وأمازون',
        category: 'Page',
        categoryAr: 'صفحة',
        targetView: 'blog',
        accentColor: '#f59e0b',
      },
      {
        id: 'page-privacy',
        title: 'Privacy Policy',
        titleAr: 'سياسة الخصوصية',
        subtitle: 'How EFerz collects, uses, and safeguards your personal information',
        subtitleAr: 'كيف تحمي EFerz بياناتك ومعلوماتك الشخصية',
        category: 'Page',
        categoryAr: 'صفحة',
        targetView: 'privacy',
        accentColor: '#10b981',
      },
      {
        id: 'page-terms',
        title: 'Terms of Service',
        titleAr: 'شروط الخدمة',
        subtitle: 'Official terms and conditions governing EFerz Digital Agency services',
        subtitleAr: 'الشروط والأحكام الرسمية لخدمات وكالة EFerz الرقمية',
        category: 'Page',
        categoryAr: 'صفحة',
        targetView: 'terms',
        accentColor: '#38bdf8',
      },
      {
        id: 'page-refund',
        title: 'Refund Policy',
        titleAr: 'سياسة الاسترجاع',
        subtitle: '30-Day Money-Back Guarantee & 72-Hour Rectification Policy',
        subtitleAr: 'ضمان استرداد الأموال لمدة 30 يوماً',
        category: 'Page',
        categoryAr: 'صفحة',
        targetView: 'refund',
        accentColor: '#d02128',
      },
      {
        id: 'page-contact',
        title: 'Start a Project (Contact Us)',
        titleAr: 'ابدأ مشروعك (اتصل بنا)',
        subtitle:
          'info@eferz.com · Call: +1 (786) 224-4112 · WhatsApp: +1 (954) 336-2586 · KSA: +966 (539) 046410',
        subtitleAr:
          'تواصل معنا مباشرة في أمريكا والمملكة العربية السعودية',
        category: 'Page',
        categoryAr: 'صفحة',
        targetView: 'contact',
        accentColor: '#d02128',
      },
    ];

    const serviceArTitles: Record<string, string> = {
      'web-design-development': 'تصميم وتطوير المواقع الإلكترونية',
      'digital-marketing': 'التسويق الرقمي وتحسين محركات البحث SEO',
      'ecommerce-solutions': 'حلول التجارة الإلكترونية والمتاجر',
      'amazon-fba': 'إدارة حسابات ومتاجر أمازون FBA',
      'social-media-management': 'إدارة منصات التواصل الاجتماعي',
      'content-writing': 'كتابة المحتوى الإبداعي والتسويقي',
      'graphic-design': 'التصميم الجرافيكي والمرئي',
      'brand-development': 'تطوير الهوية التجارية والعلامات',
      'it-consulting': 'استشارات تقنية المعلومات والذكاء الاصطناعي',
      'cyber-security': 'الأمن السيبراني وحماية الأنظمة',
      'eferz-connect': 'خدمات الإنترنت والاتصالات EFerz Connect',
    };

    const services: SearchResultItem[] = OFFICIAL_EFERZ_SERVICES.map((s) => ({
      id: `svc-${s.id}`,
      title: s.title,
      titleAr: serviceArTitles[s.id] || s.title,
      subtitle: `${s.environmentName} · ${s.techStack.slice(0, 4).join(', ')}`,
      subtitleAr: `${s.environmentName} · ${s.techStack.slice(0, 4).join(' ، ')}`,
      category: 'Service',
      categoryAr: 'خدمة',
      targetView: 'services',
      accentColor: s.accentColor,
    }));

    const portfolio: SearchResultItem[] = WORK_PROJECTS.map((p) => ({
      id: `work-${p.id}`,
      title: p.title,
      titleAr: `${p.title} — معرض الأعمال`,
      subtitle: `${p.category} · ${p.year}`,
      subtitleAr: `${p.category} · ${p.year}`,
      category: 'Portfolio',
      categoryAr: 'أعمالنا',
      targetView: 'work',
      accentColor: p.accentColor,
    }));

    const clients: SearchResultItem[] = CLIENT_STORIES.map((c) => ({
      id: `client-${c.id}`,
      title: `${c.title} — ${c.founderName}`,
      titleAr: `${c.title} — ${c.founderName}`,
      subtitle: `${c.founderRole} · ${c.returningRate}`,
      subtitleAr: `${c.founderRole} · ${c.returningRate}`,
      category: 'Client',
      categoryAr: 'عميل',
      targetView: 'clients',
      accentColor: '#f59e0b',
    }));

    const blogs: SearchResultItem[] = EFERZ_BLOG_POSTS.map((b) => ({
      id: `blog-${b.id}`,
      title: b.title,
      titleAr: b.title,
      subtitle: `${b.category} · ${b.readTime}`,
      subtitleAr: `${b.category} · ${b.readTime}`,
      category: 'Blog',
      categoryAr: 'مقال',
      targetView: 'blog',
      accentColor: b.accentColor,
    }));

    const team: SearchResultItem[] = TEAM_MEMBERS.map((t) => ({
      id: `team-${t.id}`,
      title: t.name,
      titleAr: t.name,
      subtitle: t.role,
      subtitleAr: t.role,
      category: 'Team',
      categoryAr: 'الفريق',
      targetView: 'team',
      accentColor: '#d02128',
    }));

    return [...pages, ...services, ...portfolio, ...clients, ...blogs, ...team];
  }, []);

  const trimmedQuery = query.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    if (!trimmedQuery) return [];
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(trimmedQuery) ||
        (item.titleAr && item.titleAr.toLowerCase().includes(trimmedQuery)) ||
        item.subtitle.toLowerCase().includes(trimmedQuery) ||
        (item.subtitleAr && item.subtitleAr.toLowerCase().includes(trimmedQuery)) ||
        item.category.toLowerCase().includes(trimmedQuery) ||
        item.categoryAr.toLowerCase().includes(trimmedQuery)
    );
  }, [allItems, trimmedQuery]);

  if (!isOpen) return null;

  const getCategoryIcon = (cat: SearchResultItem['category']) => {
    switch (cat) {
      case 'Service':
        return <Layers className="w-4 h-4" />;
      case 'Portfolio':
        return <Briefcase className="w-4 h-4" />;
      case 'Client':
        return <Sparkles className="w-4 h-4" />;
      case 'Blog':
        return <BookOpen className="w-4 h-4" />;
      case 'Team':
        return <Users className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-[70] flex items-start justify-center pt-24 sm:pt-32 px-4 bg-black/55 backdrop-blur-xl select-none transition-all duration-300"
    >
      <div
        onClick={onClose}
        className="absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Pure, Sleek Floating Black Glass Search Bar */}
        <div className="flex items-center gap-3.5 px-5 sm:px-6 py-4 rounded-2xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(208,33,40,0.15),inset_0_1px_1px_rgba(255,255,255,0.25)] focus-within:border-[#d02128]/70 transition-all">
          <Search className="w-5 h-5 text-[#d02128] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isRTL
                ? 'ابحث في خدمات EFerz، معرض الأعمال، المدونة، السياسات...'
                : 'Search EFerz services, portfolio, blog, policies...'
            }
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-white/55 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-mono uppercase tracking-wider text-white/75 cursor-pointer"
            >
              {isRTL ? 'مسح' : 'Clear'}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-black/50 hover:bg-white/[0.18] border border-white/20 text-white/75 hover:text-white transition-all cursor-pointer"
            title={isRTL ? 'إغلاق البحث (Esc)' : 'Close Search (Esc)'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Dropdown ONLY appears when the user types a search query */}
        {trimmedQuery.length > 0 && (
          <div className="mt-3 rounded-2xl bg-[#07090f]/75 border border-white/30 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)] overflow-hidden">
            <div className="max-h-[52vh] overflow-y-auto p-3 space-y-1.5">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-white/65 text-xs font-mono">
                  {isRTL
                    ? `لا توجد نتائج مطابقة لـ "${query}".`
                    : `No matching results found for "${query}".`}
                </div>
              ) : (
                filteredItems.slice(0, 14).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      serviceScrollAudio.playCardHoverTick();
                      onNavigate(item.targetView);
                      onClose();
                    }}
                    className={`w-full ${
                      isRTL ? 'text-right' : 'text-left'
                    } p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/25 transition-all flex items-center justify-between gap-3 group cursor-pointer`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-[#d02128]/45 bg-[#d02128]/15 text-[#d02128]">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#d02128] transition-colors truncate">
                            {isRTL && item.titleAr ? item.titleAr : item.title}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider shrink-0 bg-[#d02128]/20 text-[#d02128]">
                            {isRTL ? item.categoryAr : item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/70 truncate mt-0.5">
                          {isRTL && item.subtitleAr
                            ? item.subtitleAr
                            : item.subtitle}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 text-white/40 group-hover:text-[#d02128] transition-all shrink-0 ${
                        isRTL ? '-scale-x-100' : ''
                      }`}
                    />
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
