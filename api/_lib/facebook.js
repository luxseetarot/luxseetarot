/** Pubblicazione automatica sulla Facebook Page Luxseetarot. */

function siteOrigin() {
  const raw = (process.env.SITE_URL || 'https://www.luxseetarot.com').trim();
  return raw.replace(/\/$/, '') || 'https://www.luxseetarot.com';
}

export function facebookConfigured() {
  const pageId = (process.env.FACEBOOK_PAGE_ID || '').trim();
  const token = (process.env.FACEBOOK_PAGE_ACCESS_TOKEN || '').trim();
  return !!(pageId && token);
}

/**
 * Pubblica un link articolo sulla Page.
 * Richiede FACEBOOK_PAGE_ID + FACEBOOK_PAGE_ACCESS_TOKEN (Page token con pages_manage_posts).
 */
export async function shareBlogPostOnFacebook(post) {
  const pageId = (process.env.FACEBOOK_PAGE_ID || '').trim();
  const token = (process.env.FACEBOOK_PAGE_ACCESS_TOKEN || '').trim();

  if (!pageId || !token) {
    return {
      ok: false,
      skipped: true,
      error: 'Facebook non configurato (FACEBOOK_PAGE_ID / FACEBOOK_PAGE_ACCESS_TOKEN).',
    };
  }
  if (!post || !post.slug || !post.title) {
    return { ok: false, error: 'Articolo non valido per Facebook.' };
  }
  if (post.facebookPostId) {
    return { ok: true, skipped: true, id: post.facebookPostId, alreadyPosted: true };
  }

  const url = `${siteOrigin()}/blog/${encodeURIComponent(post.slug)}`;
  const message = [
    'Nuovo articolo sul blog Luxseetarot',
    '',
    post.title,
    post.description ? `\n${post.description}` : '',
    '',
    'Leggi l’articolo completo 👇',
  ]
    .filter(Boolean)
    .join('\n')
    .trim()
    .slice(0, 1800);

  const endpoint = `https://graph.facebook.com/v21.0/${encodeURIComponent(pageId)}/feed`;
  const body = new URLSearchParams();
  body.set('message', message);
  body.set('link', url);
  body.set('access_token', token);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.error) {
      const errMsg =
        (data.error && (data.error.message || data.error.error_user_msg)) ||
        `Facebook HTTP ${res.status}`;
      console.error('Facebook post error:', data.error || data);
      return { ok: false, error: String(errMsg).slice(0, 300) };
    }
    return {
      ok: true,
      id: String(data.id || '').trim(),
      url,
    };
  } catch (e) {
    console.error('Facebook fetch failed:', e);
    return { ok: false, error: 'Connessione a Facebook fallita.' };
  }
}
