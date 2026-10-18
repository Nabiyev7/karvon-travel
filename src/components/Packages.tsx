'use client';

import { CityImages } from './CityImages';
import { useSite } from './SiteProvider';

import styles from './Packages.module.css';

export function Packages() {
  const { city, openBooking } = useSite();

  return (
    <section id="paketlar" className={styles.section}>
      <div className={styles.intro}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>{city.name} paketlari</span>
          <h2 className={styles.title}>Har bir kun oldindan o&apos;ylangan</h2>
        </div>
        <div className={styles.figure}>
          <CityImages
            source="second"
            fade="slow"
            labelled
            sizes="(max-width: 759px) 100vw, 44vw"
          />
        </div>
      </div>

      <div className={styles.list}>
        {city.packages.map((pkg, i) => (
          <article key={pkg.title} className={styles.item}>
            <div className={styles.meta}>
              <span>
                {String(i + 1).padStart(2, '0')} · {pkg.days}
              </span>
              <span>{pkg.price} dan</span>
            </div>
            <h3 className={styles.itemTitle}>{pkg.title}</h3>
            <p className={styles.desc}>{pkg.desc}</p>
            <button
              type="button"
              className={styles.link}
              onClick={() => openBooking(`${pkg.title} · ${pkg.days}, ${pkg.price} dan`)}
            >
              <span>Batafsil va buyurtma</span>
              <span aria-hidden="true">→</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
