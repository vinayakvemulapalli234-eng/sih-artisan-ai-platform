import React from 'react';
import { formatCurrency } from '../../lib/formatters';
import { Badge } from '../primitives/Badge';

/**
 * PriceTag Composite Component
 * Renders formatted INR price, optional strike-through original price, and savings badge
 */
export function PriceTag({
  price = 0,
  originalPrice,
  size = 'md',
  className = '',
}) {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const sizeStyles = {
    sm: {
      price: 'text-sm font-semibold',
      original: 'text-xs',
      badge: 'sm',
    },
    md: {
      price: 'text-base font-bold',
      original: 'text-xs sm:text-sm',
      badge: 'sm',
    },
    lg: {
      price: 'text-xl sm:text-2xl font-bold',
      original: 'text-sm sm:text-base',
      badge: 'md',
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  return (
    <div className={`inline-flex items-baseline gap-2 flex-wrap ${className}`}>
      <span className={`text-text-primary ${currentSize.price}`}>
        {formatCurrency(price)}
      </span>

      {hasDiscount && (
        <span className={`text-neutral-400 line-through ${currentSize.original}`}>
          {formatCurrency(originalPrice)}
        </span>
      )}

      {hasDiscount && discountPercent > 0 && (
        <Badge variant="success" size={currentSize.badge}>
          {discountPercent}% OFF
        </Badge>
      )}
    </div>
  );
}
