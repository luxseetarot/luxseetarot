import { getPost, slugify } from './_lib/blog.js';
import { renderBlogArticleHtml, renderBlogNotFoundHtml } from './_lib/blog-html.js';

function getAdminSecret() {
  return (process.env.ADMIN_SECRET || '').trim();
}

function readSecret(req) {
  const header = req.headers.authorization || '';
  if (header.toLowerCase().startsWith('bearer ')) {
    return header.slice(7).trim();
  }
  const q = req.query || {};
  return String(q.secret || '').trim();
}

function sendHtml(res, status, html, { cache = 'private, no-store' } = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', cache);
  res.end(html);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('Method not allowed');
  }

  try {
    const slug = slugify((req.query && req.query.slug) || '');
    const preview = String((req.query && req.query.preview) || '') === '1';
    const adminSecret = getAdminSecret();
    const secret = readSecret(req);
    const isAdmin = !!(adminSecret && secret && secret === adminSecret);

    if (!slug) {
      return sendHtml(res, 404, renderBlogNotFoundHtml());
    }

    const post = await getPost(slug);
    if (!post || post.status === 'deleted') {
      return sendHtml(res, 404, renderBlogNotFoundHtml());
    }

    if (post.status !== 'published') {
      if (!(preview && isAdmin)) {
        return sendHtml(res, 404, renderBlogNotFoundHtml());
      }
      return sendHtml(res, 200, renderBlogArticleHtml(post, { preview: true }), {
        cache: 'private, no-store',
      });
    }

    // Pubblicato: HTML completo indicizzabile (niente trasformazione manuale)
    return sendHtml(res, 200, renderBlogArticleHtml(post, { preview: false }), {
      cache: 'public, s-maxage=120, stale-while-revalidate=600',
    });
  } catch (err) {
    console.error('blog-page error:', err);
    return sendHtml(res, 500, renderBlogNotFoundHtml());
  }
}
