import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

// 1. CONFIG PATH
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// 2. MIDDLEWARE
app.use(cors());
app.use(express.json());
// Static folder agar gambar bisa dibuka di browser
app.use('/uploads', express.static(uploadDir));

// 3. DATABASE
const db = mysql.createPool({
    host: 'localhost', user: 'root', password: '', database: 'doger_interior'
});

// 4. CONFIG UPLOAD (Rename file agar unik)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        // Format: timestamp-namafileasli
        cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
    }
});
const upload = multer({ storage: storage });

// --- ROUTES ---

// GET PROJECTS (Join tabel proyek & galeri)
app.get('/api/projects', (req, res) => {
    const sql = `
        SELECT p.*, GROUP_CONCAT(g.nama_file) as gallery 
        FROM proyek p 
        LEFT JOIN proyek_galeri g ON p.id = g.id_proyek 
        GROUP BY p.id 
        ORDER BY p.id DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        // Convert string "foto1.jpg,foto2.jpg" menjadi Array
        const projects = results.map(item => ({
            ...item,
            gallery: item.gallery ? item.gallery.split(',') : []
        }));
        res.json(projects);
    });
});

// POST PROJECT (Upload Banyak File)
app.post('/api/projects', upload.array('images', 10), (req, res) => {
    const { judul, kategori, deskripsi, klien } = req.body;
    const files = req.files;

    if (!files || files.length === 0) return res.status(400).json({message: "Upload minimal 1 foto"});

    // 1. Insert ke Tabel Proyek
    const thumbnail = files[0].filename; // Foto pertama jadi cover
    const sqlProyek = "INSERT INTO proyek (judul, kategori, deskripsi, klien, foto) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sqlProyek, [judul, kategori, deskripsi, klien, thumbnail], (err, result) => {
        if (err) return res.status(500).json(err);
        
        const projectId = result.insertId;

        // 2. Insert ke Tabel Galeri (Bulk Insert)
        const sqlGaleri = "INSERT INTO proyek_galeri (id_proyek, nama_file) VALUES ?";
        const values = files.map(file => [projectId, file.filename]);

        db.query(sqlGaleri, [values], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true, message: "Proyek Tersimpan!" });
        });
    });
});

// DELETE PROJECT
app.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    // Hapus file fisik (Opsional, tapi bagus untuk kebersihan)
    db.query("SELECT nama_file FROM proyek_galeri WHERE id_proyek = ?", [id], (err, results) => {
        if (!err && results.length > 0) {
            results.forEach(row => {
                const p = path.join(uploadDir, row.nama_file);
                if (fs.existsSync(p)) fs.unlinkSync(p);
            });
        }
        // Hapus data DB (Cascade akan hapus galeri otomatis)
        db.query("DELETE FROM proyek WHERE id = ?", [id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });
    });
});

// EDIT PROJECT (Update Teks Saja)
app.put('/api/projects/:id', upload.none(), (req, res) => {
    const { judul, kategori, deskripsi, klien } = req.body;
    const { id } = req.params;
    const sql = "UPDATE proyek SET judul=?, kategori=?, deskripsi=?, klien=? WHERE id=?";
    db.query(sql, [judul, kategori, deskripsi, klien, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// LOGIN ADMIN
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM admin WHERE username=? AND password=?", [username, password], (err, resDB) => {
        if (err) return res.status(500).json(err);
        if (resDB.length > 0) res.json({ success: true, user: resDB[0] });
        else res.status(401).json({ success: false });
    });
});

app.listen(PORT, () => console.log(`🚀 Server berjalan di http://localhost:${PORT}`));