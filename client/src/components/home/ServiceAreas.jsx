import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import { AREAS } from '../../data/areas.js';

const POPULAR = [
  { to: '/services/home-cleaning', label: 'Home cleaning in Jalandhar' },
  { to: '/services/home-deep-cleaning', label: 'Deep cleaning in Jalandhar' },
  { to: '/services/bathroom-cleaning', label: 'Bathroom cleaning in Jalandhar' },
  { to: '/services/office-cleaning', label: 'Office cleaning in Jalandhar' }
];

export default function ServiceAreas() {
  return (
    <section className="section" aria-labelledby="areas-heading">
      <div className="container-x">
        <SectionHeading
          id="areas-heading"
          title="Cleaning Services Across Jalandhar"
          subtitle="Jalandhar is our base, and we also take bookings in the towns around it. Each area has its own page with what we cover there."
        />

        <div className="mt-9 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ul className="grid gap-3 sm:grid-cols-2">
            {AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  to={`/cleaning-services-in-${area.slug}`}
                  className="card flex h-full items-start gap-3 p-4 transition-shadow hover:shadow-lift"
                >
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                  <span>
                    <span className="block font-display font-bold text-navy">Cleaning services in {area.name}</span>
                    <span className="mt-1 block text-sm text-slateink">{area.blurb}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="card h-max p-6">
            <h3 className="text-base">Most-booked in Jalandhar</h3>
            <ul className="mt-4 space-y-3">
              {POPULAR.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="btn-link text-[0.95rem]">
                    {link.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-slateink">
              Not sure whether we reach your area? Call us and we will tell you straight away.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
