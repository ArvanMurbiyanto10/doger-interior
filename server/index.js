import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// --- 1. Konfigurasi Path ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// --- 2. Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

// --- 3. Koneksi Database Online ---
const db = mysql.createPool({
  host: "76.13.196.121",
  user: "doger",
  password: "DogerInterior15-",
  database: "doger_interior",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) console.error("❌ Database Connection Failed:", err.message);
  else {
    console.log("✅ Database Connected Successfully to 76.13.196.121!");
    connection.release();
  }
});

// --- 4. Konfigurasi Multer ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-]/g, "");
    cb(null, Date.now() + "-" + cleanName);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ==========================================
// API ENDPOINTS
// ==========================================

// --- Login Admin ---
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) {
      res.json({ success: true, message: "Login Berhasil" });
    } else {
      res.status(401).json({ success: false, message: "Kredensial Salah" });
    }
  });
});

// --- Ambil Semua Proyek & Galeri ---
app.get("/api/projects", (req, res) => {
  const sql = `
    SELECT p.*, GROUP_CONCAT(g.nama_file) as gallery 
    FROM Projek p 
    LEFT JOIN proyek_galeri g ON p.id = g.id_proyek 
    GROUP BY p.id 
    ORDER BY p.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    const formatted = results.map(item => ({
      ...item,
      gallery: item.gallery ? item.gallery.split(",") : []
    }));
    res.json(formatted);
  });
});

// --- Tambah Proyek & Banyak Foto Galeri ---
app.post("/api/projects", upload.array("images", 20), (req, res) => {
  const { judul, klien } = req.body; // 'klien' disimpan ke 'nama_projek'
  const files = req.files;

  if (!files || files.length === 0) return res.status(400).json({ message: "Minimal 1 foto diperlukan" });

  // 1. Simpan ke tabel Projek (Foto pertama jadi cover utama)
  const sqlProyek = "INSERT INTO Projek (Judul, nama_projek, foto) VALUES (?, ?, ?)";
  db.query(sqlProyek, [judul, klien, files[0].filename], (err, result) => {
    if (err) return res.status(500).json(err);

    const projectId = result.insertId;

    // 2. Simpan semua file ke tabel proyek_galeri
    const sqlGaleri = "INSERT INTO proyek_galeri (id_proyek, nama_file) VALUES ?";
    const values = files.map(file => [projectId, file.filename]);

    db.query(sqlGaleri, [values], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true, message: "Proyek & Galeri berhasil disimpan!" });
    });
  });
});

// --- Hapus Proyek & Semua File Fisik ---
app.delete("/api/projects/:id", (req, res) => {
  const id = req.params.id;

  // 1. Ambil semua nama file (cover + galeri) untuk dihapus dari folder uploads
  const sqlGetFiles = `
    SELECT p.foto as main_file, g.nama_file as gallery_file 
    FROM Projek p 
    LEFT JOIN proyek_galeri g ON p.id = g.id_proyek 
    WHERE p.id = ?
  `;

  db.query(sqlGetFiles, [id], (err, results) => {
    if (err) return res.status(500).json(err);

    // Kumpulkan semua nama file unik
    const filesToDelete = new Set();
    results.forEach(row => {
      if (row.main_file) filesToDelete.add(row.main_file);
      if (row.gallery_file) filesToDelete.add(row.gallery_file);
    });

    // Hapus file fisik dari folder
    filesToDelete.forEach(fileName => {
      const filePath = path.join(uploadDir, fileName);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    // 2. Hapus data dari database (Otomatis hapus galeri karena ON DELETE CASCADE)
    db.query("DELETE FROM Projek WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true, message: "Proyek dan file fisik berhasil dihapus" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});