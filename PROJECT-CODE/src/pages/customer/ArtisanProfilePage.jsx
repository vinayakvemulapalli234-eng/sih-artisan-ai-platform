import React from 'react';
import { MapPin, Award, Calendar, Star, ArrowLeft } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Grid } from '../../components/layout/Grid';
import { Avatar } from '../../components/primitives/Avatar';
import { Badge } from '../../components/primitives/Badge';
import { Tag } from '../../components/primitives/Tag';
import { Button } from '../../components/primitives/Button';
import { Card } from '../../components/primitives/Card';
import { ProductCard } from '../../components/domain/ProductCard';
import { mockArtisans, mockProducts } from '../../lib/mockData';

/**
 * Customer: ArtisanProfilePage
 * Highlights artisan background, generational lineage, studio location, and catalog
 */
export function ArtisanProfilePage({
  artisan = mockArtisans[0],
  onBack,
  onProductClick,
  onNavigate,
}) {
  const artisanProducts = mockProducts.filter(
    (p) => p.artisanId === artisan.id || p.artisanName === artisan.name
  );

  return (
    <PageContainer>
      {/* Back button */}
      {onBack && (
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
        </div>
      )}

      {/* Artisan Profile Hero Banner */}
      <div className="bg-surface border border-border rounded-lg p-6 sm:p-8 mb-10 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div className="flex items-start sm:items-center gap-5">
            <Avatar
              src={artisan.avatar}
              name={artisan.name}
              size="xl"
              verified={artisan.verified}
            />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
                  {artisan.name}
                </h1>
                {artisan.verified && (
                  <Badge variant="success" size="sm" dot>
                    GI Certified Master
                  </Badge>
                )}
              </div>

              <p className="text-base text-secondary font-medium">
                {artisan.specialty}
              </p>

              <div className="flex items-center gap-4 text-xs text-text-secondary flex-wrap mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  {artisan.region}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  {artisan.experienceYears || 30}+ years practicing craft
                </span>
                <span className="flex items-center gap-1 font-semibold text-text-primary">
                  <Star className="w-3.5 h-3.5 fill-warning stroke-warning" />
                  {artisan.rating} ({artisan.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <Button
              variant="outline"
              size="md"
              className="flex-1 md:flex-initial"
              onClick={() => alert(`Connecting with master artisan ${artisan.name}...`)}
            >
              Contact Studio
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1 md:flex-initial"
              onClick={() => onNavigate?.('explore')}
            >
              Explore Catalog
            </Button>
          </div>
        </div>

        {/* Bio & Ancestral Lineage */}
        <div className="mt-6 pt-6 border-t border-border/70 flex flex-col gap-3">
          <h3 className="font-heading text-base font-bold text-text-primary">
            Ancestral Lineage & Heritage
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed max-w-4xl">
            {artisan.bio}
          </p>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            <span className="text-xs font-semibold text-text-secondary uppercase">
              Techniques & Hallmarks:
            </span>
            {artisan.tags?.map((tag, idx) => (
              <Tag key={idx} variant="craft" size="sm">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <section>
        <SectionHeader
          title={`Masterpieces by ${artisan.name}`}
          subtitle="Direct from the master's studio. Verified authentic, unhurried, and sustainably created."
        />
        <Grid cols={3} gap={6}>
          {(artisanProducts.length > 0 ? artisanProducts : mockProducts.slice(0, 3)).map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onProductClick={onProductClick}
              onTagClick={() => onNavigate?.('explore')}
            />
          ))}
        </Grid>
      </section>
    </PageContainer>
  );
}
