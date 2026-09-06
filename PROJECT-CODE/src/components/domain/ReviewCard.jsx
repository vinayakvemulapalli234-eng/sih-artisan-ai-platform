import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';
import { formatDate } from '../../lib/formatters';

/**
 * ReviewCard Composite Component
 * Customer feedback and artisan verification
 */
export function ReviewCard({ review, className = '' }) {
  if (!review) return null;

  const {
    id,
    userName,
    rating = 5,
    date,
    comment,
    verifiedPurchase = true,
  } = review;

  return (
    <Card variant="flat" padding="sm" className={`flex flex-col gap-2.5 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-primary">{userName}</span>
          {verifiedPurchase && (
            <Badge variant="success" size="sm" className="gap-1 text-[10px]">
              <CheckCircle2 className="w-3 h-3" />
              Verified Buyer
            </Badge>
          )}
        </div>
        <span className="text-xs text-text-secondary">{formatDate(date)}</span>
      </div>

      {/* Star rating */}
      <div className="flex items-center gap-0.5 text-warning" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-warning stroke-warning' : 'stroke-neutral-300'
            }`}
          />
        ))}
      </div>

      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
        "{comment}"
      </p>
    </Card>
  );
}
