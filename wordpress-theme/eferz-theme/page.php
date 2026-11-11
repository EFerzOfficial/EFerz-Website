<?php
/**
 * The template for displaying all single pages
 *
 * @package EFerz
 * @version 1.0.0
 */

get_header(); ?>

<main id="primary" class="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-[75vh]">
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-6'); ?>>
            <header class="border-b border-white/10 pb-6 mb-8">
                <h1 class="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                    <?php the_title(); ?>
                </h1>
                <?php if (has_excerpt()) : ?>
                    <p class="text-base text-white/70 font-light leading-relaxed">
                        <?php echo get_the_excerpt(); ?>
                    </p>
                <?php endif; ?>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="rounded-2xl overflow-hidden border border-white/10 mb-8 max-h-96">
                    <?php the_post_thumbnail('full', array('class' => 'w-full h-auto object-cover')); ?>
                </div>
            <?php endif; ?>

            <div class="entry-content prose prose-invert prose-red max-w-none text-white/80 leading-relaxed space-y-6 text-sm sm:text-base">
                <?php
                the_content();

                wp_link_pages(array(
                    'before' => '<div class="page-links mt-8 pt-4 border-t border-white/10 text-xs font-mono text-white/60">' . esc_html__('Pages:', 'eferz'),
                    'after'  => '</div>',
                ));
                ?>
            </div>

            <?php
            // If comments are open or we have at least one comment, load up the comment template.
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>
        </article>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
