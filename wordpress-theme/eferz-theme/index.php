<?php
/**
 * EFerz Digital Agency - Fallback Template
 * Serves the React 3D SPA when on SPA routes, otherwise renders standard WordPress content.
 *
 * @package EFerz
 * @version 1.2.0
 */

if (function_exists('eferz_is_spa_request') && eferz_is_spa_request()) {
    require get_template_directory() . '/front-page.php';
    return;
}

get_header(); ?>

<main id="primary" class="eferz-wp-shell">
    <?php if (have_posts()) : ?>
        <div class="eferz-archive-grid">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('eferz-archive-card'); ?>>
                    <div>
                        <h2 style="margin: 0 0 0.6rem; font-size: 1.25rem; font-weight: 800;">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <div style="font-size: 0.9rem; color: rgba(255,255,255,0.72);">
                            <?php the_excerpt(); ?>
                        </div>
                    </div>
                    <div>
                        <a href="<?php the_permalink(); ?>" class="eferz-wp-pill-btn">Open &rarr;</a>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
    <?php else : ?>
        <div class="eferz-wc-card">
            <p><?php esc_html_e('Nothing found here yet.', 'eferz'); ?></p>
        </div>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
