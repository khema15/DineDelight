const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const OrderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes'); // Ensure this file exists and contains your auth logic
const contactRoutes = require('./routes/contactRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');




dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'views'))); // Serve static files from the views directory
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); 
app.use('/api/orders', OrderRoutes);
app.use('/api', bookingRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/reviews', reviewRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html')); // Main page
});

// Use authentication routes

// Serve HTML pages
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // Login page
});


app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html')); // About page
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'menu.html')); // Menu page
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html')); // Contact page
});

app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'events.html')); // Events page
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html')); // Home page
});
 // Import the Order model

// Route to place an order
app.post('/api/Orders', async (req, res) => {
    try {
        const { name, address, phone, cart } = req.body;

        // Create a new order document
        const newOrder = new Order({ name, address, phone, cart });

        // Save the order to MongoDB
        await newOrder.save();

        console.log('Order placed:', newOrder);
        res.status(201).json({ message: 'Order placed successfully!' });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order. Please try again.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
