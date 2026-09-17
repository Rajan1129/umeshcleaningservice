import { Link } from 'react-router-dom';
import { Check, CalendarCheck } from 'lucide-react';
import SmartImage from '../ui/SmartImage.jsx';
import { IMAGES } from '../../utils/images.js';

const POINTS = [
  'Behind and under furniture, where dust settles unseen',
  'Bathroom tiles, grout lines and hard-water build-up',
  'Kitchen platforms, tiles and cabinet fronts thick with oil',
  'Fans, grills, switchboards, skirting and ceiling corners'
];

export default function DeepCleaningSection() {
  return (
    <section className="section" aria-labelledby="deep-heading">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <SmartImage
          src={IMAGES.deepCleaning}
          alt="Professional deep cleaning of a home interior in Jalandhar"
          label="Deep cleaning photo from one of your own jobs"
          ratio="aspect-[4/3]"
          className="shadow-card"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />

        <div>
          <h2 id="deep-heading">Deep Cleaning for a Fresher, Healthier Home</h2>
          <p className="lede mt-4">
            Routine cleaning keeps a house looking tidy, but dust and grease keep collecting in the places a
            broom and mop never reach. Deep cleaning goes after exactly those areas.
          </p>
          <ul className="mt-6 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-slateink">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <Link to="/services/home-deep-cleaning" className="btn-primary mt-8">
            <CalendarCheck className="h-[1.1em] w-[1.1em]" aria-hidden="true" /> Book deep cleaning
          </Link>
        </div>
      </div>
    </section>
  );
}
