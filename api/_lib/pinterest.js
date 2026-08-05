/** Pinterest API v5: OAuth, boards, create pin, coda e schedule. */

import { funnelStorageMode } from './funnel.js';

const AUTH_KEY = 'lux:pinterest:auth';
const QUEUE_KEY = 'lux:pinterest:queue';
const SCHEDULE_KEY = 'lux:pinterest:schedule';
const LOCK_KEY = 'lux:pinterest:lock';

let memAuth = null;
let memQueue = [];
let memSchedule = null;

const SCOPES = [
  'boards:read',
  'boards:write',
  'pins:read',
  'pins:write',
  'user_accounts:read',
].join(',');

function siteOrigin() {
  const raw = (process.env.SITE_URL || 'https://www.luxseetarot.com').trim();
  return raw.replace(/\/$/, '') || 'https://www.luxseetarot.com';
}

function appCredentials() {
  const appId = (process.env.PINTEREST_APP_ID || '').trim();
  const appSecret = (process.env.PINTEREST_APP_SECRET || '').trim();
  return { appId, appSecret, ok: !!(appId && appSecret) };
}

export function pinterestConfigured() {
  return appCredentials().ok;
}

export function pinterestRedirectUri() {
  return `${siteOrigin()}/api/pinterest-oauth-callback`;
}

async function redisCommand(cmd) {
  const url = (process.env.UPSTASH_REDIS_REST_URL || '').trim();
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim();
  if (!url || !token) return null;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cmd),
    });
    if (!res.ok) {
      console.error('Upstash pinterest error:', await res.text());
      return null;
    }
    const data = await res.json();
    return data.result;
  } catch (e) {
    console.error('Upstash pinterest fetch failed:', e);
    return null;
  }
}

function clampInt(n, min, max, fallback) {
  const v = parseInt(n, 10);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, v));
}

export function defaultPinterestSchedule() {
  return {
    enabled: false,
    intervalDays: 1,
    hour: 9,
    minute: 0,
    timezone: 'Europe/Rome',
    lastPublishedAt: null,
    lastPublishedId: null,
    lastRunAt: null,
    lastError: null,
    lastResult: null,
  };
}

export function sanitizePinterestSchedule(raw = {}) {
  const base = defaultPinterestSchedule();
  const enabled = !!(raw && (raw.enabled === true || raw.enabled === 'true' || raw.enabled === 1));
  return {
    ...base,
    ...raw,
    enabled,
    intervalDays: clampInt(raw.intervalDays, 1, 30, base.intervalDays),
    hour: [8, 9, 10].includes(parseInt(raw.hour, 10))
      ? parseInt(raw.hour, 10)
      : base.hour,
    minute: 0,
    timezone: 'Europe/Rome',
    lastPublishedAt: raw.lastPublishedAt ? String(raw.lastPublishedAt) : null,
    lastPublishedId: raw.lastPublishedId ? String(raw.lastPublishedId).slice(0, 80) : null,
    lastRunAt: raw.lastRunAt ? String(raw.lastRunAt) : null,
    lastError: raw.lastError ? String(raw.lastError).slice(0, 400) : null,
    lastResult: raw.lastResult ? String(raw.lastResult).slice(0, 200) : null,
  };
}

export async function getPinterestSchedule() {
  if (funnelStorageMode() === 'redis') {
    const raw = await redisCommand(['GET', SCHEDULE_KEY]);
    if (!raw) return defaultPinterestSchedule();
    try {
      return sanitizePinterestSchedule(
        typeof raw === 'string' ? JSON.parse(raw) : raw || {}
      );
    } catch {
      return defaultPinterestSchedule();
    }
  }
  return sanitizePinterestSchedule(memSchedule || {});
}

