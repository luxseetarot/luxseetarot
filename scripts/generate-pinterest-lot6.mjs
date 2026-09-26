/**
 * Lot 6: pin 141–440 (300 pezzi).
 * Ogni 30 pin = stile sostanzialmente diverso (layout, colori, font, grafiche).
 * Usage: node scripts/generate-pinterest-lot6.mjs [--png-only]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { ADVICE } from './lot6-advice-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'pinterest-pins');
const CSV = path.join(OUT, 'pins-guida.csv');
const FIRST_ID = 141;
const COUNT = 300;

const ADVICE_BY_THEME = { gratis: [], amore: [], lavoro: [], futuro: [], domanda: [] };
for (const row of ADVICE) ADVICE_BY_THEME[row[0]].push(row);
for (const t of Object.keys(ADVICE_BY_THEME)) {
  if (ADVICE_BY_THEME[t].length !== 60) {
    throw new Error(`${t}: ${ADVICE_BY_THEME[t].length} consigli, attesi 60`);
  }
}

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
const THEMES_CYCLE = ['gratis', 'amore', 'lavoro', 'futuro', 'domanda'];

/** 10 stili × 30 pin — fontScale alto: titolo leggibile su mobile */
const STYLE_PACKS = [
  {
    name: 'noir-gold-top',
    bg: '#07070a', bg2: '#141218', accent: '#d4af6a', accent2: '#f0d78a', mute: '#c4a86a',
    titlePos: 'top', fontScale: 1.22, artPos: 'bottom', brand: true, border: 'double',
  },
  {
    name: 'navy-champagne-center',
    bg: '#0a1220', bg2: '#152238', accent: '#e2c896', accent2: '#f5e4b8', mute: '#b8a078',
    titlePos: 'center', fontScale: 1.18, artPos: 'bottom', brand: true, border: 'single',
  },
  {
    name: 'wine-rose-bottom',
    bg: '#12080c', bg2: '#241018', accent: '#e8b4a0', accent2: '#f6d2c4', mute: '#c89888',
    titlePos: 'bottom', fontScale: 1.2, artPos: 'top', brand: false, border: 'ornate',
  },
  {
    name: 'ink-pearl-soft',
    bg: '#0c0e12', bg2: '#1a1e28', accent: '#d8d0c0', accent2: '#f2ebe0', mute: '#a8a090',
    titlePos: 'top', fontScale: 1.16, artPos: 'bottom', brand: true, border: 'none',
  },
  {
    name: 'ember-copper',
    bg: '#0e0906', bg2: '#22140e', accent: '#c87941', accent2: '#e8a060', mute: '#a87850',
    titlePos: 'center', fontScale: 1.28, artPos: 'bottom', brand: true, border: 'double',
  },
  {
    name: 'midnight-ice',
    bg: '#060a14', bg2: '#0e1830', accent: '#9eb6d4', accent2: '#c8daf0', mute: '#7a90a8',
    titlePos: 'top', fontScale: 1.2, artPos: 'center', brand: false, border: 'single',
  },
  {
    name: 'forest-gilt',
    bg: '#060e0a', bg2: '#122018', accent: '#c6b070', accent2: '#e4d090', mute: '#8a9870',
    titlePos: 'bottom', fontScale: 1.18, artPos: 'top', brand: true, border: 'ornate',
  },
  {
    name: 'violet-dusk',
    bg: '#0c0814', bg2: '#1c1430', accent: '#c9a8e0', accent2: '#e4d0f4', mute: '#9880b0',
    titlePos: 'center', fontScale: 1.16, artPos: 'bottom', brand: true, border: 'double',
  },
  {
    name: 'pure-black-bright',
    bg: '#000000', bg2: '#0a0a0a', accent: '#f0c75e', accent2: '#ffe9a0', mute: '#d0b060',
    titlePos: 'top', fontScale: 1.32, artPos: 'bottom', brand: true, border: 'thin',
  },
  {
    name: 'slate-sand',
    bg: '#12151a', bg2: '#222830', accent: '#d2c2a0', accent2: '#ebe0c8', mute: '#9a9078',
    titlePos: 'center', fontScale: 1.18, artPos: 'bottom', brand: false, border: 'single',
  },
];

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
  return lines.slice(0, 4);
}

