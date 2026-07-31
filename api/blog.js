import { cors } from './_lib/unlock.js';
import { getPost, listPublishedPosts, seedDemoArticle } from './_lib/blog.js';

function getAdminSecret() {
  return (process.env.ADMIN_SECRET || '').trim();
}

function readSecret(req) {
  const header = req.headers.authorization || '';
  if (header.toLowerCase().startsWith('bearer ')) {
    return header.slice(7).trim();
  }
  const q = req.query || {};
  return String(q.secret || (req.body && req.body.secret) || '').trim();
}

function publicCard(post) {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    keyword: post.keyword,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  };
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    // Soft-seed: assicura l'articolo demo in bozza se Redis è vuoto
    await seedDemoArticle({ force: false });

    const action = String((req.query && req.query.action) || (req.body && req.body.action) || 'list').trim();
    const adminSecret = getAdminSecret();
    const secret = readSecret(req);
    const isAdmin = !!(adminSecret && secret && secret === adminSecret);

    if (action === 'list') {
      const posts = await listPublishedPosts();
      return res.status(200).json({
        ok: true,
        posts: posts.map(publicCard),
      });
    }

    if (action === 'get') {
      const slug = String((req.query && req.query.slug) || (req.body && req.body.slug) || '').trim();
      if (!slug) return res.status(400).json({ ok: false, error: 'Slug mancante.' });
      const post = await getPost(slug);
      if (!post) return res.status(404).json({ ok: false, error: 'Articolo non trovato.' });
      const preview = String((req.query && req.query.preview) || '') === '1';
      if (post.status !== 'published') {
        if (!(preview && isAdmin)) {
          return res.status(404).json({ ok: false, error: 'Articolo non disponibile.' });
        }
      }
      return res.status(200).json({
        ok: true,
        post: {
          slug: post.slug,
          title: post.title,
          description: post.description,
          keyword: post.keyword,
          status: post.status,
          bodyHtml: post.bodyHtml,
          faq: post.faq || [],
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          createdAt: post.createdAt,
          preview: post.status !== 'published',
        },
      });
    }

    return res.status(400).json({ ok: false, error: 'Azione non valida.' });
  } catch (err) {
    console.error('Blog API error:', err);
    return res.status(500).json({ ok: false, error: 'Errore blog.' });
  }
}
