import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import staticServices from '../data/services.json';

/**
 * Services come from MongoDB so the owner can edit them.
 * The bundled JSON is the same content the database is seeded with, and is used
 * as an immediate first paint and as a fallback if the API is unreachable.
 */
export function useServices() {
  const [services, setServices] = useState(staticServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    api.get('/services')
      .then(({ data }) => { if (alive && data?.length) setServices(data); })
      .catch(() => { /* keep bundled content */ })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return { services, loading };
}

export function useService(slug) {
  const [service, setService] = useState(() => staticServices.find((s) => s.slug === slug) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setService(staticServices.find((s) => s.slug === slug) || null);
    api.get(`/services/${slug}`)
      .then(({ data }) => { if (alive && data) setService(data); })
      .catch(() => { /* keep bundled content */ })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [slug]);

  return { service, loading };
}
