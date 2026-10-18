'use client';

import { useEffect, useRef } from 'react';

import { CITIES } from '@/data/cities';
import { CityImages } from './CityImages';
import { useSite } from './SiteProvider';

import styles from './Hero.module.css';

export function Hero() {
  const { city, cityIndex, selectCity } = useSite();
  const activePill = useRef<HTMLButtonElement>(null);

  // On a phone the pill row scrolls, so bring the current city into view —
  // it may have been restored from a previous visit.
  useEffect(() => {
    activePill.current?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [cityIndex]);

  return (
    <section id="yonalish" className={styles.hero}>
      <CityImages motion usePosition labelled sizes="100vw" />
      <div className={styles.scrim} />

      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>
            <span className={styles.rule} aria-hidden="true" />
            <span>{city.country}</span>
          </p>
          <h1 className={styles.title}>{city.name}</h1>
          <p className={styles.tagline}>{city.tagline}</p>
        </div>

        <div className={styles.pills} role="tablist" aria-label="Yo'nalishlar">
          {CITIES.map((c, i) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              ref={i === cityIndex ? activePill : undefined}
              aria-selected={i === cityIndex}
              className={`${styles.pill} ${i === cityIndex ? styles.pillActive : ''}`}
              onClick={() => selectCity(i)}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className={styles.list} role="tablist" aria-label="Yo'nalishlar">
          {CITIES.map((c, i) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={i === cityIndex}
              className={`${styles.row} ${i === cityIndex ? styles.rowActive : ''}`}
              onClick={() => selectCity(i)}
            >
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <span>{c.name}</span>
              <span className={styles.from}>{c.from}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
