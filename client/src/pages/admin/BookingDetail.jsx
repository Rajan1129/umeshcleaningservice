import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Trash2 } from 'lucide-react';
import Seo from '../../components/Seo.jsx';
import { useApi } from '../../hooks/useApi.js';
import { api } from '../../services/api.js';
import { Panel, StatusBadge, Spinner, ErrorNote, input, label } from '../../components/admin/AdminUi.jsx';

const STATUSES = ['new', 'contacted', 'scheduled', 'completed', 'cancelled'];

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: booking, loading, reload } = useApi(`/bookings/${id}`, { auth: true, fallback: null });
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  if (loading || !booking) return <Spinner label="Loading enquiry" />;

  const setStatus = async (status) => {
    try { await api.patch(`/bookings/${id}/status`, { status }); reload(); }
    catch (err) { setError(err.message); }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    try { await api.post(`/bookings/${id}/notes`, { text: note }, true); setNote(''); reload(); }
    catch (err) { setError(err.message); }
  };

  const remove = async () => {
    if (!window.confirm('Delete this enquiry? This cannot be undone.')) return;
    try { await api.del(`/bookings/${id}`); navigate('/admin/bookings'); }
    catch (err) { setError(err.message); }
  };

  const rows = [
    ['Phone', <a key="p" href={`tel:${booking.phone}`} className="text-aqua">{booking.phone}</a>],
    ['WhatsApp', booking.whatsapp || '—'],
    ['Service', booking.service],
    ['Preferred date', booking.preferredDate ? new Date(booking.preferredDate).toLocaleDateString('en-IN') : '—'],
    ['Preferred time', booking.preferredTime || '—'],
    ['Address', booking.address],
    ['Message', booking.message || '—'],
    ['Received', new Date(booking.createdAt).toLocaleString('en-IN')]
  ];

  return (
    <div className="space-y-6">
      <Seo title={`Enquiry from ${booking.name} | admin`} description="Enquiry detail" path={`/admin/bookings/${id}`} noindex />
      <Link to="/admin/bookings" className="btn-link text-sm"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to enquiries</Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl">{booking.name}</h1>
        <StatusBadge status={booking.status} />
      </div>

      <ErrorNote message={error} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Enquiry details">
          <dl className="divide-y divide-navy/8 text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-3">
                <dt className="font-semibold text-navy">{k}</dt>
                <dd className="text-slateink">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            <a href={`tel:${booking.phone}`} className="btn-primary px-4 py-2.5 text-sm"><Phone className="h-4 w-4" aria-hidden="true" /> Call</a>
            <a href={`https://wa.me/91${(booking.whatsapp || booking.phone).replace(/\D/g, '').slice(-10)}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-4 py-2.5 text-sm">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
            </a>
            <button onClick={remove} className="btn bg-red-50 px-4 py-2.5 text-sm text-red-700 hover:bg-red-100">
              <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
            </button>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="Status">
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${booking.status === s ? 'bg-navy text-white' : 'bg-mist text-slateink hover:text-navy'}`}>
                  {s}
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="Notes">
            <form onSubmit={addNote}>
              <label htmlFor="note" className={label}>Add a note</label>
              <textarea id="note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} className={input}
                placeholder="What was discussed on the call, agreed date, scope, anything to remember" />
              <button type="submit" className="btn-teal mt-3 px-4 py-2.5 text-sm">Save note</button>
            </form>

            <ul className="mt-5 space-y-3">
              {booking.notes?.length ? booking.notes.slice().reverse().map((n) => (
                <li key={n._id} className="rounded-xl2 bg-mist p-3 text-sm">
                  <p className="text-slateink">{n.text}</p>
                  <p className="mt-1 text-xs text-navy/50">{new Date(n.createdAt).toLocaleString('en-IN')}</p>
                </li>
              )) : <li className="text-sm text-slateink">No notes yet.</li>}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
