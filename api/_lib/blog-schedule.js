/** Programmazione pubblicazione automatica bozze blog (+ Facebook via setPostStatus). */

import { funnelStorageMode } from './funnel.js';
import { listPosts, setPostStatus } from './blog.js';

const SCHEDULE_KEY = 'lux:blog:schedule';
const LOCK_KEY = 'lux:blog:schedule:lock';

let memSchedule = null;

function clampInt(n, min, max, fallback) {
  const v = parseInt(n, 10);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, v));
}

export function defaultSchedule() {
  return {
    enabled: false,
    intervalDays: 2,
    hour: 10,
    minute: 0,
    timezone: 'Europe/Rome',
    lastPublishedAt: null,
    lastPublishedSlug: null,
    lastRunAt: null,
    lastError: null,
    lastResult: null,
  };
}

export function sanitizeSchedule(raw = {}) {
  const base = defaultSchedule();
  const enabled = !!(raw && (raw.enabled === true || raw.enabled === 'true' || raw.enabled === 1));
  return {
    ...base,
    ...raw,
    enabled,
    intervalDays: clampInt(raw.intervalDays, 1, 30, base.intervalDays),
    // Solo 8/9/10: allineate ai 2 cron GitHub mattutini (minuti Actions)
    hour: [8, 9, 10].includes(parseInt(raw.hour, 10))
      ? parseInt(raw.hour, 10)
      : base.hour,
    minute: 0,
    timezone: 'Europe/Rome',
    lastPublishedAt: raw.lastPublishedAt ? String(raw.lastPublishedAt) : null,
    lastPublishedSlug: raw.lastPublishedSlug ? String(raw.lastPublishedSlug).slice(0, 80) : null,
    lastRunAt: raw.lastRunAt ? String(raw.lastRunAt) : null,
    lastError: raw.lastError ? String(raw.lastError).slice(0, 400) : null,
    lastResult: raw.lastResult ? String(raw.lastResult).slice(0, 200) : null,
  };
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
      console.error('Upstash schedule error:', await res.text());
      return null;
    }
    const data = await res.json();
    return data.result;
  } catch (e) {
    console.error('Upstash schedule fetch failed:', e);
    return null;
  }
}

export async function getBlogSchedule() {
  if (funnelStorageMode() === 'redis') {
    const raw = await redisCommand(['GET', SCHEDULE_KEY]);
    if (!raw) return defaultSchedule();
    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      return sanitizeSchedule(parsed || {});
    } catch {
      return defaultSchedule();
    }
  }
  return sanitizeSchedule(memSchedule || {});
}

export async function saveBlogSchedule(input) {
  const prev = await getBlogSchedule();
  const next = sanitizeSchedule({
    ...prev,
    ...input,
    // Campi runtime solo se passati esplicitamente
    lastPublishedAt:
      input && Object.prototype.hasOwnProperty.call(input, 'lastPublishedAt')
        ? input.lastPublishedAt
        : prev.lastPublishedAt,
    lastPublishedSlug:
      input && Object.prototype.hasOwnProperty.call(input, 'lastPublishedSlug')
        ? input.lastPublishedSlug
        : prev.lastPublishedSlug,
    lastRunAt:
      input && Object.prototype.hasOwnProperty.call(input, 'lastRunAt')
        ? input.lastRunAt
        : prev.lastRunAt,
    lastError:
      input && Object.prototype.hasOwnProperty.call(input, 'lastError')
        ? input.lastError
        : prev.lastError,
    lastResult:
      input && Object.prototype.hasOwnProperty.call(input, 'lastResult')
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

/** Parti data/ora in Europe/Rome. */
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

/** Prossima bozza in coda: più vecchia per createdAt. */
export async function pickNextDraft() {
  const drafts = await listPosts({ status: 'draft', includeDeleted: false });
  if (!drafts.length) return null;
  drafts.sort((a, b) => {
    const ta = new Date(a.createdAt || a.updatedAt || 0).getTime();
    const tb = new Date(b.createdAt || b.updatedAt || 0).getTime();
    return ta - tb;
  });
  return drafts[0];
}

export function isPublishDue(schedule, now = new Date()) {
  if (!schedule || !schedule.enabled) {
    return { due: false, reason: 'disabled' };
  }
  const rome = getRomeParts(now);
  // GitHub gira poche volte al mattino: pubblica dalla ora scelta in poi (stesso giorno).
  if (rome.hour < schedule.hour) {
    return { due: false, reason: 'before_hour', rome };
  }

  const todayKey = romeDateKey(now);
  if (schedule.lastPublishedAt) {
    const lastKey = romeDateKey(new Date(schedule.lastPublishedAt));
    if (lastKey === todayKey) {
      return { due: false, reason: 'already_today', rome };
    }
    const gap = daysBetweenRomeKeys(lastKey, todayKey);
    if (gap < schedule.intervalDays) {
      return { due: false, reason: 'interval', gap, need: schedule.intervalDays, rome };
    }
  }
  return { due: true, reason: 'ok', rome };
}

export function describeNextSlot(schedule, now = new Date()) {
  if (!schedule || !schedule.enabled) return 'Programmazione disattivata.';
  const draftsNote = 'Pubblica la bozza più vecchia + post Facebook.';
  const time = `${String(schedule.hour).padStart(2, '0')}:${String(schedule.minute).padStart(2, '0')} (ora Italia)`;
  const every = schedule.intervalDays === 1 ? 'ogni giorno' : `ogni ${schedule.intervalDays} giorni`;
  if (!schedule.lastPublishedAt) {
    return `Attiva: ${every} alle ${time}. Prima pubblicazione alla prossima ora utile. ${draftsNote}`;
  }
  const lastKey = romeDateKey(new Date(schedule.lastPublishedAt));
  const todayKey = romeDateKey(now);
  const gap = daysBetweenRomeKeys(lastKey, todayKey);
  const remain = Math.max(0, schedule.intervalDays - gap);
  if (remain === 0) {
    return `Attiva: ${every} alle ${time}. Prossima finestra: oggi o al prossimo passaggio cron. ${draftsNote}`;
  }
  return `Attiva: ${every} alle ${time}. Ultima: ${lastKey}. Prossima tra circa ${remain} giorno/i. ${draftsNote}`;
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

/**
 * Esegue un giro di pubblicazione se dovuto.
 * options.force = true ignora orario/intervallo (test admin).
 */
export async function runScheduledBlogPublish({ force = false } = {}) {
  const locked = await acquireLock();
  if (!locked) {
    return { ok: true, skipped: true, reason: 'locked' };
  }

  try {
    let schedule = await getBlogSchedule();
    const now = new Date();
    const nowIso = now.toISOString();

    if (!force) {
      const check = isPublishDue(schedule, now);
      if (!check.due) {
        schedule = (
          await saveBlogSchedule({
            lastRunAt: nowIso,
            lastError: null,
            lastResult: `skip:${check.reason}`,
          })
        ).schedule;
        return { ok: true, skipped: true, reason: check.reason, schedule };
      }
    }

    const draft = await pickNextDraft();
    if (!draft) {
      schedule = (
        await saveBlogSchedule({
          lastRunAt: nowIso,
          lastError: null,
          lastResult: 'skip:no_drafts',
        })
      ).schedule;
      return { ok: true, skipped: true, reason: 'no_drafts', schedule };
    }

    const published = await setPostStatus(draft.slug, 'published');
    if (!published.ok) {
      schedule = (
        await saveBlogSchedule({
          lastRunAt: nowIso,
          lastError: published.error || 'Publish fallito',
          lastResult: 'error',
        })
      ).schedule;
      return { ok: false, error: published.error || 'Publish fallito', schedule };
    }

    const fb = published.facebook;
    const fbOk = !!(fb && fb.ok && !fb.skipped);
    const fbNote = fb
      ? fbOk
        ? 'facebook_ok'
        : fb.alreadyPosted
          ? 'facebook_already'
          : fb.skipped
            ? 'facebook_skipped'
            : `facebook_err:${fb.error || '?'}`
      : 'facebook_none';

    schedule = (
      await saveBlogSchedule({
        lastPublishedAt: nowIso,
        lastPublishedSlug: draft.slug,
        lastRunAt: nowIso,
        lastError: fb && !fb.ok && !fb.skipped ? String(fb.error || '').slice(0, 400) : null,
        lastResult: `published:${draft.slug}:${fbNote}`,
      })
    ).schedule;

    return {
      ok: true,
      published: true,
      slug: draft.slug,
      post: published.post,
      facebook: fb || null,
      schedule,
    };
  } finally {
    await releaseLock();
  }
}
