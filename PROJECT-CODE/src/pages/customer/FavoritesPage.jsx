import React, { useState } from 'react';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Grid } from '../../components/layout/Grid';
import { ProductCard } from '../../components/domain/ProductCard';
import { EmptyState } from '../../components/primitives/EmptyState';
import { Button } from '../../components/primitives/Button';
import { mockProducts } from '../../lib/mockData';
import { useToast } from '../../hooks/useToast';

/**
 * Customer: FavoritesPage
 * Saved handcrafted treasures
 */
export function FavoritesPage({
  onProductClick,
  onNavigate,
}) {
  const [favorites, setFavorites] = useState(mockProducts.slice(0, 3));
  const { addToast } = useToast();

  const handleRemove = (product) => {
    setFavorites((prev) => prev.filter((p) => p.id !== product.id));
    addToast({
      type: 'info',
      title: 'Removed from Favorites',
      message: `${product.title} has been removed.`,
    });
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Saved Treasures"
        subtitle="Handcrafted works and craft traditions you are currently keeping in mind."
        action={
          favorites.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFavorites([])}
              leftIcon={<Trash2 className="w-3.5 h-3.5 text-error" />}
            >
              Clear all
            </Button>
          )
        }
      />

      {favorites.length === 0 ? (
        <EmptyState
          icon={<Heart className="w-6 h-6 stroke-[1.5] text-primary" />}
          title="No favorites saved yet"
          description="Browse authentic traditional crafts and tap the heart icon on any piece to save it for later."
          actionLabel="Explore Crafts"
          onAction={() => onNavigate?.('explore')}
        />
      ) : (
        <Grid cols={3} gap={6}>
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={true}
              onFavoriteToggle={() => handleRemove(product)}
              onProductClick={onProductClick}
              onTagClick={() => onNavigate?.('explore')}
            />
          ))}
        </Grid>
      )}
    </PageContainer>
  );
}
