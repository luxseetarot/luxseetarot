/** Blog posts: Upstash Redis se configurato, altrimenti memoria di processo. */

import { funnelStorageMode } from './funnel.js';
import { getSeedArticles } from './blog-seed-articles.js';
import { getSeedArticlesB } from './blog-seed-articles-b.js';
import { facebookConfigured, shareBlogPostOnFacebook } from './facebook.js';

const INDEX_KEY = 'lux:blog:index';
const PUBLISHED_KEY = 'lux:blog:published';
const memPosts = new Map();

function postKey(slug) {
  return `lux:blog:post:${slug}`;
}

async function redisCommand(cmd) {
  const url = (process.env.UPSTASH_REDIS_REST_URL || '').trim();
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim();
  if (!url || !token) return null;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cmd),
    });
    if (!res.ok) {
      console.error('Upstash blog error:', await res.text());
      return null;
    }
    const data = await res.json();
    return data.result;
  } catch (e) {
    console.error('Upstash blog fetch failed:', e);
    return null;
  }
}

async function redisPipeline(commands) {
  const url = (process.env.UPSTASH_REDIS_REST_URL || '').trim();
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim();
  if (!url || !token || !commands.length) return null;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
    });
    if (!res.ok) {
      console.error('Upstash blog pipeline error:', await res.text());
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data.map((d) => d.result) : null;
  } catch (e) {
    console.error('Upstash blog pipeline failed:', e);
    return null;
  }
}

