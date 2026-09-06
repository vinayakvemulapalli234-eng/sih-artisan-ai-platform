import React from 'react';

/**
 * SectionHeader Layout Component
 * Consistent Fraunces serif header with subtitle and action slot
 */
export function SectionHeader({
  title,
  subtitle,
  action,
  tag,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-6 border-b border-border/70 ${className}`}
    >
      <div className="flex flex-col gap-1">
        {tag && <div className="mb-1">{tag}</div>}
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-text-secondary max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 flex items-center gap-2 mt-2 sm:mt-0">{action}</div>}
    </div>
  );
}
