import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import BeforeAfterSlider from '../ui/BeforeAfterSlider.jsx';
import { useApi } from '../../hooks/useApi.js';

export const BA_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'sofa', label: 'Sofa & Carpet' },
  { key: 'floor', label: 'Floor & Jet Wash' },
  { key: 'bathroom', label: 'Bathroom' },
  { key: 'kitchen', label: 'Kitchen & Chimney' },
  { key: 'room', label: 'Full Room' }
];

const FALLBACK_ITEMS = [
  {
    _id: 'sample-1',
    category: 'sofa',
    title: 'Fabric Sofa Stain Removal & Shampooing',
    description: 'Deep vacuuming, stubborn food/drink stain extraction, and fabric sanitisation for fabric sofas',
    beforeImage: '/images/before-after/sofa-before.jpg',
    afterImage: '/images/before-after/sofa-after.jpg'
  },
  {
    _id: 'sample-2',
    category: 'floor',
    title: 'Outdoor Wall & Floor High-Pressure Jet Washing',
    description: 'Stubborn moss, algae, and weather grime blasted clean with high-pressure jet washing',
    beforeImage: '/images/before-after/jetwash-before.jpg',
    afterImage: '/images/before-after/jetwash-after.jpg'
  },
  {
    _id: 'sample-3',
    category: 'bathroom',
    title: 'Bathroom Tile, Grout & Glass Descaling',
    description: 'Hard water stains, soap scum haze on glass partitions, and discoloured grout lines restored',
    beforeImage: '/images/before-after/bathroom-before.jpg',
    afterImage: '/images/before-after/bathroom-after.jpg'
  },
  {
    _id: 'sample-4',
    category: 'kitchen',
    title: 'Modular Kitchen Platform & Hob Degreasing',
    description: 'Removal of sticky cooking oil film and residue from kitchen surfaces, hob, and chimney hood',
    beforeImage: '/images/before-after/kitchen-before.jpg',
    afterImage: '/images/before-after/kitchen-after.jpg'
  },
  {
    _id: 'sample-5',
    category: 'room',
    title: 'Living Room Deep Cleaning & Floor Care',
    description: 'Dust removal, window shutter wiping, and floor buffing for a spotless, welcoming living space',
    beforeImage: '/images/before-after/room-before.jpg',
    afterImage: '/images/before-after/room-after.jpg'
  }
];

export default function BeforeAfterSection({ limit, category: fixedCategory }) {
  const [category, setCategory] = useState(fixedCategory || 'all');
  const { data, loading } = useApi(`/before-after?category=${category}`);
  const source = data && data.length > 0 ? data : (category === 'all' ? FALLBACK_ITEMS : FALLBACK_ITEMS.filter((f) => f.category === category));
  const items = limit ? source.slice(0, limit) : source;

  return (
    <section className="section bg-mist" aria-labelledby="ba-heading">
      <div className="container-x">
        <SectionHeading
          id="ba-heading"
          title="See the Difference"
          subtitle="Real cleaning transformations from dirty to fresh and clean. Drag the handle on any photo to compare."
        />

        {!fixedCategory && (
          <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Before and after categories">
            {BA_CATEGORIES.map((c) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={category === c.key}
                onClick={() => setCategory(c.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  category === c.key ? 'bg-navy text-white' : 'bg-white text-slateink ring-1 ring-navy/10 hover:text-navy'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        {loading && <p className="mt-8 text-slateink">Loading comparisons…</p>}

        {!loading && items.length === 0 && (
          <div className="card mt-8 border-2 border-dashed border-teal/30 bg-white p-8">
            <h3>No comparisons published yet</h3>
            <p className="mt-2 max-w-prose2 text-slateink">
              Before and after photos are uploaded by the business from the admin panel. Add a pair from a
              real job and it appears here straight away, with the wipe slider ready to use.
            </p>
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <BeforeAfterSlider
                key={item._id}
                title={item.title}
                description={item.description}
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeAlt={`${item.title} in Jalandhar before cleaning by Umesh Cleaning Services`}
                afterAlt={`${item.title} in Jalandhar after cleaning by Umesh Cleaning Services`}
              />
            ))}
          </div>
        )}

        {limit && (
          <Link to="/before-after" className="btn-ghost mt-8">
            See all transformations <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}
