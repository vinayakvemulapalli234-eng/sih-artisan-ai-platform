import React from 'react';
import { Info, Lightbulb, Tag } from 'lucide-react';

/**
 * SuggestedPriceCard
 * Displays recommended benchmark price with cost tip and 1-tap accept button.
 * Exactly matches the middle bottom card in the reference image.
 */
export function SuggestedPriceCard({
  price = 650,
  minRange = 600,
  maxRange = 700,
  onUsePrice,
  className = '',
}) {
  return (
    <div className={`p-5 rounded-3xl border border-border/80 bg-white flex flex-col justify-between shadow-xs ${className}`}>
      <div>
        <h3 className="font-heading text-base font-bold text-text-primary mb-3">
          Suggested Price
        </h3>

        {/* Large Green Recommended Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-heading text-3xl font-extrabold text-emerald-800">
            ₹{price}
          </span>
          <div className="flex items-center gap-1 text-xs text-text-secondary font-medium">
            <span>(Recommended)</span>
            <Info className="w-3.5 h-3.5 text-text-muted cursor-help" />
          </div>
        </div>

        {/* Suggested Range */}
        <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-4">
          <Tag className="w-3.5 h-3.5 text-text-muted" />
          <span>Suggested range: <strong className="text-text-primary">₹{minRange} - ₹{maxRange}</strong></span>
        </div>

        {/* Yellow Tip Card */}
        <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5 mb-5">
          <span className="text-amber-800 shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </span>
          <p className="leading-relaxed">
            This price helps you cover your material and work. You can earn more with this price!
          </p>
        </div>
      </div>

      {/* 1-Tap Use Price Button */}
      <button
        type="button"
        onClick={() => onUsePrice?.(price)}
        className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center"
      >
        Use ₹{price}
      </button>
    </div>
  );
}

export default SuggestedPriceCard;
