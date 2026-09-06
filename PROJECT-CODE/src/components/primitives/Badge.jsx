import React from 'react';

/**
 * Badge Primitive
 * Non-interactive status or category indicator
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  const variantStyles = {
    default: 'bg-neutral-100 text-text-secondary border border-neutral-200',
    primary: 'bg-primary/10 text-primary border border-primary/20',
    secondary: 'bg-secondary/15 text-secondary border border-secondary/25',
    accent: 'bg-accent/15 text-accent border border-accent/25',
    success: 'bg-success/15 text-success border border-success/25',
    warning: 'bg-warning/15 text-warning border border-warning/25',
    error: 'bg-error/15 text-error border border-error/25',
    info: 'bg-info/15 text-info border border-info/25',
    outline: 'bg-transparent text-text-primary border border-border',
  };

  const dotColors = {
    default: 'bg-neutral-500',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
    outline: 'bg-text-primary',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill leading-none select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}
