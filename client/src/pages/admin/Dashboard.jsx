import { Link } from 'react-router-dom';
import { Inbox, PhoneCall, CalendarCheck, CheckCircle2, XCircle, Layers } from 'lucide-react';
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
  const { data: stats, loading } = useApi('/bookings/stats', { auth: true, fallback: {} });
  const { data: recent, loading: loadingRecent } = useApi('/bookings?limit=6', { auth: true });

  return (
    <div className="space-y-6">
      <Seo title="Dashboard | Umesh Cleaning Services admin" description="Admin dashboard" path="/admin" noindex />
      <h1 className="text-2xl">Dashboard</h1>

      {loading ? <Spinner /> : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ key, label, icon: Icon }) => (
            <li key={key} className="card p-5">
              <Icon className="h-5 w-5 text-teal" aria-hidden="true" />
              <p className="mt-3 font-display text-3xl font-extrabold text-navy">{stats[key] ?? 0}</p>
              <p className="text-sm text-slateink">{label}</p>
            </li>
          ))}
        </ul>
      )}

      <Panel title="Latest enquiries" action={<Link to="/admin/bookings" className="btn-link text-sm">See all</Link>}>
        {loadingRecent ? <Spinner /> : recent.length === 0 ? (
          <EmptyState title="No enquiries yet" body="Requests sent through the booking form on the website appear here." />
        ) : (
          <ul className="divide-y divide-navy/8">
            {recent.map((b) => (
              <li key={b._id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <Link to={`/admin/bookings/${b._id}`} className="font-semibold text-navy hover:text-aqua">{b.name}</Link>
                  <p className="text-sm text-slateink">{b.service} · {b.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <a href={`tel:${b.phone}`} className="text-sm font-semibold text-aqua">{b.phone}</a>
                  <StatusBadge status={b.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
