const express = require('express');
const router = express.Router();
const Order = require('../models/orders'); // Ensure you have the correct path to your Order model

// Route to handle order placement
router.post('/', async (req, res) => {
    const { name, address, phone, cart } = req.body;

    try {
        // Create a new order document
        const newOrder = new Order({ name, address, phone, cart });
        
        // Save the order to MongoDB
        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully.' });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order.' });
    }
});

module.exports = router;
