import Stripe from 'stripe';
import { cors, signUnlock, getSessionCredits, decodeReadingMeta, verifyUnlockToken } from './_lib/unlock.js';
import { upsertMarketingContact } from './_lib/email.js';
import { recordPurchase } from './_lib/funnel.js';
import { sendPurchaseConfirmation } from './_lib/purchase-email.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return res.status(500).json({ ok: false, error: 'Stripe non configurato.' });

    const { sessionId, sendEmail = true, resendEmail = false, unlockToken: bodyUnlock } = req.body || {};
    let sid = String(sessionId || '').trim();
    if (!sid && bodyUnlock) {
      const unlocked = verifyUnlockToken(bodyUnlock);
      if (!unlocked) return res.status(401).json({ ok: false, error: 'Sblocco non valido o scaduto.' });
      sid = unlocked.sessionId;
    }
    if (!sid) return res.status(400).json({ ok: false, error: 'sessionId mancante.' });

    const stripe = new Stripe(secret);

    // Solo reinvio email (senza rifare tutto il flusso unlock/funnel).
    if (resendEmail) {
      const mail = await sendPurchaseConfirmation(stripe, sid, { force: true });
      if (!mail.ok) {
        return res.status(502).json({
          ok: false,
          error: mail.error || 'Invio email fallito.',
          email: mail.email || '',
        });
      }
      return res.status(200).json({ ok: true, emailSent: true, email: mail.email || '', sessionId: sid });
    }

    const info = await getSessionCredits(stripe, sid);
    if (!info.ok) return res.status(402).json({ ok: false, error: info.error || 'Pagamento non completato.' });

    const exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
    const unlockToken = signUnlock({
      sessionId: sid,
      credits: info.max,
      exp,
    });

    const customerName = info.session.metadata?.name || '';
    let emailSent = false;
    let emailError = null;
    if (sendEmail) {
      const mail = await sendPurchaseConfirmation(stripe, sid, {
        force: false,
        nameFallback: customerName,
      });
      emailSent = !!(mail.ok && mail.emailSent);
      if (!mail.ok) emailError = mail.error || 'Invio email fallito.';
      if (mail.alreadySent) emailSent = false;
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
        const amountCents =
          info.session.amount_total != null
            ? info.session.amount_total
            : parseInt(info.session.metadata?.amount_cents || '0', 10) || 0;
        await recordPurchase({
          ip: clientIp,
          email: info.email || '',
          name: customerName,
          product: info.product || '',
          sessionId: sid,
          amountCents,
        });
        await stripe.checkout.sessions.update(sid, {
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
      sessionId: sid,
      email: info.email,
      emailSent,
      emailError,
      exp,
      savedReading: savedReading || null,
    });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ ok: false, error: 'Verifica pagamento fallita.' });
  }
}
