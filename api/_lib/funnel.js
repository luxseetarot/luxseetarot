/** Funnel analytics: Upstash Redis se configurato, altrimenti memoria di processo. */

const memIps = new Map();
const memEvents = [];
const MEM_EVENTS_MAX = 400;
const IPS_INDEX_KEY = 'lux:ips';
const EVENTS_KEY = 'lux:events';

function dayKey(ts = Date.now()) {
  return new Date(ts).toISOString().slice(0, 10);
}

function normalizeIp(ip) {
  return String(ip || 'unknown').trim().slice(0, 80) || 'unknown';
}

export function funnelStorageMode() {
  const url = (process.env.UPSTASH_REDIS_REST_URL || '').trim();
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim();
  return url && token ? 'redis' : 'memory';
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
      const err = await res.text();
      console.error('Upstash error:', err);
      return null;
    }
    const data = await res.json();
    return data.result;
  } catch (e) {
    console.error('Upstash fetch failed:', e);
    return null;
  }
}

async function redisPipeline(commands) {
  const url = (process.env.UPSTASH_REDIS_REST_URL || '').trim();
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim();
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data.map((d) => d.result) : null;
  } catch (e) {
    console.error('Upstash pipeline failed:', e);
    return null;
  }
}

function ipKey(ip) {
  return `lux:ip:${normalizeIp(ip)}`;
}

function emptyProfile(ip) {
  return {
    ip: normalizeIp(ip),
    teaserTotal: 0,
    teaserToday: 0,
    teaserDay: dayKey(),
    purchaseTotal: 0,
    spentCents: 0,
    lastAmountCents: 0,
    lastTeaserAt: 0,
    lastPurchaseAt: 0,
    lastEmail: '',
    lastProduct: '',
    lastName: '',
    checkoutStarts: 0,
  };
}

const FREE_READINGS_PER_DAY = 2;

function memGet(ip) {
  const key = normalizeIp(ip);
  if (!memIps.has(key)) memIps.set(key, emptyProfile(key));
  const p = memIps.get(key);
  const today = dayKey();
  if (p.teaserDay !== today) {
    p.teaserDay = today;
    p.teaserToday = 0;
  }
  return p;
}

function pushMemEvent(event) {
  memEvents.unshift(event);
  if (memEvents.length > MEM_EVENTS_MAX) memEvents.length = MEM_EVENTS_MAX;
}

async function loadProfile(ip) {
  const key = ipKey(ip);
  if (funnelStorageMode() === 'redis') {
    const raw = await redisCommand(['HGETALL', key]);
    if (!raw || !raw.length) return emptyProfile(ip);
    const obj = {};
    for (let i = 0; i < raw.length; i += 2) obj[raw[i]] = raw[i + 1];
    const today = dayKey();
    const teaserDay = obj.teaserDay || today;
    return {
      ip: normalizeIp(ip),
      teaserTotal: parseInt(obj.teaserTotal || '0', 10) || 0,
      teaserToday: teaserDay === today ? parseInt(obj.teaserToday || '0', 10) || 0 : 0,
      teaserDay: teaserDay === today ? teaserDay : today,
      purchaseTotal: parseInt(obj.purchaseTotal || '0', 10) || 0,
      spentCents: parseInt(obj.spentCents || '0', 10) || 0,
      lastAmountCents: parseInt(obj.lastAmountCents || '0', 10) || 0,
      lastTeaserAt: parseInt(obj.lastTeaserAt || '0', 10) || 0,
      lastPurchaseAt: parseInt(obj.lastPurchaseAt || '0', 10) || 0,
      lastEmail: obj.lastEmail || '',
      lastProduct: obj.lastProduct || '',
      lastName: obj.lastName || '',
      checkoutStarts: parseInt(obj.checkoutStarts || '0', 10) || 0,
    };
  }
  return { ...memGet(ip) };
}

async function saveEvent(event) {
  const payload = JSON.stringify(event);
  if (funnelStorageMode() === 'redis') {
    await redisPipeline([
      ['LPUSH', EVENTS_KEY, payload],
      ['LTRIM', EVENTS_KEY, 0, MEM_EVENTS_MAX - 1],
    ]);
    return;
  }
  pushMemEvent(event);
}

/** True se l'IP può ancora fare una lettura gratuita oggi. Non incrementa. */
export async function canDoTeaserToday(ip, max = FREE_READINGS_PER_DAY) {
  const p = await loadProfile(ip);
  return p.teaserToday < max;
}

