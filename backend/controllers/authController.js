// backend/controllers/authController.js
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.createAccount = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Server-side duplicate check: ensure email is not already in use
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    
    // Hash the password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    const newUser = result.rows[0];
    
    // Generate a JWT token for the new user
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
    
    // Respond with success and the token
    res.status(201).json({ message: 'Account created successfully', token });
    
  } catch (error) {
    console.error("Create account error:", error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
