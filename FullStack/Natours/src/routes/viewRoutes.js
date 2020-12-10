const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// ---------------- Overvies page (render all tours) ----------------
router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);

// ---------------- tour detail page  ----------------
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);

// ---------------- login page (show only if user is logged out)  ----------------
router.get(
  '/login',
  authController.isLoggedIn,
  authController.protectLogOutRoute,
  viewsController.getLoginForm
);

// ---------------- signup page (show only if user is logged out)  ----------------
router.get(
  '/signup',
  authController.isLoggedIn,
  authController.protectLogOutRoute,
  viewsController.getSignUpForm
);

// ---------------- logout page (show only if user is logged in)  ----------------
router.get(
  '/logout',
  authController.isLoggedIn,
  authController.protectLogOutRoute,
  viewsController.getLogoutConfirmation
);

// ---------------- render user detain page -----------------------------
router.get('/me', authController.protect, viewsController.getAccount);

// ---------------- render all my booked tours page page -----------------------------
router.get('/my-tours', authController.protect, viewsController.getMyTours);

// ----------------- Rest password : route not implemented yet ----------------------
router.get('/resetPassword/:token', viewsController.resetPassword);

/* 
//-------------- WITHOUT API update user data (connect the html form to the route handler) -----------
  router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
); 
*/

// With api (make api call from the frontend in the js files, dont need extra url for this)

module.exports = router;
