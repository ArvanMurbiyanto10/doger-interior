import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

// Konfigurasi Path & Folder Upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use(cors());
app.use(express.json());
// Middleware untuk melayani file statis (gambar)
app.use('/uploads', express.static(uploadDir));

// Koneksi Database Doger Interior
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'doger_interior'
});

// Konfigurasi Multer (Penyimpanan File)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''))
});
const upload = multer({ storage: storage });

// ==========================================
// API ENDPOINTS
// ==========================================

// --- 1. API LOGIN ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        if (result.length > 0) {
            res.json({ success: true, message: "Login Berhasil" });
        } else {
            res.json({ success: false, message: "Username/Password Salah" });
        }
    });
});

// --- 2. API PENGATURAN LOGO (BARU) ---

// GET: Ambil nama file logo saat ini
app.get('/api/settings/logo', (req, res) => {
    db.query("SELECT key_value FROM settings WHERE key_name = 'navbar_logo'", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        // Jika belum ada di db, kembalikan default
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.json({ key_value: 'logo-doger.png' });
        }
    });
});

// POST: Upload dan update logo baru
app.post('/api/settings/logo', upload.single('logo'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "File tidak ditemukan" });

    const newLogo = req.file.filename;
    // Update data di tabel settings
    const sql = "UPDATE settings SET key_value = ? WHERE key_name = 'navbar_logo'";
    
    db.query(sql, [newLogo], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        res.json({ success: true, newLogo });
    });
});

// --- 3. API MANAJEMEN PROYEK ---

// GET: Ambil Semua Proyek (Untuk Tabel Admin & Halaman Depan)
app.get('/api/projects', (req, res) => {
    const sql = `
        SELECT p.*, GROUP_CONCAT(g.nama_file) as gallery 
        FROM proyek p 
        LEFT JOIN proyek_galeri g ON p.id = g.id_proyek 
        GROUP BY p.id ORDER BY p.id DESC`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        const formatted = results.map(item => ({
            ...item,
            gallery: item.gallery ? item.gallery.split(',') : []
        }));
        res.json(formatted);
    });
});

// POST: Tambah Proyek Baru (Support Banyak Foto)
app.post('/api/projects', upload.array('images', 20), (req, res) => {
    const { judul, klien } = req.body;
    const files = req.files;

    if (!files || files.length === 0) return res.status(400).send("Minimal 1 foto");

    // Simpan data proyek (Foto pertama jadi cover)
    const sqlProyek = "INSERT INTO proyek (judul, klien, foto) VALUES (?, ?, ?)";
    db.query(sqlProyek, [judul, klien, files[0].filename], (err, result) => {
        if (err) return res.status(500).json(err);

        const projectId = result.insertId;
        // Simpan sisa foto ke tabel galeri
        const sqlGaleri = "INSERT INTO proyek_galeri (id_proyek, nama_file) VALUES ?";
        const values = files.map(file => [projectId, file.filename]);

        db.query(sqlGaleri, [values], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });
    });
});

// DELETE: Hapus Proyek
app.delete('/api/projects/:id', (req, res) => {
    db.query("DELETE FROM proyek WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

app.listen(PORT, () => console.log(`🚀 Backend aktif di port ${PORT}`));