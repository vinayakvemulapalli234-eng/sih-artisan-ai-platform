import React from 'react';
import { Mic, MicOff } from 'lucide-react';

/**
 * MicButton — Large circular green button (#1FA97D) with concentric
 * animated sound-wave rings and live transcript caption bubble.
 */
export function MicButton({
  isListening = false,
  onClick,
  transcript = '',
  statusText = '',
  size = 'lg',
  disabled = false,
  className = '',
}) {
  const sizeClasses = {
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-28 h-28',
  };

  const iconSizes = {
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <div className="relative flex items-center justify-center p-4">
        {/* Concentric animated sound wave rings when listening */}
        {isListening && (
          <>
            <span className="absolute w-full h-full rounded-full bg-[#1FA97D]/20 animate-ping duration-1000" />
            <span className="absolute w-36 h-36 rounded-full bg-[#1FA97D]/15 animate-pulse duration-700" />
            <span className="absolute w-44 h-44 rounded-full bg-[#E8F7F1]/80 animate-pulse duration-1000" />
          </>
        )}

        {/* Circular Button */}
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={`relative z-10 ${sizeClasses[size] || sizeClasses.lg} rounded-full bg-[#1FA97D] text-white flex items-center justify-center shadow-lg hover:bg-[#198d68] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#1FA97D]/40 ${
            isListening ? 'ring-4 ring-[#1FA97D]/30 shadow-[#1FA97D]/40' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? (
            <Mic className={`${iconSizes[size] || iconSizes.lg} animate-pulse stroke-[2.2]`} />
          ) : (
            <Mic className={`${iconSizes[size] || iconSizes.lg} stroke-[2.2]`} />
          )}
        </button>
      </div>

      {/* Status helper text */}
      {statusText && (
        <p className="mt-3 text-sm font-medium text-[#6B6B6B] text-center">
          {statusText}
        </p>
      )}

      {/* Transcript bubble */}
      {transcript && (
        <div className="mt-4 max-w-sm w-full bg-[#E8F7F1] border border-[#1FA97D]/20 rounded-2xl p-4 text-center shadow-sm animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#1FA97D] mb-1">
            We hear you:
          </p>
          <p className="text-sm font-medium text-[#1B1B1B] italic">
            "{transcript}"
          </p>
        </div>
      )}
    </div>
  );
}

export default MicButton;
