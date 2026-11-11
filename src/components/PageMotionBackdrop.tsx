import React, { useEffect, useRef } from 'react';

export type PageMotionTheme = 'portfolio' | 'clients' | 'team' | 'contact';

interface PageMotionBackdropProps {
  theme: PageMotionTheme;
  accent: string;
  slideIndex?: number;
}

export const PageMotionBackdrop: React.FC<PageMotionBackdropProps> = ({
  theme,
  accent,
  slideIndex = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX / Math.max(1, width);
      mouseRef.current.ty = e.clientY / Math.max(1, height);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate deterministic nodes (increased quantity with slightly smaller star circles for thicker cluster)
    const nodes = Array.from({ length: 85 }, (_, i) => ({
      angle: (i / 85) * Math.PI * 2,
      radius: 110 + ((i * 29) % 360),
      speed: 0.0018 + (i % 7) * 0.00045,
      size: 1.05 + (i % 4) * 0.45,
      layer: (i % 3) + 1,
    }));

    let time = 0;

    const render = () => {
      time += 0.016;
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const cx =
        width * 0.5 + (mouseRef.current.x - 0.5) * 90 + Math.sin(time * 0.4) * 20;
      const cy =
        height * 0.5 + (mouseRef.current.y - 0.5) * 65 + Math.cos(time * 0.35) * 15;

      // Ambient radial aura
      const grad = ctx.createRadialGradient(
        cx,
        cy,
        20,
        cx,
        cy,
        Math.max(width, height) * 0.58
      );
      grad.addColorStop(0, `${accent}26`);
      grad.addColorStop(0.45, `${accent}0d`);
      grad.addColorStop(1, 'rgba(4,5,9,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Perspective cyber-grid horizon
      ctx.save();
      ctx.strokeStyle = `${accent}18`;
      ctx.lineWidth = 1;
      const horizonY = height * 0.72;
      for (let i = -10; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 45, horizonY);
        ctx.lineTo(cx + i * 240, height + 60);
        ctx.stroke();
      }
      for (let j = 0; j < 6; j++) {
        const progress = ((time * 0.28 + j / 6) % 1);
        const y = horizonY + Math.pow(progress, 1.8) * (height - horizonY + 40);
        ctx.strokeStyle = `${accent}${Math.floor((1 - progress) * 35)
          .toString(16)
          .padStart(2, '0')}`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Theme-specific orbital / architectural telemetry rings
      ctx.save();
      ctx.translate(cx, cy);

      const ringCount = theme === 'portfolio' ? 4 : theme === 'clients' ? 5 : 3;
      for (let r = 1; r <= ringCount; r++) {
        ctx.save();
        ctx.rotate(time * (r % 2 === 0 ? 0.14 : -0.18) + slideIndex * 0.35);
        ctx.strokeStyle = `${accent}${r === 1 ? '38' : '20'}`;
        ctx.lineWidth = r === 1 ? 1.4 : 1;
        ctx.setLineDash(r % 2 === 0 ? [8, 14] : [24, 10]);
        ctx.beginPath();
        const rx = Math.min(width, height) * (0.18 + r * 0.085);
        const ry = rx * (theme === 'clients' ? 0.58 : 0.72);
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Orbiting network nodes and connecting vectors
      const pts: { x: number; y: number; s: number }[] = [];
      nodes.forEach((n, idx) => {
        const a = n.angle + time * n.speed * (idx % 2 === 0 ? 18 : -14) + slideIndex * 0.2;
        const r = n.radius * (Math.min(width, height) / 920);
        const x = Math.cos(a) * r * 1.35;
        const y = Math.sin(a) * r * 0.78;
        pts.push({ x, y, s: n.size });

        const col = idx % 4 === 0 ? accent : 'rgba(255,255,255,0.75)';
        ctx.fillStyle = idx % 4 === 0 ? `${accent}44` : 'rgba(255,255,255,0.22)';
        ctx.beginPath();
        ctx.arc(x, y, n.size * 2.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(x, y, n.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.65, n.size * 0.5), 0, Math.PI * 2);
        ctx.fill();
      });

      // Connect nearby nodes
      ctx.lineWidth = 0.75;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const alpha = Math.floor((1 - dist / 120) * 50)
              .toString(16)
              .padStart(2, '0');
            ctx.strokeStyle = `${accent}${alpha}`;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.restore();

      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme, accent, slideIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
