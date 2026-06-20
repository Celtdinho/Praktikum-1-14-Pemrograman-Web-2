// Login.js
import api from '../services/api.js';
import auth from '../services/auth.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      error: null,
    };
  },
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 via-white to-white p-4">
      <div class="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-sky-700 mb-4 text-center">E-Library Login</h2>
        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">Username</label>
            <input v-model="username" required class="mt-1 block w-full border rounded px-3 py-2 focus:ring-2 focus:ring-sky-400" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Password</label>
            <input v-model="password" type="password" required class="mt-1 block w-full border rounded px-3 py-2 focus:ring-2 focus:ring-sky-400" />
          </div>
          <div v-if="error" class="text-sm text-red-600">{{ error }}</div>
          <div>
            <button :disabled="loading" type="submit" class="w-full bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded">
              <span v-if="!loading">Sign in</span>
              <span v-else>Signing in...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  methods: {
    async submit() {
      this.error = null;
      this.loading = true;
      try {
        const payload = { username: this.username, password: this.password };
        const res = await api.post('/login', payload);
        // Expected response: { status: true, token: '...' }
        if (res && res.data && res.data.status && res.data.token) {
          const token = res.data.token;
          // Persist token via auth helper and explicit localStorage write
          try { auth.setToken(token); } catch (e) { /* ignore */ }
          try { localStorage.setItem('token', token); } catch (e) { /* ignore */ }

          // After successful login, redirect to stored route if exists
          try {
            const redirect = localStorage.getItem('redirect_after_login');
            if (redirect) {
              // Clear redirect only AFTER successful login handling
              localStorage.removeItem('redirect_after_login');
              if (typeof window !== 'undefined' && window.router && typeof window.router.push === 'function') {
                window.router.push(redirect);
              } else {
                window.location.hash = '#'+redirect;
              }
              return;
            }
          } catch (e) {
            // ignore and continue to default redirect
          }

          // default redirect
          try {
            if (typeof window !== 'undefined' && window.router && typeof window.router.push === 'function') {
              window.router.push('/dashboard');
            } else {
              window.location.hash = '#/dashboard';
            }
          } catch (e) {
            // fallback
            try { window.location.hash = '#/dashboard'; } catch (e) {}
          }
        } else {
          this.error = (res && res.data && res.data.message) ? res.data.message : 'Login failed';
        }
      } catch (err) {
        this.error = (err && err.response && err.response.data && err.response.data.message) ? err.response.data.message : 'Login error';
      } finally {
        this.loading = false;
      }
    }
  }
};
