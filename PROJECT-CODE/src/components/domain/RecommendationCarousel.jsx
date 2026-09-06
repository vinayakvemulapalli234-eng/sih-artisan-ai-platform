import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { IconButton } from '../primitives/IconButton';

/**
 * RecommendationCarousel Composite Component
 * Accessible horizontal carousel for personalized craft recommendations
 * 
 * STUB: AI feature
 * Person 5 (AI) will plug personalized recommendation scoring here.
 */
export function RecommendationCarousel({
  title = 'Handcrafted For You',
  subtitle = 'Curated based on your craft interests and Living Craft Graph affinities',
  products = [],
  onProductClick,
  onTagClick,
  onFavoriteToggle,
  className = '',
}) {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`flex flex-col gap-4 w-full my-6 ${className}`}>
      {/* Header with AI badge and Carousel Arrows */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
              {title}
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-accent/15 text-accent px-2 py-0.5 rounded-pill">
              <Sparkles className="w-3 h-3" />
              Living Graph AI
            </span>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-text-secondary mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <IconButton
            icon={<ChevronLeft className="w-4 h-4" />}
            aria-label="Scroll recommendations left"
            onClick={() => handleScroll('left')}
            variant="outline"
            size="sm"
          />
          <IconButton
            icon={<ChevronRight className="w-4 h-4" />}
            aria-label="Scroll recommendations right"
            onClick={() => handleScroll('right')}
            variant="outline"
            size="sm"
          />
        </div>
      </div>

      {/* Scrollable Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar"
        tabIndex={0}
        aria-label="Recommended crafts carousel"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-64 sm:w-72 shrink-0 snap-start"
          >
            <ProductCard
              product={product}
              onProductClick={onProductClick}
              onTagClick={onTagClick}
              onFavoriteToggle={onFavoriteToggle}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
