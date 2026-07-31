export async function sendCreditsEmail({ to, name, remaining, max, sessionId, product }) {
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

  const site = (process.env.SITE_URL || 'https://luxseetarot.com').replace(/\/$/, '');
  const recoverUrl = `${site}/?recover=${encodeURIComponent(sessionId)}`;
  const left = Math.max(0, Number(remaining) || 0);
  const total = Math.max(1, Number(max) || 0);
  // Pack con crediti residui = wallet. Lettura singola (o 0 residui) = solo recupero lettura.
  const walletMode = product === 'pack' && left > 0;

  let title;
  let subject;
  let htmlBody;

  if (walletMode) {
    title = 'I tuoi crediti Luxseetarot';
    subject = `${title} — ${left}/${total} crediti`;
    htmlBody = `
      <p>Ciao ${name || ''},</p>
      <p>Il tuo pack è attivo. Crediti letture complete rimanenti: <strong style="color:#d4af6a">${left}</strong> su ${total}.</p>
      <p>Il saldo crediti resta sempre visibile sul sito: nella pagina iniziale, sotto l'informativa, e dopo ogni lettura completa, sotto i tasti. Non ti invieremo altre email di aggiornamento.</p>
      <p>Apri questo link per scegliere se <strong>approfondire la stessa domanda</strong> oppure <strong>farne una nuova</strong>:</p>
      <p style="margin:22px 0">
        <a href="${recoverUrl}" style="display:inline-block;background:linear-gradient(135deg,#e6c587,#b88a3e);color:#1a1208;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:700;letter-spacing:.06em">
          Continua con i tuoi crediti
        </a>
      </p>
      <p style="color:#9a91a8;font-size:12px;word-break:break-all">${recoverUrl}</p>
    `;
  } else {
    title = 'Lettura Luxseetarot sbloccata';
    subject = title;
    htmlBody = `
      <p>Ciao ${name || ''},</p>
      <p>Il pagamento è andato a buon fine: la tua <strong style="color:#d4af6a">lettura completa</strong> è disponibile.</p>
      <p>Usa il link qui sotto per riaprire la lettura e scaricare il PDF. Questo acquisto include una sola lettura: per approfondire o farne una nuova serve un nuovo acquisto o un pack.</p>
      <p style="margin:22px 0">
        <a href="${recoverUrl}" style="display:inline-block;background:linear-gradient(135deg,#e6c587,#b88a3e);color:#1a1208;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:700;letter-spacing:.06em">
          Riapri la tua lettura
        </a>
      </p>
      <p style="color:#9a91a8;font-size:12px;word-break:break-all">${recoverUrl}</p>
    `;
  }

  const html = `
    <div style="font-family:Georgia,serif;background:#0b0a14;color:#ece6d8;padding:28px">
      <p style="letter-spacing:.35em;color:#d4af6a;font-size:12px">LUXSEETAROT</p>
      <h1 style="color:#d4af6a;font-size:22px">${title}</h1>
      ${htmlBody}
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
      subject,
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
