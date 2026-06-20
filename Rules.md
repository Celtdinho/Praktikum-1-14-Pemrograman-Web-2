# RULES.md

# GLOBAL PROJECT RULES

Project ini adalah tugas UAS Pemrograman Web 2.

Seluruh implementasi HARUS mengikuti aturan berikut.

---

# TECHNOLOGY RULES

Backend wajib menggunakan:

* PHP 8+
* CodeIgniter 4
* MySQL atau MariaDB

Frontend wajib menggunakan:

* VueJS 3 via CDN
* Vue Router via CDN
* Axios via CDN
* TailwindCSS via CDN

DILARANG menggunakan:

* React
* NextJS
* Angular
* Nuxt
* Bootstrap
* jQuery
* Laravel
* ExpressJS
* Vite
* Webpack

Frontend harus berbasis CDN dan SPA sederhana.

---

# ARCHITECTURE RULES

Gunakan Decoupled Architecture.

Backend dan frontend harus dipisah.

Struktur:

backend-api/
frontend-spa/

CodeIgniter hanya berfungsi sebagai API Server.

Jangan membuat View CI4.

Jangan menggunakan Blade atau template engine.

Semua komunikasi data harus melalui REST API.

---

# DATABASE RULES

Gunakan minimal 3 tabel:

users
categories
books

Relasi:

categories -> books

Gunakan Foreign Key.

Gunakan Migration.

Gunakan Seeder.

---

# API RULES

Semua endpoint harus mengembalikan JSON.

Jangan mengembalikan HTML.

Format response sukses:

{
"status": true,
"message": "Success",
"data": []
}

Format response gagal:

{
"status": false,
"message": "Error message"
}

Gunakan HTTP Status Code yang sesuai.

200 OK

201 Created

401 Unauthorized

404 Not Found

422 Validation Error

500 Internal Server Error

---

# CONTROLLER RULES

Gunakan ResourceController untuk:

Books

Categories

Gunakan controller terpisah untuk:

AuthController

Jangan menulis seluruh logika dalam routes.

Gunakan Model untuk akses database.

---

# AUTHENTICATION RULES

Gunakan Bearer Token sederhana.

Jangan menggunakan JWT.

Jangan menggunakan Sanctum.

Jangan menggunakan Passport.

Jangan menggunakan OAuth.

Token dapat berupa:

md5(
username +
current_timestamp +
random_string
)

Simpan token pada tabel users.

---

# AUTH FILTER RULES

Buat AuthFilter.

Filter wajib:

1. Membaca Authorization Header
2. Mengambil Bearer Token
3. Validasi token ke database
4. Return 401 jika token tidak valid

Proteksi endpoint:

POST

PUT

DELETE

---

# CORS RULES

Aktifkan CORS global.

Allow:

GET

POST

PUT

DELETE

OPTIONS

Frontend tidak boleh mengalami CORS Error.

---

# FRONTEND RULES

Gunakan VueJS 3 CDN.

Gunakan Vue Router.

Gunakan Axios.

Gunakan TailwindCSS.

Jangan menggunakan Bootstrap.

Jangan menggunakan CSS Framework lain.

---

# SPA RULES

Aplikasi harus Single Page Application.

Perpindahan halaman harus menggunakan Vue Router.

Tidak boleh menggunakan hard reload.

Tidak boleh menggunakan window.location untuk navigasi utama.

Gunakan router.push().

---

# ROUTER RULES

Public Route:

/
/login

Protected Route:

/dashboard
/books
/categories

Semua route admin harus:

meta: {
requiresAuth: true
}

---

# NAVIGATION GUARD RULES

Gunakan:

router.beforeEach()

Jika token tidak ditemukan:

Redirect ke /login

Jika token ditemukan:

Lanjutkan akses.

---

# AXIOS RULES

Gunakan satu instance Axios global.

File:

services/api.js

Semua request harus menggunakan instance tersebut.

Jangan membuat axios baru pada setiap komponen.

---

# REQUEST INTERCEPTOR RULES

Sebelum request:

1. Ambil token dari localStorage
2. Tambahkan Authorization Header

Contoh:

Authorization: Bearer TOKEN

Harus otomatis.

Jangan menulis Authorization secara manual pada setiap request.

---

# RESPONSE INTERCEPTOR RULES

Jika response 401:

1. Hapus token
2. Tampilkan alert
3. Redirect login

Harus berlaku global.

---

# LOCAL STORAGE RULES

Saat login:

localStorage.setItem(
"token",
token
)

Saat logout:

localStorage.removeItem(
"token"
)

Jangan menyimpan password.

---

# UI RULES

Gunakan TailwindCSS.

Komponen harus memiliki:

* Responsive layout
* Card
* Table
* Modal
* Form Input
* Button

Tampilan harus modern dan rapi.

---

# BOOKS PAGE RULES

Fitur wajib:

* List buku
* Tambah buku
* Edit buku
* Hapus buku

Field:

title
author
publisher
category_id
status

Status:

Available
Borrowed

---

# CATEGORIES PAGE RULES

Fitur wajib:

* List kategori
* Tambah kategori
* Edit kategori
* Hapus kategori

Field:

name

---

# CODE QUALITY RULES

Gunakan struktur kode modular.

Jangan membuat file terlalu besar.

Pisahkan:

Controllers

Models

Filters

Components

Services

Gunakan nama file yang jelas.

---

# DEVELOPMENT ORDER

Agent HARUS mengikuti urutan berikut:

1. Database
2. Migration
3. Seeder
4. Models
5. Auth API
6. Auth Filter
7. CORS
8. Categories API
9. Books API
10. API Testing
11. Frontend Setup
12. Router
13. Login
14. Dashboard
15. Categories Page
16. Books Page
17. Axios Interceptor
18. Navigation Guard
19. Logout
20. UI Polish

Jangan mengerjakan frontend sebelum backend selesai.

---

# FINAL GOAL

Project harus memenuhi seluruh persyaratan UAS:

* REST API CI4
* Resource Controller
* Vue Router
* Axios
* TailwindCSS
* Login
* Logout
* Bearer Token
* Navigation Guard
* Axios Interceptor
* CRUD
* 3 Tabel Relasi

Project harus siap dipresentasikan dalam video maksimal 7 menit dan siap diunggah ke GitHub.
