// utils/shipping/shippingUtils.js
require('dotenv').config();
const axios = require('axios');

/**
 * Get distance in km between two ZIPs.
 * Tries Google’s API first, falls back to simple numeric diff.
 */
async function calculateDistance(originZip, destZip) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (key) {
    try {
      const params = { origins: originZip, destinations: destZip, key };
      const { data } = await axios.get(
        'https://maps.googleapis.com/maps/api/distancematrix/json',
        { params }
      );
      const elem = data.rows?.[0]?.elements?.[0];
      if (data.status === 'OK' && elem?.status === 'OK') {
        return elem.distance.value / 1000; // meters → km
      }
      console.warn(
        'Google API returned',
        data.status,
        elem?.status,
        data.error_message
      );
    } catch (err) {
      console.warn('Distance Matrix API error:', err.message);
    }
  }

  // Fallback: numeric difference of ZIPs
  const o = parseInt(originZip, 10) || 0;
  const d = parseInt(destZip, 10)    || 0;
  return Math.abs(o - d);
}

/**
 * Shipping cost: base $5 + $0.10 per km.
 * Distance is clamped to 0 if invalid.
 */
function calculateShippingCost({ distanceKm }) {
  const d = typeof distanceKm === 'number' && isFinite(distanceKm)
    ? distanceKm
    : 0;
  return Number((5 + d * 0.1).toFixed(2));
}

/**
 * ETA: assume 200 km/day, min 1 day.
 * Clamps invalid distances to 0.
 */
function calculateEstimatedDelivery({ distanceKm }) {
  const d = typeof distanceKm === 'number' && isFinite(distanceKm)
    ? distanceKm
    : 0;
  const days = Math.max(1, Math.ceil(d / 200));
  const then = Date.now() + days * 24 * 60 * 60 * 1000;
  const date = new Date(then).toISOString().slice(0, 10);
  return { date, days };
}

module.exports = {
  calculateDistance,
  calculateShippingCost,
  calculateEstimatedDelivery
};
