import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Breadcrumb Primitive
 * Accessible navigation trail
 */
export function Breadcrumb({ items = [], className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs sm:text-sm ${className}`}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-medium text-text-primary truncate max-w-[200px]"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="text-text-secondary hover:text-primary transition-colors focus-ring rounded-xs"
                  >
                    {item.label}
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
