// models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    guests: { type: Number, required: true },
    date: { type: Date, default: Date.now } // Optional: store the booking date
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
