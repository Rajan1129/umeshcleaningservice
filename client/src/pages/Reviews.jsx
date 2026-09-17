import Seo from '../components/Seo.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import ReviewsSection from '../components/home/ReviewsSection.jsx';
import FinalCta from '../components/home/FinalCta.jsx';
import { BUSINESS } from '../utils/constants.js';
import { breadcrumbSchema, localBusinessSchema } from '../utils/seo.js';

const crumbs = [{ to: '/', label: 'Home' }, { to: '/reviews', label: 'Reviews' }];

export default function Reviews() {
  return (
    <>
      <Seo
        title={`Customer Reviews — ${BUSINESS.rating}/5 on Google | Umesh Cleaning Services`}
        description={`Umesh Cleaning Services is rated ${BUSINESS.rating}/5 from ${BUSINESS.reviewCount} Google reviews for cleaning services in Jalandhar. Read the reviews on Google.`}
        path="/reviews"
        schemas={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />
      <section className="pt-12">
        <div className="container-x">
          <h1>Customer reviews</h1>
          <p className="lede mt-5">
            Our rating and review count come directly from our Google Business Profile, where customers leave
            reviews after we have worked for them.
          </p>
        </div>
      </section>
      <ReviewsSection limit={24} />
      <FinalCta />
    </>
  );
}
