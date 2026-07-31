import Stripe from 'stripe';
import { cors, verifyUnlockToken, encodeReadingMeta, getSessionCredits } from './_lib/unlock.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return res.status(500).json({ ok: false, error: 'Stripe non configurato.' });

    const { unlockToken, reading } = req.body || {};
    const unlocked = verifyUnlockToken(unlockToken);
    if (!unlocked) {
      return res.status(402).json({ ok: false, error: 'Sblocco non valido o scaduto.' });
    }

    const stripe = new Stripe(secret);
    const info = await getSessionCredits(stripe, unlocked.sessionId);
    if (!info.ok) {
      return res.status(402).json({ ok: false, error: info.error || 'Sessione non valida.' });
    }

    const readingMeta = encodeReadingMeta(reading || null, info.session.metadata || {});

    // Re-read subito prima del write: evita di riportare credits_used a 0
    // se un consume parallelo ha già aggiornato Stripe.
    const fresh = await stripe.checkout.sessions.retrieve(unlocked.sessionId);
    const base = fresh.metadata || {};
    const usedFresh = parseInt(base.credits_used || '0', 10) || 0;
    const usedKnown = parseInt((info.session.metadata || {}).credits_used || '0', 10) || 0;

    await stripe.checkout.sessions.update(unlocked.sessionId, {
      metadata: {
        ...base,
        ...readingMeta,
        credits_used: String(Math.max(usedFresh, usedKnown)),
      },
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Save reading error:', err);
    return res.status(500).json({ ok: false, error: 'Salvataggio lettura non riuscito.' });
  }
}
