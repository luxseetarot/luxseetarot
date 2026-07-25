import Stripe from 'stripe';
import { cors } from './_lib/unlock.js';
import { verifyTurnstileToken } from './_lib/turnstile.js';

const PRODUCTS = {
  full: {
    name: 'Lettura completa Luxseetarot',
    description: 'Sblocco di una lettura simbolica completa (digitale).',
    unit_amount: 490,
    credits: 1,
  },
  pack: {
    name: 'Pack 5 letture Luxseetarot',
    description: 'Cinque letture complete digitali.',
    unit_amount: 990,
    credits: 5,
  },
};

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return res.status(500).json({ ok: false, error: 'Stripe non configurato.' });

    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
    const { product = 'full', origin, email, name, marketing = false, turnstileToken } = req.body || {};

    const bot = await verifyTurnstileToken(turnstileToken, ip);
    if (!bot.ok) return res.status(403).json({ ok: false, error: bot.error || 'Verifica anti-bot fallita.' });

    const item = PRODUCTS[product];
    if (!item) return res.status(400).json({ ok: false, error: 'Prodotto non valido.' });

    const base = (origin || req.headers.origin || '').replace(/\/$/, '');
    if (!base) return res.status(400).json({ ok: false, error: 'Origin mancante.' });

    const cleanEmail = String(email || '').trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return res.status(400).json({ ok: false, error: 'Email obbligatoria per il pagamento.' });
    }

    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'it',
      customer_email: cleanEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: item.unit_amount,
            product_data: {
              name: item.name,
              description: item.description,
            },
          },
        },
      ],
      metadata: {
        product,
        credits: String(item.credits),
        credits_used: '0',
        email: cleanEmail,
        name: String(name || '').slice(0, 80),
        marketing: marketing ? '1' : '0',
      },
      success_url: `${base}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/?checkout=cancel`,
    });

    return res.status(200).json({ ok: true, url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ ok: false, error: 'Impossibile avviare il pagamento.' });
  }
}
