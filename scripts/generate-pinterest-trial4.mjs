/**
 * Trial pin: layout Luxseetarot + testo grande.
 *
 * trial-01…04 = SVG line-art (palette miste) — versione “vecchia” del tool.
 * trial-05…08 = arte fotorealistica stile pin pubblicati 01–40
 *               (carte, porta, scultura, lanterna) + titolo/sottotitolo più grandi.
 *               File generati in assets/ e copiati in pinterest-pins/trial/.
 *
 *   node scripts/generate-pinterest-trial4.mjs   # rigenera solo 01–04 SVG
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(path.resolve(__dirname, '..'), 'pinterest-pins', 'trial');
const W = 1024;
const H = 1536;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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

function cornerFlourishes(a) {
  return `
  <g fill="none" stroke="${a}" stroke-width="1.4" opacity="0.85">
    <path d="M70 70 L70 120 M70 70 L120 70"/>
    <path d="M954 70 L954 120 M954 70 L904 70"/>
    <path d="M70 1466 L70 1416 M70 1466 L120 1466"/>
    <path d="M954 1466 L954 1416 M954 1466 L904 1466"/>
    <path d="M70 70 Q95 95 70 120" opacity="0.5"/>
    <path d="M954 70 Q929 95 954 120" opacity="0.5"/>
    <path d="M70 1466 Q95 1441 70 1416" opacity="0.5"/>
    <path d="M954 1466 Q929 1441 954 1416" opacity="0.5"/>
  </g>`;
}

/** Arte più ricca (stile lot5 / pin pubblicati), non le icone semplificate */
function artPauseMoon(a) {
  return `
  <g transform="translate(512 1080)" fill="none" stroke="${a}">
    <circle cx="0" cy="0" r="145" stroke-width="2.8"/>
    <line x1="-42" y1="-58" x2="-42" y2="58" stroke-width="14" stroke-linecap="round"/>
    <line x1="42" y1="-58" x2="42" y2="58" stroke-width="14" stroke-linecap="round"/>
    <path d="M0 -175 L0 -195" stroke-width="1.5" opacity="0.6"/>
    <circle cx="0" cy="-205" r="3" fill="${a}" stroke="none"/>
    <path d="M55 -160 A40 40 0 0 1 95 -115" stroke-width="2" opacity="0.55"/>
  </g>`;
}
function artDoorPath(a) {
  return `
  <g transform="translate(512 1000)" fill="none" stroke="${a}" stroke-width="2.6">
    <path d="M-130 220 L-130 -20 Q-130 -160 0 -200 Q130 -160 130 -20 L130 220"/>
    <path d="M40 220 L40 20 Q40 -40 70 -20 L95 40" opacity="0.75"/>
    <path d="M-55 220 L0 -40 L55 220" fill="${a}" opacity="0.12" stroke="none"/>
    <path d="M-35 180 L0 40 L35 180" fill="none" stroke="${a}" stroke-width="1.6" opacity="0.5"/>
    <circle cx="0" cy="-55" r="8" fill="${a}" stroke="none"/>
    <path d="M0 -55 L-18 -90 M0 -55 L18 -90 M0 -55 L0 -100" stroke-width="1.4" opacity="0.7"/>
  </g>`;
}
function artQuestion(a) {
  return `
  <g transform="translate(512 1020)" fill="none" stroke="${a}">
    <path d="M-55 -90 Q-55 -180 0 -180 Q70 -180 70 -100 Q70 -40 0 20 L0 70" stroke-width="5" stroke-linecap="round"/>
    <path d="M-40 -85 Q-40 -155 0 -155 Q50 -155 50 -100 Q50 -50 0 10" stroke-width="2" opacity="0.45"/>
    <path d="M-25 -80 Q-25 -135 0 -135 Q35 -135 35 -100" stroke-width="1.4" opacity="0.3"/>
    <circle cx="0" cy="120" r="16" stroke-width="3"/>
    <circle cx="0" cy="120" r="6" fill="${a}" stroke="none"/>
    <circle cx="0" cy="160" r="2.5" fill="${a}" stroke="none" opacity="0.6"/>
    <circle cx="0" cy="180" r="2" fill="${a}" stroke="none" opacity="0.4"/>
  </g>`;
}
function artLamp(a) {
  return `
  <g transform="translate(512 980)" fill="none" stroke="${a}">
    <ellipse cx="0" cy="40" rx="90" ry="22" stroke-width="1.5" opacity="0.35"/>
    <path d="M-95 50 Q-95 -40 0 -85 Q95 -40 95 50" stroke-width="2.8"/>
    <path d="M-68 55 Q-68 -10 0 -40 Q68 -10 68 55" stroke-width="1.6" opacity="0.55"/>
    <line x1="0" y1="55" x2="0" y2="175" stroke-width="2.4"/>
    <path d="M-40 175 Q0 150 40 175" stroke-width="2.2"/>
    <line x1="-70" y1="200" x2="70" y2="200" stroke-width="1.8" opacity="0.6"/>
    <circle cx="0" cy="10" r="48" fill="${a}" opacity="0.16" stroke="none"/>
    <circle cx="0" cy="10" r="24" fill="${a}" opacity="0.22" stroke="none"/>
  </g>`;
}

