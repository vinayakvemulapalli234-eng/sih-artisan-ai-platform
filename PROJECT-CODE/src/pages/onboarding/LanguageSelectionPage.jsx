import React, { useState } from 'react';
import { Globe, Flower2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES, setAppLanguage, getAppLanguage } from '../../i18n/translations';
import { Button, LanguageChip } from '../../components/design-system';

/**
 * Screen 1: Language Selection Page (Locked Spec)
 *
 * Title: "Choose your language"
 * Subtitle: "Pick your preferred language to use the app"
 * 2-column grid of 10 Indian languages in authentic native scripts:
 * Telugu, Hindi, Tamil, Kannada, Bengali, Marathi, English, Malayalam, Gujarati, Odia.
 * Green border #1FA97D + checkmark, #E8F7F1 fill.
 * Lotus/floral cultural motif near bottom.
 * Pinned "Continue" button (#1FA97D), disabled until language picked.
 */
export function LanguageSelectionPage({ onContinue }) {
  const [selectedCode, setSelectedCode] = useState(() => getAppLanguage() || 'te');

  const handleSelect = (code) => {
    setSelectedCode(code);
    setAppLanguage(code);
  };

  const handleProceed = () => {
    if (!selectedCode) return;
    setAppLanguage(selectedCode);
    if (onContinue) onContinue(selectedCode);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col justify-between p-4 sm:p-6 max-w-md mx-auto w-full">
      <div className="w-full">
        {/* Top KalaKriti Icon Badge & Headings */}
        <div className="text-center pt-4 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E8F7F1] text-[#1FA97D] border border-[#1FA97D]/20 shadow-sm mb-3">
            <Globe className="w-7 h-7 text-[#1FA97D]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight">
            Choose your language
          </h1>
          <p className="text-sm text-[#6B6B6B] mt-1.5 font-normal">
            Pick your preferred language to use the app
          </p>
        </div>

        {/* 2-Column Grid of 10 Native Script Chips */}
        <div
          className="grid grid-cols-2 gap-3 my-2"
          role="radiogroup"
          aria-label="Language selection"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <LanguageChip
              key={lang.code}
              language={lang}
              isSelected={selectedCode === lang.code}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Cultural Floral/Lotus Motif & Pinned Bottom Continue Button */}
      <div className="w-full pt-6 pb-4">
        {/* Lotus / Floral Cultural Accent Motif */}
        <div className="flex items-center justify-center gap-2 mb-4 text-[#1FA97D]/40">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1FA97D]/30" />
          <Flower2 className="w-5 h-5 text-[#1FA97D]/60" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1FA97D]/30" />
        </div>

        <Button
          variant="primary"
          fullWidth
          disabled={!selectedCode}
          onClick={handleProceed}
          size="lg"
        >
          Continue
        </Button>

        <p className="text-center text-xs text-[#A6A6A6] mt-3">
          You can change your language anytime in settings.
        </p>
      </div>
    </div>
  );
}

export default LanguageSelectionPage;
