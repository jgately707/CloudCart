const { Pool } = require('pg');

const pool = new Pool({
  user: 'jackgatelyjr',       // Your macOS username or PostgreSQL role
  host: 'localhost',
  database: 'cloudcart',      // Name of the database you created
  password: '',               // Leave empty if no password is set
  port: 5432,                 // Default PostgreSQL port
});

module.exports = pool;
