<?php
/**
 * EFerz Digital Studio - Theme Functions and Definitions
 *
 * @package EFerz
 * @version 1.5.4
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * GitHub Automatic Theme Update Support Header
 * Used by 'GitHub Theme Updater' & 'WP Pusher'
 */
define('EFERZ_THEME_VERSION', '1.5.4');

/**
 * 1. HTTP Security & Trust Headers (Compatible with Wordfence, WooPayments Stripe/Apple Pay & Security Scanners)
 */
function eferz_send_security_headers() {
    if (!headers_sent()) {
        @header_remove('X-Powered-By');
        @header_remove('Referrer-Policy');
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin', true);
        header("Content-Security-Policy: default-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:; style-src 'self' 'unsafe-inline' https:; img-src 'self' https: data: blob:; font-src 'self' https: data:; connect-src 'self' https: wss:; frame-src 'self' https://js.stripe.com https://checkout.stripe.com https://hooks.stripe.com https://www.youtube.com https://www.google.com https://pay.google.com https:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self' https://checkout.stripe.com https://js.stripe.com https://hooks.stripe.com; upgrade-insecure-requests;");
        header('Permissions-Policy: camera=(self), microphone=(self), geolocation=(), payment=(self "https://js.stripe.com" "https://checkout.stripe.com" "https://pay.google.com")');
        header('Link: <https://eferz.com/.well-known/ard.json>; rel="ard"', false);
        if (is_ssl()) {
            header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
        }
    }
}
add_action('send_headers', 'eferz_send_security_headers', 999);

/**
 * Enable Nginx / W3TC proxy caching on anonymous SPA routes by stripping tracking Set-Cookie (_fbp)
 * and stripping duplicate Referrer-Policy headers before HTTP response flush.
 */
function eferz_optimize_final_response_headers() {
    if (headers_sent()) {
        return;
    }

    @header_remove('Referrer-Policy');
    header('Referrer-Policy: strict-origin-when-cross-origin', true);

    if (function_exists('eferz_is_spa_request') && eferz_is_spa_request() && !is_user_logged_in()) {
        $cookies = array();
        foreach (headers_list() as $hdr) {
            if (stripos($hdr, 'Set-Cookie:') === 0) {
                $val = trim(substr($hdr, 11));
                if (stripos($val, '_fbp=') !== 0 && stripos($val, '_fbc=') !== 0) {
                    $cookies[] = $val;
                }
            }
        }
        @header_remove('Set-Cookie');
        foreach ($cookies as $cookie_val) {
            header('Set-Cookie: ' . $cookie_val, false);
        }
        header('Cache-Control: public, max-age=300, s-maxage=3600, stale-while-revalidate=86400', true);
        @header_remove('Pragma');
    }
}

add_action('template_redirect', function() {
    if (function_exists('header_register_callback')) {
        header_register_callback('eferz_optimize_final_response_headers');
    }
}, 1);

add_filter('wp_headers', function($headers) {
    if (is_array($headers) && function_exists('eferz_is_spa_request') && eferz_is_spa_request() && !is_user_logged_in()) {
        $headers['Cache-Control'] = 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400';
        unset($headers['Pragma'], $headers['Expires']);
    }
    return $headers;
}, 9999);

// Disable XML-RPC pingbacks & obscure WP version / unnecessary discovery headers for security scanners
add_filter('xmlrpc_enabled', '__return_false');
add_filter('the_generator', '__return_empty_string');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('template_redirect', 'wp_shortlink_header', 11);
remove_action('template_redirect', 'rest_output_link_header', 11);
remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);

/**
 * Determine if the current request belongs to the React 3D SPA (and NOT WooCommerce, Elementor, WordPress posts/pages, or AJAX/API).
 */
function eferz_is_spa_request() {
    if (is_admin() || wp_doing_ajax() || wp_doing_cron() || (defined('REST_REQUEST') && REST_REQUEST)) {
        return false;
    }
    if (is_feed() || is_robots() || is_trackback() || is_embed() || is_customize_preview()) {
        return false;
    }
    // Never override Elementor editor, previews, or WooCommerce AJAX/add-to-cart endpoints
    if (isset($_GET['elementor-preview']) || isset($_GET['preview']) || isset($_GET['preview_id']) || isset($_GET['wc-ajax']) || isset($_GET['add-to-cart']) || isset($_GET['remove_item']) || isset($_GET['wordfence_lh'])) {
        return false;
    }
    if (is_singular('elementor_library')) {
        return false;
    }

    // Never override active WooCommerce catalog, products, cart, checkout, or My Account endpoints
    if (function_exists('is_woocommerce') && (is_woocommerce() || is_cart() || is_checkout() || is_account_page() || is_wc_endpoint_url())) {
        return false;
    }

    $req_path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');
    $first_seg = strtolower(explode('/', $req_path)[0] ?? '');

    $wc_or_wp_reserved = array('platform', 'shop', 'cart', 'checkout', 'my-account', 'product', 'product-category', 'product-tag', 'order-pay', 'order-received', 'wp-json', 'wc-api', 'wp-login.php', 'wp-admin', 'wp-content', 'wp-includes', 'feed');
    if (in_array($first_seg, $wc_or_wp_reserved, true)) {
        return false;
    }

    $spa_routes = array('services', 'work', 'portfolio', 'clients', 'team', 'contact', 'blog', 'about', 'privacy', 'terms', 'refund', 'lets-build');

    if (is_front_page() || in_array($first_seg, $spa_routes, true) || get_query_var('eferz_spa_route')) {
        return true;
    }

    // Allow regular WordPress posts, custom post types (The7 Projects/Testimonials/Team), inner Pages, archives, and search to render normally
    if (is_singular() || is_archive() || is_search() || is_author() || is_home()) {
        return false;
    }

    return false;
}

/**
 * Route-aware SEO configuration (synced with React T3 & m6) so crawlers receive
 * unique, high-CTR titles, descriptions, canonicals & keywords before hydration.
 */
