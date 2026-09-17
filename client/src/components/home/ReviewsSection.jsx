import { Star, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import { useApi } from '../../hooks/useApi.js';
import { BUSINESS } from '../../utils/constants.js';

const Stars = ({ value }) => (
  <span className="flex gap-0.5" aria-label={`${value} out of 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < value ? 'fill-amber-400 text-amber-400' : 'text-navy/20'}`} aria-hidden="true" />
    ))}
  </span>
);

export default function ReviewsSection({ limit = 6 }) {
  const { data: reviews, loading } = useApi('/reviews', { fallback: [] });
  const shown = (Array.isArray(reviews) ? reviews : []).slice(0, limit);

  return (
    <section className="section bg-mist" aria-labelledby="reviews-heading">
      <div className="container-x">
        <SectionHeading
          id="reviews-heading"
          title="What customers say on Google"
          subtitle="Our rating comes from our Google Business Profile. Only reviews customers have actually left are shown here."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
          <div className="card flex flex-col items-start gap-2 p-6 lg:w-64">
            <span className="font-display text-5xl font-extrabold text-navy">{BUSINESS.rating}</span>
            <Stars value={Math.round(BUSINESS.rating)} />
            <p className="text-sm text-slateink">Based on {BUSINESS.reviewCount} Google reviews</p>
            {BUSINESS.googleProfileUrl && (
              <a href={BUSINESS.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-3 px-4 py-2.5 text-sm">
                View us on Google <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>

          {loading ? (
            <p className="text-slateink">Loading reviews…</p>
          ) : shown.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2">
              {shown.map((review) => (
                <li key={review._id} className="card p-6">
                  <Stars value={review.rating} />
                  <blockquote className="mt-3 text-[0.95rem] text-slateink">{review.text}</blockquote>
                  <p className="mt-4 font-display font-bold text-navy">{review.author}</p>
                  {review.source === 'google' && <p className="text-xs text-slateink">Google review</p>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="card border-2 border-dashed border-teal/30 p-6">
              <h3 className="text-base">Review text not added yet</h3>
              <p className="mt-2 max-w-prose2 text-slateink">
                The {BUSINESS.rating}/5 rating and review count come from the Google Business Profile.
                Individual review text is added by the business from the admin panel, copied from real
                Google reviews — nothing here is written for them. Until then, customers can read every
                review on Google using the button on the left.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
