/**
 * Terzo lotto articoli blog (SEO intent + long-tail IT).
 * Temi non sovrapposti ai cataloghi A/B. Tutti in draft.
 */

import { withSeoKeywords } from './blog-seed-seo.js';

function article(partial) {
  const slug = String(partial.slug || '');
  const coverImage =
    partial.coverImage ||
    (slug ? `/images/blog/${slug}.jpg?v=3` : '');
  return withSeoKeywords({
    status: 'draft',
    faq: partial.faq || [],
    ...partial,
    coverImage,
    coverAlt: partial.coverAlt || partial.title || '',
  });
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
<p>Prima di cercare una risposta definitiva, chiarisci il contesto: che cosa è successo, quale parte dipende da te e quale informazione ti manca. Leggi poi ogni simbolo come un’ipotesi da confrontare con i fatti, non come una sentenza. Questo passaggio rende la consultazione più concreta: invece di domandarti soltanto «che cosa accadrà?», osservi atteggiamenti, risorse, rischi e prossime azioni possibili. Annota la prima impressione, ma rileggi tutto alla luce della domanda iniziale.</p>
<p>${method}</p>
<h2>Un esempio concreto di interpretazione</h2>
<p>Gli esempi servono come modello, non come dizionario rigido. La stessa immagine cambia sfumatura secondo la posizione occupata, le carte vicine e la situazione descritta. Cerca quindi una frase completa che colleghi simbolo, contesto e comportamento osservabile. Se la frase resta vaga, chiediti quale fatto potrebbe confermarla o smentirla nei prossimi giorni.</p>
<p>${example}</p>
<h2>Limiti e uso responsabile</h2>
<p>I tarocchi non sostituiscono medici, psicologi, avvocati, consulenti finanziari né una conversazione diretta con le persone coinvolte. Non leggono con certezza la mente altrui e non garantiscono date o risultati. Sono più utili come strumento narrativo per mettere ordine tra emozioni e possibilità. Se una lettura aumenta paura, dipendenza o bisogno di ripetere la stessa domanda, fermati, torna ai fatti e cerca un sostegno adeguato.</p>
<p>${limits}</p>
<h2>Come usare Luxseetarot su questo tema</h2>
<p>Su Luxseetarot puoi partire dai <a href="/tarocchi-gratis.html">tarocchi gratis</a>: una domanda aperta e circoscritta, tre carte e una mappa del momento. Leggi prima l’insieme, poi i dettagli; salva mentalmente una sola idea centrale e trasformala in un gesto verificabile. Evita estrazioni consecutive per ottenere un testo più rassicurante: se vuoi approfondire, formula una domanda diversa ma collegata allo stesso nodo.</p>
<p>${lux}</p>
<h2>Mini esercizio di integrazione</h2>
<p>Prendi carta e penna e dedica dieci minuti all’esercizio seguente. Scrivere rallenta le interpretazioni impulsive e permette di distinguere intuizione, desiderio e paura. Concludi sempre con una frase al presente e un’azione piccola, realistica e sotto il tuo controllo; poi stabilisci quando verificare che cosa è cambiato, senza consultare di nuovo le carte nel frattempo.</p>
<p>${exercise}</p>
`.trim();
}

export function getSeedArticlesC() {
  return [
    article({
      slug: 'cartomanzia-online',
      title: 'Cartomanzia online: come funziona e come usarla bene',
      description:
        'Guida alla cartomanzia online: differenza con i tarocchi, come scegliere un servizio affidabile e cosa aspettarsi da una lettura a distanza.',
      keyword: 'cartomanzia online',
      coverAlt: 'Carte da cartomanzia e smartphone su tavolo soft',
      faq: [
        {
          q: 'Cartomanzia online e tarocchi sono la stessa cosa?',
          a: 'Spesso si usano come sinonimi, ma la cartomanzia può includere anche Sibille o altri mazzi. I tarocchi hanno 78 carte e un sistema simbolico specifico.',
        },
        {
          q: 'La cartomanzia online è affidabile?',
          a: 'Dipende da trasparenza, limiti dichiarati e qualità della domanda. Nessun servizio online “garantisce” il futuro: cerca chiarezza, non promesse magiche.',
        },
        {
          q: 'Posso fare cartomanzia gratis?',
          a: 'Sì: su Luxseetarot puoi iniziare con un’anteprima a tre carte gratuita e approfondire se ti parla.',
        },
      ],
      bodyHtml: `
<p>Cercare <strong>cartomanzia online</strong> significa spesso voler chiarire amore, lavoro o una scelta senza appuntamento dal vivo. Funziona meglio se sai cosa può offrirti una lettura a distanza e cosa no.</p>
<p>In sintesi: la cartomanzia online è una consultazione simbolica via web. Non sostituisce un dialogo con le persone coinvolte né un consiglio professionale; aiuta a nominare dinamiche, opzioni e prossimi passi.</p>
<h2>Cos’è la cartomanzia online</h2>
<p>La cartomanzia è la lettura delle carte a scopo riflessivo o divinatorio. Online può usare tarocchi, Sibille o mazzi misti. Su Luxseetarot lavoriamo con i <strong>tarocchi</strong> e una stesa a tre carte chiara: passato, presente, tendenza.</p>
<ul>
  <li><strong>Intent informativo</strong>: capire un clima emotivo o un blocco.</li>
  <li><strong>Intent decisionale</strong>: confrontare opzioni senza chiedere un sì/no magico.</li>
  <li><strong>Intent “curiosità”</strong>: esplorare simboli senza aspettative assolute.</li>
</ul>
<h2>Come scegliere un servizio di cartomanzia online</h2>
<ol>
  <li>Leggi disclaimer e limiti (niente salute, legale, “certezze sull’altro”).</li>
  <li>Preferisci domande aperte e stese semplici se sei all’inizio.</li>
  <li>Diffida di chi promette ritorno garantito, date precise o “rimozione blocchi” a pagamento aggressivo.</li>
  <li>Valuta se puoi fare un’anteprima gratis prima di approfondire.</li>
</ol>
<p>Per approfondire il confronto con altri strumenti, vedi anche la <a href="/blog/differenza-cartomanzia-e-tarocchi">differenza tra cartomanzia e tarocchi</a> e come <a href="/blog/lettura-tarocchi-online-affidabile">riconoscere una lettura online affidabile</a>.</p>
${expand({
  method: 'Prima della sessione online, scrivi in una riga il fatto, l’emozione e la decisione aperta. Poi formula una domanda che includa il tuo margine d’azione. Durante la lettura, collega ogni carta a un comportamento osservabile (messaggi, silenzi, scadenze), non solo a un’impressione.',
  example: 'Domanda: «Cosa posso chiarire sulla dinamica con X nei prossimi giorni?». Tre carte possono indicare un malinteso passato, un presente di esitazione e una tendenza a parlare con più calma. L’azione utile non è “costringerlo a rispondere”, ma preparare due messaggi sobri e un limite di attesa.',
  limits: 'La cartomanzia online non legge messaggi privati né garantisce fedeltà o rientri. Se ti spinge a stalking emotivo o a spese ripetute per “sbloccare” il destino, interrompi. Usa le carte per te, non come prova contro qualcuno.',
  lux: 'Su Luxseetarot parti dai tarocchi gratis: una domanda aperta, tre carte, sintesi. Se vuoi dettaglio, approfondisci lo stesso estratto invece di ripetere la stessa domanda ansiosa.',
  exercise: 'Scrivi: “Chiedo alle carte di aiutarmi a…” + un verbo concreto (capire, scegliere, comunicare). Fai la lettura, poi annota un gesto entro 48 ore. Non rifare la stesa prima di aver completato il gesto.',
})}
${related([
  ['/blog/tarocchi-gratis-online-come-funzionano', 'Come funzionano i tarocchi gratis online'],
  ['/blog/lettura-tarocchi-a-distanza', 'Lettura tarocchi a distanza'],
  ['/blog/tarocchi-online-come-scegliere', 'Come scegliere un servizio di tarocchi online'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'come-leggere-i-tarocchi-da-soli',
      title: 'Come leggere i tarocchi da soli: guida per principianti',
      description:
        'Come leggere i tarocchi da soli: metodo semplice, stesa a tre carte, errori da evitare e come praticare senza confondersi.',
      keyword: 'come leggere i tarocchi da soli',
      coverAlt: 'Persona che legge tarocchi da sola a un tavolo calmo',
      faq: [
        {
          q: 'Posso imparare i tarocchi da autodidatta?',
          a: 'Sì. Parti da una carta al giorno e da stese brevi. Meglio costanza e diario che memorizzare 78 definizioni di corsa.',
        },
        {
          q: 'Quante carte estrarre all’inizio?',
          a: 'Una o tre. La Croce Celtica è potente ma confonde i principianti se non conosci ancora i simboli.',
        },
        {
          q: 'Devo usare carte rovesciate subito?',
          a: 'No. Impara prima le carte diritte; aggiungi le rovesciate quando le immagini ti sono familiari.',
        },
      ],
      bodyHtml: `
<p>Se cerchi <strong>come leggere i tarocchi da soli</strong>, la risposta più utile è: inizia piccolo, con una domanda chiara e una stesa breve. Non serve essere “dotati”: serve metodo, osservazione e rispetto dei limiti.</p>
<h2>Metodo in 5 passi</h2>
<ol>
  <li>Formula una domanda aperta (cosa, come, quale energia), non un sì/no ansioso.</li>
  <li>Mescola con calma e scegli le carte (o usale online).</li>
  <li>Guarda prima l’insieme: colori, figure, atmosfera.</li>
  <li>Collega ogni carta alla posizione (es. passato / presente / tendenza).</li>
  <li>Scrivi una sintesi in una frase + un’azione concreta.</li>
</ol>
<h2>La stesa ideale per iniziare</h2>
<p>La <a href="/blog/lettura-tarocchi-tre-carte">lettura a tre carte</a> è il miglior allenamento: passato, presente, futuro tendenziale. Quando sei più sicuro, puoi passare a stese tematiche come la <a href="/blog/stesa-tarocchi-amore">stesa tarocchi amore</a> o studiare la <a href="/blog/croce-celtica-tarocchi">Croce Celtica</a>.</p>
<h2>Errori tipici da solo</h2>
<ul>
  <li>Ripetere la stessa domanda finché “esce bello”.</li>
  <li>Leggere solo l’altro e mai te stesso.</li>
  <li>Prendere le carte come ordine invece che come ipotesi.</li>
</ul>
${expand({
  method: 'Quando leggi da solo, separa tre livelli: (1) significato classico della carta, (2) sensazione personale sull’immagine, (3) fatto della tua vita che potrebbe collegarsi. Se 2 e 3 non combaciano, tieni il dubbio e verifica nei giorni successivi invece di forzare.',
  example: 'Domanda: «Cosa posso imparare da questa incertezza lavorativa?». Escono Luna, Otto di Denari e Sole. Sintesi: c’è confusione, ma la pratica quotidiana porta chiarezza. Azione: aggiorna CV 30 minuti e chiedi un feedback concreto, non “dimmi se mi assumeranno”.',
  limits: 'Da soli è facile proiettare paure o desideri. Se sei molto agitata/o, posponi la lettura o usa solo una carta del giorno. Non decidere scelte irreversibili subito dopo un’estrazione intensa.',
  lux: 'Puoi esercitarti su Luxseetarot con tre carte gratis: confronta la tua intuizione con il testo, poi annota solo ciò che risuona. Usa l’approfondimento per chiarire un dettaglio, non per rassicurarti all’infinito.',
  exercise: 'Per sette giorni estrai una carta al mattino. Scrivi: simbolo / situazione del giorno / cosa hai notato a sera. Al settimo giorno rileggi: quali temi si ripetono?',
})}
${related([
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda ai tarocchi'],
  ['/blog/come-mescolare-e-scegliere-le-carte', 'Come mescolare e scegliere le carte'],
  ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni in lettura'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'croce-celtica-tarocchi',
      title: 'Croce Celtica nei tarocchi: posizioni e come leggerla',
      description:
        'Croce Celtica tarocchi spiegata: le 10 posizioni, quando usarla, come interpretarla senza perderti e alternative più semplici.',
      keyword: 'croce celtica tarocchi',
      coverAlt: 'Dieci carte disposte a Croce Celtica su tessuto scuro',
      faq: [
        {
          q: 'Quante carte ha la Croce Celtica?',
          a: 'Dieci. È una stesa ampia, adatta a situazioni complesse, non a domande minutarie.',
        },
        {
          q: 'È adatta ai principianti?',
          a: 'Meglio dopo aver preso confidenza con tre carte. Altrimenti rischi di annegare nei dettagli.',
        },
        {
          q: 'Posso usarla in amore?',
          a: 'Sì, se la domanda riguarda la dinamica complessiva. Per un nodo singolo, tre carte restano più nitide.',
        },
      ],
      bodyHtml: `
<p>La <strong>Croce Celtica nei tarocchi</strong> è una delle stese più cercate: dieci posizioni che mappano tema, ostacolo, passato, tendenza, ambiente e esito possibile. È potente — e facile da sovraccaricare se la usi per tutto.</p>
<h2>Le 10 posizioni (schema classico)</h2>
<ol>
  <li>Situazione presente / cuore della domanda</li>
  <li>Incrocio: aiuto o ostacolo immediato</li>
  <li>Base / radice inconscia</li>
  <li>Passato recente</li>
  <li>Corona: obiettivo o idea consapevole</li>
  <li>Prossimo passo / futuro vicino</li>
  <li>Tu (atteggiamento attuale)</li>
  <li>Ambiente (persone, contesto)</li>
  <li>Speranze e paure</li>
  <li>Esito tendenziale (non calendario fisso)</li>
</ol>
<h2>Quando usarla (e quando no)</h2>
<p>Usala per nodi articolati: relazione lunga, cambio lavoro, fase di vita. Evitala se sei in ansia acuta o se vuoi solo un sì/no: in quel caso parti da <a href="/blog/lettura-tarocchi-tre-carte">tre carte</a> o da una <a href="/blog/stesa-tarocchi-amore">stesa amore</a> più corta.</p>
${expand({
  method: 'Leggi la Croce Celtica a “cerchi”: prima 1–2 (nucleo), poi 3–6 (arco temporale), poi 7–9 (psicologia e contesto), infine 10 come sintesi, non come verdetto. Se 9 (paure) e 10 si contraddicono, chiediti quale paura sta guidando le tue scelte.',
  example: 'In una domanda su un possibile rientro, la carta 2 può mostrare idealizzazione, la 8 distanza concreta e la 10 un’apertura condizionata al dialogo. Il messaggio utile: non “tornerà sabato”, ma “serve chiarezza e meno proiezione”.',
  limits: 'Dieci carte non aumentano la certezza: aumentano le sfumature. Non usarle per spiare o per decisioni mediche/legali. Se dopo la Croce ti senti peggio, riduci a una sintesi di tre punti e chiudi la sessione.',
  lux: 'Su Luxseetarot la lettura standard è a tre carte: ideale per allenarti. Per temi ampi, fai più domande collegate (dinamica / tuo ruolo / prossimo passo) invece di forzare una sola stesa enorme.',
  exercise: 'Scegli una situazione. Scrivi dieci etichette delle posizioni. Anche senza mazzo, assegna a memoria un’immagine o una parola a ciascuna. Poi confronta con una stesa reale: nota dove proiettavi.',
})}
${related([
  ['/blog/come-leggere-i-tarocchi-da-soli', 'Come leggere i tarocchi da soli'],
  ['/blog/combinazioni-di-carte-tarocchi', 'Combinazioni di carte'],
  ['/blog/come-interpretare-i-tarocchi', 'Come interpretare i tarocchi'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'differenza-cartomanzia-e-tarocchi',
      title: 'Differenza tra cartomanzia e tarocchi: cosa sapere',
      description:
        'Cartomanzia e tarocchi: differenze di mazzo, metodo e uso. Quando scegliere i tarocchi e cosa aspettarsi da una lettura online.',
      keyword: 'differenza cartomanzia e tarocchi',
      coverAlt: 'Mazzo di tarocchi accanto a carte di cartomanzia',
      faq: [
        {
          q: 'I tarocchi sono un tipo di cartomanzia?',
          a: 'Sì: la cartomanzia è l’insieme delle pratiche con le carte; i tarocchi sono un sistema specifico a 78 carte.',
        },
        {
          q: 'Quale è più “preciso”?',
          a: 'Non esiste una scala magica. Contano domanda, lettore/metodo e come integri il messaggio nella realtà.',
        },
        {
          q: 'Meglio Sibille o tarocchi in amore?',
          a: 'Dipende dallo stile: le Sibille sono spesso più “narrative” sul quotidiano; i tarocchi più archetipici e psicologici.',
        },
      ],
      bodyHtml: `
<p>Capire la <strong>differenza tra cartomanzia e tarocchi</strong> evita confusione quando cerchi una lettura online o un mazzo da studiare. Non sono rivali: i tarocchi rientrano nella famiglia più ampia della cartomanzia.</p>
<h2>In breve</h2>
<ul>
  <li><strong>Cartomanzia</strong>: pratica di lettura con carte (tarocchi, Sibille, Lenormand, mazzi oracolo…).</li>
  <li><strong>Tarocchi</strong>: mazzo strutturato in 22 Arcani Maggiori + 56 Minori, con semi e numeri.</li>
</ul>
<h2>Cosa cambia in pratica</h2>
<p>Con i tarocchi lavori su archetipi (Matto, Torre, Sole…) e su dinamiche profonde. Con altri mazzi di cartomanzia puoi avere un linguaggio più “giornaliero”. Se ti interessa introspezione e percorso, i tarocchi sono ottimi; se cerchi dettagli di scena, potresti preferire altri sistemi — o usarli in modo complementare.</p>
<p>Su Luxseetarot offriamo <a href="/tarocchi-gratis.html">tarocchi gratis</a> (non Sibille): ideali per mappe chiare in tre carte. Per il contesto digitale vedi anche <a href="/blog/cartomanzia-online">cartomanzia online</a>.</p>
${expand({
  method: 'Quando confronti strumenti, chiediti: voglio un linguaggio psicologico-archetipico (tarocchi) o un racconto più concreto di eventi (alcune cartomanzie)? Allinea strumento e intent, poi formula la domanda di conseguenza.',
  example: 'Per “che clima c’è tra noi?” i tarocchi con Amanti / Luna / Due di Coppe descrivono scelta, incertezza e legame. Una Sibilla potrebbe enfatizzare incontri, dialoghi, terzi. Entrambi utili se non li tratti come prova legale dei sentimenti.',
  limits: 'Nessuno strumento “vince” sull’altro. Evita chi sminuisce un sistema per vendere il proprio. La precisione percepita spesso dipende dalla chiarezza della domanda.',
  lux: 'Prova i tarocchi gratis su Luxseetarot e valuta se il linguaggio ti parla. Se sì, approfondisci; se no, riformula la domanda prima di cambiare strumento.',
  exercise: 'Scrivi la stessa domanda due volte: versione “archetipo” e versione “fatto quotidiano”. Scegli quale tool useresti e perché. Poi fai una sola lettura coerente.',
})}
${related([
  ['/blog/differenza-tarocchi-oroscopo', 'Differenza tarocchi e oroscopo'],
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/tarocchi-rider-waite', 'Tarocchi Rider-Waite'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-cosa-pensa-di-me',
      title: 'Tarocchi “cosa pensa di me”: come chiedere senza ossessionarti',
      description:
        'Tarocchi cosa pensa di me: come formulare la domanda, cosa possono (e non possono) dire le carte sui pensieri altrui.',
      keyword: 'tarocchi cosa pensa di me',
      coverAlt: 'Carte dei tarocchi e domanda scritta su un foglietto',
      faq: [
        {
          q: 'I tarocchi leggono la mente di qualcuno?',
          a: 'No. Descrivono atmosfere, proiezioni e dinamiche simboliche. Non sono un telefono della mente altrui.',
        },
        {
          q: 'Quale domanda è meglio di “cosa pensa di me”?',
          a: 'Esempi: “Quale energia c’è tra noi?”, “Cosa posso fare per chiarire?”, “Dove sto proiettando?”.',
        },
        {
          q: 'Perché dopo queste letture sto peggio?',
          a: 'Spesso perché cerchi controllo sull’altro. Porta il focus su te e su azioni verificabili.',
        },
      ],
      bodyHtml: `
<p>La query <strong>tarocchi cosa pensa di me</strong> è tra le più cercate in amore — e tra le più ambigue. Le carte non scansionano i pensieri: raccontano un clima e, soprattutto, il tuo bisogno di sapere.</p>
<h2>Cosa può rispondere una lettura utile</h2>
<ul>
  <li>Segnali di apertura, distanza, idealizzazione o paura.</li>
  <li>Il tuo ruolo nella dinamica (ansia, silenzio, pressione).</li>
  <li>Un prossimo passo concreto: parlare, attendere, chiudere un ciclo.</li>
</ul>
<h2>Domande migliori (SEO + benessere)</h2>
<ul>
  <li>Quale energia c’è tra me e questa persona adesso?</li>
  <li>Cosa sto interpretando e cosa posso verificare nei fatti?</li>
  <li>Come posso prendermi cura di me in questa incertezza?</li>
</ul>
<p>Vedi anche <a href="/blog/tarocchi-amore-domande-esempi">esempi di domande in amore</a> e <a href="/blog/tarocchi-e-ansia-usarli-bene">come usare i tarocchi senza ansia</a>.</p>
${expand({
  method: 'Riscrivi “cosa pensa di me?” in “quale dinamica sto vivendo e quale parte posso governare?”. In lettura, assegna una carta all’altro solo come ipotesi di clima, mai come prova. La carta su di te conta di più: lì hai margine.',
  example: 'Escono Luna, Cavaliere di Coppe e Otto di Spade. Ipotesi: c’è attrazione confusa, ma tu ti senti bloccata/o. Azione: un messaggio chiaro o una pausa dai controlli social — non una terza lettura “per capire se mi pensa”.',
  limits: 'Non usare le carte per giustificare intrusioni. Se la persona non comunica, il dato reale è il silenzio, non l’interpretazione simbolica. In caso di ossessione, interrompi le letture sul tema.',
  lux: 'Su Luxseetarot fai tre carte gratis su una domanda riformulata. Se il testo aumenta l’ansia, chiudi e scegli un gesto di autocura invece di approfondire.',
  exercise: 'Scrivi tre cose che sai di fatti (messaggi, incontri) e tre cose che stai immaginando. Fai la lettura solo sul “come stare con l’incertezza”, non sul contenuto della mente altrui.',
})}
${related([
  ['/blog/significato-tarocchi-amore', 'Significato dei tarocchi in amore'],
  ['/blog/tarocchi-ex-e-ricongiungimento', 'Tarocchi sull’ex'],
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come formulare la domanda'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-ritorno-di-fiamma',
      title: 'Tarocchi ritorno di fiamma: come leggere senza illusioni',
      description:
        'Tarocchi e ritorno di fiamma: cosa osservare nelle carte, domande utili e limiti. Niente promesse magiche, solo chiarezza sulla dinamica.',
      keyword: 'tarocchi ritorno di fiamma',
      coverAlt: 'Candela e carte dei tarocchi su tema sentimentale',
      faq: [
        {
          q: 'I tarocchi possono dirmi se tornerà?',
          a: 'Possono descrivere tendenze e blocchi, non garantire un rientro. Meglio chiedere cosa è vivo nella dinamica e cosa puoi fare tu.',
        },
        {
          q: 'Quali carte indicano un possibile ritorno?',
          a: 'Dipende dal contesto. Coppe, Giudizio, Stella o Sei di Coppe possono parlare di riaperture — ma vanno lette insieme, non isolate.',
        },
        {
          q: 'Ogni quanto rifare la lettura sul ritorno?',
          a: 'Solo se cambiano i fatti. Ripetere ogni giorno aumenta l’attesa, non la certezza.',
        },
      ],
      bodyHtml: `
<p>Chi cerca <strong>tarocchi ritorno di fiamma</strong> vuole spesso una rassicurazione. Una lettura sana fa il contrario: distingue desiderio, nostalgia e possibilità reale.</p>
<h2>Cosa osservare</h2>
<ul>
  <li>C’è dialogo o solo fantasia?</li>
  <li>Le carte parlano di maturazione o di ripetizione dello stesso schema?</li>
  <li>Tu stai aspettando o stai ricostruendo una vita piena comunque?</li>
</ul>
<p>Collegato: <a href="/blog/tarocchi-ex-e-ricongiungimento">ex e ricongiungimento</a>, <a href="/blog/significato-carta-la-stella">carta La Stella</a> (speranza), <a href="/blog/significato-tre-di-spade">Tre di Spade</a> (ferita).</p>
${expand({
  method: 'Dividi la lettura in tre: (1) cosa è finito, (2) cosa è ancora vivo, (3) quale te stai costruendo indipendentemente dal ritorno. Se la terza parte è vuota, le carte spesso riflettono dipendenza più che amore.',
  example: 'Sei di Coppe + Luna + Due di Spade: nostalgia, confusione, stallo. Messaggio utile: chiarire con te se cerchi la persona o il ricordo. Azione: 7 giorni senza controllare profili + una conversazione onesta se c’è contatto reale.',
  limits: 'Nessuna carta “obbliga” qualcuno a tornare. Diffida di rituali a pagamento che promettono rientri. Se c’è storia di abuso, priorità alla sicurezza, non alla lettura.',
  lux: 'Prova tre carte gratis su: «Cosa devo vedere su questo possibile ritorno e sul mio equilibrio?». Conserva una sola frase e un gesto concreto.',
  exercise: 'Scrivi due colonne: “se torna” / “se non torna”. In ciascuna, tre azioni di cura di te. Scegline una da fare questa settimana in entrambi gli scenari.',
})}
${related([
  ['/blog/tarocchi-ex-e-ricongiungimento', 'Ex e ricongiungimento'],
  ['/blog/tarocchi-cosa-pensa-di-me', 'Cosa pensa di me (riformulare)'],
  ['/blog/tarocchi-e-ansia-usarli-bene', 'Tarocchi e ansia'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-tradimento',
      title: 'Tarocchi e tradimento: segnali simbolici (senza paranoia)',
      description:
        'Tarocchi tradimento: come leggere carte di segreto e rottura senza accusare. Domande utili, limiti e focus sui fatti.',
      keyword: 'tarocchi tradimento',
      coverAlt: 'Carte dei tarocchi con atmosfera di dubbio e chiarezza',
      faq: [
        {
          q: 'Quale carta indica tradimento?',
          a: 'Nessuna in modo automatico. Diavolo, Luna, 7 di Spade o 3 di Spade possono parlare di segreto, confusione o ferita — non di prova.',
        },
        {
          q: 'Posso usare i tarocchi per “scoprire” un tradimento?',
          a: 'Meglio usare le carte per capire il tuo disagio e cosa verificare nella realtà (dialogo, comportamenti), non come detective magico.',
        },
        {
          q: 'Cosa fare se esce una carta “pesante”?',
          a: 'Annota l’ipotesi, cerca fatti, parla se è sicuro e utile. Non confrontare l’altro “perché l’hanno detto le carte”.',
        },
      ],
      bodyHtml: `
<p>Cercare <strong>tarocchi tradimento</strong> nasce spesso da un dubbio già presente. Le carte possono dare linguaggio a gelosia, distanza e segreti simbolici — non prove giudiziarie.</p>
<h2>Segnali simbolici (da non absolutizzare)</h2>
<ul>
  <li><a href="/blog/significato-carta-il-diavolo">Il Diavolo</a>: legami, dipendenza, tentazione.</li>
  <li><a href="/blog/significato-carta-la-luna">La Luna</a>: non detto, paura, ambiguità.</li>
  <li><a href="/blog/significato-tre-di-spade">Tre di Spade</a>: dolore e rottura emotiva.</li>
  <li>Sette di Spade (classico): strategia, fuga, cosa nascosta — da contestualizzare.</li>
</ul>
<h2>Domande più sane</h2>
<ul>
  <li>Cosa sto percependo e cosa posso verificare?</li>
  <li>Quale conversazione è necessaria per me?</li>
  <li>Sto evitando una verità già evidente nei fatti?</li>
</ul>
${expand({
  method: 'Tratta ogni “segnale di tradimento” come ipotesi da testare: quale comportamento concreto la sostiene? Se non ce ne sono, lavora sull’ansia e sulla comunicazione, non sull’accusa.',
  example: 'Luna + 7 di Spade + Papessa: clima di non detto. Azione: chiedere chiarezza su tempi e disponibilità, non interrogatorio notturno. Se i fatti restano opachi a lungo, valuta i tuoi limiti di relazione.',
  limits: 'Le carte non autorizzano violazioni di privacy. In relazioni abusive o pericolose, cerca supporto reale. Non usare la lettura per umiliare o controllare.',
  lux: 'Su Luxseetarot formula: «Cosa posso chiarire su questa fiducia e sul mio bisogno di verità?». Evita “dimmi se mi tradisce”.',
  exercise: 'Elenca 3 fatti osservabili e 3 paure. Porta in lettura solo i fatti + la domanda su come proteggere la tua dignità. Poi scegli un passo di dialogo o di confine.',
})}
${related([
  ['/blog/significato-tarocchi-amore', 'Tarocchi in amore'],
  ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni'],
  ['/blog/tarocchi-e-decisioni-difficili', 'Decisioni difficili'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-scelta-tra-due-persone',
      title: 'Tarocchi scelta tra due persone: come leggerla con lucidità',
      description:
        'Tarocchi scelta tra due: metodo a confronto, domande utili e come evitare di scaricare la responsabilità sulle carte.',
      keyword: 'tarocchi scelta tra due persone',
      coverAlt: 'Due sentieri e carte dei tarocchi sul tavolo',
      faq: [
        {
          q: 'I tarocchi possono dirmi chi scegliere?',
          a: 'Possono confrontare energie e conseguenze simboliche. La scelta resta tua, con valori e fatti.',
        },
        {
          q: 'Meglio una carta per persona?',
          a: 'Utile: A / B / tu. O tre carte per ciascun percorso. Evita stese infinite “finché vince chi preferisci”.',
        },
        {
          q: 'E se esce “nessuno dei due”?',
          a: 'A volte il messaggio è maturare, chiudere o restare da soli per un periodo. Ascoltalo senza forzare un vincitore.',
        },
      ],
      bodyHtml: `
<p>La ricerca <strong>tarocchi scelta tra due persone</strong> è tipica dei triangoli emotivi e delle fasi di indecisione. Una buona lettura non “incorona” qualcuno: ti mostra costi, benefici e il tuo vero criterio.</p>
<h2>Stesa semplice a confronto</h2>
<ol>
  <li>Energia del percorso A</li>
  <li>Energia del percorso B</li>
  <li>Cosa hai bisogno di onorare tu (valori, timing, verità)</li>
</ol>
<p>Approfondisci con <a href="/blog/tarocchi-e-decisioni-difficili">tarocchi e decisioni difficili</a> e <a href="/blog/significato-carta-gli-amanti">Gli Amanti</a> (scelta consapevole).</p>
${expand({
  method: 'Definisci criteri prima delle carte: rispetto, stabilità, desiderio, progetti. Poi leggi A e B alla luce di quei criteri. Se una opzione “vince” solo perché spegne l’ansia, segnalo: è sollievo, non allineamento.',
  example: 'A: Imperatore + 4 di Bastoni (struttura). B: Cavaliere di Coppe + Luna (passione confusa). Tu: Giustizia. Sintesi: scegli in base a equità e chiarezza, non solo a intensità. Azione: una conversazione onesta con entrambe le parti (o chiusura di ambiguità).',
  limits: 'Non usare le carte per tenere due persone in sospeso. Se c’è impegno già dichiarato, la priorità etica conta più del responso. Nessuna carta giustifica manipolazione.',
  lux: 'Fai tre carte gratis su “cosa mi aiuta a scegliere in modo integro?”, non su “chi mi ama di più”.',
  exercise: 'Scrivi per A e B: pro, contro, come ti senti dopo 24h lontano da entrambi. Solo dopo consulta le carte e confronta.',
})}
${related([
  ['/blog/tarocchi-si-o-no', 'Perché evitare il puro sì/no'],
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Formulare la domanda'],
  ['/blog/tarocchi-per-single', 'Tarocchi per single'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'come-scegliere-un-mazzo-di-tarocchi',
      title: 'Come scegliere un mazzo di tarocchi: guida pratica',
      description:
        'Come scegliere un mazzo di tarocchi: Rider-Waite, Marsiglia, oracoli, budget e criteri per principianti.',
      keyword: 'come scegliere un mazzo di tarocchi',
      coverAlt: 'Vari mazzi di tarocchi aperti su un tavolo',
      faq: [
        {
          q: 'Qual è il miglior mazzo per iniziare?',
          a: 'Molti principianti partono da un mazzo ispirato al Rider-Waite: immagini narrative su tutti gli Arcani Minori.',
        },
        {
          q: 'Devo sentire “la chiamata” del mazzo?',
          a: 'Aiuta che ti piaccia guardarlo. Ma contano anche chiarezza delle immagini e libretto/risorse per studiare.',
        },
        {
          q: 'Posso iniziare online senza mazzo fisico?',
          a: 'Sì. Su Luxseetarot puoi praticare con tre carte gratis e imparare i simboli mentre scegli un mazzo.',
        },
      ],
      bodyHtml: `
<p>Sapere <strong>come scegliere un mazzo di tarocchi</strong> accelera l’apprendimento: un mazzo confuso o troppo astratto scoraggia. Non serve il più costoso; serve quello che riesci a leggere.</p>
<h2>Criteri di scelta</h2>
<ul>
  <li><strong>Immagini chiare</strong> (soprattutto Minori illustrati).</li>
  <li><strong>Tradizione</strong>: Rider-Waite, Marsiglia, Thoth — o un clone fedele.</li>
  <li><strong>Formato</strong>: carte maneggevoli per le tue mani.</li>
  <li><strong>Risorse</strong>: guide online e comunità per quel sistema.</li>
</ul>
<p>Approfondisci il sistema più usato online: <a href="/blog/tarocchi-rider-waite">tarocchi Rider-Waite</a>. Se parti da zero, leggi anche <a href="/blog/come-leggere-i-tarocchi-da-soli">come leggere i tarocchi da soli</a>.</p>
${expand({
  method: 'Sfoglia anteprime: se in 10 secondi capisci una scena (es. Tre di Spade), il mazzo ti aiuterà. Se vedi solo pattern astratti e ti blocchi, rimanda quel mazzo a quando avrai più esperienza.',
  example: 'Un principiante sceglie un clone Rider-Waite con Minori illustrati e studia una carta al giorno. Dopo un mese passa a stese a tre. Un mazzo Marsiglia puro richiederebbe più studio numerologico iniziale.',
  limits: 'Non serve comprare dieci mazzi. Un mazzo studiato batte una collezione inutilizzata. Evita marketing che vende “mazzi più potenti”.',
  lux: 'Esercitati online su Luxseetarot mentre valuti l’acquisto: confronterai simboli classici e linguaggio narrativo.',
  exercise: 'Fai una shortlist di 3 mazzi. Per ciascuno nota: chiarezza, piacere estetico, prezzo. Compra solo se due criteri su tre sono alti.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/arcani-minori-cosa-sono', 'Arcani Minori'],
  ['/blog/come-pulire-il-mazzo-di-tarocchi', 'Come pulire il mazzo'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'come-pulire-il-mazzo-di-tarocchi',
      title: 'Come pulire il mazzo di tarocchi: rituali semplici e sensati',
      description:
        'Come pulire il mazzo di tarocchi dopo letture intense: metodi pratici (ordine, respiro, luna) senza superstizione eccessiva.',
      keyword: 'come pulire il mazzo di tarocchi',
      coverAlt: 'Mazzo di tarocchi accanto a cristallo e luce soft',
      faq: [
        {
          q: 'Devo davvero “smagnetizzare” il mazzo?',
          a: 'Il gesto serve soprattutto a te: chiudere una sessione e resettare l’attenzione. Non è obbligatorio in senso magico.',
        },
        {
          q: 'Ogni quanto pulirlo?',
          a: 'Dopo letture molto emotive, o quando senti confusione. Non serve ritualizzare ogni estrazione quotidiana.',
        },
        {
          q: 'Posso usare il fumo o l’incenso?',
          a: 'Se ti piace e non hai problemi respiratori. Altrimenti bastano ordine, tocco consapevole e riporre il mazzo.',
        },
      ],
      bodyHtml: `
<p><strong>Come pulire il mazzo di tarocchi</strong> è una ricerca frequente tra chi legge da solo. Dietro al rituale c’è un bisogno concreto: chiudere energia mentale e rispettare lo strumento.</p>
<h2>Metodi semplici (scegline uno)</h2>
<ul>
  <li>Riordina il mazzo e ringrazia mentalmente la sessione.</li>
  <li>Tre respiri lenti tenendo il mazzo tra le mani.</li>
  <li>Lascia le carte nella custodia fino alla prossima lettura.</li>
  <li>Opzionale: lume soft, musica calma, breve camminata.</li>
</ul>
<p>Abbina a <a href="/blog/preparazione-prima-di-una-lettura">preparazione prima della lettura</a> e <a href="/blog/cosa-fare-dopo-una-lettura-tarocchi">cosa fare dopo</a>.</p>
${expand({
  method: 'Tratta la “pulizia” come igiene rituale della mente: un confine tra consultazione e vita quotidiana. Se salti questo passo e resti a ruminare, il problema non è il mazzo — è la chiusura.',
  example: 'Dopo una lettura sull’ex, riordini, scrivi una frase di sintesi, metti via il mazzo e spegni il telefono 20 minuti. La “pulizia” ha funzionato se riesci a fare altro senza ricontrollare le carte.',
  limits: 'Non servono spese per kit magici. Evita pratiche che danneggiano le carte (umidità eccessiva, fiamme vicine). Online, “pulire” significa chiudere la scheda e non ripetere la domanda.',
  lux: 'Su Luxseetarot, dopo tre carte gratis: salva la sintesi, chiudi e non rifare subito. È la tua versione digitale di clear-out.',
  exercise: 'Crea una mini-routine di 90 secondi post-lettura e usala per una settimana. Nota se diminuisce l’impulso a riestrarre.',
})}
${related([
  ['/blog/come-mescolare-e-scegliere-le-carte', 'Mescolare e scegliere'],
  ['/blog/diario-dei-tarocchi', 'Diario dei tarocchi'],
  ['/blog/come-scegliere-un-mazzo-di-tarocchi', 'Scegliere un mazzo'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-la-stella',
      title: 'Carta La Stella nei tarocchi: speranza e guarigione',
      description:
        'Significato della carta La Stella: fiducia, riparazione e guida gentile in amore, lavoro e percorsi personali.',
      keyword: 'significato carta la stella tarocchi',
      coverAlt: 'Carta La Stella dei tarocchi sotto una luce notturna soft',
      faq: [
        {
          q: 'La Stella promette che andrà tutto bene?',
          a: 'Indica un clima di ripresa e fiducia, non un esito garantito senza impegno.',
        },
        {
          q: 'È una carta d’amore?',
          a: 'Può esserlo: parla di guarigione e autenticità, spesso dopo una fase difficile.',
        },
        {
          q: 'Cosa chiedere se esce La Stella?',
          a: 'Dove posso tornare a fidarmi? Quale piccolo gesto nutre la speranza realistica?',
        },
      ],
      bodyHtml: `
<p><strong>La Stella</strong> è tra gli Arcani più cercati: dopo tempeste (Torre, Luna) invita a respirare, riparare e orientarsi. Il <strong>significato della carta La Stella nei tarocchi</strong> è speranza sobria, non ingenuità.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Guarigione emotiva e rinnovamento.</li>
  <li>Fiducia nel processo, passo dopo passo.</li>
  <li>Ispirazione e autenticità.</li>
  <li>Guidare senza forzare.</li>
</ul>
<p>Confronta con <a href="/blog/significato-carta-la-torre">La Torre</a> (rottura) e <a href="/blog/significato-carta-la-luna">La Luna</a> (confusione).</p>
${expand({
  method: 'Con La Stella chiediti cosa sta tornando a fluire e cosa merita ancora tempo. Non interpretarla come “risolto”: è una direzione di cura. Guarda le carte vicine per capire se la speranza è sostenuta da fatti o resta astratta.',
  example: 'Dopo una rottura, Stella + 3 di Coppe + Asso di Denari: ripresa sociale e nuova base pratica. Azione: un invito vero + un obiettivo economico piccolo, non solo fantasie di ritorno.',
  limits: 'La speranza non giustifica restare in situazioni dannose “perché prima o poi…”. Se usi La Stella per negare un addio necessario, rileggi con onestà.',
  lux: 'Domanda Luxseetarot: «Dove posso coltivare una speranza realistica e quale passo concreto la sostiene?».',
  exercise: 'Scrivi una speranza e accanto la prova minima che la renderebbe concreta entro 14 giorni. Fai quel passo.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/tarocchi-cambiamento-e-trasformazione', 'Tarocchi e cambiamento'],
  ['/blog/tarocchi-ritorno-di-fiamma', 'Ritorno di fiamma (senza illusioni)'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-il-diavolo',
      title: 'Carta Il Diavolo nei tarocchi: legami, desiderio e ombra',
      description:
        'Significato della carta Il Diavolo: attaccamento, tentazione e come liberarsi senza moralismi in una lettura.',
      keyword: 'significato carta il diavolo tarocchi',
      coverAlt: 'Carta Il Diavolo dei tarocchi in luce drammatica soft',
      faq: [
        {
          q: 'Il Diavolo è una carta “cattiva”?',
          a: 'È intensa: parla di legami e ombre. Può essere liberatoria se riconosci cosa ti tiene fermo.',
        },
        {
          q: 'Indica sempre tradimento o vizio?',
          a: 'No. Spesso indica dipendenza emotiva, controllo, piacere che costa caro o paura di perdere.',
        },
        {
          q: 'Cosa fare se esce spesso?',
          a: 'Chiediti quale schema ripeti. Porta il tema in dialogo o supporto, non solo in nuove stese.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta Il Diavolo nei tarocchi</strong> riguarda potere, desiderio e catene che a volte abbiamo collaborato a mettere. Non è un verdetto morale: è uno specchio.</p>
<h2>Temi chiave</h2>
<ul>
  <li>Attaccamento e dipendenza.</li>
  <li>Tentazione / piacere con costo.</li>
  <li>Controllo, gelosia, materialità eccessiva.</li>
  <li>Liberazione quando vedi il laccio.</li>
</ul>
<p>Utile con <a href="/blog/tarocchi-tradimento">tarocchi e tradimento</a> (senza paranoia) e <a href="/blog/tarocchi-e-ansia-usarli-bene">ansia</a>.</p>
${expand({
  method: 'Chiedi: “Cosa mi sta legando e quale parte del legame scelgo ancora?”. Distingui piacere sano, abitudine e paura. Il Diavolo diventa utile quando nomini il contratto invisibile.',
  example: 'Diavolo + 9 di Spade + Asso di Spade: ruminazione + bisogno di verità. Azione: una conversazione onesta o un confine digitale, non un’altra lettura notturna.',
  limits: 'Non usare Il Diavolo per demonizzare l’altro. In temi di dipendenze gravi, cerca aiuto professionale. Le carte non “rompono malocchi”.',
  lux: 'Domanda: «Quale legame o abitudine mi toglie libertà e quale passo posso fare per allentarlo?».',
  exercise: 'Scrivi il “patto” (es. “resto se mi scrive ogni giorno”). Poi riscrivilo in modo adulto e praticabile, o chiudilo.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/significato-carta-la-luna', 'Carta La Luna'],
  ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-lappeso',
      title: 'Carta L’Appeso nei tarocchi: pausa, resa e nuova visione',
      description:
        'Significato della carta L’Appeso: sospensione volontaria, cambio di prospettiva e quando aspettare ha senso.',
      keyword: 'significato carta l appeso tarocchi',
      coverAlt: 'Carta L’Appeso dei tarocchi in atmosfera sospesa',
      faq: [
        {
          q: 'L’Appeso significa blocco negativo?',
          a: 'Spesso indica una pausa necessaria per vedere diverso, non solo stagnazione inutile.',
        },
        {
          q: 'Devo restare fermo se esce?',
          a: 'A volte sì: smettere di forzare. Altre volte invita a un sacrificio consapevole (non a subire).',
        },
        {
          q: 'In amore cosa indica?',
          a: 'Può chiedere di sospendere pressioni, accettare un tempo sospeso o cambiare punto di vista sulla dinamica.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta L’Appeso nei tarocchi</strong> è controintuitivo: non “fai di più”, ma “guarda da un’altra angolazione”. È l’arcano della resa intelligente.</p>
<h2>Nucleo</h2>
<ul>
  <li>Sospensione e attesa attiva.</li>
  <li>Sacrificio di un controllo inutile.</li>
  <li>Nuova prospettiva dopo lo smarrimento.</li>
  <li>Tempo di incubazione prima di agire.</li>
</ul>
${expand({
  method: 'Chiediti se stai forzando un risultato. L’Appeso suggerisce di rilasciare una strategia che non funziona e osservare. Definisci “cosa non farò per 7 giorni” tanto quanto “cosa farò”.',
  example: 'In una trattativa lavorativa: Appeso + 7 di Denari + Giustizia. Messaggio: pazienza misurata + valutazione equa. Azione: non inseguire; prepara criteri e attendi dati.',
  limits: 'Non confondere resa con passività in situazioni dannose. Se sei in pericolo o sfruttamento, agisci nella realtà. L’Appeso non chiede di restare appeso per sempre.',
  lux: 'Domanda: «Cosa posso sospendere per vedere più chiaro e quale insight sto evitando?».',
  exercise: 'Scegli un’azione impulsiva da mettere in pausa 72 ore. Annota cosa cambia nella tua visione.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/quando-fare-una-lettura-dei-tarocchi', 'Quando fare una lettura'],
  ['/blog/tarocchi-e-decisioni-difficili', 'Decisioni difficili'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-il-mondo',
      title: 'Carta Il Mondo nei tarocchi: completamento e integrazione',
      description:
        'Significato della carta Il Mondo: cicli che si chiudono bene, riconoscimento e nuovo livello di percorso.',
      keyword: 'significato carta il mondo tarocchi',
      coverAlt: 'Carta Il Mondo dei tarocchi con senso di pienezza',
      faq: [
        {
          q: 'Il Mondo è sempre positivo?',
          a: 'Indica completamento e integrazione. Può anche chiedere di chiudere davvero un ciclo prima di iniziarne un altro.',
        },
        {
          q: 'È una carta di viaggio?',
          a: 'A volte sì (spostamenti, aperture), più spesso parla di totalità interiore e traguardi.',
        },
        {
          q: 'Cosa viene dopo Il Mondo?',
          a: 'Spesso un nuovo Matto: ricominciare con consapevolezza, non da zero ingenui.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta Il Mondo nei tarocchi</strong> chiude il viaggio degli Arcani Maggiori: integrazione, riconoscimento, danza completa. È “ci sei arrivata/o” — e ora puoi ricominciare meglio.</p>
<h2>Temi</h2>
<ul>
  <li>Completamento di un ciclo.</li>
  <li>Padronanza e appartenenza.</li>
  <li>Celebrazione sobria dei risultati.</li>
  <li>Apertura a un livello successivo.</li>
</ul>
<p>Collega a <a href="/blog/significato-carta-il-matto">Il Matto</a> (nuovo inizio) e <a href="/blog/arcani-maggiori-significato">tutti i Maggiori</a>.</p>
${expand({
  method: 'Chiedi cosa è davvero completo e cosa fingi di aver chiuso. Il Mondo invita a celebrare e a consolidare, non a scappare subito verso la prossima ossessione.',
  example: 'Mondo + 6 di Bastoni + 10 di Denari: riconoscimento e stabilità. Azione: documenta il risultato, ringrazia collaboratori, definisci il prossimo obiettivo senza fretta.',
  limits: 'Completamento non significa perfezione. Non restare bloccata/o a “finire tutto” per paura di ricominciare. Né interpretare Il Mondo come fine di ogni problema.',
  lux: 'Domanda: «Quale ciclo posso riconoscere come completo e come onorarlo in modo concreto?».',
  exercise: 'Scrivi un elenco “chiuso / ancora aperto”. Chiudi una cosa aperta entro una settimana con un rito semplice (mail, archivio, conversazione).',
})}
${related([
  ['/blog/tarocchi-cambiamento-e-trasformazione', 'Cambiamento e trasformazione'],
  ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Dopo la lettura'],
  ['/blog/significato-carta-il-sole', 'Carta Il Sole'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-la-giustizia',
      title: 'Carta La Giustizia nei tarocchi: verità, equilibrio e conseguenze',
      description:
        'Significato della carta La Giustizia: chiarezza, responsabilità e decisioni eque in amore, lavoro e contratti.',
      keyword: 'significato carta la giustizia tarocchi',
      coverAlt: 'Carta La Giustizia dei tarocchi con bilancia simbolica',
      faq: [
        {
          q: 'La Giustizia annuncia cause legali?',
          a: 'Può toccare temi di contratti e responsabilità, ma non è una previsione legale. Per il legale consulta un professionista.',
        },
        {
          q: 'In amore cosa significa?',
          a: 'Chiede equità, verità e bilanciamento nel dare/avere. Spesso invita a conversazioni oneste.',
        },
        {
          q: 'È una carta “fredda”?',
          a: 'È lucida. Non nega l’emozione: chiede di non farla diventare scusa per l’ingiustizia.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta La Giustizia nei tarocchi</strong> ruota attorno a verità, causa-effetto e scelte eque. È l’arcano che chiede: “Sei disposto/a a vedere i fatti?”.</p>
<h2>Nucleo</h2>
<ul>
  <li>Onestà e trasparenza.</li>
  <li>Equilibrio tra parti.</li>
  <li>Conseguenze delle azioni.</li>
  <li>Decisioni basate su criteri chiari.</li>
</ul>
${expand({
  method: 'Elenca prove e criteri prima di interpretare. La Giustizia premia la chiarezza: documenti, parole dette, impegni. Se manca equilibrio, indica dove ristabilirlo — in te o nella relazione.',
  example: 'Giustizia + 5 di Denari + Re di Spade: valutazione sobria di una situazione materiale. Azione: numeri sul tavolo e una richiesta precisa, non accuse vaghe.',
  limits: 'Non è un tribunale magico. Non usare la carta per “condannare” qualcuno senza dialogo. Temi legali = avvocato, non mazzo.',
  lux: 'Domanda: «Quale verità posso riconoscere e quale azione ripristina equilibrio?».',
  exercise: 'Scrivi la tua “sentenza” emotiva e poi riscrivila come proposta equa (io offro X, chiedo Y). Usa quella in conversazione.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/tarocchi-e-decisioni-difficili', 'Decisioni difficili'],
  ['/blog/tarocchi-lavoro-carriera', 'Tarocchi lavoro'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-as-di-coppe',
      title: 'Asso di Coppe nei tarocchi: nuovo flusso emotivo',
      description:
        'Significato Asso di Coppe: apertura del cuore, nuove emozioni e opportunità affettive da leggere con i piedi per terra.',
      keyword: 'significato asso di coppe tarocchi',
      coverAlt: 'Asso di Coppe dei tarocchi con atmosfera dolce',
      faq: [
        {
          q: 'L’Asso di Coppe annuncia una nuova relazione?',
          a: 'Può indicare un’apertura emotiva o un nuovo inizio affettivo, ma richiede accoglienza e reali incontri.',
        },
        {
          q: 'Vale solo in amore?',
          a: 'No: creatività, perdono, ispirazione, riconnessione con sé.',
        },
        {
          q: 'Cosa blocca l’Asso di Coppe?',
          a: 'Paura di sentire, cinismo, o aspettare che l’altro “riempi” la coppa al posto tuo.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato dell’Asso di Coppe nei tarocchi</strong> è l’inizio di un flusso emotivo: offerta del cuore, intuizione affettiva, creatività che nasce dal sentire.</p>
<h2>In sintesi</h2>
<ul>
  <li>Nuova opportunità emotiva o spirituale.</li>
  <li>Compassione e apertura.</li>
  <li>Ispirazione creativa.</li>
  <li>Invito ad accogliere senza inondare.</li>
</ul>
<p>Nel semi delle Coppe vedi anche <a href="/blog/i-quattro-semi-dei-tarocchi">i quattro semi</a> e confronti con <a href="/blog/significato-tre-di-spade">Tre di Spade</a> (ferita).</p>
${expand({
  method: 'Chiedi dove sta nascendo un sentimento fresco e come puoi nutrirlo senza forzarlo. L’Asso è potenziale: diventa storia con gesti piccoli e coerenti.',
  example: 'Asso di Coppe + Paggio di Bastoni + 2 di Denari: emozione nuova + impulso + bisogno di equilibrio pratico. Azione: un invito concreto e gestione del tempo, non solo chat infinite.',
  limits: 'Un Asso non garantisce reciprocità. Non interpretarlo come “è innamorato” senza fatti. Proteggi anche i tuoi confini.',
  lux: 'Domanda: «Quale nuova apertura emotiva posso accogliere e come esprimerla in modo sano?».',
  exercise: 'Fai una cosa che ti riempie la coppa senza coinvolgere l’altro (arte, natura, amico). Poi nota se l’ansia cala.',
})}
${related([
  ['/blog/significato-tarocchi-amore', 'Tarocchi in amore'],
  ['/blog/significato-carta-gli-amanti', 'Carta Gli Amanti'],
  ['/blog/arcani-minori-cosa-sono', 'Arcani Minori'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-tre-di-spade',
      title: 'Tre di Spade nei tarocchi: dolore, verità e riparazione',
      description:
        'Significato Tre di Spade: cuore ferito, chiarimenti dolorosi e come attraversare la carta senza restare bloccati.',
      keyword: 'significato tre di spade tarocchi',
      coverAlt: 'Tre di Spade dei tarocchi con atmosfera di chiarimento',
      faq: [
        {
          q: 'Il Tre di Spade annuncia una rottura?',
          a: 'Può parlare di dolore e verità tagliente. A volte è un chiarimento necessario, non sempre la fine definitiva.',
        },
        {
          q: 'È solo una carta negativa?',
          a: 'È scomoda ma onesta: porta alla luce ciò che faceva male in silenzio.',
        },
        {
          q: 'Come superare questa energia?',
          a: 'Nomina la ferita, cerca sostegno, evita ruminazioni e letture ripetute sullo stesso dolore.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato del Tre di Spade nei tarocchi</strong> è tra i più cercati: cuore trafitto, parole che feriscono, separazione o verità che fa male. Serve delicatezza — e coraggio.</p>
<h2>Cosa rappresenta</h2>
<ul>
  <li>Dolore emotivo e delusione.</li>
  <li>Comunicazione tagliente o silenzio che fa male.</li>
  <li>Necessità di elaborare una perdita.</li>
  <li>Chiarimento che libera a medio termine.</li>
</ul>
${expand({
  method: 'Con il Tre di Spade distingui: ferita attuale, storia antica riattivata, e messaggio di verità. Non accelerare il “superamento”. Chiedi quale cura concreta (parola, distanza, supporto) è possibile oggi.',
  example: '3 di Spade + Stella + 4 di Spade: dolore, poi speranza e riposo. Azione: una notte di genuino riposo + messaggio sobrio o pausa dai trigger, non stalking emotivo.',
  limits: 'Non usare questa carta per ripetro traumi senza rete. Se il dolore è intenso, parla con qualcuno di fiducia o un professionista. Evita di riestrarre finché “passa”.',
  lux: 'Domanda: «Quale verità dolorosa posso riconoscere e quale gesto mi aiuta a riparare senza autodistruggermi?».',
  exercise: 'Scrivi una lettera che non invierai: cosa è stato ferito e di cosa hai bisogno. Poi scegli un bisogno realizzabile da solo/a.',
})}
${related([
  ['/blog/significato-carta-la-torre', 'Carta La Torre'],
  ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Dopo una lettura intensa'],
  ['/blog/tarocchi-e-ansia-usarli-bene', 'Tarocchi e ansia'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-rider-waite',
      title: 'Tarocchi Rider-Waite: perché sono il mazzo più usato',
      description:
        'Tarocchi Rider-Waite spiegati: storia breve, perché sono ideali per imparare e come leggerli online.',
      keyword: 'tarocchi rider waite',
      coverAlt: 'Mazzo Rider-Waite classico su tavolo di legno',
      faq: [
        {
          q: 'Cosa sono i tarocchi Rider-Waite?',
          a: 'Un sistema illustrato del 1909 (Pamela Colman Smith / A.E. Waite) diventato standard per studio e letture moderne.',
        },
        {
          q: 'Sono adatti ai principianti?',
          a: 'Sì: i Minori raccontano scene, non solo numeri e semi, e facilitano l’apprendimento.',
        },
        {
          q: 'Luxseetarot usa questo linguaggio?',
          a: 'Il servizio si ispira al simbolismo classico delle 78 carte, leggibile anche se parti da zero.',
        },
      ],
      bodyHtml: `
<p>I <strong>tarocchi Rider-Waite</strong> (o Rider-Waite-Smith) sono il riferimento più cercato da chi impara a leggere le carte: immagini narrative, vasta letteratura e community enorme.</p>
<h2>Perché funzionano così bene</h2>
<ul>
  <li>Arcani Minori illustrati (non solo pip cards).</li>
  <li>Simboli coerenti e ripetibili nello studio.</li>
  <li>Base di moltissimi mazzi moderni “clonati” o ispirati.</li>
</ul>
<p>Per scegliere un clone fedele: <a href="/blog/come-scegliere-un-mazzo-di-tarocchi">come scegliere un mazzo</a>. Per la struttura: <a href="/blog/arcani-maggiori-significato">Maggiori</a> e <a href="/blog/arcani-minori-cosa-sono">Minori</a>.</p>
${expand({
  method: 'Studia una carta Rider-Waite osservando scena, colori, gesti e direzione degli sguardi. Poi collega alla domanda. Il sistema premia l’osservazione narrativa più della memorizzazione secca.',
  example: 'Nel 5 di Coppe noti tre coppe rovesciate e due in piedi: dolore con residuo di risorsa. In una lettura su delusione, invita a girarti verso ciò che resta.',
  limits: 'Non è l’unico sistema valido. Marsiglia e Thoth hanno profondità diverse. Evita snobismo: conta la pratica.',
  lux: 'Usa Luxseetarot per allenarti sul linguaggio classico delle 78 carte con domande reali e tre carte gratis.',
  exercise: 'Scegli 7 carte Rider-Waite questa settimana. Per ciascuna scrivi una frase in italiano semplice, senza jargon.',
})}
${related([
  ['/blog/come-leggere-i-tarocchi-da-soli', 'Leggere da soli'],
  ['/blog/i-quattro-semi-dei-tarocchi', 'I quattro semi'],
  ['/blog/come-interpretare-i-tarocchi', 'Come interpretare'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'stesa-tarocchi-amore',
      title: 'Stesa tarocchi amore: schemi semplici che funzionano',
      description:
        'Stesa tarocchi amore: 3 schemi facili (tu/altro/dinamica), domande utili e come leggere senza ossessione.',
      keyword: 'stesa tarocchi amore',
      coverAlt: 'Stesa di tarocchi a tema amore su tessuto soft',
      faq: [
        {
          q: 'Qual è la migliore stesa per l’amore?',
          a: 'Per iniziare: tu / l’altro / la dinamica. Oppure passato / presente / tendenza della relazione.',
        },
        {
          q: 'Quante carte servono?',
          a: 'Tre bastano. Schemi lunghi solo se sei calma/o e hai esperienza.',
        },
        {
          q: 'Posso farla online gratis?',
          a: 'Sì: su Luxseetarot parti da tre carte gratis con una domanda d’amore ben formulata.',
        },
      ],
      bodyHtml: `
<p>Una <strong>stesa tarocchi amore</strong> serve a mappare la relazione, non a ottenere un verdetto eterno. La qualità dipende dalla domanda più che dal numero di carte.</p>
<h2>3 schemi efficaci</h2>
<ol>
  <li><strong>Tu / Altro / Dinamica</strong> — chiaro e bilanciato.</li>
  <li><strong>Passato / Presente / Tendenza</strong> — ideale online a tre carte.</li>
  <li><strong>Blocco / Risorsa / Prossimo passo</strong> — orientato all’azione.</li>
</ol>
<p>Domande e limiti: <a href="/blog/tarocchi-amore-domande-esempi">esempi di domande</a>, <a href="/blog/significato-tarocchi-amore">significato in amore</a>, <a href="/blog/tarocchi-cosa-pensa-di-me">cosa pensa di me</a> (riformulato).</p>
${expand({
  method: 'Prima della stesa definisci se cerchi comprensione o controllo. Se è controllo, riformula. Leggi sempre la carta su di te con la stessa attenzione di quella sull’altro.',
  example: 'Tu: Papessa. Altro: Cavaliere di Bastoni. Dinamica: 2 di Spade. Sintesi: tu osservi, l’altro accelera, insieme c’è stallo. Azione: una conversazione su tempi e intenzioni, non indovinare.',
  limits: 'Non fare stese amore ogni ora. Se c’è violenza o manipolazione, priorità alla sicurezza. Le carte non sostituiscono il consenso e il dialogo.',
  lux: 'Su Luxseetarot usa tre carte gratis su uno degli schemi sopra. Approfondisci un solo nodo (es. “prossimo passo”) se serve.',
  exercise: 'Scegli uno schema e scrivi le tre posizioni su carta. Solo dopo estrai. Confronta aspettativa e risultato.',
})}
${related([
  ['/blog/lettura-tarocchi-tre-carte', 'Lettura a tre carte'],
  ['/blog/croce-celtica-tarocchi', 'Croce Celtica (avanzata)'],
  ['/blog/tarocchi-per-single', 'Tarocchi per single'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'lettura-tarocchi-online-affidabile',
      title: 'Lettura tarocchi online affidabile: come riconoscerla',
      description:
        'Come capire se una lettura tarocchi online è affidabile: segnali di qualità, red flag e cosa aspettarsi da un buon servizio.',
      keyword: 'lettura tarocchi online affidabile',
      coverAlt: 'Schermo con lettura tarocchi online e taccuino',
      faq: [
        {
          q: 'Esiste una lettura online “sempre giusta”?',
          a: 'No. Affidabile significa trasparente, utile e rispettosa dei limiti — non infallibile.',
        },
        {
          q: 'Quali sono le red flag?',
          a: 'Promesse di ritorno garantito, pressioni a pagare subito, paura indotta, “malocchio” da rimuovere a caro prezzo.',
        },
        {
          q: 'Luxseetarot è adatto per iniziare?',
          a: 'Sì: anteprima a tre carte gratis, linguaggio chiaro e possibilità di approfondire senza obbligo.',
        },
      ],
      bodyHtml: `
<p>Cercare una <strong>lettura tarocchi online affidabile</strong> è legittimo: il web è pieno di promesse eccessive. Affidabilità qui significa metodo, etica e utilità pratica — non magia certificata.</p>
<h2>Segnali di qualità</h2>
<ul>
  <li>Disclaimer chiari (niente salute/legale come oracolo).</li>
  <li>Domande aperte incoraggiate, non solo sì/no ansiosi.</li>
  <li>Possibilità di provare (es. <a href="/tarocchi-gratis.html">tarocchi gratis</a>) prima di spendere.</li>
  <li>Testo che ti restituisce agency, non dipendenza.</li>
</ul>
<h2>Red flag</h2>
<ul>
  <li>“Tornerà al 100% se paghi il rito”.</li>
  <li>Urgenza e paura per vendere upgrade.</li>
  <li>Letture che ti spingono a spiare o umiliare.</li>
</ul>
<p>Vedi anche <a href="/blog/tarocchi-online-come-scegliere">come scegliere tarocchi online</a> e <a href="/blog/cartomanzia-online">cartomanzia online</a>.</p>
${expand({
  method: 'Valuta un servizio con tre domande: mi lascia più chiaro o più spaventato? Mi propone un’azione realistica? Dichiarano i limiti? Se due risposte su tre sono no, cambia.',
  example: 'Un buon output online: “c’è distanza e bisogno di conversazione; prova X entro una settimana”. Un cattivo output: “sei bloccata da un legame oscuro, paga ora”.',
  limits: 'Anche un servizio serio può non risuonare: non è fallimento tuo. Non inseguire letture finché “qualcuno ti dice ciò che vuoi”.',
  lux: 'Inizia gratis su Luxseetarot, leggi con calma, approfondisci solo se la sintesi ti sembra utile. Confronta con i fatti della tua settimana.',
  exercise: 'Dopo una lettura online, dai un voto 1–5 a: chiarezza, rispetto, utilità pratica. Sotto 3 complessivi: non tornare su quel tema subito.',
})}
${related([
  ['/blog/tarocchi-gratis-online-come-funzionano', 'Come funzionano i tarocchi gratis'],
  ['/blog/lettura-tarocchi-a-distanza', 'Lettura a distanza'],
  ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni'],
])}
${CTA}
`.trim(),
    }),
  ];
}
