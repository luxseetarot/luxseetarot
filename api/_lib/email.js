export async function sendCreditsEmail({ to, name, remaining, max, sessionId }) {
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
  const title = 'I tuoi crediti Luxseetarot';

  const html = `
    <div style="font-family:Georgia,serif;background:#0b0a14;color:#ece6d8;padding:28px">
      <p style="letter-spacing:.35em;color:#d4af6a;font-size:12px">LUXSEETAROT</p>
      <h1 style="color:#d4af6a;font-size:22px">${title}</h1>
      <p>Ciao ${name || ''},</p>
      <p>Il tuo acquisto è attivo. Crediti letture complete: <strong style="color:#d4af6a">${remaining}</strong> su ${max}.</p>
      <p>Il saldo crediti resta sempre visibile sul sito in basso a sinistra: non ti invieremo altre email di aggiornamento.</p>
      <p>Apri questo link per scegliere subito se <strong>approfondire la stessa domanda</strong> oppure <strong>farne una nuova</strong>:</p>
      <p style="margin:22px 0">
        <a href="${recoverUrl}" style="display:inline-block;background:linear-gradient(135deg,#e6c587,#b88a3e);color:#1a1208;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:700;letter-spacing:.06em">
          Continua con i tuoi crediti
        </a>
      </p>
      <p style="color:#9a91a8;font-size:12px;word-break:break-all">${recoverUrl}</p>
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
