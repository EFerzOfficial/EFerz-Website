<?php
/**
 * EFerz Theme Header (Inner WordPress, WooCommerce & Elementor Pages)
 * Matches the main React flagship floating specular glass navigation bar.
 *
 * @package EFerz
 * @version 1.2.6
 */
?><!doctype html>
<html <?php language_attributes(); ?> class="theme-galaxy">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta name="gridinsoft-key" content="xnorbyqh3wl9pijfl4bxh2vkwqjlmgqnsrouypv13vqcyzowsgldgqp1qprbcwqm" />
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <link rel="icon" type="image/png" href="<?php echo esc_url(get_template_directory_uri() . '/assets/eferz-logo.png'); ?>">
    <style>html,body{background-color:#06070c;color:#fffdff;}</style>
    <?php wp_head(); ?>
</head>
<body <?php body_class('eferz-wp-body'); ?>>
<?php wp_body_open(); ?>

<header id="eferz-header" class="eferz-wp-header">
    <div class="eferz-wp-header-inner">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="eferz-wp-brand" aria-label="EFerz Home">
            <span class="eferz-wp-brand-logo-wrap">
                <img
                    src="<?php echo esc_url(get_template_directory_uri() . '/assets/eferz-logo.png'); ?>"
                    alt="EFerz Logo"
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
                <span class="eferz-wp-brand-sub">Nothing Is Impossible</span>
            </span>
        </a>

        <nav class="eferz-wp-nav" aria-label="<?php esc_attr_e('Primary Navigation', 'eferz'); ?>">
            <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
            <a href="<?php echo esc_url(home_url('/services')); ?>">Services</a>
            <a href="<?php echo esc_url(home_url('/work')); ?>">Work</a>
            <a href="<?php echo esc_url(home_url('/clients')); ?>">Clients</a>
            <a href="<?php echo esc_url(home_url('/team')); ?>">Team</a>
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
    </div>
</header>

<div id="eferz-mobile-nav-drawer" class="eferz-wp-drawer" aria-hidden="true">
    <div class="eferz-wp-drawer-top">
        <div class="eferz-wp-brand">
            <span class="eferz-wp-brand-logo-wrap eferz-wp-brand-logo-wrap--sm">
                <img
                    src="<?php echo esc_url(get_template_directory_uri() . '/assets/eferz-logo.png'); ?>"
                    alt="EFerz Logo"
                    width="28"
                    height="28"
                    class="eferz-wp-logo-img skip-lazy no-lazy"
                    data-no-lazy="1"
                    loading="eager"
                />
            </span>
            <span class="eferz-wp-brand-name">EFERZ</span>
        </div>
        <button id="eferz-mobile-menu-close" type="button" aria-label="<?php esc_attr_e('Close Menu', 'eferz'); ?>" class="eferz-wp-drawer-close">&times;</button>
    </div>
    <nav class="eferz-wp-drawer-links" aria-label="<?php esc_attr_e('Mobile Navigation', 'eferz'); ?>">
        <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
        <a href="<?php echo esc_url(home_url('/services')); ?>">Services</a>
        <a href="<?php echo esc_url(home_url('/work')); ?>">Selected Work</a>
        <a href="<?php echo esc_url(home_url('/clients')); ?>">Clients</a>
        <a href="<?php echo esc_url(home_url('/team')); ?>">Leadership Team</a>
        <a href="<?php echo esc_url(home_url('/about')); ?>">About EFerz</a>
        <a href="<?php echo esc_url(home_url('/contact')); ?>" class="is-accent">Start a Project &rarr;</a>
    </nav>
    <div class="eferz-wp-drawer-meta">
        &copy; <?php echo esc_html(date('Y')); ?> EFerz &bull; USA &bull; KSA &bull; PAK
    </div>
</div>
