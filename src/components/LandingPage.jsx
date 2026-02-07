import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
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
  PenTool,
  MessageSquare,
  Send,
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
    desc: "Dapur ergonomis dengan material anti-rayap (PVC) atau HPL Premium.",
    img: img7,
    icon: <Layout />,
  },
  {
    id: "wardrobe",
    title: "Wardrobe",
    desc: "Lemari pakaian full-plafon dengan desain mewah dan fungsional.",
    img: img8,
    icon: <Box />,
  },
  {
    id: "living",
    title: "Living Room",
    desc: "Backdrop TV dan partisi ruangan yang mempercantik hunian.",
    img: img3,
    icon: <Layers />,
  },
  {
    id: "commercial",
    title: "Commercial",
    desc: "Interior kantor dan cafe yang meningkatkan citra bisnis Anda.",
    img: img5,
    icon: <Globe />,
  },
];

// --- DATA PROJECT ---
const PROJECT_CATEGORIES = [
  {
    title: "Apartemen Branz BSD",
    clientName: "Proyek Ibu Shiiella",
    items: [img1, img7, img2, img10, img5, img8, img3],
  },
  {
    title: "Kota Wisata Cluster Paris",
    clientName: "Proyek Ibu Prameswari",
    items: [img8, img2, img6, img3, img1, img7, img5],
  },
  {
    title: "Project Sangihe",
    clientName: "Proyek Ibu Cisca",
    items: [img3, img5, img10, img6, img2, img8, img1],
  },
  {
    title: "Project Seamanan",
    clientName: "Proyek Ibu Alicia",
    items: [img2, img1, img7, img3, img5, img10, img8],
  },
  {
    title: "Commercial & Office",
    clientName: "Proyek Bapak Hartono - PIK 2",
    items: [img5, img6, img10, img1, img8, img3, img2],
  },
];

const FAQ_DATA = [
  {
    q: "Berapa lama pengerjaan?",
    a: "Estimasi 14-21 hari kerja setelah desain 3D disetujui.",
  },
  {
    q: "Apakah survei gratis?",
    a: "Ya, Survei & Konsultasi GRATIS untuk seluruh wilayah Jabodetabek.",
  },
  {
    q: "Material apa yang dipakai?",
    a: "Kami menggunakan Multiplek, Blockmin, atau PVC Board (Anti Rayap) dengan finishing HPL/Duco.",
  },
];

