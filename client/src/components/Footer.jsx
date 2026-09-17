import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Star, Sparkles, Mail } from 'lucide-react';
import { BUSINESS, whatsappLink } from '../utils/constants.js';
import { AREAS } from '../data/areas.js';
import services from '../data/services.json';

const PAGES = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/before-after', label: 'Before & After' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' }
];

export default function Footer() {
  return (
    <footer className="mt-4 bg-navy-900 text-white/75">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt={`${BUSINESS.name} Logo`}
              className="h-11 w-auto object-contain rounded-lg bg-white p-1 shadow-sm"
            />
            <span className="font-display text-lg font-extrabold text-white">{BUSINESS.name}</span>
          </div>
          <p className="flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" aria-hidden="true" />
            {BUSINESS.city}, {BUSINESS.state}, {BUSINESS.country}
          </p>
          <a href={BUSINESS.emailHref} className="flex items-center gap-2 text-sm transition-colors hover:text-white">
            <Mail className="h-4 w-4 shrink-0 text-teal-500" aria-hidden="true" />
            {BUSINESS.email}
          </a>
          <p className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            {BUSINESS.rating}/5 from {BUSINESS.reviewCount} Google reviews
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a href={BUSINESS.phoneHref} className="btn-call px-4 py-2.5 text-sm">
              <Phone className="h-4 w-4" aria-hidden="true" /> {BUSINESS.phoneDisplay}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-4 py-2.5 text-sm">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp us
            </a>
          </div>
        </div>

        <nav aria-label="Quick links">
          <h2 className="mb-4 font-display text-sm font-bold text-white">Quick links</h2>
          <ul className="space-y-2 text-sm">
            {PAGES.map((p) => (
              <li key={p.to}><Link to={p.to} className="hover:text-white">{p.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="mb-4 font-display text-sm font-bold text-white">Services</h2>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-white">{s.title}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Service areas">
          <h2 className="mb-4 font-display text-sm font-bold text-white">Areas we serve</h2>
          <ul className="space-y-2 text-sm">
            {AREAS.map((a) => (
              <li key={a.slug}>
                <Link to={`/cleaning-services-in-${a.slug}`} className="hover:text-white">
                  Cleaning services in {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. {BUSINESS.category} in {BUSINESS.city}.</p>
          {BUSINESS.googleProfileUrl && (
            <a href={BUSINESS.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              View us on Google
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
