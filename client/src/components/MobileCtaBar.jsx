import { Link } from 'react-router-dom';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { BUSINESS, whatsappLink } from '../utils/constants.js';

/** Always-visible conversion bar on phones. */
export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/10 bg-white/97 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="grid grid-cols-3 gap-2 p-2">
        <a href={BUSINESS.phoneHref} className="btn-call min-h-[3rem] flex-col gap-0.5 px-2 py-2 text-xs">
          <Phone className="h-4 w-4" aria-hidden="true" /> Call now
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp min-h-[3rem] flex-col gap-0.5 px-2 py-2 text-xs">
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
        </a>
        <Link to="/contact" className="btn-primary min-h-[3rem] flex-col gap-0.5 px-2 py-2 text-xs">
          <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Book service
        </Link>
      </div>
    </div>
  );
}
