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
    <title>EFerz Digital Agency | AI Solutions, 3D WebGL & Custom Software (USA · KSA · PAK)</title>
    <meta name="description" content="EFerz is an award-winning global digital agency in USA, Saudi Arabia & Pakistan specializing in Artificial Intelligence, 3D WebGL websites, Shopify Plus, Amazon FBA, SEO, and Cybersecurity." />
    <meta name="keywords" content="EFerz Digital Agency, AI Development Agency USA KSA, 3D WebGL Website Design, Custom Software Engineering, Shopify Plus & Amazon FBA Agency, Enterprise SEO, Riyadh Digital Agency, وكالة إيفرز الرقمية" />
    <meta property="og:title" content="EFerz Digital Agency | AI Solutions, 3D WebGL & Custom Software (USA · KSA · PAK)" />
    <meta property="og:description" content="EFerz is an award-winning global digital agency in USA, Saudi Arabia & Pakistan specializing in Artificial Intelligence, 3D WebGL websites, Shopify Plus, Amazon FBA, SEO, and Cybersecurity." />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="EFerz Digital Agency" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="EFerz Digital Agency | AI Solutions, 3D WebGL & Custom Software" />
    <meta name="twitter:description" content="Next-generation enterprise AI systems, autonomous agents, modern 3D WebGL platforms, and digital transformation services built by EFerz." />
    
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
      @keyframes eferzSpin {
        to { transform: rotate(360deg); }
      }
    </style>

    <!-- React App Production CSS -->
    <link rel="stylesheet" crossorigin href="<?php echo get_template_directory_uri(); ?>/assets/index-V1FWc9GM.css">

    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#121212] text-[#fffdff] selection:bg-[#ec3935] selection:text-white antialiased overflow-x-hidden'); ?>>
    <?php wp_body_open(); ?>
    <div id="root">
      <div id="eferz-loading" style="min-height:100vh;background:#121212;display:flex;align-items:center;justify-content:center;color:#fff;font-family:sans-serif;">
        <div style="text-align:center;">
          <div style="width:44px;height:44px;border:3px solid #ec3935;border-top-color:transparent;border-radius:50%;animation:eferzSpin 0.9s linear infinite;margin:0 auto 16px;"></div>
          <div style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#888;">Initializing EFerz Studio...</div>
        </div>
      </div>
    </div>

    <!-- React App Production Bundle (Executed right after #root is in DOM) -->
    <script type="module" crossorigin src="<?php echo get_template_directory_uri(); ?>/assets/index-COr7fzDp.js"></script>

    <?php wp_footer(); ?>
</body>
</html>
