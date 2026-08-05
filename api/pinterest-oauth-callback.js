import { exchangePinterestCode, pinterestConfigured } from './_lib/pinterest.js';

function htmlPage(title, body) {
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    body{font-family:Georgia,serif;background:#0f1420;color:#ece6d8;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:24px;text-align:center}
    .box{max-width:420px}
    a{color:#d4af6a}
    p{line-height:1.55;color:rgba(236,230,216,.85)}
  </style>
</head>
<body><div class="box">${body}</div></body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!pinterestConfigured()) {
    return res
      .status(503)
      .send(
        htmlPage(
          'Pinterest',
          '<h1>Config mancante</h1><p>PINTEREST_APP_ID / SECRET non impostati su Vercel.</p>'
        )
      );
  }

  let code = '';
  let err = '';
  try {
    const host = req.headers.host || 'localhost';
    const u = new URL(String(req.url || ''), `https://${host}`);
    code = String(u.searchParams.get('code') || '').trim();
    err = String(u.searchParams.get('error') || '').trim();
  } catch {
    /* ignore */
  }
  if (!code && req.query) {
    code = String(req.query.code || '').trim();
    err = String(req.query.error || '').trim();
  }

  if (err) {
    return res
      .status(400)
      .send(
        htmlPage(
          'Pinterest',
          `<h1>Autorizzazione negata</h1><p>${err}</p><p><a href="/">Torna al sito</a></p>`
        )
      );
  }
  if (!code) {
    return res
      .status(400)
      .send(
        htmlPage(
          'Pinterest',
          '<h1>Codice mancante</h1><p>Riprova da Admin → Pinterest → Collega Pinterest.</p>'
        )
      );
  }

  try {
    const result = await exchangePinterestCode(code);
    if (!result.ok) {
      return res
        .status(400)
        .send(
          htmlPage(
            'Pinterest',
            `<h1>Collegamento fallito</h1><p>${String(result.error || 'Errore').slice(0, 300)}</p><p><a href="/">Torna al sito</a></p>`
          )
        );
    }
    return res.status(200).send(
      htmlPage(
        'Pinterest collegato',
        '<h1>Pinterest collegato</h1><p>Puoi chiudere questa scheda e tornare all’admin Luxseetarot → Pinterest.</p><p><a href="/">Vai al sito</a></p>'
      )
    );
  } catch (e) {
    console.error('pinterest-oauth-callback:', e);
    return res
      .status(500)
      .send(
        htmlPage(
          'Pinterest',
          '<h1>Errore server</h1><p>Riprova tra poco dall’admin.</p>'
        )
      );
  }
}
