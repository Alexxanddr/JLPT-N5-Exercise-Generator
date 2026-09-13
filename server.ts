import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { evaluateWithLocalEngine } from "./src/utils/localN5Engine";
import { N5_TOPICS, getDiversePromptForTopic, ALL_THEMES_ID } from "./src/data/n5curriculum";

const app = express();
const PORT = 3000;

app.use(express.json());

const SYSTEM_INSTRUCTION = `
Sei un tutor personale di lingua giapponese specializzato nell'insegnamento a studenti di livello JLPT N5.
Il tuo compito è aiutare lo studente a migliorare la capacità di costruire frasi in giapponese attraverso esercizi di traduzione dall'italiano al giapponese.

OBIETTIVO PRINCIPALE:
Coprire TUTTI i 16 temi previsti dal programma ufficiale JLPT N5, proponendo frasi SEMPRE DIVERSE, stimolanti e autentiche:
1. Presentarsi e Conoscersi (nome, nazionalità 〜人, professioni, età, です, じゃありません)
2. Routine Quotidiana e Orari (orari precisi 〜時に, svegliarsi/dormire, pasti, azioni quotidiane)
3. Cibo, Bevande e Ristorante (ordinare 〜をください, gusti con が 好き/嫌い, luogo con で)
4. Acquisti, Negozi e Contatori (prezzi いくら, questo/quello これ/それ/あれ, contatori 〜つ, 〜本, 〜枚, 〜人, 〜円)
5. Casa, Stanze e Posizioni (inanimato あります vs animato います, posizioni 上/下/前/後ろ/中/隣/間)
6. Famiglia e Relazioni (termini umili 父/母 vs cortesi お父さん/お母さん, contatore persone ふたり/さんにん)
7. Scuola, Studio e Lingue (materie, compiti, lingue, strumenti con で: 鉛筆で, ペンで)
8. Lavoro, Ufficio e Professioni (luoghi di lavoro, orari da... a... から... まで, lavorare 働きます)
9. Tempo Libero, Hobby e Sport (cinema, musica, sport, avverbi di frequenza よく, たまに, あまり + ません)
10. Mezzi di Trasporto e Spostamenti (mezzo con で: 電車で, バスで, a piedi 歩いて, moto へ 行きます/来ます/帰ります)
11. Meteo, Clima e Stagioni (雨, 雪, 晴れ, caldo 暑い, freddo 寒い, stagioni 春/夏/秋/冬, passato 寒かったです)
12. Aggettivi e Descrizioni (aggettivi in -i e in -na, collegamento 〜くて, passato 〜かったです, negativo 〜くない)
13. Date, Calendario e Compleanni (giorni 何曜日, mesi 〜月, date speciali ついたち, ふつか, いつか, compleanno 誕生日)
14. Inviti, Proposte e Richieste (invito 〜ませんか, proposta 〜ましょう, richiesta cortese 〜てください)
15. Città, Edifici e Indicazioni Stradali (stazione, banca, posta, svoltare 右/左へ曲がります, まっすぐ行きます)
16. Salute, Corpo e Benessere (parti del corpo, 头が痛いです, febbre 熱があります, raffreddore 風邪, お大事に)

REGOLE SULLA GENERAZIONE DELLE FRASI:
- Varia continuamente le frasi! Non proporre mai frasi ripetitive o già svolte.
- Fai frasi con lessico reale e particelle N5 (は, が, を, に, で, へ, と, も, の, から, まで).
- Se l'argomento è "Tutti i temi (Mix Completo)", salta creativamente tra i 16 temi ad ogni turno per una preparazione completa.

TOLLERANZA E VALUTAZIONE:
- Se la risposta dello studente è corretta, dichiarala ✅ Corretta anche se differisce dalla soluzione standard (omissione del soggetto 私は, ordine naturale alternativo dei complementi, kanji o hiragana).
- Scrivere in hiragana è del tutto corretto a livello N5. Non considerarlo un errore. Aggiungi un suggerimento gentile sui kanji N5.
- Distingui accuratamente:
  - "correct": Corretta (✅)
  - "almost_correct": Quasi corretta (⚠️)
  - "incorrect": Da correggere (❌)
- In "whatToCorrect", spiega in modo chiaro, breve e cordiale in italiano gli errori su particelle, coniugazioni o lessico.
- Nella proprietà "nextExercise", genera una frase nuova in italiano appartenente al tema o alla progressione.

FORMATO RISPOSTA OBBLIGATORIO IN JSON:
{
  "evaluation": "correct" | "almost_correct" | "incorrect",
  "evaluationLabel": "✅ Corretta" | "⚠️ Quasi corretta" | "❌ Da correggere",
  "correctionKanji": "frase corretta in kanji N5",
  "correctionKana": "frase corretta in solo kana",
  "correctionRomaji": "trascrizione in romaji",
  "whatToCorrect": "spiegazione in italiano degli errori",
  "italianTranslation": "traduzione italiana fedele",
  "kanjiNotes": "eventuale nota costruttiva sui kanji N5",
  "nextExercise": "nuova frase italiana sempre diversa da tradurre",
  "conversationTopic": "tema N5 tra i 16",
  "grammarFocus": "punto grammaticale allenato"
}
`;

