import { useState } from 'react';
import { useApi } from '../hooks/useApi.js';
import SmartImage from './ui/SmartImage.jsx';
import Lightbox from './ui/Lightbox.jsx';

export const GALLERY_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'bathroom', label: 'Bathroom' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'sofa', label: 'Sofa' },
  { key: 'floor', label: 'Floor' },
  { key: 'home', label: 'Home' },
  { key: 'office', label: 'Office' },
  { key: 'before-after', label: 'Before & After' }
];

const FALLBACK_GALLERY = [
  { _id: 'g-1', category: 'home', title: 'Spotless Living Room Deep Clean', image: '/images/services/home-cleaning.jpg', area: 'Model Town' },
  { _id: 'g-2', category: 'bathroom', title: 'Sanitised Master Bathroom', image: '/images/services/bathroom-cleaning.jpg', area: 'Civil Lines' },
  { _id: 'g-3', category: 'kitchen', title: 'Modular Kitchen Deep Degreasing', image: '/images/services/kitchen-cleaning.jpg', area: 'Urban Estate' },
  { _id: 'g-4', category: 'sofa', title: 'Fabric Sofa Deep Shampooing', image: '/images/services/sofa-cleaning.jpg', area: 'Cantt Area' },
  { _id: 'g-5', category: 'floor', title: 'Hardwood Floor Sweeping & Care', image: '/images/services/floor-cleaning.jpg', area: 'Rama Mandi' },
  { _id: 'g-6', category: 'office', title: 'Corporate Office Cleaning', image: '/images/services/office-cleaning.jpg', area: 'BMC Chowk' },
  { _id: 'g-7', category: 'home', title: 'Full House Sanitisation & Deep Clean', image: '/images/services/home-deep-cleaning.jpg', area: 'Adarsh Nagar' },
  { _id: 'g-8', category: 'windows', title: 'Streak-Free Window Glass Clean', image: '/images/services/window-cleaning.jpg', area: 'Jalandhar City' },
  { _id: 'g-9', category: 'kitchen', title: 'Stainless Steel Chimney & Exhaust Hood', image: '/images/services/chimney-cleaning.jpg', area: 'Model Town' },
  { _id: 'g-10', category: 'home', title: 'Outdoor Jet Washing & Siding Wash', image: '/images/services/jet-washing.jpg', area: 'Civil Lines' },
  { _id: 'g-11', category: 'home', title: 'Post-Construction Renovation Cleanup', image: '/images/services/post-construction-cleaning.jpg', area: 'Urban Estate' },
  { _id: 'g-12', category: 'home', title: 'Deep Mattress Sanitisation', image: '/images/services/mattress-cleaning.jpg', area: 'Cantt Area' }
];

export default function GalleryGrid({ limit, showFilters = true, initialCategory = 'all' }) {
  const [category, setCategory] = useState(initialCategory);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const { data, loading } = useApi(`/gallery?category=${category}`);

  const source = data && data.length > 0 ? data : (category === 'all' ? FALLBACK_GALLERY : FALLBACK_GALLERY.filter((g) => g.category === category));
  const images = limit ? source.slice(0, limit) : source;

  return (
    <div>
      {showFilters && (
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Gallery categories">
          {GALLERY_CATEGORIES.map((c) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={category === c.key}
              onClick={() => setCategory(c.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                category === c.key ? 'bg-navy text-white' : 'bg-mist text-slateink ring-1 ring-navy/10 hover:text-navy'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {loading && <p className="text-slateink">Loading photos…</p>}

      {!loading && images.length === 0 && (
        <div className="card border-2 border-dashed border-teal/30 p-8">
          <h3>No photos in this category yet</h3>
          <p className="mt-2 max-w-prose2 text-slateink">
            Gallery photos are uploaded by the business through the admin panel, so only real photos from
            real jobs appear here. Upload a few images and they show up in this grid immediately.
          </p>
        </div>
      )}

      {images.length > 0 && (
        <ul className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>li]:mb-4">
          {images.map((image, i) => (
            <li key={image._id} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group block w-full overflow-hidden rounded-xl2 text-left"
                aria-label={`Open photo: ${image.title}`}
              >
                <SmartImage
                  src={image.image}
                  alt={image.alt || image.title}
                  ratio="aspect-auto"
                  className="transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <span className="mt-2 block text-sm text-slateink">
                  {image.title}
                  {image.stage !== 'none' && (
                    <span className="ml-2 rounded-full bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-700">
                      {image.stage === 'before' ? 'Before' : 'After'}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {lightboxIndex >= 0 && (
        <Lightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(-1)} onNavigate={setLightboxIndex} />
      )}
    </div>
  );
}
