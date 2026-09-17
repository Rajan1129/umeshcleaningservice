import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trash2, RefreshCw, Phone, MessageCircle } from 'lucide-react';
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

  // Poll every 10 seconds for new incoming enquiries automatically
  const { data, loading, reload, error: fetchError } = useApi(
    `/bookings?status=${status}&search=${encodeURIComponent(query)}&limit=100`,
    { auth: true, pollInterval: 10000 }
  );

  const changeStatus = async (id, value) => {
    try {
      await api.patch(`/bookings/${id}/status`, { status: value });
      reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this enquiry? This cannot be undone.')) return;
    try {
      await api.del(`/bookings/${id}`);
      reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <Seo title="Enquiries | Umesh Cleaning Services admin" description="Manage enquiries" path="/admin/bookings" noindex />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy">Customer Enquiries</h1>
          <p className="text-sm text-slateink">
            {Array.isArray(data) ? `${data.length} total enquiries recorded` : 'Loading enquiries…'}
          </p>
        </div>
        <button
          type="button"
          onClick={reload}
          disabled={loading}
          className="btn-ghost inline-flex items-center gap-2 bg-white border border-navy/12 px-3.5 py-2 text-sm text-navy shadow-sm hover:bg-mist"
        >
          <RefreshCw className={`h-4 w-4 text-teal ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </button>
      </div>

      <Panel>
        <ErrorNote message={error || fetchError} />

        <div className="flex flex-wrap items-end gap-3">
          <form onSubmit={(e) => { e.preventDefault(); setQuery(search); }} className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35" aria-hidden="true" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, phone, area or service"
                aria-label="Search enquiries"
                className={`${input} pl-9`}
              />
            </div>
            <button type="submit" className="btn-primary px-4 py-2.5 text-sm">
              Search
            </button>
            {query && (
              <button
                type="button"
                onClick={() => { setSearch(''); setQuery(''); }}
                className="btn-ghost px-3 py-2.5 text-sm text-slateink"
              >
                Clear
              </button>
            )}
          </form>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
            className={`${input} w-auto capitalize`}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'All statuses' : s}
              </option>
            ))}
          </select>
        </div>

        {loading && (!data || data.length === 0) ? (
          <Spinner label="Loading enquiries…" />
        ) : !data || data.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="No enquiries found"
              body="New bookings submitted on the website or via WhatsApp will appear here automatically."
            />
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[48rem] text-left text-sm">
              <thead className="text-xs uppercase text-slateink bg-mist/50">
                <tr className="border-b border-navy/8">
                  <th scope="col" className="py-3 px-3">Customer</th>
                  <th scope="col" className="py-3 px-3">Service &amp; Area</th>
                  <th scope="col" className="py-3 px-3">Received</th>
                  <th scope="col" className="py-3 px-3">Quick Contact</th>
                  <th scope="col" className="py-3 px-3">Status</th>
                  <th scope="col" className="py-3 px-3 text-right"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/8">
                {data.map((b) => {
                  const cleanPhone = (b.whatsapp || b.phone || '').replace(/\D/g, '').slice(-10);
                  const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello ${b.name}, thank you for contacting Umesh Cleaning Services regarding ${b.service}.`)}`;

                  return (
                    <tr key={b._id} className="hover:bg-mist/30 transition-colors">
                      <td className="py-3.5 px-3">
                        <Link to={`/admin/bookings/${b._id}`} className="font-bold text-navy hover:text-teal block">
                          {b.name}
                        </Link>
                        <a href={`tel:${b.phone}`} className="text-xs font-semibold text-slateink hover:text-navy">
                          {b.phone}
                        </a>
                      </td>

                      <td className="py-3.5 px-3 text-slateink">
                        <p className="font-semibold text-navy">{b.service}</p>
                        <p className="text-xs text-slateink truncate max-w-xs">{b.address}</p>
                      </td>

                      <td className="py-3.5 px-3 text-xs text-slateink whitespace-nowrap">
                        <p className="font-medium text-navy">
                          {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </p>
                        <p>{new Date(b.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`WhatsApp ${b.name}`}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                          >
                            <MessageCircle className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                            WhatsApp
                          </a>
                          <a
                            href={`tel:${b.phone}`}
                            aria-label={`Call ${b.name}`}
                            className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100"
                          >
                            <Phone className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
                            Call
                          </a>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <select
                          value={b.status}
                          onChange={(e) => changeStatus(b._id, e.target.value)}
                          aria-label={`Status for ${b.name}`}
                          className={`${input} w-auto py-1 px-2 text-xs capitalize font-semibold`}
                        >
                          {STATUSES.filter((s) => s !== 'all').map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => remove(b._id)}
                          aria-label={`Delete enquiry from ${b.name}`}
                          className="rounded-full p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