// --- COMPONENT SLIDER KHUSUS ---
const ProjectSlider = ({ title, clientName, items }) => {
  const [current, setCurrent] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) setItemsPerPage(5);
      else if (window.innerWidth >= 768) setItemsPerPage(3);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.ceil(items.length / itemsPerPage) - 1;
  const nextSlide = () => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));

  const waLink = `https://wa.me/6285282773811?text=Halo%20Doger%20Interior,%20saya%20tertarik%20dengan%20${encodeURIComponent(title)}`;

  return (
    <div className="project-block-ref fade-up">
      <div className="ref-header-banner">
        <div className="ref-text-content">
          <h3>{title}</h3>
          <p>{clientName}</p>
          <a href={waLink} target="_blank" rel="noreferrer" className="btn-ref-wa">
            HUBUNGI KAMI <ChevronRight size={16} />
          </a>
        </div>
      </div>

      <div className="ref-slider-container">
        <button onClick={prevSlide} className="btn-ref-nav left"><ChevronLeft size={24} /></button>
        <div className="ref-viewport">
          <div className="ref-track" style={{ transform: `translateX(-${current * 100}%)`, width: `${100 * Math.ceil(items.length / itemsPerPage)}%`, display: "flex", transition: "transform 0.5s ease-in-out" }}>
            {Array.from({ length: Math.ceil(items.length / itemsPerPage) }).map((_, pageIndex) => (
              <div key={pageIndex} className="ref-slide-page" style={{ width: "100%", display: "flex" }}>
                {items.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((imgSrc, i) => (
                  <div key={i} className="ref-card-item" style={{ width: `${100 / itemsPerPage}%` }}>
                    <div className="ref-img-wrap"><img src={imgSrc} alt="Project Detail" loading="lazy" /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button onClick={nextSlide} className="btn-ref-nav right"><ChevronRight size={24} /></button>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({ nama: "", wa: "", pesan: "" });

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
      {/* 1. HERO SECTION */}
      <header id="hero" className="op10-hero-split">
        <div className="hero-left">
          <div className="hl-content fade-up">
            <span className="badge-hero">EST. 2004 — DEPOK</span>
            <h1 className="hero-title">Wujudkan Interior <br /> <span className="text-highlight">Impian Anda</span></h1>
            <p className="hero-desc">Spesialis Kitchen Set & Interior Custom dengan material premium anti-rayap. Desain mewah, harga transparan, dan bergaransi.</p>
            <div className="hero-btns">
              <Link to="/contact" className="btn-primary">Hubungi Kami <ArrowRight size={18} /></Link>
              <a href="#gallery" className="btn-secondary">Lihat Karya</a>
            </div>
          </div>
        </div>
        <div className="hero-right fade-in"><img src={heroImg} alt="Hero" /><div className="hero-overlay-deco"></div></div>
      </header>

      {/* 2. WELCOME SECTION */}
      <section className="welcome-section bg-white">
        <div className="op10-container">
          <div className="welcome-top fade-up">
            <div className="welcome-ribbon"><h2>Welcome To Our Website</h2></div>
            <div className="welcome-brand"><div className="wb-logo">DOGER <span>INTERIOR</span></div><div className="wb-divider"></div><Link to="/contact" className="btn-consult-small">Konsultasi</Link></div>
          </div>
          <div className="welcome-main-card fade-up delay-1">
            <div className="wm-header"><h1><span className="accent-text">Doger Interior</span> - Jasa Interior Kitchen Set</h1><div className="wm-line"></div></div>
            <div className="wm-body"><p className="lead-paragraph"><strong>Doger Interior</strong> merupakan spesialis <em>jasa Interior Kitchen Set</em>. Kami melayani jasa pembuatan kitchen set aluminium minimalis baik untuk rumah, kantor, hotel, apartemen, restaurant dan lainnya.</p></div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION (MENGAPA MEMILIH - 5 POIN) */}
      <section id="about" className="op10-section bg-cream">
        <div className="op10-container grid-2">
          <div className="about-img-wrap fade-up delay-1">
            <img src={img2} alt="About" />
            <div className="exp-badge"><span>5+ TH</span><small>PENGALAMAN</small></div>
          </div>
          <div className="about-text fade-up delay-2">
            <span className="sub-head">TENTANG KAMI</span>
            <h2>MENGAPA MEMILIH DOGER INTERIOR?</h2>
            <p style={{ marginBottom: "30px", fontSize: "0.95rem", color: "#666" }}>
              Kami memahami bahwa rumah adalah investasi jangka panjang, itulah sebabnya kami berkomitmen memberikan yang terbaik melalui:
            </p>
            <div className="vertical-features-list">
              <div className="v-feature-card">
                <div className="v-icon-circle"><ShieldCheck size={28} /></div>
                <div className="v-card-text"><h4>Opsi Material Beragam</h4><p>Pilih material mulai dari Aluminium (anti-rayap), Multiplek, maupun PVC Board.</p></div>
              </div>
              <div className="v-feature-card">
                <div className="v-icon-circle"><Star size={28} /></div>
                <div className="v-card-text"><h4>Transparansi Proyek</h4><p>Update perkembangan pengerjaan secara berkala agar hasil sesuai ekspektasi.</p></div>
              </div>
              <div className="v-feature-card">
                <div className="v-icon-circle"><DollarSign size={28} /></div>
                <div className="v-card-text"><h4>Harga Terbaik</h4><p>Penawaran harga yang kompetitif dan transparan.</p></div>
              </div>
              <div className="v-feature-card">
                <div className="v-icon-circle"><PenTool size={28} /></div>
                <div className="v-card-text"><h4>Custom Sesuai Keinginan</h4><p>Desain fleksibel mengikuti preferensi estetika anda (Minimalis, Klasik, dll).</p></div>
              </div>
              <div className="v-feature-card">
                <div className="v-icon-circle"><MessageSquare size={28} /></div>
                <div className="v-card-text"><h4>Konsultasi Fleksibel</h4><p>Layanan diskusi dua arah yang dapat dilakukan secara online/offline.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="op10-section bg-white">
        <div className="op10-container">
          <div className="section-head center fade-up"><span className="sub-head">LAYANAN KAMI</span><h2>SOLUSI INTERIOR LENGKAP</h2></div>
          <div className="services-grid-cards">
            {SERVICES_DATA.map((srv, idx) => (
              <div key={srv.id} className="srv-card fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="srv-img"><img src={srv.img} alt={srv.title} /><div className="srv-icon-box">{srv.icon}</div></div>
                <div className="srv-body"><h3>{srv.title}</h3><p>{srv.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MATERIAL SECTION - BAGIAN YANG SUDAH DIPERBAIKI (3 POIN) */}
      <section className="op10-section bg-cream">
        <div className="op10-container">
          <div className="section-head center fade-up mb-50">
            <span className="sub-head">Pilihan Bahan / Material</span>
            <h2>SPESIALIS PEMAKAIAN BAHAN</h2>
          </div>

          <div className="grid-2">
            <div className="specialist-content fade-up">
              <p style={{ marginBottom: "25px", fontSize: "1.05rem" }}>
                Kami menyediakan opsi finishing berkualitas tinggi untuk
                menyesuaikan selera dan kebutuhan interior Anda.
              </p>

              <ul className="check-list-detailed">
                <li>
                  <div className="check-icon-box">
                    <CheckCircle size={20} />
                  </div>
                  <div className="check-text">
                    <strong>Lapis HPL (High Pressure Laminate)</strong>
                    <p>
                      Pilihan praktis dengan ribuan motif, mulai dari tekstur
                      kayu alami hingga warna solid modern. Memiliki daya tahan
                      tinggi terhadap goresan dan sangat mudah dibersihkan.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="check-icon-box">
                    <CheckCircle size={20} />
                  </div>
                  <div className="check-text">
                    <strong>Lapis Cat Duco (Doff / Glossy)</strong>
                    <p>
                      Memberikan hasil akhir yang sangat mulus dan seamless
                      (tanpa sambungan). Opsi glossy memberikan kesan mewah yang
                      memantulkan cahaya, sementara Doff memberikan kesan elegan
                      yang tenang dan berkelas.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="check-icon-box">
                    <CheckCircle size={20} />
                  </div>
                  <div className="check-text">
                    <strong>Kombinasi Material</strong>
                    <p>
                      Kami juga melayani perpaduan berbagai material dan
                      finishing untuk menciptakan dimensi ruang yang lebih unik,
                      artistik, dan personal.
                    </p>
                  </div>
                </li>
              </ul>

              <a href="#contact" className="btn-primary mt-30">
                Konsultasi Material
              </a>
            </div>

            <div className="specialist-img fade-up delay-1">
              <img src={img10} alt="Detail Material Kayu & Finishing" />
              <div className="material-badge">
                <span>PREMIUM</span>
                <small>FINISHING</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DESAIN & PRESISI */}
      <section className="op10-section bg-cream">
        <div className="op10-container grid-2-reverse">
          <div className="specialist-img fade-up delay-1"><img src={img10} alt="Presisi" /><div className="material-badge badge-left"><span>PREMIUM</span><small>QUALITY</small></div></div>
          <div className="specialist-content fade-up">
            <span className="sub-head">MATERIAL & KUALITAS</span><h2>DESAIN PRESISI</h2>
            <ul className="check-list">
              <li><CheckCircle size={18} className="icon-check" /> <strong>Kayu Solid & Plywood Grade A</strong></li>
              <li><CheckCircle size={18} className="icon-check" /> <strong>Finishing HPL Premium</strong></li>
              <li><CheckCircle size={18} className="icon-check" /> <strong>Aksesoris Berkualitas</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. FUNGSIONAL SECTION */}
      <section className="op10-section bg-cream">
        <div className="op10-container grid-2">
          <div className="specialist-content fade-up">
            <span className="sub-head">FUNGSIONAL & RAPI</span><h2>RUANG PENYIMPANAN MAKSIMAL</h2>
            <ul className="check-list">
              <li><CheckCircle size={18} className="icon-check" /> <strong>Rak Adjustable</strong></li>
              <li><CheckCircle size={18} className="icon-check" /> <strong>Hidden Storage</strong></li>
              <li><CheckCircle size={18} className="icon-check" /> <strong>Lighting Integration</strong></li>
            </ul>
          </div>
          <div className="specialist-img fade-up delay-1"><img src={img8} alt="Fungsional" /><div className="material-badge"><span>SMART</span><small>DESIGN</small></div></div>
        </div>
      </section>

      {/* 8. GALLERY */}
      <section id="gallery" className="op10-section bg-offwhite">
        <div className="op10-container">
          <div className="section-head center fade-up mb-50"><span className="sub-head">PORTOFOLIO</span><h2>HASIL KARYA KAMI</h2></div>
          <div className="multi-slider-wrapper">{PROJECT_CATEGORIES.map((cat, idx) => (<ProjectSlider key={idx} {...cat} />))}</div>
          <div className="center mt-40"><a href="https://instagram.com/doger.interior" className="btn-secondary" target="_blank" rel="noreferrer">Instagram Portfolio <ArrowUpRight size={18} /></a></div>
        </div>
      </section>

      {/* 9. FAQ & CONTACT */}
      <section id="contact" className="op10-section bg-cream">
        <div className="op10-container grid-2-faq">
          <div className="faq-left fade-up">
            <h2>FAQ</h2>
            <div className="faq-wrapper">
              {FAQ_DATA.map((faq, i) => (
                <div key={i} className={`faq-box ${openFaq === i ? "open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="faq-head">{faq.q} {openFaq === i ? <ChevronUp /> : <ChevronDown />}</div>
                  {openFaq === i && <div className="faq-body">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="contact-right fade-up delay-2">
            <div className="form-card">
              <h3>Mulai Konsultasi</h3>
              <form onSubmit={kirimKeWA}>
                <div className="form-group"><input type="text" name="nama" placeholder="Nama" onChange={handleInput} required /></div>
                <div className="form-group"><input type="tel" name="wa" placeholder="WhatsApp" onChange={handleInput} required /></div>
                <div className="form-group"><textarea name="pesan" rows="3" placeholder="Pesan" onChange={handleInput} required></textarea></div>
                <button type="submit" className="btn-primary w-100">Kirim <Send size={16} /></button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <a href="https://wa.me/6285282773811" target="_blank" rel="noreferrer" className="float-wa"><MessageCircle size={32} /></a>
    </div>
  );
}

export default LandingPage;