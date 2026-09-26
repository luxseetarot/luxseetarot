/**
 * Upload pin range to Catbox and write pinterest-pins/reupload-{from}-{to}-urls.json
 * (merge automatico in generate-data.mjs via *-urls.json)
 *
 *   node scripts/upload-range-catbox.mjs --from=41 --to=1640
 *   node scripts/upload-range-catbox.mjs --from=1241 --to=1640
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PINS = path.join(ROOT, 'pinterest-pins');
const CSV = path.join(PINS, 'pins-guida.csv');

function argNum(name, fallback) {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? parseInt(a.slice(name.length + 3), 10) : fallback;
}

const FIRST = argNum('from', 41);
const LAST = argNum('to', 1640);

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

async function main() {
  const batch = parseCsvPins().filter((p) => p.id >= FIRST && p.id <= LAST).sort((a, b) => a.id - b.id);
  if (!batch.length) throw new Error(`Nessun pin ${FIRST}-${LAST}`);
  const outFile = path.join(PINS, `reupload-${FIRST}-${LAST}-urls.json`);
  const urls = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
  console.log(`Upload ${batch.length} pin (${FIRST}–${LAST}). Resume da ${Object.keys(urls).length} già fatti.`);

  for (let i = 0; i < batch.length; i++) {
    const p = batch[i];
    if (urls[p.image]) {
      if ((i + 1) % 50 === 0) console.log(`  skip ${i + 1}/${batch.length}`);
      continue;
    }
    const fp = path.join(PINS, p.image);
    if (!fs.existsSync(fp)) throw new Error(`Missing ${p.image}`);
    process.stdout.write(`Upload #${p.id} ${p.image}... `);
    const mediaUrl = await uploadCatbox(fp);
    console.log(mediaUrl);
    urls[p.image] = mediaUrl;
    fs.writeFileSync(outFile, JSON.stringify(urls, null, 2));
  }
  console.log(`Done. Wrote ${outFile} (${Object.keys(urls).length} urls)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
