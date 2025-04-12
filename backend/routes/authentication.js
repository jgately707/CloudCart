const express = require('express');
const router = express.Router();

// Import the database pool for the check-email route
const pool = require('../db');

// Import controllers: use authController for create-account, and loginController for login
const authController = require('../controllers/authController');
const loginController = require('../controllers/loginController');

// Import middleware for validation
const validateCreateAccountInput = require('../middleware/validateCreateAccountInput');
const validateLoginInput = require('../middleware/validateLoginInput');

// Check-email route
router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.trim().toLowerCase()]);
    res.json({ exists: result.rows.length > 0 });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Create account route using authController (registration)
router.post('/create-account', validateCreateAccountInput, authController.createAccount);

// Login route using loginController (login)
router.post('/login', validateLoginInput, loginController.loginPage);

console.log("Authentication routes loaded");

module.exports = router;
