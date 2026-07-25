import Stripe from 'stripe';
import { cors, signUnlock, getSessionCredits } from './_lib/unlock.js';
import { sendCreditsEmail } from './_lib/email.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return res.status(500).json({ ok: false, error: 'Stripe non configurato.' });

    const { sessionId, sendEmail = true } = req.body || {};
    if (!sessionId) return res.status(400).json({ ok: false, error: 'sessionId mancante.' });

    const stripe = new Stripe(secret);
    const info = await getSessionCredits(stripe, sessionId);
    if (!info.ok) return res.status(402).json({ ok: false, error: info.error || 'Pagamento non completato.' });

    const exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
    const unlockToken = signUnlock({
      sessionId,
      credits: info.max,
      exp,
    });

    let emailSent = false;
    if (sendEmail && info.email) {
      const mail = await sendCreditsEmail({
        to: info.email,
        name: info.session.metadata?.name || '',
        remaining: info.remaining,
        max: info.max,
        sessionId,
        kind: 'purchase',
      });
      emailSent = !!mail.ok;
    }

    return res.status(200).json({
      ok: true,
      credits: info.remaining,
      maxCredits: info.max,
      product: info.product,
      unlockToken,
      sessionId,
      email: info.email,
      emailSent,
      exp,
    });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ ok: false, error: 'Verifica pagamento fallita.' });
  }
}
