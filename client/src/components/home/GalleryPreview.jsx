import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import GalleryGrid from '../GalleryGrid.jsx';

export default function GalleryPreview({ limit = 8 }) {
  return (
    <section className="section" aria-labelledby="gallery-heading">
      <div className="container-x">
        <SectionHeading
          id="gallery-heading"
          title="Our cleaning work"
          subtitle="Photos from jobs we have completed across Jalandhar and nearby areas."
        />
        <div className="mt-8"><GalleryGrid limit={limit} showFilters={false} /></div>
        <Link to="/gallery" className="btn-ghost mt-8">
          Open the full gallery <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
