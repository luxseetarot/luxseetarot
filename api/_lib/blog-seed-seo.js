/**
 * Blocchi SEO tematici (naturali) + link alle money page.
 * Una sola volta per articolo, senza liste keyword lunghe.
 */

const BLOCK_ATTR = 'data-seo-keywords="1"';

const CLUSTERS = {
  amore: {
    match: /amore|ex|relazion|coppia|gelos|riconcili|single|fiamma|tradiment|scelta.tra.due|perdono|comunicazione|nuova.relazion|pens[ao]|sentim/i,
    html: `<h2 ${BLOCK_ATTR}>Se cerchi chiarezza in amore</h2>
<p>Molte persone arrivano qui cercando <strong>tarocchi gratis amore</strong> o una lettura a tre carte sui sentimenti. Parti da una domanda aperta, poi leggi l’anteprima: <a href="/tarocchi-amore.html">tarocchi amore</a>, <a href="/blog/tarocchi-amore-domande-esempi">esempi di domande</a> e <a href="/tarocchi-gratis.html">tarocchi gratis</a>.</p>`,
  },
  futuro: {
    match: /futuro|giorno|settimana|mensile|prossimo|imminente|destini|karma|cambiamento|trasformazion|decision/i,
    html: `<h2 ${BLOCK_ATTR}>Se cerchi una direzione sul futuro</h2>
<p>Per orientarti sul prossimo passo funziona meglio una domanda concreta e una stesa leggibile: <a href="/tarocchi-futuro.html">tarocchi futuro</a>, <a href="/blog/tarocchi-futuro-imminente-9-carte">futuro imminente</a> oppure l’anteprima su <a href="/tarocchi-gratis.html">tarocchi gratis</a>.</p>`,
  },
  lavoro: {
    match: /lavoro|carriera|colloquio|burnout|denar|soldi|risors|profession/i,
    html: `<h2 ${BLOCK_ATTR}>Se la domanda è su lavoro o risorse</h2>
<p>Utile chiedere “cosa mi aiuta ora” più che un sì/no assoluto. Approfondisci su <a href="/tarocchi-lavoro.html">tarocchi lavoro</a>, <a href="/blog/tarocchi-lavoro-carriera">carriera</a> e prova subito su <a href="/tarocchi-gratis.html">tarocchi gratis</a>.</p>`,
  },
  gratis: {
    match: /gratis|online|cartomanzia|affidabil|attendibil|distanza|casa|principiant|quotidiani|abitudine|etica|preparazione|lettura tarocchi|senza registrazione|una carta|tre carte|browser|app/i,
    html: `<h2 ${BLOCK_ATTR}>Tarocchi gratis online, senza frizione</h2>
<p>Se cerchi una <strong>lettura tarocchi gratis</strong> chiara e privata, su Luxseetarot estrai tre carte e ricevi subito l’anteprima: <a href="/tarocchi-gratis.html">inizia qui</a>. Per capire come chiedere bene, leggi anche <a href="/blog/come-fare-una-domanda-ai-tarocchi">come fare una domanda</a>.</p>`,
  },
  stesa: {
    match: /stesa|croce|celtica|carte|spread|mescol|rovesciat|combinazion|semi|arcani|mazzo|rider|napoletan|sibill|oracolo/i,
    html: `<h2 ${BLOCK_ATTR}>Stese e formati di lettura</h2>
<p>Lo schema più chiaro per iniziare resta la <a href="/blog/lettura-tarocchi-tre-carte">lettura a tre carte</a> (passato, presente, futuro). Poi puoi passare a stese più ampie, tenendo una sola domanda per volta. Prova l’anteprima su <a href="/tarocchi-gratis.html">tarocchi gratis</a>.</p>`,
  },
};

const FALLBACK = `<h2 ${BLOCK_ATTR}>Da lettura a pratica</h2>
<p>Se sei arrivato cercando <strong>tarocchi gratis online</strong>, parti dall’anteprima su <a href="/tarocchi-gratis.html">tarocchi gratis</a>, poi torna a questa guida. Per formulare meglio la domanda: <a href="/blog/come-fare-una-domanda-ai-tarocchi">come fare una domanda ai tarocchi</a>.</p>`;

/**
 * Aggiunge (una sola volta) un blocco tematico nel bodyHtml del seed.
 * @param {object} partial
 * @returns {object}
 */
export function withSeoKeywords(partial) {
  const p = { ...partial };
  let body = String(p.bodyHtml || '');
  if (!body) return p;

  // Aggiorna eventuali blocchi SEO vecchi (stuffing) con la versione attuale
  body = body.replace(
    /<h2[^>]*data-seo-keywords="1"[^>]*>[\s\S]*?<\/h2>\s*<p>[\s\S]*?<\/p>\s*/gi,
    ''
  );

  const hay = `${p.slug || ''} ${p.keyword || ''} ${p.title || ''} ${p.description || ''}`;
  const blocks = [];
  for (const key of Object.keys(CLUSTERS)) {
    if (CLUSTERS[key].match.test(hay)) blocks.push(CLUSTERS[key].html);
  }
  // Max 1 blocco: meno stuffing, più focus
  const seo = blocks.length ? blocks[0] : FALLBACK;

  const ctaRe = /<p><a href="\/tarocchi-gratis\.html">Prova i tarocchi gratis[^<]*<\/a><\/p>\s*$/;
  if (ctaRe.test(body)) {
    body = body.replace(ctaRe, `${seo}\n$&`);
  } else if (body.includes('<h2>Approfondisci</h2>')) {
    body = body.replace('<h2>Approfondisci</h2>', `${seo}\n<h2>Approfondisci</h2>`);
  } else {
    body = `${body}\n${seo}`;
  }

  p.bodyHtml = body;
  return p;
}
