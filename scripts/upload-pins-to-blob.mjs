/**
 * Upload pin images to Vercel Blob (JPEG compressed) + rebuild catalog.
 * Skips already-published Buffer ids. Fits Hobby 1GB quota.
 *
 * Usage:
 *   $env:BLOB_READ_WRITE_TOKEN="..."
 *   node scripts/upload-pins-to-blob.mjs
 *   node scripts/upload-pins-to-blob.mjs --limit=5 --concurrency=8
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { put, list } from '@vercel/blob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PINS_DIR = path.join(ROOT, 'pinterest-pins');
const DATA = path.join(ROOT, 'buffer-queue-tool', 'pins-data.json');
const STATE = path.join(ROOT, 'buffer-queue-tool', 'state.json');
const OUT_CATALOG = path.join(ROOT, 'api', '_lib', 'pinterest-catalog.json');
const OUT_MAP = path.join(ROOT, 'pinterest-pins', 'blob-url-map.json');

const token = (process.env.BLOB_READ_WRITE_TOKEN || '').trim();
if (!token) {
  console.error('Missing BLOB_READ_WRITE_TOKEN');
  process.exit(1);
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 0;
const concArg = args.find((a) => a.startsWith('--concurrency='));
const concurrency = Math.max(1, Math.min(12, parseInt(concArg?.split('=')[1] || '8', 10) || 8));

function loadSkipIds() {
  const skip = new Set();
  try {
    const state = JSON.parse(fs.readFileSync(STATE, 'utf8'));
    for (const id of state.sentIds || []) skip.add(Number(id));
    for (const id of state.scheduledIds || []) skip.add(Number(id));
  } catch {
    /* optional */
  }
  for (const id of [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70]) {
    skip.add(id);
  }
  return skip;
}

function blobPathForImage(image) {
  const base = String(image).replace(/\.png$/i, '');
  return `pinterest-pins/${base}.jpg`;
}

async function existingPinMap() {
  /** @type {Map<string, string>} key = original png filename */
  const map = new Map();
  let cursor;
  do {
    const res = await list({
      cursor,
      limit: 1000,
      prefix: 'pinterest-pins/',
      token,
    });
    for (const b of res.blobs) {
      const file = b.pathname.replace(/^pinterest-pins\//, '');
      const pngName = file.replace(/\.jpe?g$/i, '.png');
      map.set(pngName, b.url);
      map.set(file, b.url);
    }
    cursor = res.hasMore ? res.cursor : undefined;
  } while (cursor);
  return map;
}

async function compressJpeg(localPath) {
  return sharp(localPath)
    .resize(1000, 1500, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}

async function uploadOne(localPath, pathname) {
  const body = await compressJpeg(localPath);
  const blob = await put(pathname, body, {
    access: 'public',
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'image/jpeg',
    multipart: body.length > 4.5 * 1024 * 1024,
  });
  return blob.url;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  const skip = loadSkipIds();
  const pins = (data.pins || [])
    .filter((p) => p && p.image && !skip.has(Number(p.id)))
    .sort((a, b) => (a.queueOrder ?? Number(a.id)) - (b.queueOrder ?? Number(b.id)));

  console.log(`Candidates: ${pins.length} (skip published ${skip.size})`);
  const existing = await existingPinMap();
  console.log(`Already on Blob under pinterest-pins/: ${existing.size}`);

  const urlByImage = new Map();
  // prefer png-key mapping
  for (const [k, v] of existing) {
    if (k.endsWith('.png')) urlByImage.set(k, v);
  }

  let uploaded = 0;
  let reused = 0;
  let failed = 0;
  const errors = [];

  const work = limit > 0 ? pins.slice(0, limit) : pins;
  const pending = [];
  for (const p of work) {
    const image = String(p.image);
    if (urlByImage.has(image)) {
      reused += 1;
      continue;
    }
    pending.push(p);
  }
  console.log(`To upload: ${pending.length} (reuse ${reused}), concurrency=${concurrency}`);

  let done = 0;
  let stop = false;
  async function worker(queue) {
    while (queue.length && !stop) {
      const p = queue.shift();
      if (!p) break;
      const image = String(p.image);
      const localPath = path.join(PINS_DIR, image);
      const pathname = blobPathForImage(image);
      if (!fs.existsSync(localPath)) {
        failed += 1;
        errors.push({ image, error: 'missing local file' });
        console.warn(`MISSING ${image}`);
        done += 1;
        continue;
      }
      if (dryRun) {
        console.log(`[dry] would upload ${pathname}`);
        done += 1;
        continue;
      }
      try {
        const url = await uploadOne(localPath, pathname);
        urlByImage.set(image, url);
        uploaded += 1;
        done += 1;
        if (uploaded % 25 === 0 || done === pending.length) {
          console.log(
            `progress ${done}/${pending.length} uploaded=${uploaded} failed=${failed} last=${image}`
          );
        }
      } catch (e) {
        failed += 1;
        done += 1;
        const msg = e && e.message ? e.message : String(e);
        errors.push({ image, error: msg });
        console.error(`FAIL ${image}: ${msg}`);
        if (/quota|limit|storage|402|413/i.test(msg)) {
          stop = true;
          queue.length = 0;
          console.error('Stopping early (quota/limit).');
        }
      }
    }
  }

  const queue = pending.slice();
  await Promise.all(Array.from({ length: concurrency }, () => worker(queue)));

  try {
    const prev = JSON.parse(fs.readFileSync(OUT_MAP, 'utf8'));
    for (const [k, v] of Object.entries(prev || {})) {
      if (k.endsWith('.png') && !urlByImage.has(k) && typeof v === 'string' && v.includes('.jpg')) {
        urlByImage.set(k, v);
      }
    }
  } catch {
    /* ok */
  }

  const catalog = [];
  for (const p of pins) {
    const mediaUrl = urlByImage.get(String(p.image));
    if (!mediaUrl) continue;
    catalog.push({
      image: String(p.image),
      mediaUrl,
      boardName: String(p.board || ''),
      title: String(p.title || '').slice(0, 100),
      description: String(p.description || '').slice(0, 800),
      link: String(p.link || 'https://www.luxseetarot.com/'),
    });
  }

  if (!dryRun) {
    fs.writeFileSync(OUT_CATALOG, JSON.stringify(catalog));
    fs.writeFileSync(OUT_MAP, JSON.stringify(Object.fromEntries(urlByImage), null, 2));
  }

  console.log(
    JSON.stringify(
      {
        dryRun,
        uploaded,
        reused,
        failed,
        catalogSize: catalog.length,
        errorSample: errors.slice(0, 8),
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