// 1. Health check - confirming Local AI Mode (offline & local model support)
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    aiEngine: "local",
    geminiActive: false,
    topicsCount: N5_TOPICS.length,
    supportedLocalBackends: ["local_builtin", "ollama", "lmstudio", "openai_compatible"]
  });
});

// 2. Test Connection to Local AI endpoint (Ollama / LM Studio)
app.post("/api/local-ai/test-connection", async (req, res) => {
  const { endpoint = "http://localhost:11434", provider = "ollama" } = req.body;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    let testUrl = endpoint;
    if (provider === "ollama") {
      testUrl = endpoint.replace(/\/$/, "") + "/api/tags";
    } else {
      testUrl = endpoint.replace(/\/$/, "") + "/models";
    }

    const response = await fetch(testUrl, {
      method: "GET",
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const models = provider === "ollama" && data.models
        ? data.models.map((m: any) => m.name)
        : data.data
        ? data.data.map((m: any) => m.id)
        : [];

      return res.json({
        connected: true,
        provider,
        endpoint,
        models,
        message: `Connesso con successo al server AI locale (${provider})!`
      });
    } else {
      return res.json({
        connected: false,
        provider,
        endpoint,
        message: `Il server locale ha risposto con codice ${response.status}.`
      });
    }
  } catch (err: any) {
    return res.json({
      connected: false,
      provider,
      endpoint,
      message: `Impossibile connettersi a ${endpoint}. Assicurati che il tuo server locale (${provider}) sia avviato.`
    });
  }
});

// 3. Initialize or restart session covering all 16 topics
app.post("/api/tutor/start", (req, res) => {
  const { topicId = ALL_THEMES_ID } = req.body || {};

  const { prompt, topic } = getDiversePromptForTopic(topicId);

  const welcomeMessage = topicId === ALL_THEMES_ID
    ? `Konnichiwa! Sono il tuo tutor personale di giapponese JLPT N5 (Modalità AI Locale). Oggi alleneremo l'intero programma N5 attraverso tutti i 16 temi con frasi sempre diverse! Iniziamo subito!`
    : `Konnichiwa! Iniziamo ad esercitarci sul tema: "${topic.nameIt}". Traduci la prima frase in giapponese:`;

  res.json({
    welcomeMessage,
    firstExercise: prompt,
    topic: topic.nameIt,
    topicId: topic.id,
    difficulty: "base"
  });
});

