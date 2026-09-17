import Seo from '../components/Seo.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import BeforeAfterSection from '../components/home/BeforeAfterSection.jsx';
import FinalCta from '../components/home/FinalCta.jsx';
import { breadcrumbSchema, localBusinessSchema } from '../utils/seo.js';

const crumbs = [{ to: '/', label: 'Home' }, { to: '/before-after', label: 'Before & After' }];

export default function BeforeAfter() {
  return (
    <>
      <Seo
        title="Before & After Cleaning Results in Jalandhar | Umesh Cleaning Services"
        description="See real before and after cleaning transformations from Umesh Cleaning Services — bathrooms, kitchens, sofas, floors, windows and full rooms in Jalandhar."
        path="/before-after"
        schemas={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />
      <section className="pt-12">
        <div className="container-x">
          <h1>Before &amp; After</h1>
          <p className="lede mt-5">
            Each pair below is one job, photographed from the same spot before and after our team worked on it.
            Drag the handle to compare.
          </p>
        </div>
      </section>
      <BeforeAfterSection />
      <FinalCta />
    </>
  );
}
