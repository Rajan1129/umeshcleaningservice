/**
 * Writes public/sitemap.xml from the site's real routes.
 * Run with `npm run sitemap` before a build, or let `npm run build` do it.
 */
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = process.env.VITE_SITE_URL || 'https://www.umeshcleaningservices.com';
const services = JSON.parse(fs.readFileSync(path.resolve('src/data/services.json'), 'utf-8'));
const areaSlugs = ['jalandhar', 'phagwara', 'kartarpur', 'adampur', 'nakodar', 'kapurthala', 'goraya', 'shahkot', 'phillaur'];

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/before-after', priority: '0.8', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.7', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/reviews', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', priority: '0.6', changefreq: 'yearly' },
  ...services.map((s) => ({ path: `/services/${s.slug}`, priority: '0.9', changefreq: 'monthly' })),
  ...areaSlugs.map((slug) => ({ path: `/cleaning-services-in-${slug}`, priority: '0.8', changefreq: 'monthly' }))
];

const today = new Date().toISOString().split('T')[0];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url>
    <loc>${SITE_URL}${r.path === '/' ? '' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.resolve('public/sitemap.xml'), xml);
console.log(`sitemap.xml written with ${routes.length} URLs`);
