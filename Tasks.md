# TASKS.md

# UAS WEB 2 - E-LIBRARY

Status: PHASE 19 COMPLETE

---

# PHASE 1 - PROJECT INITIALIZATION

Goal:
Menyiapkan struktur proyek sesuai ketentuan UAS.

Tasks:

* [x] Buat folder backend-api
* [x] Buat folder frontend-spa
* [x] Install CodeIgniter 4 pada backend-api
* [x] Siapkan database MySQL
* [x] Buat file README.md
* [x] Pastikan backend dan frontend berjalan secara terpisah

Deliverable:

backend-api/
frontend-spa/

Completed: 2026-06-20

---

# PHASE 2 - DATABASE DESIGN

Goal:
Membuat database dengan minimal 3 tabel berelasi.

Tasks:

* [x] Buat tabel users
* [x] Buat tabel categories
* [x] Buat tabel books
* [x] Tambahkan foreign key books.category_id
* [x] Buat migration
* [x] Buat seed data

Acceptance Criteria:

* Relasi database berjalan
* Migration sukses
* Seeder sukses
 
Completed: 2026-06-20
---

# PHASE 3 - MODELS

Goal:
Membuat model untuk seluruh tabel.

Tasks:

* [x] UserModel
* [x] CategoryModel
* [x] BookModel

Acceptance Criteria:

* Semua model dapat digunakan CRUD


Completed: 2026-06-20


# PHASE 4 - AUTHENTICATION API

Goal:
Membuat sistem login berbasis Bearer Token.

Tasks:

* [x] Buat AuthController
* [x] Endpoint POST /login
* [x] Validasi username
* [x] Validasi password
* [x] Generate token
* [x] Simpan token ke database
* [x] Return JSON token

Acceptance Criteria:

POST /login berhasil mengembalikan token.


Completed: 2026-06-20

# PHASE 5 - AUTH FILTER

Goal:
Mengamankan endpoint manipulasi data.

Tasks:

* [x] Buat AuthFilter
* [x] Baca Authorization Header
* [x] Ambil Bearer Token
* [x] Validasi token
* [x] Return 401 jika token tidak valid

Acceptance Criteria:

Request tanpa token ditolak.

Response:

HTTP 401

{
"status": false,
"message": "Unauthorized"
}


Completed: 2026-06-20

# PHASE 6 - CORS CONFIGURATION

Goal:
Mengizinkan VueJS mengakses API.

Tasks:

* [x] Konfigurasi CORS
* [x] Tambahkan header Access-Control-Allow-Origin
* [x] Tambahkan method GET POST PUT DELETE

Acceptance Criteria:

Tidak ada error CORS.


Completed: 2026-06-20

# PHASE 7 - CATEGORY API

Goal:
Membuat CRUD kategori.

Tasks:

* [x] Category Resource Controller
* [x] GET /categories
* [x] GET /categories/{id}
* [x] POST /categories
* [x] PUT /categories/{id}
* [x] DELETE /categories/{id}

Acceptance Criteria:

CRUD kategori berjalan penuh.


Completed: 2026-06-20

# PHASE 8 - BOOK API

Goal:
Membuat CRUD buku.

Tasks:

* [x] Book Resource Controller
* [x] GET /books
* [x] GET /books/{id}
* [x] POST /books
* [x] PUT /books/{id}
* [x] DELETE /books/{id}
* [x] Join kategori

Acceptance Criteria:

CRUD buku berjalan penuh.


Completed: 2026-06-20

# PHASE 9 - API TESTING

Goal:
Memastikan seluruh endpoint berjalan.

Tasks:

* [x] Test login
* [x] Test categories
* [x] Test books
* [x] Test protected route
* [x] Test unauthorized response

Acceptance Criteria:

Semua endpoint lulus testing.


Completed: 2026-06-20


# PHASE 10 - FRONTEND SETUP

Goal:
Membuat SPA VueJS.

Tasks:

* [x] Install struktur frontend
* [x] Setup VueJS CDN
* [x] Setup Tailwind CDN
* [x] Setup Axios
* [x] Setup Vue Router

Acceptance Criteria:

SPA berjalan.


Completed: 2026-06-20


# PHASE 11 - ROUTER

Goal:
Membuat routing aplikasi.

