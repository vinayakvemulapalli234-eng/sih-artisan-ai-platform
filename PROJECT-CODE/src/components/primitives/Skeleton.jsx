import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Skeleton Primitive
 * Visual loading placeholder with smooth pulse animation
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
}) {
  const variantStyles = {
    text: 'h-4 w-full rounded-sm',
    circular: 'rounded-full shrink-0',
    rectangular: 'rounded-md w-full',
  };

  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      aria-hidden="true"
      style={style}
      className={`bg-neutral-200/70 animate-pulse ${variantStyles[variant]} ${className}`}
    />
  );
}

/**
 * Loader Spinner
 */
export function Loader({ size = 'md', className = '' }) {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div role="status" className={`flex items-center justify-center ${className}`}>
      <Loader2
        className={`animate-spin text-primary ${sizeStyles[size]}`}
        aria-label="Loading content"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