/* ——— art ——— */
function artPause(a) {
  return `<g transform="translate(512 0)" fill="none" stroke="${a}"><circle cx="0" cy="0" r="130" stroke-width="2.6"/><line x1="-38" y1="-52" x2="-38" y2="52" stroke-width="12" stroke-linecap="round"/><line x1="38" y1="-52" x2="38" y2="52" stroke-width="12" stroke-linecap="round"/></g>`;
}
function artDoor(a) {
  return `<g transform="translate(512 0)" fill="none" stroke="${a}" stroke-width="2.5"><path d="M-120 180 L-120 -30 Q-120 -150 0 -185 Q120 -150 120 -30 L120 180"/><path d="M-40 180 L0 -50 L40 180" fill="${a}" opacity="0.12" stroke="none"/><circle cx="0" cy="-70" r="7" fill="${a}" stroke="none"/></g>`;
}
function artLamp(a) {
  return `<g transform="translate(512 0)" fill="none" stroke="${a}"><path d="M-85 30 Q-85 -50 0 -90 Q85 -50 85 30" stroke-width="2.6"/><line x1="0" y1="30" x2="0" y2="150" stroke-width="2.2"/><path d="M-35 150 Q0 128 35 150" stroke-width="2"/><circle cx="0" cy="-10" r="40" fill="${a}" opacity="0.18" stroke="none"/></g>`;
}
function artStairs(a) {
  return `<g transform="translate(512 20)" fill="none" stroke="${a}" stroke-width="2.6" stroke-linecap="round"><path d="M-180 50 H-100 V10 H-20 V-30 H60 V-70 H140 V-110 H200"/><circle cx="220" cy="-130" r="8" fill="${a}" opacity="0.4" stroke="none"/></g>`;
}
function artArrows(a) {
  return `<g transform="translate(512 0)" fill="none" stroke="${a}" stroke-width="2.8" stroke-linecap="round"><path d="M-170 -15 H90"/><path d="M50 -40 L115 -15 L50 10"/><path d="M170 35 H-90"/><path d="M-50 10 L-115 35 L-50 60"/></g>`;
}
function artQuestion(a) {
  return `<g transform="translate(512 0)" fill="none" stroke="${a}"><path d="M-48 -80 Q-48 -160 0 -160 Q60 -160 60 -85 Q60 -30 0 20 L0 60" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="105" r="14" stroke-width="3"/><circle cx="0" cy="105" r="5" fill="${a}" stroke="none"/></g>`;
}
function artHeart(a) {
  return `<g transform="translate(512 0)" fill="none" stroke="${a}" stroke-width="2.6"><path d="M0 -15 C-50 -70 -140 -25 -140 40 C-140 105 -50 160 0 210 C50 160 140 105 140 40 C140 -25 50 -70 0 -15 Z"/></g>`;
}
function artMoon(a) {
  return `<g transform="translate(512 0)" fill="none" stroke="${a}" stroke-width="2.4"><circle cx="0" cy="0" r="110"/><path d="M30 -100 A110 110 0 1 0 30 100 A75 110 0 1 1 30 -100" fill="${a}" opacity="0.18" stroke="none"/></g>`;
}
function artKey(a) {
  return `<g transform="translate(512 0)" fill="none" stroke="${a}" stroke-width="2.6" stroke-linecap="round"><circle cx="-90" cy="0" r="48"/><circle cx="-90" cy="0" r="18" opacity="0.5"/><line x1="-42" y1="0" x2="150" y2="0"/><path d="M110 0 V40 M140 0 V30"/></g>`;
}
function artRing(a) {
  return `<g transform="translate(512 0)" fill="none" stroke="${a}"><circle cx="0" cy="0" r="120" stroke-width="2.6" stroke-dasharray="16 14"/><circle cx="0" cy="0" r="8" fill="${a}" stroke="none"/></g>`;
}
function artCompass(a) {
  return `<g transform="translate(512 0)" fill="none" stroke="${a}"><circle cx="0" cy="0" r="115" stroke-width="2.4"/><path d="M0 -95 L18 8 L0 95 L-18 8 Z" fill="${a}" opacity="0.85" stroke="none"/><circle cx="0" cy="0" r="9" fill="${a}" stroke="none"/></g>`;
}
function artThread(a) {
  return `<g transform="translate(512 0)" fill="none" stroke="${a}" stroke-width="2.3" stroke-linecap="round"><path d="M-150 30 C-60 -90 50 110 150 -20"/><circle cx="-150" cy="30" r="6" fill="${a}" stroke="none"/><circle cx="150" cy="-20" r="6" fill="${a}" stroke="none"/></g>`;
}

