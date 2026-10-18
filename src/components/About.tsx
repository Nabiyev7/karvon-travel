import { PLACEHOLDERS } from '@/data/site';

import styles from './About.module.css';

const POINTS = [
  {
    title: 'Shaxsiy menejer',
    text: "Bir kishi butun safaringiz uchun javobgar va 24/7 Telegramda aloqada.",
  },
  {
    title: 'Viza va hujjatlar',
    text: "Ariza, sug'urta va bandlovlarni biz tayyorlaymiz.",
  },
  {
    title: 'Tekshirilgan joylar',
    text: "Har bir mehmonxona va gidni jamoamiz o'zi sinab ko'rgan.",
  },
  {
    title: 'Shaffof narx',
    text: "Yashirin to'lovlarsiz, so'm yoki dollarda to'lash mumkin.",
  },
];

export function About() {
  return (
    <section id="biz" className={styles.section}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>Nima uchun Karvon</span>
        <h2 className={styles.title}>
          {PLACEHOLDERS.years} yildan beri sayohatni tafsilotlardan quramiz
        </h2>
      </div>

      <div className={styles.grid}>
        {POINTS.map((point) => (
          <div key={point.title} className={styles.item}>
            <h3 className={styles.itemTitle}>{point.title}</h3>
            <p className={styles.itemText}>{point.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
