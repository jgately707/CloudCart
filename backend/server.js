require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');

const app = express();

// Parse cookies and JSON bodies
app.use(cookieParser());
app.use(cors({
  origin: 'https://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Import routers
const authRoutes     = require('./routes/authentication');
const userRoutes     = require('./routes/user');
const productRoutes  = require('./routes/products');

// Mount routers
app.use('/api/users', userRoutes);
app.use(authRoutes);
app.use('/api', productRoutes);

// HTTPS setup
const PORT = process.env.PORT || 5001;
const httpsOptions = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
};

https.createServer(httpsOptions, app)
   .listen(PORT, () => {
     console.log(`✅ HTTPS server running at https://localhost:${PORT}`);
   });
