import React from 'react';

/**
 * Toggle (Switch) Primitive
 * Accessible switch toggle with ARIA attributes
 */
export function Toggle({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  id,
  className = '',
}) {
  const switchId = id || (label ? `toggle-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  return (
    <div
      className={`inline-flex items-start gap-3 select-none ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      } ${className}`}
      onClick={handleClick}
    >
      <button
        type="button"
        role="switch"
        id={switchId}
        aria-checked={checked}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          checked ? 'bg-primary' : 'bg-neutral-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>

      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
          {description && (
            <span className="text-xs text-text-secondary mt-0.5">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
