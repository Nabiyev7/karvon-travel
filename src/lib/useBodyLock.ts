'use client';

import { useEffect } from 'react';

/** Stops the page behind a modal or the mobile menu from scrolling. */
export const useBodyLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
};
