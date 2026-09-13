import React from 'react';
import { Flame, RotateCcw, BookOpen, Volume2, Cpu, CheckCircle2, Layers } from 'lucide-react';
import { N5_TOPICS, N5Topic, ALL_THEMES_ID } from '../data/n5curriculum';
import { SessionStats, LocalAIConfig } from '../types';

export const ALL_THEMES_PSEUDO_TOPIC: N5Topic = {
  id: ALL_THEMES_ID,
  nameIt: '🌟 Tutti i 16 Temi N5 (Mix Dinamico)',
  nameJp: '全テーマ総合演習',
  iconName: 'Sparkles',
  description: 'Esercizi sempre diversi che spaziano su tutti i 16 temi ufficiali del JLPT N5 a rotazione.',
  initialPrompt: 'Piacere di conoscerti. Mi chiamo Mario e sono uno studente.',
  sampleFlow: [],
  prompts: []
};

interface HeaderProps {
  stats: SessionStats;
  currentTopicId: string;
  onSelectTopic: (topic: N5Topic) => void;
  onResetSession: () => void;
  onOpenGrammarGuide: () => void;
  autoSpeak: boolean;
  onToggleAutoSpeak: () => void;
  localAIConfig: LocalAIConfig;
  onOpenLocalAISettings: () => void;
  practicedTopicCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  currentTopicId,
  onSelectTopic,
  onResetSession,
  onOpenGrammarGuide,
  autoSpeak,
  onToggleAutoSpeak,
  localAIConfig,
  onOpenLocalAISettings,
  practicedTopicCount = 1,
}) => {
  const currentTopic =
    currentTopicId === ALL_THEMES_ID
      ? ALL_THEMES_PSEUDO_TOPIC
      : N5_TOPICS.find((t) => t.id === currentTopicId) || N5_TOPICS[0];

  const getProviderBadge = () => {
    switch (localAIConfig.provider) {
      case 'ollama':
        return 'Ollama: ' + (localAIConfig.model || 'local');
      case 'lmstudio':
        return 'LM Studio';
      case 'local_builtin':
      default:
        return 'AI Locale Integrata';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-lg font-serif shrink-0">
            N5
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-semibold tracking-tight text-white">
                Tutor Giapponese N5
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                16 Temi Ufficiali
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Allenamento completo di costruzione frasi e traduzione
            </p>
          </div>
        </div>

        {/* Local AI Selector & Topic Menu */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Local AI button */}
          <button
            onClick={onOpenLocalAISettings}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 transition"
            title="Impostazioni Modello AI Locale (Ollama, LM Studio o Integrato)"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="max-w-[110px] truncate">{getProviderBadge()}</span>
          </button>

          {/* Topic Select Dropdown */}
          <div className="relative">
            <select
              value={currentTopic.id}
              onChange={(e) => {
                const selectedVal = e.target.value;
                if (selectedVal === ALL_THEMES_ID) {
                  onSelectTopic(ALL_THEMES_PSEUDO_TOPIC);
                } else {
                  const topic = N5_TOPICS.find((t) => t.id === selectedVal);
                  if (topic) onSelectTopic(topic);
                }
              }}
              className="bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs sm:text-sm font-medium rounded-lg px-2.5 py-1.5 border border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer transition max-w-[190px] sm:max-w-[240px] truncate"
              title="Seleziona il tema JLPT N5 o pratica tutti i temi a rotazione"
            >
              <option value={ALL_THEMES_ID}>
                🌟 Tutti i 16 Temi (Mix Completo)
              </option>
              <optgroup label="I 16 Temi del Programma N5">
                {N5_TOPICS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nameIt}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Grammar Guide Button */}
          <button
            onClick={onOpenGrammarGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition"
            title="Sillabo e guida grammaticale completa ai 16 temi JLPT N5"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">Sillabo N5</span>
          </button>

          {/* Auto Speak Toggle */}
          <button
            onClick={onToggleAutoSpeak}
            className={`p-2 rounded-lg border transition ${
              autoSpeak
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-stone-300'
            }`}
            title={autoSpeak ? 'Pronuncia audio attiva' : 'Pronuncia audio disattivata'}
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Reset Session */}
          <button
            onClick={onResetSession}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 border border-stone-700 transition"
            title="Ricomincia sessione di studio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Stats strip & Theme Coverage Progress */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4 pt-1 sm:pt-0 border-t sm:border-t-0 border-stone-800">
          {/* Topic coverage indicator */}
          <div
            className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-md bg-stone-800/80 border border-stone-700/80 text-stone-300"
            title={`${practicedTopicCount} su 16 temi ufficiali JLPT N5 praticati in questa sessione`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-300">{practicedTopicCount}/16</span>
            <span className="text-stone-400 text-[11px] hidden xs:inline">temi</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5 text-xs text-stone-300">
            <Flame className={`w-4 h-4 ${stats.currentStreak > 0 ? 'text-orange-500 fill-orange-500 animate-pulse' : 'text-stone-500'}`} />
            <span className="font-semibold">{stats.currentStreak}</span>
            <span className="text-stone-400 text-[11px]">streak</span>
          </div>

          {/* Correct / Incorrect count */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-stone-300 font-medium">{stats.correctCount}</span>
            </div>
            {stats.almostCorrectCount > 0 && (
              <div className="flex items-center gap-1 text-amber-400">
                <span>⚠️ {stats.almostCorrectCount}</span>
              </div>
            )}
            {stats.incorrectCount > 0 && (
              <div className="flex items-center gap-1 text-rose-400">
                <span>✕ {stats.incorrectCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
