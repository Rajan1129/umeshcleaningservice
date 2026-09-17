import Seo from '../components/Seo.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import Accordion from '../components/ui/Accordion.jsx';
import FinalCta from '../components/home/FinalCta.jsx';
import { HOME_FAQS } from '../data/faqs.js';
import { faqSchema, breadcrumbSchema } from '../utils/seo.js';

const crumbs = [{ to: '/', label: 'Home' }, { to: '/faq', label: 'FAQ' }];

export default function Faq() {
  return (
    <>
      <Seo
        title="Cleaning Service FAQs — Jalandhar | Umesh Cleaning Services"
        description="Answers to common questions about home cleaning, deep cleaning, sofa cleaning, office cleaning and booking a cleaning service in Jalandhar."
        path="/faq"
        schemas={[faqSchema(HOME_FAQS), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />
      <section className="section">
        <div className="container-x max-w-4xl">
          <h1>Questions customers ask us</h1>
          <p className="lede mt-5">
            If your question is not here, call or message us — we will answer it directly.
          </p>
          <div className="mt-10"><Accordion items={HOME_FAQS} /></div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
