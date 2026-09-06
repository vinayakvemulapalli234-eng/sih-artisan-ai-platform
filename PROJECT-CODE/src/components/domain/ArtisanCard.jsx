import React from 'react';
import { MapPin, Star, Sparkles } from 'lucide-react';
import { Card } from '../primitives/Card';
import { Avatar } from '../primitives/Avatar';
import { Badge } from '../primitives/Badge';
import { Tag } from '../primitives/Tag';

/**
 * ArtisanCard Composite Component
 * Features artisan avatar, name, craft specialty, region, and verified status
 */
export function ArtisanCard({
  artisan,
  onArtisanClick,
  className = '',
}) {
  if (!artisan) return null;

  const {
    id,
    name,
    specialty,
    region,
    verified,
    avatar,
    experienceYears,
    rating,
    reviewCount,
    productsCount,
    tags = [],
  } = artisan;

  return (
    <Card
      variant="interactive"
      padding="md"
      onClick={() => onArtisanClick?.(artisan)}
      className={`flex flex-col justify-between h-full group ${className}`}
    >
      <div className="flex flex-col gap-3">
        {/* Header: Avatar, Name, Verification */}
        <div className="flex items-center gap-3">
          <Avatar
            src={avatar}
            name={name}
            size="lg"
            verified={verified}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                {name}
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-secondary truncate">
              {specialty}
            </p>
            <div className="flex items-center gap-1 text-xs text-text-secondary mt-0.5">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
              <span className="truncate">{region}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.slice(0, 3).map((tag, i) => (
              <Tag key={i} size="sm" variant="default" className="text-[11px]">
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </div>

      {/* Footer Metrics */}
      <div className="pt-3 mt-3 border-t border-border/70 flex items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center gap-1 font-medium text-text-primary">
          <Star className="w-3.5 h-3.5 fill-warning stroke-warning" />
          <span>{rating || '4.9'}</span>
          <span className="text-neutral-400">({reviewCount || 40})</span>
        </div>

        <div>
          <span className="font-semibold text-text-primary">{productsCount || 12}</span>{' '}
          authentic items
        </div>
      </div>
    </Card>
  );
}
