const express = require('express');
const tourController = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRoutes = require('./reviewRoutes');

const router = express.Router();

// ----------  Greate review on a tour (nested routing) ----------------------
// Mounting recives router here, in case if this url is encountered
router.use('/:tourId/reviews', reviewRoutes);

// ----------  Get top 5 cheap tour ----------------------
router.get(
  '/top-5-cheap',
  tourController.aliasTopFive,
  tourController.getALlTours
);

// ----------  Get tour stats ---------------------------
router.get('/tour-stats', tourController.tourStats);

// ----------  Get monthly plan (only admin, lead-guide, guide) ----------------------
router.get(
  '/monthly-plan',
  protect,
  restrictTo('admin', 'lead-guide', 'guide'),
  tourController.getMonthlyPlan
);

// --- Get tours for which the starting loction within a certain radius ----
// /tours-within?distance=233&center=-40,45&unit=mi
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

//---- Get the distance of a given location to a starting loction of a tour ---
// /tours-within/233/center/-40,45/unit/mi
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

// ----------  Get all tours ------ Create tour  (only admin, lead-guide) ----------------------
router
  .route('/')
  .get(tourController.getALlTours)
  .post(
    protect,
    restrictTo('admin', 'lead-guide'),
    tourController.addTourCreator,
    tourController.createTour
  );

// ----------  Get specific tour ------ Update,delete sepecific tour  (only admin, lead-guide) ----------------------
// lead-guide can only delete and update, tours which he has created
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    protect,
    restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// ----------------- nested routing ----------------------
/* 
  const { createReview } = require('../controllers/reviewController'); 
  router
  .route('/:tourId/reviews')
  .post(protect, restrictTo('user'), createReview);
 */
module.exports = router;
