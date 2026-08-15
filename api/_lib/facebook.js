/** Pubblicazione automatica sulla Facebook Page Luxseetarot. */

function siteOrigin() {
  let raw = (process.env.SITE_URL || 'https://www.luxseetarot.com').trim().replace(/\/$/, '');
  if (!raw) raw = 'https://www.luxseetarot.com';
  if (raw === 'https://luxseetarot.com' || raw === 'http://luxseetarot.com') {
    raw = 'https://www.luxseetarot.com';
  }
  return raw;
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

function formatGraphError(data, status) {
  const err = (data && data.error) || {};
  const base =
    err.error_user_msg ||
    err.message ||
    (status ? `Facebook HTTP ${status}` : 'Errore Facebook');
  const code = err.code != null ? Number(err.code) : null;
  const sub = err.error_subcode != null ? Number(err.error_subcode) : null;
  let hint = '';
  if (code === 190) {
    hint =
      ' Token scaduto o non valido: genera un nuovo Page Access Token (long-lived) e aggiorna FACEBOOK_PAGE_ACCESS_TOKEN su Vercel + Redeploy.';
  } else if (code === 200 || code === 10) {
    hint =
      ' Mancano i permessi pages_manage_posts / pages_read_engagement sul token della Page.';
  } else if (code === 100) {
    hint = ' Parametro non valido: controlla FACEBOOK_PAGE_ID (ID numerico della Page).';
  } else if (code === 368 || sub === 1404078) {
    hint = ' La Page è temporaneamente limitata da Meta sulla pubblicazione.';
  }
  const codeLabel = code != null ? ` [code ${code}]` : '';
  return String(base + codeLabel + hint).slice(0, 500);
}

async function graphGet(path, token, params = {}) {
  const qs = new URLSearchParams({ ...params, access_token: token });
  const endpoint = `https://graph.facebook.com/v21.0/${path}?${qs.toString()}`;
  const res = await fetch(endpoint, { method: 'GET' });
  const data = await res.json().catch(() => ({}));
  return { res, data };
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
 * Diagnostica configurazione + validità token Page.
 */
export async function facebookStatus() {
  const pageId = (process.env.FACEBOOK_PAGE_ID || '').trim();
  const token = (process.env.FACEBOOK_PAGE_ACCESS_TOKEN || '').trim();
  if (!pageId || !token) {
    return {
      ok: false,
      configured: false,
      error:
        'Facebook non configurato. Su Vercel (Production) imposta FACEBOOK_PAGE_ID e FACEBOOK_PAGE_ACCESS_TOKEN, poi Redeploy.',
    };
  }

  try {
    const { res, data } = await graphGet(encodeURIComponent(pageId), token, {
      fields: 'id,name,link',
    });
    if (!res.ok || data.error) {
      return {
        ok: false,
        configured: true,
        pageId,
        error: formatGraphError(data, res.status),
      };
    }
    return {
      ok: true,
      configured: true,
      pageId: String(data.id || pageId),
      pageName: String(data.name || ''),
      pageLink: String(data.link || ''),
      tokenPreview: `${token.slice(0, 6)}…${token.slice(-4)}`,
    };
  } catch (e) {
    console.error('Facebook status failed:', e);
    return {
      ok: false,
      configured: true,
      pageId,
      error: 'Connessione a Facebook fallita (rete / Graph API).',
    };
  }
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
      error:
        'Facebook non configurato (FACEBOOK_PAGE_ID / FACEBOOK_PAGE_ACCESS_TOKEN su Vercel + Redeploy).',
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
    // Message-only (URL nel testo): più affidabile. Il campo `link` spesso viene rifiutato.
    let { res, data } = await graphPostFeed(pageId, token, { message });
    if ((!res.ok || data.error) && data.error) {
      console.warn('Facebook message-only failed, retry with link:', data.error);
      ({ res, data } = await graphPostFeed(pageId, token, { message, link: url }));
    }
    if (!res.ok || data.error) {
      console.error('Facebook post error:', data.error || data);
      return { ok: false, error: formatGraphError(data, res.status) };
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
