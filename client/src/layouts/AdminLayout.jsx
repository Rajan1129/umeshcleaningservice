import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Inbox, Wrench, Images, SplitSquareHorizontal, Star, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';

const LINKS = [
  { to: '/admin', end: true, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/bookings', label: 'Enquiries', icon: Inbox },
  { to: '/admin/services', label: 'Services', icon: Wrench },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/before-after', label: 'Before & After', icon: SplitSquareHorizontal },
  { to: '/admin/reviews', label: 'Reviews', icon: Star }
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const signOut = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-mist">
      <ScrollToTop />
      <header className="sticky top-0 z-40 border-b border-navy/10 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" className="grid h-10 w-10 place-items-center rounded-xl2 ring-1 ring-navy/12 lg:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to="/admin" className="font-display font-extrabold text-navy">Umesh Cleaning · Admin</Link>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="hidden text-slateink hover:text-navy sm:block">View website</Link>
            <span className="hidden text-slateink sm:block">{admin?.email}</span>
            <button onClick={signOut} className="btn-ghost px-4 py-2 text-sm">
              <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <nav aria-label="Admin" className={`${open ? 'block' : 'hidden'} w-full shrink-0 lg:block lg:w-60`}>
          <ul className="space-y-1">
            {LINKS.map(({ to, end, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl2 px-4 py-3 text-sm font-semibold ${
                      isActive ? 'bg-navy text-white' : 'text-slateink hover:bg-white hover:text-navy'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" /> {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main className={`${open ? 'hidden' : 'block'} min-w-0 flex-1 lg:block`}><Outlet /></main>
      </div>
    </div>
  );
}
