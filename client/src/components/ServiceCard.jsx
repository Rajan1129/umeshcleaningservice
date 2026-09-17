import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import ServiceIcon from './ui/ServiceIcon.jsx';
import SmartImage from './ui/SmartImage.jsx';
import { whatsappLink } from '../utils/constants.js';
import { serviceImage } from '../utils/images.js';

export default function ServiceCard({ service }) {
  return (
    <article className="card group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist">
        <SmartImage
          src={service.image || serviceImage(service.slug)}
          alt={service.title}
          ratio="aspect-[16/10]"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3.5 top-3.5 grid h-10 w-10 place-items-center rounded-xl2 bg-white/95 text-green-600 shadow-sm backdrop-blur">
          <ServiceIcon name={service.icon} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3>
          <Link to={`/services/${service.slug}`} className="font-display text-lg font-bold text-navy transition-colors hover:text-green-600">
            {service.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-slateink">{service.shortDescription}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-navy/8 pt-4">
          <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-green-600 transition-colors">
            View service <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={whatsappLink(`Hello, I would like a free quote for ${service.title} in my area.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16A34A] hover:text-[#15803D] transition-colors"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Get free quote
          </a>
        </div>
      </div>
    </article>
  );
}
