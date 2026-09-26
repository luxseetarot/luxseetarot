/**
 * One-shot: upload pinterest-pins/*.png to Metricool and schedule 2/day.
 * Usage: METRICOOL_TOKEN=... node scripts/metricool-schedule-pins.mjs
 * Do not commit tokens.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PINS_DIR = path.join(ROOT, 'pinterest-pins');

const USER_ID = '5124276';
const BLOG_ID = '6657550';
const TZ = 'Europe/Rome';

function readToken() {
  const fromEnv = (process.env.METRICOOL_TOKEN || '').trim();
  if (fromEnv) return fromEnv;
  const file = (process.env.METRICOOL_TOKEN_FILE || '').trim();
  if (file && fs.existsSync(file)) return fs.readFileSync(file, 'utf8').trim();
  return '';
}

const TOKEN = readToken();
if (!TOKEN) {
  console.error('Missing METRICOOL_TOKEN or METRICOOL_TOKEN_FILE');
  process.exit(1);
}

const BOARDS = {
  'Come Fare una Domanda ai Tarocchi': '1134907243538816741',
  'Lettura Tarocchi Gratis': '1134907243538816737',
  'Tarocchi Amore': '1134907243538816721',
  'Tarocchi Futuro': '1134907243538816734',
  'Tarocchi Lavoro': '1134907243538816730',
};

const CATALOG = [
  {
    image: 'pin-01-tre-carte-gratis.png',
    boardName: 'Lettura Tarocchi Gratis',
    title: '3 carte. Zero euro. Lettura tarocchi online',
    description:
      'A volte basta poco per vedere più chiaro. Su Luxseetarot puoi iniziare con un’anteprima a tre carte — senza impegno. Poi, se ti parla, approfondisci. Lettura tarocchi online in italiano.\n\n#tarocchi #letturatarocchi #tarocchionline #cartomanzia #spiritualità',
    link: 'https://www.luxseetarot.com/',
    when: '2026-08-03T09:00:00',
  },
  {
    image: 'pin-02-anteprima.png',
    boardName: 'Lettura Tarocchi Gratis',
    title: 'Anteprima gratuita — poi decidi tu',
    description:
      'Niente pressioni. Solo tre carte, una domanda e una risposta simbolica da leggere con calma. L’anteprima è gratuita: il resto lo scegli tu.\n\nProva su luxseetarot.com\n\n#tarocchi #anteprimagratuita #letturatarocchi #oracolo #riflessione',
    link: 'https://www.luxseetarot.com/',
    when: '2026-08-03T11:00:00',
  },
  {
    image: 'pin-03-amore.png',
    boardName: 'Tarocchi Amore',
    title: 'Cosa sente davvero? Tarocchi amore',
    description:
      'Quando le parole mancano, le carte aiutano a mettere ordine. Una lettura sull’amore per chiarire sentimenti, chiusure e possibilità — partendo da un’anteprima gratuita a tre carte.\n\n#tarocchiamore #letturaamore #sentimentale #tarocchi #relazioni',
    link: 'https://www.luxseetarot.com/tarocchi-amore.html',
    when: '2026-08-04T09:00:00',
  },
  {
    image: 'pin-04-lavoro.png',
    boardName: 'Tarocchi Lavoro',
    title: 'E adesso? Tarocchi lavoro e direzione',
    description:
      'Carriera, scelta, stallo: tre carte per vedere il clima intorno a una decisione. Inizia con l’anteprima gratuita su Luxseetarot, in italiano.\n\n#tarocchilavoro #carriera #scelte #tarocchi #lavoro',
    link: 'https://www.luxseetarot.com/tarocchi-lavoro.html',
    when: '2026-08-04T11:00:00',
  },
  {
    image: 'pin-05-futuro.png',
    boardName: 'Tarocchi Futuro',
    title: 'Il prossimo passo — tarocchi futuro',
    description:
      'Non per “predire tutto”, ma per illuminare la direzione. Una lettura sul futuro con anteprima gratuita a tre carte, poi decidi se andare a fondo.\n\n#tarocchifuturo #futuro #direzione #tarocchi #chiarezza',
    link: 'https://www.luxseetarot.com/tarocchi-futuro.html',
    when: '2026-08-05T09:00:00',
  },
  {
    image: 'pin-06-domanda.png',
    boardName: 'Come Fare una Domanda ai Tarocchi',
    title: 'Una domanda chiara cambia tutto',
    description:
      'Le carte rispondono meglio a un focus preciso. Prima di pescare: cosa vuoi capire davvero? Su Luxseetarot puoi provare con anteprima gratuita.\n\n#domandatarocchi #comefareunadomanda #tarocchi #guida #introspezione',
    link: 'https://www.luxseetarot.com/',
    when: '2026-08-05T11:00:00',
  },
  {
    image: 'pin-07-senza-impegno.png',
    boardName: 'Lettura Tarocchi Gratis',
    title: 'Prova senza impegno — 3 carte online',
    description:
      'Curiosità sì. Pressione no. Inizia con tre carte, leggi l’anteprima, poi scegli. Lettura tarocchi online in italiano su Luxseetarot.\n\n#tarocchigratis #senzaimpegno #letturaonline #tarocchi #benessere',
    link: 'https://www.luxseetarot.com/',
    when: '2026-08-06T09:00:00',
  },
  {
    image: 'pin-08-chiarezza.png',
    boardName: 'Come Fare una Domanda ai Tarocchi',
    title: 'Non è magia. È chiarezza.',
    description:
      'I tarocchi non sostituiscono le tue scelte: le rendono più leggibili. Anteprima gratuita a tre carte su Luxseetarot — calma, simbolica, in italiano.\n\n#chiarezza #tarocchi #consapevolezza #letturatarocchi #mindset',
    link: 'https://www.luxseetarot.com/',
    when: '2026-08-06T11:00:00',
  },
  {
    image: 'pin-09-non-riesci.png',
    boardName: 'Tarocchi Amore',
    title: 'Tre carte per quello che non riesci a dire',
    description:
      'C’è una domanda che giri da giorni. Mettila alle carte. Inizia gratis con l’anteprima a tre carte su Luxseetarot.\n\n#tarocchi #emozioni #amore #ascolto #letturatarocchi',
    link: 'https://www.luxseetarot.com/',
    when: '2026-08-07T09:00:00',
  },
  {
    image: 'pin-10-gratis-poster.png',
    boardName: 'Lettura Tarocchi Gratis',
    title: 'Gratis la prima lettura (anteprima 3 carte)',
    description:
      'Vuoi solo capire se “ti parla”? Parti dall’anteprima gratuita. Tre carte, una domanda, zero impegno. Poi, se vuoi, la lettura completa.\n\nLuxseetarot — tarocchi online in italiano.\n\n#gratis #tarocchi #letturatarocchi #online #italia',
    link: 'https://www.luxseetarot.com/',
    when: '2026-08-07T11:00:00',
  },
];

function qs() {
  return `userId=${USER_ID}&blogId=${BLOG_ID}`;
}

async function uploadImage(filePath, filename) {
  const buf = fs.readFileSync(filePath);
  const blob = new Blob([buf], { type: 'image/png' });
  const fd = new FormData();
  fd.append('picture', blob, filename);
  const res = await fetch(`https://app.metricool.com/api/utils/upload?${qs()}`, {
    method: 'POST',
    headers: { 'X-Mc-Auth': TOKEN },
    body: fd,
  });
  const text = (await res.text()).trim();
  if (!res.ok) throw new Error(`Upload ${filename} HTTP ${res.status}: ${text.slice(0, 300)}`);
  // API returns bare URL string
  const url = text.replace(/^"|"$/g, '');
  if (!/^https?:\/\//.test(url)) throw new Error(`Upload ${filename}: unexpected ${text.slice(0, 200)}`);
  return url;
}

async function schedulePin({ mediaUrl, item }) {
  const boardId = BOARDS[item.boardName];
  if (!boardId) throw new Error(`Board missing: ${item.boardName}`);

  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const creation = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:00`;

  const body = {
    publicationDate: { dateTime: item.when, timezone: TZ },
    creationDate: { dateTime: creation, timezone: TZ },
    text: item.description,
    firstCommentText: '',
    providers: [{ network: 'pinterest' }],
    autoPublish: true,
    saveExternalMediaFiles: false,
    shortener: false,
    draft: false,
    media: [mediaUrl],
    pinterestData: {
      boardId,
      pinTitle: item.title,
      pinLink: item.link,
      pinNewFormat: true,
    },
    hasNotReadNotes: false,
    creatorUserId: Number(USER_ID),
  };

  const res = await fetch(`https://app.metricool.com/api/v2/scheduler/posts?${qs()}`, {
    method: 'POST',
    headers: {
      'X-Mc-Auth': TOKEN,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text.slice(0, 500) };
  }
  if (!res.ok) {
    throw new Error(`Schedule ${item.image} HTTP ${res.status}: ${text.slice(0, 500)}`);
  }
  return data;
}

async function main() {
  const results = [];
  for (const item of CATALOG) {
    const filePath = path.join(PINS_DIR, item.image);
    if (!fs.existsSync(filePath)) throw new Error(`Missing file ${filePath}`);
    process.stdout.write(`Uploading ${item.image}... `);
    const mediaUrl = await uploadImage(filePath, item.image);
    console.log('ok');
    process.stdout.write(`Scheduling ${item.when} → ${item.boardName}... `);
    const scheduled = await schedulePin({ mediaUrl, item });
    const id = scheduled?.data?.id || scheduled?.id || '?';
    console.log(`ok (#${id})`);
    results.push({ image: item.image, when: item.when, id, mediaUrl });
    // gentle pacing
    await new Promise((r) => setTimeout(r, 800));
  }
  console.log('\nDone. Scheduled', results.length, 'pins.');
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => {
  console.error('\nFAILED:', e.message || e);
  process.exit(1);
});
