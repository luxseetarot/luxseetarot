/**
 * Grafica unica per pin: plate + colori + crop + hue deterministici da id.
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const W = 1024;
const H = 1536;

const POSITIONS = [
  'centre', 'north', 'south', 'east', 'west',
  'northeast', 'northwest', 'southeast', 'southwest',
  'entropy', 'attention',
];

function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function listArtPlates(platesDir) {
  return fs
    .readdirSync(platesDir)
    .filter((f) => f.startsWith('plate-') && f.endsWith('.png') && !f.startsWith('_'))
    .sort();
}

/**
 * Stile unico e stabile per un pin id (stesso id → stessa grafica).
 */
export function uniqueStyleForPin(id, plates, preferredPlates = null) {
  const rng = mulberry32((id * 2654435761) >>> 0);
  const pool = preferredPlates?.length ? preferredPlates : plates;
  // stride primo: riduce ripetizioni consecutive
  const plate = pool[(id * 17 + Math.floor(rng() * 3)) % pool.length];

  const hueBase = Math.floor(rng() * 360);
  const light = rng() > 0.92; // quasi sempre testo oro su scuro (contrasto)
  const accent = hslToHex(hueBase, light ? 0.45 : 0.72, light ? 0.32 : 0.62);
  const accent2 = hslToHex(hueBase + 18 + rng() * 20, 0.55 + rng() * 0.25, light ? 0.42 : 0.78);
  const foilDeep = hslToHex(hueBase - 12, 0.55, light ? 0.18 : 0.28);
  const mute = hslToHex(hueBase + 8, 0.25 + rng() * 0.2, light ? 0.38 : 0.68);

  return {
    name: `unique-${id}`,
    plate,
    accent,
    accent2,
    foilDeep,
    mute,
    light,
    // variazioni fotografiche uniche sulla plate
    hue: Math.floor(rng() * 360) - 180, // sharp modulate hue: -180..180-ish
    brightness: 0.88 + rng() * 0.28,
    saturation: 0.75 + rng() * 0.55,
    position: POSITIONS[Math.floor(rng() * POSITIONS.length)],
    zoom: 1.02 + rng() * 0.22, // crop più stretto → frame diverso
    tintOpacity: 0.08 + rng() * 0.18,
    tintColor: hslToHex(hueBase + 40, 0.55, light ? 0.55 : 0.35),
  };
}

/**
 * Prepara uno sfondo unico per il pin (cache per-id).
 */
export async function prepareUniquePlate(style, platesDir, cacheDir, id) {
  fs.mkdirSync(cacheDir, { recursive: true });
  const cachePath = path.join(cacheDir, `pin-${id}.png`);
  if (fs.existsSync(cachePath)) return cachePath;

  const src = path.join(platesDir, style.plate);
  if (!fs.existsSync(src)) throw new Error(`Plate mancante: ${style.plate}`);

  const zw = Math.round(W * style.zoom);
  const zh = Math.round(H * style.zoom);

  const base = await sharp(src)
    .resize(zw, zh, { fit: 'cover', position: style.position })
    .extract({
      left: Math.max(0, Math.floor((zw - W) / 2)),
      top: Math.max(0, Math.floor((zh - H) / 2)),
      width: W,
      height: H,
    })
    .modulate({
      brightness: style.brightness,
      saturation: style.saturation,
      hue: style.hue,
    })
    .toBuffer();

  const tintSvg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${style.tintColor}" stop-opacity="${style.tintOpacity}"/>
      <stop offset="55%" stop-color="${style.tintColor}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${style.accent}" stop-opacity="${style.tintOpacity * 0.7}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`);

  await sharp(base)
    .composite([{ input: await sharp(tintSvg).png().toBuffer(), blend: 'over' }])
    .png()
    .toFile(cachePath);

  return cachePath;
}
