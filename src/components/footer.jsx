import React from "react";
import { useNavigate } from "react-router-dom";
import { Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";
import "./Footer.css";

// IMPORT LOGO
import logoDogger from "../assets/logo-dogger.jpg";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const linktreeUrl = "https://linktr.ee/doger.interior";

  const handleSecretLogin = () => {
    if (localStorage.getItem("isAdminLoggedIn")) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-content">
          
          {/* KOLOM 1: BRAND & SOSMED */}
          <div className="f-col-brand">
            <div className="footer-brand-row">
              <img
                src={logoDogger}
                alt="Dogger Interior Logo"
                className="footer-logo-img"
              />
              <h2 className="footer-logo">
                DOGER<span>.INTERIOR</span>
              </h2>
            </div>

            {/* TEKS YANG SUDAH DIRAPIKAN */}
            <p className="footer-tagline">
              Solusi interior & kitchen set premium Jabodetabek. 
              Mewujudkan ruang impian dengan kualitas terbaik dan harga transparan.
            </p>

            <div className="footer-socials">
              <a
                href="https://instagram.com/doger.interior"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>

              <a
                href={linktreeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Linktree"
              >
                <Phone size={20} />
              </a>

              <a href="mailto:interiordoger@gmail.com" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* KOLOM 2: KONTAK (TIDAK BERUBAH) */}
          <div className="f-col-contact">
            <h3 className="footer-heading">HUBUNGI KAMI</h3>
            <ul className="contact-list">
              <li>
                <Phone size={18} className="icon-accent" />
                <a href={linktreeUrl} target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                  0815 7589 7899
                </a>
              </li>
              <li>
                <Mail size={18} className="icon-accent" />
                <span>interiordoger@gmail.com</span>
              </li>
              <li>
                <Clock size={18} className="icon-accent" />
                <span>Senin - Sabtu (08.00 - 17.00)</span>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: ALAMAT (TIDAK BERUBAH) */}
          <div className="f-col-address">
            <h3 className="footer-heading">LOKASI WORKSHOP</h3>
            <p className="address-text">
              <MapPin size={16} style={{ marginRight: 8, display: "inline", verticalAlign: "text-top" }} />
              Jl. H. Ahmad Nado 1 No.126, Grogol, Kec. Limo, Kota Depok, Jawa Barat 16512
            </p>
            <div className="footer-map">
              <iframe
                title="Lokasi Workshop Doger Interior"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.0553102626577!2d106.7748954749918!3d-6.386863993603621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef1ec84e3661%3A0x6335936725227760!2sJl.%20H.%20Ahmad%20Nado%201%20No.126%2C%20Grogol%2C%20Kec.%20Limo%2C%20Kota%20Depok%2C%20Jawa%20Barat%2016512!5e0!3m2!1sid!2sid!4v1708930000000!5m2!1sid!2sid"
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: "12px" }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p
            onDoubleClick={handleSecretLogin}
            style={{ cursor: "default", userSelect: "none" }}
          >
            © {currentYear} <strong>Doger Interior</strong>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;