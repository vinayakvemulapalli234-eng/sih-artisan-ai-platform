import React from 'react';

/**
 * Grid / ResponsiveColumns Layout Component
 */
export function Grid({
  children,
  cols = 3,
  gap = 6,
  className = '',
}) {
  const colStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  };

  const gapStyles = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div
      className={`grid ${colStyles[cols] || colStyles[3]} ${
        gapStyles[gap] || gapStyles[6]
      } ${className}`}
    >
      {children}
    </div>
  );
}
