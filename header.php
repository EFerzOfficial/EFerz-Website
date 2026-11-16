<?php
/**
 * EFerz Theme Header (Inner WordPress, WooCommerce & Elementor Pages)
 * Always renders the clean EFerz obsidian studio header (never overridden by old Elementor headers).
 *
 * @package EFerz
 * @version 1.2.2
 */
?><!doctype html>
<html <?php language_attributes(); ?> class="theme-galaxy">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <link rel="icon" type="image/png" href="<?php echo esc_url(get_template_directory_uri() . '/assets/eferz-logo.png'); ?>">
    <?php wp_head(); ?>
</head>
<body <?php body_class('eferz-wp-body'); ?>>
<?php wp_body_open(); ?>

<header id="eferz-header" class="eferz-wp-header">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="eferz-wp-brand" aria-label="EFerz Digital Agency Home">
        <span class="eferz-wp-brand-logo-wrap">
            <img
                src="<?php echo esc_url(get_template_directory_uri() . '/assets/eferz-logo.png'); ?>"
                alt="EFerz Digital Agency Logo"
                width="34"
                height="34"
                class="eferz-wp-logo-img skip-lazy no-lazy"
                data-no-lazy="1"
                loading="eager"
                decoding="sync"
            />
        </span>
        <span class="eferz-wp-brand-text">
            <span class="eferz-wp-brand-name">EFERZ</span>
            <span class="eferz-wp-brand-sub">Digital Agency</span>
        </span>
    </a>

    <nav class="eferz-wp-nav" aria-label="<?php esc_attr_e('Primary Navigation', 'eferz'); ?>">
        <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
        <a href="<?php echo esc_url(home_url('/services')); ?>">Services</a>
        <a href="<?php echo esc_url(home_url('/work')); ?>">Work</a>
        <a href="<?php echo esc_url(home_url('/about')); ?>">About</a>
        <a href="<?php echo esc_url(home_url('/contact')); ?>">Contact</a>
    </nav>

    <div class="eferz-wp-header-actions">
        <a href="<?php echo esc_url(home_url('/contact')); ?>" class="eferz-wp-cta">
            <span>Start a Project</span>
            <span aria-hidden="true">&rarr;</span>
        </a>
        <button id="eferz-mobile-menu-toggle" type="button" aria-label="<?php esc_attr_e('Toggle Menu', 'eferz'); ?>" aria-expanded="false" class="eferz-wp-menu-toggle">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>
</header>

<div id="eferz-mobile-nav-drawer" class="eferz-wp-drawer" aria-hidden="true">
    <div class="eferz-wp-drawer-top">
        <span class="eferz-wp-brand-name">EFERZ DIGITAL AGENCY</span>
        <button id="eferz-mobile-menu-close" type="button" aria-label="<?php esc_attr_e('Close Menu', 'eferz'); ?>" class="eferz-wp-drawer-close">&times;</button>
    </div>
    <nav class="eferz-wp-drawer-links" aria-label="<?php esc_attr_e('Mobile Navigation', 'eferz'); ?>">
        <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
        <a href="<?php echo esc_url(home_url('/services')); ?>">Services</a>
        <a href="<?php echo esc_url(home_url('/work')); ?>">Selected Work</a>
        <a href="<?php echo esc_url(home_url('/about')); ?>">About Studio</a>
        <a href="<?php echo esc_url(home_url('/contact')); ?>" class="is-accent">Start a Project &rarr;</a>
    </nav>
    <div class="eferz-wp-drawer-meta">
        &copy; <?php echo esc_html(date('Y')); ?> EFerz Digital Agency &bull; USA &bull; KSA &bull; PAK
    </div>
</div>
