/**
 * Aggrega pins-guida.csv + URL Catbox → buffer-queue-tool/pins-data.json
 * Usage: node buffer-queue-tool/generate-data.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PINS = path.join(ROOT, 'pinterest-pins');
const CSV = path.join(PINS, 'pins-guida.csv');
const OUT = path.join(__dirname, 'pins-data.json');
const STATE = path.join(__dirname, 'state.json');

const BOARDS = {
  'Come Fare una Domanda ai Tarocchi': '1134907243538816741',
  'Lettura Tarocchi Gratis': '1134907243538816737',
  'Tarocchi Amore': '1134907243538816721',
  'Tarocchi Futuro': '1134907243538816734',
  'Tarocchi Lavoro': '1134907243538816730',
};

/** Known from Buffer MCP (update via tool / sync). */
const DEFAULT_STATE = {
  sentIds: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  scheduledIds: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
  notes: 'Aggiornato 2026-09-13: lot4 inviato; batch 61–70 in coda Buffer.',
};

function parseCsvPins() {
  const raw = fs.readFileSync(CSV, 'utf8');
  const records = [];
  let buf = '';
  for (const line of raw.split(/\r?\n/).slice(1)) {
    if (!buf && !line.trim()) continue;
    buf = buf ? `${buf}\n${line}` : line;
    const quotes = (buf.match(/"/g) || []).length;
    if (quotes % 2 === 1) continue;
    records.push(buf);
    buf = '';
  }

  const rows = [];
  for (const rec of records) {
    const linkMatch = rec.match(/(https:\/\/www\.luxseetarot\.com[^\s,"]*)\s*$/);
    if (!linkMatch) continue;
    const link = linkMatch[1];
    const before = rec.slice(0, rec.lastIndexOf(',' + link));
    const parts = [];
    let cur = '';
    let q = false;
    for (let c = 0; c < before.length; c++) {
      const ch = before[c];
      if (ch === '"') {
        q = !q;
        cur += ch;
        continue;
      }
      if (ch === ',' && !q) {
        parts.push(cur);
        cur = '';
        continue;
      }
      cur += ch;
    }
    parts.push(cur);
    if (parts.length < 5) continue;
    const id = parseInt(parts[0], 10);
    const image = parts[1];
    const board = parts[2];
    const title = parts[3].replace(/^"|"$/g, '').replace(/""/g, '"');
    const description = parts.slice(4).join(',').replace(/^"|"$/g, '').replace(/""/g, '"');
    if (!id || !image) continue;
    rows.push({ id, image, board, title, description, link });
  }
  return rows;
}

function loadUrlMap() {
  const map = {};
  const names = fs.readdirSync(PINS).filter((n) => n.endsWith('-urls.json'));
  // Prima i batch storici, poi i reupload (hanno priorità sulle immagini aggiornate)
  const ordered = [
    ...names.filter((n) => !n.startsWith('reupload-')).sort(),
    ...names.filter((n) => n.startsWith('reupload-')).sort(),
  ];
  for (const name of ordered) {
    let raw = fs.readFileSync(path.join(PINS, name), 'utf8');
    raw = raw.replace(/^\uFEFF/, '');
    Object.assign(map, JSON.parse(raw));
  }
  for (const name of ['lot5-batch1-schedule.json', 'lot5-batch2-schedule.json', 'lot5-batch3-schedule.json', 'lot5-batch4-schedule.json']) {
    const fp = path.join(PINS, name);
    if (!fs.existsSync(fp)) continue;
    const arr = JSON.parse(fs.readFileSync(fp, 'utf8').replace(/^\uFEFF/, ''));
    for (const p of arr) {
      if (p.image && p.mediaUrl) map[p.image] = p.mediaUrl;
    }
  }
  // Re-applica i reupload per sovrascrivere anche gli schedule lot5
  for (const name of names.filter((n) => n.startsWith('reupload-')).sort()) {
    let raw = fs.readFileSync(path.join(PINS, name), 'utf8');
    raw = raw.replace(/^\uFEFF/, '');
    Object.assign(map, JSON.parse(raw));
  }
  return map;
}

function loadState() {
  if (fs.existsSync(STATE)) {
    try {
      return { ...DEFAULT_STATE, ...JSON.parse(fs.readFileSync(STATE, 'utf8')) };
    } catch {
      /* fall through */
    }
  }
  fs.writeFileSync(STATE, JSON.stringify(DEFAULT_STATE, null, 2), 'utf8');
  return { ...DEFAULT_STATE };
}

function main() {
  const urls = loadUrlMap();
  const state = loadState();
  const sent = new Set(state.sentIds || []);
  const scheduled = new Set(state.scheduledIds || []);

  const pinsRaw = parseCsvPins().map((p) => {
    const mediaUrl = urls[p.image] || null;
    let status = 'missing_url';
    if (sent.has(p.id)) status = 'sent';
    else if (scheduled.has(p.id)) status = 'scheduled';
    else if (mediaUrl) status = 'ready';
    return {
      ...p,
      mediaUrl,
      boardServiceId: BOARDS[p.board] || null,
      status,
      localImage: `/pinterest-pins/${p.image}`,
    };
  });

  // Ordine coda: lot A (41–440), B (441–840), C (841–1240), D (1241–1640) intercalati a 4
  const lotA = pinsRaw.filter((p) => p.id >= 41 && p.id <= 440).sort((a, b) => a.id - b.id);
  const lotB = pinsRaw.filter((p) => p.id >= 441 && p.id <= 840).sort((a, b) => a.id - b.id);
  const lotC = pinsRaw.filter((p) => p.id >= 841 && p.id <= 1240).sort((a, b) => a.id - b.id);
  const lotD = pinsRaw.filter((p) => p.id >= 1241 && p.id <= 1640).sort((a, b) => a.id - b.id);
  const early = pinsRaw.filter((p) => p.id < 41).sort((a, b) => a.id - b.id);
  const queueOrder = new Map();
  let q = 0;
  const maxLen = Math.max(lotA.length, lotB.length, lotC.length, lotD.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < lotA.length) queueOrder.set(lotA[i].id, q++);
    if (i < lotB.length) queueOrder.set(lotB[i].id, q++);
    if (i < lotC.length) queueOrder.set(lotC[i].id, q++);
    if (i < lotD.length) queueOrder.set(lotD[i].id, q++);
  }
  for (const p of early) queueOrder.set(p.id, 100000 + p.id);

  const pins = pinsRaw
    .map((p) => ({ ...p, queueOrder: queueOrder.get(p.id) ?? p.id }))
    .sort((a, b) => a.queueOrder - b.queueOrder);

  const summary = {
    total: pins.length,
    sent: pins.filter((p) => p.status === 'sent').length,
    scheduled: pins.filter((p) => p.status === 'scheduled').length,
    ready: pins.filter((p) => p.status === 'ready').length,
    missing_url: pins.filter((p) => p.status === 'missing_url').length,
  };

  const payload = {
    generatedAt: new Date().toISOString(),
    channel: {
      name: 'luxseetarot',
      service: 'pinterest',
      bufferChannelId: '6a7102ca99afb44349f67abc',
    },
    boards: BOARDS,
    freeQueueLimit: 10,
    summary,
    pins,
  };

  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2), 'utf8');
  console.log('Wrote', OUT);
  console.log(summary);
}

main();
