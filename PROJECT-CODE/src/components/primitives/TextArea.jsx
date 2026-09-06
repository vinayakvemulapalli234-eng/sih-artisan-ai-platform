import React from 'react';

/**
 * TextArea Primitive
 */
export const TextArea = React.forwardRef(function TextArea(
  {
    rows = 4,
    error = false,
    disabled = false,
    maxLength,
    showCount = false,
    value,
    className = '',
    ...props
  },
  ref
) {
  const currentLength = typeof value === 'string' ? value.length : 0;
  const borderStyles = error
    ? 'border-error focus-visible:ring-error'
    : 'border-border focus-visible:ring-primary focus-visible:border-primary';

  return (
    <div className="w-full relative">
      <textarea
        ref={ref}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        value={value}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full bg-surface border rounded-md p-3 text-sm text-text-primary placeholder:text-neutral-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:bg-neutral-100 disabled:cursor-not-allowed ${borderStyles} ${className}`}
        {...props}
      />
      {showCount && maxLength && (
        <div className="flex justify-end text-xs text-text-secondary mt-1">
          {currentLength} / {maxLength}
        </div>
      )}
    </div>
  );
});
