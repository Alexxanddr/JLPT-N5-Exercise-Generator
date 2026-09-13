import React, { useState } from 'react';
import { X, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { N5_PARTICLES_HELP, N5_TOPICS } from '../data/n5curriculum';

interface GrammarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic?: (topicId: string) => void;
}

export const GrammarModal: React.FC<GrammarModalProps> = ({ isOpen, onClose, onSelectTopic }) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'grammar'>('topics');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-stone-100">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-base sm:text-lg">Sillabo e Guida Ufficiale JLPT N5</h3>
              <p className="text-xs text-stone-400">Copertura dei 16 temi e delle strutture fondamentali</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('topics')}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'topics'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>I 16 Temi del Programma ({N5_TOPICS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('grammar')}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'grammar'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Particelle, Verbi e Regole</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-stone-800 text-sm">
          {activeTab === 'topics' ? (
            <div className="space-y-3">
              <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl text-xs text-amber-900 leading-relaxed">
                Questo tutor copre l'intero sillabo <strong>JLPT N5</strong>. Ciascun tema propone frasi sempre diverse per allenare grammatica, particelle, kanji N5 e ordine delle parole.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {N5_TOPICS.map((topic, idx) => (
                  <div
                    key={topic.id}
                    className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-amber-400/80 hover:shadow-xs transition space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-sm">
                        {topic.nameIt}
                      </span>
                      <span className="text-[11px] font-serif text-stone-400">
                        {topic.nameJp}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-snug">
                      {topic.description}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <span className="text-stone-400">
                        Frasi disponibili: <strong className="text-stone-700">{topic.prompts.length + topic.sampleFlow.length}</strong>
                      </span>
                      {onSelectTopic && (
                        <button
                          type="button"
                          onClick={() => {
                            onSelectTopic(topic.id);
                            onClose();
                          }}
                          className="text-amber-700 hover:text-amber-900 font-semibold underline underline-offset-2"
                        >
                          Esercitati ora →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Particles table */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-3">
                  Le Particelle Fondamentali
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {N5_PARTICLES_HELP.map((p) => (
                    <div key={p.particle} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex flex-col gap-1">
                      <span className="font-mono font-bold text-stone-900 text-base">{p.particle}</span>
                      <span className="text-xs text-stone-600 leading-snug">{p.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Polite Verbs */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-3">
                  Coniugazione Verbi (Forma Cortese)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="block text-xs text-stone-500">Presente</span>
                    <span className="font-mono font-bold text-stone-900">〜ます</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="block text-xs text-stone-500">Negativo</span>
                    <span className="font-mono font-bold text-stone-900">〜ません</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="block text-xs text-stone-500">Passato</span>
                    <span className="font-mono font-bold text-stone-900">〜ました</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="block text-xs text-stone-500">Pass. Neg.</span>
                    <span className="font-mono font-bold text-stone-900">〜ませんでした</span>
                  </div>
                </div>
              </div>

              {/* Esistenza */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
                  Esistenza: あります vs います
                </h4>
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-stone-800 text-xs sm:text-sm space-y-1.5">
                  <p>
                    <strong className="font-mono text-stone-900">あります</strong>: per oggetti inanimati e piante (es. 机の上に本があります - C'è un libro sul tavolo).
                  </p>
                  <p>
                    <strong className="font-mono text-stone-900">います</strong>: per persone e animali viventi (es. 椅子の下に猫がいます - C'è un gatto sotto la sedia).
                  </p>
                </div>
              </div>

              {/* Ordine delle parole */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
                  Ordine delle Parole in Giapponese (SOV)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200">
                  In giapponese il verbo o il predicato si colloca <strong>sempre alla fine della frase</strong>. L'ordine tipico è:
                  <br />
                  <code className="font-mono text-stone-900 font-medium block mt-1">
                    [Tempo] + [Soggetto/Tema は] + [Luogo で/に] + [Oggetto を] + [Verbo]
                  </code>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white font-medium text-xs sm:text-sm hover:bg-stone-800 transition"
          >
            Chiudi guida
          </button>
        </div>
      </div>
    </div>
  );
};
