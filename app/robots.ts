import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/'],
    },
    sitemap: 'https://automotive-showcase.vercel.app/sitemap.xml',
    host: 'https://automotive-showcase.vercel.app',
  }
} 