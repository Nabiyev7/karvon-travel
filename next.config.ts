import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // The city photos are hotlinked from Unsplash/Pexels while the project is in
    // development. Run `npm run fetch-images` to pull them into /public and switch
    // `src/data/cities.ts` over to local paths before launch.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
};

export default nextConfig;
