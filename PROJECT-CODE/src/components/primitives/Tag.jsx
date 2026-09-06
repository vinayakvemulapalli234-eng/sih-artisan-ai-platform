import React from 'react';
import { X } from 'lucide-react';

/**
 * Tag / Chip Primitive
 * Interactive chip used throughout the Living Craft Graph and filtering UI
 */
export function Tag({
  children,
  label,
  active = false,
  removable = false,
  onRemove,
  onClick,
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false,
}) {
  const content = label || children;

  const sizeStyles = {
    sm: 'text-xs py-1 px-2.5 gap-1 rounded-pill',
    md: 'text-sm py-1.5 px-3 gap-1.5 rounded-pill',
  };

  // Specific semantic color accents for craft graph relationships
  const variantStyles = {
    default: active
      ? 'bg-neutral-800 text-surface border-neutral-800'
      : 'bg-surface text-text-primary border-border hover:border-neutral-400 hover:bg-neutral-50',
    craft: active
      ? 'bg-primary text-surface border-primary'
      : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
    technique: active
      ? 'bg-secondary text-surface border-secondary'
      : 'bg-secondary/15 text-secondary border-secondary/25 hover:bg-secondary/25',
    material: active
      ? 'bg-accent text-surface border-accent'
      : 'bg-accent/15 text-accent border-accent/25 hover:bg-accent/25',
    region: active
      ? 'bg-info text-surface border-info'
      : 'bg-info/15 text-info border-info/25 hover:bg-info/25',
  };

  const isClickable = Boolean(onClick) && !disabled;

  return (
    <span
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`inline-flex items-center font-medium border transition-colors select-none ${
        sizeStyles[size]
      } ${variantStyles[variant]} ${
        isClickable ? 'cursor-pointer focus-ring active:scale-95' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <span>{content}</span>
      {removable && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onRemove();
          }}
          aria-label={`Remove ${content}`}
          className="hover:opacity-75 focus-visible:outline-none p-0.5 rounded-full"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
}
