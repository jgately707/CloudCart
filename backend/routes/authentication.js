const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/check-email', async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
router.post('/create-account', async (req, res) => {
    const { name, email, password } = req.body
    try {
        const result = await pool.query('INSERT into users (name, email, password) VALUES ($1, $2, $3)', [name, email, password])
    } catch (error) {
      console.error("Database error:", err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
})

// Debug log to verify this file is loaded
console.log("Authentication routes loaded");

module.exports = router;
