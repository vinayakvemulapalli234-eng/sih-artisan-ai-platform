import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Grid } from '../../components/layout/Grid';
import { Button } from '../../components/primitives/Button';
import { Tag } from '../../components/primitives/Tag';
import { Card } from '../../components/primitives/Card';
import { ProductCard } from '../../components/domain/ProductCard';
import { ArtisanCard } from '../../components/domain/ArtisanCard';
import { StoryCard } from '../../components/domain/StoryCard';
import { RecommendationCarousel } from '../../components/domain/RecommendationCarousel';
import { mockProducts, mockArtisans, mockStories } from '../../lib/mockData';

/**
 * Customer: HomePage
 * Combines craft discovery, cultural storytelling, and living craft graph preview
 */
export function HomePage({
  onNavigate,
  onProductClick,
  onArtisanClick,
  onStoryClick,
}) {
  const featuredProducts = mockProducts.slice(0, 3);
  const featuredArtisans = mockArtisans.slice(0, 3);
  const primaryStory = mockStories[0];

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface border-b border-border py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-pill w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct From Master Traditional Artisans Across India</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-[1.1]">
              Every craft has a soul. <br className="hidden sm:inline" />
              Every thread tells a history.
            </h1>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Explore authentic handcrafted treasures connected through our{' '}
              <strong className="text-text-primary font-semibold">Living Craft Graph</strong> — 
              tracing ancestral techniques, natural minerals, regional soils, and generational wisdom directly to verified artisans.
            </p>

            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate?.('explore')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Crafts
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate?.('craft-graph')}
              >
                View Living Craft Graph
              </Button>
            </div>

            {/* Platform Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-border/60 mt-4 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>100% GI-Tagged Authenticity</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-primary shrink-0" />
                <span>Direct Artisan Fair Compensation</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Eye className="w-4 h-4 text-secondary shrink-0" />
                <span>Living Craft Graph Provenance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Container Content */}
      <PageContainer className="flex flex-col gap-12">
        {/* Living Craft Graph Teaser Banner */}
        <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-surface to-background border-primary/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Core Differentiating Technology
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
                The Living Craft Graph
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                We connect <span className="text-primary font-medium">Artisans → Products → Crafts → Techniques → Materials → Regions → Cultural Stories</span> so you can explore craft heritage deeper than any ordinary store.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate?.('craft-graph')}
              className="shrink-0"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Interactive Graph Showcase
            </Button>
          </div>
        </Card>

        {/* Featured Handcrafted Masterpieces */}
        <section>
          <SectionHeader
            title="Featured Masterpieces"
            subtitle="Curated authentic works celebrated for their master craftsmanship and cultural significance."
            action={
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate?.('explore')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                View all items
              </Button>
            }
          />
          <Grid cols={3} gap={6}>
            {featuredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onProductClick={onProductClick}
                onTagClick={() => onNavigate?.('explore')}
              />
            ))}
          </Grid>
        </section>

        {/* Cultural Story Showcase */}
        {primaryStory && (
          <section>
            <SectionHeader
              title="Cultural Stories & Ancestral Lore"
              subtitle="The living narratives behind the hands that keep ancient traditions alive."
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onStoryClick?.(primaryStory)}
                >
                  More stories
                </Button>
              }
            />
            <StoryCard
              story={primaryStory}
              onStoryClick={onStoryClick}
            />
          </section>
        )}

        {/* Master Artisans */}
        <section>
          <SectionHeader
            title="Meet Traditional Masters"
            subtitle="Generations of heritage, patience, and mastery keeping rare art forms alive."
            action={
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate?.('artisans')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                All artisans
              </Button>
            }
          />
          <Grid cols={3} gap={6}>
            {featuredArtisans.map((artisan) => (
              <ArtisanCard
                key={artisan.id}
                artisan={artisan}
                onArtisanClick={onArtisanClick}
              />
            ))}
          </Grid>
        </section>

        {/* AI Recommendations Carousel */}
        <RecommendationCarousel
          products={mockProducts}
          onProductClick={onProductClick}
          onTagClick={() => onNavigate?.('explore')}
        />
      </PageContainer>
    </div>
  );
}
