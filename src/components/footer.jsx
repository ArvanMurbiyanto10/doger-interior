import { Instagram, Phone, Mail, Clock, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="op10-footer">
      <div className="op10-container">
        <div className="footer-content">
          {/* KOLOM 1: Brand & Sosmed */}
          <div className="f-brand">
            <h2 className="brand-title">
              DOGER<span className="brand-dot">.STUDIO</span>
            </h2>
            <p className="brand-desc">
              Jasa Interior & Kitchen Set Profesional. Mewujudkan hunian impian dengan kualitas terbaik di Jabodetabek.
            </p>
            
            <div className="f-social-group">
              <a href="https://www.instagram.com/doger.interior" target="_blank" rel="noreferrer" className="social-circle">
                <Instagram size={24} />
              </a>
              <a href="https://wa.me/6281575897899" target="_blank" rel="noreferrer" className="social-circle">
                <MessageCircle size={24} />
              </a>
              <a href="email:doger.interior@gmail.com" className="social-circle">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* KOLOM 2: Alamat & Peta */}
          <div className="f-info">
            <h5 className="f-head">ALAMAT WORKSHOP</h5>
            <p className="address-text">
              Jl. H. Ahmad Nado 1 No.126,<br />
              Grogol, Limo, Kota Depok, Jawa Barat
            </p>
            {/* Frame Peta yang lebih rapi */}
            <div className="map-frame-styled">
              <iframe 
                title="Lokasi Doger Interior" 
                src="https://maps.google.com/maps?q=Jl.%20H.%20Ahmad%20Nado%201%20No.126,%20Grogol,%20Limo,%20Kota%20Depok&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* KOLOM 3: Kontak List */}
          <div className="f-contact">
            <h5 className="f-head">KONTAK CEPAT</h5>
            <ul className="contact-list-styled">
              <li>
                <div className="icon-box"><Phone size={18} /></div> 
                <div>
                  <span className="label">WhatsApp / Telp</span>
                  <span className="value">0815-7589-7899</span>
                  <span className="value">0823-2468-3399</span>
                </div>
              </li>
              <li>
                <div className="icon-box"><Mail size={18} /></div>
                <div>
                  <span className="label">Email Resmi</span>
                  <span className="value">doger.interior@gmail.com</span>
                </div>
              </li>
              <li>
                <div className="icon-box"><Clock size={18} /></div>
                <div>
                  <span className="label">Jam Operasional</span>
                  <span className="value">Senin - Sabtu (08.00 - 17.00)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="footer-bottom">
          <div className="separator"></div>
          <p>© 2026 Doger Interior. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;