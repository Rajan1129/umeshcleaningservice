import Seo from '../components/Seo.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import SmartImage from '../components/ui/SmartImage.jsx';
import CtaGroup from '../components/ui/CtaGroup.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import FinalCta from '../components/home/FinalCta.jsx';
import { IMAGES } from '../utils/images.js';
import { BUSINESS } from '../utils/constants.js';
import { AREA_NAMES } from '../data/areas.js';
import { localBusinessSchema, breadcrumbSchema } from '../utils/seo.js';

const crumbs = [{ to: '/', label: 'Home' }, { to: '/about', label: 'About' }];

export default function About() {
  return (
    <>
      <Seo
        title="About Umesh Cleaning Services | Cleaning Company in Jalandhar"
        description="Umesh Cleaning Services is a house cleaning service based in Jalandhar, Punjab, providing home, deep, upholstery and office cleaning across Jalandhar and nearby towns."
        path="/about"
        schemas={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="section">
        <div className="container-x grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1>A cleaning service based in Jalandhar</h1>
            <p className="lede mt-5">
              Umesh Cleaning Services is a house cleaning service working in Jalandhar and the towns around it.
              We clean homes, flats, kothis, shops and offices — everything from a routine weekly clean to a
              full deep clean, upholstery cleaning and post-construction work.
            </p>
            <p className="lede mt-4">
              The work is straightforward: you tell us what needs cleaning, we tell you what the job involves,
              and our team arrives with its own equipment and materials on the agreed day. Before we leave, we
              walk through the space with you.
            </p>
            <p className="lede mt-4">
              Our Google Business Profile currently shows a {BUSINESS.rating}/5 rating from {BUSINESS.reviewCount}{' '}
              reviews. We would rather point you to those than make claims about ourselves.
            </p>
            <CtaGroup className="mt-8" context="cleaning at my home" />
          </div>

          <SmartImage
            src={IMAGES.team}
            alt="Umesh Cleaning Services team cleaning a home in Jalandhar"
            label="Photo of your team on a job — used on the About page"
            className="shadow-card"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-x">
          <h2>Where we work</h2>
          <p className="lede mt-3">
            Jalandhar is our base. We also take bookings in {AREA_NAMES.filter((n) => n !== 'Jalandhar').join(', ')}.
            If your town is not on the list, call us and we will tell you honestly whether we can reach you.
          </p>
        </div>
      </section>

      <HowItWorks />
      <FinalCta />
    </>
  );
}
