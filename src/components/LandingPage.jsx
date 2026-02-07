import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Phone,
  Mail,
  ArrowUpRight,
  CheckCircle,
  Layout,
  Box,
  Layers,
  Globe,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Star,
  DollarSign,
  Send,
  MapPin,
  Clock,
  Hammer,
  Truck,
  PenTool,
  Calendar,
  MessageSquare
} from "lucide-react";

import "./LandingPage.css";

// --- IMPORT ASSETS ---
import heroImg from "../assets/foto-9.jpg";
import img1 from "../assets/foto-1.jpg";
import img2 from "../assets/foto-2.jpg";
import img3 from "../assets/foto-3.jpg";
import img5 from "../assets/foto-5.jpg";
import img6 from "../assets/foto-6.jpg";
import img7 from "../assets/foto-7.jpg";
import img8 from "../assets/foto-8.jpg";
import img10 from "../assets/foto-10.jpg";

// --- DATA SERVICES ---
const SERVICES_DATA = [
  {
    id: "kitchen",
    title: "Kitchen Set",
    desc: "Dapur ergonomis dengan material anti-rayap (PVC), Multiplek, atau Aluminium.",
    img: img7,
    icon: <Layout />,
  },
  {
    id: "wardrobe",
    title: "Wardrobe",
    desc: "Solusi penyimpanan cerdas, rapi, dan menawan untuk koleksi pribadi Anda.",
    img: img8,
    icon: <Box />,
  },
  {
    id: "living",
    title: "Backdrop TV",
    desc: "Area TV mewah dan tertata rapi tanpa drama kabel berantakan.",
    img: img3,
    icon: <Layers />,
  },
  {
    id: "storage",
    title: "Lemari Bawah Tangga",
    desc: "Manfaatkan area kosong menjadi storage multifungsi yang estetik.",
    img: img6,
    icon: <Globe />,
  },
];

// --- DATA TAHAPAN PEMESANAN ---
const PROCESS_DATA = [
  { id: "01", title: "Konsultasi (Gratis)", desc: "Diskusikan kebutuhan, konsep, dan material bersama tim kami.", icon: <MessageSquare size={20} /> },
  { id: "02", title: "Survey Lokasi", desc: "Tim kami melakukan pengukuran secara langsung di lokasi client.", icon: <Calendar size={20} /> },
  { id: "03", title: "Design 3D & Visual", desc: "Draft visual profesional (Biaya Rp.500.000) hingga kesepakatan final.", icon: <PenTool size={20} /> },
  { id: "04", title: "Invoice & DP 1", desc: "Pembayaran DP 1 untuk mengikat jadwal dan pengadaan material.", icon: <CheckCircle size={20} /> },
  { id: "05", title: "Proses Produksi", desc: "Pengerjaan di workshop kami sesuai spesifikasi material yang disetujui.", icon: <Hammer size={20} /> },
  { id: "06", title: "Instalasi", desc: "Proses pemasangan akhir di lokasi hingga proyek selesai sempurna.", icon: <Truck size={20} /> },
];

const FAQ_DATA = [
  { q: "Berapa lama pengerjaan?", a: "Estimasi 14-21 hari kerja setelah desain 3D disetujui, tergantung antrian produksi." },
  { q: "Apakah survei gratis?", a: "Ya, Survei & Konsultasi GRATIS untuk seluruh wilayah Jabodetabek." },
  { q: "Material apa yang dipakai?", a: "Kami menggunakan Multiplek, PVC Board (Anti Rayap), atau Aluminium dengan finishing HPL/Duco." },
];

const PROJECT_CATEGORIES = [
  {
    title: "KITCHEN SET & PANTRY",
    desc: "Spesialis Jasa Pembuatan Kitchen Set, Pantry, & Minibar Custom Anti-Rayap.",
    projectInfo: "Residential (Rumah/Apartemen) & Commercial Area.",
    hasContact: true,
    items: [
      { img: img1, title: "Modern Minibar", cat: "Kitchen" },
      { img: img7, title: "Scandinavian Kitchen", cat: "Kitchen" },
      { img: img2, title: "Dry Kitchen", cat: "Pantry" },
      { img: img10, title: "Classic Kitchen", cat: "Kitchen" },
      { img: img5, title: "Industrial Pantry", cat: "Pantry" },
      { img: img8, title: "Wet Kitchen", cat: "Kitchen" },
    ],
  },
  {
    title: "WARDROBE & LEMARI",
    items: [
      { img: img8, title: "Walk-in Closet", cat: "Bedroom" },
      { img: img2, title: "Lemari Anak", cat: "Bedroom" },
      { img: img6, title: "Lemari Bawah Tangga", cat: "Storage" },
      { img: img3, title: "Glass Wardrobe", cat: "Luxury" },
    ],
  },
];

