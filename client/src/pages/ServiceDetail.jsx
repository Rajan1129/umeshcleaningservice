import { useParams, Link, Navigate } from 'react-router-dom';
import { Check, ArrowUpRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import SmartImage from '../components/ui/SmartImage.jsx';
import CtaGroup from '../components/ui/CtaGroup.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Accordion from '../components/ui/Accordion.jsx';
import BeforeAfterSection from '../components/home/BeforeAfterSection.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';
import FinalCta from '../components/home/FinalCta.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { useService, useServices } from '../hooks/useServices.js';
import { serviceImage } from '../utils/images.js';
import { AREAS } from '../data/areas.js';
import { serviceSchema, faqSchema, breadcrumbSchema } from '../utils/seo.js';

// Maps a service to the gallery / comparison category that fits it best.
const CATEGORY_BY_SLUG = {
  'bathroom-cleaning': 'bathroom',
  'kitchen-cleaning': 'kitchen',
  'chimney-cleaning': 'kitchen',
  'sofa-cleaning': 'sofa',
  'carpet-cleaning': 'sofa',
  'floor-cleaning': 'floor',
  'jet-washing': 'floor',
  'window-cleaning': 'room'
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const { service, loading } = useService(slug);
  const { services } = useServices();

  if (!loading && !service) return <Navigate to="/404" replace />;
  if (!service) return <div className="container-x section"><p className="text-slateink">Loading service…</p></div>;

  const crumbs = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: `/services/${service.slug}`, label: service.title }
  ];
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const comparisonCategory = CATEGORY_BY_SLUG[service.slug];

  return (
    <>
      <Seo
        title={service.metaTitle || `${service.title} in Jalandhar | Umesh Cleaning Services`}
        description={service.metaDescription || service.shortDescription}
        path={`/services/${service.slug}`}
        schemas={[serviceSchema(service), breadcrumbSchema(crumbs), ...(service.faqs?.length ? [faqSchema(service.faqs)] : [])]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="bg-gradient-to-b from-mist to-white">
        <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <div>
            <h1>{service.title} in Jalandhar</h1>
            <p className="lede mt-5">{service.intro || service.shortDescription}</p>
            <CtaGroup className="mt-7" context={service.title} />
          </div>
          <SmartImage
            src={service.image || serviceImage(service.slug)}
            alt={service.imageAlt || `${service.title} being carried out in Jalandhar`}
            label={`Photo of your own ${service.title.toLowerCase()} work`}
            className="shadow-card"
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
      </section>

      {service.includes?.length > 0 && (
        <section className="section">
          <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2>What is included</h2>
              <ul className="mt-6 space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slateink">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />{item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              {service.benefits?.length > 0 && (
                <div>
                  <h2>Why this service is useful</h2>
                  <ul className="mt-6 space-y-3">
                    {service.benefits.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slateink">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.suitableFor?.length > 0 && (
                <div>
                  <h2>Suitable for</h2>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.suitableFor.map((item) => (
                      <li key={item} className="rounded-full bg-mist px-4 py-2 text-sm text-slateink ring-1 ring-navy/8">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {service.process?.length > 0 && (
        <section className="section bg-mist">
          <div className="container-x">
            <h2>How we carry out {service.title.toLowerCase()}</h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, i) => (
                <li key={step.step} className="card p-6">
                  <span className="font-display text-sm font-bold text-teal">Step {i + 1}</span>
                  <h3 className="mt-2 text-base">{step.step}</h3>
                  <p className="mt-2 text-sm text-slateink">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {comparisonCategory && <BeforeAfterSection category={comparisonCategory} />}

      <section className="section">
        <div className="container-x">
          <SectionHeading title={`${service.title} photos`} subtitle="Photos from jobs our team has completed." />
          <div className="mt-8">
            <GalleryGrid limit={8} showFilters={false} initialCategory={comparisonCategory || 'all'} />
          </div>
        </div>
      </section>

      {service.faqs?.length > 0 && (
        <section className="section bg-mist">
          <div className="container-x max-w-4xl">
            <h2>{service.title} — questions we get asked</h2>
            <div className="mt-8"><Accordion items={service.faqs} /></div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2>Book {service.title.toLowerCase()}</h2>
            <p className="lede mt-4">
              Send your details and we will call you back to confirm the visit. You can also call or message
              us on WhatsApp if that is quicker.
            </p>

            <h3 className="mt-9 text-base">Areas we cover for this service</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {AREAS.map((area) => (
                <li key={area.slug}>
                  <Link to={`/cleaning-services-in-${area.slug}`} className="rounded-full bg-mist px-3.5 py-2 text-sm text-slateink ring-1 ring-navy/8 hover:text-navy">
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>

            {related.length > 0 && (
              <>
                <h3 className="mt-9 text-base">Other services</h3>
                <ul className="mt-3 space-y-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/services/${r.slug}`} className="btn-link text-[0.95rem]">
                        {r.title} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <BookingForm defaultService={service.title} />
        </div>
      </section>

      <FinalCta context={service.title} />
    </>
  );
}
