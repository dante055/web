const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// ------------- Protect all the routes -----------------
router.use(authController.protect);

// ------------- Create a stripe chekout session -----------------
router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

// ------------- Restricted routes routes -----------------
router.use(authController.restrictTo('admin', 'lead-guide'));

// ------------- Create a booking, and Get all bokkings -----------------
router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

// ------------- Get a specific bokkings, Update, delete a booking -----------------
router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
