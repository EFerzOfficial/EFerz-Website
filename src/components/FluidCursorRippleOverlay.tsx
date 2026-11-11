import React, { useEffect, useRef } from 'react';

/**
 * Universal Precision Paint Brush Cursor & Global Text Motion Effect
 * - Works consistently across the ENTIRE website (all pages: Home, Services, Work, Clients, Team, About, Contact, Blog, Policies, Header/Footer).
 * - Tiny, crisp crimson/white pointer point (radius 3.2px–4.8px).
 * - Dynamically paints hovered text across all pages: White text paints Crimson Red (#d02128) under the cursor, and Red text paints Crisp White (#fffdff) under the cursor.
 */
export const FluidCursorRippleOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Brush state
    let targetX = -500;
    let targetY = -500;
    let cursorX = -500;
    let cursorY = -500;
    let prevX = -500;
    let prevY = -500;
    let isOverText = false;
    let currentColor = '#d02128';
    let activePaintedEl: HTMLElement | null = null;

    const clearActivePaintedEl = () => {
      if (activePaintedEl) {
        activePaintedEl.removeAttribute('data-global-paint');
        activePaintedEl.style.removeProperty('--g-paint-x');
        activePaintedEl.style.removeProperty('--g-paint-y');
        activePaintedEl = null;
      }
    };

    const isRedColor = (rgbStr: string) => {
      const m = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return false;
      const r = parseInt(m[1], 10);
      const g = parseInt(m[2], 10);
      const b = parseInt(m[3], 10);
      return r > 175 && g < 95 && b < 95;
    };

    const canPaintElement = (el: HTMLElement): boolean => {
      const tag = el.tagName.toLowerCase();
      if (
        !['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'li', 'label', 'blockquote', 'strong', 'div'].includes(
          tag
        )
      ) {
        return false;
      }
      if (el.closest('input, textarea, select, canvas, svg')) return false;
      if (el.hasAttribute('data-paint')) return false; // Handled natively by PaintText
      if (el.classList.contains('bg-clip-text') || el.querySelector('.bg-clip-text')) return false;
      // Only paint leaf/text-focused elements so child icons/backgrounds aren't affected
      if (el.children.length > 2) return false;
      for (let i = 0; i < el.children.length; i++) {
        const childTag = el.children[i].tagName.toLowerCase();
        if (['svg', 'img', 'canvas', 'div', 'section', 'button', 'input'].includes(childTag)) {
          return false;
        }
      }
      const txt = (el.textContent || '').trim();
      return txt.length > 0 && txt.length < 420;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (cursorX < -100) {
        cursorX = targetX;
        cursorY = targetY;
        prevX = targetX;
        prevY = targetY;
      }

      const dx = targetX - prevX;
      const dy = targetY - prevY;
      prevX = targetX;
      prevY = targetY;

      // Subtle universal 3D particle motion reaction across all pages
      if (Math.abs(dx) + Math.abs(dy) > 4) {
        window.dispatchEvent(
          new CustomEvent('cosmic-drift', {
            detail: {
              velocity: dx * 0.015,
              direction: 'horizontal',
              convergence: 0.85,
            },
          })
        );
      }

      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target) {
        clearActivePaintedEl();
        isOverText = false;
        currentColor = '#d02128';
        return;
      }

      // 1. Check explicit PaintText elements first
      const paintEl = target.closest('[data-paint]') as HTMLElement | null;
      if (paintEl) {
        clearActivePaintedEl();
        isOverText = true;
        const type = paintEl.getAttribute('data-paint');
        currentColor = type === 'red' ? '#ffffff' : '#d02128';
        return;
      }

      // 2. Universal text paint across all pages of the website
      let candidate: HTMLElement | null = target;
      if (!canPaintElement(candidate) && candidate.parentElement && canPaintElement(candidate.parentElement)) {
        candidate = candidate.parentElement;
      }

      if (candidate && canPaintElement(candidate)) {
        if (activePaintedEl && activePaintedEl !== candidate) {
          clearActivePaintedEl();
        }
        activePaintedEl = candidate;
        const rect = candidate.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const computedColor = window.getComputedStyle(candidate).color;
        const isRed = isRedColor(computedColor);
        const paintMode = isRed ? 'red' : 'white';

        candidate.setAttribute('data-global-paint', paintMode);
        candidate.style.setProperty('--g-paint-x', `${x.toFixed(1)}px`);
        candidate.style.setProperty('--g-paint-y', `${y.toFixed(1)}px`);

        isOverText = true;
        currentColor = isRed ? '#ffffff' : '#d02128';
      } else {
        clearActivePaintedEl();
        isOverText = false;
        currentColor = '#d02128';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId: number;

    const render = () => {
      cursorX += (targetX - cursorX) * 0.35;
      cursorY += (targetY - cursorY) * 0.35;

      ctx.clearRect(0, 0, width, height);

      if (cursorX > 0 && cursorY > 0) {
        ctx.save();
        const r = isOverText ? 4.8 : 3.4;

        ctx.fillStyle = currentColor;
        ctx.globalAlpha = 0.92;
        ctx.beginPath();
        ctx.arc(cursorX, cursorY, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearActivePaintedEl();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55] select-none will-change-transform"
      style={{
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
    />
  );
};

