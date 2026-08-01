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

function buildPostMessage(post, url) {
  return [
    'Nuovo articolo sul blog Luxseetarot',
    '',
    post.title,
    post.description ? `\n${post.description}` : '',
    '',
    'Leggi l’articolo completo 👇',
    url,
  ]
    .filter(Boolean)
    .join('\n')
    .trim()
    .slice(0, 1800);
}

async function graphPostFeed(pageId, token, fields) {
  const endpoint = `https://graph.facebook.com/v21.0/${encodeURIComponent(pageId)}/feed`;
  const body = new URLSearchParams();
  Object.entries(fields).forEach(([k, v]) => {
    if (v != null && v !== '') body.set(k, String(v));
  });
  body.set('access_token', token);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await res.json().catch(() => ({}));
  return { res, data };
}

/**
 * Pubblica un articolo sulla Page.
 * options.force = true ripubblica anche se già presente facebookPostId.
 */
export async function shareBlogPostOnFacebook(post, options = {}) {
  const pageId = (process.env.FACEBOOK_PAGE_ID || '').trim();
  const token = (process.env.FACEBOOK_PAGE_ACCESS_TOKEN || '').trim();
  const force = !!(options && options.force);

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
  if (post.facebookPostId && !force) {
    return { ok: true, skipped: true, id: post.facebookPostId, alreadyPosted: true };
  }

  const url = `${siteOrigin()}/blog/${encodeURIComponent(post.slug)}`;
  const message = buildPostMessage(post, url);

  try {
    // Prima prova con link (anteprima Open Graph). Se Facebook rifiuta, posta solo testo+URL.
    let { res, data } = await graphPostFeed(pageId, token, { message, link: url });
    if ((!res.ok || data.error) && data.error) {
      console.warn('Facebook link post failed, retry message-only:', data.error);
      ({ res, data } = await graphPostFeed(pageId, token, { message }));
    }
    if (!res.ok || data.error) {
      const err = data.error || {};
      const errMsg =
        err.error_user_msg ||
        err.message ||
        `Facebook HTTP ${res.status}`;
      const code = err.code != null ? ` [code ${err.code}]` : '';
      console.error('Facebook post error:', err || data);
      return { ok: false, error: String(errMsg + code).slice(0, 400) };
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
