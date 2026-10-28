/**
 * EFerz Digital Studio - Interactive 3D Canvas & UI Engine
 * Version: 1.0.0
 * Features:
 *  - Three.js 60fps Particle Cloud with 8 Geometric Morph Targets
 *  - Real-time Mouse Parallax & Dynamic Orbit Drift
 *  - Smooth Shape Morph Interpolation
 *  - Fluid Cursor Particle Trail
 *  - Mobile Navigation Drawer Controller
 */

(function () {
  'use strict';

  // --- 1. MOBILE DRAWER TOGGLE ---
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // --- 2. FLUID CURSOR RIPPLE ---
  function initFluidRipple() {
    const overlay = document.getElementById('fluid-ripple-overlay');
    if (!overlay) return;

    let lastTime = 0;
    const throttleMs = 35;

    window.addEventListener('pointermove', function (e) {
      const now = performance.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      const ripple = document.createElement('div');
      ripple.className = 'ripple-particle';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      overlay.appendChild(ripple);

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 900);
    }, { passive: true });
  }

  // --- 3. THREE.JS 3D PARTICLE MORPHING ENGINE ---
  function initThreeJsCanvas() {
    const canvas = document.getElementById('particle-canvas-3d');
    if (!canvas || typeof THREE === 'undefined') return;

    const PARTICLE_COUNT = 2400;
    let scene, camera, renderer, particlesGeometry, particleSystem;
    let currentPositions = new Float32Array(PARTICLE_COUNT * 3);
    let targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    let colors = new Float32Array(PARTICLE_COUNT * 3);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let activeShape = 'e_logo';

    // Shape Coordinate Generators
    const shapes = {
      // 1. E Monogram
      e_logo: function () {
        const coords = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const idx = i * 3;
          const section = Math.random();
          let x = 0, y = 0, z = (Math.random() - 0.5) * 40;

          if (section < 0.4) {
            // Vertical Spine of E
            x = -70 + (Math.random() - 0.5) * 20;
            y = (Math.random() - 0.5) * 180;
          } else if (section < 0.6) {
            // Top Bar
            x = -70 + Math.random() * 120;
            y = 75 + (Math.random() - 0.5) * 20;
          } else if (section < 0.8) {
            // Middle Bar
            x = -70 + Math.random() * 90;
            y = (Math.random() - 0.5) * 20;
          } else {
            // Bottom Bar
            x = -70 + Math.random() * 120;
            y = -75 + (Math.random() - 0.5) * 20;
          }

          coords[idx] = x * 1.5;
          coords[idx + 1] = y * 1.5;
          coords[idx + 2] = z * 2;
        }
        return coords;
      },

      // 2. Sphere
      sphere: function () {
        const coords = new Float32Array(PARTICLE_COUNT * 3);
        const radius = 170;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const idx = i * 3;
          const theta = Math.acos(1 - 2 * (i / PARTICLE_COUNT));
          const phi = Math.PI * (1 + Math.sqrt(5)) * i;

          coords[idx] = radius * Math.sin(theta) * Math.cos(phi) + (Math.random() - 0.5) * 10;
          coords[idx + 1] = radius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 10;
          coords[idx + 2] = radius * Math.cos(theta) + (Math.random() - 0.5) * 10;
        }
        return coords;
      },

      // 3. Torus
      torus: function () {
        const coords = new Float32Array(PARTICLE_COUNT * 3);
        const R = 150; // Major radius
        const r = 50;  // Minor radius
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const idx = i * 3;
          const u = Math.random() * Math.PI * 2;
          const v = Math.random() * Math.PI * 2;

          coords[idx] = (R + r * Math.cos(v)) * Math.cos(u);
          coords[idx + 1] = (R + r * Math.cos(v)) * Math.sin(u);
          coords[idx + 2] = r * Math.sin(v) + (Math.random() - 0.5) * 10;
        }
        return coords;
      },

      // 4. DNA Double Helix
      dna: function () {
        const coords = new Float32Array(PARTICLE_COUNT * 3);
        const length = 340;
        const radius = 65;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const idx = i * 3;
          const t = (i / PARTICLE_COUNT) * Math.PI * 8;
          const strand = (i % 2 === 0) ? 0 : Math.PI;
          const y = ((i / PARTICLE_COUNT) - 0.5) * length;

          coords[idx] = Math.cos(t + strand) * radius + (Math.random() - 0.5) * 10;
          coords[idx + 1] = y;
          coords[idx + 2] = Math.sin(t + strand) * radius + (Math.random() - 0.5) * 10;
        }
        return coords;
      },

      // 5. Galaxy Spiral
      galaxy: function () {
        const coords = new Float32Array(PARTICLE_COUNT * 3);
        const arms = 3;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const idx = i * 3;
          const distance = Math.pow(Math.random(), 2) * 220;
          const armIndex = i % arms;
          const angle = (armIndex * ((Math.PI * 2) / arms)) + (distance * 0.035);

          const spread = Math.random() * 25;
          coords[idx] = Math.cos(angle) * distance + (Math.random() - 0.5) * spread;
          coords[idx + 1] = (Math.random() - 0.5) * (35 - distance * 0.1);
          coords[idx + 2] = Math.sin(angle) * distance + (Math.random() - 0.5) * spread;
        }
        return coords;
      },

      // 6. Hypercube
      cube: function () {
        const coords = new Float32Array(PARTICLE_COUNT * 3);
        const size = 180;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const idx = i * 3;
          const face = Math.floor(Math.random() * 6);
          const u = (Math.random() - 0.5) * size;
          const v = (Math.random() - 0.5) * size;
          const half = size / 2;

          switch (face) {
            case 0: coords[idx] = half; coords[idx + 1] = u; coords[idx + 2] = v; break;
            case 1: coords[idx] = -half; coords[idx + 1] = u; coords[idx + 2] = v; break;
            case 2: coords[idx] = u; coords[idx + 1] = half; coords[idx + 2] = v; break;
            case 3: coords[idx] = u; coords[idx + 1] = -half; coords[idx + 2] = v; break;
            case 4: coords[idx] = u; coords[idx + 1] = v; coords[idx + 2] = half; break;
            case 5: coords[idx] = u; coords[idx + 1] = v; coords[idx + 2] = -half; break;
          }
        }
        return coords;
      },

      // 7. Cylinder
      cylinder: function () {
        const coords = new Float32Array(PARTICLE_COUNT * 3);
        const radius = 90;
        const height = 240;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const idx = i * 3;
          const angle = Math.random() * Math.PI * 2;
          const y = (Math.random() - 0.5) * height;

          coords[idx] = Math.cos(angle) * radius;
          coords[idx + 1] = y;
          coords[idx + 2] = Math.sin(angle) * radius;
        }
        return coords;
      },

      // 8. Pyramid
      pyramid: function () {
        const coords = new Float32Array(PARTICLE_COUNT * 3);
        const base = 190;
        const h = 180;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const idx = i * 3;
          const yFrac = Math.random();
          const currentWidth = base * (1 - yFrac);
          const x = (Math.random() - 0.5) * currentWidth;
          const z = (Math.random() - 0.5) * currentWidth;
          const y = (yFrac - 0.5) * h;

          coords[idx] = x;
          coords[idx + 1] = y;
          coords[idx + 2] = z;
        }
        return coords;
      }
    };

    // Initialize Scene, Camera & Renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 450;

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Colors (Signature Red #d02128 to white/cyan accents)
    const colorRed = new THREE.Color(0xd02128);
    const colorWhite = new THREE.Color(0xffffff);
    const colorCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const mix = Math.random();
      let c = colorWhite;
      if (mix < 0.6) {
        c = colorRed;
      } else if (mix < 0.8) {
        c = colorCyan;
      }
      colors[idx] = c.r;
      colors[idx + 1] = c.g;
      colors[idx + 2] = c.b;
    }

    // Initial shape: E Monogram
    const initialCoords = shapes.e_logo();
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      currentPositions[i] = initialCoords[i];
      targetPositions[i] = initialCoords[i];
    }

    particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Mouse Tracking for Parallax
    window.addEventListener('mousemove', function (e) {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    });

    // Window Resize Handler
    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Morph Shape Switcher
    function morphTo(shapeKey) {
      if (!shapes[shapeKey]) return;
      activeShape = shapeKey;
      const newCoords = shapes[shapeKey]();
      for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        targetPositions[i] = newCoords[i];
      }

      // Update button active state
      document.querySelectorAll('.shape-btn').forEach(btn => {
        if (btn.getAttribute('data-shape') === shapeKey) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Attach click events to shape buttons
    document.querySelectorAll('.shape-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const shape = this.getAttribute('data-shape');
        morphTo(shape);
      });
    });

    // Animation Loop (60 FPS)
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Particle position lerping towards target
      const posAttr = particlesGeometry.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
        // Linear interpolation towards target coordinates
        posArray[i] += (targetPositions[i] - posArray[i]) * 0.05;
        posArray[i + 1] += (targetPositions[i + 1] - posArray[i + 1]) * 0.05;
        posArray[i + 2] += (targetPositions[i + 2] - posArray[i + 2]) * 0.05;
      }
      posAttr.needsUpdate = true;

      // Gentle auto-rotation & parallax tilt
      particleSystem.rotation.y = elapsedTime * 0.18 + mouseX * 2.0;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.12) * 0.1 + mouseY * 2.0;

      renderer.render(scene, camera);
    }

    animate();
  }

  // --- INITIALIZE ON DOM READY ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMobileMenu();
      initFluidRipple();
      initThreeJsCanvas();
    });
  } else {
    initMobileMenu();
    initFluidRipple();
    initThreeJsCanvas();
  }

})();
