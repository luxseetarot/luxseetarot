function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readingToEmailHtml(fullText) {
  const raw = String(fullText || '').trim();
  if (!raw) return '';
  const clipped = raw.length > 14000 ? `${raw.slice(0, 14000)}\n\n[…]` : raw;
  const body = escapeHtml(clipped)
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#d4af6a">$1</strong>')
    .replace(/\n{2,}/g, '</p><p style="margin:0 0 14px;line-height:1.65;color:#ece6d8">')
    .replace(/\n/g, '<br/>');
  return `<div style="margin:24px 0;padding:18px 16px;border:1px solid rgba(212,175,106,.28);border-radius:12px;background:rgba(20,16,40,.55)">
      <p style="margin:0 0 12px;letter-spacing:.18em;font-size:11px;color:#d4af6a;text-transform:uppercase">La tua lettura</p>
      <p style="margin:0 0 14px;line-height:1.65;color:#ece6d8">${body}</p>
    </div>`;
}

function ctaButton(href, label, primary) {
  const bg = primary
    ? 'background:linear-gradient(135deg,#e6c587,#b88a3e);color:#1a1208;'
    : 'background:transparent;color:#d4af6a;border:1px solid rgba(212,175,106,.55);';
  return `<a href="${href}" style="display:inline-block;${bg}text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700;letter-spacing:.04em;margin:0 8px 10px 0">${label}</a>`;
}

export async function sendCreditsEmail({
  to,
  name,
  remaining,
  max,
  sessionId,
  product,
  fullText = '',
  question = '',
  cards = [],
}) {
  const apiKey =
    (process.env.BREVO_API_KEY || process.env.BREVO_API_KEY_V3 || '').trim();
  const fromEmail =
    (process.env.BREVO_SENDER_EMAIL || '').trim() || 'noreply@luxseetarot.com';
  const fromName =
    (process.env.BREVO_SENDER_NAME || '').trim() || 'Luxseetarot';

  if (!apiKey || !to) {
    console.warn('Email skipped: missing BREVO_API_KEY or recipient', {
      hasKey: !!apiKey,
      hasTo: !!to,
    });
    return { ok: false, skipped: true, error: !apiKey ? 'BREVO_API_KEY mancante' : 'Destinatario mancante' };
  }

  const site = (process.env.SITE_URL || 'https://www.luxseetarot.com').replace(/\/$/, '');
  const continueUrl = `${site}/?recover=${encodeURIComponent(sessionId)}&intent=continue`;
  const newUrl = `${site}/?recover=${encodeURIComponent(sessionId)}&intent=new`;
  const left = Math.max(0, Number(remaining) || 0);
  const total = Math.max(1, Number(max) || 0);
  const walletMode = product === 'pack' && left > 0;
  const readingHtml = readingToEmailHtml(fullText);
  const qLine = question
    ? `<p style="color:#9a91a8;font-size:14px;line-height:1.5"><strong style="color:#d4af6a">Domanda:</strong> ${escapeHtml(question)}</p>`
    : '';
  const cardsLine = Array.isArray(cards) && cards.length
    ? `<p style="color:#9a91a8;font-size:14px;line-height:1.5"><strong style="color:#d4af6a">Carte:</strong> ${escapeHtml(cards.join(' · '))}</p>`
    : '';

  let title;
  let subject;
  let htmlBody;

  if (walletMode) {
    title = 'La tua lettura Luxseetarot';
    subject = `La tua lettura — ${left}/${total} crediti rimanenti`;
    htmlBody = `
      <p>Ciao ${escapeHtml(name || '')},</p>
      <p>Ecco la lettura completa. Crediti pack rimanenti: <strong style="color:#d4af6a">${left}</strong> su ${total}.</p>
      ${qLine}
      ${cardsLine}
      ${readingHtml || '<p>La lettura è pronta sul sito.</p>'}
      <p>Con i crediti rimanenti puoi continuare su questa stessa domanda oppure iniziarne una nuova:</p>
      <p style="margin:22px 0">
        ${ctaButton(continueUrl, 'Continua questa lettura', true)}
        ${ctaButton(newUrl, 'Nuova lettura', false)}
      </p>
      <p style="color:#9a91a8;font-size:12px;word-break:break-all">Continua: ${continueUrl}<br/>Nuova: ${newUrl}</p>
    `;
  } else {
    title = 'La tua lettura Luxseetarot';
    subject = title;
    htmlBody = `
      <p>Ciao ${escapeHtml(name || '')},</p>
      <p>Il pagamento è andato a buon fine. Ecco la tua <strong style="color:#d4af6a">lettura completa</strong>.</p>
      ${qLine}
      ${cardsLine}
      ${readingHtml || '<p>La lettura è disponibile nella tua casella: se non la vedi sotto, controlla anche lo spam.</p>'}
      <p>Vuoi un’altra consultazione?</p>
      <p style="margin:22px 0">
        ${ctaButton(newUrl, 'Nuova lettura', true)}
      </p>
      <p style="color:#9a91a8;font-size:12px;word-break:break-all">${newUrl}</p>
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

/** Inoltra un messaggio dal form Contatti alla casella del titolare. */
export async function sendContactEmail({ name, email, message, ip }) {
  const apiKey =
    (process.env.BREVO_API_KEY || process.env.BREVO_API_KEY_V3 || '').trim();
  const fromEmail =
    (process.env.BREVO_SENDER_EMAIL || '').trim() || 'noreply@luxseetarot.com';
  const fromName =
    (process.env.BREVO_SENDER_NAME || '').trim() || 'Luxseetarot';
  const toEmail =
    (process.env.CONTACT_EMAIL || process.env.BREVO_SENDER_EMAIL || '').trim() || fromEmail;

  if (!apiKey || !toEmail) {
    console.warn('Contact email skipped: missing BREVO_API_KEY or CONTACT_EMAIL');
    return { ok: false, skipped: true };
  }

  const safeName = String(name || '').slice(0, 80);
  const safeEmail = String(email || '').trim().toLowerCase().slice(0, 120);
  const safeMsg = String(message || '')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .slice(0, 2000);
  const safeIp = String(ip || '').slice(0, 64);

  const html = `
    <div style="font-family:Georgia,serif;background:#0b0a14;color:#ece6d8;padding:28px">
      <p style="letter-spacing:.35em;color:#d4af6a;font-size:12px">LUXSEETAROT</p>
      <h1 style="color:#d4af6a;font-size:22px">Nuovo messaggio dal sito</h1>
      <p><strong style="color:#d4af6a">Nome:</strong> ${safeName}</p>
      <p><strong style="color:#d4af6a">Email:</strong> ${safeEmail}</p>
      <p><strong style="color:#d4af6a">IP:</strong> ${safeIp}</p>
      <p style="margin-top:18px;white-space:pre-wrap;line-height:1.6">${safeMsg}</p>
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
      to: [{ email: toEmail }],
      replyTo: { email: safeEmail, name: safeName || safeEmail },
      subject: `Contatto Luxseetarot — ${safeName || safeEmail}`,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Brevo contact form error:', err);
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
