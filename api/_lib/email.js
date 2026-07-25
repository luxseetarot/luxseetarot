export async function sendCreditsEmail({ to, name, remaining, max, sessionId, kind }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'Luxseetarot <onboarding@resend.dev>';
  if (!apiKey || !to) {
    console.warn('Email skipped: missing RESEND_API_KEY or recipient');
    return { ok: false, skipped: true };
  }

  const site = process.env.SITE_URL || 'https://luxseetarot.vercel.app';
  const recoverUrl = `${site.replace(/\/$/, '')}/?recover=${encodeURIComponent(sessionId)}`;
  const title =
    kind === 'purchase'
      ? 'Il tuo pack Luxseetarot è attivo'
      : 'Aggiornamento crediti Luxseetarot';

  const html = `
    <div style="font-family:Georgia,serif;background:#0b0a14;color:#ece6d8;padding:28px">
      <p style="letter-spacing:.35em;color:#d4af6a;font-size:12px">LUXSEETAROT</p>
      <h1 style="color:#d4af6a;font-size:22px">${title}</h1>
      <p>Ciao ${name || ''},</p>
      <p>Crediti letture complete: <strong style="color:#d4af6a">${remaining}</strong> su ${max}.</p>
      <p>Se cancelli cookie o cambi dispositivo, recupera i crediti da questo link:</p>
      <p><a href="${recoverUrl}" style="color:#d4af6a">${recoverUrl}</a></p>
      <p style="color:#9a91a8;font-size:12px">Conserva questa email. Servizio di intrattenimento / riflessione simbolica.</p>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `${title} — ${remaining}/${max} crediti`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    return { ok: false, error: err };
  }
  return { ok: true };
}
