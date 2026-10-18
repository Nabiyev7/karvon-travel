'use client';

import { useSite } from './SiteProvider';

import styles from './Experiences.module.css';

export function Experiences() {
  const { city } = useSite();

  return (
    <section id="tajriba" className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>
          {city.name}da faqat siz uchun ochiladigan eshiklar
        </h2>
        <p className={styles.note}>
          Har bir tajriba istalgan paketga qo&apos;shiladi yoki alohida band qilinadi.
        </p>
      </div>

      <div className={styles.grid}>
        {city.experiences.map((ex) => (
          <div key={ex.title} className={styles.card}>
            <span className={styles.dot} aria-hidden="true" />
            <h3 className={styles.cardTitle}>{ex.title}</h3>
            <p className={styles.cardText}>{ex.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
