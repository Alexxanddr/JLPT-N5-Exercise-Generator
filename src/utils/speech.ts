/**
 * Web Speech API synthesizer for Japanese audio pronunciation
 */
export function playJapaneseAudio(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel(); // Stop any pending speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.85; // Slightly slower, optimal for N5 language learners
  utterance.pitch = 1.0;

  // Prefer a native Japanese voice if available in the browser
  const voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang.startsWith('ja'));
  if (jaVoice) {
    utterance.voice = jaVoice;
  }

  window.speechSynthesis.speak(utterance);
}
