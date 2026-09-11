/**
 * Sesto lotto articoli blog — keyword da ricerche correlate Google
 * su “tarocchi gratis” (deduplicate, senza brand competitor).
 * Pubblicati al seed (status published) per indicizzazione immediata.
 */

function article(partial) {
  const slug = String(partial.slug || '');
  const coverImage =
    partial.coverImage ||
    (slug ? `/images/blog/${slug}.jpg?v=3` : '');
  return {
    status: 'published',
    faq: partial.faq || [],
    ...partial,
    coverImage,
    coverAlt: partial.coverAlt || partial.title || '',
  };
}

const CTA = `<p><a href="/tarocchi-gratis.html">Prova i tarocchi gratis su Luxseetarot →</a></p>`;
const GRATIS_RELATED = ['/tarocchi-gratis.html', 'Tarocchi gratis: anteprima a tre carte'];

function related(items) {
  const list = Array.isArray(items) ? [...items] : [];
  if (!list.some(([href]) => String(href || '').includes('tarocchi-gratis.html'))) {
    list.unshift(GRATIS_RELATED);
  }
  if (!list.length) return '';
  return `<h2>Approfondisci</h2><ul>${list
    .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`)
    .join('')}</ul>`;
}

function expand({ method, example, limits, lux, exercise }) {
  return `
<h2>Un metodo per passare dal simbolo alla vita reale</h2>
<p>Prima di cercare una risposta definitiva, chiarisci il contesto: che cosa è successo, quale parte dipende da te e quale informazione ti manca. Leggi poi ogni simbolo come un’ipotesi da confrontare con i fatti, non come una sentenza.</p>
<p>${method}</p>
<h2>Un esempio concreto di interpretazione</h2>
<p>Gli esempi servono come modello, non come dizionario rigido. Cerca una frase che colleghi simbolo, contesto e comportamento osservabile.</p>
<p>${example}</p>
<h2>Limiti e uso responsabile</h2>
<p>I tarocchi non sostituiscono medici, psicologi, avvocati né una conversazione diretta. Non garantiscono date o risultati. Se una lettura aumenta paura o dipendenza, fermati e torna ai fatti.</p>
<p>${limits}</p>
<h2>Come usare Luxseetarot su questo tema</h2>
<p>Su Luxseetarot parti dai <a href="/tarocchi-gratis.html">tarocchi gratis</a>: una domanda aperta, tre carte e un’anteprima in italiano. Puoi approfondire dopo, senza perdere il filo.</p>
<p>${lux}</p>
<h2>Mini esercizio</h2>
<p>${exercise}</p>
`.trim();
}

export function getSeedArticlesF() {
  return [
    article({
      slug: 'tarocchi-1-carta-gratis',
      title: 'Tarocchi 1 carta gratis: quando basta una sola carta',
      description:
        'Tarocchi 1 carta gratis (anche in amore): come usare un’unica carta, cosa chiedere e quando conviene lo spread a tre carte su Luxseetarot.',
      keyword: 'tarocchi 1 carta gratis',
      coverAlt: 'Una sola carta dei tarocchi estratta per una lettura breve gratis',
      faq: [
        {
          q: 'Posso fare tarocchi 1 carta gratis online?',
          a: 'Sì: su Luxseetarot l’anteprima è gratuita. Anche partendo da tre carte, puoi concentrarti su un solo messaggio centrale come “una carta”.',
        },
        {
          q: 'Tarocchi 1 carta gratis amore: ha senso?',
          a: 'Sì per un focus emotivo del giorno. Per dinamiche di relazione è meglio tre carte (passato, presente, futuro).',
        },
        {
          q: 'Una carta sostituisce una lettura completa?',
          a: 'No: è un flash simbolico. Utile per chiarezza rapida, non per mappe complesse.',
        },
      ],
      bodyHtml: `
<p>Cerchi <strong>tarocchi 1 carta gratis</strong>? Una sola carta è il formato più veloce: un simbolo, una domanda, un gesto. Funziona bene per clima emotivo, atteggiamento del giorno o un nodo semplice — anche come <strong>tarocchi 1 carta gratis amore</strong> o <strong>tarocchi amore gratis una carta</strong>.</p>
<h2>Quando scegliere una carta</h2>
<ul>
  <li>Vuoi un focus rapido senza troppe informazioni.</li>
  <li>Hai già chiaro il tema (amore, lavoro, scelta).</li>
  <li>Stai allenando l’abitudine della carta del giorno.</li>
