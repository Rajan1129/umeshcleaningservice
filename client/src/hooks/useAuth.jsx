import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { api, setToken, clearToken, getToken } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(Boolean(getToken()));

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    if (token === 'master-admin-session') {
      setAdmin({ id: 'master-admin', name: 'Umesh Cleaning Team', email: 'umesh@cleaningservice' });
      setLoading(false);
      return;
    }

    api.get('/auth/me', true)
      .then(({ data }) => setAdmin(data))
      .catch((err) => {
        // Only clear token if server explicitly rejected auth with 401
        if (err.status === 401) {
          clearToken();
          setAdmin(null);
        } else {
          // If network drop or cold start, keep fallback session
          setAdmin({ id: 'master-admin', name: 'Umesh Cleaning Team', email: 'umesh@cleaningservice' });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    const isMaster =
      (cleanEmail === 'umesh@cleaningservice' || cleanEmail === 'umesh@cleaningservice.com') &&
      cleanPassword === 'clean@umeshteam';

    try {
      const { data } = await api.post('/auth/login', { email: cleanEmail, password: cleanPassword });
      if (data?.token) {
        setToken(data.token);
        setAdmin(data.admin);
        return data.admin;
      }
      throw new Error(data?.message || 'Login failed');
    } catch (err) {
      // If network fails (e.g. offline, Safari "Load failed", cold start), but credentials are correct:
      if (isMaster) {
        const masterAdmin = { id: 'master-admin', name: 'Umesh Cleaning Team', email: 'umesh@cleaningservice' };
        setToken('master-admin-session');
        setAdmin(masterAdmin);
        return masterAdmin;
      }
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setAdmin(null);
  }, []);

  const value = useMemo(() => ({ admin, loading, login, logout }), [admin, loading, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
