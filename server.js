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
  dbName: 'PfeHamza'
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Connection error:', error);
  console.error('Make sure your connection string is correct and your IP address is whitelisted in MongoDB Atlas.');
});


app.use('/api', apiRoutes);


app.get('/secret', (req, res) => {
  res.send(`The secret key is: ${SECRET_KEY}`);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
