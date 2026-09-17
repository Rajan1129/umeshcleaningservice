import { Star, MessageSquareQuote, Sparkles, ShieldCheck } from 'lucide-react';
import { BUSINESS } from '../../utils/constants.js';

const ITEMS = [
  { icon: Star, title: `${BUSINESS.rating}/5 Google rating`, detail: 'Rated by customers on our Google Business Profile' },
  { icon: MessageSquareQuote, title: `${BUSINESS.reviewCount}+ Google reviews`, detail: 'Reviews left by people we have worked for' },
  { icon: Sparkles, title: 'Professional cleaning', detail: 'Trained cleaners with their own equipment and materials' },
  { icon: ShieldCheck, title: 'Quality service', detail: 'We check every job with you before we leave' }
];

export default function TrustBar() {
  return (
    <section className="section" aria-labelledby="trust-heading">
      <div className="container-x">
        <h2 id="trust-heading" className="text-center text-xl sm:text-2xl">Trusted by customers across Jalandhar</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, detail }) => (
            <li key={title} className="card flex flex-col gap-2.5 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-50 text-green-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-display font-bold text-navy">{title}</p>
              <p className="text-sm text-slateink">{detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
