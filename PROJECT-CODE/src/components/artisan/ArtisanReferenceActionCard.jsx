import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * ArtisanReferenceActionCard
 * Pastel colored action card with large circular icon, bold title, short subtitle, and chevron.
 * Exactly matches the top 4 action cards in the reference design.
 */
export function ArtisanReferenceActionCard({
  icon: Icon,
  iconBgColor = 'bg-emerald-600',
  iconTextColor = 'text-white',
  cardBgColor = 'bg-[#E8F8F0]', // Soft mint green default
  cardBorderColor = 'border-emerald-200/60',
  title,
  subtitle,
  onClick,
  className = '',
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full p-5 rounded-3xl border text-left transition-all duration-200 hover:shadow-md active:scale-98 flex items-center justify-between gap-3 ${cardBgColor} ${cardBorderColor} ${className}`}
    >
      <div className="flex flex-col items-start min-w-0">
        {/* Large Circular Icon */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xs mb-4 group-hover:scale-105 transition-transform ${iconBgColor} ${iconTextColor}`}
        >
          {Icon && <Icon className="w-6 h-6" />}
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-text-secondary mt-1 line-clamp-2 leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>

      {/* Right Chevron */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary group-hover:text-text-primary group-hover:translate-x-0.5 transition-all shrink-0">
        <ChevronRight className="w-5 h-5" />
      </div>
    </button>
  );
}

export default ArtisanReferenceActionCard;
