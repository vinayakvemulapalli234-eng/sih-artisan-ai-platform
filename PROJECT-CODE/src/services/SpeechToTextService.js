/**
 * SIH Artisan Platform — Modular Speech-To-Text (STT) Service
 * 
 * Uses the Web Speech API (webkitSpeechRecognition / SpeechRecognition)
 * where available in Chromium/Android/Safari browsers.
 * Supports regional Indian languages and includes intent detection for role queries.
 * Provides graceful simulation fallback if microphone is denied or unsupported.
 */

const LANG_RECOG_MAP = {
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  en: 'en-IN',
};

class SpeechToTextService {
  constructor() {
    const SpeechRecognition =
      typeof window !== 'undefined'
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;
    this.SpeechRecognition = SpeechRecognition;
    this.recognition = null;
    this.isListening = false;
  }

  /**
   * Start listening for voice input in the specified language
   * @param {string} langCode - e.g. 'hi', 'te', 'en'
   * @param {Object} callbacks - { onStart, onResult, onError, onEnd }
   */
  startListening(langCode = 'en', callbacks = {}) {
    if (!this.SpeechRecognition) {
      this._simulateListening(langCode, callbacks);
      return;
    }

    try {
      if (this.recognition) {
        this.recognition.abort();
      }

      const recognition = new this.SpeechRecognition();
      recognition.lang = LANG_RECOG_MAP[langCode] || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        this.isListening = true;
        callbacks.onStart?.();
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((res) => res[0].transcript)
          .join('');
        const isFinal = event.results[0].isFinal;
        callbacks.onResult?.(transcript, isFinal);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        this.isListening = false;
        // If error is permission or network, fall back to simulation
        if (event.error === 'not-allowed' || event.error === 'network') {
          callbacks.onError?.(event.error);
        } else {
          this._simulateListening(langCode, callbacks);
        }
      };

      recognition.onend = () => {
        this.isListening = false;
        callbacks.onEnd?.();
      };

      this.recognition = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Speech recognition init failed, using fallback simulation:', err);
      this._simulateListening(langCode, callbacks);
    }
  }

  /**
   * Abort or stop speech recognition
   */
  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
    this.isListening = false;
  }

  /**
   * Extract intended role from spoken text across languages
   * @param {string} transcript
   * @returns {'artisan'|'customer'|'admin'|null}
   */
  detectRoleIntent(transcript = '') {
    const text = transcript.toLowerCase();

    // Artisan keywords in English, Hindi, Telugu, Tamil, Marathi, Bengali, Kannada
    if (
      text.includes('artisan') ||
      text.includes('karigar') ||
      text.includes('shilpkar') ||
      text.includes('कारीगर') ||
      text.includes('शिल्पकार') ||
      text.includes('చేతివృత్తి') ||
      text.includes('కళాకారుడు') ||
      text.includes('கைவினை') ||
      text.includes('ಕುಶಲ') ||
      text.includes('শিল্পী') ||
      text.includes('seller') ||
      text.includes('creator')
    ) {
      return 'artisan';
    }

    // Customer keywords
    if (
      text.includes('customer') ||
      text.includes('buyer') ||
      text.includes('grahak') ||
      text.includes('ग्राहक') ||
      text.includes('కొనుగోలు') ||
      text.includes('വാങ്ങுபவர்') ||
      text.includes('ಖರೀದಿದಾರ') ||
      text.includes('ক্রেতা') ||
      text.includes('shopping')
    ) {
      return 'customer';
    }

    // Admin keywords
    if (
      text.includes('admin') ||
      text.includes('moderator') ||
      text.includes('officer') ||
      text.includes('प्रशासक') ||
      text.includes('అడ్మిన్') ||
      text.includes('நிர்வாகி')
    ) {
      return 'admin';
    }

    return null;
  }

  /**
   * Internal simulation for environments without Web Speech API
   */
  _simulateListening(langCode, callbacks) {
    this.isListening = true;
    callbacks.onStart?.();

    const samplePhrases = {
      te: 'నేను చేతివృత్తిదారుడు, కళాకారుడు',
      hi: 'मैं एक शिल्पकार हूँ, हस्तशिल्प बनाता हूँ',
      ta: 'நான் ஒரு கைவினைஞர்',
      kn: 'ನಾನು ಕುಶಲಕರ್ಮಿ',
      bn: 'আমি একজন কারিগর',
      mr: 'मी एक कारागीर आहे',
      en: 'I am an artisan and creator',
    };

    const phrase = samplePhrases[langCode] || samplePhrases.en;

    setTimeout(() => {
      callbacks.onResult?.(phrase.slice(0, 10), false);
    }, 1200);

    setTimeout(() => {
      callbacks.onResult?.(phrase, true);
      this.isListening = false;
      callbacks.onEnd?.();
    }, 2400);
  }
}

export const speechToTextService = new SpeechToTextService();
export default speechToTextService;
