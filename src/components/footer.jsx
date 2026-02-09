import React from 'react';
import { Instagram, Phone, Mail, MapPin, Clock } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Linktree yang sudah dibersihkan dari tracker
  const linktreeUrl = "https://linktr.ee/doger.interior";

  return (
    <footer className="footer-root">
      <div className="footer-container">
        
        <div className="footer-content">
          
          {/* KOLOM 1: BRAND & SOSMED */}
          <div className="f-col-brand">
            <h2 className="footer-logo">DOGER<span>.INTERIOR</span></h2>
            <p className="footer-tagline">
              Solusi interior & kitchen set premium Jabodetabek. Mewujudkan ruang impian dengan kualitas terbaik dan harga transparan.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/doger.interior" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              {/* WhatsApp sekarang mengarah ke Linktree sesuai permintaan Anda */}
              <a href={linktreeUrl} target="_blank" rel="noreferrer" aria-label="Linktree">
                <Phone size={20} />
              </a>
              <a href="mailto:doger.interior@gmail.com" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* KOLOM 2: HUBUNGI KAMI */}
          <div className="f-col-contact">
            <h3 className="footer-heading">HUBUNGI KAMI</h3>
            <ul className="contact-list">
              <li>
                <Phone size={18} className="icon-accent" /> 
                {/* Link teks juga diarahkan ke Linktree agar seragam */}
                <a href={linktreeUrl} target="_blank" rel="noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>
                  +62 852-8277-3811 (Linktree)
                </a>
              </li>
              <li>
                <Mail size={18} className="icon-accent" /> 
                <span>doger.interior@gmail.com</span>
              </li>
              <li>
                <Clock size={18} className="icon-accent" /> 
                <span>Senin - Sabtu (08.00 - 17.00)</span>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: LOKASI WORKSHOP (MAPS FIXED) */}
          <div className="f-col-address">
            <h3 className="footer-heading">LOKASI WORKSHOP</h3>
            <p className="address-text">
              <MapPin size={16} style={{marginRight: 8, display:'inline'}}/> 
              Jl. H. Ahmad Nado 1 No.126, Grogol, Kec. Limo, Kota Depok, Jawa Barat 16512
            </p>
            <div className="footer-map">
              {/* Link Maps diperbaiki menggunakan parameter pencarian alamat langsung agar tidak 404 */}
              <iframe 
                title="Lokasi Workshop Doger Interior"
                src="https://maps.google.com/maps?q=Jl.%20H.%20Ahmad%20Nado%201%20No.126,%20Grogol,%20Limo,%20Depok&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="150" 
                style={{ border: 0, borderRadius: '12px' }} 
                allowFullScreen="" 
                loading="lazy">
              </iframe>
            </div>
          </div>

        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>© {currentYear} <strong>Doger Interior</strong>. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;