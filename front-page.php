<?php
/**
 * EFerz Digital Agency - Flagship WebGL & AI Experience
 * Exact 100% React Application from AI Studio Build
 *
 * @package EFerz
 * @version 1.1.0
 */
$eferz_seo = function_exists('eferz_get_route_seo') ? eferz_get_route_seo() : array('title' => 'EFerz Digital Agency | AI, 3D WebGL, SEO & Software', 'desc' => 'Global AI automation, 3D WebGL websites, Shopify Plus, Amazon FBA, technical SEO & cloud cybersecurity by EFerz (USA, KSA, PAK). Start your project.', 'keywords' => 'EFerz Digital Agency, AI Development Agency, 3D WebGL Website Design, Shopify Plus, Amazon FBA, Technical SEO, Cybersecurity', 'canonical' => 'https://eferz.com/', 'is_ar' => false);
$eferz_og_image = get_template_directory_uri() . '/assets/og-eferz-v2.jpg';
$eferz_favicon  = get_template_directory_uri() . '/assets/eferz-logo.png';
?>
<!doctype html>
<html <?php language_attributes(); ?> class="dark scroll-smooth theme-galaxy">
<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo esc_html($eferz_seo['title']); ?></title>
    <meta name="description" content="<?php echo esc_attr($eferz_seo['desc']); ?>" />
    <meta name="keywords" content="<?php echo esc_attr($eferz_seo['keywords']); ?>" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="#121212" />
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
    <meta property="og:locale" content="<?php echo $eferz_seo['is_ar'] ? 'ar_SA' : 'en_US'; ?>" />
    <meta property="og:locale:alternate" content="<?php echo $eferz_seo['is_ar'] ? 'en_US' : 'ar_SA'; ?>" />
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

    <!-- Premium Google Fonts (Non-blocking async load) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,900&family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" onload="this.onload=null;this.rel='stylesheet'" />
    <noscript><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,900&family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" /></noscript>
    
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
        background-color: #06070c;
        color: #fffdff;
      }
      #root {
        display: block;
        min-height: 100vh;
        position: relative;
        z-index: 1;
        background-color: #06070c;
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

    <?php if (!empty($vendor_url)) : ?>
    <link rel="modulepreload" crossorigin href="<?php echo esc_url($vendor_url); ?>" />
    <?php endif; ?>
    <link rel="modulepreload" crossorigin href="<?php echo esc_url($js_url); ?>" />

    <!-- React App Production CSS (Auto-synced with latest build; non-blocking on homepage where instant SSR hero renders) -->
<?php if ($eferz_seo['route'] === 'agency') : ?>
    <link rel="preload" as="style" crossorigin href="<?php echo esc_url($css_url); ?>" onload="this.onload=null;this.rel='stylesheet'" />
    <noscript><link rel="stylesheet" crossorigin href="<?php echo esc_url($css_url); ?>" /></noscript>
<?php else : ?>
    <link rel="stylesheet" crossorigin href="<?php echo esc_url($css_url); ?>" />
<?php endif; ?>

    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#06070c] text-[#fffdff] selection:bg-[#ec3935] selection:text-white antialiased overflow-x-hidden'); ?>>
    <?php wp_body_open(); ?>
    <div id="root"><?php if ($eferz_seo['route'] === 'agency') : ?><style>.eferz-ssr-hero{position:fixed;inset:0;width:100%;height:100vh;display:flex;align-items:flex-end;background:#06070c;z-index:1;pointer-events:none;box-sizing:border-box}.eferz-ssr-pad{width:100%;max-width:1500px;margin:0 auto;padding:96px 56px 96px 16px;box-sizing:border-box}.eferz-ssr-h1{margin:16px 0 14px;font-family:"Sifonn","Sifonn-Basic","Outfit","Montserrat","Syne",system-ui,sans-serif;font-weight:900;font-size:1.5rem;line-height:1.06;letter-spacing:-.025em;color:#fffdff}@media(min-width:640px){.eferz-ssr-pad{padding:96px 40px 80px}.eferz-ssr-h1{margin:28px 0 20px;font-size:3rem;line-height:.98}}@media(min-width:768px){.eferz-ssr-pad{padding:96px 48px 64px}.eferz-ssr-h1{font-size:3.75rem}}@media(min-width:1024px){.eferz-ssr-pad{padding:96px 80px 64px}.eferz-ssr-h1{font-size:78px}}</style><section class="eferz-ssr-hero" aria-label="EFerz Hero"><div class="eferz-ssr-pad"><div style="max-width:56rem"><div style="display:inline-flex;align-items:center;gap:10px;padding-top:8px"><span style="width:14px;height:2px;background:#d02128;display:inline-block"></span><p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,253,255,.9)"><span style="color:#d02128">EF</span><span>ERZ DIGITAL AGENCY</span></p></div><h1 class="eferz-ssr-h1"><span style="display:block">Nothing is</span><span style="display:block"><span style="-webkit-text-stroke:1.5px rgba(255,253,255,.45);color:transparent">impossible</span> in</span><span style="display:block">the IT world</span></h1><p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.05em;color:rgba(255,253,255,.85)">Scroll to explore <span style="color:#d02128">&rarr;</span></p></div></div></section><?php endif; ?></div>
    <noscript>
      <main style="max-width:960px;margin:40px auto;padding:24px;color:#fffdff;font-family:system-ui,sans-serif;line-height:1.6;">
        <h1><?php echo esc_html($eferz_seo['title']); ?></h1>
        <p><?php echo esc_html($eferz_seo['desc']); ?></p>
        <p>Founded on October 10, 2020 — EFerz (eferz.com) engineers custom AI agents, LLM automation, 3D WebGL websites, Shopify Plus stores, Amazon FBA management, technical SEO, UI/UX design, and Zero Trust cloud cybersecurity across Fort Lauderdale (USA), Riyadh (Saudi Arabia), and Karachi (Pakistan).</p>
        <nav aria-label="Primary Navigation">
          <a href="https://eferz.com/">Home</a> |
          <a href="https://eferz.com/services/">Services</a> |
          <a href="https://eferz.com/work/">Work</a> |
          <a href="https://eferz.com/clients/">Clients</a> |
          <a href="https://eferz.com/team/">Team</a> |
          <a href="https://eferz.com/about/">About EFerz</a> |
          <a href="https://eferz.com/blog/">Blog</a> |
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