function eferz_get_route_seo() {
    $req_path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');
    $first_seg = strtolower(explode('/', $req_path)[0] ?? '');
    $query_route = isset($_GET['eferz_spa_route']) ? strtolower(sanitize_text_field($_GET['eferz_spa_route'])) : '';
    $route = $query_route ?: ($first_seg === 'portfolio' ? 'work' : ($first_seg ?: 'agency'));
    $is_ar = isset($_GET['lang']) && strtolower(sanitize_text_field($_GET['lang'])) === 'ar';

    $routes = array(
        'agency' => array(
            'title' => 'EFerz Digital Agency | AI, 3D WebGL, SEO & Software',
            'titleAr' => 'وكالة إيفرز الرقمية | ذكاء اصطناعي ومواقع 3D وسيو',
            'desc' => 'Global AI automation, 3D WebGL websites, Shopify Plus, Amazon FBA, technical SEO & cloud cybersecurity by EFerz (USA, KSA, PAK). Start your project.',
            'descAr' => 'حلول الذكاء الاصطناعي، مواقع 3D WebGL، متاجر شوبيفاي، أمازون FBA، السيو والأمن السيبراني من إيفرز (أمريكا والسعودية وباكستان). ابدأ مشروعك اليوم.',
            'keywords' => 'EFerz Digital Agency, AI Development Agency, Bespoke AI Agents, 3D WebGL Website Design, Custom Software Engineering, Shopify Plus & Amazon FBA Agency, Technical SEO Agency, Zero Trust Cybersecurity, Riyadh Digital Agency, Fort Lauderdale Web Design Agency',
            'slug' => '',
        ),
        'services' => array(
            'title' => 'Enterprise Web, AI, SEO & Cloud Services | EFerz',
            'titleAr' => 'خدمات الويب والذكاء الاصطناعي والسيو | وكالة إيفرز',
            'desc' => 'Explore EFerz digital services: custom AI agents, 3D WebGL sites, Shopify Plus, Amazon FBA, technical SEO, UI/UX & cloud security. Request a proposal.',
            'descAr' => 'استكشف خدمات إيفرز المتكاملة: وكلاء الذكاء الاصطناعي، مواقع ثلاثية الأبعاد، شوبيفاي بلس، أمازون FBA، السيو والأمن السحابي. اطلب عرض سعر لمشروعك.',
            'keywords' => 'Full Stack Web Development Services, Custom AI Agent Development, Shopify Plus Store Development, Amazon FBA Private Label Management, Technical SEO & PPC Management, Brand Identity & UI UX Design, Zero Trust Cloud Cybersecurity',
            'slug' => 'services',
        ),
        'work' => array(
            'title' => 'Case Studies: 3D Web, AI & E-Commerce Portfolio | EFerz',
            'titleAr' => 'معرض الأعمال: مواقع 3D ومتاجر وذكاء اصطناعي | إيفرز',
            'desc' => 'Explore 17+ EFerz case studies across desktop, tablet & mobile — 3D WebGL apps, Shopify Plus stores, SaaS & AI automation. View live results.',
            'descAr' => 'تصفح أكثر من 17 مشروعاً من إيفرز على الكمبيوتر والتابلت والجوال — تطبيقات ثلاثية الأبعاد، متاجر شوبيفاي ومنصات ذكاء اصطناعي. شاهد النتائج.',
            'keywords' => '',
            'slug' => 'work',
        ),
        'clients' => array(
            'title' => 'Client Reviews & Global Case Studies | EFerz',
            'titleAr' => 'آراء العملاء العالميين وقصص النجاح | وكالة إيفرز',
            'desc' => 'Headquartered in Fort Lauderdale USA with offices in Riyadh & Karachi, EFerz serves enterprise clients across AI, web & growth. Read client testimonials.',
            'descAr' => 'مقرنا الرئيسي في أمريكا مع مكاتب في الرياض وكراتشي لخدمة العملاء في الذكاء الاصطناعي والويب والتسويق الرقمي. اقرأ شهادات العملاء.',
            'keywords' => '',
            'slug' => 'clients',
        ),
        'team' => array(
            'title' => 'Leadership & Principal Software Architects | EFerz',
            'titleAr' => 'فريق القيادة ومهندسو البرمجيات والذكاء | إيفرز',
            'desc' => 'Meet EFerz leadership: Khubaib Khan, Salman Shahid, Irfan Mirza & principal WebGL, AI and cybersecurity architects across USA, KSA & Pakistan.',
            'descAr' => 'تعرف على قيادة وكالة إيفرز: خبيب خان، سلمان شاهد، عرفان مرزا وفريق مهندسي الذكاء الاصطناعي والويب والأمن السيبراني. تواصل مع فريقنا الآن.',
            'keywords' => '',
            'slug' => 'team',
        ),
        'about' => array(
            'title' => 'About EFerz | Global AI & Tech Agency (USA · KSA · PAK)',
            'titleAr' => 'عن إيفرز | شركة تقنية عالمية منذ 2020',
            'desc' => 'Founded in 2020 in Fort Lauderdale USA with Riyadh & Karachi offices, EFerz engineers scalable AI, WebGL & cloud systems. Learn how we build.',
            'descAr' => 'تأسست إيفرز في عام 2020 في أمريكا مع مكاتب في الرياض وكراتشي لبناء أنظمة الذكاء الاصطناعي ومواقع WebGL والحوسبة السحابية. اكتشف قصتنا.',
            'keywords' => '',
            'slug' => 'about',
        ),
        'blog' => array(
            'title' => 'Engineering, AI, SEO & WebGL Blog Playbooks | EFerz',
            'titleAr' => 'مدونة الهندسة والذكاء الاصطناعي والسيو | إيفرز',
            'desc' => 'Read technical guides from EFerz engineers on LLMs, 3D WebGL performance, Core Web Vitals, technical SEO & Shopify conversion optimization. Explore now.',
            'descAr' => 'اقرأ أدلة هندسية من خبراء إيفرز حول الذكاء الاصطناعي، أداء مواقع WebGL، مؤشرات Core Web Vitals وتحسين محركات البحث سيو. تصفح المقالات الآن.',
            'keywords' => '',
            'slug' => 'blog',
        ),
        'contact' => array(
            'title' => 'Contact EFerz | Start Your AI or Web Project Today',
            'titleAr' => 'تواصل مع إيفرز | ابدأ مشروعك الرقمي اليوم',
            'desc' => 'Launch your AI, software, e-commerce or SEO project with EFerz. Connect with our Fort Lauderdale USA, Riyadh KSA & Pakistan teams for a free quote.',
            'descAr' => 'أطلق مشروعك في الذكاء الاصطناعي أو الويب أو المتاجر الإلكترونية مع إيفرز. تواصل مع مكاتبنا في أمريكا والرياض وباكستان للحصول على استشارة مجانية.',
            'keywords' => '',
            'slug' => 'contact',
        ),
        'lets-build' => array(
            'title' => 'Let’s Build 3D Studio | Interactive WebGL Configurator',
            'titleAr' => 'استوديو البناء ثلاثي الأبعاد التفاعلي | إيفرز',
            'desc' => 'Customize a live 3D WebGL brand experience with your logo, colors & packaging inside the EFerz Interactive 3D Studio. Try the real-time demo.',
            'descAr' => 'صمم تجربة موقع ثلاثية الأبعاد حية بشعارك وألوان علامتك ومنتجاتك داخل استوديو إيفرز التفاعلي في الوقت الفعلي. جرّب العرض المباشر الآن.',
            'keywords' => '',
            'slug' => 'lets-build',
        ),
        'privacy' => array(
            'title' => 'Privacy Policy & Data Protection Standards | EFerz',
            'titleAr' => 'سياسة الخصوصية وحماية البيانات | إيفرز',
            'desc' => 'Review EFerz privacy policy covering GDPR, CCPA compliance, enterprise encryption & client confidentiality. Read our data practices.',
            'descAr' => 'اطلع على سياسة الخصوصية الرسمية في إيفرز ومعايير الامتثال GDPR والتشفير وحماية سرية بيانات العملاء. اقرأ التفاصيل كاملة.',
            'keywords' => '',
            'slug' => 'privacy',
        ),
        'terms' => array(
            'title' => 'Terms of Service & Enterprise SLA Terms | EFerz',
            'titleAr' => 'شروط الخدمة واتفاقية العملاء | إيفرز',
            'desc' => 'Read EFerz Terms of Service, 100% client IP ownership, milestone billing & SLA commitments for software projects. View terms.',
            'descAr' => 'اقرأ شروط الخدمة واتفاقية مستوى الخدمة وضمان نقل الملكية الفكرية بنسبة 100% لمشاريع البرمجة والتصميم في إيفرز. تصفح الشروط الآن.',
            'keywords' => '',
            'slug' => 'terms',
        ),
        'refund' => array(
            'title' => 'Refund Policy & 30-Day Money-Back Guarantee | EFerz',
            'titleAr' => 'سياسة الاسترداد وضمان 30 يوماً | إيفرز',
            'desc' => 'Explore EFerz 30-Day Money-Back Guarantee and milestone approval policy for risk-free digital & software delivery. Learn more.',
            'descAr' => 'تعرف على سياسة الاسترداد وضمان الرضا لمدة 30 يوماً واعتماد مراحل التسليم الآمن للمشاريع مع إيفرز. اطلع على التفاصيل الآن.',
            'keywords' => '',
            'slug' => 'refund',
        ),
    );

    $cfg = $routes[$route] ?? $routes['agency'];
    $base_url = 'https://eferz.com/' . ($cfg['slug'] ? $cfg['slug'] . '/' : '');
    return array(
        'route'     => isset($routes[$route]) ? $route : 'agency',
        'is_ar'     => $is_ar,
        'title'     => $is_ar ? $cfg['titleAr'] : $cfg['title'],
        'desc'      => $is_ar ? $cfg['descAr'] : $cfg['desc'],
        'keywords'  => $cfg['keywords'],
        'canonical' => $base_url,
    );
}

/**
 * Prevent WordPress & Yoast SEO from misidentifying rewritten SPA routes (/services, /about, /work, /team, etc.)
 * as the Blog Archive, CPT Archive, or 404, and suppress duplicate Yoast frontend tags ONLY on SPA routes
 * so WhatsApp/Facebook/LinkedIn/Google always read the exact route-specific title, description, canonical & og:image.
 * Inner WordPress pages, Blog posts, and all WooCommerce catalog/product/cart/checkout pages retain full Yoast SEO.
 */
add_action('wp', function() {
    if (!eferz_is_spa_request()) {
        return;
    }
    global $wp_query;
    if ($wp_query) {
        $wp_query->is_404               = false;
        $wp_query->is_home              = false;
        $wp_query->is_archive           = false;
        $wp_query->is_post_type_archive = false;
        $wp_query->is_posts_page        = false;
    }
    status_header(200);
    remove_action('wp_head', 'rel_canonical');
    remove_action('wp_head', 'wp_shortlink_wp_head', 10);
    remove_action('wp_head', '_wp_render_title_tag', 1);
    remove_action('wp_head', 'noindex', 1);
}, 1);

add_filter('wpseo_frontend_presenters', function($presenters) {
    return eferz_is_spa_request() ? array() : $presenters;
}, 999999);

foreach (array(
    'wpseo_title',
    'wpseo_metadesc',
    'wpseo_canonical',
    'wpseo_opengraph_title',
    'wpseo_opengraph_desc',
    'wpseo_opengraph_url',
    'wpseo_opengraph_type',
    'wpseo_opengraph_image',
    'wpseo_twitter_title',
    'wpseo_twitter_description',
    'wpseo_twitter_image',
    'wpseo_json_ld_output',
) as $eferz_yoast_hook) {
    add_filter($eferz_yoast_hook, function($val) {
        return eferz_is_spa_request() ? false : $val;
    }, 999999);
}

function eferz_theme_setup() {
    // Let WordPress / Yoast SEO manage the document title dynamically
    add_theme_support('title-tag');

    add_filter('pre_get_document_title', function($title) {
        if (!eferz_is_spa_request()) {
            return $title;
        }
        $seo = eferz_get_route_seo();
        return $seo['title'];
    }, 999999);

    // Enable Featured Images, Block Alignments & Responsive Embeds (Required for WooCommerce 11.3 Cart/Checkout Blocks)
    add_theme_support('post-thumbnails');
    add_theme_support('align-wide');
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');

    // Register Navigation Menus
    register_nav_menus(array(
        'primary-menu' => esc_html__('Primary Header Menu', 'eferz'),
        'footer-menu'  => esc_html__('Footer Quick Links', 'eferz'),
    ));

    // HTML5 markup support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Custom Logo Support
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 260,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Full WooCommerce Support, Product Grid & Product Gallery
    add_theme_support('woocommerce', array(
        'thumbnail_image_width' => 450,
        'single_image_width'    => 800,
        'product_grid'          => array(
            'default_rows'    => 3,
            'min_rows'        => 1,
            'default_columns' => 3,
            'min_columns'     => 1,
            'max_columns'     => 4,
        ),
    ));
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}
add_action('after_setup_theme', 'eferz_theme_setup');

