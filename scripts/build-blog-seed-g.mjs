/**
 * Genera api/_lib/blog-seed-articles-g.js — 40 articoli draft lunghi + SEO long-tail.
 * Keyword focus: lettura tarocchi gratis / gratuita + code lunghe IT.
 *
 *   node scripts/build-blog-seed-g.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'api', '_lib', 'blog-seed-articles-g.js');

/** 40 temi nuovi (slug non presenti nei seed A–F). */
const ARTICLES = [
  {
    slug: 'tarocchi-marsiglia-vs-rider-waite',
    title: 'Tarocchi di Marsiglia vs Rider-Waite: differenze pratiche',
    keyword: 'tarocchi marsiglia rider waite',
    coverAlt: 'Due mazzi di tarocchi a confronto su tavolo soft',
    longtails: ['significato carte tarocchi marsiglia', 'differenza mazzo rider waite', 'quale mazzo tarocchi scegliere'],
    angle: 'confronto tra due tradizioni di mazzo, senza snobismo',
  },
  {
    slug: 'chiarificatori-tarocchi-cosa-sono',
    title: 'Chiarificatori nei tarocchi: a cosa servono davvero',
    keyword: 'chiarificatori tarocchi',
    coverAlt: 'Carta extra di chiarimento accanto a una stesa',
    longtails: ['carta chiarificatrice tarocchi', 'come usare i chiarificatori', 'troppe carte in una lettura'],
    angle: 'quando aggiungere una carta e quando fermarsi',
  },
  {
    slug: 'significatore-tarocchi-come-scegliere',
    title: 'Significatore nei tarocchi: cos’è e come si sceglie',
    keyword: 'significatore tarocchi',
    coverAlt: 'Una carta scelta come significatore al centro del tavolo',
    longtails: ['carta significatore significato', 'come scegliere il significatore', 'stesa con significatore'],
    angle: 'ruolo del significatore senza rigidità da manuale',
  },
  {
    slug: 'timing-simbolico-nei-tarocchi',
    title: 'Timing nei tarocchi: tempi simbolici (senza date magiche)',
    keyword: 'timing tarocchi',
    coverAlt: 'Carte dei tarocchi e clessidra soft sul tavolo',
    longtails: ['tempi tarocchi significato', 'quando accadrà tarocchi', 'tarocchi futuro prossimo simbolico'],
    angle: 'tempi come ritmi, non oroscopo calendariale',
  },
  {
    slug: 'meditazione-con-una-carta-tarocchi',
    title: 'Meditazione con una carta dei tarocchi: pratica soft',
    keyword: 'meditazione tarocchi',
    coverAlt: 'Una sola carta dei tarocchi e luce soft mattutina',
    longtails: ['carta del giorno meditazione', 'tarocchi mindfulness', 'pratica quotidiana una carta'],
    angle: 'una carta come ancora di presenza, non predizione',
  },
  {
    slug: 'tarocchi-luna-nuova-rituale-soft',
    title: 'Luna nuova e tarocchi: rituale leggero (senza superstizione)',
    keyword: 'luna nuova tarocchi',
    coverAlt: 'Cielo notturno soft e carte dei tarocchi',
    longtails: ['rituale luna nuova carte', 'tarocchi cicli lunari', 'intenzione luna nuova'],
    angle: 'cicli come metafora, non obbligo magico',
  },
  {
    slug: 'tarocchi-e-burnout',
    title: 'Tarocchi e burnout: quando sei stanco e confuso',
    keyword: 'tarocchi burnout',
    coverAlt: 'Carte dei tarocchi su scrivania dopo una giornata intensa',
    longtails: ['tarocchi stanchezza mentale', 'lettura quando sei esausto', 'carte e stress lavoro'],
    angle: 'riposo e priorità, non spingere sull’azione',
  },
  {
    slug: 'tarocchi-creativita-bloccata',
    title: 'Creatività bloccata: sbloccare il prossimo passo con le carte',
    keyword: 'tarocchi creatività',
    coverAlt: 'Taccuino, matite e una carta dei tarocchi',
    longtails: ['blocco creativo tarocchi', 'ispirazione con le carte', 'tarocchi artisti'],
    angle: 'micro-passo creativo verificabile',
  },
  {
    slug: 'tarocchi-famiglia-e-genitori',
    title: 'Tarocchi e famiglia: genitori, casa e dinamiche',
    keyword: 'tarocchi famiglia',
    coverAlt: 'Atmosfera domestica soft con carte dei tarocchi',
    longtails: ['tarocchi rapporti familiari', 'carte e genitori', 'dinamiche famiglia lettura'],
    angle: 'confini e ruoli, senza incolpare nessuno',
  },
  {
    slug: 'tarocchi-viaggio-e-trasloco',
    title: 'Viaggio o trasloco: nuovo inizio in tre carte',
    keyword: 'tarocchi viaggio trasloco',
    coverAlt: 'Valigia, chiave di casa e carte dei tarocchi',
    longtails: ['tarocchi trasferimento', 'carte nuovo inizio', 'lettura prima di un viaggio'],
    angle: 'logistica emotiva del cambiamento di luogo',
  },
  {
    slug: 'significato-tre-di-coppe',
    title: 'Tre di Coppe: significato e messaggio',
    keyword: 'tre di coppe significato',
    coverAlt: 'Carta Tre di Coppe in luce calda',
    longtails: ['tre di coppe amore', 'tre di coppe lavoro', 'tre di coppe rovesciato'],
    angle: 'celebrazione, rete e sobrietà sociale',
  },
  {
    slug: 'significato-quattro-di-spade',
    title: 'Quattro di Spade: riposo e ripresa',
    keyword: 'quattro di spade significato',
    coverAlt: 'Carta Quattro di Spade in atmosfera quieta',
    longtails: ['quattro di spade riposo', 'quattro di spade salute', 'quattro di spade lavoro'],
    angle: 'pausa strategica, non fuga',
  },
  {
    slug: 'significato-sei-di-bastoni',
    title: 'Sei di Bastoni: riconoscimento e successo',
    keyword: 'sei di bastoni significato',
    coverAlt: 'Carta Sei di Bastoni con senso di progresso',
    longtails: ['sei di bastoni lavoro', 'sei di bastoni vittoria', 'sei di bastoni amore'],
    angle: 'visibilità e responsabilità del risultato',
  },
  {
    slug: 'significato-nove-di-coppe',
    title: 'Nove di Coppe: desiderio e soddisfazione',
    keyword: 'nove di coppe significato',
    coverAlt: 'Carta Nove di Coppe su tavolo soft',
    longtails: ['nove di coppe desiderio', 'nove di coppe amore', 'carta dei desideri tarocchi'],
    angle: 'gratificazione e rischio di eccesso',
  },
  {
    slug: 'cavalieri-dei-tarocchi-movimento',
    title: 'I Cavalieri nei tarocchi: movimento e azione',
    keyword: 'cavalieri tarocchi significato',
    coverAlt: 'Carte di Corte Cavalieri disposte in fila',
    longtails: ['cavaliere di coppe', 'cavaliere di spade', 'cavaliere di bastoni', 'cavaliere di denari'],
    angle: 'i quattro stili di avanzamento',
  },
  {
    slug: 'miti-sui-tarocchi-da-sfatare',
    title: 'Miti sui tarocchi da sfatare (senza paura)',
    keyword: 'miti tarocchi',
    coverAlt: 'Carte dei tarocchi e punto interrogativo soft',
    longtails: ['i tarocchi predicono la morte', 'tarocchi sono pericolosi', 'dipendenza dalle carte'],
    angle: 'mythbusting soft e responsabile',
  },
  {
    slug: 'leggere-tarocchi-a-un-amica',
    title: 'Leggere i tarocchi a un’amica: etica e limiti',
    keyword: 'leggere tarocchi ad altri',
    coverAlt: 'Due persone a un tavolo con carte dei tarocchi',
    longtails: ['lettura tarocchi per amici', 'etica lettura altrui', 'consenso lettura carte'],
    angle: 'consenso, privacy, niente voyeurismo emotivo',
  },
  {
    slug: 'lenormand-e-tarocchi-differenza',
    title: 'Lenormand e tarocchi: che differenza c’è',
    keyword: 'lenormand o tarocchi',
    coverAlt: 'Mazzo Lenormand e mazzo tarocchi affiancati',
    longtails: ['differenza lenormand tarocchi', 'carte lenormand significato', 'quale mazzo divinatorio'],
    angle: 'linguaggi diversi, usi diversi',
  },
  {
    slug: 'lettura-tarocchi-gratis-senza-registrazione',
    title: 'Lettura tarocchi gratis senza registrazione: cosa sapere',
    keyword: 'lettura tarocchi gratis senza registrazione',
    coverAlt: 'Smartphone con anteprima di carte e luce soft',
    longtails: ['tarocchi gratis senza account', 'tarocchi online senza registrazione', 'lettura tarocchi gratuita immediata'],
    angle: 'privacy, limiti e qualità dell’anteprima',
  },
  {
    slug: 'lettura-tarocchi-gratuita-online-cosa-aspettarsi',
    title: 'Lettura tarocchi gratuita online: cosa aspettarsi davvero',
    keyword: 'lettura tarocchi gratuita online',
    coverAlt: 'Laptop e carte dei tarocchi su scrivania calma',
    longtails: ['tarocchi gratis online come funzionano', 'anteprima tre carte gratis', 'lettura simbolica online'],
    angle: 'aspettative realistiche vs promesse magiche',
  },
  {
    slug: 'stesa-passato-presente-futuro',
    title: 'Stesa passato presente futuro: come leggerla bene',
    keyword: 'stesa passato presente futuro',
    coverAlt: 'Tre carte in linea sul tavolo',
    longtails: ['tre carte passato presente futuro', 'lettura lineare tarocchi', 'come interpretare tre carte'],
    angle: 'linea temporale senza fatalismo',
  },
  {
    slug: 'come-formulare-una-domanda-aperta',
    title: 'Come formulare una domanda aperta ai tarocchi',
    keyword: 'domanda aperta tarocchi',
    coverAlt: 'Foglio con domanda scritta e mazzo chiuso',
    longtails: ['come fare una domanda ai tarocchi', 'domande utili tarocchi', 'evitare sì o no magico'],
    angle: 'sintassi della domanda e focus',
  },
  {
    slug: 'tarocchi-e-shadow-work-soft',
    title: 'Shadow work soft con i tarocchi (senza drammi)',
    keyword: 'shadow work tarocchi',
    coverAlt: 'Luce e ombra su una carta dei tarocchi',
    longtails: ['tarocchi ombra interiore', 'carte e parti negate', 'lavoro sull’ombra gentile'],
    angle: 'parti negate con cura, non shock',
  },
  {
    slug: 'significato-paggio-di-coppe',
    title: 'Paggio di Coppe: significato e messaggio',
    keyword: 'paggio di coppe significato',
    coverAlt: 'Carta Paggio di Coppe in atmosfera delicata',
    longtails: ['fante di coppe tarocchi', 'paggio di coppe amore', 'messaggio emotivo'],
    angle: 'apertura emotiva e vulnerabilità',
  },
  {
    slug: 'significato-cavaliere-di-spade',
    title: 'Cavaliere di Spade: significato e messaggio',
    keyword: 'cavaliere di spade significato',
    coverAlt: 'Carta Cavaliere di Spade in luce tagliente soft',
    longtails: ['cavaliere di spade amore', 'cavaliere di spade lavoro', 'azione mentale rapida'],
    angle: 'velocità mentale e rischio di rigidità',
  },
  {
    slug: 'significato-re-di-bastoni',
    title: 'Re di Bastoni: significato e messaggio',
    keyword: 're di bastoni significato',
    coverAlt: 'Carta Re di Bastoni con atmosfera di leadership',
    longtails: ['re di bastoni lavoro', 're di bastoni amore', 'leadership tarocchi'],
    angle: 'visione, calore e responsabilità',
  },
  {
    slug: 'significato-sei-di-coppe',
    title: 'Sei di Coppe: significato e messaggio',
    keyword: 'sei di coppe significato',
    coverAlt: 'Carta Sei di Coppe con tono nostalgico soft',
    longtails: ['sei di coppe amore', 'sei di coppe passato', 'sei di coppe nostalgia'],
    angle: 'memoria, tenerezza e non restare bloccati',
  },
  {
    slug: 'significato-otto-di-spade',
    title: 'Otto di Spade: significato e messaggio',
    keyword: 'otto di spade significato',
    coverAlt: 'Carta Otto di Spade in atmosfera sospesa',
    longtails: ['otto di spade blocco', 'otto di spade ansia', 'uscire dall’otto di spade'],
    angle: 'percezione di trappola e margine reale',
  },
  {
    slug: 'significato-tre-di-bastoni',
    title: 'Tre di Bastoni: significato e messaggio',
    keyword: 'tre di bastoni significato',
    coverAlt: 'Carta Tre di Bastoni con orizzonte aperto',
    longtails: ['tre di bastoni viaggio', 'tre di bastoni lavoro', 'tre di bastoni futuro'],
    angle: 'espansione e attesa attiva',
  },
  {
    slug: 'significato-quattro-di-denari',
    title: 'Quattro di Denari: significato e messaggio',
    keyword: 'quattro di denari significato',
    coverAlt: 'Carta Quattro di Denari su tema risorse',
    longtails: ['quattro di denari soldi', 'quattro di denari controllo', 'attaccamento risorse'],
    angle: 'sicurezza vs chiusura',
  },
  {
    slug: 'tarocchi-prima-di-un-colloquio',
    title: 'Tarocchi prima di un colloquio: chiarezza senza ansia',
    keyword: 'tarocchi colloquio lavoro',
    coverAlt: 'Curriculum, tazza di caffè e una carta dei tarocchi',
    longtails: ['carte prima del colloquio', 'lettura lavoro offerta', 'preparazione mentale colloquio'],
    angle: 'postura e priorità, non esito garantito',
  },
  {
    slug: 'tarocchi-dopo-una-delusione',
    title: 'Dopo una delusione: tre carte per riordinare',
    keyword: 'tarocchi delusione',
    coverAlt: 'Carte dei tarocchi e fazzoletto soft sul tavolo',
    longtails: ['tarocchi dopo una rottura emotiva', 'guarire con le carte', 'lettura post delusione'],
    angle: 'cura e realtà, niente “vengeance magic”',
  },
  {
    slug: 'tarocchi-confini-al-lavoro',
    title: 'Confini al lavoro con i tarocchi',
    keyword: 'tarocchi confini lavoro',
    coverAlt: 'Scrivania ordinata e carte dei tarocchi',
    longtails: ['tarocchi burnout lavoro', 'dire di no al lavoro', 'carte e assertività'],
    angle: 'assertività e carico sostenibile',
  },
  {
    slug: 'come-evitare-dipendenza-dalle-carte',
    title: 'Come evitare la dipendenza dalle carte',
    keyword: 'dipendenza tarocchi',
    coverAlt: 'Mazzo chiuso e taccuino aperto',
    longtails: ['consultare troppe volte i tarocchi', 'ansia e ripetere la lettura', 'pause tra le stese'],
    angle: 'regole pratiche di igiene divinatoria',
  },
  {
    slug: 'tarocchi-e-gratitudine-pratica',
    title: 'Tarocchi e gratitudine: una pratica semplice',
    keyword: 'tarocchi gratitudine',
    coverAlt: 'Carte dei tarocchi e tecchino di tè soft',
    longtails: ['pratica quotidiana carte', 'carta della gratitudine', 'tarocchi benessere'],
    angle: 'riconoscere risorse già presenti',
  },
  {
    slug: 'lettura-tarocchi-gratis-una-carta',
    title: 'Lettura tarocchi gratis con una carta: metodo chiaro',
    keyword: 'lettura tarocchi gratis una carta',
    coverAlt: 'Una sola carta estratta dal mazzo',
    longtails: ['tarocchi 1 carta gratis', 'carta del giorno gratis', 'lettura tarocchi gratuita una carta'],
    angle: 'formato minimo utile e i suoi limiti',
  },
  {
    slug: 'tarocchi-online-gratis-senza-app',
    title: 'Tarocchi online gratis senza app: guida pratica',
    keyword: 'tarocchi online gratis senza app',
    coverAlt: 'Browser aperto su lettura carte, niente smartphone app store',
    longtails: ['tarocchi gratis dal browser', 'lettura tarocchi gratuita web', 'senza scaricare app'],
    angle: 'web vs app, privacy e velocità',
  },
  {
    slug: 'come-annotare-una-lettura-efficace',
    title: 'Come annotare una lettura in modo efficace',
    keyword: 'annotare lettura tarocchi',
    coverAlt: 'Taccuino con appunti e carte dei tarocchi',
    longtails: ['diario tarocchi come farlo', 'template appunti lettura', 'rileggere le stese'],
    angle: 'struttura di note che si può rileggere',
  },
  {
    slug: 'tarocchi-e-scelta-tra-due-opzioni',
    title: 'Scelta tra due opzioni: stesa chiara (non solo persone)',
    keyword: 'tarocchi scelta tra due opzioni',
    coverAlt: 'Due percorsi e tre carte al centro',
    longtails: ['tarocchi due strade', 'confrontare opzioni con le carte', 'lavoro o progetto scelta'],
    angle: 'opzioni di vita/lavoro, non solo rivalità affettive',
  },
  {
    slug: 'lettura-tarocchi-gratis-tre-carte-guida',
    title: 'Lettura tarocchi gratis a tre carte: guida completa',
    keyword: 'lettura tarocchi gratis tre carte',
    coverAlt: 'Tre carte allineate su tessuto scuro soft',
    longtails: ['tarocchi gratis amore tre carte', 'tarocchi 3 carte gratis', 'lettura tarocchi gratuita tre carte'],
    angle: 'formato Luxseetarot spiegato in profondità',
  },
];

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

