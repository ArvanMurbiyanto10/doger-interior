import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Settings // Import icon baru
} from "lucide-react";
import "./AdminPage.css";

const API_URL = "http://localhost:5000";

const AdminPage = () => {
  // State untuk Proyek
  const [judul, setJudul] = useState("");
  const [klien, setKlien] = useState("");
  const [photoInputs, setPhotoInputs] = useState([{ id: Date.now(), file: null }]);
  const [projects, setProjects] = useState([]);
  
  // State untuk Logo Navbar
  const [currentLogo, setCurrentLogo] = useState("");
  const [newLogoFile, setNewLogoFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- FETCH DATA (Proyek & Logo) ---
  const fetchData = async () => {
    try {
      // Ambil Proyek
      const resProjects = await axios.get(`${API_URL}/api/projects?t=${Date.now()}`);
      setProjects(resProjects.data);

      // Ambil Logo
      const resLogo = await axios.get(`${API_URL}/api/settings/logo`);
      setCurrentLogo(resLogo.data.key_value);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("isAdminLoggedIn")) navigate("/login");
    else fetchData();
  }, [navigate]);

  // --- HANDLER LOGO ---
  const handleLogoUpdate = async (e) => {
    e.preventDefault();
    if (!newLogoFile) return alert("Pilih file logo baru terlebih dahulu!");

    const formData = new FormData();
    formData.append('logo', newLogoFile);

    try {
      await axios.post(`${API_URL}/api/settings/logo`, formData);
      alert("Logo Navbar Berhasil Diubah!");
      setNewLogoFile(null); // Reset input
      fetchData(); // Refresh tampilan logo
    } catch (err) {
      console.error(err);
      alert("Gagal mengubah logo. Cek koneksi server.");
    }
  };

  // --- HANDLER PROYEK ---
  const addPhotoInput = () =>
    setPhotoInputs([...photoInputs, { id: Date.now(), file: null }]);

  const removePhotoInput = (id) => {
    if (photoInputs.length > 1)
      setPhotoInputs(photoInputs.filter((i) => i.id !== id));
  };

  const handleFileChange = (id, e) => {
    const newInputs = photoInputs.map((item) =>
      item.id === id ? { ...item, file: e.target.files[0] } : item,
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
      await axios.post(`${API_URL}/api/projects`, formData);
      alert("Proyek berhasil disimpan!");
      setJudul("");
      setKlien("");
      setPhotoInputs([{ id: Date.now(), file: null }]);
      fetchData();
    } catch (err) {
      console.error("Gagal simpan:", err);
      alert("Gagal simpan. Periksa database!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus proyek ini secara permanen?")) return;
    try {
      await axios.delete(`${API_URL}/api/projects/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-layout">
      {/* BACKGROUND DECORATION BLOB */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      {/* NAVBAR GLASS */}
      <nav className="admin-navbar glass">
        <div className="nav-brand">
          <div className="brand-icon">
            <LayoutDashboard size={22} color="#fff" />
          </div>
          <h2>Doger<span>Interior</span></h2>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
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
            <p>Kelola portofolio dan tampilan website Anda.</p>
          </div>

          {/* 1. SECTION: PENGATURAN LOGO NAVBAR (BARU) */}
          <div className="card form-card animate-fade-up delay-1" style={{marginBottom: '30px'}}>
            <div className="card-header">
              <h3>
                <Settings size={20} className="icon-gold" /> Pengaturan Logo Navbar
              </h3>
            </div>
            <form onSubmit={handleLogoUpdate} className="logo-form" style={{display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap'}}>
              <div className="current-logo-preview" style={{textAlign: 'center'}}>
                <span style={{fontSize: '12px', color: '#888', display:'block', marginBottom:'5px'}}>Logo Saat Ini:</span>
                <div className="img-frame" style={{width: '100px', height: '100px', border:'1px solid #ddd', padding:'5px', background:'#fff'}}>
                  <img 
                    src={currentLogo ? `${API_URL}/uploads/${currentLogo}` : "https://placehold.co/100x100?text=No+Logo"} 
                    alt="Current Logo" 
                    style={{width:'100%', height:'100%', objectFit:'contain'}}
                  />
                </div>
              </div>
              
              <div className="upload-logo-action" style={{flex: 1}}>
                <label style={{display:'block', marginBottom:'10px', fontWeight:'600', color:'#555'}}>Upload Logo Baru:</label>
                <input 
                  type="file" 
                  onChange={(e) => setNewLogoFile(e.target.files[0])} 
                  accept="image/*" 
                  className="form-control"
                  style={{marginBottom: '15px'}}
                />
                <button type="submit" className="btn-primary" disabled={!newLogoFile}>
                  <Save size={16} /> Simpan Logo Baru
                </button>
              </div>
            </form>
          </div>

          {/* 2. SECTION: INPUT PROYEK (LAMA) */}
          <div className="card form-card animate-fade-up delay-2">
            <div className="card-header">
              <h3>
                <Plus size={20} className="icon-gold" /> Input Proyek Baru
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* Input Kiri: Teks */}
                <div className="input-section">
                  <div className="form-group">
                    <label>Judul Proyek</label>
                    <input
                      className="form-control"
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                      required
                      placeholder="Misal: Villa Bali Modern"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nama Klien</label>
                    <input
                      className="form-control"
                      value={klien}
                      onChange={(e) => setKlien(e.target.value)}
                      placeholder="Misal: Mrs. Sarah"
                    />
                  </div>
                </div>

                {/* Input Kanan: Foto */}
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
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={addPhotoInput}
                      className="btn-secondary"
                    >
                      <Plus size={16} /> Slot
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Menyimpan..." : <><Save size={18} /> Simpan Proyek</>}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* 3. SECTION: DAFTAR PROYEK (LAMA) */}
          <div className="card table-card animate-fade-up delay-3">
            <div className="card-header-simple">
              <h3>
                <FolderOpen size={20} className="icon-gold" /> Database Proyek{" "}
                <span>({projects.length} Items)</span>
              </h3>
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
                          <img
                            src={`${API_URL}/uploads/${item.foto}`}
                            onError={(e) => (e.target.src = "https://placehold.co/60")}
                            alt="cover"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="proj-title">{item.judul}</div>
                        <div className="proj-client">{item.klien || "Tanpa Nama Klien"}</div>
                      </td>
                      <td>
                        <span className="pill-badge">
                          {item.gallery ? item.gallery.length : 0} Foto
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="action-buttons">
                          <button
                            onClick={() => navigate(`/admin/edit/${item.id}`)}
                            className="btn-action edit"
                            title="Edit"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="btn-action delete"
                            title="Hapus"
                          >
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
                        <p>Belum ada data proyek tersimpan.</p>
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