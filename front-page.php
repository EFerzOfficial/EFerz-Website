<?php
/**
 * EFerz Front Page Template
 *
 * @package EFerz
 * @version 1.0.0
 */

get_header(); ?>

<!-- Background 3D Particle & Morphing Canvas (Self-contained in front-page) -->
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

<main id="primary" class="relative z-10">

    <!-- =========================================================================
         SECTION 01: HERO STAGE
         ========================================================================= -->
    <section id="hero" class="relative min-h-[95vh] flex flex-col justify-center items-center px-6 md:px-12 text-center pt-32 pb-20 overflow-hidden">
        <div class="max-w-5xl mx-auto space-y-8 relative z-10">
            <!-- Hero Pill Badge -->
            <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-white/90 backdrop-blur-xl shadow-[0_0_30px_rgba(208,33,40,0.2)]">
                <span class="w-2 h-2 rounded-full bg-[#d02128] animate-ping"></span>
                <span class="text-[11px] font-mono uppercase tracking-[0.22em]">
                    CINEMATIC 3D WEB EXPERIENCES &bull; 2026 EDITION
                </span>
            </div>

            <!-- Giant Headline -->
            <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.98] uppercase">
                We craft <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#d02128]">3D digital realms</span> that command attention.
            </h1>

            <!-- Subtitle -->
            <p class="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/70 font-light leading-relaxed">
                Bespoke Three.js &amp; WebGL websites, fluid physics, and ultra-high-converting digital experiences engineered for world-class visionary brands.
            </p>

            <!-- CTA Action Row -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a href="#work" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#d02128] hover:bg-[#ff3b42] text-white text-xs font-mono uppercase tracking-[0.18em] font-bold shadow-[0_0_35px_rgba(208,33,40,0.6)] transition-all hover:scale-105">
                    <span>Explore Selected Work</span>
                    <span>&darr;</span>
                </a>
                <a href="#contact" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-white text-xs font-mono uppercase tracking-[0.18em] font-semibold backdrop-blur-xl transition-all hover:border-white/40">
                    <span>Book Discovery Call</span>
                </a>
            </div>

            <!-- Key Agency Metrics Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16 border-t border-white/10 text-left">
                <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                    <div class="text-2xl md:text-3xl font-mono font-bold text-white">140+</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/50 mt-1">Bespoke 3D Sites Built</div>
                </div>
                <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                    <div class="text-2xl md:text-3xl font-mono font-bold text-cyan-400">99.4%</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/50 mt-1">Client Satisfaction</div>
                </div>
                <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                    <div class="text-2xl md:text-3xl font-mono font-bold text-[#ff4d49]">4.2x</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/50 mt-1">Avg Conversion Lift</div>
                </div>
                <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                    <div class="text-2xl md:text-3xl font-mono font-bold text-amber-400">12</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/50 mt-1">Global Web Honors</div>
                </div>
            </div>
        </div>
    </section>

    <!-- =========================================================================
         SECTION 02: INTERACTIVE 3D MORPH SHAPES CONTROLLER
         ========================================================================= -->
    <section id="shapes" class="py-20 px-6 md:px-12 border-t border-white/10 bg-[#04070F]/80 backdrop-blur-xl">
        <div class="max-w-7xl mx-auto space-y-10">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div class="text-xs font-mono uppercase tracking-[0.24em] text-[#d02128] mb-2">01 // REALTIME ENGINE</div>
                    <h2 class="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">Interactive 3D Shapes</h2>
                </div>
                <p class="text-xs font-mono text-white/60 max-w-md">
                    Click any geometric form below to morph the live Three.js particle canvas in realtime. Real physics, particle turbulence, and custom GLSL mathematical geometry.
                </p>
            </div>

            <!-- Shape Triggers Bar -->
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3" id="shape-selectors-container">
                <button type="button" data-shape="e_logo" class="shape-btn active p-4 rounded-2xl bg-white/[0.04] border border-[#d02128] text-white hover:bg-white/[0.08] transition-all text-center group cursor-pointer">
                    <div class="text-lg font-bold font-mono group-hover:scale-110 transition-transform">E</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">Monogram</div>
                </button>
                <button type="button" data-shape="sphere" class="shape-btn p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-center group cursor-pointer">
                    <div class="text-lg font-bold font-mono group-hover:scale-110 transition-transform">&bull;</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">Sphere</div>
                </button>
                <button type="button" data-shape="torus" class="shape-btn p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-center group cursor-pointer">
                    <div class="text-lg font-bold font-mono group-hover:scale-110 transition-transform">&#9678;</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">Torus</div>
                </button>
                <button type="button" data-shape="dna" class="shape-btn p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-center group cursor-pointer">
                    <div class="text-lg font-bold font-mono group-hover:scale-110 transition-transform">&#8776;</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">DNA Helix</div>
                </button>
                <button type="button" data-shape="galaxy" class="shape-btn p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-center group cursor-pointer">
                    <div class="text-lg font-bold font-mono group-hover:scale-110 transition-transform">&#10043;</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">Galaxy</div>
                </button>
                <button type="button" data-shape="cube" class="shape-btn p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-center group cursor-pointer">
                    <div class="text-lg font-bold font-mono group-hover:scale-110 transition-transform">&#9638;</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">Hypercube</div>
                </button>
                <button type="button" data-shape="cylinder" class="shape-btn p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-center group cursor-pointer">
                    <div class="text-lg font-bold font-mono group-hover:scale-110 transition-transform">&#9141;</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">Cylinder</div>
                </button>
                <button type="button" data-shape="pyramid" class="shape-btn p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-center group cursor-pointer">
                    <div class="text-lg font-bold font-mono group-hover:scale-110 transition-transform">&#9650;</div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">Pyramid</div>
                </button>
            </div>
        </div>
    </section>

    <!-- =========================================================================
         SECTION 03: SERVICES BENTO GRID
         ========================================================================= -->
    <section id="services" class="py-24 px-6 md:px-12 border-t border-white/10 relative">
        <div class="max-w-7xl mx-auto space-y-12">
            <div>
                <div class="text-xs font-mono uppercase tracking-[0.24em] text-[#d02128] mb-2">02 // CAPABILITIES</div>
                <h2 class="text-3xl sm:text-5xl font-black uppercase tracking-tight">Full-Spectrum 3D Engineering</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Bento Card 1 -->
                <div class="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#d02128]/50 transition-all duration-300 group">
                    <div class="w-12 h-12 rounded-2xl bg-[#d02128]/15 border border-[#d02128]/30 flex items-center justify-center text-[#d02128] text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                        01
                    </div>
                    <h3 class="text-xl font-bold uppercase mb-3">Immersive WebGL &amp; 3D Websites</h3>
                    <p class="text-sm text-white/65 leading-relaxed">
                        Custom interactive WebGL environments, 60fps Three.js lathe geometry, dynamic physics, and custom GLSL vertex shaders built for unparalleled immersion.
                    </p>
                </div>

                <!-- Bento Card 2 -->
                <div class="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group">
                    <div class="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                        02
                    </div>
                    <h3 class="text-xl font-bold uppercase mb-3">3D E-Commerce &amp; Visualizers</h3>
                    <p class="text-sm text-white/65 leading-relaxed">
                        Allow customers to rotate, customize materials, inspect 360-degree textures, and experience physical products in real-time before buying.
                    </p>
                </div>

                <!-- Bento Card 3 -->
                <div class="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-amber-500/50 transition-all duration-300 group">
                    <div class="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                        03
                    </div>
                    <h3 class="text-xl font-bold uppercase mb-3">Headless Architecture &amp; WordPress</h3>
                    <p class="text-sm text-white/65 leading-relaxed">
                        Lightning-fast decoupled frontends connected to WordPress REST API, WooCommerce, or headless CMS, delivering sub-second load times worldwide.
                    </p>
                </div>

                <!-- Bento Card 4 -->
                <div class="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 transition-all duration-300 group">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                        04
                    </div>
                    <h3 class="text-xl font-bold uppercase mb-3">Cinema-Grade Motion &amp; Audio</h3>
                    <p class="text-sm text-white/65 leading-relaxed">
                        ScrollTrigger timeline choreography, micro-haptic sound design, spatial audio synthesis, and fluid cursor interactions that make every click memorable.
                    </p>
                </div>

                <!-- Bento Card 5 -->
                <div class="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#ff4d49]/50 transition-all duration-300 group">
                    <div class="w-12 h-12 rounded-2xl bg-[#ff4d49]/15 border border-[#ff4d49]/30 flex items-center justify-center text-[#ff4d49] text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                        05
                    </div>
                    <h3 class="text-xl font-bold uppercase mb-3">Enterprise SEO &amp; Rich Schema</h3>
                    <p class="text-sm text-white/65 leading-relaxed">
                        Complete Schema.org structured JSON-LD, Yoast integration, optimized OpenGraph cards, semantic tags, and automated Google indexing optimization.
                    </p>
                </div>

                <!-- Bento Card 6 -->
                <div class="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all duration-300 group">
                    <div class="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                        06
                    </div>
                    <h3 class="text-xl font-bold uppercase mb-3">CI/CD Git Automated Sync</h3>
                    <p class="text-sm text-white/65 leading-relaxed">
                        Continuous deployment with GitHub Webhooks. Update content or styling from any code editor and have your live WordPress site update within seconds.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- =========================================================================
         SECTION 04: SELECTED WORK / PORTFOLIO
         ========================================================================= -->
    <section id="work" class="py-24 px-6 md:px-12 border-t border-white/10 bg-[#020409]">
        <div class="max-w-7xl mx-auto space-y-12">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div class="text-xs font-mono uppercase tracking-[0.24em] text-[#d02128] mb-2">03 // PROVEN EXCELLENCE</div>
                    <h2 class="text-3xl sm:text-5xl font-black uppercase tracking-tight">Selected Flagship Works</h2>
                </div>
                <div class="text-xs font-mono text-white/60">
                    High-conversion 3D platforms that generated millions in recorded revenue.
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Project 1 -->
                <article class="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-rose-400/50 transition-all space-y-4">
                    <div class="aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#4b1d3f] to-[#120510] flex items-center justify-center p-8 relative overflow-hidden group">
                        <span class="text-rose-400 font-serif italic text-4xl group-hover:scale-110 transition-transform">Velora Botanics</span>
                        <span class="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 text-[10px] font-mono text-rose-300 uppercase">3D Skincare</span>
                    </div>
                    <h3 class="text-xl font-bold uppercase">Velora &bull; Organic Botanical Beauty</h3>
                    <p class="text-xs text-white/60 leading-relaxed">
                        8 interactive glass serum bottles with liquid physics, real-time light refraction, and seamless WooCommerce cart integration.
                    </p>
                    <div class="flex items-center gap-2 pt-2 text-[11px] font-mono text-rose-300">
                        <span>+380% Time on Page</span> &bull; <span>$1.4M Sales</span>
                    </div>
                </article>

                <!-- Project 2 -->
                <article class="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#FF5500]/50 transition-all space-y-4">
                    <div class="aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#1a0a00] to-[#0d0400] flex items-center justify-center p-8 relative overflow-hidden group">
                        <span class="text-[#FF5500] font-mono font-black text-4xl group-hover:scale-110 transition-transform">FIZZO SODA</span>
                        <span class="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 text-[10px] font-mono text-orange-300 uppercase">3D Beverage</span>
                    </div>
                    <h3 class="text-xl font-bold uppercase">FIZZO &bull; 6-Stage 3D Can Experience</h3>
                    <p class="text-xs text-white/60 leading-relaxed">
                        Cinematic 3D deep-drawn can manufacturing, interactive glass pour, bubble emission, and interactive variety pack choreography.
                    </p>
                    <div class="flex items-center gap-2 pt-2 text-[11px] font-mono text-[#FF5500]">
                        <span>4.8x Conversion Lift</span> &bull; <span>Webby Honoree</span>
                    </div>
                </article>
            </div>
        </div>
    </section>

    <!-- =========================================================================
         SECTION 05: PLANS & TRANSPARENT PRICING
         ========================================================================= -->
    <section id="plans" class="py-24 px-6 md:px-12 border-t border-white/10 bg-[#04070F]">
        <div class="max-w-7xl mx-auto space-y-12">
            <div class="text-center max-w-2xl mx-auto space-y-3">
                <div class="text-xs font-mono uppercase tracking-[0.24em] text-[#d02128]">04 // INVESTMENT</div>
                <h2 class="text-3xl sm:text-5xl font-black uppercase tracking-tight">Predictable Studio Plans</h2>
                <p class="text-xs font-mono text-white/60">Fixed budgets, guaranteed delivery dates, no hidden fees.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Tier 1 -->
                <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-6">
                    <div>
                        <div class="text-xs font-mono uppercase tracking-wider text-white/50 mb-1">Launch Edition</div>
                        <h3 class="text-2xl font-bold uppercase">Essential 3D</h3>
                        <div class="text-3xl font-mono font-bold text-white mt-4">$4,800</div>
                        <p class="text-xs text-white/60 mt-3">Ideal for visionary startups launching their signature product.</p>
                        <ul class="space-y-2.5 text-xs text-white/70 font-mono mt-6">
                            <li>&check; 1 Bespoke 3D Hero Canvas Model</li>
                            <li>&check; Full Mobile &amp; Desktop 60fps Optimization</li>
                            <li>&check; WordPress &amp; WooCommerce Integration</li>
                            <li>&check; Complete Yoast &amp; Schema SEO Suite</li>
                            <li>&check; 2 Weeks Guaranteed Turnaround</li>
                        </ul>
                    </div>
                    <a href="#contact" class="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-center text-xs font-mono uppercase tracking-wider font-bold transition-colors">
                        Select Essential
                    </a>
                </div>

                <!-- Tier 2 (Highlighted) -->
                <div class="p-8 rounded-3xl bg-white/[0.05] border-2 border-[#d02128] shadow-[0_0_50px_rgba(208,33,40,0.3)] flex flex-col justify-between space-y-6 relative">
                    <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#d02128] text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                        Most Popular
                    </span>
                    <div>
                        <div class="text-xs font-mono uppercase tracking-wider text-[#d02128] mb-1">Flagship Studio</div>
                        <h3 class="text-2xl font-bold uppercase">Cinematic Experience</h3>
                        <div class="text-3xl font-mono font-bold text-white mt-4">$8,500</div>
                        <p class="text-xs text-white/60 mt-3">Full-scale digital flagship with multiple 3D interactive stages.</p>
                        <ul class="space-y-2.5 text-xs text-white/80 font-mono mt-6">
                            <li>&check; Up to 6 Interactive 3D Stages &amp; Morphing</li>
                            <li>&check; Custom 3D Product Configurator &amp; Materials</li>
                            <li>&check; Spatial Sound Design &amp; Fluid Cursor Ripples</li>
                            <li>&check; CI/CD GitHub Automated Push-to-Deploy</li>
                            <li>&check; Multi-Currency &amp; Global CDN Ready</li>
                            <li>&check; 4 Weeks Delivery &amp; 60 Days Support</li>
                        </ul>
                    </div>
                    <a href="#contact" class="w-full py-3.5 rounded-2xl bg-[#d02128] hover:bg-[#ff3b42] text-center text-xs font-mono uppercase tracking-wider font-bold text-white shadow-lg transition-colors">
                        Select Flagship
                    </a>
                </div>

                <!-- Tier 3 -->
                <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-6">
                    <div>
                        <div class="text-xs font-mono uppercase tracking-wider text-white/50 mb-1">Custom Enterprise</div>
                        <h3 class="text-2xl font-bold uppercase">Bespoke Ecosystem</h3>
                        <div class="text-3xl font-mono font-bold text-cyan-400 mt-4">$16,000+</div>
                        <p class="text-xs text-white/60 mt-3">For enterprise brands requiring complex WebGL shaders &amp; custom software.</p>
                        <ul class="space-y-2.5 text-xs text-white/70 font-mono mt-6">
                            <li>&check; Unlimited Custom 3D Assets &amp; Rigged Animations</li>
                            <li>&check; Dedicated Headless Microservices &amp; API</li>
                            <li>&check; Custom GLSL Shader Post-Processing Effects</li>
                            <li>&check; Dedicated Senior Technical Lead</li>
                            <li>&check; 24/7 Priority SLA &amp; Maintenance</li>
                        </ul>
                    </div>
                    <a href="#contact" class="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-center text-xs font-mono uppercase tracking-wider font-bold transition-colors">
                        Inquire Enterprise
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- =========================================================================
         SECTION 06: FREQUENTLY ASKED QUESTIONS (SEO FAQ ACCORDION)
         ========================================================================= -->
    <section id="faq" class="py-24 px-6 md:px-12 border-t border-white/10 bg-[#020409]">
        <div class="max-w-4xl mx-auto space-y-10">
            <div class="text-center space-y-2">
                <div class="text-xs font-mono uppercase tracking-[0.24em] text-[#d02128]">05 // CLARITY</div>
                <h2 class="text-3xl sm:text-4xl font-extrabold uppercase">Frequently Answered Questions</h2>
            </div>

            <div class="space-y-4">
                <details class="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 cursor-pointer">
                    <summary class="flex items-center justify-between font-bold text-base text-white list-none">
                        <span>Will 3D WebGL slow down my website or affect Google SEO ranking?</span>
                        <span class="text-[#d02128] group-open:rotate-45 transition-transform text-2xl">&plus;</span>
                    </summary>
                    <p class="text-xs text-white/65 mt-4 leading-relaxed font-sans">
                        Never. We optimize every geometry, compress textures with KTX2/Basis, and defer WebGL rendering so Google PageSpeed and Core Web Vitals score 90+. Search engine crawlers receive pristine, semantic HTML while visitors enjoy seamless 60fps 3D graphics.
                    </p>
                </details>

                <details class="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 cursor-pointer">
                    <summary class="flex items-center justify-between font-bold text-base text-white list-none">
                        <span>How does the GitHub automatic update work on my WordPress site?</span>
                        <span class="text-[#d02128] group-open:rotate-45 transition-transform text-2xl">&plus;</span>
                    </summary>
                    <p class="text-xs text-white/65 mt-4 leading-relaxed font-sans">
                        Your theme files are stored in a GitHub repository. We link it with a WordPress webhook (via WP Pusher or GitHub Theme Updater). Whenever we push an update (text, pricing, design, or SEO meta), your live WordPress site syncs automatically within 5 seconds.
                    </p>
                </details>

                <details class="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 cursor-pointer">
                    <summary class="flex items-center justify-between font-bold text-base text-white list-none">
                        <span>Is this compatible with WooCommerce and all my existing plugins?</span>
                        <span class="text-[#d02128] group-open:rotate-45 transition-transform text-2xl">&plus;</span>
                    </summary>
                    <p class="text-xs text-white/65 mt-4 leading-relaxed font-sans">
                        Yes, 100%. The theme uses standard WordPress hooks, `wp_head()`, and `wp_footer()`, ensuring seamless compatibility with WooCommerce, Yoast SEO, Wordfence, and your payment gateways.
                    </p>
                </details>
            </div>
        </div>
    </section>

    <!-- =========================================================================
         SECTION 07: DIRECT PROJECT INQUIRY FORM
         ========================================================================= -->
    <section id="contact" class="py-24 px-6 md:px-12 border-t border-white/10 bg-[#04070F] relative">
        <div class="max-w-4xl mx-auto space-y-10">
            <div class="text-center space-y-3">
                <div class="text-xs font-mono uppercase tracking-[0.24em] text-[#d02128]">06 // INITIATE</div>
                <h2 class="text-3xl sm:text-5xl font-black uppercase tracking-tight">Let's Build Something Iconic</h2>
                <p class="text-xs font-mono text-white/60">Fill out the brief below and our creative director will respond within 12 hours.</p>
            </div>

            <form class="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/15 backdrop-blur-xl space-y-6" onsubmit="event.preventDefault(); alert('Inquiry received. Our team will reach out within 12 hours.');">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-2">Your Name</label>
                        <input type="text" required placeholder="Alex Vance" class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white focus:outline-none focus:border-[#d02128]">
                    </div>
                    <div>
                        <label class="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-2">Work Email</label>
                        <input type="email" required placeholder="alex@company.com" class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white focus:outline-none focus:border-[#d02128]">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-2">Project Scope</label>
                        <select class="w-full px-4 py-3 rounded-xl bg-[#0B0F1C] border border-white/15 text-sm text-white focus:outline-none focus:border-[#d02128]">
                            <option>Essential 3D Launch ($4,800)</option>
                            <option selected>Flagship 3D Studio Experience ($8,500)</option>
                            <option>Enterprise Custom Ecosystem ($16,000+)</option>
                            <option>WordPress / eCommerce 3D Redesign</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-2">Target Timeline</label>
                        <select class="w-full px-4 py-3 rounded-xl bg-[#0B0F1C] border border-white/15 text-sm text-white focus:outline-none focus:border-[#d02128]">
                            <option>Immediate (Within 2-3 weeks)</option>
                            <option selected>Next Month (Within 4-6 weeks)</option>
                            <option>Flexible / Planning Phase</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-2">Project Details &amp; Objectives</label>
                    <textarea rows="4" required placeholder="Tell us about your brand, audience, and the vision for your 3D digital experience..." class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white focus:outline-none focus:border-[#d02128]"></textarea>
                </div>

                <button type="submit" class="w-full py-4 rounded-full bg-[#d02128] hover:bg-[#ff3b42] text-white font-mono text-xs uppercase tracking-[0.2em] font-bold shadow-[0_0_30px_rgba(208,33,40,0.5)] transition-all cursor-pointer">
                    Submit Project Inquiry &rarr;
                </button>
            </form>
        </div>
    </section>

</main>

<!-- Footer Section (Self-contained in front-page) -->
<footer id="footer" class="relative z-20 border-t border-white/10 bg-[#020409] pt-16 pb-12 px-6 md:px-12 text-white">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Col 1: Brand Info -->
        <div class="space-y-4">
            <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d02128] to-[#ff4d49] flex items-center justify-center font-bold text-sm text-white">
                    E
                </span>
                <span class="font-extrabold tracking-wider text-base uppercase">
                    <?php bloginfo('name'); ?>
                </span>
            </div>
            <p class="text-xs text-white/60 leading-relaxed max-w-sm">
                Engineering next-generation 3D WebGL websites, bespoke brand identities, and high-conversion immersive commerce experiences for ambitious visionary brands worldwide.
            </p>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Available for Q1 / Q2 Projects</span>
            </div>
        </div>

        <!-- Col 2: Services -->
        <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-[0.2em] text-[#d02128]">Specializations</h4>
            <ul class="space-y-2 text-xs text-white/70 font-sans">
                <li><a href="#services" class="hover:text-white transition-colors">Interactive 3D WebGL Websites</a></li>
                <li><a href="#services" class="hover:text-white transition-colors">Three.js Product Visualizers</a></li>
                <li><a href="#services" class="hover:text-white transition-colors">High-Converting DTC eCommerce</a></li>
                <li><a href="#services" class="hover:text-white transition-colors">Dynamic GLSL Shaders &amp; Motion</a></li>
                <li><a href="#services" class="hover:text-white transition-colors">Headless Shopify &amp; WordPress API</a></li>
            </ul>
        </div>

        <!-- Col 3: Direct Inquiry -->
        <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-[0.2em] text-[#d02128]">Contact Direct</h4>
            <div class="space-y-2 text-xs text-white/70">
                <p>Email: <a href="mailto:hello@eferz.com" class="text-white hover:text-cyan-400 font-mono">hello@eferz.com</a></p>
                <p>Studio: <span class="text-white">Dubai &bull; London &bull; Global Remote</span></p>
                <p>Response Time: <span class="text-emerald-400 font-mono">&lt; 12 Hours Guaranteed</span></p>
            </div>
        </div>

        <!-- Col 4: Dispatch Newsletter -->
        <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-[0.2em] text-[#d02128]">Studio Dispatch</h4>
            <p class="text-xs text-white/60">Receive private case study teardowns and early design drops.</p>
            <form class="flex gap-2" onsubmit="event.preventDefault(); alert('Subscribed to EFerz Studio Dispatch.');">
                <input type="email" required placeholder="Enter work email" class="flex-1 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#d02128]">
                <button type="submit" class="px-4 py-2 rounded-xl bg-[#d02128] hover:bg-[#ff3b42] text-xs font-mono font-bold text-white uppercase tracking-wider transition-colors">
                    Join
                </button>
            </form>
        </div>
    </div>

    <!-- Bottom Bar & Locked Attribution Watermark -->
    <div class="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
        <div>
            &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All Rights Reserved.
        </div>
        <div class="flex items-center gap-2">
            <span>Built &bull; Optimized &bull; </span>
            <span class="text-white font-bold bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                Powered by EFerz (<a href="https://eferz.com" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">EFerz.com</a>)
            </span>
        </div>
    </div>
</footer>

<?php get_footer(); ?>
