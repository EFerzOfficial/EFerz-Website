import { EFerzBlogPost } from '../data/eferzSiteData';
import { MorphShape } from '../data/morphShapes';

export interface WordPressRawPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  yoast_head_json?: {
    twitter_misc?: {
      'Est. reading time'?: string;
    };
    og_image?: Array<{
      url: string;
    }>;
  };
  _embedded?: {
    author?: Array<{
      name?: string;
    }>;
    'wp:featuredmedia'?: Array<{
      source_url?: string;
    }>;
    'wp:term'?: Array<
      Array<{
        name?: string;
        taxonomy?: string;
      }>
    >;
  };
}

// Helper to strip HTML tags from string
function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&quot;/g, '"')
    .trim();
}

// Helper to parse HTML content into readable sections for the EFerz reader drawer
function parseHtmlIntoSections(html: string): { heading: string; paragraphs: string[]; bullets?: string[] }[] {
  if (!html) return [];

  const sections: { heading: string; paragraphs: string[]; bullets?: string[] }[] = [];
  
  // Create temporary container
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const headings = doc.querySelectorAll('h2, h3, h4');

  if (headings.length > 0) {
    headings.forEach((h) => {
      const headingText = h.textContent?.trim() || '';
      const paragraphs: string[] = [];
      const bullets: string[] = [];

      let next = h.nextElementSibling;
      while (next && !['H2', 'H3', 'H4'].includes(next.tagName)) {
        if (next.tagName === 'P') {
          const pText = next.textContent?.trim();
          if (pText) paragraphs.push(pText);
        } else if (next.tagName === 'UL' || next.tagName === 'OL') {
          next.querySelectorAll('li').forEach((li) => {
            const liText = li.textContent?.trim();
            if (liText) bullets.push(liText);
          });
        }
        next = next.nextElementSibling;
      }

      if (headingText && (paragraphs.length > 0 || bullets.length > 0)) {
        sections.push({
          heading: headingText,
          paragraphs: paragraphs.length > 0 ? paragraphs : [''],
          bullets: bullets.length > 0 ? bullets : undefined,
        });
      }
    });
  }

  // Fallback if no explicit H2/H3 were found
  if (sections.length === 0) {
    const allP = doc.querySelectorAll('p');
    const paras: string[] = [];
    allP.forEach((p) => {
      const text = p.textContent?.trim();
      if (text && text.length > 15) paras.push(text);
    });

    if (paras.length > 0) {
      sections.push({
        heading: 'Strategic Architecture & Execution',
        paragraphs: paras,
      });
    }
  }

  return sections;
}

export async function fetchLiveWordPressPosts(): Promise<EFerzBlogPost[]> {
  try {
    // Primary URL: relative /wp-json/ if on same domain or window.__EFERZ_THEME_URI__, else https://eferz.com/
    const baseUrl =
      typeof window !== 'undefined' && window.location.hostname.includes('eferz.com')
        ? ''
        : 'https://eferz.com';

    const url = `${baseUrl}/wp-json/wp/v2/posts?_embed&per_page=20`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn('Failed to fetch WordPress posts:', res.status);
      return [];
    }

    const rawPosts: WordPressRawPost[] = await res.json();
    if (!Array.isArray(rawPosts)) return [];

    return rawPosts.map((p, idx) => {
      const rawTitle = p.title?.rendered || 'EFerz Strategic Intelligence';
      const cleanTitle = stripHtml(rawTitle);

      const rawExcerpt = p.excerpt?.rendered || '';
      const cleanExcerpt =
        stripHtml(rawExcerpt) ||
        'Comprehensive technical analysis and execution playbook by EFerz Digital Agency.';

      // Category
      let category = 'Engineering & AI';
      try {
        const terms = p._embedded?.['wp:term'];
        if (terms && terms[0] && terms[0][0] && terms[0][0].name) {
          category = terms[0][0].name;
        }
      } catch {
        // default
      }

      // Featured Image
      let heroImage = '/cinematic/shot1_space_ultra.jpg';
      const media = p._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      const yoastImage = p.yoast_head_json?.og_image?.[0]?.url;
      if (media) {
        heroImage = media;
      } else if (yoastImage) {
        heroImage = yoastImage;
      }

      // Reading Time
      const estTime = p.yoast_head_json?.twitter_misc?.['Est. reading time'] || '5 minutes';
      const readTime = `${estTime.replace(/minutes?/i, 'min')} read`;

      // Formatted Date
      let date = 'Recently Published';
      try {
        const d = new Date(p.date);
        date = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      } catch {
        // default
      }

      // Author
      let author = 'KayKay & EFerz Architects';
      try {
        const auth = p._embedded?.author?.[0]?.name;
        if (auth) author = auth;
      } catch {
        // default
      }

      // Assign particle shape and accent color based on category
      const catLower = category.toLowerCase();
      let particleShape: MorphShape = 'book_insights';
      let accentColor = '#d02128';

      if (catLower.includes('cyber') || catLower.includes('security')) {
        particleShape = 'shield';
        accentColor = '#d02128';
      } else if (catLower.includes('seo') || catLower.includes('marketing') || catLower.includes('growth')) {
        particleShape = 'compass';
        accentColor = '#38bdf8';
      } else if (catLower.includes('ai') || catLower.includes('intelligence') || catLower.includes('agent')) {
        particleShape = 'brain';
        accentColor = '#a855f7';
      } else if (catLower.includes('commerce') || catLower.includes('amazon') || catLower.includes('fba') || catLower.includes('shopify')) {
        particleShape = 'cart';
        accentColor = '#10b981';
      } else {
        particleShape = 'anniversary';
        accentColor = '#f59e0b';
      }

      // Parse full HTML into sections
      const sections = parseHtmlIntoSections(p.content?.rendered || '');

      return {
        id: `wp-${p.id}`,
        slug: p.slug,
        title: cleanTitle,
        category,
        readTime,
        date,
        author,
        authorRole: 'Engineering & Growth Division',
        excerpt: cleanExcerpt,
        heroImage,
        accentColor,
        particleShape,
        tags: [category.toUpperCase(), 'EFERZ-SEO', 'PLAYBOOK'],
        sections:
          sections.length > 0
            ? sections
            : [
                {
                  heading: '1. Executive Briefing',
                  paragraphs: [cleanExcerpt],
                },
              ],
      };
    });
  } catch (err) {
    console.error('Error fetching WordPress blog posts:', err);
    return [];
  }
}
