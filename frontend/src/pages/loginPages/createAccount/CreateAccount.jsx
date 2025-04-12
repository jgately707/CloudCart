import React, { useState } from 'react';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // New state for the message

  async function handleSubmit() {
    try {
      const response = await fetch("http://localhost:5001/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email.trim() }) // Trim any extra whitespace
      });
      const data = await response.json();
      console.log("Response from check-email:", data);

      if (data.exists) {
        setMessage("Email already in use!");
        return; // Stop further processing
      } else {
        // Continue with further validation
        let flag1 = password === confirmPassword &&
                    password.length >= 5 &&
                    (password.includes("@") || password.includes("!") || password.includes("$")) &&
                    /\d/.test(password);
        let flag2 = name.length >= 2;
        let flag3 = email.includes("@gmail.com") ||
                    email.includes("@outlook.com") ||
                    email.includes("@yahoo.com");

        if (flag1 && flag2 && flag3) {
          try {
            const response = await fetch("http://localhost:5001/create-account", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: name.trim(),
    email: email.trim(),
    password: password,
    confirmPassword: confirmPassword // add this line
  })
});

            const data = await response.json(); // receive the server's response
            console.log("Server says:", data);
            setMessage(data.message || "Account Created");

          } catch (error) {
            
          }
          setMessage("Account Created");
        } else {
          let errorMessage = "";
          if (!flag1) errorMessage += "Remake password and double check criteria. ";
          if (!flag2) errorMessage += "Name field cannot be empty. ";
          if (!flag3) errorMessage += "Must be a valid email. ";
          setMessage(errorMessage);
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Error communicating with the server.");
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '70px' }}>
      <h1>Create account</h1>

      {/* Name field */}
      <div style={{ textAlign: 'left', marginLeft: '550px', marginBottom: '20px' }}>
        <h2 style={{ color: 'gray', fontSize: '32px', marginBottom: '8px' }}>Your name</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Email field */}
      <div style={{ textAlign: 'left', marginLeft: '550px', marginBottom: '20px' }}>
        <h3 style={{ color: 'gray', fontSize: '32px', marginBottom: '8px' }}>Your email</h3>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Password field */}
      <div style={{ textAlign: 'left', marginLeft: '550px', marginBottom: '20px' }}>
        <h4 style={{ color: 'gray', fontSize: '32px', marginBottom: '8px' }}>Your password</h4>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Confirm password field */}
      <div style={{ textAlign: 'left', marginLeft: '550px', marginBottom: '20px' }}>
        <h5 style={{ color: 'gray', fontSize: '32px', marginBottom: '8px' }}>Re-type password</h5>
        <input
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Submit button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={handleSubmit}
          style={{ padding:'10px 20px', fontSize: '16px', backgroundColor: '#007bff', color:'white', border:'none', borderRadius:'5px', cursor: 'pointer' }}
        >
          submit
        </button>
      </div>

      {/* Render the message to the user */}
      {message && (
        <div style={{ marginTop: '20px', fontSize: '18px', color: 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default CreateAccount;
