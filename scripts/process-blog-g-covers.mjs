/**
 * Converte PNG copertine (assets) in images/blog/{slug}.jpg
 * Uso: dopo GenerateImage, copia i file plate/cover in assets con nome slug.png
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { getSeedArticlesG } from '../api/_lib/blog-seed-articles-g.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(
  process.env.USERPROFILE || '',
  '.cursor',
  'projects',
  'c-Users-asjhd-Desktop-backup-sito-tarocchi-italiano-06-06-2026',
  'assets',
);
const OUT = path.join(ROOT, 'images', 'blog');

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const posts = getSeedArticlesG();
  let ok = 0;
  let miss = 0;
  for (const p of posts) {
    const candidates = [
      path.join(ASSETS, `${p.slug}.png`),
      path.join(ASSETS, `cover-${p.slug}.png`),
      path.join(OUT, `${p.slug}.png`),
    ];
    const src = candidates.find((f) => fs.existsSync(f));
    if (!src) {
      miss++;
      continue;
    }
    const dest = path.join(OUT, `${p.slug}.jpg`);
    await sharp(src)
      .resize(1200, 675, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82 })
      .toFile(dest);
    ok++;
  }
  console.log(`covers ok=${ok} missing=${miss} out=${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
