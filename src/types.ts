export type EvaluationStatus = 'correct' | 'almost_correct' | 'incorrect';

export interface JapaneseCorrection {
  kanji: string;
  kana: string;
  romaji: string;
}

export interface EvaluationResult {
  evaluation: EvaluationStatus; // 'correct' -> ✅ Corretta, 'almost_correct' -> ⚠️ Quasi corretta, 'incorrect' -> ❌ Da correggere
  evaluationLabel: string;
  studentSentence: string;
  correction: JapaneseCorrection;
  whatToCorrect: string; // Brief explanation in Italian of only actual errors
  italianTranslation: string; // Translation of the natural correct Japanese sentence
  kanjiNotes?: string; // e.g. "✓ Corretto. In questo caso puoi anche scrivere X con il kanji Y."
  nextExercise: string; // New Italian sentence for the next exercise
  conversationTopic?: string;
  grammarFocus?: string;
  difficultyLevel?: 'facile' | 'medio' | 'avanzato';
  tutorReplyInConversation?: string; // Conversational remark before/along with exercise
}

export interface ExerciseTurn {
  id: string;
  timestamp: number;
  italianPrompt: string;
  conversationTopic: string;
  studentAnswer?: string;
  evaluation?: EvaluationResult;
  isEvaluating?: boolean;
}

export interface SessionStats {
  totalExercises: number;
  correctCount: number;
  almostCorrectCount: number;
  incorrectCount: number;
  currentStreak: number;
  bestStreak: number;
}

export type LocalAIProvider = 'ollama' | 'lmstudio' | 'local_builtin' | 'custom';

export interface LocalAIConfig {
  provider: LocalAIProvider;
  endpoint: string; // e.g. "http://localhost:11434" or "http://localhost:1234/v1"
  model: string; // e.g. "qwen2.5:7b", "llama3.2", "mistral"
  temperature: number;
}

