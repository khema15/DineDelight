// routes/bookingRoutes.js
const express = require('express');
const Booking = require('../models/bookingModel');
const router = express.Router();

// Route to handle booking submission
router.post('/book-event', async (req, res) => {
    try {
        const { eventName, name, email, guests } = req.body;

        const newBooking = new Booking({ eventName, name, email, guests });
        await newBooking.save();

        res.status(201).json({ message: 'Booking confirmed!' });
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({ message: 'Failed to book the event. Please try again.' });
    }
});

module.exports = router;
