/**
 * Photo slots used by the public site.
 *
 * Drop the business's own photos into client/public/images/ using these exact
 * file names and they appear automatically. Until a file exists, the site shows
 * a labelled "Photo needed" placeholder instead of a stock image, so nobody
 * mistakes someone else's photo for Umesh Cleaning Services' own work.
 */
export const IMAGES = {
  hero: '/images/hero-cleaning.jpg',
  deepCleaning: '/images/deep-cleaning.jpg',
  team: '/images/team-at-work.jpg',
  ogImage: '/og-image.jpg'
};

export const serviceImage = (slug) => `/images/services/${slug}.jpg`;
