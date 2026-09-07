import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const LANGUAGES = [
  { id: 'te', name: 'Telugu', native: 'తెలుగు' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা' },
  { id: 'mr', name: 'Marathi', native: 'मराठी' },
  { id: 'en', name: 'English', native: 'English', fullWidth: true },
];

export function ArtisanLanguageOnboardingPage({ onComplete }) {
  const [selected, setSelected] = useState('te');
  const { addToast } = useToast();

  const handleContinue = () => {
    localStorage.setItem('kalakriti_artisan_language', selected);
    const chosen = LANGUAGES.find((l) => l.id === selected);
    addToast({
      type: 'success',
      title: `${chosen?.native} Selected`,
      message: `Language set to ${chosen?.name}. Entering Artisan Studio.`,
    });
    if (onComplete) onComplete(selected);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1] flex flex-col justify-between p-6 max-w-md mx-auto w-full">
      {/* Top Content */}
      <div className="pt-6">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary mb-1">
          Choose your language
        </h1>
        <p className="text-sm text-text-secondary mb-8">
          Pick your preferred language to use the app
        </p>

        {/* 2-Column Language Grid */}
        <div className="grid grid-cols-2 gap-3.5 mb-10">
          {LANGUAGES.map((lang) => {
            const isSelected = selected === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => setSelected(lang.id)}
                className={`py-4 px-4 rounded-2xl border-2 transition-all flex items-center justify-between text-base font-bold shadow-2xs active:scale-98 ${
                  lang.fullWidth ? 'col-span-2 justify-center' : ''
                } ${
                  isSelected
                    ? 'border-emerald-600 bg-white text-emerald-800 shadow-sm ring-2 ring-emerald-600/20'
                    : 'border-border/80 bg-white text-text-primary hover:border-emerald-500/40'
                }`}
              >
                <span>{lang.native}</span>
                {isSelected && (
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs ml-2">
                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="pb-6">
        {/* Lotus Emblem */}
        <div className="flex justify-center mb-6 opacity-60">
          <svg
            className="w-10 h-10 text-emerald-700"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M32 46 C32 46 22 36 22 26 C22 20 27 16 32 16 C37 16 42 20 42 26 C42 36 32 46 32 46 Z"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <path
              d="M32 46 C26 40 14 34 14 26 C14 20 18 18 24 22 C28 25 32 46 32 46 Z"
              fill="currentColor"
              fillOpacity="0.15"
            />
            <path
              d="M32 46 C38 40 50 34 50 26 C50 20 46 18 40 22 C36 25 32 46 32 46 Z"
              fill="currentColor"
              fillOpacity="0.15"
            />
            <path
              d="M32 46 C20 44 8 40 8 32 C8 26 12 26 18 30 C24 34 32 46 32 46 Z"
              strokeLinecap="round"
            />
            <path
              d="M32 46 C44 44 56 40 56 32 C56 26 52 26 46 30 C40 34 32 46 32 46 Z"
              strokeLinecap="round"
            />
            <path d="M22 50 C28 52 36 52 42 50" strokeLinecap="round" />
          </svg>
        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-base shadow-md transition-all flex items-center justify-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ArtisanLanguageOnboardingPage;
