import Stripe from 'stripe';
import { checkRateLimit, cors, verifyUnlockToken, signUnlock, consumeCreditStripe } from './_lib/unlock.js';
import { sendCreditsEmail } from './_lib/email.js';

function buildSystemPrompt(mode) {
  const isFull = mode === 'full';
  return `
Sei un medium che legge i tarocchi. Risposta in italiano, informale, mai negativa. Max ${isFull ? '700' : '450'} parole. Niente memoria di letture precedenti.

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

MODALITÀ ${isFull ? 'COMPLETA' : 'TEASER'}:
${isFull
  ? '- Dai risposte più chiare e un prossimo passo concreto (riflessione, non certezza assoluta). Puoi ricordare che può tornare su Luxseetarot per altre letture. Niente telefoni, operatori umani o consulti in sede.'
  : '- Lascia un punto in sospeso (open loop). Invita a sbloccare la lettura completa digitale su Luxseetarot. Niente telefoni, operatori umani o consulti in sede.'}
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

    const { name, birthDate, question, cards, mode = 'teaser', unlockToken } = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ ok: false, error: 'Chiave API non configurata.' });
    if (!name || !question || !Array.isArray(cards) || cards.length < 1) {
      return res.status(400).json({ ok: false, error: 'Dati lettura incompleti.' });
    }

    let remainingCredits = null;
    let nextToken = null;
    const isFull = mode === 'full';

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

      if (consumed.email) {
        sendCreditsEmail({
          to: consumed.email,
          name,
          remaining: consumed.remaining,
          max: consumed.max,
          sessionId: unlocked.sessionId,
          kind: 'usage',
        }).catch((e) => console.error('Email usage error:', e));
      }
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
