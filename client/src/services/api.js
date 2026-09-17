const BASE_URL = import.meta.env.VITE_API_URL || '/api';
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

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined
  });

  let payload = {};
  try { payload = await res.json(); } catch { /* empty body */ }

  if (!res.ok) {
    const error = new Error(payload.message || 'Request failed. Please try again.');
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
