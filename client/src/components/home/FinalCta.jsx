import CtaGroup from '../ui/CtaGroup.jsx';

export default function FinalCta({
  title = 'Need a Cleaner Home or Office?',
  body = 'Contact Umesh Cleaning Services today and discuss your cleaning requirement.',
  context = 'cleaning service'
}) {
  return (
    <section className="section" aria-labelledby="final-cta-heading">
      <div className="container-x">
        <div className="rounded-xl2 bg-gradient-to-br from-navy to-navy-700 px-6 py-12 text-white sm:px-12 sm:py-16">
          <h2 id="final-cta-heading" className="text-white">{title}</h2>
          <p className="lede mt-4 text-white/75">{body}</p>
          <CtaGroup className="mt-8" context={context} variant="onDark" />
        </div>
      </div>
    </section>
  );
}
