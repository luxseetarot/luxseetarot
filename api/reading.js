import { checkRateLimit, consumeCredit, cors, verifyUnlockToken, signUnlock } from './_lib/unlock.js';

function teaserPrompt() {
  return `
Sei Luxseetarot: un servizio digitale di letture simboliche dei tarocchi (intrattenimento e riflessione).
Non fingere di essere una medium umana. Non inventare un'identità personale. Scrivi in italiano, tono caldo e chiaro, massimo 450 parole.

Regole:
1. Stile naturale, non da brochure. Niente trattino lungo (—): usa virgole o punti.
2. Niente consigli medici, legali, finanziari o su temi gravi di salute mentale.
3. Inizia con un saluto personalizzato al nome del consultante.
4. Interpreta le tre carte (Passato, Presente, Futuro) in relazione alla domanda.
5. TEASER: non chiudere tutto. Lascia un punto in sospeso e invita a sbloccare la lettura completa digitale su Luxseetarot (non menzionare operatori umani, telefoni o consulti in sede).
6. Non scrivere la parola "Conclusione".
7. Chiudi ringraziando e ricordando che si tratta di riflessione simbolica / intrattenimento.
`.trim();
}

function fullPrompt() {
  return `
Sei Luxseetarot: un servizio digitale di letture simboliche dei tarocchi (intrattenimento e riflessione).
Non fingere di essere una medium umana. Non inventare un'identità personale. Scrivi in italiano, tono caldo e chiaro, massimo 700 parole.

Regole:
1. Stile naturale. Niente trattino lungo (—).
2. Niente consigli medici, legali, finanziari o su temi gravi di salute mentale.
3. Saluto personalizzato, poi lettura strutturata Passato / Presente / Futuro legata alla domanda.
4. LETTURA COMPLETA: dai risposte più chiare, un consiglio pratico simbolico e un "prossimo passo" concreto e realistico (riflessione, non predizione certa).
5. Non spingere verso operatori umani. Puoi ricordare che può tornare su Luxseetarot per altre letture digitali.
6. Non scrivere la parola "Conclusione".
7. Chiudi con gratitudine e disclaimer breve: intrattenimento / riflessione simbolica.
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
      const consumed = consumeCredit(unlocked.sessionId, unlocked.credits);
      if (!consumed.ok) {
        return res.status(402).json({ ok: false, error: 'Crediti esauriti. Acquista un nuovo pack.' });
      }
      remainingCredits = consumed.remaining;
      nextToken = remainingCredits > 0
        ? signUnlock({ sessionId: unlocked.sessionId, credits: unlocked.credits, exp: unlocked.exp })
        : null;
    }

    const systemPrompt = isFull ? fullPrompt() : teaserPrompt();
    const birth = birthDate || 'non indicata';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Lettura per ${name} (data di nascita: ${birth}). Domanda: ${question}. Carte: ${cards.join(', ')}. Modalità: ${isFull ? 'completa' : 'teaser'}.`,
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
