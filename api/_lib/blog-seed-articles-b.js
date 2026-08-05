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
${expand({
  method: 'Con La Morte separa tre livelli: ciò che è già concluso nei fatti, ciò che stai ancora elaborando e ciò che può essere costruito dopo. Osserva le carte vicine: Coppe possono mettere l’accento sul distacco emotivo, Denari su lavoro o casa, Spade su una decisione ormai inevitabile. Non trasformare automaticamente una chiusura simbolica nella fine di una relazione.',
  example: 'Immagina una domanda su un lavoro diventato stretto. La Morte nel presente, accanto a Otto di Denari e Matto, può raccontare la conclusione di un ruolo, le competenze acquisite e un nuovo percorso da esplorare. Non promette dimissioni immediate: invita a preparare portfolio, risparmi e conversazioni, riconoscendo che la vecchia identità professionale non basta più.',
  limits: 'Evita letture letterali su morte, malattie o incidenti: una carta non offre diagnosi né previsioni affidabili su eventi tragici. Se stai vivendo un lutto, usala solo con delicatezza per parlare del tuo processo interiore. La trasformazione richiede anche tempi pratici; lasciare andare non significa ignorare responsabilità, contratti o bisogni delle persone coinvolte.',
  lux: 'Puoi chiedere: «Che cosa devo riconoscere nella fase che si chiude, che cosa mi aiuta ad attraversarla e quale qualità coltivare dopo?». Nella sequenza a tre carte, tratta La Morte come una soglia e verifica se le altre immagini descrivono resistenza, sostegno o direzione. Conserva una sintesi sobria, senza cercare conferme catastrofiche.',
  exercise: 'Dividi un foglio in tre colonne: “finito”, “da salutare”, “da nutrire”. Inserisci un fatto concreto in ciascuna colonna, poi scegli un gesto di chiusura: archiviare un documento, restituire un oggetto, cancellare un impegno non più autentico. Termina scrivendo quale spazio libero creerà quel gesto e controlla dopo sette giorni come ti senti.',
})}
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
${expand({
  method: 'Quando appare Il Sole, individua ciò che è già chiaro e ciò che invece stai illuminando troppo in fretta. Guarda chi o che cosa viene reso visibile, quali risultati possono essere condivisi e dove serve trasparenza. In una stesa temporale può rappresentare l’esito di un chiarimento; in una posizione di consiglio invita a comunicare apertamente e a valorizzare competenze reali.',
  example: 'In una domanda su un progetto creativo, Sole, Tre di Denari e Sei di Bastoni possono indicare collaborazione ben riuscita e riconoscimento pubblico. Il messaggio utile non è “successo garantito”, ma “mostra il lavoro, chiedi feedback e costruisci alleanze”. Se accanto compare Sette di Coppe, l’entusiasmo va accompagnato da una scelta precisa tra troppe possibilità.',
  limits: 'Una carta favorevole non elimina scadenze, incompatibilità o segnali di rischio. In amore, calore e sincerità non equivalgono automaticamente a impegno duraturo; nel lavoro, visibilità non significa contratto certo. Usa Il Sole per riconoscere condizioni promettenti, poi verifica accordi e comportamenti. Diffida anche della pressione a mostrarti felice quando hai bisogno di riposo o riservatezza.',
  lux: 'Formula una domanda come: «Quale verità posso rendere più visibile e come farlo in modo sostenibile?». Leggi le tre carte cercando fonte della vitalità, modo di esprimerla e possibile risultato. Se Il Sole domina il testo, estrai una indicazione concreta sulla comunicazione o sulla collaborazione, evitando di interpretare ogni frase come una promessa senza condizioni.',
  exercise: 'Scrivi tre cose che oggi funzionano davvero, corredandole di una prova osservabile. Scegline una da rendere più visibile con un messaggio, una candidatura o una conversazione sincera. Aggiungi un controllo di realtà: quale dettaglio pratico devi ancora verificare? Agisci entro quarantotto ore e annota se la chiarezza ha prodotto energia, risposta o un limite utile.',
})}
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
${expand({
  method: 'Con La Luna crea due elenchi distinti: sensazioni e fatti. Le sensazioni meritano ascolto, ma non diventano prove solo perché sono intense. Osserva poi le carte vicine per capire se la nebbia nasce da paura, informazioni nascoste o tempi prematuri. In posizione di consiglio, La Luna suggerisce spesso di rallentare, fare domande e tollerare temporaneamente una risposta incompleta.',
  example: 'Se chiedi di una conoscenza recente e compaiono Luna, Cavaliere di Coppe e Due di Spade, potresti sentire forte attrazione mentre mancano dati per scegliere. Una lettura equilibrata riconosce romanticismo e indecisione: invece di concludere che l’altra persona mente, osserva coerenza, disponibilità e confini durante incontri reali. La verifica vale più di una nuova estrazione.',
  limits: 'La Luna non autorizza accuse, pedinamenti o interpretazioni paranoiche. Ambiguità non significa inganno deliberato e un sogno non è una prova. Se l’incertezza attiva ansia forte, insonnia o pensieri ossessivi, interrompi le consultazioni e parla con una persona competente. Per questioni mediche o di sicurezza, raccogli informazioni affidabili e agisci direttamente.',
  lux: 'Chiedi: «Quale parte della situazione percepisco con chiarezza, quale sto proiettando e che cosa posso verificare?». Assegna idealmente queste tre funzioni alle carte estratte. Quando leggi il responso, evidenzia parole che descrivono emozioni e parole che indicano azioni: le seconde devono restare prudenti, reversibili e fondate su contatti o dati reali.',
  exercise: 'Traccia una linea verticale. A sinistra scrivi cinque impressioni sulla situazione; a destra inserisci per ciascuna il fatto che la sostiene, oppure “nessuna prova”. Scegli una sola domanda da porre o informazione da cercare. Prima di agire fai tre respiri e nota il corpo. Rileggi il foglio dopo due giorni, senza nuove carte, per vedere cosa resta credibile.',
})}
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
${expand({
  method: 'Per leggere L’Imperatrice chiediti che cosa sta crescendo e di quali condizioni ha bisogno: tempo, attenzione, denaro, piacere o collaborazione. Distingui il nutrire dal salvare tutti. Le carte circostanti mostrano se la creatività può prendere forma oppure se è dispersa. In posizione di ostacolo può indicare eccesso di disponibilità, comodità stagnante o difficoltà a ricevere.',
  example: 'In una lettura su un’attività personale, Imperatrice, Asso di Denari e Tre di Bastoni descrivono un’idea fertile che richiede un primo investimento misurato e una visione più ampia. La traduzione pratica può essere preparare un prototipo e mostrarlo a tre persone. Con Dieci di Bastoni, invece, il progetto rischia di essere soffocato da troppe cure rivolte altrove.',
  limits: 'Non usare L’Imperatrice per dedurre gravidanze, fertilità clinica o condizioni del corpo: servono test e professionisti sanitari. Abbondanza non vuol dire guadagno garantito, e generosità non obbliga a tollerare sfruttamento. Considera risorse disponibili, consenso e reciprocità. Anche il riposo è fertile, ma non deve diventare un modo elegante per rimandare indefinitamente una scelta.',
  lux: 'Una domanda efficace è: «Che cosa merita di essere nutrito adesso, con quali risorse e quale confine?». Nelle tre carte cerca seme, cura e forma possibile. Se emerge L’Imperatrice, annota il bisogno concreto indicato dal resto della stesa: potrebbe essere spazio creativo, collaborazione, recupero fisico o una conversazione affettuosa, non necessariamente crescita materiale.',
  exercise: 'Scegli un progetto o rapporto e disegna una pianta con radici, fusto e frutti. Nelle radici scrivi le risorse già presenti; sul fusto una pratica settimanale; nei frutti il risultato desiderato. Aggiungi un ramo da potare, cioè un compito che consuma energia senza nutrire. Entro domani dedica venti minuti alla pratica e proteggili con un confine chiaro.',
})}
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
${expand({
  method: 'Con L’Imperatore identifica struttura, responsabilità e potere decisionale. Chiedi quali regole proteggono davvero il progetto e quali servono solo a evitare l’incertezza. Valuta la posizione: come risorsa favorisce pianificazione e confini; come ostacolo segnala rigidità o autorità non discussa. Le carte vicine chiariscono se occorre guidare, negoziare o delegare.',
  example: 'Per una domanda su un gruppo di lavoro, Imperatore, Giustizia e Tre di Denari suggeriscono ruoli scritti, criteri equi e cooperazione professionale. L’azione non è comandare di più, ma definire responsabilità e scadenze condivise. Se compare Cinque di Spade, la leadership può essere vissuta come lotta: conviene verificare ascolto, trasparenza e possibilità di dissenso.',
  limits: 'L’Imperatore non giustifica controllo, gelosia, intimidazione o obbedienza cieca. Stabilità senza consenso è dominio. Non attribuire automaticamente la carta a un uomo specifico: può rappresentare un’istituzione, una tua funzione interiore o una procedura. Per contratti, controversie e diritti servono informazioni legali reali; i simboli possono aiutarti a preparare domande, non a sostituire consulenze.',
  lux: 'Prova a chiedere: «Quale struttura rende questa situazione più sicura senza irrigidirla?». Leggi le tre carte come regola necessaria, rischio del controllo e responsabilità personale. Se l’Imperatore appare nel risultato, traduci il testo in un piano con chi, cosa e quando. Se appare nell’ostacolo, individua una regola da ridiscutere con rispetto.',
  exercise: 'Scrivi un obiettivo e sotto tre righe: “responsabilità mia”, “responsabilità altrui”, “fuori controllo”. Scegli un confine formulato senza minacce, per esempio una disponibilità oraria o una condizione per collaborare. Poi definisci il primo passo, la scadenza e una misura minima di successo. Dopo una settimana valuta se la struttura ha aumentato sicurezza o soltanto tensione.',
})}
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
${expand({
  method: 'Aggiungi ai quattro passi una griglia semplice: valori, conseguenze reversibili, conseguenze irreversibili e informazioni mancanti. Estrai le carte solo dopo aver scritto questa base, così non confonderai un simbolo con un dato. Per ogni opzione formula la stessa domanda e usa lo stesso numero di carte. Infine confronta i temi ricorrenti, senza scegliere soltanto il responso più piacevole.',
  example: 'Devi decidere se accettare un trasferimento. Per l’opzione A emergono Carro, Tre di Bastoni e Cinque di Denari: crescita e movimento insieme a un costo materiale o sociale. Per restare compaiono Quattro di Denari, Eremita e Otto di Coppe: sicurezza, riflessione e possibile insoddisfazione. La lettura indica criteri da quantificare: budget, rete di sostegno, apprendimento e rimpianto.',
  limits: 'Non affidare alle carte decisioni urgenti su salute, sicurezza, investimenti o aspetti legali. Una lettura non conosce tutte le probabilità e può amplificare il tuo orientamento iniziale. Se entrambe le strade hanno rischi seri, consulta persone competenti e costruisci un piano di mitigazione. Ambivalenza non significa che stai sbagliando: spesso due valori importanti sono realmente in conflitto.',
  lux: 'Su Luxseetarot puoi impostare la domanda su un criterio comune: «Che cosa devo comprendere per scegliere tra A e B con responsabilità?». Usa passato, presente e tendenza per vedere origine del dilemma, nodo attuale e direzione se non cambi nulla. Poi fai un approfondimento solo sul punto oscuro, non una seconda votazione simbolica tra le opzioni.',
  exercise: 'Disegna due colonne per A e B. Inserisci per entrambe un beneficio, un costo, una paura e un dato da verificare. Lancia una moneta senza usarla per decidere: osserva quale esito speravi mentre cadeva. Scrivi quel desiderio accanto alle carte e scegli una micro-prova reversibile, come una telefonata o una giornata di simulazione, da completare entro quarantotto ore.',
})}
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
${expand({
  method: 'Parti dalla tua esperienza presente, non dall’identikit di una persona futura. Esamina disponibilità emotiva, confini, ambienti frequentati e schemi che si ripetono. Una stesa utile può distinguere ciò che desideri, ciò che temi e il comportamento che favorisce incontri compatibili. Se compare una figura di corte, leggila prima come qualità da riconoscere o coltivare, non come promessa di arrivo.',
  example: 'Una persona chiede perché gli incontri si interrompono presto. Eremita, Regina di Spade e Due di Coppe possono mostrare bisogno di autonomia, selettività protettiva e reale desiderio di reciprocità. Il punto non è abbassare gli standard, ma comunicare interesse e limiti prima che la distanza sembri disinteresse. Un piccolo esperimento è proporre un secondo incontro chiaro invece di attendere segnali perfetti.',
  limits: 'I tarocchi non possono garantire quando arriverà un partner, descriverne con certezza aspetto o iniziali, né stabilire compatibilità senza conoscenza reciproca. Evita letture ripetute su sconosciuti o profili online: alimentano proiezione. Se solitudine, rifiuto o esperienze passate pesano molto, il supporto di amici o di un professionista offre strumenti che una stesa non può sostituire.',
  lux: 'Chiedi: «Quale qualità porto oggi negli incontri, quale schema mi limita e quale apertura posso praticare?». Nella lettura a tre carte mantieni il centro su di te. Se il testo parla di una nuova possibilità, traducila in disponibilità osservabile: aggiornare un profilo con autenticità, accettare un invito, frequentare un ambiente coerente con i tuoi interessi o esprimere un confine.',
  exercise: 'Scrivi cinque qualità che desideri in una relazione e, accanto, come le pratichi tu. Cerchia quella con lo scarto maggiore. Scegli un comportamento di dieci minuti che la renda visibile questa settimana: rispondere con chiarezza, chiedere ciò che vuoi o partecipare a un’attività. Dopo l’esperimento annota non se hai trovato qualcuno, ma se ti sei mostrato in modo più autentico.',
})}
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
${expand({
  method: 'Descrivi prima la relazione con comportamenti osservabili: frequenza dei contatti, iniziative reciproche, promesse mantenute e momenti di tensione. Poi chiedi alle carte quale dinamica stai alimentando e quale conversazione serve. Evita domande che invadono la mente dell’amico. Le figure di corte possono rappresentare stili relazionali; i semi mostrano se prevalgono affetto, parole, attività o sostegno concreto.',
  example: 'Dopo mesi di distanza compaiono Sei di Coppe, Due di Spade e Paggio di Bastoni. La storia condivisa è ancora importante, ma c’è esitazione e serve un contatto leggero. Invece di concludere che l’amicizia tornerà come prima, puoi inviare un messaggio senza pressione e osservare la risposta. La qualità del seguito conta più del simbolo nostalgico.',
  limits: 'Non usare una lettura per accusare un amico di invidia, tradimento o manipolazione senza prove. Le carte riflettono anche le tue paure e non danno accesso autorizzato alla privacy altrui. Se ci sono molestie, minacce o dipendenza economica, cerca sostegno concreto. Accettare la fine di un’amicizia può essere doloroso ma talvolta più sano che inseguire reciprocità inesistente.',
  lux: 'Una domanda adatta è: «Come posso contribuire a chiarezza e reciprocità in questo rapporto?». Leggi le tre carte come tuo bisogno, dinamica condivisa e prossimo gesto possibile. Su Luxseetarot evita di inserire dati sensibili dell’altra persona. Ricava dal responso una frase da comunicare in prima persona, senza presentare le carte come prova o autorità sul rapporto.',
  exercise: 'Disegna una bilancia. Su un lato elenca ciò che dai all’amicizia, sull’altro ciò che ricevi, includendo presenza, ascolto e iniziativa. Non cercare uguaglianza matematica: osserva il ritmo nel tempo. Scrivi una richiesta concreta e gentile, poi un confine se non viene accolta. Fai il primo contatto entro tre giorni e valuta la risposta reale senza estrarre altre carte.',
})}
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
${expand({
  method: 'Prima della stesa raccogli numeri essenziali: entrate, spese fisse, debiti, tempo e competenze disponibili. Poi usa le carte per esplorare comportamenti e priorità, non rendimenti. I Denari parlano spesso di concretezza, ma una Spada può indicare un contratto da capire e un Bastone iniziativa da testare. Collega ogni simbolo a una voce reale del tuo quadro economico.',
  example: 'Se chiedi come rendere sostenibile un progetto e compaiono Sette di Denari, Regina di Spade e Due di Denari, il tema è valutare risultati, tagliare con lucidità e gestire flussi variabili. La traduzione pratica può essere calcolare il margine per servizio, eliminare una spesa poco utile e creare una riserva. Non è un segnale per comprare titoli o indebitarti.',
  limits: 'Non prendere decisioni di investimento, prestito, tasse o pensione in base a una carta. Mercati e normative richiedono dati aggiornati e consulenza qualificata. Diffida di chi promette ricchezza certa o chiede denaro per rimuovere blocchi energetici. Se le finanze causano forte stress, affronta prima scadenze, documenti e supporti disponibili; la riflessione simbolica viene dopo.',
  lux: 'Puoi chiedere: «Quale abitudine influenza maggiormente le mie risorse e quale passo realistico posso fare questo mese?». Leggi le tre carte come mentalità, comportamento e correzione. Se emerge una carta espansiva, verifica comunque budget e capacità; se emerge una carta di scarsità, cerca risorse ignorate senza negare i vincoli materiali. Salva un solo impegno misurabile.',
  exercise: 'Fai un inventario in quattro categorie: denaro, tempo, competenze e relazioni di supporto. Per ciascuna scrivi una risorsa presente e una dispersione. Scegli la dispersione più facile da ridurre per sette giorni, per esempio un abbonamento o un’ora improduttiva. Stima prima il valore recuperato e controllalo alla fine: il risultato concreto vale più di una previsione.',
})}
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
${expand({
  method: 'Scegli una tecnica compatibile con il mazzo e con le tue mani. Puoi mescolare a incastro con delicatezza, distribuire le carte sul tavolo oppure spostare piccoli pacchetti. Decidi prima se userai rovesciate e mantieni la regola per tutta la sessione. Il punto di arresto può essere un numero di passaggi, non una sensazione mistica: la coerenza riduce il dubbio.',
  example: 'Per una stesa a tre, scrivi la domanda, mescola sette volte, taglia in tre mazzetti e ricomponili. Estrai dall’alto senza scartare carte sgradite. Se una carta cade, stabilisci in anticipo se la includerai; altrimenti rimettila nel mazzo. Questa procedura semplice evita di attribuire significato a ogni incidente e lascia energia all’interpretazione vera.',
  limits: 'Non esiste una tecnica che garantisca carte “più giuste”. Mescolare male non attira eventi negativi e nessun altro rovina permanentemente il mazzo toccandolo. Proteggi però le carte fisicamente e fermati se le mani fanno male. Se rituali e ripetizioni diventano obbligatori o ansiogeni, riduci la procedura a pochi passaggi chiari e considera una pausa.',
  lux: 'Nell’interfaccia di Luxseetarot la selezione digitale sostituisce il gesto fisico, ma puoi mantenere lo stesso ritmo: leggi la domanda, fai un respiro, scegli senza cambiare continuamente criterio e osserva le tre carte insieme. Il valore non dipende da un algoritmo “magico”, bensì dalla capacità di usare immagini e testo per riflettere con attenzione sul contesto.',
  exercise: 'Prova per tre letture la stessa procedura: domanda scritta, cinque mescolate, un taglio, tre estrazioni. Annota quanto tempo impieghi e quante volte senti l’impulso di ricominciare. Non cedere all’impulso; scrivi invece il motivo. Alla terza prova valuta se il rito ti ha aiutato a concentrarti e semplificalo eliminando ogni passaggio che non aggiunge presenza.',
})}
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
${expand({
  method: 'Decidi il tuo vocabolario prima di estrarre: per esempio blocco, eccesso, interiorizzazione e ritardo. Quando appare una rovesciata, prova queste quattro lenti e scegli quella coerente con domanda e carte vicine. Non sommare tutte le interpretazioni. Confronta anche la versione diritta: chiediti quale qualità fondamentale è disponibile ma difficile da esprimere in modo equilibrato.',
  example: 'Un Imperatore rovesciato in una domanda lavorativa, vicino a Tre di Denari e Giustizia, può indicare leadership rigida che ostacola collaborazione e regole eque. Non significa automaticamente licenziamento o capo malvagio. Il consiglio pratico è chiarire ruoli, documentare accordi e osservare come viene gestito il dissenso. In posizione interiore potrebbe invece descrivere paura di assumerti autorità.',
  limits: 'Le inversioni moltiplicano le sfumature, ma anche il rischio di confusione. Se ogni rovesciata ti sembra negativa, sospendile e impara prima i significati diritti. Non usare l’orientamento per trasformare una lettura in diagnosi o verdetto. Un mazzo caduto o ruotato accidentalmente non richiede rituali di purificazione; basta ricomporlo secondo la regola scelta.',
  lux: 'Luxseetarot privilegia il significato contestuale anche quando l’interfaccia non presenta inversioni come regola centrale. Puoi comunque chiederti se l’energia descritta appare fluida, bloccata o eccessiva nelle tre posizioni. Formula una domanda sul modo in cui il tema si manifesta e usa il testo per individuare segnali concreti, senza aggiungere automaticamente un significato opposto a ogni difficoltà.',
  exercise: 'Scegli una carta e scrivi il suo nucleo diritto in cinque parole. Poi crea quattro frasi: “questa energia è bloccata perché…”, “è eccessiva quando…”, “resta interiore se…”, “arriva in ritardo finché…”. Collega ogni frase a un comportamento reale. Cerchia la più plausibile e definisci un’azione che riporti equilibrio, verificandola per una settimana.',
})}
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
${expand({
  method: 'Inizia assegnando a ogni posizione una funzione precisa, poi descrivi ciascuna carta con un verbo. Cerca soggetto, tensione e direzione: chi agisce, che cosa ostacola, verso dove evolve. Nota ripetizioni di numeri, semi, colori o posture solo dopo aver costruito la frase principale. Le corrispondenze arricchiscono il racconto, ma non devono sostituire il senso evidente.',
  example: 'In una domanda su un colloquio, Mago nel passato, Otto di Spade nel presente e Tre di Denari nella tendenza raccontano competenze già disponibili, autosvalutazione attuale e possibilità di collaborazione. La combinazione non promette assunzione: suggerisce di preparare esempi concreti del proprio lavoro e chiedere feedback. Il Mago diventa risorsa per sciogliere il blocco mentale dell’Otto.',
  limits: 'Non memorizzare migliaia di coppie come formule inevitabili. Una combinazione “Torre più Dieci di Spade” non annuncia automaticamente tragedie; può descrivere la fine netta di un’idea. Più carte aggiungi, più aumentano interpretazioni possibili e rumore. Per iniziare resta su tre, torna alla domanda e scarta collegamenti che non producono comprensione o azione responsabile.',
  lux: 'Con Luxseetarot leggi una volta i significati individuali, poi nascondili mentalmente e riassumi la sequenza in una frase con “perché”, “ma” oppure “quindi”. Chiedi un approfondimento soltanto sulla relazione meno chiara tra due posizioni. Se il responso sembra contraddittorio, trattalo come tensione reale da esplorare, non come errore da correggere con nuove carte.',
  exercise: 'Estrai tre carte senza una domanda predittiva e assegna loro “situazione, tensione, risposta”. Scrivi un verbo per ciascuna e crea tre frasi diverse collegandole con “e”, “ma”, “quindi”. Scegli la frase più aderente alle immagini e applicala a un episodio della settimana. Segna quale dettaglio ha guidato la scelta: così alleni sintesi, non memoria meccanica.',
})}
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
${expand({
  method: 'Crea una soglia breve e ripetibile: sistema lo spazio, definisci il tempo disponibile, scrivi la domanda e valuta il tuo stato da zero a dieci. Se agitazione o stanchezza superano sette, rimanda oppure limita la sessione a una riflessione non predittiva. Decidi prima numero di carte e durata. Questa cornice protegge da estrazioni infinite e mantiene il tema circoscritto.',
  example: 'Hai quindici minuti prima di una riunione e vuoi sapere se andrà male. Il tempo stretto e l’ansia rendono facile leggere ogni Spada come minaccia. Una preparazione utile consiste nel cambiare domanda: «Come posso presentarmi con chiarezza?», fare tre respiri e scegliere una sola carta-consiglio. Dopo annoti un comportamento, per esempio portare dati o chiedere un chiarimento.',
  limits: 'Candele, cristalli e incensi sono facoltativi e richiedono normale sicurezza domestica; non migliorano automaticamente la qualità. Evita letture sotto effetto di sostanze, durante una crisi o mentre guidi. Non raccogliere dati privati non necessari. Se la domanda riguarda un’altra persona, centra la stesa sul tuo modo di comunicare e rispettane autonomia e consenso.',
  lux: 'Prima di aprire Luxseetarot, chiudi altre schede e scrivi la domanda fuori dall’interfaccia. Leggila ad alta voce per verificare che sia una sola. Durante la scelta delle carte evita notifiche e non tornare indietro per modificare l’estrazione. Alla fine copia nel diario soltanto messaggio centrale e azione, così la sessione ha un inizio e una chiusura riconoscibili.',
  exercise: 'Prepara una scheda riutilizzabile con cinque caselle: tema, domanda, stato emotivo, numero di carte, tempo massimo. Compilala per la prossima lettura. Aggiungi una frase di intenzione, come “cerco prospettive, non certezze”. Al termine assegna un voto alla concentrazione e annota una distrazione da eliminare. Ripeti tre volte e conserva la routine che funziona davvero.',
})}
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
${expand({
  method: 'Usa una scala da zero a dieci prima di consultare. Sotto sei puoi procedere con una domanda centrata sulle risorse; sopra sei fai prima un’attività regolatrice e rivaluta. Stabilisci un intervallo minimo, per esempio sette giorni sullo stesso tema, salvo fatti nuovi. Scrivi il responso una volta sola: reinterpretarlo continuamente è spesso un’altra forma di rassicurazione compulsiva.',
  example: 'Hai inviato un messaggio e non ricevi risposta. L’impulso è chiedere ogni ora se l’altra persona tornerà. Una stesa più sana, fatta solo quando sei calma, può esplorare ciò che controlli, il confine da rispettare e come occuparti di te nell’attesa. L’azione potrebbe essere silenziare il telefono per due ore, non inviare altri messaggi e continuare la giornata.',
  limits: 'I tarocchi non curano disturbi d’ansia e non sostituiscono psicoterapia o assistenza medica. Se hai attacchi di panico, pensieri autolesivi o difficoltà a funzionare, contatta servizi sanitari o una persona fidata. Anche una pratica spirituale può diventare compulsiva: segnali importanti sono spesa crescente, sonno perso, isolamento e incapacità di decidere senza consultare.',
  lux: 'Imposta una sola lettura su Luxseetarot e scegli una domanda come: «Quale azione sotto il mio controllo sostiene la mia stabilità oggi?». Evita temi che chiedono garanzie sulla mente o sul ritorno di qualcuno. Dopo il responso chiudi la pagina e avvia subito l’azione scelta. Se senti bisogno di ripetere, annota l’impulso e aspetta almeno venti minuti.',
  exercise: 'Crea una carta personale “stop” con tre istruzioni: appoggia il telefono, nomina cinque cose che vedi, contatta qualcuno o cammina dieci minuti. Sul retro scrivi la data dell’ultima lettura e il prossimo momento consentito. Quando arriva l’impulso, usa la carta stop prima del mazzo. Registra intensità iniziale e finale per capire quali alternative calmano davvero.',
})}
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
${expand({
  method: 'Conta i semi, ma considera anche numeri e figure. Un seme dominante mostra il linguaggio prevalente; quello assente suggerisce una prospettiva poco rappresentata, non necessariamente un problema. Collega Bastoni a iniziativa, Coppe a relazione, Spade a valutazione e Denari a realizzazione. Poi domanda come l’elemento dominante può collaborare con quello mancante invece di opporli.',
  example: 'In una stesa su un progetto escono Tre di Bastoni, Nove di Bastoni e Regina di Bastoni: energia e perseveranza abbondano, mentre mancano Denari e Coppe. Prima di spingere ancora, servono budget, tempi e ascolto dei collaboratori. In una lettura tutta Coppe su una scelta professionale, invece, valori e motivazione sono chiari ma occorrono dati e una decisione esplicita.',
  limits: 'Le associazioni elemento-seme variano tra tradizioni e mazzi; usa il sistema dichiarato dal tuo mazzo con coerenza. Un seme non è buono o cattivo: molte Spade possono indicare lucidità oltre che conflitto, molti Denari concretezza oltre che materialismo. Non dedurre diagnosi fisiche dagli elementi. Il conteggio è una lente sintetica, non sostituisce immagini, posizioni e domanda.',
  lux: 'Dopo una lettura a tre carte su Luxseetarot, identifica il seme di ciascun Arcano Minore e nota se un elemento domina. Se compare un Maggiore, trattalo come tema di fondo e usa i semi per vedere dove si manifesta nel quotidiano. Formula l’approfondimento sul seme mancante: «Quale passo concreto/emotivo/mentale/creativo integra questa situazione?».',
  exercise: 'Dividi un foglio in quattro quadranti con i nomi dei semi. Per ogni carta della stesa annota una parola nel quadrante corretto. Nel quadrante vuoto scrivi un gesto compensativo: muovere il corpo per Bastoni, parlare per Coppe, fare una lista per Spade, completare un compito per Denari. Esegui il gesto più piccolo e verifica se cambia la lettura.',
})}
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
${expand({
  method: 'Leggi il cambiamento come una curva: segnale iniziale, perdita di equilibrio, fase di soglia, sperimentazione e nuova stabilità. Individua dove ti trovi senza pretendere di saltare il passaggio scomodo. Le carte possono mostrare risorse diverse per ogni fase: una Spada chiarisce, una Coppa aiuta a elaborare, un Bastone riaccende iniziativa, un Denaro costruisce routine e basi.',
  example: 'Dopo una separazione compaiono Torre, Quattro di Spade e Stella. La sequenza descrive rottura, recupero e fiducia che torna gradualmente. Non promette un nuovo amore immediato né un ricongiungimento; suggerisce di proteggere il riposo, ricostruire una rete e immaginare il futuro senza forzarlo. La Stella acquista senso perché viene dopo una pausa reale, non perché cancella il dolore.',
  limits: 'Non romanticizzare ogni perdita come necessaria o destinata: alcuni cambiamenti sono ingiusti e richiedono sostegno concreto. I tarocchi non stabiliscono quando lasciare cure, casa o lavoro senza valutare sicurezza e risorse. Se il passaggio coinvolge trauma, violenza o lutto, procedi con delicatezza e aiuto professionale. Trasformarsi non significa perdonare, dimenticare o essere subito positivi.',
  lux: 'Chiedi su Luxseetarot: «In quale fase del cambiamento mi trovo, quale risorsa possiedo e quale passo sostiene la transizione?». Usa le tre posizioni come fotografia, non calendario rigido. Se compare una carta di rottura, osserva le altre per trovare contenimento e direzione. Approfondisci la risorsa più concreta invece di chiedere continuamente quando finirà la fase difficile.',
  exercise: 'Disegna un ponte. Sulla riva sinistra scrivi ciò che non funziona più; sulla destra una qualità della vita nuova; sulle assi del ponte cinque risorse già disponibili. Cerchia l’asse più solida e trasformala in un gesto settimanale. Aggiungi ciò che devi chiedere ad altri. Dopo sette giorni valuta il movimento compiuto, non la distanza ancora da percorrere.',
})}
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
${expand({
  method: 'Valuta un servizio a distanza attraverso criteri verificabili: identità o informazioni sul gestore, spiegazione del processo, costi visibili, privacy, limiti e possibilità di interrompere. Prepara una domanda che includa contesto sufficiente senza dati sensibili. Durante la lettura separa ciò che il testo afferma da ciò che aggiungi tu; dopo, controlla se emergono prospettive utili e non solo frasi universali.',
  example: 'Vuoi riflettere su un cambio di lavoro. Invece di inviare nome dell’azienda, documenti o dati personali, chiedi quali risorse e rischi considerare. Una lettura a tre carte può evidenziare motivazione, ostacolo e passo successivo. Se il risultato parla di chiarezza contrattuale, l’azione è leggere l’offerta e fare domande a chi assume, non prenotare consulti ripetuti.',
  limits: 'Proteggi email, indirizzi, dati sanitari e finanziari. Diffida di urgenze costruite, minacce di maledizioni, garanzie assolute e richieste di pagamenti crescenti. Un servizio online non può verificare emergenze né sostituire professionisti. Leggi condizioni e politiche; se qualcosa non è chiaro, non procedere. L’assenza di contatto fisico non elimina il bisogno di consenso e trasparenza.',
  lux: 'Su Luxseetarot scegli autonomamente le carte e ricevi un testo da integrare con il tuo contesto. Usa una connessione e un dispositivo privati se la domanda è delicata, evita nomi completi e chiudi la sessione quando hai ottenuto un orientamento. Il valore sta nella qualità della riflessione e dell’azione successiva, non nella quantità di informazioni personali condivise.',
  exercise: 'Prima della prossima lettura crea una checklist con cinque domande: so quanto costa, capisco cosa ricevo, conosco i limiti, condivido solo dati necessari, posso fermarmi? Poi scrivi la tua domanda eliminando nomi e dettagli identificativi. Dopo la sessione assegna un voto a chiarezza, rispetto e utilità pratica. Se uno è insufficiente, non ripetere automaticamente il servizio.',
})}
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
${expand({
  method: 'Usa sempre lo stesso formato minimo, così potrai confrontare le pagine. Distingui descrizione delle immagini, interpretazione e fatti successivi con colori o sezioni diverse. Non correggere a posteriori la prima impressione: aggiungi una nota datata. Ogni mese rivedi poche letture e cerca domande ripetute, azioni completate, previsioni vaghe e interpretazioni che i fatti hanno smentito.',
  example: 'Il lunedì annoti Eremita, Otto di Denari e Carro per una domanda sullo studio, interpretandoli come concentrazione, pratica e avanzamento. Una settimana dopo scopri che hai lavorato bene solo quando hai spento le notifiche. Il diario mostra quale simbolo si è tradotto in comportamento. Se il progresso non arriva, puoi vedere se l’azione era troppo grande o mai iniziata.',
  limits: 'Il diario non deve diventare sorveglianza ossessiva di ogni coincidenza. Evita di registrare dettagli privati di terzi senza necessità e custodisci il quaderno o file in modo sicuro. Non giudicarti quando un’interpretazione risulta errata: l’obiettivo è imparare, non dimostrare poteri. Se scrivere alimenta ruminazione, riduci frequenza e usa domande orientate al presente.',
  lux: 'Dopo una sessione su Luxseetarot annota data, domanda, tre carte, una frase di sintesi e un’azione. Non serve copiare tutto il testo. Aggiungi un promemoria per la verifica dopo sette giorni, prima di fare un’altra lettura sul tema. Con il tempo potrai riconoscere quali formulazioni producono decisioni utili e quali ti portano soltanto a cercare rassicurazione.',
  exercise: 'Crea oggi la tua pagina modello con sei campi: contesto, domanda, carte, impressione, azione, verifica. Compilala usando una lettura passata e aggiungi ciò che è realmente accaduto. Sottolinea una differenza tra aspettativa e realtà, poi scrivi quale regola ne ricavi. Per esempio: “non interpreto una figura di corte come persona certa senza altri fatti”.',
})}
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
${expand({
  method: 'Appena sveglio annota scene, emozioni, personaggi e svolta finale prima di cercare significati. Scegli poi un solo elemento centrale e formula una domanda al presente. Estrai una o tre carte per esplorare associazioni, non per decodificare un dizionario universale. Confronta immagini del sogno e della carta: somiglianze, contrasti e reazione corporea possono suggerire un tema personale.',
  example: 'Sogni ripetutamente di perdere un treno e peschi Carro, Due di Denari ed Eremita. Potresti esplorare tensione tra avanzamento, troppi impegni e bisogno di scegliere il tuo ritmo. Non significa che perderai davvero un viaggio. L’azione utile è rivedere l’agenda, identificare una scadenza temuta e decidere quale compito delegare o preparare in anticipo.',
  limits: 'Né sogni né carte diagnosticano disturbi o predicono eventi. Incubi frequenti, paralisi del sonno o riposo compromesso meritano attenzione sanitaria, soprattutto se persistono. Evita interpretazioni rigide di simboli culturali: acqua, case e animali hanno significati personali diversi. Non usare un sogno per accusare qualcuno o prendere decisioni irreversibili senza fatti.',
  lux: 'Su Luxseetarot inserisci una domanda breve sul tema, senza raccontare ogni dettaglio: «Che cosa mi invita a osservare l’emozione di questo sogno?». Leggi le tre carte come radice, messaggio e integrazione. Se emerge La Luna, non considerarla conferma soprannaturale; usala per approfondire ambivalenza e bisogno di verifica. Registra poi il sogno nel diario.',
  exercise: 'Scegli un’immagine del sogno e scrivila al centro del foglio. Intorno aggiungi cinque associazioni spontanee e una emozione per ciascuna. Estrai una carta e annota tre differenze, non soltanto somiglianze. Completa la frase: “Nella vita di oggi entrambe mi ricordano…”. Concludi con un gesto semplice, come preparare una conversazione o proteggere il sonno.',
})}
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
${expand({
  method: 'Dopo la prima reazione, separa messaggio, prova e azione. Il messaggio è la sintesi simbolica; la prova è ciò che nella vita la rende plausibile; l’azione è un gesto sotto il tuo controllo. Se manca la prova, conserva l’idea come ipotesi. Fissa una data di verifica coerente con il tema, evitando di controllare ogni ora se la lettura “si avvera”.',
  example: 'Una lettura sul lavoro mostra Giustizia, Sette di Denari e Asso di Spade. La sintesi può essere: valuta con criteri chiari e chiedi una risposta precisa. Le prove sono contratto, risultati e comunicazioni ricevute. L’azione è preparare tre domande per il responsabile. Rifare la stesa non aggiunge informazioni; una conversazione e una scadenza sì.',
  limits: 'Non agire impulsivamente su messaggi che sembrano minacciosi o assoluti. Nessuna carta ordina di lasciare una terapia, interrompere un rapporto in sicurezza precaria o investire denaro. Se il responso ti turba, allontanati e confrontati con una persona affidabile. È legittimo non riconoscersi nella lettura: conserva spirito critico e lascia cadere interpretazioni non utili.',
  lux: 'Chiudi la sessione Luxseetarot con una nota di tre righe: “ho capito”, “verificherò”, “farò”. Se desideri approfondire, mantieni visibili le stesse carte e chiedi come applicare il consiglio o comprendere una tensione specifica. Non cambiare domanda per ottenere l’esito contrario. Torna al servizio solo dopo l’azione o quando un fatto nuovo modifica davvero il contesto.',
  exercise: 'Imposta un timer di dieci minuti. Riassumi la lettura in massimo quindici parole, elenca due fatti collegati e scegli un’azione completabile entro quarantotto ore. Scrivi anche una cosa che non farai, come inviare un messaggio impulsivo o estrarre altre carte. Alla scadenza verifica l’azione e annota che cosa hai imparato, indipendentemente dall’esito desiderato.',
})}
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