Tasks:
 
* [x] Route /
* [x] Route /login
* [x] Route /dashboard
* [x] Route /books
* [x] Route /categories

Acceptance Criteria:

Semua route dapat diakses.

Completed: 2026-06-20

---

# PHASE 12 - NAVIGATION GUARD

Goal:
Mengamankan halaman admin.

Tasks:

* [x] Tambahkan meta.requiresAuth
* [x] Implementasikan beforeEach
* [x] Redirect ke login jika tidak memiliki token

Acceptance Criteria:

User ilegal tidak dapat membuka dashboard.

Completed: 2026-06-20

---

# PHASE 13 - AXIOS INTERCEPTOR

Goal:
Mengotomatisasi token.

Tasks:

* [x] Buat services/api.js
* [x] Request Interceptor
* [x] Response Interceptor
* [x] Auto inject Bearer Token
* [x] Auto handle 401

Acceptance Criteria:

Token otomatis terkirim.

401 otomatis logout.

Completed: 2026-06-20

---

# PHASE 14 - LOGIN PAGE

Goal:
Membuat halaman login.

Tasks:

* [x] Form username
* [x] Form password
* [x] Submit login
* [x] Simpan token ke localStorage
* [x] Redirect dashboard

Acceptance Criteria:

Login berhasil.

Completed: 2026-06-20

---

# PHASE 15 - DASHBOARD PAGE

Goal:
Menampilkan statistik.

Tasks:

* [x] Card Total Buku
* [x] Card Total Kategori
* [x] Card Buku Dipinjam

Acceptance Criteria:

Statistik tampil dari API.

Completed: 2026-06-20

---

# PHASE 16 - CATEGORY PAGE

Goal:
CRUD kategori dari frontend.

Tasks:

* [x] Tabel kategori
* [x] Modal tambah
* [x] Modal edit
* [x] Delete kategori

Acceptance Criteria:

CRUD kategori berjalan penuh.

Completed: 2026-06-20

---

# PHASE 17 - BOOK PAGE

Goal:
CRUD buku dari frontend.

Tasks:

* [x] Tabel buku
* [x] Modal tambah
* [x] Modal edit
* [x] Delete buku
* [x] Dropdown kategori

Acceptance Criteria:

CRUD buku berjalan penuh.

Completed: 2026-06-20

---

# PHASE 18 - LOGOUT

Goal:
Mengakhiri sesi login.

Tasks:

* [x] Tombol logout
* [x] Hapus token
* [x] Redirect login

Acceptance Criteria:

Logout berhasil.

Completed: 2026-06-20

---

# PHASE 19 - UI POLISH

Goal:
Mempercantik tampilan.

Tasks:

* [x] Responsive layout
* [x] Sidebar
* [x] Navbar
* [x] Tailwind cards
* [x] Tailwind tables
* [x] Tailwind modals

Acceptance Criteria:

UI terlihat modern dan rapi.

Completed: 2026-06-20

---

# PHASE 19.2 - HOME & ADMIN RESTRUCTURE

Goal:
Enhance Home page for user features (search, filter, borrow UI) and consolidate admin CRUD into Dashboard.

Tasks:

* [x] Home: search bar
* [x] Home: category filter
* [x] Home: borrow button (UI only)
* [x] Home: Top 3 most borrowed books
* [x] Dashboard: consolidate Books + Categories CRUD into tabs
* [x] Books page converted to Bookmarks (read-only)
* [x] Removed Categories from top navigation

Acceptance Criteria:

Home has search, filter, borrow UI, and top-3 section. Dashboard hosts all CRUD. Books route replaced with Bookmarks. Categories removed from navigation.

Completed: 2026-06-20

---

# PHASE 20 - FINAL VALIDATION

Goal:
Memastikan seluruh syarat UAS terpenuhi.

Checklist:

* [ ] REST API CI4
* [ ] Resource Controller
* [ ] Vue Router
* [ ] Axios
* [ ] TailwindCSS
* [ ] Login
* [ ] Logout
* [ ] Bearer Token
* [ ] Navigation Guard
* [ ] Axios Interceptor
* [ ] CRUD
* [ ] 3 tabel relasi

Project Status:

READY FOR GITHUB SUBMISSION
