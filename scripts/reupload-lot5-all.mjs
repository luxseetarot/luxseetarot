/**
 * Re-upload all lot5 pins (41–140) to Catbox in batches of 10.
 * Usage: node scripts/reupload-lot5-all.mjs
 */
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const script = path.join(ROOT, 'scripts', 'upload-lot5-catbox.mjs');

const starts = [41, 51, 61, 71, 81, 91, 101, 111, 121, 131];

function run(startId) {
  return new Promise((resolve, reject) => {
    console.log(`\n=== Batch startId=${startId} ===`);
    const child = spawn(process.execPath, [script, '10', String(startId)], {
      cwd: ROOT,
      stdio: 'inherit',
    });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`exit ${code} at ${startId}`))));
  });
}

async function main() {
  for (const s of starts) {
    await run(s);
  }
  console.log('\nAll batches uploaded.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
