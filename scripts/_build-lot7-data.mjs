/**
 * Builds scripts/lot7-advice-data.mjs (400 unique overlays).
 *   node scripts/_build-lot7-data.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blocks = [];

function add(theme, overlay, sub, niche, desc, tags) {
  blocks.push([theme, overlay, sub, niche, desc, tags]);
}

const spirit = [
  ['Il cielo risponde', 'Se ascolti'], ['Un segno piccolo', 'Ma vero'], ['Sincronicità ora', 'Non è caso'],
  ['L’universo piega', 'Verso di te'], ['Stelle e pelle', 'Stesso ritmo'], ['Macrocosmo in te', 'Microcosmo vivo'],
  ['La voce quieta', 'È la più chiara'], ['Terzo occhio aperto', 'Senza forzare'], ['Fidati del senso', 'Prima dei dati'],
  ['Messaggio invisibile', 'Già arrivato'], ['Intuito che bussa', 'Apri piano'], ['Vedi oltre il rumore', 'Nel silenzio'],
  ['Attrai con calma', 'Non con ansia'], ['Energia che chiama', 'Ciò che è pronto'], ['Manifestazione soft', 'Passo dopo passo'],
  ['Desiderio pulito', 'Senza stringere'], ['Le carte allineano', 'Non comandano'], ['Luce sottile', 'Sulla domanda'],
  ['Cristallo mentale', 'Chiarisce il nodo'], ['Candela interiore', 'Resta accesa'], ['Orbita personale', 'Rispettala'],
  ['Eco cosmica', 'Nel quotidiano'], ['Segnale ripetuto', 'Guardalo bene'], ['Allineamento vero', 'Corpo e cielo'],
  ['Sesto senso acceso', 'Senza teatralità'], ['Vibrazione giusta', 'Prima dell’azione'], ['Portale quieto', 'Dentro di te'],
  ['Ascolta l’eco', 'Dopo la carta'], ['Ordine stellare', 'Nel caos umano'], ['Chiedi all’alto', 'Rispondi tu'],
  ['Magnete dolce', 'Non possessivo'], ['Intenzione chiara', 'Attrazione onesta'], ['Fuoco sacro soft', 'Nella scelta'],
  ['Nebulosa emotiva', 'Trova un filo'], ['Costellazione tua', 'Non copiarla'], ['Presagio interno', 'Prima dell’esterno'],
  ['Respiro cosmico', 'Poi la domanda'], ['Luce tra le carte', 'Non fuori'], ['Soglia sottile', 'Tra sì e no'],
  ['Frequenza alta', 'Senza rigidità'], ['Occhio interiore', 'Guarda senza giudicare'], ['Vento di segni', 'Raccogline uno'],
  ['Anello di senso', 'Si chiude oggi'], ['Corpo che sa', 'Prima della mente'], ['Silenzio fertile', 'Per l’intuito'],
  ['Richiamo soft', 'Di ciò che serve'], ['Cielo nella palma', 'Tre carte bastano'], ['Armonia lenta', 'Meglio della fretta'],
  ['Sogno utile', 'Se lo nomini'], ['Presenza stellata', 'Nel qui e ora'], ['Chakra della scelta', 'Respira lì'],
  ['Aura della domanda', 'Puliscila'], ['Legame invisibile', 'Già all’opera'], ['Marea sottile', 'Segui la corrente'],
  ['Scintilla divina', 'Nella tua idea'], ['Specchio cosmico', 'Ti restituisce te'], ['Oracolo quieto', 'Senza spettacolo'],
  ['Via lattea interna', 'Un passo alla volta'], ['Segno che torna', 'Per una ragione'], ['Calice di luce', 'Versalo piano'],
  ['Nodo astrale', 'Si scioglie ascoltando'], ['Porta stellata', 'Socchiusa'], ['Risonanza vera', 'La senti nel petto'],
  ['Tempo sacro', 'Per una sola cosa'], ['Invito sottile', 'Dell’universo'], ['Chiarezza eterea', 'Ma concreta'],
  ['Filo d’oro soft', 'Dal cielo a te'], ['Preghiera pratica', 'È una domanda onesta'], ['Velo che si alza', 'Senza strappi'],
  ['Centro quieto', 'Dove nasce il sì'], ['Attrazione lucida', 'Non ossessiva'], ['Messaggio ripetuto', 'Tre volte'],
  ['Equilibrio sottile', 'Cielo e terra'], ['Luna interiore', 'Illumina il dubbio'], ['Sole soft', 'Sulla scelta'],
  ['Cometa di senso', 'Passa ora'], ['Spazio sacro', 'Nella tua stanza'], ['Rituale minimo', 'Respiro e carte'],
  ['Anima che chiede', 'Ascoltala'], ['Eco di stelle', 'Nella decisione'], ['Campo magnetico', 'Del desiderio vero'],
  ['Chiedi poco', 'Ricevi chiaro'], ['Presenza cosmica', 'Nel dettaglio'], ['Soglia luminosa', 'Tra paura e fede'],
  ['Intuito senza posa', 'Ma senza fretta'], ['Ordine invisibile', 'Già in corso'], ['Grazia pratica', 'Un gesto concreto'],
  ['Vibra e agisci', 'In sequenza'], ['Cielo domestico', 'Nella routine'], ['Segnale gentile', 'Non lo ignorare'],
  ['Allinea e lascia', 'Che accada'], ['Fuoco quieto', 'Dell’intenzione'], ['Acqua cosmica', 'Lava il rumore'],
  ['Terra sacra', 'Nei tuoi piedi'], ['Aria chiara', 'Nella mente'], ['Quinta essenza', 'È l’ascolto'],
  ['Rito breve', 'Tre carte'], ['Presagio utile', 'Se lo traduci'], ['Luce che sceglie', 'Con te'],
  ['Universo partner', 'Non padrone'],
];
spirit.forEach(([o, s]) => add('gratis', o, s, 'spiritualita',
  'Tra cielo e corpo c’è un filo. Le carte aiutano a sentirlo — senza forzare il destino.',
  '#tarocchi #universo #intuito #sincronismo #spiritualità'));

const shadow = [
  ['Guarda l’ombra', 'Senza fuggire'], ['Paura nominata', 'Perde potere'], ['Segreto che pesa', 'Portalo alla luce'],
  ['Parte oscura', 'Anche lei sei tu'], ['Shadow work soft', 'Un pezzo alla volta'], ['Notte utile', 'Se resti presente'],
  ['Candela nera', 'Illumina il vero'], ['Karma in moto', 'Non punizione'], ['Ciclo che torna', 'Per chiudersi'],
  ['Debito sottile', 'Si paga ascoltando'], ['Fato o scelta', 'Distinguili'], ['Destino elastico', 'Non catena'],
  ['Alchimia quieta', 'Trasforma il piombo'], ['Magia antica', 'È disciplina'], ['Rituale notturno', 'Senza teatralità'],
  ['Conoscenza amara', 'Ma libera'], ['Strega interiore', 'Sa dove guardare'], ['Veleno e cura', 'Stessa radice'],
  ['Abisso soft', 'Scendi con rispetto'], ['Maschera caduta', 'Resta il volto'], ['Paura del vuoto', 'Incontrala'],
  ['Rabbia sacra', 'Dagli un nome'], ['Vergogna quieta', 'Non sei solo'], ['Colpa antica', 'Si scioglie'],
  ['Fantasma emotivo', 'Parlagli'], ['Soglia oscura', 'Non è fine'], ['Luna nera', 'Tempo di scavare'],
  ['Inchiostro d’ombra', 'Scrivi il nodo'], ['Specchio nero', 'Dice la verità'], ['Cripta del sé', 'Apri una porta'],
  ['Fumo e senso', 'Aspetta che si diradi'], ['Rovina fertile', 'Dopo c’è seme'], ['Patto con te', 'Non con la paura'],
  ['Occhio nel buio', 'Vede meglio'], ['Silenzio denso', 'Ascoltalo'], ['Ferita antica', 'Chiede cura'],
  ['Ombra amata', 'Non cacciata'], ['Cicatrice utile', 'È mappa'], ['Notte iniziatica', 'Un passo'],
  ['Cenere e oro', 'Alchimia vera'], ['Veleno dolce', 'Delle abitudini'], ['Confine oscuro', 'Dove cresci'],
  ['Eco karmica', 'Nel presente'], ['Ripeti il pattern', 'O spezzalo'], ['Catena soft', 'Si apre scegliendo'],
  ['Oracolo d’ombra', 'Non mente'], ['Pozione amara', 'Poi chiarezza'], ['Santuario nero', 'Dentro'],
  ['Manto notturno', 'Protegge il lavoro'], ['Chiave di ferro', 'All’armadio chiuso'], ['Rovo utile', 'Segna il confine'],
  ['Canto basso', 'Dell’anima'], ['Cenacolo d’ombra', 'Solo tu'], ['Libro proibito', 'È il tuo diario'],
  ['Incantesimo vero', 'È onestà'], ['Cerchio di sale', 'Intorno al dolore'], ['Fato che piega', 'Se lo guardi'],
  ['Ruota che gira', 'Ancora'], ['Semina oscura', 'Raccolto lucido'], ['Teschio soft', 'Memento vivere'],
  ['Velluto nero', 'Sul dubbio'], ['Lanterna minima', 'Basta così'], ['Corridoio buio', 'Avanza piano'],
  ['Soglia strega', 'Tra sì e no'], ['Grimoire emotivo', 'Una pagina'], ['Polvere di stelle', 'Nel nero'],
  ['Patto d’ombra', 'Con la verità'], ['Fendente gentile', 'Alla menzogna'], ['Culla del buio', 'Dove rinasci'],
  ['Rito di chiusura', 'Di un ciclo'], ['Anima bifronte', 'Accoglila'], ['Gelo utile', 'Prima del fuoco'],
  ['Morso del karma', 'Insegna'], ['Labirinto soft', 'Esci dalla porta giusta'], ['Occhio di nottola', 'Vede i dettagli'],
  ['Inchiostro e luna', 'Scrivi'], ['Cripta aperta', 'Aria nuova'], ['Voto silenzioso', 'Con te stesso'],
  ['Cenere calda', 'Ancora viva'], ['Sogno nero', 'Messaggio vero'], ['Porta sigillata', 'Hai la chiave'],
  ['Ombra alleata', 'Non nemica'], ['Nodo antico', 'Si scioglie ora'], ['Mistero fertile', 'Non da risolvere tutto'],
  ['Calice nero', 'Bevi consapevolezza'], ['Spada di notte', 'Taglia l’illusione'], ['Bastone d’ombra', 'Regge il passo'],
  ['Denaro oscuro', 'Valore nascosto'], ['Corvo interiore', 'Porta notizia'], ['Neve nera', 'Pulisce'],
  ['Tempio vuoto', 'Riempilo di te'], ['Sigillo rotto', 'Libertà'], ['Eco nel pozzo', 'Rispondi'],
  ['Mantello corto', 'Ma caldo'], ['Ora strega', 'Tra sonno e veglia'], ['Radice nera', 'Profonda'],
  ['Fiore notturno', 'Apre al buio'], ['Verità cruda', 'Poi sollievo'], ['Fine necessaria', 'Inizio vero'],
  ['Ombra integrata', 'Forza quieta'],
];
shadow.forEach(([o, s]) => add('gratis', o, s, 'ombra',
  'L’ombra non è il nemico. È la stanza dove la verità aspetta — con rispetto, senza forzature.',
  '#tarocchi #ombra #shadowwork #mistero #karma'));

const evo = [
  ['Viaggio del Matto', 'Inizia qui'], ['Lezione della carta', 'Non verdetto'], ['Tappa dopo tappa', 'Senza saltare'],
  ['Matto consapevole', 'Cammina leggero'], ['Fine di un ciclo', 'Non è fallimento'], ['Morte come soglia', 'Poi rinascita'],
  ['Trasforma il blocco', 'In passo'], ['Guarigione lenta', 'Ma vera'], ['Accetta la chiusura', 'Poi apri'],
  ['Scelta nel presente', 'Non nel futuro'], ['Tarocchi per decidere', 'Non indovinare'], ['Consapevolezza prima', 'Dell’azione'],
  ['Blocco mentale', 'Nominalo'], ['Pattern ripetuto', 'Lo vedi ora'], ['Crescita soft', 'Senza performance'],
  ['Benessere reale', 'Non estetico'], ['Psiche e carte', 'Stesso tavolo'], ['Lezione amara', 'Ma utile'],
  ['Rinascita quieta', 'Dopo il crollo'], ['Decisione lucida', 'Oggi'], ['Futuro come bussola', 'Non gabbia'],
  ['Presente che conta', 'Più del dopo'], ['Mindset onesto', 'Senza frasi vuote'], ['Confine sano', 'È cura'],
  ['Autoascolto vero', 'Prima del consiglio'], ['Trauma soft', 'Con rispetto'], ['Resilienza concreta', 'Un gesto'],
  ['Identità in moto', 'Non fissa'], ['Ruolo che pesa', 'Rinegozialo'], ['Valori in fila', 'Prima delle opzioni'],
  ['Paura del cambiamento', 'Normale'], ['Comfort zone', 'Allargala piano'], ['Obiettivo umano', 'Non eroico'],
  ['Fallimento fertile', 'Se lo leggi'], ['Successo quieto', 'Senza vetrina'], ['Routine sacra', 'Piccola'],
  ['Corpo che parla', 'Ascoltalo'], ['Mente che gira', 'Fermala un attimo'], ['Emozione utile', 'Messaggio'],
  ['Scelta coraggiosa', 'Anche se piccola'], ['Dubbio sano', 'Non sabotaggio'], ['Perfezionismo', 'Allenta'],
  ['Procrastinazione', 'Cosa protegge'], ['Burnout segnale', 'Non debolezza'], ['Riposo strategico', 'È lavoro'],
  ['Focus unico', 'Oggi'], ['Priorità chiare', 'Meno caos'], ['Comunicazione onesta', 'Con te'],
  ['Relazione con sé', 'Prima base'], ['Autostima quieta', 'Fatti concreti'], ['Vergogna sciolta', 'Con gentilezza'],
  ['Rabbia canalizzata', 'In confine'], ['Tristezza attraversata', 'Non evitata'], ['Gioia semplice', 'Conta'],
  ['Gratitudine pratica', 'Una cosa'], ['Perdono utile', 'Se libera'], ['Lutto di un’idea', 'Poi spazio'],
  ['Nuova narrazione', 'Più vera'], ['Identità aggiornata', 'Versione soft'], ['Compito della fase', 'Solo questo'],
  ['Arco del Matto', 'Continua'], ['Torre interiore', 'Cosa cade'], ['Stella dopo', 'La notte'],
  ['Sole che torna', 'Piano'], ['Giudizio interno', 'Addolciscilo'], ['Mondo nuovo', 'Passo locale'],
  ['Eremita utile', 'Tempo solo'], ['Ruota personale', 'Gira'], ['Forza gentile', 'Non forza bruta'],
  ['Temperanza', 'Dosaggia'], ['Diavolo soft', 'Cosa ti lega'], ['Appeso che aspetta', 'Con senso'],
  ['Imperatrice cura', 'Il corpo'], ['Imperatore struttura', 'Senza rigidità'], ['Papessa ascolto', 'Nel silenzio'],
  ['Papa valori', 'Aggiornali'], ['Amanti scelta', 'Consapevole'], ['Carro direzione', 'Una'],
  ['Giustizia equilibrio', 'Nei fatti'], ['Eremita lampada', 'Dentro'], ['Mago focus', 'Risorse tue'],
  ['Sacerdotessa', 'Sai già'], ['Cambiamento sano', 'Pianificato'], ['Crisi come porta', 'Non muro'],
  ['Integrazione', 'Di pezzi'], ['Adulto interiore', 'Prende in mano'], ['Bambino ferito', 'Con cura'],
  ['Genitore interno', 'Più gentile'], ['Confini chiari', 'Relazioni più sane'], ['Dire no', 'È un sì a te'],
  ['Dire sì', 'Con presenza'], ['Piano piccolo', 'Meglio del sogno vago'], ['Review della settimana', 'Con carte'],
  ['Check-in emotivo', 'Tre minuti'], ['Micro-vittoria', 'Conta'], ['Abitudine nuova', 'Ancora fragile'],
  ['Ricominciare', 'Senza vergogna'], ['Versione migliore', 'Non perfetta'], ['Cammino continuo', 'Non arrivo'],
  ['Lezione integrata', 'Nel corpo'],
];
evo.forEach(([o, s]) => add('futuro', o, s, 'evoluzione',
  'I tarocchi come mappa psicologica: lezioni, soglie e scelte — non previsioni assolute.',
  '#tarocchi #crescita #psicologia #consapevolezza #scelte'));

const coppe = [
  ['Acqua che sente', 'Prima di parlare'], ['Cuore in ascolto', 'Non in controllo'], ['Emozione vera', 'Senza filtro'],
  ['Relazione onesta', 'Parte da te'], ['Intuito liquido', 'Seguilo'], ['Calice pieno', 'Di cosa'],
  ['Marea del sentimento', 'Non lottare'], ['Amore senza possesso', 'Più chiaro'], ['Pianto utile', 'Pulisce'],
  ['Tenerezza concreta', 'Un gesto'], ['Confine affettivo', 'È cura'], ['Gelosia messaggio', 'Cosa teme'],
  ['Nostalgia soft', 'Non trappola'], ['Perdono emotivo', 'Se libera'], ['Bisogno nominato', 'Meno ansia'],
  ['Coppa rovesciata', 'Cosa esce'], ['Fiume interiore', 'Lascia scorrere'], ['Profondità vera', 'Non intensità'],
  ['Legame sottile', 'Ma reale'], ['Silenzio a due', 'A volte basta'], ['Riconciliazione', 'Se è onesta'],
  ['Distanza sana', 'Nell’amore'], ['Presenza affettiva', 'Più delle parole'], ['Sogno di coppia', 'Aggiornalo'],
  ['Cuore e corpo', 'Allineati'],
];
coppe.forEach(([o, s]) => add('amore', o, s, 'coppe',
  'Semi di Coppe: emozioni, legami, intuito. Chiarezza affettiva senza forzare l’altro.',
  '#tarocchi #coppe #amore #emozioni #acqua'));

const bastoni = [
  ['Fuoco che chiama', 'Muoviti'], ['Scintilla creativa', 'Non spegnerla'], ['Passione utile', 'Canalizzala'],
  ['Ambizione soft', 'Senza bruciare'], ['Carriera viva', 'Non solo ruolo'], ['Progetto acceso', 'Primo passo'],
  ['Energia sparsa', 'Focalizzala'], ['Rabbia creativa', 'Trasformala'], ['Impulso vero', 'Vs fuga'],
  ['Bastone in mano', 'Direzione'], ['Fiamma piccola', 'Basta per iniziare'], ['Coraggio quotidiano', 'Un sì'],
  ['Vision chiara', 'Poi azione'], ['Team difficile', 'Porta luce'], ['Leadership gentile', 'Non controllo'],
  ['Burnout di fuoco', 'Rallenta'], ['Idee in eccesso', 'Scegline una'], ['Motivazione vera', 'Cosa la nutre'],
  ['Competizione sana', 'Con te ieri'], ['Rischio calcolato', 'Con fuoco lucido'], ['Avvio ritardato', 'Paura o timing'],
  ['Creatività bloccata', 'Gioca di nuovo'], ['Missione personale', 'Nominala'], ['Entusiasmo fragile', 'Proteggilo'],
  ['Azione dopo respiro', 'Poi vai'],
];
bastoni.forEach(([o, s]) => add('lavoro', o, s, 'bastoni',
  'Semi di Bastoni: fuoco, passione, iniziativa. Muovere energia senza bruciare tutto.',
  '#tarocchi #bastoni #passione #creatività #fuoco'));

const spade = [
  ['Verità che taglia', 'Poi libera'], ['Mente troppo piena', 'Svuota'], ['Conflitto chiaro', 'Meglio del non detto'],
  ['Pensiero tagliente', 'Usa con cura'], ['Chiarezza mentale', 'Dopo il rumore'], ['Decisione logica', 'E corpo d’accordo'],
  ['Ansia di pensiero', 'Nomina il tema'], ['Parola giusta', 'Al momento giusto'], ['Bugia soft', 'A te stesso'],
  ['Confine verbale', 'Dillo'], ['Analisi infinita', 'Scegli'], ['Dubbio mentale', 'Cosa protegge'],
  ['Spada abbassata', 'Pace vera'], ['Critica utile', 'Vs critica crudele'], ['Focus chirurgico', 'Una cosa'],
  ['Notte insonne', 'Scrivi il nodo'], ['Dialogo difficile', 'Prepara tre frasi'], ['Ideale vs reale', 'Aggiorna'],
  ['Critica a te stesso', 'Addolcisci'], ['Fatto contro storia', 'Guarda i fatti'], ['Chiarezza dolorosa', 'Ma onesta'],
  ['Mente alleata', 'Non carceriere'], ['Taglio necessario', 'Di un’illusione'], ['Strategia quieta', 'Poi parla'],
  ['Aria pulita', 'Nella testa'],
];
spade.forEach(([o, s]) => add('domanda', o, s, 'spade',
  'Semi di Spade: aria, mente, verità. Chiarezza anche quando taglia — con rispetto.',
  '#tarocchi #spade #mente #verità #chiarezza'));

const denari = [
  ['Terra sotto i piedi', 'Stabilità'], ['Soldi e senso', 'Non solo cifra'], ['Corpo che chiede', 'Cura'],
  ['Casa come nido', 'O peso'], ['Abbondanza quieta', 'Già presente'], ['Lavoro concreto', 'Un mattone'],
  ['Budget emotivo', 'Anche'], ['Ricchezza vera', 'Tempo e salute'], ['Radici pratiche', 'Prima dei sogni'],
  ['Denaro e paura', 'Nominala'], ['Investimento in te', 'Formazione soft'], ['Routine del corpo', 'È fortuna'],
  ['Scarsità mentale', 'Vs fatti'], ['Raccolto lento', 'Pazienza fertile'], ['Mani in pasta', 'Azione reale'],
  ['Sicurezza soft', 'Senza rigidità'], ['Proprietà e identità', 'Distinguile'], ['Cibo e umore', 'Collegati'],
  ['Sonno come base', 'Di tutto'], ['Lavoro che nutre', 'O prosciuga'], ['Contratto chiaro', 'Meno ansia'],
  ['Risparmio di energia', 'Anche'], ['Terra fertile', 'Cosa ci metti'], ['Valore non visto', 'Fallo emergere'],
  ['Stabilità scelta', 'Non inerzia'],
];
denari.forEach(([o, s]) => add('lavoro', o, s, 'denari',
  'Semi di Denari: terra, corpo, risorse. Stabilità e abbondanza senza ansia performativa.',
  '#tarocchi #denari #soldi #stabilità #terra'));

if (blocks.length !== 400) {
  console.error('Expected 400, got', blocks.length);
  process.exit(1);
}
const seen = new Map();
for (const b of blocks) seen.set(b[1], (seen.get(b[1]) || 0) + 1);
const dupes = [...seen.entries()].filter(([, c]) => c > 1);
if (dupes.length) {
  console.error('Duplicate overlays:', dupes.slice(0, 10));
  process.exit(1);
}

const outPath = path.join(__dirname, 'lot7-advice-data.mjs');
fs.writeFileSync(
  outPath,
  `/**\n * Lot 7: pin 441–840 (400 pezzi) — nicchie tematiche.\n * [theme, overlay, sub, niche, desc, tags]\n */\nexport const ADVICE = ${JSON.stringify(blocks, null, 2)};\n`,
  'utf8'
);
console.log('OK', outPath, blocks.length);
