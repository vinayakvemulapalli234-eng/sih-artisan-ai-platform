import React from 'react';
import { Tag } from '../primitives/Tag';

/**
 * CraftTagGroup Composite Component
 * Primary way users navigate the Living Craft Graph:
 * Craft → Technique → Material → Region
 */
export function CraftTagGroup({
  craft,
  technique,
  material,
  region,
  onTagClick,
  size = 'sm',
  className = '',
}) {
  const items = [
    { type: 'craft', label: craft, variant: 'craft' },
    { type: 'technique', label: technique, variant: 'technique' },
    { type: 'material', label: material, variant: 'material' },
    { type: 'region', label: region, variant: 'region' },
  ].filter((item) => Boolean(item.label));

  if (items.length === 0) return null;

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 ${className}`}
      aria-label="Living Craft Graph relationships"
    >
      {items.map((item, idx) => (
        <Tag
          key={`${item.type}-${idx}`}
          variant={item.variant}
          size={size}
          onClick={onTagClick ? () => onTagClick(item.type, item.label) : undefined}
          className="truncate max-w-[180px]"
        >
          {item.label}
        </Tag>
      ))}
    </div>
  );
}
