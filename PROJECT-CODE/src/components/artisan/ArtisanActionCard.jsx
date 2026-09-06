import React from 'react';
import { Volume2, ArrowRight } from 'lucide-react';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';

/**
 * ArtisanActionCard Component
 * High-contrast, symbol-first action card optimized for mobile touch and low-literacy artisans
 */
export function ArtisanActionCard({
  icon,
  iconBg = 'bg-primary/10 text-primary',
  title,
  nativeTitle,
  subtitle,
  badge,
  badgeVariant = 'primary',
  onClick,
  onAudioPrompt,
  className = '',
}) {
  return (
    <Card
      variant="interactive"
      padding="md"
      onClick={onClick}
      className={`relative flex flex-col justify-between gap-4 p-5 rounded-lg border-2 border-border/90 hover:border-primary transition-all duration-200 shadow-sm active:scale-[0.98] ${className}`}
    >
      {/* Top row: Big Icon & Badge */}
      <div className="flex items-start justify-between gap-2">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${iconBg}`}>
          {icon}
        </div>

        <div className="flex items-center gap-1.5">
          {badge && (
            <Badge variant={badgeVariant} size="sm" className="font-bold px-2 py-0.5">
              {badge}
            </Badge>
          )}

          {onAudioPrompt && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAudioPrompt();
              }}
              aria-label={`Listen to ${title}`}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-text-secondary flex items-center justify-center focus-ring"
              title="सुनें (Listen)"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Title & Native Script Text */}
      <div className="flex flex-col gap-1">
        {nativeTitle && (
          <span className="font-heading text-lg sm:text-xl font-bold text-text-primary leading-tight">
            {nativeTitle}
          </span>
        )}
        <span className={`text-sm sm:text-base font-semibold ${nativeTitle ? 'text-secondary' : 'font-heading text-lg font-bold text-text-primary'}`}>
          {title}
        </span>
        {subtitle && (
          <p className="text-xs text-text-secondary leading-snug mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Tap indicator */}
      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
        <span>टैप करें / Tap here</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Card>
  );
}
