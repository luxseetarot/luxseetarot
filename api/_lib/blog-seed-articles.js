/**
 * Catalogo articoli blog Luxseetarot (fase 2).
 * Tutti partono in draft; seed non sovrascrive post già presenti.
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
<p>Su Luxseetarot poni la domanda, scegli tre carte e ricevi un testo che tiene insieme simboli e contesto. L’anteprima è gratuita; puoi poi approfondire se ti serve più dettaglio.</p>
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
<p>Cercare <strong>tarocchi gratis online</strong> è spesso il primo passo: vuoi capire se una lettura digitale ti parla, senza impegno. Ha senso, a patto di sapere cosa stai chiedendo al servizio e cosa invece non può darti.</p>
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
<p>Il percorso è esplicito: domanda, tre carte, anteprima gratuita, eventuale approfondimento. I testi sono digitali e simbolici. Puoi leggere privacy e contatti dal sito. L’obiettivo è darti materiale per riflettere, non venderti una garanzia di destino.</p>
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
