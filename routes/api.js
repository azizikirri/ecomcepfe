const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

router.post('/submit-form', async (req, res) => {
    console.log('Received form data:', req.body);
    try {
        const formData = new FormData(req.body);
        formData.productName = req.body.productName; 
        const savedFormData = await formData.save();
        console.log('Saved form data:', savedFormData);
        res.status(201).json({ message: 'Form data submitted successfully' });
    } catch (error) {
        console.error('Error submitting form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/form-data', async (req, res) => {
    try {
        const formData = await FormData.find();
        res.status(200).json(formData);
    } catch (error) {
        console.error('Error retrieving form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;