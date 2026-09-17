import SectionHeading from '../ui/SectionHeading.jsx';
import Accordion from '../ui/Accordion.jsx';

export default function FaqSection({ faqs = [], title = 'Frequently asked questions', subtitle }) {
  if (!faqs.length) return null;
  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="container-x max-w-4xl">
        <SectionHeading id="faq-heading" title={title} subtitle={subtitle} />
        <div className="mt-8"><Accordion items={faqs} /></div>
      </div>
    </section>
  );
}
