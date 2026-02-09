import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  Building2,
  Palmtree,
  Coffee,
  Utensils,
  Briefcase,
  Compass,
  TrendingUp,
  PenTool,
  FileText,
  Hammer,
  CheckCircle2,
} from "lucide-react";
import Navbar from "./Navbar";
import "./AboutPage.css";

// --- IMPORT ASSETS ---
import logoDoggerImg from "../assets/logo-dogger.jpg";
import photo1 from "../assets/foto-1.jpg";
import photo2 from "../assets/foto-2.jpg";
import photo3 from "../assets/foto-3.jpg";
import photo4 from "../assets/foto-4.jpg";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Data Statistik untuk Hero
  const statsData = [
    { number: "20+", label: "Tahun Pengalaman" },
    { number: "300+", label: "Proyek Selesai" },
    { number: "100%", label: "Klien Puas" },
    { number: "A+", label: "Grade Material" },
  ];

  return (
    <div className="op10-root">
      <Navbar />

      <main>
        {/* --- SECTION 1: HERO (STAGGERED GRID & SPLIT TEXT) --- */}
        <section className="section-hero op10-container">
          <div className="hero-grid">
            {/* Kiri: Teks */}
            <div className="hero-text">
              <span className="sub-header">Profil Perusahaan</span>
              <h1 className="main-header">Doger Interior</h1>

              {/* Container Teks Rapi (Split Paragraphs) */}
              <div className="text-content-wrapper">
                <p className="text-paragraph">
                  Selama kami berkarya, kami percaya bahwa kualitas sejati
                  adalah harmoni antara ketahanan material dengan kenyamanan
                  penghuninya. Bagi kami, setiap proyek bukan hanya sekadar
                  memproduksi furniture, melainkan sebuah kolaborasi erat untuk
                  menciptakan ruangan yang benar-benar mewakili karakter dan
                  kebutuhan client.
                </p>

                <p className="text-paragraph">
                  Kami percaya bahwa setiap ruang memiliki cerita unik. Oleh
                  karena itu, <strong>Doger Interior</strong> hadir untuk
                  mengintegrasikan keahlian teknis yang telah terasah selama 20
                  tahun dengan detail desain yang dipersonalisasikan sepenuhnya.
                  Kami menciptakan solusi ruang yang cerdas melalui penguasaan
                  berbagai material unggulan – mulai dari{" "}
                  <strong>Multiplek, PVC Board hingga Aluminium</strong>.
                </p>

                <p className="text-paragraph">
                  Bersama kami, Anda mendapatkan jaminan kualitas melalui
                  pengerjaan teliti di workshop kami serta pendampingan personal
                  mulai dari desain hingga instalasi. Kami menjunjung tinggi
                  profesionalisme melalui
                  <strong> transparansi di setiap langkah</strong>, memberikan
                  update berkala agar Anda memiliki ketenangan pikiran
                  sepenuhnya.
                </p>
              </div>

              <div className="est-badge-hero">Est. 2019 — Depok</div>
            </div>

            {/* Kanan: Foto Grid Staggered & Stats */}
            <div className="hero-right-wrapper">
              <div className="photo-grid-container">
                <div className="four-photo-grid">
                  {/* Foto 1: Kiri Atas */}
                  <img
                    src={photo1}
                    alt="Project 1"
                    className="grid-img grid-img-1"
                  />

                  {/* Foto 2: Kanan Atas (Turun Dikit) */}
                  <img
                    src={photo2}
                    alt="Project 2"
                    className="grid-img grid-img-2"
                  />

                  {/* Foto 3: Kiri Bawah */}
                  <img
                    src={photo3}
                    alt="Project 3"
                    className="grid-img grid-img-3"
                  />

                  {/* Foto 4: Kanan Bawah (Turun Dikit) */}
                  <img
                    src={photo4}
                    alt="Project 4"
                    className="grid-img grid-img-4"
                  />
                </div>

                {/* Logo Mengapung di Tengah */}
                <div className="center-logo-overlay">
                  <img src={logoDoggerImg} alt="Logo Doger" />
                </div>
              </div>

              {/* Statistik Kecil */}
              <div className="hero-small-stats">
                {statsData.map((item, index) => (
                  <div key={index} className="small-stat-item">
                    <strong>{item.number}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: PROJECT SCOPE --- */}
        <section className="section-scope">
          <div className="op10-container center">
            <div className="scope-heading-wrapper">
              <h3 className="scope-heading">Project Scope</h3>
              <div className="scope-line"></div>
            </div>

            <div className="scope-grid-original">
              <ScopeItem icon={<Home size={32} />} label="Home" />
              <ScopeItem icon={<Building2 size={32} />} label="Apartment" />
              <ScopeItem icon={<Palmtree size={32} />} label="Villa" />
              <ScopeItem icon={<Coffee size={32} />} label="Cafe" />
              <ScopeItem icon={<Utensils size={32} />} label="Resto" />
              <ScopeItem icon={<Briefcase size={32} />} label="Office" />
            </div>
          </div>
        </section>

        {/* --- SECTION 3: ALUR KERJA --- */}
        <section className="section-process">
          <div className="op10-container">
            <div className="center Heading-wrapper">
              <span className="sub-header">Tahapan Pemesanan</span>
              <h2 className="main-header">Proses Terstruktur</h2>
              <div className="header-line"></div>
            </div>

            <div className="process-grid">
              <ProcessCard
                step="01"
                icon={<Compass size={28} />}
                title="Konsultasi"
                desc="Diskusi kebutuhan & konsep."
              />
              <ProcessCard
                step="02"
                icon={<TrendingUp size={28} />}
                title="Survey Lokasi"
                desc="Pengukuran presisi di lokasi."
              />
              <ProcessCard
                step="03"
                icon={<PenTool size={28} />}
                title="Design 3D"
                desc="Visualisasi desain final."
              />
              <ProcessCard
                step="04"
                icon={<FileText size={28} />}
                title="Invoice & DP"
                desc="Administrasi & jadwal produksi."
              />
              <ProcessCard
                step="05"
                icon={<Hammer size={28} />}
                title="Produksi"
                desc="Pengerjaan di workshop kami."
              />
              <ProcessCard
                step="06"
                icon={<CheckCircle2 size={28} />}
                title="Instalasi"
                desc="Pemasangan akhir di lokasi."
              />
            </div>
          </div>
        </section>
      </main>

      <Link to="/" className="back-float">
        <ArrowLeft size={24} />
      </Link>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const ProcessCard = ({ step, icon, title, desc }) => (
  <div className="process-card">
    <span className="process-step-number">{step}</span>
    <div className="process-content">
      <div style={{ color: "var(--color-brown)", marginBottom: "15px" }}>
        {icon}
      </div>
      <h4
        style={{
          fontWeight: "700",
          marginBottom: "10px",
          color: "var(--color-dark)",
          fontSize: "1.2rem",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: "0.95rem",
          color: "var(--color-gray)",
          lineHeight: 1.6,
        }}
      >
        {desc}
      </p>
    </div>
  </div>
);

const ScopeItem = ({ icon, label }) => (
  <div className="scope-item">
    {icon}
    <span>{label}</span>
  </div>
);

export default AboutPage;
