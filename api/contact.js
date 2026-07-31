import { cors, checkRateLimit } from './_lib/unlock.js';
import { verifyTurnstileToken } from './_lib/turnstile.js';
import { sendContactEmail } from './_lib/email.js';

function clean(s, max) {
  return String(s || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
    if (!checkRateLimit(ip, { max: 8, windowMs: 60 * 60 * 1000, bucket: 'contact' })) {
      return res.status(429).json({ ok: false, error: 'Troppi messaggi. Riprova tra un’ora.' });
    }

    const body = req.body || {};
    // Honeypot: i bot spesso lo riempiono
    if (clean(body.website, 120)) {
      return res.status(200).json({ ok: true });
    }

    const name = clean(body.name, 80);
    const email = clean(body.email, 120).toLowerCase();
    const message = String(body.message || '').trim().slice(0, 2000);
    const turnstileToken = body.turnstileToken || '';

    if (!name || name.length < 2) {
      return res.status(400).json({ ok: false, error: 'Inserisci il tuo nome.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Email non valida.' });
    }
    if (!message || message.length < 10) {
      return res.status(400).json({ ok: false, error: 'Scrivi un messaggio di almeno 10 caratteri.' });
    }

    const ts = await verifyTurnstileToken(turnstileToken, ip);
    if (!ts.ok) {
      return res.status(400).json({ ok: false, error: ts.error || 'Verifica anti-bot non superata.' });
    }

    const mail = await sendContactEmail({ name, email, message, ip });
    if (!mail.ok) {
      if (mail.skipped) {
        return res.status(500).json({ ok: false, error: 'Invio non configurato. Riprova più tardi.' });
      }
      return res.status(500).json({ ok: false, error: 'Invio non riuscito. Riprova tra poco.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ ok: false, error: 'Errore interno. Riprova più tardi.' });
  }
}