/** 4 palette SVG: scuro classico + 3 chiari — testo più grande */
const TRIALS = [
  {
    file: 'trial-01-ascolta-prima.png',
    overlay: 'Ascolta prima',
    sub: 'poi scegli con calma',
    art: artPauseMoon,
    bg: '#07070a', bg2: '#14121c',
    accent: '#d4af6a', accent2: '#f0d78a', foilDeep: '#8a6a30',
    mute: '#c4a86a', light: false,
  },
  {
    file: 'trial-02-un-nodo.png',
    overlay: 'Un nodo alla volta',
    sub: 'non tutto insieme',
    art: artDoorPath,
    bg: '#f3ebe0', bg2: '#faf6f0',
    accent: '#6b2d3c', accent2: '#9a4558', foilDeep: '#3d1822',
    mute: '#7a4a52', light: true,
  },
  {
    file: 'trial-03-scrivi-la-domanda.png',
    overlay: 'Scrivi la domanda',
    sub: 'prima delle carte',
    art: artQuestion,
    bg: '#e8efe6', bg2: '#f4f8f2',
    accent: '#2f5c45', accent2: '#4a8a66', foilDeep: '#1a3326',
    mute: '#4a6b58', light: true,
  },
  {
    file: 'trial-04-respira-nel-dubbio.png',
    overlay: 'Respira nel dubbio',
    sub: 'non scappare via',
    art: artLamp,
    bg: '#f6e4e8', bg2: '#fdf2f4',
    accent: '#b86b3c', accent2: '#d4925a', foilDeep: '#6a3a1c',
    mute: '#9a6a58', light: true,
  },
];

/** Catalogo trial-05…08 (arte stil pin 01–40, non SVG) */
export const TRIAL_ARTISTIC = [
  { file: 'trial-05-il-silenzio-conta.png', overlay: 'Il silenzio conta', sub: 'più delle parole', note: '3 carte oro + navy' },
  { file: 'trial-06-una-porta-aperta.png', overlay: 'Una porta aperta', sub: 'se sai guardare', note: 'porta dorata con luce' },
  { file: 'trial-07-non-tutto-adesso.png', overlay: 'Non tutto adesso', sub: 'solo il prossimo passo', note: 'crema + scultura fili' },
  { file: 'trial-08-resta-con-te.png', overlay: 'Resta con te', sub: 'prima di chiedere', note: 'lanterna rame' },
];

function buildSvg(t) {
  const a = t.accent;
  // testo più grande: poche parole per riga + fontScale alto
  const lines = wrapLines(t.overlay, 11);
  const lineH = lines.length >= 3 ? 96 : 118;
  const titleStart = lines.length >= 3 ? 340 : 360;
  const textNodes = lines
    .map((line, i) => {
      const y = titleStart + i * lineH;
      const size = line.length > 14 ? 84 : line.length > 10 ? 102 : 118;
      return `<text x="512" y="${y}" text-anchor="middle" fill="url(#foil)" filter="url(#softGlow)" font-family="Georgia, 'Times New Roman', Times, serif" font-size="${size}" font-weight="600">${esc(line)}</text>`;
    })
    .join('\n');
  const afterTitle = titleStart + (lines.length - 1) * lineH + 56;
  const grainOpacity = t.light ? '0.35' : '0.9';
  const grainMatrix = t.light
    ? '0 0 0 0 0.35  0 0 0 0 0.28  0 0 0 0 0.22  0 0 0 0.035 0'
    : '0 0 0 0 0.6  0 0 0 0 0.5  0 0 0 0 0.3  0 0 0 0.04 0';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="75%">
      <stop offset="0%" stop-color="${t.bg2}"/>
      <stop offset="100%" stop-color="${t.bg}"/>
    </radialGradient>
    <linearGradient id="foil" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${t.accent2}"/>
      <stop offset="40%" stop-color="${t.accent}"/>
      <stop offset="100%" stop-color="${t.foilDeep}"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="${grainMatrix}"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="${grainOpacity}"/>

  <rect x="48" y="48" width="928" height="1440" fill="none" stroke="${a}" stroke-width="1.6" opacity="0.75"/>
  <rect x="58" y="58" width="908" height="1420" fill="none" stroke="${a}" stroke-width="0.8" opacity="0.4"/>
  ${cornerFlourishes(a)}

  <text x="512" y="130" text-anchor="middle" fill="url(#foil)" font-family="Georgia, serif" font-size="18" letter-spacing="10">LUXSEETAROT</text>
  <path d="M512 148 L518 156 L512 164 L506 156 Z" fill="${a}" opacity="0.85"/>

  ${textNodes}

  <g stroke="${a}" stroke-width="1.2" opacity="0.75">
    <line x1="280" y1="${afterTitle}" x2="460" y2="${afterTitle}"/>
    <line x1="564" y1="${afterTitle}" x2="744" y2="${afterTitle}"/>
  </g>
  <path d="M512 ${afterTitle - 7} L519 ${afterTitle} L512 ${afterTitle + 7} L505 ${afterTitle} Z" fill="${a}"/>
  <text x="512" y="${afterTitle + 58}" text-anchor="middle" fill="${t.mute}" font-family="Georgia, 'Times New Roman', serif" font-size="38" letter-spacing="1.2">${esc(t.sub)}</text>

  ${t.art(a)}

  <path d="M512 1455 L517 1465 L512 1475 L507 1465 Z" fill="${a}" opacity="0.7"/>
</svg>`;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const t of TRIALS) {
    const svg = buildSvg(t);
    const dest = path.join(OUT, t.file);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 8 }).toFile(dest);
    console.log('OK', t.file, '—', t.overlay, '/', t.sub);
  }
  console.log('\nArtistic (già in cartella, non SVG):');
  for (const t of TRIAL_ARTISTIC) {
    const exists = fs.existsSync(path.join(OUT, t.file));
    console.log(exists ? '  ✓' : '  ✗', t.file, '—', t.overlay, '/', t.sub, `(${t.note})`);
  }
  console.log('\nCartella:', OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
