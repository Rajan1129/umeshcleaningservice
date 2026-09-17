import { useState } from 'react';
import { Trash2, Upload, Eye, EyeOff } from 'lucide-react';
import Seo from '../../components/Seo.jsx';
import { useApi } from '../../hooks/useApi.js';
import { api, mediaUrl } from '../../services/api.js';
import { Panel, Spinner, ErrorNote, EmptyState, input, label } from '../../components/admin/AdminUi.jsx';

const CATEGORIES = ['bathroom', 'kitchen', 'sofa', 'floor', 'windows', 'room'];

export default function BeforeAfterAdmin() {
  const { data, loading, reload } = useApi('/before-after', { auth: true });
  const [form, setForm] = useState({ title: '', category: 'bathroom', description: '' });
  const [files, setFiles] = useState({ before: null, after: null });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    if (!files.before || !files.after) return setError('Choose both a before photo and an after photo');
    setBusy(true);
    setError('');
    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => body.append(k, v));
    body.append('beforeImage', files.before);
    body.append('afterImage', files.after);
    try {
      await api.postForm('/before-after', body);
      setForm({ title: '', category: form.category, description: '' });
      setFiles({ before: null, after: null });
      e.target.reset();
      reload();
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  const togglePublish = async (id) => {
    try { await api.patch(`/before-after/${id}/publish`, {}); reload(); } catch (err) { setError(err.message); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this before/after comparison?')) return;
    try { await api.del(`/before-after/${id}`); reload(); } catch (err) { setError(err.message); }
  };

  return (
    <div className="space-y-6">
      <Seo title="Before & After | Umesh Cleaning Services admin" description="Manage comparisons" path="/admin/before-after" noindex />
      <h1 className="text-2xl">Before &amp; After</h1>
      <ErrorNote message={error} />

      <Panel title="Add a comparison">
        <p className="mb-5 text-sm text-slateink">
          Shoot both photos from the same spot and angle so the wipe slider lines up.
        </p>
        <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
          <div><label className={label} htmlFor="ba-title">Title</label>
            <input id="ba-title" required className={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Bathroom deep clean, Urban Estate" /></div>
          <div><label className={label} htmlFor="ba-category">Category</label>
            <select id="ba-category" className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
            </select></div>
          <div className="sm:col-span-2"><label className={label} htmlFor="ba-desc">Description</label>
            <input id="ba-desc" className={input} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Hard-water scale removed from tiles and fittings" /></div>
          <div><label className={label} htmlFor="ba-before">Before photo</label>
            <input id="ba-before" type="file" accept="image/*" required className={input} onChange={(e) => setFiles({ ...files, before: e.target.files[0] })} /></div>
          <div><label className={label} htmlFor="ba-after">After photo</label>
            <input id="ba-after" type="file" accept="image/*" required className={input} onChange={(e) => setFiles({ ...files, after: e.target.files[0] })} /></div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={busy} className="btn-teal px-5 py-2.5 text-sm disabled:opacity-70">
              <Upload className="h-4 w-4" aria-hidden="true" /> {busy ? 'Uploading' : 'Add comparison'}
            </button>
          </div>
        </form>
      </Panel>

      <Panel title={`Comparisons (${data.length})`}>
        {loading ? <Spinner /> : data.length === 0 ? (
          <EmptyState title="Nothing added yet" body="Upload a before and after pair from a real job. It appears on the website with a drag-to-compare slider." />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
              <li key={item._id} className="overflow-hidden rounded-xl2 ring-1 ring-navy/8">
                <div className="grid grid-cols-2 gap-px bg-navy/8">
                  <img src={mediaUrl(item.beforeImage)} alt={`${item.title} before`} loading="lazy" className="aspect-square w-full object-cover" />
                  <img src={mediaUrl(item.afterImage)} alt={`${item.title} after`} loading="lazy" className="aspect-square w-full object-cover" />
                </div>
                <div className="flex items-start justify-between gap-2 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy">{item.title}</p>
                    <p className="text-xs capitalize text-slateink">{item.category}{!item.isPublished && ' · unpublished'}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => togglePublish(item._id)} aria-label={item.isPublished ? 'Unpublish' : 'Publish'} className="rounded-full p-1.5 text-slateink hover:bg-mist">
                      {item.isPublished ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button onClick={() => remove(item._id)} aria-label={`Delete ${item.title}`} className="rounded-full p-1.5 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
