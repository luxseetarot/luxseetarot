/**
 * Lot 9: pin 1241–1640 — stile master + colori più accesi + 5 nicchie.
 *   node scripts/generate-pinterest-lot9.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { ADVICE } from './lot9-advice-data.mjs';
import { listArtPlates, uniqueStyleForPin, prepareUniquePlate } from './lib/unique-pin-art.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'pinterest-pins');
const PLATES = path.join(OUT, 'art-plates');
const W = 1024;
const H = 1536;
const FIRST_ID = 1241;

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

// Ogni pin: grafica unica (plate/colori/crop/hue da id)
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

function buildPins(plates) {
  if (ADVICE.length !== 400) throw new Error(`Attesi 400, trovati ${ADVICE.length}`);
  return ADVICE.map((row, i) => {
    const [theme, overlay, sub, niche, desc, tags] = row;
    const id = FIRST_ID + i;
    return {
      id, theme, niche, overlay, sub,
      board: BOARDS[theme],
      title: overlay.length > 60 ? overlay.slice(0, 57) + '…' : overlay,
      description: `${desc}\n\n${tags}`,
      link: theme === 'domanda' ? LINKS.domanda : LINKS[theme],
      image: `pin-${id}-${slugify(overlay) || 'pin'}.png`,
      style: uniqueStyleForPin(id, plates),
    };
  });
}

function buildOverlaySvg(pin) {
  const s = pin.style;
  const a = s.accent;
  const lines = wrapLines(pin.overlay, 11);
  const lineH = lines.length >= 3 ? 100 : 120;
  const titleStart = lines.length >= 3 ? 320 : 350;
  const textNodes = lines.map((line, i) => {
    const y = titleStart + i * lineH;
    const size = line.length > 14 ? 88 : line.length > 10 ? 108 : 124;
    return `<text x="512" y="${y}" text-anchor="middle" fill="url(#foil)" filter="url(#softGlow)" font-family="Georgia, 'Times New Roman', Times, serif" font-size="${size}" font-weight="600">${esc(line)}</text>`;
  }).join('\n');
  const afterTitle = titleStart + (lines.length - 1) * lineH + 58;
  const sub = String(pin.sub || '');
  const subSize = sub.length > 28 ? 34 : sub.length > 20 ? 38 : 42;
  const brandFill = s.light ? a : 'url(#foil)';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="foil" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${s.accent2}"/><stop offset="40%" stop-color="${a}"/><stop offset="100%" stop-color="${s.foilDeep}"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
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
    <path d="M70 70 L70 120 M70 70 L120 70"/><path d="M954 70 L954 120 M954 70 L904 70"/>
    <path d="M70 1466 L70 1416 M70 1466 L120 1466"/><path d="M954 1466 L954 1416 M954 1466 L904 1466"/>
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

async function renderPin(pin) {
  const cacheDir = path.join(PLATES, '_unique-by-id');
  const cachePath = path.join(cacheDir, `pin-${pin.id}.png`);
  if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
  const platePath = await prepareUniquePlate(pin.style, PLATES, cacheDir, pin.id);
  await sharp(platePath)
    .composite([{ input: await sharp(Buffer.from(buildOverlaySvg(pin))).png().toBuffer(), top: 0, left: 0 }])
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

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const plates = listArtPlates(PLATES);
  const pins = buildPins(plates);
  console.log(`Lot9: ${pins.length} pin (${FIRST_ID}–${FIRST_ID + 399}) — grafica unica`);
  const t0 = Date.now();
  for (let i = 0; i < pins.length; i++) {
    await renderPin(pins[i]);
    if ((i + 1) % 25 === 0 || i === pins.length - 1) {
      console.log(`  ${i + 1}/${pins.length} (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
    }
  }
  syncCsv(pins);
  const niches = {};
  for (const p of pins) niches[p.niche] = (niches[p.niche] || 0) + 1;
  fs.writeFileSync(path.join(OUT, 'LOT9-NICCHIE.txt'), Object.entries(niches).map(([k, v]) => `${k}: ${v}`).join('\n') + '\n');
  console.log('Done', niches);
}

main().catch((e) => { console.error(e); process.exit(1); });
