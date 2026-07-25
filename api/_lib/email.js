export async function sendCreditsEmail({ to, name, remaining, max, sessionId, kind }) {
  const apiKey =
    (process.env.BREVO_API_KEY || process.env.BREVO_API_KEY_V3 || '').trim();
  const fromEmail =
    (process.env.BREVO_SENDER_EMAIL || '').trim() || 'noreply@luxseetarot.com';
  const fromName =
    (process.env.BREVO_SENDER_NAME || '').trim() || 'Luxseetarot';

  if (!apiKey || !to) {
    console.warn('Email skipped: missing BREVO_API_KEY or recipient');
    return { ok: false, skipped: true };
  }

  const site = (process.env.SITE_URL || 'https://luxseetarot.vercel.app').replace(/\/$/, '');
  const recoverUrl = `${site}/?recover=${encodeURIComponent(sessionId)}`;
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

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: fromName },
      to: [{ email: String(to).trim().toLowerCase() }],
      subject: `${title} — ${remaining}/${max} crediti`,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Brevo error:', err);
    return { ok: false, error: err };
  }
  return { ok: true };
}

/** Aggiunge/aggiorna contatto Brevo solo se ha accettato le promozioni. */
export async function upsertMarketingContact({ email, name }) {
  const apiKey =
    (process.env.BREVO_API_KEY || process.env.BREVO_API_KEY_V3 || '').trim();
  if (!apiKey || !email) return { ok: false, skipped: true };

  const listId = parseInt(process.env.BREVO_LIST_ID || '', 10);
  const body = {
    email: String(email).trim().toLowerCase(),
    attributes: {
      FIRSTNAME: String(name || '').slice(0, 80),
      MARKETING_OPT_IN: true,
    },
    updateEnabled: true,
  };
  if (Number.isFinite(listId) && listId > 0) {
    body.listIds = [listId];
  }

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok && res.status !== 400) {
    const err = await res.text();
    console.error('Brevo contact error:', err);
    return { ok: false, error: err };
  }
  return { ok: true };
}
