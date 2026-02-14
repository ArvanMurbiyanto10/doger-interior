import axios from "axios";

// REKOMENDASI UNTUK PRODUKSI:
// Hapus :5000 jika Anda sudah mengaktifkan Nginx Reverse Proxy.
// Nginx akan otomatis meneruskan request ke port 5000 di latar belakang.
const BASE_URL = "http://76.13.196.121"; 

const API = axios.create({
  baseURL: BASE_URL,
});

// Ini juga akan menjadi http://76.13.196.121/uploads/
export const IMAGE_URL = `${BASE_URL}/uploads/`;

export default API;