/**
 * Prevent leftover The7 / PRO Elements global Theme Builder templates (header 3971, footer 2605,
 * single-page 2609, incomplete single-product 7502) from hijacking WooCommerce & EFerz templates.
 * Page-level Elementor content & Elementor Canvas templates remain fully functional.
 */
add_filter('elementor/theme/need_override_location', '__return_false', 999999);
add_filter('elementor/theme/get_location_templates/template_id', '__return_zero', 999999);

/**
 * Enqueue scripts & self-contained dark luxury styling ONLY for inner WordPress & WooCommerce pages.
 * Keeps React SPA front-page isolated and fast.
 */
function eferz_theme_scripts() {
    if (eferz_is_spa_request()) {
        return;
    }

    wp_enqueue_style(
        'eferz-wp-fonts',
        'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Montserrat:ital,wght@0,700;0,800;0,900&family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    $css_path = get_template_directory() . '/assets/eferz-wp-pages.css';
    $css_ver  = file_exists($css_path) ? (string) filemtime($css_path) : EFERZ_THEME_VERSION;

    wp_enqueue_style(
        'eferz-wp-pages',
        get_template_directory_uri() . '/assets/eferz-wp-pages.css',
        array('eferz-wp-fonts'),
        $css_ver
    );
}
add_action('wp_enqueue_scripts', 'eferz_theme_scripts', 50);

/**
 * Eliminate ALL unused WordPress, Elementor, WooCommerce, Jetpack, CF7 & SiteKit CSS/JS
 * on React 3D SPA routes (kills ~4,900 ms render-blocking & console errors without affecting /shop or inner pages).
 */
function eferz_spa_dequeue_bloat() {
    if (!eferz_is_spa_request()) {
        return;
    }

    global $wp_styles, $wp_scripts;
    $keep_logged_in = is_user_logged_in() && is_admin_bar_showing();

    if ($wp_styles && !empty($wp_styles->queue)) {
        foreach ((array) $wp_styles->queue as $handle) {
            if ($keep_logged_in && ($handle === 'admin-bar' || $handle === 'dashicons')) {
                continue;
            }
            wp_dequeue_style($handle);
            wp_deregister_style($handle);
        }
    }

    if ($wp_scripts && !empty($wp_scripts->queue)) {
        foreach ((array) $wp_scripts->queue as $handle) {
            if ($keep_logged_in && $handle === 'admin-bar') {
                continue;
            }
            wp_dequeue_script($handle);
            wp_deregister_script($handle);
        }
    }
}
add_action('wp_enqueue_scripts', 'eferz_spa_dequeue_bloat', 999999);
add_action('wp_print_styles', 'eferz_spa_dequeue_bloat', 999999);
add_action('wp_print_scripts', 'eferz_spa_dequeue_bloat', 999999);
add_action('wp_print_footer_scripts', 'eferz_spa_dequeue_bloat', 1);

add_filter('w3tc_lazyload_can_process', function($can_process) {
    return eferz_is_spa_request() ? false : $can_process;
}, 999);

/**
 * Safely defer non-critical frontend JS on inner WordPress/WooCommerce pages
 * while preserving WooCommerce Blocks, Stripe checkout & jQuery dependencies.
 */
add_filter('script_loader_tag', function($tag, $handle, $src) {
    if (is_admin() || eferz_is_spa_request() || empty($src)) {
        return $tag;
    }
    if (strpos($tag, ' defer') !== false || strpos($tag, ' async') !== false || strpos($tag, 'type="module"') !== false || strpos($tag, "type='module'") !== false) {
        return $tag;
    }
    $exclude_prefixes = array('jquery', 'wc-', 'woocommerce', 'stripe', 'wp-', 'react', 'elementor', 'eferz-');
    foreach ($exclude_prefixes as $prefix) {
        if (strpos($handle, $prefix) === 0 || strpos($src, 'js.stripe.com') !== false) {
            return $tag;
        }
    }
    return str_replace(' src=', ' defer src=', $tag);
}, 20, 3);

function eferz_strip_spa_plugin_hooks() {
    if (!eferz_is_spa_request()) {
        return;
    }
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_all_actions('wp_enqueue_scripts', 10);

    if (class_exists('\Elementor\Plugin')) {
        $el = \Elementor\Plugin::$instance;
        if (isset($el->frontend)) {
            remove_action('wp_enqueue_scripts', array($el->frontend, 'enqueue_styles'));
            remove_action('wp_enqueue_scripts', array($el->frontend, 'enqueue_scripts'));
            remove_action('wp_footer', array($el->frontend, 'wp_footer'));
        }
    }

    global $wp_filter;
    $keep_logged_in = is_user_logged_in() && is_admin_bar_showing();
    $allowed_callbacks = array(
        'eferz_strip_spa_plugin_hooks',
        'eferz_seo_schema_jsonld',
        'wp_enqueue_scripts',
        'wp_print_styles',
        'wp_print_head_scripts',
        'wp_print_footer_scripts',
    );
    if ($keep_logged_in) {
        $allowed_callbacks = array_merge($allowed_callbacks, array('wp_admin_bar_render', '_admin_bar_bump_cb'));
    }

    foreach (array('wp_head', 'wp_body_open', 'wp_footer') as $hook_name) {
        if (!isset($wp_filter[$hook_name]) || !isset($wp_filter[$hook_name]->callbacks)) {
            continue;
        }
        foreach ($wp_filter[$hook_name]->callbacks as $priority => $callbacks) {
            foreach ($callbacks as $cb_id => $cb) {
                $fn = $cb['function'] ?? null;
                $fn_name = is_string($fn) ? $fn : '';
                if (!in_array($fn_name, $allowed_callbacks, true)) {
                    remove_action($hook_name, $fn, $priority);
                }
            }
        }
    }
}
add_action('wp', 'eferz_strip_spa_plugin_hooks', 9999);
add_action('wp_head', 'eferz_strip_spa_plugin_hooks', -999999);
add_action('wp_body_open', 'eferz_strip_spa_plugin_hooks', -999999);
add_action('wp_footer', 'eferz_strip_spa_plugin_hooks', -999999);

/**
 * Keep WooCommerce Cart Counter updated during AJAX Add-to-Cart
 */
add_filter('woocommerce_add_to_cart_fragments', function($fragments) {
    if (function_exists('WC') && WC()->cart) {
        $count = WC()->cart->get_cart_contents_count();
        $fragments['span.eferz-cart-count'] = '<span class="eferz-cart-count">' . esc_html($count) . '</span>';
    }
    return $fragments;
});

/**
 * 2. Verified Schema.org Organization, ProfessionalService, OfferCatalog, FAQPage, BreadcrumbList & WebPage JSON-LD
 * Provides complete Google Rich Results & Knowledge Graph signals in initial SSR HTML.
 */
function eferz_seo_schema_jsonld() {
    if (!eferz_is_spa_request()) {
        return; // Let Yoast SEO & WooCommerce emit native Product/Page schemas on backend pages
    }
    $seo = function_exists('eferz_get_route_seo') ? eferz_get_route_seo() : array(
        'route'     => 'agency',
        'is_ar'     => false,
        'title'     => 'EFerz Digital Agency | AI, 3D WebGL, SEO & Software',
        'desc'      => 'Global AI automation, 3D WebGL websites, Shopify Plus, Amazon FBA, technical SEO & cloud cybersecurity by EFerz (USA, KSA, PAK). Start your project.',
        'canonical' => 'https://eferz.com/',
    );
    $route = $seo['route'];
    $canonical = $seo['canonical'];

    $schema_type_map = array(
        'agency'     => 'WebPage',
        'services'   => 'Service',
        'work'       => 'CollectionPage',
        'clients'    => 'CollectionPage',
        'team'       => 'AboutPage',
        'about'      => 'AboutPage',
        'blog'       => 'Blog',
        'contact'    => 'ContactPage',
        'lets-build' => 'WebApplication',
        'privacy'    => 'WebPage',
        'terms'      => 'WebPage',
        'refund'     => 'WebPage',
    );
    $page_type = $schema_type_map[$route] ?? 'WebPage';

    $page_node = array(
        '@type'       => $page_type,
        '@id'         => $canonical . '#webpage',
        'url'         => $canonical,
        'name'        => $seo['title'],
        'description' => $seo['desc'],
        'inLanguage'  => $seo['is_ar'] ? 'ar' : 'en',
        'isPartOf'    => array('@id' => 'https://eferz.com/#website'),
        'about'       => array('@id' => 'https://eferz.com/#organization'),
    );

    if ($route === 'services' || $route === 'agency') {
        $page_node['hasOfferCatalog'] = array(
            '@type'           => 'OfferCatalog',
            'name'            => 'EFerz Enterprise Digital Services',
            'itemListElement' => array(
                array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Full-Stack Web Engineering & Next.js Platforms')),
                array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => '3D WebGL & Interactive Three.js Websites')),
                array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Custom Artificial Intelligence Agents & LLM Systems')),
                array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Shopify Plus & Enterprise E-Commerce Architecture')),
                array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Amazon FBA Private Label & Marketplace Management')),
                array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Technical SEO & Search Ranking Growth')),
                array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Performance Marketing, PPC & ROAS Scaling')),
                array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Mobile App Development (iOS & Android)')),
                array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Brand Identity & UI/UX Product Systems')),
                array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Zero Trust Cloud & Enterprise Cybersecurity')),
                array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'No-Code & Automated Business Workflows')),
            ),
        );
    }

    $breadcrumb_items = array(
        array(
            '@type'    => 'ListItem',
            'position' => 1,
            'name'     => 'Home',
            'item'     => 'https://eferz.com/',
        ),
    );
    if ($route !== 'agency') {
        $breadcrumb_items[] = array(
            '@type'    => 'ListItem',
            'position' => 2,
            'name'     => ucfirst(str_replace('-', ' ', $route)),
            'item'     => $canonical,
        );
    }

    $schema = array(
        '@context' => 'https://schema.org',
        '@graph'   => array(
            array(
                '@type'        => array('Organization', 'ProfessionalService'),
                '@id'          => 'https://eferz.com/#organization',
                'name'         => 'EFerz',
                'alternateName'=> 'EFerz Digital Agency',
                'legalName'    => 'EFerz',
                'url'          => 'https://eferz.com/',
                'logo'         => get_template_directory_uri() . '/assets/eferz-logo.png',
                'image'        => get_template_directory_uri() . '/assets/og-eferz-v2.jpg',
                'foundingDate' => '2020-10-10',
                'publishingPrinciples' => 'https://eferz.com/privacy/',
                'description'  => 'Founded on October 10, 2020, EFerz is a global IT, AI, 3D WebGL, eCommerce, SEO, and Cybersecurity company headquartered in Fort Lauderdale, Florida, USA with regional offices in Riyadh, Saudi Arabia and Karachi, Pakistan — serving clients worldwide.',
                'email'        => 'info@eferz.com',
                'telephone'    => '+1-786-224-4112',
                'priceRange'   => '$$-$$$$',
                'areaServed'   => array('US', 'SA', 'AE', 'GB', 'CA', 'AU', 'PK', 'Worldwide'),
                'knowsAbout'   => array('Artificial Intelligence', 'Autonomous AI Agents', 'LLM Systems', '3D WebGL', 'Three.js', 'Full-Stack Web Development', 'Shopify Plus', 'Amazon FBA', 'Technical SEO', 'Cybersecurity', 'Cloud Architecture'),
                'contactPoint' => array(
                    array('@type' => 'ContactPoint', 'telephone' => '+1-786-224-4112', 'contactType' => 'sales', 'areaServed' => array('US', 'Worldwide'), 'availableLanguage' => array('English', 'Arabic')),
                    array('@type' => 'ContactPoint', 'telephone' => '+966-539-046410', 'contactType' => 'customer support', 'areaServed' => array('SA', 'AE', 'Worldwide'), 'availableLanguage' => array('Arabic', 'English')),
                    array('@type' => 'ContactPoint', 'telephone' => '+92-345-3397459', 'contactType' => 'technical support', 'areaServed' => array('PK', 'Worldwide'), 'availableLanguage' => array('English', 'Urdu')),
                ),
                'founders'     => array(
                    array(
                        '@type'    => 'Person',
                        'name'     => 'Khubaib Khan',
                        'jobTitle' => 'Founder & President',
                        'sameAs'   => array(
                            'https://www.linkedin.com/in/khubaibkhan/',
                            'https://www.facebook.com/KhuBaiB.kK/',
                            'https://www.instagram.com/khubaibkhan_kk/',
                        ),
                    ),
                    array(
                        '@type'    => 'Person',
                        'name'     => 'Salman Shahid',
                        'jobTitle' => 'Co-Founder & Director of Finance & Legal Affairs',
                        'sameAs'   => array(
                            'https://www.linkedin.com/in/salmanshahidofficial/',
                            'https://www.facebook.com/maanshahid',
                            'https://www.instagram.com/maanshahid/',
                        ),
                    ),
                ),
                'employee'     => array(
                    array(
                        '@type'    => 'Person',
                        'name'     => 'Irfan Mirza',
                        'jobTitle' => 'Director of Business Development',
                        'sameAs'   => array('https://www.linkedin.com/in/irfan-mirza-76a375255/'),
                    ),
                    array('@type' => 'Person', 'name' => 'Syed Ahmed', 'jobTitle' => 'Business Development Manager'),
                    array('@type' => 'Person', 'name' => 'Asad Malik', 'jobTitle' => 'Website Designer & Developer'),
                    array('@type' => 'Person', 'name' => 'Syed Owais', 'jobTitle' => 'Operations Coordinator'),
                ),
                'address'      => array(
                    array(
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => '701 E Commercial Blvd',
                        'addressLocality' => 'Fort Lauderdale',
                        'addressRegion'   => 'FL',
                        'postalCode'      => '33334',
                        'addressCountry'  => 'US',
                    ),
                    array(
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => 'Prince Muhammad Ibn Saad Ibn Abdulaziz Rd, Al Malqa',
                        'addressLocality' => 'Riyadh',
                        'postalCode'      => '13525',
                        'addressCountry'  => 'SA',
                    ),
                    array(
                        '@type'           => 'PostalAddress',
                        'addressLocality' => 'Karachi',
                        'addressCountry'  => 'PK',
                    ),
                ),
                'sameAs'       => array(
                    'https://www.facebook.com/EFerzOfficial',
                    'https://www.instagram.com/EFerzOfficial',
                    'https://www.linkedin.com/company/EFerz/',
                    'https://www.youtube.com/@EFerzOfficial',
                ),
            ),
            array(
                '@type'      => 'WebSite',
                '@id'        => 'https://eferz.com/#website',
                'url'        => 'https://eferz.com/',
                'name'       => 'EFerz',
                'inLanguage' => array('en', 'ar'),
                'publisher'  => array('@id' => 'https://eferz.com/#organization'),
            ),
            $page_node,
            array(
                '@type'           => 'BreadcrumbList',
                'itemListElement' => $breadcrumb_items,
            ),
            array(
                '@type'      => 'FAQPage',
                'mainEntity' => array(
                    array(
                        '@type'          => 'Question',
                        'name'           => 'What services does EFerz specialize in?',
                        'acceptedAnswer' => array(
                            '@type' => 'Answer',
                            'text'  => 'EFerz builds custom AI agents and LLM automation, 3D WebGL and Three.js websites, full-stack SaaS software, Shopify Plus stores, Amazon FBA management, technical SEO, brand identity, and Zero Trust cloud cybersecurity.',
                        ),
                    ),
                    array(
                        '@type'          => 'Question',
                        'name'           => 'Where are EFerz offices located?',
                        'acceptedAnswer' => array(
                            '@type' => 'Answer',
                            'text'  => 'EFerz is headquartered in Fort Lauderdale, Florida (USA) with regional offices in Riyadh (Saudi Arabia) and Karachi (Pakistan), serving enterprise and growth clients worldwide.',
                        ),
                    ),
                    array(
                        '@type'          => 'Question',
                        'name'           => 'Are 3D WebGL websites engineered by EFerz SEO-friendly and fast?',
                        'acceptedAnswer' => array(
                            '@type' => 'Answer',
                            'text'  => 'Yes. EFerz combines semantic HTML, route-aware SSR metadata, Schema.org structured data, GPU-accelerated rendering, and responsive mobile optimization so 3D WebGL sites achieve top Google search rankings.',
                        ),
                    ),
                    array(
                        '@type'          => 'Question',
                        'name'           => 'Do clients retain 100% source code and intellectual property ownership?',
                        'acceptedAnswer' => array(
                            '@type' => 'Answer',
                            'text'  => 'Yes. Under EFerz enterprise agreements, clients receive 100% ownership of all custom software codebases, brand assets, and intellectual property upon milestone completion.',
                        ),
                    ),
                ),
            ),
        ),
    );
    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . '</script>' . "\n";
}
add_action('wp_head', 'eferz_seo_schema_jsonld');

