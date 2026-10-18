/**
 * Downloads the city photos into public/cities/ so they can be served from our
 * own domain instead of hotlinked from Unsplash and Pexels.
 *
 *   node scripts/fetch-images.mjs
 *
 * Afterwards point `img` in src/data/cities.ts at `/cities/<key>.jpg` and drop
 * the remotePatterns entries from next.config.ts. Both licenses allow
 * commercial use; crediting the photographers is good practice.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/cities');

const SOURCES = {
  rim: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=2000&q=80',
  dubai: 'https://images.unsplash.com/photo-1566972638537-8c04edd6aa4d?w=2000&q=80',
  istanbul:
    'https://images.pexels.com/photos/19161622/pexels-photo-19161622.jpeg?auto=compress&cs=tinysrgb&w=2000',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=2000&q=80',
  tokyo: 'https://images.unsplash.com/photo-1770752609290-264c53dc54a3?w=2000&q=80',
  newyork:
    'https://images.pexels.com/photos/14426200/pexels-photo-14426200.jpeg?auto=compress&cs=tinysrgb&w=2000',
};

await mkdir(outDir, { recursive: true });

let failed = 0;
for (const [key, url] of Object.entries(SOURCES)) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const file = resolve(outDir, `${key}.jpg`);
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${key}.jpg`);
  } catch (error) {
    failed++;
    console.error(`✗ ${key}: ${error.message}`);
  }
}

if (failed) {
  console.error(`\n${failed} image(s) could not be downloaded.`);
  process.exit(1);
}

console.log(`\nSaved to public/cities/. Now switch src/data/cities.ts to /cities/<key>.jpg.`);