// 4. Request a brand new diverse prompt on demand (for "Nuova Frase" button)
app.post("/api/tutor/random-prompt", (req, res) => {
  const { topicId = ALL_THEMES_ID, seenPrompts = [] } = req.body || {};
  const { prompt, topic } = getDiversePromptForTopic(topicId, seenPrompts);

  res.json({
    prompt,
    topicName: topic.nameIt,
    topicId: topic.id,
    hint: topic.prompts.find((p) => p.italian === prompt)?.hint || `Punto chiave per questo esercizio: ${topic.description}`
  });
});

// 5. Evaluate student answer via Local AI model or Local Engine
app.post("/api/tutor/evaluate", async (req, res) => {
  const {
    studentAnswer,
    italianPrompt,
    conversationTopic,
    localConfig = {
      provider: "local_builtin",
      endpoint: "http://localhost:11434",
      model: "qwen2.5:7b"
    },
    seenPrompts = []
  } = req.body;

  if (!studentAnswer || !italianPrompt) {
    return res.status(400).json({ error: "studentAnswer e italianPrompt sono obbligatori." });
  }

  // If user selected built-in local engine
  if (localConfig.provider === "local_builtin") {
    const localResult = evaluateWithLocalEngine(
      studentAnswer,
      italianPrompt,
      conversationTopic,
      seenPrompts
    );
    return res.json(localResult);
  }

  // Try calling the local model endpoint (Ollama / LM Studio)
  try {
    const userPrompt = `
Esercizio attuale da tradurre per lo studente:
Italiano: "${italianPrompt}"
Tema JLPT N5: "${conversationTopic || 'Vita quotidiana N5'}"
Frasi già affrontate in questa sessione (NON ripeterle nel nextExercise): ${JSON.stringify(seenPrompts.slice(-5))}
Risposta fornita dallo studente: "${studentAnswer}"

Analizza la risposta dello studente verificando grammatica N5, particelle (wa, ga, o, ni, de, e, to, mo, no, kara, made) e forma cortese.
Proponi come 'nextExercise' una frase in italiano diversa, adatta a continuare l'allenamento N5.
Restituisci ESCLUSIVAMENTE un JSON valido conforme al formato specificato.
`;

    let generatedText = "";

    if (localConfig.provider === "ollama") {
      const ollamaUrl = localConfig.endpoint.replace(/\/$/, "") + "/api/chat";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 22000);

      const ollamaRes = await fetch(ollamaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: localConfig.model || "qwen2.5:7b",
          messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            { role: "user", content: userPrompt }
          ],
          stream: false,
          format: "json",
          options: {
            temperature: 0.35
          }
        })
      });
      clearTimeout(timeoutId);

      if (ollamaRes.ok) {
        const data = await ollamaRes.json();
        generatedText = data.message?.content || "";
      } else {
        throw new Error(`Ollama ha risposto con codice ${ollamaRes.status}`);
      }
    } else {
      // LM Studio / LocalAI / OpenAI compatible
      const lmUrl = localConfig.endpoint.replace(/\/$/, "") + "/chat/completions";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 22000);

      const lmRes = await fetch(lmUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: localConfig.model || "local-model",
          messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.35
        })
      });
      clearTimeout(timeoutId);

      if (lmRes.ok) {
        const data = await lmRes.json();
        generatedText = data.choices?.[0]?.message?.content || "";
      } else {
        throw new Error(`Server locale ha risposto con codice ${lmRes.status}`);
      }
    }

    // Parse JSON from local model
    let parsed: any = null;
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0]);
    } else {
      parsed = JSON.parse(generatedText);
    }

    const evaluationStatus = (parsed.evaluation === "correct" || parsed.evaluation === "almost_correct" || parsed.evaluation === "incorrect")
      ? parsed.evaluation
      : "correct";

    const labelMap: Record<string, string> = {
      correct: "✅ Corretta",
      almost_correct: "⚠️ Quasi corretta",
      incorrect: "❌ Da correggere"
    };

    return res.json({
      evaluation: evaluationStatus,
      evaluationLabel: parsed.evaluationLabel || labelMap[evaluationStatus],
      studentSentence: studentAnswer,
      correction: {
        kanji: parsed.correctionKanji || "",
        kana: parsed.correctionKana || "",
        romaji: parsed.correctionRomaji || ""
      },
      whatToCorrect: parsed.whatToCorrect || "Ottimo lavoro!",
      italianTranslation: parsed.italianTranslation || italianPrompt,
      kanjiNotes: parsed.kanjiNotes || "",
      nextExercise: parsed.nextExercise || getDiversePromptForTopic(ALL_THEMES_ID, [italianPrompt, ...seenPrompts]).prompt,
      conversationTopic: parsed.conversationTopic || conversationTopic || "Programma JLPT N5",
      difficultyLevel: parsed.difficultyLevel || "medio",
      grammarFocus: parsed.grammarFocus || "Grammatica e particelle N5"
    });
  } catch (err: any) {
    console.warn("Chiamata al modello AI locale fallita, utilizzo del motore locale integrato:", err.message);
    const fallback = evaluateWithLocalEngine(studentAnswer, italianPrompt, conversationTopic, seenPrompts);
    return res.json(fallback);
  }
});

