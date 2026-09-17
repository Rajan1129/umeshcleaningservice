import Seo from '../components/Seo.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import FinalCta from '../components/home/FinalCta.jsx';
import CtaGroup from '../components/ui/CtaGroup.jsx';
import { useServices } from '../hooks/useServices.js';
import { localBusinessSchema, breadcrumbSchema } from '../utils/seo.js';

const crumbs = [{ to: '/', label: 'Home' }, { to: '/services', label: 'Services' }];

export default function Services() {
  const { services } = useServices();

  return (
    <>
      <Seo
        title="Cleaning Services in Jalandhar — Home, Deep, Sofa & Office | Umesh Cleaning Services"
        description="All cleaning services offered in Jalandhar: home cleaning, deep cleaning, bathroom, kitchen, sofa, mattress, floor, window, carpet, chimney, office, post-construction and jet washing."
        path="/services"
        schemas={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="section">
        <div className="container-x">
          <h1>Our Cleaning Services</h1>
          <p className="lede mt-5">
            Every service below is carried out by our own team in Jalandhar and nearby areas. Open any service
            to see exactly what it covers, or send us a message and we will recommend what your property needs.
          </p>
          <CtaGroup className="mt-7" />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
