import Stripe from 'stripe';
import { cors, signUnlock } from './_lib/unlock.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return res.status(500).json({ ok: false, error: 'Stripe non configurato.' });

    const { sessionId } = req.body || {};
    if (!sessionId) return res.status(400).json({ ok: false, error: 'sessionId mancante.' });

    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ ok: false, error: 'Pagamento non completato.' });
    }

    const credits = parseInt(session.metadata?.credits || '1', 10) || 1;
    const product = session.metadata?.product || 'full';
    const exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
    const unlockToken = signUnlock({ sessionId: session.id, credits, exp });

    return res.status(200).json({
      ok: true,
      credits,
      product,
      unlockToken,
      exp,
    });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ ok: false, error: 'Verifica pagamento fallita.' });
  }
}
