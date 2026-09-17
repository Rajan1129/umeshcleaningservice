import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { mediaUrl } from '../../services/api.js';

export default function Lightbox({ images = [], index, onClose, onNavigate }) {
  const image = images[index];

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length);
    if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onClose, onNavigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!image) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={image.title} className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-900/92 p-4">
      <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20">
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={() => onNavigate((index - 1 + images.length) % images.length)}
        aria-label="Previous image"
        className="absolute left-3 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <figure className="max-h-full max-w-4xl text-center">
        <img src={mediaUrl(image.image)} alt={image.alt || image.title} className="mx-auto max-h-[78vh] rounded-xl2 object-contain" />
        <figcaption className="mt-4 text-sm text-white/85">{image.title}</figcaption>
      </figure>

      <button
        onClick={() => onNavigate((index + 1) % images.length)}
        aria-label="Next image"
        className="absolute right-3 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
