'use client';

import Image from 'next/image';

import { CITIES, secondImage } from '@/data/cities';
import { START_CITY } from '@/data/site';
import { useSite } from './SiteProvider';

import styles from './CityImages.module.css';

type Props = {
  /** `hero` uses the main photo, `second` the Packages one. */
  source?: 'hero' | 'second';
  /** Slow zoom on the active photo — the hero only. */
  motion?: boolean;
  /** Crossfade length: 1.2s on the hero and CTA, 1s in Packages. */
  fade?: 'default' | 'slow';
  /** Honour each city's `object-position`. */
  usePosition?: boolean;
  /** Decorative stacks pass an empty alt. */
  labelled?: boolean;
  sizes: string;
};

/** The crossfading stack of city photos used by the hero, packages and CTA. */
export function CityImages({
  source = 'hero',
  motion = false,
  fade = 'default',
  usePosition = false,
  labelled = false,
  sizes,
}: Props) {
  const { city } = useSite();

  return (
    <>
      {CITIES.map((c) => {
        const active = c.key === city.key;
        return (
          <Image
            key={c.key}
            src={source === 'second' ? secondImage(c) : c.img}
            alt={labelled ? c.name : ''}
            fill
            sizes={sizes}
            priority={c.key === START_CITY}
            className={[
              styles.img,
              motion ? styles.motion : '',
              fade === 'slow' ? styles.slow : '',
              active ? styles.active : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={usePosition ? { objectPosition: c.pos } : undefined}
            aria-hidden={!active}
          />
        );
      })}
    </>
  );
}
