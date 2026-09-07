import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Section A.1 & A.2 ActionCard Component
 * Stacked full-width card with colored icon chip in top-left, title, and subtitle.
 */
export function ActionCard({
  icon: Icon,
  tint = 'green', // 'green' | 'pink' | 'yellow' | 'lavender' | 'lightblue'
  title,
  subtitle,
  onClick,
  className = '',
}) {
  const tintStyles = {
    green: {
      bg: 'bg-[#E8F7F1]',
      border: 'border-[#1FA97D]/25 hover:border-[#1FA97D]',
      chipBg: 'bg-[#1FA97D]',
      chipText: 'text-white',
    },
    pink: {
      bg: 'bg-[#FDEAF0]',
      border: 'border-[#E8577E]/25 hover:border-[#E8577E]',
      chipBg: 'bg-[#E8577E]',
      chipText: 'text-white',
    },
    yellow: {
      bg: 'bg-[#FFF6DD]',
      border: 'border-[#E8A93A]/25 hover:border-[#E8A93A]',
      chipBg: 'bg-[#E8A93A]',
      chipText: 'text-white',
    },
    lavender: {
      bg: 'bg-[#EDEBFB]',
      border: 'border-[#6C63C7]/25 hover:border-[#6C63C7]',
      chipBg: 'bg-[#6C63C7]',
      chipText: 'text-white',
    },
    lightblue: {
      bg: 'bg-[#E7F1FE]',
      border: 'border-[#3E8EDE]/25 hover:border-[#3E8EDE]',
      chipBg: 'bg-[#3E8EDE]',
      chipText: 'text-white',
    },
  };

  const style = tintStyles[tint] || tintStyles.green;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-4 sm:p-5 rounded-2xl border ${style.bg} ${style.border} text-left transition-all duration-150 flex items-center justify-between gap-4 shadow-xs active:scale-[0.99] cursor-pointer group ${className}`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${style.chipBg} ${style.chipText} group-hover:scale-105 transition-transform`}
        >
          {Icon && <Icon className="w-6 h-6 stroke-[2]" />}
        </div>
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-bold text-[#1B1B1B] leading-tight truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-[#6B6B6B] mt-1 leading-snug line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-500 shrink-0 group-hover:translate-x-1 group-hover:text-[#1FA97D] transition-all">
        <ChevronRight className="w-5 h-5 stroke-[2]" />
      </div>
    </button>
  );
}

export default ActionCard;
