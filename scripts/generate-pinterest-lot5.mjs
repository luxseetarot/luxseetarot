/**
 * Genera lotto pin 41–140: PNG evocative + sync CSV + BUFFER-LOT5.txt
 * Usage:
 *   node scripts/generate-pinterest-lot5.mjs
 *   node scripts/generate-pinterest-lot5.mjs --png-only
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'pinterest-pins');
const CSV = path.join(OUT, 'pins-guida.csv');

/** Stesso formato dei pin già pubblicati (lot 3–4). */
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
  home: 'https://www.luxseetarot.com/',
};

/** Fondi scuri + oro (varianti leggere per tema), come i pin in foto. */
const THEMES = {
  gratis: { bg: '#07070a', bg2: '#121018', accent: '#d4af6a', accent2: '#f0d78a', mute: '#c4a86a' },
  amore: { bg: '#0a0608', bg2: '#1a0e14', accent: '#e0b07a', accent2: '#f3d4a0', mute: '#d0a878' },
  lavoro: { bg: '#060a12', bg2: '#0e1520', accent: '#c9a45c', accent2: '#e6c878', mute: '#b89858' },
  futuro: { bg: '#050508', bg2: '#101018', accent: '#e6c587', accent2: '#f5dfb0', mute: '#d4b878' },
  domanda: { bg: '#08080c', bg2: '#14141c', accent: '#d8c08a', accent2: '#efe0b0', mute: '#c8b078' },
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function csvEsc(s) {
  const t = String(s);
  if (/[",\n\r]/.test(t)) return `"${t.replace(/"/g, '""')}"`;
  return t;
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

function slugify(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

/* ——— Grafiche stile pin pubblicati (line-art oro, grandi) ——— */

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
  </g>
  <g fill="${a}">
    <path d="M88 88 l6 14 14-6 -14-6 -6 14z" opacity="0.7" transform="translate(0 0) scale(0.55)"/>
    <path d="M936 88 l6 14 14-6 -14-6 -6 14z" opacity="0.7" transform="translate(0 0)"/>
  </g>`;
}

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

function artStairs(a) {
  return `
  <g transform="translate(512 1120)" fill="none" stroke="${a}" stroke-width="2.8" stroke-linecap="round">
    <path d="M-200 60 H-110 V20 H-30 V-20 H50 V-60 H130 V-100 H200"/>
    <path d="M-200 60 L-150 -90" stroke-width="1.4" opacity="0.3"/>
    <circle cx="220" cy="-125" r="10" fill="${a}" opacity="0.35" stroke="${a}" stroke-width="1.5"/>
  </g>`;
}

function artArrows(a) {
  return `
  <g transform="translate(512 1080)" fill="none" stroke="${a}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-190 -20 H95"/>
    <path d="M55 -48 L120 -20 L55 8"/>
    <path d="M190 40 H-95"/>
    <path d="M-55 12 L-120 40 L-55 68"/>
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

function artRing(a) {
  return `
  <g transform="translate(512 1080)" fill="none" stroke="${a}">
    <circle cx="0" cy="0" r="130" stroke-width="2.8" stroke-dasharray="18 16"/>
    <circle cx="0" cy="0" r="95" stroke-width="1.5" opacity="0.4"/>
    <circle cx="0" cy="0" r="8" fill="${a}" stroke="none"/>
  </g>`;
}

function artHeart(a) {
  return `
  <g transform="translate(512 1000)">
    <path d="M0 -10 C-55 -75 -150 -20 -150 45 C-150 115 -55 175 0 230 C55 175 150 115 150 45 C150 -20 55 -75 0 -10 Z"
      fill="none" stroke="${a}" stroke-width="2.8"/>
    <path d="M0 40 C-30 -5 -85 20 -85 60 C-85 100 -30 140 0 170 C30 140 85 100 85 60 C85 20 30 -5 0 40 Z"
      fill="${a}" opacity="0.12" stroke="none"/>
  </g>`;
}

function artMoonBurst(a) {
  return `
  <g transform="translate(512 1050)" fill="none" stroke="${a}">
    <circle cx="0" cy="0" r="100" stroke-width="2.5"/>
    <path d="M25 -95 A100 100 0 1 0 25 95 A70 100 0 1 1 25 -95" fill="${a}" opacity="0.2" stroke="none"/>
    <g stroke-width="1.5" opacity="0.65">
      <line x1="0" y1="-130" x2="0" y2="-155"/>
      <line x1="92" y1="-92" x2="110" y2="-110"/>
      <line x1="130" y1="0" x2="155" y2="0"/>
      <line x1="92" y1="92" x2="110" y2="110"/>
      <line x1="0" y1="130" x2="0" y2="155"/>
      <line x1="-92" y1="92" x2="-110" y2="110"/>
      <line x1="-130" y1="0" x2="-155" y2="0"/>
      <line x1="-92" y1="-92" x2="-110" y2="-110"/>
    </g>
  </g>`;
}

function artKey(a) {
  return `
  <g transform="translate(512 1060)" fill="none" stroke="${a}" stroke-width="2.8" stroke-linecap="round">
    <circle cx="-95" cy="0" r="55"/>
    <circle cx="-95" cy="0" r="22" opacity="0.5"/>
    <line x1="-40" y1="0" x2="160" y2="0"/>
    <path d="M115 0 V48 M145 0 V38"/>
  </g>`;
}

function pickArt(pin, a) {
  const pool = {
    gratis: [artLamp, artMirrorish, artDoorPath, artMoonBurst, artKey],
    amore: [artHeart, artArrows, artPauseMoon, artMoonBurst, artRing],
    lavoro: [artStairs, artDoorPath, artKey, artRing, artCompassish],
    futuro: [artDoorPath, artStairs, artMoonBurst, artLamp, artRing],
    domanda: [artQuestion, artPauseMoon, artKey, artMoonBurst, artLamp],
  };
  // fallbacks defined below
  const list = pool[pin.theme] || pool.gratis;
  const fn = list[pin.id % list.length];
  return fn(a);
}

function artMirrorish(a) {
  return `
  <g transform="translate(512 1000)" fill="none" stroke="${a}">
    <ellipse cx="0" cy="20" rx="125" ry="165" stroke-width="2.8"/>
    <ellipse cx="0" cy="20" rx="100" ry="138" stroke-width="1.4" opacity="0.45"/>
    <line x1="0" y1="185" x2="0" y2="235" stroke-width="2.4"/>
    <path d="M-45 235 H45" stroke-width="2.4"/>
  </g>`;
}

function artCompassish(a) {
  return `
  <g transform="translate(512 1060)" fill="none" stroke="${a}">
    <circle cx="0" cy="0" r="125" stroke-width="2.6"/>
    <circle cx="0" cy="0" r="85" stroke-width="1.3" opacity="0.4"/>
    <path d="M0 -105 L22 10 L0 105 L-22 10 Z" fill="${a}" opacity="0.85" stroke="none"/>
    <path d="M-105 0 L10 16 L105 0 L10 -16 Z" fill="${a}" opacity="0.3" stroke="none"/>
    <circle cx="0" cy="0" r="10" fill="${a}" stroke="none"/>
  </g>`;
}

function buildSvg(pin) {
  const theme = THEMES[pin.theme] || THEMES.gratis;
  const a = theme.accent;
  const a2 = theme.accent2;
  const lines = wrapLines(pin.overlay, 14);
  const sub = String(pin.sub || '').toLowerCase();
  // titolo alto, come i pin in foto (terzo superiore)
  const lineH = lines.length >= 3 ? 78 : 92;
  const titleStart = lines.length >= 3 ? 360 : 390;
  const textNodes = lines
    .map((line, i) => {
      const y = titleStart + i * lineH;
      const size = line.length > 16 ? 64 : line.length > 11 ? 76 : 88;
      return `<text x="512" y="${y}" text-anchor="middle" fill="url(#foil)" filter="url(#softGlow)" font-family="Georgia, 'Times New Roman', Times, serif" font-size="${size}" font-weight="600">${esc(line)}</text>`;
    })
    .join('\n');
  const afterTitle = titleStart + (lines.length - 1) * lineH + 48;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="75%">
      <stop offset="0%" stop-color="${theme.bg2}"/>
      <stop offset="100%" stop-color="${theme.bg}"/>
    </radialGradient>
    <linearGradient id="foil" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${a2}"/>
      <stop offset="40%" stop-color="${a}"/>
      <stop offset="100%" stop-color="#8a6a30"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.6  0 0 0 0 0.5  0 0 0 0 0.3  0 0 0 0.04 0"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.9"/>

  <!-- bordo sottile + angoli, come i pin pubblicati -->
  <rect x="48" y="48" width="928" height="1440" fill="none" stroke="${a}" stroke-width="1.6" opacity="0.75"/>
  <rect x="58" y="58" width="908" height="1420" fill="none" stroke="${a}" stroke-width="0.8" opacity="0.4"/>
  ${cornerFlourishes(a)}

  <!-- brand piccolo in alto -->
  <text x="512" y="130" text-anchor="middle" fill="url(#foil)" font-family="Georgia, serif" font-size="18" letter-spacing="10">LUXSEETAROT</text>
  <path d="M512 148 L518 156 L512 164 L506 156 Z" fill="${a}" opacity="0.85"/>

  ${textNodes}

  <!-- divider + sottotitolo -->
  <g stroke="${a}" stroke-width="1.2" opacity="0.75">
    <line x1="300" y1="${afterTitle}" x2="470" y2="${afterTitle}"/>
    <line x1="554" y1="${afterTitle}" x2="724" y2="${afterTitle}"/>
  </g>
  <path d="M512 ${afterTitle - 6} L518 ${afterTitle} L512 ${afterTitle + 6} L506 ${afterTitle} Z" fill="${a}"/>
  <text x="512" y="${afterTitle + 48}" text-anchor="middle" fill="${theme.mute}" font-family="Georgia, 'Times New Roman', serif" font-size="28" letter-spacing="1">${esc(sub)}</text>

  ${pickArt(pin, a)}

  <!-- piccolo segno in basso -->
  <path d="M512 1455 L517 1465 L512 1475 L507 1465 Z" fill="${a}" opacity="0.7"/>
</svg>`;
}

/**
 * [theme, overlay, sub, descBody, tags]
 * Copy: gancio emotivo, niente CTA / prova / compra / apri il sito.
 */
const RAW = [
  // gratis 41-65
  ['gratis', 'Quello che non dici a voce', 'Resta tra te e le carte', 'C’è una domanda che ripeti in silenzio da giorni. Non serve spiegarla a nessuno: basta farla stare ferma un attimo.', '#tarocchi #chiarezza #introspezione #silenzio #lettura'],
  ['gratis', 'Quando la testa non tace', 'Un momento per ascoltare', 'Se i pensieri girano a vuoto, tre simboli possono dare una forma a ciò che senti — senza giudicarti.', '#tarocchi #pensieri #calma #emozioni #riflessione'],
  ['gratis', 'Hai bisogno di un filo', 'Non di una risposta facile', 'Non è certezza quella che cerchi. È un filo da seguire quando tutto sembra confuso.', '#tarocchi #confusione #direzione #chiarezza #online'],
  ['gratis', 'Stasera, solo tu', 'E quello che pesa', 'Spegni il rumore. Resta con la domanda vera — quella che non posti da nessuna parte.', '#tarocchi #sera #intimità #ascolto #sé'],
  ['gratis', 'Il dubbio ha una forma', 'Anche se non la vedi ancora', 'Prima di scegliere, a volte serve solo riconoscere cosa ti sta stringendo il petto.', '#dubbio #tarocchi #emozioni #chiarezza #introspezione'],
  ['gratis', 'Non sei confuso. Sei pieno.', 'Di cose non dette', 'Troppe voci dentro. Tre carte non le spengono: le mettono in ordine, una per una.', '#tarocchi #pieno #emozioni #ordine #calma'],
  ['gratis', 'Quello che giri da giorni', 'Merita uno sguardo', 'Non è debolezza fermarsi. È il primo gesto di rispetto verso te stesso.', '#tarocchi #rispetto #sé #pausa #chiarezza'],
  ['gratis', 'C’è un nodo', 'E lo senti', 'Non serve un oracolo magico. Serve uno spazio onesto, dove il nodo può mostrarsi.', '#nodo #tarocchi #onestà #emozioni #lettura'],
  ['gratis', 'Chiarezza, non controllo', 'Sul tuo momento', 'Le carte non ti dicono cosa fare. Ti aiutano a vedere cosa stai già sapendo.', '#chiarezza #tarocchi #intuito #consapevolezza #sé'],
  ['gratis', 'Prima della decisione', 'C’è il respiro', 'Tra il panico e la scelta c’è uno spazio. Lì le carte parlano meglio.', '#decisione #tarocchi #respiro #calma #scelta'],
  ['gratis', 'Il primo sguardo', 'A ciò che taci', 'Non serve sapere tutto. Serve guardare quello che hai evitato.', '#tarocchi #sguardo #verità #introspezione #emozioni'],
  ['gratis', 'Quando non sai da dove', 'Inizia da te', 'La domanda più utile non è sull’altro. È su cosa stai portando tu, adesso.', '#tarocchi #sé #domanda #focus #chiarezza'],
  ['gratis', 'Un pezzo di quiete', 'Dentro il rumore', 'Anche pochi minuti bastano, se sono davvero tuoi.', '#quiete #tarocchi #benessere #presenza #calma'],
  ['gratis', 'Non forzare il senso', 'Lascia che emerga', 'A volte la fretta di capire nasconde la paura di sentire.', '#tarocchi #paura #ascolto #emozioni #pazienza'],
  ['gratis', 'Le parole che mancano', 'Hanno peso lo stesso', 'Ciò che non riesci a dire è già una storia. Merita di essere ascoltata.', '#parole #tarocchi #silenzio #emozioni #cuore'],
  ['gratis', 'Una serata diversa', 'Senza scrollare via', 'Restare con una domanda è più coraggioso di scappare in un’altra notifica.', '#sera #tarocchi #presenza #coraggio #focus'],
  ['gratis', 'Simboli, non promesse', 'Uno specchio quieto', 'Niente destinazioni fissate. Solo immagini che ti riportano a te.', '#simboli #tarocchi #specchio #consapevolezza #lettura'],
  ['gratis', 'Se sei curioso di te', 'Non dell’oracolo', 'La curiosità più onesta è quella che guarda dentro, non quella che chiede garanzie.', '#curiosità #tarocchi #sé #onestà #introspezione'],
  ['gratis', 'Una lettura che respira', 'Senza urgenza', 'Testo calmo, spazio per sentire. Niente pressione, niente spettacolo.', '#lettura #tarocchi #calma #chiarezza #italiano'],
  ['gratis', 'Dove sei, adesso', 'Conta più del “dopo”', 'Il presente ha già abbastanza verità. A volte basta guardarlo.', '#presente #tarocchi #verità #presenza #sé'],
  ['gratis', 'Passato, presente, filo', 'Tre posizioni, una storia', 'Non per chiudere il destino. Per vedere il movimento che stai vivendo.', '#spread #tarocchi #storia #movimento #chiarezza'],
  ['gratis', 'Meno ansia, più focus', 'Su una sola cosa', 'Scegli un nodo. Lascia il resto fuori dalla stanza, anche solo per un attimo.', '#ansia #focus #tarocchi #calma #mente'],
  ['gratis', 'Il tuo momento', 'Di verità quieta', 'Non tutti i giorni. Solo quando qualcosa dentro chiede di essere visto.', '#momento #tarocchi #verità #ascolto #sé'],
  ['gratis', 'Apri quello che chiudi', 'Con delicatezza', 'Il dubbio non si scaccia. Si ascolta, finché diventa più chiaro.', '#dubbio #tarocchi #delicatezza #emozioni #apertura'],
  ['gratis', 'Se stai iniziando', 'Inizia dall’onestà', 'Non serve esperienza. Serve una domanda vera e un po’ di coraggio.', '#iniziare #tarocchi #onestà #coraggio #sé'],

  // amore 66-90
  ['amore', 'Cosa non dici?', 'Anche a te stesso', 'Quando le parole mancano, resta un peso nel petto. A volte è lì che inizia la verità.', '#amore #parole #tarocchi #emozioni #cuore'],
  ['amore', 'Segnali confusi?', 'O paura di capire', 'Tra sentimento e aspettativa c’è una nebbia. Non sei debole: stai cercando di vedere.', '#segnali #amore #tarocchi #chiarezza #relazioni'],
  ['amore', 'Cuore in dubbio', 'Non in errore', 'Dubitare non significa non amare. Significa che qualcosa chiede attenzione.', '#cuore #dubbio #amore #tarocchi #ascolto'],
  ['amore', 'Lui / lei / noi', 'Tre energie, un nodo', 'Non per controllare l’altro. Per capire cosa stai portando tu nella danza.', '#dinamica #amore #tarocchi #relazioni #consapevolezza'],
  ['amore', 'Chiusura o ritorno?', 'La domanda aperta', 'Le risposte sì/no chiudono troppo presto. Il cuore ha bisogno di spazio.', '#ex #chiusura #amore #tarocchi #emozioni'],
  ['amore', 'Nuovo incontro?', 'Che energia porti tu', 'Prima di chiedere “chi è”, chiedi cosa stai offrendo — e cosa temi di ripetere.', '#nuovoamore #incontro #tarocchi #sé #relazioni'],
  ['amore', 'Troppe storie in testa', 'Una sola conta', 'Scegli il nodo vero. Il resto sono echi che ti tengono sveglio.', '#pensieri #amore #tarocchi #focus #notte'],
  ['amore', 'Amore a distanza', 'Il filo che resta', 'Cosa tenete ancora? Cosa avete già lasciato andare senza dirvelo?', '#distanza #amore #tarocchi #filo #relazioni'],
  ['amore', 'Gelosia o intuizione?', 'Due voci diverse', 'Una nasce dalla paura. L’altra dal corpo che sa. Meritano nomi distinti.', '#gelosia #intuito #amore #tarocchi #emozioni'],
  ['amore', 'Silent treatment', 'Cosa fa a te', 'Prima di decifrare l’altro, ascolta cosa fa il silenzio dentro di te.', '#silenzio #amore #tarocchi #dolore #comunicazione'],
  ['amore', 'Mi vuole ancora?', 'Riformula', 'Meglio: quale energia c’è tra noi, ora? Meno verdetto, più presenza.', '#amore #domanda #tarocchi #presenza #cuore'],
  ['amore', 'Dopo una lite', 'Prima di riparare', 'C’è rabbia, c’è ferita, c’è anche il bisogno di non perdere te stesso.', '#litigio #amore #tarocchi #perdono #confini'],
  ['amore', 'Crush o connessione?', 'Il clima vero', 'Non inventare un destino. Guarda cosa c’è già — e cosa stai proiettando.', '#crush #connessione #amore #tarocchi #realismo'],
  ['amore', 'Paura di lasciar andare', 'Attaccamento o amore', 'A volte stringi per non sentire il vuoto. Le carte aiutano a distinguerlo.', '#lasciareandare #amore #tarocchi #attaccamento #crescita'],
  ['amore', 'Messaggi misti', 'Cuore e chat', 'Quando le parole online e il corpo non tornano, serve ordine — non più scroll.', '#messaggi #amore #tarocchi #chiarezza #confusione'],
  ['amore', 'Tornare insieme?', 'Prima: chiarezza', 'Non una profezia. Un momento onesto su cosa cerchi davvero, tu.', '#ricongiungimento #amore #tarocchi #scelta #onestà'],
  ['amore', 'Single e sereno?', 'O in attesa', 'Chiediti cosa stai coltivando. La solitudine e l’attesa non sono la stessa cosa.', '#single #amore #tarocchi #sé #crescita'],
  ['amore', 'Amore e confini', 'Dove dici sì troppo', 'A volte il cuore generoso dimentica dove finisci tu.', '#confini #amore #tarocchi #assertività #sé'],
  ['amore', 'Il timing dell’amore', 'Non la data magica', 'Conta l’atteggiamento, non il calendario. Cosa sei pronto a vivere?', '#timing #amore #tarocchi #prontezza #realismo'],
  ['amore', 'Ti senti invisibile', 'Nella relazione', 'Una domanda su di te, non solo sull’altro. Essere visti inizia da lì.', '#invisibile #amore #tarocchi #ascolto #valore'],
  ['amore', 'Passione vs stabilità', 'Cosa pesa ora', 'Non c’è una risposta giusta per sempre. C’è quella vera per questo momento.', '#passione #stabilità #dilemmi #amore #tarocchi'],
  ['amore', 'Parlare o aspettare?', 'Il tono conta', 'Non è solo “cosa dire”. È se sei pronto ad ascoltare la risposta.', '#comunicazione #amore #tarocchi #ascolto #scelta'],
  ['amore', 'Amore soft', 'Senza drama', 'C’è anche un modo quieto di guardare il cuore. Meno rumore, più verità.', '#soft #amore #tarocchi #calma #cuore'],
  ['amore', 'Il nodo del momento', 'In amore', 'Una sola frase di domanda. Il resto è rumore che confonde.', '#nodo #amore #tarocchi #focus #emozioni'],
  ['amore', 'Quando l’amore confonde', 'Resta il sentire', 'Non serve urlare una certezza. Serve onestà su ciò che ti muove.', '#amore #tarocchi #sentire #onestà #relazioni'],

  // lavoro 91-110
  ['lavoro', 'Resto o cambio?', 'Il clima della scelta', 'Non è solo carriera. È dove metti energia — e dove la perdi.', '#lavoro #scelta #tarocchi #energia #carriera'],
  ['lavoro', 'Stallo professionale', 'Cosa non si muove', 'A volte lo stallo non è pigrizia. È un messaggio che non hai ancora ascoltato.', '#stallo #lavoro #tarocchi #motivazione #ascolto'],
  ['lavoro', 'Colloquio in arrivo', 'Come ti presenti tu', 'Oltre il curriculum: quale energia vuoi portare nella stanza?', '#colloquio #lavoro #tarocchi #presenza #carriera'],
  ['lavoro', 'Burnout o noia?', 'Due mali diversi', 'Uno brucia. L’altro spegne. Dare il nome giusto cambia il prossimo passo.', '#burnout #lavoro #tarocchi #benessere #chiarezza'],
  ['lavoro', 'Promozione?', 'O altro passo', 'A volte il titolo nuovo non è la direzione. Guarda cosa ti nutre davvero.', '#promozione #carriera #tarocchi #direzione #senso'],
  ['lavoro', 'Lavoro e confini', 'Dopo le 18', 'Cosa stai sacrificando senza dirtelo? Il corpo lo sa già.', '#confini #worklife #tarocchi #equilibrio #lavoro'],
  ['lavoro', 'Team difficile', 'Il tuo margine', 'Non il gossip. Il tuo spazio di azione — e dove smetti di portarti tutto.', '#team #lavoro #tarocchi #confini #relazioni'],
  ['lavoro', 'Partita IVA?', 'O dipendente', 'Dietro la scelta pratica c’è una paura e un desiderio. Entrambi meritano luce.', '#partitaiva #scelta #tarocchi #lavoro #paura'],
  ['lavoro', 'Nuovo progetto', 'Sì o non ancora', 'Cosa ti serve per partire bene — non solo per partire in fretta?', '#progetto #lavoro #tarocchi #lancio #chiarezza'],
  ['lavoro', 'Soldi e lavoro', 'Senza ansia performativa', 'Simboli sul valore e sulla pressione — non una previsione finanziaria.', '#soldi #lavoro #tarocchi #valore #pressione'],
  ['lavoro', 'Mi sottovalutano', 'Voce e valore', 'Prima di convincere gli altri, ascolta dove tu smetti di crederti.', '#valore #carriera #tarocchi #autostima #lavoro'],
  ['lavoro', 'Cambio città per lavoro', 'Il clima del passo', 'Non la garanzia. L’energia del movimento — e cosa lasci dietro.', '#trasloco #lavoro #tarocchi #cambio #scelta'],
  ['lavoro', 'Creatività bloccata', 'Al lavoro', 'Il blocco spesso nasconde stanchezza o paura. Non solo mancanza di idee.', '#creatività #blocco #tarocchi #lavoro #paura'],
  ['lavoro', 'Leadership soft', 'O più netta', 'Che stile sostiene questo periodo — non quello che ti hanno detto di essere?', '#leadership #lavoro #tarocchi #stile #autenticità'],
  ['lavoro', 'Lunedì difficile', 'Prima della settimana', 'Un rituale breve: cosa porti dentro, e cosa puoi lasciare fuori.', '#lunedì #lavoro #tarocchi #rituale #inizio'],
  ['lavoro', 'Feedback ricevuto', 'Come metabolizzarlo', 'Tra difesa e autodistruzione c’è uno spazio. Lì cresci davvero.', '#feedback #carriera #tarocchi #crescita #lavoro'],
  ['lavoro', 'Rete o merito?', 'Il tuo mix', 'Una domanda onesta sul potere, le porte e ciò che meriti di chiedere.', '#networking #merito #tarocchi #carriera #potere'],
  ['lavoro', 'Dimissioni in testa', 'Prima: chiarezza', 'La fuga e la scelta non si somigliano. Distinguerle ti salva mesi.', '#dimissioni #scelta #tarocchi #lavoro #calma'],
  ['lavoro', 'Obiettivi che pesano', 'Direzione, non lista', 'Cosa stai inseguendo perché lo vuoi — e cosa perché “si deve”?', '#obiettivi #lavoro #tarocchi #senso #focus'],
  ['lavoro', 'Quando il lavoro confonde', 'Resta il corpo', 'Stanchezza, rabbia, vuoto: sono già risposte. Le carte le mettono in parole.', '#lavoro #tarocchi #corpo #emozioni #chiarezza'],

  // futuro 111-125
  ['futuro', 'Il prossimo passo', 'Non tutto il cammino', 'Illumina la direzione, non il destino fisso. Basta un passo onesto.', '#futuro #direzione #tarocchi #passo #chiarezza'],
  ['futuro', 'Cosa preparare', 'Nei prossimi mesi', 'Meglio “cosa coltivare” che “il giorno esatto”. Il corpo preferisce la cura alla profezia.', '#preparazione #futuro #tarocchi #cura #realismo'],
  ['futuro', 'Paura del dopo', 'Nominala', 'Finché resta vaga, comanda. Quando ha un nome, puoi respirare accanto.', '#paura #futuro #tarocchi #emozioni #calma'],
  ['futuro', 'Una porta socchiusa', 'Entri?', 'Non è solo opportunità. È anche il coraggio di attraversare.', '#porta #scelta #tarocchi #futuro #coraggio'],
  ['futuro', 'Ciclo che finisce', 'Cosa inizia', 'Passato, presente, tendenza. Una storia in movimento — non un verdetto.', '#cicli #cambiamento #tarocchi #futuro #storia'],
  ['futuro', 'Orizzonte vicino', 'Il passo utile', 'Chiedi sul prossimo gesto concreto, non sul romanzo intero.', '#orizzonte #futuro #tarocchi #azione #chiarezza'],
  ['futuro', 'Se non cambio nulla', 'Cosa tende', 'Una domanda onesta. A volte il “dopo” è già scritto nel “come sto ora”.', '#tendenza #futuro #tarocchi #realismo #scelta'],
  ['futuro', 'Speranza o piano?', 'Distingui', 'Sognare nutre. Agire orienta. Sapere quale stai facendo ti rende libero.', '#speranza #piano #tarocchi #futuro #azione'],
  ['futuro', 'Check-in con te', 'Sul filo del tempo', 'Anche a metà strada: tre simboli su dove sei davvero diretto.', '#checkin #futuro #tarocchi #intenzione #presenza'],
  ['futuro', 'Rischio calcolato', 'O fuga', 'Chiarisci il movente. Il coraggio e la fuga a volte si mascherano uguali.', '#rischio #scelta #tarocchi #futuro #consapevolezza'],
  ['futuro', 'Il dopo-scelta', 'Come stare', 'Non solo “cosa succede”. Come ti muovi tu, dopo.', '#dopo #scelta #tarocchi #futuro #sé'],
  ['futuro', 'Nebbia davanti', 'Una luce basta', 'Non serve la mappa intera. Serve un punto di appoggio per stanotte.', '#nebbia #chiarezza #tarocchi #futuro #calma'],
  ['futuro', 'Futuro soft', 'Senza panico', 'Guardare avanti può essere quieto. Non tutto deve essere urgenza.', '#soft #futuro #tarocchi #calma #benessere'],
  ['futuro', 'Domanda sul futuro', 'Come farla', 'Apri, concreta, un solo tema. Il resto è rumore che confonde le carte.', '#domanda #futuro #tarocchi #focus #chiarezza'],
  ['futuro', 'Quello che verrà', 'Inizia da come stai', 'Il futuro non è un film. È la somma di come ti tratti oggi.', '#futuro #tarocchi #oggi #cura #sé'],

  // domanda 126-140
  ['domanda', 'La domanda giusta', 'Cambia tutto', 'Le carte rispondono al focus che dai. Una domanda confusa genera solo nebbia.', '#domanda #tarocchi #focus #chiarezza #introspezione'],
  ['domanda', 'Non chiedere sì/no', 'Chiedi come', 'Apri: dinamica, atteggiamento, prossimo passo. Il cuore ha bisogno di spazio.', '#sìno #domanda #tarocchi #apertura #chiarezza'],
  ['domanda', 'Una domanda sola', 'Per tre carte', 'Troppi temi = lettura confusa. Scegli il nodo. Il resto aspetta.', '#focus #domanda #tarocchi #nodo #chiarezza'],
  ['domanda', 'Prima di pescare', 'Scrivi', 'Tre minuti di chiarezza valgono più di dieci estrazioni affrettate.', '#preparazione #domanda #tarocchi #rituale #calma'],
  ['domanda', 'Esempi che aiutano', 'Amore e lavoro', 'Domande aperte, oneste, senza verdetto. Poi ascolta cosa emerge.', '#esempi #domanda #tarocchi #amore #lavoro'],
  ['domanda', 'Controllo sull’altro?', 'Riformula', 'Chiedi il tuo ruolo e la dinamica. Più utile, meno ansia.', '#controllo #domanda #tarocchi #relazioni #mindset'],
  ['domanda', 'Date assolute', 'Meglio no', '“In questa fase” batte “il giorno esatto”. Il tempo interiore non è un calendario.', '#date #domanda #tarocchi #realismo #futuro'],
  ['domanda', 'Domanda confusa', 'In tre passi', 'Scarica tutto → sottolinea il nodo → riscrivi aperta. Poi respira.', '#metodo #domanda #tarocchi #chiarezza #pratica'],
  ['domanda', 'Cosa vuoi capire', 'Davvero', 'Chiarezza — o solo rassicurazione? L’onestà viene prima delle carte.', '#onestà #domanda #tarocchi #introspezione #verità'],
  ['domanda', 'Troppe domande', 'Una per volta', 'Approfondisci dopo, sullo stesso filo. Non sparare a raffica.', '#approfondimento #domanda #tarocchi #focus #pazienza'],
  ['domanda', 'Se stai iniziando', 'Una formula semplice', 'Chi + cosa + orizzonte. Poi resta in ascolto di ciò che emerge.', '#principianti #domanda #tarocchi #template #ascolto'],
  ['domanda', 'Domanda debole', 'Vs quella utile', 'Una chiude. L’altra apre. La differenza si sente nel corpo.', '#esempi #domanda #tarocchi #corpo #chiarezza'],
  ['domanda', 'Respiro. Poi domanda.', 'Poi carte', 'Il ritmo conta quanto le parole. La fretta confonde tutto.', '#ritmo #domanda #tarocchi #presenza #calma'],
  ['domanda', 'Scrivi, poi ascolta', 'Il nodo vero', 'Quando la domanda è scritta bene, metà della confusione è già sciolta.', '#pratica #domanda #tarocchi #chiarezza #scrittura'],
  ['domanda', 'Fare una domanda', 'Con rispetto', 'Verso te, verso il mistero. Non per costringere una risposta.', '#domanda #tarocchi #rispetto #mistero #ascolto'],
];

function buildPin(i, row) {
  const id = 41 + i;
  const [theme, overlay, sub, descBody, tags] = row;
  const board = BOARDS[theme];
  const link = theme === 'domanda' ? LINKS.domanda : LINKS[theme] || LINKS.home;
  const slug = slugify(overlay) || `pin-${id}`;
  const image = `pin-${id}-${slug}.png`;
  const title = overlay.length > 60 ? overlay.slice(0, 57) + '…' : overlay;
  const description = `${descBody}\n\n${tags}`;
  return { id, theme, overlay, sub, board, title, description, link, image };
}

function syncCsv(pins) {
  let csv = fs.existsSync(CSV) ? fs.readFileSync(CSV, 'utf8') : 'id,immagine,bacheca,titolo,descrizione,link\n';
  if (!csv.endsWith('\n')) csv += '\n';
  // keep rows with id < 41
  const records = [];
  let buf = '';
  const lines = csv.split(/\r?\n/);
  const header = lines[0] || 'id,immagine,bacheca,titolo,descrizione,link';
  for (const line of lines.slice(1)) {
    if (!buf && !line.trim()) continue;
    buf = buf ? `${buf}\n${line}` : line;
    const quotes = (buf.match(/"/g) || []).length;
    if (quotes % 2 === 1) continue;
    const idMatch = buf.match(/^(\d+),/);
    const id = idMatch ? parseInt(idMatch[1], 10) : 0;
    if (id && id < 41) records.push(buf);
    buf = '';
  }
  for (const pin of pins) {
    records.push(
      [
        String(pin.id),
        pin.image,
        csvEsc(pin.board),
        csvEsc(pin.title),
        csvEsc(pin.description),
        pin.link,
      ].join(',')
    );
  }
  fs.writeFileSync(CSV, header + '\n' + records.join('\n') + '\n', 'utf8');
}

async function main() {
  const pngOnly = process.argv.includes('--png-only');
  if (RAW.length !== 100) {
    console.error(`Attesi 100 pin, trovati ${RAW.length}`);
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });
  const pins = RAW.map((row, i) => buildPin(i, row));

  // remove old lot5 pngs with different slugs
  for (const f of fs.readdirSync(OUT)) {
    if (/^pin-(?:[4-9]\d|1[0-3]\d|140)-.*\.png$/.test(f)) {
      const keep = pins.some((p) => p.image === f);
      if (!keep) fs.unlinkSync(path.join(OUT, f));
    }
  }

  console.log('Generazione PNG (copy emotiva + illustrazioni)…');
  for (const pin of pins) {
    const svg = buildSvg(pin);
    await sharp(Buffer.from(svg)).png({ quality: 90, compressionLevel: 8 }).toFile(path.join(OUT, pin.image));
    process.stdout.write('.');
  }
  console.log(`\nPNG ok: ${pins.length}`);

  syncCsv(pins);
  console.log('CSV sync 41–140');

  if (pngOnly) return;

  const start = new Date('2026-09-01T00:00:00');
  const hours = [9, 11];
  const lines = [
    '# Buffer lot 5 (pin 41–140) — DA CARICARE IN CODA',
    '',
    '100 pin · 2 al giorno (09:00 e 11:00 Europe/Rome)',
    '',
    '| Data | Ora Roma | Pin | Titolo |',
    '|------|----------|-----|--------|',
  ];
  pins.forEach((pin, i) => {
    const day = Math.floor(i / 2);
    const slot = i % 2;
    const d = new Date(start);
    d.setDate(start.getDate() + day);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    lines.push(`| ${dd}/${mm}/26 | ${String(hours[slot]).padStart(2, '0')}:00 | ${pin.id} | ${pin.title.replace(/\|/g, '/')} |`);
  });
  fs.writeFileSync(path.join(OUT, 'BUFFER-LOT5.txt'), lines.join('\n') + '\n', 'utf8');
  console.log('Scritto BUFFER-LOT5.txt');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
