import { buildPinterestAuthUrl, pinterestConfigured } from './_lib/pinterest.js';

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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

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
  // Evita che ?secret= finisca nel Referer verso pinterest.com
  res.setHeader('Referrer-Policy', 'no-referrer');
  return res.redirect(302, url);
}
