require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

const authRoutes = require('./routes/authentication');
const productRoutes = require('./routes/products');

app.use(authRoutes);
app.use('/api/products', productRoutes);

const fs = require('fs');
const https = require('https');

const httpsOptions = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
};

https.createServer(httpsOptions, app).listen(5001, () => {
  console.log('✅ HTTPS server running at https://localhost:5001');
});
