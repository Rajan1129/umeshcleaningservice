import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="grid min-h-screen place-items-center text-slateink">Checking your session…</div>;
  if (!admin) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return children;
}
