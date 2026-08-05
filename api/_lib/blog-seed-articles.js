/**
 * Catalogo articoli blog Luxseetarot (fase 2).
 * Tutti partono in draft; seed non sovrascrive post già presenti.
 */

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

/** Link interni per ogni slug del lotto A (+ collegamenti al lotto B). */
const RELATED = {
  'significato-tarocchi-amore': [
    ['/blog/tarocchi-amore-domande-esempi', '20 domande utili sui tarocchi in amore'],
    ['/blog/tarocchi-ex-e-ricongiungimento', 'Tarocchi sull’ex: ritorno e chiusura'],
    ['/blog/tarocchi-per-single', 'Tarocchi per single'],
    ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda ai tarocchi'],
  ],
  'lettura-tarocchi-tre-carte': [
    ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda ai tarocchi'],
    ['/blog/combinazioni-di-carte-tarocchi', 'Combinazioni di carte: leggere l’insieme'],
    ['/blog/come-interpretare-i-tarocchi', 'Come interpretare i tarocchi'],
    ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Cosa fare dopo una lettura'],
  ],
  'tarocchi-gratis-online-come-funzionano': [
    ['/blog/tarocchi-online-come-scegliere', 'Come scegliere tarocchi online'],
    ['/blog/lettura-tarocchi-a-distanza', 'Lettura tarocchi a distanza'],
    ['/blog/lettura-tarocchi-tre-carte', 'Lettura a tre carte'],
    ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda ai tarocchi'],
  ],
  'tarocchi-si-o-no': [
    ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda ai tarocchi'],
    ['/blog/tarocchi-e-decisioni-difficili', 'Tarocchi e decisioni difficili'],
    ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni in lettura'],
    ['/blog/lettura-tarocchi-tre-carte', 'Spread a tre carte'],
  ],
  'differenza-tarocchi-oroscopo': [
    ['/blog/tarocchi-futuro-prossimo', 'Tarocchi e futuro prossimo'],
    ['/blog/come-interpretare-i-tarocchi', 'Come interpretare i tarocchi'],
    ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
    ['/blog/tarocchi-online-come-scegliere', 'Come scegliere un servizio online'],
  ],
  'come-interpretare-i-tarocchi': [
    ['/blog/combinazioni-di-carte-tarocchi', 'Combinazioni di carte'],
    ['/blog/carte-tarocchi-rovesciate', 'Carte rovesciate'],
    ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
    ['/blog/arcani-minori-cosa-sono', 'Arcani Minori'],
  ],
  'tarocchi-lavoro-carriera': [
    ['/blog/tarocchi-e-decisioni-difficili', 'Decisioni difficili'],
    ['/blog/tarocchi-soldi-e-risorse', 'Soldi e risorse (con disclaimer)'],
    ['/blog/significato-carta-limperatore', 'Carta L’Imperatore'],
    ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come formulare la domanda'],
  ],
  'tarocchi-ex-e-ricongiungimento': [
    ['/blog/significato-tarocchi-amore', 'Tarocchi in amore'],
    ['/blog/tarocchi-per-single', 'Tarocchi per single'],
    ['/blog/tarocchi-e-ansia-usarli-bene', 'Tarocchi e ansia'],
    ['/blog/tarocchi-amore-domande-esempi', 'Esempi di domande in amore'],
  ],
  'arcani-maggiori-significato': [
    ['/blog/arcani-minori-cosa-sono', 'Arcani Minori'],
    ['/blog/i-quattro-semi-dei-tarocchi', 'I quattro semi'],
    ['/blog/significato-carta-il-matto', 'Carta Il Matto'],
    ['/blog/tarocchi-cambiamento-e-trasformazione', 'Tarocchi e cambiamento'],
  ],
  'arcani-minori-cosa-sono': [
    ['/blog/i-quattro-semi-dei-tarocchi', 'I quattro semi in dettaglio'],
    ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
    ['/blog/combinazioni-di-carte-tarocchi', 'Combinazioni di carte'],
    ['/blog/come-interpretare-i-tarocchi', 'Come interpretare'],
  ],
  'tarocchi-futuro-prossimo': [
    ['/blog/lettura-tarocchi-tre-carte', 'Passato, presente, futuro'],
    ['/blog/tarocchi-si-o-no', 'Perché evitare il puro sì/no'],
    ['/blog/differenza-tarocchi-oroscopo', 'Tarocchi e oroscopo'],
    ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Dopo la lettura'],
  ],
  'quando-fare-una-lettura-dei-tarocchi': [
    ['/blog/preparazione-prima-di-una-lettura', 'Preparazione alla lettura'],
    ['/blog/tarocchi-e-ansia-usarli-bene', 'Tarocchi e ansia'],
    ['/blog/tarocchi-quotidiani-abitudine-consapevole', 'Abitudine quotidiana'],
    ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Cosa fare dopo'],
  ],
  'tarocchi-e-intuito': [
    ['/blog/tarocchi-e-sogni', 'Tarocchi e sogni'],
    ['/blog/significato-carta-la-luna', 'Carta La Luna'],
    ['/blog/diario-dei-tarocchi', 'Diario dei tarocchi'],
    ['/blog/come-interpretare-i-tarocchi', 'Metodo di interpretazione'],
  ],
  'significato-carta-il-matto': [
    ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
    ['/blog/tarocchi-cambiamento-e-trasformazione', 'Cambiamento e nuovi inizi'],
    ['/blog/significato-carta-il-sole', 'Carta Il Sole'],
    ['/blog/lettura-tarocchi-tre-carte', 'Spread a tre carte'],
  ],
  'significato-carta-gli-amanti': [
    ['/blog/significato-tarocchi-amore', 'Tarocchi in amore'],
    ['/blog/tarocchi-e-decisioni-difficili', 'Decisioni difficili'],
    ['/blog/tarocchi-amore-domande-esempi', 'Domande utili in amore'],
    ['/blog/arcani-maggiori-significato', 'Arcani Maggiori'],
  ],
  'significato-carta-la-torre': [
    ['/blog/significato-carta-la-morte', 'Carta La Morte'],
    ['/blog/tarocchi-cambiamento-e-trasformazione', 'Tarocchi e cambiamento'],
    ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni (allarmismo)'],
    ['/blog/cosa-fare-dopo-una-lettura-tarocchi', 'Cosa fare dopo una lettura intensa'],
  ],
  'errori-comuni-lettura-tarocchi': [
    ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come fare una domanda'],
    ['/blog/tarocchi-e-ansia-usarli-bene', 'Tarocchi e ansia'],
    ['/blog/tarocchi-si-o-no', 'Limiti del sì/no'],
    ['/blog/quando-fare-una-lettura-dei-tarocchi', 'Quando fare (o rimandare) una lettura'],
  ],
  'tarocchi-online-come-scegliere': [
    ['/blog/tarocchi-gratis-online-come-funzionano', 'Tarocchi gratis online'],
    ['/blog/lettura-tarocchi-a-distanza', 'Lettura a distanza'],
    ['/blog/errori-comuni-lettura-tarocchi', 'Errori comuni da evitare'],
    ['/blog/preparazione-prima-di-una-lettura', 'Preparazione alla lettura'],
  ],
  'tarocchi-quotidiani-abitudine-consapevole': [
    ['/blog/diario-dei-tarocchi', 'Diario dei tarocchi'],
    ['/blog/tarocchi-e-ansia-usarli-bene', 'Evitare il loop ansioso'],
    ['/blog/quando-fare-una-lettura-dei-tarocchi', 'Quando consultare'],
    ['/blog/come-mescolare-e-scegliere-le-carte', 'Mescolare e scegliere le carte'],
  ],
  'tarocchi-amore-domande-esempi': [
    ['/blog/significato-tarocchi-amore', 'Significato dei tarocchi in amore'],
    ['/blog/come-fare-una-domanda-ai-tarocchi', 'Come formulare la domanda'],
    ['/blog/tarocchi-ex-e-ricongiungimento', 'Domande sull’ex'],
    ['/blog/tarocchi-per-single', 'Se sei single'],
  ],
};

/*
 * Approfondimenti editoriali del lotto A. I campi sono volutamente specifici
 * per articolo: il renderer mantiene una struttura leggibile senza duplicare
 * paragrafi o rendere intercambiabili i contenuti.
 */
