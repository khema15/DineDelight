const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST route to submit a review
router.post('/submit', async (req, res) => {
  try {
    const { name, email, rating, feedback } = req.body;

    const newReview = new Review({
      name,
      email,
      rating,
      feedback
    });

    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully!' });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Failed to submit review. Please try again.' });
  }
});

module.exports = router;
