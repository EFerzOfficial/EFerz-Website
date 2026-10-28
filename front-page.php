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
    
    <!-- Theme Base Interceptor for Relative Media & Models -->
    <script>
      (function() {
        var themeUri = '<?php echo esc_js(get_template_directory_uri()); ?>';
        window.__EFERZ_THEME_URI__ = themeUri;

        // Fetch Interceptor for relative assets
        var origFetch = window.fetch;
        window.fetch = function(input, init) {
          if (typeof input === 'string') {
            if (input.startsWith('/') && !input.startsWith('//') && !input.startsWith(themeUri)) {
              if (input.match(/^\/(textures|videos|audio|models|cinematic|portfolio|services|assets|draco)\//)) {
                input = themeUri + input;
              }
            }
          } else if (input && input.url && typeof input.url === 'string') {
            var u = new URL(input.url, window.location.origin);
            if (u.pathname.match(/^\/(textures|videos|audio|models|cinematic|portfolio|services|assets|draco)\//)) {
              input = new Request(themeUri + u.pathname + u.search, input);
            }
          }
          return origFetch ? origFetch.call(this, input, init) : Promise.reject('No fetch');
        };

        // DOM Media src Interceptor
        var origSetAttribute = Element.prototype.setAttribute;
        Element.prototype.setAttribute = function(name, val) {
          if (typeof val === 'string' && (name === 'src' || name === 'href' || name === 'poster')) {
            if (val.startsWith('/') && !val.startsWith('//') && !val.startsWith(themeUri)) {
              if (val.match(/^\/(textures|videos|audio|models|cinematic|portfolio|services|assets|draco)\//)) {
                val = themeUri + val;
              }
            }
          }
          return origSetAttribute.call(this, name, val);
        };

        // Media property setters
        ['HTMLImageElement', 'HTMLMediaElement', 'HTMLVideoElement', 'HTMLAudioElement'].forEach(function(cls) {
          if (window[cls] && window[cls].prototype) {
            var desc = Object.getOwnPropertyDescriptor(window[cls].prototype, 'src');
            if (desc && desc.set) {
              var origSet = desc.set;
              Object.defineProperty(window[cls].prototype, 'src', {
                set: function(val) {
                  if (typeof val === 'string' && val.startsWith('/') && !val.startsWith('//') && !val.startsWith(themeUri)) {
                    if (val.match(/^\/(textures|videos|audio|models|cinematic|portfolio|services|assets|draco)\//)) {
                      val = themeUri + val;
                    }
                  }
                  return origSet.call(this, val);
                },
                get: desc.get,
                configurable: true
              });
            }
          }
        });
      })();
    </script>

    <style>
      /* Suppress any legacy Elementor Theme Builder headers and footers */
      .elementor-location-header,
      .elementor-location-footer,
      footer.elementor-2605,
      header.elementor-2609,
      .elementor-page-2609,
      .elementor-page-2605 {
        display: none !important;
      }
      body {
        margin: 0;
        padding: 0;
        background-color: #121212 !important;
      }
    </style>

    <!-- React App Production CSS & JS -->
    <link rel="stylesheet" crossorigin href="<?php echo get_template_directory_uri(); ?>/assets/index-IsCmkyra.css">
    <script type="module" crossorigin src="<?php echo get_template_directory_uri(); ?>/assets/index-BLhZRj5s.js"></script>

    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#121212] text-[#fffdff] selection:bg-[#ec3935] selection:text-white antialiased overflow-x-hidden'); ?>>
    <?php wp_body_open(); ?>
    <div id="root"></div>
    <?php wp_footer(); ?>
</body>
</html>
