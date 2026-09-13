import React, { useState } from 'react';
import { X, Cpu, CheckCircle2, AlertCircle, RefreshCw, Server, Terminal, ShieldCheck } from 'lucide-react';
import { LocalAIConfig, LocalAIProvider } from '../types';

interface LocalAISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LocalAIConfig;
  onSaveConfig: (newConfig: LocalAIConfig) => void;
}

export const LocalAISettingsModal: React.FC<LocalAISettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [provider, setProvider] = useState<LocalAIProvider>(config.provider);
  const [endpoint, setEndpoint] = useState<string>(config.endpoint);
  const [model, setModel] = useState<string>(config.model);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    models?: string[];
  } | null>(null);

  if (!isOpen) return null;

  const handleProviderChange = (newProvider: LocalAIProvider) => {
    setProvider(newProvider);
    setTestResult(null);
    if (newProvider === 'ollama') {
      setEndpoint('http://localhost:11434');
      setModel('qwen2.5:7b');
    } else if (newProvider === 'lmstudio') {
      setEndpoint('http://localhost:1234/v1');
      setModel('local-model');
    } else if (newProvider === 'local_builtin') {
      setEndpoint('');
      setModel('n5-local-engine');
    }
  };

  const handleTestConnection = async () => {
    if (provider === 'local_builtin') {
      setTestResult({
        success: true,
        message: 'Motore N5 locale integrato attivo: non richiede server esterno, funziona 100% offline.',
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      // First try via server proxy
      const res = await fetch('/api/local-ai/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint, provider }),
      });
      const data = await res.json();

      if (data.connected) {
        setTestResult({
          success: true,
          message: data.message || 'Connesso con successo!',
          models: data.models,
        });
      } else {
        // Also test directly from browser (in case server is in cloud and Ollama is on user's machine)
        try {
          const browserRes = await fetch(
            provider === 'ollama' ? `${endpoint}/api/tags` : `${endpoint}/models`,
            { method: 'GET', mode: 'cors' }
          );
          if (browserRes.ok) {
            const bData = await browserRes.json();
            const bModels = provider === 'ollama' && bData.models ? bData.models.map((m: any) => m.name) : [];
            setTestResult({
              success: true,
              message: `Connesso con successo direttamente dal tuo browser a ${provider}!`,
              models: bModels,
            });
            return;
          }
        } catch {
          // Both failed
        }

        setTestResult({
          success: false,
          message: data.message || 'Impossibile contattare il server locale.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: 'Errore di rete durante la verifica del server locale.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    onSaveConfig({
      provider,
      endpoint,
      model,
      temperature: 0.3,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-stone-100">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-base sm:text-lg">Configurazione Modello AI Locale</h3>
              <p className="text-xs text-stone-400">Zero Gemini API • 100% Privacy e Modelli Locali</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-stone-800 text-sm">
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Seleziona Sorgente Modello AI
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleProviderChange('local_builtin')}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition ${
                  provider === 'local_builtin'
                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs sm:text-sm">Motore Integrato</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-[11px] text-stone-500 leading-snug">
                  100% locale, zero configurazione o server esterno.
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleProviderChange('ollama')}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition ${
                  provider === 'ollama'
                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs sm:text-sm">Ollama</span>
                  <Server className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-[11px] text-stone-500 leading-snug">
                  LLM locale (Qwen 2.5, Llama 3.2, Mistral, ecc.)
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleProviderChange('lmstudio')}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition ${
                  provider === 'lmstudio'
                    ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs sm:text-sm">LM Studio</span>
                  <Cpu className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-[11px] text-stone-500 leading-snug">
                  Server locale compatibile OpenAI API.
                </span>
              </button>
            </div>
          </div>

          {/* Configuration Inputs for Ollama/LM Studio */}
          {provider !== 'local_builtin' && (
            <div className="space-y-3.5 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  URL Endpoint Server Locale:
                </label>
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder={provider === 'ollama' ? 'http://localhost:11434' : 'http://localhost:1234/v1'}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-800/10 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nome Modello Locale:
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="es. qwen2.5:7b, llama3.2, mistral"
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-800/10 bg-white"
                />
              </div>

              {/* Test Button & Result */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? 'Verifica in corso...' : 'Testa connessione server locale'}</span>
                </button>
              </div>

              {testResult && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-start gap-2 border ${
                    testResult.success
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border-rose-200'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">{testResult.message}</p>
                    {testResult.models && testResult.models.length > 0 && (
                      <p className="mt-1 text-[11px] text-stone-600">
                        Modelli disponibili rilevati: {testResult.models.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Instructions box */}
              <div className="text-[11px] text-stone-500 bg-white p-3 rounded-lg border border-stone-200 space-y-1">
                <p className="font-semibold text-stone-700 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Avvio consigliato per Ollama:</span>
                </p>
                <p className="font-mono bg-stone-100 p-1 rounded text-stone-800">
                  OLLAMA_ORIGINS="*" ollama serve
                </p>
                <p>
                  Modelli consigliati per il giapponese N5: <strong>qwen2.5:7b</strong>, <strong>llama3.2</strong>, o <strong>gemma2</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            {provider === 'local_builtin' ? 'Motore locale pronto all\'uso' : `Target: ${model || 'default'}`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-100 transition"
            >
              Annulla
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
            >
              Salva impostazioni
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