function buildBody(a) {
  const lt = a.longtails.map((x) => `<strong>${x}</strong>`).join(', ');
  return `
<p>Se cerchi una <strong>lettura tarocchi gratis</strong> o una <strong>lettura tarocchi gratuita</strong> su questo tema, parti da una domanda aperta e da un formato semplice. Questo articolo approfondisce ${esc(a.angle)}, con esempi concreti e limiti chiari.</p>
<p>In sintesi: le carte non decidono al posto tuo. Ti aiutano a nominare dinamiche, risorse e prossimi passi verificabili. Su Luxseetarot puoi provarlo subito con i <a href="/tarocchi-gratis.html">tarocchi gratis</a> (anteprima a tre carte).</p>

<h2>Perché questo tema interessa chi cerca i tarocchi online</h2>
<p>Le ricerche long-tail intorno a questo argomento includono spesso ${lt}. Sono query di persone che vogliono chiarezza pratica, non uno spettacolo. Una buona risposta combina simbolo, contesto e azione piccola.</p>
<p>Quando digiti queste frasi su Google, di solito vuoi tre cose: capire il significato, evitare errori comuni e sapere se una <strong>lettura tarocchi gratuita online</strong> può bastare come primo passo. Qui trovi tutti e tre i livelli.</p>

<h2>Cos’è, in parole semplici</h2>
<p>Il tema «${esc(a.title)}» riguarda un pezzo preciso del linguaggio delle carte. Non serve conoscere tutte le 78 carte per usarlo bene: serve un metodo. Scrivi il fatto, l’emozione e la decisione aperta. Poi collega ogni simbolo a un comportamento osservabile (messaggi, silenzi, scadenze, confini).</p>
<p>Se sei all’inizio, preferisci stese corte. Una <strong>lettura tarocchi gratis una carta</strong> o a tre carte riduce il rumore e rende più facile ricordare un solo messaggio centrale.</p>

<h2>Come procedere passo passo</h2>
<ol>
  <li>Formula una domanda aperta (cosa posso chiarire / quale passo dipende da me).</li>
  <li>Scegli il formato: 1 carta per il focus, 3 carte per una mappa, stese più lunghe solo se hai già pratica.</li>
  <li>Leggi prima l’insieme, poi i dettagli. Evita di inseguire una carta “positiva” ripetendo l’estrazione.</li>
  <li>Trasforma il messaggio in un gesto concreto entro 48 ore.</li>
  <li>Annota domanda, carte e azione: tra una settimana rileggi senza rifare subito la stessa domanda.</li>
</ol>
<p>Questo schema vale sia per una consultazione a pagamento sia per una <strong>lettura tarocchi gratis senza registrazione</strong> dal browser: cambia il canale, non il metodo.</p>

<h2>Esempio concreto di interpretazione</h2>
<p>Immagina di arrivare a questo tema con confusione e urgenza. Invece di chiedere «dimmi cosa succederà», chiedi «cosa posso osservare e quale margine d’azione ho?». Le carte possono indicare un clima emotivo, un ostacolo interno e una tendenza. L’esito utile non è una profezia, ma una frase al presente tipo: «Sto evitando X; provo Y in piccolo e verifico».</p>
<p>Se la frase resta vaga, manca contesto. Aggiungi un fatto (una conversazione, una scadenza, un comportamento ripetuto). Solo allora il simbolo diventa leggibile.</p>

<h2>Errori comuni da evitare</h2>
<ul>
  <li>Ripetere la stessa domanda finché il testo non “ti piace”.</li>
  <li>Usare le carte per controllare pensieri altrui o spiare.</li>
  <li>Confondere timing simbolico con date certe.</li>
  <li>Ignorare i limiti: salute, legale e questioni cliniche richiedono professionisti, non un mazzo.</li>
  <li>Saltare l’azione: senza un gesto verificabile, la lettura resta intrattenimento ansioso.</li>
</ul>

<h2>Lettura tarocchi gratis: come usarla su questo tema</h2>
<p>Una <strong>lettura tarocchi gratuita</strong> ha senso come anteprima: tre carte, una domanda, zero pressione. Su Luxseetarot l’anteprima è pensata proprio così. Usala per testare se il linguaggio ti parla; se sì, approfondisci con calma. Se aumenta ansia o dipendenza, fermati e torna ai fatti.</p>
<p>Collegamenti utili: <a href="/tarocchi-gratis.html">tarocchi gratis</a>, <a href="/blog/come-fare-una-domanda-ai-tarocchi">come fare una domanda</a>, <a href="/blog/lettura-tarocchi-tre-carte">lettura a tre carte</a>.</p>

<h2>Parole cercate spesso (long-tail) su questo argomento</h2>
<p>Oltre a <strong>lettura tarocchi gratis</strong> e <strong>lettura tarocchi gratuita</strong>, su questo tema compaiono ricerche come ${lt}, più varianti con «online», «senza registrazione», «tre carte» e «significato». Scrivere in modo naturale su queste intenzioni aiuta chi cerca e evita il keyword stuffing nei titoli.</p>

<h2>Limiti e uso responsabile</h2>
<p>I tarocchi non sostituiscono medici, psicologi, avvocati o consulenti finanziari. Non garantiscono ritorno, vendetta o “sblocchi” a pagamento aggressivo. Sono uno strumento narrativo di chiarezza. Se una lettura ti spinge a comportamenti impulsivi o a spese ripetute, interrompi.</p>

<h2>Mini esercizio di integrazione (10 minuti)</h2>
<ol>
  <li>Scrivi in una riga il fatto e l’emozione.</li>
  <li>Fai una <strong>lettura tarocchi gratis</strong> a 1 o 3 carte con domanda aperta.</li>
  <li>Scrivi una frase al presente che colleghi simbolo e comportamento.</li>
  <li>Scegli un’azione piccola sotto il tuo controllo e una data di verifica.</li>
  <li>Non ripetere la stessa domanda prima della verifica.</li>
</ol>

<h2>Approfondisci</h2>
<ul>
  <li><a href="/tarocchi-gratis.html">Tarocchi gratis: anteprima a tre carte</a></li>
  <li><a href="/blog/come-interpretare-i-tarocchi">Come interpretare i tarocchi</a></li>
  <li><a href="/blog/errori-comuni-lettura-tarocchi">Errori comuni nella lettura</a></li>
</ul>
<p><a href="/tarocchi-gratis.html">Prova i tarocchi gratis su Luxseetarot →</a></p>
`.trim();
}

