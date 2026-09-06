import React from 'react';
import { Check } from 'lucide-react';

/**
 * Checkbox Primitive
 * Custom-styled, keyboard-navigable checkbox with visible focus ring
 */
export const Checkbox = React.forwardRef(function Checkbox(
  {
    checked = false,
    onChange,
    label,
    description,
    disabled = false,
    error = false,
    id,
    className = '',
    ...props
  },
  ref
) {
  const inputId = id || (label ? `cb-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-start gap-2.5 cursor-pointer select-none ${
        disabled ? 'cursor-not-allowed opacity-60' : ''
      } ${className}`}
    >
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          className="peer sr-only"
          {...props}
        />
        <div
          className={`w-5 h-5 rounded-sm border transition-colors flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 ${
            checked
              ? 'bg-primary border-primary text-surface'
              : error
              ? 'border-error bg-surface'
              : 'border-border bg-surface hover:border-neutral-400'
          }`}
        >
          {checked && <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />}
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span
              className={`text-sm font-medium ${
                error ? 'text-error' : 'text-text-primary'
              }`}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-text-secondary mt-0.5">{description}</span>
          )}
        </div>
      )}
    </label>
  );
});