/** Registra anteprima gratuita e restituisce { ok, remainingToday, profile }. */
export async function recordTeaser({ ip, email = '', name = '' }) {
  const now = Date.now();
  const today = dayKey(now);
  const cleanIp = normalizeIp(ip);
  const max = FREE_READINGS_PER_DAY;

  if (funnelStorageMode() === 'redis') {
    const key = ipKey(cleanIp);
    const current = await loadProfile(cleanIp);
    if (current.teaserToday >= max) {
      return { ok: false, remainingToday: 0, profile: current };
    }
    const nextToday = current.teaserToday + 1;
    const nextTotal = current.teaserTotal + 1;
    await redisPipeline([
      [
        'HSET',
        key,
        'teaserTotal',
        String(nextTotal),
        'teaserToday',
        String(nextToday),
        'teaserDay',
        today,
        'lastTeaserAt',
        String(now),
        'lastEmail',
        String(email || current.lastEmail || '').slice(0, 120),
        'lastName',
        String(name || current.lastName || '').slice(0, 80),
      ],
      ['ZADD', IPS_INDEX_KEY, String(now), cleanIp],
    ]);
    const profile = {
      ...current,
      teaserTotal: nextTotal,
      teaserToday: nextToday,
      teaserDay: today,
      lastTeaserAt: now,
      lastEmail: String(email || current.lastEmail || '').slice(0, 120),
      lastName: String(name || current.lastName || '').slice(0, 80),
    };
    await saveEvent({
      type: 'teaser',
      at: now,
      ip: cleanIp,
      email: profile.lastEmail,
      name: profile.lastName,
      teaserToday: nextToday,
    });
    return { ok: true, remainingToday: Math.max(0, max - nextToday), profile };
  }

  const p = memGet(cleanIp);
  if (p.teaserToday >= max) {
    return { ok: false, remainingToday: 0, profile: { ...p } };
  }
  p.teaserToday += 1;
  p.teaserTotal += 1;
  p.teaserDay = today;
  p.lastTeaserAt = now;
  if (email) p.lastEmail = String(email).slice(0, 120);
  if (name) p.lastName = String(name).slice(0, 80);
  await saveEvent({
    type: 'teaser',
    at: now,
    ip: cleanIp,
    email: p.lastEmail,
    name: p.lastName,
    teaserToday: p.teaserToday,
  });
  return { ok: true, remainingToday: Math.max(0, max - p.teaserToday), profile: { ...p } };
}

export async function recordCheckoutStart({ ip, email = '', name = '', product = '' }) {
  const now = Date.now();
  const cleanIp = normalizeIp(ip);
  if (funnelStorageMode() === 'redis') {
    const key = ipKey(cleanIp);
    const current = await loadProfile(cleanIp);
    await redisPipeline([
      [
        'HSET',
        key,
        'checkoutStarts',
        String((current.checkoutStarts || 0) + 1),
        'lastEmail',
        String(email || current.lastEmail || '').slice(0, 120),
        'lastName',
        String(name || current.lastName || '').slice(0, 80),
        'lastProduct',
        String(product || current.lastProduct || '').slice(0, 40),
      ],
      ['ZADD', IPS_INDEX_KEY, String(now), cleanIp],
    ]);
  } else {
    const p = memGet(cleanIp);
    p.checkoutStarts += 1;
    if (email) p.lastEmail = String(email).slice(0, 120);
    if (name) p.lastName = String(name).slice(0, 80);
    if (product) p.lastProduct = String(product).slice(0, 40);
  }
  await saveEvent({
    type: 'checkout_start',
    at: now,
    ip: cleanIp,
    email: String(email || '').slice(0, 120),
    product: String(product || '').slice(0, 40),
  });
}

