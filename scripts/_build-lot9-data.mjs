/**
 * Builds scripts/lot9-advice-data.mjs (400 unique overlays, 5 nicchie × 80).
 *   node scripts/_build-lot9-data.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blocks = [];

function add(theme, overlay, sub, niche, desc, tags) {
  blocks.push([theme, overlay, sub, niche, desc, tags]);
}

function take80(arr, name) {
  if (arr.length < 80) {
    console.error(`${name} has ${arr.length}, need at least 80`);
    process.exit(1);
  }
  return arr.slice(0, 80);
}

const arte = [
  ['Sogno lucido', 'Sulle carte'], ['Frammento di sogno', 'Raccoglilo'], ['Logica che tace', 'Parla l’inconscio'],
  ['Collage dell’anima', 'Un pezzo'], ['Surrealismo soft', 'Nella stesa'], ['Occhio geometrico', 'Guarda dentro'],
  ['Simbolo che brilla', 'Non è caso'], ['Poesia muta', 'Traducila'], ['Verso senza parole', 'L’immagine'],
  ['Composizione sacra', 'Ogni dettaglio'], ['Colore che parla', 'Ascoltalo'], ['Sguardo della figura', 'Messaggio'],
  ['Forma e senso', 'Insieme'], ['Geometria del cuore', 'Nascosta'], ['Cerchio e triangolo', 'Nel mazzo'],
  ['Dettaglio vivo', 'Nella carta'], ['Frammento lucido', 'Del sogno'], ['Inconscio in cornice', 'Apri'],
  ['Arte della stesa', 'È poesia'], ['Immagine che traduce', 'Ciò che senti'], ['Metafora visiva', 'Tua'],
  ['Soglia onirica', 'Attraversala'], ['Notte surrealista', 'Una carta'], ['Lucidità nel caos', 'Dell’immagine'],
  ['Simbolo ripetuto', 'Pista'], ['Motivo nascosto', 'Nel fondo'], ['Oro e magenta', 'Nella visione'],
  ['Collage interiore', 'Riordina'], ['Frammenti uniti', 'Un senso'], ['Astratto vero', 'Nel petto'],
  ['Figura sospesa', 'Nel vuoto'], ['Segni che fluttuano', 'Raccoglili'], ['Spazio negativo', 'Parla ancora'],
  ['Cornice dorata', 'Del mistero'], ['Pennellata di fato', 'Una'], ['Tela dell’inconscio', 'Dipingi'],
  ['Museo interiore', 'Visita'], ['Opera incompleta', 'Sei tu'], ['Bozza del destino', 'Rivedila'],
  ['Esposizione soft', 'Di te'], ['Galleria di carte', 'Una storia'], ['Installazione viva', 'La stesa'],
  ['Luce da museo', 'Sul simbolo'], ['Curatela del Sé', 'Scegli'], ['Catalogo onirico', 'Apri'],
  ['Ritratto dell’anima', 'Onesto'], ['Autoritratto soft', 'Con una carta'], ['Natura morta viva', 'Segnale'],
  ['Still life sacro', 'Sul tavolo'], ['Proporzione aurea', 'Nel gesto'], ['Asimmetria fertile', 'Bellezza'],
  ['Simmetria spezzata', 'Verità'], ['Pattern visivo', 'Nel mazzo'], ['Rima d’immagini', 'Trovala'],
  ['Strofa di carte', 'Tre versi'], ['Metafora aperta', 'Non chiudere'], ['Allegoria soft', 'Dell’oggi'],
  ['Icona personale', 'Nella carta'], ['Emblema vivo', 'Portalo'], ['Sigillo nascosto', 'Nel dettaglio'],
  ['Geroglifico emotivo', 'Decifra'], ['Lingua dei simboli', 'Imparala'], ['Dialetto del sogno', 'Ascolta'],
  ['Traduzione muta', 'Dal visivo'], ['Sottotitolo interiore', 'Scrivilo'], ['Lezione di luce', 'Nel colore'],
  ['Scuola del dettaglio', 'Guarda'], ['Atelier dell’anima', 'Lavora'], ['Studio surrealista', 'Di te'],
  ['Bozzetto di scelta', 'Una linea'], ['Schizzo del dopo', 'Leggero'], ['Acquarello del dubbio', 'Si asciuga'],
  ['Inchiostro del sì', 'Segna'], ['Pastello del no', 'Delicato'], ['Tela bianca', 'Prima della carta'],
  ['Primo piano sacro', 'Un occhio'], ['Fuoco di scena', 'Sul simbolo'], ['Saturazione viva', 'Del senso'],
  ['Lente poetica', 'Sulla stesa'], ['Scatto astratto', 'Del cuore'], ['Polaroid del fato', 'Istantanea'],
];

const punk = [
  ['Hackera il destino', 'Con scelte'], ['Rompi lo schema', 'Oggi'], ['Regole da riscrivere', 'Tue'],
  ['Aspettative sociali', 'Tagliale'], ['Predizione fissa', 'Rifiutala'], ['Destino editabile', 'Tu'],
  ['Caos creativo', 'Tua forza'], ['Disordine fertile', 'Semina'], ['Torre che libera', 'Spazio'],
  ['Bellezza del caos', 'Accoglila'], ['Vita non lineare', 'Accettala'], ['Anarchia spirituale', 'Senza dogmi'],
  ['Manuale spezzato', 'Crea il tuo'], ['Significato personale', 'Per ogni carta'], ['Dogma fuori', 'Intuito dentro'],
  ['Tarot punk', 'Libero'], ['Dissacrazione soft', 'Ma onesta'], ['Look alternativo', 'Dell’anima'],
  ['Catena spezzata', 'Del “dovresti”'], ['Fuoco ribelle', 'Nel petto'], ['Shock utile', 'Poi chiarezza'],
  ['Rottura di pattern', 'Voluta'], ['Schema familiare', 'Esci'], ['Copione sociale', 'Riscrivilo'],
  ['No al destino chiuso', 'Apri'], ['Sì al rischio lucido', 'Calcolato'], ['Caos che insegna', 'Ascolta'],
  ['Forza nel disordine', 'Trovata'], ['Energia Torre', 'Usala'], ['Crollo come arte', 'Poi ricostruisci'],
  ['Macerie creative', 'Materiale'], ['Rivolta interiore', 'Gentile'], ['Protesta quieta', 'Un no'],
  ['Manifesto personale', 'Una carta'], ['Graffiti dell’anima', 'Segna'], ['Street oracolo', 'Nel quotidiano'],
  ['Antitesi al dogma', 'Libertà'], ['Eresia fertile', 'Di senso'], ['Culto di te', 'Non ego'],
  ['Autorità interiore', 'Solo tua'], ['Gerarchia spezzata', 'Nel cuore'], ['Potere restituito', 'A te'],
  ['Controllo sciolto', 'Respira'], ['Obbedienza cieca', 'No'], ['Disobbedienza sacra', 'Sì'],
  ['Regola inventata', 'Tua'], ['Codice punk', 'Delle carte'], ['Estetica del no', 'Chiara'],
  ['Shock rosa', 'E arancio'], ['Neon del rifiuto', 'Acceso'], ['Catena d’oro rotta', 'Simbolo'],
  ['Scossa al sistema', 'Interno'], ['Bug nel destino', 'Exploitalo'], ['Patch ribelle', 'Alla vita'],
  ['Override del sempre', 'Ora'], ['Glitch che libera', 'Accoglilo'], ['Crash del vecchio', 'Voluto'],
  ['Reboot punk', 'Di te'], ['Safe mode off', 'Vivi'], ['Root access ribelle', 'A te'],
  ['Firewall delle regole', 'Abbassalo'], ['Porte aperte', 'Al caos'], ['Uscita di emergenza', 'Dal copione'],
  ['Antitesi soft', 'Al previsto'], ['Controcorrente', 'Con cura'], ['Fuori dal coro', 'La tua nota'],
  ['Voce stonata', 'Vera'], ['Ritmo spezzato', 'Poi nuovo'], ['Armonia dopo il rumore', 'Arriva'],
  ['Torre come amica', 'Non nemica'], ['Caos come maestro', 'Se ascolti'], ['Disordine come mappa', 'Leggila'],
  ['Schema rotto', 'Aria nuova'], ['Aspettativa caduta', 'Sollievo'], ['Libertà grezza', 'Poi forma'],
  ['Anarchia del senso', 'Personale'], ['Dogma in cenere', 'Semina'], ['Manuale bruciato', 'Intuito'],
  ['Carta senza regola', 'Tua lettura'], ['Significato hackerato', 'Aggiornato'], ['Oracolo libero', 'Non gabbia'],
  ['Fato non è carcere', 'Esci'], ['Predizione soft', 'Non catena'], ['Futuro ribelle', 'Si scrive'],
];

const cinema = [
  ['Vita come film', 'Tu regista'], ['Colpo di scena', 'Nella carta'], ['Personaggio del giorno', 'Chi sei'],
  ['Sceneggiatura viva', 'Riscrivila'], ['Atto secondo', 'Inizia'], ['Cliffhanger soft', 'Del cuore'],
  ['Dietro le quinte', 'Del fato'], ['Fili invisibili', 'Spiali'], ['Palcoscenico reale', 'Oltre'],
  ['Sipario socchiuso', 'Guarda'], ['Prova generale', 'Della scelta'], ['Prima dello spettacolo', 'Respiro'],
  ['Ogni lettura storia', 'Infinita'], ['Libro ricomposto', 'Il mazzo'], ['Racconto mescolato', 'Ancora'],
  ['Trama personale', 'Un nodo'], ['Plot twist utile', 'Accoglilo'], ['Antagonista interno', 'Nominalo'],
  ['Protagonista soft', 'Sei tu'], ['Comparsa importante', 'Un gesto'], ['Extra della vita', 'O stella'],
  ['Luce drammatica', 'Sul tema'], ['Taglio di luce', 'Verità'], ['Controluce del dubbio', 'Poi nitido'],
  ['Close-up emotivo', 'Una carta'], ['Campo lungo', 'Del futuro'], ['Fuori scena', 'Cosa conta'],
  ['Voice over interiore', 'Ascolta'], ['Dialogo muto', 'Con le carte'], ['Monologo onesto', 'Scrivilo'],
  ['Battuta mancata', 'Nel copione'], ['Improvisazione viva', 'Oggi'], ['Regia del Sé', 'Prendi'],
  ['Montaggio di giorni', 'Un senso'], ['Flashback utile', 'Non catena'], ['Flashforward soft', 'Direzione'],
  ['Spoiler del cuore', 'Già sapevi'], ['Trailer della scelta', 'Un indizio'], ['Poster del destino', 'Immagine'],
  ['Genere della vita', 'Quale'], ['Dramma o commedia', 'Tono'], ['Thriller interiore', 'Tensioni'],
  ['Romance consapevole', 'Scelta'], ['Noir del dubbio', 'Poi luce'], ['Documentario di te', 'Fatti'],
  ['Fiction e verità', 'Distinguili'], ['Ruolo che reciti', 'Si può lasciare'], ['Maschera di scena', 'Toglila'],
  ['Camerino interiore', 'Prepara'], ['Costume del giorno', 'Energia'], ['Trucco del Sé', 'Onesto'],
  ['Applauso interno', 'Un sì'], ['Fischio utile', 'Un no'], ['Botteghino dell’anima', 'Cosa vende'],
  ['Sold out di te', 'Presenza'], ['Anteprima privata', 'Della lettura'], ['Matinée del mattino', 'Una carta'],
  ['Serata di gala', 'O quiete'], ['Intervallo sacro', 'Respiro'], ['Bis della lezione', 'Se serve'],
  ['Finale aperto', 'Permesso'], ['Chiusura di atto', 'Celebra'], ['Titoli di coda', 'Di un ciclo'],
  ['Crediti nascosti', 'Chi muove'], ['Produttore interno', 'Risorse'], ['Scenografo del fato', 'Dettagli'],
  ['Luci di scena', 'Sul nodo'], ['Buio utile', 'Prima del focus'], ['Spotlight sul vero', 'Ora'],
  ['Sipario che sale', 'Inizia'], ['Sipario che scende', 'Chiudi'], ['Quarta parete', 'Rompi soft'],
  ['Pubblico interno', 'Chi giudica'], ['Critica gentile', 'A te'], ['Recensione onesta', 'Del giorno'],
  ['Storyboard emotivo', 'Tre frame'], ['Inquadratura giusta', 'Una domanda'], ['Fuoco selettivo', 'Sul tema'],
  ['Lente cinematografica', 'Sulla stesa'], ['Colonna sonora', 'Del petto'], ['Silenzio da film', 'Parla'],
  ['Cut utile', 'Dal passato'], ['Dissolve al nuovo', 'Piano'], ['Fade in chiaro', 'Del sì'],
  ['Fade out soft', 'Di ciò che esce'], ['Jump cut interiore', 'Sveglia'], ['Slow motion dubbio', 'Poi agisci'],
];

const natura = [
  ['Voce della Terra', 'Ascoltala'], ['Ciclo delle stagioni', 'Nel mazzo'], ['Primavera Bastoni', 'Fuoco vivo'],
  ['Estate Coppe', 'Acqua piena'], ['Autunno Spade', 'Aria tagliente'], ['Inverno Denari', 'Radici'],
  ['Saggezza degli alberi', 'Lenta'], ['Radici profonde', 'Memoria'], ['Foglia che cade', 'Lascia'],
  ['Bosco che parla', 'Entra'], ['Fiume che guida', 'Segui'], ['Pietra e ossa', 'Antiche'],
  ['Fiori secchi', 'Bellezza'], ['Muschio soft', 'Sul tempo'], ['Lupo nella Luna', 'Istinto'],
  ['Cane fedele', 'Compagnia'], ['Leone della Forza', 'Coraggio'], ['Aquila del Mondo', 'Vista'],
  ['Spiritualità animale', 'Simbolo'], ['Totem del giorno', 'Quale'], ['Verde strega', 'Nel bosco'],
  ['Folk oracolo', 'Semplice'], ['Foglia e carta', 'Stesso rito'], ['Terra sotto i piedi', 'Presenza'],
  ['Vento nei rami', 'Messaggio'], ['Rugiada del mattino', 'Chiarezza'], ['Fungo e mistero', 'Soglia'],
  ['Radice esposta', 'Verità'], ['Corteccia antica', 'Storia'], ['Linfa che sale', 'Energia'],
  ['Semina interiore', 'Un sì'], ['Raccolto emotivo', 'Ora'], ['Maggese soft', 'Riposa'],
  ['Compost del passato', 'Nutre'], ['Humus dell’anima', 'Fertile'], ['Orto sacro', 'Cura'],
  ['Erba che cresce', 'Nel crepa'], ['Rovo e confine', 'Proteggi'], ['Rosa selvatica', 'Bellezza'],
  ['Spine utili', 'Limiti'], ['Miele e pungiglione', 'Entrambi'], ['Alveare interiore', 'Lavoro'],
  ['Nido vuoto', 'Spazio'], ['Uovo del dopo', 'Proteggi'], ['Volare soft', 'Quando tocca'],
  ['Zampa sulla terra', 'Ancora'], ['Traccia nel fango', 'Segnale'], ['Orme animali', 'Segui'],
  ['Corvo messaggero', 'Ascolta'], ['Civetta quieta', 'Notte'], ['Serpente che muda', 'Cambia'],
  ['Cervo all’alba', 'Grazia'], ['Orso in letargo', 'Riposo'], ['Volpe furba', 'Intuito'],
  ['Farfalla soglia', 'Trasforma'], ['Ragno tessuto', 'Destino'], ['Ape operaia', 'Gesto'],
  ['Luna tra i rami', 'Luce'], ['Sole nel sottobosco', 'Macchie'], ['Stella e muschio', 'Insieme'],
  ['Ruscello chiaro', 'Pensiero'], ['Palude fertile', 'Non giudicare'], ['Montagna radicata', 'Saldezza'],
  ['Valle che accoglie', 'Riposo'], ['Grotta umida', 'Rientra'], ['Radura aperta', 'Scelta'],
  ['Sentiero battuto', 'O nuovo'], ['Fuoco di campo', 'Cerchio'], ['Cenere e seme', 'Ciclo'],
  ['Pioggia sul bosco', 'Purifica'], ['Nebbia mattutina', 'Mistero'], ['Gelo che insegna', 'Pausa'],
  ['Germoglio nel gelo', 'Speranza'], ['Ghianda e quercia', 'Tempo'], ['Seme invisibile', 'Lavora'],
  ['Micelio interiore', 'Connessioni'], ['Rete della Terra', 'Sei parte'], ['Sinfonia verde', 'Ascolta'],
  ['Canto degli uccelli', 'Oracolo'], ['Silenzio del bosco', 'Sacro'], ['Odore di terra', 'Casa'],
];

const filosofia = [
  ['Silenzio dell’universo', 'Interroga'], ['Mondo senza risposte', 'Le carte'], ['Senso nell’assurdo', 'Cerca'],
  ['Vuoto che parla', 'Ascoltalo'], ['Assurdo fertile', 'Non fuga'], ['Oltre la logica', 'Un passo'],
  ['Paradosso del libero', 'Arbitrio'], ['Strada mostrata', 'Si cambia'], ['Scelta e destino', 'Danza'],
  ['Dilemma vivo', 'Nominalo'], ['Libertà nel vincolo', 'Possibile'], ['Destino soft', 'Non catena'],
  ['Accettare il vuoto', 'Coraggio'], ['Il Matto salta', 'Nel precipizio'], ['Salto esistenziale', 'Puro'],
  ['Precipizio fertile', 'Fiducia'], ['Vuoto come casa', 'A volte'], ['Niente e tutto', 'Insieme'],
  ['Domanda senza risposta', 'Resta'], ['Risposta che apre', 'Altre'], ['Senso sospeso', 'Ok'],
  ['Assenza di Dio soft', 'O presenza'], ['Universo muto', 'Tu parli'], ['Eco del sé', 'Nel silenzio'],
  ['Abisso che guarda', 'Guardalo'], ['Vertigine utile', 'Poi terra'], ['Caduta consapevole', 'Scelta'],
  ['Rischio ontologico', 'Esistere'], ['Essere e nulla', 'Un respiro'], ['Qui e ora assurdo', 'Basta'],
  ['Perché senza perché', 'Cammina'], ['Sisifo soft', 'Riparte'], ['Pietra che rotola', 'Ancora'],
  ['Mito personale', 'Riscrivilo'], ['Camus in tasca', 'Una carta'], ['Kierkegaard quieto', 'Salto'],
  ['Angoscia fertile', 'Se nominata'], ['Paura del vuoto', 'Attraversala'], ['Coraggio nudo', 'Senza trama'],
  ['Senza rete', 'Ma presente'], ['Fede senza dogmi', 'Nel salto'], ['Fiducia cieca soft', 'Nel gesto'],
  ['Certezza impossibile', 'Agisci'], ['Dubbio onesto', 'Compagno'], ['Ironia dell’essere', 'Sorridi'],
  ['Tragedia leggera', 'Del quotidiano'], ['Commedia cosmica', 'Tu'], ['Teatro dell’assurdo', 'Vivi'],
  ['Maschera dell’essere', 'Toglila'], ['Nudità esistenziale', 'Ok'], ['Solitudine cosmica', 'Connessa'],
  ['Stelle mute', 'Tu chiedi'], ['Notte filosofica', 'Una carta'], ['Alba senza risposte', 'Cammina'],
  ['Orizzonte aperto', 'Vuoto pieno'], ['Limite del linguaggio', 'Immagine'], ['Oltre le parole', 'Simbolo'],
  ['Ineffabile soft', 'Senti'], ['Mistero non risolto', 'Resta'], ['Enigma vivo', 'Non forzare'],
  ['Paradosso amico', 'Tienilo'], ['Contraddizione fertile', 'Integra'], ['Sì e no insieme', 'Vivi'],
  ['Libero nel mostrato', 'Scegli'], ['Vincolo che libera', 'Se capisci'], ['Fato come mappa', 'Non gabbia'],
  ['Strada e bivio', 'Entrambi veri'], ['Possibile e necessario', 'Distingui'], ['Contingenza sacra', 'Oggi'],
  ['Caso e senso', 'Co-creati'], ['Assurdo e amore', 'Possibili'], ['Vuoto e cura', 'Insieme'],
  ['Matto filosofo', 'Salta'], ['Precipizio come porta', 'Entra'], ['Caduta come volo', 'A volte'],
  ['Terra dopo il salto', 'Arriva'], ['Atterraggio soft', 'Poi cammina'], ['Cicatrice esistenziale', 'Maestra'],
  ['Ferita che apre', 'Al senso'], ['Cicatrice luminosa', 'Segno'], ['Storia del vuoto', 'Tua'],
  ['Diario dell’assurdo', 'Scrivi'], ['Preghiera senza dio', 'Al silenzio'], ['Rito del dubbio', 'Onesto'],
];

take80(arte, 'arte').forEach(([o, s]) => add('gratis', o, s, 'arte',
  'I tarocchi come frammenti di sogno e poesia visiva: colori, sguardi e forme parlano più della logica.',
  '#tarocchi #surrealismo #arte #simboli #poesiavisiva'));

take80(punk, 'punk').forEach(([o, s]) => add('futuro', o, s, 'punk',
  'Tarot punk: rifiutare predizioni fisse, trovare forza nel caos e creare il proprio significato — senza dogmi.',
  '#tarocchi #tarotpunk #caos #ribellione #liberoarbitrio'));

take80(cinema, 'cinema').forEach(([o, s]) => add('futuro', o, s, 'cinema',
  'La vita come sceneggiatura: le carte sono colpi di scena, fili dietro le quinte e storie infinite ricomposte.',
  '#tarocchi #cinema #storytelling #teatro #narrativa'));

take80(natura, 'natura').forEach(([o, s]) => add('gratis', o, s, 'natura',
  'Natura selvaggia e green witch: semi, stagioni, alberi e animali nelle carte — la Terra parla se ascolti.',
  '#tarocchi #greenwitch #natura #paganesimo #folk'));

take80(filosofia, 'filosofia').forEach(([o, s]) => add('domanda', o, s, 'filosofia',
  'Filosofia dell’esistenza: silenzio cosmico, paradosso del libero arbitrio e coraggio del Matto nel vuoto.',
  '#tarocchi #filosofia #assurdo #liberoarbitrio #esistenza'));

if (blocks.length !== 400) {
  console.error('Expected 400 got', blocks.length);
  process.exit(1);
}
const seen = new Map();
for (const b of blocks) seen.set(b[1], (seen.get(b[1]) || 0) + 1);
const dupes = [...seen.entries()].filter(([, c]) => c > 1);
if (dupes.length) {
  console.error('Dupes', dupes.slice(0, 20));
  process.exit(1);
}

fs.writeFileSync(
  path.join(__dirname, 'lot9-advice-data.mjs'),
  `/**\n * Lot 9: pin 1241–1640 (400) — nicchie arte/punk/cinema/natura/filosofia, colori accesi.\n * [theme, overlay, sub, niche, desc, tags]\n */\nexport const ADVICE = ${JSON.stringify(blocks, null, 2)};\n`,
  'utf8'
);
const niches = {};
for (const b of blocks) niches[b[3]] = (niches[b[3]] || 0) + 1;
console.log('OK lot9', blocks.length, niches);
