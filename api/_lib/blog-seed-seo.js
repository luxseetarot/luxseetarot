/**
 * Keyword da ricerche correlate Google (“tarocchi gratis”) da spargere
 * nei seed blog in modo tematico (niente stuffing cieco).
 */

const BLOCK_ATTR = 'data-seo-keywords="1"';

const CLUSTERS = {
  amore: {
    match: /amore|ex|relazion|coppia|gelos|riconcili|single|fiamma|tradiment|scelta.tra.due|perdono|comunicazione|nuova.relazion|pens[ao]|sentim/i,
    html: `<h2 ${BLOCK_ATTR}>Parole che le persone cercano in amore</h2>
<p>Chi arriva su questo tema digita spesso <strong>tarocchi gratis amore</strong>, <strong>tarocchi gratis amore tre carte</strong>, <strong>tarocchi 3 carte gratis amore</strong>, <strong>tarocchi amore futuro immediato</strong>, <strong>tarocchi amore gratis una carta</strong>, <strong>tarocchi 1 carta gratis amore</strong>, <strong>tarocchi gratis amore sì o no</strong>, <strong>tarocchi amore con data di nascita gratis</strong>, <strong>tarocchi gratis amore zingara</strong>, <strong>carte amore destino gratis</strong> o <strong>sibille amore gratis tre carte</strong>. Su Luxseetarot rispondi con una domanda chiara e un’anteprima a tre carte: vedi <a href="/tarocchi-amore.html">tarocchi amore</a> e <a href="/tarocchi-gratis.html">tarocchi gratis</a>.</p>`,
  },
  futuro: {
    match: /futuro|giorno|settimana|mensile|prossimo|imminente|destini|karma|cambiamento|trasformazion|decision/i,
    html: `<h2 ${BLOCK_ATTR}>Parole che le persone cercano sul futuro</h2>
<p>Ricerche tipiche: <strong>tarocchi futuro imminente 9 carte gratis</strong>, <strong>tarocchi amore futuro immediato</strong>, <strong>tarocchi del destino gratis</strong>, <strong>le carte del destino gratis</strong>, <strong>tarocchi karma destino gratis</strong>, <strong>tarocchi 10 carte gratis</strong> e <strong>tarocchi carta del giorno gratis</strong>. Per chiarezza partiamo da tre carte leggibili: <a href="/tarocchi-futuro.html">tarocchi futuro</a> o <a href="/blog/tarocchi-futuro-imminente-9-carte">futuro imminente 9 carte</a>.</p>`,
  },
  gratis: {
    match: /gratis|online|cartomanzia|affidabil|attendibil|distanza|casa|principiant|quotidiani|abitudine|etica|preparazione|lettura tarocchi|senza registrazione|una carta|tre carte|browser|app/i,
    html: `<h2 ${BLOCK_ATTR}>Parole che le persone cercano sui tarocchi gratis</h2>
<p>Oltre a <strong>lettura tarocchi gratis</strong> e <strong>lettura tarocchi gratuita</strong> compaiono <strong>tarocchi gratis online</strong>, <strong>lettura tarocchi gratis senza registrazione</strong>, <strong>tarocchi online gratis attendibili</strong>, <strong>tarocchi 1 carta gratis</strong>, <strong>tarocchi gratis amore tre carte</strong>, <strong>tarocchi gratis sì o no</strong>, <strong>tarocchi del destino gratis</strong> e <strong>tarocchi carta del giorno gratis</strong>. L’anteprima Luxseetarot resta su <a href="/tarocchi-gratis.html">tarocchi gratis</a>.</p>`,
  },
  stesa: {
    match: /stesa|croce|celtica|carte|spread|mescol|rovesciat|combinazion|semi|arcani|mazzo|rider|napoletan|sibill|oracolo/i,
    html: `<h2 ${BLOCK_ATTR}>Formati di lettura cercati spesso</h2>
<p>Su Google vedi anche <strong>tarocchi 1 carta gratis</strong>, <strong>tarocchi gratis amore tre carte</strong>, <strong>tarocchi futuro imminente 9 carte gratis</strong>, <strong>tarocchi 10 carte gratis</strong>, <strong>sibille amore gratis tre carte</strong> e <strong>tarocchi gratis tre carte napoletane</strong>. Su Luxseetarot lo schema base è tre carte: <a href="/blog/lettura-tarocchi-tre-carte">lettura a tre carte</a>.</p>`,
  },
};

const FALLBACK = `<h2 ${BLOCK_ATTR}>Collegamenti alle ricerche più comuni</h2>
<p>Se sei arrivato da ricerche come <strong>tarocchi gratis online</strong>, <strong>tarocchi gratis amore</strong>, <strong>tarocchi gratis sì o no</strong>, <strong>tarocchi 1 carta gratis</strong>, <strong>tarocchi del destino gratis</strong> o <strong>tarocchi carta del giorno gratis</strong>, puoi partire dall’anteprima su <a href="/tarocchi-gratis.html">tarocchi gratis</a> e poi tornare a questa guida.</p>`;

/**
 * Aggiunge (una sola volta) un blocco keyword tematico nel bodyHtml del seed.
 * @param {object} partial
 * @returns {object}
 */
export function withSeoKeywords(partial) {
  const p = { ...partial };
  let body = String(p.bodyHtml || '');
  if (!body || body.includes(BLOCK_ATTR)) return p;

  const hay = `${p.slug || ''} ${p.keyword || ''} ${p.title || ''} ${p.description || ''}`;
  const blocks = [];
  for (const key of Object.keys(CLUSTERS)) {
    if (CLUSTERS[key].match.test(hay)) blocks.push(CLUSTERS[key].html);
  }
  const seo = blocks.length ? blocks.slice(0, 2).join('\n') : FALLBACK;

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
