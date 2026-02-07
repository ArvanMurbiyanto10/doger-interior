import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Home, Building2, Utensils, Coffee, Briefcase, Palmtree, // Scope Icons
  CheckCircle2, Clock, Hammer, Compass, PenTool, FileText, // Process Icons
  Users, Award, TrendingUp // Stat Icons
} from "lucide-react";

import Navbar from "./Navbar"; 
import "./AboutPage.css"; 

// --- KONFIGURASI WARNA ---
const COLORS = {
  cream: "#EBD9B4",
  brown: "#5D4037",
  dark: "#1a1a1a",
  textGray: "#555"
};

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="op10-root" style={{ backgroundColor: "#fff" }}>
      <Navbar />

      <main style={{ paddingTop: "100px" }}>
        
        {/* --- SECTION 1: HERO INTRO & PHOTO --- */}
        <section className="op10-container" style={{ paddingBottom: "80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "60px", alignItems: "center" }}>
            {/* Kolom Teks */}
            <div>
               <span style={subHeaderStyle}>Profil Perusahaan</span>
               <h1 style={mainHeaderStyle}>
                 <span style={{ color: COLORS.brown }}>Doger Interior</span>
               </h1>
               <p style={paragraphStyle}>
                 Selama kami berkarya, kami percaya bahwa kualitas sejati adalah harmoni antara ketahanan material dengan kenyamanan penghuninya. Bagi kami, setiap proyek bukan hanya sekadar memproduksi furniture, melainkan sebuah kolaborasi erat untuk menciptakan ruangan yang benar-benar mewakili karakter dan kebutuhan client.
               </p>
            </div>
            {/* Kolom FOTO PLACEHOLDER */}
            <div style={{ 
              height: "450px", 
              backgroundColor: "#ddd", 
              borderRadius: "12px",
              position: "relative",
              overflow: "hidden",
              display: "flex", justifyContent: "center", alignItems: "center", color: "#999"
            }}>
              (Tempat Foto: Suasana Workshop / Detail Finishing Kayu)
              <div style={{ position: "absolute", bottom: "30px", left: "-30px", backgroundColor: COLORS.cream, padding: "20px 40px", borderRadius: "4px" }}>
                <span style={{ fontWeight: "700", color: COLORS.brown }}>Est. 2004 — Depok</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: STATISTIK BAR --- */}
        <section style={{ backgroundColor: COLORS.brown, color: COLORS.cream, padding: "60px 0" }}>
          <div className="op10-container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px", textAlign: "center" }}>
               <StatBox icon={<TrendingUp size={32} />} number="20+" label="Tahun Pengalaman" /> {/*  */}
               <StatBox icon={<CheckCircle2 size={32} />} number="300+" label="Proyek Selesai" />
               <StatBox icon={<Users size={32} />} number="100%" label="Klien Puas" />
               <StatBox icon={<Award size={32} />} number="A+" label="Grade Material" />
            </div>
          </div>
        </section>

        {/* --- SECTION 3: NARASI DETAIL & NILAI --- */}
        <section className="op10-container" style={{ padding: "100px 0" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "800", color: COLORS.dark, marginBottom: "20px" }}>Standar & Filosofi Kami</h2>
            <div style={{ width: "60px", height: "3px", backgroundColor: COLORS.cream, margin: "0 auto" }}></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "start" }}>
            <div style={paragraphStyle}>
              <h3 style={{ fontWeight: "700", marginBottom: "15px", color: COLORS.brown }}>Material Adalah Kunci</h3>
              <p>
                Kami percaya setiap ruang memiliki cerita unik. Doger Interior mengintegrasikan keahlian teknis yang terasah selama 20 tahun dengan detail desain yang dipersonalisasikan sepenuhnya. Kami menciptakan solusi ruang cerdas melalui penguasaan berbagai material unggulan mulai dari Multiplek, PVC Board hingga Aluminium.
              </p>
            </div>
            <div style={paragraphStyle}>
              <h3 style={{ fontWeight: "700", marginBottom: "15px", color: COLORS.brown }}>Transparansi Total</h3>
              <p>
                Kami menjunjung tinggi profesionalisme melalui transparansi disetiap langkah. Kami memastikan Anda selalu mendapatkan update perkembangan proyek secara nyata dan berkala sehingga Anda memiliki ketenangan pikiran.
              </p>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: ALUR KERJA (Tahapan Pemesanan) --- */}
        <section style={{ backgroundColor: "#f9f9f9", padding: "100px 0" }}>
           <div className="op10-container">
             <div style={{ marginBottom: "60px" }}>
               <span style={subHeaderStyle}>Tahapan Pemesanan</span>
               <h2 style={{ fontSize: "2rem", fontWeight: "800" }}>Proses Terstruktur</h2>
             </div>
             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px" }}>
               <ProcessCard step="01" icon={<Compass />} title="Konsultasi (Gratis)" desc="Diskusikan kebutuhan, konsep, dan material bersama tim kami baik secara online atau offline." />
               <ProcessCard step="02" icon={<TrendingUp />} title="Survey Lokasi" desc="Tim kami melakukan pengukuran secara langsung di lokasi client untuk hasil presisi." />
               <ProcessCard step="03" icon={<PenTool />} title="Design 3D & Visualisasi" desc="Draft visual professional dengan biaya Rp.500.000, termasuk revisi hingga desain mencapai kesepakatan final." />
               <ProcessCard step="04" icon={<FileText />} title="Invoice & DP 1" desc="Pengiriman invoice resmi berdasarkan desain final dan pembayaran DP 1 untuk mengikat jadwal." />
               <ProcessCard step="05" icon={<Hammer />} title="Proses Produksi" desc="Pengerjaan interior di workshop kami sesuai spesifikasi material dan teknis yang telah disetujui." />
               <ProcessCard step="06" icon={<CheckCircle2 />} title="Instalasi & Pemasangan" desc="Proses pemasangan akhir di lokasi hingga proyek selesai sempurna sesuai referensi." />
             </div>
           </div>
        </section>

        {/* --- SECTION 5: TEAM / WORKSHOP PHOTO --- */}
        <section className="op10-container" style={{ padding: "100px 0" }}>
          <div style={{ 
            height: "500px", 
            backgroundColor: "#ddd", 
            borderRadius: "16px", 
            display: "flex", alignItems: "flex-end", padding: "40px",
            position: "relative", overflow: "hidden"
          }}>
             <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#999", textAlign: "center" }}>
               (Tempat Foto: Kesibukan di Workshop)<br/>
               Bersama doger.interior, Anda mendapatkan jaminan kualitas melalui pengerjaan teliti di workshop kami.
             </div>
             <div style={{ position: "relative", zIndex: 2, backgroundColor: "rgba(255,255,255,0.9)", padding: "30px", borderRadius: "8px", maxWidth: "500px" }}>
               <h3 style={{ fontWeight: "700", marginBottom: "10px", color: COLORS.brown }}>Pendampingan Personal</h3>
               <p style={{ color: COLORS.textGray }}>Kami memberikan pendampingan penuh dan personal, mulai dari tahap desain, pemilihan material, hingga proses instalasi akhir di lokasi client.</p>
             </div>
          </div>
        </section>

        {/* --- SECTION 6: PROJECT SCOPE --- */}
        <section style={{ backgroundColor: COLORS.brown, padding: "80px 0", color: "#fff" }}>
          <div className="op10-container">
            <div style={{ marginBottom: "50px" }}>
              <h3 style={{ 
                backgroundColor: "#ffffff", color: COLORS.brown, 
                display: "inline-block", padding: "8px 25px", 
                fontSize: "1rem", fontWeight: "800", textTransform: "uppercase"
              }}>
                Project Scope
              </h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px" }}>
              <ScopeItem icon={<Home />} label="Home" /> {/*  */}
              <ScopeItem icon={<Building2 />} label="Apartment" /> {/*  */}
              <ScopeItem icon={<Palmtree />} label="Villa & Resort" /> {/*  */}
              <ScopeItem icon={<Coffee />} label="Cafe" /> {/*  */}
              <ScopeItem icon={<Utensils />} label="Restaurant" /> {/*  */}
              <ScopeItem icon={<Briefcase />} label="Office" /> {/*  */}
            </div>
          </div>
        </section>

      </main>

      <Link to="/" className="op10-back-float" style={{ 
        position: 'fixed', bottom: '40px', left: '40px',
        backgroundColor: COLORS.cream, padding: "15px", borderRadius: "50%",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)", color: COLORS.brown, zIndex: 100
      }}>
        <ArrowLeft size={24} />
      </Link>
    </div>
  );
};

