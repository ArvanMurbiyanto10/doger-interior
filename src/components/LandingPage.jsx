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
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Star,
  DollarSign,
  PenTool,
  MessageSquare,
  Send,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  ChevronsRight,
} from "lucide-react";

import "./LandingPage.css";

// --- IMPORT ASSETS UMUM ---
import heroImg from "../assets/foto-9.jpg";
import img2 from "../assets/foto-2.jpg"; // Foto About Section

// --- IMPORT LAYANAN ---
import imgKitchen from "../assets/kitchenset.png";
import imgWardrobe from "../assets/foto-8.jpg";
import imgTangga from "../assets/foto-6.jpg";
import imgTV from "../assets/foto-3.jpg";
import imgSliding from "../assets/foto-5.jpg";
import imgCommercial from "../assets/foto-10.jpg";

// --- IMPORT MATERIAL (SUDAH DIAKTIFKAN) ---
import imgMultiplek from "../assets/bahan-multiplek.jpg";
import imgPVC from "../assets/bahan-pvc.jpg";
import imgAluminium from "../assets/bahan-alumunium.jpg"; // Pastikan ejaan file benar

// =================================================================
// IMPORT FOTO PORTOFOLIO (SESUAI FOLDER ASSETS ANDA)
// =================================================================

// 1. Apartemen Branz BSD
import apt1 from "../assets/apartemen1.jpg";
import apt2 from "../assets/apartemen2.jpg";
import apt3 from "../assets/apartemen3.jpg";
import apt4 from "../assets/apartemen4.jpg";
import apt5 from "../assets/apartemen5.jpg";
import apt6 from "../assets/apartemen6.jpg";
import apt7 from "../assets/apartemen7.jpg";

// 2. Kota Wisata
import kota1 from "../assets/kotawisata1.jpg";
import kota2 from "../assets/kotawisata2.jpg";
import kota3 from "../assets/kotawisata3.jpg";
import kota4 from "../assets/kotawisata4.jpg";
import kota5 from "../assets/kotawisata5.jpg";
import kota6 from "../assets/kotawisata6.jpg";

// 3. Project Sangihe
import sang1 from "../assets/sangihe1.jpg";
import sang2 from "../assets/sangihe2.jpg";
import sang3 from "../assets/sangihe3.jpg";
import sang4 from "../assets/sangihe4.jpg";
import sang5 from "../assets/sangihe5.jpg";
import sang6 from "../assets/sangihe6.jpg";

// 4. Project Seamanan
import seam1 from "../assets/seamanan1.jpg";
import seam2 from "../assets/seamanan2.jpg";
import seam3 from "../assets/seamanan3.jpg";
import seam4 from "../assets/seamanan4.jpg";

// 5. Project Vanya Park
import vanya1 from "../assets/vanya1.jpg";
import vanya2 from "../assets/vanya2.jpg";
import vanya3 from "../assets/vanya3.jpg";
import vanya4 from "../assets/vanya4.jpg";

// --- DATA SERVICES ---
const SERVICES_DATA = [
  {
    id: 1,
    title: "Kitchen Set",
    desc: "Hadirkan kemewahan di setiap sudut dapur dengan berbagai opsi material (multiplek, PVC Board, & Aluminium).",
    img: imgKitchen,
    features: ["Anti Rayap & Lembap", "Finishing HPL/Duco"],
  },
  {
    id: 2,
    title: "Wardrobe",
    desc: "Solusi penyimpanan cerdas, rapi, dan menawan untuk setiap koleksi pribadi Anda.",
    img: imgWardrobe,
    features: ["Desain Full Plafon", "Pencahayaan LED"],
  },
  {
    id: 3,
    title: "Lemari Bawah Tangga",
    desc: "Manfaatkan area kosong bawah tangga menjadi storage multifungsi yang estetik.",
    img: imgTangga,
    features: ["Space Saving", "Laci Multifungsi"],
  },
  {
    id: 4,
    title: "Backdrop TV",
    desc: "Area hiburan mewah dan tertata rapi tanpa drama kabel berantakan.",
    img: imgTV,
    features: ["Kabel Tersembunyi", "Panel Marmer/Kayu"],
  },
  {
    id: 5,
    title: "Pintu Sliding Alumunium",
    desc: "Sekat ruangan fleksibel aluminium/kaca untuk privasi tanpa mengurangi cahaya.",
    img: imgSliding,
    features: ["Frame Slim", "Kaca Tempered"],
  },
  {
    id: 6,
    title: "Kanopi WC Duma",
    desc: "Kombinasi atap kokoh dengan plafon motif kayu elegan dan anti-rayap.",
    img: imgCommercial,
    features: ["Layout Efektif", "Branding Visual"],
  },
];

