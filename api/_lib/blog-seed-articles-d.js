/**
 * Quarto lotto articoli blog (SEO intent + long-tail IT).
 * Temi non sovrapposti ai cataloghi A/B/C. Tutti in draft.
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

export function getSeedArticlesD() {
  return [
    article({
      slug: 'significato-carta-il-carro',
      title: 'Carta Il Carro nei tarocchi: direzione, volontà e vittoria',
      description:
        'Significato della carta Il Carro: avanzare con focus, superare ostacoli e tenere insieme impulso e disciplina in amore e lavoro.',
      keyword: 'significato carta il carro tarocchi',
      coverAlt: 'Carta Il Carro dei tarocchi con senso di movimento e determinazione',
      faq: [
        {
          q: 'Il Carro annuncia sempre un successo?',
          a: 'Indica progresso possibile se tieni la direzione. Non garantisce vittoria senza impegno o confini chiari.',
        },
        {
          q: 'In amore cosa significa Il Carro?',
          a: 'Può parlare di avanzare insieme, superare un blocco o scegliere una strada senza restare in bilico.',
        },
        {
          q: 'Cosa fare se esce Il Carro?',
          a: 'Definisci una meta concreta e un piano breve. Riduci le distrazioni che spezzano la volontà.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta Il Carro nei tarocchi</strong> è movimento consapevole: volontà, focus e capacità di tenere insieme forze opposte senza perdere la strada.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Direzione e disciplina.</li>
  <li>Superamento di ostacoli con determinazione.</li>
  <li>Controllo delle spinte contraddittorie.</li>
  <li>Avanzamento concreto, non solo desiderio.</li>
</ul>
<p>Confronta con <a href="/blog/significato-carta-il-matto">Il Matto</a> (inizio libero) e <a href="/blog/significato-carta-la-forza">La Forza</a> (soft power interiore).</p>
${expand({
  method: 'Con Il Carro chiediti quale meta stai davvero perseguendo e quali “cavalli” (emozioni, priorità, persone) tirano in direzioni diverse. Traduci la carta in un obiettivo misurabile e in un confine: cosa non farai per restare in pista.',
  example: 'Carro + 8 di Bastoni + 2 di Denari: impulso forte ma tempi da bilanciare. Azione: scegli una sola priorità della settimana e blocca due distrazioni ricorrenti.',
  limits: 'Il Carro non giustifica forzare qualcuno o “vincere” a ogni costo. Se diventa controllo sull’altro, rileggi la dinamica. Non è una garanzia di promozione o rientro.',
  lux: 'Domanda Luxseetarot: «Quale direzione posso scegliere ora e quale passo concreto mi tiene in movimento?».',
  exercise: 'Scrivi destinazione in una riga + tre azioni entro 7 giorni. Elimina una cosa che ti frena. Non rifare la stesa prima di averle fatte.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/tarocchi-lavoro-carriera', 'Tarocchi lavoro e carriera'],
  ['/blog/tarocchi-e-decisioni-difficili', 'Decisioni difficili'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-leremita',
      title: 'Carta L’Eremita nei tarocchi: solitudine utile e ricerca interiore',
      description:
        'Significato della carta L’Eremita: ritiro consapevole, chiarezza interiore e quando il silenzio aiuta più del consiglio esterno.',
      keyword: 'significato carta l eremita tarocchi',
      coverAlt: 'Carta L’Eremita dei tarocchi con lanterna e atmosfera raccolta',
      faq: [
        {
          q: 'L’Eremita indica isolamento negativo?',
          a: 'Spesso indica un ritiro scelto per vedere chiaro, non necessariamente solitudine sofferta.',
        },
        {
          q: 'In amore è una carta di distanza?',
          a: 'Può chiedere spazio, riflessività o meno pressione. Non significa automaticamente “è finita”.',
        },
        {
          q: 'Cosa chiedere se esce L’Eremita?',
          a: 'Di cosa ho bisogno per capire? Quale rumore posso ridurre per ascoltare me?',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta L’Eremita nei tarocchi</strong> parla di luce interiore: ritiro, discernimento e saggezza che nasce dal silenzio, non dalla fretta di rispondere.</p>
<h2>Temi chiave</h2>
<ul>
  <li>Introspezione e ricerca di senso.</li>
  <li>Guida interiore (lanterna) invece di opinioni esterne.</li>
  <li>Pausa dai rumori affettivi o sociali.</li>
  <li>Mentorship sobria: sapere senza imporre.</li>
</ul>
<p>Utile con <a href="/blog/tarocchi-e-intuito">tarocchi e intuito</a> e <a href="/blog/preparazione-prima-di-una-lettura">preparazione prima di una lettura</a>.</p>
${expand({
  method: 'Chiediti se stai evitando o se stai metabolizzando. L’Eremita chiede qualità del tempo solo: diario, cammino, meno scroll. Guarda le carte vicine per capire se il ritiro nutre o chiude eccessivamente.',
  example: 'Eremita + Luna + Asso di Spade: confusione che chiede verità dopo una pausa. Azione: 48 ore senza chiedere consigli esterni + una frase chiara scritta per te.',
  limits: 'Non usare L’Eremita per giustificare isolamento prolungato se hai bisogno di supporto. In depressione o crisi, cerca aiuto umano adeguato, non solo il mazzo.',
  lux: 'Domanda: «Cosa posso chiarire restando in ascolto e quale insight sto evitando nel rumore?».',
  exercise: 'Spegni notifiche per una sera. Scrivi tre verità che emergono senza input altrui. Scegline una da portare nei fatti.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/diario-dei-tarocchi', 'Diario dei tarocchi'],
  ['/blog/quando-fare-una-lettura-dei-tarocchi', 'Quando fare una lettura'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-la-temperanza',
      title: 'Carta La Temperanza nei tarocchi: equilibrio, pazienza e miscela',
      description:
        'Significato della carta La Temperanza: mediazione, ritmo sostenibile e integrazione di opposti in relazioni e scelte.',
      keyword: 'significato carta la temperanza tarocchi',
      coverAlt: 'Carta La Temperanza dei tarocchi con senso di flusso e calma',
      faq: [
        {
          q: 'La Temperanza invita solo ad aspettare?',
          a: 'Invita a dosare e integrare, non a restare passivi. Pazienza attiva: piccoli aggiustamenti continui.',
        },
        {
          q: 'È una carta di guarigione?',
          a: 'Spesso sì: ripristino di equilibrio dopo eccessi, conflitti o periodi intensi.',
        },
        {
          q: 'In lavoro cosa indica?',
          a: 'Collaborazione, mediazione, processi graduali e attenzione al burnout.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta La Temperanza nei tarocchi</strong> è alchimia gentile: unire ingredienti diversi senza forzare, trovare il ritmo giusto tra fare e lasciare maturare.</p>
<h2>Nucleo</h2>
<ul>
  <li>Equilibrio e moderazione.</li>
  <li>Integrazione di opposti (emozione/ragione, io/tu).</li>
  <li>Guarigione graduale.</li>
  <li>Collaborazione e mediazione.</li>
</ul>
<p>Confronta con <a href="/blog/significato-carta-la-torre">La Torre</a> (rottura improvvisa) e <a href="/blog/significato-carta-la-stella">La Stella</a> (speranza di ripresa).</p>
${expand({
  method: 'Con La Temperanza chiedi: “Cosa posso mescolare meglio invece di scegliere in modo estremo?”. Cerca dosi: meno/più di una cosa, non tutto o niente. Traduci in abitudini sostenibili.',
  example: 'Temperanza + 5 di Bastoni + 6 di Coppe: conflitto che può ammorbidirsi con dialogo e memoria condivisa. Azione: una conversazione a turni, senza ultimátum.',
  limits: 'Equilibrio non significa tollerare l’intollerabile. Se c’è abuso o sfruttamento, priorità ai confini. La carta non “cura” al posto di un percorso professionale.',
  lux: 'Domanda: «Dove posso ripristinare equilibrio e quale piccolo aggiustamento posso fare oggi?».',
  exercise: 'Scegli un eccesso (messaggi, lavoro, ruminazione). Riducilo del 20% per una settimana e annota l’effetto.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/tarocchi-cambiamento-e-trasformazione', 'Cambiamento e trasformazione'],
  ['/blog/tarocchi-e-ansia-usarli-bene', 'Tarocchi e ansia'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-il-giudizio',
      title: 'Carta Il Giudizio nei tarocchi: risveglio, richiamo e nuovo livello',
      description:
        'Significato della carta Il Giudizio: presa di coscienza, chiamate a ricominciare e chiusura di un ciclo con responsabilità.',
      keyword: 'significato carta il giudizio tarocchi',
      coverAlt: 'Carta Il Giudizio dei tarocchi con senso di risveglio',
      faq: [
        {
          q: 'Il Giudizio è una condanna?',
          a: 'Più un risveglio e una chiamata: riconoscere cosa è vero e rispondere di conseguenza.',
        },
        {
          q: 'Parla di ritorno di qualcuno?',
          a: 'Può indicare riaperture o “richiami”, ma spesso riguarda il tuo risveglio, non un destino imposto.',
        },
        {
          q: 'Cosa fare se esce spesso?',
          a: 'Ascolta cosa stai rimandando di affrontare. Porta chiarezza in una scelta concreta.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta Il Giudizio nei tarocchi</strong> è il richiamo a alzarsi: consapevolezza, revisione del passato e scelta di un livello più autentico di vita.</p>
<h2>Temi</h2>
<ul>
  <li>Risveglio e presa di coscienza.</li>
  <li>Perdono e liberazione da un vecchio racconto.</li>
  <li>Chiamata (vocazione, verità, ripartenza).</li>
  <li>Valutazione onesta di ciò che è stato.</li>
</ul>
<p>Collega a <a href="/blog/significato-carta-il-mondo">Il Mondo</a> (completamento) e <a href="/blog/tarocchi-ritorno-di-fiamma">ritorno di fiamma</a> (senza illusioni).</p>
${expand({
  method: 'Chiedi: “Quale verità sto finalmente sentendo e a quale azione mi chiama?”. Distingui nostalgia (voler tornare indietro) da risveglio (andare avanti con consapevolezza).',
  example: 'Giudizio + 6 di Coppe + 8 di Bastoni: memoria + spinta a muoversi. Messaggio: non ripetere il passato; rispondi a un’opportunità presente con chiarezza.',
  limits: 'Il Giudizio non “assolve” o “condanna” legalmente. Non usarlo per giudicare l’altro senza dialogo. Temi di salute mentale gravi = supporto professionale.',
  lux: 'Domanda: «A quale verità posso rispondere ora e quale passo onora questo risveglio?».',
  exercise: 'Scrivi una “vecchia storia su di te” e una versione aggiornata. Fai un gesto coerente con la nuova versione entro 72 ore.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Dopo una lettura'],
  ['/blog/tarocchi-ex-e-ricongiungimento', 'Ex e ricongiungimento'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-la-forza',
      title: 'Carta La Forza nei tarocchi: coraggio gentile e padronanza',
      description:
        'Significato della carta La Forza: tame l’impulso con compassione, resilienza e fiducia interiore in amore e prove quotidiane.',
      keyword: 'significato carta la forza tarocchi',
      coverAlt: 'Carta La Forza dei tarocchi con leone e atmosfera calma',
      faq: [
        {
          q: 'La Forza è forza fisica o morale?',
          a: 'Soprattutto morale ed emotiva: gestire impulsi e paure senza violenza.',
        },
        {
          q: 'In amore cosa indica?',
          a: 'Pazienza, tenerezza attiva, capacità di stare nelle emozioni intense senza scappare né controllare.',
        },
        {
          q: 'Differenza con Il Carro?',
          a: 'Il Carro spinge e dirige; La Forza addomestica dall’interno con calma e fiducia.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta La Forza nei tarocchi</strong> è coraggio soft: non spezzare il leone, ma guidarlo. Parla di resilienza, compassione e padronanza degli impulsi.</p>
<h2>Nucleo</h2>
<ul>
  <li>Coraggio e vulnerabilità insieme.</li>
  <li>Gestione di rabbia, desiderio, paura.</li>
  <li>Persuasione gentile invece di costrizione.</li>
  <li>Vitalità e fiducia nel corpo emotivo.</li>
</ul>
<p>Vedi anche <a href="/blog/significato-carta-il-carro">Il Carro</a> e <a href="/blog/tarocchi-e-ansia-usarli-bene">come usare i tarocchi con ansia</a>.</p>
${expand({
  method: 'Chiediti quale emozione stai combattendo e come puoi “parlarle” invece di reprimerla. La Forza premia regolazione: pause, respiro, confini caldi.',
  example: 'Forza + 5 di Coppe + Stella: dolore ancora vivo ma capacità di riprendersi. Azione: un rituale di cura + un limite ai controlli ossessivi.',
  limits: 'Non interpretare La Forza come “devi sopportare tutto”. Resistenza non è restare in situazioni dannose. Se sei in pericolo, agisci fuori dal mazzo.',
  lux: 'Domanda: «Quale impulso posso guidare con gentilezza e quale gesto concreto mi rende più stabile?».',
  exercise: 'Quando sale un’emozione forte, scrivi 3 minuti senza pubblicare nulla. Poi scegli una risposta calibrata, non la prima reazione.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/significato-carta-il-carro', 'Carta Il Carro'],
  ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-la-papessa',
      title: 'Carta La Papessa nei tarocchi: mistero, ascolto e sapere interiore',
      description:
        'Significato della carta La Papessa: intuizione, silenzio fertile e verità che emergono senza forzare in una lettura.',
      keyword: 'significato carta la papessa tarocchi',
      coverAlt: 'Carta La Papessa dei tarocchi in luce soft e raccolta',
      faq: [
        {
          q: 'La Papessa nasconde sempre un segreto?',
          a: 'Indica non detto o conoscenza ancora in incubazione. Non sempre “qualcuno mente”: a volte tu non sei pronto/a a sapere.',
        },
        {
          q: 'È una carta passiva?',
          a: 'È ricettiva: ascolta, osserva, approfondisce. L’azione arriva dopo la chiarezza.',
        },
        {
          q: 'In amore cosa significa?',
          a: 'Intimità silenziosa, bisogno di riservatezza, o invito a fidarti dell’intuito senza spingere.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato della carta La Papessa nei tarocchi</strong> è il sapere quieto: intuizione, soglia del mistero e rispetto di ciò che ancora non è maturo per essere detto.</p>
<h2>Temi chiave</h2>
<ul>
  <li>Intuito e ascolto profondo.</li>
  <li>Riservatezza e confini informativi.</li>
  <li>Studio, sogni, simboli.</li>
  <li>Pazienza prima di rivelare o decidere.</li>
</ul>
<p>Collega a <a href="/blog/significato-carta-la-luna">La Luna</a> (ambiguità) e <a href="/blog/tarocchi-e-sogni">tarocchi e sogni</a>.</p>
${expand({
  method: 'Con La Papessa riduci la pressione a “sapere subito”. Annota indizi, sensazioni e fatti senza concludere. Chiedi cosa resta privato per buona ragione e cosa invece merita una domanda chiara.',
  example: 'Papessa + 7 di Spade + Cavaliere di Coppe: qualcosa non detto + impulso affettivo. Azione: non accusare; osserva comportamenti e, se serve, fai una domanda diretta e sobria.',
  limits: 'Non usare La Papessa per giustificare lo stalking emotivo (“devo scoprire”). Rispetta privacy altrui. Le carte non aprono chat private.',
  lux: 'Domanda: «Cosa posso ascoltare in silenzio e quale verità emergerà se non forzo?».',
  exercise: 'Per 24 ore non chiedere consigli sul tema. Scrivi solo ciò che senti e ciò che sai di fatti. Confronta le due liste.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/tarocchi-e-intuito', 'Tarocchi e intuito'],
  ['/blog/significato-carta-limperatrice', 'Carta L’Imperatrice'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-as-di-spade',
      title: 'Asso di Spade nei tarocchi: verità, chiarezza e taglio netto',
      description:
        'Significato Asso di Spade: insight, decisione lucida e parole che tagliano la confusione in amore, lavoro e conflitti.',
      keyword: 'significato asso di spade tarocchi',
      coverAlt: 'Asso di Spade dei tarocchi con senso di chiarezza',
      faq: [
        {
          q: 'L’Asso di Spade è una carta “dura”?',
          a: 'È nitida: porta verità e decisioni. Può sollevare, non solo ferire, se usata con rispetto.',
        },
        {
          q: 'Annuncia una rottura?',
          a: 'Può indicare un taglio necessario o una conversazione chiara — non automaticamente una fine.',
        },
        {
          q: 'Come usarlo bene?',
          a: 'Traduci l’insight in una frase onesta e un’azione, senza aggressività gratuita.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato dell’Asso di Spade nei tarocchi</strong> è la lama della chiarezza: idea nuova, verità che taglia il dubbio, decisione mentale che apre strada.</p>
<h2>In sintesi</h2>
<ul>
  <li>Insight e chiarezza improvvisa.</li>
  <li>Comunicazione diretta.</li>
  <li>Inizio di un conflitto costruttivo o di una risoluzione.</li>
  <li>Taglio di illusioni.</li>
</ul>
<p>Nel semi delle Spade vedi <a href="/blog/i-quattro-semi-dei-tarocchi">i quattro semi</a> e il contrasto con <a href="/blog/significato-as-di-coppe">Asso di Coppe</a>.</p>
${expand({
  method: 'Chiedi quale verità stai evitando di nominare. L’Asso di Spade vuole una frase precisa, non un romanzo. Prepara le parole, poi verifica nei fatti.',
  example: 'Asso di Spade + Luna + 2 di Coppe: confusione che chiede chiarezza nel legame. Azione: un messaggio o incontro per definire intenzioni, non indovinare.',
  limits: 'Chiarezza non è crudeltà. Non usare la carta per umiliare. Temi legali o medici restano fuori dalla lettura.',
  lux: 'Domanda: «Quale verità posso riconoscere e come comunicarla in modo netto ma rispettoso?».',
  exercise: 'Scrivi la verità in una riga. Poi riscrivila togliendo accuse. Usa quella versione.',
})}
${related([
  ['/blog/arcani-minori-cosa-sono', 'Arcani Minori'],
  ['/blog/significato-tre-di-spade', 'Tre di Spade'],
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-as-di-bastoni',
      title: 'Asso di Bastoni nei tarocchi: scintilla, iniziativa e fuoco creativo',
      description:
        'Significato Asso di Bastoni: nuovo impulso, progetti e coraggio di iniziare — da leggere con piedi per terra e piano concreto.',
      keyword: 'significato asso di bastoni tarocchi',
      coverAlt: 'Asso di Bastoni dei tarocchi con energia di inizio',
      faq: [
        {
          q: 'L’Asso di Bastoni annuncia un nuovo lavoro?',
          a: 'Può indicare un’opportunità o un’idea da far germogliare. Serve azione, non solo entusiasmo.',
        },
        {
          q: 'Vale anche in amore?',
          a: 'Sì: attrazione, iniziativa, “chimica” e voglia di proporre qualcosa di vivo.',
        },
        {
          q: 'Cosa blocca questa carta?',
          a: 'Procrastinazione, paura del giudizio, o troppi inizi senza follow-through.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato dell’Asso di Bastoni nei tarocchi</strong> è la scintilla: energia creativa, libido del progetto, coraggio di piantare un seme e muoversi.</p>
<h2>In sintesi</h2>
<ul>
  <li>Nuovo impulso e ispirazione.</li>
  <li>Iniziativa e leadership personale.</li>
  <li>Passione e vitalità.</li>
  <li>Invito a fare il primo passo concreto.</li>
</ul>
<p>Confronta con <a href="/blog/significato-carta-il-matto">Il Matto</a> e con il lavoro in <a href="/blog/tarocchi-lavoro-carriera">tarocchi lavoro</a>.</p>
${expand({
  method: 'Trasforma l’entusiasmo in un MVP: un’azione minima entro 48 ore. Se l’Asso esce spesso senza risultati, il tema non è l’ispirazione ma la continuità.',
  example: 'Asso di Bastoni + 3 di Denari + 8 di Bastoni: idea + collaborazione + accelerazione. Azione: proponi un bozza/meeting, non solo “ci penso”.',
  limits: 'Un Asso non garantisce successo commerciale o reciprocità amorosa. Non bruciare tutto per un impulso: verifica risorse e tempi.',
  lux: 'Domanda: «Quale scintilla posso onorare ora e quale primo passo la rende reale?».',
  exercise: 'Scegli un’idea. Scrivi il passo più piccolo possibile e fallo oggi. Annota cosa cambia domani.',
})}
${related([
  ['/blog/arcani-minori-cosa-sono', 'Arcani Minori'],
  ['/blog/i-quattro-semi-dei-tarocchi', 'I quattro semi'],
  ['/blog/tarocchi-cambiamento-e-trasformazione', 'Cambiamento'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-as-di-denari',
      title: 'Asso di Denari nei tarocchi: opportunità concreta e seme materiale',
      description:
        'Significato Asso di Denari: nuove basi pratiche, soldi, corpo e opportunità da coltivare con costanza e realismo.',
      keyword: 'significato asso di denari tarocchi',
      coverAlt: 'Asso di Denari dei tarocchi con senso di potenziale concreto',
      faq: [
        {
          q: 'L’Asso di Denari annuncia soldi in arrivo?',
          a: 'Indica potenziale materiale o un’occasione pratica. Il risultato dipende da come la coltivi.',
        },
        {
          q: 'Parla solo di denaro?',
          a: 'No: salute del corpo, casa, lavoro, abitudini, risorse. Tutto ciò che si tocca e si misura.',
        },
        {
          q: 'Come non sprecare questa carta?',
          a: 'Metti un piano semplice, scadenze e un primo investimento di tempo/energia.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato dell’Asso di Denari nei tarocchi</strong> è il seme nella mano: opportunità concreta, inizio di stabilità, qualcosa di tangibile da far crescere con cura.</p>
<h2>In sintesi</h2>
<ul>
  <li>Nuova opportunità materiale o lavorativa.</li>
  <li>Investimento e radicamento.</li>
  <li>Cura del corpo e delle risorse.</li>
  <li>Inizio di un ciclo pratico.</li>
</ul>
<p>Approfondisci <a href="/blog/tarocchi-soldi-e-risorse">tarocchi soldi e risorse</a> e <a href="/blog/i-quattro-semi-dei-tarocchi">i quattro semi</a>.</p>
${expand({
  method: 'Chiedi quale opportunità è reale (offerta, idea, spazio) e quale cura richiede. L’Asso di Denari odia le fantasie: numeri, date, checklist.',
  example: 'Asso di Denari + 7 di Denari + Imperatore: seme + pazienza + struttura. Azione: budget o piano settimanale, non solo “spero arrivi”.',
  limits: 'Non è consulenza finanziaria. Non investire soldi “perché l’ha detto la carta”. Verifica rischi con strumenti e professionisti adeguati.',
  lux: 'Domanda: «Quale opportunità pratica posso piantare ora e quale gesto concreto la nutre?».',
  exercise: 'Elenca una risorsa (tempo, soldi, skill). Assegna un’azione di 30 minuti entro 48 ore. Misura il progresso.',
})}
${related([
  ['/blog/arcani-minori-cosa-sono', 'Arcani Minori'],
  ['/blog/tarocchi-lavoro-carriera', 'Tarocchi lavoro'],
  ['/blog/significato-carta-limperatore', 'Carta L’Imperatore'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-dieci-di-coppe',
      title: 'Dieci di Coppe nei tarocchi: armonia emotiva e pienezza affettiva',
      description:
        'Significato Dieci di Coppe: felicità condivisa, senso di casa e realizzazione emotiva — da leggere senza idealizzare.',
      keyword: 'significato dieci di coppe tarocchi',
      coverAlt: 'Dieci di Coppe dei tarocchi con atmosfera di armonia',
      faq: [
        {
          q: 'Il Dieci di Coppe promette “per sempre felici”?',
          a: 'Indica un clima di pienezza e armonia possibile, non un lieto fine garantito senza cura quotidiana.',
        },
        {
          q: 'È solo una carta di famiglia?',
          a: 'Spesso parla di famiglia o cerchia intima, ma anche di community e senso di appartenenza.',
        },
        {
          q: 'Cosa se esce in una crisi?',
          a: 'Può ricordare il valore da proteggere o il modello di armonia a cui tendere — non negare il conflitto attuale.',
        },
      ],
      bodyHtml: `
<p>Il <strong>significato del Dieci di Coppe nei tarocchi</strong> è la pienezza emotiva: casa interiore, gioia condivisa, “ci siamo” come sistema affettivo, non solo come coppia ideale da cartolina.</p>
<h2>Temi</h2>
<ul>
  <li>Armonia e riconoscimento reciproco.</li>
  <li>Appartenenza e sicurezza emotiva.</li>
  <li>Celebrazione di legami sani.</li>
  <li>Completamento di un ciclo affettivo positivo.</li>
</ul>
<p>Confronta con <a href="/blog/significato-as-di-coppe">Asso di Coppe</a> (inizio) e <a href="/blog/significato-tarocchi-amore">tarocchi in amore</a>.</p>
${expand({
  method: 'Chiedi dove l’armonia è già presente e dove la stai idealizzando. Il Dieci di Coppe invita a nutrire ciò che funziona con gesti concreti, non a pretendere perfezione.',
  example: '10 di Coppe + Temperanza + 2 di Bastoni: gioia possibile + equilibrio + scelta di direzione. Azione: un piano condiviso (tempo insieme, confini con terzi).',
  limits: 'Non usare questa carta per restare in una relazione dannosa “perché un giorno sarà così”. Se manca rispetto, la cartolina non basta.',
  lux: 'Domanda: «Dove posso coltivare armonia reale e quale gesto la rende tangibile questa settimana?».',
  exercise: 'Elenca tre momenti di vera connessione recenti. Ripeti uno di quei gesti entro 7 giorni.',
})}
${related([
  ['/blog/significato-tarocchi-amore', 'Tarocchi in amore'],
  ['/blog/tarocchi-amicizia-e-rapporti', 'Amicizia e rapporti'],
  ['/blog/stesa-tarocchi-amore', 'Stesa tarocchi amore'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-carta-del-giorno',
      title: 'Tarocchi carta del giorno gratis: come usarla (senza ossessionarti)',
      description:
        'Tarocchi carta del giorno gratis: metodo semplice, diario, errori da evitare e come integrare il simbolo nella giornata reale su Luxseetarot.',
      keyword: 'tarocchi carta del giorno gratis',
      coverAlt: 'Una carta dei tarocchi estratta come carta del giorno',
      faq: [
        {
          q: 'A che ora estrarre la carta del giorno?',
          a: 'Di solito al mattino, con una domanda aperta sul clima o sull’atteggiamento utile — non sul destino minuto per minuto.',
        },
        {
          q: 'Devo rifare se “non mi piace”?',
          a: 'No. Osserva la carta come ipotesi e verifica a sera. Rifare spezza l’allenamento.',
        },
        {
          q: 'Posso farlo online?',
          a: 'Sì: su Luxseetarot puoi usare tre carte o focalizzarti su un’unica idea centrale anche da un’estrazione breve.',
        },
      ],
      bodyHtml: `
<p>Cerchi <strong>tarocchi carta del giorno gratis</strong>? La <strong>carta del giorno nei tarocchi</strong> è uno degli esercizi più utili per principianti: un simbolo, un giorno, un confronto con i fatti. Funziona se la tratti come bussola, non come oracolo ansioso. Puoi praticarla anche online con i <a href="/tarocchi-gratis.html">tarocchi gratis</a>.</p>
<h2>Metodo in 4 passi</h2>
<ol>
  <li>Domanda: «Quale energia posso osservare oggi?» o «Quale atteggiamento mi aiuta?».</li>
  <li>Estrai una carta (o leggi il nucleo di una stesa breve).</li>
  <li>Scrivi una frase + un gesto possibile.</li>
  <li>A sera: cosa hai notato di vero?</li>
</ol>
<h2>Errori tipici</h2>
<ul>
  <li>Interpretare ogni evento come “colpa” della carta.</li>
  <li>Estrarre di nuovo finché esce “bello”.</li>
  <li>Saltare il diario: senza scrittura si dimentica il pattern.</li>
</ul>
<p>Collega a <a href="/blog/tarocchi-quotidiani-abitudine-consapevole">tarocchi quotidiani</a> e <a href="/blog/diario-dei-tarocchi">diario dei tarocchi</a>.</p>
${expand({
  method: 'Limita la carta del giorno a un tema (atteggiamento, rischio, risorsa). Evita “mi amerà oggi?”. A sera valuta solo comportamenti osservabili.',
  example: 'Esce Temperanza. Ipotesi: dosare reazioni. Durante il giorno noti una discussione: rispondi dopo 10 minuti invece che subito. A sera la carta “ha funzionato” come promemoria, non come profezia.',
  limits: 'Non basare decisioni irreversibili su una sola carta mattutina. Se aumenta ansia, passa a 2–3 giorni a settimana.',
  lux: 'Puoi allenarti con i tarocchi gratis: anche da tre carte, scegli un solo messaggio del giorno e lascialo lavorare.',
  exercise: 'Sette giorni, una carta al mattino, tre righe a sera. Al settimo rileggi i temi ricorrenti.',
})}
${related([
  ['/blog/tarocchi-quotidiani-abitudine-consapevole', 'Abitudine consapevole'],
  ['/blog/come-leggere-i-tarocchi-da-soli', 'Leggere i tarocchi da soli'],
  ['/blog/tarocchi-energia-della-settimana', 'Energia della settimana'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'come-fare-tarocchi-a-casa',
      title: 'Come fare i tarocchi a casa: guida pratica passo passo',
      description:
        'Come fare i tarocchi a casa: spazio, domanda, mescolata, stesa a tre carte e integrazione — anche senza essere esperti.',
      keyword: 'come fare i tarocchi a casa',
      coverAlt: 'Tavolo domestico preparato per una lettura di tarocchi',
      faq: [
        {
          q: 'Serve un rituale complicato?',
          a: 'No. Bastano un tavolo ordinato, una domanda chiara e qualche minuto di attenzione.',
        },
        {
          q: 'Posso leggere per me stesso/a?',
          a: 'Sì. Usa stese brevi e diario; se sei molto agitata/o, posponi o fai solo una carta.',
        },
        {
          q: 'Mazzo fisico o online?',
          a: 'Entrambi validi. A casa il mazzo aiuta la presenza; online è comodo per praticare subito.',
        },
      ],
      bodyHtml: `
<p>Imparare <strong>come fare i tarocchi a casa</strong> non richiede un altare perfetto: serve metodo, rispetto dei limiti e una domanda che ti riguardi davvero.</p>
<h2>Setup minimo</h2>
<ul>
  <li>Spazio libero da distrazioni (anche 10 minuti).</li>
  <li>Domanda aperta scritta.</li>
  <li>Mazzo (o sessione online) + taccuino.</li>
</ul>
<h2>Passaggi</h2>
<ol>
  <li>Respira e formula la domanda (vedi <a href="/blog/come-fare-una-domanda-ai-tarocchi">come fare una domanda</a>).</li>
  <li><a href="/blog/come-mescolare-e-scegliere-le-carte">Mescola e scegli</a> con calma.</li>
  <li>Parti da <a href="/blog/lettura-tarocchi-tre-carte">tre carte</a>: passato / presente / tendenza.</li>
  <li>Scrivi sintesi + un’azione.</li>
</ol>
<p>Per ambientarti: <a href="/blog/preparazione-prima-di-una-lettura">preparazione</a> e <a href="/blog/come-pulire-il-mazzo-di-tarocchi">cura del mazzo</a> (se usi carte fisiche).</p>
${expand({
  method: 'A casa è facile distrarsi. Metti il telefono in modalità silenziosa, leggi l’insieme prima dei dettagli e chiudi la sessione con una frase al presente. Se non sei chiaro/a, non aggiungere carte: riformula la domanda un altro giorno.',
  example: 'Domanda: «Cosa posso chiarire sul mio carico di lavoro questa settimana?». Escono 10 di Bastoni, Temperanza, Asso di Spade. Sintesi: troppi pesi, bisogno di dosare, una priorità da nominare. Azione: delega o elimina un task.',
  limits: 'Casa non significa “consultare ogni ora”. Non leggere su terzi senza consenso etico. Niente salute/legale come oracolo.',
  lux: 'Se non hai il mazzo a portata, inizia con i tarocchi gratis su Luxseetarot e applica lo stesso metodo di diario.',
  exercise: 'Prepara lo spazio una volta. Fai una sola stesa a tre carte. Non rifarla: integra l’azione entro 48 ore.',
})}
${related([
  ['/blog/come-leggere-i-tarocchi-da-soli', 'Leggere da soli'],
  ['/blog/come-scegliere-un-mazzo-di-tarocchi', 'Scegliere un mazzo'],
  ['/blog/tarocchi-per-principianti-guida', 'Guida per principianti'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-separazione',
      title: 'Tarocchi e separazione: come leggere una chiusura con chiarezza',
      description:
        'Tarocchi separazione: domande utili, carte tipiche e limiti. Come usare la lettura per elaborare, non per tormentarti.',
      keyword: 'tarocchi separazione',
      coverAlt: 'Carte dei tarocchi su tema di separazione e nuovo inizio',
      faq: [
        {
          q: 'I tarocchi possono dirmi se dobbiamo separarci?',
          a: 'Possono mappare dinamiche e bisogni, non decidere al posto tuo. La scelta resta etica e pratica, tua.',
        },
        {
          q: 'Quali carte parlano di separazione?',
          a: 'Dipende dal contesto. Torre, 3 di Spade, 8 di Coppe, 5 di Coppe possono indicare rottura o distacco — mai isolate.',
        },
        {
          q: 'Ogni quanto rifare la lettura?',
          a: 'Solo se cambiano i fatti. In lutto emotivo, meno letture e più sostegno umano.',
        },
      ],
      bodyHtml: `
<p>Cercare <strong>tarocchi separazione</strong> spesso nasce da dolore e bisogno di senso. Una lettura utile aiuta a nominare cosa finisce, cosa resta e come prenderti cura di te — non a “vincere” l’altro.</p>
<h2>Domande più sane</h2>
<ul>
  <li>Cosa sto davvero chiudendo in questa fase?</li>
  <li>Quale parte di me ha bisogno di sostegno ora?</li>
  <li>Quale prossimo passo rispetta dignità e confini?</li>
</ul>
<p>Vedi anche <a href="/blog/significato-tre-di-spade">Tre di Spade</a>, <a href="/blog/tarocchi-ex-e-ricongiungimento">ex e ricongiungimento</a>, <a href="/blog/cosa-fare-dopo-una-lettura-tarocchi">dopo la lettura</a>.</p>
${expand({
  method: 'Dividi la stesa in: dinamica della chiusura / tuo bisogno / risorsa. Evita “tornerà?” come unica domanda. Se c’è violenza o rischio, priorità alla sicurezza reale.',
  example: '8 di Coppe + Stella + Eremita: allontanamento necessario, speranza di guarigione, spazio interiore. Azione: supporto amicale + routine di base (sonno, pasti), non stalking.',
  limits: 'Le carte non sostituiscono mediazione legale, terapia o reti di aiuto. Non usarle per giustificare umiliazioni. Se la lettura peggiora il rumine, fermati.',
  lux: 'Domanda Luxseetarot: «Cosa posso riconoscere su questa separazione e quale gesto mi sostiene nei prossimi giorni?».',
  exercise: 'Scrivi tre confini (contatti, oggetti, social). Attivane uno oggi. Rivaluta tra una settimana senza nuove stese sul tema.',
})}
${related([
  ['/blog/tarocchi-ritorno-di-fiamma', 'Ritorno di fiamma'],
  ['/blog/tarocchi-e-ansia-usarli-bene', 'Tarocchi e ansia'],
  ['/blog/significato-carta-la-torre', 'Carta La Torre'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-gelosia',
      title: 'Tarocchi e gelosia: leggere il segnale senza alimentare il controllo',
      description:
        'Tarocchi gelosia: come interrogare le carte su paura, fiducia e dinamiche, senza usarle come spia dell’altro.',
      keyword: 'tarocchi gelosia',
      coverAlt: 'Carte dei tarocchi e tema di gelosia affrontato con calma',
      faq: [
        {
          q: 'I tarocchi possono dirmi se c’è un rivale?',
          a: 'Meglio chiedere cosa stai percependo e cosa puoi verificare con rispetto. Non sono un detective.',
        },
        {
          q: 'Quali carte associ alla gelosia?',
          a: 'Diavolo, Luna, 7 di Spade, 5 di Bastoni possono parlare di paura, segreto o conflitto — da contestualizzare.',
        },
        {
          q: 'Come evitare che la lettura peggiori tutto?',
          a: 'Porta il focus su di te: bisogno, confine, conversazione. Evita estrazioni serali ripetute.',
        },
      ],
      bodyHtml: `
<p>La query <strong>tarocchi gelosia</strong> mescola dolore e bisogno di controllo. Le carte possono dare linguaggio alla paura — non licenza per controllare l’altro.</p>
<h2>Cosa può fare una lettura utile</h2>
<ul>
  <li>Distinguere intuizione, proiezione e fatti.</li>
  <li>Mostrare il tuo ruolo (insicurezza, silenzio, pressione).</li>
  <li>Suggerire un dialogo o un confine sano.</li>
</ul>
<h2>Domande migliori</h2>
<ul>
  <li>Cosa sto davvero temendo in questa dinamica?</li>
  <li>Quale bisogno non sto esprimendo?</li>
  <li>Come posso restare in fiducia senza annullarmi?</li>
</ul>
<p>Collega a <a href="/blog/tarocchi-tradimento">tarocchi e tradimento</a> (senza paranoia), <a href="/blog/significato-carta-il-diavolo">Il Diavolo</a>, <a href="/blog/tarocchi-cosa-pensa-di-me">cosa pensa di me</a>.</p>
${expand({
  method: 'Prima della stesa elenca fatti vs ipotesi. In lettura, assegna più peso alla carta su di te. Se esce “segreto”, chiedi una conversazione o un dato verificabile — non un’indagine furtiva.',
  example: 'Luna + 9 di Spade + Asso di Spade: paura + ruminazione + bisogno di verità. Azione: una domanda chiara all’altro (se sicuro) o un lavoro sulla tua ansia, non controlli social.',
  limits: 'Gelosia intensa può chiedere supporto psicologico. Le carte non giustificano stalking, accuse pubbliche o umiliazioni. Se c’è abuso, cerca aiuto adeguato.',
  lux: 'Prova tre carte gratis su: «Cosa posso chiarire sulla mia gelosia e quale passo mi riporta equilibrio?».',
  exercise: 'Scrivi il peggior scenario immaginato e tre fatti contrari o neutri. Respira. Solo dopo, se serve, fai la lettura.',
})}
${related([
  ['/blog/tarocchi-e-ansia-usarli-bene', 'Tarocchi e ansia'],
  ['/blog/significato-carta-la-luna', 'Carta La Luna'],
  ['/blog/tarocchi-amore-domande-esempi', 'Domande in amore'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-riconciliazione',
      title: 'Tarocchi riconciliazione: possibilità, condizioni e lavoro reale',
      description:
        'Tarocchi e riconciliazione: come leggere aperture e blocchi senza promesse magiche. Domande utili e focus sul cambiamento concreto.',
      keyword: 'tarocchi riconciliazione',
      coverAlt: 'Due mani e carte dei tarocchi su tema di riconciliazione',
      faq: [
        {
          q: 'I tarocchi garantiscono una riconciliazione?',
          a: 'No. Possono mostrare clima, disponibilità e ostacoli. La riconciliazione richiede fatti e responsabilità.',
        },
        {
          q: 'Quali carte suggeriscono riapertura?',
          a: 'Giudizio, Stella, 6 di Coppe, Temperanza possono parlare di ripresa — sempre nel contesto della stesa.',
        },
        {
          q: 'Meglio leggere subito dopo un litigio?',
          a: 'Meglio dopo un minimo di calma. A caldo rischi di proiettare e ripetere la stessa domanda.',
        },
      ],
      bodyHtml: `
<p>Chi cerca <strong>tarocchi riconciliazione</strong> vuole spesso una scadenza. Una lettura sana chiede invece: cosa dovrebbe cambiare perché un riavvicinamento sia sano?</p>
<h2>Cosa osservare</h2>
<ul>
  <li>C’è dialogo reale o solo desiderio?</li>
  <li>Le carte parlano di riparazione o di ripetizione dello stesso schema?</li>
  <li>Tu sei disposto/a a cambiare un comportamento, non solo “far tornare” l’altro?</li>
</ul>
<p>Vedi <a href="/blog/tarocchi-ex-e-ricongiungimento">ex e ricongiungimento</a>, <a href="/blog/significato-carta-il-giudizio">Il Giudizio</a>, <a href="/blog/significato-carta-la-temperanza">La Temperanza</a>.</p>
${expand({
  method: 'Struttura: (1) stato del legame, (2) lavoro tuo, (3) condizione necessaria. Se manca la condizione (rispetto, verità, sicurezza), la riconciliazione resta fantasia.',
  example: 'Temperanza + 5 di Bastoni + 2 di Coppe: possibile mediazione dopo conflitto, se si torna a una partnership vera. Azione: scusa specifica + proposta di regola condivisa, non solo “torniamo come prima”.',
  limits: 'Non riconciliare a ogni costo. Se c’è violenza o manipolazione, priorità alla sicurezza. Diffida di chi vende “rituali di ritorno”.',
  lux: 'Domanda: «Cosa serve perché una riconciliazione sia sana e quale passo dipende da me?».',
  exercise: 'Scrivi tre condizioni non negoziabili per un riavvicinamento. Confrontale con i fatti attuali. Agisci di conseguenza.',
})}
${related([
  ['/blog/tarocchi-ritorno-di-fiamma', 'Ritorno di fiamma'],
  ['/blog/tarocchi-separazione', 'Tarocchi e separazione'],
  ['/blog/stesa-tarocchi-amore', 'Stesa amore'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'differenza-tarocchi-e-oracolo',
      title: 'Differenza tra tarocchi e oracolo: quale scegliere',
      description:
        'Tarocchi e carte oracolo: differenze di struttura, linguaggio e uso. Quando preferire i 78 arcani e quando un mazzo oracolo.',
      keyword: 'differenza tarocchi e oracolo',
      coverAlt: 'Mazzo di tarocchi accanto a carte oracolo colorate',
      faq: [
        {
          q: 'I tarocchi sono un oracolo?',
          a: 'In senso ampio sì (strumento divinatorio/riflessivo), ma “oracolo” indica spesso mazzi non strutturati come i 78 tarocchi.',
        },
        {
          q: 'Quale è più facile per iniziare?',
          a: 'Molti trovano gli oracoli più immediati; i tarocchi offrono un sistema più ricco da studiare nel tempo.',
        },
        {
          q: 'Posso usarli insieme?',
          a: 'Sì, con metodo: una domanda, uno strumento per volta, per non confondere i messaggi.',
        },
      ],
      bodyHtml: `
<p>Capire la <strong>differenza tra tarocchi e oracolo</strong> aiuta a scegliere lo strumento giusto per la domanda che hai oggi — senza snobismo né confusioni di marketing.</p>
<h2>In breve</h2>
<ul>
  <li><strong>Tarocchi</strong>: 78 carte (22 Maggiori + 56 Minori), semi, numeri, archetipi codificati.</li>
  <li><strong>Oracolo</strong>: mazzi liberi (spesso 40–60 carte), messaggi più diretti o tematici, meno “grammatica” condivisa.</li>
</ul>
<h2>Cosa cambia in pratica</h2>
<p>Con i tarocchi lavori su dinamiche profonde e combinazioni. Con un oracolo spesso ricevi un consiglio più letterale o evocativo. Su Luxseetarot usiamo i <strong>tarocchi</strong>: ideali per mappe a tre carte.</p>
<p>Confronta anche <a href="/blog/differenza-cartomanzia-e-tarocchi">cartomanzia e tarocchi</a> e <a href="/blog/differenza-tarocchi-oroscopo">tarocchi e oroscopo</a>.</p>
${expand({
  method: 'Scegli in base all’intent: vuoi archetipi e struttura (tarocchi) o un messaggio flash (oracolo)? Allinea domanda e strumento, poi resta coerente per tutta la sessione.',
  example: 'Per “quale dinamiche tra noi?” i tarocchi con Papessa / Cavaliere / 2 di Spade descrivono ascolto, impulso e stallo. Un oracolo potrebbe dire “pazienta” in modo più diretto. Entrambi utili se non li tratti come prova assoluta.',
  limits: 'Nessuno strumento è “più vero”. Evita di mischiare tre mazzi nella stessa ansia. Non sostituiscono dialogo o professionisti.',
  lux: 'Prova i tarocchi gratis su Luxseetarot e valuta se il linguaggio ti parla. Se sì, approfondisci lo stesso estratto.',
  exercise: 'Scrivi la stessa domanda in versione “archetipo” e “consiglio diretto”. Scegli uno strumento solo e fai una lettura.',
})}
${related([
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/come-scegliere-un-mazzo-di-tarocchi', 'Scegliere un mazzo'],
  ['/blog/tarocchi-rider-waite', 'Tarocchi Rider-Waite'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-per-principianti-guida',
      title: 'Tarocchi per principianti: guida pratica per iniziare bene',
      description:
        'Guida tarocchi per principianti: da dove partire, cosa studiare prima, stese semplici e abitudini che evitano confusione.',
      keyword: 'tarocchi per principianti',
      coverAlt: 'Principiante che studia i tarocchi con mazzo e taccuino',
      faq: [
        {
          q: 'Devo memorizzare tutte e 78 le carte?',
          a: 'No all’inizio. Impara osservando immagini, fai una carta al giorno e costruisci significato con l’esperienza.',
        },
        {
          q: 'Quale stesa per iniziare?',
          a: 'Una o tre carte. Lascia la Croce Celtica a quando hai più dimestichezza.',
        },
        {
          q: 'Meglio Rider-Waite?',
          a: 'È un ottimo standard didattico perché le Minori sono illustrate. Non è l’unico mazzo valido.',
        },
      ],
      bodyHtml: `
<p>Una <strong>guida ai tarocchi per principianti</strong> dovrebbe togliere ansia, non aggiungerne: parti piccolo, resta costante, integra nella vita reale.</p>
<h2>Percorso in 6 passi</h2>
<ol>
  <li>Scegli un mazzo chiaro (es. tradizione <a href="/blog/tarocchi-rider-waite">Rider-Waite</a>).</li>
  <li>Impara <a href="/blog/arcani-maggiori-significato">Arcani Maggiori</a> e poi i <a href="/blog/i-quattro-semi-dei-tarocchi">semi</a>.</li>
  <li>Pratica <a href="/blog/tarocchi-carta-del-giorno">carta del giorno</a> + diario.</li>
  <li>Passa a <a href="/blog/lettura-tarocchi-tre-carte">tre carte</a>.</li>
  <li>Studia <a href="/blog/come-fare-una-domanda-ai-tarocchi">domande</a> e <a href="/blog/errori-comuni-lettura-tarocchi">errori comuni</a>.</li>
  <li>Solo dopo: stese più ampie.</li>
</ol>
<h2>Mindset</h2>
<ul>
  <li>Simbolo ≠ sentenza.</li>
  <li>Meno ripetizioni, più integrazione.</li>
  <li>Limiti etici da subito (salute, legale, spionaggio).</li>
</ul>
${expand({
  method: 'Per 30 giorni: una carta al giorno o una stesa breve a settimana. Annota. Non inseguire “la risposta giusta”: insegui pattern e azioni.',
  example: 'Settimana 1–2: Maggiori. Settimana 3: Coppe/Spade. Settimana 4: tre carte su una domanda pratica. Risultato: più sicurezza che memorizzando liste.',
  limits: 'Non comprare dieci mazzi subito. Non fare letture a pagamento per altri se non hai pratica ed etica. Se l’ansia sale, riduci frequenza.',
  lux: 'Allena l’occhio su Luxseetarot con tre carte gratis: confronta intuizione e testo, tieni solo ciò che è utile.',
  exercise: 'Scegli tre Maggiori che ti colpiscono. Scrivi per ciascuno: immagine / parola chiave / situazione reale collegata.',
})}
${related([
  ['/blog/come-leggere-i-tarocchi-da-soli', 'Leggere da soli'],
  ['/blog/come-fare-tarocchi-a-casa', 'Tarocchi a casa'],
  ['/blog/arcani-minori-cosa-sono', 'Arcani Minori'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-energia-della-settimana',
      title: 'Tarocchi energia della settimana: come fare una lettura utile',
      description:
        'Energia della settimana con i tarocchi: stesa semplice, domande e come trasformare il clima simbolico in azioni pratiche.',
      keyword: 'tarocchi energia della settimana',
      coverAlt: 'Agenda settimanale e carte dei tarocchi sul tavolo',
      faq: [
        {
          q: 'Quante carte per l’energia della settimana?',
          a: 'Tre funzionano bene: clima / attenzione / prossimo passo. Oppure una carta per tema (lavoro, amore, risorse).',
        },
        {
          q: 'Quando estrarre?',
          a: 'Di solito domenica sera o lunedì mattina. Poi non rifare ogni giorno la stessa domanda.',
        },
        {
          q: 'Serve per prevedere eventi precisi?',
          a: 'Meglio usarla come mappa di atteggiamenti e priorità, non come calendario magico.',
        },
      ],
      bodyHtml: `
<p>Leggere l’<strong>energia della settimana con i tarocchi</strong> è un rituale di orientamento: ti aiuta a scegliere dove mettere attenzione, non a controllare ogni ora.</p>
<h2>Stesa semplice (3 carte)</h2>
<ol>
  <li><strong>Clima</strong> — tono generale.</li>
  <li><strong>Attenzione</strong> — dove non distrarti.</li>
  <li><strong>Passo</strong> — un’azione entro mercoledì/venerdì.</li>
</ol>
<h2>Variante tematica</h2>
<p>Una carta lavoro, una relazioni, una risorse. Utile se la settimana è piena. Collega a <a href="/blog/tarocchi-carta-del-giorno">carta del giorno</a> solo come dettaglio, non come doppione ansioso.</p>
<p>Per abitudini: <a href="/blog/tarocchi-quotidiani-abitudine-consapevole">tarocchi quotidiani</a>.</p>
${expand({
  method: 'Scrivi prima tre impegni reali della settimana. Poi leggi le carte sopra quei fatti. Se il simbolo non tocca nulla di concreto, chiedi quale atteggiamento può migliorare un impegno già in agenda.',
  example: 'Clima: Luna. Attenzione: 8 di Denari. Passo: Asso di Spade. Sintesi: poca chiarezza, ma lavoro costante + bisogno di una decisione. Azione: chiudi una mail/scelta entro mercoledì.',
  limits: 'Non usare la lettura settimanale per evitare pianificazione reale. Non è previsioni meteo su persone. Se riformuli ogni sera, stai cercando controllo, non guida.',
  lux: 'Lunedì: tre carte gratis su Luxseetarot con la stesa clima/attenzione/passo. Venerdì: verifica solo i fatti, senza nuova estrazione sullo stesso tema.',
  exercise: 'Dopo la stesa, metti un reminder a metà settimana: “Ho fatto il passo?”. Rispondi sì/no. Solo allora valuta se approfondire.',
})}
${related([
  ['/blog/tarocchi-carta-del-giorno', 'Carta del giorno'],
  ['/blog/lettura-tarocchi-tre-carte', 'Lettura a tre carte'],
  ['/blog/quando-fare-una-lettura-dei-tarocchi', 'Quando fare una lettura'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-relazione-a-distanza',
      title: 'Tarocchi e relazione a distanza: chiarezza su tempi, fiducia e dialogo',
      description:
        'Tarocchi relazione a distanza: come leggere dinamiche di lontananza, comunicazione e progetto senza illusioni o ansia continua.',
      keyword: 'tarocchi relazione a distanza',
      coverAlt: 'Telefono, mappa e carte dei tarocchi su relazione a distanza',
      faq: [
        {
          q: 'I tarocchi dicono se la relazione a distanza funzionerà?',
          a: 'Possono mostrare risorse e tensioni. Il funzionamento dipende da accordo, comunicazione e piani concreti.',
        },
        {
          q: 'Quale stesa usare?',
          a: 'Tu / Altro / Ponte (comunicazione) oppure Blocco / Risorsa / Prossimo passo. Tre carte bastano.',
        },
        {
          q: 'Perché dopo le letture sto peggio?',
          a: 'Spesso perché cerchi certezza sull’altro. Porta il focus su accordi verificabili e autocura.',
        },
      ],
      bodyHtml: `
<p>Una <strong>lettura tarocchi su relazione a distanza</strong> funziona se parla di fiducia, ritmo di contatto e progetto — non se diventa un check quotidiano “mi ama ancora?”.</p>
<h2>Nodi tipici da esplorare</h2>
<ul>
  <li>Qualità della comunicazione (frequenza vs profondità).</li>
  <li>Progetto condiviso (visite, trasferimenti, tempi).</li>
  <li>Gelosia e fantasia vs fatti.</li>
  <li>Equilibrio tra vita locale e legame.</li>
</ul>
<p>Utile: <a href="/blog/tarocchi-amore-domande-esempi">domande in amore</a>, <a href="/blog/lettura-tarocchi-a-distanza">lettura a distanza</a> (come servizio), <a href="/blog/tarocchi-gelosia">gelosia</a>.</p>
${expand({
  method: 'Chiedi “cosa sostiene il ponte tra noi?” più che “cosa pensa”. In stesa, una carta sul piano pratico (Denari/Bastoni) vale quanto una sulle emozioni.',
  example: '2 di Bastoni + Cavaliere di Coppe + 7 di Spade: visione futura + affetto + rischio di non-detto. Azione: call su aspettative e date di visita, non solo sweet messages.',
  limits: 'Le carte non sostituiscono accordi espliciti. Non spiare. Se la distanza nasconde dinamiche tossiche, valuta con onestà fuori dal mazzo.',
  lux: 'Domanda Luxseetarot: «Quale dinamica della nostra distanza posso chiarire e quale passo concreto rafforza fiducia?».',
  exercise: 'Scrivi tre accordi desiderati (es. frequenza call, visite, onestà su uscite). Condividine uno in conversazione questa settimana.',
})}
${related([
  ['/blog/stesa-tarocchi-amore', 'Stesa tarocchi amore'],
  ['/blog/tarocchi-cosa-pensa-di-me', 'Cosa pensa di me (riformulare)'],
  ['/blog/significato-tarocchi-amore', 'Tarocchi in amore'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'cartomanzia-gratis',
      title: 'Cartomanzia gratis: come funziona e come usarla bene',
      description:
        'Cartomanzia gratis online: cosa aspettarsi da un’anteprima gratuita, limiti, red flag e come partire con i tarocchi su Luxseetarot.',
      keyword: 'cartomanzia gratis',
      coverAlt: 'Smartphone con cartomanzia gratis e carte sul tavolo',
      faq: [
        {
          q: 'La cartomanzia gratis è affidabile?',
          a: 'Può essere un buon inizio se è trasparente e non spinge paura. Affidabile non significa infallibile.',
        },
        {
          q: 'Cartomanzia gratis e tarocchi gratis sono la stessa cosa?',
          a: 'Spesso si cercano come sinonimi. Su Luxseetarot offriamo tarocchi (sistema a 78 carte) in anteprima gratuita.',
        },
        {
          q: 'Devo pagare dopo?',
          a: 'Solo se vuoi approfondire e ti sembra utile. Diffida di chi crea urgenza o paura per farti pagare subito.',
        },
      ],
      bodyHtml: `
<p>Cercare <strong>cartomanzia gratis</strong> significa spesso voler chiarire un nodo senza impegno economico iniziale. Funziona meglio se sai cosa può dare un’anteprima e cosa no.</p>
<h2>Cosa aspettarti</h2>
<ul>
  <li>Una mappa simbolica breve (es. tre carte).</li>
  <li>Ipotesi sul clima, non certezze sul futuro.</li>
  <li>Un invito a un’azione concreta sotto il tuo controllo.</li>
</ul>
<h2>Come usarla bene</h2>
<ol>
  <li>Domanda aperta e circoscritta.</li>
  <li>Una sola sessione sul tema, poi integra.</li>
  <li>Leggi disclaimer: niente salute/legale come oracolo.</li>
  <li>Valuta se il testo ti restituisce chiarezza o dipendenza.</li>
</ol>
<p>Approfondisci <a href="/blog/cartomanzia-online">cartomanzia online</a>, <a href="/blog/tarocchi-gratis-online-come-funzionano">tarocchi gratis online</a> e <a href="/blog/lettura-tarocchi-online-affidabile">lettura online affidabile</a>.</p>
${expand({
  method: 'Tratta la cartomanzia gratis come bozza: annota una frase centrale e un gesto. Se vuoi dettaglio, approfondisci lo stesso estratto invece di ricominciare da zero con la stessa ansia.',
  example: 'Anteprima su “dinamica con X”: Luna, 2 di Spade, Stella. Sintesi: confusione, stallo, bisogno di speranza realistica. Azione: una conversazione o una pausa dai controlli — non tre nuove letture gratis di fila.',
  limits: 'Gratis non significa “senza etica”. Evita siti che spaventano per vendere sblocchi. Le carte non garantiscono ritorni o soldi.',
  lux: 'Su Luxseetarot parti dai <a href="/tarocchi-gratis.html">tarocchi gratis</a>: tre carte, linguaggio chiaro, possibilità di approfondire solo se ti parla.',
  exercise: 'Dopo l’anteprima, dai un voto 1–5 a chiarezza e utilità. Sotto 3: cambia domanda o aspetta fatti nuovi prima di riprovare.',
})}
${related([
  ['/blog/differenza-cartomanzia-e-tarocchi', 'Differenza cartomanzia e tarocchi'],
  ['/blog/tarocchi-online-come-scegliere', 'Come scegliere tarocchi online'],
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda'],
])}
${CTA}
`.trim(),
    }),
  ];
}
