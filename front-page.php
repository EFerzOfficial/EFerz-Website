<?php
/**
 * EFerz Digital Agency - Flagship WebGL & AI Experience
 * Exact 100% React Application from AI Studio Build
 *
 * @package EFerz
 * @version 1.0.0
 */
?><!doctype html>
<html <?php language_attributes(); ?> class="dark scroll-smooth theme-galaxy">
<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <?php if (!did_action('wp_head') && !current_theme_supports('title-tag')): ?>
    <title>EFerz Digital Agency - Cinematic 3D Web Experience</title>
    <?php endif; ?>
    <meta name="description" content="EFerz Digital Agency is an award-winning global agency specializing in Artificial Intelligence, 3D WebGL websites, custom software, eCommerce, SEO, and enterprise cybersecurity." />
    <meta name="keywords" content="EFerz Digital Agency, EFerz, AI Development Agency, 3D WebGL Website Design, Custom Software Engineering, Shopify Plus & Amazon FBA Agency, Enterprise SEO, Riyadh Digital Agency, وكالة إيفرز الرقمية" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="#121212" />
    <meta name="author" content="EFerz Digital Agency" />
    <link rel="canonical" href="https://eferz.com/" />
    <meta property="og:title" content="EFerz Digital Agency - Cinematic 3D Web Experience" />
    <meta property="og:description" content="EFerz Digital Agency is an award-winning global agency specializing in Artificial Intelligence, 3D WebGL websites, custom software, eCommerce, SEO, and enterprise cybersecurity." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://eferz.com/" />
    <meta property="og:site_name" content="EFerz Digital Agency" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:locale:alternate" content="ar_SA" />
    <meta property="og:image" content="https://eferz.com/wp-content/uploads/2026/08/Logo-scaled.png" />
    <meta property="og:image:alt" content="EFerz Digital Agency Logo" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="EFerz Digital Agency - Cinematic 3D Web Experience" />
    <meta name="twitter:description" content="Next-generation enterprise AI systems, autonomous agents, modern 3D WebGL platforms, and digital transformation services built by EFerz." />
    <meta name="twitter:image" content="https://eferz.com/wp-content/uploads/2026/08/Logo-scaled.png" />
    <meta name="twitter:image:alt" content="EFerz Digital Agency Logo" />
    <link rel="preload" as="video" href="<?php echo get_template_directory_uri(); ?>/videos/intro_cinematic.mp4" type="video/mp4">
    
    <!-- Premium Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,900&family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Cabinet+Grotesk:wght@800;900&family=Clash+Display:wght@700;900&family=Cinzel:wght@700;900&display=swap" rel="stylesheet">
    
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
      /* Ensure body and root are always visible and active */
      html, body {
        display: block !important;
        margin: 0 !important;
        padding: 0 !important;
        background-color: #121212 !important;
        color: #fffdff !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      #root {
        display: block !important;
        min-height: 100vh !important;
        position: relative !important;
        z-index: 1 !important;
      }
      /* Suppress only legacy Elementor Theme Builder headers and footers (never hide body) */
      header.elementor,
      footer.elementor,
      .elementor-location-header,
      .elementor-location-footer,
      header.elementor-2609,
      footer.elementor-2605 {
        display: none !important;
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
      @keyframes eferzOrbit {
        to { transform: rotate(360deg); }
      }
      @keyframes eferzOrbitRev {
        to { transform: rotate(-360deg); }
      }
      @keyframes eferzPulseGlow {
        0%, 100% {
          transform: scale(1);
          filter: drop-shadow(0 0 25px rgba(208,33,40,0.85)) brightness(1.15);
        }
        50% {
          transform: scale(1.08);
          filter: drop-shadow(0 0 45px rgba(208,33,40,1)) brightness(1.3);
        }
      }
    </style>

    <!-- React App Production CSS -->
    <link rel="stylesheet" crossorigin href="<?php echo get_template_directory_uri(); ?>/assets/index-CiPU1Re8.css">

    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#121212] text-[#fffdff] selection:bg-[#ec3935] selection:text-white antialiased overflow-x-hidden'); ?>>
    <?php wp_body_open(); ?>
    <div id="root">
      <div id="eferz-loading" style="min-height:100vh;background:#000000;display:flex;align-items:center;justify-content:center;position:fixed;inset:0;z-index:99999;"></div>
    </div>

    <!-- React App Production Bundle (Executed right after #root is in DOM) -->
    <script type="module" crossorigin src="<?php echo get_template_directory_uri(); ?>/assets/index-5Oar30Ew.js"></script>

    <?php wp_footer(); ?>
</body>
</html>
