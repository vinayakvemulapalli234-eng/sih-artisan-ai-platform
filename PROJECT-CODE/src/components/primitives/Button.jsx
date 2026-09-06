import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button Primitive
 * Variants: primary | secondary | outline | ghost | destructive | link
 * Sizes: sm | md | lg
 */
export const Button = React.forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    className = '',
    type = 'button',
    ...props
  },
  ref
) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-primary text-surface hover:bg-primary-dark active:bg-primary-dark shadow-sm',
    secondary:
      'bg-secondary text-surface hover:bg-secondary/90 active:bg-secondary/95 shadow-sm',
    outline:
      'border border-border bg-surface text-text-primary hover:bg-neutral-100 hover:border-neutral-400 active:bg-neutral-200',
    ghost:
      'bg-transparent text-text-primary hover:bg-neutral-100 active:bg-neutral-200',
    destructive:
      'bg-error text-surface hover:bg-error/90 active:bg-error/95 shadow-sm',
    link:
      'bg-transparent text-primary hover:underline underline-offset-4 p-0 h-auto rounded-none',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
});
