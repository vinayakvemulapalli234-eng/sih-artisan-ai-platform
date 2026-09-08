import React, { createContext, useContext, useState, useEffect } from 'react';
import { voiceService } from '../services/voiceService';
import { useLanguage } from './LanguageContext';

const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const { language } = useLanguage();
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('kalakriti_muted') === 'true';
  });
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState('');

  useEffect(() => {
    localStorage.setItem('kalakriti_muted', isMuted);
    voiceService.setMute(isMuted);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const speakPrompt = (text, onEnd) => {
    if (!isMuted) {
      voiceService.speak(text, language, onEnd);
    }
  };

  const stopVoice = () => {
    voiceService.stop();
  };

  const startListening = (onFinalResult) => {
    setIsListening(true);
    setSpeechText('');
    return voiceService.listen(
      language,
      (text, isFinal) => {
        setSpeechText(text);
        if (isFinal && onFinalResult) {
          onFinalResult(text);
        }
      },
      (err) => {
        console.error("Speech recognition error:", err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  return (
    <VoiceContext.Provider
      value={{
        isMuted,
        toggleMute,
        speakPrompt,
        stopVoice,
        isListening,
        setIsListening,
        speechText,
        startListening
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext);
