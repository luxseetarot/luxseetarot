import { runScheduledBlogPublish } from './_lib/blog-schedule.js';
import { runScheduledPinterestPublish } from './_lib/pinterest.js';
import { getPost, seedDemoArticle, setPostStatus } from './_lib/blog.js';
import { getSeedArticlesF } from './_lib/blog-seed-articles-f.js';

function headerValue(req, name) {
  const v = req.headers[name] || req.headers[name.toLowerCase()];
  if (Array.isArray(v)) return String(v[0] || '').trim();
  return String(v || '').trim();
}

/** Tolgo BOM, virgolette, newline: spesso diversi tra Vercel e GitHub al copia-incolla. */
function normalizeSecret(s) {
  return String(s || '')
    .replace(/^\uFEFF/, '')
    .trim()
    .replace(/^["']+|["']+$/g, '')
    .replace(/[\r\n\t]/g, '')
    .trim();
}

function querySecret(req) {
  const fromQuery = req.query && req.query.secret;
  if (fromQuery != null && normalizeSecret(fromQuery)) {
    return normalizeSecret(fromQuery);
  }
  try {
    const host = headerValue(req, 'host') || 'localhost';
    const rawUrl = String(req.url || '');
    const u = new URL(rawUrl, `https://${host}`);
    return normalizeSecret(u.searchParams.get('secret') || '');
  } catch {
    return '';
  }
}

function jobName(req) {
  const fromQuery = req.query && req.query.job;
  if (fromQuery != null) return String(fromQuery).trim().toLowerCase();
  try {
    const host = headerValue(req, 'host') || 'localhost';
    const u = new URL(String(req.url || ''), `https://${host}`);
    return String(u.searchParams.get('job') || '').trim().toLowerCase();
  } catch {
    return '';
  }
}

function authorized(req) {
  const cronSecret = normalizeSecret(process.env.CRON_SECRET);
  const adminSecret = normalizeSecret(process.env.ADMIN_SECRET);
  const header = headerValue(req, 'authorization');
  const bearer = header.toLowerCase().startsWith('bearer ')
    ? normalizeSecret(header.slice(7))
    : '';
  const cronHeader = normalizeSecret(headerValue(req, 'x-cron-secret'));
  const q = querySecret(req);
  const isVercelCron = headerValue(req, 'x-vercel-cron') === '1';
  const provided = [bearer, cronHeader, q].filter(Boolean);

  if (cronSecret && provided.some((v) => v === cronSecret)) return true;
  if (adminSecret && provided.some((v) => v === adminSecret)) return true;
  if (isVercelCron && !cronSecret) return true;
  return false;
}

/** Seed catalogo + pubblica lotto F (senza flood Facebook). */
async function seedAndPublishLotF() {
  const seed = await seedDemoArticle({ force: false, syncContent: true });
  const slugs = getSeedArticlesF().map((p) => p.slug);
  const published = [];
  const already = [];
  const missing = [];
  const errors = [];

  for (const slug of slugs) {
    const post = await getPost(slug);
    if (!post) {
      missing.push(slug);
      continue;
    }
    if (post.status === 'published') {
      already.push(slug);
      continue;
    }
    const result = await setPostStatus(slug, 'published', { skipFacebook: true });
    if (!result.ok) {
      errors.push({ slug, error: result.error || 'publish failed' });
      continue;
    }
    published.push(slug);
  }

  return {
    ok: errors.length === 0,
    seed,
    published,
    already,
    missing,
    errors,
    totalF: slugs.length,
  };
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

  const job = jobName(req) || 'blog';

  try {
    if (job === 'pinterest' || job === 'pin') {
      const result = await runScheduledPinterestPublish({ force: false });
      return res.status(200).json({ ok: true, job: 'pinterest', ...result });
    }
    if (job === 'seed-f' || job === 'seed-seo-f') {
      const result = await seedAndPublishLotF();
      return res.status(result.ok ? 200 : 500).json({ ok: result.ok, job: 'seed-f', ...result });
    }
    const result = await runScheduledBlogPublish({ force: false });
    return res.status(200).json({ ok: true, job: 'blog', ...result });
  } catch (err) {
    console.error('cron-blog-publish error:', err);
    return res.status(500).json({
      ok: false,
      error:
        job === 'pinterest' || job === 'pin'
          ? 'Cron Pinterest fallito.'
          : job === 'seed-f' || job === 'seed-seo-f'
            ? 'Seed/publish lotto F fallito.'
            : 'Cron blog publish fallito.',
    });
  }
}
