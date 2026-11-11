import React, { useRef, useEffect, useState } from 'react';

interface HubNode {
  name: string;
  lat: number; // -90 to +90
  lng: number; // -180 to +180
  color: string;
}

interface OrbitalArc {
  from: HubNode;
  to: HubNode;
  arcHeight: number;
  speed: number;
  phase: number;
}

const GLOBAL_HUBS: HubNode[] = [
  { name: 'USA', lat: 38.9, lng: -77.0, color: '#ec3935' },
  { name: 'RIYADH (KSA)', lat: 24.71, lng: 46.67, color: '#ec3935' },
  { name: 'PAKISTAN', lat: 33.68, lng: 73.04, color: '#ec3935' },
  { name: 'SAN FRANCISCO', lat: 37.77, lng: -122.41, color: '#ec3935' },
  { name: 'DUBAI', lat: 25.2, lng: 55.27, color: '#ec3935' },
  { name: 'LONDON', lat: 51.5, lng: -0.12, color: '#ec3935' },
  { name: 'TOKYO', lat: 35.67, lng: 139.65, color: '#ec3935' },
  { name: 'SINGAPORE', lat: 1.35, lng: 103.8, color: '#ec3935' },
];

const ORBITAL_ARCS: OrbitalArc[] = [
  { from: GLOBAL_HUBS[0], to: GLOBAL_HUBS[1], arcHeight: 85, speed: 0.008, phase: 0 },
  { from: GLOBAL_HUBS[1], to: GLOBAL_HUBS[2], arcHeight: 70, speed: 0.010, phase: 0.35 },
  { from: GLOBAL_HUBS[2], to: GLOBAL_HUBS[0], arcHeight: 95, speed: 0.0075, phase: 0.65 },
  { from: GLOBAL_HUBS[3], to: GLOBAL_HUBS[2], arcHeight: 110, speed: 0.006, phase: 0.2 },
  { from: GLOBAL_HUBS[1], to: GLOBAL_HUBS[4], arcHeight: 60, speed: 0.012, phase: 0.45 },
  { from: GLOBAL_HUBS[5], to: GLOBAL_HUBS[0], arcHeight: 80, speed: 0.0085, phase: 0.8 },
];

interface GlobalOrbitalGlobe3DProps {
  className?: string;
  isLightMode?: boolean;
}