// Duplikasi data untuk efek infinite loop
const INFINITE_SERVICES = [...SERVICES_DATA, ...SERVICES_DATA];

// --- DATA PROJECT ---
const PROJECT_CATEGORIES = [
  {
    title: "Apartemen Branz BSD",
    clientName: "Proyek Ibu Shiiella",
    items: [apt1, apt2, apt3, apt4, apt5, apt6, apt7],
  },
  {
    title: "Kota Wisata Cluster Paris",
    clientName: "Proyek Ibu Prameswari",
    items: [kota1, kota2, kota3, kota4, kota5, kota6],
  },
  {
    title: "Project Sangihe",
    clientName: "Proyek Ibu Cisca",
    items: [sang1, sang2, sang3, sang4, sang5, sang6],
  },
  {
    title: "Project Seamanan",
    clientName: "Proyek Ibu Alicia",
    items: [seam1, seam2, seam3, seam4],
  },
  {
    title: "Project Vanya Park BSD CITY",
    clientName: "Proyek Bapak Manue",
    items: [vanya1, vanya2, vanya3, vanya4],
  },
];

const FAQ_DATA = [
  {
    q: "Apakah Doger Interior melayani pengerjaan di luar kota?",
    a: "Ya, kami melayani proyek di luar kota dengan syarat dan ketentuan tertentu mengenai biaya akomodasi dan transportasi tim lapangan.",
  },
  {
    q: "Berapa lama pengerjaan?",
    a: "Durasi pengerjaan sangat bergantung pada volume dan tingkat kesulitan desain. Secara umum, proses produksi di workshop memakan waktu sekitar 14 hingga 30 hari kerja setelah desain dan material disetujui.",
  },
  {
    q: "Apakah bisa datang ke workshop secara langsung?",
    a: "Tentu saja! Kami sangat mempersilakan Anda untuk berkunjung ke workshop kami untuk melihat langsung kualitas material, sampel finishing, serta proses produksi yang sedang berjalan. Mohon hubungi kami terlebih dahulu untuk membuat janji temu.",
  },
  {
    q: "Bagaimana jika saya sudah punya desain sendiri (ingin jasa produksi saja)?",
    a: "Bisa. Tim kami akan tetap melakukan survey lokasi untuk memastikan ukuran presisi dan memberikan saran teknis agar desain yang Anda punya bisa diproduksi dengan aman dan fungsional.",
  },
  {
    q: "Apakah ada batas maksimal revisi desain?",
    a: "Kami memberikan fasilitas revisi hingga 2 kali sampai desain mencapai kesepakatan final sebelum masuk ke tahap produksi.",
  },
  {
    q: "Apakah ada biaya tambahan untuk pengiriman dan pemasangan?",
    a: "Biasanya kami sudah menyertakan biaya kirim dan pasang dalam penawaran. Namun, untuk lokasi di luar jangkauan standar atau kondisi akses yang sulit, akan didiskusikan di awal.",
  },
];

