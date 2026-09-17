import { useState } from 'react';
import { Trash2, Upload } from 'lucide-react';
import Seo from '../../components/Seo.jsx';
import { useApi } from '../../hooks/useApi.js';
import { api, mediaUrl } from '../../services/api.js';
import { Panel, Spinner, ErrorNote, EmptyState, input, label } from '../../components/admin/AdminUi.jsx';
import { GALLERY_CATEGORIES } from '../../components/GalleryGrid.jsx';

const CATEGORIES = GALLERY_CATEGORIES.filter((c) => c.key !== 'all');

export default function GalleryAdmin() {
  const { data, loading, reload } = useApi('/gallery', { auth: true });
  const [form, setForm] = useState({ title: '', alt: '', category: 'home', stage: 'none' });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return setError('Choose an image first');
    setBusy(true);
    setError('');
    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => body.append(k, v));
    body.append('image', file);
    try {
      await api.postForm('/gallery', body);
      setForm({ title: '', alt: '', category: form.category, stage: 'none' });
      setFile(null);
      e.target.reset();
      reload();
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this photo from the gallery?')) return;
    try { await api.del(`/gallery/${id}`); reload(); } catch (err) { setError(err.message); }
  };

  return (
    <div className="space-y-6">
      <Seo title="Gallery | Umesh Cleaning Services admin" description="Manage gallery" path="/admin/gallery" noindex />
      <h1 className="text-2xl">Gallery</h1>
      <ErrorNote message={error} />

      <Panel title="Upload a photo">
        <form onSubmit={upload} className="grid gap-4 sm:grid-cols-2">
          <div><label className={label} htmlFor="g-title">Title</label>
            <input id="g-title" required className={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Kitchen cleaning, Model Town" /></div>
          <div><label className={label} htmlFor="g-alt">Alt text (for search engines and screen readers)</label>
            <input id="g-alt" className={input} value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} placeholder="Cleaned kitchen platform and tiles in Jalandhar" /></div>
          <div><label className={label} htmlFor="g-category">Category</label>
            <select id="g-category" className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select></div>
          <div><label className={label} htmlFor="g-stage">Before or after</label>
            <select id="g-stage" className={input} value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })}>
              <option value="none">Neither</option>
              <option value="before">Before</option>
              <option value="after">After</option>
            </select></div>
          <div className="sm:col-span-2"><label className={label} htmlFor="g-file">Image file</label>
            <input id="g-file" type="file" accept="image/*" required className={input} onChange={(e) => setFile(e.target.files[0])} /></div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={busy} className="btn-teal px-5 py-2.5 text-sm disabled:opacity-70">
              <Upload className="h-4 w-4" aria-hidden="true" /> {busy ? 'Uploading' : 'Upload photo'}
            </button>
          </div>
        </form>
      </Panel>

      <Panel title={`Photos (${data.length})`}>
        {loading ? <Spinner /> : data.length === 0 ? (
          <EmptyState title="No photos yet" body="Upload photos from real jobs. They appear in the website gallery straight away." />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {data.map((img) => (
              <li key={img._id} className="overflow-hidden rounded-xl2 ring-1 ring-navy/8">
                <img src={mediaUrl(img.image)} alt={img.alt || img.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="flex items-start justify-between gap-2 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy">{img.title}</p>
                    <p className="text-xs capitalize text-slateink">{img.category}{img.stage !== 'none' ? ` · ${img.stage}` : ''}</p>
                  </div>
                  <button onClick={() => remove(img._id)} aria-label={`Delete ${img.title}`} className="rounded-full p-1.5 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
