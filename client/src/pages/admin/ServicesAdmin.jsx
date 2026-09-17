import { useState } from 'react';
import { Pencil, Trash2, Eye, EyeOff, Plus, X } from 'lucide-react';
import Seo from '../../components/Seo.jsx';
import { useApi } from '../../hooks/useApi.js';
import { api } from '../../services/api.js';
import { Panel, Spinner, ErrorNote, EmptyState, input, label } from '../../components/admin/AdminUi.jsx';

const linesToArray = (text) => text.split('\n').map((l) => l.trim()).filter(Boolean);
const arrayToLines = (arr = []) => arr.join('\n');

const blank = { title: '', slug: '', icon: 'Sparkles', shortDescription: '', intro: '', includes: '', suitableFor: '', benefits: '', metaTitle: '', metaDescription: '', order: 0 };

export default function ServicesAdmin() {
  const { data, loading, reload } = useApi('/services', { auth: true });
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const startEdit = (service) => {
    setEditing(service?._id || 'new');
    setForm(service ? {
      ...blank, ...service,
      includes: arrayToLines(service.includes),
      suitableFor: arrayToLines(service.suitableFor),
      benefits: arrayToLines(service.benefits)
    } : blank);
    setFile(null);
    setError('');
  };

  const save = async (e) => {
    e.preventDefault();
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (['_id', '__v', 'createdAt', 'updatedAt', 'process', 'faqs'].includes(key)) return;
      if (['includes', 'suitableFor', 'benefits'].includes(key)) body.append(key, JSON.stringify(linesToArray(value || '')));
      else if (value !== undefined && value !== null) body.append(key, value);
    });
    if (file) body.append('image', file);

    try {
      if (editing === 'new') await api.postForm('/services', body);
      else await api.putForm(`/services/${editing}`, body);
      setEditing(null);
      reload();
    } catch (err) { setError(err.message); }
  };

  const toggle = async (id) => {
    try { await api.patch(`/services/${id}/toggle`, {}); reload(); } catch (err) { setError(err.message); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this service? It disappears from the website immediately.')) return;
    try { await api.del(`/services/${id}`); reload(); } catch (err) { setError(err.message); }
  };

  return (
    <div className="space-y-6">
      <Seo title="Services | Umesh Cleaning Services admin" description="Manage services" path="/admin/services" noindex />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl">Services</h1>
        <button onClick={() => startEdit(null)} className="btn-teal px-4 py-2.5 text-sm"><Plus className="h-4 w-4" aria-hidden="true" /> Add service</button>
      </div>

      <ErrorNote message={error} />

      {editing && (
        <Panel
          title={editing === 'new' ? 'New service' : 'Edit service'}
          action={<button onClick={() => setEditing(null)} aria-label="Close editor" className="rounded-full p-2 hover:bg-mist"><X className="h-4 w-4" /></button>}
        >
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            <div><label className={label} htmlFor="title">Title</label>
              <input id="title" required className={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><label className={label} htmlFor="slug">URL slug</label>
              <input id="slug" className={input} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="left blank = made from the title" /></div>
            <div><label className={label} htmlFor="icon">Lucide icon name</label>
              <input id="icon" className={input} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Sparkles, Home, Sofa…" /></div>
            <div><label className={label} htmlFor="order">Display order</label>
              <input id="order" type="number" className={input} value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></div>
            <div className="sm:col-span-2"><label className={label} htmlFor="shortDescription">Short description (service card)</label>
              <input id="shortDescription" required className={input} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} /></div>
            <div className="sm:col-span-2"><label className={label} htmlFor="intro">Introduction (service page)</label>
              <textarea id="intro" rows={3} className={input} value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} /></div>
            <div><label className={label} htmlFor="includes">What is included — one per line</label>
              <textarea id="includes" rows={5} className={input} value={form.includes} onChange={(e) => setForm({ ...form, includes: e.target.value })} /></div>
            <div><label className={label} htmlFor="benefits">Why it is useful — one per line</label>
              <textarea id="benefits" rows={5} className={input} value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} /></div>
            <div className="sm:col-span-2"><label className={label} htmlFor="suitableFor">Suitable for — one per line</label>
              <textarea id="suitableFor" rows={3} className={input} value={form.suitableFor} onChange={(e) => setForm({ ...form, suitableFor: e.target.value })} /></div>
            <div><label className={label} htmlFor="metaTitle">Meta title</label>
              <input id="metaTitle" className={input} value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} /></div>
            <div><label className={label} htmlFor="metaDescription">Meta description</label>
              <input id="metaDescription" className={input} value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} /></div>
            <div className="sm:col-span-2"><label className={label} htmlFor="image">Service photo</label>
              <input id="image" type="file" accept="image/*" className={input} onChange={(e) => setFile(e.target.files[0])} /></div>

            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="btn-teal px-5 py-2.5 text-sm">Save service</button>
              <button type="button" onClick={() => setEditing(null)} className="btn-ghost px-5 py-2.5 text-sm">Cancel</button>
            </div>
          </form>
        </Panel>
      )}

      <Panel>
        {loading ? <Spinner /> : data.length === 0 ? (
          <EmptyState title="No services yet" body="Run the seed script on the server to load the standard 13 services, or add one here." />
        ) : (
          <ul className="divide-y divide-navy/8">
            {data.map((s) => (
              <li key={s._id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="font-semibold text-navy">{s.title} {!s.isActive && <span className="ml-2 rounded-full bg-mist px-2 py-0.5 text-xs text-slateink">Hidden</span>}</p>
                  <p className="truncate text-sm text-slateink">/services/{s.slug}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggle(s._id)} aria-label={s.isActive ? `Hide ${s.title}` : `Show ${s.title}`} className="rounded-full p-2 text-slateink hover:bg-mist">
                    {s.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button onClick={() => startEdit(s)} aria-label={`Edit ${s.title}`} className="rounded-full p-2 text-slateink hover:bg-mist"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(s._id)} aria-label={`Delete ${s.title}`} className="rounded-full p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
