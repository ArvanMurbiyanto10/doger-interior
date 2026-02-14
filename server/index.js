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

// Folder Uploads (Backend) - Tempat simpan gambar
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Folder Dist (Frontend) - Opsional jika ingin serve frontend dari sini
const frontendBuildPath = path.join(__dirname, "../dist");

// --- 2. Middleware ---
app.use(cors());
app.use(express.json());

// Serve File Gambar Uploads (Agar bisa diakses Frontend)
app.use("/uploads", express.static(uploadDir));

// Serve File Statis Frontend (Jika ada build)
app.use(express.static(frontendBuildPath));

// --- 3. Koneksi Database ---
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "doger_interior",
});

// --- 4. Konfigurasi Multer (Upload) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // Bersihkan nama file dari spasi dan karakter aneh
    const cleanName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");
    cb(null, Date.now() + "-" + cleanName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit 5MB per file
});

// ==========================================
// API ENDPOINTS (Jalur Data)
// ==========================================

// --- Login Admin ---
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length > 0)
      res.json({ success: true, message: "Login Berhasil" });
    else
      res
        .status(401)
        .json({ success: false, message: "Username/Password Salah" });
  });
});

// --- Ambil Semua Proyek ---
app.get("/api/projects", (req, res) => {
  // Join tabel proyek dan galeri, ambil semua foto sebagai string dipisah koma
  const sql = `
        SELECT p.*, GROUP_CONCAT(g.nama_file) as gallery 
        FROM proyek p 
        LEFT JOIN proyek_galeri g ON p.id = g.id_proyek 
        GROUP BY p.id 
        ORDER BY p.id DESC
    `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Gagal fetch projects:", err);
      return res.status(500).json(err);
    }

    const formatted = results.map((item) => ({
      ...item,
      // Ubah string "foto1.jpg,foto2.jpg" menjadi array ["foto1.jpg", "foto2.jpg"]
      gallery: item.gallery ? item.gallery.split(",") : [],
    }));

    res.json(formatted);
  });
});

// --- Tambah Proyek Baru (Upload Multiple) ---
app.post("/api/projects", upload.array("images", 20), (req, res) => {
  // 1. Cek Data Masuk
  console.log("--- New Project Request ---");
  const { judul, klien } = req.body;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "Minimal 1 foto harus diupload" });
  }

  // 2. Insert ke Tabel Proyek (Gunakan foto pertama sebagai cover)
  const sqlProyek = "INSERT INTO proyek (judul, klien, foto) VALUES (?, ?, ?)";
  db.query(sqlProyek, [judul, klien, files[0].filename], (err, result) => {
    if (err) {
      console.error("❌ DB Error (Proyek):", err.sqlMessage);
      return res.status(500).json(err);
    }

    const projectId = result.insertId;
    console.log(`✅ Proyek tersimpan: ID ${projectId} - ${judul}`);

    // 3. Insert ke Tabel Galeri (Bulk Insert)
    const sqlGaleri =
      "INSERT INTO proyek_galeri (id_proyek, nama_file) VALUES ?";
    const values = files.map((file) => [projectId, file.filename]);

    db.query(sqlGaleri, [values], (err) => {
      if (err) {
        console.error("❌ DB Error (Galeri):", err.sqlMessage);
        // Note: Proyek tetap tersimpan, tapi galerinya gagal.
        // Idealnya pakai Transaction, tapi utk mysql2 basic ini cukup.
        return res.status(500).json(err);
      }
      res.json({ success: true, message: "Proyek & Galeri berhasil disimpan" });
    });
  });
});

// --- Hapus Proyek ---
app.delete("/api/projects/:id", (req, res) => {
  const id = req.params.id;

  // 1. Ambil nama file dulu untuk dihapus dari folder (Opsional tapi bersih)
  db.query(
    "SELECT nama_file FROM proyek_galeri WHERE id_proyek = ?",
    [id],
    (err, files) => {
      if (!err && files.length > 0) {
        files.forEach((f) => {
          const filePath = path.join(uploadDir, f.nama_file);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath); // Hapus file fisik
        });
      }
    },
  );

  // 2. Hapus Data Database (Cascade delete di DB akan menghapus galeri otomatis jika disetting)
  // Jika tidak cascade, hapus manual:
  db.query("DELETE FROM proyek_galeri WHERE id_proyek = ?", [id], () => {
    db.query("DELETE FROM proyek WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    });
  });
});

// ==========================================
// HANDLE FRONTEND ROUTING (SPA Fallback)
// ==========================================
// Tangkap semua route lain dan arahkan ke index.html (untuk React Router)
app.get("*", (req, res) => {
  // Cek apakah request meminta file API atau gambar, jangan redirect ini
  if (req.url.startsWith("/api") || req.url.startsWith("/uploads")) {
    return res.status(404).json({ error: "Not Found" });
  }

  if (fs.existsSync(path.join(frontendBuildPath, "index.html"))) {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  } else {
    res.send("Backend Running. Frontend build not found.");
  }
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`
    🚀 SERVER RUNNING ON PORT ${PORT}
    📂 Uploads Directory: ${uploadDir}
    🌐 Local URL: http://localhost:${PORT}
    `);
});
