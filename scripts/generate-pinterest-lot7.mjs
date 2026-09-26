/**
 * Lot 7: pin 441–840 — stile master + nicchie tematiche.
 *   node scripts/generate-pinterest-lot7.mjs
 *   node scripts/generate-pinterest-lot7.mjs --from=441 --to=500
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { ADVICE } from './lot7-advice-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'pinterest-pins');
const PLATES = path.join(OUT, 'art-plates');
const W = 1024;
const H = 1536;
const FIRST_ID = 441;

const BOARDS = {
  gratis: 'Lettura Tarocchi Gratis',
  amore: 'Tarocchi Amore',
  lavoro: 'Tarocchi Lavoro',
  futuro: 'Tarocchi Futuro',
  domanda: 'Come Fare una Domanda ai Tarocchi',
};
const LINKS = {
  gratis: 'https://www.luxseetarot.com/tarocchi-gratis.html',
  amore: 'https://www.luxseetarot.com/tarocchi-amore.html',
  lavoro: 'https://www.luxseetarot.com/tarocchi-lavoro.html',
  futuro: 'https://www.luxseetarot.com/tarocchi-futuro.html',
  domanda: 'https://www.luxseetarot.com/blog/come-fare-una-domanda-ai-tarocchi',
};

/** Stili per nicchia (+ rotazione varianti). */
const NICHE_STYLES = {
  spiritualita: [
    { name: 'cosmic-crystal', accent: '#d4af6a', accent2: '#f0d78a', foilDeep: '#8a6a30', mute: '#c4a86a', light: false, plate: 'plate-cosmic-crystal.png' },
    { name: 'cosmic-eye', accent: '#c9a8e0', accent2: '#e4d0f4', foilDeep: '#684878', mute: '#9880b0', light: false, plate: 'plate-cosmic-eye.png' },
    { name: 'ice-compass', accent: '#9eb6d4', accent2: '#c8daf0', foilDeep: '#4a6080', mute: '#7a90a8', light: false, plate: 'plate-ice-compass.png' },
  ],
  ombra: [
    { name: 'shadow-candle', accent: '#c87941', accent2: '#e8a060', foilDeep: '#6a3a1c', mute: '#a87850', light: false, plate: 'plate-shadow-candle.png' },
    { name: 'black-ring', accent: '#f0c75e', accent2: '#ffe9a0', foilDeep: '#8a6a20', mute: '#d0b060', light: false, plate: 'plate-black-ring.png' },
    { name: 'noir-door', accent: '#e2c896', accent2: '#f5e4b8', foilDeep: '#8a6a30', mute: '#b8a078', light: false, plate: 'plate-noir-door.png' },
  ],
  evoluzione: [
    { name: 'evo-path', accent: '#6b2d3c', accent2: '#9a4558', foilDeep: '#3d1822', mute: '#7a4a52', light: true, plate: 'plate-evo-path.png' },
    { name: 'sage-thread', accent: '#2f5c45', accent2: '#4a8a66', foilDeep: '#1a3326', mute: '#4a6b58', light: true, plate: 'plate-sage-thread.png' },
    { name: 'slate-arrows', accent: '#d2c2a0', accent2: '#ebe0c8', foilDeep: '#6a6048', mute: '#9a9078', light: false, plate: 'plate-slate-arrows.png' },
  ],
  coppe: [
    { name: 'cups-chalice', accent: '#9eb6d4', accent2: '#c8daf0', foilDeep: '#3a6080', mute: '#7a90a8', light: false, plate: 'plate-cups-chalice.png' },
    { name: 'wine-rose', accent: '#e8b4a0', accent2: '#f6d2c4', foilDeep: '#8a5040', mute: '#c89888', light: false, plate: 'plate-wine-heart.png' },
  ],
  bastoni: [
    { name: 'wands-fire', accent: '#c87941', accent2: '#e8a060', foilDeep: '#6a3a1c', mute: '#a87850', light: false, plate: 'plate-wands-fire.png' },
    { name: 'ember-pause', accent: '#e8a060', accent2: '#f0c080', foilDeep: '#6a3a1c', mute: '#a87850', light: false, plate: 'plate-ember-pause.png' },
  ],
  spade: [
    { name: 'swords-blade', accent: '#b8c8d8', accent2: '#e0e8f0', foilDeep: '#506070', mute: '#90a0b0', light: false, plate: 'plate-swords-blade.png' },
    { name: 'midnight-key', accent: '#d4af6a', accent2: '#f0d78a', foilDeep: '#8a6a30', mute: '#c4a86a', light: false, plate: 'plate-midnight-key.png' },
  ],
  denari: [
    { name: 'pentacles-coin', accent: '#c6b070', accent2: '#e4d090', foilDeep: '#6a5820', mute: '#8a9870', light: false, plate: 'plate-pentacles-coin.png' },
    { name: 'forest-moon', accent: '#c6b070', accent2: '#e4d090', foilDeep: '#6a5820', mute: '#8a9870', light: false, plate: 'plate-forest-moon.png' },
  ],
};

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function csvEsc(s) {
  const t = String(s);
  return /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
}
function slugify(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 42);
}
function wrapLines(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

function pickStyle(niche, i) {
  const list = NICHE_STYLES[niche] || NICHE_STYLES.spiritualita;
  return list[i % list.length];
}

function buildPins() {
  if (ADVICE.length !== 400) throw new Error(`Attesi 400, trovati ${ADVICE.length}`);
  return ADVICE.map((row, i) => {
    const [theme, overlay, sub, niche, desc, tags] = row;
    const id = FIRST_ID + i;
    return {
      id,
      theme,
      niche,
      overlay,
      sub,
      board: BOARDS[theme],
      title: overlay.length > 60 ? overlay.slice(0, 57) + '…' : overlay,
      description: `${desc}\n\n${tags}`,
      link: theme === 'domanda' ? LINKS.domanda : LINKS[theme],
      image: `pin-${id}-${slugify(overlay) || 'pin'}.png`,
      style: pickStyle(niche, i),
    };
  });
}

function buildOverlaySvg(pin) {
  const s = pin.style;
  const a = s.accent;
  const lines = wrapLines(pin.overlay, 11);
  const lineH = lines.length >= 3 ? 100 : 120;
  const titleStart = lines.length >= 3 ? 320 : 350;
  const textNodes = lines
    .map((line, i) => {
      const y = titleStart + i * lineH;
      const size = line.length > 14 ? 88 : line.length > 10 ? 108 : 124;
      return `<text x="512" y="${y}" text-anchor="middle" fill="url(#foil)" filter="url(#softGlow)" font-family="Georgia, 'Times New Roman', Times, serif" font-size="${size}" font-weight="600">${esc(line)}</text>`;
    })
    .join('\n');
  const afterTitle = titleStart + (lines.length - 1) * lineH + 58;
  const sub = String(pin.sub || '');
  const subSize = sub.length > 28 ? 34 : sub.length > 20 ? 38 : 42;
  const brandFill = s.light ? a : 'url(#foil)';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="foil" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${s.accent2}"/>
      <stop offset="40%" stop-color="${a}"/>
      <stop offset="100%" stop-color="${s.foilDeep}"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="scrim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${s.light ? '#faf6f0' : '#000000'}" stop-opacity="${s.light ? 0.35 : 0.45}"/>
      <stop offset="42%" stop-color="${s.light ? '#faf6f0' : '#000000'}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <rect x="44" y="44" width="936" height="1448" fill="none" stroke="${a}" stroke-width="1.7" opacity="0.8"/>
  <rect x="56" y="56" width="912" height="1424" fill="none" stroke="${a}" stroke-width="0.85" opacity="0.42"/>
  <g fill="none" stroke="${a}" stroke-width="1.4" opacity="0.85">
    <path d="M70 70 L70 120 M70 70 L120 70"/>
    <path d="M954 70 L954 120 M954 70 L904 70"/>
    <path d="M70 1466 L70 1416 M70 1466 L120 1466"/>
    <path d="M954 1466 L954 1416 M954 1466 L904 1466"/>
  </g>
  <text x="512" y="128" text-anchor="middle" fill="${brandFill}" font-family="Georgia, serif" font-size="18" letter-spacing="10">LUXSEETAROT</text>
  <path d="M512 146 L518 154 L512 162 L506 154 Z" fill="${a}" opacity="0.9"/>
  ${textNodes}
  <g stroke="${a}" stroke-width="1.25" opacity="0.8">
    <line x1="270" y1="${afterTitle}" x2="460" y2="${afterTitle}"/>
    <line x1="564" y1="${afterTitle}" x2="754" y2="${afterTitle}"/>
  </g>
  <path d="M512 ${afterTitle - 7} L519 ${afterTitle} L512 ${afterTitle + 7} L505 ${afterTitle} Z" fill="${a}"/>
  <text x="512" y="${afterTitle + 60}" text-anchor="middle" fill="${s.mute}" font-family="Georgia, 'Times New Roman', serif" font-size="${subSize}" letter-spacing="1.1">${esc(sub)}</text>
  <path d="M512 1455 L517 1465 L512 1475 L507 1465 Z" fill="${a}" opacity="0.75"/>
</svg>`;
}

async function ensurePlate(style) {
  const src = path.join(PLATES, style.plate);
  if (!fs.existsSync(src)) throw new Error(`Art plate mancante: ${style.plate}`);
  const cache = path.join(PLATES, `_cache-${style.plate}`);
  if (!fs.existsSync(cache)) {
    await sharp(src).resize(W, H, { fit: 'cover', position: 'centre' }).png().toFile(cache);
  }
  return cache;
}

async function renderPin(pin) {
  const platePath = await ensurePlate(pin.style);
  const overlay = Buffer.from(buildOverlaySvg(pin));
  await sharp(platePath)
    .composite([{ input: await sharp(overlay).png().toBuffer(), top: 0, left: 0 }])
    .png({ compressionLevel: 8 })
    .toFile(path.join(OUT, pin.image));
}

function syncCsv(pins) {
  const csvPath = path.join(OUT, 'pins-guida.csv');
  let csv = fs.existsSync(csvPath) ? fs.readFileSync(csvPath, 'utf8') : 'id,immagine,bacheca,titolo,descrizione,link\n';
  const header = csv.split(/\r?\n/)[0] || 'id,immagine,bacheca,titolo,descrizione,link';
  const keep = [];
  let buf = '';
  for (const line of csv.split(/\r?\n/).slice(1)) {
    if (!buf && !line.trim()) continue;
    buf = buf ? `${buf}\n${line}` : line;
    if (((buf.match(/"/g) || []).length) % 2 === 1) continue;
    const id = parseInt((buf.match(/^(\d+),/) || [])[1], 10);
    if (id && id < FIRST_ID) keep.push(buf);
    buf = '';
  }
  for (const p of pins) {
    keep.push([String(p.id), p.image, csvEsc(p.board), csvEsc(p.title), csvEsc(p.description), p.link].join(','));
  }
  keep.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  fs.writeFileSync(csvPath, header + '\n' + keep.join('\n') + '\n', 'utf8');
}

function parseArgs() {
  const out = { from: FIRST_ID, to: FIRST_ID + 399 };
  for (const a of process.argv.slice(2)) {
    if (a.startsWith('--from=')) out.from = +a.slice(7);
    else if (a.startsWith('--to=')) out.to = +a.slice(5);
  }
  return out;
}

async function main() {
  const args = parseArgs();
  fs.mkdirSync(OUT, { recursive: true });
  const all = buildPins();
  const pins = all.filter((p) => p.id >= args.from && p.id <= args.to);

  for (const f of fs.readdirSync(OUT)) {
    const m = f.match(/^pin-(\d+)-.*\.png$/);
    if (!m) continue;
    const id = +m[1];
    if (id < FIRST_ID || id > FIRST_ID + 399) continue;
    if (!pins.some((p) => p.image === f) && pins.some((p) => p.id === id)) {
      fs.unlinkSync(path.join(OUT, f));
    }
  }

  console.log(`Lot7 master style: ${pins.length} pin (${pins[0]?.id}–${pins[pins.length - 1]?.id})`);
  const t0 = Date.now();
  for (let i = 0; i < pins.length; i++) {
    await renderPin(pins[i]);
    if ((i + 1) % 25 === 0 || i === pins.length - 1) {
      console.log(`  ${i + 1}/${pins.length} (${((Date.now() - t0) / 1000).toFixed(1)}s) — ${pins[i].image}`);
    }
  }
  syncCsv(all);
  const niches = {};
  for (const p of all) niches[p.niche] = (niches[p.niche] || 0) + 1;
  fs.writeFileSync(path.join(OUT, 'LOT7-NICCHIE.txt'), Object.entries(niches).map(([k, v]) => `${k}: ${v}`).join('\n') + '\n', 'utf8');
  console.log('CSV sync 441–840. Nicchie:', niches);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
