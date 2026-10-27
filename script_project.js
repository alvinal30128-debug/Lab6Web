// ===== Pengambilan elemen =====
const form = document.getElementById("formWorkshop");
const namaEl = document.getElementById("nama");
const emailEl = document.getElementById("email");
const sesiEl = document.getElementById("sesi");
const catatanEl = document.getElementById("catatan");
const hitungCatatan = document.getElementById("hitungCatatan");
const tombolReset = document.getElementById("tombolReset");
const pesanForm = document.getElementById("pesanForm");
 
const errNama = document.getElementById("errNama");
const errEmail = document.getElementById("errEmail");
const errSesi = document.getElementById("errSesi");
 
const ringkasanNama = document.getElementById("ringkasanNama");
const ringkasanEmail = document.getElementById("ringkasanEmail");
const ringkasanSesi = document.getElementById("ringkasanSesi");
const ringkasanCatatan = document.getElementById("ringkasanCatatan");
 
const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
// ===== Fungsi bantu =====
function tampilkanError(input, elemenError, pesan) {
  elemenError.textContent = pesan;
  input.classList.toggle("invalid", pesan !== "");
  input.setAttribute("aria-invalid", pesan !== "" ? "true" : "false");
}
 
function setStatus(teks, jenis) {
  pesanForm.textContent = teks;
  pesanForm.classList.remove("sukses", "gagal");
  if (jenis) {
    pesanForm.classList.add(jenis);
  }
}
 
// ===== Fungsi 1: validasi nama, email, dan sesi =====
function validasiNama() {
  if (namaEl.value.trim() === "") {
    tampilkanError(namaEl, errNama, "Nama wajib diisi.");
    return false;
  }
  tampilkanError(namaEl, errNama, "");
  return true;
}
 
function validasiEmail() {
  const email = emailEl.value.trim();
  if (email === "") {
    tampilkanError(emailEl, errEmail, "Email wajib diisi.");
    return false;
  }
  if (!polaEmail.test(email)) {
    tampilkanError(emailEl, errEmail, "Format email tidak valid. Contoh: nama@contoh.com");
    return false;
  }
  tampilkanError(emailEl, errEmail, "");
  return true;
}
 
function validasiSesi() {
  if (sesiEl.value === "") {
    tampilkanError(sesiEl, errSesi, "Pilih salah satu sesi workshop.");
    return false;
  }
  tampilkanError(sesiEl, errSesi, "");
  return true;
}
 
// ===== Fungsi 2: penghitung karakter dan ringkasan langsung =====
function perbaruiHitungan() {
  hitungCatatan.textContent = catatanEl.value.length;
}
 
function perbaruiRingkasan() {
  ringkasanNama.textContent = namaEl.value.trim() || "-";
  ringkasanEmail.textContent = emailEl.value.trim() || "-";
  ringkasanSesi.textContent =
    sesiEl.value === "" ? "-" : sesiEl.options[sesiEl.selectedIndex].text;
  ringkasanCatatan.textContent = catatanEl.value.trim() || "-";
}
 
// ===== Fungsi 3: reset isian =====
function hapusIsian() {
  form.reset();
  tampilkanError(namaEl, errNama, "");
  tampilkanError(emailEl, errEmail, "");
  tampilkanError(sesiEl, errSesi, "");
  perbaruiHitungan();
  perbaruiRingkasan();
  setStatus("Semua isian telah dihapus.", "");
  namaEl.focus();
}
 
// ===== Event listener =====
namaEl.addEventListener("input", function () {
  perbaruiRingkasan();
  if (namaEl.classList.contains("invalid")) validasiNama();
});
 
emailEl.addEventListener("input", function () {
  perbaruiRingkasan();
  if (emailEl.classList.contains("invalid")) validasiEmail();
});
 
sesiEl.addEventListener("change", function () {
  perbaruiRingkasan();
  validasiSesi();
});
 
catatanEl.addEventListener("input", function () {
  perbaruiHitungan();
  perbaruiRingkasan();
});
 
emailEl.addEventListener("blur", function () {
  if (emailEl.value.trim() !== "") validasiEmail();
});
 
tombolReset.addEventListener("click", hapusIsian);
 
form.addEventListener("submit", function (event) {
  event.preventDefault();
 
  // Semua validasi dijalankan agar seluruh pesan kesalahan tampil sekaligus
  const hasil = [validasiNama(), validasiEmail(), validasiSesi()];
 
  if (hasil.includes(false)) {
    setStatus("Pendaftaran belum berhasil. Periksa kembali isian yang ditandai.", "gagal");
    const pertama = form.querySelector(".invalid");
    if (pertama) pertama.focus();
    return;
  }
 
  const nama = namaEl.value.trim();
  const sesi = sesiEl.options[sesiEl.selectedIndex].text;
 
  form.reset();
  perbaruiHitungan();
  perbaruiRingkasan();
  setStatus("Terima kasih, " + nama + "! Pendaftaran untuk " + sesi + " berhasil.", "sukses");
});
