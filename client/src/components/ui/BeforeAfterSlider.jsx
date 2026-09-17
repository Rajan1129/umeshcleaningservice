import { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import SmartImage from './SmartImage.jsx';

/**
 * Drag, click or use the arrow keys to wipe between the before and after photo.
 * Works with mouse, touch and keyboard.
 */
export default function BeforeAfterSlider({ title, description, beforeImage, afterImage, beforeAlt, afterAlt }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e) => { if (dragging.current) updateFromClientX(e.clientX); };
  const onPointerUp = () => { dragging.current = false; };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { setPosition((p) => Math.max(0, p - 4)); e.preventDefault(); }
    if (e.key === 'ArrowRight') { setPosition((p) => Math.min(100, p + 4)); e.preventDefault(); }
  };

  return (
    <figure className="card overflow-hidden">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative aspect-[4/3] w-full cursor-ew-resize touch-none select-none overflow-hidden bg-mist"
      >
        <SmartImage
          src={afterImage}
          alt={afterAlt || `${title} after cleaning`}
          ratio="absolute inset-0 h-full"
          className="!rounded-none"
          label={`After photo for "${title}"`}
        />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <SmartImage
            src={beforeImage}
            alt={beforeAlt || `${title} before cleaning`}
            ratio="absolute inset-0 h-full"
            className="!rounded-none"
            label={`Before photo for "${title}"`}
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold text-white">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-[#16A34A] px-3 py-1 text-xs font-semibold text-white">After</span>

        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-md" style={{ left: `${position}%` }} />
        <button
          type="button"
          role="slider"
          aria-label={`Reveal the before and after photo for ${title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lift"
          style={{ left: `${position}%` }}
        >
          <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <figcaption className="space-y-1 px-5 py-4">
        <h3 className="text-base">{title}</h3>
        {description && <p className="text-sm text-slateink">{description}</p>}
      </figcaption>
    </figure>
  );
}
