'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { CITIES, type City } from '@/data/cities';
import {
  AUTOPLAY,
  AUTOPLAY_MS,
  CITY_STORAGE_KEY,
  START_CITY,
} from '@/data/site';
import { defaultDate, formatDate, type PickedDate } from '@/lib/date';
import { DEFAULT_GUESTS, guestLabel } from '@/lib/guests';

import styles from './SiteProvider.module.css';

/** Which of the two search popovers is open, if any. */
export type Popover = 'month' | 'guests' | null;

type Booking = { pkg: string | null };

type SiteValue = {
  city: City;
  cityIndex: number;
  selectCity: (index: number) => void;

  date: PickedDate;
  dateLabel: string;
  setDate: (date: PickedDate) => void;

  guests: string;
  guestsLabel: string;
  setGuests: (value: string) => void;

  popover: Popover;
  togglePopover: (which: Exclude<Popover, null>) => void;
  closePopover: () => void;

  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;

  booking: Booking | null;
  bookingSent: boolean;
  openBooking: (pkg?: string | null) => void;
  markBookingSent: () => void;
  closeBooking: () => void;
};

const SiteContext = createContext<SiteValue | null>(null);

export const useSite = (): SiteValue => {
  const value = useContext(SiteContext);
  if (!value) throw new Error('useSite must be used inside <SiteProvider>');
  return value;
};

const startIndex = Math.max(
  0,
  CITIES.findIndex((c) => c.key === START_CITY),
);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [cityIndex, setCityIndex] = useState(startIndex);
  const [date, setDate] = useState<PickedDate>(defaultDate);
  const [guests, setGuests] = useState<string>(DEFAULT_GUESTS);
  const [popover, setPopover] = useState<Popover>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [bookingSent, setBookingSent] = useState(false);

  const selectCity = useCallback((index: number) => {
    setCityIndex(index);
    try {
      localStorage.setItem(CITY_STORAGE_KEY, CITIES[index].key);
    } catch {
      // Private mode or blocked storage — the pick just won't be remembered.
    }
  }, []);

  // Restore the last city the visitor looked at.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CITY_STORAGE_KEY);
      const index = CITIES.findIndex((c) => c.key === saved);
      if (index >= 0) setCityIndex(index);
    } catch {
      // Ignore — fall back to START_CITY.
    }
  }, []);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 760px)');
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Optional carousel; pauses whenever something is open on top of the page.
  useEffect(() => {
    if (!AUTOPLAY) return;
    if (booking || popover || menuOpen) return;
    const id = setInterval(
      () => setCityIndex((i) => (i + 1) % CITIES.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [booking, popover, menuOpen]);

  const openBooking = useCallback((pkg: string | null = null) => {
    setBooking({ pkg });
    setBookingSent(false);
    setPopover(null);
    setMenuOpen(false);
  }, []);

  const closeBooking = useCallback(() => {
    setBooking(null);
    setBookingSent(false);
  }, []);

  const value = useMemo<SiteValue>(
    () => ({
      city: CITIES[cityIndex],
      cityIndex,
      selectCity,

      date,
      dateLabel: formatDate(date),
      setDate,

      guests,
      guestsLabel: guestLabel(guests),
      setGuests,

      popover,
      togglePopover: (which) => setPopover((open) => (open === which ? null : which)),
      closePopover: () => setPopover(null),

      menuOpen,
      toggleMenu: () => setMenuOpen((open) => !open),
      closeMenu: () => setMenuOpen(false),

      booking,
      bookingSent,
      openBooking,
      markBookingSent: () => setBookingSent(true),
      closeBooking,
    }),
    [
      cityIndex,
      selectCity,
      date,
      guests,
      popover,
      menuOpen,
      booking,
      bookingSent,
      openBooking,
      closeBooking,
    ],
  );

  return (
    <SiteContext.Provider value={value}>
      <div
        className={styles.page}
        style={{ '--hue': CITIES[cityIndex].hue } as CSSProperties}
      >
        {children}
      </div>
    </SiteContext.Provider>
  );
}
