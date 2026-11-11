<?php
/**
 * The template for displaying all WooCommerce pages
 * Matches EFerz Dark Luxury Cyberpunk / Galaxy Aesthetic
 *
 * @package EFerz
 * @version 1.0.0
 */

get_header(); ?>

<main id="primary" class="relative z-10 pt-28 sm:pt-36 pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-white">
    <!-- Top Branding & Breadcrumb Header -->
    <div class="mb-8 md:mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#07090f]/90 via-[#0e131f]/80 to-[#07090f]/90 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d02128]/20 border border-[#d02128]/40 text-[#ff4d49] text-[11px] font-mono uppercase tracking-[0.2em] mb-3">
                <span class="w-1.5 h-1.5 rounded-full bg-[#d02128] animate-ping"></span>
                <span>EFerz Digital Store & Commerce</span>
            </div>
            <h1 class="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white m-0">
                <?php
                if (function_exists('is_shop') && is_shop()) {
                    woocommerce_page_title();
                } elseif (function_exists('is_product') && is_product()) {
                    the_title();
                } elseif (function_exists('is_cart') && is_cart()) {
                    echo esc_html__('Shopping Cart & Review', 'eferz');
                } elseif (function_exists('is_checkout') && is_checkout()) {
                    echo esc_html__('Secure Checkout & Merchant Gateway', 'eferz');
                } elseif (function_exists('is_account_page') && is_account_page()) {
                    echo esc_html__('Client Portal & Account', 'eferz');
                } else {
                    woocommerce_page_title();
                }
                ?>
            </h1>
            <p class="text-xs sm:text-sm font-sans text-white/70 mt-2 max-w-xl leading-relaxed m-0">
                <?php echo esc_html__('Nothing Is Impossible In The IT World. Secure payments, zero-latency digital transactions, and global fulfillment.', 'eferz'); ?>
            </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
            <?php if (function_exists('wc_get_cart_url')): ?>
            <a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 backdrop-blur-md text-xs font-mono tracking-wider transition-all">
                <svg class="w-4 h-4 text-[#d02128]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                <span>Cart (<?php echo WC()->cart ? WC()->cart->get_cart_contents_count() : 0; ?>)</span>
            </a>
            <?php endif; ?>
            <a href="<?php echo esc_url(home_url('/')); ?>" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#d02128] hover:bg-[#e01537] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(208,33,40,0.4)]">
                <span>← Agency Home</span>
            </a>
        </div>
    </div>

    <!-- WooCommerce Core Content Injection Container -->
    <div class="eferz-woocommerce-container bg-[#07090f]/80 border border-white/15 rounded-3xl p-5 sm:p-8 md:p-12 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)]">
        <?php woocommerce_content(); ?>
    </div>
</main>

<?php get_footer(); ?>
