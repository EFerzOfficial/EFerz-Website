<?php
/**
 * EFerz Digital Agency - Flagship WebGL & AI Experience
 * Exact 100% React Application from AI Studio Build
 *
 * @package EFerz
 * @version 1.6.5
 */
$eferz_seo = function_exists('eferz_get_route_seo') ? eferz_get_route_seo() : array('route' => 'agency', 'title' => 'EFerz Digital Agency | AI, 3D WebGL, SEO & Software', 'desc' => 'Global AI automation, 3D WebGL websites, Shopify Plus, Amazon FBA, technical SEO & cloud cybersecurity by EFerz (USA, KSA, PAK). Start your project.', 'base_url' => 'https://eferz.com/', 'canonical' => 'https://eferz.com/', 'is_ar' => false);
$eferz_og_image = get_template_directory_uri() . '/assets/og-eferz-v2.jpg';
$eferz_favicon  = get_template_directory_uri() . '/assets/eferz-logo.png';
$eferz_route    = $eferz_seo['route'] ?? 'agency';
$eferz_is_ar    = !empty($eferz_seo['is_ar']);
$eferz_base_url = $eferz_seo['base_url'] ?? 'https://eferz.com/';
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
    <link rel="alternate" hreflang="en" href="<?php echo esc_url($eferz_base_url); ?>" />
    <link rel="alternate" hreflang="ar" href="<?php echo esc_url($eferz_base_url . '?lang=ar'); ?>" />
    <link rel="alternate" hreflang="x-default" href="<?php echo esc_url($eferz_base_url); ?>" />
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

    <!-- React App Production CSS (Auto-synced with latest build; synchronous to prevent pre-mount flash) -->
    <link rel="stylesheet" crossorigin href="<?php echo esc_url($css_url); ?>" />

    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#141414] text-[#fffdff] selection:bg-[#ec3935] selection:text-white antialiased overflow-x-hidden'); ?>>
    <?php wp_body_open(); ?>
    <?php if ($eferz_route === 'agency') : ?>
    <div id="eferz-cinematic-loader" aria-hidden="true">
      <style>
        #eferz-cinematic-loader{position:fixed;inset:0;z-index:9999;overflow:hidden;color:#fffdff;pointer-events:auto;user-select:none;background-color:#141414;background-image:radial-gradient(circle at 25% 25%,rgba(236,57,53,.11) 0%,transparent 48%),radial-gradient(circle at 75% 35%,rgba(86,134,160,.12) 0%,transparent 52%),radial-gradient(circle at 50% 75%,rgba(140,25,55,.10) 0%,transparent 50%),radial-gradient(circle at 85% 70%,rgba(219,176,87,.08) 0%,transparent 46%)}
        #eferz-cinematic-loader.is-opening{pointer-events:none;background:transparent}
        .ef-ldr-curtain-top,.ef-ldr-curtain-bot{position:fixed;left:0;right:0;height:50.2%;background:#141414;will-change:transform;transition:transform .52s cubic-bezier(.77,0,.175,1)}
        .ef-ldr-curtain-top{top:0;border-bottom:1px solid rgba(255,255,255,.06);transform:translate3d(0,0,0)}
        .ef-ldr-curtain-bot{bottom:0;border-top:1px solid rgba(255,255,255,.06);transform:translate3d(0,0,0)}
        #eferz-cinematic-loader.is-opening .ef-ldr-curtain-top{transform:translate3d(0,-104%,0);border-bottom-color:rgba(236,57,53,.72);box-shadow:0 12px 45px rgba(236,57,53,.24)}
        #eferz-cinematic-loader.is-opening .ef-ldr-curtain-bot{transform:translate3d(0,104%,0);border-top-color:rgba(236,57,53,.72);box-shadow:0 -12px 45px rgba(236,57,53,.24)}
        .ef-ldr-seam{position:fixed;left:50%;top:50%;width:0;height:2px;transform:translate(-50%,-50%);background:linear-gradient(90deg,transparent,#ec3935,#fffdff,#ec3935,transparent);box-shadow:0 0 24px rgba(236,57,53,.95);opacity:0;z-index:4;pointer-events:none;transition:width .38s cubic-bezier(.16,1,.3,1),opacity .45s ease}
        #eferz-cinematic-loader.is-seam .ef-ldr-seam{width:92vw;opacity:1}
        #eferz-cinematic-loader.is-opening .ef-ldr-seam{width:100vw;opacity:0}
        #ef-ldr-cvs{position:fixed;inset:0;width:100%;height:100%;display:block;z-index:2;pointer-events:none;transition:opacity .48s cubic-bezier(.16,1,.3,1),transform .68s cubic-bezier(.16,1,.3,1)}
        #eferz-cinematic-loader.is-opening #ef-ldr-cvs{opacity:0;transform:scale(1.06)}
        .ef-ldr-center{position:fixed;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;pointer-events:none;transition:opacity .42s cubic-bezier(.16,1,.3,1),transform .64s cubic-bezier(.16,1,.3,1)}
        #eferz-cinematic-loader.is-opening .ef-ldr-center{opacity:0;transform:scale(1.1)}
        .ef-ldr-rings{position:relative;width:168px;height:168px;display:flex;align-items:center;justify-content:center}
        .ef-ldr-ring-a,.ef-ldr-ring-b{position:absolute;inset:0;border-radius:50%;pointer-events:none}
        .ef-ldr-ring-a{border:1px solid rgba(255,255,255,.1);border-top-color:rgba(255,253,255,.68);border-right-color:rgba(236,57,53,.48);animation:efSpinCW 5.2s linear infinite}
        .ef-ldr-ring-b{inset:15px;border:1px dashed rgba(236,57,53,.32);border-bottom-color:#ec3935;animation:efSpinCCW 3.6s linear infinite}
        .ef-ldr-emblem{position:relative;width:82px;height:82px;display:flex;align-items:center;justify-content:center;animation:efPulseIcon 2.4s ease-in-out infinite}
        .ef-ldr-emblem img{width:82px;height:82px;object-fit:contain;display:block;filter:drop-shadow(0 0 22px rgba(236,57,53,.42)) drop-shadow(0 6px 18px rgba(0,0,0,.75))}
        .ef-ldr-brand{margin-top:22px;display:flex;flex-direction:column;align-items:center;gap:8px;max-width:480px}
        .ef-ldr-word{font-family:"Outfit","Montserrat",system-ui,sans-serif;font-weight:900;font-size:22px;letter-spacing:.44em;text-indent:.44em;color:#fffdff;margin:0;line-height:1}
        .ef-ldr-word b{color:#ec3935;font-weight:900}
        .ef-ldr-tag{font-family:"JetBrains Mono","Plus Jakarta Sans",monospace;font-size:11px;font-weight:600;letter-spacing:.2em;color:rgba(255,253,255,.72);margin:0;line-height:1.45}
        .ef-ldr-corner{position:fixed;right:clamp(22px,4.8vw,56px);bottom:clamp(22px,4.5vw,46px);z-index:3;display:flex;flex-direction:column;align-items:flex-end;gap:10px;pointer-events:none;transition:opacity .38s ease,transform .58s cubic-bezier(.16,1,.3,1)}
        #eferz-cinematic-loader.is-opening .ef-ldr-corner{opacity:0;transform:translate3d(0,22px,0)}
        .ef-ldr-num-row{display:flex;align-items:baseline;gap:4px;line-height:.86}
        .ef-ldr-pct{font-family:"Outfit","Montserrat",system-ui,sans-serif;font-weight:900;font-size:clamp(54px,8.8vw,118px);letter-spacing:-.04em;font-variant-numeric:tabular-nums;color:#fffdff;text-shadow:0 0 36px rgba(236,57,53,.24)}
        .ef-ldr-sym{font-family:"JetBrains Mono",monospace;font-weight:700;font-size:clamp(18px,2.4vw,30px);color:#ec3935;letter-spacing:.04em}
        .ef-ldr-rail{width:clamp(132px,20vw,220px);height:2px;border-radius:999px;background:rgba(255,255,255,.1);overflow:hidden;position:relative}
        .ef-ldr-fill{height:100%;width:6%;border-radius:999px;background:linear-gradient(90deg,#d02128,#ec3935,#fffdff);box-shadow:0 0 14px rgba(236,57,53,.95);transition:width .16s ease-out}
        .ef-ldr-sub{font-family:"JetBrains Mono",monospace;font-size:10px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,253,255,.48)}
        @media(max-width:640px){.ef-ldr-rings{width:138px;height:138px}.ef-ldr-ring-b{inset:12px}.ef-ldr-emblem,.ef-ldr-emblem img{width:66px;height:66px}.ef-ldr-word{font-size:18px;letter-spacing:.38em}.ef-ldr-tag{font-size:10px;letter-spacing:.14em}}
        @keyframes efSpinCW{to{transform:rotate(360deg)}}
        @keyframes efSpinCCW{to{transform:rotate(-360deg)}}
        @keyframes efPulseIcon{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}
      </style>
      <div class="ef-ldr-curtain-top"></div>
      <div class="ef-ldr-curtain-bot"></div>
      <div class="ef-ldr-seam"></div>
      <canvas id="ef-ldr-cvs"></canvas>
      <div class="ef-ldr-center">
        <div class="ef-ldr-rings">
          <div class="ef-ldr-ring-a"></div>
          <div class="ef-ldr-ring-b"></div>
          <div class="ef-ldr-emblem">
            <img src="<?php echo esc_url($theme_assets_uri . '/eferz-nav-logo.webp'); ?>" alt="EFerz" width="82" height="82" fetchpriority="high" decoding="sync" class="skip-lazy no-lazy" data-no-lazy="1" />
          </div>
        </div>
        <div class="ef-ldr-brand">
          <p class="ef-ldr-word"><b>EF</b>ERZ</p>
          <p class="ef-ldr-tag"><?php echo $eferz_is_ar ? 'لا شيء مستحيل في عالم التقنية.' : 'Nothing is impossible in the IT world.'; ?></p>
        </div>
      </div>
      <div class="ef-ldr-corner" dir="ltr">
        <div class="ef-ldr-sub"><?php echo $eferz_is_ar ? 'جاري التحميل' : 'INITIALIZING'; ?></div>
        <div class="ef-ldr-num-row">
          <span class="ef-ldr-pct" id="ef-ldr-pct">06</span><span class="ef-ldr-sym">%</span>
        </div>
        <div class="ef-ldr-rail"><div class="ef-ldr-fill" id="ef-ldr-fill"></div></div>
      </div>
      <script>
        (function(){
          var ldr = document.getElementById('eferz-cinematic-loader');
          var fill = document.getElementById('ef-ldr-fill');
          var pct = document.getElementById('ef-ldr-pct');
          var cvs = document.getElementById('ef-ldr-cvs');
          if (!ldr) return;
          if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            if (ldr.parentNode) ldr.parentNode.removeChild(ldr);
            return;
          }

          var tStart = performance.now();
          var progress = 6;
          var readyToOpen = false;
          var opening = false;
          var rafId = 0;

          var ctx = cvs && cvs.getContext ? cvs.getContext('2d') : null;
          var w = window.innerWidth, h = window.innerHeight, dpr = w < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
          var ringsEl = ldr.querySelector('.ef-ldr-rings');
          var cx = w * 0.5, cy = h * 0.5 - (w < 640 ? 28 : 30);

          // Exact live EFerz website galaxy palette
          var palette = [
            'rgba(255, 255, 255,',
            'rgba(219, 176, 87,',
            'rgba(138, 203, 193,',
            'rgba(236, 57, 53,',
            'rgba(205, 235, 255,'
          ];
          var bgStars = [];
          var orbitStars = [];

          function syncCenter() {
            if (ringsEl) {
              var rc = ringsEl.getBoundingClientRect();
              if (rc.width > 0) {
                cx = rc.left + rc.width * 0.5;
                cy = rc.top + rc.height * 0.5;
                return;
              }
            }
            cx = w * 0.5;
            cy = h * 0.5 - (w < 640 ? 28 : 30);
          }

          function buildScene() {
            bgStars = [];
            orbitStars = [];
            var mob = w < 768;

            var bgCount = mob ? 85 : 180;
            for (var i = 0; i < bgCount; i++) {
              var hi = (i % 7 === 0);
              bgStars.push({
                x: (Math.random() - 0.5) * 3200,
                y: (Math.random() - 0.5) * 2400,
                z: Math.random() * 1800 + 40,
                size: hi ? (Math.random() * 2.1 + 1.65) : (Math.random() * 1.35 + 0.8),
                baseAlpha: hi ? (Math.random() * 0.28 + 0.62) : (Math.random() * 0.38 + 0.32),
                twinkleSpeed: Math.random() * 0.03 + 0.012,
                twinklePhase: Math.random() * Math.PI * 2,
                color: palette[Math.floor(Math.random() * palette.length)]
              });
            }

            var orbCount = mob ? 34 : 62;
            var minR = mob ? 76 : 96;
            var maxR = Math.max(w, h) * 0.44;
            for (var j = 0; j < orbCount; j++) {
              var tier = j / orbCount;
              var radius = minR + Math.pow(tier, 0.86) * (maxR - minR);
              var dir = (j % 4 === 0) ? -1 : 1;
              var hiO = (j % 5 === 0);
              orbitStars.push({
                ang: Math.random() * Math.PI * 2,
                r: radius,
                spd: dir * (0.0045 + Math.random() * 0.0055) / (0.68 + tier * 1.25),
                size: hiO ? (1.85 + Math.random() * 1.4) : (0.9 + Math.random() * 1.15),
                baseAlpha: hiO ? 0.88 : (0.45 + Math.random() * 0.32),
                twinkleSpeed: Math.random() * 0.032 + 0.015,
                twinklePhase: Math.random() * Math.PI * 2,
                color: (j < 20 && j % 2 === 0) ? palette[3] : palette[Math.floor(Math.random() * palette.length)]
              });
            }
          }

          if (ctx) {
            var resize = function() {
              w = window.innerWidth; h = window.innerHeight;
              dpr = w < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
              cvs.width = w * dpr; cvs.height = h * dpr;
              ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
              syncCenter();
            };
            resize();
            buildScene();
            window.addEventListener('resize', function() { resize(); buildScene(); }, { passive: true });
          }

          function tick() {
            if (!readyToOpen) {
              progress += (94 - progress) * 0.065;
              var p = Math.min(94, Math.round(progress));
              if (fill) fill.style.width = p + '%';
              if (pct) pct.textContent = (p < 10 ? '0' : '') + p;
            }
            if (ctx) {
              ctx.clearRect(0, 0, w, h);

              var focal = 520, halfW = w * 0.5, halfH = h * 0.5;
              var zStep = opening ? 1.4 : 0.35;
              for (var i = 0; i < bgStars.length; i++) {
                var s = bgStars[i];
                s.twinklePhase += s.twinkleSpeed;
                s.z -= zStep;
                if (s.z < 20) s.z += 1800;
                var persp = focal / (focal + s.z + 200);
                var sx = halfW + s.x * persp;
                var sy = halfH + s.y * persp;
                if (sx >= -20 && sx <= w + 20 && sy >= -20 && sy <= h + 20) {
                  var tw = s.baseAlpha * (0.68 + 0.32 * Math.sin(s.twinklePhase));
                  var al = Math.max(0.16, Math.min(0.95, tw * (persp * 1.18)));
                  var rad = Math.max(0.85, s.size * persp * 1.38);
                  ctx.fillStyle = s.color + al.toFixed(3) + ')';
                  ctx.beginPath();
                  ctx.arc(sx, sy, rad, 0, Math.PI * 2);
                  ctx.fill();
                }
              }

              var boost = opening ? 2.8 : 1;
              for (var j = 0; j < orbitStars.length; j++) {
                var o = orbitStars[j];
                o.ang += o.spd * boost;
                o.twinklePhase += o.twinkleSpeed;
                var rr = opening ? o.r * 1.07 : o.r;
                var ox = cx + Math.cos(o.ang) * rr;
                var oy = cy + Math.sin(o.ang) * rr;
                var alO = Math.max(0.22, Math.min(0.96, o.baseAlpha * (0.68 + 0.32 * Math.sin(o.twinklePhase))));
                ctx.fillStyle = o.color + alO.toFixed(3) + ')';
                ctx.beginPath();
                ctx.arc(ox, oy, o.size, 0, Math.PI * 2);
                ctx.fill();
              }
            }
            if (ldr && ldr.parentNode) {
              rafId = requestAnimationFrame(tick);
            }
          }
          rafId = requestAnimationFrame(tick);

          function dismiss() {
            if (readyToOpen) return;
            readyToOpen = true;
            if (fill) fill.style.width = '100%';
            if (pct) pct.textContent = '100';
            ldr.classList.add('is-seam');
            setTimeout(function() {
              if (!ldr) return;
              opening = true;
              ldr.classList.add('is-opening');
              setTimeout(function() {
                if (rafId) cancelAnimationFrame(rafId);
                if (ldr && ldr.parentNode) ldr.parentNode.removeChild(ldr);
              }, 540);
            }, 110);
          }

          window.__eferzHideLoader = function() {
            var elapsed = performance.now() - tStart;
            var wait = Math.max(0, 420 - elapsed);
            setTimeout(dismiss, wait);
          };
          setTimeout(dismiss, 2200);
        })();
      </script>
    </div>
    <?php endif; ?>
    <div id="root"><?php if ($eferz_route === 'agency') : ?><style>.eferz-ssr-hero{position:fixed;inset:0;width:100%;height:100vh;display:flex;align-items:flex-end;background:#141414;background-image:radial-gradient(circle at 71% 50%,rgba(208,33,40,.18) 0%,rgba(208,33,40,.05) 28%,rgba(20,20,20,0) 60%);z-index:1;pointer-events:none;box-sizing:border-box;overflow:hidden}.eferz-ssr-hdr{position:fixed;top:0;left:0;right:0;padding:16px;display:flex;align-items:center;justify-content:space-between;z-index:5;pointer-events:none;box-sizing:border-box}.eferz-ssr-hdr img{width:44px;height:44px;object-fit:contain;display:block}.eferz-ssr-burger{width:44px;height:44px;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:7px}.eferz-ssr-burger span:first-child{display:block;width:36px;height:2.5px;border-radius:999px;background:#fff}.eferz-ssr-burger span:last-child{display:block;width:24px;height:2.5px;border-radius:999px;background:#d02128;box-shadow:0 0 12px rgba(208,33,40,.75)}.eferz-ssr-pad{width:100%;max-width:1500px;margin:0 auto;padding:96px 56px 96px 16px;box-sizing:border-box}.eferz-ssr-h1{margin:16px 0 16px;font-family:"Sifonn","Sifonn-Basic","Outfit","Montserrat","Syne",system-ui,sans-serif;font-weight:900;font-size:1.5rem;line-height:1.06;letter-spacing:-.025em;color:#fffdff}.eferz-ssr-cur{display:inline-block;width:16px;height:28px;background:#d02128;margin-left:10px;vertical-align:middle;box-shadow:0 0 20px rgba(208,33,40,.85)}.eferz-ssr-term{display:inline-flex;align-items:center;gap:12px;padding:8px 14px;border-radius:10px;background:rgba(7,9,15,.72);border:1px solid rgba(255,255,255,.14);font-family:"JetBrains Mono",monospace;font-size:11px;color:rgba(255,253,255,.92);margin-bottom:14px}.eferz-ssr-ftr{position:fixed;bottom:0;left:0;right:0;z-index:5;pointer-events:none}.eferz-ssr-ftr-in{width:100%;max-width:1560px;margin:0 auto;padding:8px 56px 10px 16px;font-family:"JetBrains Mono",monospace;font-size:10px;color:rgba(255,253,255,.65);box-sizing:border-box}@media(min-width:640px){.eferz-ssr-hdr{padding:24px 40px}.eferz-ssr-hdr img{width:48px;height:48px}.eferz-ssr-pad{padding:96px 40px 80px}.eferz-ssr-h1{margin:28px 0 28px;font-size:3rem;line-height:.98}.eferz-ssr-cur{width:28px;height:48px;margin-left:14px}.eferz-ssr-term{padding:10px 16px;font-size:14px;margin-bottom:16px}.eferz-ssr-ftr-in{padding:8px 80px 14px 48px;font-size:12px}}@media(min-width:768px){.eferz-ssr-pad{padding:96px 48px 64px}.eferz-ssr-h1{font-size:3.75rem}}@media(min-width:1024px){.eferz-ssr-hdr{padding:24px 48px}.eferz-ssr-hdr img{width:56px;height:56px}.eferz-ssr-pad{padding:96px 80px 64px}.eferz-ssr-h1{font-size:78px}.eferz-ssr-ftr-in{padding:8px 80px 14px 64px}}</style><header class="eferz-ssr-hdr"><a href="https://eferz.com/" aria-label="EFerz Home"><img src="<?php echo esc_url($theme_assets_uri . '/eferz-nav-logo.webp'); ?>" alt="EFerz" width="56" height="56" fetchpriority="high" decoding="sync" class="skip-lazy no-lazy" data-no-lazy="1" /></a><nav class="sr-only" aria-label="Primary Navigation"><a href="https://eferz.com/services/">Services</a><a href="https://eferz.com/work/">Work</a><a href="https://eferz.com/clients/">Clients</a><a href="https://eferz.com/team/">Team</a><a href="https://eferz.com/about/">About</a><a href="https://eferz.com/blog/">Blog</a><a href="https://eferz.com/contact/">Contact</a></nav><div class="eferz-ssr-burger" aria-hidden="true"><span></span><span></span></div></header><section class="eferz-ssr-hero" aria-label="EFerz Hero"><div class="eferz-ssr-pad"><div style="max-width:56rem"><div style="display:inline-flex;align-items:center;gap:10px;padding-top:8px"><span style="width:14px;height:2px;background:#d02128;display:inline-block"></span><p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,253,255,.9)"><span style="color:#d02128">EF</span><span>ERZ DIGITAL AGENCY</span></p></div><h1 class="eferz-ssr-h1"><?php if ($eferz_is_ar) : ?><span style="display:block">لا شيء </span><span style="display:block"><span style="-webkit-text-stroke:1.5px rgba(255,253,255,.45);-webkit-text-fill-color:transparent;color:transparent">مستحيل </span>في </span><span style="display:flex;align-items:center;flex-wrap:wrap"><span>عالم التقنية</span><span class="eferz-ssr-cur"></span></span><?php else : ?><span style="display:block">Nothing is </span><span style="display:block"><span style="-webkit-text-stroke:1.5px rgba(255,253,255,.45);-webkit-text-fill-color:transparent;color:transparent">impossible </span>in </span><span style="display:flex;align-items:center;flex-wrap:wrap"><span>the IT world</span><span class="eferz-ssr-cur"></span></span><?php endif; ?></h1><div class="eferz-ssr-term"><span style="color:#d02128;font-weight:700">$</span><span>compiling brand-id</span></div><p style="margin:0;font-size:13px;font-weight:700;letter-spacing:.05em;color:rgba(255,253,255,.85)"><a href="https://eferz.com/services/" style="color:#fffdff;text-decoration:none"><?php echo $eferz_is_ar ? 'مرّر للاستكشاف' : 'Scroll to explore'; ?> <span style="color:#d02128">&rarr;</span></a></p></div></div></section><footer class="eferz-ssr-ftr"><div class="eferz-ssr-ftr-in"><span>&copy; <?php echo esc_html(date('Y')); ?> EFerz. All Rights Reserved.</span><nav class="sr-only" aria-label="Footer Navigation"><a href="https://eferz.com/lets-build/">3D Studio</a><a href="https://eferz.com/privacy/">Privacy</a><a href="https://eferz.com/terms/">Terms</a><a href="https://eferz.com/refund/">Refund Policy</a><a href="https://eferz.com/shop/">Shop</a></nav></div></footer><?php else : ?>
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
              <p>Featured production launches across our 13+ documented case studies include FitwearStores, HiDoose, Khuzair, Storeara, Sustagro, Airtilize, Al-Sheikh Curtain &amp; Interiors, CharmThings, InstaShop, Minimog, ReflectiveThings, TrendifyToday, and Your Kitchen Is Cooking across web platforms, Shopify stores, branding, and growth systems.</p>
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
                <li><strong>Khubaib Khan</strong> — Founder &amp; President</li>
                <li><strong>Salman Shahid</strong> — Co-Founder &amp; Director of Finance &amp; Legal Affairs</li>
                <li><strong>Irfan Mirza</strong> — Director of Business Development</li>
                <li><strong>Syed Ahmed</strong> — Business Development Manager</li>
                <li><strong>Asad Malik</strong> — Website Designer &amp; Developer</li>
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
              <p>Authored by <strong>Khubaib Khan</strong> and EFerz principal engineering architects — practical guides covering Core Web Vitals, custom LLM &amp; RAG agents, 3D WebGL performance, Amazon FBA, and Zero-Trust security.</p>
              <ul>
                <li><a href="https://eferz.com/blog/#web-design-seo-architecture">3D WebGL &amp; Technical SEO Architecture for Enterprise Growth</a> — Khubaib Khan</li>
                <li><a href="https://eferz.com/blog/#custom-ai-support-agents">Training Custom AI Support Agents on Your Enterprise Knowledge Base</a> — Khubaib Khan</li>
                <li><a href="https://eferz.com/blog/#amazon-fba-ipi-mastery">Mastering Amazon FBA IPI Scores &amp; Buy Box Dominance</a> — Khubaib Khan</li>
                <li><a href="https://eferz.com/blog/#zero-trust-cybersecurity-ecommerce">Zero-Trust Cloud &amp; E-Commerce Cybersecurity Hardening</a> — Khubaib Khan</li>
              </ul>
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
              <p>Customize 4 live interactive 3D WebGL brand demos across 14 industry packs with your brand logo, metallic colors, finishes, and typography inside the EFerz Interactive 3D Studio.</p>
              <p><a href="https://eferz.com/contact/">Book a Custom 3D Build &rarr;</a></p>
            </section>
          <?php elseif ($eferz_route === 'privacy') : ?>
            <section class="eferz-ssr-card">
              <p><strong>Last updated:</strong> July 10, 2025</p>
              <h2>01. Personal &amp; Project Information We Collect</h2>
              <p>We collect contact and project inquiry details voluntarily submitted by prospective clients (name, email, phone number, company name, service scope, and technical requirements) strictly to deliver consultations, proposals, and contracted services.</p>
              <h2>02. SMS &amp; WhatsApp Messaging Privacy (TCPA &amp; A2P 10DLC)</h2>
              <p><strong>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</strong> All other categories exclude text messaging originator opt-in data and consent; mobile numbers and SMS/WhatsApp consent records will never be sold, rented, or disclosed to third parties. Consenting to SMS or WhatsApp updates is strictly optional and is never required to submit a contact form or request services. Reply STOP at any time to opt out.</p>
              <h2>03. GDPR Privacy Rights (EEA &amp; UK Residents)</h2>
              <p>Under the General Data Protection Regulation (GDPR), individuals in the European Economic Area and United Kingdom have the right to access personal data we hold, request rectification or erasure ("right to be forgotten"), restrict or object to processing, and request data portability. Legal bases include contract performance, legitimate business interest, and explicit consent.</p>
              <h2>04. CCPA / CPRA Privacy Rights (California Residents)</h2>
              <p>Under the California Consumer Privacy Act (CCPA/CPRA), California residents have the right to know what personal information is collected, request deletion or correction of personal data, and opt out of the sale or sharing of personal information. <strong>EFerz does not sell personal information.</strong> We do not discriminate against users exercising privacy rights.</p>
              <h2>05. Security, Retention &amp; Official Privacy Contact</h2>
              <p>EFerz safeguards client data with TLS 1.3 encryption and Zero-Trust access controls. To exercise GDPR, CCPA, or SMS privacy rights, contact <a href="mailto:info@eferz.com">info@eferz.com</a> or call +1 (786) 224-4112 (USA) / +966 (539) 046410 (KSA) / +92 345 3397459 (PAK).</p>
            </section>
          <?php elseif ($eferz_route === 'terms') : ?>
            <section class="eferz-ssr-card">
              <p><strong>Last updated:</strong> July 10, 2025</p>
              <h2>01. Enterprise SLA, Scope &amp; Client IP Ownership</h2>
              <p>Upon completed milestone payments, clients retain 100% ownership of custom deliverables, source codebases, brand assets, and intellectual property produced for their engagement.</p>
              <h2>02. Governing Law, Jurisdiction &amp; Legal Contact</h2>
              <p>These Terms of Service and any disputes arising out of EFerz engagements shall be governed by and construed in accordance with the laws of the <strong>State of Florida, United States</strong>, without regard to conflict-of-law principles, with exclusive venue in the state or federal courts located in Broward County (Fort Lauderdale), Florida. Legal notices may be directed to <a href="mailto:info@eferz.com">info@eferz.com</a>, +1 (786) 224-4112 (USA), or +966 (539) 046410 (Saudi Arabia).</p>
            </section>
          <?php elseif ($eferz_route === 'refund') : ?>
            <section class="eferz-ssr-card">
              <p><strong>Last updated:</strong> July 10, 2025</p>
              <h2>01. 30-Day Money-Back Guarantee &amp; Processing</h2>
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
        <p style="font-size:1.5rem;font-weight:900;margin:0 0 12px;"><?php echo esc_html($eferz_seo['title']); ?></p>
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
