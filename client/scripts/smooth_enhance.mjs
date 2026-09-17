import { Jimp } from 'jimp';

// 2D Perlin-like gradient noise for ultra-natural organic texture
function generatePerlinMatrix(w, h, gridScale = 32, seed = 123) {
  const cols = Math.ceil(w / gridScale) + 2;
  const rows = Math.ceil(h / gridScale) + 2;
  
  // Pseudo random gradients
  const grad = [];
  for (let i = 0; i < cols * rows; i++) {
    const angle = (Math.sin(i * 91.345 + seed * 45.67) * 43758.5453) * Math.PI * 2;
    grad.push({ x: Math.cos(angle), y: Math.sin(angle) });
  }

  const values = new Float32Array(w * h);

  for (let y = 0; y < h; y++) {
    const gy = y / gridScale;
    const y0 = Math.floor(gy);
    const y1 = y0 + 1;
    const dy = gy - y0;
    const wy = dy * dy * (3 - 2 * dy);

    for (let x = 0; x < w; x++) {
      const gx = x / gridScale;
      const x0 = Math.floor(gx);
      const x1 = x0 + 1;
      const dx = gx - x0;
      const wx = dx * dx * (3 - 2 * dx);

      const g00 = grad[y0 * cols + x0];
      const g10 = grad[y0 * cols + x1];
      const g01 = grad[y1 * cols + x0];
      const g11 = grad[y1 * cols + x1];

      const d00 = dx * g00.x + dy * g00.y;
      const d10 = (dx - 1) * g10.x + dy * g10.y;
      const d01 = dx * g01.x + (dy - 1) * g01.y;
      const d11 = (dx - 1) * g11.x + (dy - 1) * g11.y;

      const top = d00 * (1 - wx) + d10 * wx;
      const bottom = d01 * (1 - wx) + d11 * wx;
      const val = top * (1 - wy) + bottom * wy;
      values[y * w + x] = (val + 1) * 0.5; // normalized 0 to 1
    }
  }
  return values;
}

