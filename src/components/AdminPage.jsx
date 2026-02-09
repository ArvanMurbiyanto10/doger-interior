import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const API_URL = "http://localhost:5000"; 

const AdminPage = () => {
  const [judul, setJudul] = useState('');
  const [klien, setKlien] = useState('');
  const [kategori, setKategori] = useState('Kitchen');
  const [deskripsi, setDeskripsi] = useState('');
  const [files, setFiles] = useState([]); // ARRAY FILE
  
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Fetch Data
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/projects`);
      setProjects(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (!localStorage.getItem('isAdminLoggedIn')) navigate('/login');
    else fetchProjects();
  }, [navigate]);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('klien', klien);
    formData.append('kategori', kategori);
    formData.append('deskripsi', deskripsi);

    try {
      if (isEditing) {
        // Mode Edit (Update Teks Saja)
        await axios.put(`${API_URL}/api/projects/${editId}`, formData);
        alert("Data berhasil diupdate!");
      } else {
        // Mode Tambah (Upload File)
        if (files.length < 3) {
            alert("Minimal upload 3 foto!");
            setLoading(false);
            return;
        }
        // Append setiap file ke 'images'
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }
        await axios.post(`${API_URL}/api/projects`, formData);
        alert("Proyek berhasil disimpan!");
      }
      
      // Reset
      setJudul(''); setKlien(''); setDeskripsi(''); setFiles([]);
      setIsEditing(false); setEditId(null);
      document.getElementById('fileInput').value = ""; // Reset input file visual
      fetchProjects();

    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if(!window.confirm("Hapus proyek ini?")) return;
    await axios.delete(`${API_URL}/api/projects/${id}`);
    fetchProjects();
  };

  // Handle Edit Click
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setJudul(item.judul);
    setKlien(item.klien);
    setKategori(item.kategori);
    setDeskripsi(item.deskripsi);
    window.scrollTo(0,0);
  };

  return (
    <div className="admin-layout">
      <div className="sidebar">
         <h2>Doger Admin</h2>
         <div style={{flex:1}}></div>
         <button onClick={() => {localStorage.clear(); navigate('/login')}}>Logout</button>
      </div>
      
      <main className="main-content">
        <div className="card">
            <h3>{isEditing ? "Edit Proyek (Teks Saja)" : "Tambah Proyek Baru"}</h3>
            <form onSubmit={handleSubmit}>
                <input className="form-control" placeholder="Judul Proyek" value={judul} onChange={e=>setJudul(e.target.value)} required />
                <input className="form-control" placeholder="Nama Klien" value={klien} onChange={e=>setKlien(e.target.value)} />
                
                <select className="form-control" value={kategori} onChange={e=>setKategori(e.target.value)}>
                    {["Kitchen", "Wardrobe", "Living Room", "Bedroom", "Commercial", "Apartment"].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                
                <textarea className="form-control" placeholder="Deskripsi" value={deskripsi} onChange={e=>setDeskripsi(e.target.value)}></textarea>
                
                {!isEditing && (
                    <div style={{marginBottom:'15px'}}>
                        <label>Upload Foto (Min 3) - Tahan Ctrl untuk pilih banyak</label>
                        <input 
                            id="fileInput"
                            type="file" 
                            multiple 
                            className="form-control"
                            onChange={e=>setFiles(e.target.files)}
                            accept="image/*"
                        />
                    </div>
                )}
                
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Memproses..." : "Simpan Data"}
                </button>
                {isEditing && <button type="button" onClick={() => {setIsEditing(false); setJudul(''); setFiles([])}} className="btn-cancel">Batal</button>}
            </form>
        </div>

        <div className="card">
            <h3>Daftar Proyek</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Judul</th>
                        <th>Galeri</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img src={`${API_URL}/uploads/${item.foto}`} style={{width:60, height:60, objectFit:'cover'}} onError={(e)=>e.target.src="https://placehold.co/60"} alt="cover"/>
                            </td>
                            <td>
                                <b>{item.judul}</b><br/>{item.klien}
                            </td>
                            <td>{item.gallery.length} Foto</td>
                            <td>
                                <button onClick={()=>handleEdit(item)} className="btn-edit">Edit</button>
                                <button onClick={()=>handleDelete(item.id)} className="btn-delete">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;