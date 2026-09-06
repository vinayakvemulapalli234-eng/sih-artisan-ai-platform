import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Select Primitive
 * Semantic and accessible select element with styled wrapper and icon
 */
export const Select = React.forwardRef(function Select(
  {
    options = [],
    placeholder = 'Select an option',
    size = 'md',
    error = false,
    disabled = false,
    className = '',
    value,
    onChange,
    children,
    ...props
  },
  ref
) {
  const sizeStyles = {
    sm: 'h-8 pl-3 pr-8 text-xs',
    md: 'h-10 pl-3.5 pr-10 text-sm',
    lg: 'h-12 pl-4 pr-12 text-base',
  };

  const borderStyles = error
    ? 'border-error focus-visible:ring-error'
    : 'border-border focus-visible:ring-primary focus-visible:border-primary';

  return (
    <div className="relative w-full">
      <select
        ref={ref}
        disabled={disabled}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full appearance-none bg-surface border rounded-md text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:bg-neutral-100 disabled:cursor-not-allowed ${sizeStyles[size]} ${borderStyles} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.length > 0
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
        <ChevronDown className="w-4 h-4" aria-hidden="true" />
      </span>
    </div>
  );
});
