// src/components/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Tambahkan Link
import './LoginPage.css'; // Ganti CSS ke file baru agar spesifik

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      if (res.data.success) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminName', res.data.user.nama);
        navigate('/admin');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Gagal terhubung ke server");
      }
    }
  };

  return (
    <div className="login-page-container">
      {/* Overlay Gelap untuk background image */}
      <div className="login-overlay"></div> 
      
      <div className="login-glass-card">
        <h2 className="login-title">LOGIN</h2>
        
        {/* Garis ungu di bawah judul (opsional, sesuai tema) */}
        <div className="title-divider"></div>

        {error && <div className="login-error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Username" // Placeholder sesuai gambar
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;