<?php
/**
 * EFerz Theme Footer (Inner WordPress, WooCommerce & Elementor Pages)
 *
 * @package EFerz
 * @version 1.2.0
 */
?>
<?php if (!function_exists('elementor_theme_do_location') || !elementor_theme_do_location('footer')) : ?>
<footer id="footer" class="eferz-wp-footer">
    <div class="eferz-wp-footer-grid">
        <div>
            <div class="eferz-wp-brand" style="margin-bottom: 0.85rem;">
                <span class="eferz-wp-brand-mark">E</span>
                <span class="eferz-wp-brand-name"><?php bloginfo('name'); ?></span>
            </div>
            <p style="font-size: 0.84rem; color: rgba(255,255,255,0.62); max-width: 24rem; margin: 0;">
                Global AI, 3D WebGL, software engineering, e-commerce, SEO, and cloud cybersecurity studio — Nothing Is Impossible In The IT World.
            </p>
        </div>

        <div>
            <h4><?php esc_html_e('Studio', 'eferz'); ?></h4>
            <ul>
                <li><a href="<?php echo esc_url(home_url('/')); ?>">Agency Home</a></li>
                <li><a href="<?php echo esc_url(home_url('/services')); ?>">Enterprise Services</a></li>
                <li><a href="<?php echo esc_url(home_url('/work')); ?>">Selected Work</a></li>
                <li><a href="<?php echo esc_url(home_url('/contact')); ?>">Start a Project</a></li>
            </ul>
        </div>

        <div>
            <h4><?php esc_html_e('Global Hubs', 'eferz'); ?></h4>
            <ul>
                <li>Email: <a href="mailto:info@eferz.com">info@eferz.com</a></li>
                <li>USA (FL): <a href="tel:+17862244112">+1 (786) 224-4112</a></li>
                <li>KSA (Riyadh): <a href="tel:+966539046410">+966 53 904 6410</a></li>
                <li><a href="<?php echo esc_url(home_url('/privacy')); ?>">Privacy</a> &bull; <a href="<?php echo esc_url(home_url('/terms')); ?>">Terms</a> &bull; <a href="<?php echo esc_url(home_url('/refund')); ?>">Refunds</a></li>
            </ul>
        </div>
    </div>

    <div class="eferz-wp-footer-bottom">
        <div>&copy; <?php echo esc_html(date('Y')); ?> <?php bloginfo('name'); ?>. All Rights Reserved.</div>
        <div>Powered by <a href="https://eferz.com" target="_blank" rel="noopener">EFerz.com</a></div>
    </div>
</footer>
<?php endif; ?>

<script>
(function() {
    var toggle = document.getElementById('eferz-mobile-menu-toggle');
    var closeBtn = document.getElementById('eferz-mobile-menu-close');
    var drawer = document.getElementById('eferz-mobile-nav-drawer');
    if (toggle && drawer) {
        toggle.addEventListener('click', function() {
            drawer.classList.add('is-open');
            drawer.setAttribute('aria-hidden', 'false');
            toggle.setAttribute('aria-expanded', 'true');
        });
    }
    if (closeBtn && drawer) {
        closeBtn.addEventListener('click', function() {
            drawer.classList.remove('is-open');
            drawer.setAttribute('aria-hidden', 'true');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    }
})();
</script>

<?php wp_footer(); ?>
</body>
</html>
