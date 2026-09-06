import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/primitives/Button';
import { Badge } from '../../components/primitives/Badge';
import { Image } from '../../components/primitives/Image';
import { Breadcrumb } from '../../components/primitives/Breadcrumb';
import { PriceTag } from '../../components/domain/PriceTag';
import { CraftTagGroup } from '../../components/domain/CraftTagGroup';
import { FavoriteButton } from '../../components/domain/FavoriteButton';
import { StoryCard } from '../../components/domain/StoryCard';
import { ReviewCard } from '../../components/domain/ReviewCard';
import { RecommendationCarousel } from '../../components/domain/RecommendationCarousel';
import { mockProducts, mockStories, mockReviews } from '../../lib/mockData';
import { useToast } from '../../hooks/useToast';

/**
 * Customer: ProductDetailPage
 * Detailed product view connecting craft lineage, cultural story, and e-commerce actions
 */
export function ProductDetailPage({
  product = mockProducts[0],
  onBack,
  onNavigate,
  onAddToCart,
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToast } = useToast();

  const relatedStory = mockStories[0];
  const images = product.images || [
    'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=800',
  ];

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.title} (${quantity}) has been added to your shopping cart.`,
    });
  };

  return (
    <PageContainer>
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Breadcrumb
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Explore', onClick: () => onNavigate?.('explore') },
            { label: product.craft, onClick: () => onNavigate?.('explore') },
            { label: product.title },
          ]}
        />
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
        )}
      </div>

      {/* Main Product Section: Gallery + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-12 border-b border-border">
        {/* Left: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative rounded-lg overflow-hidden bg-surface border border-border">
            <Image
              src={images[selectedImageIndex] || images[0]}
              alt={product.title}
              aspectRatio="square"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-20">
              <FavoriteButton size="lg" />
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all focus-ring ${
                    selectedImageIndex === idx ? 'border-primary' : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Info & Craft Lineage */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary" size="sm">
                Authentic Handcrafted
              </Badge>
              {product.inStock > 0 ? (
                <Badge variant="success" size="sm" dot>
                  In Stock ({product.inStock} units)
                </Badge>
              ) : (
                <Badge variant="error" size="sm">
                  Made to Order
                </Badge>
              )}
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary leading-tight">
              {product.title}
            </h1>

            <p className="text-sm text-secondary font-medium mt-1">
              Crafted by{' '}
              <button
                type="button"
                onClick={() => onNavigate?.('artisan-profile')}
                className="underline hover:text-primary font-semibold"
              >
                {product.artisanName}
              </button>{' '}
              • {product.region}
            </p>
          </div>

          {/* Living Craft Graph Relationship Chips */}
          <div className="p-3 bg-neutral-50 rounded-md border border-border/80">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Craft Provenance & Graph Connections
            </p>
            <CraftTagGroup
              craft={product.craft}
              technique={product.technique}
              material={product.material}
              region={product.region}
              onTagClick={(type, val) => onNavigate?.('craft-graph')}
              size="md"
            />
          </div>

          {/* Pricing */}
          <div className="py-2 border-y border-border flex items-baseline justify-between">
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              size="lg"
            />
            <span className="text-xs text-text-secondary">Includes artisan fair premium & taxes</span>
          </div>

          {/* Description */}
          <div className="text-sm text-text-secondary leading-relaxed space-y-2">
            <p>{product.description}</p>
            {product.storyExcerpt && (
              <p className="italic text-text-primary bg-background p-3 rounded-md border-l-2 border-secondary text-xs">
                "{product.storyExcerpt}"
              </p>
            )}
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <div className="flex items-center border border-border rounded-md bg-surface h-10 px-2 w-full sm:w-auto justify-between sm:justify-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-text-secondary hover:text-text-primary font-bold px-1"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-sm font-bold text-text-primary min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="text-text-secondary hover:text-text-primary font-bold px-1"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleAddToCart}
              className="flex-1 w-full"
              leftIcon={<ShoppingBag className="w-4 h-4" />}
            >
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                handleAddToCart();
                onNavigate?.('cart');
              }}
              className="w-full sm:w-auto"
            >
              Buy Now
            </Button>
          </div>

          {/* Delivery & Craft Trust Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs text-text-secondary border-t border-border/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Certified Handcrafted</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-info" />
              <span>Direct Artisan Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-secondary" />
              <span>7-Day Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cultural Narrative Section */}
      {relatedStory && (
        <section className="py-10 border-b border-border">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
            The Cultural Story Behind This Creation
          </h2>
          <StoryCard story={relatedStory} />
        </section>
      )}

      {/* Verified Customer Reviews */}
      <section className="py-10 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-bold text-text-primary">
            Customer Appreciation ({mockReviews.length})
          </h2>
          <div className="flex items-center gap-1 text-sm font-semibold text-text-primary">
            <Star className="w-4 h-4 fill-warning stroke-warning" />
            <span>4.95 out of 5</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockReviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </section>

      {/* Recommendations Carousel */}
      <RecommendationCarousel
        title="More Handcrafted Masterpieces"
        products={mockProducts}
        onProductClick={(prod) => alert(`Viewing ${prod.title}`)}
      />
    </PageContainer>
  );
}
