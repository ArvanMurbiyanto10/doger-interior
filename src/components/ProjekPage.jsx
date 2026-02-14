import React, { useState, useEffect, useRef } from "react";
import API from "../api"; // Pastikan path ke api.js sudah benar
import Navbar from "./Navbar"; // Pastikan path Navbar benar
import {
  ArrowRight,
  Loader,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./ProjekPage.css"; // Pastikan CSS tersedia

// --- KOMPONEN KARTU PROYEK ---
const ProjectCard = ({ item }) => {
  const scrollRef = useRef(null);
  const uploadBaseURL = `${API.defaults.baseURL}/uploads/`;

  // 1. Logika Gambar (DIPERBAIKI)
  // Kita siapkan array untuk menampung semua gambar di slider
  let slideImages = [];

  // Cek apakah data gallery ada dan berbentuk array (dari backend)
  if (item.gallery && Array.isArray(item.gallery) && item.gallery.length > 0) {
    // Jika ada galeri, kita map nama file menjadi URL lengkap
    slideImages = item.gallery.map((filename) => `${uploadBaseURL}${filename}`);
  } else if (item.foto) {
    // Jika tidak ada galeri, tapi ada foto utama, gunakan foto utama saja (1 gambar)
    slideImages = [`${uploadBaseURL}${item.foto}`];
  } else {
    // Jika tidak ada sama sekali, gunakan placeholder
    slideImages = ["https://placehold.co/600x400?text=No+Image"];
  }

  const linktreeUrl = "https://linktr.ee/doger.interior";

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      // Pastikan nilai ini sama dengan lebar kartu/gambar di CSS (.img-item-compact)
      const itemWidth = 300; 
      if (direction === "right") {
        current.scrollBy({ left: itemWidth, behavior: "smooth" });
      } else {
        current.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="card-proyek-compact fade-up">
      {/* Header Kartu */}
      <div className="card-header-compact">
        <div className="header-content">
          {/* Menggunakan 'Judul' (huruf besar J sesuai database) */}
          <h3 className="title-compact">{item.Judul || "Proyek Tanpa Judul"}</h3>
          <p className="subtitle-compact">
            {/* Menggunakan 'nama_projek' untuk klien/lokasi */}
            {item.nama_projek ? `Klien: ${item.nama_projek}` : "Interior Design"}
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

      {/* Body Kartu (Slider Gambar) */}
      <div className="card-body-compact">
        <div className="scroll-wrapper">
          {/* Tombol Kiri hanya muncul jika gambar lebih dari 1 */}
          {slideImages.length > 1 && (
            <button className="nav-btn left" onClick={() => scroll("left")}>
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Area Scroll Gambar */}
          <div className="img-scroller" ref={scrollRef}>
            {/* PERBAIKAN: Mapping dari array slideImages yang sudah benar */}
            {slideImages.map((src, idx) => (
              <div key={idx} className="img-item-compact">
                <img
                  src={src}
                  alt={`${item.Judul} - view ${idx + 1}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/300x300?text=Error";
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Tombol Kanan hanya muncul jika gambar lebih dari 1 */}
          {slideImages.length > 1 && (
            <button className="nav-btn right" onClick={() => scroll("right")}>
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- HALAMAN UTAMA PROYEK ---
const ProjekPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Menambahkan timestamp agar browser tidak me-load data lama (caching)
    API.get(`/api/projects?t=${Date.now()}`)
      .then((res) => {
        // console.log("Data Projek:", res.data); // Uncomment untuk debug
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
            <Loader className="spin" size={40} />
          </div>
        ) : (
          <div className="grid-layout">
            {projects.length > 0 ? (
              projects.map((item) => (
                <ProjectCard key={item.id} item={item} />
              ))
            ) : (
              <div className="empty-msg" style={{ textAlign: "center", width: "100%", padding: "50px" }}>
                <Camera size={40} style={{ margin: "0 auto 10px", color: "#ccc" }} />
                <p style={{ color: "#999" }}>Belum ada data proyek yang diupload.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjekPage;