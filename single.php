<?php
/**
 * The template for displaying single posts and custom post types.
 *
 * @package EFerz
 * @version 1.2.1
 */

get_header();
?>
<main id="primary" class="eferz-wp-shell eferz-wp-shell--narrow">
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('eferz-wc-card'); ?>>
            <header class="eferz-article-header">
                <h1 class="eferz-article-title"><?php the_title(); ?></h1>
                <div class="eferz-article-meta">
                    <span><?php echo esc_html(get_the_date()); ?></span>
                    <span><?php echo esc_html(get_the_author()); ?></span>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div style="margin-bottom: 1.5rem; border-radius: 0.9rem; overflow: hidden; border: 1px solid rgba(255,255,255,0.12);">
                    <?php the_post_thumbnail('large'); ?>
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
    <?php endwhile; ?>
</main>
<?php
get_footer();
