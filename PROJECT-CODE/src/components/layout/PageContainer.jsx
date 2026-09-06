import React from 'react';

/**
 * PageContainer Layout Component
 * Standardized maximum width and responsive padding
 */
export function PageContainer({
  children,
  maxWidth = 'max-w-7xl',
  className = '',
}) {
  return (
    <div
      className={`w-full ${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ${className}`}
    >
      {children}
    </div>
  );
}
