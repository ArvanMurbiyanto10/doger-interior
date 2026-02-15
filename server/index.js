import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Konfigurasi Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

// Database
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "doger_interior",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Multer (Upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-]/g, "");
    cb(null, Date.now() + "-" + cleanName);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// --- API ENDPOINTS ---

// 1. GET ALL (Fix Duplikat Foto)
app.get("/api/projects", (req, res) => {
  const sql = `
    SELECT p.*, GROUP_CONCAT(g.nama_file) as gallery 
    FROM projek p 
    LEFT JOIN proyek_galeri g ON p.id = g.id_proyek 
    GROUP BY p.id 
    ORDER BY p.id DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const formatted = results.map(item => {
      let galleryArray = item.gallery ? item.gallery.split(",") : [];
      
      // LOGIKA ANTI-DUPLIKAT: Buang foto cover dari list galeri
      if (item.foto) {
        galleryArray = galleryArray.filter(foto => foto !== item.foto);
      }

      return {
        ...item,
        gallery: galleryArray
      };
    });

    res.json(formatted);
  });
});

// 2. GET DETAIL (Fix Duplikat Foto)
app.get("/api/projects/:id", (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT p.*, GROUP_CONCAT(g.nama_file) as gallery 
    FROM projek p 
    LEFT JOIN proyek_galeri g ON p.id = g.id_proyek 
    WHERE p.id = ?
    GROUP BY p.id
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Proyek tidak ditemukan" });

    const data = result[0];
    let galleryArray = data.gallery ? data.gallery.split(",") : [];

    // LOGIKA ANTI-DUPLIKAT: Hapus foto cover dari list galeri
    if (data.foto) {
        galleryArray = galleryArray.filter(foto => foto !== data.foto);
    }

    data.gallery = galleryArray;
    res.json(data);
  });
});

// 3. POST (TAMBAH)
app.post("/api/projects", upload.array("images", 20), (req, res) => {
  const { judul, klien } = req.body;
  const files = req.files;
  if (!files || files.length === 0) return res.status(400).json({ message: "Wajib upload foto!" });

  // Foto pertama otomatis jadi sampul
  const sqlProyek = "INSERT INTO projek (judul, nama_klien, foto) VALUES (?, ?, ?)";
  db.query(sqlProyek, [judul, klien, files[0].filename], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const projectId = result.insertId;
    const values = files.map(file => [projectId, file.filename]);
    db.query("INSERT INTO proyek_galeri (id_proyek, nama_file) VALUES ?", [values], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    });
  });
});

// 4. PUT (EDIT) - UPDATE COVER OTOMATIS
app.put("/api/projects/:id", upload.array("images", 20), (req, res) => {
  const id = req.params.id;
  const { judul, klien } = req.body;
  const files = req.files;

  // Update Data Teks
  const sqlUpdateText = "UPDATE projek SET judul = ?, nama_klien = ? WHERE id = ?";
  db.query(sqlUpdateText, [judul, klien, id], (err) => {
    if (err) return res.status(500).json({ error: "Gagal update teks" });

    // Jika ada foto baru
    if (files && files.length > 0) {
      const values = files.map(file => [id, file.filename]);
      const sqlInsertGallery = "INSERT INTO proyek_galeri (id_proyek, nama_file) VALUES ?";
      
      db.query(sqlInsertGallery, [values], (err) => {
        if (err) return res.status(500).json({ error: "Gagal simpan galeri baru" });
        
        // UPDATE COVER DENGAN FOTO BARU
        const newCover = files[0].filename;
        const sqlUpdateCover = "UPDATE projek SET foto = ? WHERE id = ?";
        
        db.query(sqlUpdateCover, [newCover, id], () => {
            res.json({ success: true, message: "Proyek diperbarui!" });
        });
      });
    } else {
      res.json({ success: true, message: "Data teks diperbarui!" });
    }
  });
});

// 5. DELETE (HAPUS SATU FOTO)
app.delete("/api/projects/gallery/:filename", (req, res) => {
  const filename = req.params.filename;
  console.log("Menghapus foto:", filename);

  const sql = "DELETE FROM proyek_galeri WHERE nama_file = ?";
  db.query(sql, [filename], (err) => {
    if (err) return res.status(500).json({ error: "Database Error" });

    const filePath = path.join(uploadDir, filename);
    if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch(e) { console.error(e); }
    }
    res.json({ success: true });
  });
});

// 6. DELETE (HAPUS PROYEK FULL)
app.delete("/api/projects/:id", (req, res) => {
  const id = req.params.id;
  const sqlGetFiles = "SELECT p.foto as main, g.nama_file as gal FROM projek p LEFT JOIN proyek_galeri g ON p.id = g.id_proyek WHERE p.id = ?";
  
  db.query(sqlGetFiles, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error" });

    const filesToDelete = new Set();
    results.forEach(row => {
      if (row.main) filesToDelete.add(row.main);
      if (row.gal) filesToDelete.add(row.gal);
    });

    filesToDelete.forEach(f => {
      const p = path.join(uploadDir, f);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });

    db.query("DELETE FROM projek WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: "Gagal hapus data" });
      res.json({ success: true });
    });
  });
});

// Login Admin
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

app.listen(PORT, () => console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`));