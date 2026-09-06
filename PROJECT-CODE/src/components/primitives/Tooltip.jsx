import React, { useState } from 'react';

/**
 * Tooltip Primitive
 * Accessible balloon tooltip triggered on hover or keyboard focus
 */
export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 150,
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  if (!content) return children;

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 px-2.5 py-1 text-xs font-medium text-surface bg-neutral-900 rounded-sm shadow-md whitespace-nowrap pointer-events-none animate-in fade-in duration-100 ${positionStyles[position]} ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
