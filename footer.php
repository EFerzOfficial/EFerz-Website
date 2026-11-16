<?php
/**
 * EFerz Theme Footer (Inner WordPress & WooCommerce Pages)
 * Always renders the clean EFerz obsidian footer (never overridden by old Elementor footer 2605).
 *
 * @package EFerz
 * @version 1.2.2
 */
?>
<footer id="footer" class="eferz-wp-footer">
    <div class="eferz-wp-footer-grid">
        <div>
            <div class="eferz-wp-brand" style="margin-bottom: 0.85rem;">
                <span class="eferz-wp-brand-logo-wrap eferz-wp-brand-logo-wrap--sm">
                    <img
                        src="<?php echo esc_url(get_template_directory_uri() . '/assets/eferz-logo.png'); ?>"
                        alt="EFerz Digital Agency Logo"
                        width="28"
                        height="28"
                        class="eferz-wp-logo-img skip-lazy no-lazy"
                        data-no-lazy="1"
                        loading="eager"
                    />
                </span>
                <span class="eferz-wp-brand-name">EFERZ DIGITAL AGENCY</span>
            </div>
            <p class="eferz-wp-footer-desc">
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
                <li>USA Call / WhatsApp: <a href="tel:+17862244112">+1 (786) 224-4112</a></li>
                <li>KSA Call / WhatsApp: <a href="tel:+966539046410">+966 (539) 046410</a></li>
                <li>PAK Call / WhatsApp: <a href="tel:+923453397459">+92 345 3397459</a></li>
                <li><a href="<?php echo esc_url(home_url('/privacy')); ?>">Privacy</a> &bull; <a href="<?php echo esc_url(home_url('/terms')); ?>">Terms</a> &bull; <a href="<?php echo esc_url(home_url('/refund')); ?>">Refunds</a></li>
            </ul>
        </div>
    </div>

    <div class="eferz-wp-footer-bottom">
        <div>&copy; <?php echo esc_html(date('Y')); ?> EFerz Digital Agency. All Rights Reserved.</div>
        <div>Powered by <a href="https://eferz.com" target="_blank" rel="noopener">EFerz.com</a></div>
    </div>
</footer>

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
