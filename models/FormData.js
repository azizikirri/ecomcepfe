const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    fullName: String,
    cardNumber: Number,
    size: String,
    cvv: String,
    postalCode: Number,
    address: String,
    phoneNumber: Number,
    Date: Date,
    productName: String 
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
