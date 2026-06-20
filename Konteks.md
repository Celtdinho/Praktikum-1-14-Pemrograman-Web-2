# PROJECT CONTEXT - UAS PEMROGRAMAN WEB 2

## Deskripsi Proyek

Buat aplikasi web Full Stack dengan arsitektur Decoupled Architecture (Backend dan Frontend terpisah) untuk memenuhi seluruh persyaratan Ujian Akhir Semester Mata Kuliah Pemrograman Web 2.

Tema yang dipilih:

"E-Library - Sistem Informasi Rental Buku dan Komik Digital"

Fokus aplikasi adalah pengelolaan data buku, kategori buku, dan autentikasi administrator menggunakan REST API.

---

# Teknologi Wajib

## Backend

* PHP 8+
* CodeIgniter 4
* MySQL / MariaDB
* RESTful API
* Resource Controller
* Filters
* CORS Configuration

## Frontend

* VueJS 3 via CDN
* Vue Router
* Axios
* TailwindCSS via CDN

---

# Arsitektur

Backend dan frontend harus dipisah.

Struktur project:

backend-api/
frontend-spa/

Frontend berkomunikasi dengan backend hanya melalui REST API menggunakan Axios.

Tidak boleh menggunakan rendering view CodeIgniter.

CodeIgniter hanya berfungsi sebagai API Server.

---

# Database Design

## users

id
username
password
token
role
created_at
updated_at

## categories

id
name
created_at
updated_at

## books

id
title
author
publisher
category_id
status
created_at
updated_at

Relasi:

categories (1) -> (many) books

Foreign Key:

books.category_id -> categories.id

Status buku:

Available
Borrowed

---

# Authentication

Sistem login menggunakan Bearer Token.

JWT tidak wajib digunakan.

Token sederhana diperbolehkan.

Contoh:

md5(time() + username)

Saat login berhasil:

1. Generate token
2. Simpan token ke database
3. Return token ke frontend

Contoh response:

{
"status": true,
"token": "generated_token"
}

---

# Backend Requirements

## Auth Endpoint

POST /login

Request:

{
"username": "admin",
"password": "admin123"
}

Response:

{
"status": true,
"token": "xxxxx"
}

---

# Books API

GET /books

GET /books/{id}

POST /books

PUT /books/{id}

DELETE /books/{id}

Gunakan ResourceController.

---

# Categories API

GET /categories

GET /categories/{id}

POST /categories

PUT /categories/{id}

DELETE /categories/{id}

Gunakan ResourceController.

---

# Security

Buat AuthFilter.

Endpoint berikut harus diproteksi:

POST
PUT
DELETE

Filter harus:

1. Membaca Authorization Header
2. Mengambil Bearer Token
3. Memvalidasi token ke tabel users
4. Menolak request jika token tidak valid

Response gagal:

HTTP 401

{
"status": false,
"message": "Unauthorized"
}

---

# CORS

Aktifkan CORS global pada CodeIgniter.

Frontend VueJS harus dapat mengakses API tanpa error CORS.

---

# Frontend Requirements

Buat Single Page Application (SPA).

Gunakan Vue Router.

Tidak boleh hard reload.

---

# Routes

Public Routes:

/
/login

Protected Routes:

/dashboard
/books
/categories

---

# Navigation Guard

Gunakan:

meta: {
requiresAuth: true
}

Implementasikan:

router.beforeEach()

Aturan:

Jika route membutuhkan login dan token tidak ada:

Redirect ke /login

---

# Axios Configuration

Buat file:

services/api.js

Konfigurasi:

baseURL API

Request Interceptor:

* Ambil token dari localStorage
* Tambahkan Authorization Bearer Token otomatis

Response Interceptor:

Jika mendapat status 401:

* Hapus token
* Alert "Session expired"
* Redirect ke login

---

# Local Storage

Saat login berhasil:

localStorage.setItem("token", token)

Saat logout:

localStorage.removeItem("token")

---

# UI Requirements

Gunakan TailwindCSS.

Tidak menggunakan CSS tradisional sebagai styling utama.

Komponen wajib:

## Home

Landing page publik.

Menampilkan:

* Total Buku
* Total Kategori
* Informasi aplikasi

---

## Login

Form:

Username
Password

Tombol Login

---

## Dashboard

Card statistik:

Total Buku
Total Kategori
Total Buku Dipinjam

---

## Books

Tabel data buku.

Kolom:

Judul
Penulis
Penerbit
Kategori
Status
Aksi

Fitur:

Tambah
Edit
Hapus

Gunakan modal Tailwind.

---

## Categories

Tabel kategori.

Fitur:

Tambah
Edit
Hapus

Gunakan modal Tailwind.

---

# Folder Structure

frontend-spa/

index.html

router.js

services/
api.js

components/

Home.js
Login.js
Dashboard.js
Books.js
Categories.js

---

backend-api/

app/

Controllers/

AuthController.php
Books.php
Categories.php

Filters/

AuthFilter.php

Models/

UserModel.php
BookModel.php
CategoryModel.php

---

# Seed Data

Admin Default

username:
admin

password:
admin123

Kategori:

Action
Adventure
Fantasy
Comedy

Contoh Buku:

Naruto
One Piece
Solo Leveling
Laskar Pelangi

---

# Deliverables

Project harus siap untuk:

1. Login
2. Logout
3. CRUD Categories
4. CRUD Books
5. Dashboard Statistics
6. Protected Routes
7. Bearer Token Authentication
8. Axios Interceptor
9. Vue Router Navigation Guard
10. REST API CodeIgniter 4
11. TailwindCSS Interface

Semua kode harus production-ready, rapi, modular, dan mudah dipresentasikan dalam video UAS maksimal 7 menit.
