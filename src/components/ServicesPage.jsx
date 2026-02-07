import React, { useEffect } from "react";
import Navbar from "./Navbar";
import "../LandingPage.css";

// --- IMPORT FOTO DARI FOLDER LAYANAN ---
import imgKitchen from "../assets/Layanan/Kitchen Set.png";
import imgWardrobe from "../assets/Layanan/Wardrobe.jpg";
import imgTangga from "../assets/Layanan/Lemari Bawah Tangga.png";
import imgTV from "../assets/Layanan/Backdrop TV.png";
import imgSliding from "../assets/Layanan/Pintu Sliding Aluminium.png";
import imgKanopi from "../assets/Layanan/Kanopi WPC Duma.png";

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Kitchen Set",
      desc: "Hadirkan kemewahan di setiap sudut dapur dengan berbagai opsi material (multiplek, PVC Board, & Aluminium).",
      img: imgKitchen,
      cite: "29, 30"
    },
    {
      title: "Wardrobe",
      desc: "Solusi penyimpanan cerdas, rapi, dan menawan untuk setiap koleksi pribadi Anda.",
      img: imgWardrobe,
      cite: "32, 33"
    },
    {
      title: "Lemari Bawah Tangga",
      desc: "Manfaatkan area kosong bawah tangga menjadi storage multifungsi.",
      img: imgTangga,
      cite: "37, 38"
    },
    {
      title: "Backdrop TV",
      desc: "Area TV mewah dan tertata rapi tanpa drama kabel berantakan.",
      img: imgTV,
      cite: "41, 42"
    },
    {
      title: "Pintu Sliding Aluminium",
      desc: "Sekat ruangan fleksibel tanpa mengurangi keindahan.",
      img: imgSliding,
      cite: "43, 44"
    },
    {
      title: "Kanopi WPC Duma",
      desc: "Kombinasi atap kokoh dengan plafon motif kayu elegan dan anti-rayap.",
      img: imgKanopi,
      cite: "46, 47"
    }
  ];

  return (
    <div className="op10-root" style={{ backgroundColor: "#ffffff" }}>
      <Navbar />

      <main style={{ paddingTop: "140px", paddingBottom: "100px" }}>
        {/* Header Section */}
        <section className="op10-container" style={{ marginBottom: "60px" }}>
          <span style={{ 
            backgroundColor: "#EBD9B4", 
            padding: "8px 20px", 
            fontWeight: "700", 
            fontSize: "0.9rem",
            textTransform: "uppercase",
            marginBottom: "20px",
            display: "inline-block"
          }}>
            Layanan Kami
          </span>
          <h1 style={{ fontSize: "2.8rem", fontWeight: "800", color: "#333", lineHeight: "1.2" }}>
            Masih konsep dasar
          </h1>
        </section>

        {/* Services Grid with Real Photos */}
        <section className="op10-container">
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
            gap: "40px" 
          }}>
            {services.map((item, index) => (
              <div 
                key={index} 
                className="service-card-modern"
                style={{ 
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  border: "1px solid #eee",
                  backgroundColor: "#fff"
                }}
              >
                {/* Foto Layanan */}
                <div style={{ width: "100%", height: "250px", overflow: "hidden" }}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      transition: "transform 0.5s ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>

                {/* Konten Teks */}
                <div style={{ padding: "30px" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "15px", color: "#5D4037" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "#666", lineHeight: "1.8", fontSize: "1rem" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kenapa Memilih Kami Section (Halaman 1 KONSEP.pdf) */}
        <section className="op10-container" style={{ marginTop: "100px" }}>
           <div style={{ borderTop: "1px solid #eee", paddingTop: "60px" }}>
              <h2 style={{ marginBottom: "40px", textAlign: "center", color: "#333" }}>Mengapa Memilih doger.interior?</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
                 <div style={featureBoxStyle}>
                    <h4>Custom Sesuai Keinginan</h4>
                    <p>Desain fleksibel mengikuti preferensi estetika anda (Minimalis, Klasik, dll) [cite: 3, 4]</p>
                 </div>
                 <div style={featureBoxStyle}>
                    <h4>Konsultasi Fleksibel</h4>
                    <p>Layanan diskusi dua arah yang dapat dilakukan secara online/offline [cite: 5, 6]</p>
                 </div>
                 <div style={featureBoxStyle}>
                    <h4>Transparansi Total</h4>
                    <p>Update perkembangan proyek secara nyata dan berkala sehingga anda memiliki ketenangan pikiran [cite: 14, 15]</p>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
};

const featureBoxStyle = {
  backgroundColor: "#f9f9f9",
  padding: "30px",
  borderRadius: "8px",
  borderBottom: "4px solid #EBD9B4"
};

export default ServicesPage;