const ARTS = [artPause, artDoor, artLamp, artStairs, artArrows, artQuestion, artHeart, artMoon, artKey, artRing, artCompass, artThread];

function borderSvg(style, a) {
  if (style.border === 'none') return '';
  if (style.border === 'thin') {
    return `<rect x="40" y="40" width="944" height="1456" fill="none" stroke="${a}" stroke-width="1.2" opacity="0.7"/>`;
  }
  if (style.border === 'single') {
    return `<rect x="48" y="48" width="928" height="1440" fill="none" stroke="${a}" stroke-width="1.8" opacity="0.8"/>`;
  }
  if (style.border === 'ornate') {
    return `
      <rect x="48" y="48" width="928" height="1440" fill="none" stroke="${a}" stroke-width="1.5" opacity="0.75"/>
      <g fill="none" stroke="${a}" stroke-width="1.3" opacity="0.8">
        <path d="M70 70 H130 M70 70 V130"/><path d="M954 70 H894 M954 70 V130"/>
        <path d="M70 1466 H130 M70 1466 V1406"/><path d="M954 1466 H894 M954 1466 V1406"/>
      </g>`;
  }
  // double
  return `
    <rect x="44" y="44" width="936" height="1448" fill="none" stroke="${a}" stroke-width="1.5" opacity="0.75"/>
    <rect x="56" y="56" width="912" height="1424" fill="none" stroke="${a}" stroke-width="0.8" opacity="0.4"/>`;
}