/**
 * 3. Contact Form REST API Endpoint (/wp-json/eferz/v1/contact)
 *    + Anti-Spam Quiz Verification + wp_mail() Delivery + WP Admin Leads Log + WPForms Hook
 */
add_action('rest_api_init', function() {
    register_rest_route('eferz/v1', '/contact', array(
        'methods'             => 'POST',
        'permission_callback' => '__return_true',
        'callback'            => 'eferz_handle_contact_submission',
    ));
});

function eferz_handle_contact_submission(WP_REST_Request $request) {
    $params = $request->get_json_params();
    if (!is_array($params)) {
        $params = $request->get_params();
    }

    // 1. Honeypot Check
    $honeypot = isset($params['honeypot']) ? trim(sanitize_text_field($params['honeypot'])) : '';
    if (!empty($honeypot)) {
        return new WP_REST_Response(array('success' => false, 'message' => 'Spam blocked.'), 400);
    }

    // 2. Anti-Spam "I am not a robot" & Math Quiz Check
    $not_robot   = !empty($params['not_robot']);
    $quiz_a      = isset($params['quiz_a']) ? intval($params['quiz_a']) : 0;
    $quiz_b      = isset($params['quiz_b']) ? intval($params['quiz_b']) : 0;
    $quiz_answer = isset($params['quiz_answer']) ? intval($params['quiz_answer']) : -1;

    if (!$not_robot || ($quiz_a + $quiz_b) !== $quiz_answer) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Human verification failed. Please complete the I am not a robot security quiz.',
        ), 400);
    }

    // 3. Sanitize Input Fields & Verify Communication Opt-In Consent
    $name        = sanitize_text_field($params['name'] ?? '');
    $email       = sanitize_email($params['email'] ?? '');
    $phone       = sanitize_text_field($params['phone'] ?? '');
    $company     = sanitize_text_field($params['company'] ?? '');
    $service     = sanitize_text_field($params['service'] ?? 'General Inquiry');
    $message     = sanitize_textarea_field($params['message'] ?? '');
    $source      = sanitize_text_field($params['source'] ?? 'EFerz Website');
    $sms_consent = !empty($params['sms_consent']);

    if (empty($name) || empty($email) || !is_email($email)) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Please provide a valid name and email address.',
        ), 400);
    }

    // 4. Store Submission in WordPress Database (SMS consent is optional per TCPA / A2P 10DLC)
    $leads = get_option('eferz_contact_leads', array());
    if (!is_array($leads)) {
        $leads = array();
    }
    $new_lead = array(
        'id'          => uniqid('eferz_'),
        'date'        => current_time('mysql'),
        'name'        => $name,
        'email'       => $email,
        'phone'       => $phone,
        'sms_consent' => $sms_consent ? 'Opted In (SMS/WhatsApp/Call)' : 'Not Opted In (Email Only)',
        'company'     => $company,
        'service'     => $service,
        'message'     => $message,
        'source'      => $source,
        'ip'          => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
    );
    array_unshift($leads, $new_lead);
    update_option('eferz_contact_leads', array_slice($leads, 0, 500), false);

    // 5. Optional WPForms Entry Sync (if WPForms Pro entry handler is active)
    if (function_exists('wpforms') && isset(wpforms()->entry) && method_exists(wpforms()->entry, 'add')) {
        $forms = get_posts(array('post_type' => 'wpforms', 'posts_per_page' => 1, 'post_status' => 'publish'));
        if (!empty($forms)) {
            $form_id = $forms[0]->ID;
            @wpforms()->entry->add(array(
                'form_id' => $form_id,
                'fields'  => wp_json_encode(array(
                    array('name' => 'Name', 'value' => $name, 'id' => 1, 'type' => 'name'),
                    array('name' => 'Email', 'value' => $email, 'id' => 2, 'type' => 'email'),
                    array('name' => 'Phone', 'value' => $phone, 'id' => 3, 'type' => 'phone'),
                    array('name' => 'Company', 'value' => $company, 'id' => 4, 'type' => 'text'),
                    array('name' => 'Service', 'value' => $service, 'id' => 5, 'type' => 'text'),
                    array('name' => 'Message', 'value' => $message, 'id' => 6, 'type' => 'textarea'),
                )),
                'date'    => current_time('mysql'),
            ));
        }
    }

    // 6. Send Formatted HTML Email via wp_mail() to info@eferz.com, khubaibkhankk91@gmail.com, AND WordPress Admin Email
    $admin_email = get_option('admin_email');
    $recipients  = array_unique(array_filter(array('info@eferz.com', 'khubaibkhankk91@gmail.com', $admin_email)));

    $subject = sprintf('[EFerz New Lead] %s — %s (%s)', $name, $service, $company ? $company : 'Direct Inquiry');

    $html_body = '
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #0b0e17; color: #ffffff; padding: 28px; border-radius: 16px; border: 1px solid #d02128;">
        <h2 style="margin-top: 0; color: #d02128; text-transform: uppercase; letter-spacing: 1px;">New Verified Project Inquiry — EFerz</h2>
        <p style="color: #cbd5e1; font-size: 13px;">Verified via Anti-Spam Human Security Quiz on eferz.com</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8; width: 150px;"><strong>Full Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #ffffff;">' . esc_html($name) . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Email Address:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #38bdf8;"><a href="mailto:' . esc_attr($email) . '" style="color: #38bdf8;">' . esc_html($email) . '</a></td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Phone / WhatsApp:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #ffffff;">' . esc_html($phone ?: 'N/A') . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>SMS / Call Consent:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: ' . ($sms_consent ? '#10b981' : '#94a3b8') . ';">' . esc_html($sms_consent ? 'Opted In (SMS, WhatsApp & Phone Updates — Reply STOP to opt out)' : 'Not Opted In (Email Only)') . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Company / Brand:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #ffffff;">' . esc_html($company ?: 'N/A') . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Primary Service:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #f59e0b;">' . esc_html($service) . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Project Brief:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #ffffff; white-space: pre-wrap;">' . esc_html($message) . '</td></tr>
            <tr><td style="padding: 10px; color: #94a3b8;"><strong>Submitted At:</strong></td><td style="padding: 10px; color: #94a3b8;">' . esc_html(current_time('mysql')) . ' (' . esc_html($source) . ')</td></tr>
        </table>
    </div>';

    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: EFerz Website <info@eferz.com>',
        'Reply-To: ' . $name . ' <' . $email . '>',
    );

    $mail_sent = @wp_mail($recipients, $subject, $html_body, $headers);

    return new WP_REST_Response(array(
        'success'   => true,
        'mail_sent' => (bool) $mail_sent,
        'message'   => 'Your inquiry has been received and dispatched to EFerz.',
    ), 200);
}

