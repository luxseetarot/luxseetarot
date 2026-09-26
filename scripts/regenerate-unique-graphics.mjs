/**
 * Rigenera pin 41–1640 con grafica UNICA per ogni id
 * (plate + crop + hue + palette deterministici).
 *
 *   node scripts/regenerate-unique-graphics.mjs
 *   node scripts/regenerate-unique-graphics.mjs --from=1241 --to=1640
 *   node scripts/regenerate-unique-graphics.mjs --ids=41,42,1241
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { RAW as LOT5 } from './lot5-raw-data.mjs';
import { ADVICE as LOT6 } from './lot6-advice-data.mjs';
import { ADVICE as LOT7 } from './lot7-advice-data.mjs';
import { ADVICE as LOT8 } from './lot8-advice-data.mjs';
import { ADVICE as LOT9 } from './lot9-advice-data.mjs';
import { listArtPlates, uniqueStyleForPin, prepareUniquePlate } from './lib/unique-pin-art.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'pinterest-pins');
const PLATES = path.join(OUT, 'art-plates');
const UNIQUE_CACHE = path.join(PLATES, '_unique-by-id');
const W = 1024;
const H = 1536;

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
const DESCS6 = {
  gratis: 'Un consiglio semplice: fermati, nomina ciò che pesa, poi ascolta. Le carte aiutano a mettere ordine — non a forzare una risposta.',
  amore: 'In amore il consiglio utile è spesso su di te: cosa porti, cosa temi, dove dici sì troppo.',
  lavoro: 'Al lavoro il consiglio più utile: distingue stanchezza, paura e desiderio. Poi fai un passo concreto.',
  futuro: 'Sul futuro: illumina la direzione, non il destino fisso. Basta un passo onesto.',
  domanda: 'Consiglio sulle domande: una sola, aperta, onesta. Le carte rispondono al focus che dai.',
};
const TAGS6 = {
  gratis: '#tarocchi #consiglio #chiarezza #introspezione #sé',
  amore: '#amore #tarocchi #consiglio #cuore #relazioni',
  lavoro: '#lavoro #tarocchi #consiglio #scelta #carriera',
  futuro: '#futuro #tarocchi #consiglio #direzione #passo',
  domanda: '#domanda #tarocchi #consiglio #focus #onestà',
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
function wrapLines(text, maxChars, maxLines = 4) {
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
  return lines.slice(0, maxLines);
}

function parseArgs() {
  const out = { from: 41, to: 1640, ids: null, wipeCache: process.argv.includes('--wipe-cache') };
  for (const a of process.argv.slice(2)) {
    if (a.startsWith('--from=')) out.from = +a.slice(7);
    else if (a.startsWith('--to=')) out.to = +a.slice(5);
    else if (a.startsWith('--ids=')) out.ids = a.slice(6).split(',').map((x) => +x.trim()).filter(Boolean);
  }
  return out;
}

function pushPin(pins, id, theme, overlay, sub, desc, tags, plates) {
  pins.push({
    id,
    theme,
    overlay,
    sub,
    board: BOARDS[theme],
    title: overlay.length > 60 ? overlay.slice(0, 57) + '…' : overlay,
    description: `${desc}\n\n${tags}`,
    link: theme === 'domanda' ? LINKS.domanda : LINKS[theme],
    image: `pin-${id}-${slugify(overlay) || 'pin'}.png`,
    style: uniqueStyleForPin(id, plates),
  });
}

function buildAllPins(plates) {
  const pins = [];

  LOT5.forEach((row, i) => {
    const id = 41 + i;
    const [theme, overlay, sub, descBody, tags] = row;
    pushPin(pins, id, theme, overlay, sub, descBody, tags, plates);
  });

  const byTheme = { gratis: [], amore: [], lavoro: [], futuro: [], domanda: [] };
  for (const row of LOT6) byTheme[row[0]].push(row);
  const cycle = ['gratis', 'amore', 'lavoro', 'futuro', 'domanda'];
  for (let i = 0; i < 300; i++) {
    const id = 141 + i;
    const theme = cycle[i % 5];
    const themeIdx = Math.floor(i / 5);
    const [, overlay, sub] = byTheme[theme][themeIdx];
    pushPin(pins, id, theme, overlay, sub, DESCS6[theme], TAGS6[theme], plates);
  }

  LOT7.forEach((row, i) => {
    const id = 441 + i;
    const [theme, overlay, sub, , desc, tags] = row;
    pushPin(pins, id, theme, overlay, sub, desc, tags, plates);
  });
  LOT8.forEach((row, i) => {
    const id = 841 + i;
    const [theme, overlay, sub, , desc, tags] = row;
    pushPin(pins, id, theme, overlay, sub, desc, tags, plates);
  });
  LOT9.forEach((row, i) => {
    const id = 1241 + i;
    const [theme, overlay, sub, , desc, tags] = row;
    pushPin(pins, id, theme, overlay, sub, desc, tags, plates);
  });

  return pins;
}

function buildOverlaySvg(pin) {
  // Titolo/sottotitolo: dimensioni master originali; LUXSEETAROT: 17 (1pt sotto l’originale 18)
  // Oro chiaro fisso + stroke nero + scrim scuro (contrasto)
  const lines = wrapLines(pin.overlay, 11, 3);
  const lineH = lines.length >= 3 ? 100 : 120;
  const titleStart = lines.length >= 3 ? 320 : 350;
  const textNodes = lines.map((line, i) => {
    const y = titleStart + i * lineH;
    const size = line.length > 14 ? 88 : line.length > 10 ? 108 : 124;
    return `<text x="512" y="${y}" text-anchor="middle" fill="#ffe9a0" stroke="#000000" stroke-width="4" paint-order="stroke fill" filter="url(#softGlow)" font-family="Georgia, 'Times New Roman', Times, serif" font-size="${size}" font-weight="600">${esc(line)}</text>`;
  }).join('\n');
  const afterTitle = titleStart + (lines.length - 1) * lineH + 58;
  const sub = String(pin.sub || '');
  const subSize = sub.length > 28 ? 34 : sub.length > 20 ? 38 : 42;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="scrim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.72"/>
      <stop offset="48%" stop-color="#000000" stop-opacity="0.16"/>
      <stop offset="62%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <rect x="44" y="44" width="936" height="1448" fill="none" stroke="#f0d78a" stroke-width="1.7" opacity="0.85"/>
  <rect x="56" y="56" width="912" height="1424" fill="none" stroke="#f0d78a" stroke-width="0.85" opacity="0.45"/>
  <g fill="none" stroke="#f0d78a" stroke-width="1.4" opacity="0.85">
    <path d="M70 70 L70 120 M70 70 L120 70"/><path d="M954 70 L954 120 M954 70 L904 70"/>
    <path d="M70 1466 L70 1416 M70 1466 L120 1466"/><path d="M954 1466 L954 1416 M954 1466 L904 1466"/>
  </g>
  <text x="512" y="128" text-anchor="middle" fill="#ffe9a0" stroke="#000000" stroke-width="2.5" paint-order="stroke fill" font-family="Georgia, serif" font-size="17" font-weight="700" letter-spacing="10">LUXSEETAROT</text>
  <path d="M512 146 L518 154 L512 162 L506 154 Z" fill="#f0d78a" opacity="0.9"/>
  ${textNodes}
  <g stroke="#f0d78a" stroke-width="1.25" opacity="0.85">
    <line x1="270" y1="${afterTitle}" x2="460" y2="${afterTitle}"/>
    <line x1="564" y1="${afterTitle}" x2="754" y2="${afterTitle}"/>
  </g>
  <path d="M512 ${afterTitle - 7} L519 ${afterTitle} L512 ${afterTitle + 7} L505 ${afterTitle} Z" fill="#f0d78a"/>
  <text x="512" y="${afterTitle + 60}" text-anchor="middle" fill="#f5ebc8" stroke="#000000" stroke-width="2.5" paint-order="stroke fill" font-family="Georgia, 'Times New Roman', serif" font-size="${subSize}" letter-spacing="1.1">${esc(sub)}</text>
  <path d="M512 1455 L517 1465 L512 1475 L507 1465 Z" fill="#f0d78a" opacity="0.75"/>
</svg>`;
}

async function renderPin(pin) {
  // riusa plate unica già cache-ata; cambia solo overlay testo
  const platePath = await prepareUniquePlate(pin.style, PLATES, UNIQUE_CACHE, pin.id);
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
  const byId = new Map(pins.map((p) => [p.id, p]));
  const minId = Math.min(...pins.map((p) => p.id));
  const maxId = Math.max(...pins.map((p) => p.id));
  for (const line of csv.split(/\r?\n/).slice(1)) {
    if (!buf && !line.trim()) continue;
    buf = buf ? `${buf}\n${line}` : line;
    if (((buf.match(/"/g) || []).length) % 2 === 1) continue;
    const id = parseInt((buf.match(/^(\d+),/) || [])[1], 10);
    if (id && (id < minId || id > maxId || !byId.has(id))) keep.push(buf);
    buf = '';
  }
  for (const p of pins) {
    keep.push([String(p.id), p.image, csvEsc(p.board), csvEsc(p.title), csvEsc(p.description), p.link].join(','));
  }
  keep.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  fs.writeFileSync(csvPath, header + '\n' + keep.join('\n') + '\n', 'utf8');
}

async function main() {
  const args = parseArgs();
  const plates = listArtPlates(PLATES);
  if (plates.length < 10) throw new Error(`Troppe poche plate: ${plates.length}`);
  console.log(`Plate disponibili: ${plates.length}`);

  if (args.wipeCache && fs.existsSync(UNIQUE_CACHE)) {
    for (const f of fs.readdirSync(UNIQUE_CACHE)) fs.unlinkSync(path.join(UNIQUE_CACHE, f));
  }

  const all = buildAllPins(plates);
  let pins = all;
  if (args.ids) pins = all.filter((p) => args.ids.includes(p.id));
  else pins = all.filter((p) => p.id >= args.from && p.id <= args.to);

  // sanity: stili diversi tra id consecutivi
  const sample = pins.slice(0, 8).map((p) => `${p.id}:${p.style.plate}:${p.style.accent}:${p.style.hue}`);
  console.log('Sample stili:', sample.join(' | '));

  const idSet = new Set(pins.map((p) => p.id));
  for (const f of fs.readdirSync(OUT)) {
    const m = f.match(/^pin-(\d+)-.*\.png$/);
    if (!m) continue;
    const id = +m[1];
    if (!idSet.has(id)) continue;
    if (!pins.some((p) => p.image === f)) fs.unlinkSync(path.join(OUT, f));
  }

  console.log(`Unique graphics: ${pins.length} pin`);
  const t0 = Date.now();
  for (let i = 0; i < pins.length; i++) {
    await renderPin(pins[i]);
    if ((i + 1) % 25 === 0 || i === pins.length - 1) {
      console.log(`  ${i + 1}/${pins.length} (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
    }
  }
  syncCsv(pins);
  console.log('Done. CSV aggiornato.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
