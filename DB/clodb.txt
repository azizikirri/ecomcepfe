const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());


const atlasURI = 'mongodb+srv://azizikirri30:TFltY6rDtais8YG0@clusterpfe-ecom.vtwpfqs.mongodb.net/';

mongoose.connect(atlasURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'pfe_ecom' 
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
    console.error('Connection error:', error);
    console.error('Make sure your connection string is correct and your IP address is whitelisted in MongoDB Atlas.');
});


const localURI = 'mongodb://127.0.0.1:27017/pfe_ecom';

const localConnection = mongoose.createConnection(localURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

localConnection.on('connected', () => {
    console.log('Connected to local MongoDB');
});

localConnection.on('error', (error) => {
    console.error('Local connection error:', error);
});

app.use(bodyParser.json());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
