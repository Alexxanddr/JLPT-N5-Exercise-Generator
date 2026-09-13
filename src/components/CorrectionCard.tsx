import React, { useState } from 'react';
import { Volume2, CheckCircle2, AlertTriangle, XCircle, Copy, Check } from 'lucide-react';
import { EvaluationResult } from '../types';
import { playJapaneseAudio } from '../utils/speech';

interface CorrectionCardProps {
  evaluation: EvaluationResult;
  isLatest: boolean;
}

export const CorrectionCard: React.FC<CorrectionCardProps> = ({ evaluation, isLatest }) => {
  const [copied, setCopied] = useState(false);

  const getStatusBadge = () => {
    switch (evaluation.evaluation) {
      case 'correct':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>✅ Corretta</span>
          </div>
        );
      case 'almost_correct':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>⚠️ Quasi corretta</span>
          </div>
        );
      case 'incorrect':
      default:
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 font-semibold text-sm">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>❌ Da correggere</span>
          </div>
        );
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardBorderColor =
    evaluation.evaluation === 'correct'
      ? 'border-emerald-200 bg-white'
      : evaluation.evaluation === 'almost_correct'
      ? 'border-amber-200 bg-white'
      : 'border-rose-200 bg-white';

  return (
    <div
      className={`rounded-2xl border ${cardBorderColor} shadow-sm p-5 sm:p-6 transition-all ${
        isLatest ? 'ring-2 ring-stone-900/10' : ''
      }`}
    >
      {/* 1. Valutazione Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Valutazione del Tutor
          </span>
          {getStatusBadge()}
        </div>
        {evaluation.grammarFocus && (
          <span className="hidden sm:inline-block text-xs font-medium px-2.5 py-1 rounded bg-stone-100 text-stone-600">
            {evaluation.grammarFocus}
          </span>
        )}
      </div>

      <div className="space-y-5">
        {/* 2. La tua frase */}
        <div>
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">
            La tua frase
          </h4>
          <div className="bg-stone-50 rounded-xl px-4 py-2.5 font-mono text-sm sm:text-base text-stone-800 border border-stone-200">
            {evaluation.studentSentence}
          </div>
        </div>

        {/* 3. Correzione Giapponese */}
        <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wide">
              Correzione
            </h4>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => playJapaneseAudio(evaluation.correction.kanji || evaluation.correction.kana)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-stone-200 hover:bg-stone-300 text-stone-700 transition"
                title="Ascolta pronuncia audio"
              >
                <Volume2 className="w-3.5 h-3.5 text-stone-800" />
                <span>Ascolta</span>
              </button>
              <button
                onClick={() => handleCopy(evaluation.correction.kanji)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
                title="Copia testo giapponese"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {/* 日本語 */}
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase block">
                日本語:
              </span>
              <p className="text-lg sm:text-2xl font-bold text-stone-900 tracking-wide font-sans">
                {evaluation.correction.kanji}
              </p>
            </div>

            {/* かな */}
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase block">
                かな:
              </span>
              <p className="text-base sm:text-lg font-medium text-stone-700">
                {evaluation.correction.kana}
              </p>
            </div>

            {/* Romaji */}
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase block">
                Romaji:
              </span>
              <p className="text-sm sm:text-base font-normal text-stone-600 italic">
                {evaluation.correction.romaji}
              </p>
            </div>

            {/* Kanji suggestion / tolerance notes */}
            {evaluation.kanjiNotes && (
              <div className="mt-3 pt-2.5 border-t border-stone-200 text-xs sm:text-sm text-stone-600 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/50">
                {evaluation.kanjiNotes}
              </div>
            )}
          </div>
        </div>

        {/* 4. Cosa correggere */}
        <div>
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">
            Cosa correggere
          </h4>
          <div
            className={`p-3.5 rounded-xl border text-sm leading-relaxed ${
              evaluation.evaluation === 'correct'
                ? 'bg-emerald-50/70 text-emerald-950 border-emerald-200'
                : evaluation.evaluation === 'almost_correct'
                ? 'bg-amber-50/70 text-amber-950 border-amber-200'
                : 'bg-rose-50/70 text-rose-950 border-rose-200'
            }`}
          >
            {evaluation.whatToCorrect}
          </div>
        </div>

        {/* 5. Traduzione */}
        <div>
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">
            Traduzione
          </h4>
          <p className="text-sm sm:text-base font-medium text-stone-800 bg-stone-50 px-3.5 py-2.5 rounded-xl border border-stone-200">
            {evaluation.italianTranslation}
          </p>
        </div>

        {/* 6. Nuovo esercizio announcement (if completed) */}
        {evaluation.nextExercise && (
          <div className="pt-2">
            <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <span>Nuovo esercizio successivo</span>
            </h4>
            <div className="bg-indigo-50/80 border border-indigo-200 p-3.5 rounded-xl text-stone-900 font-medium text-sm sm:text-base">
              "{evaluation.nextExercise}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
