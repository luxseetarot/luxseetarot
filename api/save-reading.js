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

    const prev = info.session.metadata || {};
    const readingMeta = encodeReadingMeta(reading || null, prev);
    await stripe.checkout.sessions.update(unlocked.sessionId, {
      metadata: {
        ...prev,
        ...readingMeta,
      },
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Save reading error:', err);
    return res.status(500).json({ ok: false, error: 'Salvataggio lettura non riuscito.' });
  }
}
