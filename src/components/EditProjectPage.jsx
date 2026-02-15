import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API, { IMAGE_URL } from '../api';
import { ArrowLeft, Save, Trash2, Plus } from 'lucide-react';
import './EditProjectPage.css';

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [judul, setJudul] = useState('');
  const [klien, setKlien] = useState('');
  const [existingGallery, setExistingGallery] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  API.get(`/api/projects/${id}?t=${Date.now()}`)
    .then(res => {
      setJudul(res.data.judul || '');
      setKlien(res.data.nama_klien || '');
      setExistingGallery(res.data.gallery || []);
    })
    .catch(() => navigate('/admin')); // Variabel 'err' dihapus karena tidak digunakan
}, [id, navigate]);

  const handleDeletePhoto = async (filename) => {
  if(!window.confirm("Hapus foto?")) return;
  try {
    await API.delete(`/api/projects/gallery/${filename}`);
    setExistingGallery(prev => prev.filter(f => f !== filename));
  } catch { 
    alert("Gagal hapus"); // Variabel 'err' dihapus
  }
};

const handleUpdate = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  const formData = new FormData();
  formData.append('judul', judul);
  formData.append('klien', klien); // Dikirim ke backend sebagai 'klien'
  
  // Menambahkan file baru yang dipilih ke FormData
  Array.from(newFiles).forEach(file => {
    formData.append('images', file);
  });

  try {
    await API.put(`/api/projects/${id}`, formData);
    alert("Berhasil diperbarui!"); // Foto baru akan tersimpan di sini
    navigate('/admin');
  } catch {
    alert("Gagal update");
  } finally {
    setLoading(false);
  }

  };

  return (
    <div className="edit-root">
      <div className="edit-container">
        <div className="edit-header">
          <button onClick={() => navigate('/admin')} className="btn-back"><ArrowLeft size={18}/> Kembali</button>
          <h2>Edit Proyek</h2>
        </div>
        <form onSubmit={handleUpdate} className="edit-grid">
          <div className="edit-card">
            <div className="card-body">
              <div className="input-group">
                <label>Judul Proyek</label>
                <input className="form-control" value={judul} onChange={e=>setJudul(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Nama Klien / Lokasi</label>
                <input className="form-control" value={klien} onChange={e=>setKlien(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Tambah Foto Baru</label>
                <input type="file" multiple onChange={e => setNewFiles(e.target.files)} />
              </div>
              <button type="submit" className="btn-save" disabled={loading}><Save size={18}/> Simpan</button>
            </div>
          </div>
          <div className="edit-card">
            <div className="card-body">
              <div className="edit-gallery-grid">
                {existingGallery.map((foto, idx) => (
                  <div key={idx} className="gallery-item-edit">
                    <img src={`${IMAGE_URL}${foto}`} alt="galeri" />
                    <button type="button" onClick={() => handleDeletePhoto(foto)} className="btn-delete-photo"><Trash2 size={14}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;