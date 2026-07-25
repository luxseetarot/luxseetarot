import crypto from 'crypto';

const usageBySession = new Map();
const readingHits = new Map();

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

export function consumeCredit(sessionId, maxCredits) {
  const used = usageBySession.get(sessionId) || 0;
  if (used >= maxCredits) return { ok: false, remaining: 0 };
  const next = used + 1;
  usageBySession.set(sessionId, next);
  return { ok: true, remaining: Math.max(0, maxCredits - next) };
}

/** Soft rate limit per IP (best-effort su serverless). */
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