// 6. Hint endpoint with rich N5 grammar hints
app.post("/api/tutor/hint", async (req, res) => {
  const { italianPrompt } = req.body;
  const promptLower = (italianPrompt || "").toLowerCase();

  let hintText = "Consiglio N5: In giapponese il verbo o il predicato (〜です / 〜ます) si trova sempre alla fine della frase.";

  for (const topic of N5_TOPICS) {
    const match = topic.prompts.find(p => p.italian.toLowerCase() === promptLower || promptLower.includes(p.italian.toLowerCase().slice(0, 15)));
    if (match && match.hint) {
      hintText = match.hint;
      break;
    }
  }

  if (hintText === "Consiglio N5: In giapponese il verbo o il predicato (〜です / 〜ます) si trova sempre alla fine della frase.") {
    if (promptLower.includes("ora") || promptLower.includes("svegli")) {
      hintText = "Usa 'まいあさ' (ogni mattina), 'なんじ に' (a che ora + particella に) e il verbo 'おきますか' (svegliarsi in forma cortese interrogativa).";
    } else if (promptLower.includes("colazione") || promptLower.includes("mangi")) {
      hintText = "Usa 'いえ で' (a casa con particella で per luogo d'azione), 'あさごはん を' (colazione con particella を per oggetto) e 'たべます' (mangiare).";
    } else if (promptLower.includes("gatto") || promptLower.includes("dov'è")) {
      hintText = "Per gli animali ed esseri viventi si usa sempre il verbo di esistenza 'います' (imasu), mai 'あります'!";
    } else if (promptLower.includes("costa") || promptLower.includes("prezzo") || promptLower.includes("yen")) {
      hintText = "Chiedi il prezzo con 'いくらですか' (ikura desu ka?) e ricorda che 円 (en) segue la cifra numerica.";
    } else if (promptLower.includes("treno") || promptLower.includes("bus") || promptLower.includes("metropolitana")) {
      hintText = "Il mezzo di trasporto si indica con la particella で (es. でんしゃ で), mentre la destinazione vuole へ o に.";
    } else if (promptLower.includes("piedi")) {
      hintText = "Attenzione: 'a piedi' si esprime con 歩いて (あるいて, aruite) senza alcuna particella で!";
    } else if (promptLower.includes("non andiamo") || promptLower.includes("caffè")) {
      hintText = "Per proporre gentilmente un invito si usa la forma cortese negativa interrogativa 〜ませんか (es. 行きませんか).";
    }
  }

  res.json({ hint: hintText });
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Tutor N5 (AI Locale) attivo su http://0.0.0.0:${PORT}`);
  });
}

startServer();
