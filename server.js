const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection
const atlasURI = process.env.ATLAS_URI;
mongoose.connect(atlasURI, {
  dbName: 'PfeHamza',
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if server selection takes too long
  socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Connection error:', error);
  console.error('Make sure your connection string is correct and your IP address is whitelisted in MongoDB Atlas.');
});

// Routes
app.use('/api', apiRoutes);

// Example endpoint using SECRET_KEY
app.get('/secret', (req, res) => {
  res.send(`The secret key is: ${SECRET_KEY}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
