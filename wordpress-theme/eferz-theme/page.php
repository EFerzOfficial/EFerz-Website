<?php
/**
 * The template for displaying WordPress Pages, WooCommerce Cart, Checkout,
 * My Account, Contact Form 7 pages, and Elementor-built pages.
 *
 * @package EFerz
 * @version 1.2.0
 */

get_header();

$is_wc_flow = function_exists('is_cart') && (is_cart() || is_checkout() || is_account_page() || is_wc_endpoint_url());
$is_elementor_page = false;
if (class_exists('\Elementor\Plugin')) {
    $doc = \Elementor\Plugin::$instance->documents->get(get_the_ID());
    if ($doc && method_exists($doc, 'is_built_with_elementor') && $doc->is_built_with_elementor()) {
        $is_elementor_page = true;
    }
}

$shell_class = 'eferz-wp-shell';
if ($is_elementor_page && !$is_wc_flow) {
    $shell_class .= ' eferz-wp-shell--elementor';
} elseif (!$is_wc_flow) {
    $shell_class .= ' eferz-wp-shell--narrow';
}
?>

<main id="primary" class="<?php echo esc_attr($shell_class); ?>">
    <?php while (have_posts()) : the_post(); ?>
        <?php if ($is_wc_flow) : ?>
            <div class="eferz-wc-banner">
                <div>
                    <div class="eferz-wc-badge">
                        <span class="eferz-wc-badge-dot"></span>
                        <span>EFerz Secure Commerce Portal</span>
                    </div>
                    <h1 class="eferz-wc-title"><?php the_title(); ?></h1>
                    <p class="eferz-wc-subtitle">
                        <?php
                        if (is_cart()) {
                            esc_html_e('Review your selected services or products before proceeding to encrypted merchant checkout.', 'eferz');
                        } elseif (is_checkout()) {
                            esc_html_e('Encrypted checkout powered by WooPayments. Complete your order securely below.', 'eferz');
                        } else {
                            esc_html_e('Manage your orders, invoices, payment methods, and account security settings.', 'eferz');
                        }
                        ?>
                    </p>
                </div>

                <div class="eferz-wc-actions">
                    <?php if (function_exists('wc_get_cart_url') && !is_cart()) : ?>
                        <a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="eferz-wp-pill-btn">
                            <span>Cart (<span class="eferz-cart-count"><?php echo esc_html(function_exists('WC') && WC()->cart ? WC()->cart->get_cart_contents_count() : 0); ?></span>)</span>
                        </a>
                    <?php endif; ?>
                    <?php if (function_exists('wc_get_page_permalink') && !is_account_page()) : ?>
                        <a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>" class="eferz-wp-pill-btn">
                            <span><?php esc_html_e('Account', 'eferz'); ?></span>
                        </a>
                    <?php endif; ?>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="eferz-wp-cta" style="display:inline-flex;">
                        <span>&larr; Agency Home</span>
                    </a>
                </div>
            </div>

            <article id="post-<?php the_ID(); ?>" <?php post_class('eferz-wc-card'); ?>>
                <div class="eferz-entry-content">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php elseif ($is_elementor_page) : ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <?php the_content(); ?>
            </article>
        <?php else : ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('eferz-wc-card'); ?>>
                <header class="eferz-article-header">
                    <h1 class="eferz-article-title"><?php the_title(); ?></h1>
                </header>

                <?php if (has_post_thumbnail()) : ?>
                    <div style="margin-bottom: 1.5rem; border-radius: 0.9rem; overflow: hidden; border: 1px solid rgba(255,255,255,0.12);">
                        <?php the_post_thumbnail('full'); ?>
                    </div>
                <?php endif; ?>

                <div class="eferz-entry-content">
                    <?php
                    the_content();
                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('Pages:', 'eferz'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>

                <?php if (comments_open() || get_comments_number()) : ?>
                    <div style="margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 1.5rem;">
                        <?php comments_template(); ?>
                    </div>
                <?php endif; ?>
            </article>
        <?php endif; ?>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
