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
        return 'Effort Digital Agency - Cinematic 3D Web Experience';
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
}
add_action('after_setup_theme', 'eferz_theme_setup');

/**
 * Enqueue scripts and styles.
 */
function eferz_theme_scripts() {
    // React app assets are loaded directly in front-page.php
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


