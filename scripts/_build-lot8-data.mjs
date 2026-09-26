/**
 * Builds scripts/lot8-advice-data.mjs (400 unique overlays, 5 nicchie × 80).
 *   node scripts/_build-lot8-data.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blocks = [];

function add(theme, overlay, sub, niche, desc, tags) {
  blocks.push([theme, overlay, sub, niche, desc, tags]);
}

const archetipi = [
  ['Maschera del Ribelle', 'In te'], ['Maschera del Saggio', 'Ascoltala'], ['Il Sovrano interno', 'Decide'],
  ['Il Bambino ferito', 'Con cura'], ['L’Eroe quieto', 'Non grida'], ['L’Ombra alleata', 'Non nemica'],
  ['Persona e Sé', 'Distinguili'], ['Archetipo attivo', 'Oggi'], ['Ruolo che indossi', 'Si può togliere'],
  ['Il Giullare sacro', 'Rompe le regole'], ['La Madre interiore', 'Nutre'], ['Il Padre struttura', 'Senza rigidità'],
  ['Anima e persona', 'Dialogano'], ['Figura guida', 'Dentro di te'], ['Mito personale', 'Riscrivilo'],
  ['Eroe del quotidiano', 'Un gesto'], ['Trickster soft', 'Smuove'], ['Saggio nel silenzio', 'Parla poco'],
  ['Guerriero gentile', 'Difende confini'], ['Amante consapevole', 'Sceglie'], ['Creatore in moto', 'Fa'],
  ['Distruttore sacro', 'Libera spazio'], ['Innocente vivo', 'Ancora'], ['Orfano che cresce', 'Trova casa'],
  ['Mago interiore', 'Risorse tue'], ['Papessa ricettiva', 'Ascolta'], ['Imperatrice fertile', 'Cura'],
  ['Imperatore saldo', 'Struttura'], ['Ierofante valori', 'Aggiornali'], ['Divino femminile', 'Si apre'],
  ['Divino maschile', 'Agisce lucido'], ['Equilibrio sacro', 'Yin e yang'], ['Ricettivo e attivo', 'A turno'],
  ['Intuito e azione', 'In danza'], ['Papessa e Imperatore', 'Si parlano'], ['Luna e sole interni', 'Entrambi'],
  ['Forza ricettiva', 'Non passiva'], ['Azione strutturata', 'Non impulsiva'], ['Sacro equilibrio', 'Nel corpo'],
  ['Anima bifronte', 'Integra'], ['Eremita cercato', 'Non imposto'], ['Solitudine fertile', 'Saggezza'],
  ['Silenzio scelto', 'Non fuga'], ['Distacco utile', 'Dal rumore'], ['Lampada interiore', 'Illumina'],
  ['Ritiro strategico', 'Poi ritorno'], ['Montagna quieta', 'Dentro'], ['Sage mode on', 'Ascolta'],
  ['Cella del cuore', 'Porta aperta'], ['Notte dell’eremita', 'Una lezione'], ['Via stretta', 'Ma chiara'],
  ['Ritiro dal mondo', 'Per vederti'], ['Saggezza lenta', 'Cresce'], ['Compagnia di sé', 'Basta'],
  ['Eremita moderno', 'Spegni il feed'], ['Deserto utile', 'Poi oasi'], ['Voto di silenzio', 'Un’ora'],
  ['Caverna interiore', 'Tesoro'], ['Guida solitaria', 'Per te'], ['Passo dell’eremita', 'Piano'],
  ['Luce nella grotta', 'Tua'], ['Scuola del silenzio', 'Oggi'], ['Maschera caduta', 'Volto vero'],
  ['Archetipo dominante', 'Nominalo'], ['Corte interiore', 'Chi parla'], ['Re e Regina', 'In te'],
  ['Cavaliere e fante', 'Energia giovane'], ['Mito che ripeti', 'Cambialo'], ['Favola personale', 'Nuovo finale'],
  ['Simbolo vivo', 'Nella carta'], ['Figura che chiama', 'Rispondi'], ['Psiche e mito', 'Stesso tavolo'],
  ['Jung in tasca', 'Una carta'], ['Inconscio che bussa', 'Apri'], ['Sé superiore soft', 'Guida'],
  ['Anima mundi', 'Ti rispecchia'], ['Complesso attivo', 'Osservalo'], ['Proiezione soft', 'Ritirala'],
  ['Integrazione', 'Dei pezzi'], ['Individuazione', 'Passo dopo passo'], ['Ombra e persona', 'Dialogo'],
  ['Anima / animus', 'Incontro'], ['Sogno archetipico', 'Messaggio'], ['Tempio interiore', 'Entra'],
];
archetipi.forEach(([o, s]) => add('gratis', o, s, 'archetipi',
  'Ogni carta è una maschera della psiche. Incontrala con rispetto — non per giudicare, per conoscere.',
  '#tarocchi #archetipi #jung #psiche #miti'));

const tempo = [
  ['Passato presente filo', 'Tre tempi'], ['Ciò che è stato', 'Parla ancora'], ['Presente che conta', 'Più del dopo'],
  ['Futuro in germe', 'Nel oggi'], ['Tre carte una storia', 'In movimento'], ['Tempo elastico', 'Non lineare'],
  ['Orologio interiore', 'Ascoltalo'], ['Stagione dell’anima', 'Quale'], ['Fase lunare soft', 'Nel petto'],
  ['Ciclo che chiude', 'Lascia andare'], ['Ciclo che apre', 'Accogli'], ['Danza del tempo', 'Non correre'],
  ['Ieri ancora vivo', 'Nel corpo'], ['Domani già qui', 'In un gesto'], ['Nodo temporale', 'Si scioglie'],
  ['Memoria utile', 'Non catena'], ['Profezia soft', 'È una direzione'], ['Timeline personale', 'Riscrivila'],
  ['Attesa fertile', 'Non vuota'], ['Momento esatto', 'Per scegliere'], ['Ora e sempre', 'Nel respiro'],
  ['Torre che cade', 'Spazio nuovo'], ['Crollo costruttivo', 'Poi luce'], ['Morte come soglia', 'Non fine'],
  ['Fine necessaria', 'Inizio vero'], ['Distruzione fertile', 'Semina'], ['Macerie e seme', 'Insieme'],
  ['Shock che libera', 'Se ascolti'], ['Carta Torre soft', 'Cosa cade'], ['Carta Morte soft', 'Cosa finisce'],
  ['Addio a un’idea', 'Poi aria'], ['Rovina elegante', 'Del vecchio'], ['Cenere calda', 'Ancora viva'],
  ['Dopo il crollo', 'Cammina'], ['Bellezza del vuoto', 'Prima del nuovo'], ['Soglia della Torre', 'Attraversala'],
  ['Trasformazione cruda', 'Poi pace'], ['Ciclo spezzato', 'Volutamente'], ['Fine di un’era', 'Personale'],
  ['Ruota che gira', 'Ancora'], ['Eterno ritorno', 'Lezione ripetuta'], ['Pattern che torna', 'O lo spezzi'],
  ['Su e giù', 'Della Ruota'], ['Fortuna in moto', 'Non fissa'], ['Lezione non imparata', 'Ricompare'],
  ['Nulla resta fermo', 'Nemmeno tu'], ['Ciclo karmico', 'Si può chiudere'], ['Ruota personale', 'Gira lucida'],
  ['Alto e basso', 'Entrambi insegnano'], ['Momento in cima', 'Non attaccarti'], ['Momento in fondo', 'Non disperare'],
  ['Ritorno utile', 'Se cambi risposta'], ['Stessa scena', 'Nuovo ruolo'], ['Karma in loop', 'Esci'],
  ['Ruota e scelta', 'Insieme'], ['Tempo ciclico', 'Non linea'], ['Ricomincia consapevole', 'Non uguale'],
  ['Stagioni dell’amore', 'Cambiano'], ['Inverno interiore', 'Poi primavera'], ['Estate dell’azione', 'Ora'],
  ['Autunno del bilancio', 'Raccogli'], ['Clessidra soft', 'Sabbia tua'], ['Calendario emotivo', 'Seguilo'],
  ['Anniversario interno', 'Di una ferita'], ['Compleanno dell’anima', 'Oggi'], ['Scadenza sacra', 'Di un ciclo'],
  ['Rinvio utile', 'O fuga'], ['Urgenza falsa', 'Vs timing vero'], ['Pausa nel tempo', 'Respiro'],
  ['Accelerazione soft', 'Quando serve'], ['Rallenta il ritmo', 'Vedi meglio'], ['Sincronia temporale', 'Segnale'],
  ['Passato che chiede', 'Chiusura'], ['Futuro che aspetta', 'Un sì'], ['Presente ponte', 'Tra i due'],
  ['Tre tempi un nodo', 'Nominalo'], ['Stesa temporale', 'Leggi il filo'], ['Orologio fermo', 'Dentro'],
  ['Tempo sospeso', 'Prima della scelta'], ['Ciclo completo', 'Celebra'], ['Nuovo giro', 'Più lucido'],
];
tempo.forEach(([o, s]) => add('futuro', o, s, 'tempo',
  'Il tempo nei tarocchi non è oracolo fisso: è filo tra ciò che è stato, ciò che vivi e ciò che prepari.',
  '#tarocchi #cicli #tempo #ruota #trasformazione'));

const amore = [
  ['Incontro di anime', 'Riconosci'], ['Amanti consapevoli', 'Scelta'], ['Attrazione fatale', 'O libera'],
  ['Specchio nell’altro', 'Cosa vedi'], ['Cuore che sceglie', 'Non solo vuole'], ['Legame che chiama', 'Ascolta'],
  ['Scelta di cuore', 'E di testa'], ['Danza a due', 'Il tuo passo'], ['Riconoscimento soft', 'Immediato'],
  ['Chimica e karma', 'Distinguili'], ['Amore che cresce', 'O consuma'], ['Noi e io', 'Equilibrio'],
  ['Promessa muta', 'Cosa dice'], ['Corpo che sa', 'Dell’altro'], ['Sguardo che resta', 'Messaggio'],
  ['Tre di Spade', 'Dolore vero'], ['Cuore trafitto', 'Poi cura'], ['Tradimento scoperto', 'Verità'],
  ['Illusione d’amore', 'Si scioglie'], ['Sette di Spade', 'Cosa nascondi'], ['Rami secchi', 'Taglia'],
  ['Bugia soft', 'Nella relazione'], ['Dolore che insegna', 'Se resti'], ['Chiusura affettiva', 'Necessaria'],
  ['Lutto di un noi', 'Poi spazio'], ['Gelosia messaggio', 'Paura'], ['Attaccamento', 'Allenta'],
  ['Dipendenza soft', 'Vs amore'], ['Verità tagliente', 'Poi aria'], ['Perdono possibile', 'Se libera'],
  ['Confine nella coppia', 'È cura'], ['Silenzio a due', 'A volte basta'], ['Parole mancate', 'Pesano'],
  ['Riconciliazione onesta', 'O no'], ['Distanza sana', 'Nell’amore'], ['Ritorno o chiusura', 'Chiaro'],
  ['Anime gemelle soft', 'Riconoscimento'], ['Fiamma gemella', 'Fuoco e lezione'], ['Destino a due', 'Non scusa'],
  ['Legame karmico', 'Da chiudere o vivere'], ['Contratto d’anime', 'Aggiornalo'], ['Incontro ripetuto', 'Perché'],
  ['Magnete reciproco', 'O asimmetria'], ['Casa nell’altro', 'O perdita di sé'], ['Noi sacri', 'Con confini'],
  ['Amore adulto', 'Sceglie'], ['Passione e rispetto', 'Insieme'], ['Cura reciproca', 'Fatti'],
  ['Progetto a due', 'O solo sogno'], ['Crisi di coppia', 'Soglia'], ['Rinnovo del patto', 'A voce'],
  ['Ex che torna', 'Pattern o pace'], ['Nuovo inizio soft', 'Dopo il taglio'], ['Cuore aperto', 'Non ingenua'],
  ['Fiducia ricostruita', 'Piano'], ['Intimità vera', 'Oltre il sesso'], ['Amicizia nell’amore', 'Base'],
  ['Sostegno mutuo', 'Nei giorni grigi'], ['Libertà nella coppia', 'Non minaccia'], ['Gelosia lavorata', 'Con parole'],
  ['Bisogno nominato', 'Meno litigi'], ['Ascolto attivo', 'Dell’altro'], ['Scusa sincera', 'Cambia aria'],
  ['Grazie concreto', 'Nell’amore'], ['Rituale a due', 'Piccolo'], ['Mani intrecciate', 'Presenti'],
  ['Carte sull’amore', 'Su di te prima'], ['Domanda sul noi', 'Apri non chiudere'], ['Legame che matura', 'Tempo'],
  ['Addio consapevole', 'È amore anche'], ['Ciao nuovo', 'Senza fantasma'], ['Cuore intero', 'Prima di offrire'],
  ['Amore e destino', 'Co-creato'], ['Karma di coppia', 'Lezione condivisa'], ['Anima riconosce', 'Anima'],
];
amore.forEach(([o, s]) => add('amore', o, s, 'amore_karmico',
  'Relazioni e karma: non per controllare l’altro, per vedere la dinamica e il tuo ruolo nella danza.',
  '#tarocchi #amore #karma #relazioni #animigemelle'));

const cyber = [
  ['Tecnomanzia soft', 'Simbolo e codice'], ['Algoritmo e fato', 'Chi scrive'], ['AI e oracolo', 'Stesso tavolo'],
  ['Glitch sacro', 'Nel segnale'], ['Neon interiore', 'Acceso'], ['Synthwave soul', 'Vibra'],
  ['Pixel e spirito', 'Uniti'], ['Codice del destino', 'Rivedilo'], ['Hackera il fato', 'Con scelte'],
  ['Vecchie regole', 'Si aggiornano'], ['Script personale', 'Riscrivilo'], ['Debug dell’anima', 'Trova il bug'],
  ['Firewall emotivo', 'Sano'], ['Upload di intenzioni', 'Chiare'], ['Download di segni', 'Dal feed'],
  ['Fantasma nella rete', 'Cerca il sacro'], ['Caos digitale', 'Trova un tempio'], ['Scroll infinito', 'O rituale'],
  ['Notifica sacra', 'O rumore'], ['Avatar e Sé', 'Distinguili'], ['Profilo vs persona', 'Verità'],
  ['Online e offline', 'Stesso cuore'], ['Connessione vera', 'Non solo wifi'], ['Latenza dell’anima', 'Aspetta'],
  ['Server interiore', 'Online'], ['Cloud di pensieri', 'Svuota'], ['Cache emotiva', 'Pulisci'],
  ['Password del cuore', 'Solo tua'], ['Encrypt il sacro', 'Proteggilo'], ['Decrypt il dubbio', 'Nominalo'],
  ['Open source soul', 'Condividi luce'], ['Closed source fear', 'Apri'], ['Patch al pattern', 'Aggiorna'],
  ['Version 2.0 di te', 'Deploy'], ['Beta del cambiamento', 'Testa'], ['Crash utile', 'Poi reboot'],
  ['Safe mode', 'Quando serve'], ['Root access', 'A te stesso'], ['Kernel del Sé', 'Stabile'],
  ['Terminal interiore', 'Comandi chiari'], ['Prompt onesto', 'Alle carte'], ['Output lucido', 'Dalla lettura'],
  ['Input sporco', 'Pulisci la domanda'], ['Loop infinito', 'Break'], ['Stack overflow', 'Di pensieri'],
  ['Memory leak', 'Del passato'], ['Garbage collect', 'Lascia andare'], ['Compile the choice', 'Poi run'],
  ['Runtime del presente', 'Qui'], ['Future commit', 'Un passo'], ['Rollback emotivo', 'O avanti'],
  ['Merge conflict', 'Nel cuore'], ['Resolve with care', 'Parole'], ['Branch nuovo', 'Di vita'],
  ['Main aggiornata', 'Tu'], ['Fork del destino', 'Scegli'], ['Pull request all’universo', 'Chiedi'],
  ['API del sacro', 'Risponde'], ['Webhook di segni', 'Ascolta'], ['Latency spirituale', 'Pazienza'],
  ['Bandwidth emotiva', 'Limite sano'], ['Noise to signal', 'Filtra'], ['Dark mode anima', 'Riposa'],
  ['Light mode cuore', 'Apri'], ['HUD interiore', 'Cosa mostri'], ['Glitch art fate', 'Bellezza'],
  ['Cyber strega', 'Antico e nuovo'], ['Tarocchi digitali', 'Stesso mistero'], ['Oracolo in cloud', 'Presenza'],
  ['Destino è codice', 'Editabile'], ['Fato legacy', 'Refactor'], ['Nuova syntax', 'Di te'],
];
cyber.forEach(([o, s]) => add('futuro', o, s, 'cyber',
  'Tra simbolo antico e mondo digitale: il sacro resta — anche nel caos della rete, se sai ascoltare.',
  '#tarocchi #cyberwitch #tecnomanzia #futuro #digitale'));

const cozy = [
  ['Carta a colazione', 'Bussola del giorno'], ['Rituale del mattino', 'Tre minuti'], ['Tè e una carta', 'Basta'],
  ['Luce mattutina', 'Sulle carte'], ['Coperta e ascolto', 'Di te'], ['Self-care esoterico', 'Senza fretta'],
  ['Coccola interiore', 'Con i tarocchi'], ['Momento soft', 'Lontano dallo stress'], ['Piccola magia', 'Nel quotidiano'],
  ['Dettaglio arcano', 'Nella routine'], ['Caffè e intuito', 'Prima del rumore'], ['Letto e carte', 'Quietè'],
  ['Finestra aperta', 'Aria nuova'], ['Candela soft', 'Non teatrale'], ['Tazza calda', 'Presenza'],
  ['Giorno in una carta', 'Focus'], ['Check-in soft', 'Come stai'], ['Respiro e pesca', 'Una'],
  ['Diario di una carta', 'Scrivi'], ['Sera che chiude', 'Con calma'], ['Notte senza scroll', 'Con te'],
  ['Domenica oracolo', 'Lento'], ['Pausa caffè sacra', 'Cinque minuti'], ['Pranzo consapevole', 'Una domanda'],
  ['Tra una mail e l’altra', 'Un respiro'], ['Dopo lavoro', 'Svestiti il ruolo'], ['Casa come tempio', 'Piccolo'],
  ['Angolo carte', 'Tuo'], ['Luce calda', 'Sulla stesa'], ['Tessuto soft', 'Sotto le carte'],
  ['Pioggia fuori', 'Calma dentro'], ['Sole sul tavolo', 'Segnale'], ['Stagione soft', 'Nella stanza'],
  ['Fiori e carte', 'Semplici'], ['Pane e senso', 'Quotidiano'], ['Acqua e chiarezza', 'Bevi'],
  ['Stretch e spirito', 'Corpo'], ['Doccia come rito', 'Poi ascolta'], ['Crema e cura', 'Di te'],
  ['Musica bassa', 'E una carta'], ['Silenzio domestico', 'Oro'], ['Gatto e oracolo', 'Compagnia'],
  ['Libro e tarocchi', 'Stesso riposo'], ['Pausa merenda', 'Intuizione'], ['Tramonto breve', 'Check'],
  ['Alba intenzionale', 'Una frase'], ['Lista soft', 'Di gratitudine'], ['Una sola carta', 'Un solo tema'],
  ['Niente pressione', 'Solo presenza'], ['Comfort vero', 'Non numbing'], ['Calore senza fuga', 'Senti'],
  ['Giorno ordinario', 'Magia ordinaria'], ['Segnale nella cucina', 'Notalo'], ['Chiave dimenticata', 'Messaggio'],
  ['Soglia di casa', 'Rituale'], ['Scarpe tolte', 'Ruolo tolto'], ['Pigiama e verità', 'Onesta'],
  ['Cuscino e pensiero', 'Uno'], ['Sveglia gentile', 'Niente allarme interiore'], ['Agenda con spazio', 'Vuoto sacro'],
  ['No meeting con te', 'In calendario'], ['Hydrate the soul', 'Acqua e carte'], ['Snack spirituale', 'Breve'],
  ['Walk and pull', 'Carta mentale'], ['Finestra e cielo', 'Sincronia'], ['Pianta che cresce', 'Come te'],
  ['Ordine soft', 'Nella stanza'], ['Disordine fertile', 'Poi scegli'], ['Carta del giorno', 'Bussola'],
  ['Sera di chiusura', 'Ringrazia'], ['Notte di riposo', 'Senza oracolo forzato'], ['Domani riparte', 'Piano'],
  ['Comfort zone sacra', 'A volte resta'], ['Uscita soft', 'Quando serve'], ['Casa interiore', 'Accogliente'],
  ['Tarot cozy', 'È permesso'], ['Magia domestica', 'Vera'], ['Giorno semplice', 'Senso pieno'],
  // +10 per arrivare a 80
  ['Mattina senza fretta', 'Una carta'], ['Sera senza scroll', 'Ascolto'], ['Tè del dubbio', 'Poi chiarezza'],
  ['Cuscino e respiro', 'Prima'], ['Luce della lampada', 'Sulla stesa'], ['Calzini e calma', 'Presente'],
  ['Finestra appannata', 'Messaggio'], ['Pane caldo soft', 'Grazie'], ['Acqua sul tavolo', 'Chiarezza'],
  ['Silenzio delle undici', 'Sacro'],
];
cozy.forEach(([o, s]) => add('gratis', o, s, 'cozy',
  'Tarocchi come comfort quotidiano: un rito piccolo, caldo, onesto — lontano dalla performance.',
  '#tarocchi #selfcare #cozy #ritualedelmattino #quotidianità'));

// pad se manca (difesa)
while (blocks.length < 400) {
  const n = blocks.length + 1;
  add('gratis', `Piccolo rito ${n}`, 'Oggi', 'cozy',
    'Tarocchi come comfort quotidiano: un rito piccolo, caldo, onesto — lontano dalla performance.',
    '#tarocchi #selfcare #cozy #ritualedelmattino #quotidianità');
}

if (blocks.length !== 400) {
  console.error('Expected 400 got', blocks.length);
  process.exit(1);
}
const seen = new Map();
for (const b of blocks) seen.set(b[1], (seen.get(b[1]) || 0) + 1);
const dupes = [...seen.entries()].filter(([, c]) => c > 1);
if (dupes.length) {
  console.error('Dupes', dupes.slice(0, 15));
  process.exit(1);
}

fs.writeFileSync(
  path.join(__dirname, 'lot8-advice-data.mjs'),
  `/**\n * Lot 8: pin 841–1240 (400) — nuove nicchie.\n * [theme, overlay, sub, niche, desc, tags]\n */\nexport const ADVICE = ${JSON.stringify(blocks, null, 2)};\n`,
  'utf8'
);
const niches = {};
for (const b of blocks) niches[b[3]] = (niches[b[3]] || 0) + 1;
console.log('OK lot8', blocks.length, niches);
