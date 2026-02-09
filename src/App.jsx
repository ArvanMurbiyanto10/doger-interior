import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// --- IMPORT PAGES ---
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import ServicesPage from "./components/ServicesPage"; 
import ProjekPage from "./components/ProjekPage";
import ContactPage from "./components/ContactPage"; 

// --- IMPORT ADMIN & LOGIN PAGES ---
import AdminPage from "./components/AdminPage";
import LoginPage from "./components/LoginPage";
import EditProjectPage from "./components/EditProjectPage";

// --- IMPORT GLOBAL COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

// --- UTILITY: SCROLL TO TOP ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- PROTEKSI RUTE (SATIPAM) ---
// Memastikan akses admin aman berdasarkan status login
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const location = useLocation();

  // Menyembunyikan Navbar dan Footer di halaman Admin atau Login agar lebih fokus
  const isHideLayout = location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <div className="app-main-wrapper">
      <ScrollToTop />
      
      {/* Navbar hanya muncul di halaman publik */}
      {!isHideLayout && <Navbar />}

      <Routes>
        {/* --- RUTE PUBLIK --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projek" element={<ProjekPage />} />      
        <Route path="/contact" element={<ContactPage />} />

        {/* --- RUTE LOGIN --- */}
        <Route path="/login" element={<LoginPage />} />

        {/* --- RUTE ADMIN (SEMUA DIPROTEKSI) --- */}
        {/* Dashboard Utama Admin */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          } 
        />
        
        {/* Halaman Edit (DIPINDAHKAN KE SINI AGAR AMAN) */}
        <Route 
          path="/admin/edit/:id" 
          element={
            <PrivateRoute>
              <EditProjectPage />
            </PrivateRoute>
          } 
        />

        {/* Fallback jika rute tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer hanya muncul di halaman publik */}
      {!isHideLayout && <Footer />}
    </div>
  );
}

export default App;