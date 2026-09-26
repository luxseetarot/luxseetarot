/**
 * Upload lot6 pins (141+) to Catbox in batches of 10.
 * Usage: node scripts/upload-lot6-catbox.mjs [count=10] [startId=141]
 *        node scripts/upload-lot6-catbox.mjs --all
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PINS = path.join(ROOT, 'pinterest-pins');
const CSV = path.join(PINS, 'pins-guida.csv');
const LOT6_FIRST = 141;
const LOT6_LAST = 440;

const ALL = process.argv.includes('--all');
const COUNT = Math.max(1, Math.min(30, parseInt(process.argv[2] || '10', 10) || 10));
const START_ID = Math.max(LOT6_FIRST, parseInt(process.argv[3] || String(LOT6_FIRST), 10) || LOT6_FIRST);

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
  const all = parseCsvPins().filter((p) => p.id >= startId && p.id < startId + count);
  if (!all.length) throw new Error(`No CSV pins for ${startId}..${startId + count - 1}`);
  const batchNum = Math.floor((startId - LOT6_FIRST) / 10) + 1;
  const urls = {};
  const schedule = [];
  for (const pin of all) {
    const fp = path.join(PINS, pin.image);
    if (!fs.existsSync(fp)) throw new Error(`Missing ${pin.image}`);
    process.stdout.write(`Upload ${pin.image}... `);
    const url = await uploadCatbox(fp);
    console.log(url);
    urls[pin.image] = url;
    schedule.push({ ...pin, mediaUrl: url });
    await new Promise((r) => setTimeout(r, 350));
  }
  const urlsFile = `lot6-batch${batchNum}-urls.json`;
  const scheduleFile = `lot6-batch${batchNum}-schedule.json`;
  fs.writeFileSync(path.join(PINS, urlsFile), JSON.stringify(urls, null, 2), 'utf8');
  fs.writeFileSync(path.join(PINS, scheduleFile), JSON.stringify(schedule, null, 2), 'utf8');
  console.log(`Done ${schedule.length}. Wrote ${urlsFile}`);
}

async function main() {
  if (ALL) {
    for (let start = LOT6_FIRST; start <= LOT6_LAST; start += 10) {
      const n = Math.min(10, LOT6_LAST - start + 1);
      console.log(`\n=== Lot6 batch startId=${start} ===`);
      await uploadRange(start, n);
    }
    console.log('\nAll lot6 uploaded.');
    return;
  }
  await uploadRange(START_ID, COUNT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
