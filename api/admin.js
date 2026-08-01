import { cors } from './_lib/unlock.js';
import {
  funnelStorageMode,
  listFunnelStats,
  getIpDetail,
  resetTeaserDay,
  resetIpCounters,
  deleteIpData,
  resetAllCounters,
} from './_lib/funnel.js';
import {
  blogCounts,
  getPost,
  listPosts,
  savePost,
  seedDemoArticle,
  setPostStatus,
  sharePublishedPostOnFacebook,
} from './_lib/blog.js';
import {
  describeNextSlot,
  getBlogSchedule,
  pickNextDraft,
  runScheduledBlogPublish,
  saveBlogSchedule,
} from './_lib/blog-schedule.js';

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

    if (action === 'reset-counters') {
      const ip = String((req.body && req.body.ip) || '').trim();
      if (!ip) return res.status(400).json({ ok: false, error: 'IP mancante.' });
      const profile = await resetIpCounters(ip);
      return res.status(200).json({ ok: true, profile });
    }

    if (action === 'delete-ip') {
      const ip = String((req.body && req.body.ip) || '').trim();
      if (!ip) return res.status(400).json({ ok: false, error: 'IP mancante.' });
      const result = await deleteIpData(ip);
      return res.status(200).json({ ok: true, ...result });
    }

    if (action === 'reset-all-counters') {
      const stats = await resetAllCounters();
      return res.status(200).json({ ok: true, ...stats });
    }

    if (action === 'blog-list') {
      // Solo inserisce slug mancanti (nessuna riscrittura massiva)
      await seedDemoArticle({ force: false, syncContent: false });
      const posts = await listPosts({ includeDeleted: true });
      const schedule = await getBlogSchedule();
      const nextDraft = await pickNextDraft();
      return res.status(200).json({
        ok: true,
        posts,
        counts: blogCounts(posts),
        storage: funnelStorageMode(),
        schedule,
        scheduleHint: describeNextSlot(schedule),
        nextDraftSlug: nextDraft ? nextDraft.slug : null,
        nextDraftTitle: nextDraft ? nextDraft.title : null,
      });
    }

    if (action === 'blog-schedule-get') {
      const schedule = await getBlogSchedule();
      const nextDraft = await pickNextDraft();
      return res.status(200).json({
        ok: true,
        schedule,
        scheduleHint: describeNextSlot(schedule),
        nextDraftSlug: nextDraft ? nextDraft.slug : null,
        nextDraftTitle: nextDraft ? nextDraft.title : null,
      });
    }

    if (action === 'blog-schedule-save') {
      const payload = (req.body && req.body.schedule) || req.body || {};
      const result = await saveBlogSchedule({
        enabled: payload.enabled,
        intervalDays: payload.intervalDays,
        hour: payload.hour,
        minute: payload.minute,
      });
      return res.status(200).json({
        ok: true,
        schedule: result.schedule,
        scheduleHint: describeNextSlot(result.schedule),
      });
    }

    if (action === 'blog-schedule-run') {
      // Pubblica subito la prossima bozza (test / recupero), con Facebook
      const result = await runScheduledBlogPublish({ force: true });
      if (!result.ok) return res.status(400).json(result);
      return res.status(200).json(result);
    }

    if (action === 'blog-get') {
      const slug = String((req.body && req.body.slug) || '').trim();
      if (!slug) return res.status(400).json({ ok: false, error: 'Slug mancante.' });
      const post = await getPost(slug);
      if (!post) return res.status(404).json({ ok: false, error: 'Articolo non trovato.' });
      return res.status(200).json({ ok: true, post });
    }

    if (action === 'blog-save') {
      const payload = (req.body && req.body.post) || req.body || {};
      const result = await savePost(payload);
      if (!result.ok) return res.status(400).json(result);
      return res.status(200).json(result);
    }

    if (action === 'blog-set-status') {
      const slug = String((req.body && req.body.slug) || '').trim();
      const status = String((req.body && req.body.status) || '').trim();
      if (!slug || !status) {
        return res.status(400).json({ ok: false, error: 'Slug e status obbligatori.' });
      }
      const result = await setPostStatus(slug, status);
      if (!result.ok) return res.status(400).json(result);
      return res.status(200).json(result);
    }

    if (action === 'blog-facebook-share') {
      const slug = String((req.body && req.body.slug) || '').trim();
      const force = !!(req.body && req.body.force);
      if (!slug) return res.status(400).json({ ok: false, error: 'Slug obbligatorio.' });
      const result = await sharePublishedPostOnFacebook(slug, { force });
      if (!result.ok) return res.status(400).json(result);
      return res.status(200).json(result);
    }

    if (action === 'blog-seed-demo' || action === 'blog-seed-all') {
      const force = !!(req.body && req.body.force);
      const syncContent = force ? true : req.body && req.body.syncContent === false ? false : true;
      const result = await seedDemoArticle({ force, syncContent });
      if (!result.ok) return res.status(400).json(result);
      return res.status(200).json(result);
    }

    return res.status(400).json({ ok: false, error: 'Azione non valida.' });
  } catch (err) {
    console.error('Admin error:', err);
    return res.status(500).json({ ok: false, error: 'Errore admin.' });
  }
}
