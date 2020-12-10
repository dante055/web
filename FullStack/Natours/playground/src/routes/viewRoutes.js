const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);

router.get(
  '/login',
  authController.isLoggedIn,
  authController.protectLogOutRoute,
  viewsController.getLoginForm
);
router.get(
  '/signup',
  authController.isLoggedIn,
  authController.protectLogOutRoute,
  viewsController.getSignUpForm
);
router.get(
  '/logout',
  authController.isLoggedIn,
  authController.protectLogOutRoute,
  viewsController.getLogoutConfirmation
);

router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);

// route not implemented yet
router.get('/resetPassword/:token', viewsController.resetPassword);

//- WITHOUT API (connect the html form to the route handler)
// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewsController.updateUserData
// );

// With api (make api call from the frontend)

module.exports = router;