function parsePostRaw(raw) {
  if (!raw) return null;
  try {
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch {
    return null;
  }
}

async function mgetPosts(slugs) {
  const clean = slugs.map((s) => slugify(s)).filter(Boolean);
  if (!clean.length) return [];
  if (funnelStorageMode() !== 'redis') {
    return clean.map((slug) => memPosts.get(slug) || null);
  }
  const results = await redisPipeline(clean.map((slug) => ['GET', postKey(slug)]));
  if (!results) {
    const posts = [];
    for (const slug of clean) posts.push(await getPost(slug));
    return posts;
  }
  return results.map(parsePostRaw);
}

async function writePostsBatch(posts) {
  if (!posts.length) return;
  if (funnelStorageMode() !== 'redis') {
    for (const post of posts) memPosts.set(post.slug, post);
    return;
  }
  const commands = [];
  for (const post of posts) {
    commands.push(['SET', postKey(post.slug), JSON.stringify(post)]);
    commands.push(['SADD', INDEX_KEY, post.slug]);
    commands.push(
      post.status === 'published'
        ? ['SADD', PUBLISHED_KEY, post.slug]
        : ['SREM', PUBLISHED_KEY, post.slug]
    );
  }
  // Upstash pipeline batches; chunk to avoid huge payloads
  const CHUNK = 60;
  for (let i = 0; i < commands.length; i += CHUNK) {
    await redisPipeline(commands.slice(i, i + CHUNK));
  }
}

export function slugify(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function normalizeStatus(status) {
  const s = String(status || 'draft').toLowerCase();
  if (s === 'published' || s === 'deleted' || s === 'draft') return s;
  return 'draft';
}

function sanitizePost(raw) {
  const now = new Date().toISOString();
  const slug = slugify(raw.slug || raw.title || '');
  if (!slug) return null;
  const status = normalizeStatus(raw.status);
  const faq = Array.isArray(raw.faq)
    ? raw.faq
        .map((item) => ({
          q: String(item.q || item.question || '').trim().slice(0, 200),
          a: String(item.a || item.answer || '').trim().slice(0, 800),
        }))
        .filter((item) => item.q && item.a)
        .slice(0, 12)
    : [];
  let coverImage = String(raw.coverImage || raw.image || '').trim().slice(0, 400);
  if (coverImage && !/^https?:\/\//i.test(coverImage) && !coverImage.startsWith('/')) {
    coverImage = `/${coverImage}`;
  }
  return {
    slug,
    title: String(raw.title || '').trim().slice(0, 160),
    description: String(raw.description || '').trim().slice(0, 320),
    keyword: String(raw.keyword || '').trim().slice(0, 120),
    coverImage: coverImage || '',
    coverAlt: String(raw.coverAlt || '').trim().slice(0, 180),
    status,
    bodyHtml: String(raw.bodyHtml || '').trim().slice(0, 120000),
    faq,
    facebookPostId: String(raw.facebookPostId || '').trim().slice(0, 80),
    facebookPostedAt: String(raw.facebookPostedAt || '').trim().slice(0, 40) || null,
    createdAt: raw.createdAt || now,
    updatedAt: now,
    publishedAt: status === 'published' ? raw.publishedAt || now : raw.publishedAt || null,
  };
}

async function listSlugs() {
  if (funnelStorageMode() === 'redis') {
    const slugs = (await redisCommand(['SMEMBERS', INDEX_KEY])) || [];
    return slugs.map(String);
  }
  return Array.from(memPosts.keys());
}

export async function getPost(slug) {
  const clean = slugify(slug);
  if (!clean) return null;
  if (funnelStorageMode() === 'redis') {
    const raw = await redisCommand(['GET', postKey(clean)]);
    if (!raw) return null;
    try {
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      return null;
    }
  }
  return memPosts.get(clean) || null;
}

export async function listPosts({ status = null, includeDeleted = true } = {}) {
  const slugs = await listSlugs();
  const loaded = await mgetPosts(slugs);
  const posts = [];
  for (const post of loaded) {
    if (!post) continue;
    if (!includeDeleted && post.status === 'deleted') continue;
    if (status && post.status !== status) continue;
    posts.push(post);
  }
  posts.sort((a, b) => {
    const ta = new Date(b.updatedAt || b.createdAt || 0).getTime();
    const tb = new Date(a.updatedAt || a.createdAt || 0).getTime();
    return ta - tb;
  });
  return posts;
}

export async function listPublishedPosts() {
  if (funnelStorageMode() === 'redis') {
    const publishedSlugs = ((await redisCommand(['SMEMBERS', PUBLISHED_KEY])) || []).map(String);
    if (publishedSlugs.length) {
      const loaded = await mgetPosts(publishedSlugs);
      return loaded
        .filter((p) => p && p.status === 'published')
        .sort((a, b) => {
          const ta = new Date(b.updatedAt || b.createdAt || 0).getTime();
          const tb = new Date(a.updatedAt || a.createdAt || 0).getTime();
          return ta - tb;
        });
    }
  }
  const posts = await listPosts({ status: 'published', includeDeleted: false });
  // Ricostruisce l'indice published la prima volta (o se vuoto)
  if (funnelStorageMode() === 'redis' && posts.length) {
    await redisPipeline(posts.map((p) => ['SADD', PUBLISHED_KEY, p.slug]));
  }
  return posts;
}

export async function savePost(input) {
  const post = sanitizePost(input);
  if (!post || !post.title || !post.bodyHtml) {
    return { ok: false, error: 'Titolo e contenuto obbligatori.' };
  }
  const existing = await getPost(post.slug);
  if (existing) {
    post.createdAt = existing.createdAt || post.createdAt;
    if (post.status === 'published' && !post.publishedAt) {
      post.publishedAt = existing.publishedAt || new Date().toISOString();
    }
    if (post.status !== 'published') {
      post.publishedAt = existing.publishedAt || null;
    }
    // Non perdere il collegamento FB se l’editor non lo reinoltra
    if (!post.facebookPostId && existing.facebookPostId) {
      post.facebookPostId = existing.facebookPostId;
      post.facebookPostedAt = existing.facebookPostedAt || null;
    }
  }
  if (funnelStorageMode() === 'redis') {
    await redisPipeline([
      ['SET', postKey(post.slug), JSON.stringify(post)],
      ['SADD', INDEX_KEY, post.slug],
      post.status === 'published'
        ? ['SADD', PUBLISHED_KEY, post.slug]
        : ['SREM', PUBLISHED_KEY, post.slug],
    ]);
  } else {
    memPosts.set(post.slug, post);
  }
  return { ok: true, post };
}

export async function setPostStatus(slug, status) {
  const post = await getPost(slug);
  if (!post) return { ok: false, error: 'Articolo non trovato.' };
  const prevStatus = post.status;
  const next = normalizeStatus(status);
  post.status = next;
  post.updatedAt = new Date().toISOString();
  if (next === 'published') {
    post.publishedAt = post.publishedAt || post.updatedAt;
  }
  const saved = await savePost(post);
  if (!saved.ok) return saved;

  // Al primo passaggio in pubblicato → post automatico su Facebook Page
  if (next === 'published' && prevStatus !== 'published' && !saved.post.facebookPostId) {
    const facebook = await shareBlogPostOnFacebook(saved.post);
    if (facebook.ok && facebook.id && !facebook.alreadyPosted) {
      saved.post.facebookPostId = facebook.id;
      saved.post.facebookPostedAt = new Date().toISOString();
      const again = await savePost(saved.post);
      if (again.ok) saved.post = again.post;
    }
    return { ...saved, facebook, facebookConfigured: facebookConfigured() };
  }

  return { ...saved, facebookConfigured: facebookConfigured() };
}

/** Posta (o riposta) un articolo già pubblicato su Facebook. */
export async function sharePublishedPostOnFacebook(slug, { force = false } = {}) {
  const post = await getPost(slug);
  if (!post) return { ok: false, error: 'Articolo non trovato.' };
  if (post.status !== 'published') {
    return { ok: false, error: 'Pubblica prima l’articolo, poi postalo su Facebook.' };
  }
  const facebook = await shareBlogPostOnFacebook(post, { force });
  if (!facebook.ok) {
    return {
      ok: false,
      facebook,
      facebookConfigured: facebookConfigured(),
      error: facebook.error || 'Facebook ha rifiutato.',
    };
  }
  if (facebook.alreadyPosted && !force) {
    return { ok: true, post, facebook, facebookConfigured: facebookConfigured() };
  }
  let updated = post;
  if (facebook.id) {
    updated = {
      ...post,
      facebookPostId: facebook.id,
      facebookPostedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const again = await savePost(updated);
    if (again.ok) updated = again.post;
  }
  return { ok: true, post: updated, facebook, facebookConfigured: facebookConfigured() };
}

export function getDemoArticle() {
  const now = new Date().toISOString();
  return {
    slug: 'come-fare-una-domanda-ai-tarocchi',
    title: 'Come fare una domanda ai tarocchi (guida pratica)',
    description:
      'Impara a formulare una domanda chiara ai tarocchi: esempi utili, errori da evitare e come ottenere una lettura più leggibile su Luxseetarot.',
    keyword: 'come fare una domanda ai tarocchi',
    coverImage: '/images/blog/come-fare-una-domanda-ai-tarocchi.jpg?v=3',
    coverAlt: 'Taccuino, penna e carte dei tarocchi per formulare una domanda',
    status: 'draft',
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
    faq: [
      {
        q: 'Meglio una domanda chiusa o aperta?',
        a: 'Meglio una domanda aperta e concreta. Le domande sì/no assolute tendono a irrigidire la lettura; quelle aperte lasciano spazio a dinamiche e consigli pratici.',
      },
      {
        q: 'Posso chiedere del futuro in modo utile?',
        a: 'Sì, se indichi un ambito (amore, lavoro, scelta) e un orizzonte di senso. Evita date certe o richieste di garanzia assoluta.',
      },
      {
        q: 'Quante domande posso fare in una lettura?',
        a: 'Per una lettura a tre carte conviene una domanda principale. Se emergono dettagli, puoi approfondire dopo con nuove domande sulle stesse carte.',
      },
    ],
    bodyHtml: `
<p>Una lettura dei tarocchi funziona meglio quando la domanda è chiara. Non serve essere “esperti”: basta sapere <strong>cosa vuoi capire</strong> e formulare la richiesta in modo onesto, senza forzare la risposta.</p>
<p>Su Luxseetarot poni una domanda, estrai tre carte (passato, presente, futuro) e ricevi un testo simbolico per riflettere. Questa guida ti aiuta a scrivere una domanda che renda la lettura più utile e meno confusa, soprattutto se è la prima volta che consulti le carte online.</p>

<h2>Perché la domanda conta così tanto</h2>
<p>Le carte non “leggono la mente”: rispondono al focus che dai. Se la domanda è vaga (“Cosa mi aspetta?”), anche la lettura rischia di restare generica. Se invece indichi un tema preciso — una relazione, un lavoro, una scelta — il testo può entrare nel merito di emozioni, tempi e prossimi passi simbolici.</p>
<p>Una domanda ben formulata fa anche un altro lavoro importante: ti obbliga a mettere in ordine ciò che senti. Spesso, già mentre la scrivi, capisci cosa ti preoccupa davvero e cosa invece è rumore di fondo.</p>
<p>Ricorda: si tratta di intrattenimento e riflessione, non di certezza assoluta né di consiglio medico, legale o finanziario.</p>

<h2>La formula semplice che funziona</h2>
<p>Una buona domanda ha di solito tre elementi:</p>
<ul>
  <li><strong>Chi</strong>: tu, una relazione, una situazione (senza ossessionarti sull’altro).</li>
  <li><strong>Cosa</strong>: l’aspetto che vuoi chiarire (sentimenti, direzione, blocco, scelta).</li>
  <li><strong>Orizzonte</strong>: “ora”, “in questo periodo”, “per il prossimo passo” — non necessariamente una data.</li>
</ul>
<p>Esempio debole: “Mi ama?”.<br/>Esempio più utile: “Quale energia c’è tra me e questa persona in questo momento, e come posso muovermi con più chiarezza?”.</p>
<p>La seconda versione non chiede una sentenza definitiva: apre uno spazio. Lascia emergere il clima emotivo, i tuoi margini di azione e i segnali a cui prestare attenzione.</p>

<h2>Esempi di buone domande</h2>
<h3>Amore</h3>
<ul>
  <li>Cosa sta succedendo davvero tra me e questa persona adesso?</li>
  <li>Quale atteggiamento mi aiuta a non perdermi in questa relazione?</li>
  <li>È il momento di parlare oppure di prendere distanza con rispetto?</li>
  <li>Quale dinamiche sto ripetendo e come posso uscirne con più consapevolezza?</li>
</ul>
<h3>Lavoro</h3>
<ul>
  <li>Quale energia sto portando in questo lavoro e cosa mi frena?</li>
  <li>Cosa mi conviene osservare prima di decidere un cambio?</li>
  <li>Come presentarmi meglio in questo colloquio o progetto?</li>
  <li>Dove sto dissipando energie e cosa posso proteggere nelle prossime settimane?</li>
</ul>
<h3>Futuro / scelte</h3>
<ul>
  <li>Quale direzione mi è più utile esplorare in questo periodo?</li>
  <li>Cosa posso preparare prima di fare il prossimo passo?</li>
  <li>Quale lezione sto ancora evitando in questa situazione?</li>
  <li>Quale opportunità sto sottovalutando perché mi fa paura?</li>
</ul>

<h2>Errori da evitare</h2>
<ul>
  <li><strong>Domande a garanzia</strong>: “Dimmi che andrà tutto bene” chiude lo spazio di riflessione.</li>
  <li><strong>Troppi temi insieme</strong>: amore + lavoro + soldi in una sola frase confondono il focus.</li>
  <li><strong>Controllo sull’altro</strong>: “Cosa pensa lui/lei minuto per minuto?” spesso genera ansia più che chiarezza. Meglio chiedere il tuo ruolo e la dinamica.</li>
  <li><strong>Date assolute</strong>: “Il giorno esatto in cui…” raramente aiuta; meglio “in questa fase” o “per il prossimo passo”.</li>
  <li><strong>Domande accusatorie</strong>: se parti già con una sentenza (“Perché mi sta tradendo?”), rischi di leggere solo conferma del tuo sospetto, non il quadro più ampio.</li>
</ul>

<h2>Come passare da una domanda confusa a una chiara</h2>
<p>Se senti di avere troppe cose in testa, prova questo passaggio in tre minuti:</p>
<ol>
  <li>Scrivi tutto quello che vorresti sapere, anche in modo disordinato.</li>
  <li>Sottolinea una sola frase che ti sembra il vero nodo.</li>
  <li>Riscrivila in forma aperta, centrata su di te e sul prossimo passo utile.</li>
</ol>
<p>Esempio: da “Tornerà? Mi vuole? Devo aspettarlo?” a “Quale energia c’è tra noi ora e quale atteggiamento mi aiuta a restare centrata/o?”.</p>

<h2>Come usarla su Luxseetarot</h2>
<p>Quando hai la domanda pronta:</p>
<ol>
  <li>Vai alla home e inserisci nome, data di nascita, email e la domanda.</li>
  <li>Scegli tre carte.</li>
  <li>Leggi l’anteprima gratuita.</li>
  <li>Se vuoi, sblocca la lettura completa o approfondisci con nuove domande sulle stesse carte.</li>
</ol>
<p>Una domanda ben fatta non “obbliga” le carte a darti ragione: ti aiuta a ricevere un testo più leggibile, personale e concreto rispetto a ciò che stai vivendo. Se dopo la lettura emergono dettagli, puoi approfondire senza cambiare le carte, mantenendo il filo della consultazione.</p>

<h2>Piccolo esercizio prima di iniziare</h2>
<p>Scrivi la tua domanda in una riga. Poi chiediti:</p>
<ul>
  <li>Sto cercando chiarezza o solo rassicurazione?</li>
  <li>Posso riformularla in modo più aperto?</li>
  <li>C’è un solo tema principale?</li>
  <li>Se la risposta mi facesse un po’ di male, sarei comunque disposto/a a ascoltarla?</li>
</ul>
<p>Se la risposta è sì, sei pronto. Puoi iniziare subito la lettura gratuita dalla home di Luxseetarot e usare questa guida come riferimento ogni volta che non sai da dove partire.</p>
<h2>Approfondisci</h2>
<ul>
  <li><a href="/blog/tarocchi-si-o-no">Tarocchi sì o no: quando ha senso</a></li>
  <li><a href="/blog/lettura-tarocchi-tre-carte">Lettura a tre carte: passato, presente, futuro</a></li>
  <li><a href="/blog/tarocchi-amore-domande-esempi">20 domande utili in amore</a></li>
  <li><a href="/blog/errori-comuni-lettura-tarocchi">Errori comuni nella lettura</a></li>
  <li><a href="/blog/preparazione-prima-di-una-lettura">Preparazione prima di una lettura</a></li>
</ul>
<p><a href="/">Inizia la lettura gratuita →</a></p>
`.trim(),
  };
}

function catalogArticles() {
  const map = new Map();
  map.set('come-fare-una-domanda-ai-tarocchi', getDemoArticle());
  for (const post of [...getSeedArticles(), ...getSeedArticlesB()]) {
    if (!map.has(post.slug)) map.set(post.slug, post);
  }
  return Array.from(map.values());
}

/**
 * Seed catalogo:
 * - default: inserisce solo gli slug mancanti (veloce)
 * - syncContent: aggiorna testo/cover delle bozze esistenti (solo su richiesta admin)
 * - force: riscrive anche i presenti (admin)
 */
export async function seedDemoArticle({ force = false, syncContent = false } = {}) {
  const catalog = catalogArticles();
  const existingSlugs = await listSlugs();
  const existingSet = new Set(existingSlugs);

  if (!force && !syncContent && catalog.every((a) => existingSet.has(a.slug))) {
    return {
      ok: true,
      seeded: 0,
      patched: 0,
      skipped: catalog.length,
      total: catalog.length,
      posts: [],
    };
  }

  const slugsToLoad = catalog
    .filter((a) => existingSet.has(a.slug) && (force || syncContent))
    .map((a) => a.slug);
  const loaded = slugsToLoad.length ? await mgetPosts(slugsToLoad) : [];
  const existingBySlug = new Map();
  slugsToLoad.forEach((slug, i) => {
    if (loaded[i]) existingBySlug.set(slug, loaded[i]);
  });

  let seeded = 0;
  let patched = 0;
  let skipped = 0;
  const toWrite = [];

  for (const demo of catalog) {
    const existing = existingBySlug.get(demo.slug) || null;
    const has = existingSet.has(demo.slug);

    if (!has) {
      const post = sanitizePost({ ...demo, status: 'draft' });
      if (post) {
        toWrite.push(post);
        seeded += 1;
      }
      continue;
    }

    if (force) {
      const base = existing || demo;
      const post = sanitizePost({
        ...demo,
        status: base.status || demo.status,
        createdAt: base.createdAt,
        publishedAt: base.publishedAt,
      });
      if (post) {
        toWrite.push(post);
        seeded += 1;
      }
      continue;
    }

    if (syncContent && existing && existing.status === 'draft') {
      const post = sanitizePost({
        ...existing,
        title: demo.title,
        description: demo.description,
        keyword: demo.keyword,
        bodyHtml: demo.bodyHtml,
        faq: demo.faq || existing.faq || [],
        coverImage: demo.coverImage || existing.coverImage || '',
        coverAlt: demo.coverAlt || existing.coverAlt || '',
        status: 'draft',
        createdAt: existing.createdAt,
        publishedAt: existing.publishedAt,
      });
      if (post) {
        toWrite.push(post);
        patched += 1;
      }
      continue;
    }

    skipped += 1;
  }

  await writePostsBatch(toWrite);

  return {
    ok: true,
    seeded,
    patched,
    skipped,
    total: catalog.length,
    posts: toWrite,
  };
}

export function blogCounts(posts) {
  return {
    total: posts.length,
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
    deleted: posts.filter((p) => p.status === 'deleted').length,
  };
}
