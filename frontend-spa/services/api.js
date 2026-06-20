// services/api.js
// Axios instance for the SPA (CDN axios is expected to be loaded globally)

const BASE_URL = 'http://localhost/UAS Web/backend-api/public/index.php';

const api = window.axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - attach Bearer token from localStorage if present
api.interceptors.request.use((config) => {
  try {
    let token = null;
    try { token = localStorage.getItem('token'); } catch (e) { token = null; }
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = 'Bearer ' + token;
    }
  } catch (e) {
    // ignore in environments without localStorage
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor - on 401 remove token and redirect to /login
api.interceptors.response.use((response) => response, (error) => {
  try {
    if (error && error.response && error.response.status === 401) {
      try { localStorage.removeItem('token'); } catch (e) {}
      try { localStorage.removeItem('redirect_after_login'); } catch (e) {}

      // Prefer router push if available, otherwise hash fallback
      try {
        if (typeof window !== 'undefined' && window.router && typeof window.router.push === 'function') {
          window.router.push('/login');
        } else {
          window.location.hash = '#/login';
        }
      } catch (e) {
        try { window.location.hash = '#/login'; } catch (e) {}
      }
    }
  } catch (e) {
    // swallow
  }
  return Promise.reject(error);
});

export default api;
