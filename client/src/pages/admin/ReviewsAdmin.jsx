import { useState } from 'react';
import { Trash2, Star } from 'lucide-react';
import Seo from '../../components/Seo.jsx';
import { useApi } from '../../hooks/useApi.js';
import { api } from '../../services/api.js';
import { Panel, Spinner, ErrorNote, EmptyState, input, label } from '../../components/admin/AdminUi.jsx';
import { BUSINESS } from '../../utils/constants.js';

export default function ReviewsAdmin() {
  const { data, loading, reload } = useApi('/reviews', { auth: true });
  const [form, setForm] = useState({ author: '', rating: 5, text: '', source: 'google', reviewedAt: '' });
  const [error, setError] = useState('');

  const save = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews', { ...form, rating: Number(form.rating), reviewedAt: form.reviewedAt || undefined }, true);
      setForm({ author: '', rating: 5, text: '', source: 'google', reviewedAt: '' });
      reload();
    } catch (err) { setError(err.message); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try { await api.del(`/reviews/${id}`); reload(); } catch (err) { setError(err.message); }
  };

  return (
    <div className="space-y-6">
      <Seo title="Reviews | Umesh Cleaning Services admin" description="Manage reviews" path="/admin/reviews" noindex />
      <h1 className="text-2xl">Reviews</h1>
      <ErrorNote message={error} />

      <Panel title="Add a real review">
        <p className="mb-5 max-w-prose2 text-sm text-slateink">
          Copy reviews word for word from your Google Business Profile ({BUSINESS.rating}/5 from{' '}
          {BUSINESS.reviewCount} reviews). Only add reviews customers actually left — invented reviews break
          Google's policies and lose customers' trust when they compare the site against the profile.
        </p>
        <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
          <div><label className={label} htmlFor="r-author">Reviewer name</label>
            <input id="r-author" required className={input} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></div>
          <div><label className={label} htmlFor="r-rating">Rating</label>
            <select id="r-rating" className={input} value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>)}
            </select></div>
          <div><label className={label} htmlFor="r-source">Source</label>
            <select id="r-source" className={input} value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
              <option value="google">Google</option>
              <option value="direct">Given directly to us</option>
            </select></div>
          <div><label className={label} htmlFor="r-date">Review date</label>
            <input id="r-date" type="date" className={input} value={form.reviewedAt} onChange={(e) => setForm({ ...form, reviewedAt: e.target.value })} /></div>
          <div className="sm:col-span-2"><label className={label} htmlFor="r-text">Review text</label>
            <textarea id="r-text" rows={3} required className={input} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} /></div>
          <div className="sm:col-span-2"><button type="submit" className="btn-teal px-5 py-2.5 text-sm">Save review</button></div>
        </form>
      </Panel>

      <Panel title={`Published reviews (${data.length})`}>
        {loading ? <Spinner /> : data.length === 0 ? (
          <EmptyState title="No review text added yet" body="The website still shows your Google rating and review count, with a link to read the reviews on Google." />
        ) : (
          <ul className="divide-y divide-navy/8">
            {data.map((r) => (
              <li key={r._id} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="flex items-center gap-2 font-semibold text-navy">
                    {r.author}
                    <span className="flex items-center gap-0.5 text-sm text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />{r.rating}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-slateink">{r.text}</p>
                </div>
                <button onClick={() => remove(r._id)} aria-label={`Delete review by ${r.author}`} className="rounded-full p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
