<?php
/**
 * The template for displaying WooCommerce Shop, Product, and Taxonomy pages.
 * Cart, Checkout, and My Account are handled via page.php so Gutenberg Blocks,
 * shortcodes, WooPayments, Wordfence 2FA, and Cart Abandonment work natively.
 *
 * @package EFerz
 * @version 1.2.0
 */

get_header();

$is_elementor_handled = false;
if (function_exists('elementor_theme_do_location')) {
    if (function_exists('is_product') && is_product() && elementor_theme_do_location('single')) {
        $is_elementor_handled = true;
    } elseif (!is_product() && elementor_theme_do_location('archive')) {
        $is_elementor_handled = true;
    }
}

if (!$is_elementor_handled) :
?>
<main id="primary" class="eferz-wp-shell">
    <div class="eferz-wc-banner">
        <div>
            <div class="eferz-wc-badge">
                <span class="eferz-wc-badge-dot"></span>
                <span>EFerz Digital Store &amp; Commerce</span>
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
                <?php echo esc_html__('Nothing Is Impossible In The IT World. Encrypted merchant checkout, instant digital fulfillment, and global enterprise support.', 'eferz'); ?>
            </p>
        </div>

        <div class="eferz-wc-actions">
            <?php if (function_exists('wc_get_cart_url')) : ?>
                <a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="eferz-wp-pill-btn">
                    <span>Cart (<span class="eferz-cart-count"><?php echo esc_html(function_exists('WC') && WC()->cart ? WC()->cart->get_cart_contents_count() : 0); ?></span>)</span>
                </a>
            <?php endif; ?>
            <?php if (function_exists('wc_get_page_permalink')) : ?>
                <a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>" class="eferz-wp-pill-btn">
                    <span><?php esc_html_e('Account', 'eferz'); ?></span>
                </a>
            <?php endif; ?>
            <a href="<?php echo esc_url(home_url('/')); ?>" class="eferz-wp-cta" style="display:inline-flex;">
                <span>&larr; Agency Home</span>
            </a>
        </div>
    </div>

    <div class="eferz-wc-card">
        <?php woocommerce_content(); ?>
    </div>
</main>
<?php
endif;

get_footer();
