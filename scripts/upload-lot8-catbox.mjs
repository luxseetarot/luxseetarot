/**
 * Upload lot8 pins (841–1240) to Catbox.
 *   node scripts/upload-lot8-catbox.mjs --all
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PINS = path.join(ROOT, 'pinterest-pins');
const CSV = path.join(PINS, 'pins-guida.csv');
const FIRST = 841;
const LAST = 1240;
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
      if (ch === '"') { q = !q; cur += ch; continue; }
      if (ch === ',' && !q) { parts.push(cur); cur = ''; continue; }
      cur += ch;
    }
    parts.push(cur);
    if (parts.length < 5) continue;
    rows.push({
      id: parseInt(parts[0], 10),
      image: parts[1],
      board: parts[2],
      title: parts[3].replace(/^"|"$/g, '').replace(/""/g, '"'),
      description: parts.slice(4).join(',').replace(/^"|"$/g, '').replace(/""/g, '"'),
      link,
    });
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
  if (!batch.length) throw new Error(`No pins ${startId}`);
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
  fs.writeFileSync(path.join(PINS, `lot8-batch${batchNum}-urls.json`), JSON.stringify(urls, null, 2));
  fs.writeFileSync(path.join(PINS, `lot8-batch${batchNum}-schedule.json`), JSON.stringify(schedule, null, 2));
  console.log(`Done ${batch.length}. lot8-batch${batchNum}`);
}

async function main() {
  if (ALL) {
    for (let start = FIRST; start <= LAST; start += 10) {
      console.log(`\n=== Lot8 startId=${start} ===`);
      await uploadRange(start, 10);
    }
    console.log('\nAll lot8 uploaded.');
    return;
  }
  await uploadRange(START_ID, COUNT);
}

main().catch((e) => { console.error(e); process.exit(1); });
