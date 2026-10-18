'use client';

import { useEffect, useRef, useState } from 'react';

import { useSite } from './SiteProvider';
import { GUEST_OPTIONS } from '@/lib/guests';
import {
  MONTHS,
  MONTH_RANGE,
  WEEKDAYS,
  monthCells,
  monthFromOffset,
  monthOffset,
} from '@/lib/date';

import styles from './SearchSection.module.css';

export function SearchSection() {
  const {
    city,
    date,
    dateLabel,
    setDate,
    guests,
    guestsLabel,
    setGuests,
    popover,
    togglePopover,
    closePopover,
    openBooking,
  } = useSite();

  const formRef = useRef<HTMLFormElement>(null);
  // Which month the calendar is showing, counted from the current one.
  const [view, setView] = useState(() => monthOffset(date.year, date.month));

  // Clicking anywhere outside the search bar closes whichever popover is open.
  useEffect(() => {
    if (!popover) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!formRef.current?.contains(e.target as Node)) closePopover();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopover();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [popover, closePopover]);

  const openCalendar = () => {
    // Always reopen on the month holding the chosen date.
    setView(monthOffset(date.year, date.month));
    togglePopover('month');
  };

  const shown = monthFromOffset(view);
  const cells = monthCells(shown.year, shown.month);

  return (
    <section className={styles.section}>
      <form
        ref={formRef}
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          openBooking();
        }}
      >
        <div className={styles.cell}>
          <span className={styles.label}>Manzil</span>
          <span className={styles.value}>
            {city.name}, {city.country}
          </span>
        </div>

        <div className={styles.field}>
          <button
            type="button"
            className={styles.trigger}
            onClick={openCalendar}
            aria-expanded={popover === 'month'}
          >
            <span className={styles.triggerText}>
              <span className={styles.label}>Sana</span>
              <span className={styles.value}>{dateLabel}</span>
            </span>
            <span
              className={`${styles.caret} ${popover === 'month' ? styles.caretOpen : ''}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>

          {popover === 'month' && (
            <div className={`${styles.popover} ${styles.calendar}`}>
              <div className={styles.monthNav}>
                <button
                  type="button"
                  className={styles.arrow}
                  onClick={() => setView((v) => Math.max(0, v - 1))}
                  disabled={view <= 0}
                  aria-label="Oldingi oy"
                >
                  ‹
                </button>
                <span className={styles.monthLabel}>
                  {MONTHS[shown.month]} {shown.year}
                </span>
                <button
                  type="button"
                  className={styles.arrow}
                  onClick={() => setView((v) => Math.min(MONTH_RANGE, v + 1))}
                  disabled={view >= MONTH_RANGE}
                  aria-label="Keyingi oy"
                >
                  ›
                </button>
              </div>

              <div className={styles.grid}>
                {WEEKDAYS.map((w) => (
                  <span key={w} className={styles.weekday}>
                    {w}
                  </span>
                ))}
                {cells.map((cell, i) => {
                  const selected =
                    cell.day === date.day &&
                    shown.month === date.month &&
                    shown.year === date.year;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={[
                        styles.day,
                        cell.day === null ? styles.dayBlank : '',
                        selected ? styles.daySelected : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      disabled={cell.day === null || cell.past}
                      aria-hidden={cell.day === null}
                      onClick={() => {
                        if (cell.day === null) return;
                        setDate({ year: shown.year, month: shown.month, day: cell.day });
                        closePopover();
                      }}
                    >
                      {cell.day ?? ''}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className={styles.field}>
          <button
            type="button"
            className={styles.trigger}
            onClick={() => togglePopover('guests')}
            aria-expanded={popover === 'guests'}
          >
            <span className={styles.triggerText}>
              <span className={styles.label}>Mehmonlar</span>
              <span className={styles.value}>{guestsLabel}</span>
            </span>
            <span
              className={`${styles.caret} ${popover === 'guests' ? styles.caretOpen : ''}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>

          {popover === 'guests' && (
            <div className={`${styles.popover} ${styles.guests}`}>
              {GUEST_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.guestOption} ${
                    option.value === guests ? styles.guestSelected : ''
                  }`}
                  onClick={() => {
                    setGuests(option.value);
                    closePopover();
                  }}
                >
                  <span>{option.label}</span>
                  <span className={styles.check} aria-hidden="true">
                    ●
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className={styles.submit}>
          Sayohatni rejalashtirish
        </button>
      </form>

      <div className={styles.facts}>
        {[
          { k: 'Parvoz', v: city.flight },
          { k: 'Eng yaxshi mavsum', v: city.season },
          { k: 'Viza', v: city.visa },
          { k: 'Vaqt farqi', v: city.tz },
        ].map((fact) => (
          <div key={fact.k} className={styles.fact}>
            <span className={styles.label}>{fact.k}</span>
            <span className={styles.factValue}>{fact.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
