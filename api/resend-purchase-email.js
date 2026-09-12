import Stripe from 'stripe';
import { cors, verifyUnlockToken } from './_lib/unlock.js';
import { sendPurchaseConfirmation } from './_lib/purchase-email.js';

/** Reinvia email di conferma/recupero per un acquisto già pagato. */
export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return res.status(500).json({ ok: false, error: 'Stripe non configurato.' });

    const { sessionId, unlockToken } = req.body || {};
    let sid = String(sessionId || '').trim();
    if (!sid && unlockToken) {
      const unlocked = verifyUnlockToken(unlockToken);
      if (!unlocked) return res.status(401).json({ ok: false, error: 'Sblocco non valido o scaduto.' });
      sid = unlocked.sessionId;
    }
    if (!sid) return res.status(400).json({ ok: false, error: 'sessionId mancante.' });

    const stripe = new Stripe(secret);
    const mail = await sendPurchaseConfirmation(stripe, sid, { force: true });
    if (!mail.ok) {
      return res.status(502).json({
        ok: false,
        error: mail.error || 'Invio email fallito.',
        email: mail.email || '',
      });
    }
    return res.status(200).json({
      ok: true,
      emailSent: true,
      email: mail.email || '',
    });
  } catch (err) {
    console.error('Resend purchase email error:', err);
    return res.status(500).json({ ok: false, error: 'Reinvio email fallito.' });
  }
}
