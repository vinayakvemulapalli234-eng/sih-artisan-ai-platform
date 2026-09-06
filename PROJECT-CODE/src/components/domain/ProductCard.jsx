import React from 'react';
import { Card } from '../primitives/Card';
import { Image } from '../primitives/Image';
import { FavoriteButton } from './FavoriteButton';
import { PriceTag } from './PriceTag';
import { CraftTagGroup } from './CraftTagGroup';

/**
 * ProductCard Composite Component
 * Composed strictly from primitives: Card, Image, PriceTag, CraftTagGroup, FavoriteButton
 */
export function ProductCard({
  product,
  onProductClick,
  onTagClick,
  onFavoriteToggle,
  isFavorite = false,
  className = '',
}) {
  if (!product) return null;

  const {
    id,
    title,
    artisanName,
    price,
    originalPrice,
    images = [],
    craft,
    technique,
    material,
    region,
    inStock,
  } = product;

  const primaryImage = images[0] || 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=600';

  return (
    <Card
      variant="interactive"
      padding="none"
      onClick={() => onProductClick?.(product)}
      className={`group flex flex-col h-full overflow-hidden ${className}`}
    >
      {/* Product Image with Floating Favorite Button */}
      <div className="relative overflow-hidden bg-neutral-100">
        <Image
          src={primaryImage}
          alt={title}
          aspectRatio="square"
          className="group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-2.5 right-2.5 z-20">
          <FavoriteButton
            initialFavorite={isFavorite}
            onToggle={(fav) => onFavoriteToggle?.(product, fav)}
            size="sm"
          />
        </div>

        {inStock !== undefined && inStock <= 3 && inStock > 0 && (
          <span className="absolute bottom-2.5 left-2.5 z-20 bg-warning/90 text-surface text-[10px] font-bold px-2 py-0.5 rounded-sm">
            Only {inStock} left
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          {artisanName && (
            <p className="text-xs font-medium text-secondary hover:text-primary transition-colors">
              By {artisanName}
            </p>
          )}

          <h3 className="font-heading text-base font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
        </div>

        {/* Living Craft Graph Relationship Chips */}
        <CraftTagGroup
          craft={craft}
          technique={technique}
          material={material}
          region={region}
          onTagClick={onTagClick}
          size="sm"
        />

        {/* Price Tag */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between">
          <PriceTag price={price} originalPrice={originalPrice} size="md" />
        </div>
      </div>
    </Card>
  );
}
