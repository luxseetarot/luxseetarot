import crypto from 'crypto';

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
