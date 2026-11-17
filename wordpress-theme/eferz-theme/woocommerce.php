<?php
/**
 * The template for displaying WooCommerce Shop, Single Product, and Taxonomy pages.
 * Always renders full native woocommerce_content() (product gallery, price, short description,
 * variations, quantity, Add to Cart, WooPayments Express Checkout, tabs, reviews, related products)
 * without being hijacked by incomplete legacy Elementor product templates.
 *
 * @package EFerz
 * @version 1.2.3
 */

get_header();
?>
<main id="primary" class="eferz-wp-shell">
    <div class="eferz-wc-banner">
        <div>
            <div class="eferz-wc-badge">
                <span class="eferz-wc-badge-dot"></span>
                <span>EFerz Commerce Portal</span>
            </div>
            <h1 class="eferz-wc-title">
                <?php
                if (function_exists('is_product') && is_product()) {
                    the_title();
                } else {
                    woocommerce_page_title();
                }
                ?>
            </h1>
            <p class="eferz-wc-subtitle">
                <?php echo esc_html__('Nothing Is Impossible In The IT World. Encrypted merchant checkout, instant digital fulfillment, and global enterprise support by EFerz.', 'eferz'); ?>
            </p>
        </div>

        <div class="eferz-wc-actions">
            <?php if (function_exists('wc_get_page_id') && wc_get_page_id('shop') > 0 && !is_shop()) : ?>
                <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="eferz-wp-pill-btn">
                    <span><?php esc_html_e('Shop', 'eferz'); ?></span>
                </a>
            <?php endif; ?>
            <?php if (function_exists('wc_get_cart_url')) : ?>
                <a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="eferz-wp-pill-btn">
                    <span>Cart (<span class="eferz-cart-count"><?php echo esc_html(function_exists('WC') && WC()->cart ? WC()->cart->get_cart_contents_count() : 0); ?></span>)</span>
                </a>
            <?php endif; ?>
            <?php if (function_exists('wc_get_page_permalink')) : ?>
                <a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>" class="eferz-wp-pill-btn">
                    <span><?php esc_html_e('My Account', 'eferz'); ?></span>
                </a>
            <?php endif; ?>
            <a href="<?php echo esc_url(home_url('/')); ?>" class="eferz-wp-cta" style="display:inline-flex;">
                <span>&larr; Home</span>
            </a>
        </div>
    </div>

    <div class="eferz-wc-card">
        <?php woocommerce_content(); ?>
    </div>
</main>
<?php
get_footer();
