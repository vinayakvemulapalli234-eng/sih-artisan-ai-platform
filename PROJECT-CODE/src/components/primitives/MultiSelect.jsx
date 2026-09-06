import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

/**
 * MultiSelect Primitive
 * Custom accessible multi-badge selection component
 */
export function MultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder = 'Select options...',
  error = false,
  disabled = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (val) => {
    if (disabled) return;
    const newValues = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];
    onChange?.(newValues);
  };

  const handleRemove = (val, e) => {
    e.stopPropagation();
    if (disabled) return;
    onChange?.(value.filter((v) => v !== val));
  };

  const borderStyles = error
    ? 'border-error ring-1 ring-error'
    : isOpen
    ? 'border-primary ring-2 ring-primary ring-offset-1'
    : 'border-border hover:border-neutral-400';

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          } else if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
        className={`min-h-[40px] bg-surface border rounded-md p-1.5 flex items-center justify-between gap-2 cursor-pointer transition-colors ${borderStyles} ${
          disabled ? 'bg-neutral-100 cursor-not-allowed opacity-60' : ''
        }`}
      >
        <div className="flex flex-wrap gap-1.5 items-center flex-1">
          {value.length === 0 ? (
            <span className="text-sm text-neutral-400 px-1">{placeholder}</span>
          ) : (
            value.map((val) => {
              const opt = options.find((o) => o.value === val);
              const label = opt ? opt.label : val;
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 bg-neutral-100 text-text-primary text-xs font-medium px-2 py-0.5 rounded-sm border border-neutral-200"
                >
                  {label}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(val, e)}
                    className="hover:text-error focus:outline-none"
                    aria-label={`Remove ${label}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-text-secondary shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-50 mt-1 w-full bg-surface border border-border rounded-md shadow-md max-h-60 overflow-y-auto py-1 text-sm focus:outline-none"
        >
          {options.map((opt) => {
            const isSelected = value.includes(opt.value);
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleToggle(opt.value)}
                className={`px-3 py-2 flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-neutral-100 font-medium text-primary'
                    : 'text-text-primary hover:bg-neutral-50'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
