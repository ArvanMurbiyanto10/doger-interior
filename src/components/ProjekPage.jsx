import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ZoomIn } from "lucide-react"; 

// Import CSS
import "../LandingPage.css"; 

// --- Import Komponen Navbar Global ---
import Navbar from "./Navbar"; 

// --- Import Assets (Pastikan path sesuai) ---
import img1 from "../assets/foto-1.jpg";
import img2 from "../assets/foto-2.jpg";
import img3 from "../assets/foto-3.jpg";
import img5 from "../assets/foto-5.jpg";
import img6 from "../assets/foto-6.jpg";
import img7 from "../assets/foto-7.jpg";
import img8 from "../assets/foto-8.jpg";
import img10 from "../assets/foto-10.jpg";

// Data Galeri Lengkap
const PROJECT_GALLERY = [
  { img: img7, title: "Minimalist Kitchen", cat: "Kitchen Set" },
  { img: img8, title: "Luxury Wardrobe", cat: "Bedroom" },
  { img: img3, title: "Warm Living Room", cat: "Living" },
  { img: img5, title: "Modern Office", cat: "Commercial" },
  { img: img1, title: "Dry Pantry", cat: "Kitchen Set" },
  { img: img2, title: "Walk-in Closet", cat: "Bedroom" },
  { img: img10, title: "Coffee Shop Bar", cat: "Commercial" },
  { img: img6, title: "Reception Area", cat: "Office" },
];

function ProjekPage() {
  
  // Scroll ke atas saat halaman dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="op10-root">
      
      {/* 1. PANGGIL NAVBAR GLOBAL (Otomatis Putih & Rapi) */}
      <Navbar />

      {/* 2. KONTEN HALAMAN */}
      {/* Gunakan bg-dark agar galeri terlihat elegan (opsional, bisa bg-white juga) */}
      <section className="op10-section bg-dark text-cream" style={{ paddingTop: "140px", minHeight: "100vh" }}>
        <div className="op10-container">
          
          {/* Header Section */}
          <div className="center fade-up" style={{ marginBottom: "60px" }}>
            <span className="sub-head text-cream">PORTOFOLIO KAMI</span>
            <h1>GALERI PROYEK</h1>
            <p style={{ opacity: 0.8 }}>Kumpulan hasil karya terbaik yang telah kami kerjakan dengan sepenuh hati.</p>
          </div>

          {/* Grid Galeri */}
          <div className="gallery-grid-simple">
            {PROJECT_GALLERY.map((item, index) => (
              <div 
                key={index} 
                className="gal-item fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img src={item.img} alt={item.title} loading="lazy" />
                
                {/* Overlay Hover */}
                <div className="gal-overlay">
                  <div style={{ marginBottom: "10px" }}>
                    <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{item.title}</h4>
                    <span style={{ fontSize: "0.85rem", opacity: 0.8, textTransform: "uppercase", letterSpacing: "1px" }}>
                      {item.cat}
                    </span>
                  </div>
                  {/* Ikon Zoom/Arrow sekedar hiasan */}
                  <div style={{ background: "white", color: "#333", padding: "8px", borderRadius: "50%", display: "flex" }}>
                     <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Bawah */}
          <div className="center fade-up" style={{ marginTop: "80px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "50px" }}>
             <h3 style={{ marginBottom: "20px" }}>Tertarik dengan desain seperti ini?</h3>
             <Link to="/contact" className="btn-primary" style={{ border: "1px solid white" }}>
               Mulai Proyek Anda Sekarang
             </Link>
          </div>

        </div>
      </section>

      {/* Floating Back Button */}
      <Link to="/" className="op10-back-float">
        <ArrowLeft />
      </Link>
      
    </div>
  );
}

export default ProjekPage;