export async function savePinterestSchedule(input) {
  const prev = await getPinterestSchedule();
  const next = sanitizePinterestSchedule({
    ...prev,
    ...input,
    lastPublishedAt: Object.prototype.hasOwnProperty.call(input || {}, 'lastPublishedAt')
      ? input.lastPublishedAt
      : prev.lastPublishedAt,
    lastPublishedId: Object.prototype.hasOwnProperty.call(input || {}, 'lastPublishedId')
      ? input.lastPublishedId
      : prev.lastPublishedId,
    lastRunAt: Object.prototype.hasOwnProperty.call(input || {}, 'lastRunAt')
      ? input.lastRunAt
      : prev.lastRunAt,
    lastError: Object.prototype.hasOwnProperty.call(input || {}, 'lastError')
      ? input.lastError
      : prev.lastError,
    lastResult: Object.prototype.hasOwnProperty.call(input || {}, 'lastResult')
      ? input.lastResult
      : prev.lastResult,
  });
  if (funnelStorageMode() === 'redis') {
    await redisCommand(['SET', SCHEDULE_KEY, JSON.stringify(next)]);
  } else {
    memSchedule = next;
  }
  return { ok: true, schedule: next };
}

export async function getPinterestAuth() {
  if (funnelStorageMode() === 'redis') {
    const raw = await redisCommand(['GET', AUTH_KEY]);
    if (!raw) return null;
    try {
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      return null;
    }
  }
  return memAuth;
}

export async function savePinterestAuth(auth) {
  const payload = {
    accessToken: String(auth.accessToken || '').trim(),
    refreshToken: String(auth.refreshToken || '').trim(),
    expiresAt: auth.expiresAt || null,
    scope: String(auth.scope || '').trim(),
    tokenType: String(auth.tokenType || 'bearer').trim(),
    updatedAt: new Date().toISOString(),
  };
  if (funnelStorageMode() === 'redis') {
    await redisCommand(['SET', AUTH_KEY, JSON.stringify(payload)]);
  } else {
    memAuth = payload;
  }
  return payload;
}

export async function clearPinterestAuth() {
  if (funnelStorageMode() === 'redis') {
    await redisCommand(['DEL', AUTH_KEY]);
  } else {
    memAuth = null;
  }
}

export function buildPinterestAuthUrl(state) {
  const { appId, ok } = appCredentials();
  if (!ok) return null;
  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: pinterestRedirectUri(),
    response_type: 'code',
    scope: SCOPES,
    state: String(state || 'lux'),
  });
  return `https://www.pinterest.com/oauth/?${params.toString()}`;
}

export async function exchangePinterestCode(code) {
  const { appId, appSecret, ok } = appCredentials();
  if (!ok) return { ok: false, error: 'PINTEREST_APP_ID / PINTEREST_APP_SECRET mancanti.' };
  const basic = Buffer.from(`${appId}:${appSecret}`).toString('base64');
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: String(code || '').trim(),
    redirect_uri: pinterestRedirectUri(),
  });
  const res = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return {
      ok: false,
      error: (data && (data.message || data.error)) || `OAuth HTTP ${res.status}`,
    };
  }
  const expiresIn = parseInt(data.expires_in, 10) || 0;
  const auth = await savePinterestAuth({
    accessToken: data.access_token,
    refreshToken: data.refresh_token || '',
    expiresAt: expiresIn
      ? new Date(Date.now() + expiresIn * 1000).toISOString()
      : null,
    scope: data.scope || SCOPES,
    tokenType: data.token_type || 'bearer',
  });
  return { ok: true, auth };
}

async function refreshAccessToken(auth) {
  const { appId, appSecret, ok } = appCredentials();
  if (!ok || !auth || !auth.refreshToken) return null;
  const basic = Buffer.from(`${appId}:${appSecret}`).toString('base64');
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: auth.refreshToken,
  });
  const res = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    console.error('Pinterest refresh failed:', data);
    return null;
  }
  const expiresIn = parseInt(data.expires_in, 10) || 0;
  return savePinterestAuth({
    accessToken: data.access_token,
    refreshToken: data.refresh_token || auth.refreshToken,
    expiresAt: expiresIn
      ? new Date(Date.now() + expiresIn * 1000).toISOString()
      : auth.expiresAt,
    scope: data.scope || auth.scope,
    tokenType: data.token_type || 'bearer',
  });
}

export async function getValidAccessToken() {
  let auth = await getPinterestAuth();
  if (!auth || !auth.accessToken) return null;
  if (auth.expiresAt) {
    const exp = new Date(auth.expiresAt).getTime();
    if (Number.isFinite(exp) && exp - Date.now() < 5 * 60 * 1000) {
      auth = (await refreshAccessToken(auth)) || auth;
    }
  }
  return auth.accessToken || null;
}

