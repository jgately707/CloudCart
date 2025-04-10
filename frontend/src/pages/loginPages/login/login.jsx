import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confrimPassword, setConfirmPassword] = useState('');


  return (
    <div style={{ maxWidth: '600px', margin: '70px auto', padding: '0 20px', textAlign: 'center' }}>
      <h1>Login</h1>
      <div style={{ textAlign: 'left', marginTop: '25px', marginLeft: '120px' }}>
        <h2>Email</h2>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            width: '250px', // Reduced width for a smaller textbox
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <div style={{ textAlign: 'left', marginTop: '25px', marginLeft: '120px' }}>
        <h2>Password</h2>
        <input
          type="text"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            width: '250px', // Reduced width for a smaller textbox
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <div style={{ textAlign: 'left', marginTop: '25px', marginLeft: '120px' }}>
        <h2>Confirm Password</h2>
        <input
          type="text"
          placeholder="Confirm password"
          value={confrimPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            padding: '10px',
            width: '250px', // Reduced width for a smaller textbox
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      {/* Increase marginTop to add spacing above the login button */}
      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
        <button 
          style={{
            padding: '10px 20px', 
            fontSize: '16px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',  // Added a proper borderRadius value
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
