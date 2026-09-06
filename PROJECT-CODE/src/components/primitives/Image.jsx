import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * Image Primitive
 * Fixed aspect-ratio wrapper with loading skeleton and broken-image fallback
 */
export function Image({
  src,
  alt = '',
  aspectRatio = 'square',
  className = '',
  fit = 'cover',
  fallbackText = 'Image not available',
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const aspectStyles = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[16/7]',
    auto: '',
  };

  const fitStyles = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  };

  return (
    <div
      className={`relative overflow-hidden bg-neutral-100 rounded-md ${aspectStyles[aspectRatio]} ${className}`}
    >
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-neutral-200/60 animate-pulse z-10"
        />
      )}

      {/* Fallback state */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-neutral-100 text-neutral-400">
          <ImageOff className="w-8 h-8 stroke-[1.5] mb-1 text-neutral-400" />
          <span className="text-xs">{fallbackText}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full ${fitStyles[fit]} transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          {...props}
        />
      )}
    </div>
  );
}
