import React, { useState, useEffect, useCallback } from "react";
import API, { IMAGE_URL } from "../api"; // Tambahkan IMAGE_URL di sini
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Trash2,
  LogOut,
  LayoutDashboard,
  Image as ImageIcon,
  FolderOpen,
  Save,
  Edit3,
} from "lucide-react";
import "./AdminPage.css";

// Import Background Image
import adminBg from "../assets/foto-9.jpg";

const AdminPage = () => {
  const [judul, setJudul] = useState("");
  const [klien, setKlien] = useState("");
  const [photoInputs, setPhotoInputs] = useState([
    { id: Date.now(), file: null },
  ]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const resProjects = await API.get(`/api/projects?t=${Date.now()}`);
      setProjects(resProjects.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
      // Jika error 401 (unauthorized), arahkan ke login
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
    }
  }, [navigate]); // Dependensi fetchData adalah navigate

  // 2. Tambahkan fetchData ke dalam array dependensi useEffect
  useEffect(() => {
    const isAuth = localStorage.getItem("isAdminLoggedIn");
    if (!isAuth) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [navigate, fetchData]);

  const addPhotoInput = () =>
    setPhotoInputs([...photoInputs, { id: Date.now(), file: null }]);

  const removePhotoInput = (id) => {
    if (photoInputs.length > 1)
      setPhotoInputs(photoInputs.filter((i) => i.id !== id));
  };

  const handleFileChange = (id, e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Ukuran file terlalu besar (Max 5MB)");
      return;
    }
    const newInputs = photoInputs.map((item) =>
      item.id === id ? { ...item, file: file } : item,
    );
    setPhotoInputs(newInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validFiles = photoInputs.map((i) => i.file).filter((f) => f !== null);

    if (validFiles.length < 1) {
      alert("Mohon upload minimal 1 foto!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("klien", klien);
    validFiles.forEach((file) => formData.append("images", file));

    try {
      await API.post(`/api/projects`, formData);
      alert("Proyek berhasil disimpan!");
      setJudul("");
      setKlien("");
      setPhotoInputs([{ id: Date.now(), file: null }]);
      fetchData();
    } catch (err) {
      console.error("Gagal simpan:", err);
      alert("Gagal simpan. Periksa koneksi atau ukuran file.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus proyek ini secara permanen?")) return;
    try {
      await API.delete(`/api/projects/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus proyek.");
    }
  };

  return (
    <div className="admin-layout">
      <div
        className="admin-bg-fixed"
        style={{ backgroundImage: `url(${adminBg})` }}
      >
        <div className="admin-bg-overlay"></div>
      </div>

      <nav className="admin-navbar glass">
        <div className="nav-brand">
          <div className="brand-icon">
            <LayoutDashboard size={22} color="#fff" />
          </div>
          <h2>
            Doger<span>Interior</span>
          </h2>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("isAdminLoggedIn");
            navigate("/login");
          }}
          className="btn-logout"
        >
          <span>Sign Out</span> <LogOut size={16} />
        </button>
      </nav>

      <main className="main-content">
        <div className="content-container">
          <div className="dashboard-header animate-fade-up">
            <h1>Dashboard Admin</h1>
            <p>Kelola portofolio proyek Anda di sini.</p>
          </div>

          <div className="card form-card animate-fade-up delay-1">
            <div className="card-header">
              <h3><Plus size={20} className="icon-gold" /> Input Proyek Baru</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-section">
                  <div className="form-group">
                    <label>Judul Proyek</label>
                    <input
                      className="form-control"
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                      required
                      placeholder="Misal: Kitchen Set Minimalis"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nama Klien / Lokasi</label>
                    <input
                      className="form-control"
                      value={klien}
                      onChange={(e) => setKlien(e.target.value)}
                      placeholder="Misal: Ibu Ani - Depok"
                    />
                  </div>
                </div>

                <div className="upload-section">
                  <label>Galeri Foto</label>
                  <div className="photo-scroll-area">
                    {photoInputs.map((input, index) => (
                      <div key={input.id} className="file-input-row">
                        <div className="file-index">{index + 1}</div>
                        <div className="file-wrapper">
                          <ImageIcon size={16} color="#888" />
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(input.id, e)}
                            accept="image/*"
                          />
                        </div>
                        {photoInputs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePhotoInput(input.id)}
                            className="btn-icon-danger"
                          ><Trash2 size={16} /></button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="form-actions">
                    <button type="button" onClick={addPhotoInput} className="btn-secondary">
                      <Plus size={16} /> Tambah Slot
                    </button>
                    <button type="submit" className="btn-primary" disabled={loading}>
                      {loading ? "Menyimpan..." : <><Save size={18} /> Simpan Proyek</>}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="card table-card animate-fade-up delay-2">
            <div className="card-header-simple">
              <h3><FolderOpen size={20} className="icon-gold" /> Database Proyek <span>({projects.length} Items)</span></h3>
            </div>

            <div className="table-wrapper">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Visual</th>
                    <th>Informasi Proyek</th>
                    <th>Galeri</th>
                    <th style={{ textAlign: "right" }}>Kontrol</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((item) => (
                    <tr key={item.id}>
                      <td width="100">
                        <div className="img-frame">
                          {/* Menggunakan IMAGE_URL dari api.js */}
                          <img
                            src={`${IMAGE_URL}${item.foto}`}
                            onError={(e) => (e.target.src = "https://placehold.co/60?text=No+Img")}
                            alt="cover"
                          />
                        </div>
                      </td>
                      <td>
                        {/* PERBAIKAN: Menggunakan item.Judul dan item.nama_projek agar sinkron dengan Database */}
                        <div className="proj-title">{item.Judul}</div>
                        <div className="proj-client">{item.nama_projek || "-"}</div>
                      </td>
                      <td>
                        <span className="pill-badge">
                          {item.gallery ? item.gallery.length : 0} Foto
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="action-buttons">
                          <button onClick={() => navigate(`/admin/edit/${item.id}`)} className="btn-action edit">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="btn-action delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan="4" className="empty-state">
                        <FolderOpen size={40} />
                        <p>Belum ada data proyek.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;