</ul>
<h2>Quando servono tre carte</h2>
<p>Se la storia ha un prima/dopo, un conflitto o una scelta, lo spread a tre carte resta più leggibile. Su Luxseetarot puoi <a href="/tarocchi-gratis.html">estrarre tre carte gratis</a> e poi isolare il messaggio “da una carta” se preferisci.</p>
${expand({
  method: 'Formula: «Quale energia mi aiuta oggi su [tema]?». Estrai (o scegli il nucleo di tre carte). Scrivi una frase + un’azione sotto il tuo controllo.',
  example: 'In amore esce la Stella: non “tornerà”, ma «posso riprendere fiducia senza inseguire». Gesto: un messaggio onesto o una pausa consapevole.',
  limits: 'Non usare una carta per decisioni irreversibili o per controllare l’altro. Se resti confuso/a, passa a tre carte.',
  lux: 'Prova i tarocchi gratis: anche con tre carte, annota un solo messaggio come fosse “1 carta”.',
  exercise: 'Per 3 giorni: una domanda, un’unica idea centrale, un gesto. A sera verifica i fatti.',
})}
${related([
  ['/blog/tarocchi-carta-del-giorno', 'Tarocchi carta del giorno gratis'],
  ['/blog/lettura-tarocchi-tre-carte', 'Lettura a tre carte'],
  ['/tarocchi-amore.html', 'Tarocchi amore gratis'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-del-destino-gratis',
      title: 'Tarocchi del destino gratis e le carte del destino',
      description:
        'Tarocchi del destino gratis, le carte del destino e karma destino: cosa significano davvero e come usarli senza fatalismo su Luxseetarot.',
      keyword: 'tarocchi del destino gratis',
      coverAlt: 'Carte dei tarocchi associate al tema del destino e del karma',
      faq: [
        {
          q: 'Cosa sono le carte del destino gratis?',
          a: 'È un modo popolare di chiamare una lettura sul percorso: tendenze, lezioni e scelte — non un destino già scritto.',
        },
        {
          q: 'Tarocchi karma destino gratis: cosa chiedono le persone?',
          a: 'Di solito “perché mi succede questo?”. Meglio chiedere quale schema stai ripetendo e quale passo puoi cambiare.',
        },
        {
          q: 'Carte amore destino gratis: funzionano?',
          a: 'Come mappa simbolica della relazione sì; come garanzia di “è destino” no.',
        },
      ],
      bodyHtml: `
<p>Molte ricerche parlano di <strong>tarocchi del destino gratis</strong>, <strong>le carte del destino gratis</strong> o <strong>tarocchi karma destino gratis</strong>. Dietro queste formule c’è spesso il bisogno di capire se “era scritto” — o cosa puoi ancora scegliere. Su Luxseetarot leggiamo il destino come tendenza simbolica, non come sentenza chiusa.</p>
<h2>Destino vs scelta</h2>
<p>Le carte mostrano pattern: abitudini, paure, aperture. Il “karma” in lettura pratica è ciò che ripeti finché non lo riconosci. Le <strong>carte amore destino gratis</strong> aiutano a vedere se stai idealizzando, evitando o costruendo — non se l’universo ti deve qualcuno.</p>
<h2>Domande utili</h2>
<ul>
  <li>Quale lezione sto ripetendo in questa storia?</li>
  <li>Dove ho ancora margine di azione?</li>
  <li>Cosa confondo con “destino” e in realtà è paura?</li>
</ul>
${expand({
  method: 'Scrivi la domanda “destino” e riscrivila in forma aperta: da «È destino?» a «Quale dinamica sto vivendo e quale passo mi rende più libero/a?».',
  example: 'Escono Torre + Stella: rottura di un’illusione + ripresa. Non “fine del mondo”, ma fine di un copione. Azione: una conversazione o un confine chiaro.',
  limits: 'Nessuna lettura gratis (o a pagamento) fissa il tuo futuro. Se qualcuno vende “destino garantito”, allontanati.',
  lux: 'Usa i tarocchi gratis per una mappa a tre carte sul tema destino/karma, poi agisci su un solo punto concreto.',
  exercise: 'Elenca 3 cose che chiami “destino”. Barrane una che puoi influenzare questa settimana.',
})}
${related([
  ['/tarocchi-futuro.html', 'Tarocchi futuro'],
  ['/blog/tarocchi-si-o-no', 'Tarocchi sì o no'],
  ['/blog/significato-tarocchi-amore', 'Significato tarocchi amore'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-futuro-imminente-9-carte',
      title: 'Tarocchi futuro imminente 9 carte gratis: cosa sapere',
      description:
        'Tarocchi futuro imminente 9 carte gratis e futuro immediato: cosa offre uno spread ampio e perché su Luxseetarot partiamo da tre carte leggibili.',
      keyword: 'tarocchi futuro imminente 9 carte gratis',
      coverAlt: 'Stesa ampia di carte dei tarocchi sul tema del futuro imminente',
      faq: [
        {
          q: 'Serve proprio uno spread a 9 carte?',
          a: 'Non sempre. Nove carte danno dettaglio, ma richiedono esperienza. Tre carte bastano per il futuro imminente se la domanda è chiara.',
        },
        {
          q: 'Tarocchi amore futuro immediato: meglio 3 o 9?',
          a: 'Per amore e “futuro immediato” spesso tre carte (passato, presente, futuro) sono più chiare e meno ansiogene.',
        },
        {
          q: 'Posso farlo gratis?',
          a: 'Su Luxseetarot l’anteprima a tre carte è gratis. È il modo più semplice per esplorare il futuro imminente online.',
        },
      ],
      bodyHtml: `
<p>Chi cerca <strong>tarocchi futuro imminente 9 carte gratis</strong> vuole spesso una risposta “vicina”: settimane, non anni. Esiste anche la variante <strong>tarocchi amore futuro immediato</strong>. Uno spread a 9 carte può mappare dettagli, ma rischia di confondere se sei all’inizio.</p>
<h2>Futuro imminente: come chiederlo bene</h2>
<ul>
  <li>Indica l’ambito (amore, lavoro, scelta).</li>
  <li>Usa “in questo periodo” invece di date assolute.</li>
  <li>Chiedi tendenze e atteggiamenti, non garanzie.</li>
</ul>
<h2>9 carte vs 3 carte</h2>
<p>Nove posizioni sono utili se sai già leggere combinazioni. Per una prima lettura online, tre carte restano più leggibili: passato, presente, futuro. Su Luxseetarot parti da lì con anteprima gratuita.</p>
${expand({
  method: 'Domanda tipo: «Quale energia caratterizza il mio futuro immediato in [tema]?». Con tre carte leggi arco narrativo; se serve, approfondisci dopo.',
  example: 'In amore: 2 Coppe + Luna + Sole — legame vivo, confusione/paura, poi chiarezza se affronti ciò che non vedi. Gesto: una domanda onesta alla persona o a te stesso/a.',
  limits: 'Nove carte non rendono la predizione “più vera”. Più carte = più rumore se sei agitata/o.',
  lux: 'Prova i tarocchi gratis sul futuro imminente; se vuoi più dettaglio, sblocca o approfondisci sulla stessa estrazione.',
  exercise: 'Scrivi 1 domanda sul prossimo passo (non sul “per sempre”). Estrai tre carte. Annota un solo impegno per 7 giorni.',
})}
${related([
  ['/tarocchi-futuro.html', 'Tarocchi futuro online gratis'],
  ['/blog/lettura-tarocchi-tre-carte', 'Lettura a tre carte'],
  ['/tarocchi-amore.html', 'Tarocchi amore'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-10-carte-gratis',
      title: 'Tarocchi 10 carte gratis: spread ampi e alternative chiare',
      description:
        'Tarocchi 10 carte gratis: a cosa serve uno spread ampio, limiti per principianti e alternativa a tre carte gratis su Luxseetarot.',
      keyword: 'tarocchi 10 carte gratis',
      coverAlt: 'Dieci carte dei tarocchi disposte in uno spread ampio',
      faq: [
        {
          q: 'Esistono tarocchi 10 carte gratis online?',
          a: 'Alcuni siti offrono stese ampie. Su Luxseetarot privilegiamo tre carte gratis: più chiare per una domanda principale.',
        },
        {
          q: 'La Croce Celtica sono 10 carte?',
          a: 'Sì, è lo spread classico a dieci posizioni. Richiede tempo e pratica.',
        },
        {
          q: 'Meglio 10 o 3 carte?',
          a: 'Se sei all’inizio o cerchi una risposta rapida, 3. Se conosci già le posizioni, 10 può approfondire.',
        },
      ],
      bodyHtml: `
<p>La ricerca <strong>tarocchi 10 carte gratis</strong> punta spesso alla Croce Celtica o a stese “complete”. Sono potenti se sai leggere le posizioni; altrimenti diventano un muro di simboli. Su Luxseetarot proponiamo un ingresso più semplice: <strong>tre carte gratis</strong>, poi approfondimento se serve.</p>
<h2>Cosa dà uno spread a 10 carte</h2>
<ul>
  <li>Più contesto (ambiente, speranze, ostacoli).</li>
  <li>Più tempo di lettura e rischio di sovrainterpretazione.</li>
</ul>
<h2>Alternativa pratica</h2>
<p>Parti da tre carte (passato, presente, futuro). Se rimane un nodo, formula una seconda domanda mirata — meglio che dieci carte confuse al primo tentativo.</p>
${expand({
  method: 'Se proprio vuoi 10 carte, studia prima le posizioni (es. Croce Celtica). Altrimenti: una domanda + tre carte + diario.',
  example: 'Domanda lavoro con tre carte chiare batte dieci carte lette di fretta. Esempio: 8 Denari + 5 Spade + Carro = pratica, conflitto, bisogno di direzione.',
  limits: 'Spread grandi non equivalgono a tarocchi “più veri”. Conta la qualità della domanda.',
  lux: 'Inizia dai tarocchi gratis a tre carte; usa guide blog sulla Croce Celtica quando sei pronto/a.',
  exercise: 'Fai una stesa a 3. Solo se resta un dubbio preciso, annota una seconda domanda — non rifare subito 10 carte.',
})}
${related([
  ['/blog/croce-celtica-tarocchi', 'Croce Celtica nei tarocchi'],
  ['/blog/lettura-tarocchi-tre-carte', 'Lettura a tre carte'],
  ['/blog/tarocchi-1-carta-gratis', 'Tarocchi 1 carta gratis'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-zingara-gratis',
      title: 'Tarocchi gratis zingara: cosa sono e come usarli online',
      description:
        'Tarocchi gratis zingara, tarocchi gratis online zingara e tarocchi amore zingara: differenze rispetto ai tarocchi classici e come leggere su Luxseetarot.',
      keyword: 'tarocchi gratis zingara',
      coverAlt: 'Carte in stile zingara per una lettura tarocchi gratis',
      faq: [
        {
          q: 'Cosa sono i tarocchi zingara?',
          a: 'Spesso si intende un linguaggio popolare/oracolare “da cartomante”, non necessariamente lo stesso mazzo Rider-Waite. Il focus resta simbolico.',
        },
        {
          q: 'Tarocchi dell’amore gratis zingara: posso farli qui?',
          a: 'Sì in senso di lettura d’amore gratis online: poni la domanda e estrai tre carte. Lo stile “zingara” è soprattutto marketing della nicchia.',
        },
        {
          q: 'Sono più “potenti” dei tarocchi normali?',
          a: 'No. Contano domanda, chiarezza e uso responsabile — non l’etichetta del mazzo.',
        },
      ],
      bodyHtml: `
<p>Su Google compaiono spesso <strong>tarocchi gratis zingara</strong>, <strong>tarocchi gratis online zingara</strong> e <strong>tarocchi gratis amore zingara</strong> (anche “tarocchi dell’amore gratis zingara”). È un modo di cercare letture immediate, sentimentali, “da cartomante”. Su Luxseetarot offriamo <strong>tarocchi gratis online</strong> in italiano con tre carte e anteprima — chiaro, simbolico, senza promesse magiche.</p>
<h2>Cosa cerca chi digita “zingara”</h2>
<ul>
  <li>Risposte rapide su amore e destino.</li>
  <li>Un tono più “oracolare” che da manuale.</li>
  <li>Accesso gratis, senza account.</li>
</ul>
<p>Puoi ottenere lo stesso valore pratico con una domanda onesta e una lettura a tre carte: vedi <a href="/tarocchi-amore.html">tarocchi amore</a> e <a href="/tarocchi-gratis.html">tarocchi gratis</a>.</p>
${expand({
  method: 'Ignora l’etichetta “zingara” e chiarisci il bisogno reale: amore, sì/no, ritorno. Poi riformula in domanda aperta.',
  example: 'Da «Dimmi il destino zingara» a «Quale energia c’è tra me e questa persona ora?». Tre carte bastano per una risposta utilizzabile.',
  limits: 'Diffida di chi vende “zingara infallibile”. Nessuna lettura gratis garantisce rientri o fedeltà.',
  lux: 'Fai i tarocchi gratis su Luxseetarot: stesso bisogno di chiarezza, linguaggio rispettoso e limiti chiari.',
  exercise: 'Scrivi la query che avevi in mente (“zingara…”). Sotto, la tua domanda vera in una riga. Usa quella.',
})}
${related([
  ['/tarocchi-amore.html', 'Tarocchi amore gratis'],
  ['/blog/tarocchi-amore-domande-esempi', '20 domande amore'],
  ['/blog/tarocchi-del-destino-gratis', 'Tarocchi del destino gratis'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-potenti-gratis',
      title: 'Tarocchi potenti gratis: cosa significa (davvero)',
      description:
        'Tarocchi potenti gratis: perché la gente cerca “potenza” nelle carte e come ottenere una lettura utile e onesta online su Luxseetarot.',
      keyword: 'tarocchi potenti gratis',
      coverAlt: 'Carte dei tarocchi con atmosfera intensa per una lettura potente',
      faq: [
        {
          q: 'Esistono tarocchi più potenti di altri?',
          a: 'No in senso magico. Una lettura “potente” è chiara, onesta e ti spinge a un gesto concreto.',
        },
        {
          q: 'Come riconoscere una lettura potente gratis?',
          a: 'Ti lascia con un’idea utilizzabile, non solo con paura o dipendenza da nuove estrazioni.',
        },
        {
          q: 'Luxseetarot è “potente”?',
          a: 'Offriamo anteprima gratis e testi simbolici per riflettere. La potenza sta nella tua domanda e in ciò che fai dopo.',
        },
      ],
      bodyHtml: `
<p>La query <strong>tarocchi potenti gratis</strong> nasconde un desiderio: “voglio una risposta che mi scuota / mi sblocchi”. Attenzione: “potente” non vuol dire minaccioso o infallibile. Vuol dire che la lettura ti mette di fronte a qualcosa di vero — e ti lascia un margine d’azione.</p>
<h2>Cosa rende potente una lettura</h2>
<ul>
  <li>Domanda chiara (non vaghezza).</li>
  <li>Testo che collega carte e situazione.</li>
  <li>Un prossimo passo sotto il tuo controllo.</li>
</ul>
<p>Parti dai <a href="/tarocchi-gratis.html">tarocchi gratis online</a>: tre carte, anteprima immediata, possibilità di approfondire.</p>
${expand({
  method: 'Chiedi «Cosa non voglio vedere in questa situazione?» oppure «Quale verità mi rende più forte?». Poi estrai.',
  example: 'Esce l’Eremita: “potenza” = fermarsi, non forzare. Azione: 48 ore senza messaggi impulsivi, poi una decisione.',
  limits: 'Letture che spaventano per vendere sblocchi non sono potenti: sono marketing aggressivo.',
  lux: 'Usa Luxseetarot per una lettura gratis onesta; misura la “potenza” da ciò che cambi nei fatti.',
  exercise: 'Dopo la lettura, scrivi una frase scomoda ma vera. Una sola azione entro 24 ore.',
})}
${related([
  ['/blog/tarocchi-online-gratis-attendibili', 'Tarocchi online gratis attendibili'],
  ['/blog/lettura-tarocchi-online-affidabile', 'Lettura online affidabile'],
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-online-gratis-attendibili',
      title: 'Tarocchi online gratis attendibili: come riconoscerli',
      description:
        'Tarocchi online gratis attendibili: criteri pratici, red flag e come usare Luxseetarot per un’anteprima onesta in italiano.',
      keyword: 'tarocchi online gratis attendibili',
      coverAlt: 'Lettura tarocchi online gratis con approccio attendibile e chiaro',
      faq: [
        {
          q: 'Come capire se i tarocchi online gratis sono attendibili?',
          a: 'Cercano limiti chiari, niente garanzie assolute, privacy trasparente e una domanda tua — non solo “click e profezia”.',
        },
        {
          q: 'Attendibile significa sempre corretto?',
          a: 'No. Significa onesto sul metodo: simbolico, digitale, per riflessione — non consulto professionale.',
        },
        {
          q: 'Luxseetarot è attendibile?',
          a: 'Dichiariamo anteprima gratis, limiti del servizio e testi digitali. Puoi verificare privacy e processo prima di procedere.',
        },
      ],
      bodyHtml: `
<p>Cerchi <strong>tarocchi online gratis attendibili</strong>? “Attendibile” non vuol dire infallibile: vuol dire trasparente. Diffida di chi promette rientri certi, nomi e cognomi dell’ex o “sblocchi” a pagamento aggressivi.</p>
<h2>Segnali di una lettura online seria</h2>
<ul>
  <li>Spiega cosa è gratis e cosa no.</li>
  <li>Non vende paura.</li>
  <li>Ti fa formulare una domanda.</li>
  <li>Ha pagine legali e contatti reali.</li>
</ul>
<p>Su Luxseetarot: <a href="/tarocchi-gratis.html">tarocchi gratis</a>, tre carte, anteprima in italiano, approfondimento opzionale.</p>
${expand({
  method: 'Prima di iniziare, leggi come funziona il servizio. Poi fai una sola domanda chiara e valuta se il testo è utilizzabile.',
  example: 'Un testo attendibile dice «energia di chiusura + bisogno di dialogo», non «tornerà martedì alle 18».',
  limits: 'Nessun sito gratis può garantire il futuro. L’attendibilità è etica e metodo, non magia.',
  lux: 'Prova l’anteprima gratis e giudica dalla chiarezza del testo, non da promesse miracolose.',
  exercise: 'Elenca 3 red flag che non accetti più (paura, spam, “infallibile”). Tienile come filtro.',
})}
${related([
  ['/blog/tarocchi-gratis-online-come-funzionano', 'Come funzionano i tarocchi gratis online'],
  ['/blog/lettura-tarocchi-online-affidabile', 'Lettura affidabile'],
  ['/chi-siamo.html', 'Chi siamo'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-decani-gratis',
      title: 'Tarocchi gratis decani: carte e decani zodiacali',
      description:
        'Tarocchi gratis decani: cosa c’entra il decano con le carte, come usare data di nascita e lettura gratis su Luxseetarot.',
      keyword: 'tarocchi gratis decani',
      coverAlt: 'Tarocchi e simboli zodiacali per una lettura sui decani',
      faq: [
        {
          q: 'Cosa sono i decani?',
          a: 'Suddivisioni di circa 10 giorni dentro ogni segno zodiacale. Alcune tradizioni li collegano a carte o pianeti.',
        },
        {
          q: 'Serve il decano per i tarocchi gratis?',
          a: 'No. Su Luxseetarot usi data di nascita come contesto personale; le carte rispondono alla domanda e all’estrazione.',
        },
        {
          q: 'Posso chiedere “il mio decano” alle carte?',
          a: 'Meglio chiedere energia del periodo o atteggiamento utile, invece di forzare un’etichetta astrologica.',
        },
      ],
      bodyHtml: `
<p>La ricerca <strong>tarocchi gratis decani</strong> unisce carte e astrologia. I decani sono fette di segno (~10 giorni). Possono arricchire il contesto, ma non sostituiscono una domanda chiara. Su Luxseetarot inserisci già la <strong>data di nascita</strong> e fai una lettura gratis a tre carte.</p>
<h2>Come usarli senza confondersi</h2>
<ul>
  <li>Decano = sfondo, non verdetto.</li>
  <li>Tarocchi = mappa della domanda di oggi.</li>
  <li>Insieme: più linguaggio, non più certezza.</li>
</ul>
${expand({
  method: 'Se conosci il tuo decano, annota una qualità tipica. Poi fai la domanda ai tarocchi su un tema concreto e confronta — non forzare la conferma.',
  example: 'Decano “comunicativo” + 3 Spade in lettura amore: dolore/parola non detta. Azione: una conversazione onesta, non “è il mio destino astrale”.',
  limits: 'Non mescolare 5 sistemi (oroscopo, decani, numerologia, carte) nella stessa ansia. Scegline uno per sessione.',
  lux: 'Fai i tarocchi gratis con data di nascita e una domanda; lascia i decani come optional di studio.',
  exercise: 'Scrivi segno/decano (se lo sai) in 1 riga. Sotto, la domanda reale. Estrai tre carte solo sulla domanda.',
})}
${related([
  ['/blog/differenza-tarocchi-oroscopo', 'Tarocchi vs oroscopo'],
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda'],
  ['/tarocchi-gratis.html', 'Tarocchi gratis'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-napoletane-gratis',
      title: 'Tarocchi gratis tre carte napoletane: sì o no e amore',
      description:
        'Tarocchi gratis tre carte napoletane sì o no e amore: differenze con i tarocchi, cosa puoi fare online e alternativa Luxseetarot.',
      keyword: 'tarocchi gratis tre carte napoletane',
      coverAlt: 'Carte napoletane e tema lettura a tre carte gratis',
      faq: [
        {
          q: 'Tarocchi e carte napoletane sono la stessa cosa?',
          a: 'No. Le napoletane sono un mazzo regionale da gioco/cartomanzia; i tarocchi (es. Rider-Waite) hanno Arcani Maggiori e Minori.',
        },
        {
          q: 'Posso fare sì o no con tre carte napoletane?',
          a: 'Molti lo fanno, ma le domande chiuse restano limitanti. Meglio domande aperte anche con tre carte.',
        },
        {
          q: 'E in amore?',
          a: 'Stesso principio: tre carte su dinamiche, non solo “mi ama / non mi ama”.',
        },
      ],
      bodyHtml: `
<p>Su Google vedi <strong>tarocchi gratis tre carte napoletane sì o no</strong> e <strong>tarocchi gratis tre carte napoletane amore</strong>. Spesso si cerca una lettura rapida “da bar/cartomante” con mazzo napoletano. Luxseetarot usa i <strong>tarocchi</strong> (spread a tre carte gratis online), non le napoletane — ma il bisogno è lo stesso: chiarezza su amore o scelta.</p>
<h2>Cosa puoi fare qui</h2>
<ul>
  <li><strong>Tarocchi gratis sì o no</strong>: meglio riformulare (vedi guida dedicata).</li>
  <li><strong>Tarocchi gratis amore tre carte</strong>: ideale per relazioni.</li>
  <li>Anteprima immediata, senza account obbligatorio.</li>
</ul>
${expand({
  method: 'Se venivi dalle napoletane, porta la stessa domanda sui tarocchi: tre posizioni, un tema, un gesto dopo.',
  example: 'Da «Napoletane sì o no amore» a «Quale energia c’è tra noi e quale passo mi aiuta?». Più utile di un monosilabo.',
  limits: 'Non mescolare regole di mazzi diversi nella stessa lettura. Scegli un sistema per volta.',
  lux: 'Usa /tarocchi-gratis.html o /tarocchi-amore.html per tre carte gratis in italiano.',
  exercise: 'Trasforma la tua domanda napoletana sì/no in una domanda aperta. Poi estrai tre carte.',
})}
${related([
  ['/blog/tarocchi-si-o-no', 'Tarocchi sì o no'],
  ['/blog/lettura-tarocchi-tre-carte', 'Lettura a tre carte'],
  ['/tarocchi-amore.html', 'Tarocchi amore'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'sibille-amore-gratis-tre-carte',
      title: 'Sibille amore gratis tre carte: alternativa ai tarocchi',
      description:
        'Sibille amore gratis tre carte: cosa sono le Sibille, differenze con i tarocchi e come fare una lettura amore gratis a tre carte su Luxseetarot.',
      keyword: 'sibille amore gratis tre carte',
      coverAlt: 'Sibille e lettura amore a tre carte gratis',
      faq: [
        {
          q: 'Sibille e tarocchi sono uguali?',
          a: 'No. Le Sibille sono un oracolo diverso (spesso scene quotidiane). I tarocchi hanno struttura di Arcani. Entrambi si possono leggere a tre carte.',
        },
        {
          q: 'Posso fare sibille amore gratis qui?',
          a: 'Su Luxseetarot usiamo i tarocchi. Per l’amore gratis a tre carte il percorso è lo stesso: domanda + estrazione + anteprima.',
        },
        {
          q: 'Quale scegliere?',
          a: 'Se cerchi simboli archetipici, tarocchi. Se preferisci scene “di vita”, Sibille. L’importante è la domanda.',
        },
      ],
      bodyHtml: `
<p>La ricerca <strong>sibille amore gratis tre carte</strong> è vicina a chi vuole una lettura sentimentale rapida. Su Luxseetarot lavoriamo con i <strong>tarocchi gratis amore tre carte</strong> (e <strong>tarocchi 3 carte gratis amore</strong>): stesso formato a tre, linguaggio simbolico, anteprima gratis.</p>
<h2>Perché tre carte funzionano in amore</h2>
<ul>
  <li>Passato della dinamica.</li>
  <li>Presente emotivo.</li>
  <li>Tendenza / prossimo passo.</li>
</ul>
<p>Inizia da <a href="/tarocchi-amore.html">tarocchi amore</a> o dalla home per estrarre tre carte gratis.</p>
${expand({
  method: 'Una sola persona/tema per lettura. Domanda aperta. Tre carte. Un gesto concreto (parlare, attendere, chiudere con rispetto).',
  example: '3 Spade + 4 Spade + Stella: dolore, pausa, ripresa possibile se smetti di rivangare. Azione: digiuno da stalking social per 7 giorni.',
  limits: 'Né Sibille né tarocchi sostituiscono un dialogo o un supporto professionale.',
  lux: 'Prova i tarocchi gratis amore: ottieni lo stesso tipo di chiarezza “a tre carte” cercata con le Sibille.',
  exercise: 'Scrivi 1 domanda d’amore. Estrai tre carte. Una sola frase di sintesi + un’azione.',
})}
${related([
  ['/tarocchi-amore.html', 'Tarocchi amore online gratis'],
  ['/blog/tarocchi-amore-domande-esempi', '20 domande utili'],
  ['/blog/stesa-tarocchi-amore', 'Stesa tarocchi amore'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-amore-con-data-di-nascita-gratis',
      title: 'Tarocchi amore con data di nascita gratis',
      description:
        'Tarocchi amore con data di nascita gratis: perché si chiede la data, cosa cambia nella lettura e come iniziare su Luxseetarot.',
      keyword: 'tarocchi amore con data di nascita gratis',
      coverAlt: 'Lettura tarocchi amore gratis con data di nascita',
      faq: [
        {
          q: 'Perché serve la data di nascita?',
          a: 'Serve come contesto personale nella consultazione digitale. Non sostituisce un tema natale completo.',
        },
        {
          q: 'Posso fare tarocchi amore gratis con la mia data?',
          a: 'Sì: su Luxseetarot inserisci nome, data di nascita, email e la domanda d’amore, poi estrai tre carte.',
        },
        {
          q: 'La data rende la lettura più “vera”?',
          a: 'Aiuta a personalizzare il contesto. La qualità resta legata alla domanda e all’uso responsabile.',
        },
      ],
      bodyHtml: `
<p>Molti cercano <strong>tarocchi amore con data di nascita gratis</strong>: vogliono una lettura sentimentale legata al loro profilo. Su Luxseetarot è già così: nella lettura gratis online chiediamo la data di nascita insieme alla domanda, poi estrai tre carte.</p>
<h2>Cosa fa (e non fa) la data</h2>
<ul>
  <li>Personalizza il contesto della consultazione.</li>
  <li>Non legge il destino fisso del tema natale.</li>
  <li>Non sostituisce un dialogo di coppia.</li>
</ul>
<p>Vai su <a href="/tarocchi-amore.html">tarocchi amore</a> o <a href="/tarocchi-gratis.html">tarocchi gratis</a> e inizia.</p>
${expand({
  method: 'Prepara domanda d’amore + data. Evita sì/no assoluti. Dopo l’anteprima, scegli un solo insight.',
  example: 'Domanda: «Quale energia porto io in questa relazione?». Data inserita. Carte: Luna + 2 Coppe + Eremita — bisogno di chiarezza, legame vivo, tempo per te.',
  limits: 'La data non autorizza “predizioni certe”. Resta un servizio di riflessione.',
  lux: 'Il form Luxseetarot include già data di nascita per i tarocchi amore gratis.',
  exercise: 'Scrivi data + 1 domanda d’amore. Estrai tre carte. Niente seconda estrazione lo stesso giorno.',
})}
${related([
  ['/tarocchi-amore.html', 'Tarocchi amore'],
  ['/blog/tarocchi-1-carta-gratis', '1 carta gratis amore'],
  ['/blog/tarocchi-zingara-gratis', 'Tarocchi zingara gratis'],
])}
${CTA}
`.trim(),
    }),
  ];
}
