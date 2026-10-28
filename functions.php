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
    // Google Fonts
    wp_enqueue_style(
        'eferz-google-fonts',
        'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    // Main Theme CSS
    wp_enqueue_style(
        'eferz-main-css',
        get_template_directory_uri() . '/assets/css/eferz-main.css',
        array(),
        EFERZ_THEME_VERSION
    );

    // Three.js r128 Library for 3D Particle & Morphing Canvas
    wp_enqueue_script(
        'threejs',
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
        array(),
        'r128',
        true
    );

    // EFerz Interactive 3D & UI Bundle
    wp_enqueue_script(
        'eferz-interactive-js',
        get_template_directory_uri() . '/assets/js/eferz-interactive.js',
        array('threejs'),
        EFERZ_THEME_VERSION,
        true
    );

    // Localize data for AJAX or interactive state
    wp_localize_script('eferz-interactive-js', 'eferzData', array(
        'siteUrl'   => site_url(),
        'themeUrl'  => get_template_directory_uri(),
        'brandName' => get_bloginfo('name'),
        'ajaxUrl'   => admin_url('admin-ajax.php'),
    ));
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
 * Force front-page.php on Front Page
 * Prevents Elementor / Page Builders from overriding the flagship 3D theme layout
 */
add_filter('template_include', function($template) {
    if (is_front_page()) {
        $front = get_template_directory() . '/front-page.php';
        if (file_exists($front)) {
            return $front;
        }
    }
    return $template;
}, 999999);

