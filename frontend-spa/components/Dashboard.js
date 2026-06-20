// Dashboard.js
import api from '../services/api.js';
import auth from '../services/auth.js';
import BooksManagement from './Books.js';
import CategoriesManagement from './Categories.js';

export default {
  components: {
    'books-management': BooksManagement,
    'categories-management': CategoriesManagement,
  },
  data() {
    return {
      activeTab: 'books',
      isAuth: false,
      loading: false,
      error: null,
      totalBooks: null,
      totalCategories: null,
      totalUsers: null,
    };
  },
  async created() {
    // determine auth state
    try {
      if (typeof window !== 'undefined' && window.auth && typeof window.auth.isAuthenticated === 'function') {
        this.isAuth = !!window.auth.isAuthenticated();
      } else if (auth && typeof auth.isAuthenticated === 'function') {
        this.isAuth = !!auth.isAuthenticated();
      }
    } catch (e) {
      this.isAuth = false;
    }

    await this.loadStats();
  },
  template: `
    <div class="max-w-7xl mx-auto p-6 bg-gradient-to-b from-white to-sky-50">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-extrabold text-sky-700">Dashboard</h2>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-600">{{ isAuth ? 'Logged in' : 'Guest' }}</span>
          <button v-if="isAuth" @click="logout" class="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded">Logout</button>
        </div>
      </div>

      <div v-if="loading" class="text-center py-8">Loading statistics...</div>

      <div v-else>
        <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-sky-600 text-white p-3 flex items-center gap-3">
              <div class="w-10 h-10 bg-sky-700 rounded-md flex items-center justify-center">📚</div>
              <div class="text-sm font-medium">Total Books</div>
            </div>
            <div class="p-4">
              <div class="text-3xl font-bold text-gray-800">{{ totalBooks !== null ? totalBooks : '—' }}</div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-sky-600 text-white p-3 flex items-center gap-3">
              <div class="w-10 h-10 bg-sky-700 rounded-md flex items-center justify-center">📁</div>
              <div class="text-sm font-medium">Total Categories</div>
            </div>
            <div class="p-4">
              <div class="text-3xl font-bold text-gray-800">{{ totalCategories !== null ? totalCategories : '—' }}</div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-sky-600 text-white p-3 flex items-center gap-3">
              <div class="w-10 h-10 bg-sky-700 rounded-md flex items-center justify-center">👥</div>
              <div class="text-sm font-medium">Total Users</div>
            </div>
            <div class="p-4">
              <div class="text-3xl font-bold text-gray-800">{{ totalUsers !== null ? totalUsers : 'N/A' }}</div>
            </div>
          </div>
        </div>

        <!-- Admin management tabs -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <div class="flex gap-2 border-b pb-3 mb-4">
            <button @click="activeTab = 'books'" :class="activeTab === 'books' ? 'border-b-2 border-sky-600 text-sky-600' : 'text-gray-600'" class="px-3 py-2">Books Management</button>
            <button @click="activeTab = 'categories'" :class="activeTab === 'categories' ? 'border-b-2 border-sky-600 text-sky-600' : 'text-gray-600'" class="px-3 py-2">Categories Management</button>
          </div>

          <div>
            <books-management v-if="activeTab === 'books'"></books-management>
            <categories-management v-if="activeTab === 'categories'"></categories-management>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    async loadStats() {
      this.loading = true;
      this.error = null;
      try {
        // Fetch books and categories in parallel
        const [booksRes, categoriesRes] = await Promise.all([
          api.get('/books'),
          api.get('/categories'),
        ]);

        const countFrom = (res) => {
          if (!res) return 0;
          try {
            if (Array.isArray(res.data)) return res.data.length;
            if (res.data && Array.isArray(res.data.data)) return res.data.data.length;
            if (res.data && Array.isArray(res.data.items)) return res.data.items.length;
          } catch (e) {}
          return 0;
        };

        this.totalBooks = countFrom(booksRes);
        this.totalCategories = countFrom(categoriesRes);

        // Try fetching users if endpoint exists
        try {
          const usersRes = await api.get('/users');
          this.totalUsers = countFrom(usersRes);
        } catch (e) {
          this.totalUsers = 'N/A';
        }
      } catch (err) {
        this.error = 'Failed to load statistics';
        this.totalBooks = null;
        this.totalCategories = null;
        this.totalUsers = null;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      // clear redirect memory
      try { localStorage.removeItem('redirect_after_login'); } catch (e) {}

      // prefer centralized helper to remove token
      try {
        if (auth && typeof auth.removeToken === 'function') {
          auth.removeToken();
        } else {
          try { localStorage.removeItem('token'); } catch (e) {}
        }
      } catch (e) { try { localStorage.removeItem('token'); } catch (e) {} }

      // call logout helper if available (window.auth for CDN fallback)
      const logoutFn = (typeof window !== 'undefined' && window.auth && typeof window.auth.logout === 'function')
        ? window.auth.logout
        : ((auth && typeof auth.logout === 'function') ? auth.logout : null);

      if (logoutFn) {
        try { logoutFn(); } catch (e) {}
      } else {
        try {
          if (typeof window !== 'undefined' && window.router && typeof window.router.push === 'function') {
            window.router.push('/login');
          } else {
            window.location.hash = '#/login';
          }
        } catch (e) { try { window.location.hash = '#/login'; } catch (e) {} }
      }

      // reset UI auth state
      this.isAuth = false;
    }
  }
};
