// Voice Service handling Speech Synthesis (TTS) & Speech Recognition (STT)

const LANG_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  bn: 'bn-IN',
  gu: 'gu-IN',
  mr: 'mr-IN',
  or: 'or-IN'
};

class VoiceService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isMuted = false;
    this.currentUtterance = null;
  }

  setMute(muted) {
    this.isMuted = muted;
    if (muted && this.synth) {
      this.synth.cancel();
    }
  }

  speak(text, langCode = 'en', onEndCallback = null) {
    if (this.isMuted || !this.synth || !text) return;

    this.synth.cancel(); // stop previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_MAP[langCode] || 'en-IN';
    utterance.rate = 0.9; // clear, comfortable pace for low literacy

    if (onEndCallback) {
      utterance.onend = onEndCallback;
    }

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  listen(langCode = 'en', onResult, onError, onEnd) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not supported in this browser. Using simulation fallback.");
      // Simulation fallback for environments without SpeechRecognition
      setTimeout(() => {
        onResult("This is a wooden Kondapalli elephant toy made from softwood and natural dyes");
        if (onEnd) onEnd();
      }, 3500);
      return { stop: () => {} };
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = LANG_MAP[langCode] || 'en-IN';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (onResult) onResult(transcript, event.results[0].isFinal);
      };

      recognition.onerror = (event) => {
        if (onError) onError(event.error);
      };

      recognition.onend = () => {
        if (onEnd) onEnd();
      };

      recognition.start();
      return recognition;
    } catch (err) {
      if (onError) onError(err);
      return { stop: () => {} };
    }
  }
}

export const voiceService = new VoiceService();