const EXPANSIONS = {
  'significato-tarocchi-amore': {
    concept: 'Prima di attribuire una carta all’altra persona, separa tre livelli: ciò che provi, ciò che osservi nei comportamenti e ciò che immagini. Questa distinzione evita che desiderio o timore diventino una falsa prova.',
    method: [
      'Descrivi ogni carta con un verbo: avvicinarsi, proteggersi, chiarire, attendere. I verbi mostrano il movimento della relazione meglio delle etichette “positiva” o “negativa”.',
      'Controlla se prevalgono Coppe, Spade, Bastoni o Denari: emozione, pensiero, impulso e concretezza raccontano bisogni diversi.',
      'Confronta infine la lettura con fatti verificabili, come continuità, disponibilità al dialogo e rispetto dei confini.',
    ],
    examples: [
      'In una coppia, una carta di distanza nel presente può suggerire stanchezza o bisogno di spazio: la domanda utile diventa come riaprire un dialogo senza accusare.',
      'Con una conoscenza recente, molto slancio e poca concretezza invitano a godere dell’incontro osservando se alle parole seguono gesti coerenti.',
      'Davanti a una scelta sentimentale, le carte possono evidenziare quale opzione rispetta i tuoi valori, non decidere chi devi amare.',
    ],
    limits: 'Gli errori più comuni sono scambiare attrazione per compatibilità, interpretare ogni silenzio come rifiuto e ripetere l’estrazione finché appare una carta rassicurante. Se ci sono controllo, minacce o violenza, la priorità è cercare aiuto reale e qualificato, non ottenere un’altra lettura.',
    lux: 'Su Luxseetarot inserisci una sola situazione e scegli tre carte. Leggi prima la sequenza completa, poi torna sulle frasi che parlano del tuo margine d’azione. Puoi approfondire sulle stesse carte chiedendo quale conversazione preparare o quale confine rendere esplicito.',
    exercise: [
      'Scrivi due fatti osservabili sulla relazione, senza interpretarli.',
      'Nomina l’emozione principale e il bisogno che contiene.',
      'Formula una domanda aperta centrata anche sul tuo ruolo.',
      'Scegli un gesto rispettoso da compiere entro una settimana.',
    ],
  },
  'lettura-tarocchi-tre-carte': {
    concept: 'Le posizioni sono come tre capitoli, ma la storia non deve essere per forza cronologica. “Passato” può indicare la causa ancora attiva, “presente” il punto di scelta e “futuro” la conseguenza più plausibile. Prima dell’estrazione assegna le posizioni e non cambiarle dopo per ottenere un senso più comodo.',
    method: [
      'Dai a ogni carta un titolo di poche parole collegato alla posizione, per esempio “vecchia prudenza”, “confronto necessario”, “nuovo accordo”.',
      'Cerca continuità visive e simboliche: direzioni degli sguardi, elementi, numeri, ripetizioni di semi e passaggio da Arcani Minori a Maggiori.',
      'Riassumi la sequenza con “vengo da…, ora…, se proseguo così…”. Se la frase non regge, torna alla domanda anziché aggiungere significati.',
    ],
    examples: [
      'In amore, un passato di chiusura, un presente di comunicazione e un futuro di equilibrio descrivono un processo che richiede dialogo, non una promessa automatica.',
      'Nel lavoro, fatica alle spalle, competenza al centro e collaborazione davanti possono orientare verso una candidatura preparata insieme a una rete di contatti.',
      'In una scelta, due carte contrastanti e una terza di pausa suggeriscono di raccogliere informazioni prima di impegnarsi.',
    ],
    limits: 'Non leggere la terza carta come verdetto, non ignorare le prime due e non trasformare ogni simbolo in una previsione letterale. Tre carte offrono sintesi, quindi una questione con molti soggetti o conseguenze tecniche richiede anche analisi concrete. Salute, denaro e diritto vanno affidati a professionisti.',
    lux: 'Su Luxseetarot la sequenza passato-presente-futuro viene interpretata rispetto alla domanda inserita. Fai una prima lettura completa senza saltare al finale; se un passaggio resta oscuro, usa un approfondimento sulle stesse carte, così conservi il contesto invece di produrre una nuova storia.',
    exercise: [
      'Riduci il tema a una domanda di una riga.',
      'Annota una parola per posizione prima di leggere il testo.',
      'Scrivi la frase che unisce le tre parole.',
      'Individua un’azione piccola e una verifica concreta.',
    ],
  },
  'tarocchi-gratis-online-come-funzionano': {
    concept: 'Una lettura digitale combina la domanda, l’estrazione e un sistema di interpretazione. La gratuità riguarda l’accesso o la quantità di testo, non una diversa categoria di carte. Valuta quindi il servizio per chiarezza, pertinenza e trasparenza, non per promesse di poteri speciali.',
    method: [
      'Controlla cosa include l’anteprima, quali eventuali parti sono a pagamento e se il prezzo viene mostrato prima della conferma.',
      'Verifica privacy, contatti e uso dei dati: nome ed email non devono diventare un pretesto per richieste sensibili o pressioni commerciali.',
      'Giudica il risultato chiedendoti se collega davvero le tre carte alla domanda e offre spunti comprensibili, senza minacce o certezze assolute.',
    ],
    examples: [
      'Per un dubbio amoroso, una buona anteprima identifica il clima della dinamica senza dichiarare di conoscere con certezza i pensieri di un’altra persona.',
      'Per il lavoro, dovrebbe distinguere motivazione e ostacoli simbolici da elementi reali come requisiti, contratto e mercato.',
      'Per una scelta, il valore sta nel confronto tra possibilità e conseguenze, non in un comando da eseguire.',
    ],
    limits: 'Diffida dei risultati identici per qualsiasi domanda, dei contatori che simulano urgenza e delle richieste di pagare per rimuovere maledizioni o pericoli. Anche un testo ben costruito resta intrattenimento riflessivo. Non usarlo per diagnosi, investimenti, emergenze o decisioni che richiedono competenza professionale.',
    lux: 'Su Luxseetarot puoi formulare la domanda, estrarre tre carte e valutare l’anteprima prima di scegliere se leggere il contenuto completo. Parti da un tema circoscritto e conserva ciò che è utile; se approfondisci, fallo sulla stessa estrazione per non confondere curiosità e ripetizione ansiosa.',
    exercise: [
      'Leggi condizioni, privacy e contenuto dell’offerta.',
      'Prepara una domanda che non chieda garanzie.',
      'Segna una frase utile e una che non ti rappresenta.',
      'Decidi con calma se il livello gratuito è sufficiente.',
    ],
  },
  'tarocchi-si-o-no': {
    concept: 'Dietro una domanda binaria si nascondono spesso più bisogni: ridurre l’incertezza, ricevere permesso o evitare la responsabilità di scegliere. Portarli alla luce rende la consultazione più onesta. Un simbolo non equivale a un semaforo universale: la stessa carta cambia tono con domanda, posizione e carte vicine.',
    method: [
      'Individua il verbo della domanda chiusa, poi chiedi quali condizioni favoriscono quell’evento e quali lo ostacolano.',
      'Aggiungi il tuo margine d’azione: cosa puoi chiarire, preparare o proteggere indipendentemente dall’esito.',
      'Definisci un orizzonte ragionevole, come questa fase o il prossimo passo, evitando date esatte e promesse definitive.',
    ],
    examples: [
      '“Mi ama?” diventa “Quali segnali di reciprocità posso osservare e quale bisogno devo comunicare con chiarezza?”.',
      '“Mi assumeranno?” diventa “Come presentare meglio il mio valore e quali aspetti dell’offerta devo verificare?”.',
      '“Devo trasferirmi?” diventa “Cosa guadagno, cosa lascio e quale informazione manca prima di decidere?”.',
    ],
    limits: 'Assegnare a priori sì alle carte luminose e no a quelle intense semplifica troppo. Anche il Sole può mostrare esposizione e la Torre può liberare da una situazione inadatta. Non fare estrazioni consecutive per spareggiare un risultato: aumentano l’ambiguità e riducono la capacità di scegliere.',
    lux: 'Su Luxseetarot usa lo spazio della domanda per scrivere la versione aperta. Le tre posizioni mostrano origine, situazione attuale e direzione; l’eventuale approfondimento può concentrarsi su una condizione concreta invece di riproporre lo stesso sì/no con parole diverse.',
    exercise: [
      'Scrivi la domanda chiusa che ti viene spontanea.',
      'Elenca due fattori che dipendono da te e due esterni.',
      'Trasformala in “cosa favorisce, cosa ostacola, come agisco?”.',
      'Stabilisci quando valuterai i fatti senza nuove estrazioni.',
    ],
  },
  'differenza-tarocchi-oroscopo': {
    concept: 'L’astrologia interpreta una mappa celeste e i suoi cicli; i tarocchi organizzano immagini estratte attorno a una domanda. Un oroscopo collettivo parte dal segno solare, mentre un tema natale completo richiede data, ora e luogo. Una lettura di carte, invece, può iniziare subito da un problema circoscritto.',
    method: [
      'Scegli l’oroscopo quando vuoi osservare un clima periodico ampio e confrontarlo con il tuo momento personale.',
      'Scegli i tarocchi quando hai bisogno di mettere in sequenza antecedenti, nodo presente e possibile sviluppo di una situazione.',
      'Se li usi entrambi, mantieni distinti i linguaggi: cerca eventuali risonanze solo dopo aver compreso ciascun messaggio nel proprio metodo.',
    ],
    examples: [
      'Un transito può invitare genericamente a rivedere la comunicazione; tre carte possono applicare quel tema a una conversazione concreta di coppia.',
      'Un oroscopo professionale descrive settimane dinamiche, mentre una lettura sul lavoro esplora il dubbio tra una proposta specifica e la permanenza.',
      'Per una scelta personale, le carte evidenziano valori e paure; l’astrologia può offrire una cornice temporale, non sostituire l’analisi.',
    ],
    limits: 'Dire che uno strumento è sempre più preciso dell’altro è fuorviante: dipende dalla qualità dell’interpretazione e dalla domanda. Evita di sommare previsioni finché trovi quella desiderata. Nessuno dei due metodi sostituisce dati, dialogo, consulenza medica, legale o finanziaria.',
    lux: 'Luxseetarot è centrato sull’estrazione a tre carte e sulla domanda personale. Inserisci il contesto essenziale senza trasformarlo in una biografia; il testo seguirà la sequenza simbolica. Puoi tenere l’oroscopo come spunto separato e verificare nella realtà ciò che emerge.',
    exercise: [
      'Definisci se cerchi un clima generale o una risposta focalizzata.',
      'Scrivi il tema in una frase senza riferimenti astrologici.',
      'Dopo la lettura, nota una convergenza e una differenza.',
      'Concludi con una decisione basata anche su fatti reali.',
    ],
  },
  'come-interpretare-i-tarocchi': {
    concept: 'Interpretare significa passare dall’immagine a un’ipotesi coerente con la domanda. Il significato tradizionale è il vocabolario; posizione e combinazione sono la grammatica. Prima descrivi ciò che vedi, poi formula il senso: questo riduce proiezioni e conclusioni affrettate.',
    method: [
      'Osserva personaggi, direzione, colori, numero ed elemento senza giudicare. Trasforma poi queste note in un tema collegato alla posizione.',
      'Distingui tra Arcani Maggiori, che amplificano snodi e archetipi, e Minori, che precisano azioni, emozioni, conflitti e risorse quotidiane.',
      'Cerca una relazione: continuità, contrasto o soluzione. Una carta non cancella l’altra; insieme delimitano un racconto più credibile.',
    ],
    examples: [
      'In amore, Coppe aperte seguite da Spade tese possono parlare di sentimento presente ma comunicazione difensiva: il passo utile è chiarire, non proclamare una fine.',
      'Nel lavoro, un Arcano di iniziativa tra due Denari suggerisce che l’idea ha bisogno di budget, ritmo e competenze verificabili.',
      'In una scelta, carte entrambe favorevoli possono indicare che il vero nodo non è quale opzione sia “giusta”, ma quale costo sei disposto a sostenere.',
    ],
    limits: 'Consultare molti manuali finché una definizione conferma il desiderio crea rumore. Evita anche letture letterali dei nomi e narrazioni troppo dettagliate non sostenute dalle carte. Se non trovi un filo, ammetti l’incertezza e torna più tardi: non tutto deve essere risolto subito.',
    lux: 'La lettura guidata di Luxseetarot offre una sintesi contestuale delle tre carte. Confrontala con la tua prima osservazione: evidenzia i punti concordi, quelli che aprono una prospettiva e quelli non pertinenti. Le domande successive sulle stesse carte servono a chiarire, non a contraddire.',
    exercise: [
      'Descrivi ogni carta in una frase puramente visiva.',
      'Associa un verbo a ciascuna posizione.',
      'Unisci i tre verbi in una storia breve.',
      'Scrivi una verifica concreta da fare nella vita quotidiana.',
    ],
  },
  'tarocchi-lavoro-carriera': {
    concept: 'Una domanda professionale utile separa identità, condizioni e strategia. Non essere soddisfatti non significa automaticamente dover lasciare; talvolta serve ridefinire compiti, imparare una competenza o negoziare. Le carte aiutano a vedere la tensione dominante, mentre dati e conversazioni verificano le opzioni.',
    method: [
      'Chiarisci il criterio principale: crescita, stabilità, reddito, autonomia, ambiente o equilibrio personale. Senza priorità, ogni alternativa sembra insieme promettente e rischiosa.',
      'Leggi il passato come bagaglio di esperienze, il presente come risorse e vincoli attuali, il futuro come direzione da preparare.',
      'Converti i simboli in domande operative: chi contattare, quale informazione ottenere, quale capacità dimostrare e quale limite non superare.',
    ],
    examples: [
      'Prima di un colloquio, carte di visibilità e disciplina possono suggerire esempi concreti dei risultati ottenuti e una preparazione più ordinata.',
      'Tra posto stabile e progetto autonomo, una sequenza molto creativa ma poco materiale invita a costruire budget e piano di transizione.',
      'In un conflitto con il responsabile, carte di rigidità non provano ostilità: possono indicare aspettative non dette da rendere misurabili.',
    ],
    limits: 'Non attribuire alle carte decisioni aziendali, stipendi o esiti di selezione. Ignorare contratto, sostenibilità economica e salute organizzativa sarebbe imprudente. Diffida anche della lettura che trasforma ogni difficoltà in “vocazione altrove”: alcune fasi chiedono pazienza e competenza, altre un’uscita ben pianificata.',
    lux: 'Su Luxseetarot specifica ruolo, bivio e obiettivo senza inserire dati riservati dell’azienda. Dopo le tre carte, scegli un approfondimento sul punto più concreto: preparazione, negoziazione o timore del cambiamento. Il risultato è materiale riflessivo, non consulenza finanziaria o professionale.',
    exercise: [
      'Elenca tre criteri e ordinali per importanza.',
      'Scrivi una risorsa disponibile e un vincolo reale.',
      'Formula una domanda sul prossimo passo controllabile.',
      'Fissa un’azione: candidatura, confronto, ricerca o formazione.',
    ],
  },
  'tarocchi-ex-e-ricongiungimento': {
    concept: 'Il desiderio di ritorno mescola nostalgia, bisogno di riparazione e paura del vuoto. Prima di leggere, chiediti quale componente è più forte. Le carte possono rappresentare il legame interiorizzato anche quando l’altra persona non sta agendo: per questo simbolo e comportamento vanno tenuti separati.',
    method: [
      'Ricostruisci i fatti della separazione e distinguili dalla versione idealizzata dei momenti migliori.',
      'Osserva se le carte parlano di reciprocità, responsabilità e comunicazione oppure soltanto di attrazione, rimpianto e attesa.',
      'Interpreta il futuro come percorso tuo: riapertura possibile, elaborazione o nuovo equilibrio devono sempre essere confermati da azioni rispettose.',
    ],
    examples: [
      'Un messaggio dopo mesi non equivale a ricongiungimento: la lettura può aiutarti a valutare intenzioni, confini e continuità necessarie.',
      'Carte affettive con una forte chiusura presente possono descrivere ricordi ancora vivi ma indisponibilità concreta al dialogo.',
      'Se devi scegliere se rispondere, chiedi quale risposta protegge dignità e chiarezza, non come provocare una reazione.',
    ],
    limits: 'Non usare la lettura per sorvegliare social, interpretare ogni coincidenza o aggirare un no. Un ricongiungimento sano richiede consenso, cambiamenti osservabili e disponibilità di entrambe le persone. In presenza di abuso o stalking, interrompi il contatto e rivolgiti a supporti reali.',
    lux: 'Su Luxseetarot formula una domanda che resti valida anche se l’ex non torna, per esempio cosa elaborare o quale confine mantenere. Leggi le tre carte una volta e lascia trascorrere tempo. Un approfondimento può chiarire una dinamica, ma non sostituisce una conversazione consensuale.',
    exercise: [
      'Dividi una pagina in fatti, speranze e paure.',
      'Segna quale cambiamento reale renderebbe sensato riaprire.',
      'Scrivi una domanda centrata sulla tua scelta.',
      'Stabilisci un limite di tempo senza nuove consultazioni.',
    ],
  },
  'arcani-maggiori-significato': {
    concept: 'La sequenza dei ventidue Arcani viene spesso chiamata viaggio del Matto: dall’apertura iniziale all’integrazione del Mondo. Non è una scala rigida, ma una mappa di esperienze umane. Numero, figura e posizione mostrano quale passaggio archetipico risuona con la domanda.',
    method: [
      'Individua la funzione della carta: avviare, scegliere, regolare, interrompere, trasformare o integrare. Una funzione è più utile di una previsione generica.',
      'Osserva se nello spread compare un solo Maggiore, che può fare da chiave, oppure più Maggiori, che segnalano un tema identitario o una fase intensa.',
      'Usa i Minori vicini per capire dove il tema prende forma: emozioni nelle Coppe, azioni nei Bastoni, pensieri nelle Spade, risorse nei Denari.',
    ],
    examples: [
      'Gli Amanti in una domanda di lavoro possono rappresentare coerenza e scelta, non romanticismo in ufficio.',
      'La Morte tra carte quotidiane può indicare la conclusione di un metodo o ruolo, senza alcun riferimento alla morte fisica.',
      'Il Sole nel futuro favorisce chiarezza, ma può chiedere anche di esporsi e assumersi la responsabilità della propria visibilità.',
    ],
    limits: 'Il prestigio simbolico dei Maggiori non li rende fatalistici. Non ignorare contesto, carte Minori e libertà personale. I nomi drammatici non autorizzano diagnosi o annunci di eventi. Un Arcano mostra un tema da esplorare, non una prova oggettiva di ciò che accadrà.',
    lux: 'Nella lettura Luxseetarot, nota quale posizione ospita il Maggiore e leggi come viene collegato alle altre due carte. Se vuoi approfondire, domanda quale comportamento rende costruttivo quel passaggio. Mantieni l’interpretazione aderente al tema iniziale.',
    exercise: [
      'Nomina l’Arcano senza usare “buono” o “cattivo”.',
      'Scrivi il suo verbo e la sua possibile ombra.',
      'Collegalo alla posizione e alle carte vicine.',
      'Traduci il messaggio in un gesto proporzionato.',
    ],
  },
  'arcani-minori-cosa-sono': {
    concept: 'Ogni seme contiene dieci carte numerali e quattro figure di corte. I numeri mostrano lo sviluppo di un’esperienza: l’Asso concentra un potenziale, le carte centrali lo mettono alla prova, il Dieci porta compimento o saturazione. Il seme specifica il campo in cui quel ciclo si manifesta.',
    method: [
      'Combina numero e seme: un Due parla di relazione o alternativa, ma nelle Coppe assume tono affettivo e nelle Spade mentale o decisionale.',
      'Leggi le figure come persone solo quando il contesto lo sostiene; altrimenti possono descrivere il modo giovane, impulsivo, ricettivo o autorevole con cui affronti il tema.',
      'Conta prevalenze e assenze. Molte Spade segnalano forte attività mentale; pochi Denari possono suggerire che manca ancora una base pratica.',
    ],
    examples: [
      'In amore, Coppe numerose con Spade difficili raccontano sentimento accompagnato da dubbi o comunicazione da chiarire.',
      'Nel lavoro, Bastoni e Denari insieme uniscono iniziativa e realizzazione; se prevalgono solo Bastoni, il progetto può avere entusiasmo ma poca struttura.',
      'In una scelta, due figure di corte possono rappresentare approcci diversi dentro di te prima ancora che due persone esterne.',
    ],
    limits: 'Non ridurre i semi a formule immutabili e non considerare i Minori messaggi di serie B. Evita di identificare automaticamente una figura con qualcuno in base a genere o aspetto. Il mazzo parla per analogie, quindi domanda e combinazione restano decisive.',
    lux: 'Su Luxseetarot osserva prima seme e numero delle carte estratte, poi verifica come il testo li integra nella sequenza. Un approfondimento utile può chiedere quale dettaglio quotidiano richiede attenzione: parola, abitudine, risorsa o iniziativa.',
    exercise: [
      'Per ogni carta scrivi elemento, numero o ruolo di corte.',
      'Individua il seme dominante e quello assente.',
      'Collega questa distribuzione alla domanda concreta.',
      'Scegli una modifica quotidiana osservabile.',
    ],
  },
  'tarocchi-futuro-prossimo': {
    concept: '“Prossimo” deve essere proporzionato al tema: giorni per una conversazione già prevista, settimane per un progetto in movimento, mesi per una transizione complessa. Le carte non misurano il tempo come un calendario; descrivono ritmo, condizioni e passaggi che rendono un esito più o meno plausibile.',
    method: [
      'Definisci l’orizzonte prima dell’estrazione e segnala gli eventi già programmati, senza chiedere il giorno esatto.',
      'Leggi la terza carta come continuazione delle prime due: indica cosa tende ad accadere se abitudini e circostanze restano simili.',
      'Distingui segnali anticipatori e risultato. Preparazione, comunicazione o rallentamento possono essere già parte del futuro che stai osservando.',
    ],
    examples: [
      'In amore, un futuro di apertura dopo un presente chiuso suggerisce condizioni favorevoli al dialogo, non la certezza che una persona chiamerà.',
      'Nel lavoro, una carta di riconoscimento ha più senso se passato e presente mostrano competenza coltivata e candidatura concreta.',
      'Per una decisione, una carta di attesa può indicare che un’informazione imminente cambia il quadro: stabilisci cosa devi verificare.',
    ],
    limits: 'Il rischio maggiore è vivere in funzione della previsione, leggendo ogni evento come conferma. Evita scadenze inventate, nuove estrazioni quando il termine si avvicina e decisioni irreversibili basate sul testo. Il futuro resta aperto a scelte, caso e azioni altrui.',
    lux: 'Su Luxseetarot scrivi ambito e fase, poi considera le tre carte come traiettoria. Salva un criterio di verifica nel mondo reale. Se approfondisci, chiedi quale condizione puoi preparare, non una data più precisa che le carte non possono garantire.',
    exercise: [
      'Scegli un orizzonte realistico per la questione.',
      'Elenca un segnale favorevole e uno contrario.',
      'Formula la domanda sulla tendenza e sulle condizioni.',
      'Fissa una data per verificare i fatti, senza compulsione.',
    ],
  },
  'quando-fare-una-lettura-dei-tarocchi': {
    concept: 'La disponibilità mentale conta più dell’ora, della luna o di un rituale perfetto. Sei pronto quando riesci a tollerare una risposta diversa da quella sperata e a distinguere simboli da fatti. Una breve pausa prima della consultazione migliora attenzione e formulazione della domanda.',
    method: [
      'Valuta l’intensità emotiva da zero a dieci. Se è molto alta, regola prima il corpo con respiro, movimento o contatto con una persona fidata.',
      'Controlla se sono emersi fatti nuovi dall’ultima lettura. Senza novità, ripetere la stessa domanda tende a produrre interpretazioni concorrenti.',
      'Chiediti quale uso farai del risultato. Se non esiste alcuna azione o osservazione possibile, forse stai cercando soltanto sollievo immediato.',
    ],
    examples: [
      'Dopo una discussione di coppia, attendere che l’attivazione scenda permette di chiedere come comunicare, invece di cercare colpevoli.',
      'Prima di un colloquio, una lettura può ordinare preparazione e timori; pochi minuti prima dell’incontro rischia invece di aumentare tensione.',
      'Davanti a una scelta con scadenza, consultare con tempo lascia spazio per verificare informazioni e non delegare la decisione.',
    ],
    limits: 'Rimanda in caso di panico, insonnia prolungata o impulso a estrarre finché compare la risposta voluta. I tarocchi non sono uno strumento d’emergenza psicologica. Se l’ansia interferisce con la vita quotidiana, parla con un professionista o una persona di fiducia.',
    lux: 'Apri Luxseetarot quando puoi dedicare qualche minuto senza interruzioni. Inserisci un solo tema, leggi l’intera anteprima e chiudi la sessione con una nota. Gli approfondimenti sulle stesse carte sono utili se nasce una domanda nuova e specifica, non per cancellare una frase scomoda.',
    exercise: [
      'Misura agitazione, stanchezza e bisogno di rassicurazione.',
      'Verifica se la domanda contiene un tema solo.',
      'Decidi in anticipo quanto tempo dedicare.',
      'Dopo la lettura, aspetta almeno un fatto nuovo.',
    ],
  },
  'tarocchi-e-intuito': {
    concept: 'L’intuito è una forma rapida di riconoscimento, costruita da sensibilità ed esperienza; non è infallibile. Diventa più affidabile quando annoti l’impressione prima di conoscere il significato e poi la confronti con contesto e fatti. Così distingui un segnale ricorrente da una reazione momentanea.',
    method: [
      'Descrivi l’immagine con i sensi: luminosità, postura, distanza, movimento. Nota quale dettaglio attira subito e quale avevi evitato.',
      'Dai un nome alla reazione corporea senza trasformarla in previsione. “Sento tensione” è un dato interno; “accadrà qualcosa di brutto” è già un’interpretazione.',
      'Confronta infine intuizione, tradizione e domanda. Se divergono, conserva più ipotesi e cerca riscontri invece di scegliere quella più emozionante.',
    ],
    examples: [
      'In amore, una figura voltata può evocare distanza; verifica però se la relazione mostra davvero evitamento o se temi tu il rifiuto.',
      'Nel lavoro, un’immagine di movimento può risuonare con il desiderio di cambiare, ma budget e opportunità dicono se il passo è maturo.',
      'In una scelta, il sollievo davanti a una carta può indicare un valore importante, non l’autorizzazione automatica a decidere.',
    ],
    limits: 'Paura, desiderio e pregiudizi possono sembrare intuizione. I segnali d’allarme sono urgenza assoluta, certezza sui pensieri altrui e rifiuto di ogni prova contraria. Non usare sensazioni simboliche per diagnosi o accuse. L’intuito sano tollera verifica e possibilità di errore.',
    lux: 'Prima di leggere il testo Luxseetarot, osserva le tre carte e annota tre parole. Poi confronta la lettura guidata con le tue note: ciò che coincide può essere approfondito, ciò che diverge merita curiosità. Conserva il diario per riconoscere nel tempo il tuo linguaggio personale.',
    exercise: [
      'Osserva una carta per sessanta secondi in silenzio.',
      'Annota dettaglio, emozione e sensazione fisica.',
      'Scrivi due interpretazioni alternative.',
      'Controlla dopo alcuni giorni quale era più aderente ai fatti.',
    ],
  },
  'significato-carta-il-matto': {
    concept: 'Numerato zero, Il Matto può stare all’inizio o fuori dalla sequenza: rappresenta potenziale non ancora definito. Il bagaglio leggero parla di esperienza essenziale, il cammino di fiducia, il precipizio di limite. La carta tiene insieme entusiasmo e necessità di attenzione.',
    method: [
      'Osserva se il Matto apre la sequenza, interrompe una fase o segue una carta di conclusione: cambia il tipo di inizio che propone.',
      'Cerca carte di terra o struttura, che aiutano a trasformare l’impulso in esperimento sostenibile, e carte confuse, che accentuano dispersione.',
      'Domandati quale regola è diventata sterile e quale protezione resta invece necessaria. Libertà non significa ignorare conseguenze o impegni.',
    ],
    examples: [
      'In amore può descrivere un incontro fresco o una relazione senza etichette; serve chiarire se leggerezza e aspettative sono condivise.',
      'Nel lavoro favorisce candidatura, viaggio o progetto pilota, ma invita a verificare contratto, risorse e competenze prima del salto.',
      'In una scelta personale può suggerire un piccolo test reversibile invece di aspettare una sicurezza impossibile.',
    ],
    limits: 'Idealizzare Il Matto porta a chiamare coraggio qualsiasi impulso; temerlo porta a perdere opportunità per eccesso di controllo. Non leggerlo come garanzia che “l’universo provvederà”. Se la decisione coinvolge salute, finanze o sicurezza, raccogli pareri qualificati e prepara un piano.',
    lux: 'Quando appare su Luxseetarot, collega il suo invito alla posizione: nel passato può spiegare un’avventura, nel presente un’apertura, nel futuro una strada ancora fluida. Approfondisci chiedendo quale preparazione minima permette di esplorarla senza imprudenza.',
    exercise: [
      'Nomina ciò che desideri iniziare e ciò da cui fuggi.',
      'Elenca il rischio reale e quello soltanto immaginato.',
      'Progetta un primo passo piccolo e reversibile.',
      'Stabilisci un confine di tempo, denaro o energia.',
    ],
  },
  'significato-carta-gli-amanti': {
    concept: 'Nell’iconografia tradizionale la presenza di più figure e di un principio superiore mette in scena relazione, coscienza e scelta. L’attrazione è una parte del simbolo; l’altra è assumere una direzione senza negare le conseguenze. Per questo l’Arcano parla spesso di valori resi visibili dalle decisioni.',
    method: [
      'Identifica le opzioni reali e la tentazione di non scegliere. Anche mantenere tutto com’è produce un effetto e consuma energia.',
      'Distingui desiderio, valore e impegno: possono convergere oppure tirare in direzioni diverse, creando il nodo mostrato dalla carta.',
      'Guarda le carte vicine per capire se prevalgono dialogo, idealizzazione, responsabilità o conflitto. Gli Amanti da soli non descrivono l’esito.',
    ],
    examples: [
      'In coppia possono invitare a rendere esplicito un accordo su fiducia, futuro o confini, invece di affidarsi alla sola chimica.',
      'Per un single possono mostrare disponibilità all’incontro, ma anche la scelta di non ripetere una relazione incoerente con i propri bisogni.',
      'Nel lavoro possono rappresentare una partnership o il bivio tra prestigio esterno e attività più allineata ai valori.',
    ],
    limits: 'Non dedurre automaticamente matrimonio, anima gemella, triangolo o tradimento. Sono ipotesi che richiedono domanda, combinazione e fatti. La carta non autorizza a ignorare un rifiuto né a delegare una scelta morale. Reciprocità e consenso restano criteri concreti.',
    lux: 'Su Luxseetarot rileggi la posizione degli Amanti dentro la sequenza. Se sono nel presente, individua la decisione attiva; nel futuro, osserva quale coerenza preparano le prime due carte. Un approfondimento può mettere a fuoco il criterio con cui scegliere.',
    exercise: [
      'Scrivi le opzioni senza descriverne una come perfetta.',
      'Per ciascuna indica desiderio, costo e valore rispettato.',
      'Nota quale conversazione stai rimandando.',
      'Scegli il prossimo gesto coerente, non l’esito totale.',
    ],
  },
  'significato-carta-la-torre': {
    concept: 'La Torre rappresenta una struttura colpita nel punto in cui pretendeva stabilità assoluta. La luce improvvisa rivela, le figure in caduta perdono posizione, le fondamenta diventano la domanda centrale. Non tutto viene distrutto: ciò che è essenziale può essere separato dall’impalcatura ormai falsa.',
    method: [
      'Individua cosa è già instabile nei fatti: accordo, convinzione, routine, progetto o immagine personale. La carta raramente crea dal nulla il problema.',
      'Separa la fase acuta dalla ricostruzione. Prima si protegge ciò che conta, poi si comprende, infine si decide cosa rifare diversamente.',
      'Osserva le carte vicine: possono indicare risorsa, supporto, causa della crisi o qualità da sviluppare dopo la rottura.',
    ],
    examples: [
      'In amore può coincidere con una verità detta, una crisi o la fine di un’idealizzazione; il comportamento successivo chiarisce se la relazione cambia o termina.',
      'Nel lavoro può descrivere riorganizzazione o fallimento di un piano: documenti, rete professionale e alternative rendono la risposta più concreta.',
      'In una scelta può mostrare che l’opzione “sicura” non lo è più e che occorre aggiornare le informazioni.',
    ],
    limits: 'Catastrofismo e negazione sono errori opposti. Non annunciare incidenti, lutti o disastri sulla base della carta; non minimizzare però segnali reali di rischio. Nelle emergenze segui indicazioni competenti. La lettura serve a riflettere, non a sostituire sicurezza, medicina o diritto.',
    lux: 'Su Luxseetarot leggi La Torre nel suo posto preciso e cerca nel testo ciò che puoi proteggere o verificare. Evita di rifare subito l’estrazione per cancellarla. Se approfondisci, domanda quale fondamento resta valido e quale primo passo di ricostruzione è realistico.',
    exercise: [
      'Elenca ciò che sai già non essere sostenibile.',
      'Distingui perdita temuta e danno realmente presente.',
      'Nomina una risorsa, una persona e un confine utili.',
      'Definisci il primo passo sicuro dopo la chiarificazione.',
    ],
  },
  'errori-comuni-lettura-tarocchi': {
    concept: 'Gli errori non dipendono soltanto dalla conoscenza delle carte, ma dal modo in cui cerchiamo certezza. Bias di conferma, memoria selettiva e paura dell’incertezza possono piegare qualsiasi simbolo. Un metodo scritto rende visibili questi automatismi e permette di correggerli.',
    method: [
      'Registra domanda e posizioni prima di estrarre, così non le modifichi per adattarle al risultato.',
      'Separa descrizione, interpretazione e decisione in tre righe diverse. Questa semplice divisione impedisce di trattare un’ipotesi come fatto.',
      'Conserva anche letture che non sembrano riuscite e verifica dopo: ricordare solo le coincidenze crea un’illusione di precisione.',
    ],
    examples: [
      'In amore, leggere una carta affettuosa come prova dei pensieri altrui ignora consenso, dialogo e comportamento.',
      'Nel lavoro, una carta di successo non sostituisce candidatura e preparazione; può diventare invito a mostrare competenze.',
      'In una scelta, rifare lo spread finché vince l’opzione preferita segnala che la decisione è già emotivamente orientata.',
    ],
    limits: 'Altri errori sono leggere quando si è esausti, aggiungere carte senza una funzione, usare significati presi da mazzi diversi e spaventarsi per titoli letterali. Fermati quando la consultazione aumenta agitazione o interferisce con sonno, relazioni e responsabilità. In quel caso cerca supporto umano.',
    lux: 'Luxseetarot organizza domanda e tre posizioni, ma la disciplina resta tua. Leggi una volta, annota ciò che è pertinente e usa gli approfondimenti soltanto per un punto distinto. Nessun sistema digitale può garantire eventi o sostituire professionisti.',
    exercise: [
      'Controlla se desideri comprensione o conferma.',
      'Scrivi una sola domanda e non modificarla.',
      'Dopo la lettura, indica fatto, ipotesi e azione.',
      'Aspetta un cambiamento reale prima di consultare ancora.',
    ],
  },
  'tarocchi-online-come-scegliere': {
    concept: 'Affidabilità non significa capacità di predire con certezza, ma coerenza tra ciò che il servizio dichiara e ciò che offre. Un’esperienza responsabile spiega metodo, prezzo, limiti e gestione dei dati con parole accessibili, lasciando all’utente libertà di interrompere.',
    method: [
      'Esamina la pagina prima di inserire dati: connessione sicura, privacy, condizioni, contatti e identità del gestore devono essere raggiungibili.',
      'Controlla il percorso economico: costo finale, contenuto sbloccato, eventuali rinnovi e modalità di assistenza non dovrebbero comparire soltanto dopo il pagamento.',
      'Valuta il tono: un testo utile propone possibilità e domande; un testo manipolativo usa paura, urgenza, colpa o promesse impossibili.',
    ],
    examples: [
      'Una lettura d’amore responsabile non vende il ritorno garantito dell’ex e non invita a violare i suoi confini.',
      'Una lettura sul lavoro distingue riflessione simbolica da consulenza su contratto, tasse o investimento.',
      'Per una scelta personale, il servizio dovrebbe aiutare a vedere alternative, non dichiararsi unica fonte di verità.',
    ],
    limits: 'Recensioni, grafica elegante e parole personalizzate non bastano da sole. Non inviare documenti, password, dati sanitari o finanziari non necessari. Evita servizi che aumentano continuamente il prezzo per rivelare un presunto pericolo. In caso di addebiti dubbi, usa canali di assistenza e pagamento ufficiali.',
    lux: 'Per valutare Luxseetarot, osserva il percorso dichiarato: domanda, tre carte, anteprima e scelta eventuale di approfondire. Leggi privacy e condizioni, non inserire informazioni sensibili nella domanda e considera il risultato intrattenimento riflessivo. Sei libero di fermarti all’anteprima.',
    exercise: [
      'Verifica gestore, contatti, privacy e condizioni.',
      'Annota prezzo e contenuto prima di confermare.',
      'Cerca promesse assolute o pressioni emotive.',
      'Condividi soltanto il contesto strettamente utile.',
    ],
  },
  'tarocchi-quotidiani-abitudine-consapevole': {
    concept: 'Una pratica quotidiana funziona quando allena osservazione e non pretende di anticipare ogni evento. La carta del giorno può diventare una lente: scegli un tema, lo noti nelle azioni e alla sera verifichi. Il valore nasce dal confronto ripetuto tra simbolo e vita, non dal numero di estrazioni.',
    method: [
      'Usa sempre una domanda leggera e orientativa, come quale qualità coltivare, evitando previsioni su tutto ciò che potrebbe succedere.',
      'Mantieni la stessa struttura per alcune settimane: impressione iniziale, significato studiato, comportamento scelto e riscontro serale.',
      'Rivedi il diario a fine settimana per osservare temi ricorrenti e differenze tra aspettativa mattutina ed esperienza reale.',
    ],
    examples: [
      'Una carta di ascolto può tradursi nel lasciare finire un collega prima di rispondere, non nell’attendere passivamente un segno.',
      'Una carta di confine può invitare a rimandare una conversazione impulsiva e scegliere un momento più calmo in amore.',
      'Una carta di movimento può diventare una telefonata, una passeggiata o un piccolo compito rimasto fermo.',
    ],
    limits: 'Se estrai di nuovo perché la prima carta non piace, controlli compulsivamente gli eventi o temi di agire senza consultare, interrompi la routine. Saltare un giorno non produce conseguenze. Una pratica sana aumenta autonomia; se aumenta ansia, riduci la frequenza e cerca altri strumenti di regolazione.',
    lux: 'Riserva Luxseetarot ai temi che meritano una sequenza a tre carte, invece di usarlo automaticamente per ogni dettaglio giornaliero. Formula una domanda chiara, leggi l’anteprima e annota un gesto. Gli approfondimenti servono quando emerge un nodo specifico, non come rituale obbligatorio.',
    exercise: [
      'Scegli un orario e un limite di cinque minuti.',
      'Annota tre parole prima di cercare significati.',
      'Associa una sola azione osservabile.',
      'Alla sera scrivi cosa hai verificato e cosa no.',
    ],
  },
  'tarocchi-amore-domande-esempi': {
    concept: 'La qualità della domanda dipende dal suo scopo. Una domanda esplorativa descrive la dinamica, una decisionale confronta strade, una di crescita cerca il tuo schema. Sapere quale stai ponendo impedisce di accumulare quesiti diversi dentro una sola estrazione.',
    method: [
      'Sostituisci “sempre”, “mai” e “sicuramente” con un riferimento alla fase attuale. Le relazioni cambiano e una formulazione temporale resta più onesta.',
      'Inserisci un elemento osservabile: comunicazione, reciprocità, confini, disponibilità o bisogno. Evita di chiedere la lettura completa della mente altrui.',
      'Concludi con il tuo margine di azione, così la risposta non ti lascia in attesa passiva di una scelta esterna.',
    ],
    examples: [
      'Per una relazione nuova: “Quale ritmo ci permette di conoscerci senza idealizzare e quali segnali di reciprocità osservare?”.',
      'Per una crisi: “Cosa alimenta il conflitto, quale bisogno non stiamo esprimendo e come posso aprire un confronto rispettoso?”.',
      'Per un bivio: “Quali valori proteggo restando, quali lasciando e cosa devo verificare prima di scegliere?”.',
    ],
    limits: 'Non unire ex, nuova conoscenza e futuro sentimentale nella stessa frase. Evita domande che cercano garanzie, autorizzano controllo o ignorano un rifiuto esplicito. Le carte non provano tradimento, amore o intenzioni. Se una relazione è violenta o coercitiva, cerca supporto competente.',
    lux: 'Scegli su Luxseetarot una domanda principale tra gli esempi e personalizzala con il minimo contesto necessario. La sequenza a tre carte mostrerà radice, clima e direzione. Solo dopo, se serve, formula una domanda successiva sulle stesse carte relativa a un punto preciso.',
    exercise: [
      'Definisci se vuoi esplorare, decidere o crescere.',
      'Cancella le richieste di certezza e controllo.',
      'Aggiungi un comportamento o bisogno concreto.',
      'Rileggi: la domanda deve restituirti un margine d’azione.',
    ],
  },
};

