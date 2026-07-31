import Stripe from 'stripe';
import { cors, signUnlock, getSessionCredits, decodeReadingMeta } from './_lib/unlock.js';
import { sendCreditsEmail, upsertMarketingContact } from './_lib/email.js';
import { recordPurchase } from './_lib/funnel.js';

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

    const customerName = info.session.metadata?.name || '';
    let emailSent = false;
    const alreadyEmailed = info.session.metadata?.credits_email_sent === '1';
    // Una sola email crediti per acquisto: il saldo resta visibile sul sito.
    if (sendEmail && info.email && !alreadyEmailed) {
      const mail = await sendCreditsEmail({
        to: info.email,
        name: customerName,
        remaining: info.remaining,
        max: info.max,
        sessionId,
      });
      emailSent = !!mail.ok;
      if (mail.ok) {
        try {
          await stripe.checkout.sessions.update(sessionId, {
            metadata: {
              ...(info.session.metadata || {}),
              credits_email_sent: '1',
            },
          });
        } catch (e) {
          console.error('Mark credits_email_sent failed:', e);
        }
      }
    }

    if (info.session.metadata?.marketing === '1' && info.email) {
      upsertMarketingContact({ email: info.email, name: customerName }).catch((e) =>
        console.error('Marketing contact error:', e)
      );
    }

    const savedReading = decodeReadingMeta(info.session.metadata || {});

    const clientIp =
      info.session.metadata?.client_ip ||
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      'unknown';
    const alreadyLogged = info.session.metadata?.funnel_purchase_logged === '1';
    if (!alreadyLogged) {
      try {
        await recordPurchase({
          ip: clientIp,
          email: info.email || '',
          name: customerName,
          product: info.product || '',
          sessionId,
        });
        await stripe.checkout.sessions.update(sessionId, {
          metadata: {
            ...(info.session.metadata || {}),
            funnel_purchase_logged: '1',
          },
        });
      } catch (e) {
        console.error('Funnel purchase log error:', e);
      }
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
      savedReading: savedReading || null,
    });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ ok: false, error: 'Verifica pagamento fallita.' });
  }
}
