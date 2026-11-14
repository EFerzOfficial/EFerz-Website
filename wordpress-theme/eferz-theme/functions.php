<?php
/**
 * EFerz Digital Studio - Theme Functions and Definitions
 *
 * @package EFerz
 * @version 1.1.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * GitHub Automatic Theme Update Support Header
 * Used by 'GitHub Theme Updater' & 'WP Pusher'
 */
define('EFERZ_THEME_VERSION', '1.1.0');

/**
 * 1. HTTP Security & Trust Headers (Fixes Scam Detector / Security Scanner Trust Score)
 */
function eferz_send_security_headers() {
    if (!headers_sent()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
        header('Permissions-Policy: camera=(self), microphone=(self), geolocation=()');
        if (is_ssl()) {
            header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
        }
    }
}
add_action('send_headers', 'eferz_send_security_headers');

// Disable XML-RPC pingbacks & obscure WP version for security scanners
add_filter('xmlrpc_enabled', '__return_false');
remove_action('wp_head', 'wp_generator');

/**
 * Route-aware SEO configuration (synced with React T3 & m6) so crawlers receive
 * unique, high-CTR titles, descriptions, canonicals & keywords before hydration.
 */
function eferz_get_route_seo() {
    $req_path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');
    $first_seg = strtolower(explode('/', $req_path)[0] ?? '');
    $query_route = isset($_GET['eferz_spa_route']) ? strtolower(sanitize_text_field($_GET['eferz_spa_route'])) : '';
    $route = $query_route ?: ($first_seg === 'portfolio' ? 'work' : ($first_seg ?: 'agency'));
    $is_ar = isset($_GET['lang']) && strtolower(sanitize_text_field($_GET['lang'])) === 'ar';

    $routes = array(
        'agency' => array(
            'title' => 'EFerz Digital Agency | AI, 3D WebGL, SEO & Software',
            'titleAr' => 'وكالة إيفرز الرقمية | ذكاء اصطناعي ومواقع 3D وسيو',
            'desc' => 'Global AI automation, 3D WebGL websites, Shopify Plus, Amazon FBA, technical SEO & cloud cybersecurity by EFerz (USA, KSA, PAK). Start your project.',
            'descAr' => 'حلول الذكاء الاصطناعي، مواقع 3D WebGL، متاجر شوبيفاي، أمازون FBA، السيو والأمن السيبراني من إيفرز (أمريكا والسعودية وباكستان). ابدأ مشروعك اليوم.',
            'keywords' => 'EFerz Digital Agency, AI Development Agency, Bespoke AI Agents, 3D WebGL Website Design, Custom Software Engineering, Shopify Plus & Amazon FBA Agency, Technical SEO Agency, Zero Trust Cybersecurity, Riyadh Digital Agency, Fort Lauderdale Web Design Agency',
            'slug' => '',
        ),
        'services' => array(
            'title' => 'Enterprise Web, AI, SEO & Cloud Services | EFerz',
            'titleAr' => 'خدمات الويب والذكاء الاصطناعي والسيو | وكالة إيفرز',
            'desc' => 'Explore EFerz digital services: custom AI agents, 3D WebGL sites, Shopify Plus, Amazon FBA, technical SEO, UI/UX & cloud security. Request a proposal.',
            'descAr' => 'استكشف خدمات إيفرز المتكاملة: وكلاء الذكاء الاصطناعي، مواقع ثلاثية الأبعاد، شوبيفاي بلس، أمازون FBA، السيو والأمن السحابي. اطلب عرض سعر لمشروعك.',
            'keywords' => 'Full Stack Web Development Services, Custom AI Agent Development, Shopify Plus Store Development, Amazon FBA Private Label Management, Technical SEO & PPC Management, Brand Identity & UI UX Design, Zero Trust Cloud Cybersecurity',
            'slug' => 'services',
        ),
        'work' => array(
            'title' => 'Case Studies: 3D Web, AI & E-Commerce Portfolio | EFerz',
            'titleAr' => 'معرض الأعمال: مواقع 3D ومتاجر وذكاء اصطناعي | إيفرز',
            'desc' => 'Explore 17+ verified EFerz case studies across desktop, tablet & mobile — 3D WebGL apps, Shopify Plus stores, SaaS & AI automation. View live results.',
            'descAr' => 'تصفح أكثر من 17 مشروعاً موثقاً من إيفرز على الكمبيوتر والتابلت والجوال — تطبيقات ثلاثية الأبعاد، متاجر شوبيفاي ومنصات ذكاء اصطناعي. شاهد النتائج.',
            'keywords' => 'Web Design Portfolio, E-Commerce Case Studies, 3D Interactive Website Showcase, UI UX Design Case Studies, Shopify & WordPress Portfolio, Enterprise Software Projects',
            'slug' => 'work',
        ),
        'clients' => array(
            'title' => 'Verified Client Reviews & Global Case Studies | EFerz',
            'titleAr' => 'آراء العملاء العالميين وقصص النجاح | وكالة إيفرز',
            'desc' => 'Headquartered in Florida USA with offices in Riyadh & Pakistan, EFerz delivers 98% client retention across AI, web & growth. Read CEO testimonials.',
            'descAr' => 'مقرنا في أمريكا مع مكاتب في الرياض وباكستان بنسبة احتفاظ 98% في الذكاء الاصطناعي والويب والتسويق الرقمي. اقرأ شهادات المؤسسين والعملاء.',
            'keywords' => 'EFerz Client Reviews, Verified Digital Agency Testimonials, Enterprise Software Client Stories, Top Rated Web & AI Agency USA KSA Pakistan Worldwide',
            'slug' => 'clients',
        ),
        'team' => array(
            'title' => 'Leadership & Principal Software Architects | EFerz',
            'titleAr' => 'فريق القيادة ومهندسو البرمجيات والذكاء | إيفرز',
            'desc' => 'Meet EFerz leadership: Khubaib Khan, Salman Shahid, Irfan Mirza & principal WebGL, AI and cybersecurity architects across USA, KSA & Pakistan.',
            'descAr' => 'تعرف على قيادة وكالة إيفرز: خبيب خان، سلمان شاهد، عرفان مرزا وفريق مهندسي الذكاء الاصطناعي والويب والأمن السيبراني. تواصل مع فريقنا الآن.',
            'keywords' => 'EFerz Leadership Team, Khubaib Khan EFerz, Salman Shahid EFerz, Irfan Mirza EFerz, Principal Software Architects, AI & WebGL Engineers',
            'slug' => 'team',
        ),
        'about' => array(
            'title' => 'About EFerz | Global AI & Tech Agency (USA · KSA · PAK)',
            'titleAr' => 'عن وكالة إيفرز | شركة تقنية عالمية منذ 2020',
            'desc' => 'Founded October 2020 in Fort Lauderdale USA with Riyadh & Karachi offices, EFerz engineers scalable AI, WebGL & cloud systems. Learn how we build.',
            'descAr' => 'تأسست إيفرز في أكتوبر 2020 في أمريكا مع مكاتب في الرياض وكراتشي لبناء أنظمة الذكاء الاصطناعي ومواقع WebGL والحوسبة السحابية. اكتشف قصتنا.',
            'keywords' => 'About EFerz Digital Agency, Founded October 10 2020, Global IT & AI Company USA KSA PAK, Software Agency Mission & Core Pillars',
            'slug' => 'about',
        ),
        'blog' => array(
            'title' => 'Engineering, AI, SEO & WebGL Blog Playbooks | EFerz',
            'titleAr' => 'مدونة الهندسة والذكاء الاصطناعي والسيو | وكالة إيفرز',
            'desc' => 'Read technical guides from EFerz engineers on LLMs, 3D WebGL performance, Core Web Vitals, technical SEO & Shopify conversion optimization. Explore now.',
            'descAr' => 'اقرأ أدلة هندسية من خبراء إيفرز حول الذكاء الاصطناعي، أداء مواقع WebGL، مؤشرات Core Web Vitals وتحسين محركات البحث سيو. تصفح المقالات الآن.',
            'keywords' => 'AI Engineering Blog, 3D WebGL & Next.js Performance Guide, Technical SEO Playbook, Shopify Plus Conversion Optimization, Enterprise Cybersecurity Best Practices',
            'slug' => 'blog',
        ),
        'contact' => array(
            'title' => 'Contact EFerz | Start Your AI or Web Project Today',
            'titleAr' => 'تواصل مع إيفرز | ابدأ مشروعك الرقمي اليوم',
            'desc' => 'Launch your AI, software, e-commerce or SEO project with EFerz. Connect with our Fort Lauderdale USA, Riyadh KSA & Pakistan teams for a free quote.',
            'descAr' => 'أطلق مشروعك في الذكاء الاصطناعي أو الويب أو المتاجر الإلكترونية مع إيفرز. تواصل مع مكاتبنا في أمريكا والرياض وباكستان للحصول على استشارة مجانية.',
            'keywords' => 'Contact EFerz Digital Agency, Hire Web & AI Developers USA KSA, Request Software Development Proposal, Riyadh & Florida IT Consultation',
            'slug' => 'contact',
        ),
        'lets-build' => array(
            'title' => 'Let’s Build 3D Studio | Interactive WebGL Configurator',
            'titleAr' => 'استوديو البناء ثلاثي الأبعاد التفاعلي | وكالة إيفرز',
            'desc' => 'Customize a live 3D WebGL brand experience with your logo, colors & packaging inside the EFerz Interactive 3D Studio. Try the real-time demo.',
            'descAr' => 'صمم تجربة موقع ثلاثية الأبعاد حية بشعارك وألوان علامتك ومنتجاتك داخل استوديو إيفرز التفاعلي في الوقت الفعلي. جرّب العرض المباشر الآن.',
            'keywords' => 'Interactive 3D Website Builder, Live WebGL Product Customizer, 3D Beverage Can & Packaging Configurator, EFerz 3D Studio Demo',
            'slug' => 'lets-build',
        ),
        'privacy' => array(
            'title' => 'Privacy Policy & Data Protection Standards | EFerz',
            'titleAr' => 'سياسة الخصوصية وحماية البيانات | وكالة إيفرز',
            'desc' => 'Review EFerz Digital Agency privacy policy covering GDPR, CCPA compliance, enterprise encryption & client confidentiality. Read our data practices.',
            'descAr' => 'اطلع على سياسة الخصوصية الرسمية في وكالة إيفرز الرقمية ومعايير الامتثال GDPR والتشفير وحماية سرية بيانات العملاء. اقرأ التفاصيل كاملة.',
            'keywords' => 'EFerz Privacy Policy, GDPR CCPA Data Protection, Client Confidentiality & Security',
            'slug' => 'privacy',
        ),
        'terms' => array(
            'title' => 'Terms of Service & Enterprise SLA Terms | EFerz',
            'titleAr' => 'شروط الخدمة واتفاقية العملاء | وكالة إيفرز',
            'desc' => 'Read EFerz Digital Agency Terms of Service, 100% client IP ownership, milestone billing & SLA commitments for software projects. View terms.',
            'descAr' => 'اقرأ شروط الخدمة واتفاقية مستوى الخدمة وضمان نقل الملكية الفكرية بنسبة 100% لمشاريع البرمجة والتصميم في وكالة إيفرز. تصفح الشروط الآن.',
            'keywords' => 'EFerz Terms of Service, 100% IP Ownership Software Agreement, Digital Agency SLA Terms',
            'slug' => 'terms',
        ),
        'refund' => array(
            'title' => 'Refund Policy & 30-Day Project Guarantee | EFerz',
            'titleAr' => 'سياسة الاسترداد وضمان 30 يوماً | وكالة إيفرز',
            'desc' => 'Explore EFerz Digital Agency 30-Day Money-Back Guarantee and milestone approval policy for risk-free digital & software delivery. Learn more.',
            'descAr' => 'تعرف على سياسة الاسترداد وضمان الرضا لمدة 30 يوماً واعتماد مراحل التسليم الآمن للمشاريع مع وكالة إيفرز الرقمية. اطلع على التفاصيل الآن.',
            'keywords' => 'EFerz Refund Policy, 30 Day Money Back Guarantee Agency, Risk Free Software Development',
            'slug' => 'refund',
        ),
    );

    $cfg = $routes[$route] ?? $routes['agency'];
    $base_url = 'https://eferz.com/' . ($cfg['slug'] ? $cfg['slug'] : '');
    return array(
        'route'     => isset($routes[$route]) ? $route : 'agency',
        'is_ar'     => $is_ar,
        'title'     => $is_ar ? $cfg['titleAr'] : $cfg['title'],
        'desc'      => $is_ar ? $cfg['descAr'] : $cfg['desc'],
        'keywords'  => $cfg['keywords'],
        'canonical' => $base_url,
    );
}

