/** Invio email con lettura completa dopo generazione / reinvio admin. */

import { getSessionCredits, decodeReadingMeta, encodeReadingMeta } from './unlock.js';
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
 * Invia email con il testo della lettura.
 * - readingDraft: bozza corrente (preferita)
 * - requireReading: se true e manca fullText, non invia (defer)
 * - force: ignora credits_email_sent (usato dopo ogni lettura completa e per reinvio)
 */
export async function sendPurchaseConfirmation(
  stripe,
  sessionId,
  { force = false, nameFallback = '', readingDraft = null, requireReading = true } = {}
) {
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

  const saved = readingDraft || decodeReadingMeta(info.session.metadata || {}) || null;
  const fullText = String(saved?.fullText || '').trim();
  if (requireReading && !fullText) {
    return { ok: true, deferred: true, email: to };
  }

  const already = info.session.metadata?.credits_email_sent === '1';
  // force=true: nuova lettura appena generata o reinvio admin.
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
    name: info.session.metadata?.name || nameFallback || saved?.form?.name || '',
    remaining: info.remaining,
    max: info.max,
    sessionId,
    product: info.product || 'full',
    fullText,
    question: saved?.form?.question || '',
    cards: saved?.cards || [],
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
    const metaPatch = {
      ...(fresh.metadata || {}),
      credits_email_sent: '1',
    };
    if (readingDraft) {
      Object.assign(metaPatch, encodeReadingMeta(readingDraft, fresh.metadata || {}));
    }
    await stripe.checkout.sessions.update(sessionId, { metadata: metaPatch });
  } catch (e) {
    console.error('Mark credits_email_sent / save reading meta failed:', e);
  }

  return { ok: true, emailSent: true, email: to };
}
