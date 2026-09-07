/**
 * SIH Artisan Platform — Modular Text-To-Speech (TTS) Service
 * 
 * Uses the Web Speech API (SpeechSynthesis) where supported in browsers,
 * with regional voice mapping for Indian languages (te-IN, hi-IN, ta-IN, kn-IN, bn-IN, mr-IN, en-IN).
 * Provides graceful fallback simulation when speech synthesis is unavailable or muted.
 */

const LANG_VOICE_MAP = {
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  en: 'en-IN',
};

class TextToSpeechService {
  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    this.currentUtterance = null;
    this.isSpeaking = false;
  }

  /**
   * Speak a given text string in the specified language code
   * @param {string} text - Content to speak
   * @param {string} langCode - e.g. 'hi', 'te', 'en'
   * @param {Object} options - { onStart, onEnd, onError, rate, pitch }
   * @returns {Promise<boolean>}
   */
  speak(text, langCode = 'en', options = {}) {
    return new Promise((resolve) => {
      if (!this.isSupported || !text) {
        // Fallback simulation for unsupported browsers/environments
        this.isSpeaking = true;
        options.onStart?.();
        const duration = Math.min(Math.max(text.length * 60, 1500), 4000);
        setTimeout(() => {
          this.isSpeaking = false;
          options.onEnd?.();
          resolve(true);
        }, duration);
        return;
      }

      try {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = LANG_VOICE_MAP[langCode] || 'en-IN';
        utterance.rate = options.rate || 0.95; // Slightly slower for low-literacy clarity
        utterance.pitch = options.pitch || 1.0;

        utterance.onstart = () => {
          this.isSpeaking = true;
          options.onStart?.();
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          this.currentUtterance = null;
          options.onEnd?.();
          resolve(true);
        };

        utterance.onerror = (err) => {
          console.warn('TTS playback error (proceeding gracefully):', err);
          this.isSpeaking = false;
          this.currentUtterance = null;
          options.onError?.(err);
          resolve(false);
        };

        this.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('SpeechSynthesis exception, fallback:', err);
        this.isSpeaking = false;
        resolve(false);
      }
    });
  }

  /**
   * Stop any current speech playback immediately
   */
  stop() {
    if (this.isSupported) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn('Error canceling TTS', e);
      }
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }
}

export const textToSpeechService = new TextToSpeechService();
export default textToSpeechService;
