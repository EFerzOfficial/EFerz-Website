<?php
/**
 * The main template file
 *
 * @package EFerz
 * @version 1.0.0
 */

get_header(); ?>

<main id="primary" class="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-[70vh]">
    <?php if (have_posts()) : ?>
        <header class="mb-12 border-b border-white/10 pb-6">
            <h1 class="text-4xl font-extrabold uppercase tracking-tight text-white">
                <?php single_post_title(); ?>
            </h1>
        </header>

        <div class="space-y-12">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4'); ?>>
                    <h2 class="text-2xl font-bold">
                        <a href="<?php the_permalink(); ?>" class="text-white hover:text-[#d02128] transition-colors">
                            <?php the_title(); ?>
                        </a>
                    </h2>
                    <div class="text-xs font-mono text-white/50">
                        <?php echo get_the_date(); ?> &bull; <?php the_author(); ?>
                    </div>
                    <div class="text-sm text-white/70 leading-relaxed font-sans">
                        <?php the_excerpt(); ?>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <div class="mt-12 text-center">
            <?php the_posts_pagination(array(
                'prev_text' => '&larr; Previous',
                'next_text' => 'Next &rarr;',
            )); ?>
        </div>
    <?php else : ?>
        <div class="text-center py-20">
            <h2 class="text-2xl font-bold uppercase mb-4">No Content Found</h2>
            <p class="text-sm text-white/60">It seems we couldn't find what you were looking for.</p>
        </div>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
