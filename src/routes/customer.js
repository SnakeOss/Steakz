const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

let orders = [];

// Sample menu items
const menu = [
  { item: 'Beef Steak', price: 25.99 },
  { item: 'Chicken Steak', price: 19.99 }
];

// Route to get the menu
router.get('/menu', (req, res) => {
  res.json(menu);
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

// Route to submit an order
router.post('/order', verifyToken, (req, res) => {
  const total = req.body.reduce((sum, item) => sum + item.price, 0);
  const order = {
    id: uuidv4(),
    user: req.user.username,
    items: req.body,
    total
  };
  orders.push(order);
  res.status(201).json({ success: true, order });
});

// Route to get customer orders
router.get('/orders', verifyToken, (req, res) => {
  const userOrders = orders.filter(order => order.user === req.user.username);
  res.json(userOrders);
});

// Route for waiter to view all orders
router.get('/all-orders', (req, res) => {
  res.json(orders);
});

module.exports = router;
