import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react"; // Hanya mengimport Menu

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`op10-nav ${scrolled || !isHome ? "scrolled" : ""}`}>
      <div className="op10-container nav-flex">
        
        {/* KIRI: Logo */}
        <div className="nav-brand">
          <Link to="/" onClick={closeMenu}>DOGER<span>.STUDIO</span></Link>
        </div>

        {/* TENGAH: Menu (Tanda silang sudah dihapus) */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>Tentang</Link>
          <Link to="/services" onClick={closeMenu}>Layanan</Link>
          <Link to="/projects" onClick={closeMenu}>Projek</Link>
          <Link to="/contact" onClick={closeMenu}>Kontak</Link>
          
          {/* Bagian tanda silang <X /> di sini telah dihapus agar tampilan lebih bersih */}
        </div>

        {/* KANAN: Tombol Konsultasi & Burger Menu */}
        <div className="nav-actions">
          <Link to="/contact" className="btn-nav-cta" onClick={closeMenu}>
            Konsultasi
          </Link>
          
          <button 
            className="burger-menu" 
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Menggunakan ikon Menu saja tanpa berubah menjadi X saat terbuka */}
            <Menu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;