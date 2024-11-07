const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST route to handle new reservations
router.post('/reserve', async (req, res) => {
  try {
    const { name, email, date, time, guests } = req.body;

    const newReservation = new Reservation({
      name,
      email,
      date,
      time,
      guests
    });

    await newReservation.save();
    res.status(201).json({ message: 'Reservation successful!' });
  } catch (error) {
    console.error('Error creating reservation:', error);
    
  }
});

module.exports = router;
