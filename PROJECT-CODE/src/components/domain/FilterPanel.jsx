import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Checkbox } from '../primitives/Checkbox';
import { RadioGroup } from '../primitives/Radio';
import { Button } from '../primitives/Button';
import { Tag } from '../primitives/Tag';
import { CRAFT_CATEGORIES, REGIONS } from '../../lib/constants';

/**
 * FilterPanel Composite Component
 * Enables multidimensional filtering across the Living Craft Graph entities
 */
export function FilterPanel({
  selectedCategory = 'All Crafts',
  onSelectCategory,
  selectedRegion = 'All Regions',
  onSelectRegion,
  priceRange = 'all',
  onPriceRangeChange,
  inStockOnly = false,
  onInStockChange,
  onResetFilters,
  className = '',
}) {
  const priceOptions = [
    { value: 'all', label: 'All Prices' },
    { value: 'under-2000', label: 'Under ₹2,000' },
    { value: '2000-5000', label: '₹2,000 – ₹5,000' },
    { value: 'above-5000', label: 'Above ₹5,000' },
  ];

  return (
    <aside
      aria-label="Product Filters"
      className={`bg-surface border border-border rounded-lg p-5 flex flex-col gap-6 ${className}`}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h2 className="font-heading text-base font-bold text-text-primary">
            Filter Crafts
          </h2>
        </div>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-text-secondary hover:text-primary transition-colors flex items-center gap-1 focus-ring rounded-xs"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Craft Category Filter */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Craft Tradition
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {CRAFT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Tag
                key={cat}
                size="sm"
                variant={isSelected ? 'craft' : 'default'}
                active={isSelected}
                onClick={() => onSelectCategory?.(cat)}
              >
                {cat}
              </Tag>
            );
          })}
        </div>
      </div>

      {/* Region Filter */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Origin Region
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {REGIONS.map((reg) => {
            const isSelected = selectedRegion === reg;
            return (
              <Tag
                key={reg}
                size="sm"
                variant={isSelected ? 'region' : 'default'}
                active={isSelected}
                onClick={() => onSelectRegion?.(reg)}
              >
                {reg}
              </Tag>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Price Range
        </h3>
        <RadioGroup
          name="price-filter"
          value={priceRange}
          onChange={onPriceRangeChange}
          options={priceOptions}
        />
      </div>

      {/* Stock Availability */}
      <div className="pt-3 border-t border-border/70">
        <Checkbox
          label="In Stock Only"
          description="Show products ready to dispatch"
          checked={inStockOnly}
          onChange={(e) => onInStockChange?.(e.target.checked)}
        />
      </div>
    </aside>
  );
}
