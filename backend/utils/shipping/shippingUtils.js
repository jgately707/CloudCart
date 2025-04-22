// utils/shipping/shippingUtils.js
require('dotenv').config();
const axios = require('axios');

/**
 * Fetches distance in kilometers between two ZIP codes
 * using Google’s Distance Matrix API.
 *
 * @param {string} originZip 
 * @param {string} destZip 
 * @returns {Promise<number>} distance in km
 */
async function calculateDistance(originZip, destZip) {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    throw new Error('Missing GOOGLE_MAPS_API_KEY');
  }

  const params = {
    origins: originZip,
    destinations: destZip,
    key: process.env.GOOGLE_MAPS_API_KEY,
  };

  const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
  const { data } = await axios.get(url, { params });

  if (
    data.status !== 'OK' ||
    !data.rows?.[0]?.elements?.[0] ||
    data.rows[0].elements[0].status !== 'OK'
  ) {
    throw new Error(
      `Distance Matrix API error: ${data.error_message || data.rows[0]?.elements[0]?.status}`
    );
  }

  // distance.value is in meters
  const meters = data.rows[0].elements[0].distance.value;
  return meters / 1000;
}

/**
 * Simple shipping cost:
 * - Base fee of $5
 * - Plus $0.10 per km
 *
 * @param {{distanceKm: number}} opts
 * @returns {number}
 */
function calculateShippingCost({ distanceKm }) {
  const cost = 5 + distanceKm * 0.1;
  return Number(cost.toFixed(2));
}

/**
 * ETA: assume
 * - 200 km per day
 * - minimum 1 day
 *
 * @param {{distanceKm: number}} opts
 * @returns {{date: string, days: number}}
 */
function calculateEstimatedDelivery({ distanceKm }) {
  const days = Math.max(1, Math.ceil(distanceKm / 200));
  const then = Date.now() + days * 24 * 60 * 60 * 1000;
  const date = new Date(then).toISOString().slice(0, 10);
  return { date, days };
}

module.exports = {
  calculateDistance,
  calculateShippingCost,
  calculateEstimatedDelivery
};
