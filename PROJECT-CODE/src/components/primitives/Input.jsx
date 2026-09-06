import React from 'react';

/**
 * Input Primitive
 * Standard text/email/search/number input with icon slots and error states
 */
export const Input = React.forwardRef(function Input(
  {
    type = 'text',
    size = 'md',
    error = false,
    leftIcon,
    rightIcon,
    disabled = false,
    className = '',
    ...props
  },
  ref
) {
  const sizeStyles = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-3.5 text-sm',
    lg: 'h-12 px-4 text-base',
  };

  const leftPadding = leftIcon ? (size === 'sm' ? 'pl-8' : size === 'lg' ? 'pl-11' : 'pl-10') : '';
  const rightPadding = rightIcon ? (size === 'sm' ? 'pr-8' : size === 'lg' ? 'pr-11' : 'pr-10') : '';

  const borderStyles = error
    ? 'border-error focus-visible:ring-error'
    : 'border-border focus-visible:ring-primary focus-visible:border-primary';

  return (
    <div className="relative flex items-center w-full">
      {leftIcon && (
        <span className="absolute left-3 flex items-center justify-center text-text-secondary pointer-events-none">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full bg-surface border rounded-md text-text-primary placeholder:text-neutral-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-400 ${sizeStyles[size]} ${leftPadding} ${rightPadding} ${borderStyles} ${className}`}
        {...props}
      />
      {rightIcon && (
        <span className="absolute right-3 flex items-center justify-center text-text-secondary">
          {rightIcon}
        </span>
      )}
    </div>
  );
});
