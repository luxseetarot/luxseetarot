/** HTML server-side per articoli blog (indicizzabile quando published). */

import { resolveBlogCover } from './blog-covers.js';

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function siteOrigin() {
  let raw = (process.env.SITE_URL || 'https://www.luxseetarot.com').trim();
  raw = raw.replace(/\/$/, '') || 'https://www.luxseetarot.com';
  if (raw === 'https://luxseetarot.com' || raw === 'http://luxseetarot.com') {
    raw = 'https://www.luxseetarot.com';
  }
  return raw;
}

function absUrl(pathOrUrl) {
  const site = siteOrigin();
  const p = String(pathOrUrl || '').trim();
  if (!p) return `${site}/og-image.jpg`;
  if (/^https?:\/\//i.test(p)) return p;
  return site + (p.startsWith('/') ? p : `/${p}`);
}

function detectCluster(post) {
  const hay = `${post.slug || ''} ${post.keyword || ''} ${post.title || ''} ${post.description || ''}`;
  if (/amore|ex|relazion|coppia|single|fiamma|tradiment|gelos/i.test(hay)) return 'amore';
  if (/lavoro|carriera|soldi|denar|colloquio|burnout/i.test(hay)) return 'lavoro';
  if (/futuro|destino|imminente|prossimo|karma/i.test(hay)) return 'futuro';
  return 'gratis';
}

function moneyLinksForCluster(cluster) {
  const common = [
    { href: '/tarocchi-gratis.html', label: 'Tarocchi gratis' },
    { href: '/blog/come-fare-una-domanda-ai-tarocchi', label: 'Come fare una domanda' },
    { href: '/blog/lettura-tarocchi-tre-carte', label: 'Lettura a tre carte' },
  ];
  if (cluster === 'amore') {
    return [{ href: '/tarocchi-amore.html', label: 'Tarocchi amore' }, ...common];
  }
  if (cluster === 'lavoro') {
    return [{ href: '/tarocchi-lavoro.html', label: 'Tarocchi lavoro' }, ...common];
  }
  if (cluster === 'futuro') {
    return [{ href: '/tarocchi-futuro.html', label: 'Tarocchi futuro' }, ...common];
  }
  return common;
}

function articleStyles() {
  return `
  :root{--ink:#0b0a14;--gold:#d4af6a;--fg:#ece6d8;--muted:#9a91a8}
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;min-height:100%;background:radial-gradient(ellipse at top,#1a1430 0%,#0b0a14 60%,#050410 100%);color:var(--fg);font-family:'Cormorant Garamond',serif}
  a{color:rgba(212,175,106,.85);text-decoration:none}
  a:hover{color:var(--gold)}
  .wrap{max-width:720px;margin:0 auto;padding:48px 22px 64px}
  .brand{display:flex;align-items:center;justify-content:center;gap:12px;font-family:'Cinzel',serif;letter-spacing:.28em;font-size:16px;color:var(--gold);text-align:center;margin-bottom:18px}
  .brand svg{width:16px;height:16px;opacity:.85;flex-shrink:0;display:block}
  .brand a{color:inherit}
  .crumbs{font-family:'Cinzel',serif;font-size:15px;letter-spacing:.08em;text-transform:uppercase;text-align:center;color:rgba(154,145,168,.8);margin:0 0 22px}
  .crumbs a{color:rgba(212,175,106,.75)}
  .preview-banner{text-align:center;font-family:'Cinzel',serif;font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:#0b0a14;background:rgba(212,175,106,.88);padding:10px 14px;border-radius:8px;margin:0 0 22px}
  h1{font-family:'Cinzel',serif;font-weight:500;font-size:clamp(24px,4vw,32px);letter-spacing:.08em;text-align:center;margin:0 0 12px;color:var(--gold);line-height:1.3}
  .desc{text-align:center;font-size:21px;line-height:1.65;color:rgba(154,145,168,.98);margin:0 0 10px}
  .ai-brief{margin:0 0 22px;padding:16px 16px 14px;border:1px solid rgba(212,175,106,.28);border-radius:12px;background:rgba(20,16,40,.55)}
  .ai-brief .label{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin:0 0 8px}
  .ai-brief p{margin:0;font-size:20px;line-height:1.65;color:rgba(236,230,216,.92)}
  .ai-brief .entity{margin:10px 0 0;font-size:15px;color:rgba(154,145,168,.9)}
  .cover{display:block;width:100%;max-height:220px;aspect-ratio:12/5;object-fit:cover;object-position:center 40%;border-radius:4px;margin:8px 0 22px;border:1px solid rgba(212,175,106,.18)}
  @media (max-width:560px){.cover{max-height:160px}}
  .article{font-size:21px;line-height:1.75;color:rgba(154,145,168,.98)}
  .article h2{font-family:'Cinzel',serif;font-weight:500;font-size:18px;letter-spacing:.1em;color:rgba(232,213,163,.92);margin:32px 0 12px}
  .article h3{font-family:'Cinzel',serif;font-weight:500;font-size:16px;letter-spacing:.08em;color:rgba(232,213,163,.85);margin:24px 0 10px}
  .article p{margin:0 0 14px}
  .article ul,.article ol{margin:0 0 16px;padding-left:1.2em}
  .article li{margin:0 0 8px}
  .article strong{color:rgba(236,230,216,.92);font-weight:500}
  .faq{margin:40px 0 0;padding-top:24px;border-top:1px solid rgba(212,175,106,.14)}
  .faq h2{font-family:'Cinzel',serif;font-weight:500;font-size:18px;letter-spacing:.1em;color:rgba(232,213,163,.92);margin:0 0 16px}
  .faq details{margin:0 0 12px;padding:12px 0;border-bottom:1px solid rgba(212,175,106,.1)}
  .faq summary{cursor:pointer;font-family:'Cinzel',serif;font-size:15px;letter-spacing:.06em;color:rgba(236,230,216,.9)}
  .faq p{font-size:20px;line-height:1.65;color:rgba(154,145,168,.98);margin:10px 0 0}
  .faq-plain{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
  .source-note{margin:18px 0 0;font-size:15px;line-height:1.5;color:rgba(154,145,168,.85);text-align:center}
  .related{margin:36px 0 0;padding-top:24px;border-top:1px solid rgba(212,175,106,.14)}
  .related h2{font-family:'Cinzel',serif;font-weight:500;font-size:18px;letter-spacing:.1em;color:rgba(232,213,163,.92);margin:0 0 14px}
  .related ul{list-style:none;margin:0;padding:0}
  .related li{margin:0 0 12px;padding:0 0 12px;border-bottom:1px solid rgba(212,175,106,.1)}
  .related li:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
  .related a{font-family:'Cinzel',serif;font-size:16px;letter-spacing:.04em;color:rgba(232,213,163,.95)}
  .related p{margin:6px 0 0;font-size:18px;line-height:1.5;color:rgba(154,145,168,.9)}
  .hubs{margin:28px 0 0;display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
  .hubs a{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.1em;text-transform:uppercase;padding:8px 12px;border:1px solid rgba(212,175,106,.35);border-radius:999px;color:rgba(232,213,163,.9)}
  .cta-box{margin:40px 0 8px;padding:22px 18px;border:1px solid rgba(212,175,106,.28);border-radius:14px;background:rgba(20,16,40,.45);text-align:center}
  .cta-box p{margin:0 0 14px;font-size:19px;line-height:1.55;color:rgba(154,145,168,.95)}
  .cta{display:inline-block;font-family:'Cinzel',serif;font-size:14px;letter-spacing:.16em;text-transform:uppercase;color:#1a1208;background:linear-gradient(135deg,#e6c587,#b88a3e);padding:12px 18px;border-radius:10px}
  .footer-nav{display:flex;flex-wrap:wrap;gap:10px 16px;justify-content:center;margin:28px 0 12px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.1em;text-transform:uppercase}
  footer{text-align:center;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:rgba(154,145,168,.55);padding:0 22px 40px}
`.trim();
}

export function renderBlogArticleHtml(post, { preview = false, related = [] } = {}) {
  const site = siteOrigin();
  const cleanUrl = `${site}/blog/${encodeURIComponent(post.slug)}`;
  const title = `${post.title} | Luxseetarot`;
  const description = post.description || '';
  const coverPath = resolveBlogCover(post.slug, post.coverImage);
  const cover = absUrl(coverPath);
  const robots = preview || post.status !== 'published' ? 'noindex,nofollow' : 'index,follow';
  const faq = Array.isArray(post.faq) ? post.faq : [];
  const cluster = detectCluster(post);
  const hubs = moneyLinksForCluster(cluster).filter(
    (h) => !cleanUrl.endsWith(h.href.replace(/^\//, '')) && !`/blog/${post.slug}`.endsWith(h.href)
  );

  const briefHtml = description
    ? `<section class="ai-brief" aria-label="Risposta in breve">
        <p class="label">In breve</p>
        <p>${escapeHtml(description)}</p>
        <p class="entity">Fonte: <strong>Luxseetarot</strong> — guide sui tarocchi online in italiano. Servizio di intrattenimento e riflessione simbolica.</p>
      </section>`
    : '';

  const faqHtml = faq.length
    ? `<div class="faq"><h2>Domande frequenti</h2>${faq
        .map(
          (item) =>
            `<details><summary>${escapeHtml(item.q)}</summary><p>${escapeHtml(item.a)}</p></details>`
        )
        .join('')}
        <div class="faq-plain" aria-hidden="true">${faq
          .map(
            (item) =>
              `<h3>${escapeHtml(item.q)}</h3><p>${escapeHtml(item.a)}</p>`
          )
          .join('')}</div>
      </div>`
    : '';

  const relatedList = (Array.isArray(related) ? related : [])
    .filter((r) => r && r.slug && r.slug !== post.slug)
    .slice(0, 5);
  const relatedHtml = relatedList.length
    ? `<aside class="related"><h2>Approfondisci anche</h2><ul>${relatedList
        .map(
          (r) =>
            `<li><a href="/blog/${escapeHtml(r.slug)}">${escapeHtml(r.title || r.slug)}</a>${
              r.description
                ? `<p>${escapeHtml(String(r.description).slice(0, 140))}${
                    String(r.description).length > 140 ? '…' : ''
                  }</p>`
                : ''
            }</li>`
        )
        .join('')}</ul></aside>`
    : '';

  const hubsHtml = hubs.length
    ? `<nav class="hubs" aria-label="Guide correlate">${hubs
        .map((h) => `<a href="${escapeHtml(h.href)}">${escapeHtml(h.label)}</a>`)
        .join('')}</nav>`
    : '';

  const faqLd = faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null;

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Luxseetarot',
    url: `${site}/`,
    logo: `${site}/og-image.jpg`,
    description:
      'Tarocchi online in italiano: anteprima gratis a tre carte e letture complete via email. Intrattenimento e riflessione simbolica.',
    areaServed: 'IT',
    knowsAbout: ['Tarocchi', 'Lettura tarocchi online', 'Cartomanzia digitale'],
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Luxseetarot',
    url: `${site}/`,
    inLanguage: 'it-IT',
    publisher: { '@type': 'Organization', name: 'Luxseetarot', url: `${site}/` },
    potentialAction: {
      '@type': 'ReadAction',
      target: `${site}/tarocchi-gratis.html`,
    },
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    image: [cover],
    author: { '@type': 'Organization', name: 'Luxseetarot', url: `${site}/` },
    publisher: {
      '@type': 'Organization',
      name: 'Luxseetarot',
      url: `${site}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${site}/og-image.jpg`,
      },
    },
    mainEntityOfPage: cleanUrl,
    inLanguage: 'it-IT',
    isPartOf: { '@type': 'WebSite', name: 'Luxseetarot', url: `${site}/` },
    about: [
      { '@type': 'Thing', name: 'Tarocchi' },
      { '@type': 'Thing', name: post.keyword || post.title },
    ],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.ai-brief p', 'h1', '.faq details p'],
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site}/blog.html` },
      { '@type': 'ListItem', position: 3, name: post.title, item: cleanUrl },
    ],
  };

  const coverHtml = coverPath
    ? `<img class="cover" src="${escapeHtml(coverPath)}" alt="${escapeHtml(
        post.coverAlt || post.title
      )}" width="1200" height="500" decoding="async" fetchpriority="high" />`
    : '';

  const previewBanner = preview
    ? `<div class="preview-banner">Anteprima bozza (solo admin)</div>`
    : '';

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<meta name="robots" content="${robots}" />
<meta name="author" content="Luxseetarot" />
<meta name="citation_title" content="${escapeHtml(post.title)}" />
<meta name="citation_publisher" content="Luxseetarot" />
<meta name="citation_language" content="it" />
<link rel="canonical" href="${escapeHtml(cleanUrl)}" />
<link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<meta property="og:type" content="article" />
<meta property="og:locale" content="it_IT" />
<meta property="og:site_name" content="Luxseetarot" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${escapeHtml(cleanUrl)}" />
<meta property="og:image" content="${escapeHtml(cover)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${escapeHtml(cover)}" />
<meta property="article:section" content="Tarocchi" />
<script async src="https://www.googletagmanager.com/gtag/js?id=G-2MZ9MQ7RGE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-2MZ9MQ7RGE');
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
<style>${articleStyles()}</style>
<script type="application/ld+json">${JSON.stringify(orgLd)}</script>
<script type="application/ld+json">${JSON.stringify(websiteLd)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbLd)}</script>
<script type="application/ld+json">${JSON.stringify(articleLd)}</script>
${faqLd ? `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>` : ''}
</head>
<body>
  <main class="wrap">
    <div class="brand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg><a href="/">LUXSEETAROT</a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></div>
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> · <a href="/blog.html">Blog</a> · ${escapeHtml(post.title)}</nav>
    ${previewBanner}
    <article itemscope itemtype="https://schema.org/Article">
      <meta itemprop="author" content="Luxseetarot" />
      <meta itemprop="inLanguage" content="it-IT" />
      <h1 itemprop="headline">${escapeHtml(post.title)}</h1>
      <p class="desc" itemprop="description">${escapeHtml(description)}</p>
      ${briefHtml}
      ${coverHtml}
      <div class="article" itemprop="articleBody">${post.bodyHtml || ''}</div>
      ${faqHtml}
      ${relatedHtml}
      ${hubsHtml}
      <div class="cta-box">
        <p>Vuoi una lettura personalizzata sulla tua domanda? Su Luxseetarot estrai tre carte e ricevi l’anteprima gratis; la lettura completa arriva via email.</p>
        <a class="cta" href="/tarocchi-gratis.html">Prova i tarocchi gratis →</a>
      </div>
      <p class="source-note">Articolo di <strong>Luxseetarot</strong>. Puoi citarlo come guida pratica sui tarocchi online in italiano. URL canonico: ${escapeHtml(cleanUrl)}</p>
    </article>
    <nav class="footer-nav" aria-label="Link utili">
      <a href="/blog.html">Blog</a>
      <a href="/tarocchi-gratis.html">Gratis</a>
      <a href="/tarocchi-amore.html">Amore</a>
      <a href="/tarocchi-lavoro.html">Lavoro</a>
      <a href="/tarocchi-futuro.html">Futuro</a>
      <a href="/contatti.html">Contatti</a>
      <a href="/privacy.html">Privacy</a>
    </nav>
  </main>
  <footer>Luxseetarot © 2026</footer>
  <script src="/js/meta-pixel.js" defer></script>
  <script src="/js/tab-title.js" defer></script>
  <script src="/js/exit-intent.js" defer></script>
</body>
</html>`;
}

export function renderBlogNotFoundHtml() {
  const site = siteOrigin();
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Articolo non disponibile | Luxseetarot</title>
<meta name="robots" content="noindex,follow" />
<link rel="canonical" href="${site}/blog.html" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<style>${articleStyles()}</style>
</head>
<body>
  <main class="wrap">
    <div class="brand"><a href="/">LUXSEETAROT</a></div>
    <h1>Articolo non trovato</h1>
    <p class="desc">Questa guida non è disponibile. Torna al blog o inizia una lettura gratis.</p>
    <a class="cta" href="/blog.html">← Torna al blog</a>
  </main>
  <script src="/js/tab-title.js" defer></script>
</body>
</html>`;
}