// --- SUB-KOMPONEN ---

const StatBox = ({ icon, number, label }) => (
  <div>
    <div style={{ marginBottom: "15px", opacity: 0.8 }}>{icon}</div>
    <div style={{ fontSize: "2.5rem", fontWeight: "800", lineHeight: 1 }}>{number}</div>
    <div style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", marginTop: "10px", opacity: 0.9 }}>{label}</div>
  </div>
);

const ProcessCard = ({ step, icon, title, desc }) => (
  <div style={{ position: "relative", paddingLeft: "20px", borderLeft: `2px solid ${COLORS.cream}`, marginBottom: "20px" }}>
    <span style={{ fontSize: "2.5rem", fontWeight: "900", color: "#e0e0e0", position: "absolute", top: "-15px", left: "10px", zIndex: 0 }}>{step}</span>
    <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{ color: COLORS.brown, marginBottom: "10px" }}>{icon}</div>
      <h4 style={{ fontWeight: "700", marginBottom: "8px", color: COLORS.dark }}>{title}</h4>
      <p style={{ fontSize: "0.9rem", color: COLORS.textGray, lineHeight: 1.5 }}>{desc}</p>
    </div>
  </div>
);

const ScopeItem = ({ icon, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "15px", fontSize: "1.2rem", fontWeight: "600", padding: "15px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px" }}>
    {icon} {label}
  </div>
);

// --- STYLES ---
const subHeaderStyle = {
  display: "inline-block", textTransform: "uppercase", letterSpacing: "2px", 
  fontSize: "0.85rem", fontWeight: "700", color: COLORS.brown, marginBottom: "20px",
  borderBottom: `2px solid ${COLORS.cream}`, paddingBottom: "5px"
};
const mainHeaderStyle = {
  fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: "800", lineHeight: "1.1", marginBottom: "30px", color: COLORS.dark
};
const paragraphStyle = {
  fontSize: "1.1rem", lineHeight: "1.8", color: COLORS.textGray
};

export default AboutPage;