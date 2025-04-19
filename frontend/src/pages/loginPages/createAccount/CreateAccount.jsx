import React, { useState } from 'react';
import Logo from '../../../components/Logo';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit() {
    try {
      const response = await fetch("https://localhost:5001/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
        credentials: 'include'
      });

      const data = await response.json();
      if (data.exists) {
        setMessage("Email already in use.");
        return;
      }

      const validPass =
        password === confirmPassword &&
        password.length >= 5 &&
        /[@!$]/.test(password) &&
        /\d/.test(password);
      const validName = name.length >= 2;
      const validEmail = /@(gmail|yahoo|outlook)\.com$/.test(email);

      if (validPass && validName && validEmail) {
        const res = await fetch("https://localhost:5001/create-account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), email: email.trim(), password, confirmPassword }),
          credentials: 'include'
        });

        const resData = await res.json();
        setMessage(resData.message || "Account Created");
      } else {
        let err = "";
        if (!validPass) err += "Password must match, include a symbol and number. ";
        if (!validName) err += "Name is too short. ";
        if (!validEmail) err += "Email must be Gmail, Outlook or Yahoo.";
        setMessage(err);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Server error, please try again.");
    }
  }

  return (
    <div style={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
      {/* Header with Logo */}
      <header style={{
        padding: '20px 40px',
        backgroundColor: '#e3f2fd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <Logo />
      </header>

      {/* Form */}
      <main style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '48px',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
          width: '100%',
          maxWidth: '500px'
        }}>
          <h2 style={{ marginBottom: '16px', fontSize: '28px' }}>Create Your Account</h2>
          <p style={{ marginBottom: '40px', color: '#666' }}>Get started with Cloud Cart</p>

          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            style={inputStyle}
          />

          <label style={{ marginTop: '28px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            style={inputStyle}
          />

          <label style={{ marginTop: '28px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
          />

          <label style={{ marginTop: '28px' }}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
          />

          <button onClick={handleSubmit} style={buttonStyle}>
            Create Account
          </button>

          {message && (
            <div style={{ marginTop: '24px', color: 'red', fontSize: '15px' }}>{message}</div>
          )}
        </div>
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

export default CreateAccount;
