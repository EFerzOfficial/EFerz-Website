<?php
/**
 * The template for displaying single posts and custom post types.
 *
 * @package EFerz
 * @version 1.6.5
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

            <section class="eferz-newsletter-box" style="margin-top: 2rem; padding: 1.35rem; border-radius: 1rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(236,57,53,0.32);">
                <div style="font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: #ec3935; font-weight: 700; margin-bottom: 0.35rem;">EFerz Insiders &amp; Exclusive Offers</div>
                <h2 style="font-size: 1.15rem; margin: 0 0 0.4rem 0; color: #ffffff;">Subscribe for AI, Engineering &amp; Promotional Updates</h2>
                <p style="font-size: 0.875rem; color: rgba(255,255,255,0.72); margin: 0 0 0.9rem 0;">Receive practical playbooks, new service launches, and subscriber-only EFerz deals straight to your inbox.</p>
                <form id="eferz-post-newsletter-form" style="display: flex; flex-wrap: wrap; gap: 0.65rem; align-items: center;">
                    <input type="text" name="website_url" tabindex="-1" autocomplete="off" style="display:none;" aria-hidden="true" />
                    <input type="email" name="email" required placeholder="you@company.com" style="flex: 1 1 220px; padding: 0.65rem 0.9rem; border-radius: 0.65rem; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.45); color: #ffffff; font-size: 0.9rem;" />
                    <button type="submit" style="padding: 0.68rem 1.25rem; border-radius: 0.65rem; border: none; background: #ec3935; color: #ffffff; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer;">Subscribe</button>
                </form>
                <div id="eferz-post-newsletter-status" style="margin-top: 0.6rem; font-size: 0.82rem; color: #34d399; display: none;"></div>
                <script>
                (function() {
                    var form = document.getElementById('eferz-post-newsletter-form');
                    var statusEl = document.getElementById('eferz-post-newsletter-status');
                    if (!form || !statusEl) return;
                    form.addEventListener('submit', function(ev) {
                        ev.preventDefault();
                        var emailInput = form.querySelector('input[name="email"]');
                        var honeyInput = form.querySelector('input[name="website_url"]');
                        var btn = form.querySelector('button[type="submit"]');
                        var email = emailInput ? emailInput.value.trim() : '';
                        if (!email) return;
                        if (btn) { btn.disabled = true; btn.textContent = 'Subscribing...'; }
                        fetch('/wp-json/eferz/v1/newsletter', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                email: email,
                                honeypot: honeyInput ? honeyInput.value : '',
                                source: 'Blog Article'
                            })
                        }).then(function(r) { return r.json(); }).then(function(data) {
                            statusEl.style.display = 'block';
                            statusEl.style.color = (data && data.success) ? '#34d399' : '#f87171';
                            statusEl.textContent = (data && data.message) ? data.message : 'Subscribed successfully.';
                            if (data && data.success && emailInput) emailInput.value = '';
                        }).catch(function() {
                            statusEl.style.display = 'block';
                            statusEl.style.color = '#f87171';
                            statusEl.textContent = 'Unable to subscribe right now. Please try again.';
                        }).finally(function() {
                            if (btn) { btn.disabled = false; btn.textContent = 'Subscribe'; }
                        });
                    });
                })();
                </script>
            </section>

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
