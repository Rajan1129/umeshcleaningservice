import Seo from '../components/Seo.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';
import FinalCta from '../components/home/FinalCta.jsx';
import { breadcrumbSchema, localBusinessSchema } from '../utils/seo.js';

const crumbs = [{ to: '/', label: 'Home' }, { to: '/gallery', label: 'Gallery' }];

export default function Gallery() {
  return (
    <>
      <Seo
        title="Cleaning Work Gallery — Jalandhar | Umesh Cleaning Services"
        description="Photos of home, bathroom, kitchen, sofa, floor and office cleaning work completed by Umesh Cleaning Services in Jalandhar and nearby areas."
        path="/gallery"
        schemas={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />
      <section className="section">
        <div className="container-x">
          <h1>Our cleaning work</h1>
          <p className="lede mt-5">
            Photos from jobs completed across Jalandhar and nearby towns. Tap any photo to open it full size.
          </p>
          <div className="mt-10"><GalleryGrid /></div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
