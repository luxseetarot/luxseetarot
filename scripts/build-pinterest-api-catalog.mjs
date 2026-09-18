/**
 * Costruisce api/_lib/pinterest-catalog.json dal tool Buffer (pins-data.json).
 * Esclude pin già pubblicati via Buffer (sent + batch 61–70).
 *
 * Usage: node scripts/build-pinterest-api-catalog.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'buffer-queue-tool', 'pins-data.json');
const STATE = path.join(ROOT, 'buffer-queue-tool', 'state.json');
const OUT = path.join(ROOT, 'api', '_lib', 'pinterest-catalog.json');

const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));
let skip = new Set();
try {
  const state = JSON.parse(fs.readFileSync(STATE, 'utf8'));
  for (const id of state.sentIds || []) skip.add(Number(id));
  for (const id of state.scheduledIds || []) skip.add(Number(id));
} catch {
  /* state opzionale */
}

const catalog = (data.pins || [])
  .filter((p) => p && p.mediaUrl && p.image && !skip.has(Number(p.id)))
  .filter((p) => p.status === 'ready' || p.status === 'scheduled')
  .sort((a, b) => (a.queueOrder ?? 0) - (b.queueOrder ?? 0))
  .map((p) => ({
    image: String(p.image),
    mediaUrl: String(p.mediaUrl),
    boardName: String(p.board || ''),
    title: String(p.title || '').slice(0, 100),
    description: String(p.description || '').slice(0, 800),
    link: String(p.link || 'https://www.luxseetarot.com/'),
  }));

fs.writeFileSync(OUT, JSON.stringify(catalog));
console.log(`Wrote ${catalog.length} pins → ${path.relative(ROOT, OUT)}`);
console.log(`Skipped ids: ${[...skip].sort((a, b) => a - b).join(', ') || '(none)'}`);
