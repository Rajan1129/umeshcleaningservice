import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api.js';

/** Fetches a collection endpoint and keeps loading/error state. */
export function useApi(path, { auth = false, fallback = [], enabled = true } = {}) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    if (!enabled) return;
    setLoading(true);
    api.get(path, auth)
      .then((res) => { setData(res.data); setError(null); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [path, auth, enabled]);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, reload: load, setData };
}
