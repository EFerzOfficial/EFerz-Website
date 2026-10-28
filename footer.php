<?php
/**
 * EFerz Theme Footer
 *
 * @package EFerz
 * @version 1.0.0
 */
?>
<!-- Footer Section -->
<footer id="footer" class="relative z-20 border-t border-white/10 bg-[#020409] pt-16 pb-12 px-6 md:px-12 text-white">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Col 1: Brand Info -->
        <div class="space-y-4">
            <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d02128] to-[#ff4d49] flex items-center justify-center font-bold text-sm text-white">
                    E
                </span>
                <span class="font-extrabold tracking-wider text-base uppercase">
                    <?php bloginfo('name'); ?>
                </span>
            </div>
            <p class="text-xs text-white/60 leading-relaxed max-w-sm">
                Engineering next-generation 3D WebGL websites, bespoke brand identities, and high-conversion immersive commerce experiences for ambitious visionary brands worldwide.
            </p>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Available for Q1 / Q2 Projects</span>
            </div>
        </div>

        <!-- Col 2: Services -->
        <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-[0.2em] text-[#d02128]">Specializations</h4>
            <ul class="space-y-2 text-xs text-white/70 font-sans">
                <li><a href="#services" class="hover:text-white transition-colors">Interactive 3D WebGL Websites</a></li>
                <li><a href="#services" class="hover:text-white transition-colors">Three.js Product Visualizers</a></li>
                <li><a href="#services" class="hover:text-white transition-colors">High-Converting DTC eCommerce</a></li>
                <li><a href="#services" class="hover:text-white transition-colors">Dynamic GLSL Shaders & Motion</a></li>
                <li><a href="#services" class="hover:text-white transition-colors">Headless Shopify & WordPress API</a></li>
            </ul>
        </div>

        <!-- Col 3: Direct Inquiry -->
        <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-[0.2em] text-[#d02128]">Contact Direct</h4>
            <div class="space-y-2 text-xs text-white/70">
                <p>Email: <a href="mailto:hello@eferz.com" class="text-white hover:text-cyan-400 font-mono">hello@eferz.com</a></p>
                <p>Studio: <span class="text-white">Dubai &bull; London &bull; Global Remote</span></p>
                <p>Response Time: <span class="text-emerald-400 font-mono">&lt; 12 Hours Guaranteed</span></p>
            </div>
        </div>

        <!-- Col 4: Dispatch Newsletter -->
        <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-[0.2em] text-[#d02128]">Studio Dispatch</h4>
            <p class="text-xs text-white/60">Receive private case study teardowns and early design drops.</p>
            <form class="flex gap-2" onsubmit="event.preventDefault(); alert('Subscribed to EFerz Studio Dispatch.');">
                <input type="email" required placeholder="Enter work email" class="flex-1 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#d02128]">
                <button type="submit" class="px-4 py-2 rounded-xl bg-[#d02128] hover:bg-[#ff3b42] text-xs font-mono font-bold text-white uppercase tracking-wider transition-colors">
                    Join
                </button>
            </form>
        </div>
    </div>

    <!-- Bottom Bar & Locked Attribution Watermark -->
    <div class="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
        <div>
            &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All Rights Reserved.
        </div>
        <div class="flex items-center gap-2">
            <span>Built &bull; Optimized &bull; </span>
            <span class="text-white font-bold bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                Powered by EFerz (<a href="https://eferz.com" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">EFerz.com</a>)
            </span>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
