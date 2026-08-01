/**
 * Secondo lotto articoli blog (temi non sovrapposti al catalogo A).
 * Include link interni agli articoli correlati.
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

const CTA = `<p><a href="/">Prova una lettura a tre carte su Luxseetarot →</a></p>`;

function related(items) {
  if (!items || !items.length) return '';
  return `<h2>Approfondisci</h2><ul>${items
    .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`)
    .join('')}</ul>`;
}

export function getSeedArticlesB() {
  return [
    article({
      slug: 'significato-carta-la-morte',
      title: 'Carta La Morte nei tarocchi: significato di trasformazione',
      description:
        'Significato della carta La Morte: fine di un ciclo, rinascita e come leggerla senza panico in amore, lavoro e scelte.',
      keyword: 'significato carta la morte tarocchi',
      coverAlt: 'Foglie autunnali e carta dei tarocchi su legno scuro',
      faq: [
        {
          q: 'La Morte annuncia un lutto reale?',
          a: 'Quasi mai in senso letterale. Nei tarocchi indica soprattutto chiusura di un ciclo e trasformazione.',
        },
        {
          q: 'È una carta negativa?',
          a: 'È intensa, non “cattiva”. Spesso liberatoria se qualcosa era già finito dentro di te.',
        },
        {
          q: 'Cosa fare se esce in una lettura?',
          a: 'Chiediti cosa sta terminando e cosa può nascere dopo. Evita di forzare a restare uguale per paura.',
        },
      ],
      bodyHtml: `
<p><strong>La Morte</strong> è tra le carte più fraintese. Non predice una tragedia: parla di passaggio. Ciò che non può più continuare lascia spazio a una forma nuova.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Fine di un ciclo (relazione, ruolo, abitudine, identità).</li>
  <li>Trasformazione irreversibile: non si torna indietro uguali.</li>
  <li>Necessità di lasciare andare per rinnovarsi.</li>
  <li>Pulizia energetica da legami o progetti esauriti.</li>
</ul>
<h2>In amore, lavoro, scelte</h2>
<p>In amore può indicare la fine di una fase o di un’illusione, non sempre della persona. Nel lavoro spesso segna un cambio di pelle professionale. Nelle scelte personali invita a non rimandare un addio già maturo.</p>
<p>Se compare nel futuro di uno <a href="/blog/lettura-tarocchi-tre-carte">spread a tre carte</a>, non è una condanna: è un invito a collaborare col cambiamento invece di resistergli.</p>
<h2>Domande utili</h2>
<ul>
  <li>Cosa in me sta già morendo e cosa vuole nascere?</li>
  <li>Sto trattenendo per amore o per paura del vuoto?</li>
  <li>Quale piccolo rito di chiusura posso fare questa settimana?</li>
</ul>
${related([
  ['/blog/significato-carta-la-torre', 'Carta La Torre: rotture e verità improvvise'],
  ['/blog/tarocchi-cambiamento-e-trasformazione', 'Tarocchi e cambiamento: leggere i passaggi di vita'],
  ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni nella lettura dei tarocchi'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-il-sole',
      title: 'Carta Il Sole nei tarocchi: chiarezza, vitalità e successo',
      description:
        'Significato della carta Il Sole: gioia autentica, visibilità e come interpretarla senza ingenuità in una lettura.',
      keyword: 'significato carta il sole tarocchi',
      coverAlt: 'Luce dorata del sole su carte dei tarocchi',
      faq: [
        {
          q: 'Il Sole garantisce che andrà tutto bene?',
          a: 'Indica un clima favorevole e più chiarezza, non un’immunità dai problemi.',
        },
        {
          q: 'Può uscire anche in momenti difficili?',
          a: 'Sì: a volte segnala la luce dopo la nebbia, o ciò che resta vero e vitale nonostante tutto.',
        },
        {
          q: 'Cosa chiedere se esce Il Sole?',
          a: 'Dove posso essere più autentico/a? Cosa merita di essere mostrato senza nascondermi?',
        },
      ],
      bodyHtml: `
<p><strong>Il Sole</strong> parla di chiarezza, calore e vitalità. È una delle carte più luminose, ma non significa “tutto facile senza impegno”: indica condizioni in cui la verità e l’energia possono circolare.</p>
<h2>Cosa rappresenta</h2>
<ul>
  <li>Visibilità e riconoscimento.</li>
  <li>Gioia semplice, non forzata.</li>
  <li>Guarigione dal dubbio eccessivo.</li>
  <li>Successo che arriva quando smetti di nasconderti.</li>
</ul>
<h2>Come leggerlo nel contesto</h2>
<p>Accanto a carte di conflitto può indicare risoluzione. Accanto a carte di inizio (come <a href="/blog/significato-carta-il-matto">Il Matto</a>) suggerisce un avvio fortunato se resti genuino. In amore parla di apertura e calore; nel lavoro di risultati visibili o di un clima più sereno.</p>
<p>Attenzione all’ombra del Sole: ottimismo cieco. La carta invita alla lucidità solare, non a negare i dettagli pratici.</p>
${related([
  ['/blog/significato-carta-la-luna', 'Carta La Luna: intuizione e illusioni'],
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori: ruolo in una lettura'],
  ['/blog/tarocchi-futuro-prossimo', 'Tarocchi e futuro prossimo'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-la-luna',
      title: 'Carta La Luna nei tarocchi: intuito, paure e illusioni',
      description:
        'Significato della carta La Luna: soglie dell’inconscio, confusione emotiva e come usarla per vedere più chiaro.',
      keyword: 'significato carta la luna tarocchi',
      coverAlt: 'Luna e riflessi d’acqua con atmosfera mistica',
      faq: [
        {
          q: 'La Luna significa che mi stanno mentendo?',
          a: 'Può indicare mancanza di chiarezza, non sempre una menzogna deliberata. A volte sei tu a non voler vedere.',
        },
        {
          q: 'È collegata ai sogni?',
          a: 'Sì, simbolicamente: sogni, intuizioni, paure notturne e contenuti non ancora consapevoli.',
        },
        {
          q: 'Cosa fare se esce La Luna?',
          a: 'Rallenta le decisioni definitive. Raccogli indizi, ascolta il corpo, verifica i fatti.',
        },
      ],
      bodyHtml: `
<p><strong>La Luna</strong> abita la zona grigia: intuito potente e rischio di proiezione. È la carta della nebbia emotiva, dei segnali sottili e delle paure che distorcono.</p>
<h2>Nucleo</h2>
<ul>
  <li>Incertezza e informazioni incomplete.</li>
  <li>Intuizione vera mescolata ad ansia.</li>
  <li>Illusioni, idealizzazioni, ombre.</li>
  <li>Bisogno di tempo prima di concludere.</li>
</ul>
<h2>In pratica</h2>
<p>In amore può segnalare attrazione intensa ma poco chiara, o gelosia che crea scenari. Nel lavoro invita a non firmare sulla base di voci. Se stai allenando <a href="/blog/tarocchi-e-intuito">tarocchi e intuito</a>, La Luna dice: ascolta, ma verifica.</p>
<p>Contrasta bene con <a href="/blog/significato-carta-il-sole">Il Sole</a>: dalla nebbia alla chiarezza è un percorso, non un click.</p>
${related([
  ['/blog/tarocchi-e-sogni', 'Tarocchi e sogni: come leggerli insieme'],
  ['/blog/tarocchi-e-ansia-usarli-bene', 'Tarocchi e ansia: come usarli senza peggiorare'],
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda ai tarocchi'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-limperatrice',
      title: 'Carta L’Imperatrice: cura, creatività e abbondanza',
      description:
        'Significato dell’Imperatrice nei tarocchi: fertilità creativa, nutrimento e senso pratico del prendersi cura.',
      keyword: 'significato carta imperatrice tarocchi',
      coverAlt: 'Fiori, frutta e carta dei tarocchi in luce calda',
      faq: [
        {
          q: 'L’Imperatrice indica una gravidanza?',
          a: 'Può simbolizzare creazione e fertilità in senso ampio: progetti, cura, crescita. Non è una diagnosi.',
        },
        {
          q: 'Cosa significa se è “bloccata” da altre carte?',
          a: 'Che la cura o la creatività ci sono, ma mancano tempo, risorse o permesso di riceverle.',
        },
        {
          q: 'Come usarla nel quotidiano?',
          a: 'Chiediti cosa nutre davvero la tua energia e cosa invece ti prosciuga fingendo di essere “dovere”.',
        },
      ],
      bodyHtml: `
<p><strong>L’Imperatrice</strong> è la carta del nutrire: corpi, idee, relazioni, ambienti. Parla di bellezza utile, non solo decorativa — di ciò che fa crescere.</p>
<h2>Temi chiave</h2>
<ul>
  <li>Creatività che diventa forma concreta.</li>
  <li>Cura di sé e degli altri senza annullarsi.</li>
  <li>Abbondanza come flusso, non come accumulo ansioso.</li>
  <li>Sensualità e piacere sano di esistere.</li>
</ul>
<h2>In lettura</h2>
<p>In amore può indicare calore e generosità emotiva. Nel lavoro, progetti che hanno bisogno di tempo per maturare. Se compare dopo carte di crisi, spesso invita a ricostruire con gentilezza e concretezza.</p>
<p>Si bilancia con <a href="/blog/significato-carta-limperatore">L’Imperatore</a>: cura e struttura insieme funzionano meglio di sola dolcezza o solo controllo.</p>
${related([
  ['/blog/significato-carta-limperatore', 'Carta L’Imperatore: struttura e responsabilità'],
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori: significato generale'],
  ['/blog/significato-tarocchi-amore', 'Tarocchi in amore: dinamiche'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-limperatore',
      title: 'Carta L’Imperatore: struttura, confini e responsabilità',
      description:
        'Significato dell’Imperatore nei tarocchi: autorità sana, regole utili e quando il controllo diventa rigidità.',
      keyword: 'significato carta imperatore tarocchi',
      coverAlt: 'Scrivania ordinata con carta dei tarocchi e luce ferma',
      faq: [
        {
          q: 'L’Imperatore è una figura maschile obbligatoria?',
          a: 'È un’energia di struttura e responsabilità, non un genere biologico. Può riguardare te, un ruolo o un sistema.',
        },
        {
          q: 'Quando diventa negativo?',
          a: 'Quando il controllo soffoca, i confini diventano muri e la paura guida ogni regola.',
        },
        {
          q: 'Cosa suggerisce in una decisione?',
          a: 'Metodo, piano, responsabilità. Meno improvvisazione, più chiarezza su chi fa cosa.',
        },
      ],
      bodyHtml: `
<p><strong>L’Imperatore</strong> costruisce. Dove L’Imperatrice nutre, lui organizza: confini, regole, protezione, piano. È l’energia del “ci penso io” — utile se matura, oppressiva se rigida.</p>
<h2>Letture tipiche</h2>
<ul>
  <li>Bisogno di ordine dopo il caos.</li>
  <li>Figura di autorità (capo, genitore interiore, istituzioni).</li>
  <li>Assunzione di responsabilità su un progetto.</li>
  <li>Richiesta di confini chiari in una relazione.</li>
</ul>
<p>Nel lavoro è spesso alleato: struttura, leadership, risultati. In amore può indicare stabilità… o controllo eccessivo. Confrontalo sempre con la tua domanda, come spieghiamo in <a href="/blog/come-interpretare-i-tarocchi">come interpretare i tarocchi</a>.</p>
${related([
  ['/blog/significato-carta-limperatrice', 'Carta L’Imperatrice: cura e creatività'],
  ['/blog/tarocchi-lavoro-carriera', 'Tarocchi e lavoro'],
  ['/blog/tarocchi-e-decisioni-difficili', 'Tarocchi e decisioni difficili'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-e-decisioni-difficili',
      title: 'Tarocchi e decisioni difficili: un metodo in 4 passi',
      description:
        'Come usare i tarocchi per decisioni difficili senza delegare la scelta alle carte: metodo pratico e domande utili.',
      keyword: 'tarocchi decisioni difficili',
      coverAlt: 'Due strade e una carta dei tarocchi al bivio',
      faq: [
        {
          q: 'Le carte possono decidere al posto mio?',
          a: 'No. Possono chiarire criteri, paure e conseguenze simboliche. La scelta resta tua.',
        },
        {
          q: 'Meglio uno spread speciale?',
          a: 'Per iniziare basta tre carte: cosa guadagno, cosa perdo, cosa mi sostiene scegliendo con integrità.',
        },
        {
          q: 'E se restano ambigue?',
          a: 'Spesso significa che mancano informazioni reali. Allora la prossima “carta” è un fatto da verificare nella vita.',
        },
      ],
      bodyHtml: `
<p>Usare i <strong>tarocchi per una decisione difficile</strong> ha senso se vuoi lucidità, non se cerchi qualcuno (o qualcosa) che scelga al posto tuo.</p>
<h2>Metodo in 4 passi</h2>
<ol>
  <li><strong>Scrivi le opzioni</strong> A e B in modo concreto.</li>
  <li><strong>Formula una domanda aperta</strong> (evita il puro sì/no: vedi anche <a href="/blog/tarocchi-si-o-no">tarocchi sì o no</a>).</li>
  <li><strong>Leggi criteri, non verdetti</strong>: valori, costi, energia.</li>
  <li><strong>Decidi un’azione piccola</strong> entro 48 ore.</li>
</ol>
<h2>Domande che funzionano</h2>
<ul>
  <li>Cosa mi insegna l’opzione A su di me?</li>
  <li>Quale paura sta guidando l’opzione B?</li>
  <li>Cosa resta vero di me in entrambe le strade?</li>
</ul>
<p>Su Luxseetarot puoi fare una <a href="/blog/lettura-tarocchi-tre-carte">lettura a tre carte</a> centrata sulla decisione, poi approfondire il nodo che emerge.</p>
${related([
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda ai tarocchi'],
  ['/blog/significato-carta-gli-amanti', 'Gli Amanti: la carta della scelta'],
  ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Cosa fare dopo una lettura'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-per-single',
      title: 'Tarocchi per single: chiarezza su di te (non solo sull’altro)',
      description:
        'Come usare i tarocchi da single: autostima, schemi, apertura all’incontro e domande che evitano l’ossessione sul “quando arriva”.',
      keyword: 'tarocchi per single',
      coverAlt: 'Una tazza e una carta dei tarocchi in luce mattutina',
      faq: [
        {
          q: 'Posso chiedere quando arriverà l’amore?',
          a: 'Meglio chiedere cosa ti rende pronto/a e quale energia stai emanando. Le date certe deludono.',
        },
        {
          q: 'I tarocchi aiutano se ho paura di legarmi?',
          a: 'Sì, se usati per vedere lo schema (controllo, fuga, idealizzazione) e non per forzare un incontro.',
        },
        {
          q: 'Una lettura al mese basta?',
          a: 'Spesso sì. Tra una e l’altra vivi, sperimenta, osserva i fatti.',
        },
      ],
      bodyHtml: `
<p>I <strong>tarocchi per single</strong> funzionano meglio quando smettono di essere un radar sull’anima gemella e diventano uno specchio: chi sei ora, cosa cerchi davvero, cosa ripeti.</p>
<h2>Focus utili</h2>
<ul>
  <li>Schemi di attrazione (sempre lo stesso tipo di dinamica).</li>
  <li>Confini e autostima.</li>
  <li>Apertura reale vs fantasia romantica.</li>
  <li>Tempo di guarigione dopo un ex (senza fissarti sul ritorno: vedi <a href="/blog/tarocchi-ex-e-ricongiungimento">tarocchi sull’ex</a>).</li>
</ul>
<h2>Domande consigliate</h2>
<ul>
  <li>Quale qualità sto coltivando per un incontro sano?</li>
  <li>Cosa mi fa restare in stand-by emotivo?</li>
  <li>Dove confondo solitudine e indipendenza?</li>
</ul>
<p>Per esempi più ampi sul tema affettivo, puoi anche guardare le <a href="/blog/tarocchi-amore-domande-esempi">20 domande utili in amore</a>.</p>
${related([
  ['/blog/significato-tarocchi-amore', 'Significato dei tarocchi in amore'],
  ['/blog/tarocchi-amore-domande-esempi', 'Domande tarocchi amore: esempi'],
  ['/blog/quando-fare-una-lettura-dei-tarocchi', 'Quando fare una lettura'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-amicizia-e-rapporti',
      title: 'Tarocchi e amicizia: leggere i rapporti oltre l’amore romantico',
      description:
        'Come usare i tarocchi per amicizie e rapporti: fiducia, distanza, alleanze e conversazioni difficili.',
      keyword: 'tarocchi amicizia',
      coverAlt: 'Due tazze di tè e carte dei tarocchi su un tavolo',
      faq: [
        {
          q: 'Ha senso fare i tarocchi su un amico?',
          a: 'Sì se punti alla dinamica e al tuo ruolo, non a spiargli la vita privata.',
        },
        {
          q: 'Possono indicare un’amicizia tossica?',
          a: 'Possono evidenziare squilibri, dipendenza o mancanza di rispetto reciproco. Poi servono fatti e dialogo.',
        },
        {
          q: 'Quale domanda è migliore?',
          a: '“Come posso stare in questo rapporto in modo sano?” funziona meglio di “Cosa pensa di me?”.',
        },
      ],
      bodyHtml: `
<p>Non tutto è romantico. I <strong>tarocchi sull’amicizia</strong> aiutano a leggere fiducia, reciprocità, gelosie silenziose e alleanze che cambiano stagione.</p>
<h2>Quando consultarli</h2>
<ul>
  <li>Senti un raffreddamento e non sai se parlarne.</li>
  <li>Un’amicizia ti carica o ti svuota.</li>
  <li>Stai entrando in un gruppo nuovo (lavoro, casa, comunità).</li>
</ul>
<h2>Cosa osservare</h2>
<p>Le Coppe parlano di affetto; le Spade di verità scomode; i Denari di sostegno pratico; i Bastoni di progetti condivisi. Gli <a href="/blog/arcani-minori-cosa-sono">Arcani Minori</a> qui sono preziosi perché raccontano il quotidiano del legame.</p>
<p>Evita di usare le carte per controllare l’altro: usa la lettura per decidere come muoverti tu — con chiarezza e rispetto.</p>
${related([
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come formulare una domanda chiara'],
  ['/blog/arcani-minori-cosa-sono', 'Arcani Minori: i semi in sintesi'],
  ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni da evitare'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-soldi-e-risorse',
      title: 'Tarocchi, soldi e risorse: orientamento (non previsioni finanziarie)',
      description:
        'Come leggere i tarocchi su soldi e risorse con realismo: mentalità, blocchi, priorità. Non sono consulenza finanziaria.',
      keyword: 'tarocchi soldi',
      coverAlt: 'Monete simboliche e carta dei tarocchi su legno',
      faq: [
        {
          q: 'I tarocchi mi dicono se investirò bene?',
          a: 'No come consulenza finanziaria. Possono riflettere paure, impulsi e rapporto col valore. Per i soldi reali serve competenza adeguata.',
        },
        {
          q: 'Quali carte parlano di risorse?',
          a: 'Spesso i Denari/Pentacoli, ma anche Maggiori legati a struttura, rischio e maturazione.',
        },
        {
          q: 'Che domanda fare?',
          a: '“Quale atteggiamento mi aiuta a gestire meglio le risorse ora?” è più utile di “Diventerò ricco?”.',
        },
      ],
      bodyHtml: `
<p>Consultare i <strong>tarocchi su soldi e risorse</strong> può essere utile per capire mentalità, priorità e blocchi — non per ottenere previsioni di mercato o consigli di investimento.</p>
<p><em>Disclaimer:</em> Luxseetarot offre intrattenimento e riflessione. Non è consulenza finanziaria, fiscale o legale.</p>
<h2>Cosa le carte possono chiarire</h2>
<ul>
  <li>Rapporto emotivo col denaro (paura, controllo, spreco, vergogna).</li>
  <li>Se stai sottovalutando risorse non monetarie (tempo, competenze, rete).</li>
  <li>Se un progetto ha basi concrete o solo desiderio.</li>
</ul>
<h2>Domande sane</h2>
<ul>
  <li>Dove sto dissipando energie che potrei convertire in valore?</li>
  <li>Quale abitudine materiale mi conviene rivedere?</li>
  <li>Cosa mi frena dal chiedere ciò che valgo?</li>
</ul>
<p>Per il lavoro in senso stretto, vedi anche la guida ai <a href="/blog/tarocchi-lavoro-carriera">tarocchi e carriera</a>.</p>
${related([
  ['/blog/tarocchi-lavoro-carriera', 'Tarocchi e lavoro'],
  ['/blog/arcani-minori-cosa-sono', 'Arcani Minori e semi'],
  ['/blog/tarocchi-online-come-scegliere', 'Come scegliere un servizio online'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'come-mescolare-e-scegliere-le-carte',
      title: 'Come mescolare e scegliere le carte dei tarocchi',
      description:
        'Guida pratica a mescolare, tagliare e scegliere le carte: rituali semplici, focus e errori da evitare.',
      keyword: 'come mescolare le carte dei tarocchi',
      coverAlt: 'Mani che mescolano un mazzo di tarocchi',
      faq: [
        {
          q: 'Esiste un modo “corretto” di mescolare?',
          a: 'Esiste un modo consapevole: mentre mescoli tieni la domanda in mente. La tecnica può essere quella che ti è comoda.',
        },
        {
          q: 'Devo far tagliare il mazzo?',
          a: 'È facoltativo. Serve come gesto di intenzione, non come regola magica obbligatoria.',
        },
        {
          q: 'Online come funziona?',
          a: 'Su Luxseetarot scegli le carte dall’interfaccia: il focus resta sulla domanda e sull’intenzione, non sul mescolare fisico.',
        },
      ],
      bodyHtml: `
<p>Molti si chiedono <strong>come mescolare e scegliere le carte</strong> “nel modo giusto”. La buona notizia: conta più l’attenzione che il rito complicato.</p>
<h2>Sequenza semplice</h2>
<ol>
  <li>Scrivi la domanda (vedi <a href="/blog/come-fare-una-domanda-ai-tarocchi">come fare una domanda</a>).</li>
  <li>Respira e mescola finché senti di fermarti.</li>
  <li>Taglia il mazzo se ti aiuta a “chiudere” l’intenzione.</li>
  <li>Estrai il numero di carte dello spread (es. tre).</li>
</ol>
<h2>Errori tipici</h2>
<ul>
  <li>Mescolare distratti guardando il telefono.</li>
  <li>Rifare l’estrazione finché non “piace”.</li>
  <li>Credere che un rito lungo sostituisca una domanda chiara.</li>
</ul>
<p>In digitale, il gesto cambia ma il principio no: presenza + domanda + lettura d’insieme. Poi, se serve, approfondisci senza ricominciare da zero.</p>
${related([
  ['/blog/lettura-tarocchi-tre-carte', 'Lettura a tre carte'],
  ['/blog/preparazione-prima-di-una-lettura', 'Preparazione prima di una lettura'],
  ['/blog/tarocchi-gratis-online-come-funzionano', 'Tarocchi gratis online: come funzionano'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'carte-tarocchi-rovesciate',
      title: 'Carte dei tarocchi rovesciate: come leggerle (e quando ignorarle)',
      description:
        'Significato delle carte rovesciate nei tarocchi: blocchi, internalizzazione e alternative se non usi le inversioni.',
      keyword: 'tarocchi carte rovesciate',
      coverAlt: 'Carta dei tarocchi capovolta su tessuto scuro',
      faq: [
        {
          q: 'Devo per forza usare le carte rovesciate?',
          a: 'No. Molti lettori lavorano solo con carte diritte e leggono i “blocchi” dal contesto dello spread.',
        },
        {
          q: 'Rovesciata = significato opposto?',
          a: 'Non sempre. Spesso è energia bloccata, eccessiva, interiorizzata o ritardata.',
        },
        {
          q: 'Online le vedo rovesciate?',
          a: 'Dipende dal sistema. Su Luxseetarot il focus è sul significato contestuale del testo, non sull’obbligo dell’inversione.',
        },
      ],
      bodyHtml: `
<p>Le <strong>carte rovesciate</strong> (o invertite) sono un linguaggio opzionale. Alcuni le amano; altri le trovano ridondanti. Entrambe le scelte sono legittime se sei coerente.</p>
<h2>Tre modi di leggerle</h2>
<ul>
  <li><strong>Blocco</strong>: l’energia c’è ma non fluisce.</li>
  <li><strong>Eccesso</strong>: troppa di quella qualità.</li>
  <li><strong>Interiorizzazione</strong>: il tema è più interno che visibile fuori.</li>
</ul>
<h2>Se non le usi</h2>
<p>Puoi comunque vedere resistenze dalle combinazioni e dalle posizioni. Una carta “difficile” nel presente, o un contrasto tra passato e futuro, racconta già il nodo — come in <a href="/blog/come-interpretare-i-tarocchi">come interpretare i tarocchi</a>.</p>
<p>Regola d’oro: non raddoppiare la paura. Una rovesciata non è una condanna; è un dettaglio sul <em>come</em> l’energia si sta esprimendo.</p>
${related([
  ['/blog/combinazioni-di-carte-tarocchi', 'Combinazioni di carte: leggere l’insieme'],
  ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni in lettura'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'combinazioni-di-carte-tarocchi',
      title: 'Combinazioni di carte nei tarocchi: leggere l’insieme',
      description:
        'Come leggere le combinazioni tra carte: conferme, contrasti, sequenze e esempi pratici in uno spread a tre.',
      keyword: 'combinazioni carte tarocchi',
      coverAlt: 'Tre carte dei tarocchi affiancate in sequenza',
      faq: [
        {
          q: 'Esiste un dizionario ufficiale delle combinazioni?',
          a: 'Ci sono tradizioni e suggerimenti, ma il contesto della domanda conta più di una lista fissa.',
        },
        {
          q: 'Due carte “opposte” si annullano?',
          a: 'Di solito no: creano tensione da risolvere. Quella tensione è il messaggio.',
        },
        {
          q: 'Come esercitarsi?',
          a: 'Prendi tre carte e scrivi una frase che le colleghi: causa → ora → tendenza.',
        },
      ],
      bodyHtml: `
<p>Interpretare le <strong>combinazioni di carte</strong> è ciò che trasforma un elenco di significati in una storia utile.</p>
<h2>Tre relazioni base</h2>
<ul>
  <li><strong>Conferma</strong>: le carte dicono la stessa cosa con parole diverse.</li>
  <li><strong>Contrasto</strong>: tirano in direzioni opposte (desiderio vs paura, apertura vs controllo).</li>
  <li><strong>Sequenza</strong>: mostrano un’evoluzione nel tempo (tipica dello <a href="/blog/lettura-tarocchi-tre-carte">spread a tre carte</a>).</li>
</ul>
<h2>Esempio rapido</h2>
<p>Passato di idealizzazione + presente di dubbio + futuro di chiarezza: non è “amore finito”, è “stai smettendo di sognare a occhi aperti”. Il significato nasce dal legame, non dalla singola carta.</p>
<p>Se escono tanti Maggiori, alza l’attenzione al tema di vita (vedi <a href="/blog/arcani-maggiori-significato">Arcani Maggiori</a>). Se dominano i Minori, scendi nel dettaglio quotidiano.</p>
${related([
  ['/blog/come-interpretare-i-tarocchi', 'Metodo di interpretazione'],
  ['/blog/arcani-minori-cosa-sono', 'Arcani Minori'],
  ['/blog/lettura-tarocchi-tre-carte', 'Passato, presente, futuro'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'preparazione-prima-di-una-lettura',
      title: 'Preparazione prima di una lettura dei tarocchi',
      description:
        'Come prepararti prima di una lettura: spazio, respirazione, domanda scritta e stato d’animo adatto.',
      keyword: 'preparazione lettura tarocchi',
      coverAlt: 'Candela e mazzo di tarocchi pronti per la lettura',
      faq: [
        {
          q: 'Serve un altare o oggetti speciali?',
          a: 'No. Servono pochi minuti di presenza e una domanda chiara. Il resto è facoltativo.',
        },
        {
          q: 'Posso leggere se sono di fretta?',
          a: 'Meglio rimandare. Una lettura frettolosa aumenta i fraintendimenti.',
        },
        {
          q: 'Online la preparazione cambia?',
          a: 'Il rituale è più corto, ma vale lo stesso: silenzio relativo, domanda scritta, niente multitasking.',
        },
      ],
      bodyHtml: `
<p>La <strong>preparazione prima di una lettura</strong> non è superstizione: è igiene mentale. Decide se ascolterai le carte o solo la tua ansia.</p>
<h2>Checklist di 3 minuti</h2>
<ol>
  <li>Silenzia notifiche.</li>
  <li>Scrivi la domanda in una riga.</li>
  <li>Tre respiri lenti.</li>
  <li>Chiediti: sto cercando chiarezza o solo conferma?</li>
</ol>
<p>Se sei agitata/o, magari non è il momento: vedi anche <a href="/blog/quando-fare-una-lettura-dei-tarocchi">quando fare una lettura</a> e <a href="/blog/tarocchi-e-ansia-usarli-bene">tarocchi e ansia</a>.</p>
<h2>Ambiente</h2>
<p>Luce soffusa, tavolo libero, bicchiere d’acqua: utili ma non magici. L’elemento non negoziabile è l’attenzione.</p>
${related([
  ['/blog/come-mescolare-e-scegliere-le-carte', 'Come mescolare e scegliere le carte'],
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda'],
  ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Cosa fare dopo la lettura'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-e-ansia-usarli-bene',
      title: 'Tarocchi e ansia: come usarli senza peggiorare',
      description:
        'Se l’ansia spinge a consultare i tarocchi di continuo, ecco regole pratiche per non trasformarli in un loop di controllo.',
      keyword: 'tarocchi e ansia',
      coverAlt: 'Mani che trattengono una carta dei tarocchi con calma',
      faq: [
        {
          q: 'Perché l’ansia mi fa rifare la stessa lettura?',
          a: 'Perché cerca certezza immediata. Le carte però offrono simboli, non un’ancora anti-panico permanente.',
        },
        {
          q: 'Devo smettere del tutto?',
          a: 'Non necessariamente. Metti regole: una lettura sul tema, poi pausa e azioni reali.',
        },
        {
          q: 'Cosa fare al posto della quinta estrazione?',
          a: 'Camminare, scrivere, parlare con qualcuno di fiducia, verificare un fatto concreto.',
        },
      ],
      bodyHtml: `
<p><strong>Tarocchi e ansia</strong> possono convivere male: la consultazione diventa un modo per calmarsi due minuti e poi riattivare il dubbio. Si può invertire la rotta.</p>
<h2>Regole anti-loop</h2>
<ul>
  <li>Una domanda = una lettura.</li>
  <li>Niente “rifaccio finché non mi piace”.</li>
  <li>Dopo la lettura, un’azione concreta entro 24 ore.</li>
  <li>Se il cuore batte fortissimo, rimanda (preparazione e timing contano).</li>
</ul>
<h2>Domande che riducono l’ansia</h2>
<ul>
  <li>Cosa posso controllare io in questa situazione?</li>
  <li>Quale pensiero sto nutrendo senza prove?</li>
  <li>Di cosa ho bisogno per stare più stabile oggi?</li>
</ul>
<p>Evita le domande sul controllo totale dell’altro e le date assolute. Se riconosci gli <a href="/blog/errori-comuni-lettura-tarocchi">errori comuni</a>, hai già fatto mezzo lavoro.</p>
${related([
  ['/blog/quando-fare-una-lettura-dei-tarocchi', 'Quando rimandare una lettura'],
  ['/blog/tarocchi-quotidiani-abitudine-consapevole', 'Abitudine quotidiana consapevole'],
  ['/blog/diario-dei-tarocchi', 'Diario dei tarocchi'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'i-quattro-semi-dei-tarocchi',
      title: 'I quattro semi dei tarocchi: Bastoni, Coppe, Spade, Denari',
      description:
        'Guida ai quattro semi dei tarocchi: elementi, ambiti di vita ed esempi per riconoscerli in lettura.',
      keyword: 'quattro semi tarocchi',
      coverAlt: 'Quattro oggetti simbolo dei semi dei tarocchi',
      faq: [
        {
          q: 'I semi corrispondono agli elementi?',
          a: 'Nella tradizione più comune: Bastoni/Fuoco, Coppe/Acqua, Spade/Aria, Denari/Terra.',
        },
        {
          q: 'Se in lettura domina un solo seme?',
          a: 'Il tema della vita in quel momento è fortemente colorato da quell’elemento.',
        },
        {
          q: 'Serve studiarli prima dei Maggiori?',
          a: 'Aiuta: i semi rendono concrete le grandi narrazioni dei Maggiori.',
        },
      ],
      bodyHtml: `
<p>Conoscere i <strong>quattro semi dei tarocchi</strong> è uno dei modi più veloci per leggere senza perdersi nei dettagli di ogni carta numerica.</p>
<h2>Mappa rapida</h2>
<ul>
  <li><strong>Bastoni</strong> — fuoco: desiderio, iniziativa, creatività, impazienza.</li>
  <li><strong>Coppe</strong> — acqua: emozioni, legami, intuizione, idealizzazione.</li>
  <li><strong>Spade</strong> — aria: mente, conflitto, verità, ansia da pensiero.</li>
  <li><strong>Denari</strong> — terra: corpo, lavoro, soldi, risultati tangibili.</li>
</ul>
<p>Questa guida approfondisce ciò che abbiamo introdotto negli <a href="/blog/arcani-minori-cosa-sono">Arcani Minori</a>: qui il focus è sull’elemento dominante e su come bilanciare uno spread “tutto Spade” o “tutte Coppe”.</p>
<h2>Esercizio</h2>
<p>Guarda le tue tre carte e conta i semi. Se vedi solo Spade, forse stai pensando troppo. Se solo Coppe, forse senti senza decidere. Usa il seme mancante come suggerimento pratico.</p>
${related([
  ['/blog/arcani-minori-cosa-sono', 'Arcani Minori: panoramica'],
  ['/blog/combinazioni-di-carte-tarocchi', 'Combinazioni di carte'],
  ['/blog/tarocchi-soldi-e-risorse', 'Tarocchi e risorse materiali'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-cambiamento-e-trasformazione',
      title: 'Tarocchi e cambiamento: leggere i passaggi di vita',
      description:
        'Come i tarocchi descrivono cambiamenti e trasformazioni: carte tipiche, fasi del passaggio e domande di accompagnamento.',
      keyword: 'tarocchi cambiamento',
      coverAlt: 'Farfalla e luce dorata su sfondo scuro simbolico',
      faq: [
        {
          q: 'Quali carte parlano di cambiamento?',
          a: 'Tra le altre: Morte, Torre, Ruota, Giudizio, a volte il Matto come nuovo inizio.',
        },
        {
          q: 'Il cambiamento è sempre improvviso?',
          a: 'No. A volte è lento e interiore; le carte lo mostrano prima che diventi evidente fuori.',
        },
        {
          q: 'Come non sabotarli?',
          a: 'Accetta una fase di vuoto. Ricostruire uguale al vecchio per paura riporta allo stesso punto.',
        },
      ],
      bodyHtml: `
<p>I <strong>tarocchi e il cambiamento</strong> lavorano bene insieme perché le carte amano i processi: crisi, soglia, riorganizzazione, rinascita.</p>
<h2>Tre tipi di passaggio</h2>
<ul>
  <li><strong>Rottura</strong> (es. Torre): qualcosa crolla.</li>
  <li><strong>Trasformazione</strong> (es. Morte): qualcosa finisce per diventare altro.</li>
  <li><strong>Inizio</strong> (es. Matto): qualcosa comincia con rischio creativo.</li>
</ul>
<p>Approfondisci le singole carte nelle guide dedicate: <a href="/blog/significato-carta-la-torre">La Torre</a>, <a href="/blog/significato-carta-la-morte">La Morte</a>, <a href="/blog/significato-carta-il-matto">Il Matto</a>.</p>
<h2>Domande di accompagnamento</h2>
<ul>
  <li>Cosa sto diventando in questo passaggio?</li>
  <li>Cosa posso lasciare con rispetto?</li>
  <li>Quale risorsa mi sostiene nella fase intermedia?</li>
</ul>
${related([
  ['/blog/significato-carta-la-morte', 'Carta La Morte'],
  ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Cosa fare dopo una lettura'],
  ['/blog/tarocchi-e-decisioni-difficili', 'Decisioni difficili'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'lettura-tarocchi-a-distanza',
      title: 'Lettura dei tarocchi a distanza: come funziona online',
      description:
        'Cosa significa una lettura tarocchi a distanza o online: aspettative realistiche, privacy e come prepararti.',
      keyword: 'lettura tarocchi a distanza',
      coverAlt: 'Laptop e mazzo di tarocchi per lettura a distanza',
      faq: [
        {
          q: 'A distanza è meno efficace?',
          a: 'Cambia il canale, non necessariamente la qualità. Contano domanda, chiarezza del servizio e tuo ascolto.',
        },
        {
          q: 'Devo essere in videochiamata?',
          a: 'No. Molti servizi, come Luxseetarot, funzionano in autonomia con testo e carte digitali.',
        },
        {
          q: 'Che dati servono?',
          a: 'Di solito pochi dati di contesto. Diffida di chi chiede informazioni sensibili inutili.',
        },
      ],
      bodyHtml: `
<p>Una <strong>lettura tarocchi a distanza</strong> oggi è spesso una lettura online: poni una domanda, ricevi carte e testo senza essere nella stessa stanza di nessuno.</p>
<h2>Cosa aspettarti</h2>
<ul>
  <li>Un focus sulla tua domanda, non su “vibrazioni misteriose” non spiegate.</li>
  <li>Trasparenza su cosa è incluso (anteprima, lettura completa, approfondimenti).</li>
  <li>Limiti dichiarati: riflessione/intrattenimento, non certezze assolute.</li>
</ul>
<p>Per scegliere con criterio, leggi anche <a href="/blog/tarocchi-online-come-scegliere">come scegliere tarocchi online</a> e <a href="/blog/tarocchi-gratis-online-come-funzionano">come funzionano i tarocchi gratis online</a>.</p>
<h2>Come prepararti</h2>
<p>Stessa preparazione di una lettura in presenza ridotta all’essenziale: domanda scritta, attenzione, ambiente non caotico. Poi integra ciò che leggi con i fatti della tua vita.</p>
${related([
  ['/blog/tarocchi-online-come-scegliere', 'Servizi online affidabili'],
  ['/blog/preparazione-prima-di-una-lettura', 'Preparazione alla lettura'],
  ['/blog/lettura-tarocchi-tre-carte', 'Spread a tre carte'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'diario-dei-tarocchi',
      title: 'Diario dei tarocchi: come tenerlo (e perché aiuta)',
      description:
        'Come creare un diario dei tarocchi: cosa annotare, con che frequenza e come rileggere i pattern nel tempo.',
      keyword: 'diario dei tarocchi',
      coverAlt: 'Taccuino aperto accanto a una carta dei tarocchi',
      faq: [
        {
          q: 'Devo scrivere ogni giorno?',
          a: 'No. Anche 2–3 note a settimana bastano se sei costante quando fai una lettura seria.',
        },
        {
          q: 'Cosa annotare obbligatoriamente?',
          a: 'Data (per te), domanda, carte, impressione a caldo, azione scelta. Poi un follow-up dopo qualche giorno.',
        },
        {
          q: 'A cosa serve nel tempo?',
          a: 'A vedere schemi: le carte che tornano, le domande che ripeti, ciò che hai davvero messo in pratica.',
        },
      ],
      bodyHtml: `
<p>Un <strong>diario dei tarocchi</strong> trasforma le letture da momenti sparsi in apprendimento. È lo strumento più sottovalutato da chi consulta spesso.</p>
<h2>Schema di pagina</h2>
<ol>
  <li>Domanda.</li>
  <li>Carte / sintesi della lettura.</li>
  <li>Cosa ho sentito nel corpo.</li>
  <li>Una azione concreta.</li>
  <li>Dopo 3–7 giorni: cosa è successo davvero?</li>
</ol>
<p>Se fai <a href="/blog/tarocchi-quotidiani-abitudine-consapevole">tarocchi quotidiani</a>, il diario evita che diventino rumore. Se lavori sull’ansia, ti mostra quando stai entrando in loop (vedi <a href="/blog/tarocchi-e-ansia-usarli-bene">tarocchi e ansia</a>).</p>
<p>Nota: sul sito pubblico non mostriamo la data negli articoli; nel tuo diario personale, invece, la data ti serve proprio per rileggere i cicli.</p>
${related([
  ['/blog/tarocchi-quotidiani-abitudine-consapevole', 'Abitudine quotidiana'],
  ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Dopo la lettura'],
  ['/blog/tarocchi-e-intuito', 'Tarocchi e intuito'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-e-sogni',
      title: 'Tarocchi e sogni: come usarli insieme con intelligenza',
      description:
        'Collegare tarocchi e sogni: quando ha senso, come formulare la domanda e limiti da rispettare.',
      keyword: 'tarocchi e sogni',
      coverAlt: 'Atmosfera onirica con luna e carta dei tarocchi',
      faq: [
        {
          q: 'I tarocchi interpretano i sogni al posto mio?',
          a: 'Possono offrire un angolo simbolico. L’interpretazione resta un dialogo tra immagine del sogno, carte e tua vita.',
        },
        {
          q: 'Quale carta è più legata ai sogni?',
          a: 'Spesso La Luna, ma dipende dal contenuto del sogno e dalla domanda.',
        },
        {
          q: 'Devo fare una lettura ogni mattina sul sogno?',
          a: 'Solo se il sogno ti ha davvero colpito. Altrimenti annotalo e osserva i temi ricorrenti.',
        },
      ],
      bodyHtml: `
<p><strong>Tarocchi e sogni</strong> parlano lingue vicine: immagini, emozioni, simboli. Usarli insieme funziona se non forzi ogni sogno a diventare oracolo.</p>
<h2>Quando ha senso</h2>
<ul>
  <li>Un sogno ripetuto o molto carico emotivamente.</li>
  <li>Un’immagine che non riesci a spiegarti a mente fredda.</li>
  <li>Un passaggio di vita che emerge di notte prima che di giorno.</li>
</ul>
<h2>Domanda tipo</h2>
<p>“Quale messaggio utile posso trarre da questo sogno per la mia situazione attuale?” funziona meglio di “Il sogno predice X?”.</p>
<p>La <a href="/blog/significato-carta-la-luna">carta La Luna</a> compare spesso in questi temi; l’<a href="/blog/tarocchi-e-intuito">intuito</a> aiuta, ma resta necessario il confronto con i fatti.</p>
${related([
  ['/blog/significato-carta-la-luna', 'Carta La Luna'],
  ['/blog/diario-dei-tarocchi', 'Diario dei tarocchi'],
  ['/blog/come-fare-una-domanda-ai-tarocchi', 'Formulare la domanda'],
])}
${CTA}
`.trim(),
    }),

    article({
      slug: 'cosa-fare-dopo-una-lettura-tarocchi',
      title: 'Cosa fare dopo una lettura dei tarocchi',
      description:
        'Dopo la lettura: come metabolizzare il messaggio, scegliere un’azione e evitare di rifare subito un’altra estrazione.',
      keyword: 'dopo una lettura dei tarocchi',
      coverAlt: 'Taccuino e penna dopo una lettura di tarocchi',
      faq: [
        {
          q: 'Devo seguire le carte alla lettera?',
          a: 'No. Prendi ciò che risuona, verifica nei fatti, lascia il resto. Le carte orientano, non comandano.',
        },
        {
          q: 'Quando posso rifare la lettura?',
          a: 'Quando emergono fatti nuovi, non quando l’ansia chiede un’altra dose di rassicurazione.',
        },
        {
          q: 'Meglio approfondire o cambiare domanda?',
          a: 'Se il tema è lo stesso, approfondisci. Se è un altro ambito, allora nuova domanda.',
        },
      ],
      bodyHtml: `
<p>Sapere <strong>cosa fare dopo una lettura dei tarocchi</strong> è spesso più importante della lettura stessa. Senza integrazione, resta solo curiosità.</p>
<h2>Routine post-lettura (10 minuti)</h2>
<ol>
  <li>Riscrivi in una frase il messaggio centrale.</li>
  <li>Scegli un’azione piccola e verificabile.</li>
  <li>Annota nel <a href="/blog/diario-dei-tarocchi">diario</a>.</li>
  <li>Chiudi il mazzo (o la sessione online) e passa ad altro.</li>
</ol>
<h2>Se la lettura ti ha scosso</h2>
<p>Non decidere nulla di irreversibile nei 30 minuti successivi. Cammina, bevi acqua, riparla domani. Carte intense come <a href="/blog/significato-carta-la-torre">La Torre</a> o <a href="/blog/significato-carta-la-morte">La Morte</a> chiedono digestione, non reazione automatica.</p>
<p>Su Luxseetarot, se ti serve dettaglio sullo stesso estratto, approfondisci con nuove domande sulle stesse carte invece di ricominciare da zero.</p>
${related([
  ['/blog/preparazione-prima-di-una-lettura', 'Preparazione prima della lettura'],
  ['/blog/tarocchi-e-ansia-usarli-bene', 'Gestire l’ansia'],
  ['/blog/tarocchi-e-decisioni-difficili', 'Se c’è una decisione aperta'],
])}
${CTA}
`.trim(),
    }),
  ];
}
