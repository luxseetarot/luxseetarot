import { listPublishedPosts } from './_lib/blog.js';

function siteOrigin() {
  const raw = (process.env.SITE_URL || 'https://www.luxseetarot.com').trim();
  return raw.replace(/\/$/, '') || 'https://www.luxseetarot.com';
}

function escapeXml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    return res.end('Method not allowed');
  }

  try {
    const site = siteOrigin();
    const today = new Date().toISOString().slice(0, 10);
    const staticPages = [
      ['/', today, 'weekly', '1.0'],
      ['/tarocchi-gratis.html', today, 'weekly', '0.9'],
      ['/tarocchi-amore.html', today, 'monthly', '0.8'],
      ['/tarocchi-lavoro.html', today, 'monthly', '0.8'],
      ['/tarocchi-futuro.html', today, 'monthly', '0.8'],
      ['/blog.html', today, 'weekly', '0.7'],
      ['/chi-siamo.html', today, 'monthly', '0.6'],
      ['/contatti.html', today, 'monthly', '0.5'],
      ['/privacy.html', today, 'yearly', '0.3'],
    ];

    let blogEntries = [];
    try {
      const posts = await listPublishedPosts();
      blogEntries = posts.map((p) => {
        const last = (p.updatedAt || p.publishedAt || today).slice(0, 10);
        return urlEntry(`${site}/blog/${encodeURIComponent(p.slug)}`, last, 'monthly', '0.65');
      });
    } catch (blogErr) {
      console.error('sitemap blog list error:', blogErr);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(([path, last, freq, pri]) => urlEntry(`${site}${path}`, last, freq, pri)).join('\n')}
${blogEntries.join('\n')}
</urlset>
`;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.end(xml);
  } catch (err) {
    console.error('sitemap error:', err);
    // Non lasciare Google a mani vuote: almeno le pagine statiche.
    const site = siteOrigin();
    const today = new Date().toISOString().slice(0, 10);
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntry(`${site}/`, today, 'weekly', '1.0')}
</urlset>
`;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.end(fallback);
  }
}
