const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.azizpfeecomce;


app.use(cors());
app.use(bodyParser.json());


const atlasURI = process.env.ATLAS_URI;
mongoose.connect(atlasURI, {
  dbName: 'PfeHamza', 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Connection error:', error);
  console.error('Make sure your connection string is correct and your IP address is whitelisted in MongoDB Atlas.');
});


const localURI = process.env.LOCAL_URI;
const localConnection = mongoose.createConnection(localURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
});

localConnection.on('connected', () => {
  console.log('Connected to local MongoDB');
});

localConnection.on('error', (error) => {
  console.error('Local connection error:', error);
});


app.use('/api', apiRoutes);


app.get('/secret', (req, res) => {
  res.send(`The secret key is: ${SECRET_KEY}`);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
