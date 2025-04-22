// backend/routes/products.js
const express = require('express');
const router  = express.Router();
const pool    = require('../db');
const requireAuth = require('../middleware/requireAuth');
const {
  calculateDistance,
  calculateShippingCost,
  calculateEstimatedDelivery
} = require('../utils/shipping/shippingUtils');

// GET /api/products/featured
router.get('/products/featured', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT product_id, product_images, product_title, product_price
       FROM products
       WHERE in_stock = TRUE
       LIMIT 10`
    );
    res.json(rows);
  } catch (err) {
    console.error('GET /products/featured error:', err.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/product/details?productId=123
router.get('/product/details', requireAuth, async (req, res) => {
  const productId = req.query.productId;
  if (!productId) {
    return res.status(400).json({ error: 'Missing productId' });
  }

  try {
    // → 1) buyer zip
    let buyerZip = '';
    try {
      const userRes = await pool.query(
        'SELECT zip_code FROM user_info WHERE user_id = $1',
        [req.user.id]
      );
      if (userRes.rows.length) {
        buyerZip = userRes.rows[0].zip_code;
      } else {
        console.warn(`No user_info row for user_id=${req.user.id}`);
      }
    } catch (err) {
      console.warn('Failed to load buyer zip:', err.message);
    }

    // → 2) product info
    const prodRes = await pool.query(
      `SELECT
         product_id, product_images, product_title,
         product_description, product_price
       FROM products
       WHERE product_id = $1`,
      [productId]
    );
    if (!prodRes.rows.length) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const product = prodRes.rows[0];

    // → 3) seller zips
    let sellerZips = [];
    try {
      const locRes = await pool.query(
        'SELECT shipper_postal_code FROM products WHERE product_id = $1',
        [productId]
      );
      sellerZips = locRes.rows[0].shipper_postal_code || [];
    } catch (err) {
      console.warn('Failed to load seller zips:', err.message);
    }

    // → 4) find closest distance
    let closestZip = '';
    let minKm = Infinity;
    for (const zip of sellerZips) {
      try {
        const km = await calculateDistance(buyerZip, zip);
        if (km < minKm) {
          minKm = km;
          closestZip = zip;
        }
      } catch (err) {
        console.warn(`Distance error for zip ${zip}:`, err.message);
      }
    }

    // → 5) compute shipping cost & ETA
    let cost = 0;
    let eta  = { date: '', days: 0 };
    try {
      cost = calculateShippingCost({ distanceKm: minKm });
    } catch (err) {
      console.warn('Shipping cost error:', err.message);
    }
    try {
      eta = calculateEstimatedDelivery({ distanceKm: minKm });
    } catch (err) {
      console.warn('ETA calculation error:', err.message);
    }

    // → 6) return everything
    return res.json({
      product,
      shipping: {
        buyerZip,
        closestDistributorZip: closestZip,
        distanceKm: minKm,
        cost,
        estimatedDelivery: eta
      }
    });
  } catch (err) {
    console.error('❌ Error in GET /product/details:', err.stack);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
