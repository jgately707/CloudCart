const express = require('express');
const router = express.Router();
const pool = require('../db');
const requireAuth = require('../middleware/requireAuth');

router.get('/me', requireAuth, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query('SELECT name, email FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Server error' });
  }
});
router.get('/address', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT address, city, state, zip_code FROM user_info WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'no address' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
})

module.exports = router;
