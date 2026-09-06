import React from 'react';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';

/**
 * GraphNodeCard Composite Component
 * Visual card representing an entity node in the Living Craft Graph
 */
export function GraphNodeCard({
  node,
  isSelected = false,
  onClick,
  className = '',
}) {
  if (!node) return null;

  const { id, type, label, count, color } = node;

  return (
    <Card
      variant="interactive"
      padding="sm"
      onClick={() => onClick?.(node)}
      className={`transition-all duration-200 ${
        isSelected
          ? 'border-primary ring-2 ring-primary ring-offset-2'
          : 'border-border'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-pill"
          style={{
            backgroundColor: `${color || '#B5502E'}20`,
            color: color || '#B5502E',
          }}
        >
          {type}
        </span>
        {count !== undefined && (
          <span className="text-[11px] text-text-secondary font-medium">
            {count} connections
          </span>
        )}
      </div>

      <p className="font-heading text-sm font-bold text-text-primary mt-2 line-clamp-1">
        {label}
      </p>
    </Card>
  );
}
