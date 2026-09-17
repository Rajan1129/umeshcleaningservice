import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { mediaUrl } from '../../services/api.js';

/**
 * Renders a real photo when one exists. When the business has not supplied
 * a photo yet, it renders a clearly labelled placeholder instead of a stock
 * image pretending to be the client's own work.
 */
export default function SmartImage({ src, alt, className = '', ratio = 'aspect-[4/3]', label, priority = false, sizes }) {
  const [failed, setFailed] = useState(false);
  const resolved = mediaUrl(src);

  if (!resolved || failed) {
    return (
      <div
        className={`${ratio} ${className} flex flex-col items-center justify-center gap-2 rounded-xl2 border-2 border-dashed border-teal/30 bg-mist p-4 text-center`}
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="h-7 w-7 text-teal" aria-hidden="true" />
        <p className="text-sm font-semibold text-navy">Photo needed</p>
        <p className="max-w-[26ch] text-xs text-slateink">{label || alt}</p>
      </div>
    );
  }

  return (
    <img
      src={resolved}
      alt={alt}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchpriority={priority ? 'high' : undefined}
      onError={() => setFailed(true)}
      className={`${ratio} ${className} w-full rounded-xl2 object-cover`}
    />
  );
}
