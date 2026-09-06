import React, { useState } from 'react';

/**
 * Avatar Primitive
 * Displays user/artisan image or initials fallback
 */
export function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  verified = false,
  className = '',
}) {
  const [hasError, setHasError] = useState(false);

  const sizeStyles = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-18 h-18 text-xl font-bold',
  };

  const badgeSizes = {
    sm: 'w-2.5 h-2.5 right-0 bottom-0',
    md: 'w-3.5 h-3.5 right-0 bottom-0',
    lg: 'w-4 h-4 right-0.5 bottom-0.5',
    xl: 'w-5 h-5 right-1 bottom-1',
  };

  const getInitials = (n) => {
    if (!n) return '?';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div
        className={`rounded-full overflow-hidden bg-neutral-200 border border-border flex items-center justify-center text-text-secondary select-none ${sizeStyles[size]}`}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name || alt)}</span>
        )}
      </div>

      {verified && (
        <span
          title="Verified Artisan"
          className={`absolute rounded-full bg-accent text-surface border-2 border-surface flex items-center justify-center ${badgeSizes[size]}`}
        >
          <svg
            className="w-full h-full p-0.5"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2 6 5 9 10 3" />
          </svg>
        </span>
      )}
    </div>
  );
}
