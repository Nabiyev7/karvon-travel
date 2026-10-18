import { NextResponse } from 'next/server';

/**
 * Receives a booking request from the homepage modal.
 *
 * With `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` set, the lead is forwarded to
 * the sales Telegram chat. Without them the request is only logged, so the site
 * works in development and nothing is lost if the integration is not wired yet.
 */

type Payload = {
  name?: string;
  phone?: string;
  city?: string;
  date?: string;
  guests?: string;
  package?: string | null;
};

const PHONE_MIN_DIGITS = 9;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const phone = (body.phone ?? '').trim();

  if (!name || phone.replace(/\D/g, '').length < PHONE_MIN_DIGITS) {
    return NextResponse.json({ error: 'invalid_contact' }, { status: 400 });
  }

  const lines = [
    'Yangi so\'rov — Karvon',
    `Ism: ${name}`,
    `Telefon: ${phone}`,
    `Yo'nalish: ${body.city ?? '—'}`,
    `Sana: ${body.date ?? '—'}`,
    `Mehmonlar: ${body.guests ?? '—'}`,
    `Paket: ${body.package ?? '—'}`,
  ].join('\n');

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.info('[booking]\n%s', lines);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: lines }),
  });

  if (!res.ok) {
    console.error('[booking] Telegram delivery failed: %s', res.status);
    return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
