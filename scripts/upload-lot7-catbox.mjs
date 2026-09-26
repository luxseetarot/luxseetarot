/**
 * Upload lot7 pins (441–840) to Catbox in batches of 10.
 *   node scripts/upload-lot7-catbox.mjs [--all]
 *   node scripts/upload-lot7-catbox.mjs 10 441
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PINS = path.join(ROOT, 'pinterest-pins');
const CSV = path.join(PINS, 'pins-guida.csv');
const FIRST = 441;
const LAST = 840;
const ALL = process.argv.includes('--all');
const COUNT = Math.max(1, Math.min(30, parseInt(process.argv[2] || '10', 10) || 10));
const START_ID = Math.max(FIRST, parseInt(process.argv[3] || String(FIRST), 10) || FIRST);

function parseCsvPins() {
  const raw = fs.readFileSync(CSV, 'utf8');
  const records = [];
  let buf = '';
  for (const line of raw.split(/\r?\n/).slice(1)) {
    if (!buf && !line.trim()) continue;
    buf = buf ? `${buf}\n${line}` : line;
    if (((buf.match(/"/g) || []).length) % 2 === 1) continue;
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
  form.append('fileToUpload', new Blob([fs.readFileSync(filePath)]), path.basename(filePath));
  const res = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form });
  const text = (await res.text()).trim();
  if (!res.ok || !/^https:\/\//.test(text)) throw new Error(`catbox fail ${path.basename(filePath)}: ${text.slice(0, 200)}`);
  return text;
}

async function uploadRange(startId, count) {
  const batch = parseCsvPins().filter((p) => p.id >= startId && p.id < startId + count);
  if (!batch.length) throw new Error(`No pins ${startId}..${startId + count - 1}`);
  const urls = {};
  const schedule = [];
  for (const p of batch) {
    const fp = path.join(PINS, p.image);
    if (!fs.existsSync(fp)) throw new Error(`Missing ${p.image}`);
    process.stdout.write(`Upload ${p.image}... `);
    const mediaUrl = await uploadCatbox(fp);
    console.log(mediaUrl);
    urls[p.image] = mediaUrl;
    schedule.push({ ...p, mediaUrl });
  }
  const batchNum = Math.floor((startId - FIRST) / 10) + 1;
  fs.writeFileSync(path.join(PINS, `lot7-batch${batchNum}-urls.json`), JSON.stringify(urls, null, 2), 'utf8');
  fs.writeFileSync(path.join(PINS, `lot7-batch${batchNum}-schedule.json`), JSON.stringify(schedule, null, 2), 'utf8');
  console.log(`Done ${batch.length}. Wrote lot7-batch${batchNum}-*.json`);
}

async function main() {
  if (ALL) {
    for (let start = FIRST; start <= LAST; start += 10) {
      console.log(`\n=== Lot7 batch startId=${start} ===`);
      await uploadRange(start, 10);
    }
    console.log('\nAll lot7 uploaded.');
    return;
  }
  await uploadRange(START_ID, COUNT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