/**
 * 4. Add "EFerz Leads" Page in WordPress Admin Dashboard so the owner can view all form submissions directly in wp-admin!
 */
add_action('admin_menu', function() {
    add_menu_page(
        'EFerz Contact Leads',
        'EFerz Leads',
        'manage_options',
        'eferz-leads',
        'eferz_render_admin_leads_page',
        'dashicons-email-alt',
        26
    );
});

function eferz_render_admin_leads_page() {
    $leads = get_option('eferz_contact_leads', array());
    ?>
    <div class="wrap">
        <h1 style="display:flex;align-items:center;gap:10px;">
            <span class="dashicons dashicons-shield-alt" style="color:#d02128;"></span>
            EFerz Website Contact Form Submissions (Verified Anti-Spam Leads)
        </h1>
        <p>All submissions from the EFerz Contact Form are automatically emailed to <strong>info@eferz.com</strong> and <strong><?php echo esc_html(get_option('admin_email')); ?></strong>, and safely stored below.</p>
        <?php if (empty($leads)) : ?>
            <div class="notice notice-info"><p>No contact form submissions recorded yet.</p></div>
        <?php else : ?>
            <table class="widefat fixed striped" style="margin-top:15px;">
                <thead>
                    <tr>
                        <th style="width:140px;">Date</th>
                        <th style="width:150px;">Name</th>
                        <th style="width:180px;">Email</th>
                        <th style="width:130px;">Phone / WhatsApp</th>
                        <th style="width:120px;">SMS Consent</th>
                        <th style="width:140px;">Company</th>
                        <th style="width:180px;">Service</th>
                        <th>Project Brief / Message</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($leads as $lead) : ?>
                        <tr>
                            <td><?php echo esc_html($lead['date'] ?? ''); ?></td>
                            <td><strong><?php echo esc_html($lead['name'] ?? ''); ?></strong></td>
                            <td><a href="mailto:<?php echo esc_attr($lead['email'] ?? ''); ?>"><?php echo esc_html($lead['email'] ?? ''); ?></a></td>
                            <td><?php echo esc_html($lead['phone'] ?? ''); ?></td>
                            <td><?php echo esc_html($lead['sms_consent'] ?? 'Opted In'); ?></td>
                            <td><?php echo esc_html($lead['company'] ?? ''); ?></td>
                            <td><?php echo esc_html($lead['service'] ?? ''); ?></td>
                            <td><?php echo nl2br(esc_html($lead['message'] ?? '')); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * 5. SPA Routes Support: /services, /work, /clients, /team, /contact, /blog, etc.
 */
function eferz_add_spa_rewrites() {
    $spa_routes = array('services', 'work', 'portfolio', 'clients', 'team', 'contact', 'blog', 'about', 'privacy', 'terms', 'refund', 'lets-build');
    foreach ($spa_routes as $route) {
        add_rewrite_rule('^' . $route . '/?$', 'index.php?eferz_spa_route=' . $route, 'top');
    }
}
add_action('init', 'eferz_add_spa_rewrites');

/**
 * Automatically flush rewrite rules once when theme updates so WooCommerce products & SPA routes never 404
 */
add_action('init', function() {
    if (get_option('eferz_rewrite_version') !== EFERZ_THEME_VERSION) {
        flush_rewrite_rules(false);
        update_option('eferz_rewrite_version', EFERZ_THEME_VERSION);
    }
}, 99);

add_filter('query_vars', function($vars) {
    $vars[] = 'eferz_spa_route';
    return $vars;
});

add_filter('template_include', function($template) {
    // 1. WooCommerce catalog & single product pages -> always render native woocommerce.php (unless explicit Elementor Canvas)
    if (function_exists('is_woocommerce') && is_woocommerce()) {
        $page_tpl = is_singular() ? get_page_template_slug(get_queried_object_id()) : '';
        if ($page_tpl === 'elementor_canvas') {
            return $template;
        }
        $wc_template = get_template_directory() . '/woocommerce.php';
        if (file_exists($wc_template)) {
            return $wc_template;
        }
    }

    // 2. Cart, Checkout, My Account, and WC endpoints -> force clean theme page.php (prevents PRO Elements single-page 2609 hijack!)
    if (function_exists('is_cart') && (is_cart() || is_checkout() || is_account_page() || is_wc_endpoint_url())) {
        $page_tpl = is_singular() ? get_page_template_slug(get_queried_object_id()) : '';
        if ($page_tpl === 'elementor_canvas') {
            return $template;
        }
        $wp_page = get_template_directory() . '/page.php';
        if (file_exists($wp_page)) {
            return $wp_page;
        }
    }

    // 3. React 3D SPA routes -> front-page.php
    if (eferz_is_spa_request()) {
        $front = get_template_directory() . '/front-page.php';
        if (file_exists($front)) {
            return $front;
        }
    }

    // 4. Genuine 404 responses -> force clean theme 404.php (blocks page builder / Soft-404 overrides)
    if (is_404()) {
        $not_found = get_template_directory() . '/404.php';
        if (file_exists($not_found)) {
            return $not_found;
        }
    }

    return $template;
}, 999999);

/**
 * Clean body classes on SPA routes and WooCommerce pages to prevent legacy The7 / Elementor stylesheet clashes
 */
add_filter('body_class', function($classes) {
    $legacy_classes = array(
        'elementor-page-2609',
        'elementor-page-2605',
        'elementor-page-3971',
        'elementor-page-7502',
        'elementor-page-6133',
    );

    if (eferz_is_spa_request()) {
        $classes = array_diff($classes, $legacy_classes);
        $classes[] = 'eferz-flagship-active';
    } elseif (function_exists('is_woocommerce') && (is_woocommerce() || is_cart() || is_checkout() || is_account_page() || is_wc_endpoint_url())) {
        $classes = array_diff($classes, array_merge($legacy_classes, array('elementor-template-full-width')));
    }

    return $classes;
}, 999999);

/**
 * Serve RFC 9116 /.well-known/security.txt, /llms.txt, /.well-known/ard.json & /.well-known/agent-card.json immediately
 */
add_action('template_redirect', function() {
    $req_path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');

    if ($req_path === '.well-known/security.txt' || $req_path === 'security.txt') {
        status_header(200);
        header('Content-Type: text/plain; charset=utf-8');
        header('Cache-Control: public, max-age=86400');
        echo "Contact: mailto:security@eferz.com\n";
        echo "Contact: mailto:info@eferz.com\n";
        echo "Canonical: https://eferz.com/.well-known/security.txt\n";
        echo "Policy: https://eferz.com/privacy/\n";
        echo "Preferred-Languages: en, ar\n";
        echo "Expires: 2027-12-31T23:59:59.000Z\n";
        exit;
    }

    if ($req_path === 'llms.txt') {
        status_header(200);
        header('Content-Type: text/markdown; charset=utf-8');
        header('Cache-Control: public, max-age=86400');
        echo "# EFerz Digital Agency\n\n";
        echo "> EFerz (https://eferz.com/) is a global AI automation, 3D WebGL web engineering, Shopify Plus, Amazon FBA, technical SEO, UI/UX product design, and Zero Trust cloud cybersecurity agency founded on October 10, 2020, with offices in Fort Lauderdale (USA), Riyadh (Saudi Arabia), and Karachi (Pakistan).\n\n";
        echo "## Core Services\n\n";
        echo "- [Enterprise Services Overview](https://eferz.com/services/): Full-stack web engineering, custom AI agents and LLM systems, interactive 3D WebGL websites, Shopify Plus, Amazon FBA management, technical SEO, PPC, mobile apps, and cloud cybersecurity.\n";
        echo "- [Interactive 3D Studio](https://eferz.com/lets-build/): Real-time WebGL product and brand configurator.\n";
        echo "- [Client Packages & Shop](https://eferz.com/shop/): Ready-to-launch web, Shopify, and digital startup packages.\n\n";
        echo "## Company & Portfolio\n\n";
        echo "- [Selected Work & Case Studies](https://eferz.com/work/): 17+ verified web, 3D interactive, e-commerce, and AI case studies.\n";
        echo "- [Verified Client Reviews](https://eferz.com/clients/): Client testimonials and global enterprise retention stories.\n";
        echo "- [About EFerz](https://eferz.com/about/): Company story since October 10, 2020, global footprint, and engineering standards.\n";
        echo "- [Leadership & Architects](https://eferz.com/team/): Executive leadership and principal software architects.\n";
        echo "- [Engineering & AI Blog](https://eferz.com/blog/): Technical playbooks covering AI engineering, WebGL performance, Core Web Vitals, technical SEO, and cloud security.\n\n";
        echo "## Policies, Contact & Security\n\n";
        echo "- [Contact & Project Inquiry](https://eferz.com/contact/): Direct consultation with our USA (+1-786-224-4112), Saudi Arabia (+966-53-904-6410), and Pakistan (+92-345-3397459) offices or info@eferz.com.\n";
        echo "- [Privacy Policy](https://eferz.com/privacy/): GDPR, CCPA, and enterprise data protection standards.\n";
        echo "- [Terms of Service](https://eferz.com/terms/): SLA and 100% client IP ownership commitments.\n";
        echo "- [Refund Policy](https://eferz.com/refund/): 30-day milestone guarantee terms.\n";
        echo "- [Security Contact (RFC 9116)](https://eferz.com/.well-known/security.txt): Vulnerability disclosure via security@eferz.com.\n";
        exit;
    }

    if ($req_path === '.well-known/ard.json' || $req_path === 'ard.json' || $req_path === '.well-known/ard-manifest.json') {
        status_header(200);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: public, max-age=86400');
        echo wp_json_encode(array(
            '$schema' => 'https://raw.githubusercontent.com/ards-project/ard-spec/main/spec/schemas/ard-entry.schema.json',
            'entries' => array(
                array(
                    'identifier' => 'urn:air:eferz.com:agents:project-consultation',
                    'displayName' => 'EFerz Project Consultation & Agency Services',
                    'type' => 'application/a2a-agent-card+json',
                    'url' => 'https://eferz.com/.well-known/agent-card.json',
                    'representativeQueries' => array(
                        'Request a quote for custom AI agents, 3D WebGL websites, or Shopify Plus from EFerz',
                        'Contact EFerz offices in Fort Lauderdale USA, Riyadh Saudi Arabia, or Karachi Pakistan',
                        'Explore EFerz digital agency services, case studies, and web packages',
                    ),
                ),
            ),
        ), JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
        exit;
    }

    if ($req_path === '.well-known/agent-card.json') {
        status_header(200);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: public, max-age=86400');
        echo wp_json_encode(array(
            'name' => 'EFerz Digital Agency Consultation',
            'description' => 'Global AI automation, 3D WebGL websites, Shopify Plus, Amazon FBA, technical SEO, and cloud cybersecurity services by EFerz.',
            'url' => 'https://eferz.com/contact/',
            'version' => '1.0.0',
            'provider' => array(
                'organization' => 'EFerz',
                'url' => 'https://eferz.com/',
            ),
            'documentationUrl' => 'https://eferz.com/llms.txt',
            'capabilities' => array('streaming' => false, 'pushNotifications' => false),
            'skills' => array(
                array(
                    'id' => 'project-inquiry',
                    'name' => 'Submit Project Inquiry',
                    'description' => 'Submit project scope and contact details to EFerz USA, KSA, or Pakistan offices.',
                    'tags' => array('ai', 'web-development', '3d-webgl', 'shopify', 'seo', 'cybersecurity'),
                ),
            ),
        ), JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
        exit;
    }
}, 0);

add_filter('wp_robots', function($robots) {
    $req_path = strtolower(trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/'));
    if (is_404() || strpos($req_path, 'demo-payment') !== false || strpos($req_path, 'test-payment') !== false || is_author()) {
        $robots['noindex'] = true;
        $robots['nofollow'] = true;
        unset($robots['index'], $robots['follow']);
    }
    return $robots;
}, 999);

/**
 * Harden against Soft-404s, legacy /about-us slug duplicates, & username enumeration (/author/admin/)
 */
add_action('template_redirect', function() {
    if (is_admin() || wp_doing_ajax() || wp_doing_cron()) {
        return;
    }

    $req_path = strtolower(trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/'));

    if ($req_path === 'about-us') {
        wp_redirect('https://eferz.com/about/', 301);
        exit;
    }
    if ($req_path === 'home') {
        wp_redirect('https://eferz.com/', 301);
        exit;
    }

    global $wp_query;
    $is_wc = function_exists('is_woocommerce') && (is_woocommerce() || is_cart() || is_checkout() || is_account_page() || is_wc_endpoint_url());
    $is_empty_unknown = !$is_wc && !eferz_is_spa_request() && !is_front_page() && !is_home() && !is_search() && !is_archive() && !is_feed() && !is_robots() && !is_trackback() && $wp_query && !$wp_query->have_posts();

    if (is_author() || is_404() || $is_empty_unknown) {
        if ($wp_query) {
            $wp_query->set_404();
        }
        status_header(404);
        header('X-Robots-Tag: noindex, nofollow', true);
        nocache_headers();
    }
}, 2);

add_filter('wp_sitemaps_add_provider', function($provider, $name) {
    return ($name === 'users') ? false : $provider;
}, 10, 2);

add_filter('wpseo_sitemap_exclude_author', '__return_empty_array');
add_filter('wpseo_sitemap_exclude_post_type', function($excluded, $post_type) {
    if (in_array($post_type, array('mailpoet_page', 'elementor_library'), true)) {
        return true;
    }
    return $excluded;
}, 10, 2);

/**
 * Exclude noindex WooCommerce utility pages from Yoast page-sitemap.xml
 */
add_filter('wpseo_exclude_from_sitemap_by_post_ids', function($excluded_ids) {
    if (!is_array($excluded_ids)) {
        $excluded_ids = array();
    }
    foreach (array('cart', 'checkout', 'my-account', 'order-track') as $slug) {
        $page = get_page_by_path($slug);
        if ($page && isset($page->ID)) {
            $excluded_ids[] = (int) $page->ID;
        }
    }
    if (function_exists('wc_get_page_id')) {
        foreach (array('cart', 'checkout', 'myaccount') as $wc_key) {
            $pid = (int) wc_get_page_id($wc_key);
            if ($pid > 0) {
                $excluded_ids[] = $pid;
            }
        }
    }
    return array_values(array_unique(array_filter(array_map('intval', $excluded_ids))));
}, 20);

/**
 * Output XML for Flagship SPA Sitemap (/eferz-pages-sitemap.xml) so Google indexes all 12 React routes + hreflang
 */
function eferz_render_flagship_sitemap_xml() {
    $routes = array(
        ''           => '1.0',
        'services'   => '0.9',
        'work'       => '0.9',
        'clients'    => '0.8',
        'team'       => '0.8',
        'about'      => '0.8',
        'blog'       => '0.8',
        'contact'    => '0.9',
        'lets-build' => '0.8',
        'privacy'    => '0.4',
        'terms'      => '0.4',
        'refund'     => '0.4',
    );
    $lastmod = gmdate('Y-m-d\TH:i:s+00:00');
    $og_img  = esc_url(get_template_directory_uri() . '/assets/og-eferz-v2.jpg');

    status_header(200);
    header('Content-Type: application/xml; charset=UTF-8');
    header('X-Robots-Tag: noindex, follow', true);
    header('Cache-Control: public, max-age=3600');

    echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";
    foreach ($routes as $slug => $prio) {
        $url = 'https://eferz.com/' . ($slug !== '' ? $slug . '/' : '');
        echo "  <url>\n";
        echo '    <loc>' . esc_url($url) . "</loc>\n";
        echo '    <lastmod>' . esc_html($lastmod) . "</lastmod>\n";
        echo '    <priority>' . esc_html($prio) . "</priority>\n";
        echo '    <xhtml:link rel="alternate" hreflang="en" href="' . esc_url($url) . "\" />\n";
        echo '    <xhtml:link rel="alternate" hreflang="ar" href="' . esc_url($url . '?lang=ar') . "\" />\n";
        echo '    <xhtml:link rel="alternate" hreflang="x-default" href="' . esc_url($url) . "\" />\n";
        if ($slug === '' || $slug === 'services' || $slug === 'work') {
            echo "    <image:image>\n";
            echo '      <image:loc>' . $og_img . "</image:loc>\n";
            echo "      <image:title>EFerz Digital Agency</image:title>\n";
            echo "    </image:image>\n";
        }
        echo "  </url>\n";
    }
    echo "</urlset>\n";
}

add_filter('wpseo_sitemap_index', function($sitemap_index) {
    $lastmod = gmdate('Y-m-d\TH:i:s+00:00');
    $sitemap_index .= "\t<sitemap>\n\t\t<loc>https://eferz.com/eferz-pages-sitemap.xml</loc>\n\t\t<lastmod>" . esc_html($lastmod) . "</lastmod>\n\t</sitemap>\n";
    return $sitemap_index;
}, 20);

add_action('init', function() {
    if (function_exists('wpseo_register_sitemap')) {
        wpseo_register_sitemap('eferz-pages', function() {
            global $wpseo_sitemaps;
            ob_start();
            eferz_render_flagship_sitemap_xml();
            $xml = ob_get_clean();
            if ($wpseo_sitemaps && method_exists($wpseo_sitemaps, 'set_sitemap')) {
                $wpseo_sitemaps->set_sitemap($xml);
            } else {
                echo $xml;
                exit;
            }
        });
    }
}, 20);

add_action('template_redirect', function() {
    $req_path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');
    if ($req_path === 'eferz-pages-sitemap.xml') {
        eferz_render_flagship_sitemap_xml();
        exit;
    }
}, 1);

/**
 * Custom Backend Login Gate & Branded Portal (/platform):
 * - Visiting /platform opens custom EFerz Platform login (or redirects directly to Dashboard if already logged in).
 * - Direct visits to /wp-login/, /wp-login, /wp-login.php, /login/, /signin/, or logged-out /wp-admin, /admin/, /dashboard/ redirect cleanly to home (/).
 * - Preserves admin-ajax.php, admin-post.php, cron, REST API, WooCommerce My Account & Wordfence 2FA.
 */
remove_action('template_redirect', 'wp_redirect_admin_locations', 1000);

function eferz_is_platform_request() {
    $req_path = strtolower(trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/'));
    return ($req_path === 'platform');
}

function eferz_rewrite_login_to_platform($url) {
    if (is_string($url) && strpos($url, 'wp-login.php') !== false) {
        $url = str_replace('wp-login.php', 'platform/', $url);
    }
    return $url;
}
add_filter('site_url', 'eferz_rewrite_login_to_platform', 999);
add_filter('network_site_url', 'eferz_rewrite_login_to_platform', 999);
add_filter('login_url', function($login_url, $redirect = '', $force_reauth = false) {
    return eferz_rewrite_login_to_platform($login_url);
}, 999, 3);
add_filter('wp_redirect', function($location) {
    return eferz_rewrite_login_to_platform($location);
}, 999);

function eferz_attach_platform_branding_hooks() {
    add_filter('login_display_language_dropdown', '__return_false', 999);
    add_filter('login_headerurl', function() {
        return home_url('/');
    }, 999);
    add_filter('login_headertext', function() {
        $logo_url = esc_url(get_template_directory_uri() . '/assets/eferz-nav-logo.webp');
        return '<span class="efp-brand">'
            . '<span class="efp-logo-ring"><img src="' . $logo_url . '" alt="EFerz" width="44" height="44" /></span>'
            . '<span class="efp-wordmark"><strong>EF</strong>ERZ PLATFORM</span>'
            . '<span class="efp-sub">ENCRYPTED EXECUTIVE GATEWAY</span>'
            . '</span>';
    }, 999);
    add_filter('login_title', function($login_title, $title = '') {
        return 'EFerz Platform — Secure Access Gateway';
    }, 999, 2);
    add_filter('login_body_class', function($classes) {
        $classes[] = 'eferz-platform-login';
        return $classes;
    }, 999);
    $ef_translate_login = function($translated, $text, $domain_or_ctx = 'default', $domain = null) {
        $dom = ($domain !== null) ? $domain : $domain_or_ctx;
        if ($dom !== 'default' && $dom !== '') {
            return $translated;
        }
        $map = array(
            'Username or Email Address' => 'Authorized ID or Email',
            'Username'                  => 'Authorized ID',
            'Password'                  => 'Security Passkey',
            'Log In'                    => 'Access Platform',
            'Remember Me'               => 'Keep session active',
            'Lost your password?'       => 'Recover access?',
            'Get New Password'          => 'Send Recovery Link',
            '&larr; Go to %s'           => '&larr; Return to EFerz',
            'Go to %s'                  => 'Return to EFerz',
        );
        if (isset($map[$text])) {
            return $map[$text];
        }
        if (stripos($translated, 'WordPress') !== false) {
            $translated = str_ireplace('WordPress', 'EFerz Platform', $translated);
        }
        return $translated;
    };
    add_filter('gettext', $ef_translate_login, 999, 3);
    add_filter('gettext_with_context', $ef_translate_login, 999, 4);

    add_action('login_head', function() {
        $favicon = esc_url(get_template_directory_uri() . '/assets/eferz-logo.png');
        ?>
        <link rel="icon" type="image/png" href="<?php echo $favicon; ?>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" />
        <style id="eferz-platform-login-css">
          :root {
            --ef-bg: #0c0d12;
            --ef-card: rgba(13, 15, 24, 0.84);
            --ef-border: rgba(255, 255, 255, 0.16);
            --ef-red: #d02128;
            --ef-red-bright: #ec3935;
            --ef-text: #fffdff;
            --ef-muted: rgba(255, 253, 255, 0.62);
          }
          html, body.eferz-platform-login {
            min-height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            background: var(--ef-bg) !important;
            background-image:
              radial-gradient(circle at 75% 22%, rgba(208, 33, 40, 0.22) 0%, rgba(208, 33, 40, 0.05) 30%, transparent 60%),
              radial-gradient(circle at 20% 82%, rgba(56, 189, 248, 0.08) 0%, transparent 48%),
              linear-gradient(rgba(255, 255, 255, 0.024) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.024) 1px, transparent 1px) !important;
            background-size: auto, auto, 44px 44px, 44px 44px !important;
            color: var(--ef-text) !important;
            font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }
          body.eferz-platform-login #login {
            width: 100% !important;
            max-width: 430px !important;
            padding: 28px 18px !important;
            margin: auto !important;
            box-sizing: border-box !important;
          }
          body.eferz-platform-login #login h1 {
            margin: 0 0 22px !important;
            text-align: center !important;
          }
          body.eferz-platform-login #login h1 a {
            background-image: none !important;
            width: auto !important;
            height: auto !important;
            text-indent: 0 !important;
            overflow: visible !important;
            display: inline-flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-decoration: none !important;
            margin: 0 auto !important;
            outline: none !important;
            box-shadow: none !important;
          }
          .efp-brand {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          .efp-logo-ring {
            width: 68px;
            height: 68px;
            border-radius: 20px;
            background: rgba(15, 17, 26, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.75), 0 0 32px rgba(208, 33, 40, 0.24), inset 0 1px 1px rgba(255, 255, 255, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .efp-logo-ring img {
            width: 42px;
            height: 42px;
            object-fit: contain;
            display: block;
          }
          .efp-wordmark {
            font-family: "Outfit", sans-serif;
            font-size: 20px;
            font-weight: 900;
            letter-spacing: 0.22em;
            color: #fffdff;
            line-height: 1.1;
          }
          .efp-wordmark strong {
            color: var(--ef-red-bright);
            font-weight: 900;
          }
          .efp-sub {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 12px;
            border-radius: 999px;
            background: rgba(208, 33, 40, 0.14);
            border: 1px solid rgba(208, 33, 40, 0.38);
            font-family: "JetBrains Mono", monospace;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.18em;
            color: rgba(255, 253, 255, 0.9);
          }
          body.eferz-platform-login #login form {
            position: relative !important;
            margin: 0 !important;
            padding: 28px 26px 26px !important;
            background: var(--ef-card) !important;
            backdrop-filter: blur(28px) !important;
            -webkit-backdrop-filter: blur(28px) !important;
            border: 1px solid var(--ef-border) !important;
            border-radius: 22px !important;
            box-shadow: 0 30px 90px rgba(0, 0, 0, 0.82), inset 0 1px 1px rgba(255, 255, 255, 0.22) !important;
          }
          body.eferz-platform-login #login form::before {
            content: "";
            position: absolute;
            top: 0;
            left: 28px;
            right: 28px;
            height: 1.5px;
            background: linear-gradient(90deg, transparent, var(--ef-red-bright), transparent);
          }
          body.eferz-platform-login #login form label {
            display: block !important;
            margin-bottom: 7px !important;
            font-family: "JetBrains Mono", monospace !important;
            font-size: 11px !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.14em !important;
            color: rgba(255, 253, 255, 0.78) !important;
          }
          body.eferz-platform-login #login form .input,
          body.eferz-platform-login #login form input[type="text"],
          body.eferz-platform-login #login form input[type="password"],
          body.eferz-platform-login #login form input[type="email"] {
            background: rgba(5, 7, 12, 0.72) !important;
            border: 1px solid rgba(255, 255, 255, 0.18) !important;
            border-radius: 12px !important;
            color: #fffdff !important;
            font-family: "Plus Jakarta Sans", sans-serif !important;
            font-size: 15px !important;
            padding: 11px 14px !important;
            min-height: 46px !important;
            box-shadow: none !important;
            transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
          }
          body.eferz-platform-login #login form .input:focus,
          body.eferz-platform-login #login form input[type="text"]:focus,
          body.eferz-platform-login #login form input[type="password"]:focus,
          body.eferz-platform-login #login form input[type="email"]:focus {
            border-color: var(--ef-red-bright) !important;
            box-shadow: 0 0 0 3px rgba(236, 57, 53, 0.22) !important;
            outline: none !important;
          }
          body.eferz-platform-login .wp-pwd .button.wp-hide-pw {
            top: 4px !important;
            right: 4px !important;
            height: 38px !important;
            color: rgba(255, 253, 255, 0.65) !important;
            background: transparent !important;
            border: none !important;
          }
          body.eferz-platform-login .wp-pwd .button.wp-hide-pw:hover {
            color: #fffdff !important;
          }
          body.eferz-platform-login .forgetmenot {
            float: none !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            margin: 6px 0 18px !important;
          }
          body.eferz-platform-login .forgetmenot label {
            display: inline-flex !important;
            align-items: center !important;
            gap: 8px !important;
            margin: 0 !important;
            text-transform: none !important;
            letter-spacing: 0.02em !important;
            font-family: "Plus Jakarta Sans", sans-serif !important;
            font-size: 13px !important;
            font-weight: 500 !important;
            color: var(--ef-muted) !important;
            cursor: pointer !important;
          }
          body.eferz-platform-login input[type="checkbox"] {
            background: rgba(5, 7, 12, 0.8) !important;
            border: 1px solid rgba(255, 255, 255, 0.28) !important;
            border-radius: 5px !important;
            accent-color: var(--ef-red-bright) !important;
          }
          body.eferz-platform-login #login form p.submit {
            margin: 0 !important;
            padding: 0 !important;
          }
          body.eferz-platform-login #wp-submit {
            width: 100% !important;
            float: none !important;
            min-height: 46px !important;
            border-radius: 12px !important;
            border: none !important;
            background: linear-gradient(135deg, #d02128 0%, #ec3935 100%) !important;
            color: #fffdff !important;
            font-family: "JetBrains Mono", monospace !important;
            font-size: 12px !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.18em !important;
            box-shadow: 0 12px 30px rgba(208, 33, 40, 0.42) !important;
            cursor: pointer !important;
            transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease !important;
          }
          body.eferz-platform-login #wp-submit:hover {
            transform: translateY(-1px);
            box-shadow: 0 16px 36px rgba(236, 57, 53, 0.55) !important;
            filter: brightness(1.06);
          }
          body.eferz-platform-login #login #login_error,
          body.eferz-platform-login #login .message,
          body.eferz-platform-login #login .success {
            background: rgba(13, 15, 24, 0.88) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.16) !important;
            border-left: 3px solid var(--ef-red-bright) !important;
            border-radius: 14px !important;
            color: rgba(255, 253, 255, 0.92) !important;
            padding: 13px 16px !important;
            margin: 0 0 16px !important;
            font-size: 13px !important;
            box-shadow: 0 14px 40px rgba(0, 0, 0, 0.55) !important;
          }
          body.eferz-platform-login #login .message a,
          body.eferz-platform-login #login #login_error a {
            color: #ff6b67 !important;
          }
          body.eferz-platform-login #nav,
          body.eferz-platform-login #backtoblog {
            margin: 14px 0 0 !important;
            padding: 0 4px !important;
            text-align: center !important;
            font-family: "JetBrains Mono", monospace !important;
            font-size: 11px !important;
          }
          body.eferz-platform-login #nav a,
          body.eferz-platform-login #backtoblog a {
            color: var(--ef-muted) !important;
            text-decoration: none !important;
            transition: color 0.18s ease !important;
          }
          body.eferz-platform-login #nav a:hover,
          body.eferz-platform-login #backtoblog a:hover {
            color: #fffdff !important;
          }
          body.eferz-platform-login .privacy-policy-page-link {
            display: none !important;
          }
          /* Wordfence 2FA dark styling */
          body.eferz-platform-login #wfls-prompt-overlay,
          body.eferz-platform-login .wfls-prompt {
            background: var(--ef-card) !important;
            color: var(--ef-text) !important;
            border-color: var(--ef-border) !important;
          }
          .efp-footer-note {
            margin-top: 22px;
            text-align: center;
            font-family: "JetBrains Mono", monospace;
            font-size: 10px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(255, 253, 255, 0.42);
          }
        </style>
        <?php
    }, 999);

    add_action('login_footer', function() {
        ?>
        <p class="efp-footer-note">&copy; <?php echo esc_html(date('Y')); ?> EFerz &bull; Encrypted Platform Gateway</p>
        <?php
    }, 999);
}

