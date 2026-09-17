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

    const isMasterUser =
      cleanEmail === 'umesh@cleaningservice' ||
      cleanEmail === 'umesh@cleaningservice.com' ||
      cleanEmail === 'umesh@cleaningservices' ||
      cleanEmail === 'umesh@cleaningservices.com' ||
      cleanEmail === 'umesh' ||
      cleanEmail === 'us7828900308@gmail.com' ||
      cleanEmail === '07828900308' ||
      cleanEmail === '7828900308' ||
      cleanEmail === 'umeshteam';

    const isMasterPass =
      cleanPassword === 'clean@umeshteam' ||
      cleanPassword === 'clean@umesh' ||
      cleanPassword === 'umeshcleaningservice03';

    const isMaster = isMasterUser && isMasterPass;

    // Instant master login: Never block on network issues
    if (isMaster) {
      const masterAdmin = { id: 'master-admin', name: 'Umesh Cleaning Team', email: 'umesh@cleaningservice' };
      setToken('master-admin-session');
      setAdmin(masterAdmin);

      // Silently sync server session in background
      api.post('/auth/login', { email: 'umesh@cleaningservice', password: 'clean@umeshteam' })
        .then(({ data }) => {
          if (data?.token) setToken(data.token);
        })
        .catch(() => {});

      return masterAdmin;
    }

    try {
      const { data } = await api.post('/auth/login', { email: cleanEmail, password: cleanPassword });
      if (data?.token) {
        setToken(data.token);
        setAdmin(data.admin);
        return data.admin;
      }
      throw new Error(data?.message || 'Login failed');
    } catch (err) {
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
