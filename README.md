# Karvon

Premium Uzbek-language homepage for **Karvon**, a luxury travel agency. The
visitor picks one of six cities — Rim, Dubay, Istanbul, Parij, Tokio,
Nyu-York — and the whole page re-themes to it: hero photo, accent colour,
quick facts, packages, experiences, testimonial and CTA copy.

Built from `design_handoff_karvon_homepage` with Next.js (App Router), React
and CSS Modules.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | ESLint |
| `npm run fetch-images` | Download the city photos into `public/cities/` |

## Project layout

```
src/
  app/
    layout.tsx          Fonts, metadata, <html lang="uz">
    page.tsx            Section order
    globals.css         Design tokens and resets
    api/booking/route.ts  Receives booking requests
  components/
    SiteProvider.tsx    Shared state: city, date, guests, menu, modal
    CityImages.tsx      The crossfading stack of city photos
    Header, Hero, SearchSection, Packages, Experiences,
    About, Testimonial, ContactCta, Footer, BookingModal
  data/
    cities.ts           All six cities and their Uzbek copy
    site.ts             Placeholders, nav links, autoplay
  lib/
    date.ts, guests.ts, useSmoothScroll.ts, useBodyLock.ts
```

## Design notes

**Accent colour.** Each city carries an OKLCH hue. `SiteProvider` sets `--hue`
on the page wrapper and `--accent` derives from it, so re-theming is a single
value change. `--hue` is registered with `@property`, which lets the accent
animate between cities instead of snapping; browsers without `@property`
simply switch instantly.

**Responsive.** The breakpoint is 760px and it lives in CSS, not JavaScript, so
the server and the client render the same markup. Below it the nav becomes a
fullscreen menu, the hero city list becomes a scrolling pill row, and the
Packages image stops being sticky. Everything else is fluid via `clamp()` and
`auto-fit` grids.

**On a phone.** The hero uses `100svh` so it is a full screen with the URL bar
showing; `--gutter` includes `env(safe-area-inset-*)` so content clears
notches; inputs are 16px so iOS Safari does not zoom on focus; tap targets are
at least 44px; the page behind the menu and the modal is scroll-locked; and the
pill row scrolls the current city into view.

## Content still to replace

Everything below is placeholder copy carried over from the handoff. Prices,
testimonials and contact details live in `src/data/cities.ts` and
`src/data/site.ts`.

- [ ] All package prices
- [ ] Testimonial quotes and names
- [ ] Phone number `+998 71 200 00 00`
- [ ] The address
- [ ] The Telegram link `https://t.me/`
- [ ] "15 yildan beri" — the years in business

## Photos

The six city photos are currently **hotlinked** from Unsplash and Pexels, which
is fine for development. Before launch, self-host them:

```bash
npm run fetch-images          # downloads into public/cities/
```

Then point `img` in `src/data/cities.ts` at `/cities/<key>.jpg` and drop the
`remotePatterns` entries from `next.config.ts`. Both licenses allow commercial
use; crediting the photographers is good practice.

## Booking requests

The modal POSTs to `/api/booking`. With `TELEGRAM_BOT_TOKEN` and
`TELEGRAM_CHAT_ID` set the lead is forwarded to the sales Telegram chat;
without them it is only logged, so the site works before that is wired up.
Copy `.env.example` to `.env.local` to configure it.

## Deploying

The app is a standard Next.js project and deploys to Vercel or Netlify as-is.
Set the two Telegram variables in the host's environment settings.
