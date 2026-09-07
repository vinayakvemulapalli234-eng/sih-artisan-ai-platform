import React from 'react';

/**
 * Section A.1 Card Component
 * - White background, radius ~16px
 * - Soft shadow, 16-20px internal padding
 * - Border #ECECEC
 */
export function Card({
  children,
  className = '',
  padding = 'normal',
  onClick,
  ...props
}) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    normal: 'p-4 sm:p-5',
    lg: 'p-5 sm:p-6',
  };

  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-[#ECECEC] shadow-sm ${paddingStyles[padding]} ${
        isClickable ? 'cursor-pointer hover:border-gray-300 transition-all active:scale-[0.99]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
