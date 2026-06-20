// Categories.js
import api from '../services/api.js';

export default {
  data() {
    return {
      categories: [],
      loading: false,
      error: null,
      newName: '',
      processing: false,
      editingId: null,
      editName: '',
    };
  },
  async created() {
    await this.loadCategories();
  },
  template: `
    <div class="max-w-7xl mx-auto p-4">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold text-gray-800">Categories</h2>
      </div>

      <div class="mb-4 bg-white p-4 rounded-lg shadow-sm">
        <form @submit.prevent="createCategory" class="flex gap-2">
          <input v-model="newName" placeholder="New category name" required class="border rounded px-3 py-2 flex-1 focus:ring-2 focus:ring-sky-200" />
          <button :disabled="processing" class="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded">Add</button>
        </form>
        <div v-if="error" class="text-red-600 mt-2">{{ error }}</div>
      </div>

      <div v-if="loading" class="text-center py-8">Loading categories...</div>

      <div v-else class="space-y-3">
        <div v-for="cat in categories" :key="cat.id" class="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between hover:bg-sky-50 transition">
          <div>
            <div class="text-lg font-medium text-gray-800">{{ cat.name }}</div>
            <div class="text-xs text-gray-400">ID: {{ cat.id }}</div>
          </div>
          <div class="flex items-center gap-2">
            <button v-if="editingId !== cat.id" @click="startEdit(cat)" class="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded">Edit</button>
            <button v-else @click="updateCategory(cat.id)" class="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded">Save</button>
            <button v-if="editingId === cat.id" @click="cancelEdit" class="bg-gray-200 px-3 py-1 rounded">Cancel</button>
            <button @click="deleteCategory(cat.id)" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    async loadCategories() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get('/categories');
        // support multiple response shapes
        if (res && Array.isArray(res.data)) {
          this.categories = res.data;
        } else if (res && res.data && Array.isArray(res.data.data)) {
          this.categories = res.data.data;
        } else if (res && res.data && Array.isArray(res.data.items)) {
          this.categories = res.data.items;
        } else {
          this.categories = [];
        }
      } catch (err) {
        this.error = 'Failed to load categories';
        this.categories = [];
      } finally {
        this.loading = false;
      }
    },
    async createCategory() {
      if (!this.newName) return;
      this.processing = true;
      this.error = null;
      try {
        await api.post('/categories', { name: this.newName });
        this.newName = '';
        await this.loadCategories();
      } catch (err) {
        this.error = (err && err.response && err.response.data && err.response.data.message) ? err.response.data.message : 'Failed to create category';
      } finally {
        this.processing = false;
      }
    },
    startEdit(cat) {
      this.editingId = cat.id;
      this.editName = cat.name;
    },
    cancelEdit() {
      this.editingId = null;
      this.editName = '';
    },
    async updateCategory(id) {
      if (!this.editName) return;
      this.processing = true;
      this.error = null;
      try {
        await api.put(`/categories/${id}`, { name: this.editName });
        this.editingId = null;
        this.editName = '';
        await this.loadCategories();
      } catch (err) {
        this.error = (err && err.response && err.response.data && err.response.data.message) ? err.response.data.message : 'Failed to update category';
      } finally {
        this.processing = false;
      }
    },
    async deleteCategory(id) {
      if (!confirm('Delete this category?')) return;
      this.processing = true;
      this.error = null;
      try {
        await api.delete(`/categories/${id}`);
        await this.loadCategories();
      } catch (err) {
        this.error = (err && err.response && err.response.data && err.response.data.message) ? err.response.data.message : 'Failed to delete category';
      } finally {
        this.processing = false;
      }
    }
  }
};
