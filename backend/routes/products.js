// backend/routes/products.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all products that include the tag 'featured'
router.get('/featured', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE 'featured' = ANY(product_tag)"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
