import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../components/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:5001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/home');
      } else {
        setErrorMsg(data.error || 'Login failed, please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Server error, please try again.');
    }
  }

  return (
    <div style={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        padding: '20px 40px',
        backgroundColor: '#e3f2fd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <Logo />
      </header>

      {/* Form */}
      <main style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'white',
          padding: '48px',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
          width: '100%',
          maxWidth: '500px'
        }}>
          <h2 style={{ marginBottom: '16px', fontSize: '28px' }}>Login</h2>
          <p style={{ marginBottom: '40px', color: '#666' }}>Access your Cloud Cart account</p>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <label style={{ marginTop: '28px' }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {errorMsg && (
            <div style={{ marginTop: '24px', color: 'red', fontSize: '15px' }}>{errorMsg}</div>
          )}

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '14px',
  fontSize: '15px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginTop: '10px'
};

const buttonStyle = {
  marginTop: '36px',
  width: '100%',
  padding: '14px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default Login;
