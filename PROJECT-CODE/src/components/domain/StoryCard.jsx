import React from 'react';
import { BookOpen, Quote } from 'lucide-react';
import { Card } from '../primitives/Card';
import { Image } from '../primitives/Image';
import { Tag } from '../primitives/Tag';

/**
 * StoryCard Composite Component
 * Communicates the cultural storytelling & ancestral narrative behind traditional crafts
 */
export function StoryCard({
  story,
  onStoryClick,
  className = '',
}) {
  if (!story) return null;

  const {
    id,
    title,
    artisanName,
    craft,
    region,
    image,
    readTime,
    excerpt,
    quote,
  } = story;

  return (
    <Card
      variant="interactive"
      padding="none"
      onClick={() => onStoryClick?.(story)}
      className={`group flex flex-col md:flex-row overflow-hidden border border-border bg-surface ${className}`}
    >
      {/* Story Image */}
      <div className="md:w-2/5 shrink-0 relative overflow-hidden bg-neutral-100">
        <Image
          src={image}
          alt={title}
          aspectRatio="square"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-1">
          {craft && <Tag variant="craft" size="sm">{craft}</Tag>}
        </div>
      </div>

      {/* Story Narrative Content */}
      <div className="p-5 md:p-6 flex flex-col justify-between flex-1 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-secondary font-medium">
            <span>By Master Artisan {artisanName}</span>
            <span className="flex items-center gap-1 text-neutral-400">
              <BookOpen className="w-3.5 h-3.5" />
              {readTime || '5 min read'}
            </span>
          </div>

          <h3 className="font-heading text-lg sm:text-xl font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
            {title}
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
            {excerpt}
          </p>

          {quote && (
            <div className="p-3 bg-background rounded-md border-l-2 border-primary my-1">
              <p className="text-xs italic text-text-primary font-serif flex items-start gap-1.5">
                <Quote className="w-3.5 h-3.5 text-primary shrink-0 rotate-180" />
                <span>{quote}</span>
              </p>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-border/70 flex items-center justify-between text-xs text-text-secondary">
          <span>Tradition of {region}</span>
          <span className="text-primary font-semibold group-hover:underline">
            Read cultural narrative →
          </span>
        </div>
      </div>
    </Card>
  );
}