export async function recordPurchase({
  ip,
  email = '',
  name = '',
  product = '',
  sessionId = '',
  amountCents = 0,
}) {
  const now = Date.now();
  const cleanIp = normalizeIp(ip);
  const paid = Math.max(0, parseInt(amountCents, 10) || 0);
  if (funnelStorageMode() === 'redis') {
    const key = ipKey(cleanIp);
    const current = await loadProfile(cleanIp);
    const nextSpent = (current.spentCents || 0) + paid;
    await redisPipeline([
      [
        'HSET',
        key,
        'purchaseTotal',
        String((current.purchaseTotal || 0) + 1),
        'spentCents',
        String(nextSpent),
        'lastAmountCents',
        String(paid),
        'lastPurchaseAt',
        String(now),
        'lastEmail',
        String(email || current.lastEmail || '').slice(0, 120),
        'lastName',
        String(name || current.lastName || '').slice(0, 80),
        'lastProduct',
        String(product || current.lastProduct || '').slice(0, 40),
        'lastSessionId',
        String(sessionId || '').slice(0, 80),
      ],
      ['ZADD', IPS_INDEX_KEY, String(now), cleanIp],
    ]);
  } else {
    const p = memGet(cleanIp);
    p.purchaseTotal += 1;
    p.spentCents = (p.spentCents || 0) + paid;
    p.lastAmountCents = paid;
    p.lastPurchaseAt = now;
    if (email) p.lastEmail = String(email).slice(0, 120);
    if (name) p.lastName = String(name).slice(0, 80);
    if (product) p.lastProduct = String(product).slice(0, 40);
  }
  await saveEvent({
    type: 'purchase',
    at: now,
    ip: cleanIp,
    email: String(email || '').slice(0, 120),
    product: String(product || '').slice(0, 40),
    sessionId: String(sessionId || '').slice(0, 80),
    amountCents: paid,
  });
}

export async function resetTeaserDay(ip) {
  const cleanIp = normalizeIp(ip);
  const today = dayKey();
  if (funnelStorageMode() === 'redis') {
    await redisCommand([
      'HSET',
      ipKey(cleanIp),
      'teaserToday',
      '0',
      'teaserDay',
      today,
    ]);
  } else {
    const p = memGet(cleanIp);
    p.teaserToday = 0;
    p.teaserDay = today;
  }
  await saveEvent({ type: 'admin_reset_teaser', at: Date.now(), ip: cleanIp });
  return loadProfile(cleanIp);
}

/** Azzera tutti i contatori di un IP (mantiene email/nome se presenti). */
export async function resetIpCounters(ip) {
  const cleanIp = normalizeIp(ip);
  const current = await loadProfile(cleanIp);
  const today = dayKey();
  if (funnelStorageMode() === 'redis') {
    await redisCommand([
      'HSET',
      ipKey(cleanIp),
      'teaserTotal', '0',
      'teaserToday', '0',
      'teaserDay', today,
      'purchaseTotal', '0',
      'spentCents', '0',
      'lastAmountCents', '0',
      'lastTeaserAt', '0',
      'lastPurchaseAt', '0',
      'checkoutStarts', '0',
      'lastProduct', '',
      'lastSessionId', '',
      'lastEmail', String(current.lastEmail || '').slice(0, 120),
      'lastName', String(current.lastName || '').slice(0, 80),
    ]);
  } else {
    const p = memGet(cleanIp);
    const email = p.lastEmail || '';
    const name = p.lastName || '';
    Object.assign(p, emptyProfile(cleanIp), { lastEmail: email, lastName: name, teaserDay: today });
  }
  await saveEvent({ type: 'admin_reset_counters', at: Date.now(), ip: cleanIp });
  return loadProfile(cleanIp);
}

async function filterEventsRemoveIp(cleanIp) {
  if (funnelStorageMode() === 'redis') {
    const raw = (await redisCommand(['LRANGE', EVENTS_KEY, 0, MEM_EVENTS_MAX - 1])) || [];
    const kept = raw.filter((line) => {
      try {
        const e = JSON.parse(line);
        return normalizeIp(e.ip) !== cleanIp;
      } catch {
        return true;
      }
    });
    await redisCommand(['DEL', EVENTS_KEY]);
    if (kept.length) {
      // LPUSH in ordine inverso per mantenere i più recenti in testa
      const cmds = kept.reverse().map((line) => ['LPUSH', EVENTS_KEY, line]);
      cmds.push(['LTRIM', EVENTS_KEY, 0, MEM_EVENTS_MAX - 1]);
      await redisPipeline(cmds);
    }
    return;
  }
  for (let i = memEvents.length - 1; i >= 0; i--) {
    if (normalizeIp(memEvents[i].ip) === cleanIp) memEvents.splice(i, 1);
  }
}