function eferz_theme_setup() {
    // Let WordPress manage the document title dynamically per route
    add_theme_support('title-tag');

    add_filter('pre_get_document_title', function($title) {
        $seo = eferz_get_route_seo();
        return $seo['title'];
    }, 999999);

    // Enable Featured Images
    add_theme_support('post-thumbnails');

    // Register Navigation Menus
    register_nav_menus(array(
        'primary-menu' => esc_html__('Primary Header Menu', 'eferz'),
        'footer-menu'  => esc_html__('Footer Quick Links', 'eferz'),
    ));

    // HTML5 markup support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Custom Logo Support
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 260,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Full WooCommerce Support & Product Gallery
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}
add_action('after_setup_theme', 'eferz_theme_setup');

/**
 * Enqueue scripts, styles and WooCommerce luxury dark styling.
 */
function eferz_theme_scripts() {
    // Custom WooCommerce Dark Luxury Styling
    if (function_exists('is_woocommerce') && (is_woocommerce() || is_cart() || is_checkout() || is_account_page())) {
        $custom_wc_css = "
        .woocommerce, .woocommerce-page { color: #fffdff !important; font-family: 'Plus Jakarta Sans', system-ui, sans-serif !important; }
        .woocommerce ul.products li.product { background: rgba(7, 9, 15, 0.88) !important; border: 1px solid rgba(255, 255, 255, 0.12) !important; border-radius: 1.25rem !important; padding: 1.25rem !important; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important; backdrop-filter: blur(16px) !important; text-align: center; }
        .woocommerce ul.products li.product:hover { border-color: #d02128 !important; box-shadow: 0 12px 36px rgba(208, 33, 40, 0.28) !important; transform: translateY(-4px) !important; }
        .woocommerce ul.products li.product .woocommerce-loop-product__title { color: #fffdff !important; font-weight: 800 !important; font-size: 1.15rem !important; margin-top: 0.85rem !important; }
        .woocommerce ul.products li.product .price, .woocommerce div.product p.price, .woocommerce div.product span.price { color: #ff4d49 !important; font-family: 'Space Grotesk', monospace !important; font-weight: 700 !important; font-size: 1.1rem !important; }
        .woocommerce ul.products li.product .button, .woocommerce div.product form.cart .button, .woocommerce #respond input#submit, .woocommerce a.button, .woocommerce button.button, .woocommerce input.button { background: linear-gradient(135deg, #d02128, #ff3b30) !important; color: #ffffff !important; border-radius: 9999px !important; padding: 0.75rem 1.6rem !important; font-family: 'Space Grotesk', monospace !important; font-weight: 700 !important; font-size: 0.8rem !important; text-transform: uppercase !important; letter-spacing: 0.12em !important; border: none !important; transition: all 0.25s ease !important; box-shadow: 0 0 20px rgba(208, 33, 40, 0.45) !important; cursor: pointer !important; }
        .woocommerce ul.products li.product .button:hover, .woocommerce div.product form.cart .button:hover, .woocommerce a.button:hover, .woocommerce button.button:hover, .woocommerce input.button:hover { transform: scale(1.03) !important; box-shadow: 0 0 35px rgba(208, 33, 40, 0.75) !important; }
        .woocommerce-message, .woocommerce-info, .woocommerce-error { background: rgba(7, 9, 15, 0.95) !important; border-radius: 1rem !important; backdrop-filter: blur(20px) !important; color: #fffdff !important; border-left: 4px solid #d02128 !important; }
        .woocommerce-message { border-left-color: #10b981 !important; }
        .woocommerce-info { border-left-color: #38bdf8 !important; }
        .woocommerce input.input-text, .woocommerce select, .woocommerce textarea { background-color: rgba(4, 7, 15, 0.92) !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; border-radius: 0.75rem !important; color: #fffdff !important; padding: 0.75rem 1rem !important; }
        .woocommerce input.input-text:focus, .woocommerce select:focus, .woocommerce textarea:focus { border-color: #d02128 !important; outline: none !important; box-shadow: 0 0 14px rgba(208, 33, 40, 0.45) !important; }
        .woocommerce table.shop_table { background: rgba(7, 9, 15, 0.82) !important; border: 1px solid rgba(255, 255, 255, 0.12) !important; border-radius: 1.25rem !important; overflow: hidden !important; }
        .woocommerce table.shop_table th { color: #fffdff !important; font-family: 'Space Grotesk', monospace !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important; }
        .woocommerce table.shop_table td { border-top: 1px solid rgba(255, 255, 255, 0.08) !important; color: rgba(255, 255, 255, 0.88) !important; }
        #payment { background: rgba(4, 7, 15, 0.96) !important; border: 1px solid rgba(255, 255, 255, 0.15) !important; border-radius: 1.25rem !important; }
        #payment div.payment_box { background: rgba(255, 255, 255, 0.06) !important; color: #fffdff !important; border-radius: 0.75rem !important; }
        ";
        wp_add_inline_style('woocommerce-general', $custom_wc_css);
    }
}
add_action('wp_enqueue_scripts', 'eferz_theme_scripts');

/**
 * 2. Verified Schema.org Organization, ProfessionalService & WebSite JSON-LD
 * Provides domain trust signals for Scam Detector, Google Knowledge Graph, and Security Crawlers.
 */
function eferz_seo_schema_jsonld() {
    $schema = array(
        '@context' => 'https://schema.org',
        '@graph'   => array(
            array(
                '@type'        => array('Organization', 'ProfessionalService'),
                '@id'          => 'https://eferz.com/#organization',
                'name'         => 'EFerz Digital Agency',
                'legalName'    => 'EFerz Digital Agency',
                'url'          => 'https://eferz.com/',
                'logo'         => 'https://eferz.com/wp-content/uploads/2026/08/Logo-scaled.png',
                'foundingDate' => '2020-10-10',
                'description'  => 'Founded in 2020, EFerz Digital Agency is a global IT, AI, 3D WebGL, eCommerce, and Cybersecurity agency headquartered in Fort Lauderdale, Florida, USA with regional offices in Riyadh, Saudi Arabia and Karachi, Pakistan — entertaining and serving clients worldwide.',
                'email'        => 'info@eferz.com',
                'telephone'    => '+1-786-224-4112',
                'priceRange'   => '$$$',
                'areaServed'   => 'Worldwide',
                'founders'     => array(
                    array(
                        '@type'    => 'Person',
                        'name'     => 'Khubaib Khan',
                        'jobTitle' => 'Founder & President',
                        'sameAs'   => array(
                            'https://www.linkedin.com/in/khubaibkhan/',
                            'https://www.facebook.com/KhuBaiB.kK/',
                            'https://www.instagram.com/khubaibkhan_kk/',
                        ),
                    ),
                    array(
                        '@type'    => 'Person',
                        'name'     => 'Salman Shahid',
                        'jobTitle' => 'Co-Founder & Director of Finance & Legal Affairs',
                        'sameAs'   => array(
                            'https://www.linkedin.com/in/salmanshahidofficial/',
                            'https://www.facebook.com/maanshahid',
                            'https://www.instagram.com/maanshahid/',
                        ),
                    ),
                ),
                'employee'     => array(
                    array(
                        '@type'    => 'Person',
                        'name'     => 'Irfan Mirza',
                        'jobTitle' => 'Director of Business Development',
                        'sameAs'   => array('https://www.linkedin.com/in/irfan-mirza-76a375255/'),
                    ),
                    array(
                        '@type'    => 'Person',
                        'name'     => 'Syed Ahmed',
                        'jobTitle' => 'Business Development Manager',
                    ),
                    array(
                        '@type'    => 'Person',
                        'name'     => 'Asad Malik',
                        'jobTitle' => 'Website Designer & Developer',
                    ),
                    array(
                        '@type'    => 'Person',
                        'name'     => 'Syed Owais',
                        'jobTitle' => 'Operations Coordinator',
                    ),
                ),
                'address'      => array(
                    array(
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => '701 E Commercial Blvd',
                        'addressLocality' => 'Fort Lauderdale',
                        'addressRegion'   => 'FL',
                        'postalCode'      => '33334',
                        'addressCountry'  => 'US',
                    ),
                    array(
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => 'Dammam Road, Khurais',
                        'addressLocality' => 'Riyadh',
                        'postalCode'      => '13525',
                        'addressCountry'  => 'SA',
                    ),
                    array(
                        '@type'           => 'PostalAddress',
                        'addressLocality' => 'Karachi',
                        'addressCountry'  => 'PK',
                    ),
                ),
                'sameAs'       => array(
                    'https://www.facebook.com/EFerzOfficial',
                    'https://www.instagram.com/EFerzOfficial',
                    'https://www.linkedin.com/company/EFerz/',
                    'https://www.youtube.com/@EFerzOfficial',
                ),
            ),
            array(
                '@type'     => 'WebSite',
                '@id'       => 'https://eferz.com/#website',
                'url'       => 'https://eferz.com/',
                'name'      => 'EFerz Digital Agency',
                'publisher' => array('@id' => 'https://eferz.com/#organization'),
            ),
        ),
    );
    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
}
add_action('wp_head', 'eferz_seo_schema_jsonld');

/**
 * 3. Contact Form REST API Endpoint (/wp-json/eferz/v1/contact)
 *    + Anti-Spam Quiz Verification + wp_mail() Delivery + WP Admin Leads Log + WPForms Hook
 */
add_action('rest_api_init', function() {
    register_rest_route('eferz/v1', '/contact', array(
        'methods'             => 'POST',
        'permission_callback' => '__return_true',
        'callback'            => 'eferz_handle_contact_submission',
    ));
});

function eferz_handle_contact_submission(WP_REST_Request $request) {
    $params = $request->get_json_params();
    if (!is_array($params)) {
        $params = $request->get_params();
    }

    // 1. Honeypot Check
    $honeypot = isset($params['honeypot']) ? trim(sanitize_text_field($params['honeypot'])) : '';
    if (!empty($honeypot)) {
        return new WP_REST_Response(array('success' => false, 'message' => 'Spam blocked.'), 400);
    }

    // 2. Anti-Spam "I am not a robot" & Math Quiz Check
    $not_robot   = !empty($params['not_robot']);
    $quiz_a      = isset($params['quiz_a']) ? intval($params['quiz_a']) : 0;
    $quiz_b      = isset($params['quiz_b']) ? intval($params['quiz_b']) : 0;
    $quiz_answer = isset($params['quiz_answer']) ? intval($params['quiz_answer']) : -1;

    if (!$not_robot || ($quiz_a + $quiz_b) !== $quiz_answer) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Human verification failed. Please complete the I am not a robot security quiz.',
        ), 400);
    }

    // 3. Sanitize Input Fields
    $name    = sanitize_text_field($params['name'] ?? '');
    $email   = sanitize_email($params['email'] ?? '');
    $phone   = sanitize_text_field($params['phone'] ?? '');
    $company = sanitize_text_field($params['company'] ?? '');
    $service = sanitize_text_field($params['service'] ?? 'General Inquiry');
    $message = sanitize_textarea_field($params['message'] ?? '');
    $source  = sanitize_text_field($params['source'] ?? 'EFerz Website');

    if (empty($name) || empty($email) || !is_email($email)) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Please provide a valid name and email address.',
        ), 400);
    }

    // 4. Store Submission in WordPress Database (so ZERO leads are ever lost!)
    $leads = get_option('eferz_contact_leads', array());
    if (!is_array($leads)) {
        $leads = array();
    }
    $new_lead = array(
        'id'         => uniqid('eferz_'),
        'date'       => current_time('mysql'),
        'name'       => $name,
        'email'      => $email,
        'phone'      => $phone,
        'company'    => $company,
        'service'    => $service,
        'message'    => $message,
        'source'     => $source,
        'ip'         => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
    );
    array_unshift($leads, $new_lead);
    update_option('eferz_contact_leads', array_slice($leads, 0, 500), false);

    // 5. Optional WPForms Entry Sync (if WPForms Pro entry handler is active)
    if (function_exists('wpforms') && isset(wpforms()->entry) && method_exists(wpforms()->entry, 'add')) {
        $forms = get_posts(array('post_type' => 'wpforms', 'posts_per_page' => 1, 'post_status' => 'publish'));
        if (!empty($forms)) {
            $form_id = $forms[0]->ID;
            @wpforms()->entry->add(array(
                'form_id' => $form_id,
                'fields'  => wp_json_encode(array(
                    array('name' => 'Name', 'value' => $name, 'id' => 1, 'type' => 'name'),
                    array('name' => 'Email', 'value' => $email, 'id' => 2, 'type' => 'email'),
                    array('name' => 'Phone', 'value' => $phone, 'id' => 3, 'type' => 'phone'),
                    array('name' => 'Company', 'value' => $company, 'id' => 4, 'type' => 'text'),
                    array('name' => 'Service', 'value' => $service, 'id' => 5, 'type' => 'text'),
                    array('name' => 'Message', 'value' => $message, 'id' => 6, 'type' => 'textarea'),
                )),
                'date'    => current_time('mysql'),
            ));
        }
    }

    // 6. Send Formatted HTML Email via wp_mail() to info@eferz.com, khubaibkhankk91@gmail.com, AND WordPress Admin Email
    $admin_email = get_option('admin_email');
    $recipients  = array_unique(array_filter(array('info@eferz.com', 'khubaibkhankk91@gmail.com', $admin_email)));

    $subject = sprintf('[EFerz New Lead] %s — %s (%s)', $name, $service, $company ? $company : 'Direct Inquiry');

    $html_body = '
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #0b0e17; color: #ffffff; padding: 28px; border-radius: 16px; border: 1px solid #d02128;">
        <h2 style="margin-top: 0; color: #d02128; text-transform: uppercase; letter-spacing: 1px;">New Verified Project Inquiry — EFerz Digital Agency</h2>
        <p style="color: #cbd5e1; font-size: 13px;">Verified via Anti-Spam Human Security Quiz on eferz.com</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8; width: 150px;"><strong>Full Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #ffffff;">' . esc_html($name) . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Email Address:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #38bdf8;"><a href="mailto:' . esc_attr($email) . '" style="color: #38bdf8;">' . esc_html($email) . '</a></td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Phone / WhatsApp:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #ffffff;">' . esc_html($phone ?: 'N/A') . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Company / Brand:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #ffffff;">' . esc_html($company ?: 'N/A') . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Primary Service:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #f59e0b;">' . esc_html($service) . '</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8;"><strong>Project Brief:</strong></td><td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #ffffff; white-space: pre-wrap;">' . esc_html($message) . '</td></tr>
            <tr><td style="padding: 10px; color: #94a3b8;"><strong>Submitted At:</strong></td><td style="padding: 10px; color: #94a3b8;">' . esc_html(current_time('mysql')) . ' (' . esc_html($source) . ')</td></tr>
        </table>
    </div>';

    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'Reply-To: ' . $name . ' <' . $email . '>',
    );

    $mail_sent = @wp_mail($recipients, $subject, $html_body, $headers);

    return new WP_REST_Response(array(
        'success'   => true,
        'mail_sent' => (bool) $mail_sent,
        'message'   => 'Your inquiry has been received and dispatched to EFerz Digital Agency.',
    ), 200);
}

/**
 * 4. Add "EFerz Leads" Page in WordPress Admin Dashboard so the owner can view all form submissions directly in wp-admin!
 */
add_action('admin_menu', function() {
    add_menu_page(
        'EFerz Contact Leads',
        'EFerz Leads',
        'manage_options',
        'eferz-leads',
        'eferz_render_admin_leads_page',
        'dashicons-email-alt',
        26
    );
});

function eferz_render_admin_leads_page() {
    $leads = get_option('eferz_contact_leads', array());
    ?>
    <div class="wrap">
        <h1 style="display:flex;align-items:center;gap:10px;">
            <span class="dashicons dashicons-shield-alt" style="color:#d02128;"></span>
            EFerz Website Contact Form Submissions (Verified Anti-Spam Leads)
        </h1>
        <p>All submissions from the EFerz Contact Form are automatically emailed to <strong>info@eferz.com</strong> and <strong><?php echo esc_html(get_option('admin_email')); ?></strong>, and safely stored below.</p>
        <?php if (empty($leads)) : ?>
            <div class="notice notice-info"><p>No contact form submissions recorded yet.</p></div>
        <?php else : ?>
            <table class="widefat fixed striped" style="margin-top:15px;">
                <thead>
                    <tr>
                        <th style="width:140px;">Date</th>
                        <th style="width:150px;">Name</th>
                        <th style="width:180px;">Email</th>
                        <th style="width:130px;">Phone / WhatsApp</th>
                        <th style="width:140px;">Company</th>
                        <th style="width:180px;">Service</th>
                        <th>Project Brief / Message</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($leads as $lead) : ?>
                        <tr>
                            <td><?php echo esc_html($lead['date'] ?? ''); ?></td>
                            <td><strong><?php echo esc_html($lead['name'] ?? ''); ?></strong></td>
                            <td><a href="mailto:<?php echo esc_attr($lead['email'] ?? ''); ?>"><?php echo esc_html($lead['email'] ?? ''); ?></a></td>
                            <td><?php echo esc_html($lead['phone'] ?? ''); ?></td>
                            <td><?php echo esc_html($lead['company'] ?? ''); ?></td>
                            <td><?php echo esc_html($lead['service'] ?? ''); ?></td>
                            <td><?php echo nl2br(esc_html($lead['message'] ?? '')); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * 5. SPA Routes Support: /services, /work, /clients, /team, /contact, /blog, etc.
 */
function eferz_add_spa_rewrites() {
    $spa_routes = array('services', 'work', 'portfolio', 'clients', 'team', 'contact', 'blog', 'about', 'privacy', 'terms', 'refund', 'lets-build');
    foreach ($spa_routes as $route) {
        add_rewrite_rule('^' . $route . '/?$', 'index.php?eferz_spa_route=' . $route, 'top');
    }
}
add_action('init', 'eferz_add_spa_rewrites');

add_filter('query_vars', function($vars) {
    $vars[] = 'eferz_spa_route';
    return $vars;
});

add_filter('template_include', function($template) {
    $spa_routes = array('services', 'work', 'portfolio', 'clients', 'team', 'contact', 'blog', 'about', 'privacy', 'terms', 'refund', 'lets-build');
    $req_path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $first_seg = explode('/', $req_path)[0] ?? '';

    // Route WooCommerce pages (shop, products, cart, checkout, my-account) to custom luxury template
    $wc_routes = array('shop', 'cart', 'checkout', 'my-account', 'product', 'product-category');
    if (in_array($first_seg, $wc_routes, true) || (function_exists('is_woocommerce') && (is_woocommerce() || is_cart() || is_checkout() || is_account_page()))) {
        $wc_template = get_template_directory() . '/woocommerce.php';
        if (file_exists($wc_template)) {
            return $wc_template;
        }
    }

    if (is_front_page() || in_array($first_seg, $spa_routes, true) || get_query_var('eferz_spa_route') || is_404()) {
        $front = get_template_directory() . '/front-page.php';
        if (file_exists($front)) {
            return $front;
        }
    }
    return $template;
}, 999999);

/**
 * Clean body classes on front page and SPA routes to prevent page-builder stylesheet clashes
 */
add_filter('body_class', function($classes) {
    $spa_routes = array('services', 'work', 'portfolio', 'clients', 'team', 'contact', 'blog', 'about', 'privacy', 'terms', 'refund', 'lets-build');
    $req_path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $first_seg = explode('/', $req_path)[0] ?? '';

    if (is_front_page() || in_array($first_seg, $spa_routes, true)) {
        $classes = array_diff($classes, array(
            'elementor-page-2609',
            'elementor-page-2605',
            'elementor-page-6133'
        ));
        $classes[] = 'eferz-flagship-active';
    }
    return $classes;
}, 999999);
