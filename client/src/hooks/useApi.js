import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api.js';

/** Fetches a collection endpoint and keeps loading/error state. */
export function useApi(path, { auth = false, fallback = [], enabled = true, pollInterval = 0 } = {}) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  const load = useCallback((silent = false) => {
    if (!enabled) return;
    if (!silent) setLoading(true);
    api.get(path, auth)
      .then((res) => {
        if (res && res.data !== undefined) {
          setData(res.data);
        }
        setError(null);
      })
      .catch((err) => {
        // Only set error on explicit/initial load, never during background auto-polling
        if (!silent) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!silent) setLoading(false);
      });
  }, [path, auth, enabled]);

  useEffect(() => { load(false); }, [load]);

  useEffect(() => {
    if (!pollInterval || pollInterval <= 0) return;
    const interval = setInterval(() => { load(true); }, pollInterval);
    return () => clearInterval(interval);
  }, [load, pollInterval]);

  return { data, loading, error, reload: () => load(false), setData };
}
