'use client';

import { PLACEHOLDERS } from '@/data/site';
import { CityImages } from './CityImages';
import { useSite } from './SiteProvider';

import styles from './ContactCta.module.css';

export function ContactCta() {
  const { city, openBooking } = useSite();

  return (
    <section id="aloqa" className={styles.section}>
      <CityImages sizes="100vw" />
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <h2 className={styles.title}>{city.name}ga sayohatni bugun rejalashtiring</h2>
        <p className={styles.text}>
          Menejer 15 daqiqa ichida qo&apos;ng&apos;iroq qilib, sizga mos dasturni taklif
          qiladi.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={() => openBooking()}>
            Qo&apos;ng&apos;iroq buyurtma qilish
          </button>
          <a
            href={PLACEHOLDERS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Telegramda yozish
          </a>
        </div>
      </div>
    </section>
  );
}
