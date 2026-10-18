/**
 * Site-wide settings and the placeholder content called out in the design handoff.
 * Everything in `PLACEHOLDERS` must be replaced with real details before launch.
 */

import type { CityKey } from './cities';

export const PLACEHOLDERS = {
  /** Placeholder — replace with the real office phone number. */
  phone: '+998 71 200 00 00',
  /** Placeholder — replace with the real address. */
  address: "Toshkent, Amir Temur ko'chasi",
  /** Placeholder — replace with the real Telegram handle. */
  telegram: 'https://t.me/',
  /** Placeholder — replace with the real number of years in business. */
  years: '15',
} as const;

/** `tel:` href built from the display phone number. */
export const phoneHref = `tel:${PLACEHOLDERS.phone.replace(/[^\d+]/g, '')}`;

/** The city shown before the visitor has picked one (or on a fresh browser). */
export const START_CITY: CityKey = 'rim';

/** Cycle to the next city every `AUTOPLAY_MS`. Set to `false` to leave it off. */
export const AUTOPLAY = false;
export const AUTOPLAY_MS = 8000;

/** localStorage key holding the visitor's last pick. */
export const CITY_STORAGE_KEY = 'karvon_city';

export const NAV_LINKS = [
  { id: 'yonalish', label: "Yo'nalishlar" },
  { id: 'paketlar', label: 'Paketlar' },
  { id: 'tajriba', label: 'Tajribalar' },
  { id: 'biz', label: 'Biz haqimizda' },
  { id: 'aloqa', label: 'Aloqa' },
] as const;
