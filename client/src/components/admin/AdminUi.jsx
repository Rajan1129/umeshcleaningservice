import { Loader2 } from 'lucide-react';

export const input = 'w-full rounded-xl2 border border-navy/12 bg-white px-3.5 py-2.5 text-sm text-navy focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25';
export const label = 'mb-1.5 block text-sm font-semibold text-navy';

export const Panel = ({ title, action, children }) => (
  <section className="card p-5 sm:p-6">
    {(title || action) && (
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        {title && <h2 className="text-lg">{title}</h2>}
        {action}
      </div>
    )}
    {children}
  </section>
);

export const StatusBadge = ({ status }) => {
  const styles = {
    new: 'bg-aqua-100 text-aqua-700',
    contacted: 'bg-amber-100 text-amber-700',
    scheduled: 'bg-teal-100 text-teal-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700'
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${styles[status] || 'bg-mist text-slateink'}`}>{status}</span>;
};

export const Spinner = ({ label = 'Loading' }) => (
  <p className="flex items-center gap-2 py-6 text-sm text-slateink">
    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> {label}…
  </p>
);

export const ErrorNote = ({ message }) =>
  message ? <p role="alert" className="mb-4 rounded-xl2 bg-red-50 p-3 text-sm text-red-700">{message}</p> : null;

export const EmptyState = ({ title, body }) => (
  <div className="rounded-xl2 border-2 border-dashed border-navy/12 p-8 text-center">
    <p className="font-display font-bold text-navy">{title}</p>
    <p className="mx-auto mt-2 max-w-md text-sm text-slateink">{body}</p>
  </div>
);
