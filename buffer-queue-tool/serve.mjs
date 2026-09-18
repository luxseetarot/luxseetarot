/**
 * Server locale Buffer Pin Queue + API schedulazione.
 * Usage: node buffer-queue-tool/serve.mjs
 *
 * Richiede BUFFER_API_KEY in buffer-queue-tool/.env
 * (crea da .env.example — chiave su https://publish.buffer.com/settings/api)
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec, spawn } from 'child_process';
import { loadEnvFromDisk, getAccountStatus, createPinterestPost, listChannelQueue } from './buffer-api.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = 8787;
const ENV_PATH = path.join(__dirname, '.env');
const STATE_PATH = path.join(__dirname, 'state.json');
const PINS_DATA = path.join(__dirname, 'pins-data.json');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.txt': 'text/plain; charset=utf-8',
};

function getApiKey() {
  const fileEnv = loadEnvFromDisk(fs, ENV_PATH);
  return (process.env.BUFFER_API_KEY || fileEnv.BUFFER_API_KEY || '').trim();
}

function readJson(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeState(patch) {
  const cur = readJson(STATE_PATH, { sentIds: [], scheduledIds: [], notes: '' });
  const next = { ...cur, ...patch };
  fs.writeFileSync(STATE_PATH, JSON.stringify(next, null, 2), 'utf8');
  return next;
}

function regenerateData() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(__dirname, 'generate-data.mjs')], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let err = '';
    child.stderr.on('data', (d) => { err += d; });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(err || `generate-data exit ${code}`))));
  });
}

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return Buffer.concat(chunks).toString('utf8');
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

async function handleApi(req, res, urlPath) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (urlPath === '/api/status' && req.method === 'GET') {
    const key = getApiKey();
    const pins = readJson(PINS_DATA, { summary: {}, freeQueueLimit: 10 });
    const state = readJson(STATE_PATH, { scheduledIds: [], sentIds: [] });
    const channelId = pins.channel?.bufferChannelId || null;
    const base = {
      hasApiKey: Boolean(key),
      envPath: ENV_PATH,
      freeQueueLimit: pins.freeQueueLimit || 10,
      localScheduled: (state.scheduledIds || []).length,
      localSent: (state.sentIds || []).length,
      summary: pins.summary || {},
      channelId,
    };
    if (!key) {
      sendJson(res, 200, { ...base, buffer: null, hint: 'Crea buffer-queue-tool/.env con BUFFER_API_KEY=…' });
      return;
    }
    try {
      const account = await getAccountStatus(key);
      const org = account.organizations?.[0];
      const limit = org?.limits?.scheduledPosts ?? base.freeQueueLimit;
      let queue = [];
      let queueError = null;
      try {
        if (org?.id && channelId) {
          queue = await listChannelQueue(key, {
            organizationId: org.id,
            channelId,
            first: Math.max(limit, 20),
          });
        }
      } catch (e) {
        queueError = String(e.message || e);
      }
      const used = queue.length;
      const freeSlots = Math.max(0, limit - used);
      sendJson(res, 200, {
        ...base,
        freeQueueLimit: limit,
        liveScheduled: used,
        freeSlots,
        queue,
        queueError,
        buffer: {
          timezone: account.timezone,
          currentTime: account.currentTime,
          organizationId: org?.id,
          organizationName: org?.name,
          scheduledPostsLimit: limit,
        },
      });
    } catch (e) {
      sendJson(res, 200, { ...base, buffer: null, error: String(e.message || e) });
    }
    return;
  }

  if (urlPath === '/api/schedule' && req.method === 'POST') {
    const key = getApiKey();
    if (!key) {
      sendJson(res, 400, {
        ok: false,
        error: 'Manca BUFFER_API_KEY. Crea buffer-queue-tool/.env (vedi .env.example).',
      });
      return;
    }
    let body;
    try {
      body = JSON.parse(await readBody(req));
    } catch {
      sendJson(res, 400, { ok: false, error: 'JSON non valido' });
      return;
    }
    const items = Array.isArray(body.items) ? body.items : [];
    if (!items.length) {
      sendJson(res, 400, { ok: false, error: 'Nessun pin nel batch' });
      return;
    }
    if (items.length > 10) {
      sendJson(res, 400, { ok: false, error: 'Buffer Free: max 10 pin per batch / in coda' });
      return;
    }

    const pinsData = readJson(PINS_DATA, {});
    const channelId = body.channelId || pinsData.channel?.bufferChannelId;
    if (!channelId) {
      sendJson(res, 400, { ok: false, error: 'channelId mancante' });
      return;
    }

    const results = [];
    const okIds = [];
    for (const item of items) {
      try {
        if (!item.mediaUrl) throw new Error('mediaUrl mancante');
        if (!item.boardServiceId) throw new Error('boardServiceId mancante');
        if (!item.when) throw new Error('when (dueAt) mancante');
        const post = await createPinterestPost(key, {
          channelId,
          text: item.description || item.title || '',
          dueAt: item.when,
          imageUrl: item.mediaUrl,
          title: item.title,
          link: item.link,
          boardServiceId: item.boardServiceId,
        });
        results.push({ id: item.id, ok: true, postId: post.id, dueAt: post.dueAt });
        okIds.push(item.id);
        // piccolo delay anti rate-limit
        await new Promise((r) => setTimeout(r, 350));
      } catch (e) {
        results.push({
          id: item.id,
          ok: false,
          error: String(e.message || e),
          code: e.code || null,
        });
        // se coda piena, interrompi
        if (e.code === 'LimitReachedError') break;
      }
    }

    if (okIds.length) {
      const state = readJson(STATE_PATH, { sentIds: [], scheduledIds: [] });
      const scheduled = new Set([...(state.scheduledIds || []), ...okIds]);
      writeState({
        scheduledIds: [...scheduled].sort((a, b) => a - b),
        notes: `${new Date().toISOString().slice(0, 10)}: schedulati da UI ${okIds.join(', ')}`,
      });
      try {
        await regenerateData();
      } catch (e) {
        console.error('generate-data after schedule:', e.message);
      }
    }

    const ok = results.filter((r) => r.ok).length;
    sendJson(res, 200, {
      ok: ok > 0,
      scheduled: ok,
      failed: results.length - ok,
      results,
      pinsData: readJson(PINS_DATA, null),
    });
    return;
  }

  if (urlPath === '/api/refresh-data' && req.method === 'POST') {
    try {
      await regenerateData();
      sendJson(res, 200, { ok: true, pinsData: readJson(PINS_DATA, null) });
    } catch (e) {
      sendJson(res, 500, { ok: false, error: String(e.message || e) });
    }
    return;
  }

  sendJson(res, 404, { ok: false, error: 'API not found' });
}

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);

    if (urlPath.startsWith('/api/')) {
      await handleApi(req, res, urlPath);
      return;
    }

    let rel = urlPath === '/' ? '/index.html' : urlPath;
    let filePath;
    if (rel.startsWith('/pinterest-pins/')) {
      filePath = path.join(ROOT, rel.slice(1));
    } else {
      filePath = path.join(__dirname, rel.replace(/^\//, ''));
    }
    const pinsRoot = path.join(ROOT, 'pinterest-pins');
    if (!filePath.startsWith(__dirname) && !filePath.startsWith(pinsRoot)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, max-age=0',
    });
    fs.createReadStream(filePath).pipe(res);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) sendJson(res, 500, { ok: false, error: String(e.message || e) });
  }
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    const url = `http://127.0.0.1:${PORT}/`;
    console.log(`Porta ${PORT} già occupata — server già attivo. Riapro Chrome.`);
    console.log('Per spegnere il server chiudi la finestra nera "Buffer Pin Queue".');
    openInChrome(url);
    setTimeout(() => process.exit(0), 800);
    return;
  }
  console.error(err);
  process.exit(1);
});

server.listen(PORT, () => {
  const url = `http://127.0.0.1:${PORT}/`;
  const key = getApiKey();
  console.log(`Buffer Pin Queue → ${url}`);
  console.log(key ? 'BUFFER_API_KEY: ok' : 'BUFFER_API_KEY: MANCANTE → crea buffer-queue-tool/.env');
  openInChrome(url);
});

function openInChrome(url) {
  if (process.platform === 'win32') {
    const candidates = [
      path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(process.env['PROGRAMFILES'] || 'C:\\Program Files', 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    ];
    const chromeExe = candidates.find((p) => p && fs.existsSync(p));
    if (chromeExe) {
      spawn(chromeExe, [url], { detached: true, stdio: 'ignore' }).unref();
      console.log(`Apro Chrome: ${chromeExe}`);
      return;
    }
    exec(`cmd /c start "" "${url}"`);
    console.log('Chrome non trovato — apro il browser predefinito');
    return;
  }
  if (process.platform === 'darwin') {
    exec(`open -a "Google Chrome" "${url}"`, (err) => {
      if (err) exec(`open "${url}"`);
    });
    return;
  }
  exec(`google-chrome "${url}" || chromium-browser "${url}" || xdg-open "${url}"`);
}
