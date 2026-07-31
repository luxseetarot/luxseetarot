import { cors } from './_lib/unlock.js';
import {
  funnelStorageMode,
  listFunnelStats,
  getIpDetail,
  resetTeaserDay,
} from './_lib/funnel.js';

function getAdminSecret() {
  return (process.env.ADMIN_SECRET || '').trim();
}

function unauthorized(res) {
  return res.status(401).json({ ok: false, error: 'Non autorizzato.' });
}

function readSecret(req) {
  const header = req.headers.authorization || '';
  if (header.toLowerCase().startsWith('bearer ')) {
    return header.slice(7).trim();
  }
  return String((req.body && req.body.secret) || '').trim();
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const adminSecret = getAdminSecret();
    if (!adminSecret) {
      return res.status(503).json({
        ok: false,
        error: 'ADMIN_SECRET non configurato su Vercel.',
      });
    }

    const secret = readSecret(req);
    const action = String((req.body && req.body.action) || 'stats').trim();

    if (action === 'login') {
      if (secret !== adminSecret) return unauthorized(res);
      return res.status(200).json({
        ok: true,
        storage: funnelStorageMode(),
      });
    }

    if (secret !== adminSecret) return unauthorized(res);

    if (action === 'stats') {
      const stats = await listFunnelStats({ limit: 100 });
      return res.status(200).json({ ok: true, ...stats });
    }

    if (action === 'ip') {
      const ip = String((req.body && req.body.ip) || '').trim();
      if (!ip) return res.status(400).json({ ok: false, error: 'IP mancante.' });
      const profile = await getIpDetail(ip);
      return res.status(200).json({ ok: true, profile });
    }

    if (action === 'reset-teaser') {
      const ip = String((req.body && req.body.ip) || '').trim();
      if (!ip) return res.status(400).json({ ok: false, error: 'IP mancante.' });
      const profile = await resetTeaserDay(ip);
      return res.status(200).json({ ok: true, profile });
    }

    return res.status(400).json({ ok: false, error: 'Azione non valida.' });
  } catch (err) {
    console.error('Admin error:', err);
    return res.status(500).json({ ok: false, error: 'Errore admin.' });
  }
}
