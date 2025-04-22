// routes/product.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const requireAuth = require('../middleware/requireAuth');
const { calculateDistance, calculateShippingCost } = require('../utils/shippingUtils');

router.get('/product/details', /*requireAuth */ async (req, res) => {
  try {
    // 0) pull query params
    const productId     = req.query.productId;
    const weightKg      = parseFloat(req.query.weight) || 1;            // default 1 kg
    const shippingSpeed = req.query.shippingSpeed || 'standard';        // default standard

    if (!productId) {
      return res.status(400).json({ error: 'Missing productId query parameter' });
    }

    // 1) fetch buyer zip
    const userRes = await pool.query(
      'SELECT zip_code FROM user_info WHERE user_id = $1',
      [req.user.id]
    );
    if (userRes.rows.length === 0) {
      return res.status(400).json({ error: 'No address found for user' });
    }
    const buyerZip = userRes.rows[0].zip_code;

    // 2) fetch product info
    const prodRes = await pool.query(
      `SELECT
         product_images, product_title, product_description,
         product_category, product_price, product_discount,
         product_form_factor, brand, in_stock, colors
       FROM products
       WHERE id = $1`,
      [productId]
    );
    if (prodRes.rows.length === 0) {
      return res.status(404).json({ error: 'Product unavailable' });
    }
    const product = prodRes.rows[0];

    // 3) get all distribution (seller) zip codes for that product
    const locRes = await pool.query(
      'SELECT distribution_locations FROM products WHERE id = $1',
      [productId]
    );
    const sellerZips = locRes.rows[0].distribution_locations || [];

    // 4) find the closest seller by distance
    let closestZip = null;
    let shortestKm = Infinity;

    for (const sellerZip of sellerZips) {
      const km = await calculateDistance(buyerZip, sellerZip);
      if (km < shortestKm) {
        shortestKm = km;
        closestZip  = sellerZip;
      }
    }

    // 5) calculate shipping cost
    const cost = calculateShippingCost({
      distanceKm: shortestKm,
      weightKg,
      shippingSpeed
    });

    // 6) respond with everything
    return res.json({
      product,
      shipping: {
        buyerZip,
        closestDistributorZip: closestZip,
        distanceKm: shortestKm,
        weightKg,
        shippingSpeed,
        cost
      }
    });

  } catch (error) {
    console.error('GET /product/details error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
