import { Link } from 'react-router-dom';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { BUSINESS, whatsappLink } from '../../utils/constants.js';

/** The three conversion actions used across the site, in one consistent order. */
export default function CtaGroup({ context = 'cleaning service', className = '', compact = false, variant = 'default' }) {
  const size = compact ? 'px-4 py-2.5 text-sm' : '';
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link to="/contact" className={`${variant === 'onDark' ? 'btn bg-white text-navy hover:bg-mist' : 'btn-primary'} ${size}`}>
        <CalendarCheck className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
        Book a cleaning service
      </Link>
      <a
        href={whatsappLink(`Hello Umesh Cleaning Services, I need a free quote for ${context} in my area.`)}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-whatsapp ${size}`}
      >
        <MessageCircle className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
        WhatsApp us
      </a>
      <a href={BUSINESS.phoneHref} className={`btn-call ${size}`}>
        <Phone className="h-[1.1em] w-[1.1em]" aria-hidden="true" />
        Call {BUSINESS.phoneDisplay}
      </a>
    </div>
  );
}
