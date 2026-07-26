import crypto from 'crypto';
import zlib from 'zlib';

const readingHits = new Map();
const READING_CHUNK = 450;
const READING_MAX_CHUNKS = 40;

export function getUnlockSecret() {
  return process.env.UNLOCK_SECRET || process.env.STRIPE_SECRET_KEY || '';
}

export function signUnlock({ sessionId, credits, exp }) {
  const secret = getUnlockSecret();
  const payload = Buffer.from(JSON.stringify({ sessionId, credits, exp })).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifyUnlockToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const secret = getUnlockSecret();
  if (!secret) return null;
  const [payload, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  if (sig !== expected) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (!data.sessionId || typeof data.credits !== 'number' || !data.exp) return null;
    if (Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

/** Pass breve post-teaser: consente il checkout senza riusare il token Turnstile (già consumato). */
export function signCheckoutPass({ email, exp }) {
  const secret = getUnlockSecret();
  const payload = Buffer.from(JSON.stringify({
    t: 'checkout',
    email: String(email || '').trim().toLowerCase(),
    exp,
  })).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifyCheckoutPass(token, email) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const secret = getUnlockSecret();
  if (!secret) return null;
  const [payload, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  if (sig !== expected) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (data.t !== 'checkout' || !data.email || !data.exp) return null;
    if (Date.now() > data.exp) return null;
    const want = String(email || '').trim().toLowerCase();
    if (want && data.email !== want) return null;
    return data;
  } catch {
    return null;
  }
}

/** Crediti persistenti su metadata Stripe (sopravvive a cookie cancellati se hai sessionId/email). */
export async function getSessionCredits(stripe, sessionId) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== 'paid') {
    return { ok: false, error: 'Pagamento non completato.' };
  }
  const max = parseInt(session.metadata?.credits || '1', 10) || 1;
  const used = parseInt(session.metadata?.credits_used || '0', 10) || 0;
  return {
    ok: true,
    session,
    max,
    used,
    remaining: Math.max(0, max - used),
    product: session.metadata?.product || 'full',
    email: session.customer_details?.email || session.customer_email || session.metadata?.email || '',
  };
}

export async function consumeCreditStripe(stripe, sessionId) {
  const info = await getSessionCredits(stripe, sessionId);
  if (!info.ok) return info;
  if (info.remaining <= 0) return { ok: false, remaining: 0, max: info.max, used: info.used, email: info.email };
  const nextUsed = info.used + 1;
  const remaining = Math.max(0, info.max - nextUsed);
  await stripe.checkout.sessions.update(sessionId, {
    metadata: {
      ...(info.session.metadata || {}),
      credits_used: String(nextUsed),
    },
  });
  return {
    ok: true,
    remaining,
    max: info.max,
    used: nextUsed,
    email: info.email,
    product: info.product,
  };
}

export function checkRateLimit(ip, { max = 20, windowMs = 60 * 60 * 1000 } = {}) {
  const key = ip || 'unknown';
  const now = Date.now();
  let entry = readingHits.get(key);
  if (!entry || now - entry.start > windowMs) {
    entry = { start: now, count: 0 };
  }
  entry.count += 1;
  readingHits.set(key, entry);
  return entry.count <= max;
}

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/** Serializza la lettura in chunk metadata Stripe (limite 500 char/valore). */
export function encodeReadingMeta(reading, previousMeta = {}) {
  const prevN = parseInt(previousMeta?.rd_n || '0', 10) || 0;
  const meta = { rd_n: '0' };
  for (let i = 1; i <= prevN; i++) meta[`rd_${i}`] = '';

  if (!reading || !reading.form || !Array.isArray(reading.cards) || !reading.cards.length) {
    return meta;
  }
  if (!reading.teaserText && !reading.fullText) {
    return meta;
  }

  const payload = {
    form: {
      name: String(reading.form.name || '').slice(0, 80),
      birthDate: String(reading.form.birthDate || '').slice(0, 32),
      email: String(reading.form.email || '').slice(0, 120),
      question: String(reading.form.question || '').slice(0, 500),
    },
    cards: reading.cards.slice(0, 3).map((c) => String(c || '').slice(0, 64)),
    teaserText: reading.teaserText ? String(reading.teaserText).slice(0, 8000) : null,
    fullText: reading.fullText ? String(reading.fullText).slice(0, 12000) : null,
  };
  const b64 = zlib.gzipSync(Buffer.from(JSON.stringify(payload), 'utf8')).toString('base64url');
  let n = 0;
  for (let i = 0; i < b64.length && n < READING_MAX_CHUNKS; i += READING_CHUNK) {
    n += 1;
    meta[`rd_${n}`] = b64.slice(i, i + READING_CHUNK);
  }
  meta.rd_n = String(n);
  return meta;
}

export function decodeReadingMeta(metadata) {
  const n = parseInt(metadata?.rd_n || '0', 10) || 0;
  if (n <= 0) return null;
  let b64 = '';
  for (let i = 1; i <= n; i++) b64 += metadata[`rd_${i}`] || '';
  if (!b64) return null;
  try {
    const json = zlib.gunzipSync(Buffer.from(b64, 'base64url')).toString('utf8');
    const data = JSON.parse(json);
    if (!data?.form || !Array.isArray(data.cards) || !data.cards.length) return null;
    if (!data.teaserText && !data.fullText) return null;
    return {
      form: data.form,
      cards: data.cards,
      teaserText: data.teaserText || null,
      fullText: data.fullText || null,
      savedAt: Date.now(),
    };
  } catch {
    return null;
  }
}
