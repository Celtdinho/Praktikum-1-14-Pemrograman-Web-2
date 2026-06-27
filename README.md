# 📚 E-Perpus

Sistem Informasi Perpustakaan Digital berbasis **CodeIgniter 4** yang dikembangkan sebagai implementasi **Praktikum Pemrograman Web 2 Modul 1–14**.

![CodeIgniter](https://img.shields.io/badge/CodeIgniter-4-DD4814?style=for-the-badge\&logo=codeigniter\&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?style=for-the-badge\&logo=php\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge\&logo=bootstrap\&logoColor=white)

---

## 📖 Deskripsi Proyek

**E-Perpus** merupakan aplikasi perpustakaan digital yang dibangun menggunakan framework CodeIgniter 4. Sistem ini memungkinkan pengelolaan data buku, kategori, autentikasi pengguna, serta layanan REST API.

Proyek ini dibuat untuk memenuhi seluruh materi dan implementasi **Praktikum Pemrograman Web 2 Modul 1–14**.

---

## ✨ Fitur Utama

### 🔐 Autentikasi Pengguna

* Login dan logout
* Session management
* Proteksi halaman admin
* Validasi pengguna

### 📚 Manajemen Buku

* Menampilkan daftar buku
* Menambahkan data buku
* Mengubah data buku
* Menghapus data buku
* Detail informasi buku
* Relasi buku dengan kategori

### 🗂️ Manajemen Kategori

* CRUD kategori
* Validasi input
* Relasi one-to-many dengan buku

### 🌐 REST API

* API Books
* API Categories
* Resource Controller
* JSON Response
* Error Handling
* API Testing

### 🎨 Antarmuka Pengguna

* Responsive Design
* Bootstrap 5
* Dashboard Admin
* Template Layout
* Navigasi Dinamis

### 🗄️ Database

* Migration
* Seeder
* Query Builder
* Relasi Antar Tabel

---

## 🧪 Implementasi Modul Praktikum

| Modul | Materi                     | Status |
| ----- | -------------------------- | ------ |
| 1     | Pengenalan CodeIgniter 4   | ✅      |
| 2     | MVC dan Routing            | ✅      |
| 3     | View dan Template          | ✅      |
| 4     | Database & Migration       | ✅      |
| 5     | CRUD Dasar                 | ✅      |
| 6     | Form Validation            | ✅      |
| 7     | Session dan Authentication | ✅      |
| 8     | Relasi Data                | ✅      |
| 9     | Resource Controller        | ✅      |
| 10    | REST API                   | ✅      |
| 11    | JSON Response              | ✅      |
| 12    | API Testing                | ✅      |
| 13    | Deployment Preparation     | ✅      |
| 14    | Integrasi Proyek Akhir     | ✅      |

---

## 🏗️ Struktur Proyek

```text
E-Perpus
│
├── app
│   ├── Controllers
│   ├── Models
│   ├── Views
│   └── Config
│
├── public
├── writable
├── tests
└── database
    ├── migrations
    └── seeders
```

---

## ⚙️ Instalasi

### Clone Repository

```bash
git clone https://github.com/Celtdinho/Praktikum-1-14-Pemrograman-Web-2.git
```

### Masuk ke Folder Proyek

```bash
cd Praktikum-1-14-Pemrograman-Web-2
```

### Install Dependency

```bash
composer install
```

### Konfigurasi Environment

```bash
cp env .env
```

### Atur Koneksi Database

```env
database.default.hostname = localhost
database.default.database = e_perpus
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
```

### Jalankan Migration

```bash
php spark migrate
```

### Jalankan Seeder

```bash
php spark db:seed DatabaseSeeder
```

### Menjalankan Aplikasi

```bash
php spark serve
```

Akses aplikasi melalui:

```text
http://localhost:8080
```

---

## 🔌 Endpoint API

### Categories API

| Method | Endpoint               | Deskripsi                  |
| ------ | ---------------------- | -------------------------- |
| GET    | `/api/categories`      | Menampilkan semua kategori |
| GET    | `/api/categories/{id}` | Detail kategori            |
| POST   | `/api/categories`      | Menambah kategori          |
| PUT    | `/api/categories/{id}` | Mengubah kategori          |
| DELETE | `/api/categories/{id}` | Menghapus kategori         |

### Books API

| Method | Endpoint          | Deskripsi              |
| ------ | ----------------- | ---------------------- |
| GET    | `/api/books`      | Menampilkan semua buku |
| GET    | `/api/books/{id}` | Detail buku            |
| POST   | `/api/books`      | Menambah buku          |
| PUT    | `/api/books/{id}` | Mengubah buku          |
| DELETE | `/api/books/{id}` | Menghapus buku         |

---

## 🛠️ Teknologi yang Digunakan

* PHP 8
* CodeIgniter 4
* MySQL
* Bootstrap 5
* Composer
* REST API
* Git & GitHub

---

## 👨‍🎓 Identitas Mahasiswa

**Nama:** Naufal Rafi Haryanto
**NIM:** 312410118
**Program Studi:** Teknik Informatika
**Mata Kuliah:** Pemrograman Web 2
**Universitas:** Universitas Pelita Bangsa

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan penyelesaian tugas Praktikum Pemrograman Web 2.

---

⭐ Jika repository ini bermanfaat, silakan berikan star sebagai bentuk apresiasi.
