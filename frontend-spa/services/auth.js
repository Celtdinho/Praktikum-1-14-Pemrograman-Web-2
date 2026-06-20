// services/auth.js
// Centralized auth utilities using localStorage

const TOKEN_KEY = 'token';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    // ignore
  }
}

export function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    // ignore
  }
}

export function isAuthenticated() {
  return !!getToken();
}

export function logout() {
  removeToken();
  // redirect to login using hash route to avoid full reload
  try { window.location.hash = '#/login'; } catch (e) {}
}

export default {
  getToken,
  setToken,
  removeToken,
  isAuthenticated,
  logout,
};

// Expose globally for non-module CDN usage and to avoid "auth is undefined" errors
try {
  if (typeof window !== 'undefined') {
    window.auth = window.auth || {};
    // copy functions to window.auth but avoid overwriting existing implementations
    window.auth.getToken = window.auth.getToken || getToken;
    window.auth.setToken = window.auth.setToken || setToken;
    window.auth.removeToken = window.auth.removeToken || removeToken;
    window.auth.isAuthenticated = window.auth.isAuthenticated || isAuthenticated;
    window.auth.logout = window.auth.logout || logout;

    // Provide a global logout shortcut
    window.logout = window.logout || logout;
  }
} catch (e) {
  // ignore if window is not available
}
