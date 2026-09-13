import React, { useState, useRef, useEffect } from 'react';
import { Send, HelpCircle, Keyboard, Loader2, Sparkles, Shuffle } from 'lucide-react';
import { romajiToHiragana } from '../utils/romajiKana';

interface InputAreaProps {
  currentPrompt: string;
  topicName: string;
  onSubmit: (answer: string) => Promise<void>;
  onGetHint: () => Promise<string>;
  onRequestNewPrompt?: () => void;
  isEvaluating: boolean;
}

const COMMON_PARTICLES = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'の', 'から', 'まで', 'です', 'ます'];

export const InputArea: React.FC<InputAreaProps> = ({
  currentPrompt,
  topicName,
  onSubmit,
  onGetHint,
  onRequestNewPrompt,
  isEvaluating,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [autoKana, setAutoKana] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Clear hint and input when prompt changes
  useEffect(() => {
    setHint(null);
  }, [currentPrompt]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const raw = e.target.value;
    if (autoKana) {
      const converted = romajiToHiragana(raw);
      setInputVal(converted);
    } else {
      setInputVal(raw);
    }
  };

  const handleInsertText = (textToInsert: string) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = inputVal.substring(0, start);
    const after = inputVal.substring(end);
    const newVal = before + textToInsert + after;
    setInputVal(newVal);

    // restore cursor focus
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + textToInsert.length;
      textarea.selectionEnd = start + textToInsert.length;
    }, 10);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isEvaluating) return;
    const toSend = inputVal.trim();
    setInputVal('');
    onSubmit(toSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey || !e.shiftKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const requestHint = async () => {
    if (hint || isLoadingHint) return;
    setIsLoadingHint(true);
    try {
      const h = await onGetHint();
      setHint(h);
    } catch (err) {
      setHint('Pensa alle particelle fondamentali N5 (は per il tema, を per l\'oggetto, で per il luogo).');
    } finally {
      setIsLoadingHint(false);
    }
  };

  return (
    <div className="bg-white border-t border-stone-200 shadow-lg sticky bottom-0 z-20">
      <div className="max-w-4xl mx-auto p-4 sm:p-5">
        {/* Active prompt banner */}
        <div className="mb-3.5 bg-stone-900 text-stone-100 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Frase da tradurre in giapponese
              </span>
              <span className="text-xs text-stone-400 hidden sm:inline">
                • {topicName}
              </span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white tracking-wide">
              "{currentPrompt}"
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            {/* New random prompt button */}
            {onRequestNewPrompt && (
              <button
                type="button"
                onClick={onRequestNewPrompt}
                disabled={isEvaluating}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium border border-stone-700 transition"
                title="Genera un'altra frase diversa da tradurre"
              >
                <Shuffle className="w-3.5 h-3.5 text-stone-400 group-hover:text-white" />
                <span>Altra Frase</span>
              </button>
            )}

            {/* Hint button */}
            <button
              type="button"
              onClick={requestHint}
              disabled={isLoadingHint || isEvaluating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 text-xs font-medium border border-stone-700 transition"
              title="Mostra un indizio grammaticale senza svelare la soluzione"
            >
              {isLoadingHint ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>Indizio</span>
            </button>
          </div>
        </div>

        {/* Hint display */}
        {hint && (
          <div className="mb-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2 animate-in fade-in duration-150">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold">Indizio per questa frase: </span>
              {hint}
            </div>
          </div>
        )}

        {/* Input box */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div className="relative rounded-xl border border-stone-300 focus-within:border-stone-800 focus-within:ring-2 focus-within:ring-stone-800/10 bg-white transition">
            <textarea
              ref={textareaRef}
              value={inputVal}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isEvaluating}
              rows={2}
              placeholder="Scrivi qui la traduzione in giapponese (hiragana, kanji o romaji)..."
              className="w-full px-3.5 py-2.5 text-base sm:text-lg font-mono text-stone-900 placeholder:text-stone-400 resize-none focus:outline-none bg-transparent"
            />

            <div className="flex items-center justify-between px-3.5 py-2 bg-stone-50/80 border-t border-stone-100 rounded-b-xl">
              {/* Quick Romaji to Hiragana helper toggle */}
              <button
                type="button"
                onClick={() => setAutoKana(!autoKana)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                  autoKana
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-stone-200/70 text-stone-600 hover:bg-stone-200 border border-transparent'
                }`}
                title="Converte automaticamente caratteri Romaji in Hiragana mentre digiti"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>Romaji → かな: {autoKana ? 'ON' : 'OFF'}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-400 hidden sm:inline">
                  Premi Invio per inviare
                </span>
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isEvaluating}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold shadow-sm transition"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Analisi...</span>
                    </>
                  ) : (
                    <>
                      <span>Invia risposta</span>
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Particle & Form Insertion Chips */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-stone-400 uppercase mr-1">
              Particelle e forme:
            </span>
            {COMMON_PARTICLES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleInsertText(item)}
                className="px-2 py-0.5 text-xs font-mono font-medium rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};