add_action('init', function() {
    if (wp_doing_ajax() || wp_doing_cron() || (defined('REST_REQUEST') && REST_REQUEST)) {
        return;
    }

    // 1. Handle /platform backend login doorway
    if (eferz_is_platform_request()) {
        if (!defined('DONOTCACHEPAGE')) {
            define('DONOTCACHEPAGE', true);
        }
        nocache_headers();
        if (!headers_sent()) {
            header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0', true);
            header('X-Robots-Tag: noindex, nofollow', true);
        }
        $action_param = isset($_REQUEST['action']) ? sanitize_text_field(wp_unslash($_REQUEST['action'])) : '';
        $is_reauth = !empty($_GET['reauth']);
        if (is_user_logged_in() && $_SERVER['REQUEST_METHOD'] === 'GET' && empty($action_param) && !$is_reauth) {
            wp_safe_redirect(admin_url());
            exit;
        }
        if (!defined('EFERZ_PLATFORM_LOGIN_GATE')) {
            define('EFERZ_PLATFORM_LOGIN_GATE', true);
        }
        eferz_attach_platform_branding_hooks();
        global $pagenow, $wpdb, $wp_locale, $error, $interim_login, $action, $user_login, $errors, $redirect_to, $reauth, $rememberme, $user, $wp_version, $shake_error_codes, $message, $http_post;
        $pagenow = 'wp-login.php';
        require ABSPATH . 'wp-login.php';
        exit;
    }

    // 2. Redirect /wp-login/, /wp-login, /wp-login.php, /login/, /signin/, and logged-out /wp-admin, /admin, /dashboard cleanly to homepage (/)
    $req_path = strtolower(trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/'));
    if (preg_match('#^(wp-login(\.php)?|login|signin|wp-register(\.php)?)(/|$)#i', $req_path)) {
        nocache_headers();
        wp_safe_redirect(home_url('/'), 302);
        exit;
    }
    if ((is_admin() || preg_match('#^(wp-admin|admin|dashboard)(/|$)#i', $req_path)) && !is_user_logged_in()) {
        $script = basename(parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH));
        if (!in_array($script, array('admin-ajax.php', 'admin-post.php'), true)) {
            nocache_headers();
            wp_safe_redirect(home_url('/'), 302);
            exit;
        }
    }
}, 1);

// 3. Block direct access to /wp-login.php unless routed internally through /platform
add_action('login_init', function() {
    if (!defined('EFERZ_PLATFORM_LOGIN_GATE')) {
        nocache_headers();
        wp_safe_redirect(home_url('/'), 302);
        exit;
    }
}, 1);
