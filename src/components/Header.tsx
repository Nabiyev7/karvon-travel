'use client';

import { NAV_LINKS } from '@/data/site';
import { useSite } from './SiteProvider';
import { useSmoothScroll } from '@/lib/useSmoothScroll';
import { useBodyLock } from '@/lib/useBodyLock';

import styles from './Header.module.css';

export function Header() {
  const { menuOpen, toggleMenu, closeMenu, openBooking } = useSite();
  const scrollTo = useSmoothScroll();

  useBodyLock(menuOpen);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>KARVON</div>

        <nav className={styles.nav} aria-label="Asosiy menyu">
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={scrollTo(link.id)}>
              {link.label}
            </a>
          ))}
        </nav>

        <button type="button" className={styles.cta} onClick={() => openBooking()}>
          Buyurtma berish
        </button>

        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobil-menyu"
        >
          {menuOpen ? 'Yopish' : 'Menyu'}
        </button>
      </header>

      {menuOpen && (
        <div className={styles.overlay} id="mobil-menyu">
          <nav className={styles.overlayNav} aria-label="Mobil menyu">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={styles.overlayLink}
                onClick={(e) => {
                  closeMenu();
                  scrollTo(link.id)(e);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button type="button" className={styles.overlayCta} onClick={() => openBooking()}>
            Buyurtma berish
          </button>
        </div>
      )}
    </>
  );
}