const EXTRA_NOTES = {
  'tarocchi-si-o-no': 'Un criterio semplice è immaginare entrambi gli esiti. Se fosse sì, quale responsabilità avresti? Se fosse no, quale alternativa resterebbe disponibile? Questo doppio scenario riduce il peso del responso e restituisce alla domanda la sua funzione: prepararti a scegliere con maggiore lucidità.',
  'differenza-tarocchi-oroscopo': 'Puoi anche osservare la diversa frequenza d’uso: un quadro astrologico periodico può accompagnare settimane o mesi, mentre una lettura di carte nasce da una questione presente. Consultarli con ritmi distinti evita di sovrapporre messaggi e cercare conferme incrociate.',
  'come-interpretare-i-tarocchi': 'Quando studi, crea un dizionario personale con tre colonne: significato tradizionale, dettaglio visivo e applicazione sperimentata. Col tempo vedrai quali associazioni sono solide e quali dipendevano dall’umore. La pratica migliora non accumulando definizioni, ma motivando ogni passaggio interpretativo.',
  'tarocchi-lavoro-carriera': 'Per rendere la lettura misurabile, stabilisci un indicatore: numero di candidature, ore di studio, conversazioni esplorative o risposta a una proposta. Dopo alcune settimane confronta l’intuizione iniziale con questi dati. La verifica può confermare una direzione oppure suggerire di correggerla senza vivere il cambiamento come fallimento.',
  'tarocchi-ex-e-ricongiungimento': 'Una domanda particolarmente utile riguarda ciò che dovrebbe essere diverso rispetto al passato. Elenca cambiamenti reciproci, non soltanto promesse: comunicazione, gestione dei conflitti, disponibilità e rispetto. Se l’elenco dipende interamente dall’altra persona, concentra l’energia su ciò che puoi proteggere oggi e sulla tua rete di sostegno.',
  'arcani-maggiori-significato': 'Per studiarli senza confonderti, raggruppali per funzione invece di imparare ventidue definizioni isolate: figure che avviano, formano, mettono alla prova e completano. Poi osserva come la stessa funzione cambia quando l’Arcano occupa passato, presente o futuro.',
  'arcani-minori-cosa-sono': 'Un esercizio comparativo chiarisce bene il sistema: prendi lo stesso numero nei quattro semi e nota cosa cambia. Il Cinque, per esempio, introduce una difficoltà, ma questa può essere competitiva nei Bastoni, emotiva nelle Coppe, mentale nelle Spade o materiale nei Denari. Numero e elemento lavorano sempre insieme.',
  'tarocchi-futuro-prossimo': 'Rileggere la consultazione alla scadenza scelta è più istruttivo che farne una nuova. Segna quali condizioni si sono manifestate, quali sono cambiate grazie alle tue azioni e quali dipendevano da altri. In questo modo impari a usare il futuro come scenario adattabile e non come promessa da attendere passivamente.',
  'quando-fare-una-lettura-dei-tarocchi': 'Può essere utile creare una regola personale di pausa: una settimana per lo stesso tema, salvo fatti davvero nuovi. Non è una norma esoterica, ma un confine pratico. Nel frattempo applica il passo scelto, parla con chi è coinvolto e raccogli informazioni; la realtà deve avere il tempo di rispondere.',
  'tarocchi-e-intuito': 'Il diario permette anche di riconoscere il tono delle proiezioni. Se le impressioni cambiano radicalmente con l’ansia, probabilmente descrivono lo stato emotivo più che la situazione. Non è tempo perso: hai comunque scoperto un bisogno da regolare prima di interpretare o decidere.',
  'significato-carta-il-matto': 'Il suo insegnamento più concreto è progettare l’esplorazione. Puoi concederti curiosità senza impegnare subito tutte le risorse: una conversazione prima di una relazione, un prototipo prima di un’impresa, una visita prima di un trasferimento. Se il test porta energia e informazioni, il passo seguente sarà meno cieco; se mostra limiti, fermarti non annulla il coraggio iniziale. Il Matto maturo resta mobile anche quando deve correggere rotta con consapevolezza.',
  'significato-carta-gli-amanti': 'Quando il dilemma sembra insolubile, prova a descrivere la persona che diventi scegliendo ciascuna strada. Non concentrarti soltanto sul beneficio immediato: considera fiducia, coerenza e conseguenze sulle relazioni. La carta invita a integrare parti diverse, ma talvolta integrare significa anche rinunciare con chiarezza a un’opzione incompatibile. Una scelta consapevole non elimina il dispiacere; gli dà un significato.',
  'significato-carta-la-torre': 'Dopo una Torre, la fretta di ricostruire può riprodurre lo stesso problema. Concediti una fase di inventario: cosa funzionava davvero, cosa veniva sostenuto per paura e quali segnali erano stati ignorati? Questa analisi trasforma lo shock in apprendimento e aiuta a scegliere fondamenta più semplici, verificabili e condivise.',
  'errori-comuni-lettura-tarocchi': 'Per migliorare, rivedi periodicamente tre consultazioni passate. Chiediti quali frasi erano davvero collegate alle carte, quali erano così generiche da adattarsi a tutto e quali azioni hanno prodotto risultati. Questo controllo sviluppa umiltà interpretativa. Puoi scoprire che una carta “sbagliata” aveva descritto bene il tuo atteggiamento, oppure che avevi aggiunto dettagli mai suggeriti dallo spread. Correggere il metodo vale più che difendere ogni previsione.',
  'tarocchi-online-come-scegliere': 'Prima di usare regolarmente una piattaforma, prova una domanda di cui conosci bene il contesto. Non per testare capacità soprannaturali, ma per valutare se il testo distingue sfumature, mantiene un tono rispettoso e non inventa pericoli. Controlla inoltre che uscire, chiedere assistenza o esercitare i diritti sui dati sia comprensibile. Un buon servizio non rende difficile fermarsi. Conserva ricevute e conferme delle operazioni, soprattutto se acquisti contenuti aggiuntivi, e rileggi sempre con calma le condizioni.',
  'tarocchi-quotidiani-abitudine-consapevole': 'Alterna anche giorni di osservazione senza carte. Chiediti al mattino quale qualità vuoi praticare e confrontala la sera con le azioni. Questa pausa dimostra che il rituale è un supporto, non la fonte della tua capacità di riflettere. Se torni al mazzo con più curiosità e meno urgenza, la routine sta lavorando nella direzione giusta.',
  'tarocchi-amore-domande-esempi': 'Prima dell’estrazione prova a rispondere tu stesso alla domanda con ciò che sai. Elenca segnali favorevoli, contrari e informazioni mancanti. La lettura non parte così da un vuoto emotivo, ma dialoga con una base reale. Al termine potrai distinguere meglio uno spunto nuovo da una semplice ripetizione di ciò che desideravi sentirti dire.',
};

