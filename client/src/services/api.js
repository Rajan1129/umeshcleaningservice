const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  // If in browser on HTTPS and envUrl is HTTP, ignore it to prevent browser mixed-content "Load failed" error
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && envUrl && envUrl.startsWith('http:')) {
    return '/api';
  }
  return envUrl || '/api';
};

const BASE_URL = getBaseUrl();
const TOKEN_KEY = 'ucs_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const mediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  if (path.startsWith('/images/') || path.startsWith('/og-image') || path.startsWith('/favicon')) return path;
  return `${BASE_URL.replace(/\/api\/?$/, '')}${path}`;
};

async function request(path, { method = 'GET', body, auth = false, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: isForm ? body : body ? JSON.stringify(body) : undefined
    });
  } catch (netErr) {
    // Translate browser network errors (like Safari's "Load failed") into informative messages
    const isNetwork = netErr.name === 'TypeError' || netErr.message === 'Load failed' || netErr.message === 'Failed to fetch';
    const err = new Error(isNetwork ? 'Network error. Please check your internet connection and try again.' : netErr.message);
    err.isNetwork = true;
    throw err;
  }

  let payload = {};
  try { payload = await res.json(); } catch { /* empty body */ }

  if (!res.ok) {
    const error = new Error(payload.message || `Request failed with status ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return payload;
}

export const api = {
  get: (path, auth) => request(path, { auth }),
  post: (path, body, auth) => request(path, { method: 'POST', body, auth }),
  postForm: (path, body, auth = true) => request(path, { method: 'POST', body, auth, isForm: true }),
  put: (path, body, auth = true) => request(path, { method: 'PUT', body, auth }),
  putForm: (path, body, auth = true) => request(path, { method: 'PUT', body, auth, isForm: true }),
  patch: (path, body, auth = true) => request(path, { method: 'PATCH', body, auth }),
  del: (path, auth = true) => request(path, { method: 'DELETE', auth })
};
