/** Invio conferma acquisto / link recupero lettura. */

import { getSessionCredits } from './unlock.js';
import { sendCreditsEmail } from './email.js';

export function emailConfigStatus() {
  const apiKey = (process.env.BREVO_API_KEY || process.env.BREVO_API_KEY_V3 || '').trim();
  const sender = (process.env.BREVO_SENDER_EMAIL || '').trim() || 'noreply@luxseetarot.com';
  return {
    ok: !!apiKey,
    configured: !!apiKey,
    sender,
    hasApiKey: !!apiKey,
  };
}

/**
 * Invia (o reinvia) email di conferma per una Checkout Session pagata.
 * options.force = true ignora credits_email_sent.
 */
export async function sendPurchaseConfirmation(stripe, sessionId, { force = false, nameFallback = '' } = {}) {
  if (!stripe || !sessionId) {
    return { ok: false, error: 'Sessione mancante.' };
  }

  const info = await getSessionCredits(stripe, sessionId);
  if (!info.ok) {
    return { ok: false, error: info.error || 'Pagamento non completato.' };
  }

  const to = String(info.email || info.session.metadata?.email || '').trim().toLowerCase();
  if (!to || !to.includes('@')) {
    console.error('Purchase email skipped: no email on session', sessionId);
    return { ok: false, error: 'Email cliente assente sulla sessione Stripe.' };
  }

  const already = info.session.metadata?.credits_email_sent === '1';
  if (already && !force) {
    return { ok: true, alreadySent: true, email: to };
  }

  const cfg = emailConfigStatus();
  if (!cfg.configured) {
    console.error('Purchase email skipped: BREVO_API_KEY missing');
    return { ok: false, error: 'BREVO_API_KEY non configurata su Vercel.', email: to };
  }

  const mail = await sendCreditsEmail({
    to,
    name: info.session.metadata?.name || nameFallback || '',
    remaining: info.remaining,
    max: info.max,
    sessionId,
    product: info.product || 'full',
  });

  if (!mail.ok) {
    console.error('Purchase email failed:', mail.error || mail);
    return {
      ok: false,
      error: mail.skipped
        ? 'Invio email non configurato (Brevo).'
        : String(mail.error || 'Invio Brevo fallito.').slice(0, 300),
      email: to,
    };
  }

  try {
    const fresh = await stripe.checkout.sessions.retrieve(sessionId);
    await stripe.checkout.sessions.update(sessionId, {
      metadata: {
        ...(fresh.metadata || {}),
        credits_email_sent: '1',
      },
    });
  } catch (e) {
    console.error('Mark credits_email_sent failed:', e);
  }

  return { ok: true, emailSent: true, email: to };
}
