// Dynamic Digit Constellation Generators for EFerz Anniversaries (01 through 99)
// Generates 3D particle coordinates for any two-digit number (like "06", "07", "08", etc.)

export function generateNumberVertices(
  numStr: string,
  count: number
): { x: number; y: number; z: number }[] {
  const digits = numStr.length === 1 ? ['0', numStr] : numStr.split('');
  const d1 = digits[0] || '0';
  const d2 = digits[1] || '7';

  const countPerDigit = Math.floor(count / 2);
  const v1 = generateSingleDigitVertices(d1, countPerDigit, -182);
  const v2 = generateSingleDigitVertices(d2, count - countPerDigit, 182);

  return [...v1, ...v2];
}

function generateSingleDigitVertices(
  digit: string,
  count: number,
  centerX: number
): { x: number; y: number; z: number }[] {
  const points: { x: number; y: number; z: number }[] = [];

  for (let i = 0; i < count; i++) {
    const t = i / count;
    let x = 0;
    let y = 0;
    const z = (Math.random() - 0.5) * 44;
    const spread = () => (Math.random() - 0.5) * 44;

    switch (digit) {
      case '0': {
        const angle = t * Math.PI * 2;
        const band = (Math.random() - 0.5) * 34;
        x = centerX + (128 + band) * Math.cos(angle) + (Math.random() - 0.5) * 14;
        y = (268 + band) * Math.sin(angle) + (Math.random() - 0.5) * 14;
        break;
      }
      case '1': {
        if (t < 0.2) {
          // Top diagonal serif
          const u = t / 0.2;
          x = centerX - 85 + u * 85 + spread();
          y = -165 - u * 100 + spread();
        } else if (t < 0.85) {
          // Main vertical stem
          const u = (t - 0.2) / 0.65;
          x = centerX + spread();
          y = -265 + u * 530 + spread();
        } else {
          // Bottom base bar
          const u = (t - 0.85) / 0.15;
          x = centerX - 95 + u * 190 + spread();
          y = 265 + spread();
        }
        break;
      }
      case '2': {
        if (t < 0.45) {
          // Top arch
          const u = t / 0.45;
          const angle = Math.PI * 1.15 - u * Math.PI * 1.35;
          x = centerX + 122 * Math.cos(angle) + spread();
          y = -125 - 138 * Math.sin(angle) + spread();
        } else if (t < 0.75) {
          // Diagonal down to bottom-left
          const u = (t - 0.45) / 0.3;
          x = centerX + 105 - u * 225 + spread();
          y = -38 + u * 303 + spread();
        } else {
          // Bottom horizontal base
          const u = (t - 0.75) / 0.25;
          x = centerX - 122 + u * 248 + spread();
          y = 265 + spread();
        }
        break;
      }
      case '3': {
        if (t < 0.5) {
          const u = t / 0.5;
          const angle = Math.PI * 0.85 - u * Math.PI * 1.65;
          x = centerX + 118 * Math.cos(angle) + spread();
          y = -132 - 128 * Math.sin(angle) + spread();
        } else {
          const u = (t - 0.5) / 0.5;
          const angle = Math.PI * 0.75 - u * Math.PI * 1.65;
          x = centerX + 128 * Math.cos(angle) + spread();
          y = 132 + 132 * Math.sin(angle) + spread();
        }
        break;
      }
      case '4': {
        if (t < 0.4) {
          // Diagonal from top to left-mid
          const u = t / 0.4;
          x = centerX + 60 - u * 190 + spread();
          y = -265 + u * 340 + spread();
        } else if (t < 0.7) {
          // Horizontal bar
          const u = (t - 0.4) / 0.3;
          x = centerX - 130 + u * 260 + spread();
          y = 75 + spread();
        } else {
          // Vertical stem
          const u = (t - 0.7) / 0.3;
          x = centerX + 60 + spread();
          y = -265 + u * 530 + spread();
        }
        break;
      }
      case '5': {
        if (t < 0.25) {
          const u = t / 0.25;
          x = centerX + 118 - u * 228 + spread();
          y = -265 + spread();
        } else if (t < 0.45) {
          const u = (t - 0.25) / 0.2;
          x = centerX - 110 + spread();
          y = -265 + u * 230 + spread();
        } else {
          const u = (t - 0.45) / 0.55;
          const angle = Math.PI * 0.8 - u * Math.PI * 1.65;
          x = centerX + 128 * Math.cos(angle) + spread();
          y = 110 - 155 * Math.sin(angle) + spread();
        }
        break;
      }
      case '6': {
        if (t < 0.58) {
          // Bottom circular loop of 6
          const u = t / 0.58;
          const angle = u * Math.PI * 2;
          const band = (Math.random() - 0.5) * 32;
          x = centerX + (125 + band) * Math.cos(angle) + (Math.random() - 0.5) * 14;
          y = 115 + (145 + band) * Math.sin(angle) + (Math.random() - 0.5) * 14;
        } else {
          // Upper sweeping curve of 6
          const u = (t - 0.58) / 0.42;
          const angle = Math.PI + u * (Math.PI * 0.78);
          x = centerX + 18 + 138 * Math.cos(angle) + spread();
          y = 88 + 340 * Math.sin(angle) + spread();
        }
        break;
      }
      case '7': {
        if (t < 0.35) {
          // Top horizontal bar of 7
          const u = t / 0.35;
          x = centerX - 128 + u * 260 + spread();
          y = -262 + spread();
        } else {
          // Diagonal slash of 7
          const u = (t - 0.35) / 0.65;
          x = centerX + 132 - u * 195 + spread();
          y = -262 + u * 525 + spread();
        }
        break;
      }
      case '8': {
        if (t < 0.48) {
          const u = t / 0.48;
          const angle = u * Math.PI * 2;
          x = centerX + 112 * Math.cos(angle) + spread();
          y = -132 + 122 * Math.sin(angle) + spread();
        } else {
          const u = (t - 0.48) / 0.52;
          const angle = u * Math.PI * 2;
          x = centerX + 132 * Math.cos(angle) + spread();
          y = 132 + 138 * Math.sin(angle) + spread();
        }
        break;
      }
      case '9': {
        if (t < 0.58) {
          // Top circular loop of 9
          const u = t / 0.58;
          const angle = u * Math.PI * 2;
          x = centerX + 125 * Math.cos(angle) + spread();
          y = -115 + 145 * Math.sin(angle) + spread();
        } else {
          // Lower sweeping stem of 9
          const u = (t - 0.58) / 0.42;
          const angle = u * (Math.PI * 0.78);
          x = centerX - 18 + 138 * Math.cos(angle) + spread();
          y = -88 + 340 * Math.sin(angle) + spread();
        }
        break;
      }
      default: {
        const angle = t * Math.PI * 2;
        x = centerX + 128 * Math.cos(angle) + spread();
        y = 268 * Math.sin(angle) + spread();
        break;
      }
    }

    points.push({ x, y, z });
  }

  return points;
}