async function run() {
  // ==========================================
  // 1. KITCHEN: Realistic cooking oil & grease patina
  // ==========================================
  console.log('Processing kitchen...');
  const kitchenClean = await Jimp.read('d:/ucs/scratch/p1_kitchen.jpg');
  const kw = kitchenClean.bitmap.width;
  const kh = kitchenClean.bitmap.height;
  const kitchenBefore = kitchenClean.clone();

  const kNoiseLg = generatePerlinMatrix(kw, kh, 64, 42);
  const kNoiseSm = generatePerlinMatrix(kw, kh, 16, 99);

  for (let y = 0; y < kh; y++) {
    const ny = y / kh; // 0 (top) to 1 (bottom)
    for (let x = 0; x < kw; x++) {
      const nx = x / kw; // 0 (left) to 1 (right)
      const idx = (y * kw + x) * 4;
      let r = kitchenBefore.bitmap.data[idx];
      let g = kitchenBefore.bitmap.data[idx + 1];
      let b = kitchenBefore.bitmap.data[idx + 2];

      const nVal = kNoiseLg[y * kw + x] * 0.7 + kNoiseSm[y * kw + x] * 0.3;

      // Smooth grease concentration around stove & backsplash (higher on right & mid-height)
      // Gaussian center around nx = 0.75, ny = 0.45
      const distFromStove = Math.hypot((nx - 0.72) / 0.55, (ny - 0.42) / 0.45);
      const stoveInfluence = Math.exp(-distFromStove * distFromStove * 1.5);

      // Base uncleaned film (smooth everywhere)
      const baseFilm = 0.18 + 0.35 * stoveInfluence * nVal;

      // Desaturate slightly, reduce peak white specular glare, and add warm greasy oil tone
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      r = r * 0.75 + luma * 0.25;
      g = g * 0.75 + luma * 0.25;
      b = b * 0.70 + luma * 0.20;

      // Warm amber/oil tint
      r = r * (1 - baseFilm * 0.4) + 165 * (baseFilm * 0.4);
      g = g * (1 - baseFilm * 0.5) + 130 * (baseFilm * 0.5);
      b = b * (1 - baseFilm * 0.7) + 65 * (baseFilm * 0.7);

      // Dull the highlights (grease removes sharp sheen)
      r = Math.min(230, r);
      g = Math.min(225, g);
      b = Math.min(205, b);

      kitchenBefore.bitmap.data[idx] = Math.round(Math.min(255, Math.max(0, r)));
      kitchenBefore.bitmap.data[idx + 1] = Math.round(Math.min(255, Math.max(0, g)));
      kitchenBefore.bitmap.data[idx + 2] = Math.round(Math.min(255, Math.max(0, b)));
    }
  }
  await kitchenBefore.write('d:/ucs/client/public/images/before-after/kitchen-before.jpg');
  console.log('Saved kitchen-before.jpg successfully!');

  // ==========================================
  // 2. BATHROOM: Realistic soap scum & hard water mineral haze
  // ==========================================
  console.log('Processing bathroom...');
  const bathClean = await Jimp.read('d:/ucs/client/public/images/before-after/bathroom-after.jpg');
  const bw = bathClean.bitmap.width;
  const bh = bathClean.bitmap.height;
  const bathBefore = bathClean.clone();

  const bNoiseLg = generatePerlinMatrix(bw, bh, 50, 77);
  const bNoiseSm = generatePerlinMatrix(bw, bh, 14, 33);

  for (let y = 0; y < bh; y++) {
    const ny = y / bh;
    for (let x = 0; x < bw; x++) {
      const nx = x / bw;
      const idx = (y * bw + x) * 4;
      let r = bathBefore.bitmap.data[idx];
      let g = bathBefore.bitmap.data[idx + 1];
      let b = bathBefore.bitmap.data[idx + 2];

      const nVal = bNoiseLg[y * bw + x] * 0.65 + bNoiseSm[y * bw + x] * 0.35;

      // Shower glass enclosure (strongest on left: nx < 0.45)
      // Use smooth sigmoid falloff from left to right instead of hard if
      const showerWeight = 1 / (1 + Math.exp((nx - 0.42) * 16));
      const glassScum = showerWeight * (0.35 + 0.45 * nVal);

      // Floor & baseboard moisture / grime (strongest at bottom: ny > 0.7)
      const floorWeight = 1 / (1 + Math.exp((0.72 - ny) * 12));
      const floorGrime = floorWeight * (0.25 + 0.35 * nVal);

      // Overall room dullness
      const overallDull = 0.12 + glassScum * 0.6 + floorGrime * 0.4;

      // Apply matte desaturation & mineral haze
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      r = r * 0.8 + luma * 0.2;
      g = g * 0.8 + luma * 0.2;
      b = b * 0.76 + luma * 0.18;

      // Foggy cloudy soap scum on glass
      r = r * (1 - glassScum * 0.5) + 215 * (glassScum * 0.5);
      g = g * (1 - glassScum * 0.5) + 218 * (glassScum * 0.5);
      b = b * (1 - glassScum * 0.5) + 205 * (glassScum * 0.5);

      // Darker discoloured floor tiles & grout
      r = r * (1 - floorGrime * 0.35) + 70 * (floorGrime * 0.35);
      g = g * (1 - floorGrime * 0.35) + 65 * (floorGrime * 0.35);
      b = b * (1 - floorGrime * 0.35) + 55 * (floorGrime * 0.35);

      // Muted contrast
      r = r * 0.92 + 10;
      g = g * 0.92 + 10;
      b = b * 0.88 + 8;

      bathBefore.bitmap.data[idx] = Math.round(Math.min(255, Math.max(0, r)));
      bathBefore.bitmap.data[idx + 1] = Math.round(Math.min(255, Math.max(0, g)));
      bathBefore.bitmap.data[idx + 2] = Math.round(Math.min(255, Math.max(0, b)));
    }
  }
  await bathBefore.write('d:/ucs/client/public/images/before-after/bathroom-before.jpg');
  console.log('Saved bathroom-before.jpg successfully!');

  // ==========================================
  // 3. LIVING ROOM: Unpolished dull hardwood floor & dusty atmosphere
  // ==========================================
  console.log('Processing room...');
  const roomClean = await Jimp.read('d:/ucs/client/public/images/before-after/room-after.jpg');
  const rw = roomClean.bitmap.width;
  const rh = roomClean.bitmap.height;
  const roomBefore = roomClean.clone();

  const rNoiseLg = generatePerlinMatrix(rw, rh, 55, 88);

  for (let y = 0; y < rh; y++) {
    const ny = y / rh;
    for (let x = 0; x < rw; x++) {
      const idx = (y * rw + x) * 4;
      let r = roomBefore.bitmap.data[idx];
      let g = roomBefore.bitmap.data[idx + 1];
      let b = roomBefore.bitmap.data[idx + 2];

      const nVal = rNoiseLg[y * rw + x];

      // Floor (ny > 0.55): smooth transition into dusty, dull, unbuffed floor
      const floorWeight = 1 / (1 + Math.exp((0.55 - ny) * 10));
      const floorDust = floorWeight * (0.35 + 0.35 * nVal);

      // Dust dulls the polished glow and deep reflections of the wood
      r = r * (1 - floorDust * 0.6) + 125 * (floorDust * 0.6);
      g = g * (1 - floorDust * 0.6) + 115 * (floorDust * 0.6);
      b = b * (1 - floorDust * 0.6) + 100 * (floorDust * 0.6);

      // Fine atmospheric dust veil over upper room
      const roomVeil = 0.12 * (1 - floorWeight);
      r = r * (1 - roomVeil) + 175 * roomVeil;
      g = g * (1 - roomVeil) + 170 * roomVeil;
      b = b * (1 - roomVeil) + 160 * roomVeil;

      // Muted contrast
      r = r * 0.90 + 12;
      g = g * 0.90 + 12;
      b = b * 0.88 + 10;

      roomBefore.bitmap.data[idx] = Math.round(Math.min(255, Math.max(0, r)));
      roomBefore.bitmap.data[idx + 1] = Math.round(Math.min(255, Math.max(0, g)));
      roomBefore.bitmap.data[idx + 2] = Math.round(Math.min(255, Math.max(0, b)));
    }
  }
  await roomBefore.write('d:/ucs/client/public/images/before-after/room-before.jpg');
  console.log('Saved room-before.jpg successfully!');
}

run().catch(console.error);
