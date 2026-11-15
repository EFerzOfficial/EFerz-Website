<?php
/**
 * The template for displaying category, tag, and custom post type archives.
 *
 * @package EFerz
 * @version 1.2.0
 */

get_header();

$is_elementor_handled = function_exists('elementor_theme_do_location') && elementor_theme_do_location('archive');

if (!$is_elementor_handled) :
?>
<main id="primary" class="eferz-wp-shell">
    <div class="eferz-wc-banner">
        <div>
            <div class="eferz-wc-badge">
                <span class="eferz-wc-badge-dot"></span>
                <span>EFerz Archive</span>
            </div>
            <h1 class="eferz-wc-title"><?php the_archive_title(); ?></h1>
            <?php if (get_the_archive_description()) : ?>
                <div class="eferz-wc-subtitle"><?php the_archive_description(); ?></div>
            <?php endif; ?>
        </div>
        <div class="eferz-wc-actions">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="eferz-wp-cta" style="display:inline-flex;">
                <span>&larr; Agency Home</span>
            </a>
        </div>
    </div>

    <?php if (have_posts()) : ?>
        <div class="eferz-archive-grid">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('eferz-archive-card'); ?>>
                    <div>
                        <div class="eferz-article-meta" style="margin-bottom: 0.45rem;">
                            <span><?php echo esc_html(get_the_date()); ?></span>
                        </div>
                        <h2 style="margin: 0 0 0.6rem; font-size: 1.25rem; font-weight: 800;">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <div style="font-size: 0.9rem; color: rgba(255,255,255,0.72);">
                            <?php the_excerpt(); ?>
                        </div>
                    </div>
                    <div>
                        <a href="<?php the_permalink(); ?>" class="eferz-wp-pill-btn">Read More &rarr;</a>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
        <div style="margin-top: 2rem;">
            <?php the_posts_pagination(); ?>
        </div>
    <?php else : ?>
        <div class="eferz-wc-card">
            <p><?php esc_html_e('No items found in this archive yet.', 'eferz'); ?></p>
        </div>
    <?php endif; ?>
</main>
<?php
endif;

get_footer();
