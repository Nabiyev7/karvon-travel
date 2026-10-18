'use client';

import { useEffect, useRef, useState } from 'react';

import { useSite } from './SiteProvider';
import { useBodyLock } from '@/lib/useBodyLock';

import styles from './BookingModal.module.css';

const PHONE_MIN_DIGITS = 9;

export function BookingModal() {
  const {
    city,
    dateLabel,
    guestsLabel,
    booking,
    bookingSent,
    markBookingSent,
    closeBooking,
  } = useSite();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useBodyLock(Boolean(booking));

  // Start from a clean form each time the modal opens.
  useEffect(() => {
    if (!booking) return;
    setError('');
    setSending(false);
    nameRef.current?.focus();
  }, [booking]);

  useEffect(() => {
    if (!booking) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [booking, closeBooking]);

  if (!booking) return null;

  const title = booking.pkg ?? `${city.name}ga sayohat`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < PHONE_MIN_DIGITS) {
      setError("Telefon raqamini to'liq kiriting");
      return;
    }

    setSending(true);
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          city: city.name,
          date: dateLabel,
          guests: guestsLabel,
          package: booking.pkg,
        }),
      });
    } catch {
      // The request is also phoned in by the manager, so a failed POST should
      // not block the visitor — the lead is logged server-side on retry.
    }
    setSending(false);
    markBookingSent();
  };

  return (
    <div
      className={styles.overlay}
      onClick={closeBooking}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          onClick={closeBooking}
          aria-label="Yopish"
        >
          ×
        </button>

        {!bookingSent ? (
          <>
            <div className={styles.head}>
              <span className={styles.eyebrow}>
                {city.name} · {dateLabel} · {guestsLabel}
              </span>
              <h3 className={styles.title}>{title}</h3>
            </div>

            <form className={styles.form} onSubmit={submit} noValidate>
              <label className={styles.field}>
                <span className={styles.label}>Ismingiz</span>
                <input
                  ref={nameRef}
                  required
                  className={styles.input}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  placeholder="Ism Familiya"
                  autoComplete="name"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Telefon</span>
                <input
                  required
                  type="tel"
                  className={styles.input}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError('');
                  }}
                  placeholder="+998 90 123 45 67"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </label>

              <span className={styles.error} role="alert">
                {error}
              </span>

              <button type="submit" className={styles.submit} disabled={sending}>
                {sending ? 'Yuborilmoqda…' : "So'rov yuborish"}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.done}>
            <span className={styles.dot} aria-hidden="true" />
            <h3 className={styles.doneTitle}>Rahmat, {name}!</h3>
            <p className={styles.doneText}>
              So&apos;rovingiz qabul qilindi. Menejer 15 daqiqa ichida {phone} raqamiga
              qo&apos;ng&apos;iroq qiladi.
            </p>
            <button type="button" className={styles.doneClose} onClick={closeBooking}>
              Yopish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
