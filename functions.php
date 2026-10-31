<?php
/**
 * EFerz Digital Studio - Theme Functions and Definitions
 *
 * @package EFerz
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * GitHub Automatic Theme Update Support Header
 * Used by 'GitHub Theme Updater' & 'WP Pusher'
 */
define('EFERZ_THEME_VERSION', '1.0.0');

function eferz_theme_setup() {
    // Let WordPress manage the document title (Yoast SEO compatible)
    add_theme_support('title-tag');

    // Force exact requested document title
    add_filter('pre_get_document_title', function($title) {
        return 'EFerz Digital Agency — Nothing Is Impossible In The IT World';
    }, 999999);

    // Enable Featured Images
    add_theme_support('post-thumbnails');

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

    // Full WooCommerce Support & Product Gallery
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}
add_action('after_setup_theme', 'eferz_theme_setup');

/**
 * Enqueue scripts, styles and WooCommerce luxury dark styling.
 */
function eferz_theme_scripts() {
    // Custom WooCommerce Dark Luxury Styling
    if (function_exists('is_woocommerce') && (is_woocommerce() || is_cart() || is_checkout() || is_account_page())) {
        $custom_wc_css = "
        .woocommerce, .woocommerce-page { color: #fffdff !important; font-family: 'Plus Jakarta Sans', system-ui, sans-serif !important; }
        .woocommerce ul.products li.product { background: rgba(7, 9, 15, 0.88) !important; border: 1px solid rgba(255, 255, 255, 0.12) !important; border-radius: 1.25rem !important; padding: 1.25rem !important; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important; backdrop-filter: blur(16px) !important; text-align: center; }
        .woocommerce ul.products li.product:hover { border-color: #d02128 !important; box-shadow: 0 12px 36px rgba(208, 33, 40, 0.28) !important; transform: translateY(-4px) !important; }
        .woocommerce ul.products li.product .woocommerce-loop-product__title { color: #fffdff !important; font-weight: 800 !important; font-size: 1.15rem !important; margin-top: 0.85rem !important; }
        .woocommerce ul.products li.product .price, .woocommerce div.product p.price, .woocommerce div.product span.price { color: #ff4d49 !important; font-family: 'Space Grotesk', monospace !important; font-weight: 700 !important; font-size: 1.1rem !important; }
        .woocommerce ul.products li.product .button, .woocommerce div.product form.cart .button, .woocommerce #respond input#submit, .woocommerce a.button, .woocommerce button.button, .woocommerce input.button { background: linear-gradient(135deg, #d02128, #ff3b30) !important; color: #ffffff !important; border-radius: 9999px !important; padding: 0.75rem 1.6rem !important; font-family: 'Space Grotesk', monospace !important; font-weight: 700 !important; font-size: 0.8rem !important; text-transform: uppercase !important; letter-spacing: 0.12em !important; border: none !important; transition: all 0.25s ease !important; box-shadow: 0 0 20px rgba(208, 33, 40, 0.45) !important; cursor: pointer !important; }
        .woocommerce ul.products li.product .button:hover, .woocommerce div.product form.cart .button:hover, .woocommerce a.button:hover, .woocommerce button.button:hover, .woocommerce input.button:hover { transform: scale(1.03) !important; box-shadow: 0 0 35px rgba(208, 33, 40, 0.75) !important; }
        .woocommerce-message, .woocommerce-info, .woocommerce-error { background: rgba(7, 9, 15, 0.95) !important; border-radius: 1rem !important; backdrop-filter: blur(20px) !important; color: #fffdff !important; border-left: 4px solid #d02128 !important; }
        .woocommerce-message { border-left-color: #10b981 !important; }
        .woocommerce-info { border-left-color: #38bdf8 !important; }
        .woocommerce input.input-text, .woocommerce select, .woocommerce textarea { background-color: rgba(4, 7, 15, 0.92) !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; border-radius: 0.75rem !important; color: #fffdff !important; padding: 0.75rem 1rem !important; }
        .woocommerce input.input-text:focus, .woocommerce select:focus, .woocommerce textarea:focus { border-color: #d02128 !important; outline: none !important; box-shadow: 0 0 14px rgba(208, 33, 40, 0.45) !important; }
        .woocommerce table.shop_table { background: rgba(7, 9, 15, 0.82) !important; border: 1px solid rgba(255, 255, 255, 0.12) !important; border-radius: 1.25rem !important; overflow: hidden !important; }
        .woocommerce table.shop_table th { color: #fffdff !important; font-family: 'Space Grotesk', monospace !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important; }
        .woocommerce table.shop_table td { border-top: 1px solid rgba(255, 255, 255, 0.08) !important; color: rgba(255, 255, 255, 0.88) !important; }
        #payment { background: rgba(4, 7, 15, 0.96) !important; border: 1px solid rgba(255, 255, 255, 0.15) !important; border-radius: 1.25rem !important; }
        #payment div.payment_box { background: rgba(255, 255, 255, 0.06) !important; color: #fffdff !important; border-radius: 0.75rem !important; }
        ";
        wp_add_inline_style('woocommerce-general', $custom_wc_css);
    }
}
add_action('wp_enqueue_scripts', 'eferz_theme_scripts');

/**
 * Schema.org Organization & WebSite JSON-LD (SEO Best Practices)
 */
function eferz_seo_schema_jsonld() {
    if (is_front_page()) {
        $schema = array(
            '@context'        => 'https://schema.org',
            '@type'           => 'ProfessionalService',
            'name'            => get_bloginfo('name'),
            'alternateName'   => 'EFerz Cinematic 3D Web Studio',
            'url'             => home_url('/'),
            'description'     => get_bloginfo('description'),
            'telephone'       => '+1-800-EFERZ',
            'priceRange'      => '$$$$',
            'knowsAbout'      => array(
                '3D Web Development',
                'Cinematic WebGL Experiences',
                'Interactive Web Design',
                'Next-Gen eCommerce 3D Websites',
                'High-Conversion UI/UX',
            ),
        );
        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
    }
}
add_action('wp_head', 'eferz_seo_schema_jsonld');

/**
 * SPA Routes Support: /services, /work, /clients, /team, /contact, /blog, etc.
 * Ensures visiting https://eferz.com/services loads the React flagship application seamlessly.
 */
function eferz_add_spa_rewrites() {
    $spa_routes = array('services', 'work', 'portfolio', 'clients', 'team', 'contact', 'blog', 'about', 'privacy', 'terms', 'refund', 'lets-build');
    foreach ($spa_routes as $route) {
        add_rewrite_rule('^' . $route . '/?$', 'index.php?eferz_spa_route=' . $route, 'top');
    }
}
add_action('init', 'eferz_add_spa_rewrites');

add_filter('query_vars', function($vars) {
    $vars[] = 'eferz_spa_route';
    return $vars;
});

add_filter('template_include', function($template) {
    $spa_routes = array('services', 'work', 'portfolio', 'clients', 'team', 'contact', 'blog', 'about', 'privacy', 'terms', 'refund', 'lets-build');
    $req_path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $first_seg = explode('/', $req_path)[0] ?? '';

    // Route WooCommerce pages (shop, products, cart, checkout, my-account) to custom luxury template
    $wc_routes = array('shop', 'cart', 'checkout', 'my-account', 'product', 'product-category');
    if (in_array($first_seg, $wc_routes, true) || (function_exists('is_woocommerce') && (is_woocommerce() || is_cart() || is_checkout() || is_account_page()))) {
        $wc_template = get_template_directory() . '/woocommerce.php';
        if (file_exists($wc_template)) {
            return $wc_template;
        }
    }

    if (is_front_page() || in_array($first_seg, $spa_routes, true) || get_query_var('eferz_spa_route') || is_404()) {
        $front = get_template_directory() . '/front-page.php';
        if (file_exists($front)) {
            return $front;
        }
    }
    return $template;
}, 999999);

/**
 * Clean body classes on front page and SPA routes to prevent page-builder stylesheet clashes
 */
add_filter('body_class', function($classes) {
    $spa_routes = array('services', 'work', 'portfolio', 'clients', 'team', 'contact', 'blog', 'about', 'privacy', 'terms', 'refund', 'lets-build');
    $req_path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $first_seg = explode('/', $req_path)[0] ?? '';

    if (is_front_page() || in_array($first_seg, $spa_routes, true)) {
        $classes = array_diff($classes, array(
            'elementor-page-2609',
            'elementor-page-2605',
            'elementor-page-6133'
        ));
        $classes[] = 'eferz-flagship-active';
    }
    return $classes;
}, 999999);


