import React, { useState } from 'react';
import { Heart } from 'lucide-react';

/**
 * FavoriteButton Composite Component
 * Accessible button for favoriting products/artisans
 */
export function FavoriteButton({
  initialFavorite = false,
  onToggle,
  size = 'md',
  className = '',
}) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleClick = (e) => {
    e.stopPropagation();
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    onToggle?.(nextState);
  };

  const sizeStyles = {
    sm: 'w-7 h-7 p-1.5',
    md: 'w-9 h-9 p-2',
    lg: 'w-10 h-10 p-2.5',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
      className={`rounded-full bg-surface/90 backdrop-blur-xs border border-border/80 shadow-xs flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 focus-ring ${
        sizeStyles[size]
      } ${
        isFavorite
          ? 'text-primary bg-primary/10 border-primary/30'
          : 'text-text-secondary hover:text-primary hover:bg-surface'
      } ${className}`}
    >
      <Heart
        className={`${iconSizes[size]} transition-all ${
          isFavorite ? 'fill-primary stroke-primary' : 'stroke-current'
        }`}
      />
    </button>
  );
}
