import React from 'react';

/**
 * IconButton Primitive
 * Accessible icon-only button requiring aria-label
 */
export const IconButton = React.forwardRef(function IconButton(
  {
    icon,
    children,
    'aria-label': ariaLabel,
    variant = 'ghost',
    size = 'md',
    disabled = false,
    className = '',
    type = 'button',
    ...props
  },
  ref
) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const variantStyles = {
    primary:
      'bg-primary text-surface hover:bg-primary-dark active:bg-primary-dark shadow-sm',
    secondary:
      'bg-secondary text-surface hover:bg-secondary/90 active:bg-secondary/95 shadow-sm',
    outline:
      'border border-border bg-surface text-text-primary hover:bg-neutral-100 active:bg-neutral-200',
    ghost:
      'bg-transparent text-text-primary hover:bg-neutral-100 active:bg-neutral-200',
    destructive:
      'bg-error text-surface hover:bg-error/90 active:bg-error/95 shadow-sm',
  };

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon || children}
    </button>
  );
});
