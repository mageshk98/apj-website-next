import type { MetadataRoute } from 'next';

const SITE_URL = 'https://apj-website.vercel.app';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
