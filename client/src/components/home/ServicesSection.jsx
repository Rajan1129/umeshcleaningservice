import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import ServiceCard from '../ServiceCard.jsx';
import { useServices } from '../../hooks/useServices.js';

export default function ServicesSection({ limit }) {
  const { services } = useServices();
  const shown = limit ? services.slice(0, limit) : services;

  return (
    <section className="section bg-mist" aria-labelledby="services-heading">
      <div className="container-x">
        <SectionHeading
          id="services-heading"
          title="Our Cleaning Services"
          subtitle="From a weekly home clean to post-construction work, every service is handled by our own team with the right equipment for the job."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>

        {limit && services.length > limit && (
          <Link to="/services" className="btn-ghost mt-8">
            See all {services.length} services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}
