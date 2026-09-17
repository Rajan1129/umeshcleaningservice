// Always use same-origin /api. Vite proxies /api in dev, and Vercel serverless handles /api in production.
const BASE_URL = '/api';
const TOKEN_KEY = 'ucs_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const mediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  if (path.startsWith('/images/') || path.startsWith('/og-image') || path.startsWith('/favicon')) return path;
  return path;
};

async function request(path, { method = 'GET', body, auth = false, isForm = false } = {}) {
  const headers = {};
  if (!isForm && body) headers['Content-Type'] = 'application/json';
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
    const isNetwork = netErr.name === 'TypeError' || netErr.message === 'Load failed' || netErr.message === 'Failed to fetch';
    const message = isNetwork
      ? (path.includes('/auth/login') ? 'Connection error. Please verify your credentials or try again.' : 'Network connection error. Retrying…')
      : netErr.message;
    const err = new Error(message);
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
