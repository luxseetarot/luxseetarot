import { cors } from './_lib/unlock.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ ok: false });

  return res.status(200).json({
    ok: true,
    turnstileSiteKey: (process.env.CF_TURNSTILE_SITE_KEY || '').trim(),
  });
}
