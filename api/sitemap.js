import { listPublishedSitemapEntries } from './_lib/blog.js';
import { defaultCoverForSlug } from './_lib/blog-covers.js';

export const config = {
  maxDuration: 20,
};

function siteOrigin() {
  let raw = (process.env.SITE_URL || 'https://www.luxseetarot.com').trim().replace(/\/$/, '');
  if (!raw) raw = 'https://www.luxseetarot.com';
  if (raw === 'https://luxseetarot.com' || raw === 'http://luxseetarot.com') {
    raw = 'https://www.luxseetarot.com';
  }
  return raw;
}

function escapeXml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function urlEntry(loc, lastmod, changefreq, priority, imageLoc) {
  const imageXml = imageLoc
    ? `
    <image:image>
      <image:loc>${escapeXml(imageLoc)}</image:loc>
    </image:image>`
    : '';
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageXml}
  </url>`;
}

function safeDate(raw, fallback) {
  const s = String(raw || '').slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : fallback;
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    return res.end('Method not allowed');
  }

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
    const posts = await listPublishedSitemapEntries();
    blogEntries = posts
      .filter((p) => p && p.slug)
      .map((p) => {
        const last = safeDate(p.lastmod, today);
        const cover = defaultCoverForSlug(p.slug);
        const imageLoc = cover ? `${site}${cover}` : '';
        // Non encode hyphenated slugs: Google preferisce URL “pulite”
        return urlEntry(`${site}/blog/${p.slug}`, last, 'monthly', '0.65', imageLoc);
      });
  } catch (blogErr) {
    console.error('sitemap blog list error:', blogErr);
  }

  try {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPages.map(([path, last, freq, pri]) => urlEntry(`${site}${path}`, last, freq, pri)).join('\n')}
${blogEntries.join('\n')}
</urlset>
`;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
    res.setHeader('X-Robots-Tag', 'all');
    res.end(xml);
  } catch (err) {
    console.error('sitemap error:', err);
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(([path, last, freq, pri]) => urlEntry(`${site}${path}`, last, freq, pri)).join('\n')}
</urlset>
`;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'all');
    res.end(fallback);
  }
}
