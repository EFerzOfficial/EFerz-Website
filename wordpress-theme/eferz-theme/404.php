<?php
/**
 * EFerz 404 Error Template
 * Ensures non-existent URLs return a real HTTP 404 Not Found with noindex headers.
 *
 * @package EFerz
 * @version 1.5.2
 */

if (!defined('ABSPATH')) {
    http_response_code(403);
    exit;
}

status_header(404);
nocache_headers();
if (!headers_sent()) {
    header('X-Robots-Tag: noindex, nofollow', true);
}

get_header();
?>

<main id="primary" class="eferz-wp-shell eferz-wp-shell--narrow" style="min-height: 62vh; display: flex; align-items: center;">
    <article class="eferz-wc-card" style="width: 100%; text-align: center; padding: 3rem 1.5rem;">
        <div class="eferz-wc-badge" style="margin: 0 auto 1rem;">
            <span class="eferz-wc-badge-dot"></span>
            <span>HTTP 404 &bull; Page Not Found</span>
        </div>
        <h1 class="eferz-wc-title" style="margin-bottom: 0.75rem;">Page Not Found</h1>
        <p class="eferz-wc-subtitle" style="max-width: 34rem; margin: 0 auto 2rem;">
            The page you requested has moved or does not exist. Explore our flagship services, case studies, or get in touch with EFerz directly.
        </p>
        <div class="eferz-wc-actions" style="justify-content: center; flex-wrap: wrap;">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="eferz-wp-cta" style="display: inline-flex;">
                <span>&larr; Return Home</span>
            </a>
            <a href="<?php echo esc_url(home_url('/services/')); ?>" class="eferz-wp-pill-btn">Services</a>
            <a href="<?php echo esc_url(home_url('/work/')); ?>" class="eferz-wp-pill-btn">Selected Work</a>
            <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="eferz-wp-pill-btn">Contact</a>
        </div>
    </article>
</main>

<?php
get_footer();
