// router.js - sets up routes for the SPA using hash history (no server config required)
const { createRouter, createWebHashHistory } = window.VueRouter;

import Home from './components/Home.js';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import Bookmarks from './components/Bookmarks.js';

import auth from './services/auth.js';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/bookmarks', component: Bookmarks, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Expose router globally for CDN non-module components to navigate safely
try {
  if (typeof window !== 'undefined') {
    window.router = window.router || router;
  }
} catch (e) {
  // ignore
}

// Basic navigation guard foundation: redirect to /login when route requires auth
router.beforeEach((to, from, next) => {
  // Defensive retrieval of auth: prefer window.auth, fallback to imported module
  let authObj = null;
  try {
    if (typeof window !== 'undefined' && window.auth && typeof window.auth.isAuthenticated === 'function') {
      authObj = window.auth;
    } else if (auth && typeof auth.isAuthenticated === 'function') {
      authObj = auth;
    } else {
      authObj = null;
    }
  } catch (e) {
    authObj = (typeof window !== 'undefined' && window.auth) ? window.auth : null;
  }

  const requiresAuth = !!(to.meta && to.meta.requiresAuth);

  if (!requiresAuth) {
    return next();
  }

  // Safe check for authentication
  let isAuth = false;
  try {
    if (authObj && typeof authObj.isAuthenticated === 'function') {
      isAuth = !!authObj.isAuthenticated();
    }
  } catch (e) {
    isAuth = false;
  }

  if (!isAuth) {
    // store redirect target for post-login redirect only if not already set
    try {
      const existing = localStorage.getItem('redirect_after_login');
      if (!existing) {
        // store only the route path
        localStorage.setItem('redirect_after_login', to.path || '/');
      }
    } catch (e) {
      // ignore
    }
    return next({ path: '/login' });
  }

  return next();
});

export default router;
