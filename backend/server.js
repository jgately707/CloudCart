// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authentication');
const productRoutes = require('./routes/products'); // ← make sure it's products.js

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use('/api/products', productRoutes); // ← must come after express.json()

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
