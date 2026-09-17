import { useParams, Link, Navigate } from 'react-router-dom';
import { Check, MapPin } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import CtaGroup from '../components/ui/CtaGroup.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import FinalCta from '../components/home/FinalCta.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { useServices } from '../hooks/useServices.js';
import { AREAS, getArea } from '../data/areas.js';
import { localBusinessSchema, breadcrumbSchema } from '../utils/seo.js';

export default function AreaPage() {
  const { areaSlug } = useParams();
  const area = getArea(areaSlug);
  const { services } = useServices();

  if (!area) return <Navigate to="/404" replace />;

  const path = `/cleaning-services-in-${area.slug}`;
  const crumbs = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: path, label: `Cleaning services in ${area.name}` }
  ];
  const nearby = AREAS.filter((a) => a.slug !== area.slug).slice(0, 5);

  return (
    <>
      <Seo
        title={`Cleaning Services in ${area.name} | Umesh Cleaning Services`}
        description={`Home, deep, sofa, kitchen, bathroom and office cleaning in ${area.name}. Book professional cleaners from Umesh Cleaning Services. Call 07828900308.`}
        path={path}
        schemas={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="bg-gradient-to-b from-mist to-white">
        <div className="container-x py-12 lg:py-16">
          <p className="eyebrow"><MapPin className="h-4 w-4" aria-hidden="true" /> {area.name}, Punjab</p>
          <h1 className="mt-4 max-w-3xl">Cleaning Services in {area.name}</h1>
          <p className="lede mt-5">{area.context}</p>
          <CtaGroup className="mt-7" context={`cleaning in ${area.name}`} />
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2>What we cover in {area.name}</h2>
            <ul className="mt-6 space-y-3">
              {area.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slateink">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
            <p className="lede mt-6">
              Tell us the property size, how many bathrooms are involved and anything that needs particular
              attention. That way we send the right size team and the right equipment the first time.
            </p>

            <h3 className="mt-9 text-base">Nearby areas we also serve</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {nearby.map((a) => (
                <li key={a.slug}>
                  <Link to={`/cleaning-services-in-${a.slug}`} className="rounded-full bg-mist px-3.5 py-2 text-sm text-slateink ring-1 ring-navy/8 hover:text-navy">
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <BookingForm />
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-x">
          <h2>Services available in {area.name}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
          <Link to="/services" className="btn-ghost mt-8">See all services</Link>
        </div>
      </section>

      <HowItWorks />
      <FinalCta title={`Need cleaning in ${area.name}?`} context={`cleaning in ${area.name}`} />
    </>
  );
}
