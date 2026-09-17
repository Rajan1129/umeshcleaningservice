import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Sparkles, Mail, MapPin, Star, Lock, LogIn } from 'lucide-react';
import { BUSINESS, whatsappLink } from '../utils/constants.js';
import { useAuth } from '../hooks/useAuth.jsx';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/before-after', label: 'Before & After' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { admin } = useAuth();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Contact Bar */}
      <div className="hidden bg-navy-900 text-white/85 text-xs py-2 border-b border-white/10 sm:block">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-green-500" aria-hidden="true" />
              {BUSINESS.city}, {BUSINESS.state}
            </span>
            <a href={BUSINESS.emailHref} className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
              <Mail className="h-3.5 w-3.5 text-green-500" aria-hidden="true" />
              {BUSINESS.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1 text-slate-300">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              <strong className="text-white font-semibold">{BUSINESS.rating}/5</strong> ({BUSINESS.reviewCount} Google reviews)
            </span>
            <a href={BUSINESS.phoneHref} className="flex items-center gap-1 text-green-400 font-semibold hover:text-green-300 transition-colors">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {BUSINESS.phoneDisplay}
            </a>
            <Link
              to={admin ? '/admin' : '/admin/login'}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors border-l border-white/20 pl-3 font-medium"
            >
              <Lock className="h-3 w-3 text-green-400" aria-hidden="true" />
              {admin ? 'Dashboard' : 'Login'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-navy/8 bg-white/95 backdrop-blur">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo on Left Side */}
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={`${BUSINESS.name} home`}>
            <img
              src="/images/logo.png"
              alt={`${BUSINESS.name} Logo`}
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain rounded-md"
            />
            <span className="leading-tight hidden sm:block">
              <span className="block font-display text-[1.12rem] lg:text-[1.2rem] font-extrabold tracking-tight text-navy">Umesh Cleaning</span>
              <span className="block text-xs font-semibold text-green-700">Services · Jalandhar</span>
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-[0.92rem] font-semibold transition-colors ${
                    isActive ? 'bg-mist text-navy font-bold' : 'text-slateink hover:text-navy hover:bg-mist/60'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden items-center gap-2.5 lg:flex shrink-0">
            <a href={BUSINESS.phoneHref} className="btn-call px-4 py-2.5 text-sm font-semibold">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call now
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-4 py-2.5 text-sm font-semibold">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
            </a>
            <Link
              to={admin ? '/admin' : '/admin/login'}
              className="rounded-full px-3.5 py-2 text-xs font-bold text-navy hover:bg-mist transition-colors ring-1 ring-navy/15 flex items-center gap-1.5"
              title="Admin Login"
            >
              <Lock className="h-3.5 w-3.5 text-green-600" aria-hidden="true" />
              {admin ? 'Admin' : 'Login'}
            </Link>
          </div>

          {/* Mobile Right Action Buttons (Call now + Hamburger) */}
          <div className="flex items-center gap-2 lg:hidden">
            <a href={BUSINESS.phoneHref} className="btn-call px-3 py-2 text-xs font-bold">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Call now
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-xl2 ring-1 ring-navy/12"
            >
              {open ? <X className="h-5 w-5 text-navy" /> : <Menu className="h-5 w-5 text-navy" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="border-t border-navy/8 bg-white lg:hidden">
            <ul className="container-x grid gap-1 py-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `block rounded-xl2 px-4 py-2.5 font-semibold ${isActive ? 'bg-mist text-navy font-bold' : 'text-slateink'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2 border-t border-navy/8 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <a href={BUSINESS.phoneHref} className="btn-call py-2.5 text-xs text-center">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Call now
                  </a>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-2.5 text-xs text-center">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> WhatsApp
                  </a>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <a href={BUSINESS.emailHref} className="text-xs text-slateink hover:text-navy">
                    {BUSINESS.email}
                  </a>
                  <Link
                    to={admin ? '/admin' : '/admin/login'}
                    className="text-xs font-bold text-navy hover:text-green-700 flex items-center gap-1 bg-mist px-3 py-1.5 rounded-lg"
                  >
                    <Lock className="h-3 w-3 text-green-600" aria-hidden="true" />
                    {admin ? 'Dashboard' : 'Admin Login'}
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
