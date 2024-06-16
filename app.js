const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const customerRoutes = require('./src/routes/customer');
const authRoutes = require('./src/routes/auth');
const reportsRoutes = require('./src/routes/reports');

// Use routes
app.use('/customer', customerRoutes);
app.use('/auth', authRoutes);
app.use('/reports', reportsRoutes);

// Serve the customer dashboard as the index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'customer.html'));
});

// Serve the login page
app.get('/auth/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the register page
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Serve the waiter login page
app.get('/waiter_login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'waiter_login.html'));
});

// Serve the waiter dashboard
app.get('/waiter.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'waiter.html'));
});

// Serve the admin login page
app.get('/admin_login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin_login.html'));
});

// Serve the admin dashboard page
app.get('/admin_dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin_dashboard.html'));
});

// Serve the headquarters page
app.get('/headquarters.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'headquarters.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
