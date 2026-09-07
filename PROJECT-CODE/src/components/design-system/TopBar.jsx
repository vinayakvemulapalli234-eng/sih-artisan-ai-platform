import React from 'react';
import { ChevronLeft } from 'lucide-react';

/**
 * TopBar — Design system top navigation bar
 * Back chevron arrow + title + optional right actions (bell, settings gear, etc.)
 */
export function TopBar({
  title,
  subtitle,
  onBack,
  rightAction,
  badge,
  className = '',
}) {
  return (
    <header
      className={`sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#ECECEC] px-4 py-3.5 transition-shadow ${className}`}
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl text-[#1B1B1B] hover:bg-neutral-100 active:scale-95 transition-all min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Go back"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#1B1B1B] truncate tracking-tight">
                {title}
              </h1>
              {badge && <div>{badge}</div>}
            </div>
            {subtitle && (
              <p className="text-xs text-[#6B6B6B] truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {rightAction && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {rightAction}
          </div>
        )}
      </div>
    </header>
  );
}

export default TopBar;
