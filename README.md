# Lab6Web — Praktikum 6: JavaScript DOM dan Event Handling

Mata Kuliah : Pemrograman Web (Pertemuan 7)
Program Studi : Teknik Informatika
Nama / NIM : Alvin Al Aziz / 312510044
Kelas : I252A

---

## 1. Tujuan Praktikum

1. Memahami DOM sebagai representasi dokumen HTML yang dapat diakses melalui JavaScript.
2. Menggunakan `id`, `class`, dan selector CSS untuk memilih elemen HTML.
3. Mengubah teks, atribut, kelas CSS, dan gaya elemen melalui JavaScript.
4. Menangani event pengguna menggunakan `addEventListener()`.
5. Membuat validasi form dan menampilkan pesan sesuai kondisi input.
6. Mengembangkan halaman interaktif dengan minimal tiga fungsi yang berjalan benar.

## 2. Struktur File

```
Lab6Web/
├── README.md
├── index.html                  # Latihan 1 – 6
├── style.css
├── script.js
├── mini-project/            # Form Pendaftaran Workshop
│   ├── index.html
│   ├── style.css
│   └── script.js
```

| File | Fungsi |
|------|--------|
| `index.html` | Struktur halaman (judul, form, tombol, daftar). Memuat `style.css` dan `script.js` (dengan atribut `defer`). |
| `style.css` | Tampilan halaman: tata letak, warna, kelas `.highlight`, `.teks-besar`, `.selesai`, `.invalid`, dan tampilan responsif. |
| `script.js` | Logika JavaScript: memilih elemen, menangani event, validasi, dan memperbarui tampilan. |

## 3. Cara Menjalankan

1. Buka folder `Lab6Web` atau `mini-project/`.
2. Buka file `index.html` dengan browser modern (Chrome, Edge, atau Firefox) — cukup klik dua kali, tidak perlu server.
3. (Opsional) Buka Developer Tools (`F12`) → tab **Console** untuk memeriksa error.
4. Jika memakai Visual Studio Code, ekstensi *Live Server* dapat dipakai agar halaman otomatis dimuat ulang saat file disimpan.

## 4. Langkah Kerja

### Latihan 1 — Mengubah teks dengan DOM
Elemen `#judul` dan `#pesan` dipilih dengan `document.getElementById()`, lalu isinya diganti lewat properti `textContent`. Saat halaman dibuka, judul berubah menjadi "Belajar JavaScript DOM" dan paragraf menampilkan pesan bahwa konten telah diubah oleh JavaScript.

### Latihan 2 — Event click
Tombol `#tombolAksi` diberi `addEventListener("click", ...)`. Setiap tombol diklik, paragraf `#pesan` menampilkan teks beserta waktu klik dari `new Date().toLocaleTimeString()`, sehingga teks terus diperbarui pada setiap klik.

### Latihan 3 — Mengubah kelas dan gaya CSS
Tombol `#tombolGaya` memanggil `classList.toggle()` untuk kelas `highlight` dan `teks-besar` pada `#teksGaya`. `toggle()` menambahkan kelas jika belum ada dan menghapusnya jika sudah ada, sehingga satu tombol dapat mengubah tampilan bolak-balik. Perbedaan tiga metode: `add()` hanya menambah, `remove()` hanya menghapus, `toggle()` bergantian.

### Latihan 4 — Event input dan penghitung karakter
Event `input` aktif setiap isi kolom berubah (mengetik, menghapus, atau menempel). Handler membaca `namaInput.value.length` dan menampilkannya pada `#jumlahKarakter`. Atribut `maxlength="40"` membatasi input maksimal 40 karakter.

### Latihan 5 — Validasi form pendaftaran
Pada event `submit`, `event.preventDefault()` mencegah halaman dimuat ulang. Data kemudian diperiksa berurutan:
- Nama tidak boleh kosong (`trim()` membuang spasi di awal dan akhir).
- Email harus cocok dengan pola *regular expression* `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- Usia harus bilangan bulat antara 17 dan 100 (`Number.isInteger()`).

Jika semua benar, pesan sukses ditampilkan dan form dikosongkan dengan `form.reset()`. Atribut `novalidate` pada `<form>` menonaktifkan validasi bawaan browser agar pesan yang tampil berasal dari JavaScript. Atribut `aria-live="polite"` membuat pembaca layar membacakan perubahan pesan.

### Latihan 6 — Daftar tugas (To-do List)
Klik tombol **Tambah** membuat elemen `<li>` baru dengan `document.createElement()`, mengisinya dengan `textContent`, lalu menambahkannya ke `<ul>` lewat `appendChild()`. Setiap item memiliki tombol **Tandai selesai** yang men-*toggle* kelas `selesai` (teks dicoret). Input kosong ditolak dengan pesan peringatan. Teks pengguna dimasukkan menggunakan `textContent`, bukan `innerHTML`, sehingga aman dari penyisipan markup HTML.

### Mini Project — Form Pendaftaran Workshop
Halaman pendaftaran dengan fitur interaktif berikut:

| Fitur | Penjelasan | Event |
|-------|------------|-------|
| Validasi nama, email, dan sesi | Pesan kesalahan tampil di bawah masing-masing kolom dan kolom bermasalah diberi kelas `.invalid` | `submit`, `input`, `change`, `blur` |
| Penghitung karakter | Menampilkan jumlah karakter kolom harapan (maks. 200) secara langsung | `input` |
| Ringkasan input langsung | Panel samping menampilkan isian pengguna saat itu juga | `input`, `change` |
| Pesan sukses dan gagal | Ditampilkan pada `#pesanForm` dengan warna hijau/merah | `submit` |
| Tombol Hapus Isian | Mengosongkan form, pesan kesalahan, penghitung, dan ringkasan | `click` |

Tata letak memakai CSS Grid dua kolom di desktop yang berubah menjadi satu kolom pada layar ≤ 700 px (mobile) melalui *media query*.

## 5. Skenario Pengujian

| No | Skenario | Hasil yang diharapkan |
|----|----------|-----------------------|
| 1 | Semua kolom kosong | Pesan "Nama wajib diisi." |
| 2 | Nama kosong, lainnya valid | Pesan "Nama wajib diisi." |
| 3 | Email tidak valid (`alvin@`) | Pesan "Masukkan email yang valid." |
| 4 | Usia di bawah 17 | Pesan "Usia harus berupa bilangan bulat 17–100." |
| 5 | Semua input valid | Pesan "Validasi berhasil. Form siap diproses." dan form dikosongkan |

## 6. Screenshot Hasil

| Latihan | Screenshot |
|---------|------------|
| Latihan 1 | ![Latihan 1](![alt text](image.png)) |
| Latihan 2 | ![Latihan 2](screenshots/latihan2.png) |
| Latihan 3 (sebelum dan sesudah) | ![Latihan 3](screenshots/latihan3.png) |
| Latihan 4 | ![Latihan 4](screenshots/latihan4.png) |
| Latihan 5 — kondisi tidak valid | ![Latihan 5 tidak valid](screenshots/latihan5-tidak-valid.png) |
| Latihan 5 — kondisi valid | ![Latihan 5 valid](screenshots/latihan5-valid.png) |
| Latihan 6 | ![Latihan 6](screenshots/latihan6.png) |
| Mini Project — error | ![Mini project error](screenshots/mini-error.png) |
| Mini Project — sukses | ![Mini project sukses](screenshots/mini-sukses.png) |
| Mini Project — tampilan mobile | ![Mini project mobile](screenshots/mini-mobile.png) |