function renderExpansion(item, slug) {
  if (!item) return '';
  const extraNote = EXTRA_NOTES[slug]
    ? `<p>${EXTRA_NOTES[slug]}</p>`
    : '';
  return `
<h2>Un metodo più preciso</h2>
<p>${item.concept}</p>
<p>Per procedere senza perdere il filo, usa questa sequenza:</p>
<ol>${item.method.map((value) => `<li>${value}</li>`).join('')}</ol>
<h2>Esempi pratici</h2>
<p>Lo stesso simbolo acquista significato quando viene riportato a una situazione reale. Ecco tre applicazioni da adattare con prudenza:</p>
<ul>${item.examples.map((value) => `<li>${value}</li>`).join('')}</ul>
<p>In tutti e tre i casi, la lettura è più utile se produce una domanda verificabile o un passo proporzionato. Non occorre trasformare ogni carta in un evento: a volte descrive un atteggiamento, una risorsa o un conflitto già presente.</p>
<h2>Errori, limiti e realtà</h2>
<p>${item.limits}</p>
<p>Considera quindi i tarocchi come uno strumento di intrattenimento e riflessione. Mantieni la libertà di non riconoscerti nel testo e confronta sempre l’interpretazione con comportamenti, informazioni e conseguenze concrete.</p>
<h2>Come applicarlo su Luxseetarot</h2>
<p>${item.lux}</p>
<p>Prima di iniziare, riduci il contesto agli elementi che cambiano davvero la lettura. Dopo, riassumi il messaggio con parole tue: questo passaggio mostra se hai ottenuto chiarezza oppure soltanto nuove domande.</p>
${extraNote}
<h2>Mini esercizio</h2>
<p>Prendi un foglio o una nota e completa la checklist:</p>
<ul>${item.exercise.map((value) => `<li>${value}</li>`).join('')}</ul>
<p>Chiudi scrivendo una frase: “Dopo questa lettura posso osservare o fare…”. Se non trovi nulla di concreto, lascia riposare il tema invece di estrarre subito altre carte.</p>`.trim();
}

