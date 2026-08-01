import { runScheduledBlogPublish } from './_lib/blog-schedule.js';

function headerValue(req, name) {
  const v = req.headers[name] || req.headers[name.toLowerCase()];
  if (Array.isArray(v)) return String(v[0] || '').trim();
  return String(v || '').trim();
}

function querySecret(req) {
  const fromQuery = req.query && req.query.secret;
  if (fromQuery != null && String(fromQuery).trim()) {
    return String(fromQuery).trim();
  }
  try {
    const host = headerValue(req, 'host') || 'localhost';
    const rawUrl = String(req.url || '');
    const u = new URL(rawUrl, `https://${host}`);
    return String(u.searchParams.get('secret') || '').trim();
  } catch {
    return '';
  }
}

function authorized(req) {
  const cronSecret = (process.env.CRON_SECRET || '').trim();
  const adminSecret = (process.env.ADMIN_SECRET || '').trim();
  const header = headerValue(req, 'authorization');
  const bearer = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : '';
  const cronHeader = headerValue(req, 'x-cron-secret');
  const q = querySecret(req);
  const isVercelCron = headerValue(req, 'x-vercel-cron') === '1';
  const provided = [bearer, cronHeader, q].filter(Boolean);

  if (cronSecret && provided.some((v) => v === cronSecret)) return true;
  if (adminSecret && provided.some((v) => v === adminSecret)) return true;
  if (isVercelCron && !cronSecret) return true;
  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  if (!authorized(req)) {
    return res.status(401).json({
      ok: false,
      error: 'Non autorizzato.',
      hasCronSecret: !!(process.env.CRON_SECRET || '').trim(),
      hasAdminSecret: !!(process.env.ADMIN_SECRET || '').trim(),
    });
  }

  try {
    const result = await runScheduledBlogPublish({ force: false });
    return res.status(200).json({ ok: true, ...result });
  } catch (err) {
    console.error('cron-blog-publish error:', err);
    return res.status(500).json({ ok: false, error: 'Cron blog publish fallito.' });
  }
}
