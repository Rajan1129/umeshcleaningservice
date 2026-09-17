import SectionHeading from '../ui/SectionHeading.jsx';

const STEPS = [
  { title: 'Contact us', detail: 'Call, WhatsApp or send the booking form on this site. Photos of the area help us understand the job.' },
  { title: 'Discuss your cleaning requirement', detail: 'We ask about the property, the rooms involved and the problem areas, then tell you what the work will involve.' },
  { title: 'Schedule your service', detail: 'We agree a date and time that suits you, and confirm how many cleaners will come.' },
  { title: 'Enjoy a cleaner space', detail: 'The team completes the work and walks through the finished space with you before leaving.' }
];

export default function HowItWorks() {
  return (
    <section className="section bg-navy-900 text-white/80" aria-labelledby="how-heading">
      <div className="container-x">
        <h2 id="how-heading" className="text-white">How it works</h2>
        <p className="lede mt-3 text-white/70">Four steps from your first message to a cleaned home or office.</p>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative rounded-xl2 bg-white/5 p-6 ring-1 ring-white/10">
              <span className="font-display text-sm font-bold text-teal-500">Step {i + 1}</span>
              <h3 className="mt-2 text-base text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-white/70">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
