import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination Primitive
 * Accessible page navigation
 */
export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
}) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={`flex items-center justify-center gap-1.5 select-none ${className}`}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
        className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-border bg-surface text-text-primary hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed focus-ring"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isCurrent = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={isCurrent ? 'page' : undefined}
              aria-label={`Page ${p}`}
              className={`w-8 h-8 rounded-md text-xs sm:text-sm font-medium transition-colors focus-ring ${
                isCurrent
                  ? 'bg-primary text-surface font-semibold shadow-xs'
                  : 'text-text-primary hover:bg-neutral-100'
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Go to next page"
        className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-border bg-surface text-text-primary hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed focus-ring"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
