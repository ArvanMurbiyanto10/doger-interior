import React, { useState, useEffect, useRef } from "react";
// 1. GANTI: Import API dan IMAGE_URL dari file api.js
import API from "../api"; // Benar
import {
  ArrowRight,
  Loader,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "./Navbar";
import "./ProjekPage.css";

// 2. HAPUS: const API_URL = "http://localhost:5000";
// Kita tidak butuh ini lagi

const ProjectCard = ({ item }) => {
  const scrollRef = useRef(null);

  // Mengambil gambar dari API (foto utama + gallery)
  // Gallery biasanya berupa string nama file, jadi tidak perlu path lengkap di database
  const baseImages =
    item.gallery && item.gallery.length > 0
      ? [item.foto, ...item.gallery]
      : [item.foto];

  // Efek infinite scroll (duplikasi gambar jika sedikit)
  const infiniteImages =
    baseImages.length < 4
      ? [...baseImages, ...baseImages, ...baseImages]
      : baseImages;

  // Linktree resmi Doger Interior
  const linktreeUrl = "https://linktr.ee/doger.interior";

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const itemWidth = 215;
      if (direction === "right") {
        current.scrollBy({ left: itemWidth, behavior: "smooth" });
      } else {
        current.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="card-proyek-compact fade-up">
      <div className="card-header-compact">
        <div className="header-content">
          <h3 className="title-compact">{item.judul}</h3>
          <p className="subtitle-compact">
            {item.klien ? `Proyek ${item.klien}` : "Proyek Interior"}
          </p>

          <a
            href={linktreeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-hubungi-box"
          >
            HUBUNGI KAMI <ArrowRight size={14} style={{ marginLeft: 8 }} />
          </a>
        </div>
      </div>

      <div className="card-body-compact">
        <div className="scroll-wrapper">
          <button className="nav-btn left" onClick={() => scroll("left")}>
            <ChevronLeft size={20} />
          </button>

          <div className="img-scroller" ref={scrollRef}>
            {infiniteImages.map((foto, idx) => (
              <div key={idx} className="img-item-compact">
                <img
                  // 3. GANTI: Gunakan IMAGE_URL dari api.js agar mengarah ke ngrok
                  // Pastikan 'foto' hanya nama file (misal: '17823...jpg')
                  src={`${API.defaults.baseURL}/uploads/${item.foto}`}
                  alt="interior"
                  onError={(e) => {
                    e.target.onerror = null; // Mencegah loop error
                    e.target.src = "https://placehold.co/300x300?text=No+Image";
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <button className="nav-btn right" onClick={() => scroll("right")}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjekPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // 4. GANTI: Gunakan API.get
    // Timestamp (?t=...) berguna agar data tidak dicache browser (selalu fresh)
    API.get(`/api/projects?t=${Date.now()}`)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal load proyek:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-root">
      <Navbar />

      <section className="bg-cream compact-hero">
        <div className="container-limit center">
          <span className="sub-head">PORTOFOLIO</span>
          <h1>HASIL KARYA KAMI</h1>
        </div>
      </section>

      <div className="container-limit">
        {loading ? (
          <div className="center-loading">
            <Loader className="spin" />
          </div>
        ) : (
          <div className="grid-layout">
            {projects.length > 0 ? (
              projects.map((item) => <ProjectCard key={item.id} item={item} />)
            ) : (
              <div className="empty-msg">
                <Camera size={40} />
                <p>Belum ada data.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjekPage;