/** Cancella profilo + eventi di un IP. */
export async function deleteIpData(ip) {
  const cleanIp = normalizeIp(ip);
  if (funnelStorageMode() === 'redis') {
    await redisPipeline([
      ['DEL', ipKey(cleanIp)],
      ['ZREM', IPS_INDEX_KEY, cleanIp],
    ]);
  } else {
    memIps.delete(cleanIp);
  }
  await filterEventsRemoveIp(cleanIp);
  await saveEvent({ type: 'admin_delete_ip', at: Date.now(), ip: cleanIp });
  return { ok: true, ip: cleanIp };
}

/** Azzera i contatori di tutti gli IP tracciati. */
export async function resetAllCounters() {
  const now = Date.now();
  const today = dayKey(now);
  if (funnelStorageMode() === 'redis') {
    const ips = (await redisCommand(['ZRANGE', IPS_INDEX_KEY, 0, -1])) || [];
    for (const ip of ips) {
      const cleanIp = normalizeIp(ip);
      const current = await loadProfile(cleanIp);
      await redisCommand([
        'HSET',
        ipKey(cleanIp),
        'teaserTotal', '0',
        'teaserToday', '0',
        'teaserDay', today,
        'purchaseTotal', '0',
        'spentCents', '0',
        'lastAmountCents', '0',
        'lastTeaserAt', '0',
        'lastPurchaseAt', '0',
        'checkoutStarts', '0',
        'lastProduct', '',
        'lastSessionId', '',
        'lastEmail', String(current.lastEmail || '').slice(0, 120),
        'lastName', String(current.lastName || '').slice(0, 80),
      ]);
    }
  } else {
    for (const p of memIps.values()) {
      const email = p.lastEmail || '';
      const name = p.lastName || '';
      Object.assign(p, emptyProfile(p.ip), { lastEmail: email, lastName: name, teaserDay: today });
    }
  }
  await saveEvent({ type: 'admin_reset_all_counters', at: now, ip: 'all' });
  return listFunnelStats({ limit: 100 });
}

export async function listFunnelStats({ limit = 80 } = {}) {
  const storage = funnelStorageMode();
  let profiles = [];

  if (storage === 'redis') {
    const ips = (await redisCommand(['ZREVRANGE', IPS_INDEX_KEY, 0, Math.max(0, limit - 1)])) || [];
    for (const ip of ips) {
      profiles.push(await loadProfile(ip));
    }
  } else {
    profiles = Array.from(memIps.values())
      .map((p) => {
        const today = dayKey();
        if (p.teaserDay !== today) {
          p.teaserDay = today;
          p.teaserToday = 0;
        }
        return { ...p };
      })
      .sort(
        (a, b) =>
          Math.max(b.lastPurchaseAt || 0, b.lastTeaserAt || 0) -
          Math.max(a.lastPurchaseAt || 0, a.lastTeaserAt || 0)
      )
      .slice(0, limit);
  }

  const teasers = profiles.reduce((s, p) => s + (p.teaserTotal || 0), 0);
  const teasersToday = profiles.reduce((s, p) => s + (p.teaserToday || 0), 0);
  const purchases = profiles.reduce((s, p) => s + (p.purchaseTotal || 0), 0);
  const checkoutStarts = profiles.reduce((s, p) => s + (p.checkoutStarts || 0), 0);
  const revenueCents = profiles.reduce((s, p) => s + (p.spentCents || 0), 0);
  const convertedIps = profiles.filter((p) => (p.purchaseTotal || 0) > 0 && (p.teaserTotal || 0) > 0).length;
  const teaserIps = profiles.filter((p) => (p.teaserTotal || 0) > 0).length;

  let events = [];
  if (storage === 'redis') {
    const raw = (await redisCommand(['LRANGE', EVENTS_KEY, 0, 79])) || [];
    events = raw
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  } else {
    events = memEvents.slice(0, 80);
  }

  return {
    storage,
    summary: {
      uniqueIps: profiles.length,
      teaserTotal: teasers,
      teaserToday: teasersToday,
      checkoutStarts,
      purchases,
      revenueCents,
      teaserIps,
      convertedIps,
      conversionRate:
        teaserIps > 0 ? Math.round((convertedIps / teaserIps) * 1000) / 10 : 0,
      freePerDay: FREE_READINGS_PER_DAY,
    },
    ips: profiles,
    events,
  };
}

export async function getIpDetail(ip) {
  return loadProfile(ip);
}
