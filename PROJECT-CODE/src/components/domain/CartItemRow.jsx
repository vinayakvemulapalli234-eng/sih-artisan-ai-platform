import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Image } from '../primitives/Image';
import { formatCurrency } from '../../lib/formatters';

/**
 * CartItemRow Composite Component
 * Line item in the shopping cart with quantity adjustment controls
 */
export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
  className = '',
}) {
  if (!item) return null;

  const {
    id,
    title,
    artisanName,
    price,
    quantity = 1,
    image,
    craft,
  } = item;

  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 border-b border-border bg-surface rounded-md ${className}`}
    >
      {/* Product Image & Info */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-16 h-16 rounded-md overflow-hidden bg-neutral-100 shrink-0">
          <Image
            src={image || 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=200'}
            alt={title}
            aspectRatio="square"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h4 className="text-sm font-semibold text-text-primary truncate">
            {title}
          </h4>
          <p className="text-xs text-secondary truncate">
            By {artisanName || 'Traditional Master'} • {craft}
          </p>
          <span className="text-xs font-semibold text-text-primary mt-1">
            {formatCurrency(price)} each
          </span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center border border-border rounded-md bg-neutral-50 overflow-hidden">
          <button
            type="button"
            onClick={() => onQuantityChange?.(item, Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label={`Decrease quantity of ${title}`}
            className="p-1.5 hover:bg-neutral-200 disabled:opacity-30 focus-ring"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-text-primary">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange?.(item, quantity + 1)}
            aria-label={`Increase quantity of ${title}`}
            className="p-1.5 hover:bg-neutral-200 focus-ring"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onRemove?.(item)}
          aria-label={`Remove ${title} from cart`}
          className="p-1.5 text-text-secondary hover:text-error hover:bg-error/10 rounded-md transition-colors focus-ring"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right min-w-[72px] shrink-0">
        <span className="text-sm font-bold text-text-primary">
          {formatCurrency(price * quantity)}
        </span>
      </div>
    </div>
  );
}
