import React, { useState } from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { Input } from '../primitives/Input';
import { Tag } from '../primitives/Tag';

/**
 * SearchBar Composite Component
 * 
 * STUB: AI feature
 * Person 5 (AI) will plug semantic & natural language search parsing here
 * (e.g. "I want a traditional handmade gift from South India").
 */
export function SearchBar({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search by craft, technique, material, or region...',
  quickTags = ['Kalamkari', 'Blue Pottery', 'Pashmina', 'Lost-Wax Bell Metal', 'Andhra Pradesh'],
  className = '',
}) {
  const [query, setQuery] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleClear = () => {
    setQuery('');
    onChange?.('');
    onSearch?.('');
  };

  return (
    <div className={`flex flex-col gap-2.5 w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <Input
          type="search"
          size="lg"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange?.(e.target.value);
          }}
          placeholder={placeholder}
          leftIcon={<Search className="w-5 h-5 text-neutral-400" />}
          rightIcon={
            query ? (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="text-neutral-400 hover:text-text-primary p-1 focus-ring rounded-xs"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-pill">
                <Sparkles className="w-3 h-3" />
                AI Smart Search
              </span>
            )
          }
        />
      </form>

      {quickTags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap text-xs text-text-secondary">
          <span className="shrink-0 font-medium">Quick explore:</span>
          {quickTags.map((tag) => (
            <Tag
              key={tag}
              size="sm"
              variant="default"
              onClick={() => {
                setQuery(tag);
                onChange?.(tag);
                onSearch?.(tag);
              }}
            >
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
}
