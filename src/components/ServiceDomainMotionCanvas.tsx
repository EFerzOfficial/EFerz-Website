import React, { useEffect, useRef } from 'react';
import { OfficialEFerzService } from '../data/servicesData';

interface ServiceDomainMotionCanvasProps {
  service: OfficialEFerzService;
  variant?: 'hero' | 'node' | 'core' | 'deploy' | 'card';
  subIndex?: number;
  className?: string;
}

/**
 * Pure 60fps HTML5 Canvas + Procedural Motion Engine.
 * Zero static <img> dependencies — renders a completely unique, live animated
 * visual world tailored to each of the 11 EFerz services AND each sub-service card.
 */
export function ServiceDomainMotionCanvas({
  service,
  variant = 'hero',
  subIndex = 0,
  className = '',
}: ServiceDomainMotionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let isVisible = true;
    let width = (canvas.width = canvas.clientWidth || 800);
    let height = (canvas.height = canvas.clientHeight || 500);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth || 800;
      height = canvas.height = canvas.clientHeight || 500;
    };
    window.addEventListener('resize', handleResize);

    const accent = service.accentColor;
    const secondary = service.secondaryColor;
    const startTime = performance.now() + subIndex * 1700;

    // Pre-seed particles for smooth ambient depth (exact original quantity)
    const particles = Array.from({ length: variant === 'card' ? 46 : 92 }, (_, i) => ({
      x: ((i * 97) % 100) / 100,
      y: ((i * 53) % 100) / 100,
      r: 0.95 + (i % 3) * 0.55,
      vx: ((i % 2 === 0 ? 1 : -1) * (0.00018 + (i % 5) * 0.00006)),
      vy: -0.00022 - (i % 4) * 0.00008,
      phase: i * 0.7,
    }));

    const render = (now: number) => {
      if (!isVisible || document.hidden) {
        rafId = requestAnimationFrame(render);
        return;
      }
      const t = (now - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      // 1. Deep Atmospheric Gradient Base (Transparent in hero mode so 3D star constellation behind stays crystal clear)
      if (variant === 'hero') {
        const heroGrad = ctx.createRadialGradient(
          width * 0.25,
          height * 0.73,
          10,
          width * 0.25,
          height * 0.73,
          Math.max(width, height) * 0.48
        );
        heroGrad.addColorStop(0, `${accent}24`);
        heroGrad.addColorStop(0.5, `${secondary}10`);
        heroGrad.addColorStop(1, 'rgba(4,5,9,0)');
        ctx.fillStyle = heroGrad;
        ctx.fillRect(0, 0, width, height);
      } else {
        const bgGrad = ctx.createRadialGradient(
          width * (0.5 + Math.sin(t * 0.4) * 0.12),
          height * (0.45 + Math.cos(t * 0.3) * 0.1),
          10,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.85
        );
        bgGrad.addColorStop(0, `${accent}26`);
        bgGrad.addColorStop(0.48, `${secondary}12`);
        bgGrad.addColorStop(1, '#040509');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Ambient Floating Domain Particles
      particles.forEach((p, idx) => {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        const px = p.x * width;
        const py = p.y * height;
        const alpha = 0.24 + 0.38 * (0.5 + 0.5 * Math.sin(t * 2 + p.phase));
        ctx.fillStyle = idx % 4 === 0 ? `${accent}33` : `rgba(255,255,255,${(alpha * 0.35).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(px, py, p.r * 2.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      const isHero = variant === 'hero';
      // For full-screen hero slides, position the procedural motion artwork in the bottom-left
      // area so the 3D star constellation in the center/upper-right and the motion video both stay 100% visible!
      const cx = isHero ? width * 0.25 : width * 0.5;
      const cy = isHero ? height * 0.73 : height * 0.5;
      // Slightly larger procedural icon/artwork scale (+8%)
      const scale =
        Math.min(width, height) /
        (variant === 'card' ? 295 : isHero ? 755 : 570);

      ctx.save();
      ctx.translate(cx, cy);

      // ============================================================
      // SERVICE-SPECIFIC LIVE PROCEDURAL MOTION ARTWORK
      // ============================================================
      switch (service.id) {
        // ----------------------------------------------------------
        // 01. WEB DESIGN & DEVELOPMENT: Animated Multi-Device Browser & UI Wireframes
        // ----------------------------------------------------------
        case 'web-design-development': {
          // Perspective grid floor
          ctx.strokeStyle = `${accent}28`;
          ctx.lineWidth = 1;
          for (let i = -6; i <= 6; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 45 * scale, -180 * scale);
            ctx.lineTo(i * 75 * scale, 200 * scale);
            ctx.stroke();
          }

          // Floating Desktop Browser Window
          const bw = 260 * scale;
          const bh = 165 * scale;
          const floatY = Math.sin(t * 1.4) * 8 * scale;

          ctx.save();
          ctx.translate(-20 * scale, floatY);
          ctx.fillStyle = 'rgba(8, 14, 26, 0.86)';
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 10 * scale);
          ctx.fill();
          ctx.stroke();

          // Browser Top Traffic Dots
          ['#ef4444', '#f59e0b', '#22c55e'].forEach((col, idx) => {
            ctx.fillStyle = col;
            ctx.beginPath();
            ctx.arc(-bw / 2 + (16 + idx * 12) * scale, -bh / 2 + 14 * scale, 3.5 * scale, 0, Math.PI * 2);
            ctx.fill();
          });

          // Animated Hero Banner & Responsive Grid Blocks inside Browser
          const pulseW = (0.65 + 0.25 * Math.sin(t * 1.8)) * (bw - 32 * scale);
          ctx.fillStyle = `${accent}35`;
          ctx.fillRect(-bw / 2 + 16 * scale, -bh / 2 + 30 * scale, bw - 32 * scale, 44 * scale);
          ctx.fillStyle = accent;
          ctx.fillRect(-bw / 2 + 24 * scale, -bh / 2 + 44 * scale, pulseW, 8 * scale);

          // 3 Animated Responsive Cards inside Browser
          for (let c = 0; c < 3; c++) {
            const cw = (bw - 48 * scale) / 3;
            const cxCard = -bw / 2 + 16 * scale + c * (cw + 8 * scale);
            const cyCard = -bh / 2 + 86 * scale + Math.sin(t * 2.2 + c) * 3 * scale;
            ctx.fillStyle = 'rgba(255,255,255,0.07)';
            ctx.strokeStyle = `${accent}66`;
            ctx.strokeRect(cxCard, cyCard, cw, 58 * scale);
            ctx.fillRect(cxCard, cyCard, cw, 58 * scale);
          }
          ctx.restore();

          // Floating Mobile Phone Frame on Right
          ctx.save();
          ctx.translate(115 * scale, 22 * scale - floatY * 1.1);
          ctx.fillStyle = 'rgba(10, 16, 30, 0.94)';
          ctx.strokeStyle = secondary;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-42 * scale, -78 * scale, 84 * scale, 156 * scale, 12 * scale);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = `${secondary}40`;
          ctx.fillRect(-32 * scale, -56 * scale, 64 * scale, 42 * scale);
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          ctx.fillRect(-32 * scale, -4 * scale, 64 * scale, 24 * scale);
          ctx.fillRect(-32 * scale, 28 * scale, 64 * scale, 24 * scale);
          ctx.restore();
          break;
        }

        // ----------------------------------------------------------
        // 02. DIGITAL MARKETING: Live Rising ROAS Bars, Conversion Funnel & Google/Social Radar
        // ----------------------------------------------------------
        case 'digital-marketing': {
          // Circular Target & ROAS Growth Radar
          for (let r = 1; r <= 3; r++) {
            ctx.strokeStyle = `${accent}${r === 1 ? '55' : '28'}`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(0, 0, r * 68 * scale, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Animated Rising Revenue & Traffic Bars
          const barCount = 8;
          const totalW = 240 * scale;
          const barW = 18 * scale;
          for (let i = 0; i < barCount; i++) {
            const bx = -totalW / 2 + i * (totalW / (barCount - 1)) - barW / 2;
            const wave = 0.55 + 0.45 * Math.sin(t * 2.4 + i * 0.55);
            const bh = (38 + i * 16 * wave) * scale;
            const by = 85 * scale - bh;

            const grad = ctx.createLinearGradient(0, by, 0, 85 * scale);
            grad.addColorStop(0, i % 2 === 0 ? accent : secondary);
            grad.addColorStop(1, 'rgba(236, 57, 53, 0.08)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(bx, by, barW, bh, 4 * scale);
            ctx.fill();
          }

          // Rising Trend Curve Line with Glowing Nodes
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.4 * scale;
          ctx.beginPath();
          for (let i = 0; i < barCount; i++) {
            const px = -totalW / 2 + i * (totalW / (barCount - 1));
            const py = 55 * scale - i * 18 * scale - Math.sin(t * 2.5 + i) * 12 * scale;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();

          // Orbiting Ad Platform Badges (Google, Meta, YouTube, TikTok)
          const platforms = ['GOOGLE', 'META', 'TIKTOK', 'YOUTUBE', 'GA4'];
          platforms.forEach((label, idx) => {
            const ang = t * 0.55 + (idx * Math.PI * 2) / platforms.length;
            const rx = Math.cos(ang) * 165 * scale;
            const ry = Math.sin(ang) * 95 * scale;
            ctx.fillStyle = 'rgba(10, 12, 20, 0.9)';
            ctx.strokeStyle = idx % 2 === 0 ? accent : secondary;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.roundRect(rx - 34 * scale, ry - 13 * scale, 68 * scale, 26 * scale, 6 * scale);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${Math.max(8, Math.round(9 * scale))}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, rx, ry);
          });
          break;
        }

        // ----------------------------------------------------------
        // 03. E-COMMERCE SOLUTION: Interactive Storefront Showcase, Payment Cards & Order Stream
        // ----------------------------------------------------------
        case 'e-commerce-solution': {
          // 3 Floating Product Showcase Cards with Price & Buy Pulse
          for (let i = -1; i <= 1; i++) {
            const ox = i * 115 * scale;
            const oy = Math.sin(t * 1.8 + i) * 10 * scale;
            const isCenter = i === 0;
            const cardScale = isCenter ? 1.12 : 0.92;

            ctx.save();
            ctx.translate(ox, oy);
            ctx.scale(cardScale, cardScale);

            ctx.fillStyle = 'rgba(14, 16, 24, 0.92)';
            ctx.strokeStyle = isCenter ? accent : 'rgba(255,255,255,0.22)';
            ctx.lineWidth = isCenter ? 2 : 1.2;
            ctx.beginPath();
            ctx.roundRect(-48 * scale, -68 * scale, 96 * scale, 136 * scale, 10 * scale);
            ctx.fill();
            ctx.stroke();

            // Product Preview Box inside Storefront Card
            ctx.fillStyle = isCenter ? `${accent}38` : `${secondary}28`;
            ctx.beginPath();
            ctx.roundRect(-38 * scale, -56 * scale, 76 * scale, 62 * scale, 6 * scale);
            ctx.fill();

            // Checkout Button Bar
            ctx.fillStyle = isCenter ? accent : 'rgba(255,255,255,0.25)';
            ctx.beginPath();
            ctx.roundRect(-38 * scale, 38 * scale, 76 * scale, 18 * scale, 4 * scale);
            ctx.fill();

            ctx.fillStyle = '#000000';
            ctx.font = `bold ${Math.max(7, Math.round(8 * scale))}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (isCenter) ctx.fillText('1-CLICK BUY', 0, 47 * scale);
            ctx.restore();
          }

          // Orbiting Payment & Platform Nodes (Shopify, Woo, Stripe)
          const ecomBadges = ['SHOPIFY+', 'STRIPE', 'WOOCOMMERCE', 'PAYPAL'];
          ecomBadges.forEach((b, idx) => {
            const a = -t * 0.5 + (idx * Math.PI) / 2;
            const bx = Math.cos(a) * 185 * scale;
            const by = Math.sin(a) * 112 * scale;
            ctx.fillStyle = 'rgba(8,10,16,0.9)';
            ctx.strokeStyle = accent;
            ctx.beginPath();
            ctx.roundRect(bx - 42 * scale, by - 12 * scale, 84 * scale, 24 * scale, 6 * scale);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.max(8, Math.round(8.5 * scale))}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(b, bx, by);
          });
          break;
        }

        // ----------------------------------------------------------
        // 04. AMAZON FBA: Isometric Fulfillment Parcels, Conveyor Flow & Buy-Box Radar
        // ----------------------------------------------------------
        case 'amazon-fba': {
          // Fulfillment Conveyor Path
          ctx.strokeStyle = `${accent}55`;
          ctx.lineWidth = 2 * scale;
          ctx.beginPath();
          ctx.moveTo(-220 * scale, 70 * scale);
          ctx.lineTo(220 * scale, -70 * scale);
          ctx.stroke();

          // 4 Moving Isometric FBA Parcel Cubes along the Fulfillment Track
          for (let b = 0; b < 4; b++) {
            const prog = ((t * 0.22 + b * 0.25) % 1) - 0.5;
            const px = prog * 360 * scale;
            const py = -prog * 115 * scale;
            const sz = 34 * scale;

            ctx.save();
            ctx.translate(px, py);

            // Top face
            ctx.fillStyle = accent;
            ctx.beginPath();
            ctx.moveTo(0, -sz);
            ctx.lineTo(sz, -sz * 0.5);
            ctx.lineTo(0, 0);
            ctx.lineTo(-sz, -sz * 0.5);
            ctx.closePath();
            ctx.fill();

            // Left face
            ctx.fillStyle = '#c2410c';
            ctx.beginPath();
            ctx.moveTo(-sz, -sz * 0.5);
            ctx.lineTo(0, 0);
            ctx.lineTo(0, sz);
            ctx.lineTo(-sz, sz * 0.5);
            ctx.closePath();
            ctx.fill();

            // Right face
            ctx.fillStyle = '#9a3412';
            ctx.beginPath();
            ctx.moveTo(sz, -sz * 0.5);
            ctx.lineTo(0, 0);
            ctx.lineTo(0, sz);
            ctx.lineTo(sz, sz * 0.5);
            ctx.closePath();
            ctx.fill();

            // FNSKU Barcode Tag above parcel
            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            ctx.strokeStyle = secondary;
            ctx.beginPath();
            ctx.roundRect(-28 * scale, -sz - 24 * scale, 56 * scale, 16 * scale, 4 * scale);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.max(7, Math.round(7.5 * scale))}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('PRIME FBA', 0, -sz - 16 * scale);
            ctx.restore();
          }
          break;
        }

        // ----------------------------------------------------------
        // 05. SOCIAL ACCOUNTS MANAGEMENT: Reels/Story Frames, Viral Engagement Ripples
        // ----------------------------------------------------------
        case 'social-accounts-management': {
          // 3 Vertical Reels / Story Mobile Cards
          for (let s = -1; s <= 1; s++) {
            const sx = s * 105 * scale;
            const sy = Math.cos(t * 1.6 + s * 1.2) * 10 * scale;
            ctx.save();
            ctx.translate(sx, sy);
            ctx.fillStyle = 'rgba(16, 12, 26, 0.9)';
            ctx.strokeStyle = s === 0 ? accent : `${secondary}88`;
            ctx.lineWidth = s === 0 ? 2.2 : 1.3;
            ctx.beginPath();
            ctx.roundRect(-40 * scale, -75 * scale, 80 * scale, 150 * scale, 12 * scale);
            ctx.fill();
            ctx.stroke();

            // Story Ring Avatar at top
            ctx.strokeStyle = accent;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, -42 * scale, 14 * scale, 0, Math.PI * 2);
            ctx.stroke();

            // Play Triangle in center of Reel
            ctx.fillStyle = accent;
            ctx.beginPath();
            ctx.moveTo(-6 * scale, -8 * scale);
            ctx.lineTo(10 * scale, 0);
            ctx.lineTo(-6 * scale, 8 * scale);
            ctx.closePath();
            ctx.fill();

            // Rising Engagement Pulse Bars
            ctx.fillStyle = 'rgba(255,255,255,0.25)';
            ctx.fillRect(-26 * scale, 34 * scale, 52 * scale, 6 * scale);
            ctx.fillStyle = accent;
            ctx.fillRect(
              -26 * scale,
              34 * scale,
              (26 + 24 * Math.sin(t * 2 + s)) * scale,
              6 * scale
            );
            ctx.restore();
          }

          // Floating Social Platform Pills
          const nets = ['INSTAGRAM', 'TIKTOK', 'LINKEDIN', 'FACEBOOK', 'X', 'SNAP'];
          nets.forEach((n, idx) => {
            const a = t * 0.45 + (idx * Math.PI * 2) / nets.length;
            const nx = Math.cos(a) * 190 * scale;
            const ny = Math.sin(a) * 110 * scale;
            ctx.fillStyle = 'rgba(12, 10, 20, 0.88)';
            ctx.strokeStyle = accent;
            ctx.beginPath();
            ctx.roundRect(nx - 36 * scale, ny - 11 * scale, 72 * scale, 22 * scale, 11 * scale);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.max(7, Math.round(8 * scale))}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(n, nx, ny);
          });
          break;
        }

        // ----------------------------------------------------------
        // 06. CONTENT WRITING: Live Editorial Document Pages, Typewriter Lines & SEO Score
        // ----------------------------------------------------------
        case 'content-writing': {
          // Layered Editorial Manuscript Sheets
          for (let p = 2; p >= 0; p--) {
            const offset = p * 12 * scale;
            ctx.save();
            ctx.translate(offset - 12 * scale, -offset + Math.sin(t * 1.5 + p) * 5 * scale);
            ctx.fillStyle = p === 0 ? 'rgba(10, 20, 18, 0.94)' : 'rgba(10, 20, 18, 0.45)';
            ctx.strokeStyle = p === 0 ? accent : `${accent}44`;
            ctx.lineWidth = p === 0 ? 2 : 1;
            ctx.beginPath();
            ctx.roundRect(-95 * scale, -115 * scale, 190 * scale, 230 * scale, 10 * scale);
            ctx.fill();
            ctx.stroke();

            if (p === 0) {
              // Animated Typing Headline & Paragraph Lines
              ctx.fillStyle = accent;
              ctx.fillRect(-72 * scale, -88 * scale, 110 * scale, 12 * scale);

              for (let ln = 0; ln < 7; ln++) {
                const ly = (-56 + ln * 20) * scale;
                const prog =
                  ln === 6 ? ((t * 1.4) % 1) * 135 * scale : (135 - (ln % 3) * 18) * scale;
                ctx.fillStyle = ln % 2 === 0 ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)';
                ctx.fillRect(-72 * scale, ly, prog, 7 * scale);
              }

              // Blinking Editorial Cursor
              if (Math.sin(t * 7) > 0) {
                const cxCur = -72 * scale + ((t * 1.4) % 1) * 135 * scale + 4 * scale;
                ctx.fillStyle = accent;
                ctx.fillRect(cxCur, 62 * scale, 3 * scale, 11 * scale);
              }
            }
            ctx.restore();
          }
          break;
        }

        // ----------------------------------------------------------
        // 07. GRAPHIC DESIGNING: Golden-Ratio Fibonacci Spiral, Vector Bezier Handles & Swatches
        // ----------------------------------------------------------
        case 'graphic-designing': {
          // Rotating Golden Ratio Geometric Circles & Grid
          ctx.strokeStyle = `${accent}66`;
          ctx.lineWidth = 1.5 * scale;
          for (let r = 1; r <= 4; r++) {
            ctx.beginPath();
            ctx.arc(
              Math.cos(t + r) * 12 * scale,
              Math.sin(t + r) * 12 * scale,
              r * 36 * scale,
              0,
              Math.PI * 2
            );
            ctx.stroke();
          }

          // Animated Bezier Pen Tool Curve with Control Handles
          const p0x = -150 * scale;
          const p0y = 40 * scale;
          const p3x = 150 * scale;
          const p3y = -40 * scale;
          const c1x = -60 * scale;
          const c1y = (-130 + Math.sin(t * 2) * 45) * scale;
          const c2x = 60 * scale;
          const c2y = (130 + Math.cos(t * 2) * 45) * scale;

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.6 * scale;
          ctx.beginPath();
          ctx.moveTo(p0x, p0y);
          ctx.bezierCurveTo(c1x, c1y, c2x, c2y, p3x, p3y);
          ctx.stroke();

          // Bezier Handle Lines & Anchor Squares
          ctx.strokeStyle = secondary;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p0x, p0y);
          ctx.lineTo(c1x, c1y);
          ctx.moveTo(p3x, p3y);
          ctx.lineTo(c2x, c2y);
          ctx.stroke();

          [
            [p0x, p0y],
            [p3x, p3y],
            [c1x, c1y],
            [c2x, c2y],
          ].forEach(([ax, ay]) => {
            ctx.fillStyle = accent;
            ctx.fillRect(ax - 4 * scale, ay - 4 * scale, 8 * scale, 8 * scale);
          });
          break;
        }

        // ----------------------------------------------------------
        // 08. BRAND DEVELOPMENT: Faceted Crown Diamond Monogram & Positioning Compass
        // ----------------------------------------------------------
        case 'brand-development': {
          // Outer Positioning Compass Ring
          ctx.strokeStyle = `${accent}44`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(0, 0, 145 * scale, 0, Math.PI * 2);
          ctx.stroke();

          // Rotating Faceted Brand Diamond Emblem
          const rot = t * 0.45;
          const pts = 8;
          const outerR = 95 * scale;
          const innerR = 48 * scale;

          ctx.strokeStyle = accent;
          ctx.lineWidth = 2 * scale;
          ctx.beginPath();
          for (let i = 0; i < pts; i++) {
            const a1 = rot + (i * Math.PI * 2) / pts;
            const a2 = rot + ((i + 0.5) * Math.PI * 2) / pts;
            const x1 = Math.cos(a1) * outerR;
            const y1 = Math.sin(a1) * outerR;
            const x2 = Math.cos(a2) * innerR;
            const y2 = Math.sin(a2) * innerR;
            if (i === 0) ctx.moveTo(x1, y1);
            else ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.closePath();
          ctx.fillStyle = `${accent}22`;
          ctx.fill();
          ctx.stroke();

          // Brand Pillar Labels
          ['STRATEGY', 'NAMING', 'IDENTITY', 'STORY'].forEach((lbl, idx) => {
            const a = -t * 0.35 + (idx * Math.PI) / 2;
            const lx = Math.cos(a) * 155 * scale;
            const ly = Math.sin(a) * 115 * scale;
            ctx.fillStyle = 'rgba(12,12,18,0.9)';
            ctx.strokeStyle = accent;
            ctx.beginPath();
            ctx.roundRect(lx - 38 * scale, ly - 12 * scale, 76 * scale, 24 * scale, 6 * scale);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.max(8, Math.round(8.5 * scale))}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(lbl, lx, ly);
          });
          break;
        }

        // ----------------------------------------------------------
        // 09. CONSULTING SERVICES: Strategic Roadmap Nodes, KPI Trajectory & Executive Compass
        // ----------------------------------------------------------
        case 'consulting-services': {
          // Strategic Milestone Roadmap Path (Q1 -> Q2 -> Q3 -> Q4)
          const milestones = [
            { x: -150, y: 55, label: '01 AUDIT' },
            { x: -50, y: -25, label: '02 STRATEGY' },
            { x: 55, y: 25, label: '03 TRANSFORM' },
            { x: 155, y: -65, label: '04 SCALE ROI' },
          ];

          ctx.strokeStyle = accent;
          ctx.lineWidth = 2.5 * scale;
          ctx.beginPath();
          milestones.forEach((m, idx) => {
            const mx = m.x * scale;
            const my = m.y * scale + Math.sin(t * 2 + idx) * 8 * scale;
            if (idx === 0) ctx.moveTo(mx, my);
            else ctx.lineTo(mx, my);
          });
          ctx.stroke();

          milestones.forEach((m, idx) => {
            const mx = m.x * scale;
            const my = m.y * scale + Math.sin(t * 2 + idx) * 8 * scale;
            ctx.fillStyle = '#050811';
            ctx.strokeStyle = idx % 2 === 0 ? accent : secondary;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.arc(mx, my, 14 * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.max(8, Math.round(9 * scale))}px monospace`;
            ctx.textAlign = 'center';
            ctx.fillText(m.label, mx, my - 22 * scale);
          });
          break;
        }

        // ----------------------------------------------------------
        // 10. CYBER SECURITY: Zero-Trust Geodesic Shield, Radar Sweep & Encrypted Vault
        // ----------------------------------------------------------
        case 'cyber-security': {
          // Concentric SOC Radar Rings
          for (let r = 1; r <= 3; r++) {
            ctx.strokeStyle = `${accent}44`;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.arc(0, 0, r * 52 * scale, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Rotating Threat Scanner Sweep
          const sweepAng = t * 1.6;
          ctx.fillStyle = `${accent}28`;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, 156 * scale, sweepAng, sweepAng + 0.65);
          ctx.closePath();
          ctx.fill();

          // Central Hexagonal Zero-Trust Shield Crest
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2.4 * scale;
          ctx.beginPath();
          for (let h = 0; h < 6; h++) {
            const a = (h * Math.PI) / 3 - Math.PI / 6;
            const hx = Math.cos(a) * 58 * scale;
            const hy = Math.sin(a) * 58 * scale;
            if (h === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fillStyle = 'rgba(6, 24, 20, 0.85)';
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.max(9, Math.round(10 * scale))}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('256-BIT TLS', 0, 0);
          break;
        }

        // ----------------------------------------------------------
        // 11. CONNECT (ISP): 940 Mbps Optical Fiber Light Streams & Whole-Home Wi-Fi 6 Waves
        // ----------------------------------------------------------
        case 'connect-isp':
        default: {
          // High-Speed Optical Fiber Light Pulses Streaming Across Screen
          for (let line = -3; line <= 3; line++) {
            const ly = line * 24 * scale;
            ctx.strokeStyle = `${accent}30`;
            ctx.lineWidth = 1.5 * scale;
            ctx.beginPath();
            ctx.moveTo(-240 * scale, ly);
            ctx.lineTo(240 * scale, ly);
            ctx.stroke();

            // Moving Photon Packet along fiber line
            const packetX = ((((t * (140 + Math.abs(line) * 25) + line * 90) % 480) + 480) % 480 - 240) * scale;
            ctx.fillStyle = line % 2 === 0 ? accent : '#ffffff';
            ctx.beginPath();
            ctx.roundRect(packetX - 18 * scale, ly - 3 * scale, 36 * scale, 6 * scale, 3 * scale);
            ctx.fill();
          }

          // Expanding Whole-Home Mesh Wi-Fi 6 Signal Arcs
          for (let w = 1; w <= 3; w++) {
            const pulseR = ((t * 45 + w * 38) % 130) * scale;
            const alpha = Math.max(0, 1 - pulseR / (130 * scale));
            ctx.strokeStyle = `rgba(236, 57, 53, ${alpha.toFixed(2)})`;
            ctx.lineWidth = 2.2 * scale;
            ctx.beginPath();
            ctx.arc(0, 0, pulseR, -Math.PI * 0.75, -Math.PI * 0.25);
            ctx.stroke();
          }

          // Center 940 Mbps Hub Badge
          ctx.fillStyle = 'rgba(6, 18, 28, 0.94)';
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2 * scale;
          ctx.beginPath();
          ctx.roundRect(-58 * scale, -22 * scale, 116 * scale, 44 * scale, 10 * scale);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.max(10, Math.round(12 * scale))}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('940 MBPS FIBER', 0, 0);
          break;
        }
      }

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [service.id, service.accentColor, service.secondaryColor, variant, subIndex]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block pointer-events-none ${className}`}
    />
  );
}
