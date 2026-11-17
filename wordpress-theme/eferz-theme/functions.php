<?php
/**
 * EFerz Digital Studio - Theme Functions and Definitions
 *
 * @package EFerz
 * @version 1.1.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * GitHub Automatic Theme Update Support Header
 * Used by 'GitHub Theme Updater' & 'WP Pusher'
 */
define('EFERZ_THEME_VERSION', '1.2.4');

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
        header("Content-Security-Policy: upgrade-insecure-requests; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' https://checkout.stripe.com https://js.stripe.com https://hooks.stripe.com;");
        header('Permissions-Policy: camera=(self), microphone=(self), geolocation=(), payment=(self "https://js.stripe.com" "https://checkout.stripe.com" "https://pay.google.com")');
        if (is_ssl()) {
            header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
        }
    }
}
add_action('send_headers', 'eferz_send_security_headers', 999);

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

    $wc_or_wp_reserved = array('shop', 'cart', 'checkout', 'my-account', 'product', 'product-category', 'product-tag', 'order-pay', 'order-received', 'wp-json', 'wc-api', 'wp-login.php', 'wp-admin', 'wp-content', 'wp-includes', 'feed');
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

    // Route friendly unknown SPA paths to SPA, but avoid catching missing static files
    if (is_404() && !preg_match('/\.(css|js|map|png|jpg|jpeg|webp|gif|svg|woff2?|ttf|ico|xml|txt|json)$/i', $req_path)) {
        return true;
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
            'desc' => 'Explore 17+ verified EFerz case studies across desktop, tablet & mobile — 3D WebGL apps, Shopify Plus stores, SaaS & AI automation. View live results.',
            'descAr' => 'تصفح أكثر من 17 مشروعاً موثقاً من إيفرز على الكمبيوتر والتابلت والجوال — تطبيقات ثلاثية الأبعاد، متاجر شوبيفاي ومنصات ذكاء اصطناعي. شاهد النتائج.',
            'keywords' => 'Web Design Portfolio, E-Commerce Case Studies, 3D Interactive Website Showcase, UI UX Design Case Studies, Shopify & WordPress Portfolio, Enterprise Software Projects',
            'slug' => 'work',
        ),
        'clients' => array(
            'title' => 'Verified Client Reviews & Global Case Studies | EFerz',
            'titleAr' => 'آراء العملاء العالميين وقصص النجاح | وكالة إيفرز',
            'desc' => 'Headquartered in Florida USA with offices in Riyadh & Pakistan, EFerz delivers 98% client retention across AI, web & growth. Read CEO testimonials.',
            'descAr' => 'مقرنا في أمريكا مع مكاتب في الرياض وباكستان بنسبة احتفاظ 98% في الذكاء الاصطناعي والويب والتسويق الرقمي. اقرأ شهادات المؤسسين والعملاء.',
            'keywords' => 'EFerz Client Reviews, Verified Digital Agency Testimonials, Enterprise Software Client Stories, Top Rated Web & AI Agency USA KSA Pakistan Worldwide',
            'slug' => 'clients',
        ),
        'team' => array(
            'title' => 'Leadership & Principal Software Architects | EFerz',
            'titleAr' => 'فريق القيادة ومهندسو البرمجيات والذكاء | إيفرز',
            'desc' => 'Meet EFerz leadership: Khubaib Khan, Salman Shahid, Irfan Mirza & principal WebGL, AI and cybersecurity architects across USA, KSA & Pakistan.',
            'descAr' => 'تعرف على قيادة وكالة إيفرز: خبيب خان، سلمان شاهد، عرفان مرزا وفريق مهندسي الذكاء الاصطناعي والويب والأمن السيبراني. تواصل مع فريقنا الآن.',
            'keywords' => 'EFerz Leadership Team, Khubaib Khan EFerz, Salman Shahid EFerz, Irfan Mirza EFerz, Principal Software Architects, AI & WebGL Engineers',
            'slug' => 'team',
        ),
        'about' => array(
            'title' => 'About EFerz | Global AI & Tech Agency (USA · KSA · PAK)',
            'titleAr' => 'عن إيفرز | شركة تقنية عالمية منذ 2020',
            'desc' => 'Founded in 2020 in Fort Lauderdale USA with Riyadh & Karachi offices, EFerz engineers scalable AI, WebGL & cloud systems. Learn how we build.',
            'descAr' => 'تأسست إيفرز في عام 2020 في أمريكا مع مكاتب في الرياض وكراتشي لبناء أنظمة الذكاء الاصطناعي ومواقع WebGL والحوسبة السحابية. اكتشف قصتنا.',
            'keywords' => 'About EFerz, Founded in 2020, Global IT & AI Company USA KSA PAK, Software Agency Mission & Core Pillars',
            'slug' => 'about',
        ),
        'blog' => array(
            'title' => 'Engineering, AI, SEO & WebGL Blog Playbooks | EFerz',
            'titleAr' => 'مدونة الهندسة والذكاء الاصطناعي والسيو | إيفرز',
            'desc' => 'Read technical guides from EFerz engineers on LLMs, 3D WebGL performance, Core Web Vitals, technical SEO & Shopify conversion optimization. Explore now.',
            'descAr' => 'اقرأ أدلة هندسية من خبراء إيفرز حول الذكاء الاصطناعي، أداء مواقع WebGL، مؤشرات Core Web Vitals وتحسين محركات البحث سيو. تصفح المقالات الآن.',
            'keywords' => 'AI Engineering Blog, 3D WebGL & Next.js Performance Guide, Technical SEO Playbook, Shopify Plus Conversion Optimization, Enterprise Cybersecurity Best Practices',
            'slug' => 'blog',
        ),
        'contact' => array(
            'title' => 'Contact EFerz | Start Your AI or Web Project Today',
            'titleAr' => 'تواصل مع إيفرز | ابدأ مشروعك الرقمي اليوم',
            'desc' => 'Launch your AI, software, e-commerce or SEO project with EFerz. Connect with our Fort Lauderdale USA, Riyadh KSA & Pakistan teams for a free quote.',
            'descAr' => 'أطلق مشروعك في الذكاء الاصطناعي أو الويب أو المتاجر الإلكترونية مع إيفرز. تواصل مع مكاتبنا في أمريكا والرياض وباكستان للحصول على استشارة مجانية.',
            'keywords' => 'Contact EFerz, Hire Web & AI Developers USA KSA, Request Software Development Proposal, Riyadh & Florida IT Consultation',
            'slug' => 'contact',
        ),
        'lets-build' => array(
            'title' => 'Let’s Build 3D Studio | Interactive WebGL Configurator',
            'titleAr' => 'استوديو البناء ثلاثي الأبعاد التفاعلي | إيفرز',
            'desc' => 'Customize a live 3D WebGL brand experience with your logo, colors & packaging inside the EFerz Interactive 3D Studio. Try the real-time demo.',
            'descAr' => 'صمم تجربة موقع ثلاثية الأبعاد حية بشعارك وألوان علامتك ومنتجاتك داخل استوديو إيفرز التفاعلي في الوقت الفعلي. جرّب العرض المباشر الآن.',
            'keywords' => 'Interactive 3D Website Builder, Live WebGL Product Customizer, 3D Beverage Can & Packaging Configurator, EFerz 3D Studio Demo',
            'slug' => 'lets-build',
        ),
        'privacy' => array(
            'title' => 'Privacy Policy & Data Protection Standards | EFerz',
            'titleAr' => 'سياسة الخصوصية وحماية البيانات | إيفرز',
            'desc' => 'Review EFerz privacy policy covering GDPR, CCPA compliance, enterprise encryption & client confidentiality. Read our data practices.',
            'descAr' => 'اطلع على سياسة الخصوصية الرسمية في إيفرز ومعايير الامتثال GDPR والتشفير وحماية سرية بيانات العملاء. اقرأ التفاصيل كاملة.',
            'keywords' => 'EFerz Privacy Policy, GDPR CCPA Data Protection, Client Confidentiality & Security',
            'slug' => 'privacy',
        ),
        'terms' => array(
            'title' => 'Terms of Service & Enterprise SLA Terms | EFerz',
            'titleAr' => 'شروط الخدمة واتفاقية العملاء | إيفرز',
            'desc' => 'Read EFerz Terms of Service, 100% client IP ownership, milestone billing & SLA commitments for software projects. View terms.',
            'descAr' => 'اقرأ شروط الخدمة واتفاقية مستوى الخدمة وضمان نقل الملكية الفكرية بنسبة 100% لمشاريع البرمجة والتصميم في إيفرز. تصفح الشروط الآن.',
            'keywords' => 'EFerz Terms of Service, 100% IP Ownership Software Agreement, Digital Agency SLA Terms',
            'slug' => 'terms',
        ),
        'refund' => array(
            'title' => 'Refund Policy & 30-Day Project Guarantee | EFerz',
            'titleAr' => 'سياسة الاسترداد وضمان 30 يوماً | إيفرز',
            'desc' => 'Explore EFerz 30-Day Money-Back Guarantee and milestone approval policy for risk-free digital & software delivery. Learn more.',
            'descAr' => 'تعرف على سياسة الاسترداد وضمان الرضا لمدة 30 يوماً واعتماد مراحل التسليم الآمن للمشاريع مع إيفرز. اطلع على التفاصيل الآن.',
            'keywords' => 'EFerz Refund Policy, 30 Day Money Back Guarantee Agency, Risk Free Software Development',
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

    if (!$sms_consent) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Please confirm the SMS, WhatsApp & phone call communication consent checkbox before submitting.',
        ), 400);
    }

    // 4. Store Submission in WordPress Database (so ZERO leads are ever lost!)
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
        'sms_consent' => $sms_consent ? 'Opted In (SMS/WhatsApp/Call)' : 'No',
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
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>SMS / Call Consent:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #10b981;">' . esc_html($sms_consent ? 'Opted In (SMS, WhatsApp & Phone Updates — Reply STOP to opt out)' : 'Not Provided') . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Company / Brand:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #ffffff;">' . esc_html($company ?: 'N/A') . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Primary Service:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #f59e0b;">' . esc_html($service) . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Project Brief:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #ffffff; white-space: pre-wrap;">' . esc_html($message) . '</td></tr>
            <tr><td style="padding: 10px; color: #94a3b8;"><strong>Submitted At:</strong></td><td style="padding: 10px; color: #94a3b8;">' . esc_html(current_time('mysql')) . ' (' . esc_html($source) . ')</td></tr>
        </table>
    </div>';

    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
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
 * Serve RFC 9116 /.well-known/security.txt & prevent demo/test WooCommerce products from indexing
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
}, 1);

add_filter('wp_robots', function($robots) {
    $req_path = strtolower(trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/'));
    if (strpos($req_path, 'demo-payment') !== false || strpos($req_path, 'test-payment') !== false) {
        $robots['noindex'] = true;
        $robots['nofollow'] = true;
        unset($robots['index'], $robots['follow']);
    }
    return $robots;
}, 999);
