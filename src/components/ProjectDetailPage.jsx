import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Sesuaikan path import

const ProjectDetailPage = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = "http://localhost:5000";

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                // Kita ambil semua lalu filter (atau buat endpoint khusus by ID di backend)
                const res = await axios.get(`${API_URL}/api/projects`);
                const found = res.data.find(p => p.id === parseInt(id));
                setProject(found);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <div style={{padding:'100px', textAlign:'center'}}>Loading...</div>;
    if (!project) return <div style={{padding:'100px', textAlign:'center'}}>Proyek tidak ditemukan</div>;

    return (
        <>
            <Navbar />
            <div style={{marginTop: '80px', padding: '40px', maxWidth: '800px', margin: '80px auto'}}>
                <Link to="/projek" style={{textDecoration:'none', color:'#5D4037'}}>← Kembali</Link>
                
                <h1 style={{fontSize:'2.5rem', marginBottom:'10px'}}>{project.judul}</h1>
                <p style={{color:'#666', marginBottom:'30px'}}>{project.kategori} | Klien: {project.klien}</p>
                
                <img 
                    src={`${API_URL}/uploads/${project.foto}`} 
                    alt={project.judul} 
                    style={{width:'100%', borderRadius:'8px', marginBottom:'30px'}}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/800x600?text=No+Image';
                    }}
                />
                
                <div style={{lineHeight:'1.8'}}>
                    <h3>Deskripsi Proyek</h3>
                    <p>{project.deskripsi || "Tidak ada deskripsi."}</p>
                </div>
            </div>
        </>
    );
};

export default ProjectDetailPage;