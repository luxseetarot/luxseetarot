/**
 * Quinto lotto articoli blog (SEO intent + long-tail IT).
 * Temi non sovrapposti ai cataloghi A/B/C/D. Tutti in draft.
 */

function article(partial) {
  const slug = String(partial.slug || '');
  const coverImage =
    partial.coverImage ||
    (slug ? `/images/blog/${slug}.jpg?v=3` : '');
  return {
    status: 'draft',
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

export function getSeedArticlesE() {
  return [
    article({
      slug: 'significato-carta-il-mago',
      title: 'Carta Il Mago nei tarocchi: risorse, focus e iniziativa',
      description:
        'Significato della carta Il Mago: strumenti a disposizione, concentrazione e come passare dall’idea all’azione senza illusioni.',
      keyword: 'significato carta il mago tarocchi',
      coverAlt: 'Carta Il Mago dei tarocchi con tavolo di strumenti e atmosfera intenzionale',
      faq: [
        {
          q: 'Il Mago garantisce successo?',
          a: 'Indica potenzialità e mezzi disponibili. Il risultato dipende da focus, pratica e scelte concrete.',
        },
        {
          q: 'In amore cosa significa Il Mago?',
          a: 'Può parlare di comunicazione efficace, iniziativa e capacità di creare le condizioni del rapporto.',
        },
        {
          q: 'Cosa fare se esce Il Mago?',
          a: 'Elenca risorse reali (tempo, skill, alleati) e scegli un solo gesto che le metta in gioco.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta Il Mago nei tarocchi</strong> è padronanza degli strumenti: non magia da film, ma attenzione, parola e azione allineate.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Risorse già presenti, da usare con lucidità.</li>
  <li>Concentrazione e messa a fuoco.</li>
  <li>Iniziativa che crea condizioni, non solo desiderio.</li>
  <li>Responsabilità su come comunichi e agisci.</li>
</ul>
<p>Confronta con <a href="/blog/significato-carta-il-matto">Il Matto</a> (inizio libero) e <a href="/blog/significato-carta-la-papessa">La Papessa</a> (sapere interiore in silenzio).</p>
${expand({
  method: 'Con Il Mago chiediti: quali strumenti ho già (competenze, parole, tempo, rete)? Quale distrazione spezza il focus? Traduci la carta in un piano breve: un obiettivo, un mezzo, una scadenza.',
  example: 'Mago + 2 di Bastoni + 8 di Denari: visione e mestiere. Azione: definisci un deliverable piccolo entro 72 ore invece di rimanere in “sto pensando”.',
  limits: 'Il Mago non autorizza a manipolare. Se diventa controllo sull’altro, rileggi etica e consenso. Non è garanzia di promozione o conquista.',
  lux: 'Domanda Luxseetarot: «Quale risorsa posso usare ora e quale gesto concreto la mette in gioco?».',
  exercise: 'Scrivi 4 risorse reali + 1 gesto entro 48 ore. Elimina una distrazione. Non rifare la stesa prima di aver agito.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/tarocchi-e-decisioni-difficili', 'Decisioni difficili'],
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-il-papa',
      title: 'Carta Il Papa nei tarocchi: guida, valori e appartenenza',
      description:
        'Significato della carta Il Papa (Gerofante): tradizioni utili, mentori, regole condivise e quando un consiglio esterno aiuta davvero.',
      keyword: 'significato carta il papa tarocchi',
      coverAlt: 'Carta Il Papa dei tarocchi con atmosfera di guida e rituale sobrio',
      faq: [
        {
          q: 'Il Papa è sempre una figura religiosa?',
          a: 'Simbolicamente parla di guida, etica e sistemi di valori: può essere mentore, terapia, scuola o comunità.',
        },
        {
          q: 'In amore cosa significa?',
          a: 'Può indicare impegno formale, valori in comune o bisogno di chiarezza su regole del rapporto.',
        },
        {
          q: 'Quando è un segnale di rigidità?',
          a: 'Se le “regole” soffocano il dialogo. Allora chiedi se stai rispettando un codice o soltanto la paura del giudizio.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta Il Papa nei tarocchi</strong> (Gerofante) riguarda trasmissione, etica e appartenenze: chi ti guida, cosa ritieni sacro e quali regole ti tengono in piedi.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Mentori, insegnamenti e rito condiviso.</li>
  <li>Valori e impegno formale.</li>
  <li>Bisogno di una cornice (non solo impulso).</li>
  <li>Rischio di dogmatismo se si chiude il dialogo.</li>
</ul>
<p>Confronta con <a href="/blog/significato-carta-limperatore">L’Imperatore</a> (struttura di potere) e <a href="/blog/significato-carta-leremita">L’Eremita</a> (guida interiore).</p>
${expand({
  method: 'Chiediti quale consiglio cerchi davvero e da chi. Distingui autorità sana (esperienza + rispetto) da pressione sociale. Traduci Il Papa in una domanda: «Quale regola mi sostiene e quale mi limita?».',
  example: 'Papa + 4 di Bastoni + 2 di Coppe: impegno e celebrazione condivisa. Azione: chiarisci una regola della relazione (tempi, confini, aspettative) a voce, non solo a mente.',
  limits: 'Il Papa non impone di sposarti, firmare o obbedire. Non sostituisce terapia o consulenza legale. Se senti colpa coercitiva, fermati.',
  lux: 'Domanda Luxseetarot: «Quale valore o guida posso usare ora senza rinunciare al mio giudizio?».',
  exercise: 'Scrivi 3 valori non negoziabili e 1 regola da aggiornare. Parla con una persona di fiducia o annota cosa chiederesti a un mentore.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/tarocchi-nuova-relazione', 'Nuova relazione e impegno'],
  ['/blog/preparazione-prima-di-una-lettura', 'Preparazione alla lettura'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-la-ruota-della-fortuna',
      title: 'Carta La Ruota della Fortuna: cicli, svolta e adattamento',
      description:
        'Significato della Ruota della Fortuna nei tarocchi: cambiamenti di fase, timing e come restare lucidi quando le cose si muovono.',
      keyword: 'significato ruota della fortuna tarocchi',
      coverAlt: 'Carta La Ruota della Fortuna dei tarocchi con senso di ciclo e movimento',
      faq: [
        {
          q: 'La Ruota annuncia sempre fortuna?',
          a: 'Indica movimento di ciclo: può migliorare o richiedere adattamento. Non è lotteria garantita.',
        },
        {
          q: 'Come leggerla in una decisione?',
          a: 'Osserva cosa è fuori controllo e cosa puoi ancora scegliere. Agisci sul secondo, non sul primo.',
        },
        {
          q: 'Cosa fare se esce la Ruota?',
          a: 'Riduci rigidità, aggiorna il piano e prepara un piano B realistico.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta La Ruota della Fortuna</strong> è cambiamento di fase: forze più ampie del singolo gesto, ma anche spazio per adattarsi con intelligenza.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Cicli, timing e svolte.</li>
  <li>Eventi che riordinano le priorità.</li>
  <li>Adattabilità come competenza.</li>
  <li>Umiltà su ciò che non controlli.</li>
</ul>
<p>Confronta con <a href="/blog/significato-carta-la-torre">La Torre</a> (rottura improvvisa) e <a href="/blog/tarocchi-cambiamento-e-trasformazione">tarocchi e cambiamento</a>.</p>
${expand({
  method: 'Elenca cosa sta già cambiando (fatti, non paure). Separa “fuori controllo” da “sotto il mio controllo”. La Ruota chiede flessibilità e un aggiornamento del piano, non passività.',
  example: 'Ruota + 8 di Bastoni + 5 di Denari: accelerazione con stress materiale. Azione: una priorità economica e una comunicazione chiara entro la settimana.',
  limits: 'La Ruota non predice vincite, rendez-vous o licenziamenti certi. Non giustifica “tanto va come va” se puoi ancora agire.',
  lux: 'Domanda Luxseetarot: «Quale ciclo sta cambiando e quale adattamento concreto posso fare ora?».',
  exercise: 'Scrivi: 2 fatti nuovi + 1 cosa fuori controllo + 1 azione tua entro 7 giorni. Verifica dopo, senza nuove carte.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/tarocchi-futuro-prossimo', 'Tarocchi e futuro prossimo'],
  ['/blog/quando-fare-una-lettura-dei-tarocchi', 'Quando fare una lettura'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-due-di-coppe',
      title: 'Due di Coppe nei tarocchi: incontro, reciprocità e alleanza',
      description:
        'Significato del Due di Coppe: chimica, scambio emotivo e come leggere una connessione senza idealizzarla.',
      keyword: 'significato due di coppe tarocchi',
      coverAlt: 'Due di Coppe dei tarocchi con simboli di scambio e vicinanza',
      faq: [
        {
          q: 'Il Due di Coppe è sempre amore romantico?',
          a: 'Spesso sì, ma può indicare anche alleanza, riconciliazione o collaborazione empatica.',
        },
        {
          q: 'Garantisce una relazione stabile?',
          a: 'Indica potenziale di reciprocità. La stabilità dipende da scelte, confini e continuità.',
        },
        {
          q: 'Cosa chiedere se esce?',
          a: 'Dove c’è scambio reale e dove c’è solo proiezione. Quale gesto reciproco manca.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato del Due di Coppe nei tarocchi</strong> è incontro e reciprocità: due intenzioni che si riconoscono, non necessariamente un lieto fine automatico.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Connessione e chimica emotiva.</li>
  <li>Scambio alla pari.</li>
  <li>Inizio di un’alleanza (romantica o no).</li>
  <li>Rischio di idealizzare se mancano fatti.</li>
</ul>
<p>Confronta con <a href="/blog/significato-carta-gli-amanti">Gli Amanti</a> (scelta) e <a href="/blog/significato-dieci-di-coppe">Dieci di Coppe</a> (pienezza familiare).</p>
${expand({
  method: 'Verifica reciprocità: chi inizia, chi ascolta, chi fa follow-up. Il Due di Coppe chiede un gesto concreto di scambio, non solo sentimento.',
  example: '2 Coppe + Papa + 3 Bastoni: connessione con prospettiva di impegno e attesa. Azione: una conversazione chiara su tempi e aspettative.',
  limits: 'Non legge “ti ama” con certezza. Non sostituisce un dialogo. Se c’è ossessione da lettura ripetuta, fermati.',
  lux: 'Domanda Luxseetarot: «Dove c’è reciprocità reale e quale passo posso fare per chiarirla?».',
  exercise: 'Scrivi 3 segnali di scambio osservati e 1 messaggio o gesto che proponi. Aspetta risposta nei fatti, non nelle carte.',
})}
${related([
  ['/blog/significato-tarocchi-amore', 'Tarocchi in amore'],
  ['/blog/tarocchi-nuova-relazione', 'Tarocchi e nuova relazione'],
  ['/blog/stesa-tarocchi-amore', 'Stesa amore'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-sette-di-spade',
      title: 'Sette di Spade nei tarocchi: strategia, omissioni e lucidità',
      description:
        'Significato del Sette di Spade: quando servono discrezione e quando invece c’è mancanza di trasparenza da affrontare.',
      keyword: 'significato sette di spade tarocchi',
      coverAlt: 'Sette di Spade dei tarocchi con atmosfera di cautela e strategia',
      faq: [
        {
          q: 'Il Sette di Spade è sempre tradimento?',
          a: 'No. Può essere strategia, privacy o fuga da un confronto. Contesto e carte vicine contano.',
        },
        {
          q: 'Come usarlo senza paranoia?',
          a: 'Chiedi fatti verificabili e un dialogo diretto. Evita accuse basate solo sulla carta.',
        },
        {
          q: 'Cosa fare se esce?',
          a: 'Chiarisci cosa non è detto. Proteggi i tuoi confini senza diventare investigatore.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato del Sette di Spade nei tarocchi</strong> parla di strategie sottili: a volte necessarie, a volte evasive. Serve lucidità, non sospetto automatico.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Omissioni, mezze verità, piani paralleli.</li>
  <li>Discrezione utile o fuga dal confronto.</li>
  <li>Bisogno di verificare i fatti.</li>
  <li>Invito a non auto-sabotare con raggiri.</li>
</ul>
<p>Diverso da <a href="/blog/tarocchi-tradimento">tarocchi e tradimento</a>: qui il focus è strategia e trasparenza, non solo infedeltà.</p>
${expand({
  method: 'Elenca cosa non è chiaro e come potresti verificarlo senza stalking. Distingui “ho bisogno di privacy” da “sto evitando responsabilità”.',
  example: '7 Spade + Luna + 2 Bastoni: zone grigie e scelta di direzione. Azione: una domanda diretta e un confine su ciò che non accetti più in silenzio.',
  limits: 'Non è prova legale o morale. Non giustifica controllare il telefono altrui. Se aumenta ansia, fermati e cerca supporto.',
  lux: 'Domanda Luxseetarot: «Cosa non è chiaro e quale passo lucido posso fare senza perdere rispetto?».',
  exercise: 'Scrivi 2 fatti noti, 2 ipotesi e 1 conversazione che puoi chiedere. Non aggiungere ipotesi senza fatti.',
})}
${related([
  ['/blog/tarocchi-tradimento', 'Tarocchi e tradimento'],
  ['/blog/tarocchi-e-ansia-usarli-bene', 'Tarocchi e ansia'],
  ['/blog/combinazioni-di-carte-tarocchi', 'Combinazioni di carte'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-dieci-di-spade',
      title: 'Dieci di Spade nei tarocchi: chiusura dura e ripartenza',
      description:
        'Significato del Dieci di Spade: fine di un ciclo doloroso, accettazione e come usare la carta senza catastrofismo.',
      keyword: 'significato dieci di spade tarocchi',
      coverAlt: 'Dieci di Spade dei tarocchi con senso di chiusura e alba possibile',
      faq: [
        {
          q: 'Il Dieci di Spade annuncia un disastro?',
          a: 'Spesso segna un fondo toccato o una fine già in corso. Può anche indicare mentalizzazione eccessiva del peggio.',
        },
        {
          q: 'In amore è sempre una rottura?',
          a: 'Può essere fine di un’illusione o di un pattern. Non sempre “addio definitivo” senza contesto.',
        },
        {
          q: 'Cosa fare se esce?',
          a: 'Accetta cosa è finito, riduci ruminazione e scegli un gesto di riparazione verso te.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato del Dieci di Spade nei tarocchi</strong> è picco di pressione mentale o chiusura tagliente: dopo il “basta così” può aprirsi spazio, se smetti di rivivere la scena.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Fine di un ciclo, spesso dopo stress accumulato.</li>
  <li>Pensieri che aggravano il dolore.</li>
  <li>Necessità di chiudere e riposare.</li>
  <li>Possibile alba dopo l’accettazione.</li>
</ul>
<p>Confronta con <a href="/blog/significato-tre-di-spade">Tre di Spade</a> (ferita emotiva) e <a href="/blog/significato-carta-la-morte">La Morte</a> (trasformazione).</p>
${expand({
  method: 'Chiediti cosa è già finito nei fatti e cosa stai ancora “tenendo in vita” mentalmente. Il Dieci di Spade chiede riposo e chiusura, non nuove strategie aggressive.',
  example: '10 Spade + Stella + 4 Spade: dolore, speranza e recupero. Azione: una notte di riposo reale + un messaggio o rituale di chiusura sobrio.',
  limits: 'Non predice malattie o tragedie. Se sei in crisi, cerca aiuto umano. Non usare la carta per punirti.',
  lux: 'Domanda Luxseetarot: «Cosa posso chiudere con dignità e quale cura mi serve ora?».',
  exercise: 'Scrivi “è finito” su una riga concreta. Poi un gesto di cura (sonno, passeggiata, chiamata a qualcuno di fiducia).',
})}
${related([
  ['/blog/tarocchi-separazione', 'Tarocchi e separazione'],
  ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Cosa fare dopo una lettura'],
  ['/blog/tarocchi-e-ansia-usarli-bene', 'Tarocchi e ansia'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-cinque-di-denari',
      title: 'Cinque di Denari nei tarocchi: scarsità, sostegno e ripresa',
      description:
        'Significato del Cinque di Denari: sensi di esclusione o precarietà e come leggere risorse concrete senza panico.',
      keyword: 'significato cinque di denari tarocchi',
      coverAlt: 'Cinque di Denari dei tarocchi con atmosfera di freddo e possibile rifugio',
      faq: [
        {
          q: 'Indica sempre problemi di soldi?',
          a: 'Spesso tocca risorse materiali o senso di esclusione. Può anche essere scarsità emotiva o di supporto.',
        },
        {
          q: 'C’è una via d’uscita nella carta?',
          a: 'Simbolicamente sì: chiedere aiuto, vedere porte vicine, ripristinare una rete.',
        },
        {
          q: 'Cosa fare se esce?',
          a: 'Elenca bisogni concreti e una richiesta di sostegno realistica. Evita isolamento.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato del Cinque di Denari nei tarocchi</strong> parla di freddo percepito: soldi, salute pratica, appartenenza. Spesso la porta del sostegno è più vicina di quanto sembri.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Precarietà o paura di non farcela.</li>
  <li>Senso di esclusione.</li>
  <li>Bisogno di aiuto concreto.</li>
  <li>Invito a non restare fuori “per orgoglio”.</li>
</ul>
<p>Collega a <a href="/blog/tarocchi-soldi-e-risorse">tarocchi, soldi e risorse</a> e <a href="/blog/significato-as-di-denari">Asso di Denari</a>.</p>
${expand({
  method: 'Traduci la carta in bisogni: denaro, tempo, salute organizzativa, rete. Poi una richiesta specifica a una persona o servizio. Distingui paura da bilancio reale.',
  example: '5 Denari + Stella + 6 Coppe: difficoltà con possibilità di supporto familiare/amico. Azione: una chiamata + un piano minimo di spese per 7 giorni.',
  limits: 'Non è consulenza finanziaria o medica. Non predice rovine. Se sei in emergenza, rivolgiti a canali concreti di aiuto.',
  lux: 'Domanda Luxseetarot: «Quale sostegno concreto posso attivare e quale passo riduce la pressione ora?».',
  exercise: 'Scrivi 3 bisogni e accanto 1 risorsa/persona. Invia una richiesta chiara oggi.',
})}
${related([
  ['/blog/tarocchi-soldi-e-risorse', 'Soldi e risorse'],
  ['/blog/i-quattro-semi-dei-tarocchi', 'I quattro semi'],
  ['/blog/tarocchi-lavoro-carriera', 'Tarocchi e lavoro'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-regina-di-coppe',
      title: 'Regina di Coppe nei tarocchi: empatia, cura e confini emotivi',
      description:
        'Significato della Regina di Coppe: ascolto profondo, intuizione affettiva e come non perderti nel sentire altrui.',
      keyword: 'significato regina di coppe tarocchi',
      coverAlt: 'Regina di Coppe dei tarocchi con calice e atmosfera empatica',
      faq: [
        {
          q: 'La Regina di Coppe è sempre una donna?',
          a: 'È un’energia: cura, empatia, sensibilità. Può essere tu, l’altro o un clima relazionale.',
        },
        {
          q: 'Qual è il rischio?',
          a: 'Assorbire troppo. Serve empatia con confine, non fusione.',
        },
        {
          q: 'Cosa fare se esce?',
          a: 'Ascolta senza intervenire subito. Poi scegli un confine gentile se ti senti invaso.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della Regina di Coppe nei tarocchi</strong> è maestria emotiva: sentire a fondo senza annegare, offrire presenza senza perdere sé.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Empatia e intuizione affettiva.</li>
  <li>Cura, ascolto, contenimento.</li>
  <li>Creatività emotiva.</li>
  <li>Bisogno di confini per non esaurirsi.</li>
</ul>
<p>Collega a <a href="/blog/corti-dei-tarocchi-guida">corti dei tarocchi</a> e <a href="/blog/tarocchi-confini-personali">confini personali</a>.</p>
${expand({
  method: 'Chiediti se stai ascoltando o assorbendo. La Regina invita a nominare emozioni e a scegliere un confine soft: tempo, energia, disponibilità.',
  example: 'Regina Coppe + Luna + 4 Spade: grande sensibilità + bisogno di riposo. Azione: un no gentile e uno spazio di recupero senza giustificarti troppo.',
  limits: 'Non è diagnosi psicologica. Non ti obbliga a “salvare” nessuno. Se sei in burnout emotivo, cerca supporto adeguato.',
  lux: 'Domanda Luxseetarot: «Come posso ascoltare senza perdermi e quale confine mi protegge?».',
  exercise: 'Scrivi cosa senti in 5 parole + un confine (orario, tema, energia) da rispettare oggi.',
})}
${related([
  ['/blog/significato-as-di-coppe', 'Asso di Coppe'],
  ['/blog/tarocchi-e-intuito', 'Tarocchi e intuito'],
  ['/blog/diario-dei-tarocchi', 'Diario dei tarocchi'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'stesa-tarocchi-lavoro',
      title: 'Stesa tarocchi lavoro: schemi semplici per scelte chiare',
      description:
        'Come fare una stesa tarocchi sul lavoro: posizioni utili, domande efficaci ed esempi per carriera e decisioni professionali.',
      keyword: 'stesa tarocchi lavoro',
      coverAlt: 'Stesa di carte dei tarocchi su scrivania con taccuino di lavoro',
      faq: [
        {
          q: 'Quante carte servono per il lavoro?',
          a: 'Tre bastano per una mappa chiara. Cinque se vuoi risorse e rischi separati.',
        },
        {
          q: 'Posso chiedere se verrò assunto?',
          a: 'Meglio: «Cosa posso rafforzare nel processo?» o «Quale approccio mi serve ora?».',
        },
        {
          q: 'Quanto spesso rifare la stesa?',
          a: 'Dopo fatti nuovi (colloquio, feedback), non ogni sera per ansia.',
        },
      ],
      bodyHtml: `
<p>Una <strong>stesa tarocchi lavoro</strong> serve a ordinare decisioni professionali: ruolo, relazioni, energie e prossimi passi — non a predire lo stipendio.</p>
<h2>Schema a 3 carte (consigliato)</h2>
<ol>
  <li>Situazione attuale / clima.</li>
  <li>Sfida o punto cieco.</li>
  <li>Approccio utile / prossimo passo.</li>
</ol>
<h2>Schema a 5 carte</h2>
<ol>
  <li>Io nel ruolo.</li>
  <li>Contesto (team/azienda).</li>
  <li>Opportunità.</li>
  <li>Rischio.</li>
  <li>Azione concreta.</li>
</ol>
${expand({
  method: 'Scrivi la decisione in una riga. Usa posizioni fisse e non “pescare fino a piacere”. Traduci ogni carta in comportamento osservabile al lavoro.',
  example: '3 carte: 8 Denari / 5 Spade / Carro → mestiere + conflitto / competitività + bisogno di direzione. Azione: un deliverable chiaro e un confronto professionale senza litigare.',
  limits: 'Non sostituisce contratti, HR o consulenza legale. Non inventare date di assunzione.',
  lux: 'Su Luxseetarot prova: «Quale approccio professionale mi serve questa settimana?».',
  exercise: 'Fai la stesa a 3, scrivi una frase per carta e un task da calendario entro 48 ore.',
})}
${related([
  ['/blog/tarocchi-lavoro-carriera', 'Tarocchi e carriera'],
  ['/blog/tarocchi-offerta-di-lavoro', 'Tarocchi e offerta di lavoro'],
  ['/blog/come-fare-stesa-cinque-carte', 'Stesa a cinque carte'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-offerta-di-lavoro',
      title: 'Tarocchi e offerta di lavoro: come leggere senza ansia',
      description:
        'Come usare i tarocchi su un’offerta di lavoro: criteri, domande utili e limiti (niente previsioni di contratto certe).',
      keyword: 'tarocchi offerta di lavoro',
      coverAlt: 'Carte dei tarocchi accanto a una lettera di offerta e una penna',
      faq: [
        {
          q: 'I tarocchi mi dicono se accettare?',
          a: 'Ti aiutano a chiarire valori, rischi e fit. La decisione resta tua, con fatti e numeri.',
        },
        {
          q: 'Quale domanda funziona meglio?',
          a: '«Cosa mi serve valutare in questa offerta?» o «Quale impatto avrebbe su energia e crescita?».',
        },
        {
          q: 'Posso confrontare due offerte?',
          a: 'Sì, con stese gemelle e criteri scritti prima (soldi, crescita, clima, tempi).',
        },
      ],
      bodyHtml: `
<p>Usare i <strong>tarocchi su un’offerta di lavoro</strong> ha senso se li tratti come mappa di criteri, non come oracolo HR.</p>
<h2>Prima delle carte: criteri</h2>
<ul>
  <li>Compenso e stabilità.</li>
  <li>Apprendimento e crescita.</li>
  <li>Clima e confini.</li>
  <li>Impatto su vita personale.</li>
</ul>
${expand({
  method: 'Scrivi i criteri in ordine. Poi una stesa: fit / rischio nascosto / mio prossimo passo negoziale. Confronta sempre con RAL, contratto e sensazioni post-colloquio.',
  example: 'Giustizia + 5 Denari + Mago: negoziazione e attenzione ai gap materiali + agency. Azione: lista domande al recruiter e una controproposta basata su dati.',
  limits: 'Niente certezza su “ti assumono”. Non firmare solo perché “le carte dicono sì”.',
  lux: 'Domanda Luxseetarot: «Cosa devo chiarire prima di decidere su questa offerta?».',
  exercise: 'Tabella pro/contro a 6 righe + 1 informazione mancante da chiedere entro 48 ore.',
})}
${related([
  ['/blog/stesa-tarocchi-lavoro', 'Stesa lavoro'],
  ['/blog/tarocchi-cambiamento-di-lavoro', 'Cambiamento di lavoro'],
  ['/blog/tarocchi-e-decisioni-difficili', 'Decisioni difficili'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-comunicazione-di-coppia',
      title: 'Tarocchi e comunicazione di coppia: chiarire senza accusare',
      description:
        'Come usare i tarocchi per migliorare la comunicazione di coppia: domande utili, stese e limiti rispetto al dialogo reale.',
      keyword: 'tarocchi comunicazione di coppia',
      coverAlt: 'Due tazze e carte dei tarocchi su un tavolo per un dialogo di coppia',
      faq: [
        {
          q: 'Posso chiedere cosa pensa il partner?',
          a: 'Meglio: «Come posso comunicare questo bisogno?» o «Quale tono serve ora?».',
        },
        {
          q: 'Serve fare la stesa in due?',
          a: 'Utile se c’è consenso. Altrimenti lavoraci tu e porta un messaggio chiaro, non una sentenza.',
        },
        {
          q: 'Quando non usarle?',
          a: 'In piena lite, o se cerchi “prove” contro l’altro. Prima calma, poi carte.',
        },
      ],
      bodyHtml: `
<p>I <strong>tarocchi e la comunicazione di coppia</strong> funzionano se ti aiutano a preparare un messaggio onesto, non a vincere una discussione.</p>
<h2>Domande che funzionano</h2>
<ul>
  <li>«Cosa non sto dicendo in modo chiaro?»</li>
  <li>«Quale ascolto mi serve prima di rispondere?»</li>
  <li>«Quale confine posso nominare senza attacco?»</li>
</ul>
${expand({
  method: 'Stesa a 3: mio bisogno / suo possibile mondo (ipotesi) / modo di dirlo. Poi parla a voce. Le carte non sostituiscono “ti ascolto”.',
  example: 'Papessa + 5 Coppe + Temperanza: ascolto + dolore non detto + tono calibrato. Azione: un “io” statement e una pausa di 10 minuti se sale il volume.',
  limits: 'Niente lettura della mente. In casi di abuso o controllo, cerca aiuto specializzato, non solo carte.',
  lux: 'Domanda Luxseetarot: «Come posso comunicare il mio bisogno con chiarezza e rispetto?».',
  exercise: 'Scrivi il messaggio in 4 frasi (fatto, emozione, bisogno, richiesta). Provalo ad alta voce.',
})}
${related([
  ['/blog/tarocchi-confini-personali', 'Confini personali'],
  ['/blog/stesa-tarocchi-amore', 'Stesa amore'],
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Domande ai tarocchi'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-perdono',
      title: 'Tarocchi e perdono: quando è pronto e quando è prematuro',
      description:
        'Come leggere i tarocchi sul perdono: processi interiori, confini e differenza tra liberarsi e riconciliare.',
      keyword: 'tarocchi perdono',
      coverAlt: 'Carte dei tarocchi e una candela per un rituale di chiusura e perdono',
      faq: [
        {
          q: 'Perdono significa tornare insieme?',
          a: 'No. Puoi perdonare per te e scegliere comunque distanza.',
        },
        {
          q: 'Quale domanda usare?',
          a: '«Cosa posso rilasciare ora?» o «Quale passo di guarigione è realistico?».',
        },
        {
          q: 'Se le carte spingono a perdonare subito?',
          a: 'Verifica se è pressione o maturità. Il timing emotivo conta più della fretta.',
        },
      ],
      bodyHtml: `
<p>Usare i <strong>tarocchi sul perdono</strong> ha senso per mappare un processo interiore: rabbia, dolore, confini e possibile apertura — senza obblighi morali.</p>
<h2>Distingui tre piani</h2>
<ul>
  <li>Perdono verso di te (colpa, rimpianto).</li>
  <li>Perdono verso l’altro (rilascio della storia).</li>
  <li>Riconciliazione (rapporto ripreso): opzionale e bilaterale.</li>
</ul>
${expand({
  method: 'Stesa: ferita ancora attiva / cosa posso rilasciare / confine che resta. Se esce pressione a “fare pace subito”, chiediti se è sicuro e reciproco.',
  example: '3 Spade + Giustizia + Stella: dolore + verità + speranza lenta. Azione: scrittura di una lettera non inviata + un confine concreto.',
  limits: 'Il perdono non è dovuto. Non usare le carte per colpevolizzarti. In traumi, preferisci supporto professionale.',
  lux: 'Domanda Luxseetarot: «Quale passo di liberazione posso fare senza tradire i miei confini?».',
  exercise: 'Scrivi: “Perdono / non ancora / mai per questo punto”. Una riga ciascuno. Un gesto di cura.',
})}
${related([
  ['/blog/tarocchi-riconciliazione', 'Riconciliazione'],
  ['/blog/tarocchi-separazione', 'Separazione'],
  ['/blog/significato-carta-la-stella', 'La Stella'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-confini-personali',
      title: 'Tarocchi e confini personali: dire di no senza colpa',
      description:
        'Come usare i tarocchi per chiarire confini personali in amore, lavoro e amicizia: segnali, domande e azioni concrete.',
      keyword: 'tarocchi confini personali',
      coverAlt: 'Carte dei tarocchi e una linea sottilmente tracciata su un taccuino',
      faq: [
        {
          q: 'Quali carte parlano di confini?',
          a: 'Spesso Imperatore, Forza, Spade, Denari. Conta più la domanda e il contesto.',
        },
        {
          q: 'Posso usare i tarocchi se mi sento in colpa a dire no?',
          a: 'Sì: chiedi quale no è sano e come comunicarlo senza aggressività.',
        },
        {
          q: 'Confini = chiusura?',
          a: 'No: sono condizioni per restare in relazione con rispetto.',
        },
      ],
      bodyHtml: `
<p>I <strong>tarocchi e i confini personali</strong> aiutano a vedere dove dici sì per paura e dove un no proteggerebbe energia e rispetto.</p>
<h2>Segnali tipici da esplorare</h2>
<ul>
  <li>Senso di invasione o stanchezza dopo certi contatti.</li>
  <li>Accordi non detti che poi esplodono.</li>
  <li>Difficoltà a nominare bisogni.</li>
</ul>
${expand({
  method: 'Domanda: «Dove mi serve un confine chiaro?» Stesa: situazione / costo del sì automatico / modo di dire no. Poi pratica la frase ad alta voce.',
  example: 'Forza + 7 Spade + 4 Bastoni: soft power + omissione + bisogno di stabilità. Azione: un no chiaro su un tema specifico e una proposta alternativa sana.',
  limits: 'I confini non giustificano violenza o controllo. Se temi per la sicurezza, cerca aiuto esterno.',
  lux: 'Domanda Luxseetarot: «Quale confine posso mettere ora con rispetto verso me e verso l’altro?».',
  exercise: 'Scrivi un no in una frase. Un sì condizionato. Usane uno entro 48 ore.',
})}
${related([
  ['/blog/tarocchi-comunicazione-di-coppia', 'Comunicazione di coppia'],
  ['/blog/significato-carta-la-forza', 'La Forza'],
  ['/blog/significato-carta-limperatore', 'L’Imperatore'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'come-fare-stesa-cinque-carte',
      title: 'Come fare una stesa a cinque carte: guida pratica',
      description:
        'Guida alla stesa a cinque carte nei tarocchi: posizioni chiare, esempi e come interpretare senza confusione.',
      keyword: 'stesa cinque carte tarocchi',
      coverAlt: 'Cinque carte dei tarocchi disposte in fila su un panno scuro',
      faq: [
        {
          q: 'Quando usare 5 carte invece di 3?',
          a: 'Quando vuoi separare risorse, rischi e consiglio senza appesantire troppo.',
        },
        {
          q: 'Devo usare sempre lo stesso schema?',
          a: 'Meglio sì, finché non lo padroneggi. Poi puoi variare con cognizione.',
        },
        {
          q: 'Serve mischiare a lungo?',
          a: 'Bastano calma e intenzione. Meglio una domanda chiara che un rito infinito.',
        },
      ],
      bodyHtml: `
<p><strong>Come fare una stesa a cinque carte</strong>: posizioni fisse, una domanda, lettura d’insieme prima dei dettagli.</p>
<h2>Schema versatile</h2>
<ol>
  <li>Contesto / presente.</li>
  <li>Sfida.</li>
  <li>Risorsa nascosta.</li>
  <li>Consiglio operativo.</li>
  <li>Prossimo passo / esito tendenziale (non garanzia).</li>
</ol>
${expand({
  method: 'Scrivi la domanda. Assegna posizioni. Leggi la storia da 1 a 5, poi le ripetizioni di semi. Una sola frase-sintesi finale.',
  example: 'Luna / 7 Spade / Papessa / Temperanza / Asso Denari: confusione / omissione / ascolto / calibrazione / seme concreto. Azione: chiarire un dubbio con fatti + un passo materiale piccolo.',
  limits: 'Cinque carte non aumentano la certezza predittiva. Non aggiungere carte “per chiarire” all’infinito.',
  lux: 'Su Luxseetarot parti da tre carte; se serve, approfondisci con una domanda sul consiglio operativo.',
  exercise: 'Fai una stesa a 5 su un tema leggero. Scrivi 5 frasi + 1 azione. Rileggi dopo 3 giorni.',
})}
${related([
  ['/blog/lettura-tarocchi-tre-carte', 'Lettura a tre carte'],
  ['/blog/croce-celtica-tarocchi', 'Croce Celtica'],
  ['/blog/come-mescolare-e-scegliere-le-carte', 'Mischiare e scegliere'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'corti-dei-tarocchi-guida',
      title: 'Corti dei tarocchi: Paggi, Cavalieri, Regine e Re',
      description:
        'Guida alle figure di corte nei tarocchi: come leggerle come persone, parti di te o stili energetici senza confusione.',
      keyword: 'corti dei tarocchi significato',
      coverAlt: 'Carte di corte dei tarocchi disposte con semi diversi',
      faq: [
        {
          q: 'Le corti sono sempre persone?',
          a: 'Possono essere persone, ruoli o aspetti di te. Contesto e domanda decidono.',
        },
        {
          q: 'Paggio e Cavaliere che differenza hanno?',
          a: 'Paggio: messaggio/inizio. Cavaliere: movimento e missione in corso.',
        },
        {
          q: 'Come non confondersi?',
          a: 'Fissa prima se stai chiedendo “chi” o “come”. Annota età simbolica e semi.',
        },
      ],
      bodyHtml: `
<p>Le <strong>corti dei tarocchi</strong> (Paggi, Cavalieri, Regine, Re) raccontano stili di azione ed emozioni mature o in erba — non solo “un uomo/una donna”.</p>
<h2>Mappa rapida</h2>
<ul>
  <li><strong>Paggi</strong>: curiosità, messaggi, apprendimento.</li>
  <li><strong>Cavalieri</strong>: impulso, viaggio, missione.</li>
  <li><strong>Regine</strong>: padronanza interiore del seme.</li>
  <li><strong>Re</strong>: responsabilità esterna e direzione.</li>
</ul>
${expand({
  method: 'Chiedi: è una persona, un’energia mia, o un clima? Guarda il seme (Bastoni fuoco, Coppe emozione, Spade mente, Denari concreto). Evita di “indovinare chi è”.',
  example: 'Cavaliere di Spade + Regina di Coppe: urgenza mentale vs cura empatica. Azione: rallenta il messaggio, senti prima, poi parla.',
  limits: 'Non usare le corti per stalking identitario. Età e genere sulle carte sono simbolici.',
  lux: 'Domanda Luxseetarot: «Quale stile (energia di corte) mi serve ora in questa situazione?».',
  exercise: 'Scegli un tema. Pesca una sola corte (o visualizzane una). Scrivi comportamento tipico + un gesto allineato.',
})}
${related([
  ['/blog/arcani-minori-cosa-sono', 'Arcani Minori'],
  ['/blog/i-quattro-semi-dei-tarocchi', 'I quattro semi'],
  ['/blog/significato-regina-di-coppe', 'Regina di Coppe'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'numeri-arcani-minori',
      title: 'Numeri negli Arcani Minori: da Asso a Dieci',
      description:
        'Come leggere i numeri degli Arcani Minori nei tarocchi: progressione da 1 a 10 e metodo pratico per semi e stese.',
      keyword: 'numeri arcani minori tarocchi',
      coverAlt: 'Sequenza numerica di Arcani Minori dei tarocchi su un tavolo',
      faq: [
        {
          q: 'I numeri sono uguali in tutti i semi?',
          a: 'La progressione è simile, ma il seme cambia il “territorio” (azione, emozione, mente, materia).',
        },
        {
          q: 'Cosa indica il 5 in generale?',
          a: 'Spesso conflitto, perdita o aggiustamento. Va letto col seme e col contesto.',
        },
        {
          q: 'Serve memorizzare tutto?',
          a: 'Meglio capire la storia 1→10 e poi arricchire con pratica e diario.',
        },
      ],
      bodyHtml: `
<p>Capire i <strong>numeri negli Arcani Minori</strong> accelera la lettura: ogni cifra è una fase del ciclo, colorata dal seme.</p>
<h2>Progressione utile</h2>
<ul>
  <li><strong>Asso</strong>: seme puro, inizio.</li>
  <li><strong>2–3</strong>: relazione e crescita iniziale.</li>
  <li><strong>4</strong>: stabilità o stallo.</li>
  <li><strong>5</strong>: attrito / perdita / prova.</li>
  <li><strong>6</strong>: passaggio, scambio, sollievo.</li>
  <li><strong>7</strong>: sfida, valutazione, strategia.</li>
  <li><strong>8</strong>: maestria, movimento, impegno.</li>
  <li><strong>9</strong>: culminazione quasi completa.</li>
  <li><strong>10</strong>: completamento / eccesso del tema.</li>
</ul>
${expand({
  method: 'In una stesa, nota se i numeri salgono, scendono o si ripetono. Un cluster di 5–7 segnala tensione da gestire; Assi e 10 chiusure/inizi.',
  example: '3 Coppe + 5 Spade + 8 Denari: socialità + conflitto verbale + lavoro concreto. Azione: proteggi il mestiere, chiarisci il litigio senza farne un’identità.',
  limits: 'I numeri non sono formule magiche. Non forzare ogni carta in uno schema rigido.',
  lux: 'Domanda Luxseetarot: «In che fase del ciclo mi trovo e quale passo completa o riapre?».',
  exercise: 'Prendi un seme e scrivi in 10 righe la storia da Asso a Dieci con parole tue.',
})}
${related([
  ['/blog/arcani-minori-cosa-sono', 'Cosa sono gli Arcani Minori'],
  ['/blog/i-quattro-semi-dei-tarocchi', 'I quattro semi'],
  ['/blog/combinazioni-di-carte-tarocchi', 'Combinazioni'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'etica-lettura-tarocchi',
      title: 'Etica nella lettura dei tarocchi: regole pratiche',
      description:
        'Etica della lettura tarocchi: consenso, temi delicati, limiti e come leggere per altri (o online) in modo responsabile.',
      keyword: 'etica lettura tarocchi',
      coverAlt: 'Carte dei tarocchi e un taccuino con appunti su rispetto e limiti',
      faq: [
        {
          q: 'Posso leggere su terzi senza consenso?',
          a: 'Meglio di no. Lavora sul tuo ruolo e sulle tue scelte, non sulla vita privata altrui.',
        },
        {
          q: 'Quali temi evitare?',
          a: 'Salute grave, morte altrui, “chi mi tradisce” come caccia. Rinvia a professionisti quando serve.',
        },
        {
          q: 'Online cambia qualcosa?',
          a: 'Stessi principi: chiarezza su limiti, niente garanzie, privacy dei dati.',
        },
      ],
      bodyHtml: `
<p>L’<strong>etica nella lettura dei tarocchi</strong> protegge te e chi ascolta: consenso, linguaggio responsabile e rifiuto di fingere certezza.</p>
<h2>Principi utili</h2>
<ul>
  <li>Consenso e privacy.</li>
  <li>Niente diagnosi mediche/legali.</li>
  <li>Linguaggio di possibilità, non di sentenza.</li>
  <li>Stop se aumenta dipendenza o paura.</li>
</ul>
${expand({
  method: 'Prima di leggere: accordo su tema e limiti. Durante: fatti + ipotesi. Dopo: una sola azione concreta, non dieci profezie.',
  example: 'Qualcuno chiede “mi tradisce?”. Riformula: «Come posso tutelare i miei confini e chiedere chiarezza?». Più etico e più utile.',
  limits: 'Etica non è moralismo: è rispetto. Se non sai, dillo. Se il tema supera le carte, rinvia.',
  lux: 'Su Luxseetarot le letture restano uno strumento di riflessione personale, non un verdetto sugli altri.',
  exercise: 'Scrivi il tuo “codice” in 5 punti (cosa non leggi, come parli, quando ti fermi). Tienilo vicino al mazzo.',
})}
${related([
  ['/blog/lettura-tarocchi-online-affidabile', 'Lettura online affidabile'],
  ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni'],
  ['/blog/tarocchi-online-come-scegliere', 'Come scegliere un servizio'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-cambiamento-di-lavoro',
      title: 'Tarocchi e cambiamento di lavoro: timing e chiarezza',
      description:
        'Come usare i tarocchi per un cambio lavoro: motivazioni, rischi, preparazione e domande che evitano decisioni impulsive.',
      keyword: 'tarocchi cambiamento di lavoro',
      coverAlt: 'Carte dei tarocchi accanto a una valigetta e un taccuino di obiettivi',
      faq: [
        {
          q: 'Mi dicono quando dimettermi?',
          a: 'No date certe. Aiutano a vedere readiness, rischi e passi di preparazione.',
        },
        {
          q: 'Quale domanda è migliore?',
          a: '«Cosa mi serve mettere in ordine prima di cambiare?» o «Quale motivazione è solida e quale è fuga?».',
        },
        {
          q: 'E se ho paura ma restare fa male?',
          a: 'Separa paura sana da allarme. Usa criteri scritti e un piano B economico.',
        },
      ],
      bodyHtml: `
<p>I <strong>tarocchi e il cambiamento di lavoro</strong> servono a distinguere crescita da fuga, e preparazione da impulso.</p>
<h2>Checklist prima della stesa</h2>
<ul>
  <li>Perché vuoi cambiare (3 motivi).</li>
  <li>Risorse (runway, skill, rete).</li>
  <li>Cosa resta irrisolto nel ruolo attuale.</li>
</ul>
${expand({
  method: 'Stesa: motivazione vera / rischio se parto ora / passo di preparazione. Confronta con numeri (risparmi, mercato) e feedback reali.',
  example: 'Carro + 5 Denari + 8 Bastoni: spinta forte + pressione materiale + accelerazione. Azione: non dimettersi a caldo; aggiorna CV e 3 colloqui esplorativi.',
  limits: 'Niente date di assunzione. Non sostituisce consulenza legale su contratti/dimissioni.',
  lux: 'Domanda Luxseetarot: «Cosa posso preparare ora per un eventuale cambio con più solidità?».',
  exercise: 'Scrivi piano a 30 giorni (skill, networking, budget). Una sola azione oggi.',
})}
${related([
  ['/blog/tarocchi-offerta-di-lavoro', 'Offerta di lavoro'],
  ['/blog/stesa-tarocchi-lavoro', 'Stesa lavoro'],
  ['/blog/tarocchi-lavoro-carriera', 'Lavoro e carriera'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-nuova-relazione',
      title: 'Tarocchi e nuova relazione: leggere l’inizio con i piedi per terra',
      description:
        'Come usare i tarocchi all’inizio di una relazione: chimica, ritmi, confini e domande che evitano proiezioni.',
      keyword: 'tarocchi nuova relazione',
      coverAlt: 'Carte dei tarocchi e due tazze per l’inizio di una relazione',
      faq: [
        {
          q: 'Posso chiedere se sarà per sempre?',
          a: 'Meglio chiedere come costruire fiducia e chiarezza nei prossimi passi.',
        },
        {
          q: 'Quali carte aiutano?',
          a: 'Due di Coppe, Assi, Amanti, ma conta il insieme e i fatti del corteggiamento.',
        },
        {
          q: 'Quanto spesso consultare?',
          a: 'Dopo eventi nuovi, non ogni messaggio. Lascia spazio all’esperienza.',
        },
      ],
      bodyHtml: `
<p>I <strong>tarocchi in una nuova relazione</strong> aiutano a vedere ritmo, reciprocità e proiezioni — non a scrivere il finale in anticipo.</p>
<h2>Domande utili all’inizio</h2>
<ul>
  <li>«Cosa sto portando io in questo incontro?»</li>
  <li>«Dove c’è reciprocità osservabile?»</li>
  <li>«Quale passo lento costruisce fiducia?»</li>
</ul>
${expand({
  method: 'Stesa: mia energia / dinamica / consiglio di ritmo. Confronta ogni carta con messaggi, disponibilità e coerenza. Se idealizzi, rallenta.',
  example: '2 Coppe + Cavaliere Bastoni + Temperanza: chimica + impulso + bisogno di calibrare. Azione: un appuntamento presente, senza accelerare etichette.',
  limits: 'Niente “è l’anima gemella”. Non invadere la privacy altrui con stese su di lui/lei senza consenso.',
  lux: 'Domanda Luxseetarot: «Come posso stare in questa nuova relazione con presenza e realismo?».',
  exercise: 'Elenca 3 fatti positivi e 3 punti da chiarire. Un solo chiarimento gentile, non un interrogatorio.',
})}
${related([
  ['/blog/significato-due-di-coppe', 'Due di Coppe'],
  ['/blog/tarocchi-per-single', 'Tarocchi per single'],
  ['/blog/tarocchi-comunicazione-di-coppia', 'Comunicazione di coppia'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'lettura-tarocchi-mensile',
      title: 'Lettura tarocchi mensile: come farla (e cosa aspettarti)',
      description:
        'Come strutturare una lettura dei tarocchi mensile: temi, posizioni, diario e uso consapevole senza previsioni rigide.',
      keyword: 'lettura tarocchi mensile',
      coverAlt: 'Calendario e carte dei tarocchi per una lettura mensile consapevole',
      faq: [
        {
          q: 'Quante carte per un mese?',
          a: 'Da 3 a 6 bastano. Evita stese enormi che poi non rivedi.',
        },
        {
          q: 'Devo farla il primo del mese?',
          a: 'Scegli un giorno fisso. La costanza batte la data magica.',
        },
        {
          q: 'Cosa fare a fine mese?',
          a: 'Rileggi appunti e confronta fatti. Impari più che ripetendo carte.',
        },
      ],
      bodyHtml: `
<p>Una <strong>lettura tarocchi mensile</strong> è un check-in: temi energetici, focus e piccoli impegni — non un oroscopo giorno per giorno.</p>
<h2>Schema mensile semplice</h2>
<ol>
  <li>Tema del mese.</li>
  <li>Sfida ricorrente.</li>
  <li>Risorsa da coltivare.</li>
  <li>Consiglio settimanale (opzionale: 4 carte piccole).</li>
  <li>Atteggiamento da tenere.</li>
</ol>
${expand({
  method: 'Fissa data e domanda (“Cosa mi aiuta a vivere questo mese con più chiarezza?”). Annota. A metà mese rileggi senza ripescare. A fine mese fai bilancio.',
  example: 'Ruota + 8 Denari + Stella: cambiamenti + lavoro + speranza pratica. Azione: un’abitudine settimanale misurabile (portfolio, allenamento, dialogo).',
  limits: 'Non micro-gestire ogni giorno con carte. Se aumenta ansia, passa a check-in quindicinale o sospendi.',
  lux: 'Puoi usare Luxseetarot per il tema del mese, poi lavorare tu sul diario senza nuove estrazioni continue.',
  exercise: 'Fai la stesa mensile. Scrivi 1 impegno. Metti un reminder a metà mese per il solo riesame degli appunti.',
})}
${related([
  ['/blog/tarocchi-energia-della-settimana', 'Energia della settimana'],
  ['/blog/tarocchi-carta-del-giorno', 'Carta del giorno'],
  ['/blog/diario-dei-tarocchi', 'Diario dei tarocchi'],
])}
${CTA}
`.trim(),
    }),
  ];
}
