import Stripe from 'stripe';
import { checkRateLimit, cors, verifyUnlockToken, signUnlock, consumeCreditStripe } from './_lib/unlock.js';
import { verifyTurnstileToken } from './_lib/turnstile.js';

function buildSystemPrompt(mode) {
  const isFull = mode === 'full';
  return `
Sei un medium che legge i tarocchi. Risposta in italiano, informale, mai negativa. Max ${isFull ? '700' : '380'} parole. Niente memoria di letture precedenti.

STILE (obbligatorio): testo che NON sembri AI. Naturale, personale, imperfetto.
- Scegli UN tono: colloquiale / ironico / malinconico / entusiasta / riflessivo / spontaneo / sarcastico.
- Modi di dire e interiezioni (boh, insomma, eh già…).
- Incertezze realistiche (forse, non sono sicuro, potrei sbagliarmi).
- Frasi di lunghezza variabile; qualche ripetizione, inciso, ripensamento a metà frase.
- Se calza, un aneddoto o opinione soggettiva. Meglio veri che precisi/enciclopedici.
- Lessico semplice ma espressivo, anche fuori registro.
- MAI il trattino lungo (—). Usa virgole, parentesi o punti.

VIETATO: consigli medici, legali, argomenti delicati.

FORMATO:
- Data di nascita del consultante in formato italiano.
- Apri con saluto caloroso e personalizzato (Ciao/Caro/a + nome), empatia. Esempio di idea (NON copiare): grazie per la fiducia, capisco quanto conti avere chiarezza ora.
- Interpreta le carte rispetto alla domanda. Testo chiaro e ben formattato.
- Non scrivere la parola "conclusione".
- Chiudi con conforto, ispirazione, gratitudine; invita a riflettere o a un piccolo passo; ringrazia. Tono empatico, rassicurante, spirituale ma accessibile; fluido, caldo, poetico ma naturale.

MODALITÀ ${isFull ? 'COMPLETA (PREMIUM)' : 'TEASER GRATUITO'}:
${isFull
  ? `- Lettura a pagamento: deve sentirsi chiaramente più ricca e rituale dell'anteprima gratuita.
- Struttura OBBLIGATORIA in tre sezioni (Passato, Presente, Futuro). Prima di ogni sezione metti una riga da sola con SOLO il nome della carta tra doppi asterischi, con maiuscole normali italiane, esattamente così:
**La Luna**
(poi a capo il testo della sezione). Usa i nomi delle carte forniti, senza inventarne altri.
- Nel testo metti in **grassetto** le parole e i concetti davvero importanti (emozioni chiave, scelte, tempi, avvertimenti dolci, prossimi passi). Circa 8-14 grassetti in tutta la lettura.
- OBBLIGATORIO sul grassetto: usa **parola** in minuscolo/maiuscole normali (es. **chiarezza**, **scelta del cuore**). VIETATO evidenziare con TUTTO MAIUSCOLO. Mai scrivere EMOZIONE o CHIAREZZA in maiuscolo per enfasi: solo **grassetto**.
- Dai risposte più chiare e un prossimo passo concreto (riflessione, non certezza assoluta).
- Ringrazia per la fiducia nella lettura completa. Puoi ricordare Luxseetarot per altre letture.
- Niente telefoni, operatori umani o consulti in sede.`
  : `- Anteprima gratuita: stile più semplice e leggero della versione a pagamento.
- Lunghezza: circa 320-380 parole (mai oltre ~380).
- NON usare il grassetto (**parola**). Nessun titolo carta per carta. Flusso continuo, senza sezioni rituali.
- NON svelare tutto: niente analisi completa Passato/Presente/Futuro esaustiva, niente risposta definitiva.
- Assaggio evocativo, empatia, un dettaglio lasciato in sospeso (curiosità sana, non ansia).
- CHIUSURA (obbligatoria, ultime 2-4 frasi): invita in modo naturale a sbloccare la lettura completa di QUESTA stessa domanda, ora che le carte sono già uscite. Crea una leggera urgenza soft: il pezzo lasciato aperto merita di essere letto finché l'intuizione è ancora calda, senza aspettare "un altro momento". Tono da amico sincero, mai da venditore.
- VIETATO in chiusura: parlare di Luxseetarot come fosse una persona ("chiedi a Luxseetarot", "Luxseetarot ti aspetta", "parla con Luxseetarot"). Niente toni tragici, minacciosi o da televendita. Niente telefoni, operatori umani o consulti in sede.
- Puoi dire al massimo, in modo sobrio, che la versione completa è disponibile qui, in digitale, per chiudere il cerchio sulla domanda.`}
`.trim();
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
    if (!checkRateLimit(ip, { max: 30, windowMs: 60 * 60 * 1000 })) {
      return res.status(429).json({ ok: false, error: 'Troppe richieste. Riprova tra un po\'.' });
    }

    const { name, birthDate, question, cards, mode = 'teaser', unlockToken, turnstileToken } = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ ok: false, error: 'Chiave API non configurata.' });
    if (!name || !question || !Array.isArray(cards) || cards.length < 1) {
      return res.status(400).json({ ok: false, error: 'Dati lettura incompleti.' });
    }

    const isFull = mode === 'full';
    if (!isFull) {
      const bot = await verifyTurnstileToken(turnstileToken, ip);
      if (!bot.ok) return res.status(403).json({ ok: false, error: bot.error || 'Verifica anti-bot fallita.' });
    }

    let remainingCredits = null;
    let nextToken = null;

    if (isFull) {
      const unlocked = verifyUnlockToken(unlockToken);
      if (!unlocked) {
        return res.status(402).json({ ok: false, error: 'Sblocco non valido o scaduto. Acquista la lettura completa.' });
      }
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) return res.status(500).json({ ok: false, error: 'Stripe non configurato.' });
      const stripe = new Stripe(stripeKey);
      const consumed = await consumeCreditStripe(stripe, unlocked.sessionId);
      if (!consumed.ok) {
        return res.status(402).json({ ok: false, error: 'Crediti esauriti. Acquista un nuovo pack.' });
      }
      remainingCredits = consumed.remaining;
      nextToken = remainingCredits > 0
        ? signUnlock({ sessionId: unlocked.sessionId, credits: unlocked.credits, exp: unlocked.exp })
        : null;
    }

    const systemPrompt = buildSystemPrompt(isFull ? 'full' : 'teaser');
    const birth = birthDate || 'non indicata';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Consultante: ${name}. Nato/a il: ${birth}. Argomento/domanda: ${question}. Carte (Passato, Presente, Futuro): ${cards.join(', ')}.`,
          },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI Error:', JSON.stringify(data));
      const code = data?.error?.code || '';
      const type = data?.error?.type || '';
      const status = response.status;
      let msg = 'Errore dal servizio AI.';
      if (code === 'insufficient_quota' || type === 'insufficient_quota') {
        msg = 'Credito OpenAI esaurito o assente. Aggiungi credito su platform.openai.com → Billing.';
      } else if (status === 401 || code === 'invalid_api_key') {
        msg = 'Chiave OpenAI non valida. Controlla OPENAI_API_KEY su Vercel.';
      } else if (status === 429 || code === 'rate_limit_exceeded') {
        msg = 'Limite richieste OpenAI. Aspetta 1 minuto oppure aumenta il piano/credito su platform.openai.com.';
      }
      return res.status(500).json({ ok: false, error: msg });
    }

    let reading = data.choices[0].message.content.trim();
    reading = reading.replace(/—/g, ',');
    reading = reading.replace(/\n{3,}/g, '\n\n');

    return res.status(200).json({
      ok: true,
      reading,
      mode: isFull ? 'full' : 'teaser',
      remainingCredits,
      unlockToken: nextToken,
    });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ ok: false, error: 'Errore interno durante la generazione.' });
  }
}
