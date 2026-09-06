import { useState, useEffect } from 'react';

/**
 * Custom hook for matching media queries.
 * Standard breakpoints:
 * - mobile: (max-width: 639px)
 * - tablet: (min-width: 640px) and (max-width: 1023px)
 * - desktop: (min-width: 1024px)
 *
 * @param {string} query CSS media query string (e.g. '(min-width: 1024px)')
 * @returns {boolean} matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

/**
 * Helper hook for standard design system responsive breakpoints
 */
export function useBreakpoint() {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return {
    isMobile,
    isTablet,
    isDesktop,
    breakpoint: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
  };
}
