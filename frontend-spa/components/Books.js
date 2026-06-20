// Books.js
import api from '../services/api.js';

export default {
  data() {
    return {
      books: [],
      categories: [],
      loading: false,
      error: null,
      processing: false,
      // create form
      form: {
        title: '',
        author: '',
        publisher: '',
        category_id: null,
        status: 'Available',
      },
      // edit state
      editingId: null,
      editForm: {
        title: '',
        author: '',
        publisher: '',
        category_id: null,
        status: 'Available',
      },
    };
  },
  async created() {
    await Promise.all([this.loadCategories(), this.loadBooks()]);
  },
  template: `
    <div class="max-w-7xl mx-auto p-4">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold text-gray-800">Books</h2>
      </div>

      <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h3 class="font-medium text-gray-700 mb-3">Add New Book</h3>
        <form @submit.prevent="createBook" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input v-model="form.title" placeholder="Title" required class="border rounded px-3 py-2" />
          <input v-model="form.author" placeholder="Author" class="border rounded px-3 py-2" />
          <input v-model="form.publisher" placeholder="Publisher" class="border rounded px-3 py-2" />
          <select v-model="form.category_id" class="border rounded px-3 py-2">
            <option :value="null">Select category</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
          <select v-model="form.status" class="border rounded px-3 py-2">
            <option>Available</option>
            <option>Borrowed</option>
          </select>
          <div class="flex items-center">
            <button :disabled="processing" class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded">Add Book</button>
          </div>
        </form>
        <div v-if="error" class="text-red-600 mt-2">{{ error }}</div>
      </div>

      <div v-if="loading" class="text-center py-8">Loading books...</div>

      <div v-else class="space-y-4">
        <div v-for="b in books" :key="b.id" class="bg-white rounded-lg shadow-sm p-4 hover:bg-sky-50 transition">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-24 h-24 bg-blue-50 flex items-center justify-center text-sky-600 rounded">Image</div>
              <div>
                <div class="text-lg font-bold text-gray-800">{{ b.title }}</div>
                <div class="text-sm text-gray-500 mt-1">{{ b.author || 'Unknown' }} • {{ b.category_name || '-' }}</div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div :class="['px-3 py-1 rounded-full text-sm font-medium', b.status === 'Available' ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-600']">{{ b.status }}</div>
              <div class="flex items-center gap-2">
                <button v-if="editingId !== b.id" @click="startEdit(b)" class="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded">Edit</button>
                <button v-else @click="updateBook(b.id)" class="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded">Save</button>
                <button v-if="editingId === b.id" @click="cancelEdit" class="bg-gray-200 px-3 py-1 rounded">Cancel</button>
                <button @click="deleteBook(b.id)" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          </div>

          <div v-if="editingId === b.id" class="w-full mt-3">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input v-model="editForm.title" class="border rounded px-2 py-1" />
              <input v-model="editForm.author" class="border rounded px-2 py-1" />
              <input v-model="editForm.publisher" class="border rounded px-2 py-1" />
              <select v-model="editForm.category_id" class="border rounded px-2 py-1">
                <option :value="null">Select category</option>
                <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
              <select v-model="editForm.status" class="border rounded px-2 py-1">
                <option>Available</option>
                <option>Borrowed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    async loadBooks() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get('/books');
        if (res && Array.isArray(res.data)) {
          this.books = res.data;
        } else if (res && res.data && Array.isArray(res.data.data)) {
          this.books = res.data.data;
        } else if (res && res.data && Array.isArray(res.data.items)) {
          this.books = res.data.items;
        } else {
          this.books = [];
        }
      } catch (err) {
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
    async createBook() {
      if (!this.form.title) { this.error = 'Title is required'; return; }
      this.processing = true;
      this.error = null;
      try {
        await api.post('/books', this.form);
        this.form.title = '';
        this.form.author = '';
        this.form.publisher = '';
        this.form.category_id = null;
        this.form.status = 'Available';
        await this.loadBooks();
      } catch (err) {
        this.error = (err && err.response && err.response.data && err.response.data.message) ? err.response.data.message : 'Failed to create book';
      } finally {
        this.processing = false;
      }
    },
    startEdit(book) {
      this.editingId = book.id;
      this.editForm.title = book.title;
      this.editForm.author = book.author;
      this.editForm.publisher = book.publisher;
      this.editForm.category_id = book.category_id || null;
      this.editForm.status = book.status || 'Available';
    },
    cancelEdit() {
      this.editingId = null;
      this.editForm = { title: '', author: '', publisher: '', category_id: null, status: 'Available' };
    },
    async updateBook(id) {
      if (!this.editForm.title) { this.error = 'Title is required'; return; }
      this.processing = true;
      this.error = null;
      try {
        await api.put(`/books/${id}`, this.editForm);
        this.cancelEdit();
        await this.loadBooks();
      } catch (err) {
        this.error = (err && err.response && err.response.data && err.response.data.message) ? err.response.data.message : 'Failed to update book';
      } finally {
        this.processing = false;
      }
    },
    async deleteBook(id) {
      if (!confirm('Delete this book?')) return;
      this.processing = true;
      this.error = null;
      try {
        await api.delete(`/books/${id}`);
        await this.loadBooks();
      } catch (err) {
        this.error = (err && err.response && err.response.data && err.response.data.message) ? err.response.data.message : 'Failed to delete book';
      } finally {
        this.processing = false;
      }
    }
  }
};
