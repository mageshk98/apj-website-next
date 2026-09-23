import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Not a static export: /api/google-reviews is a server route handler, so the
  // Google API key can stay server-side. Pages are still prerendered.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
