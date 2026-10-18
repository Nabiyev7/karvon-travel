'use client';

import { useCallback } from 'react';

/**
 * Nav links scroll to their section rather than jumping, while keeping the
 * href so the links still work without JavaScript.
 */
export const useSmoothScroll = () =>
  useCallback(
    (id: string) => (event: { preventDefault: () => void }) => {
      const el = document.getElementById(id);
      if (!el) return;
      event.preventDefault();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY,
        behavior: reduce ? 'auto' : 'smooth',
      });
    },
    [],
  );
