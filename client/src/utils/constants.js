export const BUSINESS = {
  name: 'Umesh Cleaning Services',
  category: 'House Cleaning Service',
  city: 'Jalandhar',
  state: 'Punjab',
  country: 'India',
  phoneDisplay: '07828900308',
  phoneHref: 'tel:+917828900308',
  whatsappHref: 'https://wa.me/917828900308',
  email: 'us7828900308@gmail.com',
  emailHref: 'mailto:us7828900308@gmail.com',
  rating: 4.8,
  reviewCount: 26,
  googleProfileUrl: 'https://maps.app.goo.gl/RFCu314EC3tmWzmC7'
};

export const whatsappLink = (message) =>
  `${BUSINESS.whatsappHref}?text=${encodeURIComponent(message || 'Hello Umesh Cleaning Services, I would like a free quote for cleaning.')}`;

export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.umeshcleaningservices.com';
