import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import axios from "axios"; 

// Import logo bawaan sebagai cadangan (fallback)
import defaultLogo from "../assets/logo-dogger.jpg";

const API_URL = "http://localhost:5000";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dbLogo, setDbLogo] = useState(null); 
  const location = useLocation();

  // Linktree Resmi Doger Interior
  const linktreeUrl = "https://linktr.ee/doger.interior";

  useEffect(() => {
    // 1. Ambil Logo dari Database saat website dimuat
    const fetchLogo = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/settings/logo`);
        if (res.data && res.data.key_value) {
          setDbLogo(res.data.key_value);
        }
      } catch (error) {
        console.error("Gagal memuat logo custom:", error);
      }
    };
    fetchLogo();

    // Logika Scroll
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const closeMenu = () => setMenuOpen(false);

  // 2. Tentukan gambar mana yang dipakai
  const logoSource = dbLogo ? `${API_URL}/uploads/${dbLogo}` : defaultLogo;

  return (
    <nav className={`op10-nav ${scrolled || !isHome ? "scrolled" : ""}`}>
      <div className="op10-container nav-flex">
        
        {/* BAGIAN KIRI: Logo Dinamis */}
        <div className="nav-brand">
          <Link to="/" onClick={closeMenu} className="brand-link">
            <img 
              src={logoSource} 
              alt="Doger Interior" 
              className="logo-img"
              onError={(e) => { e.target.onerror = null; e.target.src = defaultLogo; }} 
            />
            <div className="brand-text">
              DOGER<span>.INTERIOR</span>
            </div>
          </Link>
        </div>

        {/* BAGIAN TENGAH: Menu Link */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>Tentang</Link>
          <Link to="/services" onClick={closeMenu}>Layanan</Link>
          <Link to="/projek" onClick={closeMenu}>Projek</Link>
          <Link to="/contact" onClick={closeMenu}>Kontak</Link>
        </div>

        {/* BAGIAN KANAN: Tombol Konsultasi & Burger */}
        <div className="nav-actions">
          {/* PERBAIKAN: Tombol Konsultasi mengarah ke Linktree */}
          <a 
            href={linktreeUrl} 
            className="btn-nav-cta" 
            target="_blank" 
            rel="noreferrer"
            onClick={closeMenu}
          >
            Konsultasi
          </a>

          <button
            className="burger-menu"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;