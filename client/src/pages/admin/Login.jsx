import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader2, Sparkles } from 'lucide-react';
import Seo from '../../components/Seo.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';
import { input, label, ErrorNote } from '../../components/admin/AdminUi.jsx';

export default function Login() {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (admin) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const cleanEmail = form.email.trim();
    const cleanPass = form.password.trim();
    if (!cleanEmail || !cleanPass) {
      setError('Please enter both username and password.');
      setLoading(false);
      return;
    }
    try {
      await login(cleanEmail, cleanPass);
      navigate('/admin');
    } catch (err) {
      const msg = err?.message || 'Login failed. Please verify username and password.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="Admin sign in | Umesh Cleaning Services" description="Admin access" path="/admin/login" noindex />
      <div className="grid min-h-screen place-items-center bg-mist px-4">
        <form onSubmit={submit} className="card w-full max-w-sm p-7">
          <img
            src="/images/logo.png"
            alt="Umesh Cleaning Services Logo"
            className="h-14 w-auto object-contain mx-auto mb-2"
          />
          <h1 className="mt-2 text-xl text-center">Sign in</h1>
          <p className="mt-1.5 text-sm text-slateink">Manage enquiries, services and photos.</p>

          <div className="mt-6 space-y-4">
            <ErrorNote message={error} />
            <div>
              <label htmlFor="email" className={label}>Username / Email</label>
              <input id="email" type="text" autoComplete="username" placeholder="umesh@cleaningservice" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
            </div>
            <div>
              <label htmlFor="password" className={label}>Password</label>
              <input id="password" type="password" autoComplete="current-password" required value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} className={input} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-70">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Signing in</> : 'Sign in'}
          </button>
        </form>
      </div>
    </>
  );
}
