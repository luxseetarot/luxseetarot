import {
  buildPinterestAuthUrl,
  exchangePinterestCode,
  pinterestConfigured,
} from './_lib/pinterest.js';

function normalizeSecret(s) {
  return String(s || '')
    .replace(/^\uFEFF/, '')
    .trim()
    .replace(/^["']+|["']+$/g, '')
    .replace(/[\r\n\t]/g, '')
    .trim();
}

function readSecret(req) {
  const header = req.headers.authorization || '';
  if (String(header).toLowerCase().startsWith('bearer ')) {
    return normalizeSecret(header.slice(7));
  }
  const fromQuery = req.query && req.query.secret;
  if (fromQuery != null) return normalizeSecret(fromQuery);
  try {
    const host = req.headers.host || 'localhost';
    const u = new URL(String(req.url || ''), `https://${host}`);
    return normalizeSecret(u.searchParams.get('secret') || '');
  } catch {
    return '';
  }
}

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

function parseQuery(req) {
  let code = '';
  let err = '';
  let step = '';
  try {
    const host = req.headers.host || 'localhost';
    const u = new URL(String(req.url || ''), `https://${host}`);
    code = String(u.searchParams.get('code') || '').trim();
    err = String(u.searchParams.get('error') || '').trim();
    step = String(u.searchParams.get('step') || '').trim();
  } catch {
    /* ignore */
  }
  if (req.query) {
    if (!code) code = String(req.query.code || '').trim();
    if (!err) err = String(req.query.error || '').trim();
    if (!step) step = String(req.query.step || '').trim();
  }
  return { code, err, step };
}

async function handleCallback(req, res) {
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

  const { code, err } = parseQuery(req);

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

async function handleStart(req, res) {
  const adminSecret = normalizeSecret(process.env.ADMIN_SECRET);
  if (!adminSecret) {
    return res.status(503).send('ADMIN_SECRET non configurato.');
  }
  if (readSecret(req) !== adminSecret) {
    return res.status(401).send('Non autorizzato. Apri Collega Pinterest dall’admin.');
  }
  if (!pinterestConfigured()) {
    return res
      .status(503)
      .send('Configura PINTEREST_APP_ID e PINTEREST_APP_SECRET su Vercel, poi redeploy.');
  }

  const url = buildPinterestAuthUrl('lux-admin');
  if (!url) {
    return res.status(503).send('OAuth Pinterest non disponibile.');
  }
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  return res.redirect(302, url);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { code, err, step } = parseQuery(req);
  const isCallback = step === 'callback' || !!code || !!err;
  if (isCallback) return handleCallback(req, res);
  return handleStart(req, res);
}
