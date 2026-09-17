import { Link } from 'react-router-dom';
import { Inbox, PhoneCall, CalendarCheck, CheckCircle2, XCircle, Layers, RefreshCw, MessageCircle, Phone } from 'lucide-react';
import Seo from '../../components/Seo.jsx';
import { useApi } from '../../hooks/useApi.js';
import { Panel, Spinner, StatusBadge, EmptyState } from '../../components/admin/AdminUi.jsx';

const CARDS = [
  { key: 'total', label: 'Total enquiries', icon: Layers },
  { key: 'new', label: 'New', icon: Inbox },
  { key: 'contacted', label: 'Contacted', icon: PhoneCall },
  { key: 'scheduled', label: 'Scheduled', icon: CalendarCheck },
  { key: 'completed', label: 'Completed', icon: CheckCircle2 },
  { key: 'cancelled', label: 'Cancelled', icon: XCircle }
];

export default function Dashboard() {
  const { data: stats, loading, reload: reloadStats } = useApi('/bookings/stats', {
    auth: true,
    fallback: {},
    pollInterval: 10000
  });

  const { data: recent, loading: loadingRecent, reload: reloadRecent } = useApi('/bookings?limit=6', {
    auth: true,
    fallback: [],
    pollInterval: 10000
  });

  const handleRefresh = () => {
    reloadStats();
    reloadRecent();
  };

  const isRefreshing = loading || loadingRecent;

  return (
    <div className="space-y-6">
      <Seo title="Dashboard | Umesh Cleaning Services admin" description="Admin dashboard" path="/admin" noindex />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy">Admin Dashboard</h1>
          <p className="text-sm text-slateink">Overview of customer bookings &amp; performance</p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="btn-ghost inline-flex items-center gap-2 bg-white border border-navy/12 px-3.5 py-2 text-sm text-navy shadow-sm hover:bg-mist"
        >
          <RefreshCw className={`h-4 w-4 text-teal ${isRefreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {loading && !stats ? (
        <Spinner label="Loading overview…" />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ key, label, icon: Icon }) => (
            <li key={key} className="card p-5">
              <Icon className="h-5 w-5 text-teal" aria-hidden="true" />
              <p className="mt-3 font-display text-3xl font-extrabold text-navy">{stats?.[key] ?? 0}</p>
              <p className="text-sm text-slateink">{label}</p>
            </li>
          ))}
        </ul>
      )}

      <Panel
        title="Latest enquiries"
        action={
          <Link to="/admin/bookings" className="btn-link text-sm font-semibold">
            See all ({recent?.length || 0})
          </Link>
        }
      >
        {loadingRecent && (!recent || recent.length === 0) ? (
          <Spinner label="Checking for new enquiries…" />
        ) : !recent || recent.length === 0 ? (
          <EmptyState
            title="No enquiries yet"
            body="Requests sent through the website booking form or WhatsApp appear here automatically."
          />
        ) : (
          <ul className="divide-y divide-navy/8">
            {recent.map((b) => {
              const cleanPhone = (b.whatsapp || b.phone || '').replace(/\D/g, '').slice(-10);
              const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello ${b.name}, thank you for contacting Umesh Cleaning Services regarding ${b.service}.`)}`;

              return (
                <li key={b._id} className="flex flex-wrap items-center justify-between gap-3 py-3.5 hover:bg-mist/20 px-2 rounded-lg transition-colors">
                  <div className="min-w-0 flex-1">
                    <Link to={`/admin/bookings/${b._id}`} className="font-bold text-navy hover:text-teal">
                      {b.name}
                    </Link>
                    <p className="text-sm text-slateink">
                      <span className="font-medium text-navy">{b.service}</span> · {b.address}
                    </p>
                    <p className="text-xs text-slateink/80 mt-0.5">
                      {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}{' '}
                      at {new Date(b.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
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
                    <StatusBadge status={b.status} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </div>
  );
}
