const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authentication');

app.use(cors());               // Enable CORS for all origins
app.use(express.json());       // Enable JSON body parsing
app.use(authRoutes);           // Use the authentication routes

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
