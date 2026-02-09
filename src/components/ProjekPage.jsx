import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Pastikan Link diimport jika mau dipakai (opsional)
import { ArrowRight, Loader, Camera } from "lucide-react";
import Navbar from "./Navbar";
import "./ProjekPage.css";

const API_URL = "http://localhost:5000";

const ProjekPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/projects`)
      .then(res => { 
        setProjects(res.data); 
        setLoading(false); 
      })
      .catch(err => {
        console.error("Error fetching projects:", err); // Menggunakan variabel 'err' agar linter happy
        setLoading(false);
      });
  }, []);

  return (
    <div className="projek-root">
      <Navbar />

      <section className="page-header">
        <div className="container">
            <span className="subtitle">Portofolio Kami</span>
            <h1>PORTOFOLIO <span className="italic">KARYA KAMI</span></h1>
        </div>
      </section>

      <div className="container">
        {loading ? (
          <div className="loading-state">
            <Loader className="spin-icon" size={40} />
            <p>Memuat portofolio...</p>
          </div>
        ) : (
          <div className="projects-wrapper">
            {projects.map((item) => (
              <div key={item.id} className="project-card">
                
                {/* Header Cokelat */}
                <div className="card-header-brown">
                   <div className="header-info">
                      <h2 className="project-title">{item.judul}</h2>
                      <p className="project-subtitle">Proyek {item.klien || "Klien Kami"}</p>
                   </div>
                   <a 
                      href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan proyek ${item.judul}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-contact-outline"
                   >
                      HUBUNGI KAMI <ArrowRight size={16}/>
                   </a>
                </div>

                {/* Horizontal Galeri Scroll */}
                <div className="card-image-strip">
                   <div className="image-scroll-container">
                      {item.gallery && item.gallery.length > 0 ? (
                        item.gallery.map((foto, idx) => (
                           <div key={idx} className="strip-item">
                              <img 
                                  src={`${API_URL}/uploads/${foto}`} 
                                  alt={`Foto ${idx+1}`} 
                                  loading="lazy"
                                  onError={(e) => {
                                      e.target.onerror = null; 
                                      e.target.src="https://placehold.co/600x400?text=No+Image"
                                  }}
                              />
                           </div>
                        ))
                      ) : (
                        // Fallback jika tidak ada galeri (tampilkan foto utama saja)
                        <div className="strip-item">
                            <img src={`${API_URL}/uploads/${item.foto}`} alt="Main" onError={(e)=>e.target.src="https://placehold.co/600x400?text=No+Image"}/>
                        </div>
                      )}
                   </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
            <div className="empty-state">
                <Camera size={48} />
                <p>Belum ada proyek yang ditampilkan.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProjekPage;