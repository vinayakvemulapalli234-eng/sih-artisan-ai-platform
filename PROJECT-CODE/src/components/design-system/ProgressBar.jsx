import React from 'react';

/**
 * ProgressBar — Design system progress bar
 * Rounded green fill (#1FA97D) on light green track (#E8F7F1)
 */
export function ProgressBar({
  value = 0,
  max = 100,
  label,
  showPercentage = false,
  height = 'h-2.5',
  className = '',
  trackClassName = '',
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-semibold text-[#6B6B6B] mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span className="text-[#1FA97D] font-bold">{percentage}%</span>}
        </div>
      )}
      <div
        className={`w-full ${height} bg-[#E8F7F1] rounded-full overflow-hidden ${trackClassName}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="h-full bg-[#1FA97D] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
