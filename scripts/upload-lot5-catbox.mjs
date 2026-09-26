/**
 * Upload N lot-5 pins to catbox + write batch JSON for Buffer/Metricool.
 * Usage: node scripts/upload-lot5-catbox.mjs [count=10] [startId=41]
 * Dates: pin 41 = 2026-09-01 09:00, then 2/day (09:00 + 11:00 Europe/Rome).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PINS = path.join(ROOT, 'pinterest-pins');
const CSV = path.join(PINS, 'pins-guida.csv');
const LOT5_FIRST_ID = 41;
const LOT5_ANCHOR = new Date('2026-09-01T00:00:00');
const COUNT = Math.max(1, Math.min(100, parseInt(process.argv[2] || '10', 10) || 10));
const START_ID = Math.max(LOT5_FIRST_ID, parseInt(process.argv[3] || String(LOT5_FIRST_ID), 10) || LOT5_FIRST_ID);
const BATCH_NUM = Math.floor((START_ID - LOT5_FIRST_ID) / COUNT) + 1;

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

async function uploadCatbox(filePath) {
  const form = new FormData();
  form.append('reqtype', 'fileupload');
  const blob = new Blob([fs.readFileSync(filePath)]);
  form.append('fileToUpload', blob, path.basename(filePath));
  const res = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form });
  const text = (await res.text()).trim();
  if (!res.ok || !/^https:\/\//.test(text)) {
    throw new Error(`catbox fail ${path.basename(filePath)}: ${text.slice(0, 200)}`);
  }
  return text;
}

function formatRomeRange(schedule) {
  if (!schedule.length) return '';
  const first = schedule[0].when.slice(0, 10);
  const last = schedule[schedule.length - 1].when.slice(0, 10);
  const fmt = (iso) => {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y.slice(2)}`;
  };
  return `${fmt(first)} – ${fmt(last)}`;
}

async function main() {
  const all = parseCsvPins().filter((p) => p.id >= START_ID && p.id < START_ID + COUNT);
  if (!all.length) throw new Error(`No CSV pins for id ${START_ID}..${START_ID + COUNT - 1}`);
  const batch = all.slice(0, COUNT);
  const urls = {};
  const schedule = [];
  const hours = [9, 11];
  const endId = batch[batch.length - 1].id;
  const urlsFile = `lot5-batch${BATCH_NUM}-urls.json`;
  const scheduleFile = `lot5-batch${BATCH_NUM}-schedule.json`;
  const bufferFile = `BUFFER-LOT5-BATCH${BATCH_NUM}.txt`;

  for (const pin of batch) {
    const filePath = path.join(PINS, pin.image);
    if (!fs.existsSync(filePath)) throw new Error(`Missing ${pin.image}`);
    process.stdout.write(`Upload ${pin.image}... `);
    const url = await uploadCatbox(filePath);
    console.log(url);
    urls[pin.image] = url;
    const globalIndex = pin.id - LOT5_FIRST_ID;
    const day = Math.floor(globalIndex / 2);
    const slot = globalIndex % 2;
    const d = new Date(LOT5_ANCHOR);
    d.setDate(LOT5_ANCHOR.getDate() + day);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const when = `${y}-${m}-${dd}T${String(hours[slot]).padStart(2, '0')}:00:00`;
    schedule.push({ ...pin, mediaUrl: url, when });
    await new Promise((r) => setTimeout(r, 400));
  }

  fs.writeFileSync(path.join(PINS, urlsFile), JSON.stringify(urls, null, 2), 'utf8');
  fs.writeFileSync(path.join(PINS, scheduleFile), JSON.stringify(schedule, null, 2), 'utf8');

  const range = formatRomeRange(schedule);
  const md = [
    `# Buffer lot 5 — batch ${BATCH_NUM} (pin ${START_ID}–${endId}) PRONTO`,
    '',
    `URL Catbox in \`${urlsFile}\`.`,
    `Orari: ${range}, 09:00 e 11:00 Rome.`,
    'Buffer Free: max ~10 in coda — carica quando il batch precedente ha finito di pubblicare.',
    '',
    ...schedule.map(
      (p) =>
        `- **${p.when.slice(0, 16).replace('T', ' ')}** | ${p.board} | ${p.title}\n  img: ${p.mediaUrl}\n  link: ${p.link}\n  copy:\n${p.description.split('\n').map((l) => '  ' + l).join('\n')}`
    ),
    '',
  ].join('\n');
  fs.writeFileSync(path.join(PINS, bufferFile), md, 'utf8');
  console.log(`\nDone ${schedule.length}. Wrote ${urlsFile} + ${scheduleFile} + ${bufferFile}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
