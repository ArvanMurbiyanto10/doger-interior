import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronsRight,
  PenTool,
  MessageSquare,
  Star,
} from "lucide-react";
import Navbar from "./Navbar";
import "./ServicesPage.css";

// --- IMPORT FOTO LAYANAN ---
import imgKitchen from "../assets/kitchenset.png";
import imgWardrobe from "../assets/foto-8.jpg";
import imgTangga from "../assets/foto-6.jpg";
import imgTV from "../assets/foto-3.jpg";
import imgSliding from "../assets/foto-5.jpg";
import imgKanopi from "../assets/foto-10.jpg";

const SERVICES_DATA = [
  {
    id: 1,
    title: "Kitchen Set",
    desc: "Dapur mewah dengan material premium (Multiplek, PVC, Aluminium) kustom.",
    img: imgKitchen,
    features: [""],
  },
  {
    id: 2,
    title: "Wardrobe",
    desc: "Penyimpanan cerdas dan rapi untuk memaksimalkan ruang pakaian Anda.",
    img: imgWardrobe,
    features: [""],
  },
  {
    id: 3,
    title: "Lemari Bawah Tangga",
    desc: "Ubah area kosong bawah tangga menjadi storage multifungsi yang estetik.",
    img: imgTangga,
    features: [""],
  },
  {
    id: 4,
    title: "Backdrop TV",
    desc: "Area hiburan mewah tanpa kabel berantakan, menggunakan material berkualitas.",
    img: imgTV,
    features: [""],
  },
  {
    id: 5,
    title: "Pintu Sliding",
    desc: "Sekat ruangan fleksibel aluminium/kaca untuk privasi tanpa mengurangi cahaya.",
    img: imgSliding,
    features: [""],
  },
  {
    id: 6,
    title: "Interior Komersial",
    desc: "Solusi interior lengkap untuk kantor atau kafe yang elegan dan fungsional.",
    img: imgKanopi,
    features: [""],
  },
];

// DUPLIKASI DATA AGAR LOOPING MULUS (6 item x 2 = 12 item)
const INFINITE_SERVICES = [...SERVICES_DATA, ...SERVICES_DATA];

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-root">
      <Navbar />

      <main className="services-main">
        {/* HEADER SECTION */}
        <section className="services-header">
          <div className="op10-container center-text">
            <span className="brand-tag">Layanan Fabrikasi</span>
            <h1>
              Kualitas Interior <br />
              <span className="text-brown">Standar Premium</span>.
            </h1>
            <p className="header-desc">
              Pilihan layanan fabrikasi kustom yang dirancang untuk memenuhi
              kebutuhan fungsional dan estetika ruang Anda.
            </p>
          </div>
        </section>

        {/* INFINITE SCROLL SECTION */}
        <section className="services-marquee-wrapper">
          {/* Track Animasi */}
          <div className="services-marquee-track">
            {INFINITE_SERVICES.map((service, index) => (
              /* Gunakan index unik karena ID akan duplikat */
              <div key={`${service.id}-${index}`} className="service-v-card">
                {/* Gambar & Badge */}
                <div className="card-img-top">
                  <img src={service.img} alt={service.title} />
                  <span className="card-type-badge">Tipe Premium</span>
                </div>

                {/* Konten */}
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

                {/* Tombol Footer */}
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

        {/* WHY US SECTION */}
        <section className="services-values bg-cream-light">
          <div className="op10-container">
            <div className="values-grid">
              <ValueBox
                icon={<PenTool />}
                title="Custom Sepenuhnya"
                text="Desain fleksibel mengikuti preferensi estetika Anda."
              />
              <ValueBox
                icon={<MessageSquare />}
                title="Konsultasi Gratis"
                text="Diskusi mendalam online maupun offline."
              />
              <ValueBox
                icon={<Star />}
                title="Bergaransi"
                text="Jaminan kualitas material dan pengerjaan."
              />
            </div>
          </div>
        </section>
      </main>

      <Link to="/" className="btn-back-float">
        <ArrowLeft size={24} />
      </Link>
    </div>
  );
};

const ValueBox = ({ icon, title, text }) => (
  <div className="value-box">
    <div className="v-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);

export default ServicesPage;
