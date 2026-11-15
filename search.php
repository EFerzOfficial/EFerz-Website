<?php
/**
 * The template for displaying WordPress search results.
 *
 * @package EFerz
 * @version 1.2.0
 */

get_header(); ?>

<main id="primary" class="eferz-wp-shell">
    <div class="eferz-wc-banner">
        <div>
            <div class="eferz-wc-badge">
                <span class="eferz-wc-badge-dot"></span>
                <span>Search Results</span>
            </div>
            <h1 class="eferz-wc-title">
                <?php printf(esc_html__('Results for: %s', 'eferz'), esc_html(get_search_query())); ?>
            </h1>
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
                        <h2 style="margin: 0 0 0.6rem; font-size: 1.25rem; font-weight: 800;">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <div style="font-size: 0.9rem; color: rgba(255,255,255,0.72);">
                            <?php the_excerpt(); ?>
                        </div>
                    </div>
                    <div>
                        <a href="<?php the_permalink(); ?>" class="eferz-wp-pill-btn">View &rarr;</a>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
        <div style="margin-top: 2rem;">
            <?php the_posts_pagination(); ?>
        </div>
    <?php else : ?>
        <div class="eferz-wc-card">
            <p><?php esc_html_e('No matching results found. Try a different search query or return to the agency homepage.', 'eferz'); ?></p>
        </div>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
