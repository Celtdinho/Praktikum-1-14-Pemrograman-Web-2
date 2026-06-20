// Bookmarks.js - read-only bookmarks / saved previews page
import api from '../services/api.js';

export default {
  data() {
    return {
      bookmarks: [],
      loading: false,
      error: null,
    };
  },
  async created() {
    await this.loadBookmarks();
  },
  template: `
    <div class="max-w-7xl mx-auto p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold text-gray-800">Bookmarks</h2>
      </div>

      <div v-if="loading" class="text-center py-8">Loading bookmarks...</div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="b in bookmarks" :key="b.id" class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="h-40 bg-blue-50 flex items-center justify-center text-sky-600">Image</div>
          <div class="p-4">
            <div class="text-lg font-bold text-gray-800">{{ b.title }}</div>
            <div class="text-sm text-gray-500 mt-1">{{ b.author || 'Unknown' }} • {{ b.category_name || '-' }}</div>
            <div class="mt-3">
              <span :class="['px-3 py-1 rounded-full text-sm font-medium', b.status === 'Available' ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-600']">{{ b.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    async loadBookmarks() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get('/books');
        if (res && Array.isArray(res.data)) this.bookmarks = res.data;
        else if (res && res.data && Array.isArray(res.data.data)) this.bookmarks = res.data.data;
        else if (res && res.data && Array.isArray(res.data.items)) this.bookmarks = res.data.items;
        else this.bookmarks = [];
      } catch (e) {
        this.error = 'Failed to load bookmarks';
        this.bookmarks = [];
      } finally {
        this.loading = false;
      }
    }
  }
};
