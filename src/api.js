import axios from "axios";

// PENTING: Gunakan localhost:5000 karena kita sedang testing di komputer sendiri.
// Jangan gunakan IP VPS dulu sebelum backend di VPS di-update.
const BASE_URL = "http://localhost:5000"; 

// Export URL gambar agar bisa dipakai di AdminPage
export const IMAGE_URL = `${BASE_URL}/uploads/`;

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;