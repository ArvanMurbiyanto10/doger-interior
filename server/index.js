import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// --- 1. Konfigurasi Path (ES Modules) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// --- 2. Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

// --- 3. Koneksi Database ---
// REKOMENDASI: Gunakan 'localhost' jika file ini dijalankan di VPS yang sama dengan DB.
const db = mysql.createPool({
  host: "localhost", // Berubah menjadi localhost agar lebih cepat & aman di VPS
  user: "root",
  password: "",
  database: "doger_interior",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database Connection Failed:", err.message);
  } else {
    console.log("✅ Database Connected Successfully (Internal VPS)!");
    connection.release();
  }
});

// --- 4. Konfigurasi Multer (Penyimpanan Gambar) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // Membersihkan nama file dari spasi dan karakter aneh
    const cleanName = file.originalname.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-]/g, "");
    cb(null, Date.now() + "-" + cleanName);
  },
});

const upload = multer({ 
  storage, 
  limits: { fileSize: 10 * 1024 * 1024 } // Limit 10MB
});

// ==========================================
// API ENDPOINTS
// ==========================================

// --- Login Admin ---
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
  
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length > 0) {
      res.json({ success: true, message: "Login Berhasil" });
    } else {
      res.status(401).json({ success: false, message: "Username/Password Salah" });
    }
  });
});

// --- Ambil Semua Proyek & Galeri (Join Tabel) ---
app.get("/api/projects", (req, res) => {
  const sql = `
    SELECT p.*, GROUP_CONCAT(g.nama_file) as gallery 
    FROM Projek p 
    LEFT JOIN proyek_galeri g ON p.id = g.id_proyek 
    GROUP BY p.id 
    ORDER BY p.id DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Format data galeri dari string "file1,file2" menjadi array ["file1", "file2"]
    const formatted = results.map(item => ({
      ...item,
      gallery: item.gallery ? item.gallery.split(",") : []
    }));
    res.json(formatted);
  });
});

// --- Tambah Proyek & Multiple Galeri ---
app.post("/api/projects", upload.array("images", 20), (req, res) => {
  const { judul, klien } = req.body; 
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "Wajib upload minimal 1 foto!" });
  }

  // 1. Simpan ke tabel 'Projek' (Foto pertama di array jadi sampul)
  const sqlProyek = "INSERT INTO Projek (Judul, nama_projek, foto) VALUES (?, ?, ?)";
  db.query(sqlProyek, [judul, klien, files[0].filename], (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal simpan data proyek" });

    const projectId = result.insertId;

    // 2. Simpan semua file yang diunggah ke tabel 'proyek_galeri'
    const sqlGaleri = "INSERT INTO proyek_galeri (id_proyek, nama_file) VALUES ?";
    const values = files.map(file => [projectId, file.filename]);

    db.query(sqlGaleri, [values], (err) => {
      if (err) return res.status(500).json({ error: "Gagal simpan galeri" });
      res.json({ success: true, message: "Proyek & Galeri berhasil disimpan!" });
    });
  });
});

// --- Hapus Proyek & File Fisik ---
app.delete("/api/projects/:id", (req, res) => {
  const id = req.params.id;

  // 1. Cari semua nama file terkait di database
  const sqlGetFiles = `
    SELECT p.foto as main_file, g.nama_file as gallery_file 
    FROM Projek p 
    LEFT JOIN proyek_galeri g ON p.id = g.id_proyek 
    WHERE p.id = ?
  `;

  db.query(sqlGetFiles, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Gagal mencari file" });

    // Gunakan Set agar tidak ada nama file duplikat yang dihapus dua kali
    const filesToDelete = new Set();
    results.forEach(row => {
      if (row.main_file) filesToDelete.add(row.main_file);
      if (row.gallery_file) filesToDelete.add(row.gallery_file);
    });

    // Hapus file dari folder uploads
    filesToDelete.forEach(fileName => {
      const filePath = path.join(uploadDir, fileName);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    // 2. Hapus data dari DB (Galeri akan terhapus otomatis karena ON DELETE CASCADE)
    db.query("DELETE FROM Projek WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: "Gagal hapus dari database" });
      res.json({ success: true, message: "Proyek dan file fisik berhasil dihapus" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});