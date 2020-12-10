const express = require('express');
const tourController = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');
// const { createReview } = require('../controllers/reviewController');
const reviewRoutes = require('./reviewRoutes');

const router = express.Router();

// mounting revies router here, in case ift this url is encountered
router.use('/:tourId/reviews', reviewRoutes);
router.get(
  '/top-5-cheap',
  tourController.aliasTopFive,
  tourController.getALlTours
);
router.get('/tour-stats', tourController.tourStats);
router.get(
  '/monthly-plan',
  protect,
  restrictTo('admin', 'lead-guide', 'guide'),
  tourController.getMonthlyPlan
);

// get tours for which the starting loction within a radius
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

// get the distance of a given location to a starting loction of a tour
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getALlTours)
  .post(
    protect,
    restrictTo('admin', 'lead-guide'),
    tourController.addTourCreator,
    tourController.createTour
  );

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

// lead-guide can only delete and update, tours which he has created

// nested routing
/* router
  .route('/:tourId/reviews')
  .post(protect, restrictTo('user'), createReview);
 */
module.exports = router;
