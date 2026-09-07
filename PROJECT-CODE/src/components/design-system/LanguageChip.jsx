import React from 'react';
import { Check } from 'lucide-react';

/**
 * LanguageChip — Design system chip for language selection
 * 2-column chip displaying language name in authentic native script with equal weight.
 * Selection state: green border #1FA97D, checkmark icon, #E8F7F1 tint.
 */
export function LanguageChip({
  language,
  isSelected = false,
  onSelect,
  className = '',
}) {
  const { code, name, nativeName, flag } = language;

  return (
    <button
      type="button"
      onClick={() => onSelect && onSelect(code)}
      aria-pressed={isSelected}
      className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-200 min-h-[64px] active:scale-[0.98] ${
        isSelected
          ? 'bg-[#E8F7F1] border-[#1FA97D] shadow-sm'
          : 'bg-white border-[#ECECEC] hover:border-[#1FA97D]/50 hover:bg-neutral-50/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
      } ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {flag && <span className="text-xl select-none">{flag}</span>}
        <div className="min-w-0">
          <div className="text-lg font-bold text-[#1B1B1B] leading-tight truncate">
            {nativeName}
          </div>
          <div className="text-xs text-[#6B6B6B] font-medium truncate mt-0.5">
            {name}
          </div>
        </div>
      </div>

      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all flex-shrink-0 ml-2 ${
          isSelected
            ? 'bg-[#1FA97D] text-white scale-100'
            : 'border-2 border-[#ECECEC] bg-white group-hover:border-[#1FA97D]/40'
        }`}
      >
        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
    </button>
  );
}

export default LanguageChip;