function article(partial) {
  const slug = String(partial.slug || '');
  const coverImage =
    partial.coverImage ||
    (slug ? `/images/blog/${slug}.jpg?v=3` : '');
  let bodyHtml = String(partial.bodyHtml || '');
  const expansion = EXPANSIONS[slug];
  if (expansion && bodyHtml.includes(CTA)) {
    bodyHtml = bodyHtml.replace(CTA, `${renderExpansion(expansion, slug)}\n${CTA}`);
  }
  const links = RELATED[slug] || [];
  if (!bodyHtml.includes('<h2>Approfondisci</h2>')) {
    const block = related(links);
    if (bodyHtml.includes(CTA)) {
      bodyHtml = bodyHtml.replace(CTA, `${block}\n${CTA}`);
    } else {
      bodyHtml = `${bodyHtml}\n${block}\n${CTA}`;
    }
  }
  return {
    status: 'draft',
    faq: partial.faq || [],
    ...partial,
    bodyHtml,
    coverImage,
    coverAlt: partial.coverAlt || partial.title || '',
  };
}

export function getSeedArticles() {
  return [
    article({
      slug: 'significato-tarocchi-amore',
      title: 'Significato dei tarocchi in amore: come leggere le dinamiche',
      description:
        'Guida al significato dei tarocchi in amore: cosa osservare nelle carte, esempi di domande utili e limiti di una lettura sentimentale.',
      keyword: 'significato tarocchi amore',
      coverAlt: 'Rosa e carte dei tarocchi alla luce di una candela',
      faq: [
        {
          q: 'I tarocchi possono dirmi se una persona mi ama?',
          a: 'Possono descrivere clima emotivo, aperture e resistenze simboliche. Non sostituiscono un dialogo diretto né danno certezze assolute sui sentimenti altrui.',
        },
        {
          q: 'Meglio chiedere dell’altro o di me?',
          a: 'Le letture più utili tengono insieme entrambi: la dinamica e il tuo ruolo. Se punti solo sull’altro, rischi ansia e poco margine d’azione.',
        },
        {
          q: 'Una lettura d’amore va ripetuta spesso?',
          a: 'Meglio lasciar “respirare” la situazione. Ripetere ogni giorno la stessa domanda tende a confondere più che a chiarire.',
        },
      ],
      bodyHtml: `
<p>Quando si parla di <strong>significato dei tarocchi in amore</strong>, molte persone cercano una risposta netta: sì o no, torna o non torna, mi sceglie o no. Una lettura utile, però, funziona meglio se dicitura e attesa sono diverse: non una sentenza, ma una mappa simbolica della dinamica.</p>
<p>Su Luxseetarot la lettura a tre carte (passato, presente, futuro) aiuta a vedere cosa si è creato, cosa è vivo ora e quale energia sembra aprirsi dopo. È un’esperienza di riflessione e intrattenimento, non un verdetto definitivo.</p>
<h2>Cosa osservare in una lettura sentimentale</h2>
<p>In amore le carte spesso parlano di tre piani:</p>
<ul>
  <li><strong>Clima emotivo</strong>: attrazione, distanza, idealizzazione, paura di perdere.</li>
  <li><strong>Comunicazione</strong>: ciò che si dice, ciò che si tace, i malintesi.</li>
  <li><strong>Scelta</strong>: restare, parlare, aspettare, chiudere con rispetto.</li>
</ul>
<p>Una carta “difficile” non significa necessariamente fine della storia. Può indicare un nodo da affrontare, un’illusione da sciogliere o un tempo di riorganizzazione interiore.</p>
<h2>Domande che rendono la lettura più leggibile</h2>
<ul>
  <li>Quale energia c’è tra me e questa persona in questo momento?</li>
  <li>Cosa posso fare io per stare meglio in questa dinamica?</li>
  <li>È più utile parlare ora oppure prendere distanza?</li>
  <li>Quale schema sto ripetendo in amore?</li>
</ul>
<p>Evita formule tipo “Dimmi che mi ama” o “Garantiscimi che tornerà”: chiudono lo spazio di lettura e aumentano solo l’attesa ansiosa.</p>
<h2>Come usare passato, presente e futuro</h2>
<p>Il passato aiuta a capire da dove arriva il nodo (una delusione, una idealizzazione, un’abitudine). Il presente descrive il clima attuale. Il futuro, nei tarocchi, non è un calendario fisso: è una tendenza se continui sulla stessa linea energetica.</p>
<p>Se la terza carta suggerisce apertura, chiediti cosa puoi fare per sostenerla. Se suggerisce chiusura o maturazione, chiediti cosa stai ancora evitando di vedere.</p>
<h2>Limiti utili da tenere a mente</h2>
<p>I tarocchi non sostituiscono una conversazione, una terapia o decisioni legali/mediche. In amore, soprattutto, restano uno strumento di introspezione: ti aiutano a nominare emozioni e opzioni, non a controllare l’altro.</p>
<p>Se esci dalla lettura più confuso di prima, spesso la domanda era troppo stretta o troppo carica. Riformulala e riprova con più calma.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'lettura-tarocchi-tre-carte',
      title: 'Lettura tarocchi a tre carte: passato, presente e futuro',
      description:
        'Come funziona la lettura dei tarocchi a tre carte: significato delle posizioni, esempi pratici e come usarla su Luxseetarot.',
      keyword: 'lettura tarocchi tre carte',
      faq: [
        {
          q: 'Perché proprio tre carte?',
          a: 'Tre posizioni danno un arco narrativo chiaro senza sovraccaricare. È un formato ideale per una domanda principale.',
        },
        {
          q: 'Le posizioni sono sempre passato-presente-futuro?',
          a: 'È lo schema più comune e leggibile. Altre varianti esistono, ma per iniziare questo schema è il più concreto.',
        },
        {
          q: 'Posso approfondire dopo la lettura?',
          a: 'Sì: su Luxseetarot puoi aggiungere nuove domande sulle stesse carte per approfondire senza perdere il filo.',
        },
      ],
      bodyHtml: `
<p>La <strong>lettura tarocchi a tre carte</strong> è uno degli schemi più usati perché è semplice e narrativa: una storia in tre tempi. Non serve conoscere a memoria tutti i significati: serve una domanda chiara e la disponibilità a leggere le carte come un insieme, non come tre messaggi isolati.</p>
<h2>Le tre posizioni</h2>
<ul>
  <li><strong>Passato</strong>: radice, abitudine, esperienza che ha preparato il terreno.</li>
  <li><strong>Presente</strong>: clima attuale, nodo vivo, energia dominante.</li>
  <li><strong>Futuro</strong>: direzione probabile se la dinamica resta simile; non è una data garantita.</li>
</ul>
<p>L’errore più frequente è leggere solo la terza carta. Il futuro ha senso solo se lo colleghi a ciò che emerge prima.</p>
<h2>Come collegare le carte tra loro</h2>
<p>Chiediti:</p>
<ol>
  <li>C’è un tema che si ripete (scelta, attesa, comunicazione, paura)?</li>
  <li>Il presente conferma o corregge il passato?</li>
  <li>Il futuro propone maturazione, apertura o un cambio di passo?</li>
</ol>
<p>Esempio: passato di idealizzazione, presente di dubbio, futuro di chiarezza. Non è “brutto”: è un invito a vedere meglio prima di investire altre energie.</p>
<h2>Quando usarla</h2>
<p>Funziona bene per amore, lavoro, scelte personali e momenti in cui hai bisogno di ordine mentale. Meno adatta se vuoi un elenco di eventi precisi giorno per giorno.</p>
<p>Su Luxseetarot puoi fare <a href="/tarocchi-gratis.html">tarocchi gratis</a>: poni la domanda, scegli tre carte e ricevi un testo che tiene insieme simboli e contesto. L’anteprima è gratuita; puoi poi approfondire se ti serve più dettaglio.</p>
<h2>Consiglio pratico</h2>
<p>Prima di estrarre, scrivi la domanda in una riga. Dopo la lettura, annota una sola azione concreta che puoi fare nei prossimi giorni. Così la consultazione resta utile e non diventa solo curiosità.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-gratis-online-come-funzionano',
      title: 'Tarocchi gratis online: come funzionano davvero',
      description:
        'Cosa aspettarti da una lettura tarocchi gratis online: differenze tra anteprima e lettura completa, limiti e come usarla in modo utile.',
      keyword: 'tarocchi gratis online',
      faq: [
        {
          q: 'Una lettura gratis è meno vera?',
          a: 'Gratis o a pagamento non cambia la natura simbolica delle carte. Cambia la profondità del testo e il livello di dettaglio che ricevi.',
        },
        {
          q: 'Devo creare un account?',
          a: 'Su Luxseetarot puoi iniziare senza account obbligatorio: inserisci i dati della consultazione e procedi con l’anteprima.',
        },
        {
          q: 'Quante letture gratuite posso fare?',
          a: 'Dipende dal servizio. Su Luxseetarot l’anteprima quotidiana ha un limite per evitare abusi e mantenere qualità.',
        },
      ],
      bodyHtml: `
<p>Cercare <strong>tarocchi gratis online</strong> è spesso il primo passo: vuoi capire se una lettura digitale ti parla, senza impegno. Ha senso, a patto di sapere cosa stai chiedendo al servizio e cosa invece non può darti. Su Luxseetarot la pagina dedicata <a href="/tarocchi-gratis.html">Tarocchi gratis</a> spiega l’anteprima a tre carte e ti porta subito a iniziare.</p>
<h2>Cosa significa “gratis” in una lettura online</h2>
<p>Di solito indica un’anteprima o una consultazione breve. Su Luxseetarot, ad esempio, puoi estrarre tre carte e leggere un’anteprima: abbastanza per cogliere il tono della risposta. La lettura completa approfondisce dinamiche, sfumature e spunti pratici.</p>
<p>Gratis non significa “oracolo infallibile”. Significa accesso leggero a un’esperienza simbolica generata digitalmente.</p>
<h2>Come usarla in modo utile</h2>
<ul>
  <li>Prepara una domanda chiara e unica.</li>
  <li>Leggi tutto il testo, non solo la frase che speravi di trovare.</li>
  <li>Trasforma un passaggio in un’azione concreta (parlare, attendere, chiarire, riposare).</li>
  <li>Non ripetere la stessa domanda dieci volte nello stesso giorno.</li>
</ul>
<h2>Differenza tra curiosità e riflessione</h2>
<p>Se apri una lettura solo per “sentirti dire di sì”, rischi delusione anche con un testo buono. Se la usi per mettere ordine — “cosa sto evitando?”, “dove ho margine?” — l’esperienza diventa più solida.</p>
<h2>Limiti onesti</h2>
<p>Nessuna lettura online sostituisce un confronto umano importante, un percorso terapeutico o decisioni professionali. È intrattenimento riflessivo: utile, ma non prescrittivo.</p>
<p>Se dopo l’anteprima vuoi più profondità sulla stessa estrazione, su Luxseetarot puoi sbloccare la lettura completa o approfondire con nuove domande.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-si-o-no',
      title: 'Tarocchi sì o no: quando ha senso (e quando no)',
      description:
        'Le domande sì/no ai tarocchi funzionano poco: ecco alternative migliori, esempi pratici e come ottenere risposte più utili.',
      keyword: 'tarocchi sì o no',
      faq: [
        {
          q: 'Posso fare ugualmente una domanda chiusa?',
          a: 'Sì, ma riformulala: da “Succederà?” a “Quale energia favorisce o ostacola questa possibilità?”.',
        },
        {
          q: 'I tarocchi mentono se chiedo sì o no?',
          a: 'Non “mentono”: semplicemente una domanda troppo stretta produce una lettura povera o ambigua.',
        },
        {
          q: 'Esiste una carta che significa sì?',
          a: 'Non in modo assoluto. Contesto, posizione e combinazione contano più di una singola etichetta.',
        },
      ],
      bodyHtml: `
<p>Le domande <strong>sì o no ai tarocchi</strong> sembrano pratiche, ma spesso deludono. Le carte raccontano processi, tensioni e inclinazioni; raramente si prestano a un interruttore binario.</p>
<h2>Perché il sì/no restringe troppo</h2>
<p>Una relazione, un lavoro o una scelta raramente sono solo bianchi o neri. Se forzi la risposta in due caselle, perdi proprio ciò che rende utile una lettura: sfumature, tempi, responsabilità personali.</p>
<h2>Come trasformare una domanda chiusa</h2>
<ul>
  <li>Da “Mi chiamerà?” a “Quale energia c’è nella comunicazione tra noi ora?”</li>
  <li>Da “Prendo quel lavoro?” a “Cosa mi offre e cosa mi chiede questa opportunità?”</li>
  <li>Da “È la persona giusta?” a “Come sto crescendo in questa relazione e cosa posso chiarire?”</li>
</ul>
<p>Noti la differenza: passi dal voler controllare l’evento al comprendere la dinamica.</p>
<h2>Quando una domanda chiusa può bastare</h2>
<p>A volte serve un focus stretto (“È il momento di parlare questa settimana?”). Anche lì, però, è meglio aprire: “Quale approccio mi aiuta se decido di parlare?”. Ottieni orientamento, non solo un monosilabo.</p>
<h2>In pratica su Luxseetarot</h2>
<p>Scrivi la tua domanda sì/no, poi riscrivila in forma aperta prima di estrarre le carte. La lettura a tre posizioni guadagna subito chiarezza.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'differenza-tarocchi-oroscopo',
      title: 'Differenza tra tarocchi e oroscopo: cosa scegliere',
      description:
        'Tarocchi e oroscopo non sono la stessa cosa: differenze, punti di forza e quando ha senso una lettura a carte rispetto all’astrologia.',
      keyword: 'differenza tarocchi oroscopo',
      faq: [
        {
          q: 'I tarocchi dipendono dal segno zodiacale?',
          a: 'No. Puoi indicare data di nascita come contesto personale, ma le carte rispondono alla domanda e all’estrazione, non al solo segno.',
        },
        {
          q: 'Posso usare entrambi?',
          a: 'Sì, come linguaggi diversi. L’oroscopo offre un clima generale; i tarocchi si concentrano su una domanda specifica.',
        },
        {
          q: 'Quale è più preciso?',
          a: 'Dipende da cosa cerchi. Per un tema concreto e personale, una lettura a tre carte è spesso più mirata di un oroscopo generico.',
        },
      ],
      bodyHtml: `
<p>Capire la <strong>differenza tra tarocchi e oroscopo</strong> evita aspettative sbagliate. Entrambi usano un linguaggio simbolico, ma lavorano su scale diverse.</p>
<h2>Oroscopo: clima ampio</h2>
<p>L’oroscopo parla di tendenze legate a segni, transiti o periodi. Può essere stimolante, ma resta spesso generale: vale per molte persone nello stesso segno o nello stesso momento astrologico.</p>
<h2>Tarocchi: domanda specifica</h2>
<p>I tarocchi partono da una domanda tua e da un’estrazione. Il testo si concentra su una situazione concreta: una relazione, un dubbio lavorativo, una scelta. Per questo, in molti casi, risultano più “vicini” al qui e ora.</p>
<h2>Quando scegliere i tarocchi</h2>
<ul>
  <li>Hai un dubbio preciso e vuoi ordinarlo.</li>
  <li>Ti serve uno schema passato-presente-futuro.</li>
  <li>Vuoi riflettere sul tuo ruolo, non solo sul “clima del mese”.</li>
</ul>
<h2>Quando l’oroscopo può bastare</h2>
<p>Se cerchi ispirazione leggera o un quadro periodico, l’oroscopo può essere sufficiente. Se invece senti un nodo emotivo o decisionale, le carte offrono un focus migliore.</p>
<p>Su Luxseetarot il percorso è orientato alla domanda e alle tre carte: ideale quando vuoi una lettura personale in pochi minuti, senza confondere i due linguaggi.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'come-interpretare-i-tarocchi',
      title: 'Come interpretare i tarocchi senza confondersi',
      description:
        'Metodo semplice per interpretare i tarocchi: contesto, posizioni, combinazioni e errori da evitare se sei all’inizio.',
      keyword: 'come interpretare i tarocchi',
      faq: [
        {
          q: 'Devo memorizzare tutti i significati?',
          a: 'No all’inizio. Impara a leggere la storia tra le carte; i dettagli si costruiscono con la pratica.',
        },
        {
          q: 'Una carta negativa rovina tutto?',
          a: 'Raramente. Spesso segnala un lavoro interno, un confine o un cambio necessario.',
        },
        {
          q: 'Meglio libro dei significati o intuizione?',
          a: 'Entrambi: il significato tradizionale è una base, il contesto della domanda lo rende vivo.',
        },
      ],
      bodyHtml: `
<p>Imparare <strong>come interpretare i tarocchi</strong> non significa diventare infallibili. Significa costruire un metodo: domanda, posizioni, relazioni tra carte, conclusione pratica.</p>
<h2>Un metodo in 5 passi</h2>
<ol>
  <li><strong>Domanda</strong>: una sola, chiara.</li>
  <li><strong>Posizioni</strong>: cosa rappresenta ciascuna carta nello schema.</li>
  <li><strong>Simbolo centrale</strong>: immagine, elemento, atmosfera.</li>
  <li><strong>Combinazione</strong>: le carte si confermano, si correggono o si contrastano?</li>
  <li><strong>Azione</strong>: cosa puoi osservare o fare dopo la lettura.</li>
</ol>
<h2>Leggi il insieme, non la carta isolata</h2>
<p>La Torre da sola spaventa; con carte di guarigione o chiarezza può indicare liberazione da una struttura falsa. I Maggiori spesso segnano temi forti; i Minori descrivono quotidiano e dettagli.</p>
<h2>Errori tipici di chi inizia</h2>
<ul>
  <li>Cercare solo conferma di ciò che si spera.</li>
  <li>Ignorare la domanda posta.</li>
  <li>Sovrainterpretare ogni dettaglio minore.</li>
  <li>Trasformare ogni lettura in ansia da controllo.</li>
</ul>
<h2>Come aiuta una lettura guidata</h2>
<p>Se non vuoi fare tutto da solo, una lettura online come quella di Luxseetarot ti restituisce un testo già strutturato sulle tre carte. Resta comunque tuo il compito di collegarlo alla vita reale con onestà.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-lavoro-carriera',
      title: 'Tarocchi e lavoro: leggere scelte di carriera con lucidità',
      description:
        'Come usare i tarocchi per il lavoro e la carriera: domande utili, cosa possono chiarire e cosa non promettono.',
      keyword: 'tarocchi lavoro',
      faq: [
        {
          q: 'I tarocchi mi dicono se verrò assunto?',
          a: 'Possono indicare clima, preparazione e ostacoli simbolici. Non sostituiscono curriculum, colloquio e decisioni aziendali.',
        },
        {
          q: 'Posso chiedere di un collega o capo?',
          a: 'Meglio centrare la domanda sul tuo ruolo e sulla dinamica, non sul controllo della mente altrui.',
        },
        {
          q: 'Una carta difficile significa licenziamento?',
          a: 'No in automatico. Può parlare di stress, cambio di metodo, bisogno di confini o di aggiornamento professionale.',
        },
      ],
      bodyHtml: `
<p>Usare i <strong>tarocchi per il lavoro</strong> ha senso quando vuoi chiarezza su motivazione, timing interiore e direzione — non quando cerchi una garanzia di assunzione o promozione.</p>
<h2>Temi lavorativi che le carte leggono bene</h2>
<ul>
  <li>Blocco creativo o perdita di senso.</li>
  <li>Dubbio tra restare e cambiare.</li>
  <li>Preparazione a un colloquio o a una proposta.</li>
  <li>Relazioni professionali tense.</li>
</ul>
<h2>Domande efficaci</h2>
<ul>
  <li>Quale energia sto portando in questo lavoro ora?</li>
  <li>Cosa mi conviene rafforzare prima del prossimo passo?</li>
  <li>Questa opportunità mi allinea o mi disperde?</li>
  <li>Dove sto sottovalutando i miei margini?</li>
</ul>
<h2>Come leggere passato-presente-futuro in carriera</h2>
<p>Il passato può mostrare abitudini (ipercontrollo, paura di esporsi, sacrifici eccessivi). Il presente indica il clima attuale. Il futuro suggerisce la direzione se non cambi approccio: a volte invita a pazienza strategica, altre a un movimento concreto.</p>
<h2>Restare realisti</h2>
<p>Le carte non firmano contratti. Ti aiutano a decidere con meno nebbia emotiva. Dopo la lettura, traduce sempre un insight in un’azione: aggiornare il profilo, parlare con un mentore, fissare un confine, studiare una competenza.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-ex-e-ricongiungimento',
      title: 'Tarocchi sull’ex: come leggere ritorno e chiusura senza illusioni',
      description:
        'Lettura tarocchi sull’ex e sul possibile ritorno: domande sane, segnali da interpretare con cautela e alternative più utili.',
      keyword: 'tarocchi ex ritorno',
      faq: [
        {
          q: 'I tarocchi possono promettere che l’ex tornerà?',
          a: 'No. Possono descrivere energie residue, aperture o chiusure simboliche, non garantire comportamenti futuri.',
        },
        {
          q: 'Quante volte posso chiedere dello stesso ex?',
          a: 'Se ripeti ogni giorno la stessa domanda, probabilmente stai alimentando l’ansia. Meglio una lettura chiara e poi tempo reale.',
        },
        {
          q: 'Cosa chiedere al posto di “Torna?”',
          a: '“Quale lezione di questa storia sto ancora evitando?” oppure “Cosa mi aiuta a chiudere o a ripartire con rispetto?”.',
        },
      ],
      bodyHtml: `
<p>Le letture sui <strong>tarocchi e l’ex</strong> sono tra le più cercate — e tra le più delicate. Il rischio è usare le carte per prolungare un’attesa invece di capire cosa ti serve davvero.</p>
<h2>Cosa possono mostrare le carte</h2>
<ul>
  <li>Energia ancora aperta o già esaurita.</li>
  <li>Idealizzazione vs realtà della relazione.</li>
  <li>Lavoro interiore incompleto.</li>
  <li>Possibile dialogo, oppure bisogno di distanza.</li>
</ul>
<p>Una carta di riconciliazione non è un biglietto di ritorno. È un’indicazione simbolica da verificare nei fatti e nel rispetto reciproco.</p>
<h2>Domande più sane</h2>
<ul>
  <li>Cosa sto cercando davvero quando penso a questa persona?</li>
  <li>Quale parte di me vuole chiusura e quale vuole ripetere lo schema?</li>
  <li>Come posso riprendere energia indipendentemente dall’esito?</li>
</ul>
<h2>Segnali da non forzare</h2>
<p>Se ogni lettura la pieghi verso “tornerà”, stai consultando la tua speranza, non le carte. Un buon uso dei tarocchi sull’ex è onesto anche quando fa male: a volte indica maturazione in solitudine, non ricongiungimento.</p>
<p>Su Luxseetarot formula una domanda centrata su di te e sulla dinamica. Poi lascia tempo alla vita reale di rispondere.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'arcani-maggiori-significato',
      title: 'Arcani Maggiori: significato e ruolo in una lettura',
      description:
        'Cosa sono gli Arcani Maggiori dei tarocchi, perché pesano di più in lettura e come interpretarli senza allarmismi.',
      keyword: 'arcani maggiori significato',
      faq: [
        {
          q: 'Quanti sono gli Arcani Maggiori?',
          a: 'Ventidue, dal Matto al Mondo. Rappresentano temi archetipici di percorso.',
        },
        {
          q: 'Se escono tanti Maggiori è grave?',
          a: 'Indica un tema importante o trasformativo, non necessariamente negativo.',
        },
        {
          q: 'I Maggiori bastano da soli?',
          a: 'Possono dare il tema centrale; i Minori aggiungono dettagli quotidiani e pratici.',
        },
      ],
      bodyHtml: `
<p>Gli <strong>Arcani Maggiori</strong> sono il cuore simbolico del mazzo: 22 figure che raccontano passaggi di vita ampi — scelta, crisi, rinascita, integrazione. Quando compaiono in lettura, alzano spesso il “volume” del tema.</p>
<h2>Cosa rappresentano</h2>
<p>Non sono semplici “buone” o “cattive”. Il Matto parla di inizio e rischio creativo; gli Amanti di scelta e risonanza; la Torre di rottura di strutture false; il Sole di chiarezza; il Mondo di integrazione. Il senso nasce dal contesto della domanda e dalle carte vicine.</p>
<h2>Come pesarli in una lettura a tre carte</h2>
<ul>
  <li>Un Maggiore nel passato: radice forte del tema.</li>
  <li>Nel presente: stai attraversando un passaggio decisivo.</li>
  <li>Nel futuro: il tema tende a maturare in una svolta o in una presa di coscienza.</li>
</ul>
<h2>Evita l’allarme automatico</h2>
<p>Carte come Morte, Torre o Diavolo spaventano per nome. In lettura spesso indicano trasformazione, liberazione da dipendenze simboliche o fine di un ciclo — processi utili, se affrontati con consapevolezza.</p>
<p>Se vuoi vedere come un Maggiore si inserisce nella tua domanda, una lettura guidata a tre carte su Luxseetarot ti aiuta a contestualizzarlo senza fermarti al solo titolo della carta.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'arcani-minori-cosa-sono',
      title: 'Arcani Minori: cosa sono e come si leggono',
      description:
        'Guida agli Arcani Minori: i quattro semi, i numeri, le figure di corte e il loro ruolo pratico nelle letture quotidiane.',
      keyword: 'arcani minori',
      faq: [
        {
          q: 'Quali sono i quattro semi?',
          a: 'Bastoni (energia/azione), Coppe (emozioni), Spade (mente/conflitto), Denari o Pentacoli (materia/lavoro/corpo).',
        },
        {
          q: 'Le figure di corte sono persone?',
          a: 'Possono indicare persone o parti di te: atteggiamenti, stili, maturità in un ambito.',
        },
        {
          q: 'I Minori sono meno importanti?',
          a: 'No: descrivono il come quotidiano. Senza di loro la lettura resta troppo astratta.',
        },
      ],
      bodyHtml: `
<p>Gli <strong>Arcani Minori</strong> sono 56 carte che raccontano la vita di tutti i giorni: emozioni, pensieri, azioni, risorse. Se i Maggiori segnano il capitolo, i Minori scrivono i paragrafi.</p>
<h2>I quattro semi in sintesi</h2>
<ul>
  <li><strong>Bastoni</strong>: slancio, progetti, desiderio di muoversi.</li>
  <li><strong>Coppe</strong>: affetti, intuizione emotiva, legami.</li>
  <li><strong>Spade</strong>: analisi, verità scomode, tensioni mentali.</li>
  <li><strong>Denari/Pentacoli</strong>: lavoro, soldi, corpo, concretezza.</li>
</ul>
<h2>Numeri e corte</h2>
<p>I numeri raccontano fasi (inizio, costruzione, crisi, consolidamento). Le figure di corte (Fante, Cavaliere, Regina, Re) possono essere persone reali o modi di stare in una situazione: impulsivo, maturo, protettivo, strategico.</p>
<h2>Come usarli nella pratica</h2>
<p>In una lettura a tre carte, un Minore nel presente spesso dice “ecco il dettaglio operativo”. Esempio: un conflitto lavorativo (Spade) con bisogno di pazienza materiale (Denari) e poca energia emotiva (Coppe basse) racconta stress concreto, non solo “destino”.</p>
<p>Su Luxseetarot il testo della lettura integra Maggiori e Minori nel filo della tua domanda, così non resti fermo al solo nome della carta.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-futuro-prossimo',
      title: 'Tarocchi e futuro prossimo: come leggerlo senza date false',
      description:
        'Come usare i tarocchi per il futuro prossimo in modo realistico: tendenze, tempi simbolici e domande che evitano illusioni.',
      keyword: 'tarocchi futuro prossimo',
      faq: [
        {
          q: 'I tarocchi possono dare una data esatta?',
          a: 'Meglio non aspettarlo. Indicano tendenze e condizioni, non un calendario infallibile.',
        },
        {
          q: 'Cosa significa “futuro” in uno spread a tre carte?',
          a: 'Una direzione probabile se la dinamica attuale continua, non un destino bloccato.',
        },
        {
          q: 'Come chiedere del futuro in modo utile?',
          a: 'Indica ambito e fase: “nelle prossime settimane”, “per questo progetto”, “in questa relazione”.',
        },
      ],
      bodyHtml: `
<p>Chiedere ai <strong>tarocchi del futuro prossimo</strong> è naturale. Il punto è farlo senza trasformare le carte in un orario ferroviario della vita.</p>
<h2>Futuro come tendenza, non sentenza</h2>
<p>La terza carta di uno spread passato-presente-futuro descrive un’energia in avvicinamento. Se cambi atteggiamento, anche la traiettoria può cambiare. Per questo le letture più oneste parlano di possibilità e condizioni.</p>
<h2>Domande migliori sul futuro</h2>
<ul>
  <li>Quale energia mi conviene coltivare in questa fase?</li>
  <li>Cosa posso preparare prima che la situazione si muova?</li>
  <li>Quale rischio sto sottovalutando nelle prossime settimane?</li>
  <li>Dove sto già vedendo i primi segnali di cambiamento?</li>
</ul>
<h2>Perché le date assolute confondono</h2>
<p>“Il giorno esatto in cui…” genera dipendenza dalla conferma esterna. I tarocchi lavorano meglio su qualità del tempo: accelerazione, attesa, maturazione, rottura, consolidamento.</p>
<p>Su Luxseetarot puoi inquadrare la domanda sul tuo futuro prossimo e leggere tre carte come una sequenza: da dove vieni, dove sei, verso dove stai inclinando. Poi verifica nei fatti, con pazienza.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'quando-fare-una-lettura-dei-tarocchi',
      title: 'Quando fare una lettura dei tarocchi (e quando rimandare)',
      description:
        'Momenti giusti per una lettura dei tarocchi: segnali utili, stati d’animo da evitare e frequenza consigliata.',
      keyword: 'quando fare lettura tarocchi',
      faq: [
        {
          q: 'Posso leggere i tarocchi ogni giorno?',
          a: 'Puoi, ma se la stessa domanda torna ossessiva è meglio fermarsi e lasciare spazio agli eventi.',
        },
        {
          q: 'È meglio leggere di sera o di mattina?',
          a: 'Conta più la lucidità che l’ora. Scegli un momento in cui puoi stare concentrato qualche minuto.',
        },
        {
          q: 'Se sono agitata ha senso consultare?',
          a: 'Prima calmati. Una lettura fatta in panico spesso viene usata solo per cercare rassicurazione.',
        },
      ],
      bodyHtml: `
<p>Sapere <strong>quando fare una lettura dei tarocchi</strong> migliora la qualità della risposta più di qualsiasi “trucco” sul mazzo.</p>
<h2>Buoni momenti</h2>
<ul>
  <li>Hai un dubbio concreto e vuoi ordinarlo.</li>
  <li>Stai entrando in una fase nuova (lavoro, relazione, trasloco interiore).</li>
  <li>Senti di ripetere uno schema e fa fatica a nominarlo.</li>
  <li>Vuoi un momento di riflessione, non solo sollievo immediato.</li>
</ul>
<h2>Momenti in cui rimandare</h2>
<ul>
  <li>Attacchi di panico o rabbia acuta.</li>
  <li>Hai appena ricevuto un messaggio e vuoi “forzare” il significato.</li>
  <li>Stai per ripetere la quinta lettura uguale nello stesso pomeriggio.</li>
</ul>
<p>In questi casi, un respiro o una passeggiata aiutano più di un’altra estrazione.</p>
<h2>Frequenza sostenibile</h2>
<p>Una lettura seria su un tema può bastare per giorni o settimane. Se emergono dettagli nuovi, approfondisci; se invece cerchi solo di sentire la risposta che vuoi, stai usando male lo strumento.</p>
<p>Su Luxseetarot puoi fare un’anteprima quando sei lucido e, se serve, approfondire sulla stessa estrazione senza moltiplicare letture caotiche.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-e-intuito',
      title: 'Tarocchi e intuito: come allenarli insieme',
      description:
        'Come usare i tarocchi per allenare l’intuito: osservazione delle immagini, corpo, journaling e limiti sani.',
      keyword: 'tarocchi intuito',
      faq: [
        {
          q: 'L’intuito sostituisce i significati tradizionali?',
          a: 'No: li integra. Prima osserva, poi confronta con il significato classico e con la tua domanda.',
        },
        {
          q: 'Come capisco se è intuito o paura?',
          a: 'La paura urla e vuole certezza immediata. L’intuito spesso arriva come chiarezza sobria, anche se scomoda.',
        },
        {
          q: 'Serve essere “dotati”?',
          a: 'Serve pratica di attenzione. I tarocchi sono un supporto visivo per ascoltarti meglio.',
        },
      ],
      bodyHtml: `
<p><strong>Tarocchi e intuito</strong> lavorano bene insieme quando non li confondi con magia da spettacolo. Le carte offrono immagini; l’intuito collega quelle immagini alla tua esperienza.</p>
<h2>Un esercizio semplice</h2>
<ol>
  <li>Guarda la carta prima di leggere qualsiasi testo.</li>
  <li>Nota colore, gesto, atmosfera (apertura, chiusura, conflitto, quiete).</li>
  <li>Chiediti: “Dove riconosco questa scena nella mia situazione?”</li>
  <li>Solo dopo confronta con una lettura guidata o un significato tradizionale.</li>
</ol>
<h2>Il corpo come bussola</h2>
<p>A volte una carta “stringe” lo stomaco, un’altra allenta il respiro. Non è prova scientifica: è informazione emotiva da verificare. Scrivila. Poi guarda se i fatti dei giorni successivi la confermano.</p>
<h2>Intuito ≠ conferma del desiderio</h2>
<p>Se ogni carta la traduci in “andrà come voglio”, non stai ascoltando l’intuito: stai negoziando con la paura. Un buon segnale intuitivo può essere anche: “qui serve un no”, “qui serve tempo”, “qui serve una conversazione”.</p>
<p>Su Luxseetarot puoi usare il testo della lettura come second opinion rispetto alla tua prima impressione sulle immagini: un dialogo, non una gara.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-il-matto',
      title: 'Carta Il Matto nei tarocchi: significato e lettura pratica',
      description:
        'Significato della carta Il Matto: inizio, rischio creativo, ingenuità e come interpretarla in amore, lavoro e scelte.',
      keyword: 'significato carta il matto',
      faq: [
        {
          q: 'Il Matto è positivo o negativo?',
          a: 'Dipende dal contesto. Può essere inizio libero o ingenuità che non guarda dove mette i piedi.',
        },
        {
          q: 'Cosa significa Il Matto in amore?',
          a: 'Spesso apertura a una nuova esperienza, leggerezza o bisogno di non irrigidirsi in aspettative.',
        },
        {
          q: 'E nel lavoro?',
          a: 'Può indicare un progetto nuovo, un salto, o la necessità di studiare meglio i rischi prima di muoversi.',
        },
      ],
      bodyHtml: `
<p><strong>Il Matto</strong> è l’Arcano dell’inizio: la soglia, il passo nello sconosciuto, la disponibilità a non avere tutto sotto controllo. Non è “stupidità”: è possibilità aperta.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Nuovo ciclo e curiosità.</li>
  <li>Fiducia (a volte eccessiva).</li>
  <li>Libertà dai vecchi ruoli.</li>
  <li>Rischio di sottovalutare i dettagli pratici.</li>
</ul>
<h2>In una lettura a tre carte</h2>
<p>Nel passato può raccontare un salto già fatto. Nel presente invita a muoverti senza irrigidirti. Nel futuro suggerisce un’apertura: utile se accompagnata da un minimo di terra (budget, tempi, confini).</p>
<h2>Domande utili se esce Il Matto</h2>
<ul>
  <li>Sto iniziando per crescita o per fuga?</li>
  <li>Quale piccolo rischio consapevole posso prendere?</li>
  <li>Cosa mi serve per non confondere leggerezza e negligenza?</li>
</ul>
<p>Su Luxseetarot, quando Il Matto entra nella tua estrazione, il testo lo collega alla domanda concreta: amore, lavoro o scelta personale, senza lasciarlo astratto.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-gli-amanti',
      title: 'Carta Gli Amanti: significato oltre il solo romanticismo',
      description:
        'Significato della carta Gli Amanti nei tarocchi: scelta, valori, attrazione e come leggerla fuori dal cliché sentimentale.',
      keyword: 'significato carta gli amanti',
      faq: [
        {
          q: 'Gli Amanti annunciano sempre una storia d’amore?',
          a: 'No. Spesso parlano di una scelta etica o di allineamento tra desiderio e valori.',
        },
        {
          q: 'Possono indicare un tradimento?',
          a: 'Non in automatico. Possono evidenziare tentazione, doppio legame o bisogno di onestà.',
        },
        {
          q: 'Come leggerli nel lavoro?',
          a: 'Scelta tra due strade, partnership, o necessità di agire in coerenza con ciò che conti davvero.',
        },
      ],
      bodyHtml: `
<p><strong>Gli Amanti</strong> sono una delle carte più fraintese. Non significano solo “arriva l’amore”. Parlano di risonanza, attrazione e soprattutto di <em>scelta</em>.</p>
<h2>Livelli di lettura</h2>
<ul>
  <li><strong>Relazionale</strong>: incontro, chimica, dialogo cuore-mente.</li>
  <li><strong>Etica</strong>: cosa scegli quando due opzioni ti tirano.</li>
  <li><strong>Identitaria</strong>: allineamento tra ciò che vuoi e ciò che dichiari di essere.</li>
</ul>
<h2>In amore</h2>
<p>Possono indicare un legame significativo, ma anche il momento in cui smetti di subire e inizi a scegliere consapevolmente. A volte la carta chiede: “Ami la persona reale o l’idea che te ne sei fatta?”.</p>
<h2>Fuori dall’amore</h2>
<p>In lavoro o progetti, Gli Amanti chiedono coerenza. Una proposta può essere allettante e non allineata. La carta non dice quale strada è “giusta” in assoluto: mette in evidenza il criterio con cui stai decidendo.</p>
<p>Nella lettura Luxseetarot, Gli Amanti vengono contestualizzati nella tua domanda: così esci con un focus sulla scelta, non solo con un’etichetta romantica.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'significato-carta-la-torre',
      title: 'Carta La Torre nei tarocchi: significato e come affrontarla',
      description:
        'Significato della Torre nei tarocchi: rotture, verità improvvise e come trasformare questa carta in consapevolezza pratica.',
      keyword: 'significato carta la torre',
      faq: [
        {
          q: 'La Torre annuncia sempre un disastro?',
          a: 'No. Spesso indica il crollo di una struttura già instabile: doloroso, ma liberatorio nel medio periodo.',
        },
        {
          q: 'Cosa fare se esce La Torre?',
          a: 'Chiediti cosa non stava più reggendo. Proteggi il essenziale e non ricostruire uguale per paura.',
        },
        {
          q: 'In amore è fine della relazione?',
          a: 'Può esserlo, oppure può essere la fine di un’illusione all’interno della relazione. Il contesto decide.',
        },
      ],
      bodyHtml: `
<p><strong>La Torre</strong> spaventa per immagine e nome. In lettura, però, raramente è “sfortuna gratuita”: è l’energia che rivela ciò che non poteva più stare in piedi.</p>
<h2>Nucleo del significato</h2>
<ul>
  <li>Rottura improvvisa di certezze.</li>
  <li>Verità che non si può più ignorare.</li>
  <li>Crollo di un’illusione o di un controllo eccessivo.</li>
  <li>Spazio vuoto da cui ricostruire più vero.</li>
</ul>
<h2>Come leggerla senza panico</h2>
<p>Chiediti: cosa stava reggendo solo per abitudine? Una relazione basata sul non detto, un lavoro che ti esaurisce, un’immagine di te non più sostenibile. La Torre accelera un processo già in corso.</p>
<h2>Passato, presente, futuro</h2>
<p>Nel passato può spiegare uno shock che ancora influenza. Nel presente chiede onestà immediata. Nel futuro può indicare che una chiarificazione arriverà: meglio prepararsi a gestire, non a negare.</p>
<p>Su Luxseetarot il testo aiuta a collocare La Torre nella tua domanda specifica, trasformando l’allarme in orientamento: cosa proteggere, cosa lasciare andare, quale passo successivo è realistico.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'errori-comuni-lettura-tarocchi',
      title: 'Errori comuni nella lettura dei tarocchi (e come evitarli)',
      description:
        'I 10 errori più frequenti in una lettura dei tarocchi: domande confuse, dipendenza, sovrainterpretazione e rimedi pratici.',
      keyword: 'errori lettura tarocchi',
      faq: [
        {
          q: 'Fare tante letture aumenta la precisione?',
          a: 'Di solito no. Aumenta il rumore. Meglio una domanda chiara e tempo per metabolizzare.',
        },
        {
          q: 'È un errore leggere da soli?',
          a: 'No, se resti onesto. L’errore è usare solo le carte per evitare decisioni o dialoghi necessari.',
        },
        {
          q: 'Come esco dalla dipendenza dalle letture?',
          a: 'Fissa una sola consultazione sul tema, annota un’azione, riprendi le carte solo se emergono fatti nuovi.',
        },
      ],
      bodyHtml: `
<p>Conoscere gli <strong>errori comuni nella lettura dei tarocchi</strong> ti fa risparmiare confusione — che tu legga da solo o con un servizio online.</p>
<h2>Errori frequenti</h2>
<ol>
  <li><strong>Domanda vaga</strong>: “Cosa mi aspetta?” senza ambito.</li>
  <li><strong>Domanda a garanzia</strong>: vuoi solo rassicurazione.</li>
  <li><strong>Troppi temi insieme</strong>: amore + lavoro + soldi in una frase.</li>
  <li><strong>Letture a raffica</strong> sulla stessa paura.</li>
  <li><strong>Carta isolata</strong> senza contesto dello spread.</li>
  <li><strong>Allarmismo sui nomi</strong> (Morte, Torre, Diavolo).</li>
  <li><strong>Ignorare il proprio ruolo</strong> e fissarsi solo sull’altro.</li>
  <li><strong>Non tradurre in azione</strong> ciò che emerge.</li>
  <li><strong>Confondere tarocchi e certezza assoluta</strong>.</li>
  <li><strong>Chiedere mentre sei in panico acuto</strong>.</li>
</ol>
<h2>Rimedi pratici</h2>
<p>Scrivi la domanda. Fai una sola estrazione. Leggi tutto. Annota un insight e un passo concreto. Aspetta. Se serve, approfondisci — non ricominciare da zero per ansia.</p>
<p>Luxseetarot è pensato per questo ritmo: anteprima, eventuale lettura completa, approfondimenti sulla stessa estrazione invece di un loop infinito di nuove domande confuse.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-online-come-scegliere',
      title: 'Tarocchi online: come scegliere un servizio affidabile',
      description:
        'Criteri pratici per scegliere tarocchi online: trasparenza, limiti dichiarati, privacy, qualità del testo e red flags da evitare.',
      keyword: 'tarocchi online affidabili',
      faq: [
        {
          q: 'Un servizio serio promette risultati certi?',
          a: 'No. Anzi: la trasparenza sui limiti (intrattenimento, non garanzie) è un segnale di affidabilità.',
        },
        {
          q: 'Devo sospettare dei prezzi bassissimi?',
          a: 'Non sempre. Guarda soprattutto chiarezza dell’offerta, privacy e qualità di ciò che ricevi.',
        },
        {
          q: 'Cosa controllare prima di pagare?',
          a: 'Cosa include la lettura, se puoi vedere un’anteprima, come vengono usati email e dati, se ci sono contatti e privacy policy.',
        },
      ],
      bodyHtml: `
<p>Scegliere <strong>tarocchi online</strong> non è solo questione di estetica del sito. Contano trasparenza, metodo e rispetto della persona che consulta.</p>
<h2>Segnali di un servizio più serio</h2>
<ul>
  <li>Dichiara che si tratta di intrattenimento/riflessione, non di certezze assolute.</li>
  <li>Spiega come funziona la lettura (es. tre carte, domanda, anteprima).</li>
  <li>Ha pagine chiare su privacy e contatti.</li>
  <li>Non usa pressioni (“paga ora o la maledizione continua”).</li>
  <li>Ti lascia spazio per riflettere, non solo per comprare impulsi.</li>
</ul>
<h2>Red flags</h2>
<ul>
  <li>Promesse di far tornare l’ex “al 100%”.</li>
  <li>Richiesta di dati sensibili inutili.</li>
  <li>Linguaggio terroristico o colpevolizzante.</li>
  <li>Nessuna informazione su chi gestisce il servizio.</li>
</ul>
<h2>Come valutare Luxseetarot in quest’ottica</h2>
<p>Il percorso è esplicito: domanda, tre carte, <a href="/tarocchi-gratis.html">anteprima tarocchi gratis</a>, eventuale approfondimento. I testi sono digitali e simbolici. Puoi leggere privacy e contatti dal sito. L’obiettivo è darti materiale per riflettere, non venderti una garanzia di destino.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-quotidiani-abitudine-consapevole',
      title: 'Tarocchi quotidiani: come crearne un’abitudine consapevole',
      description:
        'Come usare i tarocchi ogni giorno senza dipendenza: rituale breve, journaling e regole per restare lucidi.',
      keyword: 'tarocchi quotidiani',
      faq: [
        {
          q: 'Una carta al giorno ha senso?',
          a: 'Sì come allenamento di attenzione. No se diventa controllo ansioso sugli eventi.',
        },
        {
          q: 'Meglio la mattina o la sera?',
          a: 'La mattina orienta la giornata; la sera aiuta a rileggere cosa è successo. Scegli una e sii costante.',
        },
        {
          q: 'Cosa scrivo nel diario?',
          a: 'Carta, impressione a caldo, un’azione possibile, e a sera un rigo su cosa hai osservato nei fatti.',
        },
      ],
      bodyHtml: `
<p>I <strong>tarocchi quotidiani</strong> possono essere un bel rituale di presenza — oppure una trappola di controllo. La differenza sta nelle regole che ti dai.</p>
<h2>Un rituale di 5 minuti</h2>
<ol>
  <li>Respira e formula un’intenzione semplice (“Cosa mi aiuta oggi a restare centrato/a?”).</li>
  <li>Estrai una carta (o fai una lettura breve se hai un tema).</li>
  <li>Scrivi tre parole-chiave.</li>
  <li>Scegli un comportamento osservabile (ascoltare di più, non controllare il telefono, fare una richiesta chiara).</li>
</ol>
<h2>Regole anti-dipendenza</h2>
<ul>
  <li>Una estrazione al giorno sul tema quotidiano.</li>
  <li>Niente “rifaccio finché non mi piace”.</li>
  <li>Se sei in crisi acuta, passa a una lettura strutturata a tre carte, non a venti carte sparse.</li>
</ul>
<h2>Come inserire Luxseetarot</h2>
<p>Nei giorni in cui hai un dubbio più grosso del “clima della giornata”, passa dalla carta singola alla lettura a tre carte con domanda chiara. L’anteprima ti dà il tono; l’eventuale approfondimento serve quando il tema lo merita davvero.</p>
${CTA}
`.trim(),
    }),

    article({
      slug: 'tarocchi-amore-domande-esempi',
      title: 'Tarocchi amore: 20 domande utili (con esempi)',
      description:
        'Esempi di domande ai tarocchi sull’amore: formulazioni chiare per relazione, crunch, ex, single e crescita personale.',
      keyword: 'domande tarocchi amore',
      faq: [
        {
          q: 'Quante domande posso fare in una lettura?',
          a: 'Per tre carte, una domanda principale. Le altre possono diventare approfondimenti successivi.',
        },
        {
          q: 'Posso nominare la persona?',
          a: 'Sì, se ti aiuta. Restando centrato sulla dinamica e sul tuo ruolo.',
        },
        {
          q: 'Le domande sull’ex sono sbagliate?',
          a: 'Non sbagliate, ma più utili se mirano a chiusura/apprendimento più che al controllo del ritorno.',
        },
      ],
      bodyHtml: `
<p>Avere esempi di <strong>domande ai tarocchi sull’amore</strong> evita formulazioni confuse e letture generiche. Ecco una lista pratica, da usare così com’è o da adattare.</p>
<h2>Se sei in una relazione</h2>
<ul>
  <li>Quale energia sta vivendo la nostra relazione in questa fase?</li>
  <li>Cosa posso comunicare con più chiarezza?</li>
  <li>Dove sto confondendo amore e abitudine?</li>
  <li>Quale atteggiamento ci aiuta a ritrovare rispetto reciproco?</li>
  <li>Cosa sta chiedendo questa crisi: dialogo, spazio o ridefinizione?</li>
</ul>
<h2>Se sei single</h2>
<ul>
  <li>Quale qualità sto pronto/a a offrire in un incontro?</li>
  <li>Cosa mi blocca dall’aprire uno spazio reale?</li>
  <li>Sto cercando una persona o una rassicurazione?</li>
  <li>Quale schema voglio interrompere prima del prossimo legame?</li>
</ul>
<h2>Se pensi a un ex</h2>
<ul>
  <li>Cosa sto ancora idealizzando di questa storia?</li>
  <li>Quale passo mi aiuta a riprendere energia indipendentemente dall’esito?</li>
  <li>C’è spazio per un dialogo maturo o serve chiusura interiore?</li>
</ul>
<h2>Come usarle su Luxseetarot</h2>
<p>Scegline una sola. Estrai tre carte. Leggi l’anteprima. Se un punto ti tocca, approfondisci con una domanda di follow-up sulle stesse carte invece di ricominciare da zero.</p>
${CTA}
`.trim(),
    }),
  ];
}
