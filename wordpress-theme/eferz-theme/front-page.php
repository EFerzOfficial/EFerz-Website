<?php
/**
 * EFerz Digital Agency - Flagship WebGL & AI Experience
 * Exact 100% React Application from AI Studio Build
 *
 * @package EFerz
 * @version 1.5.3
 */
$eferz_seo = function_exists('eferz_get_route_seo') ? eferz_get_route_seo() : array('route' => 'agency', 'title' => 'EFerz Digital Agency | AI, 3D WebGL, SEO & Software', 'desc' => 'Global AI automation, 3D WebGL websites, Shopify Plus, Amazon FBA, technical SEO & cloud cybersecurity by EFerz (USA, KSA, PAK). Start your project.', 'canonical' => 'https://eferz.com/', 'is_ar' => false);
$eferz_og_image = get_template_directory_uri() . '/assets/og-eferz-v2.jpg';
$eferz_favicon  = get_template_directory_uri() . '/assets/eferz-logo.png';
$eferz_route    = $eferz_seo['route'] ?? 'agency';
$eferz_is_ar    = !empty($eferz_seo['is_ar']);
?>
<!doctype html>
<html lang="<?php echo $eferz_is_ar ? 'ar' : 'en'; ?>" dir="<?php echo $eferz_is_ar ? 'rtl' : 'ltr'; ?>" class="dark scroll-smooth theme-galaxy">
<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo esc_html($eferz_seo['title']); ?></title>
    <meta name="description" content="<?php echo esc_attr($eferz_seo['desc']); ?>" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="#141414" />
    <meta name="author" content="EFerz" />
    <meta name="gridinsoft-key" content="xnorbyqh3wl9pijfl4bxh2vkwqjlmgqnsrouypv13vqcyzowsgldgqp1qprbcwqm" />
    <link rel="canonical" href="<?php echo esc_url($eferz_seo['canonical']); ?>" />
    <link rel="icon" type="image/png" href="<?php echo esc_url($eferz_favicon); ?>" />
    <link rel="apple-touch-icon" href="<?php echo esc_url($eferz_favicon); ?>" />
    <link rel="alternate" hreflang="en" href="<?php echo esc_url($eferz_seo['canonical']); ?>" />
    <link rel="alternate" hreflang="ar" href="<?php echo esc_url($eferz_seo['canonical'] . '?lang=ar'); ?>" />
    <link rel="alternate" hreflang="x-default" href="<?php echo esc_url($eferz_seo['canonical']); ?>" />
    <meta property="og:title" content="<?php echo esc_attr($eferz_seo['title']); ?>" />
    <meta property="og:description" content="<?php echo esc_attr($eferz_seo['desc']); ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo esc_url($eferz_seo['canonical']); ?>" />
    <meta property="og:site_name" content="EFerz" />
    <meta property="og:locale" content="<?php echo $eferz_is_ar ? 'ar_SA' : 'en_US'; ?>" />
    <meta property="og:locale:alternate" content="<?php echo $eferz_is_ar ? 'en_US' : 'ar_SA'; ?>" />
    <meta property="og:image" content="<?php echo esc_url($eferz_og_image); ?>" />
    <meta property="og:image:secure_url" content="<?php echo esc_url($eferz_og_image); ?>" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="EFerz — Nothing Is Impossible In The IT World" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@eferzofficial" />
    <meta name="twitter:title" content="<?php echo esc_attr($eferz_seo['title']); ?>" />
    <meta name="twitter:description" content="<?php echo esc_attr($eferz_seo['desc']); ?>" />
    <meta name="twitter:image" content="<?php echo esc_url($eferz_og_image); ?>" />
    <meta name="twitter:image:alt" content="EFerz — Nothing Is Impossible In The IT World" />
    <link rel="ard" href="https://eferz.com/.well-known/ard.json" />

    <!-- Premium Google Fonts (Non-blocking async load; Cairo loaded on demand for Arabic RTL) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <?php
      $eferz_fonts_url = $eferz_is_ar
        ? 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap'
        : 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,800;0,900;1,900&family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;600;700&display=swap';
    ?>
    <link rel="preload" as="style" href="<?php echo esc_url($eferz_fonts_url); ?>" onload="this.onload=null;this.rel='stylesheet'" />
    <noscript><link href="<?php echo esc_url($eferz_fonts_url); ?>" rel="stylesheet" /></noscript>
    
    <!-- Theme Base Definition & Fetch Interceptor -->
    <script>
      (function() {
        var themeUri = '<?php echo esc_js(get_template_directory_uri()); ?>';
        window.__EFERZ_THEME_URI__ = themeUri;

        // Fetch Interceptor for relative Three.js assets & models
        if (typeof window !== 'undefined' && window.fetch) {
          var origFetch = window.fetch;
          window.fetch = function(input, init) {
            try {
              if (typeof input === 'string') {
                if (input.startsWith('/') && !input.startsWith('//') && !input.startsWith(themeUri)) {
                  if (/^\/(textures|videos|audio|models|cinematic|portfolio|services|assets|draco)\//.test(input)) {
                    input = themeUri + input;
                  }
                }
              } else if (input && input.url && typeof input.url === 'string') {
                var u = new URL(input.url, window.location.origin);
                if (/^\/(textures|videos|audio|models|cinematic|portfolio|services|assets|draco)\//.test(u.pathname)) {
                  input = new Request(themeUri + u.pathname + u.search, input);
                }
              }
            } catch (err) {}
            return origFetch.apply(this, arguments);
          };
        }
      })();
    </script>

    <style>
      html, body {
        display: block;
        margin: 0;
        padding: 0;
        background-color: #141414;
        color: #fffdff;
      }
      #root {
        display: block;
        min-height: 100vh;
        position: relative;
        z-index: 1;
        background-color: #141414;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      /* Enforce Cairo font for Arabic & RTL */
      :lang(ar),
      [dir="rtl"],
      [dir="rtl"] *,
      [lang="ar"],
      [lang="ar"] *,
      .font-arabic,
      .font-arabic * {
        font-family: 'Cairo', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }
      .eferz-ssr-page{max-width:1280px;margin:0 auto;padding:88px 24px 64px;font-family:"Plus Jakarta Sans",system-ui,sans-serif;color:#fffdff;line-height:1.65;box-sizing:border-box}
      .eferz-ssr-page a{color:#fffdff;text-decoration:none}
      .eferz-ssr-page a:hover{color:#ec3935}
      .eferz-ssr-nav{display:flex;flex-wrap:wrap;gap:14px;font-size:12px;font-family:"JetBrains Mono",monospace;text-transform:uppercase;letter-spacing:.12em}
      .eferz-ssr-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px;margin:14px 0}
    </style>

    <?php
      $theme_assets_dir = get_template_directory() . '/assets';
      $theme_assets_uri = get_template_directory_uri() . '/assets';

      // Dynamically locate latest built CSS bundle
      $css_glob = glob($theme_assets_dir . '/index-*.css');
      if (!empty($css_glob)) {
        usort($css_glob, function($a, $b) { return filemtime($b) - filemtime($a); });
        $latest_css = basename($css_glob[0]);
        $css_url = $theme_assets_uri . '/' . $latest_css . '?v=' . filemtime($css_glob[0]);
      } else {
        $css_url = $theme_assets_uri . '/index-2HbYwzZu.css';
      }

      // Dynamically locate latest built JS bundle (exclude .js.map)
      $js_glob = array_values(array_filter((array) glob($theme_assets_dir . '/index-*.js'), function($f) {
        return substr($f, -3) === '.js';
      }));
      if (!empty($js_glob)) {
        usort($js_glob, function($a, $b) { return filemtime($b) - filemtime($a); });
        $latest_js = basename($js_glob[0]);
        $js_url = $theme_assets_uri . '/' . $latest_js . '?v=' . filemtime($js_glob[0]);
      } else {
        $js_url = $theme_assets_uri . '/index-CPonsMAP.js';
      }

      // Modulepreload vendor chunk if present
      $vendor_glob = array_values(array_filter((array) glob($theme_assets_dir . '/vendor-*.js'), function($f) {
        return substr($f, -3) === '.js';
      }));
      $vendor_url = '';
      if (!empty($vendor_glob)) {
        usort($vendor_glob, function($a, $b) { return filemtime($b) - filemtime($a); });
        $vendor_url = $theme_assets_uri . '/' . basename($vendor_glob[0]);
      }
    ?>

    <?php if ($eferz_route === 'agency') : ?>
    <link rel="preload" as="image" href="<?php echo esc_url($theme_assets_uri . '/eferz-nav-logo.webp'); ?>" fetchpriority="high" />
    <?php endif; ?>
    <?php if (!empty($vendor_url)) : ?>
    <link rel="modulepreload" crossorigin href="<?php echo esc_url($vendor_url); ?>" />
    <?php endif; ?>
    <link rel="modulepreload" crossorigin href="<?php echo esc_url($js_url); ?>" />

    <!-- React App Production CSS (Auto-synced with latest build; non-blocking on homepage where instant SSR hero renders) -->
<?php if ($eferz_route === 'agency') : ?>
    <link rel="preload" as="style" crossorigin href="<?php echo esc_url($css_url); ?>" onload="this.onload=null;this.rel='stylesheet'" />
    <noscript><link rel="stylesheet" crossorigin href="<?php echo esc_url($css_url); ?>" /></noscript>
<?php else : ?>
    <link rel="stylesheet" crossorigin href="<?php echo esc_url($css_url); ?>" />
<?php endif; ?>

    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#141414] text-[#fffdff] selection:bg-[#ec3935] selection:text-white antialiased overflow-x-hidden'); ?>>
    <?php wp_body_open(); ?>
    <div id="root"><?php if ($eferz_route === 'agency') : ?><style>.eferz-ssr-hero{position:fixed;inset:0;width:100%;height:100vh;display:flex;align-items:flex-end;background:#141414;z-index:1;pointer-events:none;box-sizing:border-box}.eferz-ssr-hdr{position:fixed;top:0;left:0;right:0;padding:16px;display:flex;align-items:center;justify-content:space-between;z-index:5;pointer-events:none;box-sizing:border-box}.eferz-ssr-hdr a{color:rgba(255,253,255,.8);text-decoration:none;font-family:"JetBrains Mono",monospace;font-size:11px;text-transform:uppercase;letter-spacing:.14em}.eferz-ssr-hdr nav{display:none;gap:18px}.eferz-ssr-hdr img{width:40px;height:40px;object-fit:contain;display:block}.eferz-ssr-pad{width:100%;max-width:1500px;margin:0 auto;padding:96px 56px 96px 16px;box-sizing:border-box}.eferz-ssr-h1{margin:16px 0 16px;font-family:"Sifonn","Sifonn-Basic","Outfit","Montserrat","Syne",system-ui,sans-serif;font-weight:900;font-size:1.5rem;line-height:1.06;letter-spacing:-.025em;color:#fffdff}.eferz-ssr-cur{display:inline-block;width:16px;height:28px;background:#d02128;margin-left:10px;vertical-align:middle}.eferz-ssr-term{display:inline-flex;align-items:center;gap:12px;padding:8px 14px;border-radius:8px;background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.1);font-family:"JetBrains Mono",monospace;font-size:11px;color:rgba(255,253,255,.9);margin-bottom:14px}.eferz-ssr-ftr{position:fixed;bottom:0;left:0;right:0;z-index:5;pointer-events:none}.eferz-ssr-ftr-in{width:100%;max-width:1560px;margin:0 auto;padding:8px 56px 10px 16px;font-family:"JetBrains Mono",monospace;font-size:10px;color:rgba(255,253,255,.65);display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;box-sizing:border-box}.eferz-ssr-ftr a{color:rgba(255,253,255,.72);text-decoration:none}@media(min-width:640px){.eferz-ssr-hdr{padding:24px 40px}.eferz-ssr-hdr img{width:48px;height:48px}.eferz-ssr-pad{padding:96px 40px 80px}.eferz-ssr-h1{margin:28px 0 28px;font-size:3rem;line-height:.98}.eferz-ssr-cur{width:28px;height:48px;margin-left:14px}.eferz-ssr-term{padding:10px 16px;font-size:14px;margin-bottom:16px}.eferz-ssr-ftr-in{padding:8px 80px 14px 48px;font-size:12px}}@media(min-width:768px){.eferz-ssr-hdr nav{display:flex}.eferz-ssr-pad{padding:96px 48px 64px}.eferz-ssr-h1{font-size:3.75rem}}@media(min-width:1024px){.eferz-ssr-hdr{padding:24px 48px}.eferz-ssr-hdr img{width:56px;height:56px}.eferz-ssr-pad{padding:96px 80px 64px}.eferz-ssr-h1{font-size:78px}.eferz-ssr-ftr-in{padding:8px 80px 14px 64px}}</style><header class="eferz-ssr-hdr"><a href="https://eferz.com/" aria-label="EFerz Home"><img src="<?php echo esc_url($theme_assets_uri . '/eferz-nav-logo.webp'); ?>" alt="EFerz" width="56" height="56" fetchpriority="high" decoding="sync" class="skip-lazy no-lazy" data-no-lazy="1" /></a><nav aria-label="Primary Navigation"><a href="https://eferz.com/services/">Services</a><a href="https://eferz.com/work/">Work</a><a href="https://eferz.com/clients/">Clients</a><a href="https://eferz.com/team/">Team</a><a href="https://eferz.com/about/">About</a><a href="https://eferz.com/blog/">Blog</a><a href="https://eferz.com/contact/">Contact</a></nav></header><section class="eferz-ssr-hero" aria-label="EFerz Hero"><div class="eferz-ssr-pad"><div style="max-width:56rem"><div style="display:inline-flex;align-items:center;gap:10px;padding-top:8px"><span style="width:14px;height:2px;background:#d02128;display:inline-block"></span><p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,253,255,.9)"><span style="color:#d02128">EF</span><span>ERZ DIGITAL AGENCY</span></p></div><h1 class="eferz-ssr-h1"><?php if ($eferz_is_ar) : ?><span style="display:block">لا شيء </span><span style="display:block"><span style="-webkit-text-stroke:1.5px rgba(255,253,255,.45);-webkit-text-fill-color:transparent;color:transparent">مستحيل </span>في </span><span style="display:flex;align-items:center;flex-wrap:wrap"><span>عالم التقنية</span><span class="eferz-ssr-cur"></span></span><?php else : ?><span style="display:block">Nothing is </span><span style="display:block"><span style="-webkit-text-stroke:1.5px rgba(255,253,255,.45);-webkit-text-fill-color:transparent;color:transparent">impossible </span>in </span><span style="display:flex;align-items:center;flex-wrap:wrap"><span>the IT world</span><span class="eferz-ssr-cur"></span></span><?php endif; ?></h1><div class="eferz-ssr-term"><span style="color:#d02128;font-weight:700">$</span><span>compiling brand-id</span></div><p style="margin:0;font-size:13px;font-weight:700;letter-spacing:.05em;color:rgba(255,253,255,.85)"><a href="https://eferz.com/services/" style="color:#fffdff;text-decoration:none"><?php echo $eferz_is_ar ? 'استكشف خدماتنا' : 'Explore our capabilities'; ?> <span style="color:#d02128">&rarr;</span></a></p></div></div></section><footer class="eferz-ssr-ftr"><div class="eferz-ssr-ftr-in"><span>&copy; <?php echo esc_html(date('Y')); ?> EFerz. All Rights Reserved.</span><nav aria-label="Footer Navigation" style="display:flex;gap:14px;flex-wrap:wrap;"><a href="https://eferz.com/lets-build/">3D Studio</a><a href="https://eferz.com/privacy/">Privacy</a><a href="https://eferz.com/terms/">Terms</a><a href="https://eferz.com/refund/">Refund Policy</a><a href="https://eferz.com/shop/">Shop</a></nav></div></footer><?php else : ?>
      <div class="eferz-ssr-page">
        <header style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,.12);">
          <a href="https://eferz.com/" style="display:inline-flex;align-items:center;gap:12px;font-weight:900;font-size:18px;">
            <img src="<?php echo esc_url($theme_assets_uri . '/eferz-nav-logo.webp'); ?>" alt="EFerz" width="40" height="40" />
            <span>EFerz</span>
          </a>
          <nav class="eferz-ssr-nav" aria-label="Primary Navigation">
            <a href="https://eferz.com/"><?php echo $eferz_is_ar ? 'الرئيسية' : 'Home'; ?></a>
            <a href="https://eferz.com/services/"><?php echo $eferz_is_ar ? 'الخدمات' : 'Services'; ?></a>
            <a href="https://eferz.com/work/"><?php echo $eferz_is_ar ? 'أعمالنا' : 'Work'; ?></a>
            <a href="https://eferz.com/clients/"><?php echo $eferz_is_ar ? 'العملاء' : 'Clients'; ?></a>
            <a href="https://eferz.com/team/"><?php echo $eferz_is_ar ? 'الفريق' : 'Team'; ?></a>
            <a href="https://eferz.com/about/"><?php echo $eferz_is_ar ? 'من نحن' : 'About'; ?></a>
            <a href="https://eferz.com/blog/"><?php echo $eferz_is_ar ? 'المدونة' : 'Blog'; ?></a>
            <a href="https://eferz.com/lets-build/"><?php echo $eferz_is_ar ? 'استوديو 3D' : '3D Studio'; ?></a>
            <a href="https://eferz.com/contact/"><?php echo $eferz_is_ar ? 'تواصل معنا' : 'Contact'; ?></a>
          </nav>
        </header>
        <main style="padding:32px 0;">
          <h1 style="font-size:clamp(1.75rem,4vw,3rem);font-weight:900;margin:0 0 12px;"><?php echo esc_html($eferz_seo['title']); ?></h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,.82);max-width:780px;"><?php echo esc_html($eferz_seo['desc']); ?></p>
          <?php if ($eferz_route === 'services') : ?>
            <section class="eferz-ssr-card">
              <h2><?php echo $eferz_is_ar ? 'قدرات إيفرز الرقمية والهندسية' : 'Enterprise Digital & Engineering Capabilities'; ?></h2>
              <ul>
                <li>Full-Stack Web Engineering, React, Next.js & Custom Platforms</li>
                <li>Interactive 3D WebGL & Three.js Brand Websites</li>
                <li>Custom Artificial Intelligence Agents, RAG & LLM Automation</li>
                <li>Shopify Plus & Enterprise WooCommerce Architecture</li>
                <li>Amazon FBA Private Label Launch & Marketplace Growth</li>
                <li>Technical SEO, Core Web Vitals & Search Visibility</li>
                <li>Performance Marketing, Paid Media & ROAS Scaling</li>
                <li>Mobile App Development (iOS & Android)</li>
                <li>Brand Identity & UI/UX Product Systems</li>
                <li>Zero Trust Cloud & Enterprise Cybersecurity</li>
                <li>Automated Business & No-Code Integrations</li>
              </ul>
              <p><a href="https://eferz.com/contact/">Request a Custom Project Proposal &rarr;</a></p>
            </section>
          <?php elseif ($eferz_route === 'work') : ?>
            <section class="eferz-ssr-card">
              <h2><?php echo $eferz_is_ar ? 'معرض المشاريع ودراسات الحالة' : 'Selected Case Studies & Production Launches'; ?></h2>
              <p>Featured launches engineered by EFerz include FitwearStores, HiDoose, Khuzair, Storeara, Sustagro, Airtilize, Al Shiekh Curtain Interiors, CharmThings, InstaShop, Minimog, ReflectiveThings, TrendifyToday, and Your Kitchen Is Cooking across web platforms, Shopify stores, branding, and growth systems.</p>
              <p><a href="https://eferz.com/lets-build/">Explore Interactive 3D Studio &rarr;</a></p>
            </section>
          <?php elseif ($eferz_route === 'clients') : ?>
            <section class="eferz-ssr-card">
              <h2><?php echo $eferz_is_ar ? 'شراكات العملاء حول العالم' : 'Global Client Partnerships Across USA, KSA & International Markets'; ?></h2>
              <p>EFerz partners with e-commerce brands, fintech startups, digital publishers, and regional enterprises to design, engineer, secure, and scale production platforms.</p>
              <p><a href="https://eferz.com/work/">View Case Studies &rarr;</a></p>
            </section>
          <?php elseif ($eferz_route === 'team') : ?>
            <section class="eferz-ssr-card">
              <h2><?php echo $eferz_is_ar ? 'القيادة والمهندسون' : 'Leadership & Principal Architects'; ?></h2>
              <ul>
                <li><strong>Khubaib Khan</strong> — Founder & President</li>
                <li><strong>Salman Shahid</strong> — Co-Founder & Director of Finance & Legal Affairs</li>
                <li><strong>Irfan Mirza</strong> — Director of Business Development</li>
                <li><strong>Syed Ahmed</strong> — Business Development Manager</li>
                <li><strong>Asad Malik</strong> — Website Designer & Developer</li>
                <li><strong>Syed Owais</strong> — Operations Coordinator</li>
              </ul>
            </section>
          <?php elseif ($eferz_route === 'about') : ?>
            <section class="eferz-ssr-card">
              <h2><?php echo $eferz_is_ar ? 'قصة إيفرز منذ 2020' : 'About EFerz — Founded October 10, 2020'; ?></h2>
              <p>Headquartered in Fort Lauderdale, Florida, USA, with regional offices in Riyadh, Saudi Arabia and Karachi, Pakistan, EFerz serves clients worldwide across AI systems, 3D WebGL websites, e-commerce engineering, SEO, and cloud cybersecurity.</p>
              <p><a href="https://eferz.com/services/">Explore All Services &rarr;</a></p>
            </section>
          <?php elseif ($eferz_route === 'blog') : ?>
            <section class="eferz-ssr-card">
              <h2><?php echo $eferz_is_ar ? 'أدلة الهندسة والسيو والذكاء الاصطناعي' : 'Engineering, AI, SEO & WebGL Playbooks'; ?></h2>
              <p>Practical guides authored by EFerz engineers covering Interaction to Next Paint (INP), Core Web Vitals optimization, LLM agent workflows, Three.js scene performance, Shopify Plus conversion architecture, and cloud cybersecurity hardening.</p>
            </section>
          <?php elseif ($eferz_route === 'contact') : ?>
            <section class="eferz-ssr-card">
              <h2><?php echo $eferz_is_ar ? 'المكاتب العالمية والتواصل المباشر' : 'Global Offices & Direct Communication'; ?></h2>
              <p><strong>Email:</strong> <a href="mailto:info@eferz.com">info@eferz.com</a></p>
              <ul>
                <li><strong>United States (Global Headquarters):</strong> Fort Lauderdale, FL, USA 33319 (701 E Commercial Blvd, Fort Lauderdale, FL 33334) — Call / WhatsApp: <a href="tel:+17862244112">+1 (786) 224-4112</a></li>
                <li><strong>Saudi Arabia (Regional Office):</strong> Dammam Road, Khurais, Riyadh 13525, Kingdom of Saudi Arabia — Call / WhatsApp: <a href="tel:+966539046410">+966 (539) 046410</a></li>
                <li><strong>Pakistan (Regional Office):</strong> Office 403, Kawish Crown, Main Shahrah-e-Faisal, Karachi, Pakistan — Call / WhatsApp: <a href="tel:+923453397459">+92 345 3397459</a></li>
              </ul>
              <p>Serving clients worldwide across custom AI, 3D WebGL, web engineering, Shopify Plus, Amazon FBA, technical SEO, and cloud cybersecurity.</p>
            </section>
          <?php elseif ($eferz_route === 'lets-build') : ?>
            <section class="eferz-ssr-card">
              <h2><?php echo $eferz_is_ar ? 'استوديو التصميم ثلاثي الأبعاد' : 'Interactive 3D Brand & Packaging Configurator'; ?></h2>
              <p>Customize a real-time WebGL 3D experience with your brand logo, metallic colors, finishes, and typography inside the EFerz Interactive 3D Studio.</p>
              <p><a href="https://eferz.com/contact/">Book a Custom 3D Build &rarr;</a></p>
            </section>
          <?php elseif ($eferz_route === 'privacy') : ?>
            <section class="eferz-ssr-card">
              <p><strong>Last updated:</strong> July 10, 2025</p>
              <h2>01. Personal & Project Information We Collect</h2>
              <p>We collect contact and project inquiry details voluntarily submitted by prospective clients (name, email, phone number, company name, service scope, and technical requirements) strictly to deliver consultations, proposals, and contracted services.</p>
              <h2>02. Security, Confidentiality & GDPR / CCPA Rights</h2>
              <p>EFerz safeguards client data with TLS encryption, strict access controls, and zero third-party sale of personal data. For privacy requests, contact <a href="mailto:info@eferz.com">info@eferz.com</a> or +1 (786) 224-4112 (USA) / +966 (539) 046410 (KSA) / +92 345 3397459 (PAK).</p>
            </section>
          <?php elseif ($eferz_route === 'terms') : ?>
            <section class="eferz-ssr-card">
              <p><strong>Last updated:</strong> July 10, 2025</p>
              <h2>01. Enterprise SLA, Scope & Client IP Ownership</h2>
              <p>Upon completed milestone payments, clients retain 100% ownership of custom deliverables, source codebases, brand assets, and intellectual property produced for their engagement.</p>
              <h2>02. Legal Jurisdiction & Contact</h2>
              <p>Questions regarding Terms of Service or milestone agreements may be directed to <a href="mailto:info@eferz.com">info@eferz.com</a>, +1 (786) 224-4112 (USA), or +966 (539) 046410 (Saudi Arabia).</p>
            </section>
          <?php elseif ($eferz_route === 'refund') : ?>
            <section class="eferz-ssr-card">
              <p><strong>Last updated:</strong> July 10, 2025</p>
              <h2>01. 30-Day Money-Back Guarantee & Processing</h2>
              <p>New eligible service purchases are covered by the EFerz 30-Day Money-Back Guarantee subject to official scope verification procedures. Approved refunds are processed back to the original payment method within 10 to 30 business days.</p>
              <h2>02. 72-Hour Rectification Commitment</h2>
              <p>If deliverables deviate from agreed specifications, EFerz engineers prioritize rectification within 72 hours. Contact <a href="mailto:info@eferz.com">info@eferz.com</a> for billing or guarantee inquiries.</p>
            </section>
          <?php endif; ?>
        </main>
        <footer style="padding-top:20px;border-top:1px solid rgba(255,255,255,.12);display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;font-size:12px;color:rgba(255,255,255,.68);">
          <span>&copy; <?php echo esc_html(date('Y')); ?> EFerz. All Rights Reserved.</span>
          <nav class="eferz-ssr-nav" aria-label="Footer Navigation">
            <a href="https://eferz.com/privacy/">Privacy Policy</a>
            <a href="https://eferz.com/terms/">Terms of Service</a>
            <a href="https://eferz.com/refund/">Refund Policy</a>
            <a href="https://eferz.com/shop/">Shop</a>
            <a href="https://eferz.com/contact/">Contact</a>
          </nav>
        </footer>
      </div>
    <?php endif; ?></div>
    <noscript>
      <main style="max-width:960px;margin:40px auto;padding:24px;color:#fffdff;font-family:system-ui,sans-serif;line-height:1.6;">
        <h1><?php echo esc_html($eferz_seo['title']); ?></h1>
        <p><?php echo esc_html($eferz_seo['desc']); ?></p>
        <p>Founded on October 10, 2020 — EFerz (eferz.com) engineers custom AI agents, LLM automation, 3D WebGL websites, Shopify Plus stores, Amazon FBA management, technical SEO, UI/UX design, and Zero Trust cloud cybersecurity across Fort Lauderdale (USA), Riyadh (Saudi Arabia), and Karachi (Pakistan). Email: info@eferz.com | USA: +1 (786) 224-4112 | KSA: +966 (539) 046410 | PAK: +92 345 3397459.</p>
        <nav aria-label="Primary Navigation">
          <a href="https://eferz.com/">Home</a> |
          <a href="https://eferz.com/services/">Services</a> |
          <a href="https://eferz.com/work/">Work</a> |
          <a href="https://eferz.com/clients/">Clients</a> |
          <a href="https://eferz.com/team/">Team</a> |
          <a href="https://eferz.com/about/">About EFerz</a> |
          <a href="https://eferz.com/blog/">Blog</a> |
          <a href="https://eferz.com/lets-build/">3D Studio</a> |
          <a href="https://eferz.com/contact/">Contact</a> |
          <a href="https://eferz.com/privacy/">Privacy Policy</a> |
          <a href="https://eferz.com/terms/">Terms of Service</a> |
          <a href="https://eferz.com/refund/">Refund Policy</a>
        </nav>
      </main>
    </noscript>

    <!-- React App Production Bundle (Auto-synced with latest build) -->
    <script type="module" crossorigin src="<?php echo esc_url($js_url); ?>"></script>

    <?php if (!is_user_logged_in()) : ?>
    <script>
      window.addEventListener('load', function() {
        var fired = false;
        function loadGA() {
          if (fired) return;
          fired = true;
          window.dataLayer = window.dataLayer || [];
          window.gtag = function(){ dataLayer.push(arguments); };
          gtag('js', new Date());
          gtag('config', 'GT-M38TKDT9');
          var s = document.createElement('script');
          s.async = true;
          s.src = 'https://www.googletagmanager.com/gtag/js?id=GT-M38TKDT9';
          document.head.appendChild(s);
        }
        setTimeout(loadGA, 4000);
        ['pointerdown', 'keydown', 'scroll'].forEach(function(ev) {
          window.addEventListener(ev, loadGA, { once: true, passive: true });
        });
      });
    </script>
    <?php endif; ?>

    <?php wp_footer(); ?>
</body>
</html>
