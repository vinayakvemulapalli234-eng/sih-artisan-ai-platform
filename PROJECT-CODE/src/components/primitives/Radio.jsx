import React from 'react';

/**
 * Radio Primitive
 */
export const Radio = React.forwardRef(function Radio(
  {
    name,
    value,
    checked,
    onChange,
    label,
    description,
    disabled = false,
    id,
    className = '',
    ...props
  },
  ref
) {
  const inputId = id || (label ? `radio-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

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
          type="radio"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div className="w-5 h-5 rounded-full border border-border bg-surface transition-colors flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-checked:border-primary">
          <div
            className={`w-2.5 h-2.5 rounded-full bg-primary transition-transform ${
              checked ? 'scale-100' : 'scale-0'
            }`}
          />
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
          {description && (
            <span className="text-xs text-text-secondary mt-0.5">{description}</span>
          )}
        </div>
      )}
    </label>
  );
});

export function RadioGroup({
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  className = '',
}) {
  return (
    <div role="radiogroup" className={`flex flex-col gap-2.5 ${className}`}>
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          description={opt.description}
          checked={value === opt.value}
          onChange={() => onChange?.(opt.value)}
          disabled={disabled || opt.disabled}
        />
      ))}
    </div>
  );
}
