import { Phone, MessageCircle, MapPin, Star, Mail } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { BUSINESS, whatsappLink } from '../utils/constants.js';
import { AREA_NAMES } from '../data/areas.js';
import { localBusinessSchema, breadcrumbSchema } from '../utils/seo.js';

const crumbs = [{ to: '/', label: 'Home' }, { to: '/contact', label: 'Contact' }];

export default function Contact() {
  return (
    <>
      <Seo
        title="Book a Cleaning Service in Jalandhar | Umesh Cleaning Services"
        description="Book a cleaning service in Jalandhar with Umesh Cleaning Services. Call 07828900308, message us on WhatsApp, or send the booking form for a free quote."
        path="/contact"
        schemas={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <h1>Book a cleaning service</h1>
            <p className="lede mt-5">
              Tell us what needs cleaning and when suits you. We call you back to confirm the visit and
              discuss what the job involves.
            </p>

            <div className="mt-8 space-y-3">
              <a href={BUSINESS.phoneHref} className="card flex items-center gap-4 p-5 transition-shadow hover:shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl2 bg-[#16A34A] text-white">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display font-bold text-navy">Call {BUSINESS.phoneDisplay}</span>
                  <span className="block text-sm text-slateink">The quickest way to reach us</span>
                </span>
              </a>

              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-4 p-5 transition-shadow hover:shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl2 bg-[#16A34A] text-white">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display font-bold text-navy">WhatsApp us</span>
                  <span className="block text-sm text-slateink">Send photos of the area you want cleaned</span>
                </span>
              </a>

              <a href={BUSINESS.emailHref} className="card flex items-center gap-4 p-5 transition-shadow hover:shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl2 bg-navy text-white">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display font-bold text-navy">Email us</span>
                  <span className="block text-sm text-slateink">{BUSINESS.email}</span>
                </span>
              </a>

              <div className="card flex items-start gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl2 bg-teal-100 text-teal-700">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display font-bold text-navy">{BUSINESS.city}, {BUSINESS.state}</span>
                  <span className="block text-sm text-slateink">Serving {AREA_NAMES.join(', ')}</span>
                </span>
              </div>

              {BUSINESS.googleProfileUrl && (
                <a href={BUSINESS.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-4 p-5 transition-shadow hover:shadow-lift">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl2 bg-mist text-amber-500">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display font-bold text-navy">{BUSINESS.rating}/5 on Google</span>
                    <span className="block text-sm text-slateink">Read all {BUSINESS.reviewCount} reviews</span>
                  </span>
                </a>
              )}
            </div>
          </div>

          <BookingForm />
        </div>
      </section>
    </>
  );
}
