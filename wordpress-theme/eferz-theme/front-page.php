<?php
/**
 * EFerz Digital Agency - Flagship WebGL & AI Experience
 * Exact 100% React Application from AI Studio Build
 *
 * @package EFerz
 * @version 1.1.0
 */
$eferz_seo = function_exists('eferz_get_route_seo') ? eferz_get_route_seo() : array('title' => 'EFerz Digital Agency | AI, 3D WebGL, SEO & Software', 'desc' => 'Global AI automation, 3D WebGL websites, Shopify Plus, Amazon FBA, technical SEO & cloud cybersecurity by EFerz (USA, KSA, PAK). Start your project.', 'keywords' => 'EFerz Digital Agency, AI Development Agency, 3D WebGL Website Design, Shopify Plus, Amazon FBA, Technical SEO, Cybersecurity', 'canonical' => 'https://eferz.com/', 'is_ar' => false);
?>
<!doctype html>
<html <?php language_attributes(); ?> class="dark scroll-smooth theme-galaxy">
<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <?php if (!did_action('wp_head') && !current_theme_supports('title-tag')): ?>
    <title><?php echo esc_html($eferz_seo['title']); ?></title>
    <?php endif; ?>
    <meta name="description" content="<?php echo esc_attr($eferz_seo['desc']); ?>" />
    <meta name="keywords" content="<?php echo esc_attr($eferz_seo['keywords']); ?>" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="#121212" />
    <meta name="author" content="EFerz Digital Agency" />
    <link rel="canonical" href="<?php echo esc_url($eferz_seo['canonical']); ?>" />
    <link rel="alternate" hreflang="en" href="<?php echo esc_url($eferz_seo['canonical']); ?>" />
    <link rel="alternate" hreflang="ar" href="<?php echo esc_url($eferz_seo['canonical'] . '?lang=ar'); ?>" />
    <link rel="alternate" hreflang="x-default" href="<?php echo esc_url($eferz_seo['canonical']); ?>" />
    <meta property="og:title" content="<?php echo esc_attr($eferz_seo['title']); ?>" />
    <meta property="og:description" content="<?php echo esc_attr($eferz_seo['desc']); ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo esc_url($eferz_seo['canonical']); ?>" />
    <meta property="og:site_name" content="EFerz Digital Agency" />
    <meta property="og:locale" content="<?php echo $eferz_seo['is_ar'] ? 'ar_SA' : 'en_US'; ?>" />
    <meta property="og:locale:alternate" content="<?php echo $eferz_seo['is_ar'] ? 'en_US' : 'ar_SA'; ?>" />
    <meta property="og:image" content="https://eferz.com/wp-content/uploads/2026/08/Logo-scaled.png" />
    <meta property="og:image:alt" content="EFerz Digital Agency Logo" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@eferzofficial" />
    <meta name="twitter:title" content="<?php echo esc_attr($eferz_seo['title']); ?>" />
    <meta name="twitter:description" content="<?php echo esc_attr($eferz_seo['desc']); ?>" />
    <meta name="twitter:image" content="https://eferz.com/wp-content/uploads/2026/08/Logo-scaled.png" />
    <meta name="twitter:image:alt" content="EFerz Digital Agency Logo" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["Organization", "ProfessionalService"],
            "@id": "https://eferz.com/#organization",
            "name": "EFerz Digital Agency",
            "url": "https://eferz.com/",
            "logo": "https://eferz.com/wp-content/uploads/2026/08/Logo-scaled.png",
            "foundingDate": "2020-10-10",
            "email": "info@eferz.com",
            "telephone": "+1-786-224-4112",
            "areaServed": "Worldwide",
            "knowsAbout": ["Artificial Intelligence", "Autonomous AI Agents", "3D WebGL", "Three.js", "Full-Stack Web Development", "Shopify Plus", "Amazon FBA", "Technical SEO", "Cybersecurity", "Cloud Architecture"],
            "sameAs": ["https://www.facebook.com/EFerzOfficial", "https://www.instagram.com/EFerzOfficial", "https://www.linkedin.com/company/EFerz/", "https://www.youtube.com/@EFerzOfficial"]
          },
          {
            "@type": "WebSite",
            "@id": "https://eferz.com/#website",
            "url": "https://eferz.com/",
            "name": "EFerz Digital Agency",
            "publisher": { "@id": "https://eferz.com/#organization" }
          }
        ]
      }
    </script>
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
      html, body {
        display: block;
        margin: 0;
        padding: 0;
        background-color: #121212;
        color: #fffdff;
      }
      #root {
        display: block;
        min-height: 100vh;
        position: relative;
        z-index: 1;
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

      // Dynamically locate latest built JS bundle
      $js_glob = glob($theme_assets_dir . '/index-*.js');
      if (!empty($js_glob)) {
        usort($js_glob, function($a, $b) { return filemtime($b) - filemtime($a); });
        $latest_js = basename($js_glob[0]);
        $js_url = $theme_assets_uri . '/' . $latest_js . '?v=' . filemtime($js_glob[0]);
      } else {
        $js_url = $theme_assets_uri . '/index-B_-PlTxi.js';
      }
    ?>

    <!-- React App Production CSS (Auto-synced with latest build) -->
    <link rel="stylesheet" crossorigin href="<?php echo esc_url($css_url); ?>">

    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#121212] text-[#fffdff] selection:bg-[#ec3935] selection:text-white antialiased overflow-x-hidden'); ?>>
    <?php wp_body_open(); ?>
    <div id="root"></div>

    <!-- React App Production Bundle (Auto-synced with latest build) -->
    <script type="module" crossorigin src="<?php echo esc_url($js_url); ?>"></script>

    <?php wp_footer(); ?>
</body>
</html>
