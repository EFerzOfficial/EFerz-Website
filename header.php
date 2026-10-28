<?php
/**
 * EFerz Theme Header
 *
 * @package EFerz
 * @version 1.0.0
 */
?><!doctype html>
<html <?php language_attributes(); ?> class="theme-galaxy">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- OpenGraph & Social Metadata (SEO Optimized) -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="<?php bloginfo('name'); ?>">
    <meta property="og:title" content="<?php bloginfo('name'); ?> — Cinematic 3D Web Experiences">
    <meta property="og:description" content="We engineer ultra-luxury 3D websites, WebGL shaders, interactive product models and next-generation eCommerce experiences.">
    <meta property="og:url" content="<?php echo esc_url(home_url('/')); ?>">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php bloginfo('name'); ?> — Cinematic 3D Web Studio">
    <meta name="twitter:description" content="We engineer ultra-luxury 3D websites, WebGL shaders, and high-conversion interactive digital products.">
    
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#04070F] text-white font-sans antialiased overflow-x-hidden selection:bg-[#d02128] selection:text-white'); ?>>
<?php wp_body_open(); ?>

<!-- Background 3D Particle & Morphing Canvas -->
<canvas id="particle-canvas-3d" class="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-1000"></canvas>

<!-- Interactive Fluid Cursor Ripple Overlay -->
<div id="fluid-ripple-overlay" class="fixed inset-0 pointer-events-none z-10"></div>

<!-- Top Navigation Header -->
<header id="eferz-header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 flex items-center justify-between backdrop-blur-md bg-[#04070F]/60 border-b border-white/10">
    <div class="flex items-center gap-4">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-2.5 text-white no-underline group">
            <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d02128] to-[#ff4d49] flex items-center justify-center font-bold text-lg text-white shadow-[0_0_20px_rgba(208,33,40,0.6)] group-hover:scale-105 transition-transform">
                E
            </span>
            <div class="flex flex-col">
                <span class="font-extrabold tracking-wider text-base uppercase leading-none">
                    <?php bloginfo('name'); ?>
                </span>
                <span class="text-[9px] font-mono uppercase tracking-[0.22em] text-[#d02128] mt-0.5">
                    STUDIO 2026
                </span>
            </div>
        </a>
    </div>

    <!-- Center Desktop Navigation Links -->
    <nav class="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.18em] text-white/70">
        <a href="#services" class="hover:text-white hover:text-shadow-glow transition-colors">Services</a>
        <a href="#work" class="hover:text-white hover:text-shadow-glow transition-colors">Selected Work</a>
        <a href="#shapes" class="hover:text-white hover:text-shadow-glow transition-colors">3D Shapes</a>
        <a href="#plans" class="hover:text-white hover:text-shadow-glow transition-colors">Plans</a>
        <a href="#about" class="hover:text-white hover:text-shadow-glow transition-colors">About Studio</a>
        <a href="#faq" class="hover:text-white hover:text-shadow-glow transition-colors">FAQ</a>
    </nav>

    <!-- Header Actions (CTA & Mobile Menu Trigger) -->
    <div class="flex items-center gap-3">
        <a href="#contact" class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d02128] hover:bg-[#ff3b42] text-white text-xs font-mono uppercase tracking-[0.16em] font-bold shadow-[0_0_25px_rgba(208,33,40,0.5)] transition-all hover:scale-105">
            <span>Start a Project</span>
            <span>&rarr;</span>
        </a>
        <button id="mobile-menu-toggle" aria-label="Toggle Menu" class="lg:hidden p-2 rounded-xl bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>
</header>

<!-- Mobile Navigation Drawer -->
<div id="mobile-nav-drawer" class="fixed inset-0 z-50 bg-[#04070F]/95 backdrop-blur-2xl flex flex-col justify-between p-8 transform -translate-y-full transition-transform duration-500 lg:hidden">
    <div class="flex items-center justify-between">
        <span class="font-extrabold tracking-wider text-xl uppercase"><?php bloginfo('name'); ?></span>
        <button id="mobile-menu-close" aria-label="Close Menu" class="p-2 text-white/80 hover:text-white text-2xl">
            &times;
        </button>
    </div>
    <div class="flex flex-col gap-6 text-xl font-display font-bold">
        <a href="#services" class="mobile-link text-white/80 hover:text-[#d02128] transition-colors">Services</a>
        <a href="#work" class="mobile-link text-white/80 hover:text-[#d02128] transition-colors">Selected Work</a>
        <a href="#shapes" class="mobile-link text-white/80 hover:text-[#d02128] transition-colors">3D Shapes</a>
        <a href="#plans" class="mobile-link text-white/80 hover:text-[#d02128] transition-colors">Plans & Pricing</a>
        <a href="#about" class="mobile-link text-white/80 hover:text-[#d02128] transition-colors">About Studio</a>
        <a href="#contact" class="mobile-link text-[#d02128] transition-colors">Book a Call &rarr;</a>
    </div>
    <div class="text-xs font-mono text-white/40">
        &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?> &bull; Powered by EFerz
    </div>
</div>