async function pinterestFetch(path, { method = 'GET', body = null } = {}) {
  const token = await getValidAccessToken();
  if (!token) {
    return { ok: false, error: 'Pinterest non collegato. Usa Collega Pinterest in admin.' };
  }
  const res = await fetch(`https://api.pinterest.com/v5${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      (data && (data.message || (data.error && data.error.message))) ||
      `Pinterest HTTP ${res.status}`;
    return { ok: false, error: String(msg).slice(0, 400), status: res.status, data };
  }
  return { ok: true, data };
}

export async function listPinterestBoards() {
  const out = [];
  let bookmark = null;
  for (let page = 0; page < 10; page++) {
    const qs = new URLSearchParams({ page_size: '50' });
    if (bookmark) qs.set('bookmark', bookmark);
    const res = await pinterestFetch(`/boards?${qs.toString()}`);
    if (!res.ok) return res;
    const items = (res.data && res.data.items) || [];
    items.forEach((b) => {
      out.push({
        id: String(b.id || ''),
        name: String(b.name || ''),
        privacy: String(b.privacy || ''),
        pinCount: b.pin_count != null ? b.pin_count : null,
      });
    });
    bookmark = res.data && res.data.bookmark;
    if (!bookmark) break;
  }
  return { ok: true, boards: out };
}

export async function createPinterestPin({
  boardId,
  imageUrl,
  title,
  description,
  link,
  altText,
}) {
  const payload = {
    board_id: String(boardId || '').trim(),
    title: String(title || '').trim().slice(0, 100),
    description: String(description || '').trim().slice(0, 800),
    link: String(link || '').trim().slice(0, 2048) || undefined,
    alt_text: String(altText || title || '').trim().slice(0, 500) || undefined,
    media_source: {
      source_type: 'image_url',
      url: String(imageUrl || '').trim(),
    },
  };
  if (!payload.board_id || !payload.media_source.url) {
    return { ok: false, error: 'boardId e imageUrl obbligatori.' };
  }
  const res = await pinterestFetch('/pins', { method: 'POST', body: payload });
  if (!res.ok) return res;
  return {
    ok: true,
    pin: {
      id: String((res.data && res.data.id) || ''),
      title: payload.title,
    },
  };
}

function sanitizeQueueItem(raw) {
  if (!raw || !raw.image) return null;
  return {
    id: String(raw.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
    image: String(raw.image || '').trim().slice(0, 200),
    boardName: String(raw.boardName || '').trim().slice(0, 120),
    boardId: String(raw.boardId || '').trim().slice(0, 80),
    title: String(raw.title || '').trim().slice(0, 100),
    description: String(raw.description || '').trim().slice(0, 800),
    link: String(raw.link || siteOrigin()).trim().slice(0, 2048),
    status: ['pending', 'published', 'error'].includes(raw.status) ? raw.status : 'pending',
    pinterestPinId: String(raw.pinterestPinId || '').trim().slice(0, 80) || null,
    error: raw.error ? String(raw.error).slice(0, 400) : null,
    createdAt: raw.createdAt || new Date().toISOString(),
    publishedAt: raw.publishedAt || null,
  };
}

export async function getPinterestQueue() {
  if (funnelStorageMode() === 'redis') {
    const raw = await redisCommand(['GET', QUEUE_KEY]);
    if (!raw) return [];
    try {
      const arr = typeof raw === 'string' ? JSON.parse(raw) : raw;
      return (Array.isArray(arr) ? arr : []).map(sanitizeQueueItem).filter(Boolean);
    } catch {
      return [];
    }
  }
  return (memQueue || []).map(sanitizeQueueItem).filter(Boolean);
}

async function savePinterestQueue(items) {
  const clean = (items || []).map(sanitizeQueueItem).filter(Boolean);
  if (funnelStorageMode() === 'redis') {
    await redisCommand(['SET', QUEUE_KEY, JSON.stringify(clean)]);
  } else {
    memQueue = clean;
  }
  return clean;
}

export function publicPinImageUrl(imageFile) {
  const name = String(imageFile || '')
    .replace(/^.*[\\/]/, '')
    .trim();
  return `${siteOrigin()}/pinterest-pins/${encodeURIComponent(name)}`;
}

/** Seed da catalogo statico (lotto attuale). */
export async function seedPinterestQueue(catalog, { replacePending = false } = {}) {
  const queue = await getPinterestQueue();
  const boardsRes = await listPinterestBoards();
  const boards = boardsRes.ok ? boardsRes.boards : [];
  const byName = new Map(boards.map((b) => [b.name.toLowerCase(), b.id]));

  let next = replacePending ? queue.filter((q) => q.status !== 'pending') : [...queue];
  const existingImages = new Set(next.map((q) => q.image));
  let added = 0;

  for (const item of catalog || []) {
    const image = String(item.image || '').trim();
    if (!image || existingImages.has(image)) continue;
    const boardName = String(item.boardName || '').trim();
    const boardId = byName.get(boardName.toLowerCase()) || '';
    next.push(
      sanitizeQueueItem({
        image,
        boardName,
        boardId,
        title: item.title,
        description: item.description,
        link: item.link || siteOrigin(),
        status: 'pending',
      })
    );
    existingImages.add(image);
    added += 1;
  }

  await savePinterestQueue(next);
  return {
    ok: true,
    added,
    total: next.length,
    pending: next.filter((q) => q.status === 'pending').length,
    boardsMissing: (catalog || [])
      .map((c) => c.boardName)
      .filter((n, i, a) => a.indexOf(n) === i)
      .filter((n) => n && !byName.has(String(n).toLowerCase())),
    boardsOk: boardsRes.ok,
    boardsError: boardsRes.ok ? null : boardsRes.error,
  };
}

export function getRomeParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
  let hour = parseInt(parts.hour, 10);
  if (hour === 24) hour = 0;
  return {
    year: parseInt(parts.year, 10),
    month: parseInt(parts.month, 10),
    day: parseInt(parts.day, 10),
    hour,
    minute: parseInt(parts.minute, 10),
  };
}

function romeDateKey(date) {
  const p = getRomeParts(date);
  return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
}

function daysBetweenRomeKeys(fromKey, toKey) {
  const a = Date.parse(`${fromKey}T12:00:00Z`);
  const b = Date.parse(`${toKey}T12:00:00Z`);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
  return Math.floor((b - a) / 86400000);
}

export function isPinterestPublishDue(schedule, now = new Date()) {
  if (!schedule || !schedule.enabled) return { due: false, reason: 'disabled' };
  const rome = getRomeParts(now);
  if (rome.hour < schedule.hour) return { due: false, reason: 'before_hour', rome };
  const todayKey = romeDateKey(now);
  if (schedule.lastPublishedAt) {
    const lastKey = romeDateKey(new Date(schedule.lastPublishedAt));
    if (lastKey === todayKey) return { due: false, reason: 'already_today', rome };
    const gap = daysBetweenRomeKeys(lastKey, todayKey);
    if (gap < schedule.intervalDays) {
      return { due: false, reason: 'interval', gap, need: schedule.intervalDays, rome };
    }
  }
  return { due: true, reason: 'ok', rome };
}

export function describePinterestSchedule(schedule) {
  if (!schedule || !schedule.enabled) return 'Programmazione Pinterest disattivata.';
  const every = schedule.intervalDays === 1 ? 'ogni giorno' : `ogni ${schedule.intervalDays} giorni`;
  const time = `${String(schedule.hour).padStart(2, '0')}:00 (ora Italia)`;
  return `Attiva: ${every} alle ${time}. Pubblica il prossimo pin in coda.`;
}

async function acquireLock() {
  if (funnelStorageMode() !== 'redis') return true;
  const got = await redisCommand(['SET', LOCK_KEY, String(Date.now()), 'EX', 120, 'NX']);
  return got === 'OK' || got === true;
}

async function releaseLock() {
  if (funnelStorageMode() !== 'redis') return;
  await redisCommand(['DEL', LOCK_KEY]);
}

export async function pickNextPendingPin(queue) {
  return (queue || []).find((q) => q.status === 'pending') || null;
}

export async function runScheduledPinterestPublish({ force = false } = {}) {
  const locked = await acquireLock();
  if (!locked) return { ok: true, skipped: true, reason: 'locked' };

  try {
    let schedule = await getPinterestSchedule();
    const now = new Date();
    const nowIso = now.toISOString();

    if (!force) {
      const check = isPinterestPublishDue(schedule, now);
      if (!check.due) {
        schedule = (
          await savePinterestSchedule({
            lastRunAt: nowIso,
            lastError: null,
            lastResult: `skip:${check.reason}`,
          })
        ).schedule;
        return { ok: true, skipped: true, reason: check.reason, schedule };
      }
    }

    const token = await getValidAccessToken();
    if (!token) {
      schedule = (
        await savePinterestSchedule({
          lastRunAt: nowIso,
          lastError: 'Pinterest non collegato',
          lastResult: 'error:not_connected',
        })
      ).schedule;
      return { ok: false, error: 'Pinterest non collegato.', schedule };
    }

    let queue = await getPinterestQueue();
    let next = await pickNextPendingPin(queue);
    if (!next) {
      schedule = (
        await savePinterestSchedule({
          lastRunAt: nowIso,
          lastError: null,
          lastResult: 'skip:no_pending',
        })
      ).schedule;
      return { ok: true, skipped: true, reason: 'no_pending', schedule };
    }

    let boardId = next.boardId;
    if (!boardId && next.boardName) {
      const boardsRes = await listPinterestBoards();
      if (boardsRes.ok) {
        const match = boardsRes.boards.find(
          (b) => b.name.toLowerCase() === next.boardName.toLowerCase()
        );
        if (match) boardId = match.id;
      }
    }
    if (!boardId) {
      next.status = 'error';
      next.error = `Bacheca non trovata: ${next.boardName || '?'}`;
      queue = queue.map((q) => (q.id === next.id ? next : q));
      await savePinterestQueue(queue);
      schedule = (
        await savePinterestSchedule({
          lastRunAt: nowIso,
          lastError: next.error,
          lastResult: 'error:board',
        })
      ).schedule;
      return { ok: false, error: next.error, schedule };
    }

    const created = await createPinterestPin({
      boardId,
      imageUrl: publicPinImageUrl(next.image),
      title: next.title,
      description: next.description,
      link: next.link,
      altText: next.title,
    });

    if (!created.ok) {
      next.status = 'error';
      next.error = created.error || 'Create pin fallito';
      queue = queue.map((q) => (q.id === next.id ? next : q));
      await savePinterestQueue(queue);
      schedule = (
        await savePinterestSchedule({
          lastRunAt: nowIso,
          lastError: next.error,
          lastResult: 'error:create',
        })
      ).schedule;
      return { ok: false, error: next.error, schedule };
    }

    next.status = 'published';
    next.boardId = boardId;
    next.pinterestPinId = created.pin.id;
    next.publishedAt = nowIso;
    next.error = null;
    queue = queue.map((q) => (q.id === next.id ? next : q));
    await savePinterestQueue(queue);

    schedule = (
      await savePinterestSchedule({
        lastPublishedAt: nowIso,
        lastPublishedId: next.id,
        lastRunAt: nowIso,
        lastError: null,
        lastResult: `published:${next.id}:${created.pin.id}`,
      })
    ).schedule;

    return {
      ok: true,
      published: true,
      item: next,
      pin: created.pin,
      schedule,
    };
  } finally {
    await releaseLock();
  }
}

export async function pinterestStatus() {
  const configured = pinterestConfigured();
  const auth = await getPinterestAuth();
  const schedule = await getPinterestSchedule();
  const queue = await getPinterestQueue();
  let boards = [];
  let boardsError = null;
  if (auth && auth.accessToken) {
    const res = await listPinterestBoards();
    if (res.ok) boards = res.boards;
    else boardsError = res.error;
  }
  return {
    ok: true,
    configured,
    connected: !!(auth && auth.accessToken),
    scope: auth ? auth.scope : null,
    updatedAt: auth ? auth.updatedAt : null,
    schedule,
    scheduleHint: describePinterestSchedule(schedule),
    queueCounts: {
      total: queue.length,
      pending: queue.filter((q) => q.status === 'pending').length,
      published: queue.filter((q) => q.status === 'published').length,
      error: queue.filter((q) => q.status === 'error').length,
    },
    boards,
    boardsError,
    redirectUri: pinterestRedirectUri(),
  };
}
