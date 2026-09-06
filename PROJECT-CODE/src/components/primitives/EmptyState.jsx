import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

/**
 * EmptyState Primitive
 * Displayed when lists, search results, or tables have no items
 */
export function EmptyState({
  icon,
  title = 'No items found',
  description = 'Try adjusting your filters or search terms to find what you are looking for.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-border rounded-lg bg-surface/50 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-text-secondary mb-3">
        {icon || <PackageOpen className="w-6 h-6 stroke-[1.5]" />}
      </div>
      <h3 className="font-heading text-lg font-semibold text-text-primary mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-text-secondary max-w-sm mb-5 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
