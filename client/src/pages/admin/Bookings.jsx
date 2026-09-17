import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trash2 } from 'lucide-react';
import Seo from '../../components/Seo.jsx';
import { useApi } from '../../hooks/useApi.js';
import { api } from '../../services/api.js';
import { Panel, StatusBadge, Spinner, EmptyState, ErrorNote, input } from '../../components/admin/AdminUi.jsx';

const STATUSES = ['all', 'new', 'contacted', 'scheduled', 'completed', 'cancelled'];

export default function Bookings() {
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const { data, loading, reload } = useApi(`/bookings?status=${status}&search=${encodeURIComponent(query)}&limit=100`, { auth: true });

  const changeStatus = async (id, value) => {
    try { await api.patch(`/bookings/${id}/status`, { status: value }); reload(); }
    catch (err) { setError(err.message); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this enquiry? This cannot be undone.')) return;
    try { await api.del(`/bookings/${id}`); reload(); }
    catch (err) { setError(err.message); }
  };

  return (
    <div className="space-y-6">
      <Seo title="Enquiries | Umesh Cleaning Services admin" description="Manage enquiries" path="/admin/bookings" noindex />
      <h1 className="text-2xl">Enquiries</h1>

      <Panel>
        <ErrorNote message={error} />
        <div className="flex flex-wrap items-end gap-3">
          <form onSubmit={(e) => { e.preventDefault(); setQuery(search); }} className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35" aria-hidden="true" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, area or service"
                aria-label="Search enquiries" className={`${input} pl-9`} />
            </div>
            <button type="submit" className="btn-primary px-4 py-2.5 text-sm">Search</button>
          </form>
          <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className={`${input} w-auto capitalize`}>
            {STATUSES.map((s) => <option key={s} value={s}>{s === 'all' ? 'All statuses' : s}</option>)}
          </select>
        </div>

        {loading ? <Spinner /> : data.length === 0 ? (
          <div className="mt-6"><EmptyState title="Nothing matches" body="Try a different status or search term. New requests from the website arrive here automatically." /></div>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[42rem] text-left text-sm">
              <thead className="text-xs uppercase text-slateink">
                <tr className="border-b border-navy/8">
                  <th scope="col" className="py-3 pr-4">Customer</th>
                  <th scope="col" className="py-3 pr-4">Service</th>
                  <th scope="col" className="py-3 pr-4">Received</th>
                  <th scope="col" className="py-3 pr-4">Status</th>
                  <th scope="col" className="py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/8">
                {data.map((b) => (
                  <tr key={b._id}>
                    <td className="py-3 pr-4">
                      <Link to={`/admin/bookings/${b._id}`} className="font-semibold text-navy hover:text-aqua">{b.name}</Link>
                      <p className="text-slateink"><a href={`tel:${b.phone}`}>{b.phone}</a> · {b.address}</p>
                    </td>
                    <td className="py-3 pr-4 text-slateink">{b.service}</td>
                    <td className="py-3 pr-4 text-slateink">{new Date(b.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="py-3 pr-4">
                      <select value={b.status} onChange={(e) => changeStatus(b._id, e.target.value)}
                        aria-label={`Status for ${b.name}`} className={`${input} w-auto py-1.5 capitalize`}>
                        {STATUSES.filter((s) => s !== 'all').map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="py-3 text-right">
                      <button onClick={() => remove(b._id)} aria-label={`Delete enquiry from ${b.name}`} className="rounded-full p-2 text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
