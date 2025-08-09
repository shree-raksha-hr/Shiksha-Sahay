const express = require('express');
const classController = require('../controllers/classController');

const router = express.Router();

// View all classes
router.get('/', classController.getAllClasses);

// Create class (Schools only)
router.get('/create', classController.getCreateClass);
router.post('/create', classController.createClass);

// View class details
router.get('/:id', classController.getClassDetails);

// Book class (Volunteers only)
router.post('/:id/book', classController.bookClass);

// Cancel booking
router.post('/:id/cancel', classController.cancelBooking);

module.exports = router;