export function GlobalOrbitalGlobe3D({ className = '', isLightMode = false }: GlobalOrbitalGlobe3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef({ x: 0.35, y: 0.4 });
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const [activeHoverHub, setActiveHoverHub] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate latitude/longitude ring points and surface dotted grid
    const GLOBE_RADIUS = Math.min(width, height) * 0.44;
    const surfaceDots: { lat: number; lng: number }[] = [];

    // Dense dotted surface
    for (let lat = -80; lat <= 80; lat += 8) {
      const numLngs = Math.max(8, Math.floor(48 * Math.cos((lat * Math.PI) / 180)));
      for (let i = 0; i < numLngs; i++) {
        const lng = -180 + (360 / numLngs) * i;
        surfaceDots.push({ lat, lng });
      }
    }

    // Convert lat/lng to 3D Cartesian coordinates (x, y, z)
    const latLngToVec3 = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return {
        x: -(radius * Math.sin(phi) * Math.cos(theta)),
        z: radius * Math.sin(phi) * Math.sin(theta),
        y: radius * Math.cos(phi),
      };
    };

    // 3D rotation transform
    const rotate3D = (
      pt: { x: number; y: number; z: number },
      rotX: number,
      rotY: number
    ) => {
      // Rotate around Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = pt.x * cosY + pt.z * sinY;
      const z1 = -pt.x * sinY + pt.z * cosY;

      // Rotate around X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = pt.y * cosX - z1 * sinX;
      const z2 = pt.y * sinX + z1 * cosX;

      return { x: x1, y: y2, z: z2 };
    };

    // Project 3D to 2D Screen
    const project = (
      pt: { x: number; y: number; z: number },
      centerX: number,
      centerY: number,
      fov: number = 750
    ) => {
      const scale = fov / (fov + pt.z);
      return {
        x: centerX + pt.x * scale,
        y: centerY - pt.y * scale,
        z: pt.z,
        scale,
      };
    };

    let arcProgresses = ORBITAL_ARCS.map((a) => a.phase);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Natural continuous slow rotation when not dragging
      if (!isDraggingRef.current) {
        rotationRef.current.y += 0.0032;
      }

      const centerX = width / 2;
      const centerY = height * 0.58;
      const radius = Math.min(width, height) * 0.44;
      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      // 1. Draw Globe Atmospheric Glow behind
      const atmoGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.7,
        centerX,
        centerY,
        radius * 1.15
      );
      atmoGrad.addColorStop(0, 'rgba(236, 57, 53, 0.05)');
      atmoGrad.addColorStop(0.7, 'rgba(236, 57, 53, 0.02)');
      atmoGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Latitude & Longitude Wireframe Ring Arcs
      ctx.lineWidth = 0.8;
      // Latitude Rings
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 6) {
          const raw = latLngToVec3(lat, lng, radius);
          const rotated = rotate3D(raw, rotX, rotY);
          const p = project(rotated, centerX, centerY);
          const alpha = rotated.z > 0 ? 0.22 : 0.06;
          ctx.strokeStyle = isLightMode
            ? `rgba(0, 0, 0, ${alpha * 0.6})`
            : `rgba(255, 255, 255, ${alpha})`;
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }

      // Longitude Meridians
      for (let lng = -180; lng < 180; lng += 45) {
        ctx.beginPath();
        let started = false;
        for (let lat = -85; lat <= 85; lat += 5) {
          const raw = latLngToVec3(lat, lng, radius);
          const rotated = rotate3D(raw, rotX, rotY);
          const p = project(rotated, centerX, centerY);
          const alpha = rotated.z > 0 ? 0.22 : 0.06;
          ctx.strokeStyle = isLightMode
            ? `rgba(0, 0, 0, ${alpha * 0.6})`
            : `rgba(255, 255, 255, ${alpha})`;
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }

      // 3. Draw Celestial Surface Dots
      for (let i = 0; i < surfaceDots.length; i++) {
        const d = surfaceDots[i];
        const raw = latLngToVec3(d.lat, d.lng, radius);
        const rotated = rotate3D(raw, rotX, rotY);

        if (rotated.z > -radius * 0.35) {
          const p = project(rotated, centerX, centerY);
          const depthAlpha = Math.max(0.1, (rotated.z + radius * 0.4) / (radius * 1.4));
          ctx.fillStyle = isLightMode
            ? `rgba(40, 40, 40, ${depthAlpha * 0.6})`
            : `rgba(255, 255, 255, ${depthAlpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.8, 1.2 * p.scale), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Draw 3D Red Parabolic Trajectory Arcs & Glowing Beams (Matching video 07)
      ORBITAL_ARCS.forEach((arc, arcIdx) => {
        arcProgresses[arcIdx] = (arcProgresses[arcIdx] + arc.speed) % 1;
        const beamProgress = arcProgresses[arcIdx];

        const p1Raw = latLngToVec3(arc.from.lat, arc.from.lng, radius);
        const p2Raw = latLngToVec3(arc.to.lat, arc.to.lng, radius);

        // Subdivide arc along great circle + elevated parabolic altitude
        const segments = 48;
        const arcPoints3D: { x: number; y: number; z: number; normT: number }[] = [];

        for (let s = 0; s <= segments; s++) {
          const t = s / segments;
          // Interpolate spherical surface vector
          const ix = p1Raw.x * (1 - t) + p2Raw.x * t;
          const iy = p1Raw.y * (1 - t) + p2Raw.y * t;
          const iz = p1Raw.z * (1 - t) + p2Raw.z * t;
          const len = Math.sqrt(ix * ix + iy * iy + iz * iz);

          // Parabolic height curve: reaches peak at midpoint
          const heightOffset = Math.sin(t * Math.PI) * arc.arcHeight;
          const currentR = radius + heightOffset;

          const px = (ix / len) * currentR;
          const py = (iy / len) * currentR;
          const pz = (iz / len) * currentR;

          arcPoints3D.push({ x: px, y: py, z: pz, normT: t });
        }

        // Draw Base Red Trajectory Arc Line
        ctx.beginPath();
        let arcStarted = false;
        arcPoints3D.forEach((pt) => {
          const rotated = rotate3D(pt, rotX, rotY);
          const p = project(rotated, centerX, centerY);
          if (!arcStarted) {
            ctx.moveTo(p.x, p.y);
            arcStarted = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        });
        ctx.strokeStyle = 'rgba(236, 57, 53, 0.45)';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Draw Glowing Travelling Pulse Beam along the arc (matching Video 07)
        const beamLength = 0.22; // length of glowing dash
        const beamHeadT = beamProgress;
        const beamTailT = Math.max(0, beamHeadT - beamLength);

        ctx.beginPath();
        let beamStarted = false;
        arcPoints3D.forEach((pt) => {
          if (pt.normT >= beamTailT && pt.normT <= beamHeadT) {
            const rotated = rotate3D(pt, rotX, rotY);
            const p = project(rotated, centerX, centerY);
            if (!beamStarted) {
              ctx.moveTo(p.x, p.y);
              beamStarted = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          }
        });

        ctx.strokeStyle = '#ec3935';
        ctx.lineWidth = 3.2;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#ec3935';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      });

      // 5. Draw Global Hub Beacon Nodes (Red Cubes & Glowing Markers matching video 07)
      GLOBAL_HUBS.forEach((hub) => {
        const raw = latLngToVec3(hub.lat, hub.lng, radius);
        const rotated = rotate3D(raw, rotX, rotY);
        const p = project(rotated, centerX, centerY);

        // Only draw in detail when on front hemisphere or near horizon
        if (rotated.z > -radius * 0.25) {
          const isFront = rotated.z > 0;
          const nodeSize = (isFront ? 6.5 : 4.5) * p.scale;

          // Glowing Outer Pulse Halo
          ctx.fillStyle = 'rgba(236, 57, 53, 0.25)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeSize * 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Solid Red Beacon Square/Cube (matching video 07)
          ctx.fillStyle = '#ec3935';
          ctx.fillRect(p.x - nodeSize / 2, p.y - nodeSize / 2, nodeSize, nodeSize);

          // Center bright white spark
          ctx.fillStyle = '#fffdff';
          ctx.fillRect(p.x - nodeSize * 0.25, p.y - nodeSize * 0.25, nodeSize * 0.5, nodeSize * 0.5);

          // Hub Label Tag (e.g. USA, PARIS) if in front view
          if (isFront) {
            ctx.font = 'bold 10px Sifonn, Outfit, Montserrat, sans-serif';
            ctx.fillStyle = 'rgba(255, 253, 255, 0.9)';
            ctx.fillText(hub.name, p.x + nodeSize + 4, p.y - nodeSize + 4);
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    // Mouse drag rotation handlers for smooth interactive exploration
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      rotationRef.current.y += dx * 0.006;
      rotationRef.current.x = Math.max(-0.6, Math.min(0.8, rotationRef.current.x - dy * 0.006));
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - prevMouseRef.current.x;
      const dy = e.touches[0].clientY - prevMouseRef.current.y;
      rotationRef.current.y += dx * 0.006;
      rotationRef.current.x = Math.max(-0.6, Math.min(0.8, rotationRef.current.x - dy * 0.006));
      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    canvas.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isLightMode]);

  return (
    <div className={`relative w-full h-[400px] sm:h-[480px] md:h-[560px] overflow-hidden select-none ${className}`}>
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Global Network Overlay Badge */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#ec3935]/30 shadow-[0_0_20px_rgba(236,57,53,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#ec3935] animate-ping" />
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#fffdff]">
            GLOBAL ORBITAL NETWORK · 7 NODES ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
