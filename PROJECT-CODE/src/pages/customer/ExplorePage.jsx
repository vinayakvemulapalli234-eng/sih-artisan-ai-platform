import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Grid } from '../../components/layout/Grid';
import { SearchBar } from '../../components/domain/SearchBar';
import { FilterPanel } from '../../components/domain/FilterPanel';
import { ProductCard } from '../../components/domain/ProductCard';
import { Pagination } from '../../components/primitives/Pagination';
import { EmptyState } from '../../components/primitives/EmptyState';
import { Button } from '../../components/primitives/Button';
import { Drawer } from '../../components/primitives/Drawer';
import { mockProducts } from '../../lib/mockData';

/**
 * Customer: ExplorePage
 * Multidimensional discovery grid with responsive FilterPanel and search
 */
export function ExplorePage({
  onProductClick,
  onNavigate,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Crafts');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [priceRange, setPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products based on active criteria
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Search text match
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesCraft = product.craft.toLowerCase().includes(q);
        const matchesArtisan = product.artisanName.toLowerCase().includes(q);
        const matchesTechnique = product.technique.toLowerCase().includes(q);
        const matchesMaterial = product.material.toLowerCase().includes(q);
        const matchesRegion = product.region.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCraft && !matchesArtisan && !matchesTechnique && !matchesMaterial && !matchesRegion) {
          return false;
        }
      }

      // Category match
      if (selectedCategory !== 'All Crafts') {
        if (!product.craft.toLowerCase().includes(selectedCategory.split(' ')[0].toLowerCase())) {
          return false;
        }
      }

      // Region match
      if (selectedRegion !== 'All Regions') {
        if (!product.region.toLowerCase().includes(selectedRegion.toLowerCase())) {
          return false;
        }
      }

      // Price filter
      if (priceRange === 'under-2000' && product.price >= 2000) return false;
      if (priceRange === '2000-5000' && (product.price < 2000 || product.price > 5000)) return false;
      if (priceRange === 'above-5000' && product.price <= 5000) return false;

      // In-stock filter
      if (inStockOnly && (!product.inStock || product.inStock <= 0)) return false;

      return true;
    });
  }, [searchQuery, selectedCategory, selectedRegion, priceRange, inStockOnly]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All Crafts');
    setSelectedRegion('All Regions');
    setPriceRange('all');
    setInStockOnly(false);
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Explore Craft Traditions"
        subtitle="Discover authentic handcrafted pieces, search across techniques, and connect directly with their cultural lineage."
        action={
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileFilterOpen(true)}
            leftIcon={<Filter className="w-4 h-4" />}
          >
            Filters
          </Button>
        }
      />

      {/* Global Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={setSearchQuery}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Left Filter Panel */}
        <div className="hidden lg:block w-72 shrink-0 sticky top-20">
          <FilterPanel
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            onResetFilters={handleReset}
          />
        </div>

        {/* Mobile Filter Drawer */}
        <Drawer
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          title="Filter Crafts"
          position="right"
          size="md"
        >
          <FilterPanel
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setIsMobileFilterOpen(false);
            }}
            selectedRegion={selectedRegion}
            onSelectRegion={(reg) => {
              setSelectedRegion(reg);
              setIsMobileFilterOpen(false);
            }}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            onResetFilters={handleReset}
          />
        </Drawer>

        {/* Products Results Grid */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <div className="flex items-center justify-between text-xs sm:text-sm text-text-secondary">
            <span>
              Showing <strong className="text-text-primary">{filteredProducts.length}</strong> authentic handcrafted items
            </span>
            {(selectedCategory !== 'All Crafts' || selectedRegion !== 'All Regions' || priceRange !== 'all' || inStockOnly || searchQuery) && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Clear active filters
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyState
              title="No crafts match your criteria"
              description="Try selecting a different region, craft category, or resetting your search terms to discover more authentic works."
              actionLabel="Reset all filters"
              onAction={handleReset}
            />
          ) : (
            <>
              <Grid cols={3} gap={6}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={onProductClick}
                    onTagClick={(type, val) => setSearchQuery(val)}
                  />
                ))}
              </Grid>

              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={2}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
