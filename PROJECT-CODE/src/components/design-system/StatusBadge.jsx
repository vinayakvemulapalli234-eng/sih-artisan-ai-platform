import React from 'react';

/**
 * StatusBadge — Design system pill badge
 * Variants:
 *  - 'green': Completed, Sample Approved, Active (bg #E8F7F1, text #1FA97D)
 *  - 'orange': In Production, In Progress, Pending (bg #FFF6DD, text #E8A93A / #F5A623)
 *  - 'red': New, Urgent, Alert (bg #FDEAF0, text #E8577E)
 *  - 'solid-red': Solid red badge (bg #E8577E, text white)
 *  - 'solid-green': Solid green badge (bg #1FA97D, text white)
 */
export function StatusBadge({
  children,
  variant = 'auto',
  size = 'md',
  dot = false,
  className = '',
}) {
  let resolvedVariant = variant;

  if (resolvedVariant === 'auto' && typeof children === 'string') {
    const text = children.toLowerCase();
    if (text.includes('sample') || text.includes('complete') || text.includes('approved') || text.includes('active') || text.includes('ready')) {
      resolvedVariant = 'green';
    } else if (text.includes('production') || text.includes('progress') || text.includes('pending')) {
      resolvedVariant = 'orange';
    } else if (text.includes('new') || text.includes('urgent') || text.includes('cancel')) {
      resolvedVariant = 'red';
    } else {
      resolvedVariant = 'neutral';
    }
  }

  const variantStyles = {
    green: 'bg-[#E8F7F1] text-[#1FA97D] border border-[#1FA97D]/25',
    'solid-green': 'bg-[#1FA97D] text-white font-medium',
    orange: 'bg-[#FFF6DD] text-[#E8A93A] border border-[#E8A93A]/25',
    'solid-orange': 'bg-[#F5A623] text-white font-medium',
    red: 'bg-[#FDEAF0] text-[#E8577E] border border-[#E8577E]/25',
    'solid-red': 'bg-[#E8577E] text-white font-medium',
    neutral: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1 font-semibold',
  };

  const dotColors = {
    green: 'bg-[#1FA97D]',
    'solid-green': 'bg-white',
    orange: 'bg-[#E8A93A]',
    'solid-orange': 'bg-white',
    red: 'bg-[#E8577E]',
    'solid-red': 'bg-white',
    neutral: 'bg-neutral-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full tracking-tight transition-colors ${
        variantStyles[resolvedVariant] || variantStyles.neutral
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColors[resolvedVariant] || 'bg-current'
          }`}
        />
      )}
      {children}
    </span>
  );
}

export default StatusBadge;
