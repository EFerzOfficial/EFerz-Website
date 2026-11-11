import * as THREE from 'three';

/**
 * Procedural Photorealistic Canvas Texture Generators for Three.js
 * Generates high-resolution textures without external image dependencies or CORS issues.
 */

// Simple 2D Perlin/Value noise implementation for procedural geography
function pseudoNoise(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number): number {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;
  // Smooth cubic interpolation
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const n00 = pseudoNoise(i, j);
  const n10 = pseudoNoise(i + 1, j);
  const n01 = pseudoNoise(i, j + 1);
  const n11 = pseudoNoise(i + 1, j + 1);

  const nx0 = n00 * (1 - sx) + n10 * sx;
  const nx1 = n01 * (1 - sx) + n11 * sx;

  return nx0 * (1 - sy) + nx1 * sy;
}

function fbm(x: number, y: number, octaves = 5): number {
  let val = 0;
  let amp = 0.5;
  let freq = 1;
  for (let o = 0; o < octaves; o++) {
    val += smoothNoise(x * freq, y * freq) * amp;
    freq *= 2.0;
    amp *= 0.5;
  }
  return val;
}

// 1. EARTH TEXTURE
export function createEarthTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep ocean base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#0a2342');
  oceanGrad.addColorStop(0.5, '#051933');
  oceanGrad.addColorStop(1, '#0a2342');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Continents and Landmasses using fractal noise
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const lat = (y / height) * Math.PI - Math.PI / 2; // -PI/2 to PI/2
    const cosLat = Math.cos(lat);

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const lon = (x / width) * Math.PI * 2;

      // Spherical projection sample coordinates
      const nx = (Math.cos(lon) * cosLat + 1) * 2.5;
      const ny = (Math.sin(lon) * cosLat + 1) * 2.5;
      const nz = (Math.sin(lat) + 1) * 2.5;

      const elevation = fbm(nx * 1.5, ny * 1.5 + nz * 0.8, 5);

      // Polar Ice Caps
      const isPolar = Math.abs(lat) > 1.25;
      const isSubPolar = Math.abs(lat) > 1.15;

      if (isPolar || (isSubPolar && elevation > 0.45)) {
        // Bright glacier ice
        data[idx] = 235;
        data[idx + 1] = 245;
        data[idx + 2] = 255;
      } else if (elevation > 0.52) {
        // Landmass
        const landHeight = (elevation - 0.52) / 0.48;
        if (landHeight < 0.15) {
          // Coastal lush green & beaches
          data[idx] = 40 + Math.floor(landHeight * 100);
          data[idx + 1] = 110 + Math.floor(landHeight * 50);
          data[idx + 2] = 45;
        } else if (landHeight < 0.5) {
          // Forest / plains
          data[idx] = 55;
          data[idx + 1] = 125;
          data[idx + 2] = 40;
        } else if (landHeight < 0.75) {
          // Mountainous desert / brown rock
          data[idx] = 145;
          data[idx + 1] = 115;
          data[idx + 2] = 75;
        } else {
          // Snow-capped peaks
          data[idx] = 215;
          data[idx + 1] = 220;
          data[idx + 2] = 225;
        }
      } else if (elevation > 0.49) {
        // Shallow coastal shelf turquoise water
        data[idx] = 10;
        data[idx + 1] = 95;
        data[idx + 2] = 140;
      }
      // Otherwise keep ocean deep blue
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 2. EARTH CLOUD TEXTURE (Alpha-masked)
export function createEarthCloudTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const u = (x / width) * 4.0;
      const v = (y / height) * 2.5;

      const cloudNoise = fbm(u + Math.sin(v * 3) * 0.2, v, 4);

      if (cloudNoise > 0.53) {
        const alpha = Math.min(255, Math.floor((cloudNoise - 0.53) * 5.0 * 255));
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
        data[idx + 3] = alpha;
      } else {
        data[idx + 3] = 0;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 3. JUPITER TEXTURE
export function createJupiterTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  // Gas giant color palette
  const colors = [
    { r: 235, g: 215, b: 185 }, // Cream white
    { r: 195, g: 145, b: 95 },  // Ochre tan
    { r: 165, g: 85, b: 45 },   // Reddish brown
    { r: 210, g: 175, b: 135 }, // Pale amber
    { r: 140, g: 70, b: 35 },   // Deep dark mahogany
  ];

  // Great Red Spot center coordinates
  const grsX = 0.65 * width;
  const grsY = 0.68 * height;
  const grsRadiusX = 55;
  const grsRadiusY = 28;

  for (let y = 0; y < height; y++) {
    const normY = y / height;
    // Multi-frequency wave turbulence for atmospheric bands
    const bandWave = Math.sin(normY * 36) * 0.4 + Math.sin(normY * 18 + 0.5) * 0.3;

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const normX = x / width;

      // Add horizontal shear and eddy currents
      const turbulence = fbm(normX * 8 + normY * 2, normY * 12, 3) * 0.15;
      const bandIndexRaw = (normY + bandWave * 0.05 + turbulence) * (colors.length - 1);
      const bandIdx1 = Math.max(0, Math.min(colors.length - 1, Math.floor(bandIndexRaw)));
      const bandIdx2 = Math.min(colors.length - 1, bandIdx1 + 1);
      const frac = bandIndexRaw - bandIdx1;

      const c1 = colors[bandIdx1];
      const c2 = colors[bandIdx2];

      let r = c1.r * (1 - frac) + c2.r * frac;
      let g = c1.g * (1 - frac) + c2.g * frac;
      let b = c1.b * (1 - frac) + c2.b * frac;

      // Great Red Spot calculation (elliptical vortex)
      const dx = (x - grsX) / grsRadiusX;
      const dy = (y - grsY) / grsRadiusY;
      const distGrs = Math.sqrt(dx * dx + dy * dy);

      if (distGrs < 1.0) {
        const swirlAngle = distGrs * Math.PI * 4;
        const swirlNoise = Math.sin(swirlAngle) * 0.2;
        const spotBlend = Math.cos(distGrs * (Math.PI / 2));

        r = r * (1 - spotBlend) + (195 + swirlNoise * 20) * spotBlend;
        g = g * (1 - spotBlend) + (65 + swirlNoise * 15) * spotBlend;
        b = b * (1 - spotBlend) + (40 + swirlNoise * 10) * spotBlend;
      }

      data[idx] = Math.floor(r);
      data[idx + 1] = Math.floor(g);
      data[idx + 2] = Math.floor(b);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 4. JUPITER RINGS TEXTURE
export function createJupiterRingsTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 64;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, width, 0);
  grad.addColorStop(0.0, 'rgba(180, 140, 100, 0.0)');
  grad.addColorStop(0.2, 'rgba(210, 175, 120, 0.4)');
  grad.addColorStop(0.35, 'rgba(230, 195, 140, 0.8)');
  grad.addColorStop(0.5, 'rgba(160, 120, 80, 0.2)'); // Cassini-like gap
  grad.addColorStop(0.65, 'rgba(240, 205, 150, 0.9)');
  grad.addColorStop(0.85, 'rgba(200, 160, 110, 0.5)');
  grad.addColorStop(1.0, 'rgba(150, 110, 70, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 5. MARS TEXTURE
export function createMarsTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const lat = (y / height) * Math.PI - Math.PI / 2;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const u = (x / width) * 4.0;
      const v = (y / height) * 2.0;

      const terrain = fbm(u, v, 5);

      // Polar ice caps
      if (Math.abs(lat) > 1.35) {
        data[idx] = 240;
        data[idx + 1] = 245;
        data[idx + 2] = 250;
      } else {
        // Red rust basalt
        const r = 160 + terrain * 80;
        const g = 65 + terrain * 40;
        const b = 35 + terrain * 20;

        data[idx] = Math.floor(r);
        data[idx + 1] = Math.floor(g);
        data[idx + 2] = Math.floor(b);
      }
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 6. MOON TEXTURE
export function createMoonTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const u = (x / width) * 5.0;
      const v = (y / height) * 2.5;

      const noise = fbm(u, v, 5);
      const val = 70 + noise * 140; // Grey cratered surface

      data[idx] = Math.floor(val);
      data[idx + 1] = Math.floor(val * 0.98);
      data[idx + 2] = Math.floor(val * 0.95);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 7. PLUTO TEXTURE
export function createPlutoTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  // Tombaugh Regio "Heart" coordinate approximation
  const heartX = 0.5 * width;
  const heartY = 0.55 * height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const u = (x / width) * 3.5;
      const v = (y / height) * 2.0;

      const terrain = fbm(u, v, 4);

      // Distance from heart feature
      const dx = (x - heartX) / 60;
      const dy = (y - heartY) / 45;
      const distHeart = Math.sqrt(dx * dx + dy * dy);

      if (distHeart < 1.0) {
        // Bright nitrogen ice heart
        const blend = 1 - distHeart;
        data[idx] = Math.floor(215 * blend + (130 + terrain * 40) * (1 - blend));
        data[idx + 1] = Math.floor(205 * blend + (95 + terrain * 30) * (1 - blend));
        data[idx + 2] = Math.floor(190 * blend + (70 + terrain * 25) * (1 - blend));
      } else {
        // Reddish-brown icy tholin terrain
        data[idx] = Math.floor(115 + terrain * 50);
        data[idx + 1] = Math.floor(80 + terrain * 35);
        data[idx + 2] = Math.floor(65 + terrain * 25);
      }
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 8. GLOWING COMET HEAD SPRITE
export function createGlowSpriteTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const radGrad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  radGrad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  radGrad.addColorStop(0.2, 'rgba(255, 210, 120, 0.8)');
  radGrad.addColorStop(0.5, 'rgba(255, 60, 40, 0.35)');
  radGrad.addColorStop(0.8, 'rgba(160, 20, 80, 0.1)');
  radGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
