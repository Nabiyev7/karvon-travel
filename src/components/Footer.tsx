'use client';

import { PLACEHOLDERS, phoneHref } from '@/data/site';
import { useSmoothScroll } from '@/lib/useSmoothScroll';

import styles from './Footer.module.css';

export function Footer() {
  const scrollTo = useSmoothScroll();

  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>Karvon</span>
      <span>
        {PLACEHOLDERS.address} ·{' '}
        <a href={phoneHref} className={styles.tap}>
          {PLACEHOLDERS.phone}
        </a>
      </span>
      <div className={styles.links}>
        <a href="#yonalish" className={styles.tap} onClick={scrollTo('yonalish')}>
          Yuqoriga ↑
        </a>
      </div>
    </footer>
  );
}
