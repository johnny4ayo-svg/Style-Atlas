import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/account', '/checkout', '/api'],
    },
    sitemap: 'https://www.thestyleatlas.com/sitemap.xml',
  };
}
