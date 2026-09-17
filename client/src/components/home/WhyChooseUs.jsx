import { BadgeCheck, Users, Wrench, SearchCheck, Clock, MessageCircle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';

const REASONS = [
  { icon: BadgeCheck, title: 'Professional cleaning service', detail: 'A proper service, not casual labour — we work to a checklist and finish what we start.' },
  { icon: Users, title: 'Experienced cleaning team', detail: 'Our cleaners know which method suits which surface, from marble floors to sofa fabric.' },
  { icon: Wrench, title: 'Quality cleaning equipment', detail: 'We bring our own machines and cleaning materials, so you do not have to arrange anything.' },
  { icon: SearchCheck, title: 'Attention to detail', detail: 'Corners, grout lines, switchboards and skirting get the same attention as the open floor.' },
  { icon: Clock, title: 'Reliable service', detail: 'We confirm the slot, turn up on the agreed day, and tell you in advance if anything changes.' },
  { icon: MessageCircle, title: 'Easy booking and WhatsApp support', detail: 'Book by call, WhatsApp or the form on this site, and send photos of problem areas if it helps.' }
];

export default function WhyChooseUs() {
  return (
    <section className="section" aria-labelledby="why-heading">
      <div className="container-x">
        <SectionHeading id="why-heading" title="Why Choose Umesh Cleaning Services?" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, detail }) => (
            <li key={title} className="card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-xl2 bg-green-50 text-green-600">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy">{title}</h3>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-slateink">{detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