function buildSvg(pin, style) {
  const a = style.accent;
  const a2 = style.accent2;
  // poche parole per riga → font più grande e leggibile
  const maxChars = style.fontScale >= 1.25 ? 11 : 13;
  const lines = wrapLines(pin.overlay, maxChars);
  const sub = String(pin.sub || '');
  const baseSize = Math.round(96 * style.fontScale);
  const lineH = Math.round((lines.length >= 3 ? 86 : 102) * style.fontScale);
  const subSize = Math.round(36 * Math.min(style.fontScale, 1.2));

  let titleStart;
  if (style.titlePos === 'top') titleStart = 320;
  else if (style.titlePos === 'bottom') titleStart = 980;
  else titleStart = 560; // center

  // avoid collision with art
  let artY;
  if (style.artPos === 'top') artY = 280;
  else if (style.artPos === 'center') artY = 720;
  else artY = style.titlePos === 'bottom' ? 520 : 1100;

  if (style.titlePos === 'top' && style.artPos === 'bottom') {
    titleStart = 340;
    artY = 1120;
  }
  if (style.titlePos === 'bottom' && style.artPos === 'top') {
    artY = 320;
    titleStart = 1050;
  }
  if (style.titlePos === 'center' && style.artPos === 'bottom') {
    titleStart = 520;
    artY = 1180;
  }
  if (style.titlePos === 'center' && style.artPos === 'center') {
    titleStart = 420;
    artY = 1050;
  }

  const textNodes = lines
    .map((line, i) => {
      const y = titleStart + i * lineH;
      const size = line.length > 14 ? Math.round(baseSize * 0.86) : line.length > 10 ? Math.round(baseSize * 0.94) : baseSize;
      return `<text x="512" y="${y}" text-anchor="middle" fill="url(#foil)" font-family="Georgia, 'Times New Roman', Times, serif" font-size="${size}" font-weight="600">${esc(line)}</text>`;
    })
    .join('\n');

  const afterTitle = titleStart + (lines.length - 1) * lineH + 48;
  const brandBlock = style.brand
    ? `<text x="512" y="120" text-anchor="middle" fill="url(#foil)" font-family="Georgia, serif" font-size="17" letter-spacing="9">LUXSEETAROT</text>
       <path d="M512 138 L517 145 L512 152 L507 145 Z" fill="${a}" opacity="0.85"/>`
    : `<path d="M512 110 L518 120 L512 130 L506 120 Z" fill="${a}" opacity="0.7"/>`;

  const artFn = ARTS[pin.id % ARTS.length];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="38%" r="78%">
      <stop offset="0%" stop-color="${style.bg2}"/>
      <stop offset="100%" stop-color="${style.bg}"/>
    </radialGradient>
    <linearGradient id="foil" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${a2}"/>
      <stop offset="45%" stop-color="${a}"/>
      <stop offset="100%" stop-color="#6a5028"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${borderSvg(style, a)}
  ${brandBlock}
  <g transform="translate(0 ${artY})">${artFn(a)}</g>
  ${textNodes}
  <g stroke="${a}" stroke-width="1.1" opacity="0.7">
    <line x1="300" y1="${afterTitle}" x2="470" y2="${afterTitle}"/>
    <line x1="554" y1="${afterTitle}" x2="724" y2="${afterTitle}"/>
  </g>
  <path d="M512 ${afterTitle - 5} L517 ${afterTitle} L512 ${afterTitle + 5} L507 ${afterTitle} Z" fill="${a}"/>
  <text x="512" y="${afterTitle + 52}" text-anchor="middle" fill="${style.mute}" font-family="Georgia, serif" font-size="${subSize}">${esc(sub)}</text>
</svg>`;
}

const DESCS = {
  gratis: [
    'Un consiglio semplice: fermati, nomina ciò che pesa, poi ascolta. Le carte aiutano a mettere ordine — non a forzare una risposta.',
    'Quando i pensieri girano a vuoto, scegli un solo nodo. Chiarezza nasce dal focus, non dalla fretta.',
    'Non serve certezza assoluta. Serve un filo onesto da seguire quando tutto sembra confuso.',
    'Spegni il rumore. Resta con la domanda vera — quella che non posti da nessuna parte.',
    'Dubitare non è fallire. È il primo gesto di rispetto verso te stesso.',
  ],
  amore: [
    'In amore il consiglio utile è spesso su di te: cosa porti, cosa temi, dove dici sì troppo.',
    'Tra sentimento e aspettativa c’è una nebbia. Nominala prima di chiedere un verdetto sull’altro.',
    'Dubitare non significa non amare. Significa che qualcosa chiede attenzione — e ascolto.',
    'Non per controllare l’altro. Per capire la dinamica e il tuo ruolo nella danza.',
    'Le risposte sì/no chiudono troppo presto. Il cuore ha bisogno di spazio e di verità.',
  ],
  lavoro: [
    'Al lavoro il consiglio più utile: distingue stanchezza, paura e desiderio. Poi fai un passo concreto.',
    'A volte lo stallo non è pigrizia. È un messaggio. Ascoltalo prima di scappare o restare per abitudine.',
    'Dare il nome giusto (burnout, noia, confini) cambia il prossimo passo più di dieci piani.',
    'La fuga e la scelta non si somigliano. Distinguerle ti salva mesi.',
    'Stanchezza, rabbia, vuoto: sono già risposte. Serve solo ascoltarle senza performance.',
  ],
  futuro: [
    'Sul futuro: illumina la direzione, non il destino fisso. Basta un passo onesto.',
    'Finché la paura resta vaga, comanda. Quando ha un nome, puoi respirare accanto e agire.',
    'Non serve la mappa intera. Serve un punto di appoggio e un gesto concreto.',
    'Sognare nutre. Agire orienta. Sapere quale stai facendo ti rende più libero.',
    'Il futuro non è un film. È la somma di come ti tratti oggi — con cura, non con panico.',
  ],
  domanda: [
    'Consiglio sulle domande: una sola, aperta, onesta. Le carte rispondono al focus che dai.',
    'Apri: dinamica, atteggiamento, prossimo passo. Evita sì/no e date assolute.',
    'Troppi temi = lettura confusa. Scegli il nodo. Il resto aspetta.',
    'Chiarezza — o solo rassicurazione? L’onestà viene prima delle carte.',
    'Il ritmo conta quanto le parole. Respira, scrivi, poi pesca.',
  ],
};

const TAGS = {
  gratis: '#tarocchi #consiglio #chiarezza #introspezione #sé',
  amore: '#amore #tarocchi #consiglio #cuore #relazioni',
  lavoro: '#lavoro #tarocchi #consiglio #scelta #carriera',
  futuro: '#futuro #tarocchi #consiglio #direzione #passo',
  domanda: '#domanda #tarocchi #consiglio #focus #onestà',
};

function buildContent(i) {
  const id = FIRST_ID + i;
  const theme = THEMES_CYCLE[i % THEMES_CYCLE.length];
  const themeIdx = Math.floor(i / THEMES_CYCLE.length);
  const [, overlay, sub] = ADVICE_BY_THEME[theme][themeIdx];
  const desc = DESCS[theme][themeIdx % DESCS[theme].length];
  const style = STYLE_PACKS[Math.floor(i / 30) % STYLE_PACKS.length];
  const title = overlay.length > 60 ? overlay.slice(0, 57) + '…' : overlay;
  const image = `pin-${id}-${slugify(overlay) || 'pin'}.png`;
  return {
    id,
    theme,
    style,
    overlay,
    sub,
    board: BOARDS[theme],
    title,
    description: `${desc}\n\n${TAGS[theme]}`,
    link: LINKS[theme],
    image,
  };
}

function syncCsv(pins) {
  let csv = fs.existsSync(CSV) ? fs.readFileSync(CSV, 'utf8') : 'id,immagine,bacheca,titolo,descrizione,link\n';
  if (!csv.endsWith('\n')) csv += '\n';
  const header = csv.split(/\r?\n/)[0] || 'id,immagine,bacheca,titolo,descrizione,link';
  const keep = [];
  let buf = '';
  const endId = FIRST_ID + COUNT - 1;
  for (const line of csv.split(/\r?\n/).slice(1)) {
    if (!buf && !line.trim()) continue;
    buf = buf ? `${buf}\n${line}` : line;
    if (((buf.match(/"/g) || []).length) % 2 === 1) continue;
    const id = parseInt((buf.match(/^(\d+),/) || [])[1], 10);
    if (id && (id < FIRST_ID || id > endId)) keep.push(buf);
    buf = '';
  }
  for (const p of pins) {
    keep.push([String(p.id), p.image, csvEsc(p.board), csvEsc(p.title), csvEsc(p.description), p.link].join(','));
  }
  keep.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  fs.writeFileSync(CSV, header + '\n' + keep.join('\n') + '\n', 'utf8');
}

async function main() {
  const pngOnly = process.argv.includes('--png-only');
  fs.mkdirSync(OUT, { recursive: true });
  const pins = Array.from({ length: COUNT }, (_, i) => buildContent(i));

  // remove old lot6 pngs with different slugs
  for (const f of fs.readdirSync(OUT)) {
    const m = f.match(/^pin-(\d+)-.*\.png$/);
    if (!m) continue;
    const id = +m[1];
    if (id >= FIRST_ID && id < FIRST_ID + COUNT) {
      if (!pins.some((p) => p.image === f)) fs.unlinkSync(path.join(OUT, f));
    }
  }

  console.log(`Generazione ${COUNT} PNG (10 stili × 30)…`);
  for (let i = 0; i < pins.length; i++) {
    const pin = pins[i];
    if (i % 30 === 0) console.log(`\n[stile ${Math.floor(i / 30) + 1}/10: ${pin.style.name}]`);
    const svg = buildSvg(pin, pin.style);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 8 }).toFile(path.join(OUT, pin.image));
    process.stdout.write('.');
  }
  console.log(`\nPNG ok: ${pins.length}`);
  syncCsv(pins);
  console.log(`CSV sync ${FIRST_ID}–${FIRST_ID + COUNT - 1}`);

  // style map for the queue tool
  const map = STYLE_PACKS.map((s, idx) => ({
    pack: idx + 1,
    name: s.name,
    ids: `${FIRST_ID + idx * 30}–${FIRST_ID + idx * 30 + 29}`,
    titlePos: s.titlePos,
    colors: { bg: s.bg, accent: s.accent },
  }));
  fs.writeFileSync(path.join(OUT, 'LOT6-STILI.txt'), map.map((m) => `${m.pack}. ${m.ids} — ${m.name} (titolo ${m.titlePos}, ${m.colors.bg}/${m.colors.accent})`).join('\n') + '\n', 'utf8');

  if (pngOnly) return;
  console.log('Done. Next: node scripts/upload-lot6-catbox.mjs');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
