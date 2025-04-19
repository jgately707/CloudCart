import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('https://localhost:5001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: 'include' // important for sending/receiving cookies
      });
      const data = await response.json();

      if (response.ok) {
        // Store token and redirect to home page
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        setErrorMsg(data.error || 'Login failed, please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMsg('Server error, please try again later.');
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '70px auto', padding: '0 20px', textAlign: 'center' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: 'left', marginTop: '25px', marginLeft: '120px' }}>
          <h2>Email</h2>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '10px',
              width: '250px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            required
          />
        </div>
        <div style={{ textAlign: 'left', marginTop: '25px', marginLeft: '120px' }}>
          <h2>Password</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px',
              width: '250px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            required
          />
        </div>
        {errorMsg && <p style={{ color: 'red', marginTop: '15px' }}>{errorMsg}</p>}
        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
