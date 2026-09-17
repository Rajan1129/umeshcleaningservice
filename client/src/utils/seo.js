import { BUSINESS, SITE_URL } from './constants.js';
import { AREA_NAMES } from '../data/areas.js';

export const canonical = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`;

/**
 * LocalBusiness schema. Only facts supplied by the business are included —
 * no street address, no opening hours, no email, no invented claims.
 */
export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'HouseCleaningService',
  name: BUSINESS.name,
  url: SITE_URL,
  telephone: '+917828900308',
  email: BUSINESS.email,
  image: `${SITE_URL}/og-image.jpg`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.state,
    addressCountry: 'IN'
  },
  areaServed: AREA_NAMES.map((name) => ({ '@type': 'City', name })),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: BUSINESS.rating,
    reviewCount: BUSINESS.reviewCount,
    bestRating: 5
  },
  sameAs: BUSINESS.googleProfileUrl ? [BUSINESS.googleProfileUrl] : undefined
});

export const serviceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `${service.title} in ${BUSINESS.city}`,
  serviceType: service.title,
  description: service.shortDescription,
  url: canonical(`/services/${service.slug}`),
  provider: { '@type': 'HouseCleaningService', name: BUSINESS.name, telephone: '+917828900308' },
  areaServed: AREA_NAMES.map((name) => ({ '@type': 'City', name }))
});

export const faqSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer }
  }))
});

export const breadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.label,
    item: canonical(item.to)
  }))
});
