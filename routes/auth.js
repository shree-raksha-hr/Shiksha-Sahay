const express = require('express');
const User = require('../models/User');
const authController = require('../controllers/authController');

const router = express.Router();

// Registration routes
router.get('/register', (req, res) => {
  res.render('auth/register', { error: null });
});

router.get('/register/:role', (req, res) => {
  const { role } = req.params;
  if (['volunteer', 'school', 'student'].includes(role)) {
    res.render('auth/register-role', { role, error: null });
  } else {
    res.redirect('/auth/register');
  }
});

router.post('/register', authController.register);

// Login routes
router.get('/login', (req, res) => {
  res.render('auth/login', { error: null });
});

router.post('/login', authController.login);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;