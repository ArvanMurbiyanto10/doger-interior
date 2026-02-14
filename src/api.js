import axios from "axios";

// --- KONFIGURASI URL ---
// Karena Backend (index.js) Anda berjalan di laptop sendiri (Localhost),
// maka gunakan alamat ini:
const BASE_URL = "http://localhost:5000";

// CATATAN PENTING:
// Jangan gunakan IP Database (76.13.196.121) di sini.
// File api.js ini tugasnya menghubungi 'index.js', bukan 'phpMyAdmin'.

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    // Header ini biasanya hanya untuk Ngrok, tapi dibiarkan aman saja
    "ngrok-skip-browser-warning": "true",
  },
});

console.log("🔗 API Connected to:", BASE_URL);

// Export helper URL agar bisa dipakai di komponen lain
// Ini akan menghasilkan: "http://localhost:5000/uploads/"
export const IMAGE_URL = `${BASE_URL}/uploads/`;

export default API;