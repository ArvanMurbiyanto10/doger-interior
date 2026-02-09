import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";
import defaultLogo from "../assets/logo-dogger.jpg";
import "./Navbar.css";

const API_URL = "http://localhost:5000";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dbLogo, setDbLogo] = useState(null);
  const location = useLocation();
  const linktreeUrl = "https://linktr.ee/doger.interior";

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/settings/logo`);
        if (res.data && res.data.key_value) setDbLogo(res.data.key_value);
      } catch (error) {
        console.error("Logo error:", error);
      }
    };
    fetchLogo();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const closeMenu = () => setMenuOpen(false);
  const logoSource = dbLogo ? `${API_URL}/uploads/${dbLogo}` : defaultLogo;

  return (
    <nav className={`op10-nav ${scrolled || !isHome ? "scrolled" : ""}`}>
      <div className="op10-container nav-flex">
        {/* LOGO */}
        <div className="nav-brand">
          <Link to="/" onClick={closeMenu} className="brand-link">
            <img
              src={logoSource}
              alt="Doger"
              className="logo-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultLogo;
              }}
            />
            <div className="brand-text">
              DOGER<span>.INTERIOR</span>
            </div>
          </Link>
        </div>

        {/* MENU LINKS (SIDEBAR) */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          {/* --- TOMBOL SILANG (X) DI DALAM SIDEBAR --- */}
          <div className="sidebar-header">
            <button className="close-btn" onClick={closeMenu}>
              <X size={28} color="#333" />
            </button>
          </div>

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/about" onClick={closeMenu}>
            Tentang
          </Link>
          <Link to="/services" onClick={closeMenu}>
            Layanan
          </Link>
          <Link to="/projek" onClick={closeMenu}>
            Projek
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            Kontak
          </Link>

          <a
            href={linktreeUrl}
            className="btn-nav-cta"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Konsultasi
          </a>
        </div>

        {/* BURGER MENU (NAVBAR) */}
        <div className="nav-actions">
          <button className="burger-menu" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
