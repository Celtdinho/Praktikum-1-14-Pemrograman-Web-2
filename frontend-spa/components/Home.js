// Home.js
import api from '../services/api.js';

export default {
  data() {
    return {
      books: [],
      categories: [],
      loading: false,
      error: null,
      searchQuery: '',
      selectedCategory: null,
      // local borrow simulation map: id -> status
      borrowStates: {},
    };
  },
  async created() {
    await Promise.all([this.loadBooks(), this.loadCategories()]);
  },
  computed: {
    filteredBooks() {
      const q = (this.searchQuery || '').toLowerCase().trim();
      return this.books.filter(b => {
        const inCategory = this.selectedCategory ? (String(b.category_id) === String(this.selectedCategory)) : true;
        const titleMatch = !q || (b.title && b.title.toLowerCase().includes(q));
        return inCategory && titleMatch;
      });
    },
    popularBooks() {
      // prefer borrow_count if present
      const list = Array.isArray(this.books) ? this.books.slice() : [];
      if (list.length === 0) return [];
      if (list[0] && typeof list[0].borrow_count !== 'undefined') {
        list.sort((a,b) => (b.borrow_count || 0) - (a.borrow_count || 0));
        return list.slice(0,3);
      }
      return list.slice(0,3);
    }
  },
  template: `
    <div class="min-h-[80vh] bg-gradient-to-b from-sky-50 to-white">
      <div class="max-w-7xl mx-auto p-6">
        <!-- HERO with search and filter -->
        <section class="bg-gradient-to-r from-sky-200 via-sky-100 to-white rounded-lg p-6 mb-6 shadow-sm">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 class="text-4xl font-extrabold text-sky-700">E-Library System</h1>
              <p class="mt-2 text-gray-600 max-w-xl">Find books, filter by category, and preview borrowing status.</p>
            </div>
            <div class="w-full lg:w-1/2">
              <div class="flex gap-2">
                <input v-model="searchQuery" placeholder="Search books by title..." class="flex-1 rounded-lg px-4 py-2 border focus:ring-2 focus:ring-sky-300" />
                <select v-model="selectedCategory" class="rounded-lg px-3 py-2 border bg-white">
                  <option :value="null">All Categories</option>
                  <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
              <div class="mt-2 text-xs text-gray-500">Results: {{ filteredBooks.length }}</div>
            </div>
          </div>
        </section>

        <!-- Popular books -->
        <section class="mb-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-3">Most Borrowed Books</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="b in popularBooks" :key="b.id" class="bg-white rounded-lg shadow-sm p-4">
              <div class="h-32 bg-blue-100 flex items-center justify-center text-sky-700 font-bold mb-3">Image</div>
              <div class="font-bold text-gray-800">{{ b.title }}</div>
              <div class="text-sm text-gray-500">{{ b.author || 'Unknown' }} • {{ b.category_name || '-' }}</div>
              <div class="mt-3">
                <span :class="['px-3 py-1 rounded-full text-sm font-medium', (borrowStates[b.id] || b.status) === 'Available' ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-600']">{{ borrowStates[b.id] || b.status }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Book Grid -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Books</h2>
          <div v-if="loading" class="text-center py-8">Loading books...</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="b in filteredBooks" :key="b.id" class="bg-white rounded-lg shadow-sm transform transition hover:scale-[1.01] hover:shadow-md overflow-hidden">
              <div class="h-44 bg-blue-50 flex items-center justify-center text-sky-600 text-xl font-semibold">Image</div>
              <div class="p-4">
                <div class="text-lg font-bold text-gray-800">{{ b.title }}</div>
                <div class="text-sm text-gray-500 mt-1">{{ b.author || 'Unknown' }} • {{ b.category_name || '-' }}</div>
                <div class="mt-3 flex items-center justify-between">
                  <div class="text-xs text-gray-400">ID: {{ b.id }}</div>
                  <div class="flex items-center gap-2">
                    <button @click="borrow(b)" :disabled="(borrowStates[b.id] || b.status) !== 'Available'" class="px-3 py-1 rounded text-sm font-medium" :class="(borrowStates[b.id] || b.status) === 'Available' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-600'">{{ (borrowStates[b.id] || b.status) === 'Available' ? 'Borrow' : 'Borrowed' }}</button>
                    <span :class="['px-3 py-1 rounded-full text-sm font-medium', (borrowStates[b.id] || b.status) === 'Available' ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-600']">{{ borrowStates[b.id] || b.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  methods: {
    async loadBooks() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get('/books');
        if (res && Array.isArray(res.data)) this.books = res.data;
        else if (res && res.data && Array.isArray(res.data.data)) this.books = res.data.data;
        else if (res && res.data && Array.isArray(res.data.items)) this.books = res.data.items;
        else this.books = [];
      } catch (e) {
        this.error = 'Failed to load books';
        this.books = [];
      } finally {
        this.loading = false;
      }
    },
    async loadCategories() {
      try {
        const res = await api.get('/categories');
        if (res && Array.isArray(res.data)) this.categories = res.data;
        else if (res && res.data && Array.isArray(res.data.data)) this.categories = res.data.data;
        else this.categories = [];
      } catch (e) {
        this.categories = [];
      }
    },
    borrow(book) {
      if (!book || (this.borrowStates[book.id] || book.status) !== 'Available') return;
      // simulate borrow in UI only
      this.$set ? this.$set(this.borrowStates, book.id, 'Borrowed') : (this.borrowStates[book.id] = 'Borrowed');
      // keep the state for current session only
    }
  }
};
