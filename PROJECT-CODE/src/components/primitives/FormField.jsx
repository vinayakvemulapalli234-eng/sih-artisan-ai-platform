import React from 'react';

/**
 * FormField Primitive
 * Wraps inputs, selects, and textareas with accessible label, error message, and helper text
 */
export function FormField({
  label,
  htmlFor,
  required = false,
  error,
  helperText,
  children,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-text-primary flex items-center gap-1 select-none"
        >
          <span>{label}</span>
          {required && (
            <span className="text-error text-xs" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {children}

      {error ? (
        <p className="text-xs text-error mt-0.5" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-text-secondary mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
}
