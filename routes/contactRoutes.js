const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/contactMessage'); // Ensure you have a model for the contact message

// Route to handle contact form submission
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new ContactMessage({ name, email, message });
        await newMessage.save(); // Save the message to MongoDB

        res.status(201).json({ message: 'Contact message saved successfully.' });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ message: 'Failed to save contact message.' });
    }
});

module.exports = router;
