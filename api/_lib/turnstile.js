export async function verifyTurnstileToken(token, ip) {
  const secret = (process.env.CF_TURNSTILE_SECRET_KEY || '').trim();
  if (!secret) {
    // Se non configurato in env, non bloccare (utile in locale). In produzione va impostato.
    console.warn('CF_TURNSTILE_SECRET_KEY missing: Turnstile check skipped');
    return { ok: true, skipped: true };
  }
  if (!token) return { ok: false, error: 'Verifica anti-bot mancante.' };

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await res.json().catch(() => ({}));
  if (!data.success) {
    console.error('Turnstile failed:', data);
    return { ok: false, error: 'Verifica anti-bot non superata. Riprova.' };
  }
  return { ok: true };
}
