import React, { useState, useEffect, useRef } from 'react';
import { Header, ALL_THEMES_PSEUDO_TOPIC } from './components/Header';
import { CorrectionCard } from './components/CorrectionCard';
import { InputArea } from './components/InputArea';
import { GrammarModal } from './components/GrammarModal';
import { LocalAISettingsModal } from './components/LocalAISettingsModal';
import { N5_TOPICS, N5Topic, ALL_THEMES_ID, getDiversePromptForTopic } from './data/n5curriculum';
import { ExerciseTurn, SessionStats, EvaluationResult, LocalAIConfig } from './types';
import { playJapaneseAudio } from './utils/speech';
import { evaluateWithLocalEngine } from './utils/localN5Engine';
import { MessageSquare, Cpu, ShieldCheck, Layers, Shuffle } from 'lucide-react';

const DEFAULT_LOCAL_CONFIG: LocalAIConfig = {
  provider: 'local_builtin',
  endpoint: 'http://localhost:11434',
  model: 'qwen2.5:7b',
  temperature: 0.35,
};

export default function App() {
  const [currentTopic, setCurrentTopic] = useState<N5Topic>(ALL_THEMES_PSEUDO_TOPIC);
  const [turns, setTurns] = useState<ExerciseTurn[]>([]);
  const [activePrompt, setActivePrompt] = useState<string>('Piacere di conoscerti. Mi chiamo Mario e sono uno studente.');
  const [activePromptTopicName, setActivePromptTopicName] = useState<string>('1. Presentarsi e Conoscersi');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [isGrammarModalOpen, setIsGrammarModalOpen] = useState<boolean>(false);
  const [isLocalAISettingsOpen, setIsLocalAISettingsOpen] = useState<boolean>(false);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [seenPrompts, setSeenPrompts] = useState<string[]>([]);
  const [practicedTopicIds, setPracticedTopicIds] = useState<string[]>(['presentarsi']);

  const [localAIConfig, setLocalAIConfig] = useState<LocalAIConfig>(() => {
    try {
      const saved = localStorage.getItem('n5_tutor_local_ai');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_LOCAL_CONFIG;
  });

  const [stats, setStats] = useState<SessionStats>({
    totalExercises: 0,
    correctCount: 0,
    almostCorrectCount: 0,
    incorrectCount: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  const turnsEndRef = useRef<HTMLDivElement>(null);

  const handleSaveLocalConfig = (cfg: LocalAIConfig) => {
    setLocalAIConfig(cfg);
    try {
      localStorage.setItem('n5_tutor_local_ai', JSON.stringify(cfg));
    } catch {}
  };

  // Initialize first exercise on mount
  useEffect(() => {
    initExercise(ALL_THEMES_ID);
  }, []);

  const initExercise = async (topicId: string) => {
    try {
      const res = await fetch('/api/tutor/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId }),
      });
      if (res.ok) {
        const data = await res.json();
        setActivePrompt(data.firstExercise);
        setActivePromptTopicName(data.topic);
        setSeenPrompts((prev) => [...prev, data.firstExercise]);
      } else {
        const fallback = getDiversePromptForTopic(topicId);
        setActivePrompt(fallback.prompt);
        setActivePromptTopicName(fallback.topic.nameIt);
        setSeenPrompts((prev) => [...prev, fallback.prompt]);
      }
    } catch {
      const fallback = getDiversePromptForTopic(topicId);
      setActivePrompt(fallback.prompt);
      setActivePromptTopicName(fallback.topic.nameIt);
      setSeenPrompts((prev) => [...prev, fallback.prompt]);
    }
  };

  const handleSelectTopic = (topic: N5Topic) => {
    setCurrentTopic(topic);
    initExercise(topic.id);
  };

  const handleRequestNewRandomPrompt = async () => {
    if (isEvaluating) return;
    try {
      const res = await fetch('/api/tutor/random-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: currentTopic.id,
          seenPrompts: seenPrompts.slice(-10),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setActivePrompt(data.prompt);
        setActivePromptTopicName(data.topicName);
        setSeenPrompts((prev) => [...prev, data.prompt]);
      } else {
        const fallback = getDiversePromptForTopic(currentTopic.id, seenPrompts);
        setActivePrompt(fallback.prompt);
        setActivePromptTopicName(fallback.topic.nameIt);
        setSeenPrompts((prev) => [...prev, fallback.prompt]);
      }
    } catch {
      const fallback = getDiversePromptForTopic(currentTopic.id, seenPrompts);
      setActivePrompt(fallback.prompt);
      setActivePromptTopicName(fallback.topic.nameIt);
      setSeenPrompts((prev) => [...prev, fallback.prompt]);
    }
  };

  const handleResetSession = () => {
    setTurns([]);
    setSeenPrompts([]);
    setPracticedTopicIds([]);
    setStats({
      totalExercises: 0,
      correctCount: 0,
      almostCorrectCount: 0,
      incorrectCount: 0,
      currentStreak: 0,
      bestStreak: 0,
    });
    initExercise(currentTopic.id);
  };

  const handleAnswerSubmit = async (answer: string) => {
    if (!answer.trim() || isEvaluating) return;

    const currentTurnPrompt = activePrompt;
    const currentTopicName = activePromptTopicName || currentTopic.nameIt;
    const turnId = `turn-${Date.now()}`;

    // Add pending turn entry
    const newTurn: ExerciseTurn = {
      id: turnId,
      timestamp: Date.now(),
      italianPrompt: currentTurnPrompt,
      conversationTopic: currentTopicName,
      studentAnswer: answer,
      isEvaluating: true,
    };

    setTurns((prev) => [...prev, newTurn]);
    setIsEvaluating(true);

    try {
      let evaluationData: EvaluationResult | null = null;

      // 1. If using Built-in Local Engine, compute immediately locally
      if (localAIConfig.provider === 'local_builtin') {
        evaluationData = evaluateWithLocalEngine(
          answer,
          currentTurnPrompt,
          currentTopicName,
          seenPrompts
        );
      } else {
        // 2. Call server router with local config
        const res = await fetch('/api/tutor/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentAnswer: answer,
            italianPrompt: currentTurnPrompt,
            conversationTopic: currentTopicName,
            localConfig: localAIConfig,
            seenPrompts: seenPrompts.slice(-10),
            history: turns.slice(-3).map((t) => ({
              prompt: t.italianPrompt,
              answer: t.studentAnswer,
              rating: t.evaluation?.evaluation,
            })),
          }),
        });

        if (res.ok) {
          evaluationData = await res.json();
        } else {
          // Fallback to local offline engine
          evaluationData = evaluateWithLocalEngine(
            answer,
            currentTurnPrompt,
            currentTopicName,
            seenPrompts
          );
        }
      }

      if (!evaluationData) {
        evaluationData = evaluateWithLocalEngine(
          answer,
          currentTurnPrompt,
          currentTopicName,
          seenPrompts
        );
      }

      // Update turn with evaluation result
      setTurns((prev) =>
        prev.map((t) =>
          t.id === turnId
            ? {
                ...t,
                evaluation: evaluationData!,
                isEvaluating: false,
              }
            : t
        )
      );

      // Track practiced topics
      const matchingTopic = N5_TOPICS.find((t) =>
        t.nameIt.toLowerCase() === currentTopicName.toLowerCase() ||
        t.prompts.some((p) => p.italian === currentTurnPrompt)
      );
      if (matchingTopic && !practicedTopicIds.includes(matchingTopic.id)) {
        setPracticedTopicIds((prev) => [...prev, matchingTopic.id]);
      }

      // Play pronunciation audio if autoSpeak is on
      if (autoSpeak && evaluationData.correction) {
        playJapaneseAudio(evaluationData.correction.kanji || evaluationData.correction.kana);
      }

      // Update session statistics
      setStats((prev) => {
        const isCorrect = evaluationData!.evaluation === 'correct';
        const isAlmost = evaluationData!.evaluation === 'almost_correct';
        const newCurrentStreak = isCorrect ? prev.currentStreak + 1 : 0;

        return {
          totalExercises: prev.totalExercises + 1,
          correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
          almostCorrectCount: isAlmost ? prev.almostCorrectCount + 1 : prev.almostCorrectCount,
          incorrectCount: !isCorrect && !isAlmost ? prev.incorrectCount + 1 : prev.incorrectCount,
          currentStreak: newCurrentStreak,
          bestStreak: Math.max(prev.bestStreak, newCurrentStreak),
        };
      });

      // Advance to next exercise proposed by tutor
      if (evaluationData.nextExercise) {
        setActivePrompt(evaluationData.nextExercise);
        setSeenPrompts((prev) => [...prev, evaluationData!.nextExercise]);

        // If in ALL_THEMES mode, deduce or rotate the active topic
        if (currentTopic.id === ALL_THEMES_ID) {
          const nextTopicMatch = N5_TOPICS.find((t) =>
            t.prompts.some((p) => p.italian === evaluationData!.nextExercise) ||
            t.sampleFlow.includes(evaluationData!.nextExercise)
          );
          if (nextTopicMatch) {
            setActivePromptTopicName(nextTopicMatch.nameIt);
          } else {
            setActivePromptTopicName(evaluationData.conversationTopic || 'Programma JLPT N5');
          }
        }
      }
    } catch (err) {
      console.error('Evaluation error:', err);
      const fallbackResult = evaluateWithLocalEngine(
        answer,
        currentTurnPrompt,
        currentTopicName,
        seenPrompts
      );
      setTurns((prev) =>
        prev.map((t) =>
          t.id === turnId
            ? {
                ...t,
                isEvaluating: false,
                evaluation: fallbackResult,
              }
            : t
        )
      );
      setActivePrompt(fallbackResult.nextExercise);
      setSeenPrompts((prev) => [...prev, fallbackResult.nextExercise]);
    } finally {
      setIsEvaluating(false);
      setTimeout(() => {
        turnsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleGetHint = async (): Promise<string> => {
    try {
      const res = await fetch('/api/tutor/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          italianPrompt: activePrompt,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.hint;
      }
    } catch (e) {
      console.error(e);
    }
    return 'Ricorda: in giapponese il predicato (verbo o です) va sempre alla fine della frase.';
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-800">
      {/* Header */}
      <Header
        stats={stats}
        currentTopicId={currentTopic.id}
        onSelectTopic={handleSelectTopic}
        onResetSession={handleResetSession}
        onOpenGrammarGuide={() => setIsGrammarModalOpen(true)}
        autoSpeak={autoSpeak}
        onToggleAutoSpeak={() => setAutoSpeak(!autoSpeak)}
        localAIConfig={localAIConfig}
        onOpenLocalAISettings={() => setIsLocalAISettingsOpen(true)}
        practicedTopicCount={Math.max(1, practicedTopicIds.length)}
      />

      {/* Main Conversation / Exercise Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 pb-6 space-y-6">
        {/* Welcome intro card (when no turns yet) */}
        {turns.length === 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm text-center max-w-2xl mx-auto space-y-4 my-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
              <Cpu className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Modalità AI Locale • Zero Gemini API</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Konnichiwa! こんにちは！
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
                Tutor personale di giapponese per il <strong>JLPT N5</strong>, alimentato interamente da <strong>modello AI locale</strong>.
                Copre tutti i <strong>16 temi ufficiali</strong> con frasi sempre diverse, verifica particelle e correzioni in italiano.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  <span>16 Temi Ufficiali</span>
                </div>
                <span>Tutti gli argomenti N5: routine, cibo, prezzi, verbi di moto, esistenza e aggettivi.</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                  <Shuffle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Frasi sempre diverse</span>
                </div>
                <span>Algoritmo di rotazione anti-ripetizione per un allenamento sempre fresco.</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                  <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Locale & Privato</span>
                </div>
                <span>Usa Ollama, LM Studio o il motore N5 integrato offline senza inviare dati all'esterno.</span>
              </div>
            </div>

            <div className="pt-1 text-xs text-stone-400">
              Traduci la prima frase proposta nel box in basso per iniziare la sessione!
            </div>
          </div>
        )}

        {/* Turns History */}
        {turns.map((turn, index) => (
          <div key={turn.id} className="space-y-3">
            {/* Student's exercise header */}
            <div className="flex items-center justify-between text-xs text-stone-500 pl-1">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-medium text-stone-700">Esercizio #{index + 1}</span>
                <span>•</span>
                <span className="text-amber-800 font-medium bg-amber-100/70 px-2 py-0.5 rounded-md">
                  {turn.conversationTopic}
                </span>
              </div>
            </div>

            <div className="bg-stone-200/70 p-3.5 rounded-xl border border-stone-300 text-stone-700 text-sm">
              <span className="font-semibold text-stone-900">Frase da tradurre: </span>
              "{turn.italianPrompt}"
            </div>

            {/* Evaluation card or loading placeholder */}
            {turn.isEvaluating ? (
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex items-center justify-center gap-3 text-stone-600 text-sm">
                <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Il modello AI locale sta analizzando la tua risposta...</span>
              </div>
            ) : turn.evaluation ? (
              <CorrectionCard
                evaluation={turn.evaluation}
                isLatest={index === turns.length - 1}
              />
            ) : null}
          </div>
        ))}

        <div ref={turnsEndRef} />
      </main>

      {/* Active input bar at bottom */}
      <InputArea
        currentPrompt={activePrompt}
        topicName={activePromptTopicName}
        onSubmit={handleAnswerSubmit}
        onGetHint={handleGetHint}
        onRequestNewPrompt={handleRequestNewRandomPrompt}
        isEvaluating={isEvaluating}
      />

      {/* Grammar & Syllabus Modal */}
      <GrammarModal
        isOpen={isGrammarModalOpen}
        onClose={() => setIsGrammarModalOpen(false)}
        onSelectTopic={(topicId) => {
          const matched = N5_TOPICS.find((t) => t.id === topicId);
          if (matched) handleSelectTopic(matched);
        }}
      />

      {/* Local AI Settings Modal */}
      <LocalAISettingsModal
        isOpen={isLocalAISettingsOpen}
        onClose={() => setIsLocalAISettingsOpen(false)}
        config={localAIConfig}
        onSaveConfig={handleSaveLocalConfig}
      />
    </div>
  );
}
