/** HTML server-side per articoli blog (indicizzabile quando published). */

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function siteOrigin() {
  const raw = (process.env.SITE_URL || 'https://www.luxseetarot.com').trim();
  return raw.replace(/\/$/, '') || 'https://www.luxseetarot.com';
}

function absUrl(pathOrUrl) {
  const site = siteOrigin();
  const p = String(pathOrUrl || '').trim();
  if (!p) return `${site}/og-image.jpg`;
  if (/^https?:\/\//i.test(p)) return p.split('?')[0] + (p.includes('?') ? p.slice(p.indexOf('?')) : '');
  return site + (p.startsWith('/') ? p : `/${p}`);
}

function articleStyles() {
  return `
  :root{--ink:#0b0a14;--gold:#d4af6a;--fg:#ece6d8;--muted:#9a91a8}
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;min-height:100%;background:radial-gradient(ellipse at top,#1a1430 0%,#0b0a14 60%,#050410 100%);color:var(--fg);font-family:'Cormorant Garamond',serif}
  a{color:rgba(212,175,106,.85);text-decoration:none}
  a:hover{color:var(--gold)}
  .wrap{max-width:720px;margin:0 auto;padding:48px 22px 64px}
  .brand{font-family:'Cinzel',serif;letter-spacing:.28em;font-size:13px;color:var(--gold);text-align:center;margin-bottom:18px}
  .crumbs{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;text-align:center;color:rgba(154,145,168,.8);margin:0 0 22px}
  .crumbs a{color:rgba(212,175,106,.75)}
  .preview-banner{text-align:center;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#0b0a14;background:rgba(212,175,106,.88);padding:10px 14px;border-radius:8px;margin:0 0 22px}
  h1{font-family:'Cinzel',serif;font-weight:500;font-size:clamp(22px,4vw,30px);letter-spacing:.08em;text-align:center;margin:0 0 12px;color:var(--gold);line-height:1.3}
  .desc{text-align:center;font-size:19px;line-height:1.65;color:rgba(154,145,168,.98);margin:0 0 10px}
  .cover{display:block;width:100%;max-height:220px;aspect-ratio:12/5;object-fit:cover;object-position:center 40%;border-radius:4px;margin:8px 0 22px;border:1px solid rgba(212,175,106,.18)}
  @media (max-width:560px){.cover{max-height:160px}}
  .article{font-size:19px;line-height:1.75;color:rgba(154,145,168,.98)}
  .article h2{font-family:'Cinzel',serif;font-weight:500;font-size:16px;letter-spacing:.1em;color:rgba(232,213,163,.92);margin:32px 0 12px}
  .article h3{font-family:'Cinzel',serif;font-weight:500;font-size:14px;letter-spacing:.08em;color:rgba(232,213,163,.85);margin:24px 0 10px}
  .article p{margin:0 0 14px}
  .article ul,.article ol{margin:0 0 16px;padding-left:1.2em}
  .article li{margin:0 0 8px}
  .article strong{color:rgba(236,230,216,.92);font-weight:500}
  .faq{margin:40px 0 0;padding-top:24px;border-top:1px solid rgba(212,175,106,.14)}
  .faq h2{font-family:'Cinzel',serif;font-weight:500;font-size:16px;letter-spacing:.1em;color:rgba(232,213,163,.92);margin:0 0 16px}
  .faq details{margin:0 0 12px;padding:12px 0;border-bottom:1px solid rgba(212,175,106,.1)}
  .faq summary{cursor:pointer;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.06em;color:rgba(236,230,216,.9)}
  .faq p{font-size:18px;line-height:1.65;color:rgba(154,145,168,.98);margin:10px 0 0}
  .cta{display:block;text-align:center;margin:40px 0 8px;font-family:'Cinzel',serif;font-size:12px;letter-spacing:.16em;text-transform:uppercase}
  .footer-nav{display:flex;flex-wrap:wrap;gap:10px 16px;justify-content:center;margin:28px 0 12px;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase}
  footer{text-align:center;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(154,145,168,.55);padding:0 22px 40px}
`.trim();
}

export function renderBlogArticleHtml(post, { preview = false } = {}) {
  const site = siteOrigin();
  const cleanUrl = `${site}/blog/${encodeURIComponent(post.slug)}`;
  const title = `${post.title} | Luxseetarot`;
  const description = post.description || '';
  const cover = post.coverImage ? absUrl(post.coverImage) : `${site}/og-image.jpg`;
  const robots = preview || post.status !== 'published' ? 'noindex,nofollow' : 'index,follow';
  const faq = Array.isArray(post.faq) ? post.faq : [];

  const faqHtml = faq.length
    ? `<div class="faq"><h2>Domande frequenti</h2>${faq
        .map(
          (item) =>
            `<details><summary>${escapeHtml(item.q)}</summary><p>${escapeHtml(item.a)}</p></details>`
        )
        .join('')}</div>`
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

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    image: [cover],
    author: { '@type': 'Organization', name: 'Luxseetarot' },
    publisher: {
      '@type': 'Organization',
      name: 'Luxseetarot',
      url: `${site}/`,
    },
    mainEntityOfPage: cleanUrl,
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

  const coverHtml = post.coverImage
    ? `<img class="cover" src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.coverAlt || post.title)}" width="1400" height="583" decoding="async" />`
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
<link rel="canonical" href="${escapeHtml(cleanUrl)}" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<meta property="og:type" content="article" />
<meta property="og:locale" content="it_IT" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${escapeHtml(cleanUrl)}" />
<meta property="og:image" content="${escapeHtml(cover)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${escapeHtml(cover)}" />
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
<script type="application/ld+json">${JSON.stringify(breadcrumbLd)}</script>
<script type="application/ld+json">${JSON.stringify(articleLd)}</script>
${faqLd ? `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>` : ''}
</head>
<body>
  <main class="wrap">
    <div class="brand"><a href="/">LUXSEETAROT</a></div>
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> · <a href="/blog.html">Blog</a> · ${escapeHtml(post.title)}</nav>
    ${previewBanner}
    <article>
      <h1>${escapeHtml(post.title)}</h1>
      <p class="desc">${escapeHtml(description)}</p>
      ${coverHtml}
      <div class="article">${post.bodyHtml || ''}</div>
      ${faqHtml}
      <a class="cta" href="/">Inizia la lettura gratuita →</a>
    </article>
    <nav class="footer-nav" aria-label="Link utili">
      <a href="/blog.html">Blog</a>
      <a href="/tarocchi-amore.html">Amore</a>
      <a href="/contatti.html">Contatti</a>
      <a href="/privacy.html">Privacy</a>
    </nav>
  </main>
  <footer>Luxseetarot © 2026</footer>
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
<meta name="robots" content="noindex,nofollow" />
<link rel="canonical" href="${site}/blog.html" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<style>${articleStyles()}</style>
</head>
<body>
  <main class="wrap">
    <div class="brand"><a href="/">LUXSEETAROT</a></div>
    <h1>Articolo non disponibile</h1>
    <p class="desc">Questo contenuto non è pubblico oppure non esiste.</p>
    <a class="cta" href="/blog.html">← Torna al blog</a>
  </main>
  <footer>Luxseetarot © 2026</footer>
</body>
</html>`;
}
