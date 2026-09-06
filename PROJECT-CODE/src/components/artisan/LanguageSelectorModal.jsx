import React, { useState } from 'react';
import { Volume2, Check, ArrowRight, Languages } from 'lucide-react';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';

export const ARTISAN_LANGUAGES = [
  { id: 'en', name: 'English', native: 'English', script: 'English', greeting: 'Welcome Master Artisan' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', script: 'नमस्ते कारीगर जी', greeting: 'नमस्ते कारीगर जी' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు', script: 'నమస్కారం కళాకారుడా', greeting: 'నమస్కారం కళాకారుడా' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা', script: 'নমস্কার কারিগর', greeting: 'নমস্কার কারিগর' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்', script: 'வணக்கம் கைவினைஞர்', greeting: 'வணக்கம் கைவினைஞர்' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', script: 'ನಮಸ್ಕಾರ ಕುಶಲಕರ್ಮಿ', greeting: 'ನಮಸ್ಕಾರ ಕುಶಲಕರ್ಮಿ' },
  { id: 'gu', name: 'Gujarati', native: 'ગુજરાતી', script: 'નમસ્તે કારીગર', greeting: 'નમસ્તે કારીગર' },
  { id: 'mr', name: 'Marathi', native: 'मराठी', script: 'नमस्कार कारागीर', greeting: 'नमस्कार कारागीर' },
];

/**
 * LanguageSelectorModal Component
 * Large, touch-friendly language selection cards in native scripts for rural artisans
 */
export function LanguageSelectorModal({
  isOpen,
  onClose,
  selectedLanguage = 'hi',
  onSelectLanguage,
}) {
  const [currentLang, setCurrentLang] = useState(selectedLanguage);
  const [playingAudioId, setPlayingAudioId] = useState(null);

  const handlePlayAudio = (lang, e) => {
    e.stopPropagation();
    setPlayingAudioId(lang.id);
    // Simulated native audio pronunciation
    setTimeout(() => {
      setPlayingAudioId(null);
    }, 1200);
  };

  const handleConfirm = () => {
    onSelectLanguage?.(currentLang);
    onClose?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="अपनी भाषा चुनें / Choose Your Language"
      description="Select the language you want to speak and read in the app"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleConfirm}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            आगे बढ़ें / Continue
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-3 py-2">
        {ARTISAN_LANGUAGES.map((lang) => {
          const isSelected = currentLang === lang.id;
          const isPlaying = playingAudioId === lang.id;

          return (
            <div
              key={lang.id}
              role="button"
              tabIndex={0}
              onClick={() => setCurrentLang(lang.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentLang(lang.id);
                }
              }}
              className={`p-3.5 rounded-lg border-2 flex flex-col justify-between gap-3 cursor-pointer transition-all duration-150 focus-ring ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-xs'
                  : 'border-border bg-surface hover:border-neutral-400'
              }`}
            >
              <div className="flex items-start justify-between gap-1">
                <div className="flex flex-col">
                  <span className="font-heading text-lg font-bold text-text-primary leading-snug">
                    {lang.native}
                  </span>
                  <span className="text-xs text-text-secondary font-medium">
                    {lang.name}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-primary text-surface flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>
              </div>

              {/* Audio Listen Button */}
              <button
                type="button"
                onClick={(e) => handlePlayAudio(lang, e)}
                aria-label={`Listen in ${lang.name}`}
                className={`flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-sm w-fit transition-colors ${
                  isPlaying
                    ? 'bg-secondary text-surface animate-pulse'
                    : 'bg-neutral-100 text-text-secondary hover:bg-neutral-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlaying ? 'सुनिए...' : 'सुनें 🔊'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