function buildFaq(a) {
  return [
    {
      q: `Posso fare una lettura tarocchi gratis su «${a.title}»?`,
      a: 'Sì: parti da una domanda aperta e da un’anteprima a tre carte. Su Luxseetarot trovi i tarocchi gratis senza trasformare la curiosità in dipendenza.',
    },
    {
      q: 'Serve registrarsi per una lettura tarocchi gratuita online?',
      a: 'Dipende dal sito. Luxseetarot punta a un’anteprima semplice e trasparente: valuta sempre privacy, limiti dichiarati e assenza di promesse magiche.',
    },
    {
      q: `Quali ricerche long-tail sono collegate a questo tema?`,
      a: a.longtails.slice(0, 3).join('; ') + '.',
    },
    {
      q: 'Le carte dicono date precise?',
      a: 'No in modo affidabile. Meglio parlare di ritmi e priorità (presto / dopo un passo tuo) che di calendari magici.',
    },
  ];
}

function serializeFaq(faq) {
  return faq
    .map(
      (f) => `        {
          q: ${JSON.stringify(f.q)},
          a: ${JSON.stringify(f.a)},
        }`,
    )
    .join(',\n');
}

const file = `/**
 * Lotto G — 40 articoli blog (draft), più lunghi, SEO long-tail IT.
 * Focus naturale: lettura tarocchi gratis / gratuita + code lunghe.
 * Generato da scripts/build-blog-seed-g.mjs
 */

import { withSeoKeywords } from './blog-seed-seo.js';

function article(partial) {
  const slug = String(partial.slug || '');
  const coverImage =
    partial.coverImage ||
    (slug ? \`/images/blog/\${slug}.jpg?v=1\` : '');
  return withSeoKeywords({
    status: 'draft',
    faq: partial.faq || [],
    ...partial,
    coverImage,
    coverAlt: partial.coverAlt || partial.title || '',
  });
}

export function getSeedArticlesG() {
  return [
${ARTICLES.map((a) => {
  const body = buildBody(a);
  const faq = buildFaq(a);
  return `    article({
      slug: ${JSON.stringify(a.slug)},
      title: ${JSON.stringify(a.title)},
      description: ${JSON.stringify(
        `${a.title}. Guida pratica con lettura tarocchi gratis / gratuita, esempi e limiti chiari. Long-tail: ${a.longtails.slice(0, 2).join(', ')}.`,
      )},
      keyword: ${JSON.stringify(a.keyword)},
      coverAlt: ${JSON.stringify(a.coverAlt)},
      faq: [
${serializeFaq(faq)}
      ],
      bodyHtml: \`
${esc(body)}
\`,
    })`;
}).join(',\n')}
  ];
}
`;

fs.writeFileSync(OUT, file, 'utf8');
console.log('Wrote', OUT, 'articles', ARTICLES.length);
console.log('Avg body ~', Math.round(ARTICLES.reduce((s, a) => s + buildBody(a).length, 0) / ARTICLES.length), 'chars');