// --- COMPONENT SLIDER KHUSUS (GALLERY) ---
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
  const nextSlide = () =>
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));

  const waLink = `https://wa.me/6285282773811?text=Halo%20Doger%20Interior,%20saya%20tertarik%20dengan%20${encodeURIComponent(title)}`;

  return (
    <div className="project-block-ref fade-up">
      <div className="ref-header-banner">
        <div className="ref-text-content">
          <h3>{title}</h3>
          <p>{clientName}</p>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="btn-ref-wa"
          >
            HUBUNGI KAMI <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="ref-slider-container">
        <button onClick={prevSlide} className="btn-ref-nav left">
          <ChevronLeft size={24} />
        </button>
        <div className="ref-viewport">
          <div
            className="ref-track"
            style={{
              transform: `translateX(-${current * 100}%)`,
              width: `${100 * Math.ceil(items.length / itemsPerPage)}%`,
              display: "flex",
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {Array.from({ length: Math.ceil(items.length / itemsPerPage) }).map(
              (_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="ref-slide-page"
                  style={{ width: "100%", display: "flex" }}
                >
                  {items
                    .slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage,
                    )
                    .map((imgSrc, i) => (
                      <div
                        key={i}
                        className="ref-card-item"
                        style={{ width: `${100 / itemsPerPage}%` }}
                      >
                        <div className="ref-img-wrap">
                          <img
                            src={imgSrc}
                            alt={`${title} detail`}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              ),
            )}
          </div>
        </div>
        <button onClick={nextSlide} className="btn-ref-nav right">
          <ChevronRight size={24} />
        </button>
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

    // 1. Ambil Data dari Form
    const { nama, wa, pesan } = formData;

    // 2. Validasi Sederhana
    if (!nama || !wa || !pesan) {
      alert("Mohon lengkapi semua kolom form!");
      return;
    }

    // 3. TARGET NOMOR (Sesuai Request)
    // Format: Kode negara (62) + Nomor (81575897899) tanpa spasi/strip
    const nomorTujuan = "6281575897899";

    // 4. SUSUN PESAN OTOMATIS
    // \n berfungsi sebagai Enter (baris baru)
    const isiPesan =
      `Halo Doger Interior, saya ingin konsultasi proyek.\n\n` +
      `• Nama: *${nama}*\n` +
      `• No. WA: ${wa}\n` +
      `• Pesan/Kebutuhan: "${pesan}"\n\n` +
      `Mohon info lebih lanjut. Terima kasih.`;

    // 5. BUAT LINK WHATSAPP
    // encodeURIComponent penting agar spasi & enter terbaca oleh browser
    const linkWA = `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(isiPesan)}`;

    // 6. BUKA WHATSAPP
    window.open(linkWA, "_blank");

    // (Opsional) Reset form setelah kirim
    // setFormData({ nama: "", wa: "", pesan: "" });
  };

  return (
    <div className="op10-root">
      {/* 1. HERO SECTION */}
      <header id="hero" className="op10-hero-split">
        <div className="hero-left">
          {/* Class "fade-up" DIHAPUS agar animasi CSS baru bisa jalan */}
          <div className="hl-content">
            <span className="badge-hero">EST. 2019 — DEPOK</span>
            <h1 className="hero-title">
              Wujudkan Interior <br />{" "}
              <span className="text-highlight">Impian Anda</span>
            </h1>
            <p className="hero-desc">
              Spesialis Kitchen Set & Interior Custom dengan material premium
              anti-rayap. Desain mewah, harga transparan, dan bergaransi.
            </p>
            <div className="hero-btns">
              <Link to="/contact" className="btn-primary">
                Hubungi Kami <ArrowRight size={18} />
              </Link>
              <a href="#gallery" className="btn-secondary">
                Lihat Karya
              </a>
            </div>

            {/* STATISTIK */}
            <div className="hero-stats">
              <div className="stat-item">
                <strong>300+</strong>
                <span>Proyek</span>
              </div>
              <div className="stat-sep"></div>
              <div className="stat-item">
                <strong>100%</strong>
                <span>Custom</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <img src={heroImg} alt="Hero" />
          <div className="hero-overlay-deco"></div>
        </div>
      </header>

      {/* 2. WELCOME SECTION */}
      <section className="welcome-section bg-white">
        <div className="op10-container">
          <div className="welcome-top fade-up">
            <div className="welcome-ribbon">
              <h2>Welcome To Our Website</h2>
            </div>
            <div className="welcome-brand">
              <div className="wb-logo">
                DOGER <span>INTERIOR</span>
              </div>
            </div>
          </div>
          <div className="welcome-main-card fade-up delay-1">
            <div className="wm-header">
              <h1>
                <span className="accent-text">Doger Interior</span> - Jasa
                Interior Kitchen Set
              </h1>
              <div className="wm-line"></div>
            </div>
            <div className="wm-body">
              <p className="lead-paragraph">
                <strong>Doger Interior</strong> merupakan spesialis{" "}
                <em>jasa Interior Kitchen Set</em>. Kami melayani jasa pembuatan
                kitchen set aluminium minimalis baik untuk rumah, kantor, hotel,
                apartemen, restaurant dan lainnya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="op10-section bg-cream">
        <div className="op10-container grid-2">
          <div className="about-img-wrap fade-up delay-1">
            <img src={img2} alt="About" />
            <div className="exp-badge">
              <span>5+ TH</span>
              <small>PENGALAMAN</small>
            </div>
          </div>
          <div className="about-text fade-up delay-2">
            <h2>MENGAPA MEMILIH DOGER INTERIOR?</h2>
            <p
              style={{
                marginBottom: "30px",
                fontSize: "0.95rem",
                color: "#666",
              }}
            >
              Kami memahami bahwa rumah adalah investasi jangka panjang, itulah
              sebabnya kami berkomitmen memberikan yang terbaik melalui:
            </p>
            <div className="vertical-features-list">
              <div className="v-feature-card">
                <div className="v-icon-circle">
                  <ShieldCheck size={28} />
                </div>
                <div className="v-card-text">
                  <h4>Opsi Material Beragam</h4>
                  <p>
                    Pilih material mulai dari Aluminium (anti-rayap), Multiplek,
                    maupun PVC Board.
                  </p>
                </div>
              </div>
              <div className="v-feature-card">
                <div className="v-icon-circle">
                  <Star size={28} />
                </div>
                <div className="v-card-text">
                  <h4>Transparansi Proyek</h4>
                  <p>
                    Update perkembangan pengerjaan secara berkala agar hasil
                    sesuai ekspektasi.
                  </p>
                </div>
              </div>
              <div className="v-feature-card">
                <div className="v-icon-circle">
                  <DollarSign size={28} />
                </div>
                <div className="v-card-text">
                  <h4>Harga Terbaik</h4>
                  <p>Penawaran harga yang kompetitif dan transparan.</p>
                </div>
              </div>
              <div className="v-feature-card">
                <div className="v-icon-circle">
                  <PenTool size={28} />
                </div>
                <div className="v-card-text">
                  <h4>Custom Sesuai Keinginan</h4>
                  <p>
                    Desain fleksibel mengikuti preferensi estetika anda
                    (Minimalis, Klasik, dll).
                  </p>
                </div>
              </div>
              <div className="v-feature-card">
                <div className="v-icon-circle">
                  <MessageSquare size={28} />
                </div>
                <div className="v-card-text">
                  <h4>Konsultasi Fleksibel</h4>
                  <p>
                    Layanan diskusi dua arah yang dapat dilakukan secara
                    online/offline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION (INFINITE MARQUEE) */}
      <section
        id="services"
        className="op10-section bg-white services-marquee-wrapper"
      >
        <div className="op10-container">
          <div className="section-head center fade-up mb-50">
            <span className="sub-head">LAYANAN KAMI</span>
            <h2>SOLUSI INTERIOR LENGKAP</h2>
          </div>
        </div>

        <div className="services-marquee-track">
          {INFINITE_SERVICES.map((service, index) => (
            <div key={`${service.id}-${index}`} className="service-v-card">
              <div className="card-img-top">
                <img src={service.img} alt={service.title} />
                <span className="card-type-badge">Tipe Premium</span>
              </div>
              <div className="card-body">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="card-features">
                  {service.features.map((feat, idx) => (
                    <span key={idx} className="feat-item">
                      <CheckCircle2 size={14} className="check-icon" /> {feat}
                    </span>
                  ))}
                </div>
              </div>
              <Link to="/contact" className="card-footer-btn">
                <div className="btn-icon-box">
                  <ChevronsRight size={24} />
                </div>
                <div className="btn-text-box">Pesan Sekarang</div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MATERIAL SECTION */}
      <section className="op10-section bg-cream">
        <div className="op10-container">
          <div className="section-head center fade-up mb-50">
            <h2>Pilihan Bahan / Material</h2>
          </div>

          <div className="grid-2">
            <div className="specialist-content fade-up">
              <h3 className="content-title">Bahan Multiplek</h3>
              <p className="content-desc">
                Material favorit karena kepadatannya yang stabil dan daya tahan
                yang kuat. Material ini pilihan terbaik untuk unit yang
                membutuhkan kekuatan ekstra namun tetap fleksibel secara desain.
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
                      kayu alami hingga warna solid modern.
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
                      Finishing sangat mulus dan seamless. Glossy memberi kesan
                      mewah, doff tampil elegan.
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
                      Perpaduan berbagai material dan finishing untuk tampilan
                      interior yang lebih personal.
                    </p>
                  </div>
                </li>
              </ul>
              <a href="#contact" className="btn-primary mt-30">
                Konsultasi Material
              </a>
            </div>

            <div className="specialist-img fade-up delay-1">
              {/* GAMBAR DIGANTI KE FILE ASLI */}
              <img src={imgMultiplek} alt="Material Multiplek" />
              <div className="material-badge">
                <span>PREMIUM</span>
                <small>FINISHING</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* 6. PVC BOARD */}
      <section className="op10-section bg-cream">
        <div className="op10-container grid-2-reverse">
          <div className="specialist-img fade-up delay-1">
            {/* GAMBAR DIGANTI KE FILE ASLI */}
            <img src={imgPVC} alt="Material PVC Board" />
            <div className="material-badge badge-left">
              <span>ANTI</span>
              <small>LEMBAP</small>
            </div>
          </div>

          <div className="specialist-content fade-up">
            <h3 className="content-title">Bahan PVC Board</h3>
            <p className="content-desc">
              Jawaban terbaik untuk area yang rentan lembap atau serangan hama.
              Ringan namun stabil, menjaga furniture tetap awet.
            </p>
            <ul className="check-list-detailed">
              <li>
                <div className="check-icon-box">
                  <CheckCircle size={20} />
                </div>
                <div className="check-text">
                  <strong>HPL Taco</strong>
                  <p>
                    Motif kayu atau solid yang aesthetic, tahan lama, mudah
                    dirawat.
                  </p>
                </div>
              </li>
              <li>
                <div className="check-icon-box">
                  <CheckCircle size={20} />
                </div>
                <div className="check-text">
                  <strong>Cat Duco (Doff / Glossy)</strong>
                  <p>
                    Finishing mulus tanpa sambungan. Glossy terlihat mewah, doff
                    terasa elegan.
                  </p>
                </div>
              </li>
              <li>
                <div className="check-icon-box">
                  <CheckCircle size={20} />
                </div>
                <div className="check-text">
                  <strong>Mix HPL Taco & Cat Duco</strong>
                  <p>
                    Kombinasi kekuatan HPL dan keindahan Cat Duco untuk hasil
                    furniture yang eksklusif.
                  </p>
                </div>
              </li>
            </ul>
            <a href="#contact" className="btn-primary mt-30">
              Konsultasi Material
            </a>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="section-divider" />

      {/* 7. ALUMINIUM */}
      <section className="op10-section bg-cream">
        <div className="op10-container grid-2">
          <div className="specialist-content fade-up">
            <h3 className="content-title">Bahan Aluminium</h3>
            <p className="content-desc">
              Material dengan ketahanan seumur hidup, kebal terhadap air, api,
              dan rayap. Memberikan kesan kokoh, presisi, dan modern.
            </p>
            <a href="#contact" className="btn-primary mt-30">
              Konsultasi Material
            </a>
          </div>

          <div className="specialist-img fade-up delay-1">
            {/* GAMBAR DIGANTI KE FILE ASLI */}
            <img src={imgAluminium} alt="Material Aluminium" />
            <div className="material-badge">
              <span>LIFETIME</span>
              <small>MATERIAL</small>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GALLERY */}
      <section id="gallery" className="op10-section bg-offwhite">
        <div className="op10-container">
          <div className="section-head center fade-up mb-50">
            <span className="sub-head">PORTOFOLIO</span>
            <h2>HASIL KARYA KAMI</h2>
          </div>
          <div className="multi-slider-wrapper">
            {PROJECT_CATEGORIES.map((cat, idx) => (
              <ProjectSlider key={idx} {...cat} />
            ))}
          </div>
          <div className="center mt-40">
            <a
              href="https://instagram.com/doger.interior"
              className="btn-secondary"
              target="_blank"
              rel="noreferrer"
            >
              Instagram Portfolio <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* 9. FAQ & CONTACT */}
      <section id="contact" className="op10-section bg-cream">
        <div className="op10-container grid-2-faq">
          <div className="faq-left fade-up">
            <h2>FAQ</h2>
            <div className="faq-wrapper">
              {FAQ_DATA.map((faq, i) => (
                <div
                  key={i}
                  className={`faq-box ${openFaq === i ? "open" : ""}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="faq-head">
                    {faq.q} {openFaq === i ? <ChevronUp /> : <ChevronDown />}
                  </div>
                  {openFaq === i && <div className="faq-body">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="contact-right fade-up delay-2">
            <div className="form-card">
              <h3>Mulai Konsultasi</h3>
              <form onSubmit={kirimKeWA}>
                {/* Input Nama */}
                <div className="form-group">
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      marginBottom: "5px",
                      display: "block",
                      color: "#999",
                    }}
                  >
                    NAMA LENGKAP
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama} /* PENTING: Agar data sinkron */
                    onChange={handleInput}
                    placeholder="Nama Lengkap Anda"
                    className="form-control"
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginBottom: "15px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                    required
                  />
                </div>

                {/* Input WhatsApp */}
                <div className="form-group">
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      marginBottom: "5px",
                      display: "block",
                      color: "#999",
                    }}
                  >
                    WHATSAPP
                  </label>
                  <input
                    type="number" /* PENTING: Agar keyboard HP jadi angka */
                    name="wa"
                    value={formData.wa} /* PENTING */
                    onChange={handleInput}
                    placeholder="Contoh: 0815..."
                    className="form-control"
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginBottom: "15px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                    required
                  />
                </div>

                {/* Input Pesan */}
                <div className="form-group">
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      marginBottom: "5px",
                      display: "block",
                      color: "#999",
                    }}
                  >
                    PESAN & KEBUTUHAN PROYEK
                  </label>
                  <textarea
                    name="pesan"
                    value={formData.pesan} /* PENTING */
                    onChange={handleInput}
                    rows="4"
                    placeholder="Ceritakan kebutuhan interior Anda..."
                    className="form-control"
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginBottom: "20px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-100"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  KIRIM KONSULTASI <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
