'use client';

import { useSite } from './SiteProvider';

import styles from './Testimonial.module.css';

export function Testimonial() {
  const { city } = useSite();

  return (
    <section className={styles.section}>
      <span className={styles.glyph} aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className={styles.quote}>{city.quote.text}</blockquote>
      <span className={styles.author}>{city.quote.author}</span>
    </section>
  );
}