// --- KOMPONEN PROJECT SLIDER (FIX: hasContact digunakan di sini) ---
const ProjectSlider = ({ title, desc, projectInfo, hasContact, items }) => {
  const [current, setCurrent] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025) setItemsPerPage(3);
      else if (window.innerWidth >= 600) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = items.length - itemsPerPage;
  const nextSlide = () => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <div className="project-category-wrapper fade-up">
      <div className="cat-title-wrap">
        <h3 className="cat-title">{title}</h3>
        {desc && <p className="cat-desc">{desc}</p>}
        {projectInfo && <p className="cat-project">{projectInfo}</p>}
        
        {/* VARIABEL hasContact DIGUNAKAN DI SINI UNTUK MENAMPILKAN TOMBOL WA */}
        {hasContact && (
          <div style={{ marginTop: "15px" }}>
            <a 
              href="https://wa.me/6285282773811?text=Halo%20Doger%20Interior,%20saya%20tertarik%20untuk%20konsultasi%20proyek." 
              target="_blank" 
              rel="noreferrer"
              className="btn-wa-small"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontWeight: 'bold' }}
            >
              <MessageCircle size={16} /> Konsultasi Project Ini
            </a>
          </div>
        )}
      </div>

      <div className="slider-container-relative">
        <button onClick={prevSlide} className="btn-nav-abs left"><ChevronLeft size={24} /></button>
        <div className="carousel-window-small">
          <div className="carousel-track" style={{ transform: `translateX(-${current * (100 / itemsPerPage)}%)` }}>
            {items.map((item, i) => (
              <div key={i} className="carousel-card-small" style={{ minWidth: `${100 / itemsPerPage}%` }}>
                <div className="gal-item-card-small">
                  <img src={item.img} alt={item.title} />
                  <div className="gal-overlay-small">
                    <h4>{item.title}</h4>
                    <span>{item.cat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={nextSlide} className="btn-nav-abs right"><ChevronRight size={24} /></button>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({ nama: "", wa: "", pesan: "" });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const kirimKeWA = (e) => {
    e.preventDefault();
    const nomorHP = "6285282773811";
    const text = `Halo Doger Interior, perkenalkan saya *${formData.nama}* (No.WA: ${formData.wa}).%0A%0ASaya ingin konsultasi: ${formData.pesan}`;
    window.open(`https://wa.me/${nomorHP}?text=${text}`, "_blank");
  };

  return (
    <div className="op10-root">
      {/* 1. NAVBAR */}
      <nav className={`op10-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="op10-container nav-flex">
          <div className="nav-brand"><Link to="/">DOGER<span>.STUDIO</span></Link></div>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <a href="#hero" onClick={() => setMenuOpen(false)}>Home</a>
            <Link to="/about">Tentang</Link>
            <Link to="/services">Layanan</Link>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Projek</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Kontak</a>
            <span className="close-menu mobile-only" onClick={() => setMenuOpen(false)}><X /></span>
          </div>
          <div className="nav-actions">
            <Link to="/contact" className="btn-nav-cta">Konsultasi</Link>
            <button className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header id="hero" className="op10-hero-split">
        <div className="hero-left">
          <div className="hl-content fade-up">
            <span className="badge-hero">EST. 2004 — DEPOK</span>
            <h1 className="hero-title">Wujudkan Interior <br /><span className="text-highlight">Impian Anda</span></h1>
            <p className="hero-desc">
              Spesialis Kitchen Set & Interior Custom dengan material premium anti-rayap. Berbekal pengalaman lebih dari 20 tahun menghadirkan solusi ruang presisi.
            </p>
            <div className="hero-btns">
              <a href="#contact" className="btn-primary">Hubungi Kami <ArrowRight size={18} /></a>
              <a href="#gallery" className="btn-secondary">Lihat Karya</a>
            </div>
          </div>
        </div>
        <div className="hero-right fade-in">
          <img src={heroImg} alt="Luxury Kitchen Set" />
        </div>
      </header>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="op10-section bg-cream">
        <div className="op10-container grid-2">
          <div className="about-img-wrap fade-up delay-1">
            <img src={img2} alt="About Us" />
            <div className="exp-badge"><span>20+ TH</span><small>PENGALAMAN</small></div>
          </div>
          <div className="about-text fade-up delay-2">
            <span className="sub-head">TENTANG KAMI</span>
            <h2>MENGAPA MEMILIH DOGER INTERIOR?</h2>
            <div className="vertical-features-list">
              <div className="v-feature-card">
                <div className="v-icon-circle"><ShieldCheck size={28} /></div>
                <div className="v-card-text">
                  <h4>Opsi Material Beragam</h4>
                  <p>Mulai dari Aluminium (anti-rayap), Multiplek, hingga PVC Board berkualitas tinggi.</p>
                </div>
              </div>
              <div className="v-feature-card">
                <div className="v-icon-circle"><Star size={28} /></div>
                <div className="v-card-text">
                  <h4>Transparansi Proyek</h4>
                  <p>Update perkembangan pengerjaan secara nyata dan berkala untuk ketenangan pikiran Anda.</p>
                </div>
              </div>
              <div className="v-feature-card">
                <div className="v-icon-circle"><DollarSign size={28} /></div>
                <div className="v-card-text">
                  <h4>Custom & Personal</h4>
                  <p>Desain fleksibel mengikuti preferensi estetika anda dan kebutuhan fungsional harian.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="op10-section bg-white">
        <div className="op10-container">
          <div className="section-head center fade-up">
            <span className="sub-head">LAYANAN KAMI</span>
            <h2>SOLUSI INTERIOR LENGKAP</h2>
          </div>
          <div className="services-grid-cards">
            {SERVICES_DATA.map((srv, index) => (
              <div key={srv.id} className="srv-card fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="srv-img">
                  <img src={srv.img} alt={srv.title} />
                  <div className="srv-icon-box">{srv.icon}</div>
                </div>
                <div className="srv-body"><h3>{srv.title}</h3><p>{srv.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section id="process" className="op10-section bg-white">
        <div className="op10-container">
          <div className="section-head center fade-up">
            <span className="sub-head">ALUR KERJA</span>
            <h2>6 TAHAPAN PEMESANAN</h2>
          </div>
          <div className="process-grid">
            {PROCESS_DATA.map((item, index) => (
              <div key={item.id} className="process-item fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="process-num-wrap">
                  <span className="process-num">{item.id}</span>
                  <div className="process-icon-small">{item.icon}</div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY SECTION */}
      <section id="gallery" className="op10-section bg-dark text-cream">
        <div className="op10-container">
          <div className="section-head center fade-up">
            <span className="sub-head text-cream">PORTOFOLIO</span>
            <h2>HASIL KARYA KAMI</h2>
          </div>
          <div className="multi-slider-wrapper">
            {PROJECT_CATEGORIES.map((category, idx) => (
              <ProjectSlider key={idx} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT & FAQ SECTION */}
      <section id="contact" className="op10-section bg-cream">
        <div className="op10-container contact-split-grid">
          <div className="faq-side fade-up">
            <span className="sub-head">HUBUNGI KAMI</span>
            <h2>Konsultasi Gratis Sekarang</h2>
            <div className="faq-wrapper">
              {FAQ_DATA.map((faq, i) => (
                <div key={i} className={`faq-box ${openFaq === i ? "open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="faq-head">
                    {faq.q} {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  {openFaq === i && <div className="faq-body">{faq.a}</div>}
                </div>
              ))}
            </div>
            <div className="contact-info-footer">
              <div className="info-item-row"><Phone size={18} /> 0852-8277-3811</div>
              <div className="info-item-row"><Mail size={18} /> doger.interior@gmail.com</div>
              <div className="info-item-row"><MapPin size={18} /> Grogol, Limo, Kota Depok, Jawa Barat</div>
            </div>
          </div>
          <div className="contact-form-side fade-up delay-1">
            <div className="form-card-glass">
              <h3>Kirim Pesan</h3>
              <form onSubmit={kirimKeWA}>
                <div className="form-group"><label>Nama Lengkap</label><input type="text" name="nama" onChange={handleInput} required /></div>
                <div className="form-group"><label>Nomor WhatsApp</label><input type="tel" name="wa" onChange={handleInput} required /></div>
                <div className="form-group"><label>Kebutuhan Anda</label><textarea name="pesan" rows="3" onChange={handleInput} required></textarea></div>
                <button type="submit" className="btn-primary w-100">KIRIM PESAN <Send size={18} /></button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="op10-footer">
        <div className="op10-container footer-content">
          <div className="f-brand">
            <h2>DOGER<span>.STUDIO</span></h2>
            <p>Jasa Interior & Kitchen Set Profesional Jabodetabek.</p>
          </div>
          <div className="f-contact">
            <h5>WORKSHOP</h5>
            <p>Jl. H. Ahmad Nado 1 No.126, Depok.</p>
          </div>
          <div className="f-social">
            <a href="https://instagram.com/doger.interior" target="_blank" rel="noreferrer"><Instagram /></a>
            <a href="https://wa.me/6285282773811"><MessageCircle /></a>
          </div>
        </div>
        <div className="footer-copyright">© 2026 Doger Interior. All Rights Reserved.</div>
      </footer>
    </div>
  );
}

export default LandingPage;